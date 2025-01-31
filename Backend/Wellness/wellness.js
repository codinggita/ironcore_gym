import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('wellness.env') }); // Load environment variables from the correct file

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Schema for the "wellness" collection
const wellnessSchema = new mongoose.Schema(
  {
    age: Number,
    gender: String,
    bmi: Number,
    bmiStatus: String,
    dietGoal: String,
    foodPreferences: String,
    fitnessLevel: String,
    limitations: { type: String, default: 'None' }, // Optional
    dietPlan: String, // Placeholder for AI diet plan (not implemented yet)
  },
  { collection: 'wellness' } // Specify the collection name
);

const Wellness = mongoose.model('Wellness', wellnessSchema);

// BMI Calculation Function
const calculateBMI = (weight, height, unitType) => {
  let heightInMeters = 0;
  if (unitType === 'inches') {
    heightInMeters = height * 0.0254;
  } else if (unitType === 'cm') {
    heightInMeters = height / 100;
  }

  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi;
};

// BMI Status Calculation Function
const calculateBMIStatus = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal weight';
  if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
  return 'Obesity';
};

// Part 1: BMI Calculator (POST)
app.post('/calculate-bmi', async (req, res) => {
  const { weight, height, heightUnit } = req.body;

  // Validate input
  if (!weight || !height || !heightUnit) {
    return res.status(400).json({ message: 'Please provide weight, height, and height unit.' });
  }

  // Calculate BMI and BMI status
  const bmi = calculateBMI(weight, height, heightUnit);
  const bmiStatus = calculateBMIStatus(bmi);

  res.json({ bmi, bmiStatus });
});

// Part 2: User Details Submission (POST) 
// User provides Age, Gender, BMI, BMI status, Diet goal, food preferences, fitness level, and limitations.
app.post('/user-details', async (req, res) => {
  const {
    age,
    gender,
    bmi,
    bmiStatus,
    dietGoal,
    foodPreferences,
    fitnessLevel,
    limitations,
  } = req.body;

  // Validate input (bmi and bmiStatus should come from the first part)
  if (!age || !gender || !bmi || !bmiStatus || !dietGoal || !foodPreferences || !fitnessLevel) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Save user details in the database
  const newUser = new Wellness({
    age,
    gender,
    bmi,
    bmiStatus,
    dietGoal,
    foodPreferences,
    fitnessLevel,
    limitations,
    dietPlan: 'Your personalized diet plan will be generated here.', // Placeholder
  });

  try {
    const savedUser = await newUser.save();
    res.json({ message: 'User details saved successfully.', userId: savedUser._id });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

// Part 3: Get User Details (GET) 
// User can retrieve the data they entered in the second part using their user ID.
app.get('/get-user-details/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Wellness.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user data along with diet plan
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

// Run the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));