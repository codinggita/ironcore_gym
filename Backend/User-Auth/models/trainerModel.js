import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;