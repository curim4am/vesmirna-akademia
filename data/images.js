/* =============================================================================
   REGISTR OBRÁZKŮ  (data/images.js)
   -----------------------------------------------------------------------------
   Každý obrázek má na jednom místě: cestu, popis, autora (credit), licenci
   a odkaz na originální zdroj. Aplikace obrázek načítá v tomto pořadí:

      1) local   – lokální soubor ve složce images/  (když je zapnuté preferLocal)
      2) remote  – oficiální odkaz na NASA / ESA/Hubble / ESO
      3) art     – vlastní SVG ilustrace přímo v kódu (vždy funguje, i offline)

   JAK PŘIDAT VLASTNÍ FOTKU Z DWARFU NEBO STAŽENOU FOTKU:
      - ulož soubor do složky images/  (např. images/m42.jpg)
      - níže přepni IMAGE_CONFIG.preferLocal na true
      - u konkrétní položky zkontroluj cestu v "local"
   ========================================================================== */

const IMAGE_CONFIG = {
  // false = tahá oficiální obrázky z internetu (NASA/ESA/ESO)
  // true  = nejprve zkusí lokální soubory v images/, potom internet, potom ilustraci
  preferLocal: false
};

const IMAGES = {
  /* --------------------------- HMLOVINY ---------------------------------- */
  carina: {
    local: 'images/carina.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0905a.jpg',
    art: 'emission',
    title: 'Mlhovina v Kýlu (Carina)',
    alt: 'Obrovský svítící oblak plynu a prachu s tmavými pásy prachu.',
    credit: 'ESO / T. Preibisch',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0905a/'
  },

  m42: {
    local: 'images/m42.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0601a.jpg',
    art: 'emission',
    title: 'M42 – Mlhovina v Orionu',
    alt: 'Růžovo-oranžový svítící oblak s mladými hvězdami ve středu.',
    credit: 'NASA, ESA, M. Robberto (STScI/ESA) a tím projektu HST Orion Treasury',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0601a/'
  },

  m78: {
    local: 'images/m78.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso1105b.jpg',
    art: 'reflection',
    title: 'M78 – reflexní mlhovina v Orionu',
    alt: 'Modravé oblaky prachu, které odrážejí světlo blízkých hvězd.',
    credit: 'ESO / Igor Chekalin',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso1105b/'
  },

  horsehead: {
    local: 'images/horsehead.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0202a.jpg',
    art: 'dark',
    title: 'Koňská hlava (Barnard 33) – temná mlhovina',
    alt: 'Tmavý oblak ve tvaru koňské hlavy před svítícím pozadím.',
    credit: 'ESO',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0202a/'
  },

  ring: {
    local: 'images/ring.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1310a.jpg',
    art: 'planetary',
    title: 'M57 – Prstencová mlhovina (planetární)',
    alt: 'Barevný prstenec plynu s bílým bodem hvězdy ve středu.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1310a/'
  },

  /* -------------------- JINÉ TYPY OBJEKTŮ (na porovnání) ---------------- */
  m51: {
    local: 'images/m51.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0506a.jpg',
    art: 'galaxy',
    title: 'M51 – galaxie Vír',
    alt: 'Spirální galaxie s rameny a menší galaxií u sebe.',
    credit: 'NASA, ESA, S. Beckwith (STScI) a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0506a/'
  },

  omegacen: {
    local: 'images/omegacen.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0809a.jpg',
    art: 'cluster',
    title: 'Omega Centauri – kulová hvězdokupa',
    alt: 'Kule nabitá stovkami tisíc hvězd.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0809a/'
  },

  saturn: {
    local: 'images/saturn.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1917a.jpg',
    art: 'planet',
    title: 'Saturn – planeta',
    alt: 'Planeta Saturn s výraznými prstenci.',
    credit: 'NASA, ESA, A. Simon (GSFC), M.H. Wong (UC Berkeley) a tím OPAL',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1917a/'
  },

  /* ------------------- HVĚZDY, ROTACE OBLOHY, EQ ------------------------ */
  polaris: {
    local: 'images/polaris.jpg',
    remote: '',                       // doplň, když najdeš fotku s vhodnou licencí
    art: 'polaris',
    title: 'Polárka a kruhy okolo nebeského pólu',
    alt: 'Hvězda blízko středu, okolo které se točí ostatní hvězdy.',
    credit: '',
    license: '',
    source: ''
  },

  startrails: {
    local: 'images/startrails.jpg',
    remote: '',
    art: 'trails',
    title: 'Hvězdy se během dlouhé expozice roztočily do obloučků',
    alt: 'Hvězdy nakreslené jako oblouky místo bodů.',
    credit: '',
    license: '',
    source: ''
  },

  roundstars: {
    local: 'images/roundstars.jpg',
    remote: '',
    art: 'roundstars',
    title: 'Ostré, kulaté hvězdy – dobře nastavené sledování',
    alt: 'Hvězdy nakreslené jako ostré body.',
    credit: '',
    license: '',
    source: ''
  },

  /* ---------------------- HVIEZDOKOPY ----------------------------------- */
  m45: {
    local: 'images/m45.jpg',
    remote: 'https://cdn.eso.org/images/screen/b11.jpg',
    art: 'cluster',
    title: 'M45 – Plejády (otevřená hvězdokupa)',
    alt: 'Skupina jasných modrých hvězd zahalených v modravém prachu.',
    credit: 'ESO',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/b11/'
  },

  m13: {
    local: 'images/m13.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/potw1011a.jpg',
    art: 'cluster',
    title: 'M13 – kulová hvězdokupa v Herkulovi',
    alt: 'Obrovská kule nabitá stovkami tisíc hvězd.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/potw1011a/'
  },

  /* ---------------------- GALAXIE --------------------------------------- */
  milkyway: {
    local: 'images/milkyway.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso0932a.jpg',
    art: 'milkyway',
    title: 'Mléčná dráha – panoráma celé oblohy',
    alt: 'Světlý pás hvězd a tmavých prachových oblaků přes celou oblohu.',
    credit: 'ESO / S. Brunier',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso0932a/'
  },

  m31: {
    local: 'images/m31.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1502a.jpg',
    art: 'galaxy',
    title: 'M31 – galaxie v Andromedě',
    alt: 'Velká spirální galaxie s miliardami hvězd.',
    credit: 'NASA, ESA, J. Dalcanton, B. F. Williams, L. C. Johnson (Univ. of Washington), tím PHAT a R. Gendler',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1502a/'
  },

  /* ---------------------- PLANETY A MĚSÍC ------------------------------- */
  jupiter: {
    local: 'images/jupiter.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic2113b.jpg',
    art: 'planet',
    title: 'Jupiter (Hubble, 2021)',
    alt: 'Planeta Jupiter s pásy oblaků a Velkou červenou skvrnou.',
    credit: 'NASA, ESA, A. Simon (GSFC), M.H. Wong (UC Berkeley) a tím OPAL',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic2113b/'
  },

  moon: {
    local: 'images/moon.jpg',
    remote: '',
    art: 'moon',
    title: 'Měsíc a jeho krátery',
    alt: 'Šedý disk Měsíce pokrytý krátery.',
    credit: '', license: '', source: ''
  },

  /* ---------------------- HVIEZDY --------------------------------------- */
  albireo: {
    local: 'images/albireo.jpg',
    remote: '',
    art: 'doublestar',
    title: 'Dvojhvězda – jedna modrá, jedna žlutá',
    alt: 'Dvě hvězdy blízko sebe, jedna modrá a jedna žlutooranžová.',
    credit: '', license: '', source: ''
  },
  starBlue:   { local: '', remote: '', art: 'star-blue',   title: 'Horká modrá hvězda',    alt: 'Modře svítící hvězda.',      credit: '', license: '', source: '' },
  starYellow: { local: '', remote: '', art: 'star-yellow', title: 'Žlutá hvězda jako Slunce',  alt: 'Žlutě svítící hvězda.',       credit: '', license: '', source: '' },
  starRed:    { local: '', remote: '', art: 'star-red',    title: 'Chladná červená hvězda', alt: 'Červeně svítící hvězda.',    credit: '', license: '', source: '' },

  /* ---------------------- SUPERNOVY, ČERNÉ DÍRY ------------------------- */
  m1: {
    local: 'images/m1.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic0515a.jpg',
    art: 'supernova',
    title: 'M1 – Krabí mlhovina (pozůstatek supernovy)',
    alt: 'Barevná roztrhaná mlhovina s vlákny plynu.',
    credit: 'NASA, ESA a J. Hester (ASU)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic0515a/'
  },

  neutron: {
    local: '', remote: '', art: 'neutron',
    title: 'Neutronová hvězda – pulzar',
    alt: 'Malý velmi jasný bod se dvěma paprsky.',
    credit: '', license: '', source: ''
  },

  sgra: {
    local: 'images/sgra.jpg',
    remote: 'https://cdn.eso.org/images/screen/eso2208-eht-mwa.jpg',
    art: 'blackhole',
    title: 'Sagittarius A* – první fotografie černé díry v naší galaxii',
    alt: 'Oranžový prstenec světla okolo tmavého středu.',
    credit: 'EHT Collaboration',
    license: 'CC BY 4.0',
    source: 'https://www.eso.org/public/images/eso2208-eht-mwa/'
  },

  /* ------------ OBJEKTY A JEVY PRO LEKCE 10 – 22 (vlastní ilustrace) ---- */
  /* Tyto mají prázdné "remote" – zobrazí se vlastní SVG ilustrace.
     Když najdeš fotku s vhodnou licencí, doplň remote + credit + source. */

  m44:       { local: 'images/m44.jpg',      remote: '', art: 'cluster',
               title: 'M44 – Jesličky (otevřená hvězdokupa)',
               alt: 'Volně rozsypaná skupina jasných hvězd.', credit: '', license: '', source: '' },
  m27:       { local: 'images/m27.jpg',      remote: '', art: 'planetary',
               title: 'M27 – mlhovina Činka (planetární)',
               alt: 'Oblak plynu odhozený umírající hvězdou.', credit: '', license: '', source: '' },
  sun:       { local: 'images/sun.jpg',      remote: '', art: 'sun',
               title: 'Slunce se slunečními skvrnami',
               alt: 'Žlutý disk Slunce s několika tmavými skvrnami.', credit: '', license: '', source: '' },
  moonphase: { local: 'images/moonphase.jpg', remote: '', art: 'moonphase',
               title: 'Měsíc v poslední čtvrti',
               alt: 'Měsíc osvětlený jen z jedné strany.', credit: '', license: '', source: '' },
  spectrum:  { local: '',                    remote: '', art: 'spectrum',
               title: 'Spektrum – světlo rozložené na barvy s čárami prvků',
               alt: 'Barevný pruh od modré po červenou s tmavými čárami.', credit: '', license: '', source: '' },
  iss:       { local: 'images/iss.jpg',      remote: '', art: 'satellite',
               title: 'Přelet vesmírné stanice nad oblohou',
               alt: 'Rovná světelná čára mezi hvězdami.', credit: '', license: '', source: '' },
  transit:   { local: '',                    remote: '', art: 'transit',
               title: 'Tranzit – planeta přechází před svou hvězdou',
               alt: 'Hvězda s malou tmavou tečkou na disku.', credit: '', license: '', source: '' },
  comet:     { local: 'images/comet.jpg',    remote: '', art: 'comet',
               title: 'Kometa se dvěma ohony',
               alt: 'Světlá hlava komety se dvěma ohony.', credit: '', license: '', source: '' },
  meteors:   { local: 'images/meteors.jpg',  remote: '', art: 'meteors',
               title: 'Meteorický roj – meteory vylétají z jednoho místa',
               alt: 'Několik světelných čar rozbíhajících se z jednoho bodu.', credit: '', license: '', source: '' },
  citysky:   { local: '',                    remote: '', art: 'citysky',
               title: 'Obloha nad městem',
               alt: 'Oranžová záře u obzoru a jen pár hvězd.', credit: '', license: '', source: '' },
  dome:      { local: '',                    remote: '', art: 'dome',
               title: 'Hvězdářská kopule pod hvězdami',
               alt: 'Silueta kulaté kopule se štěrbinou pod hvězdnou oblohou.', credit: '', license: '', source: '' },
  deepfield: { local: '',                    remote: '', art: 'deepfield',
               title: 'Hluboký pohled – téměř každá skvrna je celá galaxie',
               alt: 'Množství malých galaxií různých tvarů na černém pozadí.', credit: '', license: '', source: '' },

  /* ---------- POROVNÁVACÍ DVOJICE PRO SLOVNÍČEK (ilustrace) ------------ */
  faintNebula: { local: '', remote: '', art: 'faintnebula',
                 title: 'Krátká expozice – tmavá fotka',
                 alt: 'Téměř černá fotka, mlhovina je jen tušená.', credit: '', license: '', source: '' },
  noisyNebula: { local: '', remote: '', art: 'noisynebula',
                 title: 'Vysoký gain – jasné, ale zašuměné',
                 alt: 'Jasná mlhovina, ale celá fotka „sněží“.', credit: '', license: '', source: '' },
  cleanNebula: { local: '', remote: '', art: 'cleannebula',
                 title: 'Mnoho snímků – jasné a čisté',
                 alt: 'Jasná mlhovina s hladkým pozadím.', credit: '', license: '', source: '' },
  blurStars:   { local: '', remote: '', art: 'blurstars',
                 title: 'Rozostřené hvězdy',
                 alt: 'Hvězdy jako rozmazané kuličky místo bodů.', credit: '', license: '', source: '' },
  faintStar:   { local: '', remote: '', art: 'faintstar',
                 title: 'Slabá hvězda (vysoká magnituda)',
                 alt: 'Velmi slabý světelný bod.', credit: '', license: '', source: '' },

  /* ------------------ POROVNÁNÍ OKO vs. FOTOAPARÁT ---------------------- */
  horseheadIr: {
    local: 'images/horsehead-ir.jpg',
    remote: 'https://cdn.esahubble.org/archives/images/screen/heic1307a.jpg',
    art: 'dark',
    title: 'Koňská hlava očima infračervené kamery',
    alt: 'Tatáž mlhovina, ale v infračerveném světle vypadá úplně jinak.',
    credit: 'NASA, ESA a Hubble Heritage (STScI/AURA)',
    license: 'Public domain / CC BY 4.0',
    source: 'https://esahubble.org/images/heic1307a/'
  }
};
