import express from "express";
import { 
  signUp, 
  signIn, 
  forgotPassword, 
  verifyOTP, 
  resetPassword 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;