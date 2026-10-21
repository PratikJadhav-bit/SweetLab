import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  REVENUE_DATA, TOP_SELLERS, DONUT_DATA, FORECAST_DATA,
  ORDERS_DATA, INVENTORY_ITEMS, formatCurrency, getStatusColor
} from '../../data/constants';
import { useCounter } from '../../hooks';
import styles from './Dashboard.module.css';

const KPI_DATA = [
  { icon:'💰', label:'Monthly Revenue', value:284500, prefix:'₹', trend:'+18.3%', up:true },
  { icon:'🎂', label:'Orders This Month', value:847, trend:'+24.1%', up:true },
  { icon:'⭐', label:'Avg. Rating', value:4.9, decimal:true, trend:'+0.2', up:true },
  { icon:'👥', label:'Active Members', value:1247, trend:'+156', up:true },
  { icon:'🚚', label:'On-Time Delivery %', value:98, suffix:'%', trend:'+2.1%', up:true },
];

function KPICard({ data }) {
  const { count, ref } = useCounter(data.value);
  const displayVal = data.decimal
    ? (data.value).toFixed(1)
    : (data.prefix || '') + count.toLocaleString() + (data.suffix || '');
  return (
    <div className={styles.kpiCard} ref={ref}>
      <div className={styles.kpiIcon}>{data.icon}</div>
      <div className={styles.kpiValue}>{displayVal}</div>
      <div className={styles.kpiLabel}>{data.label}</div>
      <div className={`${styles.kpiTrend} ${data.up ? styles.up : styles.down}`}>{data.up ? '↗' : '↘'} {data.trend}</div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map(p => (
        <div key={p.name} className={styles.tooltipRow} style={{ color: p.color }}>
          <span>{p.name}:</span>
          <strong>{typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredOrders = useMemo(() => {
    return ORDERS_DATA.filter(o => {
      const q = searchQ.toLowerCase();
      const matchQ = !q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.cake.toLowerCase().includes(q);
      const matchS = statusFilter === 'all' || o.status === statusFilter;
      return matchQ && matchS;
    });
  }, [searchQ, statusFilter]);

  return (
    <section className={styles.dashboard} id="dashboard">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>📊 Business Intelligence</div>
          <h2 className={styles.sectionTitle}>Analytics <em>Dashboard</em></h2>
          <p className={styles.sectionSub}>Real-time insights, powered by SQL analytics and live data streams</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['overview','orders','inventory'].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {{ overview:'📈 Overview', orders:'📋 Orders', inventory:'📦 Inventory' }[tab]}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* KPIs */}
            <div className={styles.kpiGrid}>
              {KPI_DATA.map(d => <KPICard key={d.label} data={d} />)}
            </div>

            {/* Charts Row 1 */}
            <div className={styles.chartsRow}>
              {/* Revenue Trend */}
              <div className={`${styles.chartCard} ${styles.chartLarge}`}>
                <div className={styles.chartHeader}>
                  <h4 className={styles.chartTitle}>Revenue Trend</h4>
                  <div className={styles.chartLegend}>
                    <span style={{color:'var(--gold-500)'}}>━ This Year</span>
                    <span style={{color:'var(--gold-300)'}}>- - Last Year</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={REVENUE_DATA} margin={{ top:10, right:10, left:0, bottom:0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--gold-500)" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="var(--gold-500)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="lastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--gold-300)" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="var(--gold-300)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} tick={{ fontSize:11, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="lastYear" name="Last Year" stroke="var(--gold-300)" strokeWidth={2} strokeDasharray="5 4" fill="url(#lastGrad)" dot={false} />
                    <Area type="monotone" dataKey="revenue"  name="This Year" stroke="var(--gold-500)" strokeWidth={3} fill="url(#revGrad)" dot={{ fill:'var(--gold-500)', r:4 }} activeDot={{ r:6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Top Sellers */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}><h4 className={styles.chartTitle}>Top Sellers</h4></div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={TOP_SELLERS} layout="vertical" margin={{ top:0, right:30, left:0, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize:10, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize:10, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="pct" name="Share" radius={[0,4,4,0]}>
                      {TOP_SELLERS.map((_, i) => (
                        <Cell key={i} fill={`hsl(${36 + i * 8}, ${70 - i * 5}%, ${55 - i * 3}%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className={styles.chartsRow}>
              {/* Distribution */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}><h4 className={styles.chartTitle}>Order Distribution</h4></div>
                <div className={styles.donutWrap}>
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={DONUT_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                        {DONUT_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip formatter={v => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.donutLegend}>
                    {DONUT_DATA.map(d => (
                      <div key={d.name} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: d.color }} />
                        <span>{d.name}</span>
                        <strong>{d.value}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Festival Forecast */}
              <div className={`${styles.chartCard} ${styles.chartLarge}`}>
                <div className={styles.chartHeader}><h4 className={styles.chartTitle}>Festival Demand Forecast</h4></div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={FORECAST_DATA} margin={{ top:10, right:10, left:0, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize:11, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize:10, fill:'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="orders" name="Predicted Orders" radius={[6,6,0,0]}>
                      {FORECAST_DATA.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className={styles.ordersPanel}>
            <div className={styles.tableControls}>
              <input
                className={styles.tableSearch}
                type="text"
                placeholder="Search orders, customers, cakes..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
              />
              <select className={styles.tableFilter} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="baking">Baking</option>
                <option value="pending">Pending</option>
              </select>
              <div className={styles.tableCount}>{filteredOrders.length} orders</div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Order ID','Customer','Cake','Amount','Date','Status','Action'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(o => {
                    const sc = getStatusColor(o.status);
                    return (
                      <tr key={o.id}>
                        <td><code className={styles.orderId}>{o.id}</code></td>
                        <td className={styles.customerName}>{o.customer}</td>
                        <td>{o.cake}</td>
                        <td><strong>{formatCurrency(o.amount)}</strong></td>
                        <td className={styles.date}>{o.date}</td>
                        <td>
                          <span className={styles.statusBadge} style={{ background:sc.bg, color:sc.color }}>
                            {o.status.charAt(0).toUpperCase()+o.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <button className={styles.viewBtn} onClick={() => {
                            document.getElementById('trackingInput')?.focus?.();
                            document.getElementById('tracking')?.scrollIntoView({ behavior:'smooth' });
                          }}>View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className={styles.inventoryPanel}>
            <div className={styles.inventoryGrid}>
              {INVENTORY_ITEMS.map(item => (
                <div key={item.id} className={styles.invItem}>
                  <div className={styles.invIcon}>{item.icon}</div>
                  <div className={styles.invName}>{item.name}</div>
                  <div className={styles.invQty}>{item.qty} {item.unit}</div>
                  <div className={styles.invBar}>
                    <div
                      className={`${styles.invFill} ${styles[`level_${item.level}`]}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <div className={`${styles.invStatus} ${styles[`status_${item.level}`]}`}>
                    { {good:'✅ Adequate', medium:'⚡ Reorder Soon', low:'🚨 Critical'}[item.level] }
                  </div>
                  {item.level === 'low' && (
                    <button className={styles.restockBtn}>Restock</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
