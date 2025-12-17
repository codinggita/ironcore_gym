import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../design/Blog.css";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const blogDetailRef = useRef(null);
  const isAuthenticated = !!localStorage.getItem("userToken");

  // Function to get current 12-hour period
  const getTimePeriodSeed = () => {
    const now = new Date();
    return Math.floor(now.getTime() / (12 * 60 * 60 * 1000));
  };

  // Function to shuffle and select articles
  const updateDisplayedArticles = (allArticles) => {
    const seed = getTimePeriodSeed();
    const seededRandom = (max) => {
      const x = Math.sin(seed + max) * 10000;
      return Math.floor((x - Math.floor(x)) * max);
    };

    let shuffledArticles = [...allArticles];
    for (let i = shuffledArticles.length - 1; i > 0; i--) {
      const j = seededRandom(i + 1);
      [shuffledArticles[i], shuffledArticles[j]] = [shuffledArticles[j], shuffledArticles[i]];
    }

    setDisplayedArticles(shuffledArticles.slice(0, 12));
  };

  useEffect(() => {
    fetch("https://blogs-backend-i6z7.onrender.com/articles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data);
        updateDisplayedArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Check and update articles every minute
  useEffect(() => {
    const checkAndUpdateArticles = () => {
      const currentPeriod = getTimePeriodSeed();
      const lastUpdatePeriod = Number(localStorage.getItem('lastUpdatePeriod'));

      if (currentPeriod !== lastUpdatePeriod) {
        updateDisplayedArticles(articles);
        localStorage.setItem('lastUpdatePeriod', currentPeriod.toString());
      }
    };

    const interval = setInterval(checkAndUpdateArticles, 60000);
    return () => clearInterval(interval);
  }, [articles]);

  useEffect(() => {
    if (id && blogDetailRef.current) {
      blogDetailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}th ${month} ${year}`;
  };

  const handleReadMore = (articleId) => {
      navigate(`/blog/${articleId}`);
  };

  if (id) {
    const selectedArticle = articles.find((article) => article._id === id);
    if (!selectedArticle) {
      return <div className="fit-error">Loading...</div>;
    }

    return (
      <div className="fit-blog-detail-container" ref={blogDetailRef}>
        <div className="fit-blog-detail-header">
          <div className="fit-blog-detail-title-section">
            <h1 className="fit-blog-detail-title">{selectedArticle.title}</h1>
            <span className="fit-blog-detail-gym">Ironcore Gym</span>
          </div>

          <div className="fit-blog-detail-meta">
            <div className="fit-blog-detail-info">
              <span className="fit-blog-detail-icon">📅</span>
              <span className="fit-blog-detail-text">
                {formatDate(selectedArticle.uploaded_date)}
              </span>
            </div>
            <div className="fit-blog-detail-info">
              <span className="fit-blog-detail-icon">👤</span>
              <span className="fit-blog-detail-text">
                {selectedArticle.created_team}
              </span>
            </div>
          </div>
        </div>

        <div className="fit-blog-detail-image-container">
          <img
            src={selectedArticle.big_image_url || "/placeholder.svg"}
            alt={selectedArticle.title}
            className="fit-blog-detail-image"
          />
        </div>

        <div className="fit-blog-detail-content">
          {selectedArticle.text ? (
            selectedArticle.text.split("\n").map((paragraph, index) => (
              <p key={index} className="fit-blog-detail-paragraph">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="fit-blog-detail-paragraph">
              {selectedArticle.description}
            </p>
          )}
        </div>

        <button
          className="fit-blog-detail-back"
          onClick={() => navigate("/our-blog")}
        >
          ⟵
        </button>
      </div>
    );
  }

  if (loading) return <div className="fit-loading">Loading...</div>;
  if (error) return <div className="fit-error">{error}</div>;

  return (
    <>
      <h1 className="fit-blog-heading">Our Blogs</h1>
      <p className="fit-blog-text">Discover the latest fitness insights and tips</p>

      <div className="fit-blog">
        <div className="fit-articles">
          {displayedArticles.map((article) => (
            <div key={article._id} className="fit-article">
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
                      <span className="fit-info-date">
                        {formatDate(article.uploaded_date)}
                      </span>
                    </div>
                    <div className="fit-info-item">
                      <span className="fit-info-icon">👤</span>
                      <span className="fit-info-author">By Our Team</span>
                    </div>
                  </div>

                  <p className="fit-article-desc">{article.description}</p>

                  <button
                    className="fit-readmore"
                    onClick={() => handleReadMore(article._id)}
                  >
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