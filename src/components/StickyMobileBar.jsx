import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function StickyMobileBar({ onOpenAppointment }) {
  return (
    <nav className="sticky-mobile-bar" aria-label="Quick Action Navigation">
      <a 
        href={`tel:${CLINIC_INFO.phoneRaw}`} 
        className="sticky-action-btn sticky-action-call"
        aria-label={`Call ${CLINIC_INFO.phone}`}
      >
        <Phone size={18} />
        <span>Call Now</span>
      </a>

      <a 
        href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20dental%20treatments%20at%20Eledent%20Banjara%20Hills.`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="sticky-action-btn sticky-action-wa"
        aria-label="WhatsApp Eledent Banjara Hills"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>

      <button 
        type="button"
        className="sticky-action-btn sticky-action-book"
        onClick={onOpenAppointment}
        aria-label="Book appointment slot"
      >
        <Calendar size={18} />
        <span>Book Slot</span>
      </button>
    </nav>
  );
}
