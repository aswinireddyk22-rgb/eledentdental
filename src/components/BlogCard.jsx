import React from 'react';
import { Calendar, Clock, ArrowRight, UserCheck, Shield } from 'lucide-react';

export default function BlogCard({ article, navigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/blog/${article.slug}`);
  };

  // Format date nicely (e.g. "Oct 8, 2026")
  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="blog-card" onClick={handleClick}>
      <div className="blog-card-media">
        <img 
          src={article.featuredImage} 
          alt={article.imageAlt || article.title} 
          className="blog-card-img"
          loading="lazy"
        />
        <span className="blog-category-badge">{article.category}</span>
      </div>

      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="meta-item">
            <Calendar size={13} />
            {formatDate(article.publishedDate)}
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-item">
            <Clock size={13} />
            {article.readTime}
          </span>
        </div>

        <h3 className="blog-card-title">
          <a href={`/blog/${article.slug}`} onClick={handleClick}>
            {article.title}
          </a>
        </h3>

        <p className="blog-card-excerpt">
          {article.excerpt}
        </p>

        <div className="blog-card-footer">
          <div className="blog-card-reviewer">
            <div className="reviewer-icon-mini">
              <UserCheck size={14} />
            </div>
            <div className="reviewer-text">
              <span className="reviewer-label">Medically Reviewed by</span>
              <span className="reviewer-name">{article.reviewer.name}</span>
            </div>
          </div>

          <span className="read-more-link">
            Read Article <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
