import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Check, 
  ChevronDown, 
  MapPin, 
  Phone, 
  ExternalLink,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';
import { CLINIC_INFO } from '../data/clinicData';
import { updatePageSEO } from '../utils/seo';
import BlogCard from './BlogCard';

export default function BlogArticle({ slug, navigate, onOpenAppointment }) {
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Find article by slug
  const article = BLOG_ARTICLES.find(a => a.slug === slug);

  // Format dates
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Set Page SEO & Scroll to Top
  useEffect(() => {
    if (article) {
      updatePageSEO({
        title: article.metaTitle,
        description: article.metaDescription,
        keywords: [article.primaryKeyword, ...(article.secondaryKeywords || [])],
        canonical: article.canonical,
        ogType: 'article',
        ogImage: article.featuredImage,
        breadcrumbs: [
          { name: "Home", url: "https://aswini.aswinireddykadapagunta.workers.dev/" },
          { name: "Blog", url: "https://aswini.aswinireddykadapagunta.workers.dev/blog" },
          { name: article.title, url: article.canonical }
        ],
        article: article
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>
          The requested dental article could not be found or may have moved.
        </p>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft size={16} /> Return to Dental Health Blog
        </button>
      </div>
    );
  }

  // Related articles
  const relatedArticles = BLOG_ARTICLES.filter(a => 
    article.relatedSlugs?.includes(a.slug) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 3);

  // Copy share link
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Scroll to section smoothly
  const handleTocClick = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 90;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <article className="article-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* ===================== BREADCRUMBS & ARTICLE HEADER ===================== */}
      <div className="article-header-container">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <ChevronRight size={14} className="crumb-separator" />
            <a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>Dental Health Blog</a>
            <ChevronRight size={14} className="crumb-separator" />
            <span className="crumb-active" aria-current="page">{article.category}</span>
          </nav>

          {/* Category & Metadata */}
          <div className="article-top-meta">
            <span className="blog-category-badge">{article.category}</span>
            <span className="meta-separator">•</span>
            <span className="meta-item"><Clock size={14} /> {article.readTime}</span>
            <span className="meta-separator">•</span>
            <span className="meta-item"><Calendar size={14} /> Published: {formatDate(article.publishedDate)}</span>
            {article.modifiedDate && (
              <>
                <span className="meta-separator">•</span>
                <span className="meta-item text-muted">Updated: {formatDate(article.modifiedDate)}</span>
              </>
            )}
          </div>

          {/* Article Title */}
          <h1 className="article-title" itemProp="headline">
            {article.title}
          </h1>

          {/* Article Lead Intro */}
          <p className="article-lead">
            {article.excerpt}
          </p>

          {/* Verified Reviewer Header Card */}
          <div className="article-trust-banner">
            <div className="reviewer-avatar">
              <UserCheck size={24} />
            </div>
            <div className="reviewer-details">
              <div className="reviewer-name-row">
                <span className="reviewer-title">Medically Reviewed by</span>
                <strong className="reviewer-fullname">{article.reviewer.name}</strong>
                <span className="reviewer-credentials">({article.reviewer.qualification})</span>
              </div>
              <div className="reviewer-affiliation">
                <span>{article.reviewer.role}</span>
                <span className="meta-separator">•</span>
                <span className="reviewer-branch">
                  <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {article.reviewer.branch}
                </span>
              </div>
            </div>
            <div className="trust-verified-pill">
              <Award size={14} />
              <span>Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FEATURED IMAGE ===================== */}
      <div className="article-featured-image-wrapper">
        <div className="container">
          <figure className="article-figure">
            <img 
              src={article.featuredImage} 
              alt={article.imageAlt} 
              className="article-featured-img" 
              itemProp="image"
            />
            <figcaption className="article-caption">
              {article.imageAlt} — Clinically supervised care at Eledent Dental Hospital, Road No. 12, Banjara Hills.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ===================== MAIN ARTICLE BODY ===================== */}
      <div className="container article-layout-grid">
        {/* Left Column: Table of Contents & Sticky Actions */}
        <aside className="article-sidebar">
          <div className="toc-sticky-card">
            <div className="toc-header">
              <BookOpen size={16} />
              <span>Table of Contents</span>
            </div>
            <ul className="toc-list">
              {article.tableOfContents.map((item, idx) => (
                <li key={item.id} className="toc-item">
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => handleTocClick(e, item.id)}
                    className="toc-link"
                  >
                    <span className="toc-num">{idx + 1}.</span> {item.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Share / Actions */}
            <div className="toc-share-box">
              <button 
                type="button" 
                className="btn btn-outline btn-sm" 
                onClick={handleCopyLink}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {copied ? <Check size={14} className="text-teal" /> : <Share2 size={14} />}
                {copied ? 'Link Copied!' : 'Share This Guide'}
              </button>
            </div>

            {/* Sidebar Appointment Mini CTA */}
            <div className="sidebar-booking-card">
              <div className="sidebar-booking-title">Need In-Person Care?</div>
              <p className="sidebar-booking-text">
                Book a consultation with our dental team for ₹300 at Road No. 12, Banjara Hills.
              </p>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onOpenAppointment}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Article Prose Content */}
        <main className="article-content-body" itemProp="articleBody">
          {article.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="article-section-block">
              <h2 className="section-heading">{sec.heading}</h2>

              {/* Formatted Paragraphs */}
              {sec.content.split('\n\n').map((para, pIdx) => {
                if (para.startsWith('> ')) {
                  return (
                    <blockquote key={pIdx} className="article-blockquote">
                      {para.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (para.includes('\n- ')) {
                  const parts = para.split('\n- ');
                  const intro = parts[0];
                  const items = parts.slice(1);
                  return (
                    <div key={pIdx} className="article-list-block">
                      {intro && <p>{intro}</p>}
                      <ul className="article-bullet-list">
                        {items.map((it, iIdx) => (
                          <li key={iIdx}>
                            {it.split(': ').map((segment, segIdx) => 
                              segIdx === 0 && it.includes(': ') ? (
                                <strong key={segIdx}>{segment.replace(/\*\*/g, '')}: </strong>
                              ) : (
                                <span key={segIdx}>{segment.replace(/\*\*/g, '')}</span>
                              )
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                if (para.startsWith('1. ') || para.includes('\n1. ')) {
                  const items = para.split(/\n?\d+\.\s/).filter(Boolean);
                  return (
                    <ol key={pIdx} className="article-numbered-list">
                      {items.map((it, iIdx) => (
                        <li key={iIdx}>
                          {it.split(': ').map((segment, segIdx) => 
                            segIdx === 0 && it.includes(': ') ? (
                              <strong key={segIdx}>{segment.replace(/\*\*/g, '')}: </strong>
                            ) : (
                              <span key={segIdx}>{segment.replace(/\*\*/g, '')}</span>
                            )
                          )}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={pIdx}>
                    {para.split('**').map((chunk, cIdx) => 
                      cIdx % 2 === 1 ? <strong key={cIdx}>{chunk}</strong> : chunk
                    )}
                  </p>
                );
              })}

              {/* Comparison Table if present in section */}
              {sec.table && (
                <div className="article-table-container">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        {sec.table.headers.map((th, thIdx) => (
                          <th key={thIdx}>{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>
                              {cIdx === 0 ? <strong>{cell}</strong> : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Internal Links Callout to Related Service */}
          {article.serviceLink && (
            <div className="article-service-link-card">
              <div className="service-link-info">
                <span className="service-link-eyebrow">RELATED CLINICAL SERVICE</span>
                <h4>{article.serviceLink.name} at Eledent Banjara Hills</h4>
                <p>
                  Explore specialized treatment technology, doctor availability, and treatment workflows for {article.serviceLink.name.toLowerCase()} at our Road No. 12 hospital.
                </p>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(`/#${article.serviceLink.anchor}`)}
              >
                View Service Details <ExternalLink size={14} />
              </button>
            </div>
          )}

          {/* ===================== FREQUENTLY ASKED QUESTIONS ===================== */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="frequently-asked-questions" className="article-faq-section">
              <h2 className="section-heading">Frequently Asked Questions</h2>
              <div className="article-faq-accordion">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className={`faq-card ${activeFaq === idx ? 'open' : ''}`}>
                    <button 
                      type="button" 
                      className="faq-question-btn"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      aria-expanded={activeFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className="faq-toggle-icon" />
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-answer-pane">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===================== MEDICAL DISCLAIMER ===================== */}
          <div className="article-medical-disclaimer" role="note">
            <div className="disclaimer-icon">
              <ShieldAlert size={22} />
            </div>
            <div className="disclaimer-text">
              <strong>Medical Information Disclaimer:</strong>
              <p>
                This article is published for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or personalized dental treatment by a licensed dental practitioner. Always consult a qualified dentist regarding dental symptoms or conditions. Treatment outcomes and requirements vary by individual clinical assessment.
              </p>
            </div>
          </div>

          {/* ===================== CONTEXTUAL APPOINTMENT CTA ===================== */}
          <div className="article-cta-box">
            <div className="article-cta-icon-wrap">
              <Sparkles size={28} />
            </div>
            <h3>{article.cta?.headline || "Have Questions About Your Dental Health?"}</h3>
            <p>
              {article.cta?.text || "Schedule an in-person clinical examination at Eledent Dental Hospital, Road No. 12, Banjara Hills. Open 7 days a week from 9:30 AM to 9:00 PM."}
            </p>
            <div className="article-cta-actions">
              <button 
                type="button" 
                className="btn btn-primary btn-lg"
                onClick={onOpenAppointment}
              >
                {article.cta?.buttonText || "Book ₹300 Consultation"}
              </button>
              <a 
                href={`tel:${CLINIC_INFO.phoneRaw}`} 
                className="btn btn-secondary btn-lg"
              >
                <Phone size={16} /> Call {CLINIC_INFO.phone}
              </a>
            </div>
          </div>

          {/* Back to Blog Navigation */}
          <div className="back-to-blog-row">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft size={16} /> Back to All Dental Health Articles
            </button>
          </div>
        </main>
      </div>

      {/* ===================== RELATED ARTICLES SECTION ===================== */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section">
          <div className="container">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <span className="section-eyebrow">CONTINUE READING</span>
              <h2 className="section-title" style={{ fontSize: '1.75rem', textAlign: 'left' }}>
                Related Dental Health Guides
              </h2>
            </div>
            <div className="blog-cards-grid">
              {relatedArticles.map(rel => (
                <BlogCard 
                  key={rel.id} 
                  article={rel} 
                  navigate={navigate} 
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
