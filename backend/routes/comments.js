import express from "express";
import Comment from "../models/comments.js";
import Post from "../models/post.js";
import mongoose from "mongoose";
import { checkAuth } from "../middlewares/index.js";
const router = express.Router();
router.post("/comments", checkAuth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.body.post }).exec();
    const doc = new Comment({
      post: req.body.post,
      autor: req.userId,
      content: req.body.content,
      parentComment: req.body.parentComment,
    });
    const comment = await doc.save();
    post.comments.push(comment._id);
    post.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Не удалось создать комментарий",
    });
  }
});

export default router;
