import { useState, useEffect, useRef, useCallback } from 'react';
import './HomePage.css';
import { useCountUp } from './useCountUp';

const STATS = [
  { target: 2000, suffix: '+',  label: 'Active Members' },
  { target: 15,   suffix: '+',  label: 'Years Experience' },
  { target: 87,   suffix: '%',  label: 'Injury Prevention Rate' },
  { target: 4.9,  suffix: '/5', label: 'Average Rating', decimals: 1 },
];

export default function HomePage() {
  const videoRefs = useRef([]);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const statsSectionRef = useRef(null);
  const statValues = useCountUp(STATS, statsSectionRef);

  const videos = [
    '/videos/2.mp4',
    '/videos/3.mp4',
    '/videos/4.mp4',
    '/videos/6.mp4',
    '/videos/7.mp4'
  ];

  const goToVideo = useCallback((index) => {
    if (isTransitioning || index === currentIndexRef.current) return;

    const prevIndex = currentIndexRef.current;
    const prevVideo = videoRefs.current[prevIndex];
    const nextVideo = videoRefs.current[index];
    if (!prevVideo || !nextVideo) return;

    setIsTransitioning(true);
    currentIndexRef.current = index;
    setCurrentIndex(index);

    prevVideo.style.opacity = '0';
    nextVideo.style.opacity = '1';
    nextVideo.currentTime = 0;
    nextVideo.play().catch(() => {});

    setTimeout(() => {
      prevVideo.pause();
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    const newIndex = (currentIndexRef.current - 1 + videos.length) % videos.length;
    goToVideo(newIndex);
  }, [goToVideo, videos.length]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndexRef.current + 1) % videos.length;
    goToVideo(newIndex);
  }, [goToVideo, videos.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      video.addEventListener('ended', () => {
        if (i === currentIndexRef.current) {
          const newIndex = (i + 1) % videos.length;
          goToVideo(newIndex);
        }
      });
    });
  }, [goToVideo]);

  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      first.style.opacity = '1';
      first.play().catch(() => {});
    }
  }, []);

  return (
    <main>
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="hero relative">
        {videos.map((src, i) => (
          <video
            key={src}
            ref={el => videoRefs.current[i] = el}
            src={src}
            muted
            playsInline
            preload="auto"
            className="hero__video"
            style={{ opacity: 0, transition: 'opacity 0.5s ease', zIndex: 0 }}
          />
        ))}

        <div className="hero__overlay"></div>

        <button
          className="hero__arrow hero__arrow--left"
          onClick={handlePrev}
          aria-label="Previous video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="hero__arrow hero__arrow--right"
          onClick={handleNext}
          aria-label="Next video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="hero__dots">
          {videos.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
              onClick={() => goToVideo(i)}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero__wrapper">
          <div className="container-site">
            <div className="hero__content">
              <h1 className="hero__title">
                Strong at Every Age. Built to Last.
              </h1>
              <p className="hero__subtitle">
                Most fitness advice was designed for a 25-year-old body. Yours has decades of intelligence behind it. Here, we train accordingly.
              </p>
              <div className="hero__cta-group">
                <a href="/insights" className="hero__cta-primary">
                  Explore the Programmes
                </a>
              </div>
              <p className="hero__supporting-text">
                No equipment required to begin. No age limit on what you can build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ────────────────────────────────────────────── */}
      <section className="features">
        <div className="container-standard">
          <h2 className="features__headline">Why This Approach Works</h2>
          <p className="features__intro">
            Training smarter, not just harder, means respecting where your body is now while building toward where you want to be.
          </p>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">💪</div>
              <h3 className="feature-card__title">Age-Specific Programming</h3>
              <p className="feature-card__desc">Each program is tailored to the unique needs and recovery patterns of your decade.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🧠</div>
              <h3 className="feature-card__title">Longevity-First Mindset</h3>
              <p className="feature-card__desc">Building sustainable strength means protecting your joints, improving mobility, and preventing injury.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">📈</div>
              <h3 className="feature-card__title">Progressive Overload</h3>
              <p className="feature-card__desc">Consistent, intelligent progression that respects your body's capacity to adapt and grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ─────────────────────────────────────────────────── */}
      <section className="social-proof">
        <div className="container-standard">
          <h2 className="social-proof__headline">What Our Clients Say</h2>
          <div className="social-proof__grid">
            <div className="testimonial-card">
              <div className="testimonial-card__rating">★★★★★</div>
              <p className="testimonial-card__quote">"I've tried countless programs, but this is the first one that actually respects my body and my life. The results speak for themselves."</p>
              <p className="testimonial-card__author">Sarah M., 52</p>
              <p className="testimonial-card__role">Marketing Director</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__rating">★★★★★</div>
              <p className="testimonial-card__quote">"After years of back pain, I finally understand how to train smart. My strength has improved dramatically."</p>
              <p className="testimonial-card__author">James R., 58</p>
              <p className="testimonial-card__role">Consultant</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__rating">★★★★★</div>
              <p className="testimonial-card__quote">"The clarity and attention to detail in each program is remarkable. This is what mature fitness looks like."</p>
              <p className="testimonial-card__author">Michelle T., 47</p>
              <p className="testimonial-card__role">Executive Coach</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="stats" ref={statsSectionRef}>
        <div className="container-standard">
          <div className="stats__grid">
            {STATS.map((stat, i) => (
              <div className="stat-item" key={stat.label}>
                <div className="stat-item__number">
                  {stat.label === 'Active Members'
                    ? statValues[i].toLocaleString()
                    : statValues[i]}{stat.suffix}
                </div>
                <p className="stat-item__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="home-cta">
        <div className="container-standard">
          <h2 className="home-cta__headline">Ready to Build Strength That Lasts?</h2>
          <p className="home-cta__sub">Start your journey today with a personalized assessment and your first program, completely free.</p>
          <div className="home-cta__buttons">
            <a href="/work-with-me" className="hero__cta-primary" style={{ background: '#1F1F1F', color: '#fff', border: 'none' }}>
              Get Started
            </a>
            <a href="/insights" className="hero__cta-secondary" style={{ borderColor: '#fff', color: '#fff' }}>
              Learn More →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}