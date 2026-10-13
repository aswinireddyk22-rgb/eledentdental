import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Shield, User } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

const CHATBOT_QUICK_QUESTIONS = [
  "What are your clinic timings?",
  "What is the consultation fee?",
  "Where is the Banjara Hills clinic?",
  "What root canal treatments do you offer?",
  "Do you provide dental implants?",
  "Are Invisalign treatments available?",
  "Who are your dentists?",
  "How do I book an appointment?"
];

export default function Chatbot({ onOpenAppointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hi! I’m the Eledent Care Assistant. I can help you find information about our Banjara Hills clinic, dental treatments, specialists, timings, location, and appointment booking. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current && isOpen) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (customText = null) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!customText) setInputValue('');

    const query = textToSend.toLowerCase();
    let reply = '';

    // Guardrail against medical diagnosis
    if (
      query.includes('do i have') || 
      query.includes('diagnose') || 
      query.includes('prescribe') || 
      query.includes('medicine for') || 
      (query.includes('cavity') && query.includes('hurts'))
    ) {
      reply = "Only a qualified dental professional can assess your condition and recommend the appropriate clinical treatment. Please visit Eledent Dental Hospital at Road No. 12, Banjara Hills for an in-person clinical examination (₹300 consultation).";
    }
    else if (query.includes('consultation fee') || query.includes('fee') || query.includes('cost of consultation')) {
      reply = CLINIC_INFO.consultationFeeDetails;
    }
    else if (query.includes('timing') || query.includes('hours') || query.includes('open') || query.includes('when')) {
      reply = `Banjara Hills Visiting Hours: ${CLINIC_INFO.visitingHoursShort}. General OPD contact is open Mon–Sun 9:00 AM–9:00 PM.`;
    }
    else if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('direction')) {
      reply = `Eledent Dental Hospital is located at: ${CLINIC_INFO.address.full}. Nearby landmarks include Century Hospitals, TX Hospital, and Nilofer Cafe on Road No. 12.`;
    }
    else if (query.includes('root canal') || query.includes('rct')) {
      reply = "We offer microscopic and laser-assisted root canal treatment to gently save infected teeth. Our endodontist is Dr. Himasree Kasireddy (MDS). Check our blog for our detailed guide on Root Canal Steps, Pain & Cost!";
    }
    else if (query.includes('implant')) {
      reply = "Yes, we offer advanced titanium dental implants for permanent tooth replacement with 3D CBCT digital planning, led by Dr. Tarun Nalam (Implantologist).";
    }
    else if (query.includes('invisalign') || query.includes('braces') || query.includes('aligner')) {
      reply = "We provide both conventional braces (metal/ceramic) and Invisalign clear aligners customized by our orthodontist Dr. Mounica (MDS).";
    }
    else if (query.includes('doctor') || query.includes('dentist') || query.includes('specialist')) {
      reply = "Eledent has a multidisciplinary team of 20 verified BDS and MDS dentists spanning 10 dental disciplines including endodontics, implantology, orthodontics, periodontics, pediatric dentistry, and oral surgery.";
    }
    else if (query.includes('book') || query.includes('appointment')) {
      reply = `You can book an appointment directly through our online form on this page or call our Banjara Hills desk directly at ${CLINIC_INFO.phone}.`;
    }
    else {
      reply = `For personalized inquiries, our Banjara Hills team is happy to assist at ${CLINIC_INFO.phone} or in person at Road No. 12, Banjara Hills.`;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 450);
  };

  return (
    <>
      <button 
        type="button"
        className="chatbot-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Dental Chatbot"
      >
        <span className="chatbot-pulse" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Eledent Care Assistant AI Chatbot">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">E</div>
              <div>
                <div className="chatbot-title">Eledent Care Assistant</div>
                <div className="chatbot-status">
                  <span className="online-dot" /> Hospital AI Assistant
                </div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)} 
              className="chat-close-btn"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble chat-bubble-${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          <div className="chat-chips-scroll">
            <div className="chat-chips-container">
              {CHATBOT_QUICK_QUESTIONS.map((q, idx) => (
                <button 
                  key={idx} 
                  type="button" 
                  className="chat-chip"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="chatbot-footer">
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Ask about treatments, fee, timings..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              type="button" 
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
