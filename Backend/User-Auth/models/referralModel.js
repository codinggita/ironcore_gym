import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referredId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  rewardApplied: { type: Boolean, default: false }
});

const Referral = mongoose.model("Referral", referralSchema);
export default Referral;