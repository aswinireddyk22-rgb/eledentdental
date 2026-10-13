import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  ShieldCheck, 
  Search, 
  ChevronDown, 
  Award, 
  Users, 
  Cpu, 
  UserCheck, 
  Clock, 
  CheckSquare, 
  X, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { 
  CLINIC_INFO, 
  QUICK_INFO_CARDS, 
  SERVICES, 
  SPECIALIZATIONS, 
  DOCTORS, 
  TECHNOLOGIES, 
  WHY_CHOOSE_POINTS, 
  FAQS 
} from '../data/clinicData';
import { BLOG_ARTICLES } from '../data/blogData';
import { updatePageSEO } from '../utils/seo';

export default function LandingPage({ navigate, onOpenAppointment }) {
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedSpecializationFilter, setSelectedSpecializationFilter] = useState('All');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDoctorCategory, setSelectedDoctorCategory] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [serviceModal, setServiceModal] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', doctor: '', date: '', time: '', message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set SEO on mount
  useEffect(() => {
    updatePageSEO({
      title: "Eledent Dental Hospital in Banjara Hills | Advanced Dental Care",
      description: "Eledent Dental Hospital in Banjara Hills, Hyderabad offers specialist dental care, implants, root canal treatment, orthodontics, Invisalign, pediatric dentistry and advanced dental technology.",
      keywords: [
        "Eledent Dental Hospital",
        "Dental Hospital in Banjara Hills",
        "Dentist in Banjara Hills",
        "Dental Clinic in Banjara Hills",
        "Dental Implants",
        "Root Canal Treatment",
        "Braces",
        "Invisalign",
        "Pediatric Dentistry"
      ],
      canonical: "https://aswini.aswinireddykadapagunta.workers.dev/",
      breadcrumbs: [
        { name: "Home", url: "https://aswini.aswinireddykadapagunta.workers.dev/" }
      ]
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      alert('Please fill in required fields: Name, Phone Number, and Service.');
      return;
    }
    setFormSubmitted(true);
  };

  // Filtered Services
  const filteredServices = SERVICES.filter(s =>
    (s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
     s.desc.toLowerCase().includes(serviceSearch.toLowerCase())) &&
    (selectedSpecializationFilter === 'All' || s.category === selectedSpecializationFilter)
  );

  // Filtered Doctors
  const filteredDoctors = DOCTORS.filter(d =>
    (d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
     d.specialization.toLowerCase().includes(doctorSearch.toLowerCase())) &&
    (selectedDoctorCategory === 'All' || d.category === selectedDoctorCategory)
  );

  // Top 3 blog articles for home preview
  const topBlogArticles = BLOG_ARTICLES.slice(0, 3);

  return (
    <div className="landing-page-root">
      {/* ===================== HERO SECTION ===================== */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="eyebrow-badge">
                <MapPin size={14} /> {CLINIC_INFO.eyebrow}
              </div>
              <h1 className="hero-title">{CLINIC_INFO.headline}</h1>
              <p className="hero-subtitle">{CLINIC_INFO.supportingText}</p>
              
              <div className="hero-actions">
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg"
                  onClick={onOpenAppointment}
                >
                  <Calendar size={18} /> Book an Appointment
                </button>
                <a 
                  href={`tel:${CLINIC_INFO.phoneRaw}`} 
                  className="btn btn-secondary btn-lg"
                >
                  <Phone size={18} /> Call {CLINIC_INFO.phone}
                </a>
                <a 
                  href={CLINIC_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-teal-outline btn-lg" 
                  style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  <Navigation size={18} /> Get Directions
                </a>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{CLINIC_INFO.experienceYears}</span>
                  <span className="stat-label">Clinical Experience</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">{CLINIC_INFO.successfulCases}</span>
                  <span className="stat-label">Successful Cases</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">19</span>
                  <span className="stat-label">Specialist Services</span>
                </div>
              </div>
            </div>

            <div className="hero-card-wrapper">
              <div className="hero-card">
                <div className="hero-card-header">
                  <div className="hero-card-icon">
                    <ShieldCheck size={28} />
                  </div>
                  <div className="hero-card-info">
                    <h3>Specialist Dental Excellence</h3>
                    <p>Road No. 12, Banjara Hills, Hyderabad</p>
                  </div>
                </div>
                <ul className="hero-feature-list">
                  <li className="hero-feature-item">
                    <CheckCircle size={18} className="text-teal" /> Structured appointment slots to minimize wait time
                  </li>
                  <li className="hero-feature-item">
                    <CheckCircle size={18} className="text-teal" /> 3D CBCT, intraoral scanners & CEREC digital CAD/CAM
                  </li>
                  <li className="hero-feature-item">
                    <CheckCircle size={18} className="text-teal" /> 20 verified BDS & MDS specialists multidisciplinary team
                  </li>
                  <li className="hero-feature-item">
                    <CheckCircle size={18} className="text-teal" /> Visiting Hours: Mon–Sun, 9:30 AM–9:00 PM
                  </li>
                  <li className="hero-feature-item">
                    <CheckCircle size={18} className="text-teal" /> Transparent consultation fee: ₹300
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== QUICK INFO CARDS ===================== */}
      <div className="container">
        <div className="quick-info-bar">
          <div className="quick-info-grid">
            {QUICK_INFO_CARDS.map(card => (
              <div key={card.id} className="quick-info-card">
                <div className="quick-info-icon">
                  {card.id === 1 && <UserCheck size={22} />}
                  {card.id === 2 && <Cpu size={22} />}
                  {card.id === 3 && <ShieldCheck size={22} />}
                  {card.id === 4 && <MapPin size={22} />}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== ABOUT SECTION ===================== */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-eyebrow">ABOUT OUR HOSPITAL</span>
              <h2>Comprehensive Dental Care in Banjara Hills</h2>
              <p>
                Eledent Dental Hospital operates in Banjara Hills, Hyderabad, delivering advanced orthodontic and routine dental care. Our approach emphasizes accurate diagnosis, gentle treatment workflows, clear treatment planning, and long-term oral health for every patient.
              </p>
              <div className="about-points">
                {['Accurate Diagnosis', 'Gentle Treatment', 'Clear Planning', 'Digital Workflows', 'Patient Comfort', 'Long-Term Care'].map((pt, idx) => (
                  <div key={idx} className="about-point-item">
                    <CheckCircle size={18} className="text-teal" /> {pt}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#services" className="btn btn-primary">
                  Explore Services <ChevronDown size={18} />
                </a>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => navigate('/blog')}
                >
                  <BookOpen size={16} /> Read Dental Guides
                </button>
              </div>
            </div>

            <div className="about-badge-card">
              <span className="section-eyebrow" style={{ color: '#7ef1e1' }}>FACILITY HIGHLIGHTS</span>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
                Modern Dental Hospital Infrastructure
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Equipped with self-cleaning dental chairs, 10X sterilization process, multiple operating rooms, and digital intraoral scanners.
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#5eead4' }}>₹300</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Consultation Fee</div>
                </div>
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#5eead4' }}>7 Days</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Weekly Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOG HIGHLIGHT STRIP ===================== */}
      <section className="section" style={{ backgroundColor: 'var(--accent-light)', borderTop: '1px solid #ccfbf1', borderBottom: '1px solid #ccfbf1' }}>
        <div className="container">
          <div className="home-blog-header">
            <div>
              <span className="section-eyebrow">DENTAL HEALTH EDUCATION</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Patient Guides & Dental Insights</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Evidence-based articles reviewed by verified Banjara Hills dentists.
              </p>
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => navigate('/blog')}
            >
              View All 12 Articles <ArrowRight size={16} />
            </button>
          </div>

          <div className="home-blog-grid">
            {topBlogArticles.map(art => (
              <div 
                key={art.id} 
                className="home-blog-card"
                onClick={() => navigate(`/blog/${art.slug}`)}
              >
                <div className="home-blog-media">
                  <img src={art.featuredImage} alt={art.imageAlt} />
                  <span className="home-blog-cat">{art.category}</span>
                </div>
                <div className="home-blog-body">
                  <div className="home-blog-meta">
                    <span><Clock size={12} /> {art.readTime}</span>
                    <span>•</span>
                    <span>Reviewed by {art.reviewer.name}</span>
                  </div>
                  <h4>{art.title}</h4>
                  <p>{art.excerpt.slice(0, 100)}...</p>
                  <span className="read-more-link">
                    Read Guide <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES SECTION ===================== */}
      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">SPECIALIST TREATMENTS</span>
            <h2 className="section-title">Our Dental Services</h2>
            <p className="section-desc">19 official dental treatments provided at our Banjara Hills hospital branch.</p>
          </div>

          <div className="services-filter-bar">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search dental services (e.g. root canal, aligners, implants)..."
                className="search-input"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon-box">
                  <Sparkles size={22} />
                </div>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-desc">{service.desc}</p>
                <div className="service-footer">
                  <span style={{ fontSize: '0.8rem', color: 'var(--brand-teal)', fontWeight: '600' }}>{service.category}</span>
                  <button
                    type="button"
                    className="btn btn-teal-outline btn-sm"
                    onClick={() => setServiceModal(service)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SPECIALIZATIONS SECTION ===================== */}
      <section id="specializations" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">CLINICAL DISCIPLINES</span>
            <h2 className="section-title">Our Dental Specializations</h2>
            <p className="section-desc">10 specialized categories verified on our official dental specialists directory.</p>
          </div>

          <div className="specialization-grid">
            {SPECIALIZATIONS.map(spec => (
              <div
                key={spec.id}
                className={`specialization-card ${selectedDoctorCategory === spec.title ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDoctorCategory(spec.title);
                  document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="icon-wrapper">
                  <Activity size={22} />
                </div>
                <h3>{spec.title}</h3>
                <p>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DOCTORS SECTION ===================== */}
      <section id="doctors" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">EXPERT TEAM</span>
            <h2 className="section-title">Meet Our Dental Specialists</h2>
            <p className="section-desc">20 verified BDS & MDS dental practitioners from the official Eledent doctors directory.</p>
          </div>

          <div className="services-filter-bar">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search doctors by name or qualification..."
                className="search-input"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="doctors-filter-chips">
            <button
              type="button"
              className={`chip ${selectedDoctorCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDoctorCategory('All')}
            >
              All Specialists (20)
            </button>
            {SPECIALIZATIONS.map(s => (
              <button
                key={s.id}
                type="button"
                className={`chip ${selectedDoctorCategory === s.title ? 'active' : ''}`}
                onClick={() => setSelectedDoctorCategory(s.title)}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-avatar-box">
                  <div className="doctor-avatar-circle">
                    {doctor.name.replace('Dr. ', '').charAt(0)}
                  </div>
                </div>
                <div className="doctor-body">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <div className="doctor-spec">{doctor.specialization}</div>
                  <span className="doctor-qual">{doctor.qualification}</span>
                  <div className="doctor-footer">
                    <button 
                      type="button"
                      className="btn btn-primary btn-sm" 
                      style={{ width: '100%' }}
                      onClick={onOpenAppointment}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="doctor-disclaimer-note">
            <Clock size={20} className="text-teal" />
            <span>
              <strong>Note on Availability:</strong> Doctor availability may vary by branch and appointment schedule. Please contact Eledent Dental Hospital at {CLINIC_INFO.phone} for current availability.
            </span>
          </div>
        </div>
      </section>

      {/* ===================== TECHNOLOGY SECTION ===================== */}
      <section id="technology" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">DIGITAL DIAGNOSTICS</span>
            <h2 className="section-title">Advanced Dental Technology</h2>
            <p className="section-desc">State-of-the-art technological systems utilized at our Banjara Hills clinic branch.</p>
          </div>

          <div className="tech-grid">
            {TECHNOLOGIES.map((tech, idx) => (
              <div key={idx} className="tech-card">
                <div className="tech-icon">
                  <Cpu size={22} />
                </div>
                <div className="tech-info">
                  <h3>{tech.name}</h3>
                  <p>{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE ELEDENT ===================== */}
      <section id="why-eledent" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">PATIENT CONFIDENCE</span>
            <h2 className="section-title">Why Patients Choose Eledent Dental Hospital</h2>
            <p className="section-desc">Factual reasons why patients trust our Banjara Hills clinic for their oral care.</p>
          </div>

          <div className="why-grid">
            {WHY_CHOOSE_POINTS.map((pt, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-box">
                  <Award size={22} />
                </div>
                <h3>{pt.title}</h3>
                <p>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LOCATION & TIMINGS ===================== */}
      <section id="location" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">CONVENIENT ACCESS</span>
            <h2 className="section-title">Visit Our Banjara Hills Clinic</h2>
            <p className="section-desc">Located on Road No. 12, Sri Ram Nagar Colony, Banjara Hills, Hyderabad.</p>
          </div>

          <div className="location-grid">
            <div className="location-info-card">
              <div className="address-block">
                <h3>{CLINIC_INFO.name}</h3>
                <p className="address-text">
                  {CLINIC_INFO.address.building}<br />
                  {CLINIC_INFO.address.street}, {CLINIC_INFO.address.colony}<br />
                  {CLINIC_INFO.address.area}, {CLINIC_INFO.address.city}<br />
                  {CLINIC_INFO.address.state} – {CLINIC_INFO.address.pincode}
                </p>
              </div>

              <div className="timings-block">
                <div className="timing-row">
                  <span>Banjara Hills Visiting Hours:</span>
                  <span>{CLINIC_INFO.visitingHoursShort}</span>
                </div>
                <div className="timing-row" style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>{CLINIC_INFO.opdHours}</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 className="landmarks-title">Nearby Landmarks Reference:</h4>
                <div className="landmarks-list">
                  {CLINIC_INFO.landmarks.map((lm, idx) => (
                    <div key={idx} className="landmark-item">
                      <MapPin size={14} className="text-teal" /> {lm}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href={CLINIC_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <Navigation size={18} /> Get Directions
                </a>
                <a 
                  href={`tel:${CLINIC_INFO.phoneRaw}`} 
                  className="btn btn-outline"
                >
                  <Phone size={18} /> Call {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            <div className="map-wrapper">
              <iframe
                title="Eledent Dental Hospital Banjara Hills Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.877810332822!2d78.4385!3d17.4175!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzAzLjAiTiA3OMKwMjYnMTguNaJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== APPOINTMENT FORM SECTION ===================== */}
      <section id="appointment" className="section section-alt">
        <div className="container">
          <div className="appointment-card">
            <div className="appointment-grid">
              <div className="appointment-sidebar">
                <div>
                  <h2>Book Your Dental Appointment</h2>
                  <p>Schedule a clinical consultation at our Banjara Hills hospital. Structured appointment slots help ensure minimal waiting time.</p>
                  
                  <div className="appointment-contact-item">
                    <div className="appointment-contact-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Direct Phone</div>
                      <div style={{ fontWeight: '600', color: 'white' }}>{CLINIC_INFO.phone}</div>
                    </div>
                  </div>

                  <div className="appointment-contact-item">
                    <div className="appointment-contact-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Visiting Hours</div>
                      <div style={{ fontWeight: '600', color: 'white' }}>Mon–Sun, 9:30 AM–9:00 PM</div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', marginTop: '2rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#5eead4', fontWeight: '600' }}>
                    Consultation Fee: {CLINIC_INFO.consultationFee}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                    Includes clinical examination & treatment discussion.
                  </div>
                </div>
              </div>

              <div className="appointment-form-body">
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <CheckCircle size={36} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Appointment Request Received</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                      Thank you. Your appointment request has been received. The clinic team will contact you for confirmation.
                    </p>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', service: '', doctor: '', date: '', time: '', message: '' });
                      }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-name">Full Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="home-name" 
                        name="name" 
                        required 
                        placeholder="Enter your full name" 
                        className="form-control" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-phone">Phone Number <span className="required">*</span></label>
                      <input 
                        type="tel" 
                        id="home-phone" 
                        name="phone" 
                        required 
                        placeholder="Enter 10-digit phone number" 
                        className="form-control" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-email">Email Address</label>
                      <input 
                        type="email" 
                        id="home-email" 
                        name="email" 
                        placeholder="Enter email address (optional)" 
                        className="form-control" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-service">Preferred Service <span className="required">*</span></label>
                      <select 
                        id="home-service" 
                        name="service" 
                        required 
                        className="form-control" 
                        value={formData.service} 
                        onChange={handleInputChange}
                      >
                        <option value="">Select Dental Service</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-doctor">Preferred Doctor</label>
                      <select 
                        id="home-doctor" 
                        name="doctor" 
                        className="form-control" 
                        value={formData.doctor} 
                        onChange={handleInputChange}
                      >
                        <option value="">Select Dentist (Optional)</option>
                        {DOCTORS.map(d => (
                          <option key={d.id} value={d.name}>{d.name} ({d.specialization})</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-date">Preferred Date</label>
                      <input 
                        type="date" 
                        id="home-date" 
                        name="date" 
                        className="form-control" 
                        value={formData.date} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="home-time">Preferred Time Slot</label>
                      <select 
                        id="home-time" 
                        name="time" 
                        className="form-control" 
                        value={formData.time} 
                        onChange={handleInputChange}
                      >
                        <option value="">Select Time Slot</option>
                        <option value="Morning (9:30 AM - 12:00 PM)">Morning (9:30 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 9:00 PM)">Evening (4:00 PM - 9:00 PM)</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="home-message">Message or Dental Symptoms</label>
                      <textarea 
                        id="home-message" 
                        name="message" 
                        rows={3} 
                        placeholder="Briefly describe your concern or symptoms..." 
                        className="form-control" 
                        value={formData.message} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="form-group full-width">
                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Request Appointment
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQS SECTION ===================== */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">COMMON QUESTIONS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Factually verified information from our official Banjara Hills source.</p>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className="faq-toggle-icon" />
                </button>
                {activeFaq === idx && (
                  <div className="faq-content">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {serviceModal && (
        <div className="modal-backdrop" onClick={() => setServiceModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setServiceModal(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="service-icon-box" style={{ marginBottom: 0 }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)' }}>{serviceModal.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--brand-teal)', fontWeight: '600' }}>{serviceModal.category}</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {serviceModal.desc}
            </p>
            <div style={{ padding: '1rem', background: 'var(--bg-alt)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                Official Banjara Hills Service
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                This service is provided at Raichandani Construction, Road No. 12, Banjara Hills branch.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setFormData(prev => ({ ...prev, service: serviceModal.name }));
                  setServiceModal(null);
                  onOpenAppointment();
                }}
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
