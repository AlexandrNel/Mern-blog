import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { registerValidation } from "../utils/registerValidation.js";
import { authController } from "../controllers/index.js";
const { registerController, loginController, getMe } = authController;
export const authRouter = express.Router();

authRouter.post("/register", registerValidation, registerController);

authRouter.post("/login", loginController);

authRouter.post("/me", checkAuth, getMe);
