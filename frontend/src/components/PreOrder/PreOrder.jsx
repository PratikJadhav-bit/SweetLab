import React, { useState } from 'react';
import { FESTIVALS, AI_MOODS, ORDER_PRICES, SIZE_PRICES, formatCurrency } from '../../data/constants';
import styles from './PreOrder.module.css';

const CAKE_TYPES = Object.keys(ORDER_PRICES);
const CAKE_SIZES = Object.keys(SIZE_PRICES);
const DELIVERY_TIMES = ['Morning (9AM – 12PM)', 'Afternoon (12PM – 4PM)', 'Evening (4PM – 8PM)'];

let orderCounter = 5;

export default function PreOrder({ onOrderPlaced }) {
  const [form, setForm] = useState({
    name:'', phone:'', email:'', type:'', size:'', date:'', time:DELIVERY_TIMES[0], message:'', instructions:''
  });
  const [activeMood, setActiveMood] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const price = (() => {
    if (!form.type || !form.size) return null;
    const info = ORDER_PRICES[form.type] || { base:2000, custom:300 };
    const mult = SIZE_PRICES[form.size] || 1;
    const base = Math.round(info.base * mult);
    return { base, custom: info.custom, total: base + info.custom };
  })();

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name = 'Name is required';
    if (!form.phone.match(/^\+?[\d\s-]{10,}/)) e.phone = 'Valid phone required';
    if (!form.type)  e.type = 'Please select a cake type';
    if (!form.size)  e.size = 'Please select a size';
    if (!form.date)  e.date = 'Delivery date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    orderCounter++;
    setLoading(false);
    onOrderPlaced?.({ orderId: `SL-2024-00${orderCounter}`, name: form.name, cake: form.type, pts: Math.floor((price?.total || 2000) / 10) });
    setForm({ name:'',phone:'',email:'',type:'',size:'',date:'',time:DELIVERY_TIMES[0],message:'',instructions:'' });
  };

  const minDate = (() => {
    const d = new Date(); d.setDate(d.getDate()+1);
    return d.toISOString().split('T')[0];
  })();

  return (
    <section className={styles.preorder} id="preorder">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>📅 Advance Booking</div>
          <h2 className={styles.sectionTitle}>Cake <em>Pre-Order</em></h2>
          <p className={styles.sectionSub}>Reserve your dream cake up to 30 days in advance with guaranteed same-day delivery slots</p>
        </div>

        <div className={styles.layout}>
          {/* Order Form */}
          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.formTitle}>Book Your Cake</h3>

            <div className={styles.formGrid}>
              <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
                <label className={styles.label}>Customer Name *</label>
                <input className={styles.input} type="text" placeholder="Your full name" value={form.name} onChange={set('name')} />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={`${styles.field} ${errors.phone ? styles.fieldError : ''}`}>
                <label className={styles.label}>Phone Number *</label>
                <input className={styles.input} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input className={styles.input} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
              </div>
              <div className={`${styles.field} ${errors.type ? styles.fieldError : ''}`}>
                <label className={styles.label}>Cake Type *</label>
                <select className={styles.input} value={form.type} onChange={set('type')}>
                  <option value="">Select cake type</option>
                  {CAKE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                {errors.type && <span className={styles.error}>{errors.type}</span>}
              </div>
              <div className={`${styles.field} ${errors.size ? styles.fieldError : ''}`}>
                <label className={styles.label}>Size *</label>
                <select className={styles.input} value={form.size} onChange={set('size')}>
                  <option value="">Select size</option>
                  {CAKE_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
                {errors.size && <span className={styles.error}>{errors.size}</span>}
              </div>
              <div className={`${styles.field} ${errors.date ? styles.fieldError : ''}`}>
                <label className={styles.label}>Delivery Date *</label>
                <input className={styles.input} type="date" min={minDate} value={form.date} onChange={set('date')} />
                {errors.date && <span className={styles.error}>{errors.date}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Delivery Time</label>
                <select className={styles.input} value={form.time} onChange={set('time')}>
                  {DELIVERY_TIMES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Message on Cake</label>
                <input className={styles.input} type="text" placeholder='Happy Birthday, Sarah! 🎂' value={form.message} onChange={set('message')} />
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label className={styles.label}>Special Instructions</label>
                <textarea className={`${styles.input} ${styles.textarea}`} rows={3} placeholder="Eggless, nut-free, dietary preferences, allergy info..." value={form.instructions} onChange={set('instructions')} />
              </div>
            </div>

            {/* Price Preview */}
            {price && (
              <div className={styles.pricePreview}>
                <div className={styles.priceRow}><span>Base Price</span><span>{formatCurrency(price.base)}</span></div>
                <div className={styles.priceRow}><span>Customisation</span><span>{formatCurrency(price.custom)}</span></div>
                <div className={`${styles.priceRow} ${styles.priceTotal}`}><span>Total Estimate</span><strong>{formatCurrency(price.total)}</strong></div>
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <><span className={styles.spinner} /> Processing…</>
              ) : (
                '🎂 Place Pre-Order'
              )}
            </button>
          </form>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* AI Flavour Recommender */}
            <div className={styles.aiCard}>
              <div className={styles.aiOrb}>🤖</div>
              <h4 className={styles.cardTitle}>AI Flavour Recommender</h4>
              <p className={styles.cardDesc}>Tell us your mood — our AI will find your perfect cake match</p>
              <div className={styles.moodGrid}>
                {Object.entries(AI_MOODS).map(([mood, data]) => (
                  <button
                    key={mood}
                    className={`${styles.moodBtn} ${activeMood === mood ? styles.moodActive : ''}`}
                    onClick={() => setActiveMood(activeMood === mood ? null : mood)}
                  >
                    {data.emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </button>
                ))}
              </div>
              {activeMood && (
                <div className={styles.aiResult}>
                  <div className={styles.aiResultHeader}>
                    <span className={styles.aiResultEmoji}>{AI_MOODS[activeMood].emoji}</span>
                    <div>
                      <strong>{AI_MOODS[activeMood].name}</strong>
                      <div className={styles.aiMatch}>Match Score: <strong>{AI_MOODS[activeMood].match}</strong></div>
                    </div>
                  </div>
                  <p>{AI_MOODS[activeMood].desc}</p>
                  <div className={styles.aiPrice}>{AI_MOODS[activeMood].price}</div>
                </div>
              )}
            </div>

            {/* Festival Predictor */}
            <div className={styles.festCard}>
              <div className={styles.festHeader}>
                <span className={styles.festIcon}>🎉</span>
                <div>
                  <h4 className={styles.cardTitle}>Festival Order Predictor</h4>
                  <p className={styles.cardDesc}>AI-analysed demand spikes for upcoming events</p>
                </div>
              </div>
              <div className={styles.festList}>
                {FESTIVALS.map(f => (
                  <div key={f.name} className={styles.festItem}>
                    <div className={styles.festLeft}>
                      <span className={styles.festEmoji}>{f.icon}</span>
                      <div>
                        <div className={styles.festName}>{f.name}</div>
                        <div className={styles.festDate}>{f.date}</div>
                      </div>
                    </div>
                    <div className={styles.festRight}>
                      <span className={`${styles.demandBadge} ${styles[`demand_${f.demand}`]}`}>{f.demand.toUpperCase()}</span>
                      <span className={styles.surge}>{f.ordersSurge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
