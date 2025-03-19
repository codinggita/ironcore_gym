import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['workout', 'attendance'], default: 'workout' },
  workout: { type: String }, // Only for workout type
  date: { type: Date, default: Date.now }
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;