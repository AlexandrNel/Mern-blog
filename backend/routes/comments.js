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

    const populatedComment = await Comment.findById(comment._id)
      .populate("autor", "fullName avatarUrl")
      .exec();
    res.json(populatedComment);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Не удалось создать комментарий",
    });
  }
});
router.delete("/comments/:id", checkAuth, async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    await Post.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: "Не удалось удалить комментарий" });
  }
});
export default router;
