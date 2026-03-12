import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

// Import the CEO image
let shantanuImage;
try {
  shantanuImage = require('../aspects/CEO.jpg');
} catch (e) {
  shantanuImage = 'https://via.placeholder.com/380x500/1a1a2e/2B4C7E?text=Shantanu';
}

const AboutPage = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const [activeApproachTab, setActiveApproachTab] = useState(0);
  const [skillBars, setSkillBars] = useState({
    strength: 0,
    mobility: 0,
    recovery: 0,
    discipline: 0,
  });

  const sectionRefs = useRef({});

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroInner = document.querySelector('.ab-hero__inner');
      const heroPhoto = document.querySelector('.ab-hero__photo');
      
      if (heroInner) {
        heroInner.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (heroPhoto) {
        heroPhoto.style.transform = `translateY(${scrollY * 0.2}px) scale(1.01)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Animate skill bars on mount
  useEffect(() => {
    const animateSkillBars = () => {
      setTimeout(() => {
        setSkillBars({
          strength: 95,
          mobility: 88,
          recovery: 92,
          discipline: 98,
        });
      }, 500);
    };
    animateSkillBars();
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let time = 0;
    const particles = [];

    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 50,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        baseOpacity: Math.random() * 0.2 + 0.05,
      });
    }

    const animate = () => {
      time += 0.002;
      
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, idx) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -200) particle.x = canvas.width + 200;
        if (particle.x > canvas.width + 200) particle.x = -200;
        if (particle.y < -200) particle.y = canvas.height + 200;
        if (particle.y > canvas.height + 200) particle.y = -200;

        const offsetX = Math.sin(time + idx) * 50;
        const offsetY = Math.cos(time * 0.7 + idx) * 50;

        const x = particle.x + offsetX;
        const y = particle.y + offsetY;
        const radius = particle.radius + Math.sin(time * 0.5 + idx) * 20;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const opacity = particle.baseOpacity + Math.sin(time * 0.8 + idx) * particle.baseOpacity;
        
        gradient.addColorStop(0, `rgba(43, 76, 126, ${opacity * 1.5})`);
        gradient.addColorStop(0.5, `rgba(43, 76, 126, ${opacity})`);
        gradient.addColorStop(1, 'rgba(43, 76, 126, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });

      const overlayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      overlayGradient.addColorStop(0, 'rgba(10, 12, 16, 0.2)');
      overlayGradient.addColorStop(1, 'rgba(10, 12, 16, 0)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const approachTabs = [
    {
      num: '01',
      title: 'Strength',
      content:
        'Build and maintain lean muscle mass, bone density, and functional power. Strength is the foundation of independence the ability to carry, lift, and move without limitation.',
      highlights: ['Progressive resistance', 'Compound movements', 'Connective tissue strength', 'Power endurance'],
    },
    {
      num: '02',
      title: 'Mobility',
      content:
        'Preserve and improve the range of motion, flexibility, and movement quality across all planes. Mobility allows you to age without stiffness, injury, or compensation patterns.',
      highlights: ['Dynamic flexibility', 'Joint health', 'Movement quality', 'Injury prevention'],
    },
    {
      num: '03',
      title: 'Recovery',
      content:
        'Sleep, nutrition, stress management, and active recovery are non-negotiable. Your body adapts and improves during rest, not during the workout itself.',
      highlights: ['Sleep optimization', 'Nutrition strategy', 'Stress management', 'Passive recovery'],
    },
    {
      num: '04',
      title: 'Discipline',
      content:
        'Show up consistently, execute with intention, and prioritize long-term gains over short-term comfort. Discipline is the bridge between intention and results.',
      highlights: ['Consistency matters', 'Intention-driven', 'Sustainable habits', 'Long-term focus'],
    },
  ];

  const principles = [
    { icon: '⚡', title: 'Function First', desc: 'Every training decision is evaluated by whether it improves real-world capability and longevity.' },
    { icon: '📈', title: 'Progressive Overload', desc: 'Continuous, sustainable improvement. Small gains compound over years and decades.' },
    { icon: '🔄', title: 'Cycle & Recover', desc: 'Periodized training prevents plateaus and injury. Rest is productive, not laziness.' },
    { icon: '🧠', title: 'Mind-Body Unity', desc: 'Movement must be mindful. Ego-driven training breeds injury. Precision beats volume.' },
    { icon: '⏰', title: 'Longevity Lens', desc: 'Will this help me move better at 50? 60? 70? That is the question that drives every decision.' },
    { icon: '💪', title: 'Sustainable Intensity', desc: 'Hard effort without recklessness. Intensity with integrity. Train smart, not just hard.' },
  ];

  const testimonials = [
    {
      stars: '★★★★★',
      quote:
        'Shantanu approach to longevity training changed how I think about aging. I am stronger now at 38 than I was at 28, and it feels sustainable.',
      author: 'Marcus Reid',
      role: 'Tech Founder, 38',
    },
    {
      stars: '★★★★★',
      quote:
        'After following the program for a year, my mobility improved dramatically and my recovery is faster. This is real fitness for real life.',
      author: 'Sarah Chen',
      role: 'Executive Coach, 42',
    },
    {
      stars: '★★★★★',
      quote:
        'The discipline and systems taught here go beyond fitness. This is a philosophy for building a better version of yourself across decades.',
      author: 'James Whitmore',
      role: 'Business Consultant, 51',
    },
  ];

  const credentials = [
    { label: 'Credentials', items: ['Certified Strength & Conditioning Specialist (CSCS)', 'Precision Nutrition Level 2', 'Functional Movement Systems (FMS)'] },
    { label: 'Focus', items: ['Longevity Training', 'Performance Optimization', 'Sustainable Health Systems', 'Behavioral Change'] },
  ];

  return (
    <div className="about-page">
      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="ab-hero">
        <canvas className="ab-hero__canvas" id="heroCanvas"></canvas>
        <div className="ab-hero__vignette"></div>
        
        <div className="container ab-hero__inner" data-section="hero">
          <div className="ab-hero__text">
            <span className="ab-eyebrow">Founder & Philosophy</span>
            <h1 className="ab-hero__title">
              <span className="ab-hero__title-name">Stronger</span>
              <span className="ab-hero__title-name">Every Decade</span>
              <span className="ab-hero__title-rule"></span>
            </h1>
            <p className="ab-hero__subtitle">
              A longevity-first approach to training. Age is not decline. With the right strength, mobility, and discipline, you can be more capable at 50 than you were at 30.
            </p>
            <div className="ab-hero__badges">
              <span className="ab-badge">Strength Training</span>
              <span className="ab-badge">Longevity Focused</span>
              <span className="ab-badge">Habit-Based</span>
            </div>
          </div>

          <div className="ab-hero__photo-wrap">
            <div className="ab-hero__photo-glow"></div>
            <img src={shantanuImage} alt="Shantanu - Founder" className="ab-hero__photo" />
            <div className="ab-hero__photo-card">
              <div className="ab-hero__photo-card-title">Shantanu</div>
              <div className="ab-hero__photo-card-loc">Founder & Creator</div>
              <div className="ab-hero__photo-card-info">10+ Years Experience | 5000+ Trained</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIO SECTION ────────────────────────────────────────────────────── */}
      <section className="ab-bio" ref={(el) => (sectionRefs.current['bio'] = el)} data-section="bio">
        <div className="container">
          <div className={`anim-section ${visibleSections['bio'] ? 'anim-section--visible' : ''}`}>
            <div className="ab-bio__grid">
              <div>
                <h2 className="ab-bio__headline">The Founder</h2>
                <div className="ab-bio__body">
                  <p>
                    <strong>Shantanu</strong> created <strong>Stronger Every Decade</strong> after witnessing a pattern: most fitness culture obsesses over six-packs and Instagram aesthetics on a 12-week timeline. Meanwhile, his clients and his own parents were struggling with the real cost of aging: lost strength, reduced mobility, accumulated injuries, and a gradual decline in independence.
                  </p>
                  <p>
                    He realized that the fitness industry had gotten the timeline wrong. The goal should not be to look great for a photo shoot. The goal should be to move, feel, and perform better with each passing decade. To be <strong>stronger at 50 than at 30</strong>.
                  </p>
                  <p>
                    Stronger Every Decade exists because aging does not have to mean decline. With intentional training, smart recovery, and disciplined habits, strength and capability compound over time. Your body is not a machine that degrades it is a system that adapts to what you demand of it.
                  </p>
                </div>

                <div className="ab-credentials">
                  {credentials.map((cred, idx) => (
                    <div key={idx} className="ab-credential">
                      <h4>{cred.label}</h4>
                      {cred.items.map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="ab-bio__visual-col">
                <div className="ab-bio__quote-block">
                  <div className="ab-bio__quote-mark">"</div>
                  <p className="ab-bio__quote-text">
                    Aging is a design flaw we can engineer our way around. The question is not: how do I look good? The question is: how do I want to move and feel for the next 40 years?
                  </p>
                  <div className="ab-bio__quote-attr">Shantanu</div>
                </div>

                <div className="ab-bio__skill-bars">
                  {[
                    { label: 'Strength Foundation', value: skillBars.strength, key: 'strength' },
                    { label: 'Mobility Practice', value: skillBars.mobility, key: 'mobility' },
                    { label: 'Recovery Priority', value: skillBars.recovery, key: 'recovery' },
                    { label: 'Discipline Level', value: skillBars.discipline, key: 'discipline' },
                  ].map((bar) => (
                    <div key={bar.key}>
                      <div className="ab-skill-bar__header">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="ab-skill-bar__track">
                        <div
                          className="ab-skill-bar__fill"
                          style={{ width: `${bar.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ──────────────────────────────────────────────────── */}
      <section className="ab-stats" ref={(el) => (sectionRefs.current['stats'] = el)} data-section="stats">
        <div className="container">
          <div className={`anim-section ${visibleSections['stats'] ? 'anim-section--visible' : ''}`}>
            <div className="ab-stats__grid">
              <div className="ab-stat">
                <div className="ab-stat__number">10+</div>
                <div className="ab-stat__label">Years</div>
                <div className="ab-stat__desc">Coaching & Programming Experience</div>
              </div>
              <div className="ab-stat">
                <div className="ab-stat__number">5000+</div>
                <div className="ab-stat__label">People Trained</div>
                <div className="ab-stat__desc">From Their 20s Through 70s</div>
              </div>
              <div className="ab-stat">
                <div className="ab-stat__number">100%</div>
                <div className="ab-stat__label">Sustainable</div>
                <div className="ab-stat__desc">Systems Built for Life, Not Sprints</div>
              </div>
              <div className="ab-stat">
                <div className="ab-stat__number">∞</div>
                <div className="ab-stat__label">Potential</div>
                <div className="ab-stat__desc">Your Best Years Are Ahead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH SECTION ───────────────────────────────────────────────── */}
      <section className="ab-approach" ref={(el) => (sectionRefs.current['approach'] = el)} data-section="approach">
        <div className="container">
          <div className={`anim-section ${visibleSections['approach'] ? 'anim-section--visible' : ''}`}>
            <div style={{ marginBottom: '48px' }}>
              <span className="ab-eyebrow">Training Philosophy</span>
              <h2 className="ab-section-title">The Four Pillars</h2>
              <p className="ab-section-intro">Every program is built on these four interconnected elements. Neglect one, and the others suffer. Master all four, and longevity becomes inevitable.</p>
            </div>

            <div className="ab-approach__layout">
              <div className="ab-approach__tabs">
                {approachTabs.map((tab, idx) => (
                  <button
                    key={idx}
                    className={`ab-approach__tab ${activeApproachTab === idx ? 'ab-approach__tab--active' : ''}`}
                    onClick={() => setActiveApproachTab(idx)}
                  >
                    <span className="ab-approach__tab-num">{tab.num}</span>
                    <span className="ab-approach__tab-title">{tab.title}</span>
                  </button>
                ))}
              </div>

              <div className="ab-approach__panel">
                <div className="ab-approach__panel-num">{approachTabs[activeApproachTab].num}</div>
                <h3 className="ab-approach__panel-title">{approachTabs[activeApproachTab].title}</h3>
                <p className="ab-approach__panel-desc">{approachTabs[activeApproachTab].content}</p>
                <ul className="ab-approach__panel-list">
                  {approachTabs[activeApproachTab].highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="ab-check">check</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES SECTION ─────────────────────────────────────────────── */}
      <section className="ab-principles" ref={(el) => (sectionRefs.current['principles'] = el)} data-section="principles">
        <div className="container">
          <div className={`anim-section ${visibleSections['principles'] ? 'anim-section--visible' : ''}`}>
            <span className="ab-eyebrow">Core Beliefs</span>
            <h2 className="ab-section-title">Six Principles That Guide Everything</h2>

            <div className="ab-principles__grid">
              {principles.map((principle, idx) => (
                <div key={idx} className="ab-principle">
                  <span className="ab-principle__icon">{principle.icon}</span>
                  <h3 className="ab-principle__title">{principle.title}</h3>
                  <p className="ab-principle__desc">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ───────────────────────────────────────────── */}
      <section className="ab-testimonials" ref={(el) => (sectionRefs.current['testimonials'] = el)} data-section="testimonials">
        <div className="container">
          <div className={`anim-section ${visibleSections['testimonials'] ? 'anim-section--visible' : ''}`}>
            <span className="ab-eyebrow">Community Stories</span>
            <h2 className="ab-section-title">People Are Getting Stronger</h2>

            <div className="ab-testimonials__grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="ab-testimonial">
                  <div className="ab-testimonial__stars">{testimonial.stars}</div>
                  <p className="ab-testimonial__quote">{testimonial.quote}</p>
                  <div className="ab-testimonial__author">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="ab-cta" ref={(el) => (sectionRefs.current['cta'] = el)} data-section="cta">
        <div className="ab-cta__bg-shape"></div>
        <div className={`anim-section ${visibleSections['cta'] ? 'anim-section--visible' : ''}`}>
          <div className="ab-cta__inner">
            <h2 className="ab-cta__headline">Train for Function. Live with Discipline. Let Aesthetics Take Care of Themselves.</h2>
            <p className="ab-cta__sub">
              Ready to get stronger every decade? Join a community of people who believe that your best years are ahead of you.
            </p>
            <div className="ab-cta__buttons">
              <Link to="/work-with-me" className="ab-btn ab-btn--primary">Start Your Journey</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;