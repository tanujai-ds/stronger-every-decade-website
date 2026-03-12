import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data/siteData';
import { Reveal, Eyebrow, TestimonialCard, FAQItem } from '../components/UI';
import './WorkWithMePage.css';

const options = [
  {
    badge: 'Self-paced',
    title: 'Programme + Guide',
    desc: 'The complete decade-specific programme with detailed guidance, progressions, and recovery protocols. Full access at your own pace. The entire framework in your hands.',
    price: '₹2,000',
    cta: 'Enrol now',
    href: '/programmes',
    icon: '📚',
    features: ['Lifetime access', 'Full library', 'Self-guided pace'],
  },
  {
    badge: 'Group',
    title: 'Group Programme',
    desc: 'The programme with bi-weekly group calls, community access, and collective accountability. Limited to [X] women per cohort to maintain quality of support.',
    price: '₹4,000',
    cta: 'Apply to join',
    href: '/programmes',
    icon: '👥',
    features: ['Group calls', 'Community', 'Accountability'],
    featured: true,
  },
  {
    badge: '1:1 Coaching',
    title: 'Private Coaching',
    desc: 'Full programme plus weekly 1:1 sessions, direct messaging access, and a fully individualised progression plan. The highest level of support available.',
    price: '₹6,000',
    cta: 'Book a call first',
    href: '/contact',
    icon: '🎯',
    features: ['Weekly 1:1s', 'Direct access', 'Custom plan'],
  },
];

const steps = [
  {
    num: '01',
    label: 'Book the call',
    body: 'A free 20-minute conversation. No preparation required. Just show up and talk through where you are.',
    icon: '📞',
  },
  {
    num: '02',
    label: 'Complete the intake',
    body: 'A detailed movement and health history form that shapes the programme design. Takes 10 minutes.',
    icon: '📋',
  },
  {
    num: '03',
    label: 'Receive your programme',
    body: 'Your decade-specific programme arrives with full guidance, progressions, and recovery protocols.',
    icon: '🎁',
  },
  {
    num: '04',
    label: 'Begin — and continue',
    body: 'Check-ins, adjustments, and accountability are built into the structure. This is a practice, not a project.',
    icon: '🚀',
  },
];

const wwmFaqs = [
  {
    q: 'Do I need to book a call before enrolling?',
    a: 'No. You can enrol in any self-paced programme directly. A discovery call is recommended for group and 1:1 options to make sure the fit is right.',
  },
  {
    q: 'How long before my programme starts?',
    a: 'Self-paced programmes are available immediately after enrolment. Group cohorts begin on set dates — the next available date will be shown on the programmes page.',
  },
  {
    q: 'What if the programme does not feel right after I start?',
    a: 'Contact us within the first two weeks. We will either adjust the programme or find a more appropriate option. The goal is the right fit, not a completed transaction.',
  },
  {
    q: 'Are payment plans available?',
    a: 'Yes, for group and 1:1 options. Details are provided during the discovery call or on the enrolment page.',
  },
];

function OptionCard({ option, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`option-card-wrapper ${option.featured ? 'featured' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className={`option-card ${isHovered ? 'option-card--hovered' : ''}`}>
        <div className="option-card__icon">{option.icon}</div>
        <span className="decade-badge option-card__badge">{option.badge}</span>
        <h2 className="option-card__title">{option.title}</h2>
        <p className="option-card__desc">{option.desc}</p>
        
        <div className="option-card__features">
          {option.features.map((feature, i) => (
            <div key={i} className="option-card__feature">
              <span className="option-card__feature-dot">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <p className="option-card__price">{option.price}</p>
        <Link to={option.href} className="btn btn-primary option-card__cta">
          {option.cta}
          <span className="btn-arrow">→</span>
        </Link>
      </article>
      {option.featured && <div className="option-card__ribbon">Most Popular</div>}
    </div>
  );
}

export default function WorkWithMePage() {
  const stepsRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNum = entry.target.dataset.stepNum;
            setVisibleSteps((prev) => new Set([...prev, stepNum]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const stepElements = stepsRef.current?.querySelectorAll('[data-step-num]');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="main" className="work-with-me-page">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="wwm-header" aria-label="Page header">
        <div className="wwm-header__bg"></div>
        <div className="container-standard wwm-header__content">
          <Reveal>
            <Eyebrow>Work With Me</Eyebrow>
            <h1 className="wwm-header__title">
              Let us find the right level of support for you.
            </h1>
            <p className="wwm-header__sub">
              Choose the level of support that fits your life right now.
              No pressure. No upsell. The right fit is the only goal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OPTIONS ──────────────────────────────────────────────────── */}
      <section className="wwm-options" aria-label="Programme options">
        <div className="container-wide">
          <div className="wwm-options__intro">
            <Reveal>
              <h2 className="wwm-options__title">Three ways to work together</h2>
              <p className="wwm-options__subtitle">Each level includes the full framework. The difference is the depth of support.</p>
            </Reveal>
          </div>
          <div className="wwm-options__grid">
            {options.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 100}>
                <OptionCard option={opt} delay={i * 100} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVERY CALL ────────────────────────────────────────────── */}
      <section className="wwm-discovery" aria-label="Discovery call">
        <div className="wwm-discovery__bg"></div>
        <div className="container-narrow wwm-discovery__content">
          <Reveal>
            <Eyebrow>Discovery call</Eyebrow>
            <h2 className="wwm-discovery__headline">
              Not sure which option fits?
            </h2>
            <p className="wwm-discovery__body">
              Book a free 20-minute call. We will talk through where you are,
              what you are looking for, and which level of support makes sense.
              No sales pressure. Just clarity.
            </p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Book a free discovery call
              <span className="btn-arrow">→</span>
            </Link>
            <p className="wwm-discovery__micro">
              No commitment required. 20 minutes. A calendar link will follow by email.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ───────────────────────────────────────────── */}
      <section className="wwm-expect" aria-label="What to expect">
        <div className="container-narrow">
          <Reveal>
            <Eyebrow>The process</Eyebrow>
            <h2 className="wwm-expect__headline">What happens after you reach out</h2>
          </Reveal>
          <div className="wwm-expect__steps" ref={stepsRef}>
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div 
                  className={`wwm-step ${visibleSteps.has(String(i)) ? 'wwm-step--visible' : ''}`}
                  data-step-num={i}
                >
                  <div className="wwm-step__icon">{s.icon}</div>
                  <div className="wwm-step__number">{s.num}</div>
                  <div className="wwm-step__content">
                    <p className="wwm-step__label">{s.label}</p>
                    <p className="wwm-step__body">{s.body}</p>
                  </div>
                  {i < steps.length - 1 && <div className="wwm-step__line"></div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
      <section className="wwm-proof" aria-label="Testimonials">
        <div className="wwm-proof__bg"></div>
        <div className="container-wide wwm-proof__content">
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
            <h2 className="wwm-proof__headline">What working together feels like</h2>
          </Reveal>
          <div className="wwm-proof__grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="wwm-faq" aria-label="FAQ">
        <div className="container-narrow">
          <Reveal>
            <Eyebrow>Before you begin</Eyebrow>
            <h2 className="wwm-faq__headline">Common questions</h2>
          </Reveal>
          <div className="wwm-faq__list">
            {wwmFaqs.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <FAQItem faq={f} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="wwm-closing" aria-label="Closing CTA">
        <div className="wwm-closing__bg"></div>
        <div className="container-narrow wwm-closing__content">
          <Reveal>
            <h2 className="wwm-closing__headline">Ready?</h2>
            <p className="wwm-closing__sub">
              The right programme is the one you keep doing.
              Let us find yours.
            </p>
            <Link to="/programmes" className="btn btn-primary btn-large">
              Find your programme
              <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}