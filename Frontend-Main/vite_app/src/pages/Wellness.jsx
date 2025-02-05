import React, { useState , useEffect } from 'react';
import "../design/Wellness.css";

const Wellness = () => {
  const [unit, setUnit] = useState("us");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(0);
  const [interpretation, setInterpretation] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bmi: "",
    bmiStatus: "",
    dietGoal: "",
    foodPreferences: "",
    fitnessLevel: "",
    limitations: "",
  });
  const [userId, setUserId] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      let bmiValue;
      if (unit === "us") {
        bmiValue = (703 * weight) / (height * height);
      } else {
        bmiValue = weight / ((height / 100) * (height / 100));
      }
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < 18.5) setInterpretation("Underweight");
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setInterpretation("Normal");
      else if (bmiValue >= 25.0 && bmiValue < 29.9) setInterpretation("Overweight");
      else setInterpretation("Obese");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://wellness-backend-bd6i.onrender.com/user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setUserId(data.userId)
        console.log("Form submitted successfully:", data)
      } else {
        console.error("Error submitting form:", data.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  useEffect(() => {
    if (userId) {
      fetch(`https://wellness-backend-bd6i.onrender.com/get-user-details/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data)
        })
        .catch((error) => console.error("Error fetching user details:", error))
    }
  }, [userId])

  return (
    <>
      <h1 className='bmi-head'>Calculating Body Mass Index (BMI)</h1>
      <p className='bmi-head-p'>
        Calculate your body mass index (BMI) and learn about your weight loss options with the Ironcore Fitness Gym.
        Our experienced team can help you achieve your weight loss goals.
      </p>
      <div className="bmi-calculator">
        <h1>Body Mass Index (BMI) Calculator</h1>
        <p className="description">
          Body mass index (BMI) is a measure of body fat based on weight and height that applies to adult men and women.
        </p>

        <div className="measurement-system">
          <p className="section-title">System of Measurement</p>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="unit"
                checked={unit === "us"}
                onChange={() => setUnit("us")}
              />
              <span className="radio-custom"></span>
              US Customary
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="unit"
                checked={unit === "metric"}
                onChange={() => setUnit("metric")}
              />
              <span className="radio-custom"></span>
              Metric (SI)
            </label>
          </div>
        </div>

        <div className="input-group">
          <label>
            Weight {unit === "us" ? "in pounds (lb):" : "in kilograms (kg):"}
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "us" ? "e.g., 150" : "e.g., 68"}
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Height {unit === "us" ? "in inches (in):" : "in centimeters (cm):"}
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === "us" ? "e.g., 65" : "e.g., 170"}
            />
          </label>
        </div>

        <button className="calculate-button" onClick={calculateBMI}>Generate BMI</button>

        <div className="result">
          <span className="result-label">Your BMI:</span>
          <span className="bmi-value">{bmi || "—"}</span>
        </div>

        <div className="interpretation">
          <p className="interpretation-label">Interpretation:</p>
          <p className="interpretation-text">{interpretation || "Enter your details to calculate BMI"}</p>
        </div>

        <div className="bmi-status">
          <h2>BMI and Weight Status</h2>
          <ul>
            <li><span className="status-range">Below 18.5</span> — Underweight</li>
            <li><span className="status-range">18.5 - 24.9</span> — Normal</li>
            <li><span className="status-range">25.0 - 29.9</span> — Overweight</li>
            <li><span className="status-range">30 and Above</span> — Obese</li>
          </ul>
        </div>
      </div>

      {/* Form */}

      <h1 className='bmi-head-2'>Balanced Diet Chart Generator</h1>
      <p className='bmi-head-p-2'>
        Simplify your meal planning with custom diet charts designed to meet your nutritional needs.
      </p>
      <div className="diet-chart-container">
        <form onSubmit={handleSubmit} className="diet-form">
          <div className="form-group">
            <label>🆔 What is your Age?</label>
            <input type="number" name="age" placeholder="Eg: 22" value={formData.age} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>👤 Choose Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>What is your BMI ?</label>
            <input
              type="text"
              name="bmi"
              placeholder="Eg: 22.5 , 29.8"
              value={formData.bmi}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>What is your BMI Status ?</label>
            <input
              type="text"
              name="bmiStatus"
              placeholder="Eg: Normal"
              value={formData.bmiStatus}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>🎯 Describe your Diet Goal</label>
            <input
              type="text"
              name="dietGoal"
              placeholder="Eg: weight loss"
              value={formData.dietGoal}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>What are your food preferences and style?</label>
            <input
              type="text"
              name="foodPreferences"
              placeholder="Eg: indian style with vegetarian"
              value={formData.foodPreferences}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>What is your current fitness/activity level?</label>
            <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
            </select>
          </div>

          <div className="form-group">
            <label>🤔 Do you have any limitations? (Optional)</label>
            <input
              type="text"
              name="limitations"
              placeholder="Eg: physical limitations, dietary restrictions, etc."
              value={formData.limitations}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="create-button">
            Create Content →
          </button>
        </form>
      </div>

      {/* Diet chart generator */}

      <div className="diet-chart-section">
        <h1 className="main-heading">
          Achieve your health goals with
          <br />
          personalized dietary guidance here.
        </h1>

        <div className="content-wrapper">
        <div className="form-section">
            <h2>Balanced Diet Chart Generator</h2>
            <p className="subtitle">
              Simplify your meal planning with custom diet charts designed to meet your nutritional needs.
            </p>

            <div className="form-questions">
              <div className="question">
                <span className="number">1</span>
                <div className="label-input">
                  <label>📅What is your Age?</label>
                  <input type="text" value={formData.age} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">2</span>
                <div className="label-input">
                  <label>👤Choose Gender</label>
                  <input type="text" value={formData.gender} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">3</span>
                <div className="label-input">
                  <label>What is your BMI ?</label>
                  <input type="text" value={formData.bmi} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">4</span>
                <div className="label-input">
                  <label>What is your BMI Status ?</label>
                  <input type="text" value={formData.bmiStatus} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">5</span>
                <div className="label-input">
                  <label>🎯Describe your Diet Goal</label>
                  <input type="text" value={formData.dietGoal} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">6</span>
                <div className="label-input">
                  <label>🥗What are your food preferences and style?</label>
                  <input type="text" value={formData.foodPreferences} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">7</span>
                <div className="label-input">
                  <label>What is your current fitness/activity level?</label>
                  <input type="text" value={formData.fitnessLevel} readOnly />
                </div>
              </div>

              <div className="question">
                <span className="number">8</span>
                <div className="label-input">
                  <label>⚠Do you have any limitations?</label>
                  <input type="text" value={formData.limitations} readOnly />
                </div>
              </div>
            </div>
          </div>

          <div className="diet-plan-section">
            <p className="plan-intro">
              Based on the information provided, you require about 2000 calories per day to maintain your current weight,
              considering your age, gender, weight, height, and activity level.
            </p>
            <p className="plan-description">
              Here's a simple yet nutritious 7-day vegetarian meal plan for you to follow. This meal plan takes into
              account your personal circumstances, preferences, and daily calorie needs:
            </p>

            <div className="table-container">
              <table className="meal-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                    <th>Snacks</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(7)].map((_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>Bowl of oatmeal with almonds and berries (400 cal)</td>
                      <td>Chickpea curry with brown rice (550 cal)</td>
                      <td>Baked tofu with quinoa and broccoli (600 cal)</td>
                      <td>
                        Apple and a handful of nuts (100 cal)
                        <br />
                        Carrot sticks with hummus (250 cal)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wellness;