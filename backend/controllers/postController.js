import { populate } from "dotenv";
import PostSchema from "../models/post.js";

export const getAll = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const posts = await PostSchema.find()
      .populate({
        path: "user",
        select: ["fullName", "avatarUrl"],
      })
      .sort(sort)
      .exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Не удалось получить найти статьи",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const user = await doc.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    if (postId.match(/^[0-9a-fA-F]{24}$/)) {
      PostSchema.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        }
      )
        .populate({ path: "user", select: ["fullName", "avatarUrl"] })
        .populate({
          path: "comments",
          select: ["-post"],
          populate: { path: "autor", select: ["fullName", "avatarUrl"] },
        })
        .exec()
        .then((doc, err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Не удалось вернуть статью",
            });
          }
          if (!doc) {
            console.log(err);
            return res.status(404).json({
              message: "Статься не найдена",
            });
          }
          res.json(doc);
        });
    } else {
      res.status(500).json({
        error: { id: id.match(/^[0-9a-fA-F]{24}$/) },
        message: "Не удалось получить статью",
      });
    }
    // const post = await PostSchema.findById(postId);
    // res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostSchema.findOneAndDelete({ _id: postId }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      }
      if (!doc) {
        console.log(err);
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostSchema.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
