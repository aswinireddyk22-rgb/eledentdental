import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';

export default function Footer({ navigate, onOpenAppointment }) {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About Eledent */}
          <div className="footer-col">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="logo-badge" style={{ width: '28px', height: '28px', fontSize: '1rem' }}>E</div>
              <span>{CLINIC_INFO.name}</span>
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', color: '#cbd5e1' }}>
              {CLINIC_INFO.supportingText}
            </p>
            <div className="footer-stats-badge">
              <ShieldCheck size={16} style={{ color: '#5eead4' }} />
              <span>{CLINIC_INFO.experienceYears} Experience • {CLINIC_INFO.successfulCases} Cases</span>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={onOpenAppointment}
              >
                Book ₹300 Consultation <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="/" onClick={(e) => handleNav(e, '/')}>Home Page</a></li>
              <li><a href="/blog" onClick={(e) => handleNav(e, '/blog')} style={{ color: '#5eead4', fontWeight: '600' }}>Dental Health Blog</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, '/#services')}>Treatments & Services</a></li>
              <li><a href="/#doctors" onClick={(e) => handleNav(e, '/#doctors')}>Doctors Directory</a></li>
              <li><a href="/#technology" onClick={(e) => handleNav(e, '/#technology')}>Advanced Technology</a></li>
              <li><a href="/#why-eledent" onClick={(e) => handleNav(e, '/#why-eledent')}>Why Choose Us</a></li>
              <li><a href="/#location" onClick={(e) => handleNav(e, '/#location')}>Clinic Location & Map</a></li>
              <li><a href="/#faq" onClick={(e) => handleNav(e, '/#faq')}>Hospital FAQs</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Blog Guides */}
          <div className="footer-col">
            <h4>Popular Health Guides</h4>
            <ul className="footer-links">
              <li>
                <a href="/blog/root-canal-treatment-cost-steps-pain" onClick={(e) => handleNav(e, '/blog/root-canal-treatment-cost-steps-pain')}>
                  Root Canal Steps & Cost
                </a>
              </li>
              <li>
                <a href="/blog/toothache-at-night-when-to-see-dentist" onClick={(e) => handleNav(e, '/blog/toothache-at-night-when-to-see-dentist')}>
                  Toothache at Night Relief
                </a>
              </li>
              <li>
                <a href="/blog/dental-implant-vs-bridge" onClick={(e) => handleNav(e, '/blog/dental-implant-vs-bridge')}>
                  Dental Implant vs. Bridge
                </a>
              </li>
              <li>
                <a href="/blog/braces-vs-invisalign" onClick={(e) => handleNav(e, '/blog/braces-vs-invisalign')}>
                  Braces or Invisalign Guide
                </a>
              </li>
              <li>
                <a href="/blog/teeth-scaling-myths-and-facts" onClick={(e) => handleNav(e, '/blog/teeth-scaling-myths-and-facts')}>
                  Teeth Scaling Myths Debunked
                </a>
              </li>
              <li>
                <a href="/blog/childs-first-dental-visit" onClick={(e) => handleNav(e, '/blog/childs-first-dental-visit')}>
                  Child's First Dental Visit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location */}
          <div className="footer-col">
            <h4>Banjara Hills Hospital</h4>
            <div style={{ marginBottom: '1rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <MapPin size={16} style={{ color: '#5eead4', flexShrink: 0, marginTop: '2px' }} />
                <span>{CLINIC_INFO.address.full}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                <Clock size={16} style={{ color: '#5eead4' }} />
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Visiting Hours:</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white' }}>
                {CLINIC_INFO.visitingHours}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{CLINIC_INFO.opdHours}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <a href={`tel:${CLINIC_INFO.phoneRaw}`} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Phone size={15} style={{ color: '#5eead4' }} /> {CLINIC_INFO.phone}
              </a>
              <a href={`mailto:${CLINIC_INFO.email}`} style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Mail size={15} style={{ color: '#5eead4' }} /> {CLINIC_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Other Branches Mention per PDF Audit */}
        <div className="footer-branches-row">
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>Hospital Branches:</span>
          <span className="branch-tag active">Banjara Hills (Audited Branch)</span>
          <span className="branch-tag">Kondapur</span>
          <span className="branch-tag">Kukatpally</span>
          <span className="branch-tag">Manikonda</span>
          <span className="branch-tag">Kompally</span>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name} — Banjara Hills Branch. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>NABH Standards Compliant</span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Verified Medical Reviewers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
