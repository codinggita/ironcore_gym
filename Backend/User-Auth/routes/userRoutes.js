import express from "express";
import {
  initiateSignUp,
  verifyEmail,
  signIn,
  forgotPassword,
  verifyOTP,
  resetPassword
} from "../controllers/userController.js";

const router = express.Router();

router.post("/initiate-signup", initiateSignUp);
router.get("/verify-email/:token", verifyEmail);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;