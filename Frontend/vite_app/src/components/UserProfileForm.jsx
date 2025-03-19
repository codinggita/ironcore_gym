import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./UserProfileForm.css";

function UserProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    fitnessGoals: "",
    workoutPreferences: "",
    bodyMeasurements: { weight: "", height: "", bmi: "", muscleMass: "" },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://authentication-backend-kbui.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setFormData({
          name: userData.name || "",
          contact: userData.contact || "",
          fitnessGoals: userData.fitnessGoals || "",
          workoutPreferences: userData.workoutPreferences || "",
          bodyMeasurements: {
            weight: userData.bodyMeasurements?.weight || "",
            height: userData.bodyMeasurements?.height || "",
            bmi: userData.bodyMeasurements?.bmi || "",
            muscleMass: userData.bodyMeasurements?.muscleMass || "",
          },
        });
      } catch (err) {
        setError(err.response?.data?.message || "Error loading profile data");
      }
    };
    fetchUserData();
  }, [token, navigate]);

  const handleChange = (e) => {
    if (e.target.name.startsWith("bodyMeasurements.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        bodyMeasurements: { ...formData.bodyMeasurements, [field]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await axios.put(
        "https://authentication-backend-kbui.onrender.com/api/user/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="fitnessGoals">Fitness Goals</label>
          <input
            type="text"
            id="fitnessGoals"
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
            placeholder="e.g., Weight Loss"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="workoutPreferences">Workout Preferences</label>
          <input
            type="text"
            id="workoutPreferences"
            name="workoutPreferences"
            value={formData.workoutPreferences}
            onChange={handleChange}
            placeholder="e.g., Cardio, Strength"
            disabled={isLoading}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Body Measurements</label>
          <input
            type="number"
            name="bodyMeasurements.weight"
            value={formData.bodyMeasurements.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            disabled={isLoading}
            style={{ width: "45%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginRight: "10px" }}
          />
          <input
            type="number"
            name="bodyMeasurements.height"
            value={formData.bodyMeasurements.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            disabled={isLoading}
            style={{ width: "45%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            name="bodyMeasurements.bmi"
            value={formData.bodyMeasurements.bmi}
            onChange={handleChange}
            placeholder="BMI"
            disabled={isLoading}
            style={{ width: "45%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginRight: "10px", marginTop: "10px" }}
          />
          <input
            type="number"
            name="bodyMeasurements.muscleMass"
            value={formData.bodyMeasurements.muscleMass}
            onChange={handleChange}
            placeholder="Muscle Mass (kg)"
            disabled={isLoading}
            style={{ width: "45%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "10px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default UserProfileForm;