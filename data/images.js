/* =============================================================================
   REGISTER OBRÁZKOV  (data/images.js)
   -----------------------------------------------------------------------------
   Každý obrázok má na jednom mieste: cestu, popis, autora (credit), licenciu
   a odkaz na originálny zdroj. Aplikácia obrázok načítava v tomto poradí:

      1) local   – lokálny súbor v priečinku images/  (ak je zapnuté preferLocal)
      2) remote  – oficiálny odkaz na NASA / ESA/Hubble / ESO
      3) art     – vlastná SVG ilustrácia priamo v kóde (vždy funguje, aj offline)

   AKO PRIDAŤ VLASTNÚ FOTKU Z DWARFU ALEBO STIAHNUTÚ FOTKU:
      - ulož súbor do priečinka images/  (napr. images/m42.jpg)
      - nižšie prepni IMAGE_CONFIG.preferLocal na true
      - v konkrétnej položke skontroluj cestu v "local"
   ========================================================================== */

const IMAGE_CONFIG = {
  // false = ťahá oficiálne obrázky z internetu (NASA/ESA/ESO)
  // true  = najprv skúsi lokálne súbory v images/, potom internet, potom ilustráciu
  preferLocal: false
};

const IMAGES = {
  /* --------------------------- HMLOVINY ---------------------------------- */
  carina: {
    local: 'images/carina.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0905a.jpg',
    art: 'emission',
    title: 'Hmlovina v Kýle (Carina)',
    alt: 'Obrovský žiariaci oblak plynu a prachu s tmavými pásmi prachu.',
    credit: 'ESO / T. Preibisch',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0905a/'
  },

  m42: {
    local: 'images/m42.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0601a.jpg',
    art: 'emission',
    title: 'M42 – Hmlovina v Orióne',
    alt: 'Ružovo-oranžový žiariaci oblak s mladými hviezdami v strede.',
    credit: 'NASA, ESA, M. Robberto (STScI/ESA) a tím projektu HST Orion Treasury',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0601a/'
  },

  m78: {
    local: 'images/m78.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso1105b.jpg',
    art: 'reflection',
    title: 'M78 – reflexná hmlovina v Orióne',
    alt: 'Modrasté oblaky prachu, ktoré odrážajú svetlo blízkych hviezd.',
    credit: 'ESO / Igor Chekalin',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso1105b/'
  },

  horsehead: {
    local: 'images/horsehead.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0202a.jpg',
    art: 'dark',
    title: 'Konská hlava (Barnard 33) – temná hmlovina',
    alt: 'Tmavý oblak v tvare konskej hlavy pred žiariacim pozadím.',
    credit: 'ESO',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0202a/'
  },

  ring: {
    local: 'images/ring.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1310a.jpg',
    art: 'planetary',
    title: 'M57 – Prstencová hmlovina (planetárna)',
    alt: 'Farebný prstenec plynu s bielym bodom hviezdy v strede.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1310a/'
  },

  /* ------------------- INÉ TYPY OBJEKTOV (na porovnanie) ---------------- */
  m51: {
    local: 'images/m51.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0506a.jpg',
    art: 'galaxy',
    title: 'M51 – galaxia Vír',
    alt: 'Špirálová galaxia s ramenami a menšou galaxiou pri sebe.',
    credit: 'NASA, ESA, S. Beckwith (STScI) a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0506a/'
  },

  omegacen: {
    local: 'images/omegacen.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0809a.jpg',
    art: 'cluster',
    title: 'Omega Centauri – guľová hviezdokopa',
    alt: 'Guľa nabitá stovkami tisíc hviezd.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0809a/'
  },

  saturn: {
    local: 'images/saturn.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1917a.jpg',
    art: 'planet',
    title: 'Saturn – planéta',
    alt: 'Planéta Saturn s výraznými prstencami.',
    credit: 'NASA, ESA, A. Simon (GSFC), M.H. Wong (UC Berkeley) a tím OPAL',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1917a/'
  },

  /* ------------------- HVIEZDY, ROTÁCIA OBLOHY, EQ ---------------------- */
  polaris: {
    local: 'images/polaris.jpg',
    remote: '',                       // doplň, ak nájdeš fotku s vhodnou licenciou
    art: 'polaris',
    title: 'Polárka a kruhy okolo nebeského pólu',
    alt: 'Hviezda blízko stredu, okolo ktorej sa točia ostatné hviezdy.',
    credit: '',
    license: '',
    source: ''
  },

  startrails: {
    local: 'images/startrails.jpg',
    remote: '',
    art: 'trails',
    title: 'Hviezdy sa počas dlhej expozície roztočili do oblúčikov',
    alt: 'Hviezdy nakreslené ako oblúčiky namiesto bodov.',
    credit: '',
    license: '',
    source: ''
  },

  roundstars: {
    local: 'images/roundstars.jpg',
    remote: '',
    art: 'roundstars',
    title: 'Ostré, okrúhle hviezdy – dobre nastavené sledovanie',
    alt: 'Hviezdy nakreslené ako ostré body.',
    credit: '',
    license: '',
    source: ''
  },

  /* ---------------------- HVIEZDOKOPY ----------------------------------- */
  m45: {
    local: 'images/m45.jpg',
    remote: 'https://cdn.eso.org/images/screen/b11.jpg',
    art: 'cluster',
    title: 'M45 – Plejády (otvorená hviezdokopa)',
    alt: 'Skupina jasných modrých hviezd zahalených v modrastom prachu.',
    credit: 'ESO',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/b11/'
  },

  m13: {
    local: 'images/m13.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/potw1011a.jpg',
    art: 'cluster',
    title: 'M13 – guľová hviezdokopa v Herkulovi',
    alt: 'Obrovská guľa nabitá stovkami tisíc hviezd.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/potw1011a/'
  },

  /* ---------------------- GALAXIE --------------------------------------- */
  milkyway: {
    local: 'images/milkyway.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0932a.jpg',
    art: 'milkyway',
    title: 'Mliečna cesta – panoráma celej oblohy',
    alt: 'Svetlý pás hviezd a tmavých prachových oblakov cez celú oblohu.',
    credit: 'ESO / S. Brunier',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0932a/'
  },

  m31: {
    local: 'images/m31.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1502a.jpg',
    art: 'galaxy',
    title: 'M31 – galaxia v Andromede',
    alt: 'Veľká špirálová galaxia s miliardami hviezd.',
    credit: 'NASA, ESA, J. Dalcanton, B. F. Williams, L. C. Johnson (Univ. of Washington), tím PHAT a R. Gendler',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1502a/'
  },

  /* ---------------------- PLANÉTY A MESIAC ------------------------------ */
  jupiter: {
    local: 'images/jupiter.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic2113b.jpg',
    art: 'planet',
    title: 'Jupiter (Hubble, 2021)',
    alt: 'Planéta Jupiter s pásmi oblakov a Veľkou červenou škvrnou.',
    credit: 'NASA, ESA, A. Simon (GSFC), M.H. Wong (UC Berkeley) a tím OPAL',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic2113b/'
  },

  moon: {
    local: 'images/moon.jpg',
    remote: '',
    art: 'moon',
    title: 'Mesiac a jeho krátery',
    alt: 'Sivý disk Mesiaca pokrytý krátermi.',
    credit: '', license: '', source: ''
  },

  /* ---------------------- HVIEZDY --------------------------------------- */
  albireo: {
    local: 'images/albireo.jpg',
    remote: '',
    art: 'doublestar',
    title: 'Dvojhviezda – jedna modrá, jedna žltá',
    alt: 'Dve hviezdy blízko seba, jedna modrá a jedna žltooranžová.',
    credit: '', license: '', source: ''
  },
  starBlue:   { local: '', remote: '', art: 'star-blue',   title: 'Horúca modrá hviezda',    alt: 'Modro svietiaca hviezda.',      credit: '', license: '', source: '' },
  starYellow: { local: '', remote: '', art: 'star-yellow', title: 'Žltá hviezda ako Slnko',  alt: 'Žlto svietiaca hviezda.',       credit: '', license: '', source: '' },
  starRed:    { local: '', remote: '', art: 'star-red',    title: 'Chladná červená hviezda', alt: 'Červeno svietiaca hviezda.',    credit: '', license: '', source: '' },

  /* ---------------------- SUPERNOVY, ČIERNE DIERY ----------------------- */
  m1: {
    local: 'images/m1.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0515a.jpg',
    art: 'supernova',
    title: 'M1 – Krabia hmlovina (pozostatok supernovy)',
    alt: 'Farebná trhaná hmlovina s vláknami plynu.',
    credit: 'NASA, ESA a J. Hester (ASU)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0515a/'
  },

  neutron: {
    local: '', remote: '', art: 'neutron',
    title: 'Neutrónová hviezda – pulzar',
    alt: 'Malý veľmi jasný bod s dvomi lúčmi.',
    credit: '', license: '', source: ''
  },

  sgra: {
    local: 'images/sgra.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso2208-eht-mwa.jpg',
    art: 'blackhole',
    title: 'Sagittarius A* – prvá fotografia čiernej diery v našej galaxii',
    alt: 'Oranžový prstenec svetla okolo tmavého stredu.',
    credit: 'EHT Collaboration',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso2208-eht-mwa/'
  },

  /* ---------- OBJEKTY A JAVY PRE LEKCIE 10 – 22 (vlastné ilustrácie) ---- */
  /* Tieto majú prázdne "remote" – zobrazí sa vlastná SVG ilustrácia.
     Keď nájdeš fotku s vhodnou licenciou, doplň remote + credit + source. */

  m44:       { local: 'images/m44.jpg',      remote: '', art: 'cluster',
               title: 'M44 – Jasličky (otvorená hviezdokopa)',
               alt: 'Voľne rozsypaná skupina jasných hviezd.', credit: '', license: '', source: '' },
  m27:       { local: 'images/m27.jpg',      remote: '', art: 'planetary',
               title: 'M27 – hmlovina Činka (planetárna)',
               alt: 'Oblak plynu odhodený umierajúcou hviezdou.', credit: '', license: '', source: '' },
  sun:       { local: 'images/sun.jpg',      remote: '', art: 'sun',
               title: 'Slnko so slnečnými škvrnami',
               alt: 'Žltý disk Slnka s niekoľkými tmavými škvrnami.', credit: '', license: '', source: '' },
  moonphase: { local: 'images/moonphase.jpg', remote: '', art: 'moonphase',
               title: 'Mesiac v poslednej štvrti',
               alt: 'Mesiac osvetlený len z jednej strany.', credit: '', license: '', source: '' },
  spectrum:  { local: '',                    remote: '', art: 'spectrum',
               title: 'Spektrum – svetlo rozložené na farby s čiarami prvkov',
               alt: 'Farebný pruh od modrej po červenú s tmavými čiarami.', credit: '', license: '', source: '' },
  iss:       { local: 'images/iss.jpg',      remote: '', art: 'satellite',
               title: 'Prelet vesmírnej stanice nad oblohou',
               alt: 'Rovná svetelná čiara medzi hviezdami.', credit: '', license: '', source: '' },
  transit:   { local: '',                    remote: '', art: 'transit',
               title: 'Tranzit – planéta prechádza pred svojou hviezdou',
               alt: 'Hviezda s malou tmavou tečkou na disku.', credit: '', license: '', source: '' },
  comet:     { local: 'images/comet.jpg',    remote: '', art: 'comet',
               title: 'Kométa s dvomi chvostmi',
               alt: 'Svetlá hlava kométy s dvomi chvostmi.', credit: '', license: '', source: '' },
  meteors:   { local: 'images/meteors.jpg',  remote: '', art: 'meteors',
               title: 'Meteorický roj – meteory vyletujú z jedného miesta',
               alt: 'Niekoľko svetelných čiar rozbiehajúcich sa z jedného bodu.', credit: '', license: '', source: '' },
  citysky:   { local: '',                    remote: '', art: 'citysky',
               title: 'Obloha nad mestom',
               alt: 'Oranžová žiara pri obzore a len pár hviezd.', credit: '', license: '', source: '' },
  dome:      { local: '',                    remote: '', art: 'dome',
               title: 'Hvezdárenská kupola pod hviezdami',
               alt: 'Silueta okrúhlej kupoly so štrbinou pod hviezdnou oblohou.', credit: '', license: '', source: '' },
  deepfield: { local: '',                    remote: '', art: 'deepfield',
               title: 'Hlboký pohľad – takmer každá škvrna je celá galaxia',
               alt: 'Množstvo malých galaxií rôznych tvarov na čiernom pozadí.', credit: '', license: '', source: '' },

  /* ---------- POROVNÁVACIE DVOJICE PRE SLOVNÍČEK (ilustrácie) ---------- */
  faintNebula: { local: '', remote: '', art: 'faintnebula',
                 title: 'Krátka expozícia – tmavá fotka',
                 alt: 'Takmer čierna fotka, hmlovina je len tušená.', credit: '', license: '', source: '' },
  noisyNebula: { local: '', remote: '', art: 'noisynebula',
                 title: 'Vysoký gain – jasné, ale zašumené',
                 alt: 'Jasná hmlovina, ale celá fotka „sneží“.', credit: '', license: '', source: '' },
  cleanNebula: { local: '', remote: '', art: 'cleannebula',
                 title: 'Veľa snímok – jasné a čisté',
                 alt: 'Jasná hmlovina s hladkým pozadím.', credit: '', license: '', source: '' },
  blurStars:   { local: '', remote: '', art: 'blurstars',
                 title: 'Rozostrené hviezdy',
                 alt: 'Hviezdy ako rozmazané guľičky namiesto bodov.', credit: '', license: '', source: '' },
  faintStar:   { local: '', remote: '', art: 'faintstar',
                 title: 'Slabá hviezda (vysoká magnitúda)',
                 alt: 'Veľmi slabý svetelný bod.', credit: '', license: '', source: '' },

  /* ------------------ POROVNANIE OKO vs. FOTOAPARÁT --------------------- */
  horseheadIr: {
    local: 'images/horsehead-ir.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1307a.jpg',
    art: 'dark',
    title: 'Konská hlava očami infračervenej kamery',
    alt: 'Tá istá hmlovina, ale v infračervenom svetle vyzerá úplne inak.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1307a/'
  }
};
