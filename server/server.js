const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Post = require("./models/Post"); // Adjust path according to your project structure

const app = express();
const PORT = process.env.PORT || 5000;

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/blog-preview", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new post
app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: req.file ? req.file.path : null, // Save the path of the uploaded image
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Your other routes...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
