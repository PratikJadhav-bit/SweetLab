import { useEffect, useRef, useState } from 'react';

/* ── Animated counter hook ─────────────────────────────────────────── */
export function useCounter(target, duration = 1800, startOnVisible = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnVisible);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnVisible) { setStarted(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── Scroll reveal hook ─────────────────────────────────────────────── */
export function useScrollReveal(threshold = 0.1, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/* ── Debounce hook ──────────────────────────────────────────────────── */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ── Previous value hook ────────────────────────────────────────────── */
export function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => { ref.current = value; });
  return ref.current;
}

/* ── Click outside hook ─────────────────────────────────────────────── */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

/* ── Local storage hook ─────────────────────────────────────────────── */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = (val) => {
    try {
      setValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch { /* ignore */ }
  };

  return [value, setStoredValue];
}

/* ── Media query hook ───────────────────────────────────────────────── */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
