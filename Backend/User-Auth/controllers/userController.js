import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from 'crypto';

const tempUsers = new Map();
const tempOTPs = new Map();

export const initiateSignUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  tempUsers.set(email, {
    password,
    verificationToken,
    createdAt: new Date()
  });

  // const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;
  const verificationLink = `https://authentication-backend-kbui.onrender.com/api/user/verify-email/${verificationToken}`;

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
      subject: 'Email Verification - IRONCORE GYM',
      html: `
        <h2>Welcome to IRONCORE GYM!</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationLink}" onclick="window.location.href='${verificationLink}'; return false;">Click On This Link To Verify Email</a>
        <p>This link will expire in 30 minutes.</p>
        <script>
          window.location.href = '${verificationLink}';
        </script>
      `
    });

    res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ message: "Error sending verification email" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  
  let userData = null;
  let userEmail = null;
  
  for (const [email, data] of tempUsers.entries()) {
    if (data.verificationToken === token) {
      userData = data;
      userEmail = email;
      break;
    }
  }

  if (!userData || !userEmail) {
    return res.status(400).json({ message: "Invalid or expired verification link" });
  }

  if (new Date() - userData.createdAt > 30 * 60 * 1000) {
    tempUsers.delete(userEmail);
    return res.status(400).json({ message: "Verification link expired" });
  }

  try {
    const user = await User.create({ 
      email: userEmail, 
      password: userData.password,
      isVerified: true
    });

    tempUsers.delete(userEmail);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: "7d" 
    });

    res.redirect(`https://ironcore-gym-2.onrender.com/login?token=${token}`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

  if (!user.isVerified) {
    return res.status(400).json({ message: "Please verify your email before logging in" });
  }

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    tempOTPs.set(email, {
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - IRONCORE GYM',
      html: `
        <h2>Password Reset Request</h2>
        <p>Your One-Time Password (OTP) for password reset is:</p>
        <h3>${otp}</h3>
        <p>This OTP will expire in 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });

    res.json({ message: "OTP sent to your email successfully" });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpData = tempOTPs.get(email);

    if (!otpData) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (new Date() - otpData.createdAt > 15 * 60 * 1000) {
      tempOTPs.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    tempOTPs.set(email, { ...otpData, resetToken });

    res.json({ 
      message: "OTP verified successfully",
      resetToken 
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    
    let userEmail = null;
    let otpData = null;
    
    for (const [email, data] of tempOTPs.entries()) {
      if (data.resetToken === resetToken) {
        userEmail = email;
        otpData = data;
        break;
      }
    }

    if (!userEmail || !otpData) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    if (new Date() - otpData.createdAt > 15 * 60 * 1000) {
      tempOTPs.delete(userEmail);
      return res.status(400).json({ message: "Reset token expired" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save();

    tempOTPs.delete(userEmail);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};