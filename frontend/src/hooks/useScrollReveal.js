import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll reveal hook using native IntersectionObserver.
 * Triggers once when the element enters the viewport.
 */
export const useScrollReveal = (options = {}) => {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible];
};
