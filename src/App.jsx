import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import BlogListing from './components/BlogListing';
import BlogArticle from './components/BlogArticle';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import StickyMobileBar from './components/StickyMobileBar';
import Chatbot from './components/Chatbot';

// ────────────────────────────────────────────────────────────────────────────
// CLIENT-SIDE ROUTER  (hash-based, no react-router-dom dependency)
// Reads the current path from window.location.pathname and re-renders on
// popstate so the Back/Forward buttons work correctly.
// ────────────────────────────────────────────────────────────────────────────

function getRoute() {
  return window.location.pathname || '/';
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(getRoute());
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Listen for browser Back / Forward navigation
  useEffect(() => {
    const handlePop = () => setCurrentRoute(getRoute());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Navigate programmatically: push a new history entry and update route
  const navigate = useCallback((path) => {
    // Handle hash fragments on the home route (e.g. '/#services')
    const [pathPart, hashPart] = path.split('#');
    const cleanPath = pathPart || '/';

    if (window.location.pathname !== cleanPath) {
      window.history.pushState(null, '', hashPart ? `${cleanPath}#${hashPart}` : cleanPath);
      setCurrentRoute(cleanPath);
      // Scroll to top first; section anchor scrolling happens in LandingPage
      if (!hashPart) window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Same path — just scroll to hash if any
      if (hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          const headerOffset = 80;
          const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Open / close appointment modal
  const openAppointment = useCallback(() => setAppointmentModalOpen(true), []);
  const closeAppointment = useCallback(() => setAppointmentModalOpen(false), []);

  // ── Route matching ──────────────────────────────────────────────────────
  const renderPage = () => {
    // /blog/:slug  →  individual article
    if (currentRoute.startsWith('/blog/')) {
      const slug = currentRoute.replace('/blog/', '');
      return (
        <BlogArticle
          slug={slug}
          navigate={navigate}
          onOpenAppointment={openAppointment}
        />
      );
    }

    // /blog  →  listing page
    if (currentRoute === '/blog') {
      return (
        <BlogListing
          navigate={navigate}
          onOpenAppointment={openAppointment}
        />
      );
    }

    // /  →  main landing page (default)
    return (
      <LandingPage
        navigate={navigate}
        onOpenAppointment={openAppointment}
      />
    );
  };

  return (
    <>
      {/* ── Persistent Header ── */}
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenAppointment={openAppointment}
      />

      {/* ── Page Content ── */}
      <main id="main-content" tabIndex="-1">
        {renderPage()}
      </main>

      {/* ── Persistent Footer ── */}
      <Footer navigate={navigate} onOpenAppointment={openAppointment} />

      {/* ── Appointment Modal (global overlay) ── */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={closeAppointment}
      />

      {/* ── Sticky Mobile Bottom Bar ── */}
      <StickyMobileBar onOpenAppointment={openAppointment} />

      {/* ── Floating AI Chatbot ── */}
      <Chatbot onOpenAppointment={openAppointment} />
    </>
  );
}

export default App;
