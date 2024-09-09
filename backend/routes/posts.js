import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { createPostValidation } from "../utils/validations.js";
import { PostController } from "../controllers/index.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.post(
  "/posts",
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.create
);
router.patch(
  "/posts/:id",
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.update
);
router.delete("/posts/:id", checkAuth, PostController.remove);

export default router;
