import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { createPostValidation } from "../utils/validations.js";
import { PostController } from "../controllers/index.js";
import { validationResult } from "express-validator";
import PostSchema from "../models/post.js";
const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.post("/posts", checkAuth, createPostValidation, PostController.create);
router.patch("/posts/:id", checkAuth, PostController.update);
router.delete("/posts/:id", checkAuth, PostController.remove);

export default router;
