import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const otpStore = new Map();

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const signUp = async (req, res) => {
  try {
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
      .cookie("token", token, cookieOptions)
      .json({ success: true, message: "User Registered", token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ success: true, message: "Login successful!", token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpStore.set(email, {
      otp,
      expiry: Date.now() + 15 * 60 * 1000
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. This OTP will expire in 15 minutes.`
      });

      res.json({ message: "OTP sent successfully" });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      otpStore.delete(email); // Clean up OTP if email fails
      res.status(500).json({ message: "Failed to send OTP email" });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: "Server error while sending OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (storedData.otp !== otp || Date.now() > storedData.expiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    otpStore.delete(email);
    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: "Server error while verifying OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: "Server error while resetting password" });
  }
};
