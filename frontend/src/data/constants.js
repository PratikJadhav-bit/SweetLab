/* ── DATA CONSTANTS ─────────────────────────────────────────────────── */

export const PRODUCTS = [
  { id:1,  name:'Velvet Dream',      desc:'Red Velvet · Cream Cheese · 24K Gold Leaf',           price:3499, emoji:'🎂', cat:'cakes',    rating:4.9, reviews:312, badge:'bestseller', bg:'#fce8e8' },
  { id:2,  name:'Chocolate Royale',  desc:'Dark Belgian Truffle · Hazelnut Praline · Ganache',   price:2999, emoji:'🍫', cat:'cakes',    rating:4.8, reviews:289, badge:'bestseller', bg:'#f0ebe6' },
  { id:3,  name:'Mango Fiesta',      desc:'Alphonso Mango · Mascarpone · Saffron Cream',         price:2799, emoji:'🥭', cat:'cakes',    rating:4.7, reviews:198, badge:'seasonal',   bg:'#fff8e1' },
  { id:4,  name:'Sakura Bloom',      desc:'Matcha Sponge · White Chocolate · Cherry Compote',    price:3199, emoji:'🌸', cat:'cakes',    rating:4.9, reviews:145, badge:'new',        bg:'#fce4ec' },
  { id:5,  name:'Salted Caramel',    desc:'Caramel Swirl · Sea Salt Flakes · Pecan Crunch',      price:1499, emoji:'🧁', cat:'cupcakes', rating:4.8, reviews:421, badge:'bestseller', bg:'#fff3e0' },
  { id:6,  name:'Blueberry Bliss',   desc:'Wild Blueberry · Lemon Zest · Vanilla Chantilly',     price:1199, emoji:'🫐', cat:'cupcakes', rating:4.7, reviews:231, badge:'vegan',      bg:'#ede7f6' },
  { id:7,  name:'Butter Croissant',  desc:'AOP French Butter · 72 Layers · Almond Filling',      price:299,  emoji:'🥐', cat:'pastries', rating:4.9, reviews:512, badge:'bestseller', bg:'#fff8e1' },
  { id:8,  name:'Tiramisu Jar',      desc:'Espresso-Soaked Sponge · Mascarpone · Cocoa Dust',    price:549,  emoji:'☕', cat:'pastries', rating:4.8, reviews:187, badge:'new',        bg:'#efebe9' },
  { id:9,  name:'Diwali Royale',     desc:'Kesar Pista · Rose Water · 24K Gold Varq Finish',     price:4499, emoji:'🪔', cat:'seasonal', rating:5.0, reviews:99,  badge:'seasonal',   bg:'#fff8e1' },
  { id:10, name:'Yule Log',          desc:'Bûche de Noël · Forest Berry · Snow Glaze',            price:3799, emoji:'🎄', cat:'seasonal', rating:4.9, reviews:76,  badge:'seasonal',   bg:'#e8f5e9' },
  { id:11, name:'Strawberry Reverie',desc:'Fresh Strawberry · Chantilly · Basil Oil Drizzle',    price:2199, emoji:'🍓', cat:'cakes',    rating:4.6, reviews:164, badge:'new',        bg:'#fce4ec' },
  { id:12, name:'Éclair Collection', desc:'Vanilla Custard · Dark Ganache · Almond Praline',     price:899,  emoji:'🍮', cat:'pastries', rating:4.7, reviews:203, badge:'bestseller', bg:'#fff9c4' },
];

export const FESTIVALS = [
  { name:'Diwali',       date:'Oct 20, 2025', demand:'high',   icon:'🪔', ordersSurge:'↑ 320%' },
  { name:'Christmas',    date:'Dec 25, 2025', demand:'high',   icon:'🎄', ordersSurge:'↑ 280%' },
  { name:"New Year's",   date:'Jan 1, 2026',  demand:'high',   icon:'🎆', ordersSurge:'↑ 260%' },
  { name:"Valentine's",  date:'Feb 14, 2026', demand:'medium', icon:'❤️', ordersSurge:'↑ 180%' },
  { name:'Holi',         date:'Mar 14, 2026', demand:'medium', icon:'🎨', ordersSurge:'↑ 150%' },
  { name:'Eid',          date:'Apr 2, 2026',  demand:'high',   icon:'🌙', ordersSurge:'↑ 200%' },
];

export const AI_MOODS = {
  romantic:    { emoji:'🍓', name:'Strawberry Lover\'s Cake', desc:'Rose petal cream, strawberry compote, vanilla sponge — pure romance in every slice.', price:'₹2,499', match:'98%' },
  celebratory: { emoji:'🎂', name:'Grand Confetti Celebration',desc:'Rainbow sponge, buttercream swirls, edible glitter — the life of the party.', price:'₹3,199', match:'96%' },
  cozy:        { emoji:'☕', name:'Tiramisu Comfort Cake',   desc:'Espresso-soaked layers, mascarpone cream — like a warm hug on a rainy day.', price:'₹2,799', match:'94%' },
  adventurous: { emoji:'🌶️', name:'Chilli Dark Chocolate Bomb',desc:'Peruvian dark chocolate with a surprising chilli finish — bold and unforgettable.', price:'₹3,499', match:'91%' },
  refreshing:  { emoji:'🍃', name:'Matcha Yuzu Cloud',       desc:'Japanese ceremonial matcha, yuzu curd, airy sponge — crisp and revitalising.', price:'₹3,199', match:'95%' },
};

export const INVENTORY_ITEMS = [
  { id:1,  icon:'🌾', name:'Refined Flour',      qty:48,  unit:'kg',   pct:80, level:'good'   },
  { id:2,  icon:'🧈', name:'Unsalted Butter',    qty:22,  unit:'kg',   pct:73, level:'good'   },
  { id:3,  icon:'🍫', name:'Dark Chocolate',     qty:8,   unit:'kg',   pct:27, level:'medium' },
  { id:4,  icon:'🍓', name:'Fresh Strawberry',   qty:4,   unit:'kg',   pct:13, level:'low'    },
  { id:5,  icon:'🥚', name:'Free-Range Eggs',    qty:180, unit:'pcs',  pct:60, level:'good'   },
  { id:6,  icon:'🍦', name:'Vanilla Beans',      qty:2,   unit:'pods', pct:8,  level:'low'    },
  { id:7,  icon:'🫐', name:'Wild Blueberries',   qty:6,   unit:'kg',   pct:20, level:'medium' },
  { id:8,  icon:'🧁', name:'Cream Cheese',       qty:14,  unit:'kg',   pct:47, level:'medium' },
  { id:9,  icon:'🍯', name:'Raw Honey',          qty:30,  unit:'kg',   pct:75, level:'good'   },
  { id:10, icon:'🥛', name:'Whole Milk',         qty:60,  unit:'L',    pct:60, level:'good'   },
  { id:11, icon:'🌸', name:'Rose Water',         qty:1,   unit:'L',    pct:15, level:'low'    },
  { id:12, icon:'✨', name:'Edible Gold Leaf',   qty:5,   unit:'sheets',pct:10, level:'low'   },
];

export const REWARDS_LIST = [
  { id:1, icon:'🎂', title:'Free Cupcake Dozen',         pts:500,  desc:'12 assorted premium cupcakes' },
  { id:2, icon:'🚚', title:'Free Delivery ×5',           pts:300,  desc:'No delivery fee on 5 orders' },
  { id:3, icon:'💰', title:'₹200 Cashback',              pts:400,  desc:'Instant wallet credit' },
  { id:4, icon:'🎁', title:'Mystery Cake Box',           pts:800,  desc:'Chef\'s surprise selection' },
  { id:5, icon:'🌟', title:'Gold Tier Upgrade',          pts:1000, desc:'Jump tier instantly' },
  { id:6, icon:'👨‍🍳', title:'Chef\'s Table Experience',  pts:1500, desc:'VIP tasting for 2' },
];

export const POINTS_HISTORY = [
  { icon:'🎂', action:'Chocolate Truffle order',   date:'May 26',  pts:'+150', earn:true  },
  { icon:'⭐', action:'5-star review bonus',        date:'May 24',  pts:'+50',  earn:true  },
  { icon:'🎁', action:'Redeemed Free Delivery',     date:'May 20',  pts:'-300', earn:false },
  { icon:'🎂', action:'Birthday Cake order',        date:'May 15',  pts:'+400', earn:true  },
  { icon:'🔗', action:'Referral bonus — Rahul M.',  date:'May 10',  pts:'+200', earn:true  },
  { icon:'💰', action:'Redeemed ₹200 Cashback',    date:'Apr 30',  pts:'-400', earn:false },
];

export const ORDERS_DATA = [
  { id:'SL-2024-001', customer:'Sarah Johnson',   cake:'Chocolate Truffle Cake', amount:2999,  date:'May 26, 2024', status:'baking'    },
  { id:'SL-2024-002', customer:'Rahul Mehta',     cake:'Red Velvet 2kg',         amount:5498,  date:'May 26, 2024', status:'delivered' },
  { id:'SL-2024-003', customer:'Priya Sharma',    cake:'Mango Fiesta',           amount:2799,  date:'May 25, 2024', status:'delivered' },
  { id:'SL-2024-004', customer:'Aditya Kumar',    cake:'Matcha Sakura Bloom',    amount:3199,  date:'May 25, 2024', status:'pending'   },
  { id:'SL-2024-005', customer:'Neha Patel',      cake:'Custom Wedding Cake',    amount:12500, date:'May 24, 2024', status:'delivered' },
  { id:'SL-2024-006', customer:'Vikram Singh',    cake:'Butter Croissant ×6',    amount:1794,  date:'May 24, 2024', status:'delivered' },
  { id:'SL-2024-007', customer:'Ananya Das',      cake:'Tiramisu Jar ×3',        amount:1647,  date:'May 23, 2024', status:'delivered' },
  { id:'SL-2024-008', customer:'Suresh Nair',     cake:'Diwali Royale',          amount:4499,  date:'May 23, 2024', status:'pending'   },
];

export const REVENUE_DATA = [
  { month:'Jan', revenue:185000, lastYear:140000, orders:412 },
  { month:'Feb', revenue:198000, lastYear:155000, orders:438 },
  { month:'Mar', revenue:220000, lastYear:170000, orders:489 },
  { month:'Apr', revenue:245000, lastYear:190000, orders:546 },
  { month:'May', revenue:284500, lastYear:210000, orders:631 },
];

export const TOP_SELLERS = [
  { name:'Chocolate Truffle', pct:88, value:68400 },
  { name:'Red Velvet Cake',   pct:76, value:58200 },
  { name:'Custom Cakes',      pct:65, value:52800 },
  { name:'Cupcake Boxes',     pct:54, value:41300 },
  { name:'Seasonal Specials', pct:42, value:34800 },
];

export const DONUT_DATA = [
  { name:'Cakes',    value:45, color:'#d4943a' },
  { name:'Cupcakes', value:25, color:'#f0b020' },
  { name:'Pastries', value:18, color:'#f6ca50' },
  { name:'Seasonal', value:12, color:'#6a9e6a' },
];

export const FORECAST_DATA = [
  { name:'Diwali',    orders:320, fill:'#d4943a' },
  { name:'Xmas',      orders:280, fill:'#6a9e6a' },
  { name:"New Year",  orders:260, fill:'#f0b020' },
  { name:"Valentine", orders:180, fill:'#e07070' },
  { name:'Holi',      orders:150, fill:'#a8c8a8' },
  { name:'Eid',       orders:200, fill:'#c4956a' },
  { name:"Mother's",  orders:170, fill:'#f0a8a8' },
  { name:'Easter',    orders:130, fill:'#a8c8f0' },
];

export const CAKE_SHAPES   = [{ val:'round',  label:'Round',  emoji:'⭕' },{ val:'square', label:'Square', emoji:'⬛' },{ val:'heart',  label:'Heart',  emoji:'❤️' },{ val:'tiered', label:'Tiered', emoji:'🗼' }];
export const CAKE_FLAVORS  = [{ val:'red-velvet',  label:'Red Velvet',  emoji:'🍒' },{ val:'chocolate', label:'Chocolate', emoji:'🍫' },{ val:'vanilla',   label:'Vanilla',   emoji:'🍦' },{ val:'mango',     label:'Mango',     emoji:'🥭' },{ val:'strawberry',label:'Strawberry',emoji:'🍓' },{ val:'matcha',    label:'Matcha',    emoji:'🍵' }];
export const CAKE_FROSTINGS= [{ val:'buttercream',label:'Buttercream',emoji:'🧈' },{ val:'fondant',    label:'Fondant',   emoji:'🎭' },{ val:'ganache',   label:'Ganache',   emoji:'🌑' },{ val:'whipped',   label:'Whipped',   emoji:'☁️' }];
export const CAKE_DECOS    = [{ val:'flowers',   label:'Flowers',  emoji:'🌸' },{ val:'gold-leaf', label:'Gold Leaf',emoji:'✨' },{ val:'sprinkles', label:'Sprinkles',emoji:'🎉' },{ val:'berries',   label:'Berries',  emoji:'🫐' },{ val:'macarons',  label:'Macarons', emoji:'🍬' },{ val:'candles',   label:'Candles',  emoji:'🕯️' }];
export const COLOR_SWATCHES= ['#f4c2c2','#ffd700','#c8a2c8','#98e098','#87ceeb','#ff8c69','#deb887','#2c2c2c','#e8b4d0','#b4d0e8','#d0e8b4','#e8d0b4'];

export const ORDER_PRICES = {
  'Red Velvet':     { base:2499, custom:500  },
  'Chocolate Truffle':{ base:2999, custom:300 },
  'Black Forest':   { base:2199, custom:300  },
  'Vanilla Bean':   { base:1799, custom:200  },
  'Mango Delight':  { base:2499, custom:400  },
  'Custom Design':  { base:3499, custom:1000 },
};

export const SIZE_PRICES = {
  '0.5 kg': 1.0,
  '1 kg':   1.6,
  '1.5 kg': 2.1,
  '2 kg':   2.6,
  '3 kg':   3.5,
};

export const DESIGNER_PRICE_MATRIX = {
  shape:    { round:1800, square:2100, heart:2400, tiered:3200 },
  flavor:   { 'red-velvet':500, chocolate:300, vanilla:200, mango:400, strawberry:350, matcha:600 },
  frosting: { buttercream:0, fondant:400, ganache:350, whipped:150 },
  deco:     { flowers:300, 'gold-leaf':700, sprinkles:100, berries:400, macarons:500, candles:100 },
  tierExtra: 800,
};

export const TIER_CONFIG = {
  bronze:   { label:'Bronze',   min:0,    max:999,  discount:5,  icon:'🥉', color:'#cd7f32' },
  silver:   { label:'Silver',   min:1000, max:1999, discount:10, icon:'🥈', color:'#a8a8a8' },
  gold:     { label:'Gold',     min:2000, max:2999, discount:15, icon:'🥇', color:'#d4943a' },
  platinum: { label:'Platinum', min:3000, max:Infinity, discount:20, icon:'💎', color:'#a0c4ff' },
};

export const TESTIMONIALS = [
  { name:'Meera Kapoor',    role:'Wedding Planner',   rating:5, text:'The custom wedding cake exceeded every expectation. The design team was incredibly professional and the quality was out of this world.', avatar:'👩' },
  { name:'Rajan Malhotra',  role:'Corporate Client',  rating:5, text:'We\'ve ordered from SweetLab for every company event for 3 years. The consistency, quality, and service are unmatched.', avatar:'👨' },
  { name:'Pooja Iyer',      role:'Food Blogger',      rating:5, text:'As a food blogger, I\'ve tried hundreds of bakeries. SweetLab is in a league of their own — premium ingredients, masterful craft.', avatar:'👩' },
];

export const formatCurrency = (amount) =>
  `₹${Number(amount).toLocaleString('en-IN')}`;

export const getStatusColor = (status) => ({
  delivered: { bg:'#e8f5e9', color:'#2e7d32' },
  baking:    { bg:'#fff3e0', color:'#e65100' },
  pending:   { bg:'#e3f2fd', color:'#1565c0' },
  cancelled: { bg:'#fce4ec', color:'#c62828' },
}[status] || { bg:'#f5f5f5', color:'#616161' });
