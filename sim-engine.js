/* =============================================================================
   MOTOR INTERAKTIVNÍCH ÚLOH  (sim-engine.js)
   -----------------------------------------------------------------------------
   Pro každou simulaci z data/sims.js je tu jeden objekt se třemi funkcemi:

     draw(ctx, w, h, v)  – nakreslí náhled na canvas podle hodnot ovladačů
     stats(v)            – nepovinné: [{label, value}] pod náhledem
     verdict(v)          – { icon, text, ok } – hodnocení pod náhledem
     goal(v)             – nepovinné: true, když je splněná výzva (bonusové XP)

   Ovladače, texty a výzvy jsou v data/sims.js. Kreslení je záměrně oddělené,
   aby se obsah dal upravovat bez zasahování do kódu.
   ========================================================================== */

/* Zeměpisná šířka místa, odkud se pozoruje – Praha 3 leží na 50,09° s. š.
   Podle ní se v EQ režimu naklání osa dalekohledu. Když se přestěhujete,
   stačí změnit toto jedno číslo (a text výzvy v data/sims.js).            */
const SIRKA_PRAHA = 50;

/* ------------------------- malé pomůcky ---------------------------------- */
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
/* hvězdné pozadí – vždy tytéž hvězdy, aby byl rozdíl jen v nastavení */
function simStars(ctx, w, h, count, seed, opts) {
  opts = opts || {};
  const r = simRandom(seed || 4242);
  for (let i = 0; i < count; i++) {
    const x = r() * w, y = r() * h, br = r();
    const size = (0.5 + br * 1.6) * (opts.scale || 1);
    const a = (opts.alpha == null ? 1 : opts.alpha) * (0.3 + br * 0.7);
    if (opts.trail) {                       // hvězdy stočené do obloučků
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
/* Měkká mlhovina – jasnost 0…1.
   Záměrně z několika menších oblaků, aby to nebyla jen jedna koule:
   [x, y, velikost, barva, síla] – x/y/velikost jsou díly šířky, resp. výšky. */
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

  /* tmavý prachový pás – mlhoviny nejsou hladké koule */
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
   Pracuje s celým rastrem canvasu (ne s CSS pixely), jinak by u
   retina displejů pokryl jen část obrázku. */
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
/* Zjednodušený, ale fyzikálně správně se chovající model astrofotky:
     jasnost   ↑ s expozicí i gainem (logaritmicky, jak to vnímá oko)
     šum       ↓ s odmocninou z celkového nasbíraného času  (skutečný zákon:
               čtyřikrát delší celkový čas = poloviční šum), ↑ s gainem
     obloučky  ↑ s expozicí, ale jen v AZ režimu
     přepal    když je nasbíraného světla příliš (bílý střed bez detailu)
   noise je fyzikální hodnota (1,0 = deset minut při gainu 80). noiseAmp je jen
   to, jak silně se zrno nakreslí – malé rozdíly by jinak nebyly vidět. */
function fotolabModel(v) {
  const exp = v.exp, gain = v.gain, frames = v.frames, eq = v.mode === 'EQ';
  const light = exp * gain;                       // světlo v jednom snímku
  const total = exp * frames;                     // celkový čas fotografování (s)
  const brightness = Math.min(1, Math.log(1 + light / 60) / Math.log(1 + 10800 / 60));
  const noise = (gain / 80) * Math.sqrt(600 / Math.max(1, total));
  const noiseAmp = Math.pow(Math.min(1, noise / 1.6), 0.75);
  const blowout = light > 7000;
  const trail = eq ? 0 : Math.max(0, (exp - 15) / 60);
  return { brightness: brightness, noise: noise, noiseAmp: noiseAmp,
           blowout: blowout, trail: trail, total: total, light: light };
}
/* slovo místo čísla – pro devítiletého je „střední“ jasnější než 0,47 */
function noiseWord(n) {
  if (n > 0.70) return 'velký';
  if (n > 0.40) return 'střední';
  return 'malý';
}

const SIM_ENGINE = {

  fotolab: {
    draw: function (ctx, w, h, v) {
      const m = fotolabModel(v);
      ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, w, h);
      simNebula(ctx, w, h, m.brightness);
      if (m.blowout) {                       // přepálený bílý střed
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
        { label: 'Focení by trvalo', value: simTime(m.total) },
        { label: 'Nasbírané světlo', value: Math.round(m.brightness * 100) + ' %' },
        { label: 'Šum', value: noiseWord(m.noise) }
      ];
    },
    verdict: function (v) {
      const m = fotolabModel(v);
      if (m.blowout) return { icon: '💥', ok: false,
        text: 'Přepálený střed – nasbíralo se příliš mnoho světla. Uber expozici nebo gain.' };
      if (m.trail > 0.25) return { icon: '🌀', ok: false,
        text: 'Hvězdy se stočily do obloučků. Při takhle dlouhé expozici je potřeba zapnout EQ režim.' };
      if (m.brightness < 0.3) return { icon: '🌫️', ok: false,
        text: 'Příliš tmavé – mlhovinu spíš tušíš. Přidej expozici (pomůže víc než gain).' };
      if (m.noise > 0.70) return { icon: '❄️', ok: false,
        text: 'Fotka „sněží“. Přidej snímky nebo uber gain – šum klesá s celkovým nasbíraným časem.' };
      if (m.total > 3 * 3600) return { icon: '⏰', ok: false,
        text: 'Vypadá to dobře, ale fotení by trvalo celou noc. Zkus méně snímků.' };
      return { icon: '✅', ok: true,
        text: 'Paráda! Mlhovina je jasná, hvězdy kulaté a pozadí hladké.' };
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
        { label: 'Snímků', value: v.frames },
        { label: 'Focení by trvalo', value: simTime(30 * v.frames) },
        { label: 'Šum oproti 1 snímku', value: v.frames === 1 ? 'stejný' : krat + '× menší' }
      ];
    },
    verdict: function (v) {
      if (v.frames <= 5) return { icon: '❄️', ok: false, text: 'Celé pozadí je plné zrníček – takhle vypadá jeden snímek.' };
      if (v.frames < 50) return { icon: '🌫️', ok: false, text: 'Už lepší, ale pozadí stále šumí.' };
      if (v.frames < 200) return { icon: '🙂', ok: true, text: 'Pozadí je téměř hladké. To by už byla pěkná fotka.' };
      return { icon: '✅', ok: true, text: 'Hladké pozadí. Nad dvě stě snímků se rozdíl už moc nezlepší – a čas roste.' };
    },
    goal: function (v) { return v.frames >= 100; }
  },

  /* ============================ FÁZE MĚSÍCE ============================== */
  'mesiac-fazy': {
    draw: function (ctx, w, h, v) {
      const ang = (v.day / 29.5) * Math.PI * 2;      // 0 = nov
      ctx.fillStyle = '#05060e'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 60, 777, { alpha: 0.5 });

      /* ---- levá polovina: pohled zvenku ---- */
      const cx = w * 0.27, cy = h * 0.5, orb = Math.min(w * 0.19, h * 0.33);
      for (let i = 0; i < 5; i++) {                  // sluneční paprsky zleva
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
      /* Měsíc na dráze.
         Den 0 (nov) = mezi Sluncem a Zemí, tedy vlevo.
         Den ~14,75 (úplněk) = na opačné straně od Slunce, tedy vpravo.
         Osvětlená je vždy ta polovina Měsíce, která je otočená ke Slunci (vlevo). */
      const mx = cx - Math.cos(ang) * orb, my = cy + Math.sin(ang) * orb;
      ctx.fillStyle = '#3a3a44'; ctx.beginPath(); ctx.arc(mx, my, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f2efe6'; ctx.beginPath();
      ctx.arc(mx, my, 9, Math.PI / 2, Math.PI * 1.5); ctx.fill();
      /* šipka „odtud se na něj díváme“ */
      ctx.strokeStyle = 'rgba(150,180,255,.5)'; ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx, my); ctx.stroke();
      ctx.setLineDash([]);

      /* ---- pravá polovina: pohled ze Země ---- */
      const px = w * 0.72, py = h * 0.5, pr = Math.min(w * 0.16, h * 0.32);
      const illum = (1 - Math.cos(ang)) / 2;         // 0 = nov, 1 = spln
      ctx.fillStyle = '#0a0b13'; ctx.beginPath(); ctx.arc(px, py, pr + 3, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = '#1b1c24'; ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
      /* osvětlená část: kruh minus elipsa terminátoru */
      const grow = v.day <= 14.75;
      ctx.fillStyle = '#f4f1e8';
      ctx.beginPath();
      if (grow) ctx.arc(px, py, pr, -Math.PI / 2, Math.PI / 2);
      else ctx.arc(px, py, pr, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      const k = Math.abs(1 - 2 * illum);             // šířka elipsy terminátoru
      ctx.fillStyle = (illum > 0.5) ? '#f4f1e8' : '#1b1c24';
      ctx.beginPath(); ctx.ellipse(px, py, pr * k, pr, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.stroke();
    },
    stats: function (v) {
      const illum = Math.round((1 - Math.cos((v.day / 29.5) * Math.PI * 2)) / 2 * 100);
      const names = [[1.5, 'nov'], [6, 'dorůstající půlměsíc'], [9.5, 'první čtvrť'],
                     [13, 'dorůstající Měsíc'], [16.5, 'úplněk'], [20, 'ubývající Měsíc'],
                     [24, 'poslední čtvrť'], [28, 'ubývající půlměsíc'], [30, 'nov']];
      let name = 'nov';
      for (let i = 0; i < names.length; i++) { if (v.day <= names[i][0]) { name = names[i][1]; break; } }
      return [
        { label: 'Den v cyklu', value: v.day.toFixed(1) },
        { label: 'Fáza', value: name },
        { label: 'Osvětleno', value: illum + ' %' }
      ];
    },
    verdict: function (v) {
      const illum = (1 - Math.cos((v.day / 29.5) * Math.PI * 2)) / 2;
      if (illum < 0.05) return { icon: '🌑', ok: false, text: 'Nov – Měsíc je mezi námi a Sluncem, takže k nám míří neosvětlenou stranou. Nevidíme ' +
                                                             'ho.' };
      if (illum > 0.95) return { icon: '🌕', ok: true, text: 'Úplněk – Měsíc je na opačné straně od Slunce, takže vidíme celou osvětlenou polovinu.' };
      if (illum > 0.42 && illum < 0.58) return { icon: '🌓', ok: true, text: 'Čtvrť – vidíme přesně polovinu osvětlené strany. Teď jsou krátery nejkrásnější.' };
      return { icon: '🌒', ok: true, text: 'Vidíme jen část osvětlené poloviny. Žádný stín Země v tom není – je to jen otázka ' +
                                          'úhlu.' };
    },
    goal: function (v) { return Math.abs(v.day - 14.75) < 1.6; }
  },

  /* ============================ NASTAVENÍ EQ ============================= */
  'eq-nastavenie': {
    draw: function (ctx, w, h, v) {
      const errTilt = Math.abs(v.tilt - SIRKA_PRAHA), errN = Math.abs(v.north);
      const err = Math.min(1, (errTilt / 45) * 0.6 + (errN / 60) * 0.6);
      ctx.fillStyle = '#04050d'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 120, 4242, { trail: err * 1.6, alpha: 0.9 });
      /* malé schéma naklonění */
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
        { label: 'Naklonění', value: v.tilt + '° (potřeba ' + SIRKA_PRAHA + '°)' },
        { label: 'Odchylka od severu', value: Math.abs(v.north) + '°' },
        { label: 'Expozice', value: '90 s' }
      ];
    },
    verdict: function (v) {
      const et = Math.abs(v.tilt - SIRKA_PRAHA), en = Math.abs(v.north);
      if (et > 20 || en > 30) return { icon: '🌀', ok: false,
        text: 'Hvězdy kreslí dlouhé oblouky. Osa Dwarfu není ani zdaleka rovnoběžná s osou Země.' };
      if (et > 8 || en > 12) return { icon: '〰️', ok: false,
        text: 'Už lepší, ale hvězdy jsou stále mírně protáhlé. Dolaď naklonění i směr.' };
      return { icon: '✅', ok: true,
        text: 'Kulaté hvězdy i po 90 sekundách. Takhle to má vypadat – osa Dwarfu je rovnoběžná s ' +
              'osou Země.' };
    },
    goal: function (v) { return Math.abs(v.tilt - SIRKA_PRAHA) <= 3 && Math.abs(v.north) <= 8; }
  },

  /* ============================= ZORNÉ POLE ============================== */
  'zorne-pole': {
    draw: function (ctx, w, h, v) {
      /* velikosti objektů na nebi ve stupních */
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Měsíc': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      const fov = 2.45;
      ctx.fillStyle = '#04050d'; ctx.fillRect(0, 0, w, h);
      simStars(ctx, w, h, 90, 555, { alpha: 0.55 });
      const box = Math.min(w * 0.62, h * 0.82);
      const bx = (w - box) / 2, by = (h - box) / 2;
      const px = box / fov;                             // pixelů na stupeň
      const r = (size / 2) * px;
      /* objekt */
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(3, r));
      g.addColorStop(0, 'rgba(255,180,220,.95)');
      g.addColorStop(0.5, 'rgba(210,130,255,.55)');
      g.addColorStop(1, 'rgba(120,90,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(w / 2, h / 2, Math.max(3, r), 0, Math.PI * 2); ctx.fill();
      /* rámeček záběru Dwarfu */
      ctx.strokeStyle = '#4ad8ff'; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
      ctx.strokeRect(bx, by, box, box); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(74,216,255,.9)'; ctx.font = 'bold 12px system-ui';
      ctx.fillText('záběr Dwarfu 2,45°', bx + 6, by - 8);
    },
    stats: function (v) {
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Měsíc': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      return [
        { label: 'Objekt', value: v.obj },
        { label: 'Velikost na nebi', value: (size < 0.02 ? size * 60 + '′' : size + '°') },
        { label: 'Záběr Dwarfu', value: '2,45°' }
      ];
    },
    verdict: function (v) {
      const size = { 'Saturn': 0.008, 'M13': 0.33, 'Měsíc': 0.52, 'M42': 1.0, 'M45': 2.0, 'M31': 3.1 }[v.obj];
      if (size > 2.45) return { icon: '📐', ok: false,
        text: 'Tento objekt je větší než celý záběr – odfotíš jen jeho část. Přesně tak je to s ' +
              'Andromedou.' };
      if (size < 0.05) return { icon: '🔍', ok: false,
        text: 'Maličký bod ve středu. Planety jsou na nebi drobné – Dwarf je odfotí, ale detailů bude ' +
              'málo.' };
      if (size > 1.6) return { icon: '🙂', ok: true, text: 'Vejde se, ale těsně. Je potřeba mířit přesně.' };
      return { icon: '✅', ok: true, text: 'Pohodlně se vejde do záběru – ideální cíl pro Dwarf.' };
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
      /* Planeta – velikost je poměrná ke hvězdě, aby hloubka poklesu
         (poměr ploch) vyšla stejně na malém i velkém displeji. */
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
        /* křivka je záměrně zvětšená – skutečný pokles je pod jedno procento
           a v grafu by nebyl vidět. Tvar i poměr mezi planetami je správný. */
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
      ctx.fillText('jasnost hvězdy (graf je zvětšený, aby byl pokles vidět)', gx, gy + 15);
    },
    stats: function (v) {
      const overlap = Math.max(0, 1 - Math.abs(v.pos) / 90);
      /* Pokles = poměr ploch planety a hvězdy. Skutečná čísla: tak velký
         plynný obr jako Jupiter před Sluncem by zakryl asi jedno procento. */
      const dip = overlap * Math.pow(v.size / 250, 2) * 100;
      const velkosti = { 4: 'malá (kamenná)', 8: 'střední', 14: 'velká', 22: 'obr jako Jupiter' };
      return [
        { label: 'Poloha planety', value: Math.abs(v.pos) < 8 ? 'před středem hvězdy' : 'mimo stredu' },
        { label: 'Pokles jasnosti', value: dip < 0.005 ? 'žádný' : dip.toFixed(2) + ' %' },
        { label: 'Velikost planety', value: velkosti[v.size] || 'střední' }
      ];
    },
    verdict: function (v) {
      const overlap = Math.max(0, 1 - Math.abs(v.pos) / 90);
      if (overlap <= 0.02) return { icon: '➡️', ok: false,
        text: 'Planeta je mimo hvězdu, takže jasnost se nemění. Právě tak vypadá většina času.' };
      if (Math.abs(v.pos) < 10) return { icon: '📉', ok: true,
        text: 'Přesně tady je pokles nejhlubší – planeta zakrývá střed hvězdy. Z hloubky poklesu se ' +
              'dá vypočítat její velikost. ' +
              'Všimni si, jak malé to číslo je: i obrovská planeta zakryje méně než jedno procento ' +
              'světla. ' +
              'Právě proto si toho oko nevšimne, ale přístroj ano.' };
      return { icon: '🔎', ok: true,
        text: 'Planeta už zasahuje do kotouče hvězdy a jasnost začala klesat.' };
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
        : v.temp < 6200 ? 'žlutá' : v.temp < 8000 ? 'biela' : 'modrá';
      return [
        { label: 'Teplota povrchu', value: v.temp.toLocaleString('sk-SK') + ' °C' },
        { label: 'Farba', value: kind },
        { label: 'Slunce má', value: '≈ 5 500 °C' }
      ];
    },
    verdict: function (v) {
      if (v.temp < 3500) return { icon: '🔴', ok: true, text: 'Nejchladnější hvězdy. Jsou to buď malé úsporné hvězdičky, nebo staří nafouknutí obři.' };
      if (v.temp <= 6200) return { icon: '🟡', ok: true, text: 'Středně horká žlutá hvězda – přesně jako naše Slunce. Takové hvězdy svítí klidně ' +
                                                              'miliardy let.' };
      if (v.temp < 8000) return { icon: '⚪', ok: true, text: 'Bílá hvězda, žhavější než Slunce.' };
      return { icon: '🔵', ok: true, text: 'Modrá hvězda – nejžhavější. Svítí zběsile a právě proto žije krátce.' };
    },
    goal: function (v) { return v.temp >= 5000 && v.temp <= 6000; }
  },

  /* ========================== VESMÍRNÉ VZDÁLENOSTI ======================= */
  vzdialenosti: (function () {
    const L = [
      { n: 'Měsíc',    d: '384 400 km',            t: '1,3 světelné sekundy', s: 0.02, c: '#dfe6f2' },
      { n: 'Slunce',   d: '150 milionů km',       t: '8 světelných minut',    s: 0.10, c: '#ffd06a' },
      { n: 'Saturn',   d: '1,4 miliardy km',       t: '1,3 světelné hodiny',  s: 0.16, c: '#e8c48a' },
      { n: 'Proxima Centauri', d: '4,25 sv. roka', t: '4,25 roka',             s: 0.30, c: '#ff8a72' },
      { n: 'Sirius',   d: '8,6 sv. roka',          t: '8,6 roka',              s: 0.40, c: '#cfe0ff' },
      { n: 'M42 Orionova mlhovina', d: '≈1 300 sv. rokov', t: '1 300 rokov',   s: 0.58, c: '#ff7ac6' },
      { n: 'M31 Andromeda', d: '2,5 milionu sv. let', t: '2,5 milionu let', s: 0.78, c: '#b79dff' },
      { n: 'M51 galaxie Vír', d: '31 milionů sv. let', t: '31 milionů let', s: 1.0, c: '#9ad8ff' }
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
        ctx.fillText('světlo k nám letělo ' + it.t, cx, h * 0.14 + 18);
        ctx.textAlign = 'left';
      },
      stats: function (v) {
        const it = L[v.step];
        return [
          { label: 'Objekt', value: it.n },
          { label: 'Vzdálenost', value: it.d },
          { label: 'Svetlo letelo', value: it.t }
        ];
      },
      verdict: function (v) {
        if (v.step <= 1) return { icon: '🏠', ok: true, text: 'Tohle je náš nejbližší vesmír – světlo odtud letí sekundy až minuty.' };
        if (v.step === 3) return { icon: '😮', ok: true, text: 'Všimni si ten skok: od Saturnu k nejbližší hvězdě je to z hodin na roky.' };
        if (v.step >= 6) return { icon: '🤯', ok: true, text: 'Koukáš na světlo staré miliony let. Vidíš minulost, ne přítomnost.' };
        return { icon: '📏', ok: true, text: 'Mezi hvězdami je mnohem větší díra než v celé naší Sluneční soustavě.' };
      },
      goal: function (v) { return v.step === 7; }
    };
  })(),

  /* ====================== SVĚTELNÉ ZNEČIŠTĚNÍ ============================ */
  'svetelne-znecistenie': {
    draw: function (ctx, w, h, v) {
      const b = v.bortle;                       // 1 = tma, 9 = mesto
      const stars = Math.round(900 / Math.pow(1.55, b - 1));
      const glow = (b - 1) / 8;
      ctx.fillStyle = '#03040b'; ctx.fillRect(0, 0, w, h);
      /* Mléčná dráha zmizí okolo stupně 5 */
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
      /* zář od města u obzoru */
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
      const kde = ['', 'Poloniny', 'tmavá vesnice', 'vidiek', 'okraj dediny', 'predmestie',
                   'malé město', 'mesto', 'velké město', 'centrum mesta'][v.bortle];
      return [
        { label: 'Bortlova stupnica', value: v.bortle },
        { label: 'Kde to tak vypadá', value: kde },
        { label: 'Viditelných hvězd', value: '≈ ' + stars }
      ];
    },
    verdict: function (v) {
      if (v.bortle <= 2) return { icon: '🌌', ok: true, text: 'Takhle vypadá skutečně tmavá obloha. Mléčná dráha vrhá stín a hvězd je tolik, že se v ' +
                                                             'nich těžko orientuje.' };
      if (v.bortle <= 4) return { icon: '🙂', ok: true, text: 'Dobrá obloha. Mléčnou dráhu je vidět, slabé objekty se dají fotit.' };
      if (v.bortle <= 6) return { icon: '😐', ok: false, text: 'Mléčná dráha už zmizla. Fotit se dá, ale slabé mlhoviny jsou v záři ztracené.' };
      return { icon: '🏙️', ok: false, text: 'Městská obloha – zůstaly jen nejjasnější hvězdy, Měsíc a planety. Kvůli mlhovinám je ' +
                                            'potřeba odjet.' };
    },
    goal: function (v) { return v.bortle <= 2; }
  }
};
