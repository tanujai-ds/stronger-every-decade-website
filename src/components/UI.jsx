import { useScrollReveal } from '../hooks/useScrollReveal';

// ── Reveal wrapper ────────────────────────────────────────────────────────────
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── Section label / eyebrow ───────────────────────────────────────────────────
export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow mb-3 ${className}`}>{children}</p>;
}

// ── Pull quote ────────────────────────────────────────────────────────────────
export function PullQuote({ children }) {
  return (
    <blockquote className="pull-quote my-10 md:my-14">
      {children}
    </blockquote>
  );
}

// ── Programme card ────────────────────────────────────────────────────────────
export function ProgrammeCard({ programme, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="card flex flex-col h-full">
        <span className="decade-badge mb-4">{programme.decade}</span>
        <h3 className="font-display text-2xl font-semibold text-navy mb-2">
          {programme.title}
        </h3>
        <p className="text-teal font-sans text-sm italic mb-4">{programme.tagline}</p>
        <p className="body-md mb-6 flex-grow">{programme.description}</p>
        <ul className="text-sm text-slate mb-6 flex flex-col gap-2">
          {programme.forYouIf.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-teal flex-shrink-0 mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 text-xs text-mid border-t border-[#EFF6F6] pt-4 mb-6">
          <span>{programme.format}</span>
          <span>{programme.duration}</span>
        </div>
        <a href={`/programmes/${programme.slug}`} className="btn btn-ghost self-start text-sm py-2.5 px-5">
          Learn more →
        </a>
      </article>
    </Reveal>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
export function TestimonialCard({ testimonial, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="bg-[#EFF6F6] p-8">
        <p className="font-display italic text-lg text-navy leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>
        <div className="flex flex-col gap-0.5">
          <span className="font-sans font-semibold text-sm text-navy">{testimonial.name}</span>
          <span className="text-xs text-mid">{testimonial.programme}</span>
        </div>
      </article>
    </Reveal>
  );
}

// ── Principle card (full) ─────────────────────────────────────────────────────
export function PrincipleCard({ principle, index }) {
  const isEven = index % 2 === 0;
  return (
    <Reveal delay={index * 80}>
      <article className={`p-8 md:p-12 ${isEven ? 'bg-[#EFF6F6]' : 'bg-white border border-[#EFF6F6]'}`}>
        <div className="flex gap-4 items-start mb-4">
          <span className="font-display font-bold text-6xl text-[#D0DDE8] leading-none select-none">
            {principle.number}
          </span>
          <div>
            <p className="eyebrow mb-1">Principle {principle.number}</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-navy leading-tight">
              {principle.title}
            </h3>
          </div>
        </div>
        <p className="text-teal italic font-sans text-base mb-4">{principle.tagline}</p>
        <div className="h-px bg-[#D0DDE8] mb-6" />
        <p className="body-lg mb-6">{principle.excerpt}</p>
        <p className="font-sans font-semibold text-navy text-sm border-l-2 border-teal pl-4">
          {principle.contrast}
        </p>
      </article>
    </Reveal>
  );
}

// ── Blog card ─────────────────────────────────────────────────────────────────
export function BlogCard({ post, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="border-b border-[#EFF6F6] pb-8">
        <div className="flex gap-3 items-center mb-3">
          <span className="decade-badge text-xs">{post.category}</span>
          <span className="text-xs text-mid">{post.date} · {post.readTime} read</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-navy mb-2 hover:text-teal transition-colors">
          <a href={`/resources/blog/${post.slug}`}>{post.title}</a>
        </h3>
        <p className="body-md text-sm mb-4">{post.excerpt}</p>
        <a href={`/resources/blog/${post.slug}`} className="btn-text text-sm">Read article</a>
      </article>
    </Reveal>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
export function FAQItem({ faq, index }) {
  const [open, setOpen] = require('react').useState(false);
  return (
    <div className="border-b border-[#D0DDE8]">
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span className="font-sans font-semibold text-navy pr-4">{faq.q}</span>
        <span className="text-teal font-sans text-xl flex-shrink-0 transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div
        id={`faq-${index}`}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0' }}
      >
        <p className="body-md pb-6 pr-8">{faq.a}</p>
      </div>
    </div>
  );
}

// ── Email capture inline ──────────────────────────────────────────────────────
export function EmailCapture({ dark = false, label = 'Send me the guide', placeholder = 'Your email address' }) {
  const [email, setEmail]   = require('react').useState('');
  const [sent, setSent]     = require('react').useState(false);
  const inputColor = dark ? 'border-white/30 text-white placeholder-white/40 focus:border-teal' : 'border-navy/30 text-navy placeholder-slate/40 focus:border-teal';

  const handleSubmit = (e) => { e.preventDefault(); if (email) { setSent(true); setEmail(''); } };

  if (sent) {
    return (
      <p className={`font-semibold text-sm ${dark ? 'text-teal' : 'text-teal'}`}>
        Guide on its way. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className={`flex-grow bg-transparent border-b outline-none text-sm py-2.5 transition-colors ${inputColor}`}
        aria-label="Email address"
      />
      <button type="submit" className={`btn text-sm py-2.5 px-6 flex-shrink-0 ${dark ? 'btn-primary bg-teal border-teal' : 'btn-primary'}`}>
        {label}
      </button>
    </form>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
export function SectionDivider({ color = 'teal' }) {
  return <div className={`hr-${color} my-0`} />;
}
