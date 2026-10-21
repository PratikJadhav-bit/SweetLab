import React, { useEffect, useRef } from 'react';
import { useCounter } from '../../hooks';
import styles from './Hero.module.css';

const STATS = [
  { value: 12400, label: 'Happy Customers', suffix: '+' },
  { value: 350,   label: 'Cake Varieties',  suffix: '+' },
  { value: 98,    label: '% Satisfaction',  suffix: '' },
  { value: 7,     label: 'Years of Craft',  suffix: '' },
];

function StatCard({ value, label, suffix }) {
  const { count, ref } = useCounter(value);
  return (
    <div className={styles.statCard} ref={ref}>
      <span className={styles.statValue}>{count.toLocaleString()}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={styles.hero} id="home" aria-label="Hero section">
      {/* Ambient Background */}
      <div className={styles.ambientBg} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
        <div className={styles.grid} />
      </div>

      <div className={styles.heroContainer}>
        {/* Left: Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            <span>✨ Artisan · Premium · Handcrafted</span>
          </div>

          <h1 className={styles.heroTitle}>
            Where Every Bite<br />
            <em className={styles.heroTitleEm}>Tells a Story</em>
          </h1>

          <p className={styles.heroSubtitle}>
            Experience the future of artisan baking — AI-powered flavour recommendations,
            custom cake design studio, and real-time kitchen tracking.
            Because you deserve more than just dessert.
          </p>

          <div className={styles.heroActions}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollToSection('designer')}
              id="heroDesignBtn"
            >
              <span>Design Your Cake</span>
              <span className={styles.btnArrow}>→</span>
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToSection('showcase')}
              id="heroExploreBtn"
            >
              Explore Menu
            </button>
          </div>

          <div className={styles.statsGrid}>
            {STATS.map(s => <StatCard key={s.label} {...s} />)}
          </div>
        </div>

        {/* Right: Visual */}
        <div className={styles.heroVisual}>
          {/* Main Cake Card */}
          <div className={styles.cakeCard} ref={parallaxRef}>
            <div className={styles.cakeCardGlow} />
            <div className={styles.cakeEmoji}>🎂</div>
            <div className={styles.sparkles} aria-hidden="true">
              <span className={`${styles.sparkle} ${styles.s1}`}>✨</span>
              <span className={`${styles.sparkle} ${styles.s2}`}>🌟</span>
              <span className={`${styles.sparkle} ${styles.s3}`}>✨</span>
              <span className={`${styles.sparkle} ${styles.s4}`}>⭐</span>
            </div>
            <div className={styles.cakeCardInfo}>
              <div className={styles.cakeCardBadge}>🤖 AI Pick of the Day</div>
              <h3 className={styles.cakeName}>Velvet Dream</h3>
              <p className={styles.cakeDesc}>Red Velvet · Cream Cheese · 24K Gold Leaf</p>
              <div className={styles.cakeCardFooter}>
                <span className={styles.cakePrice}>₹3,499</span>
                <div className={styles.cakeRating}>
                  <span>★★★★★</span>
                  <span className={styles.ratingNum}>4.9 (312)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini cards */}
          <div className={`${styles.floatCard} ${styles.fc1}`}>
            <span>🧁</span>
            <div>
              <strong>Cupcakes</strong>
              <p>24 varieties</p>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.fc2}`}>
            <span>🚚</span>
            <div>
              <strong>Same-Day</strong>
              <p>Delivery</p>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.fc3}`}>
            <span>⭐</span>
            <div>
              <strong>4.9/5 Rating</strong>
              <p>12K+ Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={() => scrollToSection('showcase')}
        aria-label="Scroll to gallery"
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </button>
    </section>
  );
}
