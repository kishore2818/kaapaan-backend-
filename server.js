require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { Parser } = require("json2csv");
const WebSocket = require("ws");
const http = require("http");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = process.env.PORT || 5001;

// =======================
// CLOUDINARY CONFIG
// =======================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =======================
// MIDDLEWARE
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in production for now
    }
  },
  credentials: true
}));

app.use(express.json());

// =======================
// STATIC DIRS & MULTER
// =======================
const videosDir = path.join(__dirname, "output_videos");
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}
app.use("/output_videos", express.static(videosDir));

const LOCAL_IMAGE_DIR = path.join(__dirname, "knownfaces");
if (!fs.existsSync(LOCAL_IMAGE_DIR)) {
  fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });
}
app.use("/knownfaces", express.static(LOCAL_IMAGE_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, LOCAL_IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    if (!req.body.name) {
      return cb(new Error("Name required"));
    }
    const filename = req.body.name + path.extname(file.originalname);
    const fullPath = path.join(LOCAL_IMAGE_DIR, filename);
    if (fs.existsSync(fullPath)) {
      return cb(new Error("Image already exists"));
    }
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  }
});

// =======================
// HTTP & WEBSOCKET SERVER
// =======================
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// =======================
// MONGODB CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// =======================
// SCHEMAS
// =======================

// 1. Violation Schema
const violationSchema = new mongoose.Schema({
  imageUrl: String,
  plateImageUrl: String,
  violationType: String,
  analyzedAt: { type: Date, default: Date.now },
  videoFilename: String,
  noHelmet: { type: Number, default: 0 },
  phoneUsage: { type: Number, default: 0 },
  tripling: { type: Number, default: 0 },
  wrongway: { type: Number, default: 0 },
  fire: { type: Number, default: 0 },
  noPlate: { type: Number, default: 0 },
  smoking: { type: Number, default: 0 },
  stuntRiding: { type: Number, default: 0 },
  triples: { type: Number, default: 0 },
  withHelmet: { type: Number, default: 0 },
  withoutHelmet: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: String, default: null },
  publicId: String,
  platePublicId: String
});
const Violation = mongoose.model("Violation", violationSchema, "violations");

// 2. Login Detail Schema
const detailSchema = new mongoose.Schema({
  username: String,
  password: String
});
const Detail = mongoose.model("Detail", detailSchema, "details");

// 3. CRM Detail Schema
const CrmDetail = mongoose.model(
  "CrmDetail",
  new mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    lastSeen: Date,
    district: String,
    status: String,
    additionalDetails: String,
    localImagePath: String,
    imagePublicId: String
  }, { timestamps: true })
);

// 4. Detection Schema
const Detection = mongoose.model(
  "Detection",
  new mongoose.Schema({}, { strict: false }),
  "crm_detections"
);

// =======================
// FORMAT FUNCTION
// =======================
function formatViolation(v) {
  const types = [];
  const withoutHelmet = v.withoutHelmet || v.noHelmet || 0;
  const triples = v.triples || v.tripling || 0;

  if (v.noHelmet) types.push("No Helmet");
  if (v.phoneUsage) types.push("Phone Usage");
  if (v.tripling) types.push("Triple Riding");
  if (v.wrongway) types.push("Wrong Way");
  if (v.fire) types.push("Fire");
  if (v.noPlate) types.push("No Plate");
  if (v.smoking) types.push("Smoking");
  if (v.stuntRiding) types.push("Stunt Riding");
  if (triples) types.push("Triples");
  if (v.withHelmet) types.push("With Helmet");
  if (withoutHelmet) types.push("Without Helmet");

  return {
    id: v._id,
    _id: v._id,
    imageUrl: v.imageUrl,
    plateImageUrl: v.plateImageUrl,
    analyzedAt: v.analyzedAt,
    videoFilename: v.videoFilename,
    violationType: types,
    noHelmet: v.noHelmet,
    phoneUsage: v.phoneUsage,
    tripling: v.tripling,
    wrongway: v.wrongway,
    fire: v.fire,
    noPlate: v.noPlate,
    smoking: v.smoking,
    stuntRiding: v.stuntRiding,
    triples,
    withHelmet: v.withHelmet,
    withoutHelmet,
    verified: v.verified,
    verifiedBy: v.verifiedBy,
    publicId: v.publicId,
    platePublicId: v.platePublicId
  };
}

// =======================
// ROUTES (From server.js)
// =======================

app.get("/api/violations", async (req, res) => {
  try {
    const data = await Violation.find().sort({ analyzedAt: -1 }).limit(100);
    res.json(data.map(formatViolation));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/violations/all", async (req, res) => {
  try {
    const data = await Violation.find().sort({ analyzedAt: -1 });
    res.json(data.map(formatViolation));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/violations", async (req, res) => {
  try {
    const { imageUrl, plateImageUrl, labels, videoFilename, publicId, platePublicId } = req.body;
    let fields = {
      noHelmet: 0, phoneUsage: 0, tripling: 0, wrongway: 0, fire: 0,
      noPlate: 0, smoking: 0, stuntRiding: 0, triples: 0, withHelmet: 0, withoutHelmet: 0
    };

    if (labels) {
      labels.forEach(label => {
        if (label === "no_helmet") fields.noHelmet = 1;
        if (label === "phone_usage") fields.phoneUsage = 1;
        if (label === "triple_riding") fields.tripling = 1;
        if (label === "wrong_way") fields.wrongway = 1;
        if (label === "fire") fields.fire = 1;
        if (label === "no_plate") fields.noPlate = 1;
        if (label === "smoking") fields.smoking = 1;
        if (label === "stunt_riding") fields.stuntRiding = 1;
        if (label === "triples") fields.triples = 1;
        if (label === "with_helmet") fields.withHelmet = 1;
        if (label === "without_helmet") fields.withoutHelmet = 1;
      });
    }

    const exists = await Violation.findOne({ imageUrl, videoFilename });
    if (exists) {
      return res.json({ message: "Duplicate skipped" });
    }

    const newData = new Violation({
      imageUrl, plateImageUrl, videoFilename, publicId, platePublicId,
      violationType: "Multiple", ...fields
    });
    await newData.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch("/api/violations/verify", async (req, res) => {
  try {
    const { ids, officerId } = req.body;
    await Violation.updateMany(
      { _id: { $in: ids } },
      { verified: true, verifiedBy: officerId }
    );
    res.json({ message: "Verified" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/violations/:id", async (req, res) => {
  try {
    const deletedViolation = await Violation.findByIdAndDelete(req.params.id);
    if (!deletedViolation) {
      return res.status(404).json({ message: "Violation not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/violations/verified", async (req, res) => {
  try {
    const query = { verified: true };
    if (req.query.officerId) {
      query.verifiedBy = req.query.officerId;
    }
    const data = await Violation.find(query).sort({ analyzedAt: -1 });
    res.json(data.map(formatViolation));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/violations/verified-by", async (req, res) => {
  try {
    const data = await Violation.aggregate([
      { $match: { verified: true, verifiedBy: { $ne: null } } },
      { $group: { _id: "$verifiedBy", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/violations/verified/csv", async (req, res) => {
  try {
    const data = await Violation.find({ verified: true }).sort({ analyzedAt: -1 });
    const rows = data.map((item) => {
      const formatted = formatViolation(item);
      return {
        id: formatted._id,
        analyzedAt: formatted.analyzedAt,
        violationType: formatted.violationType.join(", "),
        imageUrl: formatted.imageUrl,
        plateImageUrl: formatted.plateImageUrl || "",
        verifiedBy: formatted.verifiedBy || ""
      };
    });
    const parser = new Parser({
      fields: ["id", "analyzedAt", "violationType", "imageUrl", "plateImageUrl", "verifiedBy"]
    });
    const csv = parser.parse(rows);
    res.header("Content-Type", "text/csv");
    res.attachment("verified_violations_report.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/violations/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Violation id is required" });
    const deletedViolation = await Violation.findByIdAndDelete(id);
    if (!deletedViolation) return res.status(404).json({ message: "Violation not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Detail.findOne({ username, password });
    if (user) res.json(user);
    else res.status(401).json({ message: "Invalid login" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/videos", (req, res) => {
  const files = fs.readdirSync(videosDir);
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const list = files.map(file => ({
    name: file,
    url: `${baseUrl}/output_videos/${file}`
  }));
  res.json(list);
});

app.get("/api/photos", async (req, res) => {
  try {
    const { videoName } = req.query;
    if (!videoName) return res.status(400).json({ message: "Video name is required" });
    const data = await Violation.find({ videoFilename: videoName }).sort({ analyzedAt: -1 });
    res.json(data.map(formatViolation));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =======================
// ROUTES (From crm.js)
// =======================

app.get("/", (req, res) => {
  res.send("Unified Backend server running");
});

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const localPath = req.file.path;
    const name = path.parse(req.file.filename).name;
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "crm_details",
      public_id: name,
      overwrite: false
    });
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/crm-details", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "crm_details",
      public_id: path.parse(req.file.filename).name
    });
    const record = await CrmDetail.create({
      name: req.body.name,
      age: req.body.age,
      district: req.body.district,
      status: req.body.status,
      lastSeen: req.body.lastSeen,
      additionalDetails: req.body.additionalDetails,
      image: result.secure_url,
      localImagePath: req.file.path,
      imagePublicId: result.public_id
    });
    broadcast({ type: "NEW", data: record });
    res.json(record);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/crm-details", async (req, res) => {
  try {
    const data = await CrmDetail.find().sort({ createdAt: -1 });
    res.json({ success: true, data: data });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/crm-details/:id", async (req, res) => {
  try {
    const data = await CrmDetail.findByIdAndDelete(req.params.id);
    if (data?.imagePublicId) {
      await cloudinary.uploader.destroy(data.imagePublicId);
    }
    if (data?.localImagePath && fs.existsSync(data.localImagePath)) {
      fs.unlinkSync(data.localImagePath);
    }
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/detections", async (req, res) => {
  try {
    const data = await Detection.find().sort({ _id: -1 }).limit(100);
    res.json({ success: true, data: data });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =======================
// START SERVER
// =======================
server.listen(port, () => {
  console.log(`
=================================
UNIFIED SERVER RUNNING
http://localhost:${port}
=================================
`);
});
