import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SECRET_KEY = "secret12345";

export const loginController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isVerify = await bcrypt.compare(req.body.password, user.password);

    if (!isVerify) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: "Пользователь не найден",
    });
  }
};
