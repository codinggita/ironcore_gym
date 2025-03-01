import React, { useState, useEffect } from 'react';
import { Star, Plus, X, Edit2, Trash2, AlertCircle } from 'lucide-react';
import '../design/Review.css';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    comment: '',
    rating: 5
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchReviews();
    const token = localStorage.getItem('userToken');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://review-backend-i98k.onrender.com/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setNewReview(prev => ({
          ...prev,
          name: userData.name || ''
        }));
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError('Failed to load user info. Please log in again.');
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://review-backend-i98k.onrender.com/api/reviews');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError('Failed to load reviews. Please try again later.');
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewReview({
      name: user?.name || '',
      comment: '',
      rating: 5
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Please log in to submit a review');
      return;
    }
    
    try {
      const url = editingId 
        ? `https://review-backend-i98k.onrender.com/api/reviews/${editingId}`
        : 'https://review-backend-i98k.onrender.com/api/reviews';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReview),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save review');
      }

      await fetchReviews();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving review:', error);
      setError(error.message || 'Failed to save review. Please try again.');
    }
  };

  const handleEdit = (review) => {
    if (user && review.userId && user._id === review.userId.toString()) {
      setNewReview({
        name: review.name,
        comment: review.comment,
        rating: review.rating
      });
      setEditingId(review._id);
      setShowForm(true);
    } else {
      setError('You can only edit your own reviews');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://review-backend-i98k.onrender.com/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
      }

      await fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      setError(error.message || 'Failed to delete review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
        size={20}
      />
    ));
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h1>Member Reviews</h1>
        {user && ( // Show "Add Review" button only to logged-in users
          <button 
            className="add-review-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus size={20} />
            Add Your Review
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && user && ( // Show form only to logged-in users
        <div className="modal-overlay">
          <div className="review-form-container">
            <div className="form-header">
              <h2>{editingId ? 'Edit Review' : 'Add Your Review'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <label key={num}>
                      <input
                        type="radio"
                        name="rating"
                        value={num}
                        checked={parseInt(newReview.rating) === num}
                        onChange={handleInputChange}
                      />
                      <Star 
                        className={`star ${parseInt(newReview.rating) >= num ? 'filled' : ''}`}
                        size={24}
                      />
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Your Review</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  required
                  placeholder="Share your experience..."
                  rows="4"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                {editingId ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="reviews-grid">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <h3>{review.name}</h3>
                  <div className="rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                {user && review.userId && user._id === review.userId.toString() && ( // Show edit/delete only to review owner
                  <div className="review-actions">
                    <button
                      onClick={() => handleEdit(review)}
                      className="action-btn edit"
                      title="Edit review"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="action-btn delete"
                      title="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-footer">
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Review;