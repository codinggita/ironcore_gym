import { useState } from 'react';
import '../design/Diet.css';

function Diet() {
  // Debugging environment variables
  console.log('All env vars:', import.meta.env);
  const ACCESS_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;
  console.log('ACCESS_TOKEN:', ACCESS_TOKEN);

  const [formData, setFormData] = useState({
    goal: 'weight_loss',
    experience: 'beginner',
    location: 'home',
    equipment: ['none'],
    days: 7, // Default to 7 days
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      equipment: selected,
    }));
  };

  const generatePlan = async () => {
    setLoading(true);
    setResult('');

    const prompt = `Generate a detailed ${formData.days}-day workout plan for a ${formData.experience} level person with a goal of ${formData.goal}. They will workout at ${formData.location} with the following equipment: ${formData.equipment.join(', ') || 'none'}. Include specific exercises, sets, reps, and rest times.`;

    try {
      if (!ACCESS_TOKEN) {
        throw new Error('Hugging Face token is not defined. Check your .env file.');
      }

      console.log('Sending request with prompt:', prompt);

      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { max_new_tokens: 1000 },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const content = data[0]?.generated_text || 'No content generated';
      setResult(content);
    } catch (error) {
      console.error('API Fetch Error:', error);
      setResult(`Error generating plan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="input-section">
        <h1>Workout Plan Generator</h1>

        <div className="form-group">
          <label htmlFor="goal">Fitness Goal:</label>
          <select name="goal" value={formData.goal} onChange={handleInputChange}>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="strength">Strength</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience Level:</label>
          <select name="experience" value={formData.experience} onChange={handleInputChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Workout Preference:</label>
          <select name="location" value={formData.location} onChange={handleInputChange}>
            <option value="home">Home</option>
            <option value="gym">Gym</option>
            <option value="outdoor">Outdoor</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="days">Plan Duration (Days):</label>
          <select name="days" value={formData.days} onChange={handleInputChange}>
            <option value="7">7 Days</option>
            <option value="10">10 Days</option>
            <option value="14">14 Days</option>
            <option value="21">21 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Available Equipment (Ctrl+Click for multiple):</label>
          <select
            name="equipment"
            multiple
            value={formData.equipment}
            onChange={handleEquipmentChange}
          >
            <option value="none">None/Bodyweight</option>
            <option value="dumbbells">Dumbbells</option>
            <option value="resistance_bands">Resistance Bands</option>
            <option value="barbell">Barbell</option>
            <option value="machines">Gym Machines</option>
            <option value="kettlebell">Kettlebell</option>
            <option value="yoga_mat">Yoga Mat</option>
            <option value="pull_up_bar">Pull-Up Bar</option>
            <option value="medicine_ball">Medicine Ball</option>
            <option value="jump_rope">Jump Rope</option>
            <option value="stability_ball">Stability Ball</option>
          </select>
        </div>

        <button onClick={generatePlan}>Generate Workout Plan</button>
        {loading && <div className="loading">Generating your plan... Please wait</div>}
      </div>

      <div className="output-section">
        {result && (
          <div className="result">
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diet;