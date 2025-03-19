import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from 'crypto';
import Referral from "../models/referralModel.js";

const tempUsers = new Map();
const tempOTPs = new Map();

export const initiateSignUp = async (req, res) => {
  const { email, password, role } = req.body;

  // Password confirmation check removed as it's handled in frontend now
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Store only necessary data in tempUsers
  tempUsers.set(email, {
    password,
    role,
    verificationToken,
    createdAt: new Date(),
  });

  // const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;
  const verificationLink = `https://authentication-backend-kbui.onrender.com/api/user/verify-email/${verificationToken}?email=${encodeURIComponent(email)}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification - IRONCORE GYM",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Welcome to IRONCORE GYM!</h2>
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px;">
            <p style="color: #555;">Please click the button below to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background-color: #4CAF50; color: white; padding: 12px 25px; 
                        text-decoration: none; border-radius: 4px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">This link will expire in 30 minutes.</p>
            <p style="color: #888; font-size: 12px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="background-color: #eee; padding: 10px; word-break: break-all; font-size: 12px;">
              ${verificationLink}
            </p>
          </div>
        </div>
      `,
    });

    res.json({
      success: true,
      message:
        "Verification email sent! Please check your inbox (and spam folder) to verify your account. You'll be redirected to login after verification.",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ message: "Error sending verification email" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const { email } = req.query;

  // Validate inputs
  if (!email || !token) {
    return res.status(400).json({
      success: false,
      message: "Invalid verification link",
    });
  }

  // Find user data in tempUsers
  const userData = tempUsers.get(email);
  if (!userData || userData.verificationToken !== token) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification link",
    });
  }

  // Check expiration (30 minutes)
  const timeDiff = new Date() - new Date(userData.createdAt);
  if (timeDiff > 30 * 60 * 1000) {
    tempUsers.delete(email);
    return res.status(400).json({
      success: false,
      message: "Verification link has expired",
    });
  }

  try {
    // Create new user
    const newUser = new User({
      email: email,
      password: userData.password, // Will be hashed by pre-save hook
      role: userData.role || "user", // Include role from tempUsers
      isVerified: true,
    });
    await newUser.save();

    // Clean up tempUsers
    tempUsers.delete(email);

    // Generate token using model method
    const authToken = newUser.generateAuthToken(); // Uses method from userModel.js

    // Redirect to frontend with token
    res.redirect(
      `https://ironcore-gym-2.onrender.com/signup?verified=true&token=${authToken}&email=${encodeURIComponent(email)}`
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying email. Please try again.",
    });
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

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

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

export const getReferralCode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.referralCode) {
      user.referralCode = 'REF' + crypto.randomBytes(4).toString('hex').toUpperCase();
      await user.save();
    }
    res.json({ referralCode: user.referralCode });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral code" });
  }
};

export const getRewards = async (req, res) => {
  try {
    const referrals = await Referral.find({ referrerId: req.user._id });
    const rewards = referrals.map(r => ({
      referralId: r._id,
      type: 'discount',
      value: 10,
      status: r.rewardApplied ? 'claimed' : 'pending'
    }));
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rewards" });
  }
};

export const applyReward = async (req, res) => {
  try {
    const { referralId } = req.body;
    const referral = await Referral.findById(referralId);
    if (!referral || referral.referrerId.toString() !== req.user._id.toString() || referral.rewardApplied) {
      return res.status(400).json({ message: "Invalid or already claimed reward" });
    }
    const user = await User.findById(req.user._id);
    user.membership.discount = (user.membership.discount || 0) + 10;
    referral.rewardApplied = true;
    await Promise.all([user.save(), referral.save()]);
    res.json({ message: "Reward applied", discount: user.membership.discount });
  } catch (error) {
    res.status(500).json({ message: "Error applying reward" });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Find user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if provided in request body
    user.name = req.body.name || user.name;
    user.contact = req.body.contact || user.contact;
    user.fitnessGoals = req.body.fitnessGoals || user.fitnessGoals;
    user.workoutPreferences = req.body.workoutPreferences || user.workoutPreferences;
    user.bodyMeasurements = req.body.bodyMeasurements || user.bodyMeasurements;

    // Save updated user
    await user.save();

    // Return updated user
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        contact: user.contact,
        fitnessGoals: user.fitnessGoals,
        workoutPreferences: user.workoutPreferences,
        bodyMeasurements: user.bodyMeasurements,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};