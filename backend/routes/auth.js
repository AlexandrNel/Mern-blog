import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { registerValidation } from "../utils/validations.js";
import { authController } from "../controllers/index.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
const router = express.Router();

router.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  authController.register
);
router.post("/auth/login", authController.login);
router.post("/auth/me", checkAuth, authController.getMe);

export default router;
