import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve("wellness.env") })

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err))

const wellnessSchema = new mongoose.Schema(
  {
    age: Number,
    gender: String,
    bmi: Number,
    bmiStatus: String,
    dietGoal: String,
    foodPreferences: String,
    fitnessLevel: String,
    limitations: { type: String, default: "None" },
  },
  { collection: "wellness" },
)

const Wellness = mongoose.model("Wellness", wellnessSchema)

app.post("/user-details", async (req, res) => {
  const { age, gender, bmi, bmiStatus, dietGoal, foodPreferences, fitnessLevel, limitations } = req.body

  if (!age || !gender || !bmi || !bmiStatus || !dietGoal || !foodPreferences || !fitnessLevel) {
    return res.status(400).json({ message: "Please provide all required fields." })
  }

  const newUser = new Wellness({
    age,
    gender,
    bmi,
    bmiStatus,
    dietGoal,
    foodPreferences,
    fitnessLevel,
    limitations,
  })

  try {
    const savedUser = await newUser.save()
    res.json({ message: "User details saved successfully.", userId: savedUser._id })
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err })
  }
})

app.get("/get-user-details/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    const user = await Wellness.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))