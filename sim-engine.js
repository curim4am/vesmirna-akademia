/* =============================================================================
   MOTOR INTERAKTÍVNYCH ÚLOH  (sim-engine.js)
   -----------------------------------------------------------------------------
   Pre každú simuláciu z data/sims.js je tu jeden objekt s tromi funkciami:

     draw(ctx, w, h, v)  – nakreslí náhľad na canvas podľa hodnôt ovládačov
     stats(v)            – nepovinné: [{label, value}] pod náhľadom
     verdict(v)          – { icon, text, ok } – hodnotenie pod náhľadom
     goal(v)             – nepovinné: true, keď je splnená výzva (bonusové XP)

   Ovládače, texty a výzvy sú v data/sims.js. Kreslenie je zámerne oddelené,
   aby sa obsah dal upravovať bez zasahovania do kódu.
   ========================================================================== */

/* ------------------------- malé pomôcky ---------------------------------- */
function simRandom(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function simTime(sec) {
  if (sec < 90) return Math.round(sec) + ' s';
  const m = Math.round(sec / 60);
  if (m < 60) return m + ' min';
  const h = Math.floor(m / 60), r = m % 60;
  return h + ' h' + (r ? ' ' + r + ' min' : '');
}
/* hviezdne pozadie – vždy tie isté hviezdy, aby bol rozdiel len v nastavení */
function simStars(ctx, w, h, count, seed, opts) {
  opts = opts || {};
  const r = simRandom(seed || 4242);
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, br = r();
    const size = (0.5 + br * 1.6) * (opts.scale || 1);
    const a = (opts.alpha == null ? 1 : opts.alpha) * (0.3 + br * 0.7);
    if (opts.trail) {                       // hviezdy stočené do oblúčikov
      const cx = -w * 0.15, cy = -h * 0.25;
      const rad = Math.hypot(x - cx, y - cy);
      const a0 = Math.atan2(y - cy, x - cx);
      const arc = opts.trail * 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, a0 - arc, a0);
      ctx.strokeStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')';
      ctx.lineWidth = size; ctx.lineCap = 'round';
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')';
      ctx.fill();
    }
  }
}
/* Mäkká hmlovina – jasnosť 0…1.
   Zámerne z viacerých menších oblakov, aby to nebola len jedna guľa:
   [x, y, veľkosť, farba, sila] – x/y/veľkosť sú diely šírky, resp. výšky. */
function simNebula(ctx, w, h, brightness) {
  if (brightness <= 0.005) return;
  const s = Math.min(w, h);
  const blobs = [
    [0.46, 0.50, 0.30, '255, 96, 150', 1.00],
    [0.57, 0.42, 0.20, '255, 168, 110', 0.85],
    [0.38, 0.60, 0.17, '150, 110, 255', 0.70],
    [0.62, 0.60, 0.13, '255, 120, 190', 0.55],
    [0.30, 0.44, 0.11, '120, 170, 255', 0.50],
    [0.50, 0.34, 0.09, '255, 235, 220', 0.45]
  ];
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  blobs.forEach(function (b) {
    const cx = w * b[0], cy = h * b[1], rad = s * b[2];
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    const a = 0.55 * brightness * b[4];
    g.addColorStop(0, 'rgba(' + b[3] + ',' + a.toFixed(3) + ')');
    g.addColorStop(0.45, 'rgba(' + b[3] + ',' + (a * 0.35).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + b[3] + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();

  /* tmavý prachový pás – hmloviny nie sú hladké gule */
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  const lane = ctx.createLinearGradient(w * 0.2, h * 0.72, w * 0.75, h * 0.34);
  lane.addColorStop(0, 'rgba(0,0,0,0)');
  lane.addColorStop(0.5, 'rgba(0,0,0,' + (0.30 * brightness).toFixed(3) + ')');
  lane.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = lane;
  ctx.beginPath();
  ctx.moveTo(w * 0.08, h * 0.80);
  ctx.quadraticCurveTo(w * 0.45, h * 0.44, w * 0.92, h * 0.30);
  ctx.lineTo(w * 0.92, h * 0.42);
  ctx.quadraticCurveTo(w * 0.45, h * 0.58, w * 0.08, h * 0.94);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
/* Zrnitý šum – amount 0…1.
   Pracuje s celým rastrom canvasu (nie s CSS pixelmi), inak by pri
   retina displejoch pokryl len časť obrázka. */
function simNoise(ctx, w, h, amount) {
  if (amount <= 0.01) return;
  const cw = ctx.canvas.width, ch = ctx.canvas.height;
  const img = ctx.getImageData(0, 0, cw, ch);
  const d = img.data;
  const amp = amount * 95;
  const r = simRandom(9001);
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amp;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    if (d[i + 3] < 255) d[i + 3] = 255;
  }
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.putImageData(img, 0, 0);
  ctx.restore();
}

/* =============================== FOTOLAB ================================= */
/* Zjednodušený, ale fyzikálne správne sa chovajúci model astrofotky:
     jasnosť   ↑ s expozíciou aj gainom (logaritmicky, ako to vníma oko)
     šum       ↓ s odmocninou z celkového nazbieraného času  (skutočný zákon:
               štyrikrát dlhší celkový čas = polovičný šum), ↑ s gainom
     oblúčiky  ↑ s expozíciou, ale len v AZ režime
     prepal    keď je nazbieraného svetla priveľa (biely stred bez detailu)
   noise je fyzikálna hodnota (1,0 = desať minút pri gaine 80). noiseAmp je len
   to, ako silno sa zrno nakreslí – malé rozdiely by inak neboli vidieť. */
function fotolabModel(v) {
  const exp = v.exp, gain = v.gain, frames = v.frames, eq = v.mode === 'EQ';
  const light = exp * gain;                       // svetlo v jednej snímke
  const total = exp * frames;                     // celkový čas fotenia (s)
  const brightness = Math.min(1, Math.log(1 + light / 60) / Math.log(1 + 10800 / 60));
  const noise = (gain / 80) * Math.sqrt(600 / Math.max(1, total));
  const noiseAmp = Math.pow(Math.min(1, noise / 1.6), 0.75);
  const blowout = light > 7000;
  const trail = eq ? 0 : Math.max(0, (exp - 15) / 60);
  return { brightness: brightness, noise: noise, noiseAmp: noiseAmp,
           blowout: blowout, trail: trail, total: total, light: light };
}
/* slovo namiesto čísla – pre deväťročného je „stredný“ jasnejšie než 0,47 */
function noiseWord(n) {
  if (n > 0.70) return 'veľký';
  if (n > 0.40) return 'stredný';
  return 'malý';
}

const SIM_ENGINE = {

  fotolab: {
    draw: function (ctx, w, h, v) {
      const m = fotolabModel(v);
      ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, w, h);
      simNebula(ctx, w, h, m.brightness);
      if (m.blowout) {                       // prepálený biely stred
        const g = ctx.createRadialGradient(w * 0.44, h * 0.5, 0, w * 0.44, h * 0.5, w * 0.16);
        g.addColorStop(0, 'rgba(255,255,255,.95)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }
      simStars(ctx, w, h, 130, 4242, { trail: m.trail, alpha: 0.35 + m.brightness * 0.65 });
      simNoise(ctx, w, h, m.noiseAmp);
    },
    stats: function (v) {
      const m = fotolabModel(v);
      return [
        { label: 'Fotenie by trvalo', value: simTime(m.total) },
        { label: 'Nazbierané svetlo', value: Math.round(m.brightness * 100) + ' %' },
        { label: 'Šum', value: noiseWord(m.noise) }
      ];
    },
    verdict: function (v) {
      const m = fotolabModel(v);
      if (m.blowout) return { icon: '💥', ok: false,
        text: 'Prepálený stred – nazbieralo sa priveľa svetla. Uber expozíciu alebo gain.' };
      if (m.trail > 0.25) return { icon: '🌀', ok: false,
        text: 'Hviezdy sa stočili do oblúčikov. Pri takej dlhej expozícii treba zapnúť EQ režim.' };
      if (m.brightness < 0.3) return { icon: '🌫️', ok: false,
        text: 'Príliš tmavé – hmlovinu skôr tušíš. Pridaj expozíciu (pomôže viac než gain).' };
      if (m.noise > 0.70) return { icon: '❄️', ok: false,
        text: 'Fotka „sneží“. Pridaj snímky alebo uber gain – šum klesá s celkovým nazbieraným časom.' };
      if (m.total > 3 * 3600) return { icon: '⏰', ok: false,
        text: 'Vyzerá to dobre, ale fotenie by trvalo celú noc. Skús menej snímok.' };
      return { icon: '✅', ok: true,
        text: 'Paráda! Hmlovina je jasná, hviezdy okrúhle a pozadie hladké.' };
    },
    goal: function (v) {
      const m = fotolabModel(v);
      return !m.blowout && m.trail < 0.15 && m.brightness > 0.45 &&
             m.noise <= 0.45 && m.total <= 45 * 60;
    }
  },

  skladanie: {
    draw: function (ctx, w, h, v) {
      const m = fotolabModel({ exp: 30, gain: 80, frames: v.frames, mode: 'EQ' });
      ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, w, h);
      simNebula(ctx, w, h, m.brightness);
      simStars(ctx, w, h, 130, 4242, { alpha: 0.9 });
      simNoise(ctx, w, h, m.noiseAmp);
    },
    stats: function (v) {
      const krat = Math.round(Math.sqrt(v.frames) * 10) / 10;
      return [
        { label: 'Snímok', value: v.frames },
        { label: 'Fotenie by trvalo', value: simTime(30 * v.frames) },
        { label: 'Šum oproti 1 snímke', value: v.frames === 1 ? 'rovnaký' : krat + '× menší' }
      ];
    },
    verdict: function (v) {
      if (v.frames <= 5) return { icon: '❄️', ok: false, text: 'Celé pozadie je plné zrniečok – takto vyzerá jedna snímka.' };
      if (v.frames < 50) return { icon: '🌫️', ok: false, text: 'Už lepšie, ale pozadie stále šumí.' };
      if (v.frames < 200) return { icon: '🙂', ok: true, text: 'Pozadie je takmer hladké. Toto by už bola pekná fotka.' };
      return { icon: '✅', ok: true, text: 'Hladké pozadie. Nad dvesto snímok sa rozdiel už veľmi nezlepší – a čas rastie.' };
    },
    goal: function (v) { return v.frames >= 100; }
  },

  /* ============================ FÁZY MESIACA ============================= */
  'mesiac-fazy': {
    draw: function (ctx, w, h, v) {
      const ang = (v.day / 29.5) * Math.PI * 2;      // 0 = nov
      ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 60, 777, { alpha: 0.5 });

      /* ---- ľavá polovica: pohľad zvonku ---- */
      const cx = w * 0.27, cy = h * 0.5, orb = Math.min(w * 0.19, h * 0.33);
      for (let i = 0; i < 5; i++) {                  // slnečné lúče zľava
        const y = h * (0.2 + i * 0.15);
        ctx.strokeStyle = 'rgba(255,214,120,.35)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(4, y); ctx.lineTo(w * 0.1, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w * 0.1 - 6, y - 4); ctx.lineTo(w * 0.1, y);
        ctx.lineTo(w * 0.1 - 6, y + 4); ctx.stroke();
      }
      ctx.setLineDash([3, 6]); ctx.strokeStyle = 'rgba(150,180,255,.35)';
      ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, orb, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      /* Zem */
      const ge = ctx.createRadialGradient(cx - 5, cy - 5, 1, cx, cy, 15);
      ge.addColorStop(0, '#7fc4ff'); ge.addColorStop(1, '#123a6b');
      ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
      /* Mesiac na dráhe.
         Deň 0 (nov) = medzi Slnkom a Zemou, teda vľavo.
         Deň ~14,75 (spln) = na opačnej strane od Slnka, teda vpravo.
         Osvetlená je vždy tá polovica Mesiaca, ktorá je otočená k Slnku (vľavo). */
      const mx = cx - Math.cos(ang) * orb, my = cy + Math.sin(ang) * orb;
      ctx.fillStyle = '#3a3a44'; ctx.beginPath(); ctx.arc(mx, my, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f2efe6'; ctx.beginPath();
      ctx.arc(mx, my, 9, Math.PI / 2, Math.PI * 1.5); ctx.fill();
      /* šípka „odtiaľto sa naň pozeráme“ */
      ctx.strokeStyle = 'rgba(150,180,255,.5)'; ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx, my); ctx.stroke();
      ctx.setLineDash([]);

      /* ---- pravá polovica: pohľad zo Zeme ---- */
      const px = w * 0.72, py = h * 0.5, pr = Math.min(w * 0.16, h * 0.32);
      const illum = (1 - Math.cos(ang)) / 2;         // 0 = nov, 1 = spln
      ctx.fillStyle = '#0a0b13'; ctx.beginPath(); ctx.arc(px, py, pr + 3, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = '#1b1c24'; ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
      /* osvetlená časť: kruh mínus elipsa terminátora */
      const grow = v.day <= 14.75;
      ctx.fillStyle = '#f4f1e8';
      ctx.beginPath();
      if (grow) ctx.arc(px, py, pr, -Math.PI / 2, Math.PI / 2);
      else ctx.arc(px, py, pr, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      const k = Math.abs(1 - 2 * illum);             // šírka elipsy terminátora
      ctx.fillStyle = (illum > 0.5) ? '#f4f1e8' : '#1b1c24';
      ctx.beginPath(); ctx.ellipse(px, py, pr * k, pr, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.stroke();
    },
    stats: function (v) {
      const illum = Math.round((1 - Math.cos((v.day / 29.5) * Math.PI * 2)) / 2 * 100);
      const names = [[1.5, 'nov'], [6, 'dorastajúci polmesiac'], [9.5, 'prvá štvrť'],
                     [13, 'dorastajúci Mesiac'], [16.5, 'spln'], [20, 'ubúdajúci Mesiac'],
                     [24, 'posledná štvrť'], [28, 'ubúdajúci polmesiac'], [30, 'nov']];
      let name = 'nov';
      for (let i = 0; i < names.length; i++) { if (v.day <= names[i][0]) { name = names[i][1]; break; } }
      return [
        { label: 'Deň v cykle', value: v.day.toFixed(1) },
        { label: 'Fáza', value: name },
        { label: 'Osvetlené', value: illum + ' %' }
      ];
    },
    verdict: function (v) {
      const illum = (1 - Math.cos((v.day / 29.5) * Math.PI * 2)) / 2;
      if (illum < 0.05) return { icon: '🌑', ok: false, text: 'Nov – Mesiac je medzi nami a Slnkom, takže k nám mieri neosvetlenou stranou. Nevidíme ho.' };
      if (illum > 0.95) return { icon: '🌕', ok: true, text: 'Spln – Mesiac je na opačnej strane od Slnka, takže vidíme celú osvetlenú polovicu.' };
      if (illum > 0.42 && illum < 0.58) return { icon: '🌓', ok: true, text: 'Štvrť – vidíme presne polovicu osvetlenej strany. Teraz sú krátery najkrajšie.' };
      return { icon: '🌒', ok: true, text: 'Vidíme len časť osvetlenej polovice. Žiadny tieň Zeme v tom nie je – je to len otázka uhla.' };
    },
    goal: function (v) { return Math.abs(v.day - 14.75) < 1.6; }
  },

  /* =========================== NASTAVENIE EQ ============================= */
  'eq-nastavenie': {
    draw: function (ctx, w, h, v) {
      const errTilt = Math.abs(v.tilt - 48), errN = Math.abs(v.north);
      const err = Math.min(1, (errTilt / 45) * 0.6 + (errN / 60) * 0.6);
      ctx.fillStyle = '#04050d'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 120, 4242, { trail: err * 1.6, alpha: 0.9 });
      /* malá schéma naklonenia */
      const bx = w - 92, by = h - 20;
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx - 34, by); ctx.lineTo(bx + 34, by); ctx.stroke();
      const a = (v.tilt) * Math.PI / 180;
      ctx.strokeStyle = '#4ad8ff'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(a) * 40, by - Math.sin(a) * 40); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '11px system-ui';
      ctx.fillText(v.tilt + '°', bx - 8, by + 14);
    },
    stats: function (v) {
      return [
        { label: 'Naklonenie', value: v.tilt + '° (treba 48°)' },
        { label: 'Odchýlka od severu', value: Math.abs(v.north) + '°' },
        { label: 'Expozícia', value: '90 s' }
      ];
    },
    verdict: function (v) {
      const et = Math.abs(v.tilt - 48), en = Math.abs(v.north);
      if (et > 20 || en > 30) return { icon: '🌀', ok: false,
        text: 'Hviezdy kreslia dlhé oblúky. Os Dwarfu nie je ani zďaleka rovnobežná s osou Zeme.' };
      if (et > 8 || en > 12) return { icon: '〰️', ok: false,
        text: 'Už lepšie, ale hviezdy sú stále mierne pretiahnuté. Dolaď naklonenie aj smer.' };
      return { icon: '✅', ok: true,
        text: 'Okrúhle hviezdy aj po 90 sekundách. Takto to má vyzerať – os Dwarfu je rovnobežná s osou Zeme.' };
    },
    goal: function (v) { return Math.abs(v.tilt - 48) <= 3 && Math.abs(v.north) <= 8; }
  },

  /* ============================= ZORNÉ POLE ============================== */
  'zorne-pole': {
    draw: function (ctx, w, h, v) {
      /* veľkosti objektov na nebi v stupňoch */
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Mesiac': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      const fov = 2.45;
      ctx.fillStyle = '#04050d'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 90, 555, { alpha: 0.55 });
      const box = Math.min(w * 0.62, h * 0.82);
      const bx = (w - box) / 2, by = (h - box) / 2;
      const px = box / fov;                             // pixelov na stupeň
      const r = (size / 2) * px;
      /* objekt */
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(3, r));
      g.addColorStop(0, 'rgba(255,180,220,.95)');
      g.addColorStop(0.5, 'rgba(210,130,255,.55)');
      g.addColorStop(1, 'rgba(120,90,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(w / 2, h / 2, Math.max(3, r), 0, Math.PI * 2); ctx.fill();
      /* rámik záberu Dwarfu */
      ctx.strokeStyle = '#4ad8ff'; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
      ctx.strokeRect(bx, by, box, box); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(74,216,255,.9)'; ctx.font = 'bold 12px system-ui';
      ctx.fillText('záber Dwarfu 2,45°', bx + 6, by - 8);
    },
    stats: function (v) {
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Mesiac': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      return [
        { label: 'Objekt', value: v.obj },
        { label: 'Veľkosť na nebi', value: (size < 0.02 ? size * 60 + '′' : size + '°') },
        { label: 'Záber Dwarfu', value: '2,45°' }
      ];
    },
    verdict: function (v) {
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Mesiac': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      if (size > 2.45) return { icon: '📐', ok: false,
        text: 'Tento objekt je väčší než celý záber – odfotíš len jeho časť. Presne tak je to s Andromedou.' };
      if (size < 0.05) return { icon: '🔍', ok: false,
        text: 'Maličký bod v strede. Planéty sú na nebi drobné – Dwarf ich odfotí, ale detailov bude málo.' };
      if (size > 1.6) return { icon: '🙂', ok: true, text: 'Zmestí sa, ale tesne. Treba mieriť presne.' };
      return { icon: '✅', ok: true, text: 'Pohodlne sa zmestí do záberu – ideálny cieľ pre Dwarf.' };
    },
    goal: function (v) { return v.obj === 'M31'; }
  },

  /* =============================== TRANZIT =============================== */
  tranzit: {
    draw: function (ctx, w, h, v) {
      ctx.fillStyle = '#05040c'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 70, 1995, { alpha: 0.5 });
      const cx = w / 2, cy = h * 0.36, R = Math.min(w * 0.13, h * 0.26);
      /* hviezda */
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.7);
      g.addColorStop(0, '#fffdf0'); g.addColorStop(0.45, '#ffd97a');
      g.addColorStop(1, 'rgba(255,154,43,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      /* Planéta – veľkosť je pomerná k hviezde, aby hĺbka poklesu
         (pomer plôch) vyšla rovnako na malom aj veľkom displeji. */
      const pr = R * (v.size / 250);
      const pxx = cx + v.pos * (R * 2.6 / 140);
      ctx.fillStyle = '#14100a';
      ctx.beginPath(); ctx.arc(pxx, cy, pr, 0, Math.PI * 2); ctx.fill();
      /* graf jasnosti */
      const gy = h * 0.82, gw = w * 0.8, gx = (w - gw) / 2, amp = h * 0.14;
      ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
      ctx.strokeStyle = '#8fd7ff'; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const p = -140 + i * 2;
        const px2 = cx + p * (R * 2.6 / 140);
        const overlap = Math.max(0, 1 - Math.abs(px2 - cx) / (R + pr));
        /* krivka je zámerne zväčšená – skutočný pokles je pod jedno percento
           a v grafe by nebol vidieť. Tvar aj pomer medzi planétami je správny. */
        const dip = overlap * Math.pow(v.size / 22, 2);
        const x = gx + (i / 140) * gw;
        const y = gy - amp + Math.min(amp, dip * amp * 0.85);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      /* poloha na grafe */
      const mark = gx + ((v.pos + 140) / 280) * gw;
      ctx.fillStyle = '#ffd479'; ctx.beginPath(); ctx.arc(mark, gy - amp + 2, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '11px system-ui';
      ctx.fillText('jasnosť hviezdy (graf je zväčšený, aby bol pokles vidieť)', gx, gy + 15);
    },
    stats: function (v) {
      const overlap = Math.max(0, 1 - Math.abs(v.pos) / 90);
      /* Pokles = pomer plôch planéty a hviezdy. Skutočné čísla: taký veľký
         plynný obor ako Jupiter pred Slnkom by zakryl asi jedno percento. */
      const dip = overlap * Math.pow(v.size / 250, 2) * 100;
      const velkosti = { 4: 'malá (kamenná)', 8: 'stredná', 14: 'veľká', 22: 'obor ako Jupiter' };
      return [
        { label: 'Poloha planéty', value: Math.abs(v.pos) < 8 ? 'pred stredom hviezdy' : 'mimo stredu' },
        { label: 'Pokles jasnosti', value: dip < 0.005 ? 'žiadny' : dip.toFixed(2) + ' %' },
        { label: 'Veľkosť planéty', value: velkosti[v.size] || 'stredná' }
      ];
    },
    verdict: function (v) {
      const overlap = Math.max(0, 1 - Math.abs(v.pos) / 90);
      if (overlap <= 0.02) return { icon: '➡️', ok: false,
        text: 'Planéta je mimo hviezdy, takže jasnosť sa nemení. Práve tak vyzerá väčšina času.' };
      if (Math.abs(v.pos) < 10) return { icon: '📉', ok: true,
        text: 'Presne tu je pokles najhlbší – planéta zakrýva stred hviezdy. Z hĺbky poklesu sa dá vypočítať jej veľkosť. ' +
              'Všimni si, aké malé to číslo je: aj obrovská planéta zakryje menej než jedno percento svetla. ' +
              'Práve preto to nezbadá oko, ale prístroj áno.' };
      return { icon: '🔎', ok: true,
        text: 'Planéta už zasahuje do kotúča hviezdy a jasnosť začala klesať.' };
    },
    goal: function (v) { return Math.abs(v.pos) < 10; }
  },

  /* ========================= FARBA A TEPLOTA ============================= */
  'farba-teplota': {
    draw: function (ctx, w, h, v) {
      const t = v.temp;
      let col;
      if (t < 3500) col = [255, 120, 90];
      else if (t < 5000) col = [255, 175, 110];
      else if (t < 6200) col = [255, 236, 180];
      else if (t < 8000) col = [248, 248, 255];
      else if (t < 13000) col = [200, 220, 255];
      else col = [150, 190, 255];
      ctx.fillStyle = '#03040b'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 80, 123, { alpha: 0.45 });
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.3;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.28, 'rgb(' + col.join(',') + ')');
      g.addColorStop(0.6, 'rgba(' + col.join(',') + ',.45)');
      g.addColorStop(1, 'rgba(' + col.join(',') + ',0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgb(' + col.join(',') + ')';
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.62, 0, Math.PI * 2); ctx.fill();
    },
    stats: function (v) {
      const kind = v.temp < 3500 ? 'červená' : v.temp < 5000 ? 'oranžová'
        : v.temp < 6200 ? 'žltá' : v.temp < 8000 ? 'biela' : 'modrá';
      return [
        { label: 'Teplota povrchu', value: v.temp.toLocaleString('sk-SK') + ' °C' },
        { label: 'Farba', value: kind },
        { label: 'Slnko má', value: '≈ 5 500 °C' }
      ];
    },
    verdict: function (v) {
      if (v.temp < 3500) return { icon: '🔴', ok: true, text: 'Najchladnejšie hviezdy. Sú to buď malé úsporné hviezdičky, alebo starí nafúknutí obri.' };
      if (v.temp <= 6200) return { icon: '🟡', ok: true, text: 'Stredne horúca žltá hviezda – presne ako naše Slnko. Takéto hviezdy svietia pokojne miliardy rokov.' };
      if (v.temp < 8000) return { icon: '⚪', ok: true, text: 'Biela hviezda, horúcejšia než Slnko.' };
      return { icon: '🔵', ok: true, text: 'Modrá hviezda – najhorúcejšia. Svieti zbesilo a práve preto žije krátko.' };
    },
    goal: function (v) { return v.temp >= 5000 && v.temp <= 6000; }
  },

  /* ========================= VESMÍRNE VZDIALENOSTI ======================= */
  vzdialenosti: (function () {
    const L = [
      { n: 'Mesiac',   d: '384 400 km',            t: '1,3 svetelnej sekundy', s: 0.02, c: '#dfe6f2' },
      { n: 'Slnko',    d: '150 miliónov km',       t: '8 svetelných minút',    s: 0.10, c: '#ffd06a' },
      { n: 'Saturn',   d: '1,4 miliardy km',       t: '1,3 svetelnej hodiny',  s: 0.16, c: '#e8c48a' },
      { n: 'Proxima Centauri', d: '4,25 sv. roka', t: '4,25 roka',             s: 0.30, c: '#ff8a72' },
      { n: 'Sirius',   d: '8,6 sv. roka',          t: '8,6 roka',              s: 0.40, c: '#cfe0ff' },
      { n: 'M42 Orionova hmlovina', d: '≈1 300 sv. rokov', t: '1 300 rokov',   s: 0.58, c: '#ff7ac6' },
      { n: 'M31 Andromeda', d: '2,5 milióna sv. rokov', t: '2,5 milióna rokov', s: 0.78, c: '#b79dff' },
      { n: 'M51 galaxia Vír', d: '31 miliónov sv. rokov', t: '31 miliónov rokov', s: 1.0, c: '#9ad8ff' }
    ];
    return {
      draw: function (ctx, w, h, v) {
        const it = L[v.step];
        ctx.fillStyle = '#03040b'; ctx.fillRect(0, 0, w, h);
        simStars(ctx, w, h, 110, 3141, { alpha: 0.5 });
        /* mierka dole */
        const gx = w * 0.08, gw = w * 0.84, gy = h - 34;
        ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
        L.forEach(function (o, i) {
          const x = gx + o.s * gw;
          ctx.fillStyle = i === v.step ? '#4ad8ff' : 'rgba(255,255,255,.28)';
          ctx.beginPath(); ctx.arc(x, gy, i === v.step ? 6 : 3, 0, Math.PI * 2); ctx.fill();
        });
        /* objekt */
        const cx = w / 2, cy = h * 0.42, R = Math.max(10, (1 - it.s) * Math.min(w, h) * 0.3 + 12);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.9);
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.3, it.c);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center'; ctx.fillText(it.n, cx, h * 0.14);
        ctx.font = '12px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.55)';
        ctx.fillText('svetlo k nám letelo ' + it.t, cx, h * 0.14 + 18);
        ctx.textAlign = 'left';
      },
      stats: function (v) {
        const it = L[v.step];
        return [
          { label: 'Objekt', value: it.n },
          { label: 'Vzdialenosť', value: it.d },
          { label: 'Svetlo letelo', value: it.t }
        ];
      },
      verdict: function (v) {
        if (v.step <= 1) return { icon: '🏠', ok: true, text: 'Toto je náš najbližší vesmír – svetlo odtiaľ letí sekundy až minúty.' };
        if (v.step === 3) return { icon: '😮', ok: true, text: 'Všimni si ten skok: od Saturnu k najbližšej hviezde je to z hodín na roky.' };
        if (v.step >= 6) return { icon: '🤯', ok: true, text: 'Pozeráš na svetlo staré milióny rokov. Vidíš minulosť, nie prítomnosť.' };
        return { icon: '📏', ok: true, text: 'Medzi hviezdami je oveľa väčšia diera než v celej našej Slnečnej soustave.' };
      },
      goal: function (v) { return v.step === 7; }
    };
  })(),

  /* ====================== SVETELNÉ ZNEČISTENIE =========================== */
  'svetelne-znecistenie': {
    draw: function (ctx, w, h, v) {
      const b = v.bortle;                       // 1 = tma, 9 = mesto
      const stars = Math.round(900 / Math.pow(1.55, b - 1));
      const glow = (b - 1) / 8;
      ctx.fillStyle = '#03040b'; ctx.fillRect(0, 0, w, h);
      /* Mliečna cesta zmizne okolo stupňa 5 */
      if (b <= 5) {
        ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(-0.22); ctx.translate(-w / 2, -h / 2);
        const mw = ctx.createLinearGradient(0, h * 0.35, 0, h * 0.65);
        const a = 0.24 * (1 - (b - 1) / 5);
        mw.addColorStop(0, 'rgba(255,240,210,0)');
        mw.addColorStop(0.5, 'rgba(255,240,210,' + a.toFixed(3) + ')');
        mw.addColorStop(1, 'rgba(255,240,210,0)');
        ctx.fillStyle = mw; ctx.fillRect(-w, h * 0.3, w * 3, h * 0.4);
        ctx.restore();
      }
      simStars(ctx, w, h, stars, 2026, { alpha: 1 });
      /* žiara od mesta pri obzore */
      const gg = ctx.createLinearGradient(0, h, 0, h * 0.35);
      gg.addColorStop(0, 'rgba(255,154,60,' + (0.75 * glow).toFixed(3) + ')');
      gg.addColorStop(1, 'rgba(255,154,60,0)');
      ctx.fillStyle = gg; ctx.fillRect(0, h * 0.35, w, h * 0.65);
      /* silueta */
      ctx.fillStyle = '#05060c';
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += w / 10) ctx.lineTo(x, h - 12 - ((x / w * 7) % 3) * 8);
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
    },
    stats: function (v) {
      const stars = Math.round(900 / Math.pow(1.55, v.bortle - 1));
      const kde = ['', 'Poloniny', 'tmavá dedina', 'vidiek', 'okraj dediny', 'predmestie',
                   'malé mesto', 'mesto', 'veľké mesto', 'centrum mesta'][v.bortle];
      return [
        { label: 'Bortlova stupnica', value: v.bortle },
        { label: 'Kde to tak vyzerá', value: kde },
        { label: 'Viditeľných hviezd', value: '≈ ' + stars }
      ];
    },
    verdict: function (v) {
      if (v.bortle <= 2) return { icon: '🌌', ok: true, text: 'Takto vyzerá skutočne tmavá obloha. Mliečna cesta vrhá tieň a hviezd je toľko, že sa v nich ťažko orientuje.' };
      if (v.bortle <= 4) return { icon: '🙂', ok: true, text: 'Dobrá obloha. Mliečnu cestu vidno, slabé objekty sa dajú fotiť.' };
      if (v.bortle <= 6) return { icon: '😐', ok: false, text: 'Mliečna cesta už zmizla. Fotiť sa dá, ale slabé hmloviny sú v žiare stratené.' };
      return { icon: '🏙️', ok: false, text: 'Mestská obloha – zostali len najjasnejšie hviezdy, Mesiac a planéty. Kvôli hmlovinám sa treba odviezť.' };
    },
    goal: function (v) { return v.bortle <= 2; }
  }
};
