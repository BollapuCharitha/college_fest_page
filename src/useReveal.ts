import { useEffect, useRef } from 'react';

/**
 * Adds the `.in` class to any element with `.reveal` when it scrolls into view.
 * Vanilla DOM + IntersectionObserver — no re-renders.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current ?? document;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}
