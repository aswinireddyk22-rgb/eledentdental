import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Calendar, Clock, ArrowRight, UserCheck, Sparkles, Filter, AlertCircle, HelpCircle } from 'lucide-react';
import BlogCard from './BlogCard';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../data/blogData';
import { CLINIC_INFO } from '../data/clinicData';
import { updatePageSEO } from '../utils/seo';

export default function BlogListing({ navigate, onOpenAppointment }) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Set page SEO on mount
  useEffect(() => {
    updatePageSEO({
      title: "Dental Health Insights & Expert Advice | Eledent Banjara Hills",
      description: "Explore evidence-based dental care guides on root canal, dental implants, Invisalign, pediatric dentistry and gum care from certified dental specialists at Eledent Banjara Hills.",
      keywords: [
        "dental blog Hyderabad",
        "dentist in Banjara Hills",
        "root canal cost in Banjara Hills",
        "dental implants in Banjara Hills",
        "braces vs Invisalign",
        "pediatric dentist Banjara Hills"
      ],
      canonical: "https://aswini.aswinireddykadapagunta.workers.dev/blog",
      breadcrumbs: [
        { name: "Home", url: "https://aswini.aswinireddykadapagunta.workers.dev/" },
        { name: "Dental Health Blog", url: "https://aswini.aswinireddykadapagunta.workers.dev/blog" }
      ]
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filtered Articles based on Category & Search
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter(article => {
      // Category match
      const categoryMatch = selectedCategory === 'All Articles' || article.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return categoryMatch;

      const titleMatch = article.title.toLowerCase().includes(query);
      const excerptMatch = article.excerpt.toLowerCase().includes(query);
      const keywordMatch = article.secondaryKeywords?.some(k => k.toLowerCase().includes(query)) ||
                           article.primaryKeyword?.toLowerCase().includes(query);
      const reviewerMatch = article.reviewer?.name?.toLowerCase().includes(query);

      return categoryMatch && (titleMatch || excerptMatch || keywordMatch || reviewerMatch);
    });
  }, [selectedCategory, searchQuery]);

  // Featured article (first featured article or first article in array)
  const featuredArticle = useMemo(() => {
    return BLOG_ARTICLES.find(a => a.featured) || BLOG_ARTICLES[0];
  }, []);

  // Reset pagination when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Paginated Articles
  const paginatedArticles = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage]);

  const hasMoreArticles = paginatedArticles.length < filteredArticles.length;

  // Counts per category for the filter pills
  const categoryCounts = useMemo(() => {
    const counts = { 'All Articles': BLOG_ARTICLES.length };
    BLOG_ARTICLES.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="blog-listing-page">
      {/* ===================== HERO SECTION ===================== */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <div className="blog-hero-badge">
              <Sparkles size={14} />
              <span>ELEDENT CLINICAL KNOWLEDGE HUB</span>
            </div>
            <h1 className="blog-hero-title">
              Dental Health Insights & Expert Advice
            </h1>
            <p className="blog-hero-subtitle">
              Explore trusted, medically reviewed guides on advanced dental treatments, oral hygiene, preventive care, and modern clinical technologies from the dental specialists at Eledent Dental Hospital, Banjara Hills.
            </p>

            {/* Search Input */}
            <div className="blog-search-container">
              <div className="blog-search-input-box">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by topic, symptom, or treatment (e.g. root canal, implants, toothache)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                  aria-label="Search dental articles"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn" 
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ===================== FEATURED ARTICLE BANNER ===================== */}
          {!searchQuery && selectedCategory === 'All Articles' && featuredArticle && (
            <div className="featured-article-banner">
              <div className="featured-banner-grid">
                <div className="featured-banner-media">
                  <img 
                    src={featuredArticle.featuredImage} 
                    alt={featuredArticle.imageAlt} 
                    className="featured-banner-img"
                  />
                  <span className="featured-tag">FEATURED GUIDE</span>
                </div>
                <div className="featured-banner-info">
                  <div className="featured-meta-row">
                    <span className="blog-category-badge">{featuredArticle.category}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item"><Clock size={14} /> {featuredArticle.readTime}</span>
                  </div>
                  <h2 className="featured-title">
                    <a href={`/blog/${featuredArticle.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/blog/${featuredArticle.slug}`); }}>
                      {featuredArticle.title}
                    </a>
                  </h2>
                  <p className="featured-excerpt">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="featured-footer-row">
                    <div className="featured-reviewer">
                      <UserCheck size={16} className="text-teal" />
                      <span>Reviewed by <strong>{featuredArticle.reviewer.name}</strong> ({featuredArticle.reviewer.qualification})</span>
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => navigate(`/blog/${featuredArticle.slug}`)}
                    >
                      Read Full Article <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== CATEGORY NAVIGATION ===================== */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="category-filter-bar" role="tablist" aria-label="Article Categories">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="category-count">
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Active Filter Indicator */}
          {(selectedCategory !== 'All Articles' || searchQuery) && (
            <div className="active-filters-indicator">
              <span>
                Showing results for: <strong>{selectedCategory !== 'All Articles' ? selectedCategory : ''}</strong>
                {searchQuery ? ` matching "${searchQuery}"` : ''} ({filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'})
              </span>
              <button 
                type="button" 
                className="btn-reset-filters" 
                onClick={() => { setSelectedCategory('All Articles'); setSearchQuery(''); }}
              >
                Reset Filters <X size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===================== BLOG CARDS GRID ===================== */}
      <section className="blog-grid-section">
        <div className="container">
          {filteredArticles.length === 0 ? (
            // Empty State
            <div className="blog-empty-state">
              <AlertCircle size={48} className="empty-state-icon" />
              <h3>No dental articles found</h3>
              <p>We couldn't find any articles matching your search query. Try searching for "root canal", "implants", "braces", or "gums".</p>
              <div className="suggested-pills">
                <button type="button" className="btn btn-teal-outline btn-sm" onClick={() => { setSearchQuery('root canal'); setSelectedCategory('All Articles'); }}>
                  Root Canal
                </button>
                <button type="button" className="btn btn-teal-outline btn-sm" onClick={() => { setSearchQuery('implant'); setSelectedCategory('All Articles'); }}>
                  Dental Implants
                </button>
                <button type="button" className="btn btn-teal-outline btn-sm" onClick={() => { setSearchQuery('toothache'); setSelectedCategory('All Articles'); }}>
                  Toothache
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setSelectedCategory('All Articles'); }}>
                  View All 12 Articles
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="blog-cards-grid">
                {paginatedArticles.map(article => (
                  <BlogCard 
                    key={article.id} 
                    article={article} 
                    navigate={navigate} 
                  />
                ))}
              </div>

              {/* Load More / Pagination */}
              {hasMoreArticles && (
                <div className="blog-pagination-wrapper">
                  <div className="articles-progress-text">
                    Showing {paginatedArticles.length} of {filteredArticles.length} published articles
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-lg load-more-btn"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ===================== APPOINTMENT CTA ===================== */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-content">
              <span className="section-eyebrow" style={{ color: '#5eead4' }}>DIRECT CLINICAL ACCESS</span>
              <h2 className="blog-cta-title">
                Have Questions About Your Dental Health?
              </h2>
              <p className="blog-cta-desc">
                Explore our dental services or contact our team to arrange an appointment. Receive an in-person clinical assessment from verified specialists at Road No. 12, Banjara Hills.
              </p>
              <div className="blog-cta-buttons">
                <button 
                  type="button" 
                  className="btn btn-teal-outline"
                  style={{ color: '#ffffff', borderColor: '#5eead4' }}
                  onClick={() => navigate('/#services')}
                >
                  Explore Dental Services
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={onOpenAppointment}
                >
                  Book an Appointment (₹300 Fee)
                </button>
              </div>
            </div>
            <div className="blog-cta-contact-box">
              <div className="cta-contact-row">
                <span className="cta-label">Direct Phone:</span>
                <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="cta-val">{CLINIC_INFO.phone}</a>
              </div>
              <div className="cta-contact-row">
                <span className="cta-label">Visiting Hours:</span>
                <span className="cta-val">{CLINIC_INFO.visitingHoursShort}</span>
              </div>
              <div className="cta-contact-row">
                <span className="cta-label">Branch Address:</span>
                <span className="cta-val">{CLINIC_INFO.address.street}, {CLINIC_INFO.address.area}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
