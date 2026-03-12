import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Insights',   href: '/insights' },
  { label: 'Contact',    href: '/contact' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');

        .footer {
          background-color: #1a2744;
          color: #e2e8f0;
          padding: 72px 0 0;
          font-family: 'Inter', -apple-system, sans-serif;
          width: 100%;
        }

        .footer__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 64px;
          align-items: start;
        }

        /* Brand Column */
        .footer__brand-name {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .footer__brand-tagline {
          font-size: 14px;
          color: #94a3b8;
          margin: 0 0 28px 0;
          line-height: 1.6;
        }

        .footer__social {
          display: flex;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer__social-link:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.07);
          transform: translateY(-2px);
        }

        /* Navigate Column */
        .footer__col-heading {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #64748b;
          margin: 0 0 20px 0;
        }

        .footer__nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .footer__nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .footer__nav-link:hover {
          color: #ffffff;
        }

        /* Bottom Bar */
        .footer__bottom {
          max-width: 1280px;
          margin: 8px auto 0;
          padding: 22px 48px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer__copyright {
          font-size: 13px;
          color: #475569;
          margin: 0;
        }

        .footer__bottom-links {
          display: flex;
          gap: 24px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer__bottom-link {
          font-size: 13px;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer__bottom-link:hover {
          color: #94a3b8;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 540px) {
          .footer__inner {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 36px;
          }
          .footer__bottom {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px 24px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer__inner">

          {/* Col 1 — Brand + Social */}
          <div>
            <h2 className="footer__brand-name">Stronger Every Decade</h2>
            <p className="footer__brand-tagline">Building strength that lasts.</p>
            <ul className="footer__social">
              {socialLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="footer__col-heading">Navigate</p>
            <ul className="footer__nav">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="footer__nav-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Stronger Every Decade. All rights reserved.
          </p>
          <ul className="footer__bottom-links">
            <li><a href="/privacy" className="footer__bottom-link">Privacy</a></li>
            <li><a href="/terms" className="footer__bottom-link">Terms</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}