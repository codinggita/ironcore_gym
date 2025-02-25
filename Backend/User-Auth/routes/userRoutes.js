import express from "express";
import {
  initiateSignUp,
  verifySignUpOTP,
  signIn,
  forgotPassword,
  verifyOTP,
  resetPassword
} from "../controllers/userController.js";

const router = express.Router();

router.post("/initiate-signup", initiateSignUp);
router.post("/verify-signup-otp", verifySignUpOTP);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;