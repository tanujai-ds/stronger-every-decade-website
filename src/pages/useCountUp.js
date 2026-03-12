import { useEffect, useRef, useState } from 'react';

export function useCountUp(stats, ref) {
  const [values, setValues] = useState(stats.map(() => 0));
  const hasRun = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.disconnect();

          const duration = 2000;
          const startTime = performance.now();
          const ease = t => 1 - Math.pow(1 - t, 3);

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = ease(progress);

            setValues(stats.map(s => {
              const current = eased * s.target;
              return s.decimals
                ? parseFloat(current.toFixed(s.decimals))
                : Math.floor(current);
            }));

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(tick);
            } else {
              setValues(stats.map(s => s.target));
            }
          };

          frameRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return values;
}