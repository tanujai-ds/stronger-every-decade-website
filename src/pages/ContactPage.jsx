import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Send to backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', reason: '', message: '' });
        
        // Reset after 4 seconds
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Network error. Please check if the server is running on http://localhost:5000');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasons = [
    'Enquiry about programmes',
    'Discovery call',
    'General question',
    'Partnership opportunity',
    'Other',
  ];

  return (
    <main className="contact-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          font-family: 'Inter', -apple-system, sans-serif;
          background: #ffffff;
          color: #1f2937;
        }

        .contact-page {
          width: 100%;
          overflow-x: hidden;
          margin-top: 80px;
        }

        /* ── HEADER ─────────────────────────────────────────────────────── */
        .contact-header {
          background: linear-gradient(135deg, #f8f9fb 0%, #f0f4f8 100%);
          padding: 100px 32px 80px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .contact-header__eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2E5090;
          margin-bottom: 16px;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .contact-header__title {
          font-size: 56px;
          font-weight: 800;
          color: #0f172e;
          margin-bottom: 24px;
          letter-spacing: -1px;
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .contact-header__subtitle {
          font-size: 18px;
          color: #4b5563;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        /* ── MAIN CONTENT ───────────────────────────────────────────────── */
        .contact-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 32px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .contact-main {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 60px 32px;
          }
        }

        @media (max-width: 768px) {
          .contact-main {
            padding: 40px 20px;
            gap: 40px;
          }

          .contact-header {
            padding: 80px 20px 60px;
          }

          .contact-header__title {
            font-size: 42px;
          }
        }

        /* ── INFO CARDS ─────────────────────────────────────────────────── */
        .contact-info__cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .contact-card {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 32px;
          display: flex;
          gap: 24px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .contact-card:nth-child(1) { animation-delay: 0.05s; }
        .contact-card:nth-child(2) { animation-delay: 0.1s; }
        .contact-card:nth-child(3) { animation-delay: 0.15s; }
        .contact-card:nth-child(4) { animation-delay: 0.2s; }

        .contact-card:hover {
          border-color: #2E5090;
          box-shadow: 0 12px 32px rgba(46, 80, 144, 0.12);
          transform: translateY(-4px);
        }

        .contact-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: #e8eef7;
          border-radius: 12px;
          color: #2E5090;
          flex-shrink: 0;
          transition: all 0.35s ease;
        }

        .contact-card:hover .contact-card__icon {
          background: #2E5090;
          color: #ffffff;
          transform: scale(1.1) rotate(8deg);
        }

        .contact-card__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-card__title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172e;
          margin-bottom: 8px;
        }

        .contact-card__label {
          font-size: 12px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .contact-card__link {
          font-size: 16px;
          color: #2E5090;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
          word-break: break-all;
        }

        .contact-card:hover .contact-card__link {
          color: #0f172e;
          transform: translateX(4px);
        }

        /* Social Card */
        .contact-card--social {
          background: linear-gradient(135deg, #e8eef7 0%, rgba(46, 80, 144, 0.05) 100%);
          border: 1.5px solid #2E5090;
          flex-direction: column;
          padding: 36px;
        }

        .contact-card--social .contact-card__title {
          margin-bottom: 24px;
        }

        .contact-social__links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-social__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: #ffffff;
          border-radius: 8px;
          color: #0f172e;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          border: 1px solid #d1d5db;
          cursor: pointer;
        }

        .contact-social__link:hover {
          background: #2E5090;
          color: #ffffff;
          border-color: #2E5090;
          transform: translateX(6px);
        }

        .contact-social__link .arrow {
          transition: transform 0.3s ease;
        }

        .contact-social__link:hover .arrow {
          transform: translateX(6px);
        }

        /* ── FORM SECTION ───────────────────────────────────────────────── */
        .contact-form-wrapper {
          animation: fadeInUp 0.6s ease-out 0.15s both;
        }

        .contact-form-container {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .contact-form-container {
            padding: 32px;
          }
        }

        .contact-form-header {
          margin-bottom: 40px;
        }

        .contact-form-title {
          font-size: 36px;
          font-weight: 800;
          color: #0f172e;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .contact-form-subtitle {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }

        /* ── FORM FIELDS ────────────────────────────────────────────────── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 700;
          color: #0f172e;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .form-input,
        .form-select,
        .form-textarea {
          font-size: 16px;
          padding: 14px 18px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: #ffffff;
          color: #1f2937;
        }

        .form-input::placeholder,
        .form-select::placeholder,
        .form-textarea::placeholder {
          color: #d1d5db;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #2E5090;
          box-shadow: 0 0 0 3px rgba(46, 80, 144, 0.1);
          background: linear-gradient(135deg, #ffffff 0%, #e8eef7 100%);
        }

        .form-textarea {
          resize: vertical;
          line-height: 1.6;
          min-height: 140px;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232E5090' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }

        /* ── ERROR MESSAGE ──────────────────────────────────────────────── */
        .contact-error {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.02) 100%);
          border: 1.5px solid rgba(239, 68, 68, 0.2);
          padding: 16px 20px;
          border-radius: 8px;
          color: #b91c1c;
          font-size: 14px;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── SUCCESS MESSAGE ────────────────────────────────────────────── */
        .contact-success {
          text-align: center;
          padding: 48px 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%);
          border-radius: 12px;
          border: 1.5px solid rgba(16, 185, 129, 0.2);
          animation: successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes successPop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .contact-success__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: #10b981;
          color: #ffffff;
          border-radius: 50%;
          margin-bottom: 20px;
          animation: iconPulse 0.6s ease-out;
        }

        @keyframes iconPulse {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .contact-success__title {
          font-size: 26px;
          font-weight: 800;
          color: #0f172e;
          margin-bottom: 10px;
        }

        .contact-success__text {
          font-size: 16px;
          color: #4b5563;
        }

        /* ── SUBMIT BUTTON ──────────────────────────────────────────────── */
        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #2E5090 0%, #1a3557 100%);
          color: #ffffff;
          border: none;
          padding: 16px 40px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          box-shadow: 0 8px 24px rgba(46, 80, 144, 0.25);
          width: 100%;
        }

        .contact-submit:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(46, 80, 144, 0.35);
        }

        .contact-submit:active:not(:disabled) {
          transform: translateY(-2px);
        }

        .contact-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-submit.is-submitting {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(46, 80, 144, 0.25); }
          50% { box-shadow: 0 8px 40px rgba(46, 80, 144, 0.4); }
        }

        .submit-icon {
          transition: transform 0.35s ease;
        }

        .contact-submit:hover .submit-icon {
          transform: translateX(4px);
        }

        /* ── CLOSING SECTION ────────────────────────────────────────────── */
        .contact-closing {
          background: linear-gradient(135deg, #0f172e 0%, #1a2a47 100%);
          padding: 80px 32px;
          text-align: center;
          margin-top: 80px;
        }

        .contact-closing__title {
          font-size: 42px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .contact-closing__text {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 36px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-closing__ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          border: none;
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .btn-primary {
          background: #ffffff;
          color: #0f172e;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .btn-secondary:hover {
          background: #ffffff;
          color: #0f172e;
          transform: translateY(-3px);
        }

        .btn-arrow {
          transition: transform 0.35s ease;
          display: inline-block;
        }

        .btn:hover .btn-arrow {
          transform: translateX(6px);
        }

        @media (max-width: 768px) {
          .contact-closing {
            padding: 60px 20px;
          }

          .contact-closing__title {
            font-size: 32px;
          }

          .contact-closing__ctas {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* HEADER */}
      <section className="contact-header">
        <span className="contact-header__eyebrow">Get in touch</span>
        <h1 className="contact-header__title">Let's talk.</h1>
        <p className="contact-header__subtitle">
          Have a question or want to work together? I'd love to hear from you. 
          Reach out through any method below.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-main">
        
        {/* LEFT: INFO CARDS */}
        <aside className="contact-info">
          <div className="contact-info__cards">
            
            {/* Email Card */}
            <div className="contact-card contact-card--email">
              <div className="contact-card__icon">
                <Mail size={32} />
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Email</h3>
                <p className="contact-card__label">Response within 24 hours</p>
                <a href="mailto:huntersports7321@gmail.com" className="contact-card__link">
                  StrongerEveryDecade@gmail.com
                </a> 
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-card contact-card--phone">
              <div className="contact-card__icon">
                <Phone size={32} />
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Phone</h3>
                <p className="contact-card__label">For urgent enquiries</p>
                <a href="tel:+919420409902" className="contact-card__link">
                  +91 9420 409 902
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-card contact-card--location">
              <div className="contact-card__icon">
                <MapPin size={32} />
              </div>
              <div className="contact-card__content">
                <h3 className="contact-card__title">Location</h3>
                <p className="contact-card__label">Based in</p>
                <p className="contact-card__link">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Social Card */}
            <div className="contact-card contact-card--social">
              <h3 className="contact-card__title">Follow me</h3>
              <div className="contact-social__links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="contact-social__link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Twitter size={18} /> Twitter
                  </span>
                  <span className="arrow">→</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-social__link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Linkedin size={18} /> LinkedIn
                  </span>
                  <span className="arrow">→</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-social__link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Instagram size={18} /> Instagram
                  </span>
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT: FORM */}
        <div className="contact-form-wrapper">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h2 className="contact-form-title">Send me an email</h2>
              <p className="contact-form-subtitle">
                Fill in the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            {error && (
              <div className="contact-error">
                {error}
              </div>
            )}

            {submitted && (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <CheckCircle size={40} />
                </div>
                <h3 className="contact-success__title">Message sent!</h3>
                <p className="contact-success__text">Thank you for reaching out. I'll be in touch soon.</p>
              </div>
            )}

            {!submitted && (
              <form className="contact-form" onSubmit={handleSubmit}>
                
                {/* Name Field */}
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <label className="form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Reason Field */}
                <div className="form-group">
                  <label className="form-label">Reason (Optional)</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select a reason</option>
                    {reasons.map(reason => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={`contact-submit ${isSubmitting ? 'is-submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </span>
                  <Send size={18} className="submit-icon" />
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* CLOSING SECTION */}
      <section className="contact-closing">
        <h2 className="contact-closing__title">Prefer another method?</h2>
        <p className="contact-closing__text">
          Whether you have a specific enquiry or want to book a discovery call, 
          I'm here to help and looking forward to connecting with you.
        </p>
        <div className="contact-closing__ctas">
          <a href="/" className="btn btn-primary">
            View Programmes
            <span className="btn-arrow">→</span>
          </a>
          <a href="/" className="btn btn-secondary">
            Book a call
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>

    </main>
  );
}