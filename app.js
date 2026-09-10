/* =============================================================================
   VESMÍRNA AKADÉMIA – app.js
   -----------------------------------------------------------------------------
   V tomto súbore je LOGIKA. Obsah lekcií je v data/lessons.js,
   objekty v data/objects.js, obrázky v data/images.js.

   Obsah:
     1) Stav a ukladanie (localStorage)
     2) Hviezdne pozadie
     3) SVG ilustrácie (fallback, keď nie je fotografia)
     4) Malé UI pomôcky
     5) Navigácia medzi obrazovkami
     6) Domovská obrazovka
     7) Lekcia – jednotlivé typy krokov
     8) Kvíz + výsledok
     9) Zbierka, odznaky, zdroje
   ========================================================================== */

/* =========================== 1) STAV A UKLADANIE ========================= */

const STORAGE_KEY = 'vesmirna-akademia-v1';

const DEFAULT_STATE = {
  xp: 0,
  discovered: {},        // { m42: { date: '2026-09-10', photo: null } }
  badges: [],            // ['nebula-hunter']
  lessons: {},           // { nebulae: { completed: true, score: 4, total: 5 } }
  facts: {},             // { 'svetlo-z-minulosti': '10. 9. 2026' }  – zbierka VIEŠ ŽE?
  terms: {},             // { 'expozicia': '10. 9. 2026' }  – slovníček pojmov
  missed: {},            // { 'nebulae:2': 1 }  – otázky na zopakovanie (rozcvička)
  awarded: {}            // aby sa XP za ten istý krok nepripísalo dvakrát
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCopy(DEFAULT_STATE);
    return Object.assign(structuredCopy(DEFAULT_STATE), JSON.parse(raw));
  } catch (e) {
    return structuredCopy(DEFAULT_STATE);
  }
}
/** Uloží stav. Vráti false, keď sa to nepodarilo (napr. plný localStorage). */
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
  catch (e) { return false; }
}
function structuredCopy(o) { return JSON.parse(JSON.stringify(o)); }

function currentLevel() {
  let level = LEVELS[0], next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (state.xp >= LEVELS[i].xp) { level = LEVELS[i]; next = LEVELS[i + 1] || null; }
  }
  return { level: level, next: next };
}

/** Pripíše XP (raz za daný kľúč) a ukáže animovaný toast. */
function addXp(amount, key) {
  if (key) {
    if (state.awarded[key]) return false;
    state.awarded[key] = true;
  }
  state.xp += amount;
  saveState();
  renderXp(true);
  toast('+' + amount + ' XP');
  sfx('xp');
  return true;
}

function discoverObject(objectId) {
  if (state.discovered[objectId]) return false;
  state.discovered[objectId] = { date: todayText(), photo: null };
  saveState();
  return true;
}

/** Odomkne zaujímavosť „VIEŠ ŽE?“ do zbierky. */
function unlockFact(factId) {
  if (!FACTS[factId] || state.facts[factId]) return false;
  state.facts[factId] = todayText();
  saveState();
  return true;
}

/** Odomkne pojem do slovníčka. */
function unlockTerm(termId) {
  if (typeof TERMS === 'undefined' || !TERMS[termId] || state.terms[termId]) return false;
  state.terms[termId] = todayText();
  saveState();
  return true;
}

function unlockBadge(badgeId) {
  if (state.badges.indexOf(badgeId) !== -1) return false;
  state.badges.push(badgeId);
  saveState();
  return true;
}

function todayText() {
  const d = new Date();
  return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
}

/* =========================== 2) HVIEZDNE POZADIE ========================= */
/* Nakreslí sa raz na canvas (žiadna animačná smyčka = žiadna záťaž CPU).
   Jemné „blikanie“ zabezpečí len CSS na pohybujúcej sa žiare pozadia.      */

function drawStarfield() {
  const c = document.getElementById('starfield');
  if (!c) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  c.width = w * dpr; c.height = h * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const count = Math.round((w * h) / 5200);   // hustota hviezd podľa veľkosti okna
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random() * 1.25 + 0.25;
    const a = Math.random() * 0.7 + 0.15;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + starTint() + ',' + a.toFixed(2) + ')';
    ctx.fill();
  }
  // niekoľko väčších hviezd so žiarou
  for (let i = 0; i < Math.max(6, count / 90); i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
    g.addColorStop(0, 'rgba(255,255,255,.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 9, y - 9, 18, 18);
  }
}
function starTint() {
  const t = Math.random();
  if (t > 0.88) return '190,215,255';
  if (t > 0.76) return '255,235,205';
  return '255,255,255';
}
window.addEventListener('resize', debounce(drawStarfield, 250));

function debounce(fn, ms) {
  let t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
}

/* =========================== 3) SVG ILUSTRÁCIE =========================== */
/* Používajú sa vždy ako podklad a zároveň ako záloha, keby sa fotografia
   nenačítala (offline režim). Generujú sa v kóde – žiadne externé súbory.  */

let artCounter = 0;

const ART_PALETTES = {
  emission:  { bg: '#0a0411', blobs: [['#ff4f8f', .60], ['#ff9d54', .42], ['#8a3bff', .40]] },
  reflection:{ bg: '#03060f', blobs: [['#4aa8ff', .55], ['#8ae0ff', .34], ['#2b4bff', .34]] },
  dark:      { bg: '#170c07', blobs: [['#ff8b3d', .50], ['#ff5a2e', .34], ['#ffd479', .22]] },
  planetary: { bg: '#04080e', blobs: [['#22d3c5', .34], ['#4aa8ff', .28], ['#b487ff', .22]] },
  galaxy:    { bg: '#03040c', blobs: [['#b487ff', .34], ['#4ad8ff', .24], ['#ffd479', .18]] },
  cluster:   { bg: '#03040a', blobs: [['#ffd479', .22], ['#9ad8ff', .18]] },
  planet:    { bg: '#04050c', blobs: [['#2c3a66', .22]] },
  milkyway:  { bg: '#02030a', blobs: [['#ffe6b8', .16], ['#7f8ee0', .14], ['#ff9d6e', .10]] },
  moon:      { bg: '#04050c', blobs: [['#20263a', .16]] },
  doublestar:{ bg: '#03040c', blobs: [['#3a5cff', .16], ['#ffb454', .14]] },
  supernova: { bg: '#05030c', blobs: [['#ff6a4f', .40], ['#5ce0c6', .30], ['#b487ff', .26]] },
  blackhole: { bg: '#040309', blobs: [['#ff8a2b', .30], ['#ffd479', .18]] },
  neutron:   { bg: '#02040c', blobs: [['#4aa8ff', .22], ['#b487ff', .18]] },
  faintnebula: { bg: '#05060d', blobs: [['#ff4f8f', .10], ['#8a3bff', .07]] },
  noisynebula: { bg: '#0a0411', blobs: [['#ff4f8f', .62], ['#ff9d54', .44]] },
  cleannebula: { bg: '#0a0411', blobs: [['#ff4f8f', .62], ['#ff9d54', .44]] },
  blurstars:   { bg: '#03040b', blobs: [['#2b3a6b', .18]] },
  faintstar:   { bg: '#03040b', blobs: [['#26406e', .10]] },
  sun:       { bg: '#0a0602', blobs: [['#ffb43c', .30], ['#ff7a1c', .22]] },
  moonphase: { bg: '#04050c', blobs: [['#1c2338', .16]] },
  spectrum:  { bg: '#04040a', blobs: [] },
  satellite: { bg: '#03040b', blobs: [['#26406e', .18]] },
  transit:   { bg: '#05040a', blobs: [['#ffcf6a', .18]] },
  comet:     { bg: '#03040c', blobs: [['#7fe0ff', .18], ['#b487ff', .14]] },
  meteors:   { bg: '#03040b', blobs: [['#243a6b', .18]] },
  citysky:   { bg: '#0a0806', blobs: [['#ff9a3c', .26], ['#6b5a3a', .16]] },
  dome:      { bg: '#03040c', blobs: [['#26406e', .20]] },
  deepfield: { bg: '#010208', blobs: [['#2a2350', .16]] },
  'star-blue':   { bg: '#02040e', blobs: [['#5a9bff', .30]] },
  'star-yellow': { bg: '#080608', blobs: [['#ffd06a', .28]] },
  'star-red':    { bg: '#0a0406', blobs: [['#ff6a5a', .26]] },
  trails:    { bg: '#03040b', blobs: [['#2b3a6b', .20], ['#4a3b7a', .16]] },
  roundstars:{ bg: '#03040b', blobs: [['#2b3a6b', .20], ['#7a3b6a', .16]] },
  polaris:   { bg: '#02040a', blobs: [['#26406e', .22], ['#123047', .18]] }
};

function spaceArt(kind) {
  const pal = ART_PALETTES[kind] || ART_PALETTES.emission;
  const uid = 'art' + (artCounter++);
  const rand = seededRandom(kind.length * 977 + artCounter * 13);
  let defs = '', body = '';

  /* mäkké farebné oblaky, ktoré filter rozvlní do tvaru hmloviny */
  pal.blobs.forEach(function (b, i) {
    const gid = uid + 'g' + i;
    defs += '<radialGradient id="' + gid + '">' +
            '<stop offset="0%" stop-color="' + b[0] + '" stop-opacity="' + b[1] + '"/>' +
            '<stop offset="100%" stop-color="' + b[0] + '" stop-opacity="0"/></radialGradient>';
    const cx = 90 + rand() * 220, cy = 60 + rand() * 130;
    const rx = 90 + rand() * 120, ry = 60 + rand() * 80;
    body += '<ellipse cx="' + cx.toFixed(0) + '" cy="' + cy.toFixed(0) + '" rx="' + rx.toFixed(0) +
            '" ry="' + ry.toFixed(0) + '" fill="url(#' + gid + ')"/>';
  });

  defs += '<filter id="' + uid + 'f" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves="4" seed="' +
          (3 + artCounter) + '" result="n"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="n" scale="70" ' +
          'xChannelSelector="R" yChannelSelector="G"/>' +
          '<feGaussianBlur stdDeviation="3.5"/></filter>';

  let extra = '';

  if (kind === 'dark') {
    /* tmavá silueta pred žiariacim pozadím */
    extra += '<path d="M120 250 L120 150 C120 120 140 104 168 100 C186 97 196 84 206 70 ' +
             'C214 58 232 56 240 68 C248 80 244 96 236 108 C252 116 262 132 262 152 L262 250 Z" ' +
             'fill="#05040a" opacity=".92"/>';
  }
  if (kind === 'planetary') {
    extra += '<g opacity=".95">' +
             '<ellipse cx="200" cy="125" rx="86" ry="62" fill="none" stroke="#2ee0c8" ' +
             'stroke-width="26" opacity=".30" filter="url(#' + uid + 'blur)"/>' +
             '<ellipse cx="200" cy="125" rx="86" ry="62" fill="none" stroke="#8ff5e6" ' +
             'stroke-width="9" opacity=".55"/>' +
             '<ellipse cx="200" cy="125" rx="60" ry="40" fill="#0b2b3a" opacity=".55"/>' +
             '<circle cx="200" cy="125" r="3.4" fill="#ffffff"/>' +
             '<circle cx="200" cy="125" r="12" fill="#ffffff" opacity=".18"/></g>';
    defs += '<filter id="' + uid + 'blur"><feGaussianBlur stdDeviation="10"/></filter>';
  }
  if (kind === 'galaxy') {
    defs += '<radialGradient id="' + uid + 'core"><stop offset="0%" stop-color="#fff8e0"/>' +
            '<stop offset="55%" stop-color="#ffd479" stop-opacity=".55"/>' +
            '<stop offset="100%" stop-color="#ffd479" stop-opacity="0"/></radialGradient>';
    /* špirálové ramená z bodiek – vyzerá to ako naklonený disk galaxie */
    const rg = seededRandom(51515);
    extra += '<g transform="translate(200 125) rotate(-20) scale(1 0.58)">';
    for (let arm = 0; arm < 2; arm++) {
      for (let i = 0; i < 520; i++) {
        const t = Math.pow(i / 520, 0.85);
        const ang = arm * Math.PI + t * 4.6 + (rg() - 0.5) * 0.3;
        const rad = 18 + t * 128 + (rg() - 0.5) * 22;
        const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad;
        const blue = rg() > 0.75;
        extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' +
                 (0.9 + rg() * 2.1).toFixed(2) + '" fill="' + (blue ? '#bcd8ff' : '#ffe9c4') +
                 '" opacity="' + (0.18 + (1 - t) * 0.55).toFixed(2) + '"/>';
      }
    }
    extra += '<ellipse rx="150" ry="150" fill="url(#' + uid + 'core)" opacity=".22"/>';
    extra += '</g>';
    extra += '<circle cx="200" cy="125" r="30" fill="url(#' + uid + 'core)"/>';
  }
  if (kind === 'cluster') {
    for (let i = 0; i < 260; i++) {
      const ang = rand() * Math.PI * 2;
      const rad = Math.pow(rand(), 2.1) * 105;
      const x = 200 + Math.cos(ang) * rad, y = 125 + Math.sin(ang) * rad * 0.92;
      const r = 0.5 + rand() * 1.5;
      const col = rand() > 0.7 ? '#ffe0ad' : '#eef4ff';
      extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) +
               '" fill="' + col + '" opacity="' + (0.4 + rand() * 0.6).toFixed(2) + '"/>';
    }
  }
  if (kind === 'planet') {
    defs += '<radialGradient id="' + uid + 'p" cx="35%" cy="32%">' +
            '<stop offset="0%" stop-color="#ffe9c2"/><stop offset="60%" stop-color="#d9a463"/>' +
            '<stop offset="100%" stop-color="#5a3a1e"/></radialGradient>';
    extra += '<g transform="translate(200 125)">' +
             '<ellipse rx="122" ry="30" fill="none" stroke="#e8d3ab" stroke-opacity=".35" stroke-width="16" transform="rotate(-14)"/>' +
             '<circle r="58" fill="url(#' + uid + 'p)"/>' +
             '<ellipse rx="122" ry="30" fill="none" stroke="#f5e6c6" stroke-opacity=".55" stroke-width="6" transform="rotate(-14)" ' +
             'stroke-dasharray="240 400" stroke-dashoffset="-40"/></g>';
  }

  /* --- porovnávacie dvojice pre slovníček ------------------------------ */
  if (kind === 'faintnebula' || kind === 'noisynebula' || kind === 'cleannebula') {
    const rn = seededRandom(4242);
    // rovnaké hviezdy vo všetkých troch, aby bol rozdiel len v šume a jasnosti
    for (let i = 0; i < 70; i++) {
      extra += '<circle cx="' + (rn() * 400).toFixed(1) + '" cy="' + (rn() * 250).toFixed(1) +
               '" r="' + (0.5 + rn() * 1.2).toFixed(2) + '" fill="#fff" opacity="' +
               (kind === 'faintnebula' ? 0.15 + rn() * 0.25 : 0.4 + rn() * 0.5).toFixed(2) + '"/>';
    }
    if (kind === 'noisynebula') {          // zrnitý šum ako pri vysokom gaine
      const rz = seededRandom(9001);
      for (let i = 0; i < 900; i++) {
        const g = Math.round(120 + rz() * 135);
        extra += '<rect x="' + (rz() * 400).toFixed(1) + '" y="' + (rz() * 250).toFixed(1) +
                 '" width="1.6" height="1.6" fill="rgb(' + g + ',' + g + ',' + g + ')" opacity="' +
                 (0.18 + rz() * 0.5).toFixed(2) + '"/>';
      }
    }
  }
  if (kind === 'blurstars') {
    const rb = seededRandom(20260910);
    for (let i = 0; i < 60; i++) {
      const x = rb() * 400, y = rb() * 250, r = 3.5 + rb() * 5;
      defs += '<radialGradient id="' + uid + 'b' + i + '"><stop offset="0%" stop-color="#fff" ' +
              'stop-opacity=".75"/><stop offset="60%" stop-color="#dbe7ff" stop-opacity=".35"/>' +
              '<stop offset="100%" stop-color="#dbe7ff" stop-opacity="0"/></radialGradient>';
      extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) +
               '" fill="url(#' + uid + 'b' + i + ')"/>';
    }
  }
  if (kind === 'faintstar') {
    const rq = seededRandom(77);
    for (let i = 0; i < 60; i++) {
      extra += '<circle cx="' + (rq() * 400).toFixed(1) + '" cy="' + (rq() * 250).toFixed(1) +
               '" r="' + (0.4 + rq() * 0.8).toFixed(2) + '" fill="#fff" opacity="' +
               (0.15 + rq() * 0.3).toFixed(2) + '"/>';
    }
    defs += '<radialGradient id="' + uid + 'fs"><stop offset="0%" stop-color="#ffffff" stop-opacity=".9"/>' +
            '<stop offset="40%" stop-color="#cfe0ff" stop-opacity=".25"/>' +
            '<stop offset="100%" stop-color="#cfe0ff" stop-opacity="0"/></radialGradient>';
    extra += '<circle cx="200" cy="125" r="22" fill="url(#' + uid + 'fs)"/>' +
             '<circle cx="200" cy="125" r="2" fill="#fff" opacity=".9"/>';
  }

  /* --- Slnko so škvrnami ---------------------------------------------- */
  if (kind === 'sun') {
    const rs = seededRandom(1610);
    defs += '<radialGradient id="' + uid + 'su" cx="46%" cy="42%">' +
            '<stop offset="0%" stop-color="#fffbe8"/><stop offset="55%" stop-color="#ffd25c"/>' +
            '<stop offset="88%" stop-color="#ff9a1c"/><stop offset="100%" stop-color="#e06a10"/></radialGradient>' +
            '<filter id="' + uid + 'gl"><feGaussianBlur stdDeviation="12"/></filter>';
    extra += '<circle cx="200" cy="125" r="110" fill="#ffa72c" opacity=".35" filter="url(#' + uid + 'gl)"/>' +
             '<circle cx="200" cy="125" r="92" fill="url(#' + uid + 'su)"/>';
    extra += '<g clip-path="circle(92px at 200px 125px)">';
    for (let i = 0; i < 7; i++) {
      const ang = rs() * Math.PI * 2, rad = rs() * 74;
      const x = 200 + Math.cos(ang) * rad, y = 125 + Math.sin(ang) * rad;
      const r = 4 + rs() * 9;
      extra += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + r.toFixed(1) +
               '" ry="' + (r * 0.78).toFixed(1) + '" fill="#8a4a12" opacity=".75"/>' +
               '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + (r * .5).toFixed(1) +
               '" ry="' + (r * .4).toFixed(1) + '" fill="#3d1d06" opacity=".85"/>';
    }
    extra += '</g>';
  }

  /* --- Mesiac vo fáze (osvetlený z jednej strany) ---------------------- */
  if (kind === 'moonphase') {
    const rm = seededRandom(2707);
    defs += '<radialGradient id="' + uid + 'mp" cx="34%" cy="34%">' +
            '<stop offset="0%" stop-color="#f6f3ea"/><stop offset="72%" stop-color="#c8c3b5"/>' +
            '<stop offset="100%" stop-color="#7d7a72"/></radialGradient>' +
            '<clipPath id="' + uid + 'mc"><circle cx="200" cy="125" r="92"/></clipPath>';
    extra += '<g clip-path="url(#' + uid + 'mc)">' +
             '<circle cx="200" cy="125" r="92" fill="url(#' + uid + 'mp)"/>';
    for (let i = 0; i < 34; i++) {
      const ang = rm() * Math.PI * 2, rad = rm() * 88;
      const x = 200 + Math.cos(ang) * rad, y = 125 + Math.sin(ang) * rad;
      const cr = 2 + rm() * 11;
      extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + cr.toFixed(1) +
               '" fill="#8f8a7e" opacity=".5"/>';
    }
    /* tmavá časť – terminátor */
    extra += '<ellipse cx="238" cy="125" rx="82" ry="92" fill="#05060d" opacity=".93"/>' +
             '</g>';
  }

  /* --- spektrum: dúhový pruh s tmavými čiarami ------------------------- */
  if (kind === 'spectrum') {
    defs += '<linearGradient id="' + uid + 'sp" x1="0" x2="1">' +
            '<stop offset="0%" stop-color="#7b2bff"/><stop offset="18%" stop-color="#2b6bff"/>' +
            '<stop offset="38%" stop-color="#2bd6c0"/><stop offset="56%" stop-color="#8ee02b"/>' +
            '<stop offset="72%" stop-color="#ffd42b"/><stop offset="88%" stop-color="#ff7b2b"/>' +
            '<stop offset="100%" stop-color="#e02b2b"/></linearGradient>';
    extra += '<rect x="24" y="78" width="352" height="94" rx="8" fill="url(#' + uid + 'sp)"/>';
    [0.11, 0.22, 0.31, 0.44, 0.52, 0.63, 0.71, 0.84, 0.92].forEach(function (t, i) {
      extra += '<rect x="' + (24 + t * 352).toFixed(1) + '" y="78" width="' + (i % 3 === 0 ? 4 : 2.4) +
               '" height="94" fill="#0a0710" opacity=".8"/>';
    });
    extra += '<text x="200" y="208" text-anchor="middle" fill="#9fb0d4" font-size="14" ' +
             'font-family="system-ui">tmavé čiary = odtlačky prvkov</text>';
  }

  /* --- satelit / ISS: rovná čiara medzi hviezdami ---------------------- */
  if (kind === 'satellite') {
    const rt = seededRandom(1998);
    for (let i = 0; i < 150; i++) {
      extra += '<circle cx="' + (rt() * 400).toFixed(1) + '" cy="' + (rt() * 250).toFixed(1) +
               '" r="' + (0.4 + rt() * 1.1).toFixed(2) + '" fill="#fff" opacity="' +
               (0.25 + rt() * 0.6).toFixed(2) + '"/>';
    }
    defs += '<linearGradient id="' + uid + 'st" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="#fff" stop-opacity="0"/>' +
            '<stop offset="25%" stop-color="#eaf4ff" stop-opacity=".9"/>' +
            '<stop offset="75%" stop-color="#eaf4ff" stop-opacity=".9"/>' +
            '<stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>';
    extra += '<rect x="30" y="70" width="340" height="3" rx="1.5" fill="url(#' + uid + 'st)" ' +
             'transform="rotate(14 200 125)"/>' +
             '<circle cx="300" cy="150" r="4" fill="#fff"/>' +
             '<circle cx="300" cy="150" r="13" fill="#cfe4ff" opacity=".25"/>';
  }

  /* --- tranzit: planéta pred hviezdou + graf jasnosti ------------------ */
  if (kind === 'transit') {
    defs += '<radialGradient id="' + uid + 'tr"><stop offset="0%" stop-color="#fffdf0"/>' +
            '<stop offset="60%" stop-color="#ffd97a"/><stop offset="100%" stop-color="#ff9a2b"/></radialGradient>';
    extra += '<circle cx="150" cy="105" r="66" fill="url(#' + uid + 'tr)"/>' +
             '<circle cx="176" cy="92" r="11" fill="#1a1406" opacity=".85"/>' +
             '<path d="M250 175 L286 175 L296 196 L330 196 L340 175 L376 175" fill="none" ' +
             'stroke="#8fd7ff" stroke-width="2.6" stroke-linejoin="round"/>' +
             '<text x="313" y="216" text-anchor="middle" fill="#9fb0d4" font-size="12" ' +
             'font-family="system-ui">hviezda na chvíľu stmavne</text>';
  }

  /* --- kométa s dvomi chvostmi ---------------------------------------- */
  if (kind === 'comet') {
    defs += '<linearGradient id="' + uid + 'ct" x1="0" x2="1">' +
            '<stop offset="0%" stop-color="#bfe9ff" stop-opacity=".85"/>' +
            '<stop offset="100%" stop-color="#bfe9ff" stop-opacity="0"/></linearGradient>' +
            '<linearGradient id="' + uid + 'cd" x1="0" x2="1">' +
            '<stop offset="0%" stop-color="#ffe6bf" stop-opacity=".8"/>' +
            '<stop offset="100%" stop-color="#ffe6bf" stop-opacity="0"/></linearGradient>' +
            '<radialGradient id="' + uid + 'ch"><stop offset="0%" stop-color="#fff"/>' +
            '<stop offset="45%" stop-color="#d8f4ff" stop-opacity=".8"/>' +
            '<stop offset="100%" stop-color="#8fd7ff" stop-opacity="0"/></radialGradient>';
    extra += '<path d="M120 120 L392 62 L392 96 L124 132 Z" fill="url(#' + uid + 'ct)"/>' +
             '<path d="M120 124 Q260 150 388 188 L384 208 Q250 168 118 134 Z" fill="url(#' + uid + 'cd)"/>' +
             '<circle cx="112" cy="124" r="34" fill="url(#' + uid + 'ch)"/>' +
             '<circle cx="112" cy="124" r="6" fill="#fff"/>';
  }

  /* --- meteorický roj: čiary z jedného miesta -------------------------- */
  if (kind === 'meteors') {
    const rv = seededRandom(1200);
    for (let i = 0; i < 160; i++) {
      extra += '<circle cx="' + (rv() * 400).toFixed(1) + '" cy="' + (rv() * 250).toFixed(1) +
               '" r="' + (0.4 + rv() * 1).toFixed(2) + '" fill="#fff" opacity="' +
               (0.2 + rv() * 0.5).toFixed(2) + '"/>';
    }
    for (let i = 0; i < 9; i++) {
      const ang = (-150 + rv() * 120) * Math.PI / 180;
      const r0 = 20 + rv() * 40, len = 40 + rv() * 110;
      const x1 = 90 + Math.cos(ang) * r0, y1 = 40 + Math.sin(ang) * r0;
      const x2 = 90 + Math.cos(ang) * (r0 + len), y2 = 40 + Math.sin(ang) * (r0 + len);
      defs += '<linearGradient id="' + uid + 'm' + i + '" x1="' + x1.toFixed(0) + '" y1="' + y1.toFixed(0) +
              '" x2="' + x2.toFixed(0) + '" y2="' + y2.toFixed(0) + '" gradientUnits="userSpaceOnUse">' +
              '<stop offset="0%" stop-color="#fff" stop-opacity="0"/>' +
              '<stop offset="70%" stop-color="#eaf4ff" stop-opacity=".85"/>' +
              '<stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>';
      extra += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) +
               '" y2="' + y2.toFixed(1) + '" stroke="url(#' + uid + 'm' + i + ')" stroke-width="' +
               (1 + rv() * 1.8).toFixed(1) + '" stroke-linecap="round"/>';
    }
  }

  /* --- obloha nad mestom: žiara a málo hviezd -------------------------- */
  if (kind === 'citysky') {
    const rc = seededRandom(404);
    for (let i = 0; i < 22; i++) {
      extra += '<circle cx="' + (rc() * 400).toFixed(1) + '" cy="' + (rc() * 150).toFixed(1) +
               '" r="' + (0.7 + rc() * 1).toFixed(2) + '" fill="#fff" opacity="' +
               (0.3 + rc() * 0.4).toFixed(2) + '"/>';
    }
    defs += '<linearGradient id="' + uid + 'cg" x1="0" y1="1" x2="0" y2="0">' +
            '<stop offset="0%" stop-color="#ff9a3c" stop-opacity=".75"/>' +
            '<stop offset="60%" stop-color="#ff9a3c" stop-opacity="0"/></linearGradient>';
    extra += '<rect x="0" y="120" width="400" height="130" fill="url(#' + uid + 'cg)"/>';
    /* siluety domov */
    let x = 0;
    while (x < 400) {
      const w = 18 + rc() * 40, h = 16 + rc() * 42;
      extra += '<rect x="' + x.toFixed(0) + '" y="' + (250 - h).toFixed(0) + '" width="' + w.toFixed(0) +
               '" height="' + h.toFixed(0) + '" fill="#05060c"/>';
      for (let w2 = 0; w2 < 3; w2++) {
        if (rc() > .5) extra += '<rect x="' + (x + 4 + w2 * 8).toFixed(0) + '" y="' + (256 - h).toFixed(0) +
                                '" width="4" height="5" fill="#ffd479" opacity=".8"/>';
      }
      x += w + 2;
    }
  }

  /* --- hvezdárenská kupola -------------------------------------------- */
  if (kind === 'dome') {
    const rd = seededRandom(1888);
    for (let i = 0; i < 190; i++) {
      extra += '<circle cx="' + (rd() * 400).toFixed(1) + '" cy="' + (rd() * 190).toFixed(1) +
               '" r="' + (0.4 + rd() * 1.1).toFixed(2) + '" fill="#fff" opacity="' +
               (0.25 + rd() * 0.6).toFixed(2) + '"/>';
    }
    extra += '<path d="M0 250 L400 250 L400 236 Q260 224 200 224 Q140 224 0 238 Z" fill="#05060c"/>' +
             '<g fill="#080a14">' +
             '<path d="M140 232 A60 58 0 0 1 260 232 Z"/>' +
             '<rect x="132" y="230" width="136" height="22"/></g>' +
             '<path d="M196 176 L204 176 L204 232 L196 232 Z" fill="#0f1524"/>' +
             '<path d="M198 178 L202 178 L202 230 L198 230 Z" fill="#4ad8ff" opacity=".28"/>';
  }

  /* --- hlboký pohľad: pole galaxií ------------------------------------- */
  if (kind === 'deepfield') {
    const rf = seededRandom(1995);
    for (let i = 0; i < 120; i++) {
      const x = rf() * 400, y = rf() * 250;
      const t = rf();
      if (t > 0.72) {
        extra += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' +
                 (3 + rf() * 7).toFixed(1) + '" ry="' + (1.2 + rf() * 2.6).toFixed(1) +
                 '" fill="#ffe6bf" opacity="' + (0.3 + rf() * 0.45).toFixed(2) +
                 '" transform="rotate(' + (rf() * 180).toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"/>';
      } else if (t > 0.45) {
        extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' +
                 (1.6 + rf() * 3.4).toFixed(1) + '" fill="#cfd8ff" opacity="' +
                 (0.25 + rf() * 0.5).toFixed(2) + '"/>';
      } else {
        extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' +
                 (0.5 + rf() * 1.1).toFixed(2) + '" fill="#fff" opacity="' +
                 (0.3 + rf() * 0.5).toFixed(2) + '"/>';
      }
    }
  }

  /* --- Mliečna cesta: pás hviezd cez celý obrázok --------------------- */
  if (kind === 'milkyway') {
    const r4 = seededRandom(31415);
    extra += '<g transform="rotate(-14 200 125)">';
    for (let i = 0; i < 900; i++) {
      const x = r4() * 460 - 30;
      const g = (r4() + r4() + r4()) / 3;                 // hustota pri strede pásu
      const y = 125 + (g - 0.5) * 150;
      extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' +
               (0.35 + r4() * 0.9).toFixed(2) + '" fill="#fff5e6" opacity="' +
               (0.25 + r4() * 0.6).toFixed(2) + '"/>';
    }
    // tmavé prachové oblaky v páse
    for (let i = 0; i < 7; i++) {
      extra += '<ellipse cx="' + (r4() * 400).toFixed(0) + '" cy="' + (105 + r4() * 40).toFixed(0) +
               '" rx="' + (24 + r4() * 46).toFixed(0) + '" ry="' + (7 + r4() * 12).toFixed(0) +
               '" fill="#02030a" opacity="' + (0.5 + r4() * 0.4).toFixed(2) + '"/>';
    }
    extra += '</g>';
  }

  /* --- Mesiac s krátermi ---------------------------------------------- */
  if (kind === 'moon') {
    const r5 = seededRandom(1969);
    defs += '<radialGradient id="' + uid + 'm" cx="38%" cy="34%">' +
            '<stop offset="0%" stop-color="#f4f1e8"/><stop offset="70%" stop-color="#c9c4b6"/>' +
            '<stop offset="100%" stop-color="#6d6a62"/></radialGradient>';
    extra += '<circle cx="200" cy="125" r="98" fill="url(#' + uid + 'm)"/>';
    extra += '<g clip-path="circle(98px at 200px 125px)">';
    for (let i = 0; i < 46; i++) {
      const ang = r5() * Math.PI * 2, rad = r5() * 94;
      const x = 200 + Math.cos(ang) * rad, y = 125 + Math.sin(ang) * rad;
      const cr = 2 + r5() * 13;
      extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + cr.toFixed(1) +
               '" fill="#8f8a7e" opacity=".55"/>' +
               '<circle cx="' + (x - cr * .22).toFixed(1) + '" cy="' + (y - cr * .22).toFixed(1) +
               '" r="' + (cr * .8).toFixed(1) + '" fill="#ded9cc" opacity=".35"/>';
    }
    // tmavé „more“
    extra += '<ellipse cx="160" cy="95" rx="42" ry="30" fill="#7c7a74" opacity=".35"/>' +
             '<ellipse cx="235" cy="150" rx="34" ry="24" fill="#7c7a74" opacity=".28"/>';
    extra += '</g>';
  }

  /* --- dvojhviezda: modrá + žltá --------------------------------------- */
  if (kind === 'doublestar') {
    defs += '<radialGradient id="' + uid + 'b"><stop offset="0%" stop-color="#ffffff"/>' +
            '<stop offset="30%" stop-color="#9ec7ff" stop-opacity=".9"/>' +
            '<stop offset="100%" stop-color="#4a7bff" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="' + uid + 'y"><stop offset="0%" stop-color="#fffdf2"/>' +
            '<stop offset="30%" stop-color="#ffd48a" stop-opacity=".9"/>' +
            '<stop offset="100%" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>';
    extra += '<circle cx="150" cy="112" r="52" fill="url(#' + uid + 'b)"/>' +
             '<circle cx="150" cy="112" r="5" fill="#fff"/>' +
             '<circle cx="252" cy="146" r="46" fill="url(#' + uid + 'y)"/>' +
             '<circle cx="252" cy="146" r="4.4" fill="#fff"/>' +
             '<path d="M150 92 L150 132 M130 112 L170 112" stroke="#cfe0ff" stroke-opacity=".5" stroke-width="1"/>' +
             '<path d="M252 129 L252 163 M235 146 L269 146" stroke="#ffe3b8" stroke-opacity=".5" stroke-width="1"/>';
  }

  /* --- supernova: vlákna letiace od stredu ----------------------------- */
  if (kind === 'supernova') {
    /* rozpínajúci sa obal z vlákien – nie hviezdice, ale trhaná škrupina */
    const r6 = seededRandom(1054);
    defs += '<filter id="' + uid + 'sn"><feGaussianBlur stdDeviation="1.2"/></filter>';
    extra += '<g filter="url(#' + uid + 'sn)">';
    for (let i = 0; i < 150; i++) {
      const ang = r6() * Math.PI * 2;
      const shell = 62 + (r6() - 0.5) * 46;            // vlákna sedia v obale
      const len = 10 + r6() * 26;
      const wob = (r6() - 0.5) * 0.5;
      const x1 = 200 + Math.cos(ang) * shell, y1 = 125 + Math.sin(ang) * shell * 0.82;
      const x2 = 200 + Math.cos(ang + wob) * (shell + len), y2 = 125 + Math.sin(ang + wob) * (shell + len) * 0.82;
      const xm = (x1 + x2) / 2 + (r6() - 0.5) * 18, ym = (y1 + y2) / 2 + (r6() - 0.5) * 12;
      const col = r6() > .55 ? '#ffb187' : '#9ef0e0';
      extra += '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Q' + xm.toFixed(1) + ' ' +
               ym.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" fill="none" stroke="' + col +
               '" stroke-width="' + (0.7 + r6() * 1.5).toFixed(2) + '" opacity="' +
               (0.25 + r6() * 0.45).toFixed(2) + '" stroke-linecap="round"/>';
    }
    extra += '</g>';
    extra += '<circle cx="200" cy="125" r="2.6" fill="#eaf4ff" opacity=".9"/>' +
             '<circle cx="200" cy="125" r="11" fill="#cfe4ff" opacity=".12"/>';
  }

  /* --- čierna diera: svetelný prstenec okolo tmy ------------------------ */
  if (kind === 'blackhole') {
    defs += '<filter id="' + uid + 'bh"><feGaussianBlur stdDeviation="7"/></filter>';
    extra += '<g>' +
             '<circle cx="200" cy="125" r="66" fill="none" stroke="#ff9a3c" stroke-width="30" ' +
             'opacity=".55" filter="url(#' + uid + 'bh)"/>' +
             '<circle cx="200" cy="125" r="66" fill="none" stroke="#ffd08a" stroke-width="13" opacity=".75"/>' +
             '<circle cx="200" cy="125" r="52" fill="#020207"/>' +
             '<circle cx="150" cy="104" r="16" fill="#fff0cf" opacity=".35" filter="url(#' + uid + 'bh)"/>' +
             '</g>';
  }

  /* --- neutrónová hviezda / pulzar ------------------------------------- */
  if (kind === 'neutron') {
    defs += '<radialGradient id="' + uid + 'n"><stop offset="0%" stop-color="#ffffff"/>' +
            '<stop offset="40%" stop-color="#bcd8ff" stop-opacity=".8"/>' +
            '<stop offset="100%" stop-color="#4a7bff" stop-opacity="0"/></radialGradient>';
    extra += '<g transform="rotate(-22 200 125)">' +
             '<path d="M200 125 L200 8 L216 20 Z" fill="#8fd7ff" opacity=".35"/>' +
             '<path d="M200 125 L200 242 L184 230 Z" fill="#8fd7ff" opacity=".35"/>' +
             '<circle cx="200" cy="125" r="44" fill="url(#' + uid + 'n)"/>' +
             '<circle cx="200" cy="125" r="4" fill="#fff"/></g>';
  }

  /* --- jedna veľká hviezda podľa farby (modrá / žltá / červená) -------- */
  if (kind.indexOf('star-') === 0) {
    const col = { 'star-blue': ['#dceaff', '#6aa8ff'], 'star-yellow': ['#fff8e0', '#ffc45c'],
                  'star-red': ['#ffdcd2', '#ff6a52'] }[kind];
    defs += '<radialGradient id="' + uid + 's"><stop offset="0%" stop-color="#ffffff"/>' +
            '<stop offset="28%" stop-color="' + col[0] + '"/>' +
            '<stop offset="55%" stop-color="' + col[1] + '" stop-opacity=".55"/>' +
            '<stop offset="100%" stop-color="' + col[1] + '" stop-opacity="0"/></radialGradient>';
    extra += '<circle cx="200" cy="125" r="105" fill="url(#' + uid + 's)"/>' +
             '<circle cx="200" cy="125" r="26" fill="#ffffff" opacity=".95"/>';
  }

  /* --- rotácia oblohy: hviezdy roztočené do oblúčikov (bez EQ režimu) --- */
  if (kind === 'trails' || kind === 'roundstars') {
    // rovnaké rozloženie hviezd v oboch obrázkoch, aby bol rozdiel jasný
    const r2 = seededRandom(20260910);
    const cx = 58, cy = 18;                       // stred otáčania (nebeský pól)
    for (let i = 0; i < 120; i++) {
      const rad = 40 + r2() * 400;
      const ang = (-8 + r2() * 96) * Math.PI / 180;
      const x = cx + Math.cos(ang) * rad, y = cy + Math.sin(ang) * rad;
      if (x < -10 || x > 410 || y < -10 || y > 260) continue;
      const bright = r2();
      const size = 0.7 + bright * 1.5;
      if (kind === 'roundstars') {
        extra += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + size.toFixed(2) +
                 '" fill="#ffffff" opacity="' + (0.55 + bright * 0.45).toFixed(2) + '"/>';
      } else {
        const circ = 2 * Math.PI * rad;
        const arc = rad * 0.30;                   // ~17° oblúčik
        extra += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad.toFixed(1) +
                 '" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-width="' + size.toFixed(2) +
                 '" opacity="' + (0.45 + bright * 0.4).toFixed(2) +
                 '" stroke-dasharray="' + arc.toFixed(1) + ' ' + circ.toFixed(1) +
                 '" stroke-dashoffset="' + (-(ang * rad)).toFixed(1) + '"/>';
      }
    }
  }

  /* --- Polárka: všetko sa točí okolo nej, ona stojí ------------------- */
  if (kind === 'polaris') {
    const r3 = seededRandom(777);
    for (let i = 1; i <= 5; i++) {
      extra += '<circle cx="200" cy="118" r="' + (i * 26) + '" fill="none" stroke="#7fb6ff" ' +
               'stroke-opacity="' + (0.20 - i * 0.025).toFixed(3) + '" stroke-width="1" ' +
               'stroke-dasharray="3 7"/>';
    }
    for (let i = 0; i < 70; i++) {
      const ang = r3() * Math.PI * 2, rad = 26 + r3() * 110;
      extra += '<circle cx="' + (200 + Math.cos(ang) * rad).toFixed(1) + '" cy="' +
               (118 + Math.sin(ang) * rad * .95).toFixed(1) + '" r="' + (0.6 + r3() * 1.1).toFixed(2) +
               '" fill="#eaf1ff" opacity="' + (0.35 + r3() * 0.5).toFixed(2) + '"/>';
    }
    defs += '<radialGradient id="' + uid + 'pol"><stop offset="0%" stop-color="#ffffff"/>' +
            '<stop offset="35%" stop-color="#cfe4ff" stop-opacity=".8"/>' +
            '<stop offset="100%" stop-color="#8ab8ff" stop-opacity="0"/></radialGradient>';
    extra += '<circle cx="200" cy="118" r="26" fill="url(#' + uid + 'pol)"/>' +
             '<circle cx="200" cy="118" r="3.6" fill="#ffffff"/>' +
             '<path d="M200 100 L200 136 M182 118 L218 118" stroke="#ffffff" stroke-opacity=".35" stroke-width="1"/>';
  }

  /* hviezdy v ilustrácii (tieto tri typy si kreslia hviezdy po svojom) */
  let stars = '';
  const ownStars = (kind === 'trails' || kind === 'roundstars' || kind === 'polaris' ||
                    kind === 'milkyway' || kind === 'satellite' || kind === 'meteors' ||
                    kind === 'citysky' || kind === 'dome' || kind === 'deepfield' ||
                    kind === 'spectrum' || kind === 'sun' || kind === 'blurstars' ||
                    kind === 'faintstar' || kind === 'faintnebula' ||
                    kind === 'noisynebula' || kind === 'cleannebula');
  for (let i = 0; !ownStars && i < 90; i++) {
    stars += '<circle cx="' + (rand() * 400).toFixed(1) + '" cy="' + (rand() * 250).toFixed(1) +
             '" r="' + (rand() * 1.1 + 0.25).toFixed(2) + '" fill="#fff" opacity="' +
             (rand() * 0.7 + 0.2).toFixed(2) + '"/>';
  }

  return '<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
         '<defs>' + defs + '</defs>' +
         '<rect width="400" height="250" fill="' + pal.bg + '"/>' +
         '<g filter="url(#' + uid + 'f)">' + body + '</g>' +
         stars + extra + '</svg>';   /* hviezdy sú v pozadí, motív nad nimi */
}

function seededRandom(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/* =========================== 4) UI POMÔCKY =============================== */

function el(tag, className, html) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (html != null) n.innerHTML = html;
  return n;
}

/**
 * Vytvorí blok s obrázkom: SVG ilustrácia + fotografia (ak sa načíta) + credit.
 * opts: { className, credit:false, label:'…' }
 */
function photoEl(imageId, opts) {
  opts = opts || {};
  const meta = IMAGES[imageId];
  const fig = el('figure', 'photo' + (opts.className ? ' ' + opts.className : ''));
  if (!meta) { fig.innerHTML = spaceArt('emission'); return fig; }

  fig.innerHTML = spaceArt(meta.art || 'emission');

  const img = el('img');
  img.alt = meta.alt || meta.title || '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.referrerPolicy = 'no-referrer';

  // poradie zdrojov: lokálny súbor (ak je zapnutý) → oficiálny odkaz → ilustrácia
  const sources = [];
  if (IMAGE_CONFIG.preferLocal && meta.local) sources.push(meta.local);
  if (meta.remote) sources.push(meta.remote);
  let i = 0;
  img.addEventListener('error', function () { next(); });
  img.addEventListener('load', function () { fig.classList.add('has-photo'); });
  function next() { if (i < sources.length) { img.src = sources[i++]; } }
  next();
  fig.appendChild(img);

  if (opts.label) fig.appendChild(el('div', 'photo__label', opts.label));

  if (opts.credit !== false) {
    // credit sa zobrazí len vtedy, keď sa naozaj načítala fotografia
    if (meta.credit || meta.source) {
      const c = el('figcaption', 'photo__credit');
      c.innerHTML = (meta.source
        ? '<a href="' + meta.source + '" target="_blank" rel="noopener">' + meta.credit + '</a>'
        : meta.credit) + (meta.license ? ' · ' + meta.license : '');
      fig.appendChild(c);
    }
    // keď fotografia nie je dostupná, povieme na rovinu, že ide o ilustráciu
    fig.appendChild(el('div', 'photo__illu', 'vlastná ilustrácia'));
  }
  return fig;
}

function toast(text) {
  const box = document.getElementById('toasts');
  const t = el('div', 'toast', text);
  box.appendChild(t);
  setTimeout(function () {
    t.classList.add('is-out');
    setTimeout(function () { t.remove(); }, 400);
  }, 1700);
}

/* -------------------------- JEMNÉ ZVUKY ---------------------------------
   Žiadne zvukové súbory – tóny sa skladajú priamo vo Web Audio API, takže
   appka zostáva jednosúborová a funguje aj offline. Zvuky sú VYPNUTÉ,
   kým si ich dieťa samo nezapne (state.sound).                          */
let audioCtx = null;

function sfx(kind) {
  if (!state.sound) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    /* [frekvencia v Hz, kedy začne (s), ako dlho (s)] */
    const notes = {
      xp:     [[880, 0, 0.10]],                                  // krátke cinknutie
      ok:     [[660, 0, 0.09], [990, 0.08, 0.13]],               // dva tóny nahor
      no:     [[300, 0, 0.16]],                                  // jeden nízky
      badge:  [[523, 0, 0.12], [659, 0.10, 0.12], [784, 0.20, 0.22]],  // fanfára
      goal:   [[784, 0, 0.10], [1047, 0.09, 0.18]]
    }[kind];
    if (!notes) return;

    notes.forEach(function (n) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = n[0];
      const t0 = audioCtx.currentTime + n[1];
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.09, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + n[2]);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(t0); osc.stop(t0 + n[2] + 0.02);
    });
  } catch (e) { /* zvuk je bonus – keď nefunguje, nič sa nedeje */ }
}

function soundToggle() {
  const b = el('button', 'btn btn--ghost btn--small',
    state.sound ? '🔔 Zvuky sú zapnuté' : '🔕 Zvuky sú vypnuté');
  b.addEventListener('click', function () {
    state.sound = !state.sound;
    saveState();
    if (state.sound) sfx('ok');
    toast(state.sound ? '🔔 Zvuky zapnuté' : '🔕 Zvuky vypnuté');
    go('home');
  });
  return b;
}

function renderXp(animate) {
  const v = document.getElementById('topbarXpValue');
  const chip = document.getElementById('topbarXp');
  if (!v) return;
  const from = parseInt(v.textContent.replace(/\s/g, ''), 10) || 0;
  const to = state.xp;
  if (animate && from !== to) {
    chip.classList.remove('pop'); void chip.offsetWidth; chip.classList.add('pop');
    countUp(v, from, to, 700);
  } else {
    v.textContent = to;
  }
}
function countUp(node, from, to, ms) {
  const start = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = Math.round(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function setProgress(ratio) {
  const bar = document.getElementById('progress');
  const fill = document.getElementById('progressFill');
  if (ratio == null) { bar.hidden = true; return; }
  bar.hidden = false;
  fill.style.width = Math.round(ratio * 100) + '%';
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* Veľké tlačidlo "ďalej" */
/**
 * Rozbaliteľná krabička „Chcem vedieť viac“.
 * @param {string[]} lines – odstavce navyše
 * @param {string} label   – nadpis rozbalenia
 */
function moreBox(lines, label) {
  const det = document.createElement('details');
  det.className = 'more';
  det.innerHTML =
    '<summary class="more__sum">🤔 ' + (label || 'Chcem vedieť viac') + '</summary>' +
    '<div class="more__body">' + lines.map(function (t) {
      return '<p>' + t + '</p>';
    }).join('') + '</div>';
  return det;
}

function nextButton(label, onClick, cls) {
  const b = el('button', 'btn btn--wide' + (cls ? ' ' + cls : ''), label);
  b.addEventListener('click', onClick);
  return b;
}

/* =========================== 5) NAVIGÁCIA ================================ */

const app = document.getElementById('app');
let route = { name: 'home' };
let lesson = null;        // aktuálna lekcia
let stepIndex = 0;        // index kroku v lekcii

function go(name, data) {
  route = Object.assign({ name: name }, data || {});
  render();
  scrollTop();
}

function render() {
  app.innerHTML = '';
  const back = document.getElementById('btnBack');
  const title = document.getElementById('topbarTitle');
  renderXp(false);

  if (route.name === 'home') {
    back.hidden = true; title.textContent = 'VESMÍRNA AKADÉMIA';
    setProgress(null);
    app.appendChild(screenHome());
  } else if (route.name === 'lesson') {
    back.hidden = false; title.textContent = lesson.icon + ' ' + lesson.title;
    setProgress((stepIndex) / lesson.steps.length);
    app.appendChild(screenLessonStep());
  } else if (route.name === 'map') {
    back.hidden = false; title.textContent = 'VESMÍRNA MAPA';
    setProgress(null);
    app.appendChild(screenMap());
  } else if (route.name === 'terms') {
    back.hidden = false; title.textContent = 'SLOVNÍČEK';
    setProgress(null);
    app.appendChild(screenTerms());
  } else if (route.name === 'facts') {
    back.hidden = false; title.textContent = 'VIEŠ ŽE?';
    setProgress(null);
    app.appendChild(screenFacts());
  } else if (route.name === 'collection') {
    back.hidden = false; title.textContent = 'MOJA VESMÍRNA ZBIERKA';
    setProgress(null);
    app.appendChild(screenCollection());
  } else if (route.name === 'object') {
    back.hidden = false; title.textContent = 'OBJAVENÝ OBJEKT';
    setProgress(null);
    app.appendChild(screenObject(route.objectId));
  } else if (route.name === 'sources') {
    back.hidden = false; title.textContent = 'ZDROJE';
    setProgress(null);
    app.appendChild(screenSources());
  } else if (route.name === 'journal') {
    back.hidden = false; title.textContent = 'POZOROVACÍ DENNÍK';
    setProgress(null);
    app.appendChild(screenJournal());
  } else if (route.name === 'training') {
    back.hidden = false; title.textContent = 'HVIEZDNY TRÉNING';
    setProgress(null);
    app.appendChild(screenTraining());
  } else if (route.name === 'parent') {
    back.hidden = false; title.textContent = 'PRE RODIČA';
    setProgress(null);
    app.appendChild(screenParent());
  } else if (route.name === 'certificate') {
    back.hidden = false; title.textContent = 'DIPLOM';
    setProgress(null);
    app.appendChild(screenCertificate());
  }
}

document.getElementById('btnBack').addEventListener('click', function () {
  if (route.name === 'object') { go('collection'); return; }
  go('home');
});

/* =========================== 6) DOMOVSKÁ OBRAZOVKA ======================= */

function screenHome() {
  const s = el('div', 'screen stack');

  /* hlavička */
  const hero = el('div', 'hero');
  hero.innerHTML =
    '<div class="hero__rocket">🚀</div>' +
    '<h1 class="h-hero">VESMÍRNA AKADÉMIA</h1>' +
    '<p class="sub">' + (state.name
      ? 'Vitaj späť, ' + state.name + '. Objavuj. Pozoruj. Fotografuj.'
      : 'Objavuj. Pozoruj. Fotografuj.') + '</p>';
  s.appendChild(hero);

  /* meno – zapíše sa raz a je len v tomto prehliadači */
  if (!state.name) s.appendChild(nameBox());

  /* štatistiky */
  const lv = currentLevel();
  const discoveredCount = Object.keys(state.discovered).length;
  const stats = el('div', 'stats');

  const nextXp = lv.next ? lv.next.xp : lv.level.xp;
  const prevXp = lv.level.xp;
  const ratio = lv.next ? Math.min(1, (state.xp - prevXp) / Math.max(1, nextXp - prevXp)) : 1;

  const s1 = el('div', 'panel stat');
  s1.innerHTML =
    '<div class="stat__label">⭐ Moja úroveň</div>' +
    '<div class="stat__value">' + lv.level.name + '</div>' +
    '<div class="stat__value" style="font-size:15px;color:var(--accent)">' + state.xp + ' XP</div>' +
    '<div class="levelbar"><span style="width:' + (ratio * 100) + '%"></span></div>' +
    '<div class="tile__meta" style="margin-top:8px">' +
      (lv.next ? 'Ďalšia úroveň: ' + lv.next.name + ' (' + lv.next.xp + ' XP)' : 'Najvyššia úroveň! 🎉') +
    '</div>';

  const s2 = el('div', 'panel stat');
  s2.innerHTML =
    '<div class="stat__label">🔭 Objavené objekty</div>' +
    '<div class="stat__value" style="font-size:40px">' + discoveredCount + '</div>' +
    '<div class="tile__meta">' + (state.badges.length ? 'Odznaky: ' + state.badges.length : 'Zatiaľ žiadny odznak') + '</div>';

  stats.appendChild(s1); stats.appendChild(s2);
  s.appendChild(stats);

  /* hlavné tlačidlo – vždy nasledujúca nedokončená lekcia */
  const L = nextLesson();
  const done = isLessonDone(L.id);
  s.appendChild(nextButton(
    allLessonsDone() ? '🔁 ZOPAKOVAŤ VÝPRAVU' : '🚀 POKRAČOVAŤ V OBJAVOVANÍ',
    function () { startLesson(L.id); }));

  /* dnešná výprava */
  const card = el('div', 'panel mission-card' + (done ? ' is-done' : ''));
  card.innerHTML =
    '<span class="mission-card__badge">' + (done ? '✅ Splnené' : '🔓 Dnešná výprava') + '</span>' +
    '<div class="mission-card__title">' + L.icon + ' ' + L.title + '</div>' +
    '<p class="lead">„' + L.teaser + '“</p>' +
    '<p class="tile__meta">⏱️ ' + L.minutes + ' · 🧠 mini test na konci' +
      (done && state.lessons[L.id].score != null
        ? ' · posledný výsledok ' + state.lessons[L.id].score + '/' + state.lessons[L.id].total : '') +
    '</p>';
  const cardBtn = el('button', 'btn btn--ghost btn--small', done ? 'Otvoriť znova' : 'Začať výpravu →');
  cardBtn.style.marginTop = '14px';
  cardBtn.addEventListener('click', function () { startLesson(L.id); });
  card.appendChild(cardBtn);
  s.appendChild(card);

  /* čo je práve teraz na oblohe */
  const tonight = tonightCard();
  if (tonight) s.appendChild(tonight);

  /* dlaždice */
  const factCount = Object.keys(state.facts).length;
  const factTotal = Object.keys(FACTS).length;
  const doneCount = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;

  const tiles = el('div', 'tiles');
  tiles.appendChild(tile('🌌', 'Vesmírna mapa',
    doneCount + ' z ' + LESSONS.length + ' lekcií hotových', function () { go('map'); }));
  tiles.appendChild(tile('💡', 'Vieš že?',
    factCount + ' z ' + factTotal + ' zaujímavostí', function () { go('facts'); }));
  if (typeof TERMS !== 'undefined') {
    tiles.appendChild(tile('📖', 'Slovníček',
      Object.keys(state.terms).length + ' z ' + Object.keys(TERMS).length + ' pojmov',
      function () { go('terms'); }));
  }
  tiles.appendChild(tile('📚', 'Moja vesmírna zbierka',
    discoveredCount + ' objavených objektov', function () { go('collection'); }));
  const journalCount = journalEntries().length;
  tiles.appendChild(tile('📓', 'Pozorovací denník',
    journalCount ? journalCount + ' zápisov z nocí' : 'zapíš si, čo si videl',
    function () { go('journal'); }));
  if (doneCount >= 3) {
    tiles.appendChild(tile('🎯', 'Hviezdny tréning',
      state.bestTraining ? 'najlepší výsledok ' + state.bestTraining + '/10' : 'zmiešaný test zo všetkého',
      function () { go('training'); }));
  }
  if (allLessonsDone()) {
    tiles.appendChild(tile('🏆', 'Môj diplom', 'všetkých ' + LESSONS.length + ' lekcií hotových',
      function () { go('certificate'); }));
  }
  tiles.appendChild(tile('🔗', 'Zdroje', 'NASA · ESA · ESO · DwarfLab', function () { go('sources'); }));
  tiles.appendChild(tile('📊', 'Pre rodiča', 'prehľad pokroku', function () { go('parent'); }));
  s.appendChild(tiles);

  const switches = el('div', 'homeswitches');
  switches.appendChild(nightToggle());
  switches.appendChild(soundToggle());
  s.appendChild(switches);
  return s;
}

/* --------------------- 6a) ČO JE DNES V NOCI NA OBLOHE -------------------
   Odporúčanie podľa mesiaca (data/objects.js → SEASON_TIPS). Nie je to
   výpočet polohy – presné časy je vždy treba overiť v Stellariu.        */
function tonightCard() {
  if (typeof SEASON_TIPS === 'undefined') return null;
  const now = new Date();
  const tip = SEASON_TIPS[now.getMonth()];
  if (!tip) return null;
  const months = ['januári', 'februári', 'marci', 'apríli', 'máji', 'júni',
                  'júli', 'auguste', 'septembri', 'októbri', 'novembri', 'decembri'];

  const card = el('div', 'panel tonight');
  card.appendChild(el('div', 'stat__label', '🌠 ČO JE V ' + months[now.getMonth()].toUpperCase() + ' NA OBLOHE'));
  card.appendChild(el('p', 'lead', tip.note));

  const row = el('div', 'tonight__row');
  tip.objects.forEach(function (id) {
    const o = getObject(id);
    if (!o) return;
    const found = !!state.discovered[id];
    const b = el('button', 'tonight__obj' + (found ? ' is-found' : ''));
    b.innerHTML =
      '<span class="tonight__icon">' + OBJECT_TYPES[o.type].icon + '</span>' +
      '<span class="tonight__name">' + o.name + '</span>' +
      '<span class="tonight__meta">' + (found ? '✅ už máš' : o.designation) + '</span>';
    b.addEventListener('click', function () {
      if (found) { go('object', { objectId: id }); }
      else { toast('🔭 ' + o.stellarium); }
    });
    row.appendChild(b);
  });
  card.appendChild(row);
  card.appendChild(el('p', 'tile__meta',
    'Odporúčanie pre Slovensko (48° s. š.), večerná obloha. Presný čas si vždy over v Stellariu.'));
  return card;
}

/* -------------------- 6b) MENO MLADÉHO ASTRONAUTA ----------------------- */
function nameBox() {
  const box = el('div', 'panel stack panel--tight');
  box.appendChild(el('div', 'stat__label', '👋 Ako ti máme hovoriť?'));
  const row = el('div', 'namerow');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'nameinput';
  input.placeholder = 'tvoje meno';
  input.maxLength = 20;
  const ok = el('button', 'btn btn--small', 'ULOŽIŤ');
  function save() {
    const v = input.value.trim();
    if (!v) return;
    state.name = v;
    saveState();
    toast('Vitaj v akadémii, ' + v + '!');
    go('home');
  }
  ok.addEventListener('click', save);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') save(); });
  row.appendChild(input); row.appendChild(ok);
  box.appendChild(row);
  return box;
}

/* ---------------------- 6c) NOČNÝ (ČERVENÝ) REŽIM ----------------------- */
/* Pri pozorovaní sa oči prispôsobia tme asi po 20 minútach. Biele svetlo
   z displeja to zničí za sekundu, červené takmer nie – preto nočný režim. */
function applyNightMode() {
  document.body.classList.toggle('night', !!state.night);
}
function nightToggle() {
  const b = el('button', 'btn btn--ghost btn--small',
    state.night ? '☀️ Vypnúť nočný režim' : '🔴 Nočný režim (pri ďalekohľade)');
  b.addEventListener('click', function () {
    state.night = !state.night;
    saveState();
    applyNightMode();
    toast(state.night ? '🔴 Nočný režim zapnutý' : 'Nočný režim vypnutý');
    go('home');
  });
  return b;
}

function tile(icon, name, meta, onClick) {
  const t = el('button', 'tile');
  t.innerHTML = '<span class="tile__icon">' + icon + '</span>' +
                '<span class="tile__name">' + name + '</span>' +
                '<span class="tile__meta">' + meta + '</span>';
  t.addEventListener('click', onClick);
  return t;
}

function isLessonDone(id) { return !!(state.lessons[id] && state.lessons[id].completed); }
function allLessonsDone() { return LESSONS.every(function (l) { return isLessonDone(l.id); }); }
function nextLesson() {
  for (let i = 0; i < LESSONS.length; i++) if (!isLessonDone(LESSONS[i].id)) return LESSONS[i];
  return LESSONS[LESSONS.length - 1];
}

/* ------------------------- VESMÍRNA MAPA -------------------------------- */
function screenMap() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '🌌 VESMÍRNA MAPA'));
  s.appendChild(el('p', 'sub', 'Tvoja cesta akadémiou. Hore to, čo už vieš – dole to, čo ťa ešte čaká.'));

  const lv = currentLevel();
  s.appendChild(el('div', 'panel panel--tight',
    '⭐ <strong>' + lv.level.name + '</strong> · ' + state.xp + ' XP' +
    (lv.next ? ' · do úrovne <strong>' + lv.next.name + '</strong> ti chýba ' +
      (lv.next.xp - state.xp) + ' XP' : ' · najvyššia úroveň 🎉')));

  const path = el('div', 'path');
  LESSONS.forEach(function (l, i) {
    const done = isLessonDone(l.id);
    const b = el('button', 'path__item' + (done ? ' is-done' : ' is-open'));
    const badge = BADGES[l.badge];
    b.innerHTML =
      '<div class="path__dot">' + (done ? '✅' : l.icon) + '</div>' +
      '<div class="path__body">' +
        '<div class="path__title">' + (i + 1) + '. ' + l.title + '</div>' +
        '<div class="path__teaser">' + l.teaser + '</div>' +
        '<div class="path__meta">' + (done
          ? '✅ hotové · test ' + state.lessons[l.id].score + '/' + state.lessons[l.id].total +
            (badge ? ' · odznak ' + badge.icon + ' ' + badge.name : '')
          : '⏱️ ' + l.minutes + (badge ? ' · získaš odznak ' + badge.icon + ' ' + badge.name : '')) +
        '</div>' +
      '</div>' +
      '<div class="path__go">' + (done ? '🔁' : '▶') + '</div>';
    b.addEventListener('click', function () { startLesson(l.id); });
    path.appendChild(b);
  });
  s.appendChild(path);

  if (typeof UPCOMING !== 'undefined' && UPCOMING.length) {
    s.appendChild(el('h3', null, '🔜 ČO SA CHYSTÁ'));
    const grid = el('div', 'tiles');
    UPCOMING.forEach(function (u) {
      const t = el('div', 'tile tile--locked');
      t.innerHTML = '<span class="tile__icon">' + u.icon + '</span>' +
                    '<span class="tile__name">' + u.title + '</span>' +
                    '<span class="tile__meta">' + u.teaser + '</span>';
      grid.appendChild(t);
    });
    s.appendChild(grid);
  }

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* --------------------------- SLOVNÍČEK ---------------------------------- */
function screenTerms() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '📖 SLOVNÍČEK'));
  const ids = Object.keys(TERMS);
  const got = ids.filter(function (id) { return state.terms[id]; });
  s.appendChild(el('p', 'sub', 'Všetky pojmy z akadémie na jednom mieste. Zatiaľ vysvetlených: ' +
    got.length + ' z ' + ids.length + '. Ostatné sa odomknú v lekciách.'));

  /* filtrovanie podľa skupiny */
  const groups = {};
  ids.forEach(function (id) { groups[TERMS[id].group || 'ostatné'] = true; });
  const groupNames = Object.keys(groups);
  let active = 'všetko';
  const bar = el('div', 'chips');
  const body = el('div');

  function render() {
    body.innerHTML = '';
    const list = el('div', 'terms terms--grid');
    ids.forEach(function (id) {
      const t = TERMS[id];
      if (active !== 'všetko' && (t.group || 'ostatné') !== active) return;
      if (state.terms[id]) {
        list.appendChild(termCard(id));
      } else {
        const c = el('div', 'panel term term--locked');
        c.appendChild(el('div', 'term__head',
          '<span class="term__icon">🔒</span><span><span class="term__name">' + t.name +
          '</span><span class="term__short">odomkneš v lekcii</span></span>'));
        list.appendChild(c);
      }
    });
    body.appendChild(list);
  }

  ['všetko'].concat(groupNames).forEach(function (g) {
    const b = el('button', 'chip' + (g === 'všetko' ? ' is-on' : ''), g);
    b.addEventListener('click', function () {
      active = g;
      Array.prototype.forEach.call(bar.children, function (n) { n.classList.remove('is-on'); });
      b.classList.add('is-on');
      render();
    });
    bar.appendChild(b);
  });
  s.appendChild(bar);
  render();
  s.appendChild(body);

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* ---------------------- ZBIERKA ZAUJÍMAVOSTÍ ---------------------------- */
function screenFacts() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '💡 VIEŠ ŽE?'));
  const ids = Object.keys(FACTS);
  const got = ids.filter(function (id) { return state.facts[id]; });
  s.appendChild(el('p', 'sub', 'Zozbierané: ' + got.length + ' z ' + ids.length +
    '. Ďalšie sa odomknú v lekciách.'));

  const grid = el('div', 'factgrid');
  ids.forEach(function (id, i) {
    const f = FACTS[id];
    const has = !!state.facts[id];
    const c = el('div', 'panel factmini' + (has ? '' : ' is-locked') + ' screen delay-' + Math.min(4, i + 1));
    c.innerHTML = has
      ? '<div class="factmini__icon">' + f.icon + '</div>' +
        '<div class="factmini__title">' + f.title + '</div>' +
        '<p class="factmini__text">' + f.text + '</p>' +
        (f.source ? '<a class="factcard__src" href="' + f.source + '" target="_blank" rel="noopener">' +
          (f.sourceLabel || 'zdroj') + ' ↗</a>' : '')
      : '<div class="factmini__icon">🔒</div>' +
        '<div class="factmini__title">Ešte neodomknuté</div>' +
        '<p class="factmini__text">Nájdeš to v jednej z lekcií.</p>';
    grid.appendChild(c);
  });
  s.appendChild(grid);

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* =========================== 7) LEKCIA ================================== */

function startLesson(id) {
  lesson = LESSONS.filter(function (l) { return l.id === id; })[0];

  /* Automaticky vkladané kroky odstránime, aby sa pri opakovanom spustení
     lekcie nezdvojovali. Všetko ostatné zostáva presne tak, ako je v dátach. */
  lesson.steps = lesson.steps.filter(function (s) {
    return s.type !== 'basics' && s.type !== 'result' && s.type !== 'warmup';
  });

  /* Krok „📖 ZÁKLADY“ sa vkladá automaticky hneď za hádanku – v dátach lekcie
     stačí uviesť pole basics: ['expozicia', 'gain', …] (viď data/terms.js). */
  if (lesson.basics && lesson.basics.length && typeof TERMS !== 'undefined') {
    const after = (lesson.steps[0] && lesson.steps[0].type === 'guess') ? 1 : 0;
    lesson.steps.splice(after, 0, { type: 'basics', terms: lesson.basics, xp: 10 });
  }

  /* Krok „🔁 ROZCVIČKA“ – len ak má dieťa čo opakovať z iných lekcií. */
  const warmItems = warmupQuestions(id, 3);
  if (warmItems.length >= 2) {
    lesson.steps.unshift({ type: 'warmup', items: warmItems, xp: 15 });
  }

  stepIndex = 0;
  quiz = null;
  warm = null;
  go('lesson');
}

function nextStep() {
  if (stepIndex < lesson.steps.length - 1) {
    stepIndex++;
    go('lesson');
  } else {
    go('home');
  }
}

/* Register vykresľovačov krokov – nový typ kroku = nová funkcia tu. */
const STEP_RENDERERS = {
  guess: stepGuess,
  basics: stepBasics,
  info: stepInfo,
  cards: stepCards,
  pick: stepPick,
  wow: stepWow,
  compare: stepCompare,
  howto: stepHowto,
  sim: stepSim,
  fact: stepFact,
  mission: stepMission,
  warmup: stepWarmup,
  quiz: stepQuiz,
  result: stepResult
};

function screenLessonStep() {
  const step = lesson.steps[stepIndex];
  const fn = STEP_RENDERERS[step.type];
  const wrap = el('div', 'screen stack');
  if (!fn) { wrap.appendChild(el('p', null, 'Neznámy typ kroku: ' + step.type)); return wrap; }
  fn(step, wrap);
  return wrap;
}

/* --------------------------- 7a) HÁDANKA -------------------------------- */
function stepGuess(step, wrap) {
  wrap.appendChild(photoEl(step.image, { className: 'photo--tall' }));
  wrap.appendChild(el('h2', 'h-step center', step.question));

  const answers = el('div', 'answers answers--2');
  const feedback = el('div');
  let solved = false;

  step.options.forEach(function (opt) {
    const b = el('button', 'answer');
    b.innerHTML = '<span class="answer__icon">' + opt.icon + '</span><span>' + opt.label + '</span>';
    b.addEventListener('click', function () {
      if (solved) return;
      if (opt.id === step.correct) {
        solved = true;
        b.classList.add('is-correct', 'is-locked');
        Array.prototype.forEach.call(answers.children, function (n) {
          n.classList.add('is-locked');
          if (n !== b) n.classList.add('is-dim');
        });
        addXp(step.xp || 10, lesson.id + ':guess');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--ok');
        f.innerHTML = '<div class="feedback__title">' + step.successTitle + '</div><div>' + step.successText + '</div>';
        feedback.appendChild(f);
        feedback.appendChild(nextButton('POKRAČOVAŤ →', nextStep));
      } else {
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--no');
        f.innerHTML = '<div class="feedback__title">🤔 Skús ešte raz</div><div>' + step.retryText + '</div>';
        feedback.appendChild(f);
      }
    });
    answers.appendChild(b);
  });

  wrap.appendChild(answers);
  wrap.appendChild(feedback);
}

/* ------------------------- 7a2) ZÁKLADY (slovníček) --------------------- */
/* Karta pojmu: ikona + názov + jedna veta. Ak má pojem "compare",
   zobrazia sa dva obrázky vedľa seba (napr. málo vs. veľa).            */
function termCard(id, opts) {
  opts = opts || {};
  const t = TERMS[id];
  if (!t) return el('div');
  const card = el('div', 'panel term' + (opts.className ? ' ' + opts.className : ''));
  card.appendChild(el('div', 'term__head',
    '<span class="term__icon">' + t.icon + '</span>' +
    '<span><span class="term__name">' + t.name + '</span>' +
    (t.short ? '<span class="term__short">' + t.short + '</span>' : '') + '</span>'));

  if (t.compare) {
    const row = el('div', 'termcmp');
    [t.compare.left, t.compare.right].forEach(function (side) {
      const col = el('div', 'termcmp__col');
      col.appendChild(el('div', 'termcmp__label', side.label));
      col.appendChild(photoEl(side.image, { credit: false, className: 'photo--mini' }));
      col.appendChild(el('div', 'termcmp__note', side.note));
      row.appendChild(col);
    });
    card.appendChild(row);
  } else if (t.image) {
    card.appendChild(photoEl(t.image, { credit: false, className: 'photo--mini' }));
  }

  card.appendChild(el('p', 'term__text', t.text));
  if (t.warn) card.appendChild(el('p', 'term__warn', '⚠️ ' + t.warn));
  /* Nepovinné hlbšie vysvetlenie – pre toho, kto chce vedieť presne prečo. */
  if (t.deep) card.appendChild(moreBox([t.deep], 'Prečo to tak je'));
  return card;
}

function stepBasics(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', '📖 ZÁKLADY'));
  wrap.appendChild(el('p', 'sub center',
    'Slová, ktoré budeš v tejto lekcii potrebovať. Prečítaj si ich – potom už bude všetko jasné.'));

  let noveNove = 0;
  const list = el('div', 'terms');
  step.terms.forEach(function (id, i) {
    if (!TERMS[id]) return;
    if (unlockTerm(id)) noveNove++;
    list.appendChild(termCard(id, { className: 'screen delay-' + Math.min(4, i + 1) }));
  });
  wrap.appendChild(list);

  if (noveNove) {
    wrap.appendChild(el('p', 'sub center',
      '📖 ' + noveNove + ' ' + (noveNove === 1 ? 'nový pojem sa uložil' : 'nových pojmov sa uložilo') +
      ' do tvojho slovníčka.'));
  }
  wrap.appendChild(nextButton('ROZUMIEM, IDEME →', function () {
    addXp(step.xp || 10, lesson.id + ':basics');
    nextStep();
  }));
}

/* --------------------------- 7b) INFO ----------------------------------- */
function stepInfo(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', step.title));
  wrap.appendChild(photoEl(step.image, { className: 'photo--tall' }));

  const box = el('div', 'panel stack');
  step.lines.forEach(function (line, i) {
    const p = el('p', 'lead screen delay-' + Math.min(4, i + 1), line);
    p.style.margin = '0';
    box.appendChild(p);
  });
  if (step.diagram === 'nebula-cycle') box.appendChild(nebulaCycleDiagram());
  if (step.diagram === 'sky-rotation') box.appendChild(skyRotationDiagram());
  wrap.appendChild(box);

  /* Nepovinné rozšírenie: „Chcem vedieť viac“ – kto chce, dozvie sa detail;
     kto nechce, nie je zaťažený dlhým textom. */
  if (step.more && step.more.length) wrap.appendChild(moreBox(step.more));

  wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', nextStep));
}

/* Jednoduchá animovaná ilustrácia kolobehu: oblak → hviezda → hmlovina */
function nebulaCycleDiagram() {
  const d = el('div', 'cycle');
  d.innerHTML =
    '<div class="cycle__node"><span>☁️</span><small>oblak plynu<br>a prachu</small></div>' +
    '<div class="cycle__arrow"></div>' +
    '<div class="cycle__node"><span>⭐</span><small>rodí sa<br>hviezda</small></div>' +
    '<div class="cycle__arrow"></div>' +
    '<div class="cycle__node"><span>💀</span><small>hviezda zomrie<br>a vznikne hmlovina</small></div>';
  return d;
}

/* Animovaná ilustrácia: celá obloha sa točí okolo nebeského pólu */
function skyRotationDiagram() {
  const d = el('div', 'skyrot');
  const r = seededRandom(2026);
  let dots = '';
  for (let i = 0; i < 46; i++) {
    const ang = r() * Math.PI * 2;
    const rad = 12 + r() * 46;                    // v procentách polomeru
    const x = 50 + Math.cos(ang) * rad;
    const y = 50 + Math.sin(ang) * rad;
    dots += '<span class="skyrot__star" style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) +
            '%;width:' + (1.5 + r() * 2.5).toFixed(1) + 'px;height:' + (1.5 + r() * 2.5).toFixed(1) +
            'px;opacity:' + (0.35 + r() * 0.6).toFixed(2) + '"></span>';
  }
  d.innerHTML =
    '<div class="skyrot__dome">' +
      '<div class="skyrot__spin">' + dots + '</div>' +
      '<div class="skyrot__pole">⭐</div>' +
    '</div>' +
    '<p class="skyrot__caption">Obloha sa točí okolo jedného bodu – <strong>nebeského pólu</strong>. ' +
    'Hneď pri ňom stojí Polárka. Rýchlosť: 15° za hodinu.</p>';
  return d;
}

/* --------------------------- 7c) KARTY TYPOV ---------------------------- */
function stepCards(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', step.title));
  wrap.appendChild(el('p', 'sub center', step.subtitle));

  /* karty sa dajú zadať dvomi spôsobmi:
     kinds: ['emission', …]  → vezmú sa z NEBULA_KINDS
     cards: [{icon,name,short,text,image,exampleLabel}, …] → priamo v lekcii   */
  const items = step.cards
    ? step.cards
    : step.kinds.map(function (id) { return NEBULA_KINDS[id]; });

  const grid = el('div', 'kinds' + (items.length <= 2 ? ' kinds--wide' : ''));
  let seen = 0;
  const total = items.length;
  const cta = nextButton(step.cta || 'POKRAČOVAŤ →', nextStep);
  cta.disabled = true;
  cta.style.opacity = '.45';
  const hintText = 'Otvor všetky karty 👆 ';
  const hint = el('p', 'sub center pulse', hintText + '(0/' + total + ')');

  items.forEach(function (k, idx) {
    const card = el('button', 'kind screen delay-' + Math.min(4, idx + 1));
    const inner = el('div', 'kind__inner');

    const front = el('div', 'kind__face kind__face--front');
    front.appendChild(photoEl(k.image, { credit: false, className: 'photo--fill' }));
    front.appendChild(el('div', 'kind__caption',
      '<div class="kind__icon">' + k.icon + '</div>' +
      '<div class="kind__name">' + k.name + '</div>' +
      '<div class="kind__short">' + k.short + '</div>' +
      '<div class="kind__flip">Klikni pre viac</div>'));

    const back = el('div', 'kind__face kind__face--back');
    back.innerHTML =
      '<div class="kind__icon">' + k.icon + '</div>' +
      '<div class="kind__name" style="margin:6px 0 10px">' + k.name + '</div>' +
      '<div class="kind__text">' + k.text + '</div>' +
      '<div class="kind__flip">' + (k.exampleLabel
        ? k.exampleLabel
        : 'Príklad: ' + (IMAGES[k.image] ? IMAGES[k.image].title : '')) + '</div>';

    inner.appendChild(front); inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
      if (!card.classList.contains('is-seen')) {
        card.classList.add('is-seen');
        seen++;
        hint.textContent = hintText + '(' + seen + '/' + total + ')';
        if (seen === total) {
          hint.textContent = '✅ Máš to! Ideme ďalej.';
          hint.classList.remove('pulse');
          cta.disabled = false;
          cta.style.opacity = '1';
          addXp(step.xp || 15, lesson.id + ':cards');
        }
      }
    });

    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  wrap.appendChild(hint);
  wrap.appendChild(cta);
}

/* --------------------------- 7d) VYBER OBRÁZOK -------------------------- */
function stepPick(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', step.title));
  wrap.appendChild(el('p', 'lead center', step.prompt));

  const grid = el('div', 'picks');
  const feedback = el('div');
  let solved = false;
  const letters = ['A', 'B', 'C', 'D'];

  step.options.forEach(function (opt, i) {
    const b = el('button', 'pick');
    b.appendChild(el('span', 'pick__tag', letters[i]));
    b.appendChild(photoEl(opt.image, { credit: false }));
    b.addEventListener('click', function () {
      if (solved) return;
      if (opt.correct) {
        solved = true;
        b.classList.add('is-correct');
        Array.prototype.forEach.call(grid.children, function (n) {
          n.classList.add('is-locked');
          if (n !== b) n.classList.add('is-dim');
        });
        addXp(step.xp || 20, lesson.id + ':pick');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--ok');
        f.innerHTML = '<div class="feedback__title">🎉 Správne!</div><div>' + opt.explain + '</div>';
        feedback.appendChild(f);
        feedback.appendChild(nextButton('POKRAČOVAŤ →', nextStep));
      } else {
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--no');
        f.innerHTML = '<div class="feedback__title">Ešte nie 🙂</div><div>' + opt.explain + '</div>';
        feedback.appendChild(f);
      }
    });
    grid.appendChild(b);
  });

  wrap.appendChild(grid);
  wrap.appendChild(feedback);
}

/* --------------------------- 7e) WOW MOMENT ----------------------------- */
function stepWow(step, wrap) {
  const box = el('div', 'panel wow');
  box.innerHTML = '<div class="wow__title">' + step.title + '</div>';
  step.lines.forEach(function (line, i) {
    const cls = i === step.lines.length - 1 ? 'wow__punch' : 'wow__line';
    const p = el('p', cls + ' delay-' + Math.min(4, i + 1), line);
    p.style.animation = 'screenIn .7s both';
    p.style.animationDelay = (0.25 + i * 0.55) + 's';
    box.appendChild(p);
  });
  if (step.footnote) {
    const f = el('p', 'sub', '💡 ' + step.footnote);
    f.style.marginTop = '22px';
    box.appendChild(f);
  }
  wrap.appendChild(box);
  wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', nextStep));
}

/* --------------------------- 7f) OKO vs. DWARF -------------------------- */
function stepCompare(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', step.title));
  wrap.appendChild(el('p', 'lead center', step.lead));

  const grid = el('div', 'compare');

  /* ľavý stĺpec – oko */
  const c1 = el('div', 'compare__col');
  c1.appendChild(el('div', 'compare__head', '<span>' + step.eye.icon + '</span><span>' + step.eye.label + '</span>'));
  if (step.eye.art) {
    // ľavá strana je tiež obrázok (napr. roztočené hviezdy bez EQ režimu)
    c1.appendChild(photoEl(step.eye.art, { credit: false }));
  } else {
    const eye = el('div', 'eye-view');
    // pár slabých bodiek + takmer neviditeľná šmuha = to, čo naozaj vidí oko
    let dots = '';
    const r = seededRandom(42);
    for (let i = 0; i < 40; i++) {
      dots += '<span class="eye-view__dot" style="left:' + (r() * 100).toFixed(1) + '%;top:' +
              (r() * 100).toFixed(1) + '%;opacity:' + (0.2 + r() * 0.6).toFixed(2) + '"></span>';
    }
    eye.innerHTML = dots;
    c1.appendChild(eye);
  }
  c1.appendChild(el('p', 'compare__note', step.eye.text));
  grid.appendChild(c1);

  /* pravý stĺpec – fotografia */
  const c2 = el('div', 'compare__col');
  c2.appendChild(el('div', 'compare__head', '<span>' + step.camera.icon + '</span><span>' + step.camera.label + '</span>'));
  c2.appendChild(photoEl(step.camera.image, { credit: false }));
  c2.appendChild(el('p', 'compare__note', step.camera.text));
  grid.appendChild(c2);

  wrap.appendChild(grid);

  /* mini kontrolná otázka */
  const box = el('div', 'panel stack');
  box.appendChild(el('p', 'lead', step.check.question));
  const answers = el('div', 'answers');
  const feedback = el('div');
  let solved = false;
  step.check.options.forEach(function (opt) {
    const b = el('button', 'answer');
    b.innerHTML = '<span>' + opt.label + '</span>';
    b.addEventListener('click', function () {
      if (solved) return;
      if (opt.correct) {
        solved = true;
        b.classList.add('is-correct', 'is-locked');
        feedback.innerHTML = '<div class="feedback feedback--ok">' + opt.explain + '</div>';
        wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', nextStep));
      } else {
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        feedback.innerHTML = '<div class="feedback feedback--no">' + opt.explain + '</div>';
      }
    });
    answers.appendChild(b);
  });
  box.appendChild(answers);
  box.appendChild(feedback);
  wrap.appendChild(box);
}

/* --------------------------- 7g) POSTUP (HOWTO) ------------------------- */
function stepHowto(step, wrap) {
  wrap.appendChild(el('h2', 'h-step center', step.title));
  if (step.lead) wrap.appendChild(el('p', 'lead center', step.lead));

  const list = el('div', 'howto');
  step.steps.forEach(function (s, i) {
    const row = el('div', 'howto__row screen delay-' + Math.min(2, i + 1));
    row.innerHTML =
      '<div class="howto__num">' + (i + 1) + '</div>' +
      '<div class="howto__icon">' + s.icon + '</div>' +
      '<div><div class="howto__title">' + s.title + '</div>' +
      '<div class="howto__text">' + s.text + '</div></div>';
    list.appendChild(row);
  });
  wrap.appendChild(list);
  if (step.note) wrap.appendChild(el('p', 'sub', 'ℹ️ ' + step.note));

  wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', function () {
    addXp(step.xp || 15, lesson.id + ':howto');
    nextStep();
  }));
}

/* ------------------- 7g2) INTERAKTÍVNA ÚLOHA (SIMULÁCIA) ----------------
   Obsah je v data/sims.js, kreslenie v sim-engine.js. Tento krok len
   postaví ovládače, canvas a hodnotenie – nič o konkrétnej úlohe nevie.   */
function stepSim(step, wrap) {
  const sim = (typeof SIMS !== 'undefined') ? SIMS[step.simId] : null;
  const eng = (typeof SIM_ENGINE !== 'undefined') ? SIM_ENGINE[step.simId] : null;
  if (!sim || !eng) { nextStep(); return; }

  /* aktuálne hodnoty ovládačov */
  const v = {};
  sim.controls.forEach(function (c) { v[c.id] = c.start; });

  wrap.appendChild(el('h2', 'h-step center', sim.title));
  if (sim.lead) wrap.appendChild(el('p', 'lead center', sim.lead));

  /* ---- náhľad ---- */
  const stage = el('div', 'sim');
  const canvas = document.createElement('canvas');
  canvas.className = 'sim__canvas';
  stage.appendChild(canvas);
  if (sim.target) stage.appendChild(el('div', 'sim__target', sim.target));
  wrap.appendChild(stage);

  /* ---- čísla pod náhľadom ---- */
  const statsRow = el('div', 'simstats');
  if (eng.stats) wrap.appendChild(statsRow);

  /* ---- hodnotenie ---- */
  const verdictBox = el('div', 'simverdict');
  wrap.appendChild(verdictBox);

  /* ---- ovládače ---- */
  const ctrls = el('div', 'simctrls');
  sim.controls.forEach(function (c) {
    const row = el('div', 'simctrl');
    const head = el('div', 'simctrl__head');
    const name = el('span', 'simctrl__label', c.label);
    const val = el('span', 'simctrl__value');
    head.appendChild(name); head.appendChild(val);
    row.appendChild(head);

    function showValue() {
      val.textContent = v[c.id] + (c.unit || '');
    }

    if (c.options) {
      /* prepínač (napr. AZ / EQ) */
      val.textContent = '';
      const sw = el('div', 'simswitch');
      c.options.forEach(function (o) {
        const b = el('button', 'simswitch__btn' + (o === v[c.id] ? ' is-on' : ''), o);
        b.addEventListener('click', function () {
          v[c.id] = o;
          sw.querySelectorAll('.simswitch__btn').forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
          update();
        });
        sw.appendChild(b);
      });
      row.appendChild(sw);
    } else if (c.values) {
      /* posuvník po pevných hodnotách */
      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'simrange';
      input.min = 0; input.max = c.values.length - 1; input.step = 1;
      input.value = Math.max(0, c.values.indexOf(c.start));
      input.setAttribute('aria-label', c.label);
      input.addEventListener('input', function () {
        v[c.id] = c.values[+input.value];
        showValue(); update();
      });
      row.appendChild(input);
      showValue();
    } else {
      /* plynulý posuvník */
      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'simrange';
      input.min = c.min; input.max = c.max; input.step = c.step || 1;
      input.value = c.start;
      input.setAttribute('aria-label', c.label);
      input.addEventListener('input', function () {
        v[c.id] = +input.value;
        showValue(); update();
      });
      row.appendChild(input);
      showValue();
    }
    ctrls.appendChild(row);
  });
  wrap.appendChild(ctrls);

  /* ---- výzva ---- */
  let challengeBox = null;
  if (sim.challenge) {
    challengeBox = el('div', 'simgoal');
    challengeBox.innerHTML =
      '<div class="simgoal__label">🎯 Výzva</div>' +
      '<div class="simgoal__text">' + sim.challenge.text + '</div>';
    wrap.appendChild(challengeBox);
  }

  /* ---- rady (rozbaliteľné, aby neprezradili riešenie hneď) ---- */
  if (sim.tips && sim.tips.length) {
    const det = document.createElement('details');
    det.className = 'more';
    det.innerHTML = '<summary class="more__sum">💡 Potrebujem radu</summary>' +
      '<ul class="more__list">' + sim.tips.map(function (t) {
        return '<li>' + t + '</li>';
      }).join('') + '</ul>';
    wrap.appendChild(det);
  }

  /* ---- pokračovanie ---- */
  wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', function () {
    addXp(step.xp || 25, lesson.id + ':sim:' + step.simId);
    nextStep();
  }));

  /* ---- kreslenie ---- */
  let raf = 0, goalDone = false;

  function paint() {
    raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || 640;
    const h = canvas.clientHeight || 400;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    eng.draw(ctx, w, h, v);
  }

  function update() {
    if (!raf) raf = requestAnimationFrame(paint);

    if (eng.stats) {
      statsRow.innerHTML = eng.stats(v).map(function (s) {
        return '<div class="simstat"><div class="simstat__label">' + s.label +
               '</div><div class="simstat__value">' + s.value + '</div></div>';
      }).join('');
    }
    if (eng.verdict) {
      const r = eng.verdict(v);
      verdictBox.className = 'simverdict' + (r.ok ? ' is-ok' : ' is-warn');
      verdictBox.innerHTML = '<span class="simverdict__icon">' + r.icon + '</span>' +
                             '<span>' + r.text + '</span>';
    }
    /* výzva splnená – bonusové XP raz */
    if (challengeBox && eng.goal && !goalDone && eng.goal(v)) {
      goalDone = true;
      challengeBox.classList.add('is-done');
      challengeBox.innerHTML =
        '<div class="simgoal__label">🏆 Výzva splnená</div>' +
        '<div class="simgoal__text">' + (sim.challenge.done || 'Presne takto to funguje aj naozaj.') + '</div>';
      sfx('goal');
      addXp(step.bonusXp || 15, lesson.id + ':simgoal:' + step.simId);
    }
  }

  /* prvé vykreslenie až keď canvas pozná svoju šírku */
  requestAnimationFrame(function () { paint(); });
  update();

  /* pri zmene veľkosti okna prekresli */
  const onResize = function () { if (document.body.contains(canvas)) paint(); };
  window.addEventListener('resize', onResize);
}

/* --------------------------- 7h) VIEŠ ŽE? ------------------------------- */
function stepFact(step, wrap) {
  const f = FACTS[step.factId];
  if (!f) { nextStep(); return; }
  const isNew = unlockFact(step.factId);

  const box = el('div', 'panel factcard');
  box.innerHTML =
    '<div class="factcard__label">💡 Vieš že?</div>' +
    '<div class="factcard__icon">' + f.icon + '</div>' +
    '<div class="factcard__title">' + f.title + '</div>' +
    '<p class="factcard__text">' + f.text + '</p>' +
    (f.source ? '<a class="factcard__src" href="' + f.source + '" target="_blank" rel="noopener">Zdroj: ' +
      (f.sourceLabel || 'oficiálny zdroj') + ' ↗</a>' : '');
  wrap.appendChild(box);

  if (isNew) {
    wrap.appendChild(el('p', 'sub center', '📥 Pridané do tvojej zbierky zaujímavostí.'));
    toast('💡 Nová zaujímavosť');
  }
  wrap.appendChild(nextButton('POKRAČOVAŤ →', nextStep));
}

/* --------------------------- 7i) MISIA ---------------------------------- */
function stepMission(step, wrap) {
  /* misia môže byť s objektom (uloží sa do zbierky) alebo bez objektu
     (napr. „odfoť ten istý objekt dvakrát“) – vtedy stačí step.image a step.lead */
  const obj = step.objectId ? getObject(step.objectId) : null;
  wrap.appendChild(el('h2', 'h-step center', step.title));

  const grid = el('div', 'mission__grid');
  grid.appendChild(photoEl(obj ? obj.image : step.image, { label: '📸 MISIA' }));

  const info = el('div', 'panel stack');
  if (obj) {
    info.appendChild(el('div', 'eyebrow', obj.designation + ' · ' + obj.subtypeLabel));
    info.appendChild(el('h3', null, obj.name));
    const facts = el('dl', 'factlist');
    facts.innerHTML =
      '<div><dt>Typ</dt><dd>' + obj.subtypeLabel + '</dd></div>' +
      '<div><dt>Súhvezdie</dt><dd>' + obj.constellation + '</dd></div>' +
      '<div><dt>Vzdialenosť</dt><dd>' + obj.distanceText + '</dd></div>' +
      '<div><dt>Jasnosť</dt><dd>' + obj.magnitude + '</dd></div>';
    info.appendChild(facts);
    info.appendChild(el('p', 'compare__note', '💡 ' + obj.fact));
  } else {
    info.appendChild(el('div', 'eyebrow', 'ÚLOHA NA VONKU'));
    info.appendChild(el('h3', null, step.subtitle || 'Skús to naozaj'));
    info.appendChild(el('p', 'compare__note', step.lead || ''));
  }
  grid.appendChild(info);
  wrap.appendChild(grid);

  step.tasks.forEach(function (t, i) {
    wrap.appendChild(el('div', 'task screen delay-' + (i + 1),
      '<span class="task__icon">' + t.icon + '</span><span>' + t.text + '</span>'));
  });
  if (obj) {
    wrap.appendChild(el('p', 'sub', '🔭 ' + obj.stellarium + '<br>📸 ' + obj.dwarfTip));
  } else if (step.note) {
    wrap.appendChild(el('p', 'sub', '💡 ' + step.note));
  }

  const done = step.objectId
    ? !!state.discovered[step.objectId]
    : !!state.awarded[lesson.id + ':mission'];
  const feedback = el('div');

  /* Po splnení misie sa ponúkne krátky zápis do pozorovacieho denníka. */
  const jslot = el('div');
  function offerJournal() {
    jslot.innerHTML = '';
    const det = document.createElement('details');
    det.className = 'more';
    det.innerHTML = '<summary class="more__sum">📓 Zapísať si to do denníka</summary>';
    const holder = el('div');
    holder.style.padding = '0 12px 12px';
    holder.appendChild(journalForm(
      { what: obj ? obj.name + ' (' + obj.designation + ')' : lesson.title, objectId: step.objectId },
      function () { det.open = false; jslot.innerHTML = ''; jslot.appendChild(
        el('div', 'feedback feedback--ok', '<div class="feedback__title">📓 Zapísané</div>' +
          '<div>Nájdeš to v pozorovacom denníku na domovskej obrazovke.</div>')); }
    ));
    det.appendChild(holder);
    jslot.appendChild(det);
  }

  if (done) {
    feedback.innerHTML = '<div class="feedback feedback--ok"><div class="feedback__title">✅ Misia splnená</div>' +
      '<div>' + step.doneText + '</div></div>';
    wrap.appendChild(feedback);
    offerJournal();
    wrap.appendChild(jslot);
    wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', nextStep));
  } else {
    const b = nextButton(step.button, function () {
      if (step.objectId) discoverObject(step.objectId);
      addXp(step.xp || 50, lesson.id + ':mission');
      b.remove();
      feedback.innerHTML = '<div class="feedback feedback--ok"><div class="feedback__title">🎉 Objav zapísaný!</div>' +
        '<div>' + step.doneText + '</div></div>';
      offerJournal();
      wrap.appendChild(nextButton(step.cta || 'POKRAČOVAŤ →', nextStep));
    });
    wrap.appendChild(b);
    wrap.appendChild(feedback);
    wrap.appendChild(jslot);
  }
}

/* =========================== 8) KVÍZ ==================================== */

let quiz = null;   // { i, score, answers[] }

function stepQuiz(step, wrap) {
  if (!quiz) quiz = { i: 0, score: 0 };

  const qs = step.questions;
  const q = qs[quiz.i];
  const last = quiz.i === qs.length - 1;

  wrap.appendChild(el('div', 'quiz__count center', 'Otázka ' + (quiz.i + 1) + ' z ' + qs.length));
  setProgress((stepIndex + quiz.i / qs.length) / lesson.steps.length);

  renderQuestion(q, wrap, {
    nextLabel: last ? 'ZOBRAZIŤ VÝSLEDOK 🏆' : 'ĎALŠIA OTÁZKA →',
    onAnswer: function (ok) {
      if (ok) quiz.score++;
      rememberMiss(lesson.id, quiz.i, ok);      // pre neskoršiu rozcvičku
    },
    onNext: function () {
      if (last) { finishQuiz(step); } else { quiz.i++; go('lesson'); }
    }
  });
}

/* ------------------- 8b) JEDNA OTÁZKA (spoločný vykresľovač) -------------
   Používa ho aj mini test na konci lekcie, aj rozcvička na jej začiatku.
   opts = { nextLabel, onAnswer(ok), onNext() }                            */
function renderQuestion(q, wrap, opts) {
  wrap.appendChild(el('h2', 'h-step center', q.question));
  if (q.hint) wrap.appendChild(el('p', 'sub center', q.hint));

  const feedback = el('div');
  let answered = false;

  function finishQuestion(ok, extraText) {
    if (answered) return;
    answered = true;
    if (opts.onAnswer) opts.onAnswer(ok);
    sfx(ok ? 'ok' : 'no');
    const f = el('div', 'feedback ' + (ok ? 'feedback--ok' : 'feedback--no'));
    f.innerHTML = '<div class="feedback__title">' + (ok ? '✅ Správne!' : '❌ Nie úplne') + '</div>' +
                  '<div>' + (extraText || q.explain || '') + '</div>';
    feedback.appendChild(f);
    feedback.appendChild(nextButton(opts.nextLabel || 'POKRAČOVAŤ →', opts.onNext));
  }

  /* --- podľa typu otázky --- */
  if (q.kind === 'choice' || q.kind === 'decide') {
    const answers = el('div', 'answers' + (q.kind === 'decide' ? ' answers--2' : ''));
    q.options.forEach(function (opt) {
      const b = el('button', 'answer');
      b.innerHTML = (opt.icon ? '<span class="answer__icon">' + opt.icon + '</span>' : '') +
                    '<span>' + opt.label + '</span>';
      b.addEventListener('click', function () {
        if (answered) return;
        Array.prototype.forEach.call(answers.children, function (n) { n.classList.add('is-locked'); });
        b.classList.add(opt.correct ? 'is-correct' : 'is-wrong');
        if (!opt.correct) {
          // ukáž aj správnu možnosť
          q.options.forEach(function (o, idx) {
            if (o.correct) answers.children[idx].classList.add('is-correct');
          });
        }
        finishQuestion(!!opt.correct);
      });
      answers.appendChild(b);
    });
    wrap.appendChild(answers);

  } else if (q.kind === 'truefalse') {
    const answers = el('div', 'answers answers--2');
    [{ label: '👍 PRAVDA', v: true }, { label: '👎 NEPRAVDA', v: false }].forEach(function (o) {
      const b = el('button', 'answer');
      b.innerHTML = '<span>' + o.label + '</span>';
      b.addEventListener('click', function () {
        if (answered) return;
        Array.prototype.forEach.call(answers.children, function (n) { n.classList.add('is-locked'); });
        b.classList.add(o.v === q.answer ? 'is-correct' : 'is-wrong');
        finishQuestion(o.v === q.answer);
      });
      answers.appendChild(b);
    });
    wrap.appendChild(answers);

  } else if (q.kind === 'image') {
    const grid = el('div', 'picks');
    q.options.forEach(function (opt, i) {
      const b = el('button', 'pick');
      b.appendChild(el('span', 'pick__tag', opt.label || String(i + 1)));
      b.appendChild(photoEl(opt.image, { credit: false }));
      b.addEventListener('click', function () {
        if (answered) return;
        Array.prototype.forEach.call(grid.children, function (n) { n.classList.add('is-locked'); });
        b.classList.add(opt.correct ? 'is-correct' : 'is-wrong');
        if (!opt.correct) {
          q.options.forEach(function (o, idx) { if (o.correct) grid.children[idx].classList.add('is-correct'); });
        }
        finishQuestion(!!opt.correct);
      });
      grid.appendChild(b);
    });
    wrap.appendChild(grid);

  } else if (q.kind === 'order') {
    const box = el('div', 'order');
    const slots = el('div', 'order__slots');
    const pool = el('div', 'answers');
    const chosen = [];

    const shuffled = q.items.slice().sort(function () { return Math.random() - 0.5; });
    shuffled.forEach(function (item) {
      const b = el('button', 'answer');
      b.innerHTML = '<span class="answer__icon">' + item.icon + '</span><span>' + item.label + '</span>';
      b.addEventListener('click', function () {
        if (answered || b.classList.contains('is-dim')) return;
        b.classList.add('is-dim', 'is-locked');
        chosen.push(item);
        const slot = el('div', 'order__slot');
        slot.innerHTML = '<span class="order__num">' + chosen.length + '</span>' +
                         '<span>' + item.icon + ' ' + item.label + '</span>';
        slots.appendChild(slot);
        if (chosen.length === q.items.length) {
          const ok = chosen.every(function (it, i) { return it.order === i + 1; });
          if (!ok) {
            const right = q.items.slice().sort(function (a, b2) { return a.order - b2.order; })
              .map(function (it, i) { return (i + 1) + '. ' + it.icon + ' ' + it.label; }).join('<br>');
            finishQuestion(false, 'Správne poradie je:<br>' + right + '<br><br>' + (q.explain || ''));
          } else {
            finishQuestion(true);
          }
        }
      });
      pool.appendChild(b);
    });

    box.appendChild(slots);
    box.appendChild(pool);
    wrap.appendChild(box);
  }

  wrap.appendChild(feedback);
}

/* ---------------------- 8c) ROZCVIČKA (adaptívne opakovanie) -------------
   Otázky, ktoré dieťa v minulosti netrafilo, sa mu vrátia na začiatku
   ďalšej lekcie. Keď ich zvládne, zo zoznamu zmiznú. Žiadne trestanie –
   len tichá druhá šanca.                                                  */

/** Zapamätá si chybu (alebo ju odpustí po správnej odpovedi). */
function rememberMiss(lessonId, qIndex, ok) {
  const key = lessonId + ':' + qIndex;
  if (!state.missed) state.missed = {};
  if (ok) {
    if (state.missed[key]) delete state.missed[key];
  } else {
    state.missed[key] = (state.missed[key] || 0) + 1;
  }
  saveState();
}

/** Vyberie až `limit` otázok na zopakovanie – nikdy z práve otvorenej lekcie. */
function warmupQuestions(skipLessonId, limit) {
  const out = [];
  const keys = Object.keys(state.missed || {});
  for (let i = 0; i < keys.length && out.length < limit; i++) {
    const parts = keys[i].split(':');
    const lid = parts[0], qi = +parts[1];
    if (lid === skipLessonId) continue;
    const l = LESSONS.filter(function (x) { return x.id === lid; })[0];
    if (!l) continue;
    const quizStep = l.steps.filter(function (st) { return st.type === 'quiz'; })[0];
    if (!quizStep || !quizStep.questions[qi]) continue;
    out.push({ key: keys[i], q: quizStep.questions[qi], lessonTitle: l.title, lessonIcon: l.icon });
  }
  return out;
}

let warm = null;   // { i, items }

function stepWarmup(step, wrap) {
  if (!warm || warm.step !== step) warm = { i: 0, items: step.items, step: step };
  const item = warm.items[warm.i];
  const last = warm.i === warm.items.length - 1;

  wrap.appendChild(el('h2', 'h-step center', '🔁 ROZCVIČKA'));
  wrap.appendChild(el('p', 'sub center',
    'Krátke zopakovanie toho, čo ti naposledy ušlo. ' +
    (warm.items.length > 1 ? 'Otázka ' + (warm.i + 1) + ' z ' + warm.items.length + '.' : '')));
  wrap.appendChild(el('div', 'warm__from center',
    item.lessonIcon + ' z lekcie „' + item.lessonTitle + '“'));

  renderQuestion(item.q, wrap, {
    nextLabel: last ? 'IDEME NA NOVÚ LEKCIU →' : 'ĎALŠIA →',
    onAnswer: function (ok) {
      if (ok) {
        delete state.missed[item.key];
        saveState();
      }
    },
    onNext: function () {
      if (last) {
        addXp(step.xp || 15, 'warmup:' + todayText());
        warm = null;
        nextStep();
      } else {
        warm.i++;
        go('lesson');
      }
    }
  });
}

function finishQuiz(step) {
  const total = step.questions.length;
  const score = quiz.score;

  /* zapíš výsledok */
  state.lessons[lesson.id] = { completed: true, score: score, total: total };
  saveState();
  addXp(lesson.quizXp || 100, lesson.id + ':quiz');

  /* odznak */
  const newBadge = unlockBadge(lesson.badge);

  /* vlož pseudo-krok „result“ na koniec lekcie a zobraz ho */
  const resultStep = { type: 'result', score: score, total: total, step: step, newBadge: newBadge };
  lesson.steps = lesson.steps.filter(function (s) { return s.type !== 'result'; });
  lesson.steps.push(resultStep);
  stepIndex = lesson.steps.length - 1;
  go('lesson');

  if (newBadge) setTimeout(function () { showBadgeOverlay(lesson.badge); }, 900);
}

function stepResult(step, wrap) {
  setProgress(1);
  const good = step.score >= Math.ceil(step.total * 0.8);
  const box = el('div', 'panel result stack');
  box.innerHTML =
    '<div class="eyebrow">🏆 Misia dokončená!</div>' +
    '<div class="result__score">' + step.score + '<small>/' + step.total + '</small></div>' +
    '<div class="lead">' + (good ? step.step.resultGood : step.step.resultOk) + '</div>' +
    '<div class="badge-chip" style="justify-self:center">+' + (lesson.quizXp || 100) + ' XP</div>';
  wrap.appendChild(box);

  const b = BADGES[lesson.badge];
  if (b) {
    const bd = el('div', 'panel center stack');
    bd.innerHTML = '<div style="font-size:52px">' + b.icon + '</div>' +
      '<div class="eyebrow">🔓 Odomknutý odznak</div>' +
      '<div style="font-size:24px;font-weight:900">' + b.name + '</div>' +
      '<div class="sub">' + b.text + '</div>';
    wrap.appendChild(bd);
  }

  /* ak ostáva ďalšia lekcia, pošli ho rovno tam */
  const upcoming = LESSONS.filter(function (l) { return !isLessonDone(l.id); })[0];
  if (upcoming) {
    wrap.appendChild(nextButton('▶ ĎALŠIA LEKCIA: ' + upcoming.icon + ' ' + upcoming.title,
      function () { startLesson(upcoming.id); }));
  } else {
    wrap.appendChild(nextButton('🌌 OTVORIŤ VESMÍRNU MAPU', function () { go('map'); }));
  }

  const coll = el('button', 'btn btn--ghost', '📚 Moja zbierka');
  coll.addEventListener('click', function () { go('collection'); });
  wrap.appendChild(coll);
  const again = el('button', 'btn btn--ghost', '🔁 Skúsiť test znova');
  again.addEventListener('click', function () {
    quiz = null;
    stepIndex = lesson.steps.findIndex(function (s) { return s.type === 'quiz'; });
    go('lesson');
  });
  wrap.appendChild(again);
  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  wrap.appendChild(home);
}

function showBadgeOverlay(badgeId) {
  const b = BADGES[badgeId];
  if (!b) return;
  sfx('badge');
  const ov = document.getElementById('overlay');
  ov.hidden = false;
  ov.innerHTML = '';
  const card = el('div', 'unlock');
  card.innerHTML =
    '<div class="unlock__icon">' + b.icon + '</div>' +
    '<div class="unlock__label">🔓 Nový odznak</div>' +
    '<div class="unlock__name">' + b.name + '</div>' +
    '<div class="sub">' + b.text + '</div>';
  const close = el('button', 'btn', 'PARÁDA! 🎉');
  close.style.marginTop = '22px';
  close.addEventListener('click', function () { ov.hidden = true; ov.innerHTML = ''; });
  card.appendChild(close);
  ov.appendChild(card);
}

/* =========================== 9) ZBIERKA / ZDROJE ======================== */

function screenCollection() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '📚 MOJE OBJAVY'));

  const ids = Object.keys(state.discovered);
  if (!ids.length) {
    s.appendChild(el('div', 'panel empty',
      '🔭 Zatiaľ nič.<br>Dokonči výpravu a objav svoj prvý objekt!'));
  } else {
    const grid = el('div', 'collection');
    ids.forEach(function (id, i) {
      const obj = getObject(id);
      if (!obj) return;
      const rec = state.discovered[id];
      const b = el('button', 'card-obj screen delay-' + Math.min(4, i + 1));
      b.appendChild(photoEl(obj.image, { credit: false, label: OBJECT_TYPES[obj.type].icon + ' ' + obj.designation }));
      b.appendChild(el('div', 'card-obj__body',
        '<div class="card-obj__name">' + obj.name + '</div>' +
        '<div class="card-obj__meta">' + obj.subtypeLabel + ' · objavené ' + rec.date + '</div>'));
      b.addEventListener('click', function () { go('object', { objectId: id }); });
      grid.appendChild(b);
    });
    s.appendChild(grid);
  }

  /* odznaky */
  s.appendChild(el('h2', 'h-step', '🏆 ODZNAKY'));
  const row = el('div', 'badge-row');
  Object.keys(BADGES).forEach(function (id) {
    const b = BADGES[id];
    const has = state.badges.indexOf(id) !== -1;
    row.appendChild(el('div', 'badge-chip' + (has ? '' : ' badge-chip--locked'),
      (has ? b.icon : '🔒') + ' ' + b.name));
  });
  s.appendChild(row);

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

function screenObject(id) {
  const obj = getObject(id);
  const rec = state.discovered[id] || { date: '—' };
  const s = el('div', 'screen stack');

  s.appendChild(photoEl(obj.image, { label: OBJECT_TYPES[obj.type].icon + ' ' + obj.designation }));
  s.appendChild(el('h2', 'h-step', obj.name));

  const facts = el('dl', 'panel factlist');
  facts.innerHTML =
    '<div><dt>Označenie</dt><dd>' + obj.designation + '</dd></div>' +
    '<div><dt>Typ</dt><dd>' + obj.subtypeLabel + '</dd></div>' +
    '<div><dt>Súhvezdie</dt><dd>' + obj.constellation + '</dd></div>' +
    '<div><dt>Vzdialenosť</dt><dd>' + obj.distanceText + '</dd></div>' +
    '<div><dt>Jasnosť</dt><dd>' + obj.magnitude + '</dd></div>' +
    '<div><dt>Dátum objavenia</dt><dd>' + rec.date + '</dd></div>';
  s.appendChild(facts);

  s.appendChild(el('div', 'panel', '💡 <strong>Zaujímavosť:</strong> ' + obj.fact));

  /* vlastná fotka z Dwarfu – dá sa priamo nahrať z disku */
  s.appendChild(el('h3', null, '📸 MOJA FOTOGRAFIA'));
  s.appendChild(myPhotoBox(obj, rec));

  if (obj.source) {
    s.appendChild(el('p', 'sources',
      'Zdroj údajov: <a href="' + obj.source + '" target="_blank" rel="noopener">NASA</a>'));
  }

  const back = el('button', 'btn btn--ghost', '← Späť do zbierky');
  back.addEventListener('click', function () { go('collection'); });
  s.appendChild(back);
  return s;
}

/* -------------------- VLASTNÁ FOTKA Z DWARFU ----------------------------
   Fotka sa pred uložením zmenší na 900 px a prekonvertuje na JPEG, inak by
   sa do localStorage nezmestila (limit je zvyčajne okolo 5 MB na doménu).
   Fotku nikam neposielame – zostáva len v tomto prehliadači.               */
const MY_PHOTO_MAX = 900;      // px na dlhšej strane
const MY_PHOTO_QUALITY = 0.72; // kvalita JPEG

function myPhotoBox(obj, rec) {
  const box = el('div', 'stack');
  const myPhoto = rec.photo || obj.myPhoto;

  if (myPhoto) {
    const fig = el('figure', 'photo has-photo');
    const img = el('img');
    img.src = myPhoto;
    img.alt = 'Moja fotografia ' + obj.name;
    fig.appendChild(img);
    if (rec.photoDate) {
      fig.appendChild(el('figcaption', 'photo__credit', '📅 Odfotené ' + rec.photoDate));
    }
    box.appendChild(fig);
  } else {
    box.appendChild(el('div', 'photo-slot',
      '<div style="font-size:30px">📸</div>' +
      '<div>Tu bude tvoja fotka z Dwarfu.</div>' +
      '<div style="font-size:12.5px">Nahraj ju z disku – zostane len v tomto prehliadači.</div>'));
  }

  /* skryté pole na výber súboru + veľké tlačidlo */
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.hidden = true;
  box.appendChild(input);

  const pick = el('button', 'btn btn--ghost',
    myPhoto ? '🔄 Nahradiť inou fotkou' : '📤 NAHRAŤ MOJU FOTKU');
  pick.addEventListener('click', function () { input.click(); });
  box.appendChild(pick);

  if (rec.photo) {
    const del = el('button', 'btn btn--ghost btn--small', '🗑️ Odstrániť fotku');
    del.addEventListener('click', function () {
      delete state.discovered[obj.id].photo;
      delete state.discovered[obj.id].photoDate;
      saveState();
      toast('Fotka odstránená');
      go('object', { objectId: obj.id });
    });
    box.appendChild(del);
  }

  input.addEventListener('change', function () {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('Toto nie je obrázok'); return; }
    toast('Spracúvam fotku…');
    shrinkImage(file, function (dataUrl, err) {
      if (err) { toast('Fotku sa nepodarilo načítať'); return; }
      if (!state.discovered[obj.id]) discoverObject(obj.id);
      const before = state.discovered[obj.id].photo;
      state.discovered[obj.id].photo = dataUrl;
      state.discovered[obj.id].photoDate = todayText();
      if (!saveState()) {
        /* localStorage je plný – vrátime pôvodný stav a povieme to jasne */
        if (before) state.discovered[obj.id].photo = before;
        else delete state.discovered[obj.id].photo;
        saveState();
        toast('⚠️ Nie je miesto na ďalšiu fotku');
        return;
      }
      addXp(20, 'photo:' + obj.id);
      toast('📸 Fotka uložená');
      go('object', { objectId: obj.id });
    });
  });

  return box;
}

/**
 * Zmenší obrázok na MY_PHOTO_MAX px a vráti ho ako JPEG data URL.
 * @param {File} file
 * @param {function(string,Error=)} done
 */
function shrinkImage(file, done) {
  const reader = new FileReader();
  reader.onerror = function () { done(null, new Error('read')); };
  reader.onload = function () {
    const img = new Image();
    img.onerror = function () { done(null, new Error('decode')); };
    img.onload = function () {
      const scale = Math.min(1, MY_PHOTO_MAX / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      try { done(c.toDataURL('image/jpeg', MY_PHOTO_QUALITY)); }
      catch (e) { done(null, e); }
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

/* ======================= 10) POZOROVACÍ DENNÍK ===========================
   Po každej misii sa dá zapísať, ako to vonku naozaj vyšlo. Nič sa nikam
   neposiela – zápisy sú len v tomto prehliadači, v state.journal.        */

function journalEntries() {
  return (state.journal || []).slice().sort(function (a, b) {
    return (b.ts || 0) - (a.ts || 0);
  });
}

function addJournalEntry(entry) {
  if (!state.journal) state.journal = [];
  state.journal.push(Object.assign({ date: todayText(), ts: Date.now() }, entry));
  return saveState();
}

/** Formulár na zápis do denníka – vracia hotový panel. */
function journalForm(preset, onSaved) {
  const box = el('div', 'panel stack panel--tight');
  box.appendChild(el('div', 'stat__label', '📓 ZÁPIS DO DENNÍKA'));
  box.appendChild(el('p', 'sub', 'Napíš pár slov, ako to vonku vyšlo. Za rok si to prečítaš a budeš sa čudovať.'));

  const what = document.createElement('input');
  what.type = 'text'; what.className = 'nameinput';
  what.placeholder = 'čo si pozoroval'; what.maxLength = 60;
  what.value = preset && preset.what ? preset.what : '';

  const note = document.createElement('textarea');
  note.className = 'nameinput journal__area';
  note.rows = 3;
  note.placeholder = 'Aká bola obloha? Čo bolo vidieť? Čo by si nabudúce nastavil inak?';
  note.maxLength = 500;

  const chips = el('div', 'chips');
  const skyOptions = ['🌟 jasno', '🌤️ trochu oblakov', '☁️ zamračené', '🌕 svietil Mesiac', '🏙️ svetlo z mesta'];
  let sky = '';
  skyOptions.forEach(function (o) {
    const c = el('button', 'chip', o);
    c.addEventListener('click', function () {
      sky = (sky === o) ? '' : o;
      Array.prototype.forEach.call(chips.children, function (n) { n.classList.remove('is-on'); });
      if (sky) c.classList.add('is-on');
    });
    chips.appendChild(c);
  });

  const save = el('button', 'btn btn--small', '💾 ULOŽIŤ ZÁPIS');
  save.addEventListener('click', function () {
    if (!what.value.trim() && !note.value.trim()) { toast('Napíš aspoň jedno slovo'); return; }
    const okSave = addJournalEntry({
      what: what.value.trim() || (preset && preset.what) || 'pozorovanie',
      sky: sky,
      note: note.value.trim(),
      objectId: preset && preset.objectId
    });
    if (!okSave) { toast('⚠️ Nie je miesto na uloženie'); return; }
    addXp(15, 'journal:' + Date.now());
    toast('📓 Zapísané do denníka');
    if (onSaved) onSaved();
  });

  box.appendChild(what);
  box.appendChild(chips);
  box.appendChild(note);
  box.appendChild(save);
  return box;
}

function screenJournal() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '📓 POZOROVACÍ DENNÍK'));
  s.appendChild(el('p', 'sub', 'Skutoční astronómi si píšu denník celý život. Toto je ten tvoj.'));

  s.appendChild(journalForm(null, function () { go('journal'); }));

  const list = journalEntries();
  if (!list.length) {
    s.appendChild(el('div', 'panel', 'Denník je zatiaľ prázdny. Prvý zápis pridaj po najbližšej noci vonku.'));
  } else {
    s.appendChild(el('h3', null, '📅 ' + list.length + (list.length === 1 ? ' ZÁPIS' : ' ZÁPISOV')));
    list.forEach(function (e, i) {
      const card = el('div', 'panel jentry');
      card.innerHTML =
        '<div class="jentry__head"><span class="jentry__date">' + e.date + '</span>' +
        (e.sky ? '<span class="jentry__sky">' + e.sky + '</span>' : '') + '</div>' +
        '<div class="jentry__what">' + e.what + '</div>' +
        (e.note ? '<p class="jentry__note">' + e.note + '</p>' : '');
      const del = el('button', 'btn btn--ghost btn--small', '🗑️ Vymazať');
      del.addEventListener('click', function () {
        const idx = state.journal.indexOf(e);
        if (idx >= 0) state.journal.splice(idx, 1);
        saveState();
        go('journal');
      });
      card.appendChild(del);
      list[i] = e;
      s.appendChild(card);
    });
  }

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* ======================= 11) HVIEZDNY TRÉNING ============================
   Zmiešaný test z otázok všetkých dokončených lekcií. Bez trestov, bez
   časomiery – len osobný rekord, ktorý sa dá prekonať.                   */

let training = null;   // { i, score, questions }

function collectQuestions(onlyDone) {
  const out = [];
  LESSONS.forEach(function (l) {
    if (onlyDone && !isLessonDone(l.id)) return;
    l.steps.forEach(function (st) {
      if (st.type !== 'quiz') return;
      st.questions.forEach(function (q, qi) {
        out.push({ q: q, lessonId: l.id, qi: qi, lessonTitle: l.title, lessonIcon: l.icon });
      });
    });
  });
  return out;
}

function startTraining() {
  const pool = collectQuestions(true);
  /* zamiešaj a vezmi desať */
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  training = { i: 0, score: 0, questions: pool.slice(0, Math.min(10, pool.length)) };
  go('training');
}

function screenTraining() {
  const s = el('div', 'screen stack');

  /* úvodná obrazovka */
  if (!training) {
    s.appendChild(el('h2', 'h-step center', '🎯 HVIEZDNY TRÉNING'));
    s.appendChild(el('p', 'lead center',
      'Desať otázok zamiešaných zo všetkých lekcií, ktoré už máš hotové. ' +
      'Nič sa nestráca a nič sa nepokazí – je to len tréning.'));
    const done = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;
    s.appendChild(el('div', 'panel panel--tight',
      '📚 Otázky sa berú z <strong>' + done + '</strong> dokončených lekcií.' +
      (state.bestTraining ? '<br>🏅 Tvoj najlepší výsledok: <strong>' +
        state.bestTraining + '/10</strong>' : '')));
    s.appendChild(nextButton('🚀 SPUSTIŤ TRÉNING', startTraining));
    const home = el('button', 'btn btn--ghost', '🏠 Domov');
    home.addEventListener('click', function () { go('home'); });
    s.appendChild(home);
    return s;
  }

  /* výsledok */
  if (training.i >= training.questions.length) {
    const score = training.score, total = training.questions.length;
    const isBest = score > (state.bestTraining || 0);
    if (isBest) { state.bestTraining = score; saveState(); }
    const box = el('div', 'panel result stack');
    box.innerHTML =
      '<div class="eyebrow">🎯 Tréning dokončený</div>' +
      '<div class="result__score">' + score + '<small>/' + total + '</small></div>' +
      '<div class="lead">' + (isBest
        ? '🏅 Nový osobný rekord! Lepšie než kedykoľvek predtým.'
        : (state.bestTraining ? 'Tvoj rekord je ' + state.bestTraining + '/' + total + '. Skús to znova.' : '')) +
      '</div>';
    s.appendChild(box);
    addXp(score * 5, null);
    const again = nextButton('🔁 EŠTE RAZ', startTraining);
    s.appendChild(again);
    const home = el('button', 'btn btn--ghost', '🏠 Domov');
    home.addEventListener('click', function () { training = null; go('home'); });
    s.appendChild(home);
    return s;
  }

  /* otázka */
  const item = training.questions[training.i];
  s.appendChild(el('div', 'quiz__count center',
    'Otázka ' + (training.i + 1) + ' z ' + training.questions.length +
    ' · skóre ' + training.score));
  s.appendChild(el('div', 'warm__from center', item.lessonIcon + ' ' + item.lessonTitle));
  renderQuestion(item.q, s, {
    nextLabel: (training.i === training.questions.length - 1) ? 'ZOBRAZIŤ VÝSLEDOK 🏅' : 'ĎALŠIA →',
    onAnswer: function (ok) {
      if (ok) training.score++;
      rememberMiss(item.lessonId, item.qi, ok);
    },
    onNext: function () { training.i++; go('training'); }
  });
  return s;
}

/* ========================= 12) PREHĽAD PRE RODIČA ========================
   Bez hodnotenia dieťaťa – len prehľad, čo už prešlo a kde sa zaseklo,
   aby sa rodič mohol pripojiť k tomu, čo ho práve zaujíma.               */
function screenParent() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '📊 PREHĽAD PRE RODIČA'));
  s.appendChild(el('p', 'sub',
    'Všetko je uložené len v tomto prehliadači, nikam sa to neposiela. ' +
    'Tento prehľad slúži na to, aby ste vedeli, o čom sa doma rozprávať.'));

  const doneL = LESSONS.filter(function (l) { return isLessonDone(l.id); });
  const scores = doneL.map(function (l) { return state.lessons[l.id]; });
  const sum = scores.reduce(function (a, r) { return a + r.score; }, 0);
  const max = scores.reduce(function (a, r) { return a + r.total; }, 0);

  const g = el('div', 'stats');
  g.appendChild(el('div', 'panel stat',
    '<div class="stat__label">✅ Hotové lekcie</div>' +
    '<div class="stat__value">' + doneL.length + ' / ' + LESSONS.length + '</div>'));
  g.appendChild(el('div', 'panel stat',
    '<div class="stat__label">🧠 Testy dokopy</div>' +
    '<div class="stat__value">' + (max ? sum + ' / ' + max : '—') + '</div>' +
    '<div class="tile__meta">' + (max ? Math.round(sum / max * 100) + ' % správne' : 'zatiaľ žiadny test') + '</div>'));
  s.appendChild(g);

  const g2 = el('div', 'stats');
  g2.appendChild(el('div', 'panel stat',
    '<div class="stat__label">📖 Naučené pojmy</div>' +
    '<div class="stat__value">' + Object.keys(state.terms).length + ' / ' +
    (typeof TERMS !== 'undefined' ? Object.keys(TERMS).length : 0) + '</div>'));
  g2.appendChild(el('div', 'panel stat',
    '<div class="stat__label">🔭 Objavené objekty</div>' +
    '<div class="stat__value">' + Object.keys(state.discovered).length + ' / ' + SPACE_OBJECTS.length + '</div>'));
  s.appendChild(g2);

  /* na čom sa dieťa zaseklo */
  const missKeys = Object.keys(state.missed || {});
  s.appendChild(el('h3', null, '🔁 ČO SA EŠTE NEUSADILO'));
  if (!missKeys.length) {
    s.appendChild(el('div', 'panel', 'Nič – všetky otázky, ktoré kedy netrafil, si už opravil. ' +
      'Zle zodpovedané otázky sa mu automaticky vrátia ako rozcvička na začiatku ďalšej lekcie.'));
  } else {
    const list = el('div', 'stack');
    missKeys.forEach(function (k) {
      const lid = k.split(':')[0], qi = +k.split(':')[1];
      const l = LESSONS.filter(function (x) { return x.id === lid; })[0];
      if (!l) return;
      const quizStep = l.steps.filter(function (st) { return st.type === 'quiz'; })[0];
      const q = quizStep && quizStep.questions[qi];
      if (!q) return;
      list.appendChild(el('div', 'panel panel--tight',
        '<div class="tile__meta">' + l.icon + ' ' + l.title + '</div>' +
        '<div>' + q.question + '</div>' +
        (q.explain ? '<div class="jentry__note">Správne: ' + q.explain + '</div>' : '')));
    });
    s.appendChild(list);
  }

  /* prehľad lekcií */
  s.appendChild(el('h3', null, '📚 LEKCIA PO LEKCII'));
  const tbl = el('div', 'ptable');
  LESSONS.forEach(function (l, i) {
    const r = state.lessons[l.id];
    tbl.appendChild(el('div', 'ptable__row' + (r && r.completed ? ' is-done' : ''),
      '<span class="ptable__n">' + (i + 1) + '.</span>' +
      '<span class="ptable__t">' + l.icon + ' ' + l.title + '</span>' +
      '<span class="ptable__s">' + (r && r.completed ? r.score + '/' + r.total : '—') + '</span>'));
  });
  s.appendChild(tbl);

  /* vynulovanie appky – tu, kde to dieťa samo nehľadá */
  s.appendChild(resetBox());

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* ============================ 13) DIPLOM ================================ */
function screenCertificate() {
  const s = el('div', 'screen stack');
  const lv = currentLevel();
  const cert = el('div', 'cert');
  cert.innerHTML =
    '<div class="cert__seal">🏆</div>' +
    '<div class="cert__eyebrow">VESMÍRNA AKADÉMIA</div>' +
    '<h2 class="cert__title">DIPLOM MLADÉHO ASTRONÓMA</h2>' +
    '<p class="cert__for">udeľuje sa</p>' +
    '<div class="cert__name">' + (state.name || 'mladému astronautovi') + '</div>' +
    '<p class="cert__body">za absolvovanie všetkých ' + LESSONS.length + ' lekcií akadémie, ' +
      'získanie ' + state.badges.length + ' odznakov, objavenie ' +
      Object.keys(state.discovered).length + ' vesmírnych objektov a naučenie ' +
      Object.keys(state.terms).length + ' astronomických pojmov.</p>' +
    '<div class="cert__row"><span>⭐ ' + lv.level.name + '</span><span>' + state.xp + ' XP</span></div>' +
    '<div class="cert__date">' + todayText() + '</div>';
  s.appendChild(cert);
  s.appendChild(el('p', 'sub center',
    'Tlačidlom nižšie sa diplom dá vytlačiť alebo uložiť ako PDF.'));

  const print = el('button', 'btn btn--wide', '🖨️ VYTLAČIŤ DIPLOM');
  print.addEventListener('click', function () { window.print(); });
  s.appendChild(print);

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* ======================= 14) RESET APLIKÁCIE ============================
   Vymaže úplne všetko: meno, XP, úroveň, odznaky, objekty, vlastné fotky,
   slovníček, denník, rekord aj nastavenia. Zámerne na dva kroky – aby sa
   celoročná zbierka nedala zmazať jedným náhodným klikom.               */

/** Prehľad toho, čo sa reset chystá vymazať – aby to bolo vidieť pred klikom. */
function resetSummary() {
  const items = [];
  if (state.name) items.push('meno <strong>' + state.name + '</strong>');
  items.push('<strong>' + state.xp + ' XP</strong> a úroveň ' + currentLevel().level.name);
  const doneCount = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;
  items.push('<strong>' + doneCount + '</strong> dokončených lekcií a výsledky testov');
  items.push('<strong>' + state.badges.length + '</strong> odznakov');
  const objs = Object.keys(state.discovered);
  const photos = objs.filter(function (id) { return state.discovered[id].photo; }).length;
  items.push('<strong>' + objs.length + '</strong> objavených objektov' +
             (photos ? ' vrátane <strong>' + photos + '</strong> vlastných fotiek z Dwarfu' : ''));
  items.push('<strong>' + Object.keys(state.terms).length + '</strong> pojmov v slovníčku a ' +
             '<strong>' + Object.keys(state.facts).length + '</strong> zaujímavostí');
  const j = (state.journal || []).length;
  if (j) items.push('<strong>' + j + '</strong> zápisov v pozorovacom denníku');
  if (state.bestTraining) items.push('rekord v tréningu (' + state.bestTraining + '/10)');
  return items;
}

/** Naozaj vymaže všetko a vráti appku do stavu ako pri prvom otvorení. */
function resetEverything() {
  state = structuredCopy(DEFAULT_STATE);
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  saveState();
  applyNightMode();          // vypne aj nočný režim
  quiz = null; warm = null; training = null; lesson = null;
  renderXp(false);
}

/**
 * Blok „vynulovať aplikáciu“ – dá sa vložiť na ľubovoľnú obrazovku.
 * Krok 1: tlačidlo. Krok 2: zoznam toho, čo zmizne + potvrdenie alebo zrušenie.
 */
function resetBox() {
  const box = el('div', 'panel reset');
  showButton();

  /* krok 1 – len tlačidlo */
  function showButton() {
    box.innerHTML = '';
    box.classList.remove('is-armed');
    box.appendChild(el('div', 'stat__label', '♻️ VYNULOVAŤ APLIKÁCIU'));
    box.appendChild(el('p', 'sub',
      'Vymaže úplne všetko a appka bude ako po prvom otvorení: meno, XP, úroveň, ' +
      'odznaky, objavené objekty aj vlastné fotky. Nedá sa to vrátiť.'));
    const b = el('button', 'btn btn--ghost btn--small', '♻️ Chcem vynulovať appku');
    b.addEventListener('click', showConfirm);
    box.appendChild(b);
  }

  /* krok 2 – zoznam toho, čo zmizne, a potvrdenie */
  function showConfirm() {
    box.innerHTML = '';
    box.classList.add('is-armed');
    box.appendChild(el('div', 'stat__label', '⚠️ NAOZAJ VYMAZAŤ VŠETKO?'));
    box.appendChild(el('p', 'sub', 'Zmizne toto a nedá sa to vrátiť:'));
    const ul = el('ul', 'resetlist');
    resetSummary().forEach(function (t) { ul.appendChild(el('li', null, t)); });
    box.appendChild(ul);

    const row = el('div', 'namerow');
    const yes = el('button', 'btn btn--small btn--danger', '🗑️ ÁNO, VYMAZAŤ VŠETKO');
    yes.addEventListener('click', function () {
      resetEverything();
      toast('♻️ Appka je vynulovaná');
      go('home');
    });
    const no = el('button', 'btn btn--ghost btn--small', '↩️ Nie, nechať tak');
    no.addEventListener('click', showButton);
    row.appendChild(yes); row.appendChild(no);
    box.appendChild(row);
  }

  return box;
}

function screenSources() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h2', 'h-step', '🔗 ZDROJE'));
  s.appendChild(el('p', 'sub', 'Všetky údaje aj fotografie pochádzajú z oficiálnych zdrojov. ' +
    'Fotografie NASA sú public domain, fotografie ESA/Hubble a ESO sú pod licenciou CC BY 4.0.'));
  const ul = el('ul', 'sources');
  SOURCES.forEach(function (src) {
    ul.appendChild(el('li', null, '<a href="' + src.url + '" target="_blank" rel="noopener">' + src.label + '</a>'));
  });
  s.appendChild(ul);

  s.appendChild(resetBox());

  const home = el('button', 'btn btn--ghost', '🏠 Domov');
  home.addEventListener('click', function () { go('home'); });
  s.appendChild(home);
  return s;
}

/* =========================== ŠTART ====================================== */
applyNightMode();
drawStarfield();
render();
