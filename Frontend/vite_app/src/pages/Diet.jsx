import { useState } from 'react';
import { InferenceClient } from '@huggingface/inference';
import '../design/Diet.css';

function Diet() {
  // Log all environment variables for debugging
  console.log('All env vars:', import.meta.env);
  const ACCESS_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;
  console.log('ACCESS_TOKEN at initialization:', ACCESS_TOKEN);

  const [formData, setFormData] = useState({
    goal: 'weight_loss',
    experience: 'beginner',
    location: 'home',
    equipment: ['none'],
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize client with the token
  const client = new InferenceClient({ token: ACCESS_TOKEN });

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

    const prompt = `Generate a detailed weekly workout plan for a ${formData.experience} level person 
    with a goal of ${formData.goal}. They will workout at ${formData.location} with the following 
    equipment: ${formData.equipment.join(', ')}. Include specific exercises, sets, reps, and rest times.`;

    try {
      console.log('Token in generatePlan:', ACCESS_TOKEN, 'Type:', typeof ACCESS_TOKEN);
      console.log('Client instance:', client);

      if (!ACCESS_TOKEN) {
        throw new Error('Hugging Face token is not defined. Check your .env file.');
      }

      // Use text generation with Hugging Face Inference API
      const response = await client.textGeneration({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
        },
      });

      console.log('API Response:', response);

      const content = response.generated_text || 'No content generated';
      setResult(content);
    } catch (error) {
      console.error('InferenceClient Error:', error);
      setResult('Error with InferenceClient: ' + error.message);

      // Fallback to direct fetch
      console.log('Attempting fallback fetch...');
      try {
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
              parameters: { max_new_tokens: 500 },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Fallback API Response:', data);
        const content = data[0]?.generated_text || JSON.stringify(data);
        setResult(content);
      } catch (fetchError) {
        console.error('Fallback Fetch Error:', fetchError);
        setResult('Error with fallback fetch: ' + fetchError.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Workout Plan Generator</h1>

      <div className="form-group">
        <label htmlFor="goal">Fitness Goal:</label>
        <select name="goal" value={formData.goal} onChange={handleInputChange}>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="strength">Strength</option>
          <option value="endurance">Endurance</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="experience">Experience Level:</label>
        <select name="experience" value={formData.experience} onChange={handleInputChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location">Workout Preference:</label>
        <select name="location" value={formData.location} onChange={handleInputChange}>
          <option value="home">Home</option>
          <option value="gym">Gym</option>
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
        </select>
      </div>

      <button onClick={generatePlan}>Generate Workout Plan</button>
      {loading && <div className="loading">Generating your plan... Please wait</div>}
      {result && (
        <div className="result">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default Diet;