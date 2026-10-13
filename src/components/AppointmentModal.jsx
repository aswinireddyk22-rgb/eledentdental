import React, { useState } from 'react';
import { X, CheckCircle, Phone, Calendar, Clock, Sparkles } from 'lucide-react';
import { CLINIC_INFO, SERVICES, DOCTORS } from '../data/clinicData';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    doctor: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      alert('Please fill in required fields: Name, Phone Number, and Preferred Service.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', service: '', doctor: '', date: '', time: '', message: '' });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content appointment-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close appointment modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary-navy)' }}>
              Appointment Request Received
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
              Thank you, <strong>{formData.name}</strong>. Your consultation request for <strong>{formData.service}</strong> has been logged. Our reception at Road No. 12, Banjara Hills will call you shortly to confirm your time slot.
            </p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleReset}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header-banner">
              <span className="eyebrow-mini">ELEDENT DENTAL HOSPITAL • BANJARA HILLS</span>
              <h2 id="modal-title" style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginTop: '0.25rem' }}>
                Book Your Dental Consultation
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultation fee is ₹300 (includes clinical exam & treatment discussion). Open daily 9:30 AM–9:00 PM.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="modal-name">Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="modal-name" 
                  name="name" 
                  required 
                  placeholder="Enter your name" 
                  className="form-control" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-phone">Phone Number <span className="required">*</span></label>
                <input 
                  type="tel" 
                  id="modal-phone" 
                  name="phone" 
                  required 
                  placeholder="Enter 10-digit number" 
                  className="form-control" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-email">Email Address</label>
                <input 
                  type="email" 
                  id="modal-email" 
                  name="email" 
                  placeholder="Optional email" 
                  className="form-control" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-service">Treatment / Concern <span className="required">*</span></label>
                <select 
                  id="modal-service" 
                  name="service" 
                  required 
                  className="form-control" 
                  value={formData.service} 
                  onChange={handleInputChange}
                >
                  <option value="">Select Treatment Concern</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-doctor">Preferred Specialist (Optional)</label>
                <select 
                  id="modal-doctor" 
                  name="doctor" 
                  className="form-control" 
                  value={formData.doctor} 
                  onChange={handleInputChange}
                >
                  <option value="">Any Available Specialist</option>
                  {DOCTORS.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-date">Preferred Date</label>
                <input 
                  type="date" 
                  id="modal-date" 
                  name="date" 
                  className="form-control" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="modal-time">Preferred Time Slot</label>
                <select 
                  id="modal-time" 
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
                <label className="form-label" htmlFor="modal-msg">Dental Symptoms or Notes</label>
                <textarea 
                  id="modal-msg" 
                  name="message" 
                  rows={2} 
                  placeholder="Describe your toothache, sensitivity, or dental question..." 
                  className="form-control" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="form-group full-width">
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Submit Appointment Request (₹300)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
