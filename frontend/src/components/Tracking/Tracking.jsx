import React, { useState } from 'react';
import styles from './Tracking.module.css';

const SAMPLE_ORDERS = {
  'SL-2024-001': {
    name: 'Chocolate Truffle Cake (1kg)',
    customer: 'Sarah Johnson',
    eta: '14 min',
    step: 3,
    date: 'May 26, 2024',
    amount: '₹2,999',
  },
  'SL-2024-002': {
    name: 'Red Velvet 2kg',
    customer: 'Rahul Mehta',
    eta: 'Delivered ✅',
    step: 5,
    date: 'May 26, 2024',
    amount: '₹5,498',
  },
};

const TIMELINE_STEPS = [
  { icon:'✅', label:'Order Confirmed',           sub:'Payment received & confirmed' },
  { icon:'👨‍🍳', label:'Baking in Progress',        sub:'Your cake is in the oven' },
  { icon:'🎨', label:'Decoration & Quality Check', sub:'Hand-crafted finishing touches' },
  { icon:'📦', label:'Packaging & Dispatch',       sub:'Sealed with care, ready to ship' },
  { icon:'🚚', label:'Out for Delivery',            sub:'On the way to your door' },
];

const KITCHEN_STATIONS = [
  { icon:'🔥', name:'Baking Station',    load:85, active:false },
  { icon:'🎨', name:'Decoration Bay',    load:60, active:true  },
  { icon:'📦', name:'Packaging Unit',    load:40, active:false },
  { icon:'❄️', name:'Cold Storage',      load:70, active:false },
];

export default function Tracking() {
  const [input, setInput] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    const id = input.trim().toUpperCase();
    if (!id) { setError('Please enter an order ID'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    const found = SAMPLE_ORDERS[id] || {
      name: 'Custom Cake Order', customer: 'Valued Customer',
      eta: '35 min', step: 2, date: 'Today', amount: 'Pending',
    };
    setOrder({ ...found, id });
  };

  return (
    <section className={styles.tracking} id="tracking">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>🚚 Live Tracking</div>
          <h2 className={styles.sectionTitle}>Order <em>Tracking</em></h2>
          <p className={styles.sectionSub}>Follow your cake's journey from our oven to your doorstep in real-time</p>
        </div>

        <div className={styles.layout}>
          {/* Search */}
          <div className={styles.searchCard}>
            <h3 className={styles.searchTitle}>Track Your Order</h3>
            <div className={styles.searchRow}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Enter Order ID (e.g. SL-2024-001)"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
              />
              <button className={styles.searchBtn} onClick={handleTrack} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : '🔍 Track'}
              </button>
            </div>
            {error && <p className={styles.searchError}>{error}</p>}
            <div className={styles.sampleIds}>
              <span>Try:</span>
              {['SL-2024-001', 'SL-2024-002'].map(id => (
                <button key={id} className={styles.sampleBtn}
                  onClick={() => { setInput(id); }}>
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {order && (
            <div className={styles.resultCard}>
              {/* Order Header */}
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.orderId}>{order.id}</span>
                  <h3 className={styles.orderName}>{order.name}</h3>
                  <p className={styles.orderCustomer}>For: {order.customer} · {order.date}</p>
                </div>
                <div className={styles.etaCard}>
                  <span className={styles.etaLabel}>ETA</span>
                  <span className={styles.etaValue}>{order.eta}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className={styles.timeline}>
                {TIMELINE_STEPS.map((step, i) => {
                  const idx = i + 1;
                  const isDone   = idx < order.step;
                  const isActive = idx === order.step;
                  return (
                    <div key={step.label}
                      className={`${styles.timelineStep} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}>
                      <div className={styles.stepConnector} />
                      <div className={styles.stepDot}>
                        {isDone ? '✓' : isActive ? step.icon : <span className={styles.stepNum}>{idx}</span>}
                      </div>
                      <div className={styles.stepContent}>
                        <strong>{step.label}</strong>
                        <span>{step.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Kitchen Status */}
              <div className={styles.kitchenBox}>
                <h4 className={styles.kitchenTitle}>🧑‍🍳 Real-Time Kitchen Status</h4>
                <div className={styles.kitchenGrid}>
                  {KITCHEN_STATIONS.map(st => (
                    <div key={st.name} className={`${styles.station} ${st.active ? styles.stationActive : ''}`}>
                      <div className={styles.stationIcon}>{st.icon}</div>
                      <div className={styles.stationName}>{st.name}</div>
                      <div className={styles.stationBar}>
                        <div className={styles.stationFill} style={{ width: `${st.load}%` }} />
                      </div>
                      <div className={styles.stationPct}>{st.load}% capacity</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
