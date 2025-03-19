import User from "../models/userModel.js";
import Trainer from "../models/trainerModel.js";
import Activity from "../models/activityModel.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const users = await User.find().populate("trainer", "name specialty");
    res.json(
      users.map((user) => ({
        _id: user._id,
        email: user.email,
        name: user.name || "N/A",
        contact: user.contact || "N/A",
        fitnessGoals: user.fitnessGoals || "N/A",
        workoutPreferences: user.workoutPreferences || "N/A",
        bodyMeasurements: user.bodyMeasurements || {},
        membership: user.membership,
        trainer: user.trainer || null,
        role: user.role,
        createdAt: user.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Assign trainer to user (Admin only)
export const assignTrainer = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const { trainerId } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (trainerId) {
      const trainer = await Trainer.findById(trainerId);
      if (!trainer) return res.status(404).json({ message: "Trainer not found" });
      user.trainer = trainerId;
      await Trainer.findByIdAndUpdate(trainerId, { $addToSet: { assignedUsers: userId } });
    } else {
      if (user.trainer) {
        await Trainer.findByIdAndUpdate(user.trainer, { $pull: { assignedUsers: userId } });
      }
      user.trainer = null;
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate("trainer", "name specialty");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error assigning trainer", error: error.message });
  }
};

// Update membership (Admin only)
export const updateMembership = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const { status, plan } = req.body;
    if (!status) return res.status(400).json({ message: "Membership status is required" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let expiry;
    if (status === "active") {
      const now = new Date();
      expiry = plan === "yearly" ? new Date(now.setFullYear(now.getFullYear() + 1)) : new Date(now.setMonth(now.getMonth() + 1));
    } else {
      expiry = null;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { membership: { status, plan: plan || user.membership.plan, expiry, discount: 0 } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating membership", error: error.message });
  }
};

// Get user progress (Admin only)
export const getUserProgress = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const progress = await Activity.find({ userId: req.params.id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error: error.message });
  }
};

// Add user activity (Admin only)
export const addUserActivity = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const { userId, type, workout } = req.body;
    if (!userId || !type) return res.status(400).json({ message: "User ID and type are required" });
    if (type === "workout" && !workout) return res.status(400).json({ message: "Workout name is required for workout type" });

    const activity = await Activity.create({
      userId,
      type,
      workout: type === "workout" ? workout : undefined,
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Error adding activity", error: error.message });
  }
};

// Get all trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate("assignedUsers", "name");
    res.json(
      trainers.map((trainer) => ({
        _id: trainer._id,
        name: trainer.name,
        specialty: trainer.specialty,
        assignedUsersCount: trainer.assignedUsers.length
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainers", error: error.message });
  }
};

// Get all activities (Admin only)
export const getAllActivities = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error: error.message });
  }
};

// Update user details (Admin only) - Merged and Fixed
export const updateUserDetails = async (req, res) => {
    try {
      if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
      const userId = req.params.id; // Correctly use 'id' from route
      const { name, email, contact, fitnessGoals, workoutPreferences, bodyMeasurements } = req.body;
  
      console.log("Updating User:", userId, "with data:", req.body); // Debug log
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Update only provided fields
      const updatedFields = {};
      if (name !== undefined) updatedFields.name = name;
      if (email !== undefined) updatedFields.email = email;
      if (contact !== undefined) updatedFields.contact = contact;
      if (fitnessGoals !== undefined) updatedFields.fitnessGoals = fitnessGoals;
      if (workoutPreferences !== undefined) updatedFields.workoutPreferences = workoutPreferences;
      if (bodyMeasurements !== undefined) {
        updatedFields.bodyMeasurements = {
          ...user.bodyMeasurements, // Preserve existing fields if not provided
          ...bodyMeasurements,
        };
      }
  
      Object.assign(user, updatedFields);
      await user.save();
  
      const updatedUser = await User.findById(userId).populate("trainer", "name specialty");
      res.json(updatedUser);
    } catch (error) {
      console.error("Update User Error:", error); // Debug log
      res.status(500).json({ message: "Error updating user details", error: error.message });
    }
  };