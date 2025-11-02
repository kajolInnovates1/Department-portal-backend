import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new post
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        const newPost = new Post({ title, description });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
