import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PhilosophyPage.css';

const C = {
  hero: {
    label: 'Our Philosophy',
    title: 'What We Believe.',
    sub: 'A specific way of thinking about strength, movement, and what it means to age well.',
  },
  core: {
    label: 'The Foundation',
    heading: 'Most fitness advice was designed for a short-term goal.',
    paragraphs: [
      'Extreme routines. Rapid transformations. Temporary motivation. Most of what is marketed as fitness is built around a moment — a season, a deadline, a number on a scale.',
      'That model does not hold. The body was not designed for intensity without recovery, or for effort disconnected from longevity. And yet, most people spend their 30s chasing what worked at 22, and their 40s wondering why nothing sticks.',
      'Stronger Every Decade was built on a different premise: that the goal of training is not a result. It is a life. A body that remains capable, pain-free, and strong across every decade you inhabit it.',
      'That shift in thinking changes everything — what you train, how you train, and why.',
    ],
    aside: 'The goal is not fitness for a season. It is capability for a lifetime.',
  },
  belief: {
    label: 'Core Belief',
    heading: 'The body is not a problem to be solved.',
    sub: 'It is a system to be understood.',
    desc: 'This is not a semantic distinction. It changes the entire orientation of training.',
    cards: [
      { type: 'old', tag: 'The conventional view', heading: 'When the body is treated as a problem…', body: 'The goal becomes fixing it. You fight inflammation. You fight fat. You fight age. Every decade is a battle against what came before. The result is a cycle of extreme effort and collapse — with diminishing returns at every stage.', verdict: 'Burnout. Injury. Abandonment.' },
      { type: 'new', tag: 'Our view', heading: 'When the body is understood as a system…', body: 'The goal becomes comprehension. You study what it needs, how it adapts, and what it responds to at each stage of life. What looks like decline is often miscommunication — between what you ask of the body and what it is equipped to do.', verdict: 'Sustained strength. Lasting capability.' },
    ],
    quote: 'A body at 50 is not a body at 25 with something missing. It is a different system — with a different, often more sophisticated, capacity for adaptation. The mistake is training it as though nothing has changed.',
    quoteBy: 'Stronger Every Decade',
    close: ['Stronger Every Decade is built entirely on the second view.', 'Not because it is more optimistic — because it is more accurate.', 'Train it accordingly.'],
  },
  principles: {
    label: 'Six Principles',
    heading: 'What guides every decision.',
    sub: 'These are not guidelines. They are the structural foundation of every programme we build.',
    items: [
      { n: '01', title: 'Capability Over Appearance', short: 'Train to be strong — not to look strong.', body: 'Real-world strength, balance, endurance, and independence are the metrics that matter. A body that performs well across daily life — that can lift, carry, move, and recover without pain — is far more valuable than one that simply looks capable.' },
      { n: '02', title: 'Consistency Beats Intensity', short: 'What you sustain across years defines you — not what you push for weeks.', body: 'Extreme routines produce extreme results — briefly. The body adapts to what it experiences repeatedly, not what it survives occasionally. A training practice that continues for ten years will always outperform a programme that burns bright for three months.' },
      { n: '03', title: 'Strength Is a Life Skill', short: 'Every decade without strength costs independence.', body: 'Strength training is not a hobby or an aesthetic choice. It is the single most effective intervention for preserving bone density, joint integrity, metabolic health, and physical independence across a lifetime.' },
      { n: '04', title: 'Mobility Is Insurance', short: 'Strength without range of motion is strength you cannot use.', body: 'Pain-free movement is not a bonus — it is the precondition for everything else. Mobility work preserves the range of motion that makes strength usable, keeps joints resilient under load, and protects against injury.' },
      { n: '05', title: 'Aging Is a Skill You Can Train', short: 'Decline is not automatic. Most of it is optional.', body: 'The physical deterioration most people associate with aging is not an inevitable consequence of time. It is largely a consequence of how time was spent. The body responds to intelligent stimulus at every age.' },
      { n: '06', title: 'Aesthetics Are a Byproduct', short: 'Do the fundamentals right. Everything else follows.', body: 'When you train consistently for strength, mobility, recovery, and long-term health — a strong, lean, capable physique is the natural result. We do not pursue aesthetics directly. We earn them by doing everything else well.' },
    ],
  },
  practice: {
    label: 'In Practice',
    heading: 'Philosophy without application is just biography.',
    question: '"Does this decision serve someone training consistently for the next ten years?"',
    context: 'Every programme, every session, every exercise selection is filtered through this question. Not the version of you that wants fast results — the version building something that lasts.',
    rows: [
      { label: 'Longevity first',            body: 'Joint health, bone density, and pain-free movement are primary considerations — not secondary to performance metrics.' },
      { label: 'Progressive overload',       body: 'Load and complexity increase gradually, across months and years — not aggressively within a single cycle.' },
      { label: 'Evidence as foundation',     body: 'Exercise selection reflects current research. We update when the science updates.' },
      { label: 'Consistency over intensity', body: 'Sessions are designed to be completed and returned to — not survived once and avoided for a week.' },
      { label: 'Recovery as training',       body: 'Rest days and deload weeks are scheduled and non-negotiable. Recovery is where adaptation occurs.' },
      { label: 'Language matters',           body: 'Neutral, functional language throughout. No punishment framing. The body is a partner, not an opponent.' },
    ],
  },
  closing: {
    label: 'Who This Is For',
    heading: 'This is not built for everyone.',
    sub: 'It is not trying to be.',
    body: [
      'If you are looking for the fastest route to a specific aesthetic result, there are programmes built for that purpose. We will not compete for that version of your attention.',
      'Stronger Every Decade is built for people who think in decades, not deadlines. Adults who understand that the body they have at 60 is shaped by the decisions made at 35, 40, and 50.',
      'The people who work with us have usually tried the other approaches. What they are looking for now is something more intelligent: a physical life that keeps pace with the rest of who they are.',
    ],
    quote: 'A practice — in the oldest sense of the word. Not something you complete. Something you inhabit.',
    cta: 'If you recognise yourself in this, we built it for you.',
    note: 'Programmes structured by decade. Starting point: wherever you are now.',
    footnote: 'No age requirement · No fitness prerequisite · Only the intention to train for the long run.',
    operatingPrinciple: ['Train for function.', 'Live with discipline.', 'Let aesthetics take care of themselves.'],
  },
};

const SLIDES = [
  { url: '/images/1.jpg', caption: 'Built for the long run.' },
  { url: '/images/2.jpg', caption: 'Strength that compounds.' },
  { url: '/images/3.jpg', caption: 'Every decade, stronger.' },
  { url: '/images/4.jpg', caption: 'Movement as a practice.' },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold, rootMargin: '0px 0px -32px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function useScrollPct() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(Math.min(100, (window.scrollY / (d.scrollHeight - d.clientHeight)) * 100));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}

function Fu({ children, delay = 0, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={`fu ${v ? 'fu--in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [busy, setBusy] = useState(false);
  const [paused, setPaused] = useState(false);
  const [captionKey, setCaptionKey] = useState(0);
  const timerRef = useRef(null);

  const navigate = useCallback((nextIdx, direction) => {
    if (busy) return;
    setBusy(true);
    setDir(direction);
    setPrev(current);
    setCurrent(nextIdx);
    setCaptionKey(k => k + 1);
    setTimeout(() => { setPrev(null); setBusy(false); }, 500);
  }, [busy, current]);

  const next = useCallback(() => navigate((current + 1) % SLIDES.length, 1), [navigate, current]);
  const back = useCallback(() => navigate((current - 1 + SLIDES.length) % SLIDES.length, -1), [navigate, current]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  }, [next]);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer]);

  const goTo = (i) => { navigate(i, i > current ? 1 : -1); startTimer(); };

  return (
    <div
      className="ph-slider"
      onMouseEnter={() => { setPaused(true); clearInterval(timerRef.current); }}
      onMouseLeave={() => { setPaused(false); startTimer(); }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`ph-slider__slide ${i === current ? 'ph-slider__slide--active' : ''} ${i === prev ? 'ph-slider__slide--exit' : ''}`}
          style={{ backgroundImage: `url(${slide.url})` }}
        />
      ))}

      <div className="ph-slider__overlay" />

      <div className="ph-slider__caption" key={captionKey}>
        <span className="ph-slider__caption-line" />
        <span className="ph-slider__caption-text">{SLIDES[current].caption}</span>
      </div>

      <button className="ph-slider__arrow ph-slider__arrow--left" onClick={() => { back(); startTimer(); }} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className="ph-slider__arrow ph-slider__arrow--right" onClick={() => { next(); startTimer(); }} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="ph-slider__counter">
        <span className="ph-slider__counter-cur">{String(current + 1).padStart(2, '0')}</span>
        <span className="ph-slider__counter-line" />
        <span className="ph-slider__counter-tot">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      <div className="ph-slider__dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`ph-slider__dot ${i === current ? 'ph-slider__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <div className="ph-slider__progress" key={`p-${current}`}>
        <div className={`ph-slider__progress-fill ${paused ? 'ph-slider__progress-fill--paused' : ''}`} />
      </div>
    </div>
  );
}

function Hero({ d }) {
  const [rdy, setRdy] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRdy(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section className="ph-hero">
      <ImageSlider />
      <div className="ph-hero__content">
        <div className={`ph-hero__text ${rdy ? 'ph-hero__text--in' : ''}`}>
          <span className="ph-label ph-label--muted">{d.label}</span>
          <h1 className="ph-hero__h1">{d.title}</h1>
          <p className="ph-hero__sub">{d.sub}</p>
          <Link to="/work-with-me" className="ph-hero__cta-btn">
            Work With Me
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Core({ d }) {
  return (
    <section className="ph-section ph-section--white">
      <div className="ph-container ph-two">
        <div className="ph-two__left">
          <Fu><span className="ph-label">{d.label}</span></Fu>
          <Fu delay={50}><h2 className="ph-h2">{d.heading}</h2></Fu>
          <Fu delay={160}>
            <aside className="ph-aside">
              <span className="ph-aside__mark" aria-hidden="true">"</span>
              {d.aside}
            </aside>
          </Fu>
        </div>
        <div className="ph-two__right">
          {d.paragraphs.map((p, i) => (
            <Fu key={i} delay={i * 70}><p className="ph-body">{p}</p></Fu>
          ))}
        </div>
      </div>
    </section>
  );
}

function Belief({ d }) {
  return (
    <section className="ph-section ph-section--grey">
      <div className="ph-container">
        <Fu><span className="ph-label">{d.label}</span></Fu>
        <Fu delay={50}><h2 className="ph-h2 ph-h2--xl">{d.heading}</h2></Fu>
        <Fu delay={100}><p className="ph-h3">{d.sub}</p></Fu>
        <Fu delay={140}><p className="ph-body ph-body--max">{d.desc}</p></Fu>
        <div className="ph-cards">
          {d.cards.map((c, i) => (
            <Fu key={c.type} delay={80 + i * 80}>
              <article className={`ph-card ph-card--${c.type}`}>
                <span className="ph-card__tag">{c.tag}</span>
                <h3 className="ph-card__h">{c.heading}</h3>
                <p className="ph-card__body">{c.body}</p>
                <footer className={`ph-card__verdict ph-card__verdict--${c.type}`}>{c.verdict}</footer>
              </article>
            </Fu>
          ))}
        </div>
        <Fu delay={80}>
          <blockquote className="ph-pullquote">
            <p>{d.quote}</p>
            <cite>— {d.quoteBy}</cite>
          </blockquote>
        </Fu>
        <div className="ph-belief-close">
          {d.close.map((line, i) => (
            <Fu key={i} delay={i * 60}>
              <p className={`ph-belief-close__line ${i === 1 ? 'bold' : ''} ${i === 2 ? 'accent' : ''}`}>{line}</p>
            </Fu>
          ))}
        </div>
      </div>
    </section>
  );
}

function PRow({ item, idx }) {
  const [ref, v] = useInView();
  const [open, setOpen] = useState(false);
  return (
    <div ref={ref} className={`ph-pr ${open ? 'ph-pr--open' : ''}`}
      style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(12px)', transition: `opacity .5s ease ${idx * 45}ms, transform .5s ease ${idx * 45}ms` }}>
      <button className="ph-pr__btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="ph-pr__n">{item.n}</span>
        <div className="ph-pr__mid">
          <span className="ph-pr__title">{item.title}</span>
          <span className="ph-pr__short">{item.short}</span>
        </div>
        <span className="ph-pr__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={open ? 'M3 8h10' : 'M8 3v10M3 8h10'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className="ph-pr__panel" style={{ maxHeight: open ? '200px' : '0' }}>
        <p>{item.body}</p>
      </div>
    </div>
  );
}

function Principles({ d }) {
  return (
    <section className="ph-section ph-section--white">
      <div className="ph-container">
        <div className="ph-prin-hdr">
          <div>
            <Fu><span className="ph-label">{d.label}</span></Fu>
            <Fu delay={50}><h2 className="ph-h2 ph-h2--xl">{d.heading}</h2></Fu>
          </div>
          <Fu delay={80}><p className="ph-prin-hdr__sub">{d.sub}</p></Fu>
        </div>
        <div className="ph-pr-list">
          {d.items.map((item, i) => <PRow key={item.n} item={item} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

function Practice({ d }) {
  return (
    <section className="ph-section ph-section--grey">
      <div className="ph-container">
        <Fu><span className="ph-label">{d.label}</span></Fu>
        <Fu delay={50}><h2 className="ph-h2 ph-h2--xl">{d.heading}</h2></Fu>
        <Fu delay={100}>
          <div className="ph-qblock">
            <span className="ph-qblock__mark">"</span>
            <p className="ph-qblock__q">{d.question}</p>
            <p className="ph-qblock__ctx">{d.context}</p>
          </div>
        </Fu>
        <Fu delay={140}>
          <table className="ph-table">
            <thead><tr><th>Principle</th><th>What it means in practice</th></tr></thead>
            <tbody>
              {d.rows.map(({ label, body }, i) => (
                <tr key={label}>
                  <td><span className="ph-table__n">{String(i + 1).padStart(2, '0')}</span><span className="ph-table__name">{label}</span></td>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fu>
      </div>
    </section>
  );
}

function Closing({ d }) {
  return (
    <section className="ph-section ph-section--dark">
      <div className="ph-container">
        <Fu><span className="ph-label ph-label--gold">{d.label}</span></Fu>
        <Fu delay={50}><h2 className="ph-closing-h">{d.heading}</h2></Fu>
        <Fu delay={90}><p className="ph-closing-sub">{d.sub}</p></Fu>
        <div className="ph-closing-body">
          {d.body.map((p, i) => (
            <Fu key={i} delay={60 + i * 55}><p className="ph-closing-text">{p}</p></Fu>
          ))}
          <Fu delay={240}><blockquote className="ph-closing-quote">{d.quote}</blockquote></Fu>
        </div>
        <Fu delay={280}>
          <div className="ph-op">
            <span className="ph-op__label">Operating Principle</span>
            <div className="ph-op__lines">{d.operatingPrinciple.map((l, i) => <p key={i}>{l}</p>)}</div>
          </div>
        </Fu>
        <Fu delay={320}>
          <div className="ph-cta-box">
            <p className="ph-cta-box__hl">{d.cta}</p>
            <p className="ph-cta-box__note">{d.note}</p>
            <div className="ph-cta-box__row">
              <Link to="/work-with-me" className="ph-btn-primary">
                Work With Me
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/work-with-me" className="ph-btn-ghost">Explore all programmes →</Link>
            </div>
            <p className="ph-cta-box__foot">{d.footnote}</p>
          </div>
        </Fu>
      </div>
    </section>
  );
}

export default function PhilosophyPage() {
  const pct = useScrollPct();
  return (
    <main className="philo-page" id="main">
      <div className="ph-progress" aria-hidden="true">
        <div className="ph-progress__bar" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
      <Hero d={C.hero} />
      <Core d={C.core} />
      <Belief d={C.belief} />
      <Principles d={C.principles} />
      <Practice d={C.practice} />
      <Closing d={C.closing} />
    </main>
  );
}