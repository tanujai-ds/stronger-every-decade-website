import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const navLinks = [
  { label: 'Home',       href: '/',           num: '01' },
  { label: 'About',      href: '/about',       num: '02' },
  { label: 'Philosophy', href: '/philosophy',  num: '03' },
  { label: 'Insights',   href: '/insights',    num: '04' },
  { label: 'Contact',    href: '/contact',     num: '05' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com',  label: 'Instagram' },
  { icon: Youtube,   href: 'https://youtube.com',    label: 'YouTube'   },
  { icon: Twitter,   href: 'https://x.com',          label: 'X'         },
  { icon: Linkedin,  href: 'https://linkedin.com',   label: 'LinkedIn'  },
];

export default function NavBar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hoveredIdx,setHoveredIdx]= useState(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const itemRefs  = useRef([]);
  const drawerRef = useRef(null);
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* close on route change */
  useEffect(() => setMenuOpen(false), [location.pathname]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* animated highlight bar that follows hovered item */
  useEffect(() => {
    if (hoveredIdx === null) {
      setLineStyle(s => ({ ...s, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[hoveredIdx];
    if (!el || !drawerRef.current) return;
    const drawerTop = drawerRef.current.getBoundingClientRect().top;
    const elRect    = el.getBoundingClientRect();
    setLineStyle({
      top:     elRect.top - drawerTop,
      height:  elRect.height,
      opacity: 1,
    });
  }, [hoveredIdx]);

  const navBg     = isHome && !scrolled ? 'bg-transparent' : 'bg-white shadow-sm border-b border-gray-100';
  const textColor = isHome && !scrolled ? 'text-white'     : 'text-gray-900';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Sora:wght@600;700;800&display=swap');
        * { font-family:'Inter',-apple-system,sans-serif; box-sizing:border-box; }

        /* ── Desktop brand ── */
        .nb__brand { display:flex;align-items:center;text-decoration:none;transition:opacity .3s; }
        .nb__brand:hover { opacity:.7; }
        .nb__brand-col { display:flex;flex-direction:column;gap:1px; }
        .nb__logo-main { font-family:'Sora',sans-serif;font-weight:800;font-size:24px;letter-spacing:-.01em;line-height:1;text-transform:uppercase; }
        .nb__logo-sub  { font-family:'Inter',sans-serif;font-weight:600;font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.7; }

        /* ── Desktop nav ── */
        .nb__nav { display:flex;align-items:center;gap:36px;list-style:none;margin:0;padding:0;flex:1;justify-content:center; }
        .nb__link { font-weight:600;font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;position:relative;padding-bottom:6px;display:block;transition:color .3s; }
        .nb__link::after { content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:#000;transition:width .3s ease; }
        .nb__link:hover::after,.nb__link--active::after { width:100%; }
        .nb__link--active { font-weight:700; }

        /* ── Desktop CTA ── */
        .nb__cta { font-weight:700;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:11px 22px;border:2px solid currentColor;border-radius:3px;text-decoration:none;transition:all .25s;display:inline-block;position:relative;overflow:hidden; }
        .nb__cta::before { content:'';position:absolute;inset:0;background:#000;transform:scaleX(0);transform-origin:left;transition:transform .25s;z-index:-1; }
        .nb__cta:hover::before { transform:scaleX(1); }
        .nb__cta:hover { color:white!important;border-color:#000; }

        /* ── Hamburger ── */
        .nb__hamburger { display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:6px;background:transparent;border:none;cursor:pointer;transition:background .2s;z-index:1001;position:relative; }

        /* ── Backdrop ── */
        .nb__backdrop { position:fixed;inset:0;z-index:998;background:rgba(0,0,0,.5);backdrop-filter:blur(2px);transition:opacity .35s,visibility .35s; }
        .nb__backdrop--open   { opacity:1;visibility:visible; }
        .nb__backdrop--closed { opacity:0;visibility:hidden;pointer-events:none; }

        /* ── Drawer ── */
        .nb__drawer {
          position:fixed;top:0;left:0;bottom:0;
          width:320px;max-width:88vw;
          z-index:999;
          background:#0a0a0a;
          display:flex;flex-direction:column;
          transform:translateX(-100%);
          transition:transform .45s cubic-bezier(.4,0,.2,1);
          overflow:hidden;
        }
        .nb__drawer--open { transform:translateX(0); }

        /* grid texture */
        .nb__drawer::after {
          content:'';position:absolute;inset:0;pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
          background-size:48px 48px;
        }

        /* ── Drawer top ── */
        .nb__dtop {
          position:relative;z-index:3;
          display:flex;align-items:center;justify-content:space-between;
          padding:22px 28px;
          border-bottom:1px solid rgba(255,255,255,.07);
          flex-shrink:0;
        }
        .nb__dtop-brand-main { font-family:'Sora',sans-serif;font-weight:800;font-size:19px;letter-spacing:-.01em;text-transform:uppercase;color:#fff;line-height:1; }
        .nb__dtop-brand-sub  { font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-top:3px; }

        .nb__dclose {
          width:36px;height:36px;border-radius:6px;
          border:1px solid rgba(255,255,255,.12);background:transparent;
          display:flex;align-items:center;justify-content:center;
          color:rgba(255,255,255,.5);cursor:pointer;
          transition:all .2s;flex-shrink:0;
        }
        .nb__dclose:hover { background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3);color:#fff; }

        /* ── Nav section ── */
        .nb__dnav {
          position:relative;z-index:2;
          flex:1;display:flex;flex-direction:column;justify-content:center;
          padding:8px 0;
        }

        /* animated highlight bar */
        .nb__dbar {
          position:absolute;left:0;right:0;
          background:rgba(255,255,255,.05);
          border-left:2px solid rgba(255,255,255,.7);
          transition:top .25s cubic-bezier(.4,0,.2,1), height .25s cubic-bezier(.4,0,.2,1), opacity .2s;
          pointer-events:none; z-index:1;
        }

        .nb__dlist { list-style:none;margin:0;padding:0; }

        .nb__ditem { border-bottom:1px solid rgba(255,255,255,.05); }
        .nb__ditem:first-child { border-top:1px solid rgba(255,255,255,.05); }

        .nb__dlink {
          display:flex;align-items:center;gap:16px;
          padding:18px 28px;text-decoration:none;
          position:relative;z-index:2;
          transition:padding-left .25s;
        }
        .nb__dlink:hover { padding-left:34px; }

        /* active left accent */
        .nb__dlink--active .nb__dlink-num { color:rgba(255,255,255,.6)!important; }
        .nb__dlink--active .nb__dlink-label { color:#fff!important; }
        .nb__dlink--active::before {
          content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
          width:3px;height:55%;background:#fff;border-radius:0 2px 2px 0;
        }

        .nb__dlink-num {
          font-size:9px;font-weight:700;letter-spacing:.14em;
          color:rgba(255,255,255,.18);min-width:18px;
          transition:color .25s;
        }
        .nb__dlink-label {
          font-family:'Sora',sans-serif;font-weight:700;
          font-size:26px;letter-spacing:-.01em;
          color:rgba(255,255,255,.5);
          transition:color .25s;line-height:1;
        }
        .nb__dlink-arrow {
          margin-left:auto;color:rgba(255,255,255,.0);
          transition:color .25s,transform .25s;
        }
        .nb__dlink:hover .nb__dlink-label  { color:#fff; }
        .nb__dlink:hover .nb__dlink-num    { color:rgba(255,255,255,.5); }
        .nb__dlink:hover .nb__dlink-arrow  { color:rgba(255,255,255,.35);transform:translateX(4px); }

        /* stagger animation on open */
        .nb__ditem { opacity:0;transform:translateX(-16px);transition:opacity .35s,transform .35s; }
        .nb__drawer--open .nb__ditem { opacity:1;transform:translateX(0); }
        .nb__drawer--open .nb__ditem:nth-child(1) { transition-delay:.1s; }
        .nb__drawer--open .nb__ditem:nth-child(2) { transition-delay:.15s; }
        .nb__drawer--open .nb__ditem:nth-child(3) { transition-delay:.2s; }
        .nb__drawer--open .nb__ditem:nth-child(4) { transition-delay:.25s; }
        .nb__drawer--open .nb__ditem:nth-child(5) { transition-delay:.3s; }

        /* ── Drawer footer ── */
        .nb__dfooter {
          position:relative;z-index:3;
          padding:18px 28px 30px;
          border-top:1px solid rgba(255,255,255,.07);
          flex-shrink:0;
        }

        /* social icons */
        .nb__dsocial {
          display:flex;gap:10px;margin-bottom:16px;
          list-style:none;padding:0;margin-top:0;
        }
        .nb__dsocial-link {
          width:34px;height:34px;border-radius:7px;
          border:1px solid rgba(255,255,255,.1);
          background:transparent;
          display:flex;align-items:center;justify-content:center;
          color:rgba(255,255,255,.35);text-decoration:none;
          transition:all .2s;
        }
        .nb__dsocial-link:hover { background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.3);color:#fff; }

        .nb__dcta {
          display:block;text-align:center;
          font-family:'Inter',sans-serif;font-weight:800;
          font-size:10px;letter-spacing:.2em;text-transform:uppercase;
          text-decoration:none;color:#0a0a0a;
          padding:13px 24px;background:#ffffff;border-radius:3px;
          transition:all .25s;
          opacity:0;transform:translateY(8px);
          transition:opacity .35s .35s, transform .35s .35s, background .2s, box-shadow .2s;
        }
        .nb__drawer--open .nb__dcta { opacity:1;transform:translateY(0); }
        .nb__dcta:hover { background:#e5e5e5;box-shadow:0 6px 20px rgba(0,0,0,.35);transform:translateY(-1px); }

        .nb__dtagline { text-align:center;margin-top:10px;font-size:9px;color:rgba(255,255,255,.18);letter-spacing:.1em;text-transform:uppercase; }

        @media (max-width:1023px) {
          .nb__nav { display:none; }
          .nb__desktop-cta { display:none!important; }
          .nb__hamburger { display:flex; }
          .nb__logo-main { font-size:20px; }
          .nb__logo-sub  { font-size:10px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${navBg}`}
        style={{ zIndex:1000 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'32px' }}>

          <Link to="/" className="nb__brand" aria-label="Stronger Every Decade">
            <div className="nb__brand-col">
              <div className={`nb__logo-main ${textColor}`}>STRONGER</div>
              <div className={`nb__logo-sub  ${textColor}`}>EVERY DECADE</div>
            </div>
          </Link>

          <ul className="nb__nav">
            {navLinks.map(({ label, href }) => {
              const active = location.pathname === href;
              return (
                <li key={href}>
                  <Link to={href} className={`nb__link ${active ? 'nb__link--active' : ''} ${textColor}`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ display:'flex',alignItems:'center',gap:'16px',flexShrink:0 }}>
            <Link to="/work-with-me" className={`nb__cta nb__desktop-cta ${isHome && !scrolled ? 'text-white' : 'text-gray-900'}`}>
              Work With Me
            </Link>
            <button
              className="nb__hamburger"
              style={{ color: isHome && !scrolled ? 'white' : '#0a0a0a' }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── BACKDROP ── */}
      <div
        className={`nb__backdrop ${menuOpen ? 'nb__backdrop--open' : 'nb__backdrop--closed'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── LEFT DRAWER ── */}
      <div ref={drawerRef} className={`nb__drawer ${menuOpen ? 'nb__drawer--open' : ''}`}>

        {/* Top — Brand + Close */}
        <div className="nb__dtop">
          <div>
            <div className="nb__dtop-brand-main">STRONGER</div>
            <div className="nb__dtop-brand-sub">Every Decade</div>
          </div>
          <button className="nb__dclose" onClick={() => setMenuOpen(false)} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <div className="nb__dnav">
          {/* animated hover bar */}
          <div
            className="nb__dbar"
            style={{
              top:     lineStyle.top,
              height:  lineStyle.height,
              opacity: lineStyle.opacity,
            }}
          />

          <ul className="nb__dlist">
            {navLinks.map(({ label, href, num }, idx) => {
              const active = location.pathname === href;
              return (
                <li
                  key={href}
                  className="nb__ditem"
                  ref={el => itemRefs.current[idx] = el}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <Link to={href} className={`nb__dlink ${active ? 'nb__dlink--active' : ''}`}>
                    <span className="nb__dlink-num">{num}</span>
                    <span className="nb__dlink-label">{label}</span>
                    <span className="nb__dlink-arrow"><ArrowRight size={16} /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div className="nb__dfooter">
          {/* Social icons */}
          <ul className="nb__dsocial">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="nb__dsocial-link" aria-label={label}>
                  <Icon size={15} />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link to="/work-with-me" className="nb__dcta">
            Work With Me
          </Link>
          <p className="nb__dtagline">Building strength that lasts.</p>
        </div>
      </div>
    </>
  );
}