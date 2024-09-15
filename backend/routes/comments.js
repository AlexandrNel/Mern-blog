import express from "express";
import Comment from "../models/comments.js";
import mongoose from "mongoose";
import { checkAuth } from "../middlewares/index.js";
const router = express.Router();
router.post("/comments", checkAuth, async (req, res) => {
  try {
    const doc = new Comment({
      post: req.body.post,
      autor: req.userId,
      content: req.body.content,
      parentComment: req.body.parentComment,
    });
    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Не удалось создать комментарий",
    });
  }
});

export default router;
