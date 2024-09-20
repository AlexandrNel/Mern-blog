import express from "express";
import Post from "../models/post.js";
import mongoose from "mongoose";
import { checkAuth } from "../middlewares/index.js";
const router = express.Router();
router.get("/tags", async (req, res) => {
  try {
    const posts = await Post.find();
    const tags = posts.map((post) => {
      return post.tags[0];
    });

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error",
    });
  }
});

export default router;
