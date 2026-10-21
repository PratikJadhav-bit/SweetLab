import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Home',      href: '/#home' },
  { label: 'Gallery',   href: '/#showcase' },
  { label: 'Pre-Order', href: '/#preorder' },
  { label: 'Designer',  href: '/#designer' },
  { label: 'Tracking',  href: '/#tracking' },
  { label: 'Rewards',   href: '/#loyalty' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const { itemCount, dispatch } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home','showcase','preorder','designer','tracking','loyalty','dashboard'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.navInner}>
          {/* Brand */}
          <Link to="/" className={styles.brand} aria-label="SweetLab Home">
            <div className={styles.brandLogo}>
              <span className={styles.brandEmoji}>🍰</span>
              <div className={styles.brandText}>
                <span className={styles.brandName}>SweetLab</span>
                <span className={styles.brandTagline}>Artisan Bakery</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.navLinks} role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              item.href.startsWith('/dashboard') ? (
                <Link
                  key={item.label}
                  to="/dashboard"
                  className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${styles.navLink} ${activeSection === item.href.slice(2) ? styles.active : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.navActions}>
            {/* Loyalty Points */}
            <div className={styles.loyaltyPill}>
              <span>⭐</span>
              <span className={styles.loyaltyPts}>2,450 pts</span>
              <span className={styles.loyaltyTier}>Gold</span>
            </div>

            {/* Theme Toggle */}
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Cart */}
            <button
              className={styles.cartBtn}
              onClick={() => dispatch({ type: 'OPEN_CART' })}
              aria-label={`Open cart, ${itemCount} items`}
              id="cartButton"
            >
              🛒
              {itemCount > 0 && (
                <span className={styles.cartBadge} key={itemCount}>{itemCount}</span>
              )}
            </button>

            {/* CTA */}
            <a
              href="/#preorder"
              className={styles.ctaBtn}
              onClick={(e) => { e.preventDefault(); handleNavClick('/#preorder'); }}
            >
              Order Now
            </a>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`} aria-hidden={!mobileOpen}>
        <div className={styles.mobileMenuInner}>
          {NAV_ITEMS.map(item => (
            item.href.startsWith('/dashboard') ? (
              <Link key={item.label} to="/dashboard" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={styles.mobileLink}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
                {item.label}
              </a>
            )
          ))}
          <div className={styles.mobileDivider} />
          <div className={styles.mobileActions}>
            <button className={styles.themeToggle} onClick={toggleTheme}>
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />}
    </>
  );
}
