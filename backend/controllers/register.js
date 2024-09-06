import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SECRET_KEY = "secret12345";

export const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json(errors.array());
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      password: passwordHash,
      awatarUrl: req.body.awatarUrl,
    });
    const user = await doc.save();
    const { password, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Success",
      data: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};
