import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Articledetail.css';

export default function Articledetail() {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedArticle');
    if (stored) {
      try {
        setArticle(JSON.parse(stored));
      } catch (e) {
        navigate('/insights');
      }
    } else {
      navigate('/insights');
    }
  }, [navigate]);

  if (!article) {
    return (
      <main className="article-loading">
        <div className="container">
          <p>Loading article...</p>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleClose = () => {
    localStorage.removeItem('selectedArticle');
    localStorage.removeItem('selectedArticleId');
    navigate('/insights', { replace: false });
  };

  return (
    <main className="article-detail">
      <header className="article-detail__header">
        <div className="container">
          <button className="article-detail__back" onClick={handleClose}>
            <ChevronLeft size={20} />
            <span>Back to Articles</span>
          </button>
        </div>
      </header>

      <section className="article-detail__hero">
        <div className="container">
          <div className="article-detail__meta">
            <span className="article-detail__category">{article.category}</span>
            <span className="article-detail__date">
              <Calendar size={14} /> {formattedDate}
            </span>
            <span className="article-detail__readtime">
              <Clock size={14} /> {article.readTime} min read
            </span>
          </div>

          {article.featured && (
            <div className="article-detail__featured">
              <span className="article-detail__featured-icon">★</span>
              Featured Article
            </div>
          )}

          <h1 className="article-detail__title">{article.title}</h1>
          <p className="article-detail__excerpt">{article.excerpt}</p>
        </div>
      </section>

      <section className="article-detail__content">
        <div className="container">
          <div className="article-detail__body">
            {article.fullContent.split('\n').map((line, idx) => {
              const trimmed = line.trim();
              
              if (!trimmed) return null;
              
              if (trimmed.match(/^[A-Z][A-Z\s&]+$/)) {
                return (
                  <h2 key={idx} className="article-detail__heading">
                    {trimmed}
                  </h2>
                );
              }
              
              if (trimmed.match(/^\d+\./)) {
                return (
                  <li key={idx} className="article-detail__list-item">
                    {trimmed.replace(/^\d+\.\s/, '')}
                  </li>
                );
              }

              return (
                <p key={idx} className="article-detail__paragraph">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <section className="article-detail__cta">
        <div className="container">
          <div className="article-detail__cta-inner">
            <h2>Ready to transform your training?</h2>
            <p>Let us build a personalized strength program designed for your decade of life.</p>
            <button
              className="article-detail__cta-btn"
              onClick={() => {
                handleClose();
                navigate('/contact');
              }}
            >
              Start Your Journey
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Back to top button - appears in articles */}
      <button 
        className="article-detail__back-floating"
        onClick={handleClose}
        title="Back to Articles"
      >
        <ChevronLeft size={24} />
      </button>
    </main>
  );
}