/* =============================================================================
   VESMÍRNÁ AKADEMIE – app.js
   -----------------------------------------------------------------------------
   V tomto souboru je LOGIKA. Obsah lekcí je v data/lessons.js,
   objekty v data/objects.js, obrázky v data/images.js.

   Obsah:
     1) Stav a ukládání (localStorage)
     2) Hvězdné pozadí
     3) SVG ilustrace (fallback, když není fotografie)
     4) Malé UI pomůcky
     5) Navigace mezi obrazovkami
     6) Domovská obrazovka
     7) Lekce – jednotlivé typy kroků
     8) Kvíz + výsledek
     9) Sbírka, odznaky, zdroje
   ========================================================================== */

/* =========================== 1) STAV A UKLADANIE ========================= */

const STORAGE_KEY = 'vesmirna-akademia-v1';
const STATE_VERSION = 2;

const DEFAULT_STATE = {
  v: STATE_VERSION,
  xp: 0,
  discovered: {},        // { m42: { date: '2026-09-10', photo: null } }
  badges: [],            // ['nebula-hunter']
  lessons: {},           // { nebulae: { completed: true, score: 4, total: 5 } }
  facts: {},             // { 'svetlo-z-minulosti': '10. 9. 2026' }  – sbírka VÍŠ, ŽE?
  terms: {},             // { 'expozicia': '10. 9. 2026' }  – slovníček pojmů
  missed: {},            // { 'nebulae:2': 1 }  – otázky na zopakování (rozcvička)
  awarded: {},           // aby se XP za tentýž krok nepřipsalo dvakrát
  journal: []            // zápisy z nocí (i automatické o objevech)
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCopy(DEFAULT_STATE);
    const ulozeny = JSON.parse(raw);
    const stav = Object.assign(structuredCopy(DEFAULT_STATE), ulozeny);
    /* Verze musí přijít z uloženého stavu, ne z výchozích hodnot – jinak by
       se starší uložení tvářilo jako nové a migrace by se nikdy nespustila. */
    stav.v = ulozeny.v || 1;
    return migrateState(stav);
  } catch (e) {
    return structuredCopy(DEFAULT_STATE);
  }
}

/* --------------------------- MIGRACE STAVU -------------------------------
   Ukládání má číslo verze (state.v). Když aplikace najde starší stav,
   dopočítá, co ve starší verzi chybělo – nikdy nic nemaže. Dítě, které už
   má nasbíraných 2 000 XP, pokračuje přesně tam, kde skončilo.

   v1 → v2: přidán pozorovací deník, kvalifikační dráhy (ty se počítají
            z už uloženého postupu) a automatické zápisy o objevech.     */
function migrateState(s) {
  const from = s.v || 1;
  if (from >= STATE_VERSION) { s.v = STATE_VERSION; return s; }

  if (from < 2) {
    if (!Array.isArray(s.journal)) s.journal = [];
    /* Objekty objevené ve verzi 1 se do deníku zapíšou zpětně, aby deník
       nezačínal prázdný a odpovídal tomu, co dítě skutečně dokázalo.   */
    const zapsane = {};
    s.journal.forEach(function (e) { if (e.objectId) zapsane[e.objectId] = true; });
    Object.keys(s.discovered || {}).forEach(function (id) {
      if (zapsane[id]) return;
      const o = (typeof SPACE_OBJECTS !== 'undefined')
        ? SPACE_OBJECTS.filter(function (x) { return x.id === id; })[0] : null;
      s.journal.push({
        kind: 'objev',
        objectId: id,
        what: o ? o.name : id,
        date: (s.discovered[id] && s.discovered[id].date) || '—',
        ts: 0,                       // starý objev – nemáme přesný čas
        note: ''
      });
    });
  }

  s.v = STATE_VERSION;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
  return s;
}
/** Uloží stav. Vrátí false, když se to nepovedlo (např. plný localStorage). */
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

/** Připíše XP (jednou za daný klíč) a ukáže animovaný toast. */
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

/* Objev se nezastaví u sbírky – projde celou aplikací:
     1) objekt se rozsvítí na mapě oblohy
     2) sám se zapíše do deníku (dá se k němu dopsat vlastní poznámka)
     3) posune dráhu POZOROVATEL v postupu
     4) může odemknout kvalifikaci
   Kód níž dělá kroky 1 a 2, zbytek se z uloženého stavu dopočítá.        */
function discoverObject(objectId) {
  if (state.discovered[objectId]) return false;
  state.discovered[objectId] = { date: todayText(), photo: null };

  const o = getObject(objectId);
  if (!state.journal) state.journal = [];
  state.journal.push({
    kind: 'objev',
    objectId: objectId,
    what: o ? o.name : objectId,
    lessonId: (typeof lesson !== 'undefined' && lesson) ? lesson.id : null,
    date: todayText(),
    ts: Date.now(),
    note: ''
  });
  saveState();
  pendingFlash = objectId;          // mapa oblohy ho při dalším zobrazení rozsvítí
  return true;
}

/** Objekt, který se má na mapě rozsvítit, až se mapa zobrazí. */
let pendingFlash = null;

/** Odemkne zajímavost „VÍŠ, ŽE?“ do sbírky. */
function unlockFact(factId) {
  if (!FACTS[factId] || state.facts[factId]) return false;
  state.facts[factId] = todayText();
  saveState();
  return true;
}

/** Odemkne pojem do slovníčku. */
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
/* Nakreslí se jednou na canvas (žádná animační smyčka = žádná zátěž CPU).
   Jemné „blikání“ zajistí jen CSS na pohybující se září pozadí.            */

function drawStarfield() {
  const c = document.getElementById('starfield');
  if (!c) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  c.width = w * dpr; c.height = h * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const count = Math.round((w * h) / 5200);   // hustota hvězd podle velikosti okna
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
  /* Několik jasnějších hvězd – jen ostré body, žádná rozmazaná záře.
     Rozmazané kruhy na pozadí vypadaly jako špína na displeji.        */
  for (let i = 0; i < Math.max(6, count / 90); i++) {
    const x = Math.random() * w, y = Math.random() * h;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + Math.random(), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fill();
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

/* =========================== 3) SVG ILUSTRACE ============================ */
/* Používají se vždy jako podklad a zároveň jako záloha, kdyby se fotografie
   nenačetla (offline režim). Generují se v kódu – žádné externí soubory.   */

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

  /* měkké barevné oblaky, které filtr rozvlní do tvaru mlhoviny */
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
    /* tmavá silueta před svítícím pozadím */
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
    /* spirální ramena z tečiček – vypadá to jako nakloněný disk galaxie */
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

  /* --- porovnávací dvojice pro slovníček ------------------------------- */
  if (kind === 'faintnebula' || kind === 'noisynebula' || kind === 'cleannebula') {
    const rn = seededRandom(4242);
    // stejné hvězdy ve všech třech, aby byl rozdíl jen v šumu a jasnosti
    for (let i = 0; i < 70; i++) {
      extra += '<circle cx="' + (rn() * 400).toFixed(1) + '" cy="' + (rn() * 250).toFixed(1) +
               '" r="' + (0.5 + rn() * 1.2).toFixed(2) + '" fill="#fff" opacity="' +
               (kind === 'faintnebula' ? 0.15 + rn() * 0.25 : 0.4 + rn() * 0.5).toFixed(2) + '"/>';
    }
    if (kind === 'noisynebula') {          // zrnitý šum jako při vysokém gainu
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

  /* --- Slunce se skvrnami --------------------------------------------- */
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

  /* --- Měsíc ve fázi (osvětlený z jedné strany) ------------------------ */
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
    /* tmavá část – terminátor */
    extra += '<ellipse cx="238" cy="125" rx="82" ry="92" fill="#05060d" opacity=".93"/>' +
             '</g>';
  }

  /* --- spektrum: duhový pruh s tmavými čárami -------------------------- */
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
             'font-family="system-ui">tmavé čáry = odtisky prvků</text>';
  }

  /* --- satelit / ISS: rovná čára mezi hvězdami ------------------------- */
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

  /* --- tranzit: planeta před hvězdou + graf jasnosti ------------------- */
  if (kind === 'transit') {
    defs += '<radialGradient id="' + uid + 'tr"><stop offset="0%" stop-color="#fffdf0"/>' +
            '<stop offset="60%" stop-color="#ffd97a"/><stop offset="100%" stop-color="#ff9a2b"/></radialGradient>';
    extra += '<circle cx="150" cy="105" r="66" fill="url(#' + uid + 'tr)"/>' +
             '<circle cx="176" cy="92" r="11" fill="#1a1406" opacity=".85"/>' +
             '<path d="M250 175 L286 175 L296 196 L330 196 L340 175 L376 175" fill="none" ' +
             'stroke="#8fd7ff" stroke-width="2.6" stroke-linejoin="round"/>' +
             '<text x="313" y="216" text-anchor="middle" fill="#9fb0d4" font-size="12" ' +
             'font-family="system-ui">hvězda na chvíli ztmavne</text>';
  }

  /* --- kometa se dvěma chvosty ---------------------------------------- */
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

  /* --- meteorický roj: čáry z jednoho místa ---------------------------- */
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

  /* --- obloha nad městem: záře a málo hvězd ---------------------------- */
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

  /* --- hvězdárenská kupole -------------------------------------------- */
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

  /* --- hluboký pohled: pole galaxií ------------------------------------ */
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

  /* --- Mléčná dráha: pás hvězd přes celý obrázek ---------------------- */
  if (kind === 'milkyway') {
    const r4 = seededRandom(31415);
    extra += '<g transform="rotate(-14 200 125)">';
    for (let i = 0; i < 900; i++) {
      const x = r4() * 460 - 30;
      const g = (r4() + r4() + r4()) / 3;                 // hustota u středu pásu
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

  /* --- Měsíc s krátery ------------------------------------------------ */
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

  /* --- dvojhvězda: modrá + žlutá --------------------------------------- */
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

  /* --- supernova: vlákna letící od středu ------------------------------ */
  if (kind === 'supernova') {
    /* rozpínající se obal z vláken – ne hvězdice, ale trhaná skořápka */
    const r6 = seededRandom(1054);
    defs += '<filter id="' + uid + 'sn"><feGaussianBlur stdDeviation="1.2"/></filter>';
    extra += '<g filter="url(#' + uid + 'sn)">';
    for (let i = 0; i < 150; i++) {
      const ang = r6() * Math.PI * 2;
      const shell = 62 + (r6() - 0.5) * 46;            // vlákna sedí v obalu
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

  /* --- černá díra: světelný prstenec okolo tmy -------------------------- */
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

  /* --- neutronová hvězda / pulzar -------------------------------------- */
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

  /* --- jedna velká hvězda podle barvy (modrá / žlutá / červená) -------- */
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

  /* --- rotace oblohy: hvězdy roztočené do oblouků (bez EQ režimu) ------- */
  if (kind === 'trails' || kind === 'roundstars') {
    // stejné rozložení hvězd v obou obrázcích, aby byl rozdíl jasný
    const r2 = seededRandom(20260910);
    const cx = 58, cy = 18;                       // střed otáčení (nebeský pól)
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
        const arc = rad * 0.30;                   // ~17° oblouček
        extra += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad.toFixed(1) +
                 '" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-width="' + size.toFixed(2) +
                 '" opacity="' + (0.45 + bright * 0.4).toFixed(2) +
                 '" stroke-dasharray="' + arc.toFixed(1) + ' ' + circ.toFixed(1) +
                 '" stroke-dashoffset="' + (-(ang * rad)).toFixed(1) + '"/>';
      }
    }
  }

  /* --- Polárka: všechno se točí okolo ní, ona stojí ------------------- */
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

  /* hvězdy v ilustraci (tyto tři typy si kreslí hvězdy po svém) */
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
         stars + extra + '</svg>';   /* hvězdy jsou v pozadí, motiv nad nimi */
}

function seededRandom(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/* =========================== 4) UI POMŮCKY =============================== */

/**
 * Text z dat často začíná emoji („🔎 CO MYSLÍŠ…“). V rozhraní místo něj
 * kreslíme ikonu ze stejné sady jako všude jinde – emoji uvnitř vyprávění
 * zůstávají, protože tam nesou význam, ne funkci.
 */
function textIcon(text, size) {
  const t = String(text == null ? '' : text);
  const m = t.match(/^([\u203C-\u3299\u{1F000}-\u{1FAFF}][\uFE0F\u200D]*)\s*([\s\S]*)$/u);
  if (!m) return t;
  const ico = iconEmoji(m[1], { size: size || 22, cls: 'ico--head' });
  return ico + '<span>' + m[2] + '</span>';
}

function el(tag, className, html) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (html != null) n.innerHTML = html;
  return n;
}

/**
 * Vytvoří blok s obrázkem: SVG ilustrace + fotografie (pokud se načte) + credit.
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

  // pořadí zdrojů: lokální soubor (pokud je zapnutý) → oficiální odkaz → ilustrace
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
    // credit se zobrazí jen tehdy, když se opravdu načetla fotografie
    if (meta.credit || meta.source) {
      const c = el('figcaption', 'photo__credit');
      c.innerHTML = (meta.source
        ? '<a href="' + meta.source + '" target="_blank" rel="noopener">' + meta.credit + '</a>'
        : meta.credit) + (meta.license ? ' · ' + meta.license : '');
      fig.appendChild(c);
    }
    // když fotografie není dostupná, řekneme na rovinu, že jde o ilustraci
    fig.appendChild(el('div', 'photo__illu', 'vlastní ilustrace'));
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
   Žádné zvukové soubory – tóny se skládají přímo ve Web Audio API, takže
   aplikace zůstává jednosouborová a funguje i offline. Zvuky jsou VYPNUTÉ,
   dokud si je dítě samo nezapne (state.sound).                          */
let audioCtx = null;

function sfx(kind) {
  if (!state.sound) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    /* [frekvence v Hz, kdy začne (s), jak dlouho (s)] */
    const notes = {
      xp:     [[880, 0, 0.10]],                                  // krátké cinknutí
      ok:     [[660, 0, 0.09], [990, 0.08, 0.13]],               // dva tóny nahoru
      no:     [[300, 0, 0.16]],                                  // jeden nízký
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
  } catch (e) { /* zvuk je bonus – když nefunguje, nic se nedeje */ }
}

function soundToggle() {
  const b = el('button', 'btn btn--ghost btn--small');
  b.innerHTML = icon(state.sound ? 'soundOn' : 'soundOff', { size: 17 }) +
    '<span>' + (state.sound ? 'Zvuky jsou zapnuté' : 'Zvuky jsou vypnuté') + '</span>';
  b.addEventListener('click', function () {
    state.sound = !state.sound;
    saveState();
    if (state.sound) sfx('ok');
    toast(state.sound ? 'Zvuky zapnuté' : 'Zvuky vypnuté');
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

/* Velké tlačítko "dále" */
/**
 * Rozbalovací krabička „Chci vědět víc“.
 * @param {string[]} lines – odstavce navíc
 * @param {string} label   – nadpis rozbalení
 */
function moreBox(lines, label) {
  const det = document.createElement('details');
  det.className = 'more';
  det.innerHTML =
    '<summary class="more__sum">' + icon('info', { size: 15 }) +
    (label || 'Chci vědět víc') + '</summary>' +
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

/* =========================== 5) NAVIGACE ================================= */

const app = document.getElementById('app');
let route = { name: 'sky' };
let lesson = null;        // aktuální lekce
let stepIndex = 0;        // index kroku v lekci

/* ---------------------------- ADRESY (#/…) -------------------------------
   Každá obrazovka má vlastní adresu, takže:
     · tlačítko Zpět v prohlížeči funguje,
     · obnovení stránky (F5) nechá dítě tam, kde bylo,
     · odkaz na objekt se dá poslat sám sobě.

   Tvar adres:  #/  #/vyprava/nebulae  #/dennik  #/postup  #/objekt/m42
   Starý název obrazovky ('home') zůstává funkční, jen ukazuje na oblohu. */
const ROUTE_PATHS = {
  sky:         { path: function () { return '/'; },                  re: /^\/?$/ },
  expeditions: { path: function () { return '/vypravy'; },           re: /^\/vypravy$/ },
  journal:     { path: function () { return '/dennik'; },            re: /^\/dennik$/ },
  progress:    { path: function () { return '/postup'; },            re: /^\/postup$/ },
  lesson:      { path: function (r) { return '/vyprava/' + (lesson ? lesson.id : ''); },
                 re: /^\/vyprava\/([\w-]+)$/, keys: ['lessonId'] },
  object:      { path: function (r) { return '/objekt/' + r.objectId; },
                 re: /^\/objekt\/([\w-]+)$/, keys: ['objectId'] },
  terms:       { path: function () { return '/pojmy'; },             re: /^\/pojmy$/ },
  facts:       { path: function () { return '/zajimavosti'; },       re: /^\/zajimavosti$/ },
  collection:  { path: function () { return '/objevy'; },            re: /^\/objevy$/ },
  training:    { path: function () { return '/trenink'; },           re: /^\/trenink$/ },
  parent:      { path: function () { return '/rodic'; },             re: /^\/rodic$/ },
  sources:     { path: function () { return '/zdroje'; },            re: /^\/zdroje$/ },
  certificate: { path: function () { return '/diplom'; },            re: /^\/diplom$/ }
};

let routingSelf = false;     // aby vlastní změna adresy nespustila druhé vykreslení

function go(name, data) {
  if (name === 'home') name = 'sky';
  route = Object.assign({ name: name }, data || {});
  const spec = ROUTE_PATHS[name];
  const hash = '#' + (spec ? spec.path(route) : '/');
  if (location.hash !== hash) {
    routingSelf = true;
    location.hash = hash;
    routingSelf = false;
  }
  render();
  scrollTop();
}

/** Přečte adresu a vrátí odpovídající obrazovku. */
function routeFromHash() {
  const raw = (location.hash || '').replace(/^#/, '') || '/';
  const names = Object.keys(ROUTE_PATHS);
  for (let i = 0; i < names.length; i++) {
    const spec = ROUTE_PATHS[names[i]];
    const m = raw.match(spec.re);
    if (!m) continue;
    const r = { name: names[i] };
    (spec.keys || []).forEach(function (k, j) { r[k] = m[j + 1]; });
    return r;
  }
  return { name: 'sky' };
}

/** Otevře obrazovku podle adresy (start aplikace, Zpět, F5). */
function applyHash() {
  const r = routeFromHash();

  /* výprava se musí doopravdy nastartovat, ne jen vykreslit */
  if (r.name === 'lesson') {
    const exists = LESSONS.some(function (l) { return l.id === r.lessonId; });
    if (!exists) { go('expeditions'); return; }
    if (!lesson || lesson.id !== r.lessonId) { startLesson(r.lessonId, true); return; }
    route = { name: 'lesson' };
    render();
    return;
  }
  if (r.name === 'object' && !getObject(r.objectId)) { go('collection'); return; }

  route = r;
  render();
}

window.addEventListener('hashchange', function () {
  if (routingSelf) return;
  applyHash();
});

/* Které obrazovky patří ke kterému místu v navigaci. */
const NAV_SECTION = {
  sky: 'sky',
  expeditions: 'expeditions', lesson: 'expeditions', training: 'expeditions',
  journal: 'journal', object: 'journal', collection: 'journal',
  progress: 'progress', terms: 'progress', facts: 'progress',
  parent: 'progress', certificate: 'progress', sources: 'progress'
};

/* Počítadlo vykreslení. Slouží k tomu, aby odložené okno (např. nová
   kvalifikace) nevyskočilo nad obrazovkou, na kterou dítě mezitím odešlo. */
let renderGen = 0;

function render() {
  renderGen++;
  closeOverlay();
  app.innerHTML = '';
  const back = document.getElementById('btnBack');
  const title = document.getElementById('topbarTitle');
  renderXp(false);
  markNav(NAV_SECTION[route.name] || 'sky');

  if (route.name === 'sky' || route.name === 'home') {
    back.hidden = true; title.textContent = 'TVOJE OBLOHA';
    setProgress(null);
    app.appendChild(screenSky());
  } else if (route.name === 'expeditions') {
    back.hidden = true; title.textContent = 'VÝPRAVY';
    setProgress(null);
    app.appendChild(screenExpeditions());
  } else if (route.name === 'progress') {
    back.hidden = true; title.textContent = 'POSTUP';
    setProgress(null);
    app.appendChild(screenProgress());
  } else if (route.name === 'lesson') {
    back.hidden = false; title.textContent = lesson.title;
    setProgress((stepIndex) / lesson.steps.length);
    app.appendChild(screenLessonStep());
  } else if (route.name === 'terms') {
    back.hidden = false; title.textContent = 'SLOVNÍČEK';
    setProgress(null);
    app.appendChild(screenTerms());
  } else if (route.name === 'facts') {
    back.hidden = false; title.textContent = 'ZAJÍMAVOSTI';
    setProgress(null);
    app.appendChild(screenFacts());
  } else if (route.name === 'collection') {
    back.hidden = false; title.textContent = 'OBJEVY';
    setProgress(null);
    app.appendChild(screenCollection());
  } else if (route.name === 'object') {
    back.hidden = false; title.textContent = 'OBJEKT';
    setProgress(null);
    app.appendChild(screenObject(route.objectId));
  } else if (route.name === 'sources') {
    back.hidden = false; title.textContent = 'ZDROJE';
    setProgress(null);
    app.appendChild(screenSources());
  } else if (route.name === 'journal') {
    back.hidden = false; title.textContent = 'DENÍK';
    setProgress(null);
    app.appendChild(screenJournal());
  } else if (route.name === 'training') {
    back.hidden = false; title.textContent = 'TRÉNINK';
    setProgress(null);
    app.appendChild(screenTraining());
  } else if (route.name === 'parent') {
    back.hidden = false; title.textContent = 'PRO RODIČE';
    setProgress(null);
    app.appendChild(screenParent());
  } else if (route.name === 'certificate') {
    back.hidden = false; title.textContent = 'DIPLOM';
    setProgress(null);
    app.appendChild(screenCertificate());
  }
}

/* Zpět = zpět v historii prohlížeče, aby se lišta a tlačítko v prohlížeči
   chovaly stejně. Když historie není (např. otevřený odkaz), jde se na oblohu. */
document.getElementById('btnBack').addEventListener('click', function () {
  if (history.length > 1) { history.back(); return; }
  go('sky');
});

/* ------------------------ HLAVNÍ NAVIGACE --------------------------------
   Čtyři místa. Nic víc. Všechno ostatní je dostupné z nich.              */
const NAV_ITEMS = [
  { id: 'sky',         label: 'Obloha',  icon: 'sky',     route: 'sky' },
  { id: 'expeditions', label: 'Výprava', icon: 'route',   route: 'expeditions' },
  { id: 'journal',     label: 'Deník',   icon: 'journal', route: 'journal' },
  { id: 'progress',    label: 'Postup',  icon: 'chart',   route: 'progress' }
];

function buildNav() {
  if (document.getElementById('nav')) return;
  const nav = el('nav', 'nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Hlavní navigace');
  NAV_ITEMS.forEach(function (it) {
    const b = el('button', 'nav__item');
    b.dataset.nav = it.id;
    b.innerHTML = icon(it.icon, { size: 22 }) + '<span>' + it.label + '</span>';
    b.addEventListener('click', function () { go(it.route); });
    nav.appendChild(b);
  });
  document.body.appendChild(nav);
}

function markNav(section) {
  const nav = document.getElementById('nav');
  if (!nav) return;
  Array.prototype.forEach.call(nav.children, function (b) {
    b.classList.toggle('is-on', b.dataset.nav === section);
  });
}

/* ============================ 6) OBLOHA =================================
   Domovská obrazovka není menu. Je to obloha nad Prahou, na které svítí
   objekty, které dítě objevilo, a tiše čekají ty ostatní. Vedle mapy je
   jen to, co má smysl udělat teď: pokračovat ve výpravě, zopakovat si,
   co se nepovedlo, a podívat se, co je dnes vysoko.
   ====================================================================== */

let skyMap = null;      // instance mapy oblohy (kvůli rozsvícení objevu)

function screenSky() {
  const s = el('div', 'screen oblo');

  /* uvítání – jeden řádek, ne titulní stránka */
  const hero = el('div', 'hero');
  hero.innerHTML =
    '<h1 class="h-hero">Tvoje obloha</h1>' +
    '<p class="sub">' + (state.name ? 'Vítej zpátky, ' + state.name + '. ' : '') +
    skyGreeting() + '</p>';
  s.appendChild(hero);

  if (!state.name) s.appendChild(nameBox());

  /* mapa oblohy + pás „co teď“ */
  const top = el('div', 'oblo__top');
  const mapHost = el('div');
  const L = nextLesson();
  const missionObj = lessonMissionObject(L);
  skyMap = createSkyMap(mapHost, {
    current: missionObj,
    onPick: function (id) { openObject(id); }
  });
  if (pendingFlash) { skyMap.flash(pendingFlash); pendingFlash = null; }
  top.appendChild(mapHost);
  top.appendChild(skyRail(L, missionObj));
  s.appendChild(top);

  /* tři dráhy postupu – tichý pruh pod mapou */
  s.appendChild(trackStrip());

  /* druhořadé odkazy a přepínače */
  const extra = el('div', 'stack stack--tight');
  const row = el('div', 'homeswitches');
  row.appendChild(nightToggle());
  row.appendChild(soundToggle());
  extra.appendChild(row);
  s.appendChild(extra);

  return s;
}

/** Krátká věta podle toho, kde dítě je. Žádné pobízení, žádné hlídání. */
function skyGreeting() {
  const found = Object.keys(state.discovered).length;
  const total = SPACE_OBJECTS.length;
  if (!found) return 'Zatím je tmavá. Po první výpravě se na ní rozsvítí první objekt.';
  if (found >= total) return 'Všech ' + total + ' objektů svítí. Tohle je tvoje kompletní obloha.';
  return 'Svítí ' + found + ' z ' + total + ' objektů. Zbytek na tebe čeká.';
}

/** Objekt, který je cílem misie v dané výpravě (nebo null). */
function lessonMissionObject(l) {
  if (!l) return null;
  const m = l.steps.filter(function (st) { return st.type === 'mission' && st.objectId; })[0];
  return m ? m.objectId : null;
}

/** Otevře objekt – objevený má vlastní stránku, neobjevený napoví, kde ho hledat. */
function openObject(id) {
  if (state.discovered[id]) { go('object', { objectId: id }); return; }
  const o = getObject(id);
  if (!o) return;
  toast(o.designation + ' · ' + (o.coordsNote ? o.coordsNote : 'najdeš ho ve výpravě'));
}

/* ---------------------- pás vedle mapy: co teď -------------------------- */
function skyRail(L, missionObj) {
  const rail = el('div', 'rail');

  /* 1) aktuální výprava */
  const done = isLessonDone(L.id);
  const b1 = el('div', 'rail__block');
  b1.appendChild(el('div', 'rail__label',
    allLessonsDone() ? 'Všechny výpravy hotové' : (done ? 'Výprava' : 'Právě teď')));
  b1.appendChild(el('div', 'rail__title', L.title));
  b1.appendChild(el('p', 'sub', '„' + L.teaser + '“'));
  const cil = missionObj ? getObject(missionObj) : null;
  b1.appendChild(el('div', 'rail__meta', L.minutes +
    (cil ? ' · cíl ' + (/^(M\d|NGC|IC|α|β|γ|Sgr|\d)/.test(cil.designation)
                        ? cil.designation : cil.name) : '')));
  const go1 = nextButton(
    (allLessonsDone() ? 'Zopakovat výpravu' : (done ? 'Otevřít znovu' : 'Pokračovat ve výpravě')),
    function () { startLesson(L.id); });
  go1.innerHTML = icon('play', { size: 18 }) + '<span>' + go1.textContent + '</span>';
  b1.appendChild(go1);
  rail.appendChild(b1);

  /* 2) rozcvička – jen když je co opakovat */
  const warm = warmupQuestions(null, 3);
  if (warm.length >= 2) {
    const b2 = el('div', 'rail__block');
    b2.appendChild(el('div', 'rail__label', 'Vrátí se ti'));
    b2.appendChild(el('p', 'sub', warm.length + ' otázky, které ti minule nevyšly, se objeví ' +
      'jako rozcvička na začátku další výpravy.'));
    const names = {};
    warm.forEach(function (w) { names[w.lessonTitle] = true; });
    b2.appendChild(el('div', 'rail__meta', Object.keys(names).join(' · ')));
    rail.appendChild(b2);
  }

  /* 3) dnes vysoko nad obzorem */
  const month = new Date().getMonth();
  const tip = (typeof SEASON_TIPS !== 'undefined') ? SEASON_TIPS[month] : null;
  if (tip) {
    const b3 = el('div', 'rail__block');
    b3.appendChild(el('div', 'rail__label', 'Dnes vysoko'));
    b3.appendChild(el('p', 'sub', tip.note));
    const list = el('div', 'rail__list');
    tip.objects.forEach(function (id) {
      const o = getObject(id);
      if (!o) return;
      const found = !!state.discovered[id];
      const item = el('button', 'rail__item' + (found ? ' is-found' : ''));
      item.innerHTML =
        iconType(o.type, { size: 18 }) +
        '<span>' + o.name +
          '<span class="rail__sub">' + (found ? 'objeveno ' + state.discovered[id].date
                                              : o.designation + ' · ' + coordsShort(o)) + '</span>' +
        '</span>' +
        '<span class="rail__go">' + icon('next', { size: 16 }) + '</span>';
      item.addEventListener('click', function () { openObject(id); });
      list.appendChild(item);
    });
    b3.appendChild(list);
    b3.appendChild(el('div', 'rail__meta',
      SKY_PLACE.name + ' · přesný čas si ověř ve Stellariu'));
    rail.appendChild(b3);
  }

  /* 4) poslední objev – propojení s deníkem */
  const last = journalEntries()[0];
  if (last) {
    const b4 = el('div', 'rail__block');
    b4.appendChild(el('div', 'rail__label', 'Naposledy'));
    const item = el('button', 'rail__item');
    item.innerHTML =
      icon(last.kind === 'objev' ? 'star' : 'journal', { size: 18 }) +
      '<span>' + last.what + '<span class="rail__sub">' + last.date + '</span></span>' +
      '<span class="rail__go">' + icon('next', { size: 16 }) + '</span>';
    item.addEventListener('click', function () { go('journal'); });
    b4.appendChild(item);
    rail.appendChild(b4);
  }

  return rail;
}

/** Souřadnice v krátkém zápisu, nebo poznámka u pohyblivých objektů. */
function coordsShort(o) {
  if (o.moving) return 'poloha se mění';
  if (o.coordsNote) return o.coordsNote;
  if (typeof o.ra !== 'number') return o.constellation;
  return raText(o.ra) + ' ' + decText(o.dec);
}

/* ---------------------- 6a) TŘI DRÁHY POSTUPU ---------------------------
   XP zůstávají, protože na nich stojí úrovně a odznaky z verze 1. Nad nimi
   ale běží tři dráhy, které říkají něco konkrétního: kolik jsi viděl,
   kolik jsi vyfotil a kolik už chápeš.                                   */

const TRACK_RANKS = ['Začátečník', 'Hledač', 'Znalec', 'Průzkumník', 'Mistr'];

const TRACKS = [
  {
    id: 'observer', name: 'Pozorovatel', icon: 'telescope',
    unit: 'objektů',
    value: function () { return Object.keys(state.discovered).length; },
    max: function () { return SPACE_OBJECTS.length; },
    note: function (v, m) {
      return v === 0 ? 'Objev první objekt na výpravě.'
                     : 'Objevil jsi ' + v + ' z ' + m + ' objektů oblohy.';
    }
  },
  {
    id: 'photographer', name: 'Fotograf', icon: 'camera',
    unit: 'snímků a výzev',
    value: function () {
      let photos = 0;
      Object.keys(state.discovered).forEach(function (id) {
        if (state.discovered[id].photo) photos++;
      });
      let goals = 0;
      Object.keys(state.awarded || {}).forEach(function (k) {
        if (k.indexOf(':simgoal:') !== -1) goals++;
      });
      return photos + goals;
    },
    max: function () {
      return SPACE_OBJECTS.length + (typeof SIMS !== 'undefined' ? Object.keys(SIMS).length : 0);
    },
    note: function () {
      let photos = 0;
      Object.keys(state.discovered).forEach(function (id) {
        if (state.discovered[id].photo) photos++;
      });
      let goals = 0;
      Object.keys(state.awarded || {}).forEach(function (k) {
        if (k.indexOf(':simgoal:') !== -1) goals++;
      });
      if (!photos && !goals) return 'Splň výzvu ve fotolabu nebo nahraj vlastní snímek.';
      return photos + (photos === 1 ? ' vlastní snímek' : ' vlastních snímků') +
             ' · ' + goals + (goals === 1 ? ' splněná výzva' : ' splněných výzev');
    }
  },
  {
    id: 'theorist', name: 'Teoretik', icon: 'book',
    unit: 'pojmů a faktů',
    value: function () {
      return Object.keys(state.terms).length + Object.keys(state.facts).length;
    },
    max: function () {
      return (typeof TERMS !== 'undefined' ? Object.keys(TERMS).length : 0) +
             Object.keys(FACTS).length;
    },
    note: function () {
      const t = Object.keys(state.terms).length, f = Object.keys(state.facts).length;
      if (!t && !f) return 'Pojmy a zajímavosti se odemykají ve výpravách.';
      return t + ' pojmů · ' + f + ' zajímavostí';
    }
  }
];

function trackRank(ratio) {
  if (ratio >= 0.85) return TRACK_RANKS[4];
  if (ratio >= 0.6) return TRACK_RANKS[3];
  if (ratio >= 0.35) return TRACK_RANKS[2];
  if (ratio > 0) return TRACK_RANKS[1];
  return TRACK_RANKS[0];
}

/** Tři dráhy jako tichý pruh (na Obloze). */
function trackStrip() {
  const box = el('div', 'tracks');
  TRACKS.forEach(function (t) {
    const v = t.value(), m = t.max();
    const ratio = m ? Math.min(1, v / m) : 0;
    const row = el('div', 'track');
    row.innerHTML =
      '<div class="track__head">' +
        '<span class="track__name">' + icon(t.icon, { size: 15 }) + t.name + '</span>' +
        '<span class="track__val">' + v + ' / ' + m + '</span>' +
      '</div>' +
      '<div class="track__bar"><span style="width:' + (ratio * 100).toFixed(1) + '%"></span></div>' +
      '<div class="track__note">' + trackRank(ratio) + ' · ' + t.note(v, m) + '</div>';
    box.appendChild(row);
  });
  return box;
}

/* -------------------- 6b) JMÉNO MLADÉHO ASTRONAUTA ---------------------- */
function nameBox() {
  const box = el('div', 'panel stack panel--tight');
  box.appendChild(el('div', 'stat__label', icon('people', { size: 15 }) + 'Jak ti máme říkat?'));
  const row = el('div', 'namerow');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'nameinput';
  input.placeholder = 'tvoje jméno';
  input.maxLength = 20;
  const ok = el('button', 'btn btn--small', 'Uložit');
  function save() {
    const v = input.value.trim();
    if (!v) return;
    state.name = v;
    saveState();
    toast('Vítej v akademii, ' + v + '!');
    go('home');
  }
  ok.addEventListener('click', save);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') save(); });
  row.appendChild(input); row.appendChild(ok);
  box.appendChild(row);
  return box;
}

/* ---------------------- 6c) NOČNÍ (ČERVENÝ) REŽIM ----------------------- */
/* Při pozorování se oči přizpůsobí tmě asi po 20 minutách. Bílé světlo
   z displeje to zničí za sekundu, červené téměř ne – proto noční režim.   */
function applyNightMode() {
  document.body.classList.toggle('night', !!state.night);
}
function nightToggle() {
  const b = el('button', 'btn btn--ghost btn--small');
  b.innerHTML = icon(state.night ? 'day' : 'night', { size: 17 }) +
    '<span>' + (state.night ? 'Vypnout noční režim' : 'Noční režim (u dalekohledu)') + '</span>';
  b.addEventListener('click', function () {
    state.night = !state.night;
    saveState();
    applyNightMode();
    toast(state.night ? 'Noční režim zapnutý' : 'Noční režim vypnutý');
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

/* ------------------------------ VÝPRAVY ---------------------------------
   Cesta akademií: co už je za tebou, co je právě teď a co tě čeká.
   Žádné karty – jen řádky, linky a jedno zvýrazněné místo.              */
function screenExpeditions() {
  const s = el('div', 'screen stack');
  const doneCount = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;
  const nextL = nextLesson();

  const head = el('div', 'stack stack--tight');
  head.appendChild(el('h1', 'h-hero', 'Výpravy'));
  head.appendChild(el('p', 'lead',
    'Dvaadvacet výprav. Každá má hádanku, vysvětlení, úlohu s Dwarfem a na konci ' +
    'krátký test. Hotovo: ' + doneCount + ' z ' + LESSONS.length + '.'));
  s.appendChild(head);

  const path = el('div', 'path');
  LESSONS.forEach(function (l, i) {
    const done = isLessonDone(l.id);
    const isNow = !done && l.id === nextL.id;
    const b = el('button', 'path__item' + (done ? ' is-done' : '') + (isNow ? ' is-now' : ''));
    const badge = BADGES[l.badge];
    const r = state.lessons[l.id];
    b.innerHTML =
      '<span class="path__dot">' + (done ? icon('check', { size: 16 }) : (i + 1)) + '</span>' +
      '<span class="path__body">' +
        '<span class="path__title">' + l.title + '</span>' +
        '<span class="path__teaser">' + l.teaser + '</span>' +
        '<span class="path__meta">' +
          (done ? 'hotovo · test ' + r.score + '/' + r.total +
                  (badge ? ' · ' + badge.name : '')
                : l.minutes + (isNow ? ' · právě teď' : '') +
                  (badge ? ' · kvalifikace ' + badge.name : '')) +
        '</span>' +
      '</span>' +
      '<span class="path__go">' + icon(done ? 'reset' : 'next', { size: 18 }) + '</span>';
    b.addEventListener('click', function () { startLesson(l.id); });
    path.appendChild(b);
  });
  s.appendChild(path);

  /* trénink – dostupný, až když má z čeho vybírat */
  if (doneCount >= 3) {
    const t = el('div', 'stack stack--tight');
    t.appendChild(el('div', 'sechead',
      '<span class="sechead__t">' + icon('target', { size: 15 }) + 'Hvězdný trénink</span>'));
    t.appendChild(el('p', 'sub',
      'Deset otázek zamíchaných ze všech hotových výprav.' +
      (state.bestTraining ? ' Tvůj rekord: ' + state.bestTraining + '/10.' : '')));
    const b = el('button', 'btn btn--ghost btn--small', 'Spustit trénink');
    b.addEventListener('click', function () { training = null; go('training'); });
    t.appendChild(b);
    s.appendChild(t);
  }

  /* co se chystá – bez falešných slibů, jen výhled */
  if (typeof UPCOMING !== 'undefined' && UPCOMING.length) {
    const u = el('div', 'stack stack--tight');
    u.appendChild(el('div', 'sechead',
      '<span class="sechead__t">' + icon('hourglass', { size: 15 }) + 'Co se chystá</span>' +
      '<span class="sechead__n">' + UPCOMING.length + '</span>'));
    const grid = el('div', 'tiles');
    UPCOMING.forEach(function (x) {
      const t = el('div', 'tile tile--locked');
      t.innerHTML = '<span class="tile__icon">' + iconEmoji(x.icon, { size: 18 }) + '</span>' +
                    '<span><span class="tile__name">' + x.title + '</span>' +
                    '<span class="tile__meta">' + x.teaser + '</span></span>';
      grid.appendChild(t);
    });
    u.appendChild(grid);
    s.appendChild(u);
  }

  return s;
}

/* ------------------------------ POSTUP ----------------------------------
   Ne body za body, ale tři dráhy, které říkají něco konkrétního, a
   kvalifikace, které se dají získat jen tím, že něco doopravdy umíš.
   XP a úrovně zůstávají (jsou z verze 1 a dítě na nich už něco má).     */
function screenProgress() {
  const s = el('div', 'screen stack');
  const lv = currentLevel();

  const head = el('div', 'stack stack--tight');
  head.appendChild(el('h1', 'h-hero', 'Postup'));
  head.appendChild(el('p', 'lead',
    'Tři dráhy. Pozorovatel je o tom, co jsi viděl, fotograf o tom, co jsi vyfotil, ' +
    'a teoretik o tom, co už chápeš.'));
  s.appendChild(head);

  /* tři dráhy – podrobně */
  const box = el('div', 'tracks');
  TRACKS.forEach(function (t) {
    const v = t.value(), m = t.max();
    const ratio = m ? Math.min(1, v / m) : 0;
    const row = el('div', 'track');
    row.innerHTML =
      '<div class="track__head">' +
        '<span class="track__name">' + icon(t.icon, { size: 16 }) + t.name + '</span>' +
        '<span class="track__val">' + v + ' / ' + m + ' ' + t.unit + '</span>' +
      '</div>' +
      '<div class="track__bar"><span style="width:' + (ratio * 100).toFixed(1) + '%"></span></div>' +
      '<div class="track__rank">' + trackRank(ratio) + '</div>' +
      '<div class="track__note">' + t.note(v, m) + '</div>';
    box.appendChild(row);
  });
  s.appendChild(box);

  /* úroveň a XP – pořád tu jsou, jen už nejsou to hlavní */
  const lvl = el('div', 'stack stack--tight');
  lvl.appendChild(el('div', 'sechead',
    '<span class="sechead__t">' + icon('star', { size: 15 }) + 'Úroveň</span>' +
    '<span class="sechead__n">' + state.xp + ' XP</span>'));
  const ratio = lv.next
    ? Math.min(1, (state.xp - lv.level.xp) / Math.max(1, lv.next.xp - lv.level.xp)) : 1;
  const st = el('div', 'stat');
  st.innerHTML =
    '<div class="stat__value">' + lv.level.name + '</div>' +
    '<div class="levelbar"><span style="width:' + (ratio * 100) + '%"></span></div>' +
    '<div class="track__note">' + (lv.next
      ? 'Do úrovně ' + lv.next.name + ' ti chybí ' + (lv.next.xp - state.xp) + ' XP.'
      : 'Nejvyšší úroveň akademie.') + '</div>';
  lvl.appendChild(st);
  s.appendChild(lvl);

  /* kvalifikace (dřív odznaky) */
  const badgeIds = Object.keys(BADGES);
  const got = badgeIds.filter(function (id) { return state.badges.indexOf(id) !== -1; });
  const q = el('div', 'stack stack--tight');
  q.appendChild(el('div', 'sechead',
    '<span class="sechead__t">' + icon('medal', { size: 15 }) + 'Kvalifikace</span>' +
    '<span class="sechead__n">' + got.length + ' / ' + badgeIds.length + '</span>'));
  q.appendChild(el('p', 'sub',
    'Každá kvalifikace znamená jednu dokončenou výpravu včetně testu a úlohy venku.'));
  const row = el('div', 'badge-row');
  badgeIds.forEach(function (id) {
    const b = BADGES[id];
    const has = state.badges.indexOf(id) !== -1;
    const l = LESSONS.filter(function (x) { return x.badge === id; })[0];
    row.appendChild(el('div', 'badge-chip' + (has ? '' : ' badge-chip--locked'),
      icon(has ? 'medal' : 'lock', { size: 17 }) +
      '<span>' + b.name + '<small>' + (has ? (b.text || 'získáno') : (l ? 'výprava ' + l.title : 'zamčeno')) +
      '</small></span>'));
  });
  q.appendChild(row);
  s.appendChild(q);

  /* co všechno se dá prohlížet – tiché odkazy, ne dlaždicové menu */
  const more = el('div', 'stack stack--tight');
  more.appendChild(el('div', 'sechead',
    '<span class="sechead__t">' + icon('layers', { size: 15 }) + 'Co už máš nasbírané</span>'));
  const list = el('div', 'rail__list');
  [
    { icon: 'book', name: 'Slovníček pojmů',
      meta: Object.keys(state.terms).length + ' z ' +
            (typeof TERMS !== 'undefined' ? Object.keys(TERMS).length : 0) + ' vysvětlených',
      go: function () { go('terms'); } },
    { icon: 'bulb', name: 'Zajímavosti',
      meta: Object.keys(state.facts).length + ' z ' + Object.keys(FACTS).length + ' nasbíraných',
      go: function () { go('facts'); } },
    { icon: 'star', name: 'Objevené objekty',
      meta: Object.keys(state.discovered).length + ' z ' + SPACE_OBJECTS.length + ' objektů',
      go: function () { go('collection'); } },
    { icon: 'link', name: 'Zdroje',
      meta: 'NASA · ESA · ESO · DwarfLab', go: function () { go('sources'); } },
    { icon: 'shield', name: 'Pro rodiče',
      meta: 'přehled a vynulování', go: function () { go('parent'); } }
  ].concat(allLessonsDone() ? [{
    icon: 'trophy', name: 'Diplom', meta: 'všech ' + LESSONS.length + ' výprav hotových',
    go: function () { go('certificate'); }
  }] : []).forEach(function (it) {
    const b = el('button', 'rail__item');
    b.innerHTML = icon(it.icon, { size: 18 }) +
      '<span>' + it.name + '<span class="rail__sub">' + it.meta + '</span></span>' +
      '<span class="rail__go">' + icon('next', { size: 16 }) + '</span>';
    b.addEventListener('click', it.go);
    list.appendChild(b);
  });
  more.appendChild(list);
  s.appendChild(more);

  return s;
}

/* --------------------------- SLOVNÍČEK ---------------------------------- */
function screenTerms() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h1', 'h-hero', 'Slovníček'));
  const ids = Object.keys(TERMS);
  const got = ids.filter(function (id) { return state.terms[id]; });
  s.appendChild(el('p', 'sub', 'Všechny pojmy z akademie na jednom místě. Zatím vysvětlených: ' +
    got.length + ' z ' + ids.length + '. Ostatní se odemknou v lekcích.'));

  /* filtrování podle skupiny */
  const groups = {};
  ids.forEach(function (id) { groups[TERMS[id].group || 'ostatní'] = true; });
  const groupNames = Object.keys(groups);
  let active = 'vše';
  const bar = el('div', 'chips');
  const body = el('div');

  function render() {
    body.innerHTML = '';
    const list = el('div', 'terms terms--grid');
    ids.forEach(function (id) {
      const t = TERMS[id];
      if (active !== 'vše' && (t.group || 'ostatní') !== active) return;
      if (state.terms[id]) {
        list.appendChild(termCard(id));
      } else {
        const c = el('div', 'panel term term--locked');
        c.appendChild(el('div', 'term__head',
          '<span class="term__icon">' + icon('lock', { size: 16 }) + '</span>' +
          '<span><span class="term__name">' + t.name +
          '</span><span class="term__short">odemkneš ve výpravě</span></span>'));
        list.appendChild(c);
      }
    });
    body.appendChild(list);
  }

  ['vše'].concat(groupNames).forEach(function (g) {
    const b = el('button', 'chip' + (g === 'vše' ? ' is-on' : ''), g);
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

  return s;
}

/* ---------------------- SBÍRKA ZAJÍMAVOSTÍ ------------------------------ */
function screenFacts() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h1', 'h-hero', 'Zajímavosti'));
  const ids = Object.keys(FACTS);
  const got = ids.filter(function (id) { return state.facts[id]; });
  s.appendChild(el('p', 'sub', 'Nasbíráno: ' + got.length + ' z ' + ids.length +
    '. Další se odemknou v lekcích.'));

  const grid = el('div', 'factgrid');
  ids.forEach(function (id, i) {
    const f = FACTS[id];
    const has = !!state.facts[id];
    const c = el('div', 'panel factmini' + (has ? '' : ' is-locked') + ' screen delay-' + Math.min(4, i + 1));
    c.innerHTML = has
      ? '<div class="factmini__icon">' + iconEmoji(f.icon, { size: 16 }) + '</div>' +
        '<div class="factmini__title">' + f.title + '</div>' +
        '<p class="factmini__text">' + f.text + '</p>' +
        (f.source ? '<a class="factcard__src" href="' + f.source + '" target="_blank" rel="noopener">' +
          (f.sourceLabel || 'zdroj') + ' ↗</a>' : '')
      : '<div class="factmini__title">' + icon('lock', { size: 14 }) + ' Ještě neodemčené</div>' +
        '<p class="factmini__text">Najdeš to v jedné z výprav.</p>';
    grid.appendChild(c);
  });
  s.appendChild(grid);

  return s;
}

/* =========================== 7) LEKCIA ================================== */

function startLesson(id, fromHash) {
  lesson = LESSONS.filter(function (l) { return l.id === id; })[0];

  /* Automaticky vkládané kroky odstraníme, aby se při opakovaném spuštění
     lekce nezdvojovaly. Všechno ostatní zůstává přesně tak, jak je v datech. */
  lesson.steps = lesson.steps.filter(function (s) {
    return s.type !== 'basics' && s.type !== 'result' && s.type !== 'warmup';
  });

  /* Krok „📖 ZÁKLADY“ se vkládá automaticky hned za hádanku – v datech lekce
     stačí uvést pole basics: ['expozicia', 'gain', …] (viz data/terms.js). */
  if (lesson.basics && lesson.basics.length && typeof TERMS !== 'undefined') {
    const after = (lesson.steps[0] && lesson.steps[0].type === 'guess') ? 1 : 0;
    lesson.steps.splice(after, 0, { type: 'basics', terms: lesson.basics, xp: 10 });
  }

  /* Krok „🔁 ROZCVIČKA“ – jen když má dítě co opakovat z jiných lekcí. */
  const warmItems = warmupQuestions(id, 3);
  if (warmItems.length >= 2) {
    lesson.steps.unshift({ type: 'warmup', items: warmItems, xp: 15 });
  }

  stepIndex = 0;
  quiz = null;
  warm = null;
  if (fromHash) { route = { name: 'lesson' }; render(); scrollTop(); }
  else { go('lesson'); }
}

function nextStep() {
  if (stepIndex < lesson.steps.length - 1) {
    stepIndex++;
    go('lesson');
  } else {
    go('home');
  }
}

/* Registr vykreslovačů kroků – nový typ kroku = nová funkce tady. */
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

/* Kroky, u kterých má na širokém monitoru smysl dát obrázek vedle textu.
   U ostatních (simulátor, kvíz, karty) si rozvržení řídí krok sám.      */
const SPLIT_STEPS = { guess: 1, info: 1, fact: 1, mission: 1, wow: 1 };

function screenLessonStep() {
  const step = lesson.steps[stepIndex];
  const fn = STEP_RENDERERS[step.type];
  const screen = el('div', 'screen lesson');

  /* tichá hlavička: kde v výpravě jsme */
  screen.appendChild(el('div', 'lesson__step',
    'Krok ' + (stepIndex + 1) + ' z ' + lesson.steps.length + ' · ' + lesson.title));

  const wrap = el('div', 'lesson__body step-in');
  if (!fn) {
    wrap.appendChild(el('p', null, 'Neznámý typ kroku: ' + step.type));
    screen.appendChild(wrap);
    return screen;
  }
  fn(step, wrap);

  /* Obrázek doleva, text a odpovědi doprava – bez zásahu do vykreslovačů:
     přeskládáme až hotový obsah kroku.                                   */
  if (SPLIT_STEPS[step.type]) {
    const media = wrap.firstChild;
    if (media && media.classList && media.classList.contains('photo')) {
      const left = el('div', 'lesson__media');
      const right = el('div', 'lesson__text stack');
      wrap.removeChild(media);
      left.appendChild(media);
      while (wrap.firstChild) right.appendChild(wrap.firstChild);
      wrap.classList.add('lesson__body--split');
      wrap.appendChild(left);
      wrap.appendChild(right);
    }
  }
  screen.appendChild(wrap);
  return screen;
}

/* --------------------------- 7a) HÁDANKA -------------------------------- */
function stepGuess(step, wrap) {
  wrap.appendChild(photoEl(step.image, { className: 'photo--tall' }));
  wrap.appendChild(el('h2', 'h-step', textIcon(step.question)));

  const answers = el('div', 'answers answers--2');
  const feedback = el('div');
  let solved = false;

  step.options.forEach(function (opt) {
    const b = el('button', 'answer');
    b.innerHTML = '<span class="answer__icon">' + iconEmoji(opt.icon, { size: 18 }) +
                  '</span><span>' + opt.label + '</span>';
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
        feedback.appendChild(nextButton('Pokračovat', nextStep));
      } else {
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--no');
        f.innerHTML = '<div class="feedback__title">Zkus to ještě jednou</div><div>' + step.retryText + '</div>';
        feedback.appendChild(f);
      }
    });
    answers.appendChild(b);
  });

  wrap.appendChild(answers);
  wrap.appendChild(feedback);
}

/* ------------------------- 7a2) ZÁKLADY (slovníček) --------------------- */
/* Karta pojmu: ikona + název + jedna věta. Pokud má pojem "compare",
   zobrazí se dva obrázky vedle sebe (např. málo vs. hodně).            */
function termCard(id, opts) {
  opts = opts || {};
  const t = TERMS[id];
  if (!t) return el('div');
  const card = el('div', 'panel term' + (opts.className ? ' ' + opts.className : ''));
  card.appendChild(el('div', 'term__head',
    '<span class="term__icon">' + iconEmoji(t.icon, { size: 17 }) + '</span>' +
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
  if (t.warn) card.appendChild(el('p', 'term__warn', t.warn));
  /* Nepovinné hlubší vysvětlení – pro toho, kdo chce vědět přesně proč. */
  if (t.deep) card.appendChild(moreBox([t.deep], 'Proč to tak je'));
  return card;
}

function stepBasics(step, wrap) {
  wrap.appendChild(el('h2', 'h-step', icon('book', { size: 22, cls: 'ico--head' }) + '<span>Základy</span>'));
  wrap.appendChild(el('p', 'sub',
    'Slova, která budeš v této lekci potřebovat. Přečti si je – potom už bude všechno ' +
    'jasné.'));

  let noveNove = 0;
  const list = el('div', 'terms');
  step.terms.forEach(function (id, i) {
    if (!TERMS[id]) return;
    if (unlockTerm(id)) noveNove++;
    list.appendChild(termCard(id, { className: 'screen delay-' + Math.min(4, i + 1) }));
  });
  wrap.appendChild(list);

  if (noveNove) {
    wrap.appendChild(el('p', 'sub',
      noveNove + ' ' + (noveNove === 1 ? 'nový pojem se uložil' : 'nových pojmů se uložilo') +
      ' do tvého slovníčku.'));
  }
  wrap.appendChild(nextButton('Rozumím, jdeme dál', function () {
    addXp(step.xp || 10, lesson.id + ':basics');
    nextStep();
  }));
}

/* --------------------------- 7b) INFO ----------------------------------- */
function stepInfo(step, wrap) {
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));
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

  /* Nepovinné rozšíření: „Chci vědět víc“ – kdo chce, dozví se detail;
     kdo nechce, není zatížen dlouhým textem. */
  if (step.more && step.more.length) wrap.appendChild(moreBox(step.more));

  wrap.appendChild(nextButton(step.cta || 'Pokračovat', nextStep));
}

/* Jednoduchá animovaná ilustrace koloběhu: oblak → hvězda → mlhovina */
function nebulaCycleDiagram() {
  const d = el('div', 'cycle');
  d.innerHTML =
    '<div class="cycle__node"><span>' + icon('nebula', { size: 24 }) +
    '</span><small>oblak plynu<br>a prachu</small></div>' +
    '<div class="cycle__arrow"></div>' +
    '<div class="cycle__node"><span>' + icon('star', { size: 24 }) +
    '</span><small>rodí se<br>hvězda</small></div>' +
    '<div class="cycle__arrow"></div>' +
    '<div class="cycle__node"><span>' + icon('supernova', { size: 24 }) +
    '</span><small>hvězda zemře<br>a vznikne ' +
    'mlhovina</small></div>';
  return d;
}

/* Animovaná ilustrace: celá obloha se točí okolo nebeského pólu */
function skyRotationDiagram() {
  const d = el('div', 'skyrot');
  const r = seededRandom(2026);
  let dots = '';
  for (let i = 0; i < 46; i++) {
    const ang = r() * Math.PI * 2;
    const rad = 12 + r() * 46;                    // v procentech poloměru
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
    '<p class="skyrot__caption">Obloha se točí okolo jednoho bodu – <strong>nebeského ' +
    'pólu</strong>. ' +
    'Hned u něj stojí Polárka. Rychlost: 15° za hodinu.</p>';
  return d;
}

/* --------------------------- 7c) KARTY TYPOV ---------------------------- */
function stepCards(step, wrap) {
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));
  wrap.appendChild(el('p', 'sub', step.subtitle));

  /* karty se dají zadat dvěma způsoby:
     kinds: ['emission', …]  → vezmou se z NEBULA_KINDS
     cards: [{icon,name,short,text,image,exampleLabel}, …] → přímo v lekci     */
  const items = step.cards
    ? step.cards
    : step.kinds.map(function (id) { return NEBULA_KINDS[id]; });

  const grid = el('div', 'kinds' + (items.length <= 2 ? ' kinds--wide' : ''));
  let seen = 0;
  const total = items.length;
  const cta = nextButton(step.cta || 'Pokračovat', nextStep);
  cta.disabled = true;
  cta.style.opacity = '.45';
  const hintText = 'Otevři všechny karty · ';
  const hint = el('p', 'sub center pulse', hintText + '(0/' + total + ')');

  items.forEach(function (k, idx) {
    const card = el('button', 'kind screen delay-' + Math.min(4, idx + 1));
    const inner = el('div', 'kind__inner');

    const front = el('div', 'kind__face kind__face--front');
    front.appendChild(photoEl(k.image, { credit: false, className: 'photo--fill' }));
    front.appendChild(el('div', 'kind__caption',
      '<div class="kind__icon">' + iconEmoji(k.icon, { size: 20 }) + '</div>' +
      '<div class="kind__name">' + k.name + '</div>' +
      '<div class="kind__short">' + k.short + '</div>' +
      '<div class="kind__flip">Klikni pro víc</div>'));

    const back = el('div', 'kind__face kind__face--back');
    back.innerHTML =
      '<div class="kind__icon">' + iconEmoji(k.icon, { size: 20 }) + '</div>' +
      '<div class="kind__name" style="margin:6px 0 10px">' + k.name + '</div>' +
      '<div class="kind__text">' + k.text + '</div>' +
      '<div class="kind__flip">' + (k.exampleLabel
        ? k.exampleLabel
        : 'Příklad: ' + (IMAGES[k.image] ? IMAGES[k.image].title : '')) + '</div>';

    inner.appendChild(front); inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
      if (!card.classList.contains('is-seen')) {
        card.classList.add('is-seen');
        seen++;
        hint.textContent = hintText + '(' + seen + '/' + total + ')';
        if (seen === total) {
          hint.textContent = 'Máš to! Jdeme dál.';
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

/* --------------------------- 7d) VYBER OBRÁZEK -------------------------- */
function stepPick(step, wrap) {
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));
  wrap.appendChild(el('p', 'lead', step.prompt));

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
        f.innerHTML = '<div class="feedback__title">' + icon('check', { size: 15 }) + 'Správně</div><div>' + opt.explain + '</div>';
        feedback.appendChild(f);
        feedback.appendChild(nextButton('Pokračovat', nextStep));
      } else {
        b.classList.remove('is-wrong'); void b.offsetWidth; b.classList.add('is-wrong');
        feedback.innerHTML = '';
        const f = el('div', 'feedback feedback--no');
        f.innerHTML = '<div class="feedback__title">Ještě ne</div><div>' + opt.explain + '</div>';
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
    const f = el('p', 'sub', step.footnote);
    f.style.marginTop = '22px';
    box.appendChild(f);
  }
  wrap.appendChild(box);
  wrap.appendChild(nextButton(step.cta || 'Pokračovat', nextStep));
}

/* --------------------------- 7f) OKO vs. DWARF -------------------------- */
function stepCompare(step, wrap) {
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));
  wrap.appendChild(el('p', 'lead', step.lead));

  const grid = el('div', 'compare');

  /* levý sloupec – oko */
  const c1 = el('div', 'compare__col');
  c1.appendChild(el('div', 'compare__head', iconEmoji(step.eye.icon, { size: 16 }) +
    '<span>' + step.eye.label + '</span>'));
  if (step.eye.art) {
    // levá strana je taky obrázek (např. roztočené hvězdy bez EQ režimu)
    c1.appendChild(photoEl(step.eye.art, { credit: false }));
  } else {
    const eye = el('div', 'eye-view');
    // pár slabých tečiček + téměř neviditelná šmouha = to, co opravdu vidí oko
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

  /* pravý sloupec – fotografie */
  const c2 = el('div', 'compare__col');
  c2.appendChild(el('div', 'compare__head', iconEmoji(step.camera.icon, { size: 16 }) +
    '<span>' + step.camera.label + '</span>'));
  c2.appendChild(photoEl(step.camera.image, { credit: false }));
  c2.appendChild(el('p', 'compare__note', step.camera.text));
  grid.appendChild(c2);

  wrap.appendChild(grid);

  /* mini kontrolní otázka */
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
        wrap.appendChild(nextButton(step.cta || 'Pokračovat', nextStep));
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
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));
  if (step.lead) wrap.appendChild(el('p', 'lead', step.lead));

  const list = el('div', 'howto');
  step.steps.forEach(function (s, i) {
    const row = el('div', 'howto__row screen delay-' + Math.min(2, i + 1));
    row.innerHTML =
      '<div class="howto__num">' + (i + 1) + '</div>' +
      '<div class="howto__icon">' + iconEmoji(s.icon, { size: 18 }) + '</div>' +
      '<div><div class="howto__title">' + s.title + '</div>' +
      '<div class="howto__text">' + s.text + '</div></div>';
    list.appendChild(row);
  });
  wrap.appendChild(list);
  if (step.note) wrap.appendChild(el('p', 'sub', 'ℹ️ ' + step.note));

  wrap.appendChild(nextButton(step.cta || 'Pokračovat', function () {
    addXp(step.xp || 15, lesson.id + ':howto');
    nextStep();
  }));
}

/* ------------------- 7g2) INTERAKTIVNÍ ÚLOHA (SIMULACE) -----------------
   Obsah je v data/sims.js, kreslení v sim-engine.js. Tento krok jen
   postaví ovladače, canvas a hodnocení – nic o konkrétní úloze neví.      */
function stepSim(step, wrap) {
  const sim = (typeof SIMS !== 'undefined') ? SIMS[step.simId] : null;
  const eng = (typeof SIM_ENGINE !== 'undefined') ? SIM_ENGINE[step.simId] : null;
  if (!sim || !eng) { nextStep(); return; }

  /* aktuální hodnoty ovladačů */
  const v = {};
  sim.controls.forEach(function (c) { v[c.id] = c.start; });

  const head = el('div', 'stack stack--tight');
  head.appendChild(el('h2', 'h-step', textIcon(sim.title)));
  if (sim.lead) head.appendChild(el('p', 'lead', sim.lead));
  wrap.appendChild(head);

  /* Rozvržení: vlevo ovládám, vpravo vidím a hned pod tím, co to znamená. */
  const layout = el('div', 'sim-layout');
  const colCtrl = el('div', 'sim-layout__ctrl');
  const colView = el('div', 'sim-layout__view');
  layout.appendChild(colCtrl);
  layout.appendChild(colView);
  wrap.appendChild(layout);

  /* ---- náhled ---- */
  const stage = el('div', 'sim');
  const canvas = document.createElement('canvas');
  canvas.className = 'sim__canvas';
  stage.appendChild(canvas);
  if (sim.target) stage.appendChild(el('div', 'sim__target', sim.target));
  colView.appendChild(stage);

  /* ---- čísla pod náhledem ---- */
  const statsRow = el('div', 'simstats');
  if (eng.stats) colView.appendChild(statsRow);

  /* ---- hodnocení ---- */
  const verdictBox = el('div', 'simverdict');
  colView.appendChild(verdictBox);

  /* ---- ovladače ---- */
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
      /* přepínač (např. AZ / EQ) */
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
  colCtrl.appendChild(ctrls);

  /* ---- výzva ---- */
  let challengeBox = null;
  if (sim.challenge) {
    challengeBox = el('div', 'simgoal');
    challengeBox.innerHTML =
      '<div class="simgoal__label">' + icon('target', { size: 14 }) + 'Výzva</div>' +
      '<div class="simgoal__text">' + sim.challenge.text + '</div>';
    colCtrl.appendChild(challengeBox);
  }

  /* ---- rady (rozbalovací, aby neprozradily řešení hned) ------- */
  if (sim.tips && sim.tips.length) {
    const det = document.createElement('details');
    det.className = 'more';
    det.innerHTML = '<summary class="more__sum">' + icon('bulb', { size: 15 }) +
      'Potřebuji radu</summary>' +
      '<ul class="more__list">' + sim.tips.map(function (t) {
        return '<li>' + t + '</li>';
      }).join('') + '</ul>';
    colCtrl.appendChild(det);
  }

  /* ---- pokračování ---- */
  colCtrl.appendChild(nextButton(step.cta || 'Pokračovat', function () {
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
      verdictBox.innerHTML = '<span class="simverdict__icon">' +
                             iconEmoji(r.icon, { size: 18 }) + '</span>' +
                             '<span>' + r.text + '</span>';
    }
    /* výzva splněna – bonusové XP jednou */
    if (challengeBox && eng.goal && !goalDone && eng.goal(v)) {
      goalDone = true;
      challengeBox.classList.add('is-done');
      challengeBox.innerHTML =
        '<div class="simgoal__label">' + icon('trophy', { size: 14 }) + 'Výzva splněna</div>' +
        '<div class="simgoal__text">' + (sim.challenge.done || 'Přesně takhle to funguje i doopravdy.') + '</div>';
      sfx('goal');
      addXp(step.bonusXp || 15, lesson.id + ':simgoal:' + step.simId);
    }
  }

  /* první vykreslení až když canvas zná svou šířku */
  requestAnimationFrame(function () { paint(); });
  update();

  /* při změně velikosti okna překresli */
  const onResize = function () { if (document.body.contains(canvas)) paint(); };
  window.addEventListener('resize', onResize);
}

/* --------------------------- 7h) VÍŠ, ŽE? ------------------------------- */
function stepFact(step, wrap) {
  const f = FACTS[step.factId];
  if (!f) { nextStep(); return; }
  const isNew = unlockFact(step.factId);

  const box = el('div', 'panel factcard');
  box.innerHTML =
    '<div class="factcard__label">' + icon('bulb', { size: 14 }) + 'Víš, že?</div>' +
    '<div class="factcard__icon">' + iconEmoji(f.icon, { size: 20 }) + '</div>' +
    '<div class="factcard__title">' + f.title + '</div>' +
    '<p class="factcard__text">' + f.text + '</p>' +
    (f.source ? '<a class="factcard__src" href="' + f.source + '" target="_blank" rel="noopener">Zdroj: ' +
      (f.sourceLabel || 'oficiální zdroj') + ' ↗</a>' : '');
  wrap.appendChild(box);

  if (isNew) {
    wrap.appendChild(el('p', 'sub', 'Přidáno do tvé sbírky zajímavostí.'));
    toast('Nová zajímavost');
  }
  wrap.appendChild(nextButton('Pokračovat', nextStep));
}

/* --------------------------- 7i) MISIA ---------------------------------- */
function stepMission(step, wrap) {
  /* misie může být s objektem (uloží se do sbírky) nebo bez objektu
     (např. „vyfoť tentýž objekt dvakrát“) – tehdy stačí step.image a step.lead */
  const obj = step.objectId ? getObject(step.objectId) : null;
  wrap.appendChild(el('h2', 'h-step', textIcon(step.title)));

  const grid = el('div', 'mission__grid');
  grid.appendChild(photoEl(obj ? obj.image : step.image, { label: 'Misie' }));

  const info = el('div', 'panel stack');
  if (obj) {
    info.appendChild(el('div', 'eyebrow', obj.designation + ' · ' + obj.subtypeLabel));
    info.appendChild(el('h3', null, obj.name));
    const facts = el('dl', 'factlist');
    facts.innerHTML =
      '<div><dt>Typ</dt><dd>' + obj.subtypeLabel + '</dd></div>' +
      '<div><dt>Souhvězdí</dt><dd>' + obj.constellation + '</dd></div>' +
      '<div><dt>Vzdálenost</dt><dd>' + obj.distanceText + '</dd></div>' +
      '<div><dt>Jasnost</dt><dd>' + obj.magnitude + '</dd></div>';
    info.appendChild(facts);
    info.appendChild(el('p', 'compare__note', obj.fact));
  } else {
    info.appendChild(el('div', 'eyebrow', 'ÚLOHA NA VONKU'));
    info.appendChild(el('h3', null, step.subtitle || 'Zkus to doopravdy'));
    info.appendChild(el('p', 'compare__note', step.lead || ''));
  }
  grid.appendChild(info);
  wrap.appendChild(grid);

  step.tasks.forEach(function (t, i) {
    wrap.appendChild(el('div', 'task screen delay-' + (i + 1),
      '<span class="task__icon">' + iconEmoji(t.icon, { size: 17 }) + '</span>' +
      '<span>' + t.text + '</span>'));
  });
  if (obj) {
    wrap.appendChild(el('p', 'sub', obj.stellarium + '<br>' + obj.dwarfTip));
  } else if (step.note) {
    wrap.appendChild(el('p', 'sub', step.note));
  }

  const done = step.objectId
    ? !!state.discovered[step.objectId]
    : !!state.awarded[lesson.id + ':mission'];
  const feedback = el('div');

  /* Po splnění misie se nabídne krátký zápis do pozorovacího deníku. */
  const jslot = el('div');
  function offerJournal() {
    jslot.innerHTML = '';
    const det = document.createElement('details');
    det.className = 'more';
    det.innerHTML = '<summary class="more__sum">' + icon('pencil', { size: 15 }) + 'Zapsat si to do deníku</summary>';
    const holder = el('div');
    holder.style.padding = '0 12px 12px';
    holder.appendChild(journalForm(
      { what: obj ? obj.name + ' (' + obj.designation + ')' : lesson.title, objectId: step.objectId },
      function () { det.open = false; jslot.innerHTML = ''; jslot.appendChild(
        el('div', 'feedback feedback--ok', '<div class="feedback__title">' + icon('check', { size: 15 }) + 'Zapsáno</div>' +
          '<div>Najdeš to v pozorovacím deníku na domovské obrazovce.</div>')); }
    ));
    det.appendChild(holder);
    jslot.appendChild(det);
  }

  if (done) {
    feedback.innerHTML = '<div class="feedback feedback--ok"><div class="feedback__title">' + icon('check', { size: 15 }) + 'Misie splněna</div>' +
      '<div>' + step.doneText + '</div></div>';
    wrap.appendChild(feedback);
    offerJournal();
    wrap.appendChild(jslot);
    wrap.appendChild(nextButton(step.cta || 'Pokračovat', nextStep));
  } else {
    const b = nextButton(step.button, function () {
      if (step.objectId) discoverObject(step.objectId);
      addXp(step.xp || 50, lesson.id + ':mission');
      b.remove();
      feedback.innerHTML = '<div class="feedback feedback--ok done-in"><div class="feedback__title">' +
        icon('star', { size: 15 }) + 'Objev zapsán</div>' +
        '<div>' + step.doneText + '</div></div>';
      offerJournal();
      wrap.appendChild(nextButton(step.cta || 'Pokračovat', nextStep));
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

  /* Postup kvízu jako řádka čárek, ne „Otázka 3 z 5“ v tabulce. */
  const head = el('div', 'row');
  const dots = el('div', 'quiz__dots');
  for (let i = 0; i < qs.length; i++) {
    dots.appendChild(el('i', i < quiz.i ? 'is-ok' : (i === quiz.i ? 'is-on' : null)));
  }
  head.appendChild(dots);
  head.appendChild(el('span', 'quiz__count',
    'otázka ' + (quiz.i + 1) + ' z ' + qs.length +
    (quiz.i ? ' · zatím ' + quiz.score + ' správně' : '')));
  wrap.appendChild(head);
  setProgress((stepIndex + quiz.i / qs.length) / lesson.steps.length);

  renderQuestion(q, wrap, {
    nextLabel: last ? 'Zobrazit výsledek' : 'Další otázka',
    onAnswer: function (ok) {
      if (ok) quiz.score++;
      rememberMiss(lesson.id, quiz.i, ok);      // pro pozdější rozcvičku
    },
    onNext: function () {
      if (last) { finishQuiz(step); } else { quiz.i++; go('lesson'); }
    }
  });
}

/* ------------------- 8b) JEDNA OTÁZKA (společný vykreslovač) -------------
   Používá ho jak mini test na konci lekce, tak rozcvička na jejím začátku.
   opts = { nextLabel, onAnswer(ok), onNext() }                            */
function renderQuestion(q, wrap, opts) {
  wrap.appendChild(el('h2', 'h-step', textIcon(q.question)));
  if (q.hint) wrap.appendChild(el('p', 'sub', q.hint));

  const feedback = el('div');
  let answered = false;

  function finishQuestion(ok, extraText) {
    if (answered) return;
    answered = true;
    if (opts.onAnswer) opts.onAnswer(ok);
    sfx(ok ? 'ok' : 'no');
    const f = el('div', 'feedback ' + (ok ? 'feedback--ok' : 'feedback--no'));
    f.innerHTML = '<div class="feedback__title">' +
                  icon(ok ? 'check' : 'cross', { size: 15 }) +
                  (ok ? 'Správně' : 'Ne úplně') + '</div>' +
                  '<div>' + (extraText || q.explain || '') + '</div>';
    feedback.appendChild(f);
    feedback.appendChild(nextButton(opts.nextLabel || 'Pokračovat', opts.onNext));
  }

  /* --- podle typu otázky --- */
  if (q.kind === 'choice' || q.kind === 'decide') {
    const answers = el('div', 'answers' + (q.kind === 'decide' ? ' answers--2' : ''));
    q.options.forEach(function (opt) {
      const b = el('button', 'answer');
      b.innerHTML = (opt.icon ? '<span class="answer__icon">' +
                     iconEmoji(opt.icon, { size: 18 }) + '</span>' : '') +
                    '<span>' + opt.label + '</span>';
      b.addEventListener('click', function () {
        if (answered) return;
        Array.prototype.forEach.call(answers.children, function (n) { n.classList.add('is-locked'); });
        b.classList.add(opt.correct ? 'is-correct' : 'is-wrong');
        if (!opt.correct) {
          // ukaž i správnou možnost
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
    [{ label: 'Pravda', ico: 'check', v: true },
     { label: 'Nepravda', ico: 'cross', v: false }].forEach(function (o) {
      const b = el('button', 'answer');
      b.innerHTML = '<span class="answer__icon">' + icon(o.ico, { size: 18 }) + '</span>' +
                    '<span>' + o.label + '</span>';
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
      b.innerHTML = '<span class="answer__icon">' + iconEmoji(item.icon, { size: 18 }) +
                    '</span><span>' + item.label + '</span>';
      b.addEventListener('click', function () {
        if (answered || b.classList.contains('is-dim')) return;
        b.classList.add('is-dim', 'is-locked');
        chosen.push(item);
        const slot = el('div', 'order__slot');
        slot.innerHTML = '<span class="order__num">' + chosen.length + '</span>' +
                         '<span>' + iconEmoji(item.icon, { size: 16 }) + ' ' + item.label + '</span>';
        slots.appendChild(slot);
        if (chosen.length === q.items.length) {
          const ok = chosen.every(function (it, i) { return it.order === i + 1; });
          if (!ok) {
            const right = q.items.slice().sort(function (a, b2) { return a.order - b2.order; })
              .map(function (it, i) { return (i + 1) + '. ' + it.label; }).join('<br>');
            finishQuestion(false, 'Správné pořadí je:<br>' + right + '<br><br>' + (q.explain || ''));
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

/* ---------------------- 8c) ROZCVIČKA (adaptivní opakování) --------------
   Otázky, které dítě v minulosti netrefilo, se mu vrátí na začátku
   další lekce. Když je zvládne, ze seznamu zmizí. Žádné trestání –
   jen tichá druhá šance.                                                  */

/** Zapamatuje si chybu (nebo ji odpustí po správné odpovědi). */
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

/** Vybere až `limit` otázek na zopakování – nikdy z právě otevřené lekce. */
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

  wrap.appendChild(el('h2', 'h-step', icon('reset', { size: 22, cls: 'ico--head' }) + '<span>Rozcvička</span>'));
  wrap.appendChild(el('p', 'sub',
    'Krátké zopakování toho, co ti naposledy uniklo. ' +
    (warm.items.length > 1 ? 'Otázka ' + (warm.i + 1) + ' z ' + warm.items.length + '.' : '')));
  wrap.appendChild(el('div', 'warm__from',
    'z výpravy „' + item.lessonTitle + '“'));

  renderQuestion(item.q, wrap, {
    nextLabel: last ? 'Jdeme na novou výpravu' : 'Další',
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

  /* zapiš výsledek */
  state.lessons[lesson.id] = { completed: true, score: score, total: total };
  saveState();
  addXp(lesson.quizXp || 100, lesson.id + ':quiz');

  /* odznak */
  const newBadge = unlockBadge(lesson.badge);

  /* vlož pseudo-krok „result“ na konec lekce a zobraz ho */
  const resultStep = { type: 'result', score: score, total: total, step: step, newBadge: newBadge };
  lesson.steps = lesson.steps.filter(function (s) { return s.type !== 'result'; });
  lesson.steps.push(resultStep);
  stepIndex = lesson.steps.length - 1;
  go('lesson');

  /* Okno s novou kvalifikací se ukáže, jen když je dítě pořád na výsledku. */
  if (newBadge) {
    const gen = renderGen;
    setTimeout(function () {
      if (gen === renderGen) showBadgeOverlay(lesson.badge);
    }, 900);
  }
}

function stepResult(step, wrap) {
  setProgress(1);
  const good = step.score >= Math.ceil(step.total * 0.8);
  const box = el('div', 'panel result stack');
  box.innerHTML =
    '<div class="eyebrow">Misie dokončena</div>' +
    '<div class="result__score">' + step.score + '<small>/' + step.total + '</small></div>' +
    '<div class="lead">' + (good ? step.step.resultGood : step.step.resultOk) + '</div>' +
    '<div class="badge-chip" style="justify-self:center">+' + (lesson.quizXp || 100) + ' XP</div>';
  wrap.appendChild(box);

  const b = BADGES[lesson.badge];
  if (b) {
    const bd = el('div', 'panel center stack');
    bd.innerHTML = '<div class="unlock__icon">' + icon('medal', { size: 34 }) + '</div>' +
      '<div class="eyebrow">Nová kvalifikace</div>' +
      '<div style="font-size:24px;font-weight:900">' + b.name + '</div>' +
      '<div class="sub">' + b.text + '</div>';
    wrap.appendChild(bd);
  }

  /* pokud zbývá další lekce, pošli ho rovnou tam */
  const upcoming = LESSONS.filter(function (l) { return !isLessonDone(l.id); })[0];
  if (upcoming) {
    wrap.appendChild(nextButton('Další výprava: ' + upcoming.title,
      function () { startLesson(upcoming.id); }));
  } else {
    wrap.appendChild(nextButton('Otevřít výpravy', function () { go('expeditions'); }));
  }

  const coll = el('button', 'btn btn--ghost', 'Moje objevy');
  coll.addEventListener('click', function () { go('collection'); });
  wrap.appendChild(coll);
  const again = el('button', 'btn btn--ghost');
  again.innerHTML = icon('reset', { size: 17 }) + '<span>Zkusit test znovu</span>';
  again.addEventListener('click', function () {
    quiz = null;
    stepIndex = lesson.steps.findIndex(function (s) { return s.type === 'quiz'; });
    go('lesson');
  });
  wrap.appendChild(again);
}

/** Zavře překryvné okno, pokud je otevřené. */
function closeOverlay() {
  const ov = document.getElementById('overlay');
  if (!ov || ov.hidden) return;
  ov.hidden = true;
  ov.innerHTML = '';
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
    '<div class="unlock__icon">' + icon('medal', { size: 38 }) + '</div>' +
    '<div class="unlock__label">Nová kvalifikace</div>' +
    '<div class="unlock__name">' + b.name + '</div>' +
    '<div class="sub">' + b.text + '</div>';
  const close = el('button', 'btn', 'Paráda!');
  close.style.marginTop = '22px';
  close.addEventListener('click', function () { ov.hidden = true; ov.innerHTML = ''; });
  card.appendChild(close);
  ov.appendChild(card);
}

/* =========================== 9) ZBIERKA / ZDROJE ======================== */

function screenCollection() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h1', 'h-hero', 'Objevené objekty'));

  const ids = Object.keys(state.discovered);
  if (!ids.length) {
    s.appendChild(el('div', 'empty',
      'Zatím nic. Dokonči výpravu a objev svůj první objekt – rozsvítí se ti na mapě oblohy.'));
  } else {
    const grid = el('div', 'collection');
    ids.forEach(function (id, i) {
      const obj = getObject(id);
      if (!obj) return;
      const rec = state.discovered[id];
      const b = el('button', 'card-obj screen delay-' + Math.min(4, i + 1));
      b.appendChild(photoEl(obj.image, { credit: false, label: obj.designation }));
      b.appendChild(el('div', 'card-obj__body',
        '<div class="card-obj__name">' + obj.name + '</div>' +
        '<div class="card-obj__meta">' + obj.subtypeLabel + ' · objeveno ' + rec.date + '</div>'));
      b.addEventListener('click', function () { go('object', { objectId: id }); });
      grid.appendChild(b);
    });
    s.appendChild(grid);
  }


  return s;
}

function screenObject(id) {
  const obj = getObject(id);
  const rec = state.discovered[id] || { date: '—' };
  const s = el('div', 'screen stack');

  s.appendChild(photoEl(obj.image, { label: obj.designation }));

  const head = el('div', 'stack stack--tight');
  head.appendChild(el('h1', 'h-hero', obj.name));
  head.appendChild(el('p', 'lead', obj.fact));
  s.appendChild(head);

  /* údaje – včetně souřadnic, podle kterých je objekt na mapě oblohy */
  const facts = el('dl', 'factlist');
  let rows =
    '<div><dt>Označení</dt><dd>' + obj.designation + '</dd></div>' +
    '<div><dt>Typ</dt><dd>' + obj.subtypeLabel + '</dd></div>' +
    '<div><dt>Souhvězdí</dt><dd>' + obj.constellation + '</dd></div>';
  if (typeof obj.ra === 'number') {
    rows += '<div><dt>Rektascenze</dt><dd>' + raText(obj.ra) + '</dd></div>' +
            '<div><dt>Deklinace</dt><dd>' + decText(obj.dec) + '</dd></div>';
  } else if (obj.moving) {
    rows += '<div><dt>Poloha na obloze</dt><dd>mění se – hledej ve Stellariu</dd></div>';
  }
  if (obj.sizeArcmin) {
    rows += '<div><dt>Velikost na nebi</dt><dd>' + String(obj.sizeArcmin).replace('.', ',') +
            '′</dd></div>';
  }
  rows += '<div><dt>Vzdálenost</dt><dd>' + obj.distanceText + '</dd></div>' +
          '<div><dt>Jasnost</dt><dd>' + obj.magnitude + '</dd></div>' +
          '<div><dt>Objeveno</dt><dd>' + rec.date + '</dd></div>';
  facts.innerHTML = rows;
  s.appendChild(facts);

  /* jak ho najít a jak ho vyfotit */
  const how = el('div', 'stack stack--tight');
  how.appendChild(el('div', 'sechead',
    '<span class="sechead__t">' + icon('search', { size: 15 }) + 'Jak ho najít</span>'));
  how.appendChild(el('p', 'sub', obj.stellarium));
  how.appendChild(el('p', 'sub', obj.dwarfTip));
  s.appendChild(how);

  /* vlastní fotka z Dwarfu */
  const ph = el('div', 'stack stack--tight');
  ph.appendChild(el('div', 'sechead',
    '<span class="sechead__t">' + icon('camera', { size: 15 }) + 'Moje fotografie</span>'));
  ph.appendChild(myPhotoBox(obj, rec));
  s.appendChild(ph);

  /* zápisy v deníku, které se tohoto objektu týkají */
  const mine = journalEntries().filter(function (e) { return e.objectId === obj.id; });
  if (mine.length) {
    const j = el('div', 'stack stack--tight');
    j.appendChild(el('div', 'sechead',
      '<span class="sechead__t">' + icon('journal', { size: 15 }) + 'Z mého deníku</span>' +
      '<span class="sechead__n">' + mine.length + '</span>'));
    mine.forEach(function (e) {
      j.appendChild(el('div', 'jentry',
        '<div class="jentry__head"><span class="jentry__date">' + e.date + '</span>' +
        (e.sky ? '<span class="jentry__sky">' + e.sky + '</span>' : '') + '</div>' +
        (e.note ? '<p class="jentry__note">' + e.note + '</p>' : '')));
    });
    s.appendChild(j);
  }

  const src = el('div', 'stack stack--tight');
  const zdroje = [];
  if (obj.source) zdroje.push('<a href="' + obj.source + '" target="_blank" rel="noopener">údaje o objektu</a>');
  if (obj.coordsSource) zdroje.push('<a href="' + obj.coordsSource + '" target="_blank" rel="noopener">souřadnice</a>');
  if (zdroje.length) {
    src.appendChild(el('p', 'sub', 'Zdroje: ' + zdroje.join(' · ')));
    s.appendChild(src);
  }
  return s;
}

/* -------------------- VLASTNÍ FOTKA Z DWARFU ----------------------------
   Fotka se před uložením zmenší na 900 px a překonvertuje na JPEG, jinak by
   se do localStorage nevešla (limit je obvykle okolo 5 MB na doménu).
   Fotku nikam neposíláme – zůstává jen v tomto prohlížeči.                 */
const MY_PHOTO_MAX = 900;      // px na delší straně
const MY_PHOTO_QUALITY = 0.72; // kvalita JPEG

function myPhotoBox(obj, rec) {
  const box = el('div', 'stack');
  const myPhoto = rec.photo || obj.myPhoto;

  if (myPhoto) {
    const fig = el('figure', 'photo has-photo');
    const img = el('img');
    img.src = myPhoto;
    img.alt = 'Moje fotografie ' + obj.name;
    fig.appendChild(img);
    if (rec.photoDate) {
      fig.appendChild(el('figcaption', 'photo__credit', 'Vyfoceno ' + rec.photoDate));
    }
    box.appendChild(fig);
  } else {
    box.appendChild(el('div', 'photo-slot',
      icon('camera', { size: 26 }) +
      '<div>Tady bude tvoje fotka z Dwarfu.</div>' +
      '<div style="font-size:12.5px">Nahraj ji z disku – zůstane jen v tomto ' +
      'prohlížeči.</div>'));
  }

  /* skryté pole na výběr souboru + velké tlačítko */
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.hidden = true;
  box.appendChild(input);

  const pick = el('button', 'btn btn--ghost',
    myPhoto ? 'Nahradit jinou fotkou' : 'Nahrát moji fotku');
  pick.addEventListener('click', function () { input.click(); });
  box.appendChild(pick);

  if (rec.photo) {
    const del = el('button', 'btn btn--ghost btn--small', 'Odstranit fotku');
    del.addEventListener('click', function () {
      delete state.discovered[obj.id].photo;
      delete state.discovered[obj.id].photoDate;
      saveState();
      toast('Fotka odstraněna');
      go('object', { objectId: obj.id });
    });
    box.appendChild(del);
  }

  input.addEventListener('change', function () {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('Toto není obrázek'); return; }
    toast('Zpracovávám fotku…');
    shrinkImage(file, function (dataUrl, err) {
      if (err) { toast('Fotku se nepodařilo načíst'); return; }
      if (!state.discovered[obj.id]) discoverObject(obj.id);
      const before = state.discovered[obj.id].photo;
      state.discovered[obj.id].photo = dataUrl;
      state.discovered[obj.id].photoDate = todayText();
      if (!saveState()) {
        /* localStorage je plný – vrátíme původní stav a řekneme to jasně */
        if (before) state.discovered[obj.id].photo = before;
        else delete state.discovered[obj.id].photo;
        saveState();
        toast('Není místo na další fotku');
        return;
      }
      addXp(20, 'photo:' + obj.id);
      toast('Fotka uložena');
      go('object', { objectId: obj.id });
    });
  });

  return box;
}

/**
 * Zmenší obrázek na MY_PHOTO_MAX px a vrátí ho jako JPEG data URL.
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

/* ======================= 10) POZOROVACÍ DENÍK ============================
   Po každé misi se dá zapsat, jak to venku opravdu vyšlo. Nic se nikam
   neposílá – zápisy jsou jen v tomto prohlížeči, v state.journal.        */

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

/** Formulář na zápis do deníku – vrací hotový panel. */
function journalForm(preset, onSaved) {
  const box = el('div', 'panel stack panel--tight');
  box.appendChild(el('div', 'stat__label', icon('pencil', { size: 15 }) + 'Nový zápis'));
  box.appendChild(el('p', 'sub', 'Napiš pár slov, jak to venku vyšlo. Za rok si to přečteš a budeš se divit.'));

  const what = document.createElement('input');
  what.type = 'text'; what.className = 'nameinput';
  what.placeholder = 'co jsi pozoroval'; what.maxLength = 60;
  what.value = preset && preset.what ? preset.what : '';

  const note = document.createElement('textarea');
  note.className = 'nameinput journal__area';
  note.rows = 3;
  note.placeholder = 'Jaká byla obloha? Co bylo vidět? Co bys příště nastavil jinak?';
  note.maxLength = 500;

  const chips = el('div', 'chips');
  const skyOptions = [
    { ico: 'star',  t: 'jasno' },
    { ico: 'cloud', t: 'trochu oblaků' },
    { ico: 'cloud', t: 'zamračeno' },
    { ico: 'moon',  t: 'svítil Měsíc' },
    { ico: 'city',  t: 'světlo z města' }
  ];
  let sky = '';
  skyOptions.forEach(function (o) {
    const c = el('button', 'chip');
    c.innerHTML = icon(o.ico, { size: 14 }) + '<span>' + o.t + '</span>';
    c.addEventListener('click', function () {
      sky = (sky === o.t) ? '' : o.t;
      Array.prototype.forEach.call(chips.children, function (n) { n.classList.remove('is-on'); });
      if (sky) c.classList.add('is-on');
    });
    chips.appendChild(c);
  });

  const save = el('button', 'btn btn--small', 'Uložit zápis');
  save.addEventListener('click', function () {
    if (!what.value.trim() && !note.value.trim()) { toast('Napiš aspoň jedno slovo'); return; }
    const okSave = addJournalEntry({
      what: what.value.trim() || (preset && preset.what) || 'pozorování',
      sky: sky,
      note: note.value.trim(),
      objectId: preset && preset.objectId
    });
    if (!okSave) { toast('Není místo na uložení'); return; }
    addXp(15, 'journal:' + Date.now());
    toast('Zapsáno do deníku');
    if (onSaved) onSaved();
  });

  box.appendChild(what);
  box.appendChild(chips);
  box.appendChild(note);
  box.appendChild(save);
  return box;
}

/* Deník není databáze zápisů. Je to živý záznam toho, co dítě dokázalo:
   u každého objevu je datum, vlastní fotka, poznámka, pojem, který k tomu
   patří, a výprava, ze které to vzešlo. Odtud se dá dostat všude dál.    */
function screenJournal() {
  const s = el('div', 'screen stack');
  const list = journalEntries();
  const withPhoto = Object.keys(state.discovered).filter(function (id) {
    return state.discovered[id].photo;
  }).length;

  const head = el('div', 'stack stack--tight');
  head.appendChild(el('h1', 'h-hero', 'Deník'));
  head.appendChild(el('p', 'lead',
    'Skuteční astronomové si deník píšou celý život. Tohle je ten tvůj – ' +
    list.length + (list.length === 1 ? ' zápis' : (list.length >= 2 && list.length <= 4 ? ' zápisy' : ' zápisů')) +
    ', ' + Object.keys(state.discovered).length + ' objevených objektů, ' +
    withPhoto + ' vlastních snímků.'));
  s.appendChild(head);

  const layout = el('div', 'stack journal__layout');
  layout.appendChild(journalForm(null, function () { go('journal'); }));

  const timeline = el('div');
  if (!list.length) {
    timeline.appendChild(el('div', 'empty',
      'Deník je zatím prázdný. První zápis se do něj napíše sám, až na výpravě ' +
      'objevíš první objekt.'));
  } else {
    timeline.appendChild(el('div', 'sechead',
      '<span class="sechead__t">' + icon('calendar', { size: 15 }) + 'Co už máš za sebou</span>' +
      '<span class="sechead__n">' + list.length + '</span>'));
    list.forEach(function (e) { timeline.appendChild(journalEntry(e)); });
  }
  layout.appendChild(timeline);
  s.appendChild(layout);
  return s;
}

/** Jeden zápis v deníku – včetně všeho, co s ním souvisí. */
function journalEntry(e) {
  const card = el('article', 'jentry');
  const obj = e.objectId ? getObject(e.objectId) : null;
  const rec = e.objectId ? state.discovered[e.objectId] : null;

  const head = el('div', 'jentry__head');
  head.innerHTML =
    '<span class="jentry__date">' +
      (e.kind === 'objev' ? icon('star', { size: 13 }) + ' objev · ' : '') + e.date +
    '</span>' +
    (e.sky ? '<span class="jentry__sky">' + e.sky + '</span>' : '');
  card.appendChild(head);
  card.appendChild(el('div', 'jentry__what', e.what));
  if (e.note) card.appendChild(el('p', 'jentry__note', e.note));

  /* vlastní fotka, pokud u objektu je */
  if (rec && rec.photo) {
    const fig = el('figure', 'photo has-photo photo--tall');
    const img = el('img');
    img.src = rec.photo;
    img.alt = 'Moje fotografie ' + (obj ? obj.name : '');
    fig.appendChild(img);
    if (rec.photoDate) fig.appendChild(el('figcaption', 'photo__credit', 'Vyfoceno ' + rec.photoDate));
    card.appendChild(fig);
  }

  /* co s tímhle zápisem souvisí – tady se deník propojuje s celou akademií */
  const links = el('div', 'jentry__links');
  function link(ico, text, fn) {
    const b = el('button', 'jentry__link');
    b.innerHTML = icon(ico, { size: 14 }) + '<span>' + text + '</span>';
    b.addEventListener('click', fn);
    links.appendChild(b);
  }
  if (obj) {
    link('star', obj.designation + ' · detail objektu', function () {
      go('object', { objectId: obj.id });
    });
    if (!rec || !rec.photo) {
      link('camera', 'přidat vlastní fotku', function () { go('object', { objectId: obj.id }); });
    }
  }
  const src = e.lessonId ? e.lessonId : (obj ? lessonForObject(obj.id) : null);
  if (src) {
    const l = LESSONS.filter(function (x) { return x.id === src; })[0];
    if (l) {
      link('route', 'výprava ' + l.title, function () { startLesson(l.id); });
      const term = (l.basics || []).filter(function (t) { return state.terms[t]; })[0];
      if (term && TERMS[term]) {
        link('book', 'pojem ' + TERMS[term].name, function () { go('terms'); });
      }
      const factStep = l.steps.filter(function (st) { return st.type === 'fact' && state.facts[st.factId]; })[0];
      if (factStep) {
        link('bulb', FACTS[factStep.factId].title, function () { go('facts'); });
      }
      const r = state.lessons[l.id];
      if (r && r.completed) {
        links.appendChild(el('span', 'jentry__link',
          icon('quiz', { size: 14 }) + '<span>test ' + r.score + '/' + r.total + '</span>'));
      }
    }
  }
  if (links.children.length) card.appendChild(links);

  /* smazat se dá jen vlastní zápis; automatický objev je součást postupu */
  if (e.kind !== 'objev') {
    const del = el('button', 'jentry__link');
    del.innerHTML = icon('trash', { size: 14 }) + '<span>vymazat zápis</span>';
    del.addEventListener('click', function () {
      const idx = state.journal.indexOf(e);
      if (idx >= 0) state.journal.splice(idx, 1);
      saveState();
      go('journal');
    });
    const row = el('div', 'jentry__links');
    row.appendChild(del);
    card.appendChild(row);
  }
  return card;
}

/** Ve které výpravě se tenhle objekt objevuje jako cíl misie. */
function lessonForObject(objectId) {
  const l = LESSONS.filter(function (x) {
    return x.steps.some(function (st) { return st.type === 'mission' && st.objectId === objectId; });
  })[0];
  return l ? l.id : null;
}

/* ======================= 11) HVĚZDNÝ TRÉNINK =============================
   Smíšený test z otázek všech dokončených lekcí. Bez trestů, bez
   časomíry – jen osobní rekord, který se dá překonat.                    */

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
  /* zamíchej a vezmi deset */
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  training = { i: 0, score: 0, questions: pool.slice(0, Math.min(10, pool.length)) };
  go('training');
}

function screenTraining() {
  const s = el('div', 'screen stack');

  /* úvodní obrazovka */
  if (!training) {
    s.appendChild(el('h1', 'h-hero', 'Hvězdný trénink'));
    s.appendChild(el('p', 'lead',
      'Deset otázek zamíchaných ze všech lekcí, které už máš hotové. ' +
      'Nic se neztrácí a nic se nepokazí – je to jen trénink.'));
    const done = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;
    s.appendChild(el('div', 'panel panel--tight',
      'Otázky se berou z <strong>' + done + '</strong> dokončených výprav.' +
      (state.bestTraining ? '<br>Tvůj nejlepší výsledek: <strong>' +
        state.bestTraining + '/10</strong>' : '')));
    s.appendChild(nextButton('Spustit trénink', startTraining));
    return s;
  }

  /* výsledek */
  if (training.i >= training.questions.length) {
    const score = training.score, total = training.questions.length;
    const isBest = score > (state.bestTraining || 0);
    if (isBest) { state.bestTraining = score; saveState(); }
    const box = el('div', 'panel result stack');
    box.innerHTML =
      '<div class="eyebrow">Trénink dokončen</div>' +
      '<div class="result__score">' + score + '<small>/' + total + '</small></div>' +
      '<div class="lead">' + (isBest
        ? 'Nový osobní rekord! Lepší než kdykoli předtím.'
        : (state.bestTraining ? 'Tvůj rekord je ' + state.bestTraining + '/' + total + '. Zkus to znovu.' : '')) +
      '</div>';
    s.appendChild(box);
    addXp(score * 5, null);
    const again = nextButton('Ještě jednou', startTraining);
    s.appendChild(again);
    return s;
  }

  /* otázka */
  const item = training.questions[training.i];
  s.appendChild(el('div', 'quiz__count',
    'Otázka ' + (training.i + 1) + ' z ' + training.questions.length +
    ' · skóre ' + training.score));
  s.appendChild(el('div', 'warm__from', 'z výpravy „' + item.lessonTitle + '“'));
  renderQuestion(item.q, s, {
    nextLabel: (training.i === training.questions.length - 1) ? 'Zobrazit výsledek' : 'Další',
    onAnswer: function (ok) {
      if (ok) training.score++;
      rememberMiss(item.lessonId, item.qi, ok);
    },
    onNext: function () { training.i++; go('training'); }
  });
  return s;
}

/* ========================= 12) PŘEHLED PRO RODIČE ========================
   Bez hodnocení dítěte – jen přehled, co už prošlo a kde se zaseklo,
   aby se rodič mohl připojit k tomu, co ho právě zajímá.                 */
function screenParent() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h1', 'h-hero', 'Pro rodiče'));
  s.appendChild(el('p', 'sub',
    'Všechno je uložené jen v tomto prohlížeči, nikam se to neposílá. ' +
    'Tento přehled slouží k tomu, abyste věděli, o čem si doma povídat.'));

  const doneL = LESSONS.filter(function (l) { return isLessonDone(l.id); });
  const scores = doneL.map(function (l) { return state.lessons[l.id]; });
  const sum = scores.reduce(function (a, r) { return a + r.score; }, 0);
  const max = scores.reduce(function (a, r) { return a + r.total; }, 0);

  const g = el('div', 'stats');
  g.appendChild(el('div', 'panel stat',
    '<div class="stat__label">' + icon('check', { size: 14 }) + 'Hotové výpravy</div>' +
    '<div class="stat__value">' + doneL.length + ' / ' + LESSONS.length + '</div>'));
  g.appendChild(el('div', 'panel stat',
    '<div class="stat__label">' + icon('quiz', { size: 14 }) + 'Testy dohromady</div>' +
    '<div class="stat__value">' + (max ? sum + ' / ' + max : '—') + '</div>' +
    '<div class="tile__meta">' + (max ? Math.round(sum / max * 100) + ' % správně' : 'zatím žádný test') + '</div>'));
  s.appendChild(g);

  const g2 = el('div', 'stats');
  g2.appendChild(el('div', 'panel stat',
    '<div class="stat__label">' + icon('book', { size: 14 }) + 'Naučené pojmy</div>' +
    '<div class="stat__value">' + Object.keys(state.terms).length + ' / ' +
    (typeof TERMS !== 'undefined' ? Object.keys(TERMS).length : 0) + '</div>'));
  g2.appendChild(el('div', 'panel stat',
    '<div class="stat__label">' + icon('telescope', { size: 14 }) + 'Objevené objekty</div>' +
    '<div class="stat__value">' + Object.keys(state.discovered).length + ' / ' + SPACE_OBJECTS.length + '</div>'));
  s.appendChild(g2);

  /* na čem se dítě zaseklo */
  const missKeys = Object.keys(state.missed || {});
  s.appendChild(el('div', 'sechead', '<span class="sechead__t">' + icon('reset', { size: 15 }) +
    'Co se ještě neusadilo</span>'));
  if (!missKeys.length) {
    s.appendChild(el('div', 'panel', 'Nic – všechny otázky, které kdy netrefil, si už opravil. ' +
      'Špatně zodpovězené otázky se mu automaticky vrátí jako rozcvička na začátku další ' +
      'lekce.'));
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
        '<div class="tile__meta">' + l.title + '</div>' +
        '<div>' + q.question + '</div>' +
        (q.explain ? '<div class="jentry__note">Správně: ' + q.explain + '</div>' : '')));
    });
    s.appendChild(list);
  }

  /* přehled lekcí */
  s.appendChild(el('h3', null, 'Výprava po výpravě'));
  const tbl = el('div', 'ptable');
  LESSONS.forEach(function (l, i) {
    const r = state.lessons[l.id];
    tbl.appendChild(el('div', 'ptable__row' + (r && r.completed ? ' is-done' : ''),
      '<span class="ptable__n">' + (i + 1) + '.</span>' +
      '<span class="ptable__t">' + l.title + '</span>' +
      '<span class="ptable__s">' + (r && r.completed ? r.score + '/' + r.total : '—') + '</span>'));
  });
  s.appendChild(tbl);

  /* vynulování aplikace – tam, kde to dítě samo nehledá */
  s.appendChild(resetBox());

  return s;
}

/* ============================ 13) DIPLOM ================================ */
function screenCertificate() {
  const s = el('div', 'screen stack');
  const lv = currentLevel();
  const cert = el('div', 'cert');
  cert.innerHTML =
    '<div class="cert__seal">' + icon('trophy', { size: 40 }) + '</div>' +
    '<div class="cert__eyebrow">VESMÍRNÁ AKADEMIE</div>' +
    '<h2 class="cert__title">DIPLOM MLADÉHO ASTRONOMA</h2>' +
    '<p class="cert__for">uděluje se</p>' +
    '<div class="cert__name">' + (state.name || 'mladému astronautovi') + '</div>' +
    '<p class="cert__body">za absolvování všech ' + LESSONS.length + ' lekcí akademie, ' +
      'získání ' + state.badges.length + ' odznaků, objevení ' +
      Object.keys(state.discovered).length + ' vesmírných objektů a naučení ' +
      Object.keys(state.terms).length + ' astronomických pojmů.</p>' +
    '<div class="cert__row"><span>⭐ ' + lv.level.name + '</span><span>' + state.xp + ' XP</span></div>' +
    '<div class="cert__date">' + todayText() + '</div>';
  s.appendChild(cert);
  s.appendChild(el('p', 'sub',
    'Tlačítkem níže se diplom dá vytisknout nebo uložit jako PDF.'));

  const print = el('button', 'btn btn--wide', 'Vytisknout diplom');
  print.addEventListener('click', function () { window.print(); });
  s.appendChild(print);

  return s;
}

/* ======================= 14) RESET APLIKACE =============================
   Vymaže úplně všechno: jméno, XP, úroveň, odznaky, objekty, vlastní fotky,
   slovníček, deník, rekord i nastavení. Záměrně na dva kroky – aby se
   celoroční sbírka nedala smazat jedním náhodným kliknutím.             */

/** Přehled toho, co se reset chystá vymazat – aby to bylo vidět před kliknutím. */
function resetSummary() {
  const items = [];
  if (state.name) items.push('meno <strong>' + state.name + '</strong>');
  items.push('<strong>' + state.xp + ' XP</strong> a úroveň ' + currentLevel().level.name);
  const doneCount = LESSONS.filter(function (l) { return isLessonDone(l.id); }).length;
  items.push('<strong>' + doneCount + '</strong> dokončených lekcí a výsledky testů');
  items.push('<strong>' + state.badges.length + '</strong> odznaků');
  const objs = Object.keys(state.discovered);
  const photos = objs.filter(function (id) { return state.discovered[id].photo; }).length;
  items.push('<strong>' + objs.length + '</strong> objevených objektů' +
             (photos ? ' včetně <strong>' + photos + '</strong> vlastních fotek z Dwarfu' : ''));
  items.push('<strong>' + Object.keys(state.terms).length + '</strong> pojmů ve slovníčku a ' +
             '<strong>' + Object.keys(state.facts).length + '</strong> zajímavostí');
  const j = (state.journal || []).length;
  if (j) items.push('<strong>' + j + '</strong> zápisů v pozorovacím deníku');
  if (state.bestTraining) items.push('rekord v tréninku (' + state.bestTraining + '/10)');
  return items;
}

/** Opravdu vymaže všechno a vrátí aplikaci do stavu jako při prvním otevření. */
function resetEverything() {
  state = structuredCopy(DEFAULT_STATE);
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  saveState();
  applyNightMode();          // vypne i noční režim
  quiz = null; warm = null; training = null; lesson = null;
  renderXp(false);
}

/**
 * Blok „vynulovat aplikaci“ – dá se vložit na libovolnou obrazovku.
 * Krok 1: tlačítko. Krok 2: seznam toho, co zmizne + potvrzení nebo zrušení.
 */
function resetBox() {
  const box = el('div', 'panel reset');
  showButton();

  /* krok 1 – jen tlačítko */
  function showButton() {
    box.innerHTML = '';
    box.classList.remove('is-armed');
    box.appendChild(el('div', 'stat__label', icon('reset', { size: 15 }) + 'Vynulovat aplikaci'));
    box.appendChild(el('p', 'sub',
      'Vymaže úplně všechno a aplikace bude jako po prvním otevření: jméno, XP, úroveň, ' +
      'odznaky, objevené objekty i vlastní fotky. Nedá se to vrátit.'));
    const b = el('button', 'btn btn--ghost btn--small', 'Chci vynulovat aplikaci');
    b.addEventListener('click', showConfirm);
    box.appendChild(b);
  }

  /* krok 2 – seznam toho, co zmizne, a potvrzení */
  function showConfirm() {
    box.innerHTML = '';
    box.classList.add('is-armed');
    box.appendChild(el('div', 'stat__label', 'Opravdu vymazat všechno?'));
    box.appendChild(el('p', 'sub', 'Zmizí tohle a nedá se to vrátit:'));
    const ul = el('ul', 'resetlist');
    resetSummary().forEach(function (t) { ul.appendChild(el('li', null, t)); });
    box.appendChild(ul);

    const row = el('div', 'namerow');
    const yes = el('button', 'btn btn--small btn--danger', 'Ano, vymazat všechno');
    yes.addEventListener('click', function () {
      resetEverything();
      toast('Aplikace je vynulovaná');
      go('home');
    });
    const no = el('button', 'btn btn--ghost btn--small', '↩️ Ne, nechat tak');
    no.addEventListener('click', showButton);
    row.appendChild(yes); row.appendChild(no);
    box.appendChild(row);
  }

  return box;
}

function screenSources() {
  const s = el('div', 'screen stack');
  s.appendChild(el('h1', 'h-hero', 'Zdroje'));
  s.appendChild(el('p', 'sub', 'Všechny údaje i fotografie pocházejí z oficiálních zdrojů. ' +
    'Fotografie NASA jsou public domain, fotografie ESA/Hubble a ESO jsou pod licencí CC BY ' +
    '4.0.'));
  const ul = el('ul', 'sources');
  SOURCES.forEach(function (src) {
    ul.appendChild(el('li', null, '<a href="' + src.url + '" target="_blank" rel="noopener">' + src.label + '</a>'));
  });
  s.appendChild(ul);

  s.appendChild(resetBox());

  return s;
}

/* =========================== START ====================================== */
applyNightMode();
drawStarfield();
buildNav();
applyHash();          // otevře obrazovku podle adresy (#/…), ne vždy domov
