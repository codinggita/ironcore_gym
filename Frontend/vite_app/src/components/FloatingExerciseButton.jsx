import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import './FloatingExerciseButton.css';

const FloatingExerciseButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const visiblePaths = [
    '/home',
    '/service', 
    '/why-join',
    '/trainers-details',
    '/photos',
    '/Diet',
    '/our-blog',
    '/wellness'
  ];

  const shouldShowButton = visiblePaths.includes(location.pathname);

  const handleClick = () => {
    navigate('/exercise-hub');
  };

  if (!shouldShowButton) {
    return null;
  }

  return (
    <button 
      className="floating-exercise-button"
      onClick={handleClick}
      title="Exercise Hub"
    >
      <Dumbbell size={24} />
    </button>
  );
};

export default FloatingExerciseButton;