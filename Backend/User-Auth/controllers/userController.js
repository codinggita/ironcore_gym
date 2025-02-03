import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User Already Exists" });

  user = await User.create({ email, password });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res
    .status(201)
    .cookie("token", token, { httpOnly: true, sameSite: "None", secure: true })
    .json({ success: true, message: "User Registered", token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res
    .status(200)
    .cookie("token", token, { httpOnly: true, sameSite: "None", secure: true })
    .json({ success: true, message: "Login successful!", token });
};