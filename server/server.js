const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

mongoose
  .connect("mongodb://localhost:27017/blog-preview", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
