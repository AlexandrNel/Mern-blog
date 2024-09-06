import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { registerValidation } from "../utils/registerValidation.js";
import {
  getMe,
  registerController,
  loginController,
} from "../controllers/index.js";

export const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, registerController);

authRouter.post("/auth/login", loginController);

authRouter.post("/auth/me", checkAuth, getMe);
