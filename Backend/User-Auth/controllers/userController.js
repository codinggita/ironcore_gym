import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const tempUsers = new Map();

export const initiateSignUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  
  tempUsers.set(email, {
    password,
    otp,
    createdAt: new Date()
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Signup Verification OTP',
      text: `Your OTP for signup verification is: ${otp}. This OTP will expire in 10 minutes.`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifySignUpOTP = async (req, res) => {
  const { email, otp } = req.body;
  
  const userData = tempUsers.get(email);
  
  if (!userData) {
    return res.status(400).json({ message: "Invalid or expired OTP request" });
  }

  if (userData.otp.toString() !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() - userData.createdAt > 10 * 60 * 1000) {
    tempUsers.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  try {
    const user = await User.create({ 
      email, 
      password: userData.password 
    });

    tempUsers.delete(email);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: "7d" 
    });

    res.status(201)
      .cookie("token", token, { 
        httpOnly: true, 
        sameSite: "None", 
        secure: true 
      })
      .json({ 
        success: true, 
        message: "User Registered Successfully", 
        token 
      });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: "Error creating user" });
  }
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 2 * 60 * 1000; // 2 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 2 minutes.`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};