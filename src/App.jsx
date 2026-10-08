import React, { useState, useRef, useEffect } from 'react';
import { 
  Building,
  Home, 
  HardHat, 
  Briefcase, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  CheckCircle,
  X,
  MessageCircle,
  Send,
  Bot
} from 'lucide-react';

const WEBSITE_DATA = {
  about: "Green Home Developers is a leading real estate company committed to building better homes and creating better lives. Our mission is to provide quality properties and thoughtfully designed spaces.",
  services: ["Residential Development", "Property Development", "Construction", "Project Planning", "Real Estate Consultation", "Customer Support"],
  projects: [
    { name: "Green Valley Villas", location: "North Hills", description: "Luxury 4BHK villas with modern amenities.", status: "Under Construction" },
    { name: "Eco Heights", location: "Downtown", description: "Premium 3BHK apartments with eco-friendly features.", status: "Completed" },
    { name: "Sunrise Apartments", location: "East Avenue", description: "Affordable 2BHK and 3BHK homes.", status: "Ongoing" }
  ],
  whyChooseUs: ["Quality Construction", "Prime Locations", "Modern Designs", "Transparent Process", "Customer Satisfaction", "Trusted Service"],
  contact: { phone: "+1 234 567 890", email: "info@greenhomedevelopers.com", address: "123 Green Avenue, NY 10001" },
  enquiryMessage: "Please submit an enquiry or contact the Green Home Developers team for current pricing and more details."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'ai', text: 'Hello! I am the Green Home AI Assistant. How can I help you today?' }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text) => {
    const userMessage = text || inputValue;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');

    // AI Logic
    setTimeout(() => {
      let aiResponse = "Sorry, I couldn't find that information on the Green Home Developers website. Please contact our team for more details.";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('service')) {
        aiResponse = "Green Home Developers provides services including residential development, property development, construction, project planning, real-estate consultation, and customer support.";
      } else if (lowerInput.includes('project') && (lowerInput.includes('what') || lowerInput.includes('have'))) {
        aiResponse = "We have several projects including Green Valley Villas, Eco Heights, and Sunrise Apartments. Would you like to know more about their locations?";
      } else if (lowerInput.includes('location') || lowerInput.includes('where')) {
        aiResponse = "Our projects are located in North Hills (Green Valley Villas), Downtown (Eco Heights), and East Avenue (Sunrise Apartments).";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        aiResponse = "I couldn't find pricing information on the website. Please submit an enquiry or contact the Green Home Developers team for current pricing.";
      } else if (lowerInput.includes('enquire') || lowerInput.includes('inquiry') || lowerInput.includes('buy')) {
        aiResponse = "Sure! Please fill out the Enquiry Form on our website with your name, phone number, email, and project details. Our team can contact you regarding your enquiry.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('call')) {
        aiResponse = `You can contact us at ${WEBSITE_DATA.contact.phone} or email us at ${WEBSITE_DATA.contact.email}.`;
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        aiResponse = "Hello! How can I assist you with Green Home Developers today?";
      }

      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      <button className="chat-btn" onClick={() => setIsOpen(true)} style={{ display: isOpen ? 'none' : 'flex' }}>
        <Bot size={24} /> AI Assistant
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Green Home AI Assistant</h3>
              <p style={{ fontSize: '0.875rem', margin: 0, opacity: 0.8 }}>How can I help you?</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '0 1rem 0.5rem' }}>
            <div className="quick-questions">
              <button className="quick-btn" onClick={() => handleSend("What services do you provide?")}>What services do you provide?</button>
              <button className="quick-btn" onClick={() => handleSend("Where are your projects located?")}>Where are your projects located?</button>
              <button className="quick-btn" onClick={() => handleSend("How can I enquire about a property?")}>How can I enquire about a property?</button>
            </div>
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Type your message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send" onClick={() => handleSend()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};


function App() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [enquiryStatus, setEnquiryStatus] = useState('');

  const services = [
    { title: "Residential Development", icon: <Home size={32} />, desc: "Creating dream homes with modern amenities." },
    { title: "Property Development", icon: <Building size={32} />, desc: "Developing premium commercial and residential properties." },
    { title: "Construction", icon: <HardHat size={32} />, desc: "High-quality construction with the best materials." },
    { title: "Project Planning", icon: <Briefcase size={32} />, desc: "Comprehensive planning from concept to completion." },
    { title: "Real Estate Consultation", icon: <Users size={32} />, desc: "Expert advice on real estate investments." },
    { title: "Customer Support", icon: <Phone size={32} />, desc: "24/7 dedicated support for all our clients." }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const testimonials = [
    { name: "John Doe", text: "Green Home Developers helped me find the perfect villa for my family. Highly recommended!", rating: 5, img: "https://i.pravatar.cc/150?img=11" },
    { name: "Sarah Smith", text: "The transparent process and quality construction exceeded our expectations.", rating: 5, img: "https://i.pravatar.cc/150?img=5" },
    { name: "Michael Johnson", text: "Excellent customer service and prime locations. Very satisfied with our new home.", rating: 4, img: "https://i.pravatar.cc/150?img=12" }
  ];

  const handleEnquiry = (e) => {
    e.preventDefault();
    setEnquiryStatus('Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.');
    e.target.reset();
    setTimeout(() => setEnquiryStatus(''), 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content container">
          <h1>Building Better Homes,<br/>Creating Better Lives</h1>
          <p>Discover quality properties, thoughtfully designed spaces, and trusted real-estate solutions with Green Home Developers.</p>
          <div>
            <a href="#projects" className="btn btn-primary">Explore Our Projects</a>
            <a href="#enquiry" className="btn btn-outline">Enquire Now</a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about">
        <div className="container about-grid">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>About Us</h2>
            <p style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
              Green Home Developers is a premier real estate company dedicated to crafting exceptional living spaces. With years of experience, we focus on delivering quality, innovation, and sustainability.
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Our Vision</h3>
              <p>To be the most trusted and innovative real estate developer, creating sustainable communities that enrich lives.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Our Mission</h3>
              <p>To deliver high-quality properties with modern designs and transparent processes, ensuring complete customer satisfaction.</p>
            </div>
            <button className="btn btn-primary">Know More</button>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1541883582496-e260907a9b1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Construction" className="about-img" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-light)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="services-grid">
            {WEBSITE_DATA.projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <img src={galleryImages[idx]} alt={project.name} className="project-img" />
                <div className="project-info">
                  <span className="project-status">{project.status}</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                    <MapPin size={16} /> {project.location}
                  </div>
                  <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>{project.description}</p>
                  <a href="#enquiry" className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', width: '100%', textAlign: 'center', marginLeft: 0 }}>View Project</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Green Home Developers?</h2>
          <div className="features-grid">
            {WEBSITE_DATA.whyChooseUs.map((feature, idx) => (
              <div key={idx} className="feature-item">
                <CheckCircle className="feature-icon" size={24} />
                <span style={{ fontSize: '1.125rem', fontWeight: 500 }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="gallery-item" onClick={() => setLightboxImg(img)}>
                <img src={img} alt={`Gallery image ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonial-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={test.img} alt={test.name} className="avatar" />
                  <div>
                    <h4 style={{ margin: 0 }}>{test.name}</h4>
                    <div className="stars">
                      {[...Array(test.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>"{test.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Interested in Our Properties?</h2>
          <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-light)' }}>Fill in your details and our team will get in touch with you.</p>
          
          <div className="enquiry-container">
            <div>
              <form onSubmit={handleEnquiry}>
                {enquiryStatus && <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{enquiryStatus}</div>}
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Select Project</label>
                  <select className="form-control" required>
                    <option value="">Select a project...</option>
                    <option value="Green Valley Villas">Green Valley Villas</option>
                    <option value="Eco Heights">Eco Heights</option>
                    <option value="Sunrise Apartments">Sunrise Apartments</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Enquiry</button>
              </form>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
              <div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Contact Information</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Feel free to reach out to us directly through any of the following channels.</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="service-icon" style={{ width: '3rem', height: '3rem', margin: 0 }}><Phone size={20} /></div>
                  <div>
                    <strong style={{ display: 'block' }}>Call Us</strong>
                    <span style={{ color: 'var(--text-light)' }}>{WEBSITE_DATA.contact.phone}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="service-icon" style={{ width: '3rem', height: '3rem', margin: 0 }}><Mail size={20} /></div>
                  <div>
                    <strong style={{ display: 'block' }}>Email Us</strong>
                    <span style={{ color: 'var(--text-light)' }}>{WEBSITE_DATA.contact.email}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="service-icon" style={{ width: '3rem', height: '3rem', margin: 0 }}><MapPin size={20} /></div>
                  <div>
                    <strong style={{ display: 'block' }}>Visit Us</strong>
                    <span style={{ color: 'var(--text-light)' }}>{WEBSITE_DATA.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--white)' }}>Your Dream Property Starts Here</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>Explore our projects and take the first step towards finding your ideal home.</p>
          <div>
            <a href="#projects" className="btn btn-primary" style={{ backgroundColor: 'var(--white)', color: 'var(--primary)' }}>Explore Projects</a>
            <a href="#enquiry" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>Green Home Developers</h3>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>Building sustainable, modern, and beautiful homes for a better future.</p>
              <div className="social-links">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
            
            <div>
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#enquiry">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3>Contact</h3>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> {WEBSITE_DATA.contact.phone}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> {WEBSITE_DATA.contact.email}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {WEBSITE_DATA.contact.address}</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Green Home Developers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <button className="close-btn" onClick={() => setLightboxImg(null)}><X size={32} /></button>
          <img src={lightboxImg} alt="Gallery Preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
