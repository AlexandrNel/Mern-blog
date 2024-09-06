import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation } from "../utils/registerValidation.js";
import UserModel from "../models/user.js";
import { registerController } from "../controllers/register.js";

const SECRET_KEY = "secret12345";
export const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, registerController);

authRouter.post("/auth/login", (req, res) => {
  //  find user by email/login
  //  check password (decode pass and match)
  //  create user
  //  create JWT
  //  send data with token
});

authRouter.post("/auth/me", (req, res) => {});
