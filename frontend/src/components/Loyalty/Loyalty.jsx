import React, { useState, useEffect } from 'react';
import { REWARDS_LIST, POINTS_HISTORY, TIER_CONFIG, formatCurrency } from '../../data/constants';
import styles from './Loyalty.module.css';

const CUSTOMER = { name:'Sarah Johnson', id:'SL-GOLD-00472', points:2450, tier:'gold' };

function QRGrid({ size = 10 }) {
  const cells = React.useMemo(() => {
    const arr = [];
    let seed = 7654321;
    const rand = () => { seed=(seed*1664525+1013904223)&0xffffffff; return (seed>>>0)/0xffffffff; };
    for (let r=0; r<size; r++) {
      for (let c=0; c<size; c++) {
        const corner=(r<3&&c<3)||(r<3&&c>=size-3)||(r>=size-3&&c<3);
        arr.push(corner||rand()>0.55);
      }
    }
    return arr;
  }, [size]);
  return (
    <div className={styles.qrGrid} style={{ gridTemplateColumns:`repeat(${size},1fr)` }}>
      {cells.map((filled,i)=>(
        <div key={i} className={styles.qrCell} style={{ background: filled?'#1a1005':'transparent' }} />
      ))}
    </div>
  );
}

export default function Loyalty() {
  const [points, setPoints] = useState(CUSTOMER.points);
  const [history, setHistory] = useState(POINTS_HISTORY);
  const [notification, setNotification] = useState(null);

  const tierKey = points >= 3000 ? 'platinum' : points >= 2000 ? 'gold' : points >= 1000 ? 'silver' : 'bronze';
  const tier = TIER_CONFIG[tierKey];
  const nextTierKey = { bronze:'silver', silver:'gold', gold:'platinum', platinum:null }[tierKey];
  const nextTier = nextTierKey ? TIER_CONFIG[nextTierKey] : null;
  const progress = nextTier
    ? Math.round(((points - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;

  const redeem = (reward) => {
    if (points < reward.pts) { setNotification({ msg:`Need ${reward.pts - points} more points`, type:'error' }); return; }
    setPoints(p => p - reward.pts);
    setHistory(h => [{ icon:'🎁', action:`Redeemed: ${reward.title}`, date:'Just now', pts:`-${reward.pts}`, earn:false }, ...h]);
    setNotification({ msg:`"${reward.title}" redeemed! 🎉`, type:'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const TIERS = Object.entries(TIER_CONFIG);

  return (
    <section className={styles.loyalty} id="loyalty">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>⭐ VIP Club</div>
          <h2 className={styles.sectionTitle}>Loyalty <em>Rewards</em></h2>
          <p className={styles.sectionSub}>Every sweet moment earns you points. Redeem for exclusive treats and experiences.</p>
        </div>

        {notification && (
          <div className={`${styles.notification} ${styles[`notif_${notification.type}`]}`}>
            {notification.msg}
          </div>
        )}

        <div className={styles.layout}>
          {/* Loyalty Card */}
          <div className={styles.cardWrap}>
            <div className={styles.loyaltyCard}>
              <div className={styles.cardBg} />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.tierBadge} style={{ color: tier.color }}>
                    {tier.icon} {tier.label} Member
                  </span>
                  <div className={styles.sweetlabLogo}>🍰 SweetLab</div>
                </div>
                <div className={styles.customerName}>{CUSTOMER.name}</div>
                <div className={styles.cardId}>{CUSTOMER.id}</div>
                <div className={styles.pointsDisplay}>
                  <span className={styles.pointsBig}>{points.toLocaleString()}</span>
                  <span className={styles.pointsLabel}>Sweet Points</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                {nextTier && (
                  <div className={styles.progressText}>
                    {(nextTier.min - points).toLocaleString()} pts to {nextTier.label} {nextTier.icon}
                  </div>
                )}
                <div className={styles.qrSection}>
                  <div className={styles.qrBox}><QRGrid /></div>
                  <div className={styles.qrInfo}>
                    <strong>QR Billing</strong>
                    <p>Scan at checkout for instant points & payments</p>
                    <button className={styles.qrBtn}>⬇️ Save QR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards + History */}
          <div className={styles.rightPanel}>
            <div className={styles.rewardsSection}>
              <h4 className={styles.subTitle}>Redeem Rewards</h4>
              <div className={styles.rewardsGrid}>
                {REWARDS_LIST.map(r => (
                  <div key={r.id} className={styles.rewardCard}>
                    <div className={styles.rewardIcon}>{r.icon}</div>
                    <div className={styles.rewardTitle}>{r.title}</div>
                    <div className={styles.rewardDesc}>{r.desc}</div>
                    <div className={styles.rewardPts}>{r.pts} pts</div>
                    <button
                      className={`${styles.redeemBtn} ${points < r.pts ? styles.disabled : ''}`}
                      onClick={() => redeem(r)}
                    >
                      {points >= r.pts ? 'Redeem' : `Need ${r.pts - points} more`}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.historySection}>
              <h4 className={styles.subTitle}>Points History</h4>
              <div className={styles.historyList}>
                {history.map((h, i) => (
                  <div key={i} className={styles.historyItem}>
                    <div className={styles.historyLeft}>
                      <span className={styles.histIcon}>{h.icon}</span>
                      <div>
                        <div className={styles.histAction}>{h.action}</div>
                        <div className={styles.histDate}>{h.date}</div>
                      </div>
                    </div>
                    <span className={`${styles.histPts} ${h.earn ? styles.earn : styles.spend}`}>{h.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tier Benefits */}
        <div className={styles.tiersGrid}>
          {TIERS.map(([key, t]) => (
            <div key={key} className={`${styles.tierCard} ${tierKey === key ? styles.tierActive : ''}`}>
              <div className={styles.tierIcon}>{t.icon}</div>
              <h4 className={styles.tierName}>{t.label}</h4>
              <p className={styles.tierRange}>{t.min.toLocaleString()} – {t.max === Infinity ? '∞' : t.max.toLocaleString()} pts</p>
              <ul className={styles.tierPerks}>
                <li>{t.discount}% discount on all orders</li>
                {key === 'silver'   && <li>Free delivery on every order</li>}
                {key === 'gold'     && <><li>Free delivery on every order</li><li>Priority baking queue</li><li>Dedicated cake consultant</li></>}
                {key === 'platinum' && <><li>Free delivery on every order</li><li>Priority baking queue</li><li>VIP tasting events</li><li>Annual anniversary cake</li></>}
              </ul>
              {tierKey === key && <div className={styles.currentTierBadge}>Your Current Tier</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
