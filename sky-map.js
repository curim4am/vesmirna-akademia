/* =============================================================================
   MAPA OBLOHY  (sky-map.js)
   -----------------------------------------------------------------------------
   Kreslí skutečnou mapu severní oblohy podle souřadnic z data/sky.js
   a data/objects.js. Není to seznam ani menu – je to obloha, na které
   se rozsvěcují objekty, které dítě objevilo.

   Co na mapě je:
     · Polárka uprostřed (kolem ní se obloha otáčí)
     · kružnice deklinace +60°, +30°, 0° a okraj mapy
     · hodiny rektascenze po obvodu
     · pás Mléčné dráhy (spočítaný z galaktických souřadnic)
     · jasné hvězdy a obrazce, které se dá naučit poznat
     · objekty akademie: objevené (červeně), neobjevené (tiše), dnes viditelné
       (kroužek) a cíl aktuální výpravy (dvojitý kroužek)

   Projekce: severní polární, vzdálenost od středu roste lineárně s úhlem
   od pólu – r = R · (90 − dec) / (90 − decMin). Pro dětskou mapu je to
   čitelnější než přísně stereografická projekce, protože nezvětšuje okraj.

   Použití:
       const mapa = createSkyMap(hostElement, { onPick: fn });
       mapa.redraw();            // po změně stavu
       mapa.flash('m42');        // rozsvícení nově objeveného objektu
   ========================================================================== */

/* ------------------------- čas a orientace ------------------------------- */

/** Místní hvězdný čas v hodinách (0–24) – určuje, co je právě na jihu. */
function localSiderealHours(date, lonDeg) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;                       // dny od J2000
  let gmst = 280.46061837 + 360.98564736629 * d;  // stupně
  let lst = (gmst + lonDeg) % 360;
  if (lst < 0) lst += 360;
  return lst / 15;
}

/** Rektascenze, která je dnes ve 22:00 místního času na jihu. */
function eveningRaHours(date) {
  const d = new Date(date.getTime());
  d.setHours(22, 0, 0, 0);
  return localSiderealHours(d, SKY_PLACE.lon);
}

/* ------------------- galaktický pás (Mléčná dráha) ----------------------- */
const RAD = Math.PI / 180;

/** Galaktické (l, b) → rovníkové (ra v hodinách, dec ve stupních), J2000. */
function galacticToEquatorial(l, b) {
  const aNGP = 192.85948 * RAD, dNGP = GALACTIC_POLE.dec * RAD;
  const lNCP = GALACTIC_POLE.lonNCP * RAD;
  const lr = l * RAD, br = b * RAD;
  const sinDec = Math.sin(dNGP) * Math.sin(br) +
                 Math.cos(dNGP) * Math.cos(br) * Math.cos(lNCP - lr);
  const dec = Math.asin(Math.max(-1, Math.min(1, sinDec)));
  const y = Math.cos(br) * Math.sin(lNCP - lr);
  const x = Math.cos(dNGP) * Math.sin(br) - Math.sin(dNGP) * Math.cos(br) * Math.cos(lNCP - lr);
  let ra = aNGP + Math.atan2(y, x);
  ra = ((ra / RAD) % 360 + 360) % 360;
  return { ra: ra / 15, dec: dec / RAD };
}

/* ------------------------------ komponenta ------------------------------- */

/**
 * Vytvoří mapu oblohy v zadaném prvku.
 * @param {HTMLElement} host
 * @param {object} opts – { onPick(objectId), current:'m42', rot:0 }
 */
function createSkyMap(host, opts) {
  opts = opts || {};
  const wrap = document.createElement('div');
  wrap.className = 'skymap';
  const canvas = document.createElement('canvas');
  canvas.className = 'skymap__canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label',
    'Mapa severní oblohy z Prahy. Objevené objekty jsou zvýrazněné. ' +
    'Seznam objektů je vedle mapy.');
  wrap.appendChild(canvas);

  const hud = document.createElement('div');
  hud.className = 'skymap__hud';
  wrap.appendChild(hud);

  const legend = document.createElement('div');
  legend.className = 'skymap__legend';
  legend.innerHTML =
    '<span class="skymap__key is-found"><i></i>objevené</span>' +
    '<span class="skymap__key is-tonight"><i></i>dnes vysoko</span>' +
    '<span class="skymap__key"><i></i>čeká na tebe</span>' +
    '<span class="skymap__key is-goal"><i></i>cíl výpravy</span>';
  wrap.appendChild(legend);

  const tip = document.createElement('div');
  tip.className = 'skymap__tip';
  tip.hidden = true;
  wrap.appendChild(tip);

  host.appendChild(wrap);

  let rot = 0;                       // pootočení mapy (radiány)
  let hover = null;                  // objekt pod kurzorem
  let flashing = null;               // { id, t0 } – rozsvícení objektu
  let layout = { cx: 0, cy: 0, R: 1 };
  let drag = null;

  const objects = (typeof SPACE_OBJECTS !== 'undefined' ? SPACE_OBJECTS : [])
    .filter(function (o) { return typeof o.ra === 'number'; });

  /* ---- projekce ---- */
  function project(ra, dec) {
    const span = 90 - SKY_PLACE.decMin;
    const r = layout.R * (90 - dec) / span;
    const th = ra / 24 * Math.PI * 2 + rot;
    return { x: layout.cx - r * Math.sin(th), y: layout.cy - r * Math.cos(th), r: r };
  }

  /* ---- pomocné barvy (z CSS, aby noční režim fungoval) ---- */
  function css(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  /* ---- kreslení ---- */
  function draw() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    layout.cx = w / 2;
    layout.cy = h / 2;
    layout.R = Math.min(w, h) / 2 - 26;

    const ink3 = css('--ink-3', '#6d7787');
    const ink2 = css('--ink-2', '#9ba5b6');
    const line = css('--line', '#1e2431');
    const line2 = css('--line-2', '#2b3342');
    const ha = css('--ha', '#e2404f');

    /* plocha oblohy */
    ctx.save();
    ctx.beginPath();
    ctx.arc(layout.cx, layout.cy, layout.R, 0, Math.PI * 2);
    ctx.fillStyle = '#05070c';
    ctx.fill();
    ctx.clip();

    /* pás Mléčné dráhy – spočítaný z galaktických souřadnic a vyplněný jako
       jeden souvislý pruh (dvě hrany: b = +10° dopředu, b = −10° zpátky) */
    drawMilkyWay(ctx, 7, 'rgba(150,170,215,0.04)');
    drawMilkyWay(ctx, 3, 'rgba(150,170,215,0.035)');

    function drawMilkyWay(c, halfWidth, fill) {
      c.beginPath();
      for (let l = 0; l <= 360; l += 2) {
        const eq = galacticToEquatorial(l, halfWidth);
        const p = project(eq.ra, eq.dec);
        if (l === 0) c.moveTo(p.x, p.y); else c.lineTo(p.x, p.y);
      }
      for (let l = 360; l >= 0; l -= 2) {
        const eq = galacticToEquatorial(l, -halfWidth);
        const p = project(eq.ra, eq.dec);
        c.lineTo(p.x, p.y);
      }
      c.closePath();
      c.fillStyle = fill;
      c.fill();
    }

    /* kružnice deklinace */
    [60, 30, 0].forEach(function (dec) {
      const rr = layout.R * (90 - dec) / (90 - SKY_PLACE.decMin);
      ctx.beginPath();
      ctx.arc(layout.cx, layout.cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    /* paprsky rektascenze */
    for (let hh = 0; hh < 24; hh += 2) {
      const p = project(hh, SKY_PLACE.decMin);
      ctx.beginPath();
      ctx.moveTo(layout.cx, layout.cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    /* okraj */
    ctx.beginPath();
    ctx.arc(layout.cx, layout.cy, layout.R, 0, Math.PI * 2);
    ctx.strokeStyle = line2;
    ctx.lineWidth = 1;
    ctx.stroke();

    /* Na malé mapě se popisky nevejdou – radši méně a čitelně. */
    const small = layout.R < 210;

    /* hodiny rektascenze po obvodu */
    ctx.font = '10px ' + (css('--mono', 'monospace'));
    ctx.fillStyle = ink3;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let hh = 0; hh < 24; hh += (small ? 6 : 3)) {
      const th = hh / 24 * Math.PI * 2 + rot;
      const rr = layout.R - 13;
      ctx.fillText(hh + 'h', layout.cx - rr * Math.sin(th), layout.cy - rr * Math.cos(th));
    }

    /* obrazce */
    const byId = {};
    SKY_STARS.forEach(function (s) { byId[s.id] = s; });
    SKY_ASTERISMS.forEach(function (a) {
      ctx.strokeStyle = a.dashed ? 'rgba(155,165,182,0.16)' : 'rgba(155,165,182,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash(a.dashed ? [3, 4] : []);
      a.lines.forEach(function (seg) {
        ctx.beginPath();
        seg.forEach(function (id, i) {
          const s = byId[id];
          if (!s) return;
          const p = project(s.ra, s.dec);
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      });
    });
    ctx.setLineDash([]);

    /* hvězdy */
    SKY_STARS.forEach(function (s) {
      const p = project(s.ra, s.dec);
      if (p.r > layout.R) return;
      const rad = Math.max(0.9, 2.9 - s.mag * 0.5);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(233,237,244,' + Math.min(1, 0.5 + (3 - s.mag) * 0.18).toFixed(2) + ')';
      ctx.fill();
    });

    /* jména nejjasnějších hvězd – jen ty, které si dítě pamatuje */
    ctx.font = '11px ' + css('--font', 'sans-serif');
    ctx.fillStyle = 'rgba(155,165,182,0.75)';
    ctx.textAlign = 'left';
    const jmena = small
      ? ['polaris', 'vega', 'deneb', 'arcturus', 'betelgeuse']
      : ['polaris', 'vega', 'deneb', 'altair', 'arcturus', 'capella', 'betelgeuse',
         'rigel', 'aldebaran', 'pollux', 'regulus', 'antares', 'spica'];
    jmena.forEach(function (id) {
      const s = byId[id];
      if (!s) return;
      const p = project(s.ra, s.dec);
      if (p.r > layout.R * 0.88) return;
      ctx.fillText(s.name, p.x + 6, p.y - 5);
    });

    /* objekty akademie */
    const month = new Date().getMonth();
    const tonight = {};
    if (typeof SEASON_TIPS !== 'undefined' && SEASON_TIPS[month]) {
      (SEASON_TIPS[month].objects || []).forEach(function (id) { tonight[id] = true; });
    }
    const now = performance.now();

    objects.forEach(function (o) {
      const p = project(o.ra, o.dec);
      if (p.r > layout.R) return;
      const found = !!(state.discovered && state.discovered[o.id]);
      const isCurrent = opts.current === o.id;
      const isTonight = !!tonight[o.id];

      /* rozsvícení nově objeveného objektu (jediná animace na mapě) */
      if (flashing && flashing.id === o.id) {
        const t = (now - flashing.t0) / 900;
        if (t < 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 + t * 34, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(226,64,79,' + (0.55 * (1 - t)).toFixed(2) + ')';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          flashing = null;
        }
      }

      if (isTonight) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(155,165,182,0.55)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (isCurrent) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 13, 0, Math.PI * 2);
        ctx.strokeStyle = ha;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, found ? 4.6 : 3.4, 0, Math.PI * 2);
      if (found) {
        ctx.fillStyle = ha;
        ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(155,165,182,0.75)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      /* popisek: objevené, dnešní a objekt pod kurzorem
         (na malé mapě jen objevené a cíl, jinak by se texty překrývaly) */
      const label = small
        ? (found || isCurrent || (hover && hover.id === o.id))
        : (found || isTonight || isCurrent || (hover && hover.id === o.id));
      if (label && p.r < layout.R * 0.93) {
        ctx.font = (found ? '600 ' : '') + '12px ' + css('--font', 'sans-serif');
        ctx.fillStyle = found ? '#e9edf4' : ink2;
        ctx.textAlign = 'left';
        ctx.fillText(o.designation && o.designation.length <= 4 ? o.designation : o.name,
                     p.x + 8, p.y + 4);
      }
    });

    if (flashing) requestAnimationFrame(draw);
  }

  /* ---- interakce ---- */
  function pick(ev) {
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left, y = ev.clientY - rect.top;
    let best = null, bestD = 18;
    objects.forEach(function (o) {
      const p = project(o.ra, o.dec);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bestD) { bestD = d; best = o; }
    });
    return best;
  }

  canvas.addEventListener('pointermove', function (ev) {
    if (drag) {
      const dx = ev.clientX - drag.x;
      rot = drag.rot + dx * 0.006;
      draw();
      return;
    }
    const o = pick(ev);
    if (o !== hover) {
      hover = o;
      canvas.style.cursor = o ? 'pointer' : 'grab';
      if (o) {
        const found = !!(state.discovered && state.discovered[o.id]);
        tip.innerHTML = o.name + (found ? '' : ' <span class="muted">· neobjeveno</span>') +
          '<small>' + o.designation + ' · ' + raText(o.ra) + ' ' + decText(o.dec) + '</small>';
        const rect = canvas.getBoundingClientRect();
        const p = project(o.ra, o.dec);
        tip.style.left = p.x + 'px';
        tip.style.top = p.y + 'px';
        tip.hidden = false;
      } else {
        tip.hidden = true;
      }
      draw();
    }
  });
  canvas.addEventListener('pointerleave', function () {
    hover = null; tip.hidden = true; drag = null; draw();
  });
  canvas.addEventListener('pointerdown', function (ev) {
    drag = { x: ev.clientX, rot: rot, moved: false, t: Date.now() };
    canvas.setPointerCapture(ev.pointerId);
  });
  canvas.addEventListener('pointerup', function (ev) {
    const wasQuick = drag && Math.abs(ev.clientX - drag.x) < 5 && Date.now() - drag.t < 500;
    drag = null;
    if (wasQuick) {
      const o = pick(ev);
      if (o && opts.onPick) opts.onPick(o.id);
    }
  });

  window.addEventListener('resize', draw);

  /* orientace: rektascenze, která je dnes ve 22:00 na jihu, míří dolů */
  const evening = eveningRaHours(new Date());
  rot = -evening / 24 * Math.PI * 2;

  hud.innerHTML =
    '<span class="skymap__now">Severní obloha</span>' +
    '<span class="skymap__place">' + SKY_PLACE.name + ' · ' + SKY_PLACE.lat.toFixed(2) +
    '° s. š. · dnes 22:00</span>';

  setTimeout(draw, 0);

  return {
    redraw: draw,
    flash: function (id) { flashing = { id: id, t0: performance.now() }; draw(); },
    setCurrent: function (id) { opts.current = id; draw(); }
  };
}

/* --------------------- souřadnice v lidském zápisu ----------------------- */
function raText(ra) {
  const h = Math.floor(ra);
  const m = Math.floor((ra - h) * 60);
  return h + 'h ' + (m < 10 ? '0' : '') + m + 'm';
}
function decText(dec) {
  const sign = dec < 0 ? '−' : '+';
  const a = Math.abs(dec);
  const d = Math.floor(a);
  const m = Math.round((a - d) * 60);
  return sign + d + '° ' + (m < 10 ? '0' : '') + m + '′';
}
