import React, { useState, useEffect } from 'react';
import { Dumbbell, Filter, Search, Play, Pause, RotateCcw } from 'lucide-react';
import '../design/ExerciseHub.css';

const ExerciseHub = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("all equipment");
  const [selectedMuscle, setSelectedMuscle] = useState("all muscles");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    fetch("/final.json")
      .then((response) => response.json())
      .then((data) => {
        let filteredData = data;
        

        if (selectedEquipment.toLowerCase() !== "all equipment") {
          filteredData = filteredData.filter(
            (exercise) =>
              exercise.equipment.toLowerCase() === selectedEquipment.toLowerCase()
          );
        }
        
        if (selectedMuscle.toLowerCase() !== "all muscles") {
          filteredData = filteredData.filter(
            (exercise) =>
              exercise.muscle.toLowerCase() === selectedMuscle.toLowerCase()
          );
        }
        
        if (searchTerm) {
          filteredData = filteredData.filter(
            (exercise) =>
              exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setExercises(filteredData);
        
        if (!selectedExercise && filteredData.length > 0) {
          setSelectedExercise(filteredData[0]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedEquipment, selectedMuscle, searchTerm, selectedExercise]);

  const changeMid = (exercise) => {
    setSelectedExercise(exercise);
    setIsVideoPlaying(false);
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const resetFilters = () => {
    setSelectedEquipment("all equipment");
    setSelectedMuscle("all muscles");
    setSearchTerm("");
  };

  return (
    <div className="exercise-hub-container">
      <div className="exercise-main-content">
        <div className="exercise-sidebar">
          <div className="sidebar-header">
            <h3>Exercise Library</h3>
            <button className="reset-filters-btn" onClick={resetFilters}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">
                <Filter size={16} />
                Equipment
              </label>
              <select
                className="filter-select"
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
              >
                <option value="all equipment">All Equipment</option>
                <option value="None">Bodyweight</option>
                <option value="Barbell">Barbell</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Kettlebell">Kettlebell</option>
                <option value="Machine">Machine</option>
                <option value="Plate">Plate</option>
                <option value="Resistance Band">Resistance Band</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <Filter size={16} />
                Muscle Group
              </label>
              <select
                className="filter-select"
                value={selectedMuscle}
                onChange={(e) => setSelectedMuscle(e.target.value)}
              >
                <option value="all muscles">All Muscles</option>
                <option value="Abdominals">Abdominals</option>
                <option value="Abductors">Abductors</option>
                <option value="Adductors">Adductors</option>
                <option value="Biceps">Biceps</option>
                <option value="Lower Back">Lower Back</option>
                <option value="Upper Back">Upper Back</option>
                <option value="Cardio">Cardio</option>
                <option value="Chest">Chest</option>
                <option value="Calves">Calves</option>
                <option value="Forearms">Forearms</option>
                <option value="Glutes">Glutes</option>
                <option value="Hamstrings">Hamstrings</option>
                <option value="Lats">Lats</option>
                <option value="Quadriceps">Quadriceps</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Triceps">Triceps</option>
                <option value="Traps">Traps</option>
                <option value="Neck">Neck</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
          </div>

          <div className="exercise-list">
            <div className="exercise-count">
              {exercises.length} {exercises.length === 1 ? 'Exercise' : 'Exercises'} Found
            </div>
            
            {exercises.length === 0 ? (
              <div className="no-exercises">
                <Dumbbell size={48} />
                <p>No exercises found</p>
                <small>Try adjusting your filters</small>
              </div>
            ) : (
              <div className="exercise-items">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`exercise-item ${selectedExercise?.name === exercise.name ? 'active' : ''}`}
                    onClick={() => changeMid(exercise)}
                  >
                    <div className="exercise-thumbnail">
                      <img src={exercise.src} alt={exercise.name} />
                    </div>
                    <div className="exercise-info">
                      <h4 className="exercise-name">{exercise.name}</h4>
                      <p className="exercise-muscle">{exercise.muscle}</p>
                      <span className="exercise-equipment">{exercise.equipment}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="exercise-main">
          {selectedExercise ? (
            <div className="exercise-detail">
              <div className="exercise-detail-header">
                <h2 className="exercise-title">{selectedExercise.name}</h2>
                <div className="exercise-meta">
                  <span className="muscle-badge">{selectedExercise.muscle}</span>
                  <span className="equipment-badge">{selectedExercise.equipment}</span>
                </div>
              </div>

              <div className="exercise-media">
                {selectedExercise.isvideo ? (
                  <div className="video-container">
                    <video 
                      src={selectedExercise.main} 
                      controls 
                      autoPlay={isVideoPlaying}
                      loop
                      className="exercise-video"
                      preload="metadata"
                      playsInline
                    />
                  </div>
                ) : (
                  <div className="image-container">
                    <img 
                      src={selectedExercise.main} 
                      alt={selectedExercise.name}
                      className="exercise-image"
                    />
                  </div>
                )}
              </div>

              <div className="exercise-instructions">
                <h3>Instructions</h3>
                <div className="instructions-content">
                  {selectedExercise.steps ? (
                    <p>{selectedExercise.steps}</p>
                  ) : (
                    <p>No detailed instructions available for this exercise. Please consult with a fitness professional for proper form and technique.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="welcome-screen">
              <div className="welcome-content">
                <Dumbbell size={80} className="welcome-icon" />
                <h2>Welcome to Exercise Hub</h2>
                <p>Select an exercise from the library to get started with your workout</p>
                <div className="welcome-features">
                  <div className="feature-item">
                    <Dumbbell size={24} />
                    <span>Comprehensive Library</span>
                  </div>
                  <div className="feature-item">
                    <Filter size={24} />
                    <span>Smart Filtering</span>
                  </div>
                  <div className="feature-item">
                    <Play size={24} />
                    <span>Video Instructions</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseHub;