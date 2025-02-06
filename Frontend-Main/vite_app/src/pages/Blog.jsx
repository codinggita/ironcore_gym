'use client';

import React, { useState, useEffect } from 'react';
import '../design/Blog.css';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://blogs-backend-i6z7.onrender.com/articles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles. Please try again later.');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}th ${month} ${year}`;
  };

  if (loading) {
    return <div className="fit-loading">Loading...</div>;
  }

  if (error) {
    return <div className="fit-error">{error}</div>;
  }

  return (
    <>
      <h1 className="fit-blog-heading">Our Blogs</h1>
      <p className="fit-blog-text">Discover the latest fitness insights and tips</p>

      <div className="fit-blog">
        <div className="fit-articles">
          {articles.map((article, index) => (
            <div key={index} className="fit-article">
              <div className="fit-article-imgbox">
                <img
                  src={article.image_url || "/placeholder.svg"}
                  alt={article.title}
                  className="fit-article-img"
                />
              </div>

              <div className="fit-article-content">
                <div className="fit-article-inner">
                  <h2 className="fit-article-head">
                    <span className="fit-article-title">{article.title}</span>
                    <span className="fit-article-line">|</span>
                    <span className="fit-article-gym">Ironcore Gym</span>
                  </h2>

                  <div className="fit-article-info">
                    <div className="fit-info-item">
                      <span className="fit-info-icon">📅</span>
                      <span className="fit-info-date">{formatDate(article.uploaded_date)}</span>
                    </div>
                    <div className="fit-info-item">
                      <span className="fit-info-icon">👤</span>
                      <span className="fit-info-author">By Our Team</span>
                    </div>
                  </div>

                  <p className="fit-article-desc">{article.description}</p>

                  <button className="fit-readmore">
                    READ MORE
                    <span className="fit-readmore-arrow">»</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;