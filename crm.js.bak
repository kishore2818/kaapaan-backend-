


// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const WebSocket = require("ws");
// // const http = require("http");
// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");
// // const cloudinary = require("cloudinary").v2;

// // // ================= CONFIG =================
// // const PORT = 5001;
// // const MONGO_URI =
// //   "mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority";

// // // ================= CLOUDINARY =================
// // cloudinary.config({
// //   cloud_name: "ddg5ao8e7",
// //   api_key: "282649857566918",
// //   api_secret: "jpQvjZaCPHhf29KZE2-UM0NTm4U",
// // });

// // // ================= LOCAL IMAGE PATH =================
// // const LOCAL_IMAGE_DIR = "F:/KAAPAAN/kaavalan/knownfaces";

// // // Ensure folder exists
// // if (!fs.existsSync(LOCAL_IMAGE_DIR)) {
// //   fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });
// // }

// // // ================= MULTER =================
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, LOCAL_IMAGE_DIR);
// //   },
// //   filename: (req, file, cb) => {
// //     // Extract name from request body or use timestamp
// //     const name = req.body.name ? req.body.name.replace(/\s+/g, '_').toLowerCase() : 'unknown';
// //     const uniqueName = `${name}_${Date.now()}${path.extname(file.originalname)}`;
// //     cb(null, uniqueName);
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// //   fileFilter: (req, file, cb) => {
// //     const allowedTypes = /jpeg|jpg|png|webp/;
// //     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimetype = allowedTypes.test(file.mimetype);
    
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     } else {
// //       cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
// //     }
// //   }
// // });

// // // ================= APP SETUP =================
// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // const server = http.createServer(app);

// // // ================= WEBSOCKET =================
// // const wss = new WebSocket.Server({ server });

// // wss.on("connection", (ws) => {
// //   console.log("🟢 WebSocket client connected");

// //   ws.send(
// //     JSON.stringify({
// //       type: "CONNECTED",
// //       message: "Live updates connected",
// //     })
// //   );

// //   ws.on("close", () => {
// //     console.log("🔴 WebSocket client disconnected");
// //   });
// // });

// // function broadcast(data) {
// //   wss.clients.forEach((client) => {
// //     if (client.readyState === WebSocket.OPEN) {
// //       client.send(JSON.stringify(data));
// //     }
// //   });
// // }

// // // ================= MONGOOSE =================
// // mongoose
// //   .connect(MONGO_URI)
// //   .then(() => console.log("✅ MongoDB connected"))
// //   .catch((err) => console.error("❌ MongoDB error", err));

// // // ================= SCHEMAS =================

// // // CRM Details Schema with explicit structure
// // const CrmDetailSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: [true, 'Name is required'],
// //     trim: true
// //   },
// //   age: {
// //     type: Number,
// //     required: [true, 'Age is required'],
// //     min: [1, 'Age must be positive'],
// //     max: [120, 'Age must be reasonable']
// //   },
// //   image: {
// //     type: String,
// //     required: [true, 'Image URL is required']
// //   },
// //   lastSeen: {
// //     type: Date,
// //     required: [true, 'Last seen date is required']
// //   },
// //   district: {
// //     type: String,
// //     required: [true, 'District is required'],
// //     trim: true
// //   },
// //   status: {
// //     type: String,
// //     required: [true, 'Status is required'],
// //     enum: ['criminal', 'missing'],
// //     default: 'criminal'
// //   },
// //   additionalDetails: {
// //     type: String,
// //     trim: true,
// //     default: ''
// //   },
// //   localImagePath: {
// //     type: String
// //   },
// //   imagePublicId: {
// //     type: String
// //   }
// // }, {
// //   timestamps: true // This will automatically create createdAt and updatedAt
// // });

// // // Detection Schema
// // const DetectionSchema = new mongoose.Schema(
// //   {},
// //   { strict: false, collection: "crm_detections" }
// // );

// // // ================= MODELS =================
// // const CrmDetail = mongoose.model("CrmDetail", CrmDetailSchema);
// // const Detection = mongoose.model("Detection", DetectionSchema);

// // // ================= REST API =================

// // // Health check
// // app.get("/", (req, res) => {
// //   res.send("🚦 CRM Detection Backend Running");
// // });

// // // Upload endpoint for separate image upload
// // app.post("/api/upload", upload.single("image"), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No image file uploaded"
// //       });
// //     }

// //     const localImagePath = req.file.path;
// //     const imageName = path.basename(localImagePath);

// //     // Upload to Cloudinary
// //     const cloudinaryResult = await cloudinary.uploader.upload(
// //       localImagePath,
// //       { 
// //         folder: "crm_details",
// //         public_id: imageName.replace(path.extname(imageName), '')
// //       }
// //     );

// //     res.json({
// //       success: true,
// //       message: "Image uploaded successfully",
// //       url: cloudinaryResult.secure_url,
// //       publicId: cloudinaryResult.public_id,
// //       localPath: localImagePath
// //     });
// //   } catch (err) {
// //     console.error("Upload error:", err);
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // ================= CRM DETAILS =================

// // // ➕ CREATE CRM DETAIL (with image handling)
// // app.post("/api/crm-details", upload.single("image"), async (req, res) => {
// //   try {
// //     // Validate required fields
// //     const { name, age, lastSeen, district, status, additionalDetails } = req.body;
    
// //     if (!name || !age || !lastSeen || !district || !status) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Missing required fields"
// //       });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Image is required"
// //       });
// //     }

// //     const localImagePath = req.file.path;
    
// //     // Upload to Cloudinary
// //     const cloudinaryResult = await cloudinary.uploader.upload(
// //       localImagePath,
// //       { 
// //         folder: "crm_details",
// //         public_id: `${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`
// //       }
// //     );

// //     // Create document with correct field names
// //     const newDetail = new CrmDetail({
// //       name: name.trim(),
// //       age: parseInt(age),
// //       image: cloudinaryResult.secure_url, // Store Cloudinary URL in 'image' field
// //       lastSeen: new Date(lastSeen),
// //       district: district.trim(),
// //       status: status,
// //       additionalDetails: additionalDetails || '',
// //       localImagePath: localImagePath,
// //       imagePublicId: cloudinaryResult.public_id
// //     });

// //     await newDetail.save();

// //     // Broadcast new record via WebSocket
// //     broadcast({
// //       type: "NEW_CRM_DETAIL",
// //       data: newDetail
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "CRM detail saved successfully",
// //       data: newDetail
// //     });
// //   } catch (err) {
// //     console.error("Create CRM detail error:", err);
    
// //     // Clean up uploaded file if error occurs
// //     if (req.file && fs.existsSync(req.file.path)) {
// //       fs.unlinkSync(req.file.path);
// //     }
    
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // 📄 READ ALL CRM DETAILS
// // app.get("/api/crm-details", async (req, res) => {
// //   try {
// //     const { status, district, search } = req.query;
// //     let query = {};

// //     // Apply filters if provided
// //     if (status && status !== 'all') {
// //       query.status = status;
// //     }
    
// //     if (district && district !== 'all') {
// //       query.district = district;
// //     }
    
// //     if (search) {
// //       query.$or = [
// //         { name: { $regex: search, $options: 'i' } },
// //         { district: { $regex: search, $options: 'i' } },
// //         { additionalDetails: { $regex: search, $options: 'i' } }
// //       ];
// //     }

// //     const data = await CrmDetail.find(query).sort({ createdAt: -1 });
    
// //     res.json({
// //       success: true,
// //       count: data.length,
// //       data: data
// //     });
// //   } catch (err) {
// //     console.error("Read CRM details error:", err);
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // 📄 READ SINGLE CRM DETAIL
// // app.get("/api/crm-details/:id", async (req, res) => {
// //   try {
// //     const data = await CrmDetail.findById(req.params.id);

// //     if (!data) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "CRM detail not found"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       data: data
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // ✏️ UPDATE CRM DETAIL
// // app.put("/api/crm-details/:id", upload.single("image"), async (req, res) => {
// //   try {
// //     const updateData = { ...req.body };
    
// //     // Handle image update if new image is uploaded
// //     if (req.file) {
// //       const localImagePath = req.file.path;
      
// //       // Upload new image to Cloudinary
// //       const cloudinaryResult = await cloudinary.uploader.upload(
// //         localImagePath,
// //         { folder: "crm_details" }
// //       );

// //       // Get old record to delete old image
// //       const oldRecord = await CrmDetail.findById(req.params.id);
// //       if (oldRecord && oldRecord.imagePublicId) {
// //         try {
// //           await cloudinary.uploader.destroy(oldRecord.imagePublicId);
// //         } catch (cloudinaryErr) {
// //           console.warn("Could not delete old Cloudinary image:", cloudinaryErr);
// //         }
// //       }

// //       updateData.image = cloudinaryResult.secure_url;
// //       updateData.localImagePath = localImagePath;
// //       updateData.imagePublicId = cloudinaryResult.public_id;
// //     }

// //     // Convert date if present
// //     if (updateData.lastSeen) {
// //       updateData.lastSeen = new Date(updateData.lastSeen);
// //     }

// //     // Convert age to number if present
// //     if (updateData.age) {
// //       updateData.age = parseInt(updateData.age);
// //     }

// //     const updated = await CrmDetail.findByIdAndUpdate(
// //       req.params.id,
// //       updateData,
// //       { new: true, runValidators: true }
// //     );

// //     if (!updated) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "CRM detail not found"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       message: "CRM detail updated successfully",
// //       data: updated
// //     });
// //   } catch (err) {
// //     console.error("Update error:", err);
    
// //     // Clean up uploaded file if error occurs
// //     if (req.file && fs.existsSync(req.file.path)) {
// //       fs.unlinkSync(req.file.path);
// //     }
    
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // ❌ DELETE CRM DETAIL
// // app.delete("/api/crm-details/:id", async (req, res) => {
// //   try {
// //     const deleted = await CrmDetail.findByIdAndDelete(req.params.id);

// //     if (!deleted) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "CRM detail not found"
// //       });
// //     }

// //     // Delete image from Cloudinary
// //     if (deleted.imagePublicId) {
// //       try {
// //         await cloudinary.uploader.destroy(deleted.imagePublicId);
// //       } catch (cloudinaryErr) {
// //         console.warn("Could not delete Cloudinary image:", cloudinaryErr);
// //       }
// //     }

// //     // Delete local image file
// //     if (deleted.localImagePath && fs.existsSync(deleted.localImagePath)) {
// //       try {
// //         fs.unlinkSync(deleted.localImagePath);
// //       } catch (fsErr) {
// //         console.warn("Could not delete local image file:", fsErr);
// //       }
// //     }

// //     res.json({
// //       success: true,
// //       message: "CRM detail deleted successfully"
// //     });
// //   } catch (err) {
// //     console.error("Delete error:", err);
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // ================= DETECTIONS =================
// // app.get("/api/detections", async (req, res) => {
// //   try {
// //     const data = await Detection.find()
// //       .sort({ timestamp: -1 })
// //       .limit(100);

// //     res.json({
// //       success: true,
// //       count: data.length,
// //       data: data
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // app.delete("/api/detections/:id", async (req, res) => {
// //   try {
// //     const deleted = await Detection.findByIdAndDelete(req.params.id);

// //     if (!deleted) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Detection not found"
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       message: "Detection deleted successfully"
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });

// // // ================= LIVE DB WATCH =================
// // mongoose.connection.once("open", () => {
// //   const changeStream = Detection.watch();

// //   changeStream.on("change", (change) => {
// //     if (change.operationType === "insert") {
// //       broadcast({
// //         type: "NEW_DETECTION",
// //         data: change.fullDocument,
// //       });
// //     }
// //   });
// // });

// // // ================= STATIC IMAGE SERVING =================
// // app.use('/knownfaces', express.static(LOCAL_IMAGE_DIR));

// // // ================= START SERVER =================
// // server.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log(`📡 WebSocket running on ws://localhost:${PORT}`);
// //   console.log(`🖼️ Local images served from: ${LOCAL_IMAGE_DIR}`);
// // });










// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const WebSocket = require("ws");
// const http = require("http");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const cloudinary = require("cloudinary").v2;

// // ================= CONFIG =================
// const PORT = 4000;
// const MONGO_URI =
//   "mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority";

// // ================= CLOUDINARY =================
// cloudinary.config({
//   cloud_name: "ddg5ao8e7",
//   api_key: "282649857566918",
//   api_secret: "jpQvjZaCPHhf29KZE2-UM0NTm4U",
// });

// // ================= LOCAL IMAGE PATH =================
// const LOCAL_IMAGE_DIR = "F:/KAAPAAN/kaavalan/knownfaces";

// if (!fs.existsSync(LOCAL_IMAGE_DIR)) {
//   fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });
// }

// // ================= MULTER =================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, LOCAL_IMAGE_DIR);
//   },
//   filename: (req, file, cb) => {
//     if (!req.body.name) {
//       return cb(new Error("Name is required for image upload"));
//     }

//     const fileName = `${req.body.name}${path.extname(file.originalname)}`;
//     const fullPath = path.join(LOCAL_IMAGE_DIR, fileName);

//     // ❌ Reject if file already exists
//     if (fs.existsSync(fullPath)) {
//       return cb(new Error("Image with this name already exists"));
//     }

//     cb(null, fileName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) cb(null, true);
//     else cb(new Error("Only image files are allowed"));
//   },
// });

// // ================= APP SETUP =================
// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// // ================= WEBSOCKET =================
// const wss = new WebSocket.Server({ server });

// function broadcast(data) {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// }

// // ================= MONGOOSE =================
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error", err));

// // ================= SCHEMAS =================
// const CrmDetailSchema = new mongoose.Schema(
//   {
//     name: String,
//     age: Number,
//     image: String,
//     lastSeen: Date,
//     district: String,
//     status: {
//       type: String,
//       enum: ["criminal", "missing"],
//     },
//     additionalDetails: String,
//     localImagePath: String,
//     imagePublicId: String,
//   },
//   { timestamps: true }
// );

// const DetectionSchema = new mongoose.Schema({}, { strict: false, collection: "crm_detections" });

// const CrmDetail = mongoose.model("CrmDetail", CrmDetailSchema);
// const Detection = mongoose.model("Detection", DetectionSchema);

// // ================= ROUTES =================

// // Health
// app.get("/", (req, res) => {
//   res.send("🚦 CRM Detection Backend Running");
// });

// // ================= IMAGE UPLOAD =================
// app.post("/api/upload", upload.single("image"), async (req, res) => {
//   try {
//     const localImagePath = req.file.path;
//     const imageName = path.parse(req.file.filename).name;

//     const cloudinaryResult = await cloudinary.uploader.upload(localImagePath, {
//       folder: "crm_details",
//       public_id: imageName,
//       overwrite: false, // auto-versioning
//     });

//     res.json({
//       success: true,
//       url: cloudinaryResult.secure_url,
//       publicId: cloudinaryResult.public_id,
//       localPath: localImagePath,
//     });
//   } catch (err) {
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ================= CREATE CRM =================
// app.post("/api/crm-details", upload.single("image"), async (req, res) => {
//   try {
//     const { name, age, lastSeen, district, status, additionalDetails } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Image required" });
//     }

//     const localImagePath = req.file.path;
//     const imageName = path.parse(req.file.filename).name;

//     const cloudinaryResult = await cloudinary.uploader.upload(localImagePath, {
//       folder: "crm_details",
//       public_id: imageName,
//       overwrite: false,
//     });

//     const record = new CrmDetail({
//       name,
//       age: parseInt(age),
//       image: cloudinaryResult.secure_url,
//       lastSeen: new Date(lastSeen),
//       district,
//       status,
//       additionalDetails,
//       localImagePath,
//       imagePublicId: cloudinaryResult.public_id,
//     });

//     await record.save();
//     broadcast({ type: "NEW_CRM_DETAIL", data: record });

//     res.status(201).json({ success: true, data: record });
//   } catch (err) {
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // ================= READ CRM =================
// app.get("/api/crm-details", async (req, res) => {
//   const data = await CrmDetail.find().sort({ createdAt: -1 });
//   res.json({ success: true, data });
// });

// // ================= DELETE CRM =================
// app.delete("/api/crm-details/:id", async (req, res) => {
//   const deleted = await CrmDetail.findByIdAndDelete(req.params.id);

//   if (deleted?.imagePublicId) {
//     await cloudinary.uploader.destroy(deleted.imagePublicId);
//   }

//   if (deleted?.localImagePath && fs.existsSync(deleted.localImagePath)) {
//     fs.unlinkSync(deleted.localImagePath);
//   }

//   res.json({ success: true });
// });

// // ================= DETECTIONS =================
// app.get("/api/detections", async (req, res) => {
//   try {
//     const data = await Detection.find()
//       .sort({ timestamp: -1 })
//       .limit(100);

//     res.json({
//       success: true,
//       count: data.length,
//       data: data
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// app.delete("/api/detections/:id", async (req, res) => {
//   try {
//     const deleted = await Detection.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Detection not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Detection deleted successfully"
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });
// // ================= STATIC =================
// app.use("/knownfaces", express.static(LOCAL_IMAGE_DIR));

// // ================= START =================
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
// });









require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const WebSocket = require("ws");
const http = require("http");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;


// ================= CONFIG =================

const PORT = process.env.CRM_PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


// ================= CLOUDINARY =================

cloudinary.config({

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

});


// ================= LOCAL IMAGE PATH =================
// Mac compatible path

const LOCAL_IMAGE_DIR = path.join(__dirname, "knownfaces");

if (!fs.existsSync(LOCAL_IMAGE_DIR)) {

  fs.mkdirSync(LOCAL_IMAGE_DIR, { recursive: true });

}


// ================= MULTER =================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, LOCAL_IMAGE_DIR);

  },

  filename: (req, file, cb) => {

    if (!req.body.name) {

      return cb(new Error("Name required"));

    }

    const filename =
      req.body.name + path.extname(file.originalname);

    const fullPath =
      path.join(LOCAL_IMAGE_DIR, filename);

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


// ================= EXPRESS =================

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());


const server = http.createServer(app);


// ================= WEBSOCKET =================

const wss = new WebSocket.Server({ server });

function broadcast(data) {

  wss.clients.forEach(client => {

    if (client.readyState === WebSocket.OPEN)

      client.send(JSON.stringify(data));

  });

}


// ================= MONGODB =================

mongoose.connect(MONGO_URI)

.then(() =>
  console.log("✅ CRM MongoDB connected")
)

.catch(err =>
  console.log("Mongo error", err)
);


// ================= SCHEMA =================

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

  },

  { timestamps: true })

);


const Detection = mongoose.model(

  "Detection",

  new mongoose.Schema({}, { strict: false }),

  "crm_detections"

);


// ================= ROUTES =================


// health

app.get("/", (req, res) => {

  res.send("CRM server running");

});


// upload image

app.post("/api/upload",

  upload.single("image"),

  async (req, res) => {

    try {

      const localPath = req.file.path;

      const name =
        path.parse(req.file.filename).name;


      const result =
        await cloudinary.uploader.upload(
          localPath,
          {
            folder: "crm_details",
            public_id: name,
            overwrite: false
          }
        );


      res.json({

        success: true,
        url: result.secure_url,
        publicId: result.public_id

      });

    }

    catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }

);


// create crm record

app.post("/api/crm-details",

  upload.single("image"),

  async (req, res) => {

    try {

      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "crm_details",
            public_id:
              path.parse(req.file.filename).name
          }
        );


      const record =
        await CrmDetail.create({

          name: req.body.name,
          age: req.body.age,
          district: req.body.district,
          status: req.body.status,
          lastSeen: req.body.lastSeen,
          additionalDetails:
            req.body.additionalDetails,

          image: result.secure_url,
          localImagePath: req.file.path,
          imagePublicId: result.public_id

        });


      broadcast({
        type: "NEW",
        data: record
      });


      res.json(record);

    }

    catch (err) {

      res.status(500).json(err);

    }

  }

);


// get crm records

// app.get("/api/crm-details",

//   async (req, res) => {

//     const data =
//       await CrmDetail.find()
//       .sort({ createdAt: -1 });

//     res.json(data);

//   }

// );
app.get("/api/crm-details", async (req, res) => {

  try {

    const data = await CrmDetail.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: data
    });

  }

  catch(err){

    res.status(500).json({
      success:false,
      error:err.message
    });

  }

});

// delete crm

app.delete("/api/crm-details/:id",

  async (req, res) => {

    const data =
      await CrmDetail.findByIdAndDelete(
        req.params.id
      );

    if (data?.imagePublicId)

      await cloudinary.uploader.destroy(
        data.imagePublicId
      );

    if (
      data?.localImagePath &&
      fs.existsSync(data.localImagePath)
    )

      fs.unlinkSync(data.localImagePath);


    res.json({
      success: true
    });

  }

);


// detections

// app.get("/api/detections",

//   async (req, res) => {

//     const data =
//       await Detection.find()
//       .sort({ _id: -1 })
//       .limit(100);

//     res.json(data);

//   }

// );
app.get("/api/detections", async (req, res) => {

  try{

    const data = await Detection.find()
      .sort({ _id: -1 })
      .limit(100);

    res.json({
      success:true,
      data:data
    });

  }

  catch(err){

    res.status(500).json({
      success:false,
      error:err.message
    });

  }

});

// static images

app.use(
  "/knownfaces",
  express.static(LOCAL_IMAGE_DIR)
);


// ================= START =================

server.listen(PORT, () => {

  console.log(`
CRM SERVER RUNNING
http://localhost:${PORT}
`);

});