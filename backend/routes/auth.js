import express from "express";
import { validationResult } from "express-validator";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation } from "../utils/registerValidation.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";
import { checkAuth } from "../middlewares/checkAuth.js";
import { registerController } from "../controllers/register.js";
import { loginController } from "../controllers/login.js";
import { getMe } from "../controllers/getMe.js";

const SECRET_KEY = "secret12345";
export const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, registerController);

authRouter.post("/auth/login", loginController);

authRouter.post("/auth/me", checkAuth, getMe);
