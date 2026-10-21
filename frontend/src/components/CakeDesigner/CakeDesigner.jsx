import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import {
  CAKE_SHAPES, CAKE_FLAVORS, CAKE_FROSTINGS, CAKE_DECOS,
  COLOR_SWATCHES, DESIGNER_PRICE_MATRIX, formatCurrency
} from '../../data/constants';
import styles from './CakeDesigner.module.css';

const STEPS = [
  { key: 'shape',    label: '1. Shape',      options: CAKE_SHAPES },
  { key: 'flavor',   label: '2. Flavour',    options: CAKE_FLAVORS },
  { key: 'frosting', label: '3. Frosting',   options: CAKE_FROSTINGS },
  { key: 'deco',     label: '4. Decoration', options: CAKE_DECOS },
];

const DECO_EMOJI_MAP = {
  flowers:'🌸','gold-leaf':'✨',sprinkles:'🎉',berries:'🫐',macarons:'🍬',candles:'🕯️'
};
const FROSTING_COLORS = {
  buttercream:'#f9e8c8', fondant:'#f5f5f5', ganache:'#3d2010', whipped:'#fff9f5'
};

function computePrice(state) {
  const m = DESIGNER_PRICE_MATRIX;
  return (
    (m.shape[state.shape] || 1800) +
    (m.flavor[state.flavor] || 0) +
    (m.frosting[state.frosting] || 0) +
    (m.deco[state.deco] || 0) +
    (state.tiers - 1) * m.tierExtra
  );
}

function CakePreview({ state }) {
  const color = state.color || '#f4c2c2';
  const frostingColor = FROSTING_COLORS[state.frosting] || '#f9e8c8';

  return (
    <div className={styles.previewCanvas}>
      <div className={styles.previewStage}>
        {/* Tier rendering */}
        <div className={styles.cakeTiers}>
          {state.tiers >= 3 && (
            <div className={styles.tier} style={{
              width: 80, height: 48,
              background: `linear-gradient(to bottom, ${color}, ${frostingColor})`,
              borderColor: color,
            }} />
          )}
          {state.tiers >= 2 && (
            <div className={styles.tier} style={{
              width: 110, height: 54,
              background: `linear-gradient(to bottom, ${frostingColor}, ${color})`,
              borderColor: color,
            }} />
          )}
          <div className={styles.tier} style={{
            width: state.tiers === 1 ? 140 : 140, height: 60,
            background: `linear-gradient(to bottom, ${color}, ${frostingColor})`,
            borderColor: color,
          }}>
            <div className={styles.tierLabel}>
              {state.tiers > 1 ? `${state.tiers} Tier` : 'Base'}
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className={styles.cakeDeco}>{DECO_EMOJI_MAP[state.deco] || '🌸'}</div>

        {/* Base plate */}
        <div className={styles.plate} />
        <div className={styles.plateShadow} />
      </div>

      {/* Floating details */}
      <div className={styles.previewDetails}>
        <div className={styles.previewDetail} style={{ background: color }}>
          <span>{CAKE_SHAPES.find(s=>s.val===state.shape)?.emoji}</span>
          <span>{state.shape}</span>
        </div>
        <div className={styles.previewDetail}>
          <span>{CAKE_FLAVORS.find(f=>f.val===state.flavor)?.emoji}</span>
          <span>{state.flavor.replace('-',' ')}</span>
        </div>
      </div>
    </div>
  );
}

export default function CakeDesigner() {
  const { dispatch } = useCart();
  const [design, setDesign] = useState({
    shape: 'round', flavor: 'red-velvet',
    frosting: 'buttercream', deco: 'flowers',
    tiers: 1, color: '#f4c2c2',
  });

  const price = useMemo(() => computePrice(design), [design]);

  const setOpt = (key, val) => setDesign(d => ({ ...d, [key]: val }));

  const summaryTags = [
    CAKE_SHAPES.find(s=>s.val===design.shape)?.label + ' Shape',
    CAKE_FLAVORS.find(f=>f.val===design.flavor)?.label,
    CAKE_FROSTINGS.find(f=>f.val===design.frosting)?.label + ' Frosting',
    CAKE_DECOS.find(d=>d.val===design.deco)?.label,
    `${design.tiers} Tier${design.tiers > 1 ? 's' : ''}`,
  ];

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `custom-${Date.now()}`,
        name: `Custom ${CAKE_FLAVORS.find(f=>f.val===design.flavor)?.label} Cake`,
        price,
        emoji: '🎂',
        sub: summaryTags.join(' · '),
      }
    });
  };

  return (
    <section className={styles.designer} id="designer">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>🎨 Design Studio</div>
          <h2 className={styles.sectionTitle}>Custom Cake <em>Designer</em></h2>
          <p className={styles.sectionSub}>Build your dream cake layer by layer — our interactive studio brings your vision to life</p>
        </div>

        <div className={styles.layout}>
          {/* Controls */}
          <div className={styles.controls}>
            {STEPS.map(step => (
              <div key={step.key} className={styles.step}>
                <h4 className={styles.stepTitle}>{step.label}</h4>
                <div className={styles.optionGrid}>
                  {step.options.map(opt => (
                    <button
                      key={opt.val}
                      className={`${styles.optionCard} ${design[step.key] === opt.val ? styles.selected : ''}`}
                      onClick={() => setOpt(step.key, opt.val)}
                      aria-pressed={design[step.key] === opt.val}
                    >
                      <span className={styles.optEmoji}>{opt.emoji}</span>
                      <span className={styles.optLabel}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Tiers */}
            <div className={styles.step}>
              <h4 className={styles.stepTitle}>5. Tiers</h4>
              <div className={styles.tierControl}>
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    className={`${styles.tierBtn} ${design.tiers === n ? styles.selected : ''}`}
                    onClick={() => setOpt('tiers', n)}
                    aria-pressed={design.tiers === n}
                  >
                    {n}
                  </button>
                ))}
                <span className={styles.tierLabel}>{design.tiers} Tier{design.tiers > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Colour */}
            <div className={styles.step}>
              <h4 className={styles.stepTitle}>6. Colour Palette</h4>
              <div className={styles.colorGrid}>
                {COLOR_SWATCHES.map(col => (
                  <button
                    key={col}
                    className={`${styles.swatch} ${design.color === col ? styles.swatchActive : ''}`}
                    style={{ background: col }}
                    onClick={() => setOpt('color', col)}
                    aria-label={`Select colour ${col}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className={styles.previewPanel}>
            <CakePreview state={design} />

            <div className={styles.summary}>
              <h4 className={styles.summaryTitle}>Your Custom Cake</h4>
              <div className={styles.summaryTags}>
                {summaryTags.map(tag => (
                  <span key={tag} className={styles.summaryTag}>{tag}</span>
                ))}
              </div>
              <div className={styles.priceLine}>
                Estimated Price:
                <strong className={styles.priceValue}>{formatCurrency(price)}</strong>
              </div>
              <button className={styles.addBtn} onClick={addToCart}>
                Add to Order 🛒
              </button>
              <p className={styles.priceNote}>
                * Final price may vary based on delivery location and add-ons
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
