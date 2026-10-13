import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, BookOpen } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Header({ currentRoute, navigate, onOpenAppointment }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="logo-link" 
          aria-label="Eledent Dental Hospital Homepage"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <div className="logo-badge">E</div>
          <div className="logo-text">
            <span className="logo-title">ELEDENT</span>
            <span className="logo-subtitle">DENTAL HOSPITAL • BANJARA HILLS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          <a 
            href="/" 
            className={`nav-link ${currentRoute === '/' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/')}
          >
            Home
          </a>
          <a 
            href="/#services" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#services')}
          >
            Services
          </a>
          <a 
            href="/#specializations" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#specializations')}
          >
            Specializations
          </a>
          <a 
            href="/#doctors" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#doctors')}
          >
            Doctors
          </a>
          <a 
            href="/#technology" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#technology')}
          >
            Technology
          </a>
          <a 
            href="/blog" 
            className={`nav-link nav-link-blog ${currentRoute.startsWith('/blog') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/blog')}
          >
            <BookOpen size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
            Blog
          </a>
          <a 
            href="/#why-eledent" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#why-eledent')}
          >
            Why Us
          </a>
          <a 
            href="/#location" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#location')}
          >
            Location
          </a>
          <a 
            href="/#faq" 
            className="nav-link"
            onClick={(e) => handleLinkClick(e, '/#faq')}
          >
            FAQ
          </a>
        </nav>

        {/* Desktop Header Actions */}
        <div className="header-ctas-desktop">
          <a 
            href={`tel:${CLINIC_INFO.phoneRaw}`} 
            className="btn btn-outline btn-sm"
            title="Call Eledent Banjara Hills"
          >
            <Phone size={15} /> Call Now
          </a>
          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={onOpenAppointment}
          >
            <Calendar size={15} /> Book Appointment
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="mobile-header-actions">
          <a 
            href={`tel:${CLINIC_INFO.phoneRaw}`} 
            className="btn-icon-call" 
            aria-label="Call Eledent Hospital"
          >
            <Phone size={18} />
          </a>
          <button 
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
          <a 
            href="/" 
            className={`mobile-nav-link ${currentRoute === '/' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/')}
          >
            Home
          </a>
          <a 
            href="/blog" 
            className={`mobile-nav-link ${currentRoute.startsWith('/blog') ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/blog')}
            style={{ color: 'var(--brand-teal)', fontWeight: '700' }}
          >
            <BookOpen size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-3px' }} />
            Dental Health Blog
          </a>
          <a 
            href="/#services" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#services')}
          >
            Treatments & Services
          </a>
          <a 
            href="/#doctors" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#doctors')}
          >
            Doctors Directory
          </a>
          <a 
            href="/#technology" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#technology')}
          >
            Technology & Infrastructure
          </a>
          <a 
            href="/#why-eledent" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#why-eledent')}
          >
            Why Choose Eledent
          </a>
          <a 
            href="/#location" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#location')}
          >
            Location & Timings
          </a>
          <a 
            href="/#faq" 
            className="mobile-nav-link" 
            onClick={(e) => handleLinkClick(e, '/#faq')}
          >
            FAQs
          </a>

          <div className="mobile-nav-ctas">
            <button 
              type="button" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
            >
              <Calendar size={18} /> Book Appointment
            </button>
            <a 
              href={`tel:${CLINIC_INFO.phoneRaw}`} 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={18} /> Call {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
