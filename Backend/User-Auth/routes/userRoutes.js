import express from "express";
import {
  initiateSignUp,
  verifyEmail,
  signIn,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getReferralCode,
  getRewards,
  applyReward,
  getProfile, // Added
  updateProfile, // Added
} from "../controllers/userController.js";
import {
  getAllUsers,
  assignTrainer,
  updateMembership,
  getUserProgress,
  getTrainers,
  addUserActivity,
  updateUserDetails,
  getAllActivities,
} from "../controllers/adminController.js";
import protect, { ensureAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Existing Routes
router.post("/initiate-signup", initiateSignUp);
router.get("/verify-email/:token", verifyEmail);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

// New Routes for Issue 2.2 (Referral System)
router.get("/referral", protect, getReferralCode);
router.get("/rewards", protect, getRewards);
router.post("/rewards/apply", protect, applyReward);

// New Routes for User Profile (Added)
router.get("/profile", protect, getProfile); // Fetch user profile
router.put("/profile", protect, updateProfile); // Update user profile

// New Routes for Issue 2.1 (Admin Panel)
router.get("/admin/users", protect, ensureAdmin, getAllUsers);
router.put("/admin/users/:id/assign-trainer", protect, ensureAdmin, assignTrainer);
router.put("/admin/users/:id/membership", protect, ensureAdmin, updateMembership);
router.get("/admin/users/:id/progress", protect, ensureAdmin, getUserProgress);
router.post("/admin/users/:id/activity", protect, ensureAdmin, addUserActivity);
router.put("/admin/users/:id/details", protect, ensureAdmin, updateUserDetails);
router.get("/admin/activities", protect, ensureAdmin, getAllActivities);
router.get("/trainers", protect, getTrainers); // Trainers sabke liye accessible

export default router;