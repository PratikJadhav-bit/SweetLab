import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useScrollReveal } from '../../hooks';
import { PRODUCTS, formatCurrency } from '../../data/constants';
import styles from './Showcase.module.css';

const FILTERS = [
  { key: 'all',      label: 'All Items' },
  { key: 'cakes',    label: 'Cakes' },
  { key: 'cupcakes', label: 'Cupcakes' },
  { key: 'pastries', label: 'Pastries' },
  { key: 'seasonal', label: 'Seasonal' },
];

const BADGE_CONFIG = {
  bestseller: { label: '🔥 Best Seller', bg: '#fff3e0', color: '#c45500' },
  new:        { label: '✨ New',         bg: '#e8f5e9', color: '#2e7d32' },
  seasonal:   { label: '🍂 Seasonal',   bg: '#fce4ec', color: '#c62828' },
  vegan:      { label: '🌿 Vegan',      bg: '#f1f8e9', color: '#33691e' },
};

const MARQUEE_ITEMS = [
  '🍰 Red Velvet', '🎂 Chocolate Truffle', '🧁 Vanilla Bean', '🍩 Glazed Donut',
  '🥐 Butter Croissant', '🍮 Crème Brûlée', '🍰 Tiramisu', '🎂 Black Forest',
  '🧁 Salted Caramel', '🍩 Matcha Dream', '🥐 Almond Praline', '🍮 Passion Fruit',
];

function ProductCard({ product, index }) {
  const { dispatch } = useCart();
  const { ref, visible } = useScrollReveal(0.1);
  const badge = BADGE_CONFIG[product.badge];

  return (
    <article
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Image Area */}
      <div className={styles.cardImg} style={{ background: `linear-gradient(145deg, ${product.bg}, #fff)` }}>
        <div className={styles.cardEmoji}>{product.emoji}</div>
        {badge && (
          <span className={styles.badge} style={{ background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
        )}
        <div className={styles.cardOverlay}>
          <button
            className={styles.quickAdd}
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: product.id, name: product.name, price: product.price, emoji: product.emoji, sub: product.desc } })}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardDesc}>{product.desc}</p>

        <div className={styles.cardFooter}>
          <div>
            <div className={styles.cardPrice}>{formatCurrency(product.price)}</div>
            <div className={styles.cardRating}>
              <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}</span>
              <span className={styles.ratingText}>{product.rating} ({product.reviews})</span>
            </div>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: product.id, name: product.name, price: product.price, emoji: product.emoji, sub: product.desc } })}
            aria-label={`Add ${product.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Showcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === activeFilter);
    if (sortBy === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     list.sort((a,b) => b.rating - a.rating);
    return list;
  }, [activeFilter, sortBy]);

  return (
    <section className={styles.showcase} id="showcase">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>🍩 Our Gallery</div>
          <h2 className={styles.sectionTitle}>Artisan <em>Creations</em></h2>
          <p className={styles.sectionSub}>Each creation is a masterpiece — designed with love, baked with precision and premium ingredients</p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.filters} role="group" aria-label="Product category filters">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.filterBtn} ${activeFilter === f.key ? styles.active : ''}`}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
              >
                {f.label}
                {activeFilter === f.key && <span className={styles.filterCount}>{filtered.length}</span>}
              </button>
            ))}
          </div>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
