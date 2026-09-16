// // // const express = require("express");
// // // const cors = require("cors");
// // // const cloudinary = require("cloudinary").v2;

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // ===== Cloudinary Configuration =====
// // // cloudinary.config({
// // //   cloud_name: "dprwjya79",
// // //   api_key: "623441469282272",
// // //   api_secret: "paiJZ5_PRNSQl3SnBWk-S7a1K98"
// // // });

// // // // ===== API Route: Get all images from Crowd_Detection folder =====
// // // app.get("/api/frames", async (req, res) => {
// // //   try {
// // //     // Search images in the folder "Crowd_Detection"
// // //     const result = await cloudinary.search
// // //       .expression("folder:Crowd_Detection")
// // //       .sort_by("created_at", "desc")
// // //       .max_results(100)
// // //       .execute();

// // //     // Extract secure URLs
// // //     const frames = result.resources.map(img => ({
// // //       url: img.secure_url,
// // //       created_at: img.created_at
// // //     }));

// // //     res.json(frames);
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // // ===== Start Server =====
// // // const PORT = 5000;
// // // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// // // // // const express = require("express");
// // // // // const cors = require("cors");
// // // // // const cloudinary = require("cloudinary").v2;

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // ===== Cloudinary Configuration =====
// // // // // cloudinary.config({
// // // // //   cloud_name: "dprwjya79",
// // // // //   api_key: "623441469282272",
// // // // //   api_secret: "paiJZ5_PRNSQl3SnBWk-S7a1K98"
// // // // // });

// // // // // // ===== API Route: Get all images from Crowd_Detection folder =====
// // // // // app.get("/api/frames", async (req, res) => {
// // // // //   try {
// // // // //     // Search images in the folder "Crowd_Detection"
// // // // //     const result = await cloudinary.search
// // // // //       .expression("folder:Crowd_Detection")
// // // // //       .sort_by("created_at", "desc")
// // // // //       .max_results(100)
// // // // //       .execute();

// // // // //     // Extract secure URLs
// // // // //     const frames = result.resources.map(img => ({
// // // // //       url: img.secure_url,
// // // // //       created_at: img.created_at,
// // // // //       public_id: img.public_id
// // // // //     }));

// // // // //     res.json(frames);
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // // ===== API Route: Get images for specific cameras =====
// // // // // app.get("/api/camera-images", async (req, res) => {
// // // // //   try {
// // // // //     // Get all images from the folder
// // // // //     const result = await cloudinary.search
// // // // //       .expression("folder:Crowd_Detection")
// // // // //       .sort_by("created_at", "desc")
// // // // //       .max_results(100)
// // // // //       .execute();

// // // // //     // Create a mapping of camera names to their latest images
// // // // //     const cameraImages = {};
    
// // // // //     result.resources.forEach(img => {
// // // // //       // Extract camera name from the public_id (assuming format: folder/camera-name_timestamp)
// // // // //       const parts = img.public_id.split('/');
// // // // //       const filename = parts[1] || parts[0];
// // // // //       const cameraName = filename.split('_')[0]; // Get camera name before underscore
      
// // // // //       // Only keep the latest image for each camera
// // // // //       if (!cameraImages[cameraName] || new Date(img.created_at) > new Date(cameraImages[cameraName].created_at)) {
// // // // //         cameraImages[cameraName] = {
// // // // //           url: img.secure_url,
// // // // //           created_at: img.created_at,
// // // // //           public_id: img.public_id
// // // // //         };
// // // // //       }
// // // // //     });

// // // // //     res.json(cameraImages);
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // // ===== Start Server =====
// // // // // const PORT = process.env.PORT || 5000;
// // // // // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const cloudinary = require("cloudinary").v2;

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // ===== Cloudinary Configuration =====
// // // // cloudinary.config({
// // // //   cloud_name: "dprwjya79",
// // // //   api_key: "623441469282272",
// // // //   api_secret: "paiJZ5_PRNSQl3SnBWk-S7a1K98"
// // // // });

// // // // // ===== API Route: Get all images from Crowd_Detection folder =====
// // // // app.get("/api/images", async (req, res) => {
// // // //   try {
// // // //     const result = await cloudinary.search
// // // //       .expression("folder:Crowd_Detection")
// // // //       .sort_by("created_at", "desc")
// // // //       .max_results(100)
// // // //       .execute();

// // // //     // Extract useful info for each image
// // // //     const images = result.resources.map(img => ({
// // // //       url: img.secure_url,
// // // //       created_at: img.created_at,
// // // //       public_id: img.public_id
// // // //     }));

// // // //     res.json(images);
// // // //   } catch (err) {
// // // //     console.error("❌ Error fetching images:", err);
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // ===== Start Server =====
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () =>
// // // //   console.log(`🚀 Server running on http://localhost:${PORT}`)
// // // // );




// // const express = require("express");
// // const cors = require("cors");
// // const cloudinary = require("cloudinary").v2;

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // ===== Cloudinary Configuration =====
// // cloudinary.config({
// //   cloud_name: "dprwjya79",
// //   api_key: "623441469282272",
// //   api_secret: "paiJZ5_PRNSQl3SnBWk-S7a1K98"
// // });

// // // ===== API Route: Get all images from Crowd_Detection folder =====
// // app.get("/api/frames", async (req, res) => {
// //   try {
// //     // Search images in the folder "Crowd_Detection"
// //     const result = await cloudinary.search
// //       .expression("folder:Crowd_Detection")
// //       .sort_by("created_at", "desc")
// //       .max_results(100)
// //       .execute();

// //     // Extract secure URLs
// //     const frames = result.resources.map(img => ({
// //       url: img.secure_url,
// //       created_at: img.created_at,
// //       public_id: img.public_id
// //     }));

// //     res.json(frames);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ===== API Route: Get images for specific cameras =====
// // app.get("/api/camera-images", async (req, res) => {
// //   try {
// //     // Get all images from the folder
// //     const result = await cloudinary.search
// //       .expression("folder:Crowd_Detection")
// //       .sort_by("created_at", "desc")
// //       .max_results(100)
// //       .execute();

// //     // Create a mapping of camera names to their latest images
// //     const cameraImages = {};
    
// //     result.resources.forEach(img => {
// //       // Extract camera name from the public_id (assuming format: folder/camera-name_timestamp)
// //       const parts = img.public_id.split('/');
// //       const filename = parts[1] || parts[0];
// //       const cameraName = filename.split('_')[0]; // Get camera name before underscore
      
// //       // Only keep the latest image for each camera
// //       if (!cameraImages[cameraName] || new Date(img.created_at) > new Date(cameraImages[cameraName].created_at)) {
// //         cameraImages[cameraName] = {
// //           url: img.secure_url,
// //           created_at: img.created_at,
// //           public_id: img.public_id
// //         };
// //       }
// //     });

// //     res.json(cameraImages);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ===== Start Server =====
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));





// const mongoose = require("mongoose");

// // MongoDB connection
// const MONGO_URI =
//   "mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority";

// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected for CRM Details"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // CRM Details Schema
// const CrmDetailsSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String, // image URL or file path
//       required: false,
//     },
//     lastSeen: {
//       type: Date,
//       required: false,
//     },
//     district: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [ "missing", "criminal"],
//       default: "missing",
//     },
//     additionalDetails: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true, // createdAt & updatedAt
//     collection: "crm_details",
//   }
// );

// // Model
// const CrmDetails = mongoose.model("CrmDetails", CrmDetailsSchema);

// module.exports = CrmDetails;






const mongoose = require("mongoose");

// MongoDB URL
const MONGO_URI =
  "mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema (same as before)
const CrmDetailsSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    image: String,
    lastSeen: Date,
    district: String,
    status: String,
    additionalDetails: String,
  },
  {
    timestamps: true,
    collection: "crm_details",
  }
);

// Model
const CrmDetails = mongoose.model("CrmDetails", CrmDetailsSchema);

// Insert Data
async function insertData() {
  try {
    const data = new CrmDetails({
      name: "Kishore",
      age: 20,
      image:
        "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1768157146/abi_msszim.jpg",
      lastSeen: new Date("2026-01-05T14:30:00.000Z"),
      district: "Chennai",
      status: "criminal",
      additionalDetails:
        "Last seen near bus stand wearing blue shirt",
    });

    await data.save();
    console.log("✅ Data inserted successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Insert failed:", error);
    mongoose.connection.close();
  }
}

insertData();
