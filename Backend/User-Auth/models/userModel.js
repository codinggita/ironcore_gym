import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Added jsonwebtoken import

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    name: { type: String },
    contact: { type: String },
    fitnessGoals: { type: String },
    workoutPreferences: { type: String }, // New field: Cardio, Strength, Yoga, etc.
    bodyMeasurements: {
      weight: { type: Number }, // in kg
      height: { type: Number }, // in cm
      bmi: { type: Number },
      muscleMass: { type: Number }, // in kg
    }, // New field
    membership: {
      status: { type: String, default: "inactive" },
      plan: { type: String, default: "monthly" }, // New field: Monthly, Yearly, etc.
      expiry: Date,
      discount: { type: Number, default: 0 },
    },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
    referralCode: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Password hashing before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role, email: this.email }, // Payload
    process.env.JWT_SECRET, // Secret key from .env
    { expiresIn: "1h" } // Token expiry time
  );
};

const User = mongoose.model("User", userSchema);
export default User;