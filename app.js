/* ═══════════════════════════════════════════════════════════════════════
   SweetLab — Premium Bakery & Dessert Platform  |  app.js
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── DATA ──────────────────────────────────────────────────────────────── */

const PRODUCTS = [
  { id:1, name:'Velvet Dream', desc:'Red Velvet · Cream Cheese · Gold Leaf Finish', price:3499, emoji:'🎂', cat:'cakes',    rating:'4.9 ⭐ (312)', badge:'bestseller', bg:'linear-gradient(145deg,#fce4ec,#fff9f9)' },
  { id:2, name:'Chocolate Royale', desc:'Dark Truffle · Hazelnut · Belgian Couverture', price:2999, emoji:'🍫', cat:'cakes',    rating:'4.8 ⭐ (289)', badge:'bestseller', bg:'linear-gradient(145deg,#efebe9,#fff)' },
  { id:3, name:'Mango Fiesta',    desc:'Alphonso Mango · Mascarpone · Saffron Cream', price:2799, emoji:'🥭', cat:'cakes',    rating:'4.7 ⭐ (198)', badge:'seasonal',   bg:'linear-gradient(145deg,#fff8e1,#fff)' },
  { id:4, name:'Sakura Bloom',   desc:'Matcha Sponge · White Chocolate · Cherry',    price:3199, emoji:'🌸', cat:'cakes',    rating:'4.9 ⭐ (145)', badge:'new',        bg:'linear-gradient(145deg,#fce4ec,#f3e5f5)' },
  { id:5, name:'Salted Caramel', desc:'Caramel Swirl · Sea Salt · Pecan Crunch',     price:1499, emoji:'🧁', cat:'cupcakes', rating:'4.8 ⭐ (421)', badge:'bestseller', bg:'linear-gradient(145deg,#fff3e0,#fff)' },
  { id:6, name:'Blueberry Bliss',desc:'Wild Blueberry · Lemon Zest · Vanilla Cloud', price:1199, emoji:'🫐', cat:'cupcakes', rating:'4.7 ⭐ (231)', badge:'vegan',      bg:'linear-gradient(145deg,#ede7f6,#fff)' },
  { id:7, name:'Butter Croissant',desc:'French Butter · Flaky Layers · Almond Fill', price:299,  emoji:'🥐', cat:'pastries', rating:'4.9 ⭐ (512)', badge:'bestseller', bg:'linear-gradient(145deg,#fff8e1,#fff)' },
  { id:8, name:'Tiramisu Jar',   desc:'Espresso Sponge · Mascarpone · Cocoa Dust',   price:549,  emoji:'☕', cat:'pastries', rating:'4.8 ⭐ (187)', badge:'new',        bg:'linear-gradient(145deg,#efebe9,#fff)' },
  { id:9, name:'Diwali Special', desc:'Kesar Pista · Rose Water · Gold Varq',        price:4499, emoji:'🪔', cat:'seasonal', rating:'5.0 ⭐ (99)',  badge:'seasonal',   bg:'linear-gradient(145deg,#fff8e1,#fff3e0)' },
  { id:10,name:'Christmas Log',  desc:'Yule Log · Forest Berry · Snow Glaze',        price:3799, emoji:'🎄', cat:'seasonal', rating:'4.9 ⭐ (76)',  badge:'seasonal',   bg:'linear-gradient(145deg,#e8f5e9,#fff)' },
  { id:11,name:'Strawberry Dream',desc:'Fresh Strawberry · Chantilly · Basil Oil',   price:2199, emoji:'🍓', cat:'cakes',    rating:'4.6 ⭐ (164)', badge:'new',        bg:'linear-gradient(145deg,#fce4ec,#fff)' },
  { id:12,name:'Éclair Box',     desc:'Vanilla Custard · Dark Ganache · Praline',    price:899,  emoji:'🍮', cat:'pastries', rating:'4.7 ⭐ (203)', badge:'bestseller', bg:'linear-gradient(145deg,#fff9c4,#fff)' },
];

const FESTIVALS = [
  { name:'Diwali',      date:'Oct 20, 2025', demand:'high'   },
  { name:'Christmas',   date:'Dec 25, 2025', demand:'high'   },
  { name:'New Year',    date:'Jan 1, 2026',  demand:'high'   },
  { name:'Valentine\'s',date:'Feb 14, 2026', demand:'medium' },
  { name:'Holi',        date:'Mar 14, 2026', demand:'medium' },
  { name:'Eid',         date:'Apr 2, 2026',  demand:'high'   },
];

const AI_RECOMMENDATIONS = {
  romantic:    { emoji:'🍓', name:'Strawberry Love Cake',  desc:'Rose petal cream, strawberry compote, vanilla sponge — pure romance.' },
  celebratory: { emoji:'🎂', name:'Confetti Party Cake',   desc:'Rainbow sponge, buttercream swirls, edible glitter — let\'s celebrate!' },
  cozy:        { emoji:'☕', name:'Tiramisu Comfort Cake', desc:'Espresso soaked layers, mascarpone cream — like a warm hug.' },
  adventurous: { emoji:'🌶️', name:'Chilli Chocolate Bomb', desc:'Dark chocolate ganache with a surprising chilli kick — bold and exciting.' },
  refreshing:  { emoji:'🍃', name:'Matcha Yuzu Dream',     desc:'Japanese matcha, yuzu curd, airy sponge — crisp and revitalising.' },
};

const ORDERS_DATA = [
  { id:'SL-2024-001', customer:'Sarah Johnson',  cake:'Chocolate Truffle',  amount:'₹2,999', date:'May 26, 2024', status:'baking'    },
  { id:'SL-2024-002', customer:'Rahul Mehta',    cake:'Red Velvet 2kg',     amount:'₹5,498', date:'May 26, 2024', status:'delivered' },
  { id:'SL-2024-003', customer:'Priya Sharma',   cake:'Mango Fiesta',       amount:'₹2,799', date:'May 25, 2024', status:'delivered' },
  { id:'SL-2024-004', customer:'Aditya Kumar',   cake:'Matcha Sakura',      amount:'₹3,199', date:'May 25, 2024', status:'pending'   },
  { id:'SL-2024-005', customer:'Neha Patel',     cake:'Custom Wedding Cake',amount:'₹12,500',date:'May 24, 2024', status:'delivered' },
  { id:'SL-2024-006', customer:'Vikram Singh',   cake:'Butter Croissant x6',amount:'₹1,794', date:'May 24, 2024', status:'delivered' },
  { id:'SL-2024-007', customer:'Ananya Das',     cake:'Tiramisu Jar x3',    amount:'₹1,647', date:'May 23, 2024', status:'delivered' },
  { id:'SL-2024-008', customer:'Suresh Nair',    cake:'Diwali Special',     amount:'₹4,499', date:'May 23, 2024', status:'pending'   },
];

const INVENTORY_ITEMS = [
  { icon:'🌾', name:'Refined Flour',    qty:'48 kg',  pct:80, level:'good'   },
  { icon:'🧈', name:'Unsalted Butter',  qty:'22 kg',  pct:73, level:'good'   },
  { icon:'🍫', name:'Dark Chocolate',   qty:'8 kg',   pct:27, level:'medium' },
  { icon:'🍓', name:'Fresh Strawberry', qty:'4 kg',   pct:13, level:'low'    },
  { icon:'🥚', name:'Free Range Eggs',  qty:'180 pcs',pct:60, level:'good'   },
  { icon:'🍦', name:'Vanilla Beans',    qty:'2 pods', pct:8,  level:'low'    },
  { icon:'🫐', name:'Wild Blueberries', qty:'6 kg',   pct:20, level:'medium' },
  { icon:'🧁', name:'Cream Cheese',     qty:'14 kg',  pct:47, level:'medium' },
  { icon:'🍯', name:'Raw Honey',        qty:'30 kg',  pct:75, level:'good'   },
  { icon:'🥛', name:'Whole Milk',       qty:'60 L',   pct:60, level:'good'   },
  { icon:'🌸', name:'Rose Water',       qty:'1 L',    pct:15, level:'low'    },
  { icon:'✨', name:'Edible Gold Leaf', qty:'5 sheets',pct:10, level:'low'   },
];

const REWARDS_LIST = [
  { icon:'🎂', title:'Free Cupcake Dozen', pts:500  },
  { icon:'🚚', title:'Free Delivery x5',   pts:300  },
  { icon:'💰', title:'₹200 Discount',      pts:400  },
  { icon:'🎁', title:'Mystery Cake Box',   pts:800  },
  { icon:'🌟', title:'Gold Tier Upgrade',  pts:1000 },
  { icon:'👨‍🍳', title:'Chef\'s Table Experience',pts:1500},
];

const POINTS_HISTORY = [
  { icon:'🎂', action:'Chocolate Truffle order',   date:'May 26',  pts:'+150', earn:true  },
  { icon:'⭐', action:'5-star review bonus',        date:'May 24',  pts:'+50',  earn:true  },
  { icon:'🎁', action:'Redeemed Free Delivery',     date:'May 20',  pts:'-300', earn:false },
  { icon:'🎂', action:'Birthday Cake order',        date:'May 15',  pts:'+400', earn:true  },
  { icon:'🔗', action:'Referral bonus - Rahul',     date:'May 10',  pts:'+200', earn:true  },
  { icon:'💰', action:'Redeemed ₹200 Discount',     date:'Apr 30',  pts:'-400', earn:false },
];

const REVENUE_DATA = {
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  thisYear: [185000,198000,220000,245000,284500,0,0,0,0,0,0,0],
  lastYear: [140000,155000,170000,190000,210000,225000,240000,260000,280000,320000,340000,410000],
};

const TOP_SELLERS = [
  { name:'Chocolate Truffle',  pct:88, val:'₹68,400', color:'#c9933a' },
  { name:'Red Velvet Cake',    pct:76, val:'₹58,200', color:'#d4843a' },
  { name:'Custom Cakes',       pct:65, val:'₹52,800', color:'#e8b96a' },
  { name:'Cupcake Boxes',      pct:54, val:'₹41,300', color:'#f7e8c8' },
  { name:'Seasonal Specials',  pct:42, val:'₹34,800', color:'#9ab89a' },
];

const DONUT_DATA = [
  { label:'Cakes',    pct:45, color:'#c9933a' },
  { label:'Cupcakes', pct:25, color:'#d4843a' },
  { label:'Pastries', pct:18, color:'#e8b96a' },
  { label:'Seasonal', pct:12, color:'#9ab89a' },
];

const FORECAST_DATA = [
  { name:'Diwali',   val:320, height:90 },
  { name:'Xmas',     val:280, height:79 },
  { name:'New Year', val:260, height:73 },
  { name:'Valentine',val:180, height:51 },
  { name:'Holi',     val:150, height:42 },
  { name:'Eid',      val:200, height:56 },
  { name:'Mother\'s',val:170, height:48 },
  { name:'Easter',   val:130, height:37 },
];

const ORDER_PRICES = {
  'Red Velvet':     { base:2499, custom:500  },
  'Chocolate Truffle':{ base:2999, custom:300 },
  'Black Forest':   { base:2199, custom:300  },
  'Vanilla Bean':   { base:1799, custom:200  },
  'Mango Delight':  { base:2499, custom:400  },
  'Custom Design':  { base:3499, custom:1000 },
};

const SIZE_MULT = {
  '0.5 kg (Serves 4)':1, '1 kg (Serves 8)':1.6,
  '1.5 kg (Serves 12)':2.1, '2 kg (Serves 16)':2.6, '3 kg (Serves 24)':3.5
};

/* ── STATE ─────────────────────────────────────────────────────────────── */
let cart = [];
let orderCounter = 5;
let activeFilter = 'all';
let designState = { shape:'round', flavor:'red-velvet', frosting:'buttercream', deco:'flowers', tiers:1, color:'#f4c2c2' };
let designerPrice = 2499;

/* ═══════════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroStats();
  initShowcase();
  initPreorder();
  initAiRecommender();
  initDesigner();
  initTracking();
  initLoyalty();
  initInventory();
  initDashboard();
  initCart();
  initModal();
  initScrollReveal();
  setMinDate();
  generateQR('qrGrid', 10);
  generateQR('miniQR', 8);
});

/* ── NAVBAR ────────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.getElementById('navOrderBtn').addEventListener('click', () => scrollTo('#preorder'));
  document.getElementById('heroOrderBtn').addEventListener('click', () => scrollTo('#designer'));
  document.getElementById('heroExploreBtn').addEventListener('click', () => scrollTo('#showcase'));
}

function updateActiveNav() {
  const sections = ['home','showcase','preorder','designer','tracking','loyalty','dashboard'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id) || document.querySelector(`[id="${id}"]`);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── HERO STATS COUNTER ────────────────────────────────────────────────── */
function initHeroStats() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal;
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ── SHOWCASE / GALLERY ────────────────────────────────────────────────── */
function initShowcase() {
  renderProducts(PRODUCTS);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
      renderProducts(filtered);
    });
  });
}

function renderProducts(list) {
  const grid = document.getElementById('showcaseGrid');
  grid.innerHTML = '';
  list.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="product-card-img" style="background:${p.bg}">
        <span>${p.emoji}</span>
        <div class="product-badge badge-${p.badge}">${badgeLabel(p.badge)}</div>
      </div>
      <div class="product-card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-card-footer">
          <div>
            <div class="product-price">₹${p.price.toLocaleString()}</div>
            <div class="product-rating">${p.rating}</div>
          </div>
          <button class="btn-add-cart" data-id="${p.id}">Add 🛒</button>
        </div>
      </div>`;
    card.querySelector('.btn-add-cart').addEventListener('click', e => {
      e.stopPropagation();
      addToCart({ id:p.id, name:p.name, price:p.price, emoji:p.emoji, sub:p.desc });
    });
    grid.appendChild(card);
  });
  setTimeout(initScrollReveal, 50);
}

function badgeLabel(b) {
  return { bestseller:'🔥 Best Seller', new:'✨ New', seasonal:'🍂 Seasonal', vegan:'🌿 Vegan' }[b] || b;
}

/* ── PRE-ORDER SYSTEM ──────────────────────────────────────────────────── */
function initPreorder() {
  // Festival predictions
  const fl = document.getElementById('festivalList');
  FESTIVALS.forEach(f => {
    fl.innerHTML += `
      <div class="festival-item">
        <div><div class="festival-name">${f.name}</div><div class="festival-date">${f.date}</div></div>
        <span class="festival-demand demand-${f.demand}">${f.demand.toUpperCase()}</span>
      </div>`;
  });

  // Live price preview
  ['po-type','po-size'].forEach(id => {
    document.getElementById(id).addEventListener('change', updatePreorderPrice);
  });

  document.getElementById('placeOrderBtn').addEventListener('click', placePreorder);
}

function updatePreorderPrice() {
  const type = document.getElementById('po-type').value;
  const size = document.getElementById('po-size').value;
  if (!type || !size) return;
  const info = ORDER_PRICES[type] || { base:2000, custom:300 };
  const mult = SIZE_MULT[size] || 1;
  const base = Math.round(info.base * mult);
  const custom = info.custom;
  const total = base + custom;
  document.getElementById('basePrice').textContent = `₹${base.toLocaleString()}`;
  document.getElementById('customPrice').textContent = `₹${custom.toLocaleString()}`;
  document.getElementById('totalPrice').textContent = `₹${total.toLocaleString()}`;
}

function placePreorder() {
  const name = document.getElementById('po-name').value.trim();
  const type = document.getElementById('po-type').value;
  if (!name) { shakeInput('po-name'); return; }
  if (!type) { shakeInput('po-type'); return; }

  orderCounter++;
  const orderId = `SL-2024-00${orderCounter}`;
  const totalEl = document.getElementById('totalPrice').textContent;
  const pts = Math.floor((parseInt(totalEl.replace(/[₹,]/g,'')) || 2000) / 10);

  document.getElementById('modalOrderId').textContent = `Order #${orderId}`;
  document.getElementById('modalMsg').textContent = `${name}'s ${type} cake is now in the queue!`;
  document.getElementById('modalPoints').textContent = `+${pts} pts`;
  showModal();
}

function shakeInput(id) {
  const el = document.getElementById(id);
  el.style.animation = 'shake 0.4s ease';
  el.style.borderColor = '#c62828';
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

/* ── AI FLAVOR RECOMMENDER ─────────────────────────────────────────────── */
function initAiRecommender() {
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mood = btn.dataset.mood;
      const rec = AI_RECOMMENDATIONS[mood];
      const result = document.getElementById('aiResult');
      result.style.display = 'block';
      document.getElementById('aiEmoji').textContent = rec.emoji;
      document.getElementById('aiCakeName').textContent = rec.name;
      document.getElementById('aiCakeDesc').textContent = rec.desc;
    });
  });
}

/* ── CAKE DESIGNER ─────────────────────────────────────────────────────── */
function initDesigner() {
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;
      document.querySelectorAll(`.option-card[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      designState[group] = card.dataset.val;
      updateDesignerPreview();
    });
  });

  const tierSlider = document.getElementById('tierSlider');
  tierSlider.addEventListener('input', () => {
    designState.tiers = parseInt(tierSlider.value);
    document.getElementById('tierCount').textContent = `${designState.tiers} Tier${designState.tiers > 1 ? 's' : ''}`;
    updateDesignerPreview();
  });

  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      designState.color = swatch.dataset.color;
      updateDesignerPreview();
    });
  });

  document.getElementById('addDesignToCart').addEventListener('click', () => {
    const tags = getDesignTags();
    addToCart({
      id: 'custom-' + Date.now(),
      name: 'Custom ' + capitalize(designState.flavor) + ' Cake',
      price: designerPrice,
      emoji: '🎂',
      sub: tags.join(' · ')
    });
  });

  updateDesignerPreview();
}

function updateDesignerPreview() {
  const color = designState.color;
  const lighter = adjustColor(color, 30);

  // Apply color to layers
  document.getElementById('cakeTop').style.background = lighter;
  document.getElementById('cakeTop').style.borderColor = color;
  document.getElementById('cakeMid').style.background = color;
  document.getElementById('cakeMid').style.borderColor = adjustColor(color, -20);
  document.getElementById('cakeBot').style.background = adjustColor(color, -10);
  document.getElementById('cakeBot').style.borderColor = adjustColor(color, -30);

  // Tiers
  document.getElementById('cakeMid').style.display = designState.tiers >= 2 ? 'flex' : 'none';

  // Decoration emoji
  const decoMap = { flowers:'🌸', 'gold-leaf':'✨', sprinkles:'🎉', berries:'🫐', macarons:'🍬', candles:'🕯️' };
  document.getElementById('cakeDecoration').textContent = decoMap[designState.deco] || '🌸';

  // Price calculation
  const baseMap = { round:1800, square:2100, heart:2400, tiered:3200 };
  const flavorExtra = { 'red-velvet':500, chocolate:300, vanilla:200, mango:400, strawberry:350, matcha:600 };
  const frostExtra = { buttercream:0, fondant:400, ganache:350, whipped:150 };
  const decoExtra = { flowers:300, 'gold-leaf':700, sprinkles:100, berries:400, macarons:500, candles:100 };
  designerPrice = (baseMap[designState.shape] || 1800) +
    (flavorExtra[designState.flavor] || 0) +
    (frostExtra[designState.frosting] || 0) +
    (decoExtra[designState.deco] || 0) +
    (designState.tiers - 1) * 800;

  document.getElementById('designerPrice').textContent = `₹${designerPrice.toLocaleString()}`;
  renderSummaryTags();
}

function renderSummaryTags() {
  const tags = getDesignTags();
  document.getElementById('summaryTags').innerHTML = tags.map(t => `<span class="summary-tag">${t}</span>`).join('');
}

function getDesignTags() {
  return [
    capitalize(designState.shape) + ' Shape',
    capitalize(designState.flavor.replace('-',' ')),
    capitalize(designState.frosting) + ' Frosting',
    capitalize(designState.deco.replace('-',' ')),
    `${designState.tiers} Tier${designState.tiers > 1 ? 's' : ''}`,
  ];
}

function adjustColor(hex, amount) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  let r = parseInt(hex.substring(0,2),16);
  let g = parseInt(hex.substring(2,4),16);
  let b = parseInt(hex.substring(4,6),16);
  r = Math.min(255, Math.max(0, r + amount));
  g = Math.min(255, Math.max(0, g + amount));
  b = Math.min(255, Math.max(0, b + amount));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ── DELIVERY TRACKING ─────────────────────────────────────────────────── */
function initTracking() {
  document.getElementById('trackBtn').addEventListener('click', doTrack);
  document.getElementById('trackingInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') doTrack();
  });
}

function doTrack() {
  const val = document.getElementById('trackingInput').value.trim().toUpperCase();
  if (!val) return;

  const orderMap = {
    'SL-2024-001': { name:'Chocolate Truffle Cake', customer:'Sarah Johnson',  eta:'14 min', step:3 },
    'SL-2024-002': { name:'Red Velvet 2kg',          customer:'Rahul Mehta',    eta:'Delivered', step:5 },
  };

  const order = orderMap[val] || { name:'Custom Cake Order', customer:'Valued Customer', eta:'35 min', step:2 };

  document.getElementById('trackOrderId').textContent = val;
  document.getElementById('trackCakeName').textContent = order.name;
  document.getElementById('trackCustomer').textContent = `For: ${order.customer}`;
  document.getElementById('trackETA').textContent = order.eta;

  // Timeline steps
  [1,2,3,4,5].forEach(i => {
    const el = document.getElementById(`ts${i}`);
    el.classList.remove('done','active');
    if (i < order.step) el.classList.add('done');
    else if (i === order.step) el.classList.add('active');
  });

  document.getElementById('trackingResult').style.display = 'block';
  document.getElementById('trackingResult').scrollIntoView({ behavior:'smooth', block:'nearest' });
}

/* ── LOYALTY & QR ──────────────────────────────────────────────────────── */
function initLoyalty() {
  // Rewards grid
  const rg = document.getElementById('rewardsGrid');
  REWARDS_LIST.forEach(r => {
    rg.innerHTML += `
      <div class="reward-card">
        <div class="reward-icon">${r.icon}</div>
        <div class="reward-title">${r.title}</div>
        <div class="reward-pts">${r.pts} pts</div>
        <button class="btn-redeem" onclick="redeemReward(${r.pts}, '${r.title}')">Redeem</button>
      </div>`;
  });

  // Points history
  const hl = document.getElementById('historyList');
  POINTS_HISTORY.forEach(h => {
    hl.innerHTML += `
      <div class="history-item">
        <div class="history-item-left">
          <span class="history-icon">${h.icon}</span>
          <div><div class="history-action">${h.action}</div><div class="history-date">${h.date}</div></div>
        </div>
        <span class="history-pts ${h.earn ? 'pts-earn' : 'pts-spend'}">${h.pts}</span>
      </div>`;
  });

  // Animate progress bar on scroll
  const loyaltySection = document.getElementById('loyalty');
  const progressObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => { document.getElementById('loyaltyFill').style.width = '72%'; }, 300);
    }
  }, { threshold: 0.3 });
  progressObserver.observe(loyaltySection);

  document.getElementById('downloadQR').addEventListener('click', () => {
    alert('QR Code saved! 📱\nPresent at checkout for instant rewards & payment.');
  });
}

window.redeemReward = function(pts, title) {
  const current = parseInt(document.getElementById('loyaltyPoints').textContent.replace(/,/g,''));
  if (current < pts) {
    showToast(`Not enough points! You need ${pts} pts.`, '⚠️');
    return;
  }
  const newPts = current - pts;
  document.getElementById('loyaltyPoints').textContent = newPts.toLocaleString();
  showToast(`"${title}" redeemed successfully! 🎉`, '✅');

  // Add to history
  const hl = document.getElementById('historyList');
  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = `
    <div class="history-item-left">
      <span class="history-icon">🎁</span>
      <div><div class="history-action">Redeemed: ${title}</div><div class="history-date">Just now</div></div>
    </div>
    <span class="history-pts pts-spend">-${pts}</span>`;
  hl.prepend(item);
};

/* ── INVENTORY ─────────────────────────────────────────────────────────── */
function initInventory() {
  const grid = document.getElementById('inventoryGrid');
  INVENTORY_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'inventory-item reveal';
    card.innerHTML = `
      <div class="inv-icon">${item.icon}</div>
      <div class="inv-name">${item.name}</div>
      <div class="inv-qty">${item.qty} in stock</div>
      <div class="inv-bar"><div class="inv-fill fill-${item.level}" style="width:0%" data-pct="${item.pct}"></div></div>
      <div class="inv-status status-${item.level}">${statusLabel(item.level)}</div>`;
    grid.appendChild(card);
  });

  // Inventory alerts
  const alerts = document.getElementById('inventoryAlerts');
  const lowItems = INVENTORY_ITEMS.filter(i => i.level === 'low');
  alerts.innerHTML = `<h4>⚠️ Low Stock Alerts (${lowItems.length})</h4>`;
  lowItems.forEach(item => {
    alerts.innerHTML += `
      <div class="alert-row">
        <span class="alert-icon">${item.icon}</span>
        <span class="alert-text"><strong>${item.name}</strong> — only ${item.qty} remaining (${item.pct}% stock level)</span>
        <span class="alert-action" onclick="showToast('Restock order placed for ${item.name}! 📦', '✅')">Restock</span>
      </div>`;
  });

  // Animate inventory bars on scroll
  const invObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.inv-fill').forEach(el => {
        setTimeout(() => { el.style.width = el.dataset.pct + '%'; }, 100);
      });
    }
  }, { threshold: 0.2 });
  const invSection = document.getElementById('inventory');
  if (invSection) invObserver.observe(invSection);
}

function statusLabel(l) {
  return { good:'✅ Adequate Stock', medium:'⚡ Moderate — Reorder Soon', low:'🚨 Critical — Restock Now' }[l];
}

/* ── DASHBOARD ─────────────────────────────────────────────────────────── */
function initDashboard() {
  initKPICounters();
  initRevenueChart();
  initTopSellers();
  initDonutChart();
  initForecastChart();
  initOrdersTable();
  initOrderSearch();
}

function initKPICounters() {
  const kpiEls = document.querySelectorAll('.kpi-value');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateKPI(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  kpiEls.forEach(el => observer.observe(el));
}

function animateKPI(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal;
  const isCurrency = target > 1000;
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    if (isDecimal) el.textContent = val.toFixed(1);
    else if (isCurrency) el.textContent = '₹' + Math.floor(val).toLocaleString();
    else el.textContent = Math.floor(val);
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initRevenueChart() {
  const svg = document.getElementById('revenueSVG');
  if (!svg) return;
  const W = 600, H = 200, PAD = 30;
  const months = REVENUE_DATA.months;
  const thisY = REVENUE_DATA.thisYear.filter(v => v > 0);
  const lastY = REVENUE_DATA.lastYear;
  const maxVal = Math.max(...lastY, ...thisY);

  function toX(i, len) { return PAD + (i / (len - 1)) * (W - PAD * 2); }
  function toY(v) { return H - PAD - (v / maxVal) * (H - PAD * 2); }

  // Grid lines
  [0,1,2,3,4].forEach(i => {
    const y = PAD + (i / 4) * (H - PAD * 2);
    svg.innerHTML += `<line x1="${PAD}" y1="${y}" x2="${W - PAD}" y2="${y}" stroke="#f0e8d8" stroke-width="1"/>`;
  });

  // Last year path (dashed)
  const lyPts = lastY.map((v,i) => `${toX(i,12)},${toY(v)}`).join(' ');
  svg.innerHTML += `<polyline points="${lyPts}" fill="none" stroke="#e8c9a0" stroke-width="2" stroke-dasharray="4,3"/>`;

  // This year path
  const tyPts = thisY.map((v,i) => `${toX(i,thisY.length)},${toY(v)}`).join(' ');
  const areaClose = `${toX(thisY.length-1,thisY.length)},${H-PAD} ${toX(0,thisY.length)},${H-PAD}`;
  svg.innerHTML += `<defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c9933a" stop-opacity="0.3"/><stop offset="100%" stop-color="#c9933a" stop-opacity="0.02"/></linearGradient></defs>`;
  svg.innerHTML += `<polygon points="${tyPts} ${areaClose}" fill="url(#revGrad)"/>`;
  svg.innerHTML += `<polyline points="${tyPts}" fill="none" stroke="#c9933a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Dots
  thisY.forEach((v,i) => {
    svg.innerHTML += `<circle cx="${toX(i,thisY.length)}" cy="${toY(v)}" r="4" fill="#c9933a" stroke="#fff" stroke-width="2"/>`;
  });

  // Month labels
  ['Jan','Feb','Mar','Apr','May'].forEach((m,i) => {
    svg.innerHTML += `<text x="${toX(i,thisY.length)}" y="${H-5}" text-anchor="middle" font-size="10" fill="#9a7a5a">${m}</text>`;
  });
}

function initTopSellers() {
  const chart = document.getElementById('topSellersChart');
  TOP_SELLERS.forEach(item => {
    chart.innerHTML += `
      <div class="bar-item">
        <span class="bar-item-label">${item.name}</span>
        <div class="bar-track"><div class="bar-fill" style="width:0%;background:${item.color}" data-pct="${item.pct}"></div></div>
        <span class="bar-item-value">${item.val}</span>
      </div>`;
  });

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.bar-fill').forEach(el => {
        setTimeout(() => { el.style.width = el.dataset.pct + '%'; }, 200);
      });
    }
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('dashboard'));
}

function initDonutChart() {
  const svg = document.getElementById('donutSVG');
  const legend = document.getElementById('donutLegend');
  if (!svg) return;
  const cx = 100, cy = 100, r = 70, strokeW = 28;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  DONUT_DATA.forEach(d => {
    const dash = (d.pct / 100) * circumference;
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', d.color);
    circle.setAttribute('stroke-width', strokeW);
    circle.setAttribute('stroke-dasharray', `${dash} ${circumference - dash}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    circle.style.transition = 'stroke-dasharray 1.2s ease';
    svg.appendChild(circle);

    legend.innerHTML += `
      <div class="donut-legend-item">
        <span class="donut-dot" style="background:${d.color}"></span>
        ${d.label} — ${d.pct}%
      </div>`;
    offset += dash;
  });

  // Center text
  svg.innerHTML += `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="16" font-weight="700" fill="#2a1a0a">100%</text>`;
}

function initForecastChart() {
  const container = document.getElementById('forecastBars');
  FORECAST_DATA.forEach(f => {
    container.innerHTML += `
      <div class="forecast-item">
        <div class="forecast-bar-wrap">
          <div class="forecast-bar" data-val="${f.val}" style="height:0px;max-height:${f.height}px" data-h="${f.height}"></div>
        </div>
        <div class="forecast-name">${f.name}</div>
      </div>`;
  });

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.forecast-bar').forEach((el, i) => {
        setTimeout(() => { el.style.height = el.dataset.h + 'px'; }, i * 80);
      });
    }
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('dashboard'));
}

function initOrdersTable() {
  renderOrdersTable(ORDERS_DATA);
}

function renderOrdersTable(data) {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = '';
  data.forEach(o => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.cake}</td>
        <td><strong>${o.amount}</strong></td>
        <td>${o.date}</td>
        <td><span class="status-badge status-${o.status}">${capitalize(o.status)}</span></td>
        <td><button class="btn-view" onclick="viewOrder('${o.id}')">View</button></td>
      </tr>`;
  });
}

window.viewOrder = function(id) {
  document.getElementById('trackingInput').value = id;
  scrollTo('#tracking');
  setTimeout(doTrack, 500);
};

function initOrderSearch() {
  const search = document.getElementById('orderSearch');
  const filter = document.getElementById('statusFilter');

  function applyFilters() {
    const q = search.value.toLowerCase();
    const st = filter.value;
    const filtered = ORDERS_DATA.filter(o => {
      const matchQ = !q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.cake.toLowerCase().includes(q);
      const matchSt = st === 'all' || o.status === st;
      return matchQ && matchSt;
    });
    renderOrdersTable(filtered);
  }

  search.addEventListener('input', applyFilters);
  filter.addEventListener('change', applyFilters);
}

/* ── CART ──────────────────────────────────────────────────────────────── */
function initCart() {
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...item, qty:1 });
  }
  updateCartUI();
  openCart();
  showToast(`${item.name} added to cart! 🛒`, '✅');
}

function removeFromCart(id) {
  cart = cart.filter(c => String(c.id) !== String(id));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((a, c) => a + (c.qty || 1), 0);
  document.getElementById('cartCount').textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><span>🛒</span><p>Your cart is empty</p><small>Add some sweet treats!</small></div>`;
    footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}</div>
        <div class="cart-item-sub">${item.sub}</div>
        <div class="cart-item-price">₹${(item.price * (item.qty || 1)).toLocaleString()}</div>
      </div>
      <span class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑️</span>
    </div>`).join('');

  const subtotal = cart.reduce((a, c) => a + c.price * (c.qty || 1), 0);
  const discount = Math.round(subtotal * 0.15);
  const total = subtotal - discount;

  document.getElementById('cartSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('cartDiscount').textContent = `-₹${discount.toLocaleString()}`;
  document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
  footerEl.style.display = 'block';
}

window.removeFromCart = removeFromCart;

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function checkout() {
  if (cart.length === 0) return;
  const total = cart.reduce((a, c) => a + c.price * (c.qty || 1), 0);
  const pts = Math.floor(total * 0.15 / 10);
  orderCounter++;
  document.getElementById('modalOrderId').textContent = `Order #SL-2024-00${orderCounter}`;
  document.getElementById('modalMsg').textContent = `${cart.length} item(s) confirmed. We're preparing your order!`;
  document.getElementById('modalPoints').textContent = `+${pts} pts`;
  cart = [];
  updateCartUI();
  closeCart();
  showModal();
}

/* ── MODAL ─────────────────────────────────────────────────────────────── */
function initModal() {
  document.getElementById('modalClose').addEventListener('click', hideModal);
  document.getElementById('orderModal').addEventListener('click', e => {
    if (e.target === document.getElementById('orderModal')) hideModal();
  });
}

function showModal() {
  generateQR('miniQR', 8);
  launchConfetti();
  document.getElementById('orderModal').style.display = 'flex';
}

function hideModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function launchConfetti() {
  const container = document.getElementById('modalConfetti');
  container.innerHTML = '';
  const colors = ['#c9933a','#f7e8c8','#e8a0a0','#9ab89a','#d4843a'];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      width:${Math.random()*8+4}px;
      height:${Math.random()*8+4}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.5?'50%':'2px'};
      left:${Math.random()*100}%;
      top:0;
      animation:confettiFall ${Math.random()*1+0.8}s ease-out forwards;
      animation-delay:${Math.random()*0.4}s;
    `;
    container.appendChild(el);
  }
}

/* ── QR GENERATOR (pixel art) ──────────────────────────────────────────── */
function generateQR(containerId, size) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  el.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  // Seeded pseudo-random for consistent QR look
  let seed = containerId.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  function rand() { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('div');
      cell.className = 'qr-cell';
      // Corner anchors
      const isCorner = (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);
      cell.style.background = isCorner ? '#1a1a1a' : rand() > 0.55 ? '#1a1a1a' : 'transparent';
      el.appendChild(cell);
    }
  }
}

/* ── TOAST ─────────────────────────────────────────────────────────────── */
function showToast(msg, icon = '🍰') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(100px);
    background:#fff; border:1px solid rgba(201,147,58,0.2); border-radius:50px;
    padding:14px 24px; box-shadow:0 8px 32px rgba(120,80,30,0.2);
    display:flex; align-items:center; gap:10px; z-index:9999;
    font-size:0.9rem; font-weight:500; color:#2a1a0a;
    transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    white-space:nowrap;
  `;
  toast.innerHTML = `<span style="font-size:1.1rem">${icon}</span>${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; }, 20);
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ── SCROLL REVEAL ─────────────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── DATE MIN ──────────────────────────────────────────────────────────── */
function setMinDate() {
  const dateInput = document.getElementById('po-date');
  if (!dateInput) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
  dateInput.value = tomorrow.toISOString().split('T')[0];
}

/* ── CONFETTI KEYFRAME (injected) ───────────────────────────────────────── */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes confettiFall {
    0%   { transform: translateY(0) rotate(0deg); opacity:1; }
    100% { transform: translateY(120px) rotate(720deg); opacity:0; }
  }
  @keyframes shake {
    0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}
  }
`;
document.head.appendChild(styleSheet);
