/* =============================================================================
   IKONY  (icons.js)
   -----------------------------------------------------------------------------
   Jeden jednotný soubor ikon. Kreslí se jako vložené SVG, takže:
     · nepotřebují žádný font ani internet (aplikace funguje offline),
     · berou barvu z textu (currentColor), takže fungují i v nočním režimu,
     · mají stejnou šířku tahu a stejnou mřížku 24 × 24 – nevypadají slepené
       z různých sad jako emoji.

   Použití v kódu:
       icon('telescope')                 → <svg …>   (18 px, v textu)
       icon('sky', { size: 28 })         → větší
       icon('check', { cls: 'is-ok' })   → vlastní třída
       iconEmoji('🔭')                    → ikona podle emoji z dat

   PŘIDAT IKONU: přidej položku do ICONS – jen vnitřek SVG, kreslený na
   mřížce 24 × 24 s tahem 1,5 (obrys se dokreslí sám).
   ========================================================================== */

const ICONS = {

  /* ---- navigace a ovládání ---- */
  back:        '<path d="M15 4.5L8 12l7 7.5"/>',
  next:        '<path d="M9 4.5L16 12l-7 7.5"/>',
  down:        '<path d="M4.5 9L12 16l7.5-7"/>',
  up:          '<path d="M4.5 15L12 8l7.5 7"/>',
  close:       '<path d="M6 6l12 12M18 6L6 18"/>',
  check:       '<path d="M4 12.8l5.2 5.2L20 6.5"/>',
  cross:       '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  plus:        '<path d="M12 5v14M5 12h14"/>',
  minus:       '<path d="M5 12h14"/>',
  arrow:       '<path d="M4 12h15M13.5 6.5L20 12l-6.5 5.5"/>',
  home:        '<path d="M3.5 11L12 3.8 20.5 11"/><path d="M6 9.6V20h12V9.6"/>',
  search:      '<circle cx="11" cy="11" r="6.4"/><path d="M15.7 15.7l4.8 4.8"/>',
  eye:         '<path d="M2.6 12S6.2 6.6 12 6.6 21.4 12 21.4 12 17.8 17.4 12 17.4 2.6 12 2.6 12z"/>' +
               '<circle cx="12" cy="12" r="2.7"/>',
  play:        '<path d="M8.5 5.6L19 12 8.5 18.4z"/>',
  reset:       '<path d="M20 12a8 8 0 1 1-2.7-6"/><path d="M20 4.5V10h-5.5"/>',
  trash:       '<path d="M5 7.5h14M9.5 7.5V5h5v2.5"/><path d="M6.8 7.5l.9 12h8.6l.9-12"/>',
  print:       '<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="1.5"/>' +
               '<path d="M7 16v4h10v-4"/>',
  link:        '<path d="M10.2 13.8a3.8 3.8 0 0 1 0-5.4l2.2-2.2a3.8 3.8 0 0 1 5.4 5.4l-1.2 1.2"/>' +
               '<path d="M13.8 10.2a3.8 3.8 0 0 1 0 5.4l-2.2 2.2a3.8 3.8 0 0 1-5.4-5.4l1.2-1.2"/>',
  lock:        '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/>' +
               '<path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  unlock:      '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/>' +
               '<path d="M8.5 10.5V8a3.5 3.5 0 0 1 6.7-1.3"/>',
  soundOn:     '<path d="M4 9.8h3L11 6.3v11.4L7 14.2H4z"/><path d="M14.6 9.6a3.4 3.4 0 0 1 0 4.8"/>' +
               '<path d="M17.2 7a7 7 0 0 1 0 10"/>',
  soundOff:    '<path d="M4 9.8h3L11 6.3v11.4L7 14.2H4z"/><path d="M15 10l4.5 4.5M19.5 10L15 14.5"/>',
  night:       '<path d="M15.4 3.7A8.5 8.5 0 1 0 20.3 12 6.8 6.8 0 0 1 15.4 3.7z" ' +
               'fill="currentColor" stroke="none"/>',
  day:         '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2.3M12 18.9v2.3M2.8 12h2.3' +
               'M18.9 12h2.3M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6"/>',

  /* ---- sekce aplikace ---- */
  sky:         '<path d="M2.8 18a9.2 9.2 0 0 1 18.4 0"/><path d="M1.6 18h20.8"/>' +
               '<circle cx="8.2" cy="11.4" r="1.5" fill="currentColor" stroke="none"/>' +
               '<circle cx="15.2" cy="13.4" r="1.15" fill="currentColor" stroke="none"/>' +
               '<circle cx="12.6" cy="8.4" r=".95" fill="currentColor" stroke="none"/>',
  route:       '<path d="M5.5 20c0-4 5-4.4 5-8s-4-3.6-4-7" stroke-dasharray="2.5 3"/>' +
               '<path d="M10.5 12c0 3.6 7 2.6 7 7.4" stroke-dasharray="2.5 3"/>' +
               '<circle cx="6.5" cy="4.4" r="1.7" fill="currentColor" stroke="none"/>' +
               '<circle cx="10.5" cy="12" r="1.7" fill="currentColor" stroke="none"/>' +
               '<circle cx="17.5" cy="19.6" r="1.7" fill="currentColor" stroke="none"/>',
  journal:     '<rect x="5.5" y="3.5" width="13.5" height="17" rx="2"/>' +
               '<path d="M9 8.2h6.5M9 12h6.5M9 15.8h4"/><path d="M5.5 7h-2M5.5 12h-2M5.5 17h-2"/>',
  chart:       '<path d="M3 20.5h18"/><path d="M6.5 20.5V12M12 20.5V5.5M17.5 20.5v-6"/>',
  shield:      '<path d="M12 3.4l7 2.4v6.1c0 4.3-2.9 7.6-7 8.9-4.1-1.3-7-4.6-7-8.9V5.8z"/>',
  book:        '<path d="M4.5 5.5A2 2 0 0 1 6.5 3.5H19v17H6.5a2 2 0 0 0-2 2z"/><path d="M8.4 3.5v17"/>',
  bulb:        '<path d="M8.8 15.6a5.6 5.6 0 1 1 6.4 0v2.3H8.8z"/><path d="M10 20.8h4"/>',
  trophy:      '<path d="M8 4h8v4.8a4 4 0 0 1-8 0z"/>' +
               '<path d="M8 5.6H5.4v2.2a2.6 2.6 0 0 0 2.6 2.6M16 5.6h2.6v2.2a2.6 2.6 0 0 1-2.6 2.6"/>' +
               '<path d="M12 12.8v3.4M9 20.2h6l-.7-3.4H9.7z"/>',
  medal:       '<circle cx="12" cy="9.8" r="5.4"/>' +
               '<path d="M8.6 14.6L7.4 20.4l4.6-2.3 4.6 2.3-1.2-5.8"/>',
  sliders:     '<path d="M4 7.5h16M4 12h16M4 16.5h16"/>' +
               '<circle cx="9" cy="7.5" r="2.1" fill="var(--sky-1,#0b0e16)"/>' +
               '<circle cx="15" cy="12" r="2.1" fill="var(--sky-1,#0b0e16)"/>' +
               '<circle cx="7.5" cy="16.5" r="2.1" fill="var(--sky-1,#0b0e16)"/>',
  target:      '<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4"/>' +
               '<circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  quiz:        '<circle cx="12" cy="12" r="8.6"/>' +
               '<path d="M9.4 9.4a2.7 2.7 0 1 1 3.9 2.4c-.8.5-1.3 1.1-1.3 2v.4"/>' +
               '<circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>',
  brain:       '<path d="M9.5 5.5A3 3 0 0 0 6.5 8.5 2.5 2.5 0 0 0 5 11a2.6 2.6 0 0 0 1.5 2.3A3 3 0 0 0 9 18.5' +
               'h2.5V5.5z"/><path d="M14.5 5.5a3 3 0 0 1 3 3A2.5 2.5 0 0 1 19 11a2.6 2.6 0 0 1-1.5 2.3' +
               'A3 3 0 0 1 15 18.5h-2.5"/>',
  flag:        '<path d="M6 21V4"/><path d="M6 4.8h11l-2 3.6 2 3.6H6"/>',
  clock:       '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.6 2.1"/>',
  calendar:    '<rect x="4" y="5.5" width="16" height="15" rx="2"/>' +
               '<path d="M4 10.2h16M9 3.5v4M15 3.5v4"/>',
  pin:         '<path d="M12 21s6.4-6.3 6.4-10.5A6.4 6.4 0 0 0 5.6 10.5C5.6 14.7 12 21 12 21z"/>' +
               '<circle cx="12" cy="10.4" r="2.3"/>',
  info:        '<circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5.6"/>' +
               '<circle cx="12" cy="7.9" r="1.05" fill="currentColor" stroke="none"/>',
  warning:     '<path d="M12 4.2l8.4 15H3.6z"/><path d="M12 9.6v4.4"/>' +
               '<circle cx="12" cy="16.6" r="1" fill="currentColor" stroke="none"/>',
  spark:       '<path d="M12 3.5l1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7z"/>',
  ruler:       '<rect x="2.8" y="8.5" width="18.4" height="7" rx="1.5" transform="rotate(-14 12 12)"/>' +
               '<path d="M7.6 9.4l.7 2.6M11.4 8.4l.7 2.6M15.2 7.5l.7 2.6"/>',
  compass:     '<circle cx="12" cy="12" r="8.6"/>' +
               '<path d="M14.9 9.1l-1.9 5.8-5.8 1.9 1.9-5.8z" fill="currentColor" stroke="none"/>',
  camera:      '<rect x="3.2" y="7" width="17.6" height="12.8" rx="2.4"/>' +
               '<circle cx="12" cy="13.4" r="3.5"/><path d="M8.4 7l1.4-2.4h4.4L15.6 7"/>',
  photo:       '<rect x="3.4" y="5" width="17.2" height="14" rx="2"/><circle cx="9" cy="10" r="1.7"/>' +
               '<path d="M4.2 17.2l5-4.2 3.4 2.9 3-2.4 4.6 3.9"/>',
  telescope:   '<path d="M3.2 15.2l10.4-6 2.6 4.6-10.4 6z"/><path d="M16.2 13.6l3.4-2 1.5 2.6-3.4 2z"/>' +
               '<path d="M9 17.6V21M6.6 21h5"/>',
  dome:        '<path d="M4.5 20V13a7.5 7.5 0 0 1 15 0v7"/><path d="M3 20h18"/>' +
               '<path d="M12 5.6V13"/>',

  /* ---- objekty na obloze ---- */
  star:        '<path d="M12 3.6l2.5 5.5 6 .7-4.4 4.1 1.2 5.9-5.3-2.9-5.3 2.9 1.2-5.9L3.5 9.8l6-.7z"/>',
  starFill:    '<path d="M12 3.6l2.5 5.5 6 .7-4.4 4.1 1.2 5.9-5.3-2.9-5.3 2.9 1.2-5.9L3.5 9.8l6-.7z" ' +
               'fill="currentColor"/>',
  doubleStar:  '<circle cx="9.2" cy="12" r="3"/><circle cx="16.4" cy="12" r="1.9"/>',
  nebula:      '<path d="M6.6 14.8A4.4 4.4 0 0 1 9.4 6.6a5 5 0 0 1 8.4 2.2 4.2 4.2 0 0 1-1.8 8' +
               'A5.6 5.6 0 0 1 6.6 14.8z"/>' +
               '<path d="M8.2 15.6c2.6-1.4 5-3.6 7.4-7.4" stroke-dasharray="2 2.4"/>' +
               '<circle cx="11.2" cy="10.4" r="1.4" fill="currentColor" stroke="none"/>' +
               '<circle cx="14.8" cy="14" r="1" fill="currentColor" stroke="none"/>',
  galaxy:      '<path d="M12 12c0-3.6 3.8-6.4 7.4-5.2M12 12c0 3.6-3.8 6.4-7.4 5.2"/>' +
               '<ellipse cx="12" cy="12" rx="6.6" ry="3" transform="rotate(-24 12 12)"/>' +
               '<circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  openCluster: '<circle cx="8" cy="8.6" r="1.1" fill="currentColor" stroke="none"/>' +
               '<circle cx="14.6" cy="7.6" r=".85" fill="currentColor" stroke="none"/>' +
               '<circle cx="11.4" cy="12" r="1.3" fill="currentColor" stroke="none"/>' +
               '<circle cx="16.6" cy="13" r="1" fill="currentColor" stroke="none"/>' +
               '<circle cx="8.4" cy="15.4" r=".9" fill="currentColor" stroke="none"/>' +
               '<circle cx="13.4" cy="16.8" r=".75" fill="currentColor" stroke="none"/>',
  globular:    '<circle cx="12" cy="12" r="7.6" stroke-dasharray="2 3"/>' +
               '<circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>' +
               '<circle cx="9.2" cy="10.2" r=".8" fill="currentColor" stroke="none"/>' +
               '<circle cx="14.6" cy="10.6" r=".8" fill="currentColor" stroke="none"/>' +
               '<circle cx="10" cy="14.4" r=".8" fill="currentColor" stroke="none"/>' +
               '<circle cx="14.2" cy="14.2" r=".7" fill="currentColor" stroke="none"/>',
  planet:      '<circle cx="12" cy="11.4" r="5.2"/>' +
               '<ellipse cx="12" cy="12.6" rx="9.6" ry="3" transform="rotate(-18 12 12.6)"/>',
  moon:        '<circle cx="12" cy="12" r="8.2"/><circle cx="9.4" cy="9.6" r="1.5"/>' +
               '<circle cx="14.6" cy="13.6" r="2.1"/><circle cx="9.8" cy="15.6" r="1"/>',
  sun:         '<circle cx="12" cy="12" r="5.4"/><circle cx="10.4" cy="10.8" r="1.1"/>' +
               '<circle cx="13.8" cy="13.4" r=".8"/>' +
               '<path d="M12 2.6v2.4M12 19v2.4M2.6 12h2.4M19 12h2.4M5.2 5.2l1.7 1.7' +
               'M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/>',
  blackhole:   '<ellipse cx="12" cy="12" rx="9.4" ry="3.6" transform="rotate(-14 12 12)"/>' +
               '<ellipse cx="12" cy="12" rx="6.2" ry="2.2" transform="rotate(-14 12 12)" ' +
               'stroke-dasharray="2 2.6"/>' +
               '<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>',
  supernova:   '<circle cx="12" cy="12" r="2.6"/>' +
               '<path d="M12 2.8v4M12 17.2v4M2.8 12h4M17.2 12h4M5.6 5.6l2.8 2.8' +
               'M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  comet:       '<circle cx="16.4" cy="7.6" r="2.6"/><path d="M13.8 10.2L4 20M12.2 7.6L5.6 12' +
               'M16.6 12.6L13 19.4"/>',
  meteor:      '<path d="M19.4 4.6L9.6 14.4M15.4 4.6l-2.8 2.8M12.4 9.6L9.8 12.2"/>' +
               '<circle cx="7.4" cy="16.6" r="1.5" fill="currentColor" stroke="none"/>',
  satellite:   '<rect x="10" y="10" width="4" height="4" rx=".8"/>' +
               '<rect x="2.4" y="10.6" width="6" height="2.8" rx=".6"/>' +
               '<rect x="15.6" y="10.6" width="6" height="2.8" rx=".6"/>' +
               '<path d="M12 10V5.8M12 14v4.2"/>',
  spectrum:    '<rect x="3.5" y="7" width="17" height="10" rx="1.5"/>' +
               '<path d="M8 7v10M11 7v10M15.5 7v10"/>',
  earth:       '<circle cx="12" cy="12" r="8.4"/>' +
               '<path d="M3.8 10.4c2.4 1.6 4 .4 5.2 1.6s-.4 2.8.8 4 2.4 0 3.2 1.2"/>' +
               '<path d="M20.2 13.2c-2-.8-2.4-2.8-4-3.2s-2.4 1.2-3.6.4.4-2.8 2-3.2"/>',
  rocket:      '<path d="M12 3.2c3 2.5 4.6 5.7 4.6 9.2l-1.6 4.4H9L7.4 12.4C7.4 8.9 9 5.7 12 3.2z"/>' +
               '<circle cx="12" cy="9.6" r="1.6"/>' +
               '<path d="M9 16.8l-2.6 3.8 3.4-1.3M15 16.8l2.6 3.8-3.4-1.3"/>',
  city:        '<path d="M3 20.5h18"/><path d="M5.5 20.5V11h5v9.5M13.5 20.5V6h5v14.5"/>' +
               '<path d="M7 14h1.6M15.4 9.5H17M15.4 13.5H17"/>',
  cloud:       '<path d="M7.4 17.4a4 4 0 0 1 .6-8 5 5 0 0 1 9.2 1.4 3.4 3.4 0 0 1-.6 6.6z"/>',
  layers:      '<path d="M12 3.8l8.4 4.2L12 12.2 3.6 8z"/><path d="M3.6 12.4L12 16.6l8.4-4.2"/>' +
               '<path d="M3.6 16.6L12 20.8l8.4-4.2"/>',
  atom:        '<circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>' +
               '<ellipse cx="12" cy="12" rx="9.4" ry="3.8"/>' +
               '<ellipse cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(60 12 12)"/>' +
               '<ellipse cx="12" cy="12" rx="9.4" ry="3.8" transform="rotate(-60 12 12)"/>',
  drop:        '<path d="M12 3.5c3.4 4.2 5.2 7 5.2 9.6a5.2 5.2 0 0 1-10.4 0c0-2.6 1.8-5.4 5.2-9.6z"/>',
  thermometer: '<path d="M10 14.2V6a2 2 0 0 1 4 0v8.2a4 4 0 1 1-4 0z"/>' +
               '<circle cx="12" cy="17.4" r="1.6" fill="currentColor" stroke="none"/>',
  hourglass:   '<path d="M7 3.5h10M7 20.5h10"/>' +
               '<path d="M7.6 3.5c0 4 4.4 5.6 4.4 8.5s-4.4 4.5-4.4 8.5"/>' +
               '<path d="M16.4 3.5c0 4-4.4 5.6-4.4 8.5s4.4 4.5 4.4 8.5"/>',
  people:      '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/>' +
               '<circle cx="17" cy="9.5" r="2.3"/><path d="M15 14.8c3 0 5.5 2 5.5 5.2"/>',
  phone:       '<rect x="7" y="2.8" width="10" height="18.4" rx="2.2"/><path d="M10.6 18.6h2.8"/>',
  grid:        '<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/>' +
               '<rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/>' +
               '<rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/>' +
               '<rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/>',
  pencil:      '<path d="M4 20l1.2-4.4L16 4.8l3.2 3.2L8.4 18.8z"/><path d="M14.2 6.6l3.2 3.2"/>',
  dot:         '<circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none"/>',
  ring:        '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4"/>'
};

/* Emoji z dat → ikona. Emoji uvnitř vyprávění zůstávají, tady jde jen
   o ta, která v aplikaci zastupovala ikonu.                              */
const EMOJI_ICON = {
  '🔭': 'telescope', '📸': 'camera', '📷': 'camera', '🖼': 'photo', '📱': 'phone',
  '✅': 'check', '❌': 'cross', '👍': 'check', '👎': 'cross', '🔎': 'search',
  '🔍': 'search', '👁': 'eye', '👀': 'eye', '🤯': 'spark', '✨': 'spark',
  '💫': 'spark', '🎉': 'trophy', '🏆': 'trophy', '🏅': 'medal', '🥇': 'medal',
  '🌌': 'galaxy', '🌀': 'galaxy', '🌟': 'star', '⭐': 'star', '🔵': 'star',
  '⚪': 'star', '🟡': 'star', '🟠': 'star', '🟤': 'star', '🪐': 'planet',
  '🌍': 'earth', '🌎': 'earth', '🌏': 'earth', '🛰': 'satellite', '📡': 'satellite',
  '🌑': 'moon', '🌒': 'moon', '🌓': 'moon', '🌗': 'moon', '🌘': 'moon',
  '🌙': 'moon', '🌕': 'moon', '🌚': 'moon', '☀': 'sun', '🌞': 'sun',
  '💥': 'supernova', '⚫': 'blackhole', '🕳': 'blackhole', '☄': 'comet',
  '🌠': 'meteor', '❄': 'spark', '☁': 'cloud', '🌫': 'cloud', '🌬': 'cloud',
  '💨': 'cloud', '🧠': 'brain', '🧩': 'quiz', '❓': 'quiz', '🤔': 'quiz',
  '💡': 'bulb', '📖': 'book', '📚': 'book', '📜': 'book', '📓': 'journal',
  '🗂': 'journal', '✏': 'pencil', '📏': 'ruler', '📐': 'ruler', '🧭': 'compass',
  '🗺': 'route', '📍': 'pin', '🎯': 'target', '🎚': 'sliders', '🎛': 'sliders',
  '⚙': 'sliders', '📊': 'chart', '📉': 'chart', '🔢': 'chart', '💯': 'chart',
  '🛡': 'shield', '🏛': 'dome', '🔬': 'atom', '🧪': 'atom', '⚡': 'spark',
  '🌈': 'spectrum', '💿': 'spectrum', '🔴': 'night', '🌡': 'thermometer',
  '⏱': 'clock', '⏰': 'clock', '⏳': 'hourglass', '📅': 'calendar', '🗓': 'calendar',
  '🔁': 'reset', '🔄': 'reset', '♻': 'reset', '🔗': 'link', '🗑': 'trash',
  '🖨': 'print', '🔒': 'lock', '🔓': 'unlock', '🏙': 'city', '🌆': 'city',
  '🌃': 'city', '🏘': 'city', '🏢': 'city', '🏭': 'city', '🚀': 'rocket',
  '⬛': 'blackhole', '🫧': 'nebula', '🔲': 'grid', '🏠': 'home', '➡': 'arrow',
  '→': 'arrow', '←': 'back', '↩': 'back', '🔜': 'arrow', '👨': 'people',
  '👩': 'people', '👧': 'people', '👦': 'people', '👯': 'doubleStar',
  '💀': 'supernova', '🔔': 'soundOn', '🔕': 'soundOff', '🔊': 'soundOn',
  '⚠': 'warning', '🚫': 'warning', '📥': 'down', '📤': 'up', '💾': 'journal',
  '🥣': 'drop', '💧': 'drop', '🧊': 'drop', '🔆': 'day', '🔦': 'day',
  '🌤': 'day', '🌅': 'day', '🌄': 'day'
};

/* Typ objektu (data/objects.js) → ikona */
const TYPE_ICON = {
  nebula: 'nebula', star: 'star', doubleStar: 'doubleStar', openCluster: 'openCluster',
  globularCluster: 'globular', galaxy: 'galaxy', planet: 'planet', moon: 'moon',
  blackHole: 'blackhole', supernova: 'supernova', station: 'satellite',
  meteorShower: 'meteor', comet: 'comet'
};

/**
 * Vrátí ikonu jako SVG řetězec.
 * @param {string} name   – klíč z ICONS
 * @param {object} [opts] – { size:18, cls:'', stroke:1.5 }
 */
function icon(name, opts) {
  opts = opts || {};
  const inner = ICONS[name] || ICONS.dot;
  const s = opts.size || 18;
  return '<svg class="ico' + (opts.cls ? ' ' + opts.cls : '') + '" width="' + s + '" height="' + s +
         '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
         (opts.stroke || 1.5) + '" stroke-linecap="round" stroke-linejoin="round" ' +
         'aria-hidden="true" focusable="false">' + inner + '</svg>';
}

/** Ikona podle emoji z dat. Když emoji nemá ikonu, vrátí samotné emoji. */
function iconEmoji(e, opts) {
  if (!e) return '';
  const key = String(e).replace(/️/g, '').trim();
  const name = EMOJI_ICON[key] || EMOJI_ICON[key.slice(0, 2)] || EMOJI_ICON[key[0]];
  return name ? icon(name, opts) : key;
}

/** Ikona podle typu objektu na obloze. */
function iconType(type, opts) {
  return icon(TYPE_ICON[type] || 'star', opts);
}

/** Ikona jako samostatný prvek (když potřebuji node, ne řetězec). */
function iconEl(name, opts) {
  const span = document.createElement('span');
  span.className = 'icowrap';
  span.innerHTML = icon(name, opts);
  return span;
}
