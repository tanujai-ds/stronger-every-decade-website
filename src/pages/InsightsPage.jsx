import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Calendar, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './InsightsPage.css';

const articleDatabase = [
  {
    id: 1,
    title: 'Building Strength in Your 40s: Reframe, Rebuild, Restore',
    excerpt: 'Strength training in midlife is not about chasing your 20s. It is about durability.',
    category: '40s',
    date: '2025-02-15',
    readTime: 8,
    featured: true,
    fullContent: `Your 40s are a critical decade. Your body has shifted. Recovery is not what it was. But strength training becomes more important than ever.

THE GOAL SHIFT
In your 20s and 30s, you trained for aesthetics or performance. In your 40s, the goal is durability. Build the physical foundation for another 40+ years.

PROGRAMMING PRINCIPLES
1. Compound movements remain king
2. Frequency over intensity - 3 quality sessions per week
3. Movement quality matters more
4. Recovery is non-negotiable
5. Avoid ego-driven training

HORMONAL CONSIDERATIONS
Testosterone declines. Growth hormone production slows. Consistency matters even more.

THE 40s PROTOCOL
Monday: Lower body strength
Wednesday: Upper body strength
Friday: Full-body maintenance
Each session: 40-50 minutes

THE MINDSET SHIFT
Train for the version of yourself at 60, 70, and beyond. That is the real victory.`,
  },
  {
    id: 2,
    title: 'The Recovery Paradox: Why Rest Isn\'t Laziness',
    excerpt: 'You do not get stronger in the gym. You get stronger during rest.',
    category: 'Recovery',
    date: '2025-02-08',
    readTime: 6,
    featured: false,
    fullContent: `The paradox is simple: adaptation happens during rest, not training.

THE SCIENCE OF RECOVERY
Growth hormone peaks during sleep. Testosterone is highest after good sleep. Cortisol needs time to normalize between sessions.

THE COST OF OVERTRAINING
1. Strength plateaus
2. Injury risk rises
3. Motivation crashes
4. Immune system weakens
5. Sleep suffers

INTELLIGENT RECOVERY
Sleep 7-9 hours nightly - non-negotiable.
Rest Days: One full rest day per week minimum
Active Recovery: One lighter day per week
Nutrition: Adequate protein and carbs

THE LONG GAME
Over 10 years, proper recovery compounds into dramatically different results.`,
  },
  {
    id: 3,
    title: 'Mobility Through the Decades: From Your 30s to 70s',
    excerpt: 'Pain-free movement is not luck. It is a practice that compounds over time.',
    category: 'Philosophy',
    date: '2025-02-01',
    readTime: 10,
    featured: false,
    fullContent: `Pain-free movement is trainable. Build mobility intentionally.

THE 30s: BUILDING FOUNDATION
Mobility capacity is high. Master: hip, shoulder, spinal, ankle mobility.
Daily 10-minute flow before training.

THE 40s: MAINTAINING & REFINING
Maintain what you built. Address imbalances.
15-20 minute sessions, 4x per week.

THE 50s: STRATEGIC MAINTENANCE
Hormonal shifts affect elasticity. Defend what you have.
20-25 minute daily practice.

THE 60s & BEYOND
Mobility IS your training. Fight entropy.
30 minutes daily movement practice.

THE ROI
Pain-free movement, independence, better quality of life.`,
  },
  {
    id: 4,
    title: 'The 10-Minute Daily Habit That Changes Everything',
    excerpt: 'Consistency beats intensity. Small daily practice compounds into results.',
    category: 'Philosophy',
    date: '2025-01-25',
    readTime: 5,
    featured: false,
    fullContent: `The most powerful tool is not in the gym. It is your daily habit.

WHY 10 MINUTES?
Signals: This matters to me. Builds neural pathways, discipline, hormonal adaptation, confidence.

WHAT SHOULD IT BE?
Mobility, strength, stretching, breathing, walking. The practice matters less than consistency.

THE COMPOUNDING EFFECT
10 minutes daily for a year = 60+ hours of intentional movement.

CONSISTENCY > INTENSITY
A 10-minute daily practice beats a 2-hour weekly practice. Compound effect of daily action far exceeds occasional efforts.

IMPLEMENTATION
Pick one habit. Commit to 30 days. By day 30, it is automatic. By day 365, transformed.`,
  },
  {
    id: 5,
    title: 'Training at 50: Strength, Hormones, and Perimenopause',
    excerpt: 'Hormonal changes require intelligent training adaptation and consistency.',
    category: '50s',
    date: '2025-01-18',
    readTime: 9,
    featured: false,
    fullContent: `Training at 50 is different. Not less effective. Just different.

HORMONAL REALITIES
Estrogen decline affects muscle synthesis, bone density, metabolism, sleep, joints.

TRAINING PRINCIPLES
Progressive overload over time - still progress
Higher frequency - 4-5x weekly
Longer warm-ups - 10-15 minutes
Adequate recovery - 2-3 rest days weekly
Sleep - 8+ hours nightly

PERIMENOPAUSE STRATEGIES
Nutrition: 1g protein per lb bodyweight
Strength: Prevents bone and muscle loss
Variety: Push, pull, squat, hinge patterns
Stress: Meditation and rest matter
Sleep: Consistent bedtime, cool room

YOUR 50s ARE REFINEMENT
Not decline. Build strength. Improve body composition. Reduce injury risk.`,
  },
  {
    id: 6,
    title: 'Beyond the Numbers: Why Training Philosophy Matters',
    excerpt: 'Your relationship to training determines longevity, not numbers on a scale.',
    category: 'Philosophy',
    date: '2025-01-11',
    readTime: 7,
    featured: false,
    fullContent: `Numbers trap us. But philosophy sustains us.

THE NUMBERS TRAP
Endless metrics create illusion of control. But obsessing creates burnout and injury.

A DIFFERENT PHILOSOPHY
Consistency > Intensity
Adaptation > Achievement
Sustainability > Extremity
Enjoyment > Obligation
Health > Vanity

REDEFINING PROGRESS
Progress includes: moving without pain, recovering faster, feeling stronger in daily life, sleeping better, maintaining muscle, confidence, injury prevention.

THESE MATTER MORE than hitting arbitrary numbers.

THE PRACTICE
Can I sustain this 10+ years?
Do I enjoy this training?
Does it support my health?

If yes, you are on the right path. Numbers are tools, not masters.`,
  },
  {
    id: 7,
    title: 'Sustainable Strength in Your 60s: Adapt, Do not Quit',
    excerpt: 'Training evolves. Maintain independence and capability for life.',
    category: '60s+',
    date: '2025-01-04',
    readTime: 8,
    featured: false,
    fullContent: `Training at 60 looks different. Intelligent training at 60 is MORE effective than scattered training at 40.

YOUR 60s REALITY
Slower recovery, natural muscle loss, joint issues, life experience, wisdom, less time.

PRINCIPLES FOR 60s TRAINING
Consistency - 3-4x weekly builds extraordinary strength
Quality - 30 minutes focused beats 2 hours scattered
Movement - Push, pull, squat, hinge, carry patterns
Recovery - Sleep, nutrition, stress management matter
Respect - Pain is feedback. Train smart.

THE 60s PROGRAM
2-3 days full-body strength (compound)
1-2 days focused work
Daily movement (walking, stretching, mobility)
Consistent sleep and nutrition

WHAT IS POSSIBLE
Maintain or build strength
Prevent falls and injury
Remain independent
Improve quality of life
Create community

Your 60s are refinement, not decline.`,
  },
  {
    id: 8,
    title: 'Consistency Over Perfection: The Real Path Forward',
    excerpt: 'Perfect workouts do not exist. Imperfect consistency builds strength.',
    category: 'Recovery',
    date: '2024-12-28',
    readTime: 6,
    featured: false,
    fullContent: `There is no perfect workout, program, nutrition, or timing.

THE PERFECTION MYTH
Endless pursuit creates paralysis. Perfect conditions never arrive.

Meanwhile, imperfect consistency builds strength.

THE CONSISTENCY REALITY
Mediocre program for 10 years > perfect program for 6 months
Imperfect 3x weekly forever > perfect once a month
Consistent sleep > perfect sleep occasionally

WHY CONSISTENCY WINS
Adaptation compounds over time
Habit becomes identity
Injury prevention improves
Sustainability beats burnout

THE PRACTICE
Start where you are. Do imperfect workout. Repeat next week.
For a year. Five years. Lifetime.

20 years of mediocre consistency creates phenomenal strength.`,
  },
  {
    id: 9,
    title: 'Strength Training in Your 30s: Building Your Foundation',
    excerpt: 'Your 30s establish patterns that serve you for decades ahead.',
    category: '30s',
    date: '2024-12-21',
    readTime: 7,
    featured: false,
    fullContent: `Your 30s are ideal for foundation building.

WHAT YOUR 30s OFFER
Capacity - recover quickly, build work capacity
Neurological - learn movement patterns fast
Time - fewer responsibilities than later decades
Resilience - body is resilient to training stress

FOUNDATION PRINCIPLES
Master Movement - Squat, hinge, push, pull, carry with perfect form
Build Capacity - Gradually increase volume and intensity
Establish Discipline - Becomes automatic by 40
Understand Body - Learn what works for you

THE 30s PROGRAM
3-4 days structured strength training
Progressive overload weekly/monthly/yearly
7-9 hours sleep, varied diet
Regular mobility work
Increasing volume over time

WHAT YOU ARE BUILDING
Understand your body
Lift substantial weight
Movement mastery
Discipline for life
Injury prevention

BY 40, enter from position of strength.`,
  },
  {
    id: 10,
    title: 'Sleep, Adaptation, and the Longevity Imperative',
    excerpt: 'You get stronger during sleep, not in the gym. Prioritize it.',
    category: 'Recovery',
    date: '2024-12-14',
    readTime: 8,
    featured: false,
    fullContent: `Sleep is where adaptation happens.

THE SCIENCE OF SLEEP & STRENGTH
Growth hormone peaks during sleep
Repairs muscle tissue damaged by training
Consolidates motor learning patterns
Restores neurotransmitters
Clears metabolic waste from brain
Regulates appetite, metabolism, mood hormones

Without sleep, training stimulus has minimal effect.

SLEEP & LONGEVITY
7-9 hours sleep = stronger immune, better metabolism, healthier body composition, better cognition, resilience, mental health.

SLEEP CHALLENGE
Screen light suppresses melatonin
Stress and cortisol elevation
Inconsistent bedtime
Poor sleep environment

SLEEP PROTOCOL
Consistency - same bedtime/wake time
Duration - 7-9 hours
Environment - 65-68 degrees F, dark, quiet
Routine - 30-60 min before bed, no screens
Support - magnesium, exercise, stress management

THE EQUATION
Training + Sleep + Nutrition = Adaptation

If you choose: extra workout or extra sleep? Choose sleep.`,
  },
  {
    id: 11,
    title: 'Pain is Information: Reading Your Body\'s Signals',
    excerpt: 'Distinguish productive discomfort from harmful pain. Know the difference.',
    category: 'Philosophy',
    date: '2024-12-07',
    readTime: 6,
    featured: false,
    fullContent: `Pain is information. Not punishment. Not weakness.

TWO TYPES OF SENSATION
Productive - muscle burn, soreness 24-48 hrs, muscles working
Harmful - sharp pain, sudden pain, changes movement, persists, worsens

Most conflate these. Either overtrain through harmful or avoid productive.

THE FRAMEWORK
Muscular fatigue or joint pain? Fatigue = continue, joint = stop
Acute or chronic? Acute = stop, chronic = modify
Changes movement? Yes = stop, no = continue
Gets better or worse? Better = productive, worse = harmful

COMMON SIGNALS
Sharp pain - harmful, stop immediately
Muscle burn - productive, continue
Soreness 24-48h - productive, normal
Chronic discomfort - modify form/weight/range
Movement restriction - harmful, address first

TRAINING SMART
Best trainee listens to body
Distinguishes productive from harmful
Modifies when necessary
Stays healthy long-term
Trains for decades

Pain is feedback. Read it. Respond appropriately.`,
  },
];

const categories = ['All', '30s', '40s', '50s', '60s+', 'Philosophy', 'Recovery'];

function ArticleCard({ article, onClick, isVisible }) {
  const date = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className={`article-card ${isVisible ? 'article-card--visible' : ''}`} onClick={onClick}>
      {article.featured && <span className="article-card__badge">Featured</span>}

      <div className="article-card__header">
        <div className="article-card__meta">
          <span><Calendar size={14} /> {date}</span>
          <span><Clock size={14} /> {article.readTime} min read</span>
        </div>
        <span className="article-card__category">{article.category}</span>
      </div>

      <h3 className="article-card__title">{article.title}</h3>
      <p className="article-card__excerpt">{article.excerpt}</p>

      <div className="article-card__footer">
        <span className="article-card__cta">
          Read Article <ChevronRight size={16} />
        </span>
      </div>
    </article>
  );
}

export default function InsightsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleArticles, setVisibleArticles] = useState(new Set());
  const articleRefs = useRef({});

  const filteredArticles = activeCategory === 'All' ? articleDatabase : articleDatabase.filter(a => a.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const articleId = parseInt(entry.target.dataset.articleId);
          setVisibleArticles(prev => new Set([...prev, articleId]));
        }
      });
    }, { threshold: 0.1 });

    Object.values(articleRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredArticles]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('insightsScrollPosition');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
        sessionStorage.removeItem('insightsScrollPosition');
      }, 100);
    }
  }, []);

  const handleArticleClick = article => {
    sessionStorage.setItem('insightsScrollPosition', window.scrollY.toString());
    localStorage.setItem('selectedArticleId', article.id);
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    navigate('/Articledetail');
  };

  const featuredArticle = articleDatabase.find(a => a.featured);

  return (
    <main className="insights-page">
      <section className="insights-header">
        <div className="insights-header__bg"></div>
        <div className="container insights-header__content">
          <span className="eyebrow">Expert Insights</span>
          <h1>Knowledge for the Long Game</h1>
          <p>Discover evidence-based strategies for strength training, recovery, and longevity. Build your practice one decade at a time.</p>
        </div>
      </section>

      {featuredArticle && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-article">
              <div className="featured-article__left">
                <div className="featured-badge featured-badge--animate">
                  <Zap size={14} />
                  Featured Article
                </div>
                <h2 className="featured-article__title--animate">{featuredArticle.title}</h2>
                <p className="featured-article__excerpt--animate">{featuredArticle.excerpt}</p>
                <div className="featured-article__meta featured-article__meta--animate">
                  <span><Calendar size={14} /> Feb 15, 2025</span>
                  <span><Clock size={14} /> 8 min read</span>
                </div>
                <button className="featured-btn featured-btn--animate" onClick={() => handleArticleClick(featuredArticle)}>
                  Read Featured <ChevronRight size={18} />
                </button>
              </div>
              <div className="featured-article__right featured-article__right--animate">
                <div className="featured-article__visual">
                  <svg className="development-graph" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="graphGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(43, 76, 126, 0.3)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgba(43, 76, 126, 0.8)" stopOpacity="1" />
                      </linearGradient>
                      <linearGradient id="graphGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(232, 238, 247, 0.3)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgba(232, 238, 247, 0.9)" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    
                    <g className="graph-grid" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
                      <line x1="40" y1="240" x2="280" y2="240" />
                      <line x1="40" y1="40" x2="40" y2="240" />
                      <line x1="40" y1="190" x2="280" y2="190" />
                      <line x1="40" y1="140" x2="280" y2="140" />
                      <line x1="40" y1="90" x2="280" y2="90" />
                    </g>
                    
                    <rect className="chart-bar chart-bar--1" x="60" y="160" width="35" height="80" fill="url(#graphGradient1)" rx="4" />
                    <text x="77" y="260" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif">30s</text>
                    
                    <rect className="chart-bar chart-bar--2" x="110" y="120" width="35" height="120" fill="url(#graphGradient1)" rx="4" />
                    <text x="127" y="260" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif">40s</text>
                    
                    <rect className="chart-bar chart-bar--3" x="160" y="80" width="35" height="160" fill="url(#graphGradient1)" rx="4" />
                    <text x="177" y="260" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif">50s</text>
                    
                    <rect className="chart-bar chart-bar--4" x="210" y="30" width="35" height="210" fill="url(#graphGradient2)" rx="4" />
                    <text x="227" y="260" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif">60s+</text>
                    
                    <text x="35" y="245" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">0</text>
                    <text x="35" y="195" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">25</text>
                    <text x="35" y="145" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">50</text>
                    <text x="35" y="95" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">75</text>
                    <text x="35" y="45" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">100</text>
                    
                    <text x="150" y="20" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="700" fontFamily="sans-serif">Strength Development</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="filter-section">
        <div className="container">
          <div className="filter-header">
            <h3>Filter by topic</h3>
          </div>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button key={cat} className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`} onClick={() => { setActiveCategory(cat); setVisibleArticles(new Set()); }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="container">
          <div className="articles-header">
            <h2 className="section-title">All Articles</h2>
            <p className="articles-count">{filteredArticles.length} articles</p>
          </div>
          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <div key={article.id} ref={el => (articleRefs.current[article.id] = el)} data-article-id={article.id} style={{ animationDelay: `${index * 50}ms` }}>
                <ArticleCard article={article} onClick={() => handleArticleClick(article)} isVisible={visibleArticles.has(article.id)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section__bg"></div>
        <div className="container cta-section__content">
          <h2>Ready to transform your training?</h2>
          <p>Let us build a personalized strength program designed for your decade of life.</p>
          <button className="cta-btn" onClick={() => navigate('/contact')}>
            Start Your Journey <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}