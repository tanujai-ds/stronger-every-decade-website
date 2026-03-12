import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import NavBar           from './components/NavBar';
import Footer          from './components/Footer';
import WhatsAppButton  from './components/Whatsappbutton';
import HomePage        from './pages/HomePage';
import AboutPage       from './pages/AboutPage';
import PhilosophyPage  from './pages/PhilosophyPage';
import WorkWithMePage  from './pages/WorkWithMePage';
import InsightsPage    from './pages/InsightsPage';
import Articledetail   from './pages/Articledetail';
import ContactPage     from './pages/ContactPage';
import PrivacyPage     from './pages/PrivacyPage';
import TermsPage       from './pages/TermsPage';

import './styles/index.css';

function NotFoundPage() {
  return (
    <main id="main" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F5F5' }}>
      <div style={{ textAlign: 'center', padding: '96px 24px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A5A8A', marginBottom: 16 }}>404</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#1F1F1F', marginBottom: 16 }}>Page not found.</h1>
        <p style={{ fontSize: 17, color: '#4A4A4A', marginBottom: 40 }}>That page doesn't exist. Let's get you back on track.</p>
        <a href="/" style={{ display: 'inline-block', background: '#1F1F1F', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, padding: '14px 40px', textDecoration: 'none', borderRadius: '4px' }}>Return home</a>
      </div>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/philosophy"   element={<PhilosophyPage />} />
        <Route path="/work-with-me" element={<WorkWithMePage />} />
        <Route path="/insights"     element={<InsightsPage />} />
        <Route path="/articledetail" element={<Articledetail />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="/privacy"      element={<PrivacyPage />} />
        <Route path="/terms"        element={<TermsPage />} />
        <Route path="*"             element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}