import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("blogs.env") }); // Load the correct env file

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Schema for the "blog" collection
const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image_url: String,
    uploaded_date: { type: Date, default: Date.now },
  },
  { collection: "blogs" } // Specify the collection name
);

const Blog = mongoose.model("Blog", blogSchema);

// GET route to fetch blog articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await Blog.find(); // Fetch from "blogs" collection
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));