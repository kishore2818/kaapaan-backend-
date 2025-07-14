

// // const express = require('express');
// // const fs = require('fs');
// // const path = require('path');
// // const cors = require('cors');
// // const mongoose = require('mongoose');

// // const app = express();
// // const port = 5000;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Serve videos
// // const videosDir = path.join(__dirname, 'output_videos');
// // app.use('/output_videos', express.static(videosDir));

// // // MongoDB Connection
// // const MONGO_URI = 'mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority';
// // mongoose.connect(MONGO_URI)
// //   .then(() => console.log('✅ MongoDB Connected'))
// //   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // const violationSchema = new mongoose.Schema({
// //   imageUrl: String,
// //   plateImageUrl: String, // 🆕 Number plate image URL
// //   violationType: String,
// //   analyzedAt: Date,
// //   videoFilename: String,
// //   noHelmet: Number,
// //   phoneUsage: Number,
// //   tripling: Number,
// //   wrongway: Number,
// //   fire: Number,          // 🆕
// //   noPlate: Number,       // 🆕
// //   smoking: Number,       // 🆕
// //   stuntRiding: Number,   // 🆕
// //   triples: Number,       // 🆕
// //   withHelmet: Number,    // 🆕
// //   withoutHelmet: Number, // 🆕
// //   verified: Boolean
// // });


// // const Violation = mongoose.model('Violation', violationSchema, 'violations');

// // // ✅ Schema - Details Collection
// // const detailSchema = new mongoose.Schema({
// //   username: String,
// //   password: String
// // });
// // const Detail = mongoose.model('Detail', detailSchema, 'details');



// // const formatViolation = (v) => {
// //   const derivedTypes = [];
// //   if (v.noHelmet > 0) derivedTypes.push('No Helmet');
// //   if (v.phoneUsage > 0) derivedTypes.push('Phone Usage');
// //   if (v.tripling > 0) derivedTypes.push('Triple Riding');
// //   if (v.wrongway > 0) derivedTypes.push('Wrong Way');
// //   if (v.fire > 0) derivedTypes.push('Fire');
// //   if (v.noPlate > 0) derivedTypes.push('No Plate');
// //   if (v.smoking > 0) derivedTypes.push('Smoking');
// //   if (v.stuntRiding > 0) derivedTypes.push('Stunt Riding');
// //   if (v.triples > 0) derivedTypes.push('Triples');
// //   if (v.withHelmet > 0) derivedTypes.push('With Helmet');
// //   if (v.withoutHelmet > 0) derivedTypes.push('Without Helmet');
// //   if (derivedTypes.length === 0) derivedTypes.push('Unknown');

// //   return {
// //     _id: v._id,
// //     imageUrl: v.imageUrl,
// //     plateImageUrl: v.plateImageUrl || null,
// //     analyzedAt: v.analyzedAt,
// //     violationType: derivedTypes,
// //     videoFilename: v.videoFilename || null,
// //     verified: v.verified || false,
// //     noHelmet: v.noHelmet || 0,
// //     phoneUsage: v.phoneUsage || 0,
// //     tripling: v.tripling || 0,
// //     wrongway: v.wrongway || 0,
// //     fire: v.fire || 0,
// //     noPlate: v.noPlate || 0,
// //     smoking: v.smoking || 0,
// //     stuntRiding: v.stuntRiding || 0,
// //     triples: v.triples || 0,
// //     withHelmet: v.withHelmet || 0,
// //     withoutHelmet: v.withoutHelmet || 0
// //   };
// // };




// // // GET: all violations
// // app.get('/api/violations/all', async (req, res) => {
// //   try {
// //     const violations = await Violation.find().sort({ analyzedAt: -1 });
// //     res.json(violations.map(formatViolation));
// //   } catch (error) {
// //     console.error('❌ Error fetching all violations:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // GET: latest 100 violations
// // app.get('/api/violations', async (req, res) => {
// //   try {
// //     const violations = await Violation.find().sort({ analyzedAt: -1 }).limit(100);
// //     res.json(violations.map(formatViolation));
// //   } catch (error) {
// //     console.error('❌ Error fetching violations:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });


// // app.post('/api/violations', async (req, res) => {
// //   try {
// //     const { imageUrl, labels, videoFilename, plateImageUrl } = req.body;

// //     // Initialize all to zero
// //     let violationFields = {
// //       noHelmet: 0,
// //       phoneUsage: 0,
// //       tripling: 0,
// //       wrongway: 0,
// //       fire: 0,
// //       noPlate: 0,
// //       smoking: 0,
// //       stuntRiding: 0,
// //       triples: 0,
// //       withHelmet: 0,
// //       withoutHelmet: 0
// //     };

// //     // Fill based on labels
// //     if (Array.isArray(labels)) {
// //       labels.forEach(label => {
// //         if (label === 'no_helmet') violationFields.noHelmet = 1;
// //         if (label === 'phone_usage') violationFields.phoneUsage = 1;
// //         if (label === 'triple_riding') violationFields.tripling = 1;
// //         if (label === 'wrong_way') violationFields.wrongway = 1;
// //         if (label === 'fire') violationFields.fire = 1;
// //         if (label === 'no_plate') violationFields.noPlate = 1;
// //         if (label === 'smoking') violationFields.smoking = 1;
// //         if (label === 'stunt_riding') violationFields.stuntRiding = 1;
// //         if (label === 'triples') violationFields.triples = 1;
// //         if (label === 'with_helmet') violationFields.withHelmet = 1;
// //         if (label === 'without_helmet') violationFields.withoutHelmet = 1;
// //       });
// //     }

// //     // Prevent duplicates
// //     const alreadyExists = await Violation.findOne({ videoFilename, imageUrl });
// //     if (alreadyExists) {
// //       console.log('⛔ Duplicate violation skipped for video:', videoFilename);
// //       return res.status(200).json({ message: 'Duplicate violation skipped' });
// //     }

// //     const newViolation = new Violation({
// //       imageUrl,
// //       plateImageUrl: plateImageUrl || null,
// //       violationType: 'Multiple',
// //       analyzedAt: new Date(),
// //       videoFilename,
// //       ...violationFields,
// //       verified: false
// //     });

// //     await newViolation.save();
// //     console.log('✅ Violation saved for video:', videoFilename);
// //     res.status(201).json({ message: 'Violation saved successfully' });
// //   } catch (error) {
// //     console.error('❌ Error saving violation:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });




// // // GET: list of available videos
// // app.get('/api/videos', (req, res) => {
// //   fs.readdir(videosDir, (err, files) => {
// //     if (err) {
// //       return res.status(500).json({ error: 'Failed to read videos folder' });
// //     }
// //     const videoFiles = files.filter(file => {
// //       const ext = path.extname(file).toLowerCase();
// //       return ['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext);
// //     });

// //     const videoUrls = videoFiles.map(file => ({
// //       name: file,
// //       url: `http://localhost:${port}/output_videos/${file}`
// //     }));

// //     res.json(videoUrls);
// //   });
// // });

// // // GET: related photos for video
// // app.get('/api/photos', async (req, res) => {
// //   try {
// //     const { videoName } = req.query;
// //     if (!videoName) {
// //       return res.status(400).json({ message: 'Video name is required' });
// //     }

// //     const relatedPhotos = await Violation.find(
// //       { videoFilename: videoName },
// //       { imageUrl: 1, violationType: 1, _id: 0 }
// //     );

// //     res.json(relatedPhotos);
// //   } catch (error) {
// //     console.error('❌ Error fetching related photos:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // GET: violations filtered by date range
// // app.get('/api/violations/filter', async (req, res) => {
// //   try {
// //     const { startDate, endDate } = req.query;

// //     const filter = {};
// //     if (startDate && endDate) {
// //       filter.analyzedAt = {
// //         $gte: new Date(startDate),
// //         $lte: new Date(endDate)
// //       };
// //     }

// //     const violations = await Violation.find(filter).sort({ analyzedAt: -1 });
// //     res.json(violations.map(formatViolation));
// //   } catch (error) {
// //     console.error("❌ Error filtering violations:", error);
// //     res.status(500).json({ message: "Failed to filter violations" });
// //   }
// // });

// // // GET: latest 10 violation photos
// // app.get('/api/photos/latest', async (req, res) => {
// //   try {
// //     const latestPhotos = await Violation.find(
// //       {},
// //       { imageUrl: 1, violationType: 1, analyzedAt: 1, _id: 0 }
// //     ).sort({ analyzedAt: -1 }).limit(10);

// //     res.json(latestPhotos);
// //   } catch (error) {
// //     console.error('❌ Error fetching latest photos:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // GET: all reports
// // app.get('/api/reports/all', async (req, res) => {
// //   try {
// //     const reportData = await Violation.find({}, {
// //       imageUrl: 1,
// //       violationType: 1,
// //       analyzedAt: 1,
// //       _id: 0
// //     }).sort({ analyzedAt: -1 });

// //     res.json(reportData);
// //   } catch (error) {
// //     console.error('❌ Error fetching report data:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // PATCH: update verified status of one violation
// // app.patch('/api/violations/:id/verify', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { verified } = req.body;

// //     const updatedViolation = await Violation.findByIdAndUpdate(
// //       id,
// //       { verified },
// //       { new: true }
// //     );

// //     if (!updatedViolation) {
// //       return res.status(404).json({ message: 'Violation not found' });
// //     }

// //     res.json({ message: 'Verified status updated', updatedViolation });
// //   } catch (error) {
// //     console.error('❌ Error updating verified status:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });

// // // PATCH: update verified status of multiple violations
// // app.patch('/api/violations/verify-multiple', async (req, res) => {
// //   try {
// //     const { ids } = req.body;

// //     if (!Array.isArray(ids) || ids.length === 0) {
// //       return res.status(400).json({ message: 'Invalid or missing ids' });
// //     }

// //     const result = await Violation.updateMany(
// //       { _id: { $in: ids } },
// //       { $set: { verified: true } }
// //     );

// //     res.json({ message: 'Violations verified successfully', result });
// //   } catch (error) {
// //     console.error('❌ Error verifying multiple violations:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });


// // // ✅ NEW: GET all details
// // app.get('/api/details', async (req, res) => {
// //   try {
// //     const users = await Detail.find({});
// //     res.json(users);
// //   } catch (error) {
// //     console.error('❌ Error fetching details:', error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });


// // app.post('/api/login', async (req, res) => {
// //   const { username, password } = req.body;

// //   try {
// //     console.log('Login attempt:', username, password);

// //     const user = await Detail.findOne({ username, password });
// //     console.log('Found user:', user);

// //     if (user) {
// //       res.status(200).json({ message: 'Login successful', user });
// //     } else {
// //       res.status(401).json({ message: 'Invalid username or password' });
// //     }
// //   } catch (err) {
// //     console.error('Login error:', err);
// //     res.status(500).json({ message: 'Server error', error: err.message });
// //   }
// // });

// // // Start server
// // app.listen(port, () => {
// //   console.log(`🚀 Server running on http://localhost:${port}`);
// // });






// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve videos
// const videosDir = path.join(__dirname, 'output_videos');
// app.use('/output_videos', express.static(videosDir));

// // MongoDB Connection
// const MONGO_URI = 'mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority';
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// const violationSchema = new mongoose.Schema({
//   imageUrl: String,
//   plateImageUrl: String,
//   violationType: String,
//   analyzedAt: Date,
//   videoFilename: String,
//   noHelmet: Number,
//   phoneUsage: Number,
//   tripling: Number,
//   wrongway: Number,
//   fire: Number,
//   noPlate: Number,
//   smoking: Number,
//   stuntRiding: Number,
//   triples: Number,
//   withHelmet: Number,
//   withoutHelmet: Number,
//   verified: Boolean,
//   publicId: String,       // Cloudinary public ID for main image
//   platePublicId: String   // Cloudinary public ID for plate image
// });

// const Violation = mongoose.model('Violation', violationSchema, 'violations');

// // ✅ Schema - Details Collection
// const detailSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });
// const Detail = mongoose.model('Detail', detailSchema, 'details');
// // const Detail = mongoose.model('Detail', detailSchema, 'police_ids');


// const formatViolation = (v) => {
//   const derivedTypes = [];
//   if (v.noHelmet > 0) derivedTypes.push('No Helmet');
//   if (v.phoneUsage > 0) derivedTypes.push('Phone Usage');
//   if (v.tripling > 0) derivedTypes.push('Triple Riding');
//   if (v.wrongway > 0) derivedTypes.push('Wrong Way');
//   if (v.fire > 0) derivedTypes.push('Fire');
//   if (v.noPlate > 0) derivedTypes.push('No Plate');
//   if (v.smoking > 0) derivedTypes.push('Smoking');
//   if (v.stuntRiding > 0) derivedTypes.push('Stunt Riding');
//   if (v.triples > 0) derivedTypes.push('Triples');
//   if (v.withHelmet > 0) derivedTypes.push('With Helmet');
//   if (v.withoutHelmet > 0) derivedTypes.push('Without Helmet');
//   if (derivedTypes.length === 0) derivedTypes.push('Unknown');

//   return {
//     _id: v._id,
//     imageUrl: v.imageUrl,
//     plateImageUrl: v.plateImageUrl || null,
//     analyzedAt: v.analyzedAt,
//     violationType: derivedTypes,
//     videoFilename: v.videoFilename || null,
//     verified: v.verified || false,
//     noHelmet: v.noHelmet || 0,
//     phoneUsage: v.phoneUsage || 0,
//     tripling: v.tripling || 0,
//     wrongway: v.wrongway || 0,
//     fire: v.fire || 0,
//     noPlate: v.noPlate || 0,
//     smoking: v.smoking || 0,
//     stuntRiding: v.stuntRiding || 0,
//     triples: v.triples || 0,
//     withHelmet: v.withHelmet || 0,
//     withoutHelmet: v.withoutHelmet || 0,
//     publicId: v.publicId || null,
//     platePublicId: v.platePublicId || null
//   };
// };

// // GET: Verification stats by officer
// app.get('/api/violations/verified-by', async (req, res) => {
//   try {
//     const result = await Violation.aggregate([
//       { $match: { verified: true, verifiedBy: { $ne: null } } },
//       { $group: { _id: "$verifiedBy", count: { $sum: 1 } } },
//       { $sort: { count: -1 } }
//     ]);
//     res.json(result);
//   } catch (error) {
//     console.error('❌ Error fetching verification stats:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // DELETE: Delete a violation (both MongoDB and Cloudinary)
// app.delete('/api/violations/delete', async (req, res) => {
//   try {
//     const { id, publicId, platePublicId } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: 'Violation ID is required' });
//     }

//     // First delete from MongoDB
//     const deletedViolation = await Violation.findByIdAndDelete(id);
//     if (!deletedViolation) {
//       return res.status(404).json({ message: 'Violation not found in database' });
//     }

//     // Then delete from Cloudinary if public IDs exist
//     if (publicId || platePublicId) {
//       try {
//         const cloudinaryResponse = await fetch('http://localhost:5000/api/cloudinary/delete', {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             publicId,
//             platePublicId
//           }),
//         });

//         if (!cloudinaryResponse.ok) {
//           console.error('Cloudinary deletion failed, but MongoDB record was deleted');
//           // Continue even if Cloudinary deletion fails since MongoDB is already updated
//         }
//       } catch (cloudinaryError) {
//         console.error('Error calling Cloudinary delete:', cloudinaryError);
//         // Continue with the response since MongoDB deletion was successful
//       }
//     }

//     res.status(200).json({ 
//       message: 'Violation deleted successfully',
//       deletedViolation: formatViolation(deletedViolation)
//     });

//   } catch (error) {
//     console.error('❌ Error deleting violation:', error);
//     res.status(500).json({ 
//       message: 'Error deleting violation',
//       error: error.message 
//     });
//   }
// });

// // GET: all violations
// app.get('/api/violations/all', async (req, res) => {
//   try {
//     const violations = await Violation.find().sort({ analyzedAt: -1 });
//     res.json(violations.map(formatViolation));
//   } catch (error) {
//     console.error('❌ Error fetching all violations:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // GET: latest 100 violations
// app.get('/api/violations', async (req, res) => {
//   try {
//     const violations = await Violation.find().sort({ analyzedAt: -1 }).limit(100);
//     res.json(violations.map(formatViolation));
//   } catch (error) {
//     console.error('❌ Error fetching violations:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// app.post('/api/violations', async (req, res) => {
//   try {
//     const { imageUrl, labels, videoFilename, plateImageUrl, publicId, platePublicId } = req.body;

//     // Initialize all to zero
//     let violationFields = {
//       noHelmet: 0,
//       phoneUsage: 0,
//       tripling: 0,
//       wrongway: 0,
//       fire: 0,
//       noPlate: 0,
//       smoking: 0,
//       stuntRiding: 0,
//       triples: 0,
//       withHelmet: 0,
//       withoutHelmet: 0
//     };

//     // Fill based on labels
//     if (Array.isArray(labels)) {
//       labels.forEach(label => {
//         if (label === 'no_helmet') violationFields.noHelmet = 1;
//         if (label === 'phone_usage') violationFields.phoneUsage = 1;
//         if (label === 'triple_riding') violationFields.tripling = 1;
//         if (label === 'wrong_way') violationFields.wrongway = 1;
//         if (label === 'fire') violationFields.fire = 1;
//         if (label === 'no_plate') violationFields.noPlate = 1;
//         if (label === 'smoking') violationFields.smoking = 1;
//         if (label === 'stunt_riding') violationFields.stuntRiding = 1;
//         if (label === 'triples') violationFields.triples = 1;
//         if (label === 'with_helmet') violationFields.withHelmet = 1;
//         if (label === 'without_helmet') violationFields.withoutHelmet = 1;
//       });
//     }

//     // Prevent duplicates
//     const alreadyExists = await Violation.findOne({ videoFilename, imageUrl });
//     if (alreadyExists) {
//       console.log('⛔ Duplicate violation skipped for video:', videoFilename);
//       return res.status(200).json({ message: 'Duplicate violation skipped' });
//     }

//     const newViolation = new Violation({
//       imageUrl,
//       plateImageUrl: plateImageUrl || null,
//       violationType: 'Multiple',
//       analyzedAt: new Date(),
//       videoFilename,
//       ...violationFields,
//       verified: false,
//       publicId: publicId || null,
//       platePublicId: platePublicId || null
//     });

//     await newViolation.save();
//     console.log('✅ Violation saved for video:', videoFilename);
//     res.status(201).json({ message: 'Violation saved successfully' });
//   } catch (error) {
//     console.error('❌ Error saving violation:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // GET: list of available videos
// app.get('/api/videos', (req, res) => {
//   fs.readdir(videosDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to read videos folder' });
//     }
//     const videoFiles = files.filter(file => {
//       const ext = path.extname(file).toLowerCase();
//       return ['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext);
//     });

//     const videoUrls = videoFiles.map(file => ({
//       name: file,
//       url: `http://localhost:${port}/output_videos/${file}`
//     }));

//     res.json(videoUrls);
//   });
// });

// // GET: related photos for video
// app.get('/api/photos', async (req, res) => {
//   try {
//     const { videoName } = req.query;
//     if (!videoName) {
//       return res.status(400).json({ message: 'Video name is required' });
//     }

//     const relatedPhotos = await Violation.find(
//       { videoFilename: videoName },
//       { imageUrl: 1, violationType: 1, _id: 0 }
//     );

//     res.json(relatedPhotos);
//   } catch (error) {
//     console.error('❌ Error fetching related photos:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // GET: violations filtered by date range
// app.get('/api/violations/filter', async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const filter = {};
//     if (startDate && endDate) {
//       filter.analyzedAt = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     }

//     const violations = await Violation.find(filter).sort({ analyzedAt: -1 });
//     res.json(violations.map(formatViolation));
//   } catch (error) {
//     console.error("❌ Error filtering violations:", error);
//     res.status(500).json({ message: "Failed to filter violations" });
//   }
// });

// // GET: latest 10 violation photos
// app.get('/api/photos/latest', async (req, res) => {
//   try {
//     const latestPhotos = await Violation.find(
//       {},
//       { imageUrl: 1, violationType: 1, analyzedAt: 1, _id: 0 }
//     ).sort({ analyzedAt: -1 }).limit(10);

//     res.json(latestPhotos);
//   } catch (error) {
//     console.error('❌ Error fetching latest photos:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // GET: all reports
// app.get('/api/reports/all', async (req, res) => {
//   try {
//     const reportData = await Violation.find({}, {
//       imageUrl: 1,
//       violationType: 1,
//       analyzedAt: 1,
//       _id: 0
//     }).sort({ analyzedAt: -1 });

//     res.json(reportData);
//   } catch (error) {
//     console.error('❌ Error fetching report data:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // PATCH: update verified status of one violation
// app.patch('/api/violations/:id/verify', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { verified } = req.body;

//     const updatedViolation = await Violation.findByIdAndUpdate(
//       id,
//       { verified },
//       { new: true }
//     );

//     if (!updatedViolation) {
//       return res.status(404).json({ message: 'Violation not found' });
//     }

//     res.json({ message: 'Verified status updated', updatedViolation });
//   } catch (error) {
//     console.error('❌ Error updating verified status:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // PATCH: update verified status of multiple violations
// app.patch('/api/violations/verify-multiple', async (req, res) => {
//   try {
//     const { ids } = req.body;

//     if (!Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ message: 'Invalid or missing ids' });
//     }

//     const result = await Violation.updateMany(
//       { _id: { $in: ids } },
//       { $set: { verified: true } }
//     );

//     res.json({ message: 'Violations verified successfully', result });
//   } catch (error) {
//     console.error('❌ Error verifying multiple violations:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // GET all details
// app.get('/api/details', async (req, res) => {
//   try {
//     const users = await Detail.find({});
//     res.json(users);
//   } catch (error) {
//     console.error('❌ Error fetching details:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     console.log('Login attempt:', username, password);

//     const user = await Detail.findOne({ username, password });
//       // const user = await Detail.findOne({ p_id, p_password });

//     console.log('Found user:', user);

//     if (user) {
//       res.status(200).json({ message: 'Login successful', user });
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' });
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });



// // ✅ PATCH: Verify Multiple Violations with police ID
// app.patch('/api/violations/verify-multiple', async (req, res) => {
//   try {
//     const { ids, verifiedBy } = req.body;

//     if (!Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ message: 'Invalid or missing ids' });
//     }

//     const result = await Violation.updateMany(
//       { _id: { $in: ids } },
//       { $set: { verified: true, verifiedBy: verifiedBy || 'Unknown' } }
//     );

//     res.json({ message: 'Violations verified successfully', result });
//   } catch (error) {
//     console.error('❌ Error verifying violations:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // ✅ GET: Verified Violations by Officer ID
// app.get('/api/violations/verified', async (req, res) => {
//   try {
//     const { officerId } = req.query;

//     if (!officerId) {
//       return res.status(400).json({ message: 'Missing officerId in query' });
//     }

//     const violations = await Violation.find({
//       verified: true,
//       verifiedBy: officerId
//     }).sort({ analyzedAt: -1 });

//     res.json(violations.map(formatViolation));
//   } catch (error) {
//     console.error('❌ Error fetching verified violations by officer:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // Start server
// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });




require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Load from .env or fallback
const port = process.env.PORT || 5000;
const backendDomain = process.env.BACKEND_DOMAIN || 'https://kaapaan-backend.onrender.com';
const frontendDomain = process.env.FRONTEND_DOMAIN || 'https://kaapaan-frontend.vercel.app';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nt03625:mzRewbYxcaNBVX3A@clusterdb.ycdxi.mongodb.net/traffic_violation?retryWrites=true&w=majority';

// Middleware
app.use(cors({
  origin: frontendDomain,
  credentials: true,
}));
app.use(express.json());

// Serve videos
const videosDir = path.join(__dirname, 'output_videos');
app.use('/output_videos', express.static(videosDir));

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const violationSchema = new mongoose.Schema({
  imageUrl: String,
  plateImageUrl: String,
  violationType: String,
  analyzedAt: Date,
  videoFilename: String,
  noHelmet: Number,
  phoneUsage: Number,
  tripling: Number,
  wrongway: Number,
  fire: Number,
  noPlate: Number,
  smoking: Number,
  stuntRiding: Number,
  triples: Number,
  withHelmet: Number,
  withoutHelmet: Number,
  verified: Boolean,
  publicId: String,
  platePublicId: String,
  verifiedBy: String,
});

const Violation = mongoose.model('Violation', violationSchema, 'violations');

const detailSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Detail = mongoose.model('Detail', detailSchema, 'details');

const formatViolation = (v) => {
  const derivedTypes = [];
  if (v.noHelmet) derivedTypes.push('No Helmet');
  if (v.phoneUsage) derivedTypes.push('Phone Usage');
  if (v.tripling) derivedTypes.push('Triple Riding');
  if (v.wrongway) derivedTypes.push('Wrong Way');
  if (v.fire) derivedTypes.push('Fire');
  if (v.noPlate) derivedTypes.push('No Plate');
  if (v.smoking) derivedTypes.push('Smoking');
  if (v.stuntRiding) derivedTypes.push('Stunt Riding');
  if (v.triples) derivedTypes.push('Triples');
  if (v.withHelmet) derivedTypes.push('With Helmet');
  if (v.withoutHelmet) derivedTypes.push('Without Helmet');
  if (derivedTypes.length === 0) derivedTypes.push('Unknown');

  return {
    ...v.toObject(),
    violationType: derivedTypes,
  };
};

// Cloudinary delete route (stub)
app.delete('/api/cloudinary/delete', async (req, res) => {
  const { publicId, platePublicId } = req.body;
  try {
    console.log('✅ Cloudinary delete stub: ', publicId, platePublicId);
    return res.status(200).json({ message: 'Stub: Cloudinary delete success' });
  } catch (err) {
    console.error('❌ Cloudinary delete error:', err);
    return res.status(500).json({ message: 'Cloudinary delete failed' });
  }
});

// GET videos with correct backend URL
app.get('/api/videos', (req, res) => {
  fs.readdir(videosDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read videos folder' });

    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext);
    });

    const videoUrls = videoFiles.map(file => ({
      name: file,
      url: `${backendDomain}/output_videos/${file}`
    }));

    res.json(videoUrls);
  });
});



// GET: related photos for video
app.get('/api/photos', async (req, res) => {
  try {
    const { videoName } = req.query;
    if (!videoName) {
      return res.status(400).json({ message: 'Video name is required' });
    }

    const relatedPhotos = await Violation.find(
      { videoFilename: videoName },
      { imageUrl: 1, violationType: 1, _id: 0 }
    );

    res.json(relatedPhotos);
  } catch (error) {
    console.error('❌ Error fetching related photos:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: violations filtered by date range
app.get('/api/violations/filter', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.analyzedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const violations = await Violation.find(filter).sort({ analyzedAt: -1 });
    res.json(violations.map(formatViolation));
  } catch (error) {
    console.error("❌ Error filtering violations:", error);
    res.status(500).json({ message: "Failed to filter violations" });
  }
});

// GET: latest 10 violation photos
app.get('/api/photos/latest', async (req, res) => {
  try {
    const latestPhotos = await Violation.find(
      {},
      { imageUrl: 1, violationType: 1, analyzedAt: 1, _id: 0 }
    ).sort({ analyzedAt: -1 }).limit(10);

    res.json(latestPhotos);
  } catch (error) {
    console.error('❌ Error fetching latest photos:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET: all reports
app.get('/api/reports/all', async (req, res) => {
  try {
    const reportData = await Violation.find({}, {
      imageUrl: 1,
      violationType: 1,
      analyzedAt: 1,
      _id: 0
    }).sort({ analyzedAt: -1 });

    res.json(reportData);
  } catch (error) {
    console.error('❌ Error fetching report data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH: update verified status of one violation
app.patch('/api/violations/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    const updatedViolation = await Violation.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );

    if (!updatedViolation) {
      return res.status(404).json({ message: 'Violation not found' });
    }

    res.json({ message: 'Verified status updated', updatedViolation });
  } catch (error) {
    console.error('❌ Error updating verified status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PATCH: update verified status of multiple violations
app.patch('/api/violations/verify-multiple', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing ids' });
    }

    const result = await Violation.updateMany(
      { _id: { $in: ids } },
      { $set: { verified: true } }
    );

    res.json({ message: 'Violations verified successfully', result });
  } catch (error) {
    console.error('❌ Error verifying multiple violations:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all details
app.get('/api/details', async (req, res) => {
  try {
    const users = await Detail.find({});
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt:', username, password);

    const user = await Detail.findOne({ username, password });
      // const user = await Detail.findOne({ p_id, p_password });

    console.log('Found user:', user);

    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// ✅ PATCH: Verify Multiple Violations with police ID
app.patch('/api/violations/verify-multiple', async (req, res) => {
  try {
    const { ids, verifiedBy } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing ids' });
    }

    const result = await Violation.updateMany(
      { _id: { $in: ids } },
      { $set: { verified: true, verifiedBy: verifiedBy || 'Unknown' } }
    );

    res.json({ message: 'Violations verified successfully', result });
  } catch (error) {
    console.error('❌ Error verifying violations:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ✅ GET: Verified Violations by Officer ID
app.get('/api/violations/verified', async (req, res) => {
  try {
    const { officerId } = req.query;

    if (!officerId) {
      return res.status(400).json({ message: 'Missing officerId in query' });
    }

    const violations = await Violation.find({
      verified: true,
      verifiedBy: officerId
    }).sort({ analyzedAt: -1 });

    res.json(violations.map(formatViolation));
  } catch (error) {
    console.error('❌ Error fetching verified violations by officer:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Additional routes would go here...

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on ${backendDomain || `http://localhost:${port}`}`);
});
