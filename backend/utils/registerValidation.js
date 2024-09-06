import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("fullName").isLength({ min: 3 }),
  body("password").isLength({ min: 5 }),
  body("imageUrl").optional().isURL(),
];
