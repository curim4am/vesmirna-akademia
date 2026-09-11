/* =============================================================================
   OBLOHA – DATA  (data/sky.js)
   -----------------------------------------------------------------------------
   Hvězdy pro mapu oblohy a obrazce (asterismy), které se dítě může naučit
   poznat. Souřadnice jsou J2000 z katalogových údajů (Hipparcos/Gaia) podle
   infoboxů na anglické Wikipedii – u každé hvězdy je odkaz na zdroj.

     ra   – rektascenze v hodinách (0–24)
     dec  – deklinace ve stupních (jižní = minus)
     mag  – vizuální magnituda (menší číslo = jasnější hvězda)

   POZOROVACÍ MÍSTO: Praha 3, 50,09° severní šířky (SKY_PLACE).
   Mapa kreslí severní polokouli oblohy až po deklinaci -35°; co je pod tím,
   z Prahy nikdy nevyjde dost vysoko.

   PŘIDAT HVĚZDU: dopiš položku do SKY_STARS (vždy se zdrojem!) a případně
   ji použij v SKY_ASTERISMS.
   ========================================================================== */

const SKY_PLACE = {
  name: 'Praha 3',
  lat: 50.09,          // severní šířka
  lon: 14.45,          // východní délka
  decMin: -35          // jak nízko mapa kreslí
};

const SKY_STARS = [
  { id: 'arcturus', name: 'Arcturus', bayer: 'α Boo', ra: 14.2610, dec: 19.1822, mag: -0.05, con: 'Boo',
    source: 'https://en.wikipedia.org/wiki/Arcturus' },
  { id: 'vega', name: 'Vega', bayer: 'α Lyr', ra: 18.6156, dec: 38.7837, mag: 0.03, con: 'Lyr',
    source: 'https://en.wikipedia.org/wiki/Vega' },
  { id: 'capella', name: 'Capella', bayer: 'α Aur', ra: 5.2782, dec: 45.9980, mag: 0.08, con: 'Aur',
    source: 'https://en.wikipedia.org/wiki/Capella' },
  { id: 'rigel', name: 'Rigel', bayer: 'β Ori', ra: 5.2423, dec: -8.2016, mag: 0.13, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Rigel' },
  { id: 'procyon', name: 'Procyon', bayer: 'α CMi', ra: 7.6550, dec: 5.2250, mag: 0.34, con: 'CMi',
    source: 'https://en.wikipedia.org/wiki/Procyon' },
  { id: 'betelgeuse', name: 'Betelgeuse', bayer: 'α Ori', ra: 5.9195, dec: 7.4071, mag: 0.5, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Betelgeuse' },
  { id: 'altair', name: 'Altair', bayer: 'α Aql', ra: 19.8464, dec: 8.8683, mag: 0.76, con: 'Aql',
    source: 'https://en.wikipedia.org/wiki/Altair' },
  { id: 'aldebaran', name: 'Aldebaran', bayer: 'α Tau', ra: 4.5987, dec: 16.5093, mag: 0.87, con: 'Tau',
    source: 'https://en.wikipedia.org/wiki/Aldebaran' },
  { id: 'antares', name: 'Antares', bayer: 'α Sco', ra: 16.4901, dec: -26.4320, mag: 0.96, con: 'Sco',
    source: 'https://en.wikipedia.org/wiki/Antares' },
  { id: 'spica', name: 'Spica', bayer: 'α Vir', ra: 13.4199, dec: -11.1613, mag: 0.97, con: 'Vir',
    source: 'https://en.wikipedia.org/wiki/Spica' },
  { id: 'pollux', name: 'Pollux', bayer: 'β Gem', ra: 7.7553, dec: 28.0262, mag: 1.14, con: 'Gem',
    source: 'https://en.wikipedia.org/wiki/Pollux_(star)' },
  { id: 'deneb', name: 'Deneb', bayer: 'α Cyg', ra: 20.6905, dec: 45.2803, mag: 1.25, con: 'Cyg',
    source: 'https://en.wikipedia.org/wiki/Deneb' },
  { id: 'regulus', name: 'Regulus', bayer: 'α Leo', ra: 10.1395, dec: 11.9672, mag: 1.4, con: 'Leo',
    source: 'https://en.wikipedia.org/wiki/Regulus' },
  { id: 'bellatrix', name: 'Bellatrix', bayer: 'γ Ori', ra: 5.4189, dec: 6.3497, mag: 1.64, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Bellatrix' },
  { id: 'elnath', name: 'Elnath', bayer: 'β Tau', ra: 5.4382, dec: 28.6075, mag: 1.65, con: 'Tau',
    source: 'https://en.wikipedia.org/wiki/Beta_Tauri' },
  { id: 'alnilam', name: 'Alnilam', bayer: 'ε Ori', ra: 5.6036, dec: -1.2019, mag: 1.69, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Alnilam' },
  { id: 'alioth', name: 'Alioth', bayer: 'ε UMa', ra: 12.9005, dec: 55.9598, mag: 1.77, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Alioth' },
  { id: 'alnitak', name: 'Alnitak', bayer: 'ζ Ori', ra: 5.6793, dec: -1.9429, mag: 1.77, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Alnitak' },
  { id: 'dubhe', name: 'Dubhe', bayer: 'α UMa', ra: 11.0621, dec: 61.7510, mag: 1.79, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Dubhe' },
  { id: 'mirfak', name: 'Mirfak', bayer: 'α Per', ra: 3.4054, dec: 49.8612, mag: 1.82, con: 'Per',
    source: 'https://en.wikipedia.org/wiki/Alpha_Persei' },
  { id: 'kausaustralis', name: 'Kaus Australis', bayer: 'ε Sgr', ra: 18.4029, dec: -34.3846, mag: 1.85, con: 'Sgr',
    source: 'https://en.wikipedia.org/wiki/Epsilon_Sagittarii' },
  { id: 'alkaid', name: 'Alkaid', bayer: 'η UMa', ra: 13.7923, dec: 49.3133, mag: 1.86, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Alkaid' },
  { id: 'castor', name: 'Castor', bayer: 'α Gem', ra: 7.5766, dec: 31.8883, mag: 1.93, con: 'Gem',
    source: 'https://en.wikipedia.org/wiki/Castor_(star)' },
  { id: 'polaris', name: 'Polaris', bayer: 'α UMi', ra: 2.5303, dec: 89.2641, mag: 1.98, con: 'UMi',
    source: 'https://en.wikipedia.org/wiki/Polaris' },
  { id: 'mizar', name: 'Mizar', bayer: 'ζ UMa', ra: 13.3988, dec: 54.9254, mag: 2.04, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Mizar' },
  { id: 'nunki', name: 'Nunki', bayer: 'σ Sgr', ra: 18.9211, dec: -26.2967, mag: 2.05, con: 'Sgr',
    source: 'https://en.wikipedia.org/wiki/Sigma_Sagittarii' },
  { id: 'alpheratz', name: 'Alpheratz', bayer: 'α And', ra: 0.1398, dec: 29.0904, mag: 2.06, con: 'And',
    source: 'https://en.wikipedia.org/wiki/Alpheratz' },
  { id: 'mirach', name: 'Mirach', bayer: 'β And', ra: 1.1622, dec: 35.6206, mag: 2.07, con: 'And',
    source: 'https://en.wikipedia.org/wiki/Beta_Andromedae' },
  { id: 'kochab', name: 'Kochab', bayer: 'β UMi', ra: 14.8451, dec: 74.1555, mag: 2.08, con: 'UMi',
    source: 'https://en.wikipedia.org/wiki/Kochab' },
  { id: 'saiph', name: 'Saiph', bayer: 'κ Ori', ra: 5.7959, dec: -9.6696, mag: 2.09, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Saiph' },
  { id: 'algol', name: 'Algol', bayer: 'β Per', ra: 3.1361, dec: 40.9556, mag: 2.12, con: 'Per',
    source: 'https://en.wikipedia.org/wiki/Algol' },
  { id: 'denebola', name: 'Denebola', bayer: 'β Leo', ra: 11.8177, dec: 14.5721, mag: 2.14, con: 'Leo',
    source: 'https://en.wikipedia.org/wiki/Denebola' },
  { id: 'mintaka', name: 'Mintaka', bayer: 'δ Ori', ra: 5.5334, dec: -0.2991, mag: 2.23, con: 'Ori',
    source: 'https://en.wikipedia.org/wiki/Mintaka' },
  { id: 'sadr', name: 'Sadr', bayer: 'γ Cyg', ra: 20.3705, dec: 40.2567, mag: 2.23, con: 'Cyg',
    source: 'https://en.wikipedia.org/wiki/Gamma_Cygni' },
  { id: 'eltanin', name: 'Eltanin', bayer: 'γ Dra', ra: 17.9434, dec: 51.4889, mag: 2.23, con: 'Dra',
    source: 'https://en.wikipedia.org/wiki/Gamma_Draconis' },
  { id: 'schedar', name: 'Schedar', bayer: 'α Cas', ra: 0.6751, dec: 56.5373, mag: 2.24, con: 'Cas',
    source: 'https://en.wikipedia.org/wiki/Alpha_Cassiopeiae' },
  { id: 'alphecca', name: 'Alphecca', bayer: 'α CrB', ra: 15.5781, dec: 26.7147, mag: 2.24, con: 'CrB',
    source: 'https://en.wikipedia.org/wiki/Alpha_Coronae_Borealis' },
  { id: 'almach', name: 'Almach', bayer: 'γ And', ra: 2.0650, dec: 42.3297, mag: 2.27, con: 'And',
    source: 'https://en.wikipedia.org/wiki/Gamma_Andromedae' },
  { id: 'caph', name: 'Caph', bayer: 'β Cas', ra: 0.1530, dec: 59.1498, mag: 2.28, con: 'Cas',
    source: 'https://en.wikipedia.org/wiki/Beta_Cassiopeiae' },
  { id: 'merak', name: 'Merak', bayer: 'β UMa', ra: 11.0307, dec: 56.3824, mag: 2.37, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Beta_Ursae_Majoris' },
  { id: 'gammacas', name: 'Gamma Cas', bayer: 'γ Cas', ra: 0.9451, dec: 60.7167, mag: 2.39, con: 'Cas',
    source: 'https://en.wikipedia.org/wiki/Gamma_Cassiopeiae' },
  { id: 'scheat', name: 'Scheat', bayer: 'β Peg', ra: 23.0629, dec: 28.0828, mag: 2.42, con: 'Peg',
    source: 'https://en.wikipedia.org/wiki/Beta_Pegasi' },
  { id: 'phecda', name: 'Phecda', bayer: 'γ UMa', ra: 11.8972, dec: 53.6948, mag: 2.44, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Phecda' },
  { id: 'gienah', name: 'Gienah (Aljanah)', bayer: 'ε Cyg', ra: 20.7702, dec: 33.9703, mag: 2.48, con: 'Cyg',
    source: 'https://en.wikipedia.org/wiki/Epsilon_Cygni' },
  { id: 'markab', name: 'Markab', bayer: 'α Peg', ra: 23.0793, dec: 15.2053, mag: 2.48, con: 'Peg',
    source: 'https://en.wikipedia.org/wiki/Alpha_Pegasi' },
  { id: 'ruchbah', name: 'Ruchbah', bayer: 'δ Cas', ra: 1.4303, dec: 60.2353, mag: 2.68, con: 'Cas',
    source: 'https://en.wikipedia.org/wiki/Delta_Cassiopeiae' },
  { id: 'kornephoros', name: 'Kornephoros', bayer: 'β Her', ra: 16.5037, dec: 21.4896, mag: 2.81, con: 'Her',
    source: 'https://en.wikipedia.org/wiki/Beta_Herculis' },
  { id: 'zetaher', name: 'Zeta Herculis', bayer: 'ζ Her', ra: 16.6881, dec: 31.6027, mag: 2.81, con: 'Her',
    source: 'https://en.wikipedia.org/wiki/Zeta_Herculis' },
  { id: 'algenib', name: 'Algenib', bayer: 'γ Peg', ra: 0.2206, dec: 15.1836, mag: 2.84, con: 'Peg',
    source: 'https://en.wikipedia.org/wiki/Gamma_Pegasi' },
  { id: 'deltacyg', name: 'Delta Cygni', bayer: 'δ Cyg', ra: 19.7496, dec: 45.1308, mag: 2.87, con: 'Cyg',
    source: 'https://en.wikipedia.org/wiki/Delta_Cygni' },
  { id: 'pherkad', name: 'Pherkad', bayer: 'γ UMi', ra: 15.3455, dec: 71.8340, mag: 3.05, con: 'UMi',
    source: 'https://en.wikipedia.org/wiki/Pherkad' },
  { id: 'albireo', name: 'Albireo', bayer: 'β Cyg', ra: 19.5120, dec: 27.9597, mag: 3.21, con: 'Cyg',
    source: 'https://en.wikipedia.org/wiki/Albireo' },
  { id: 'megrez', name: 'Megrez', bayer: 'δ UMa', ra: 12.2571, dec: 57.0326, mag: 3.31, con: 'UMa',
    source: 'https://en.wikipedia.org/wiki/Megrez' },
  { id: 'segin', name: 'Segin', bayer: 'ε Cas', ra: 1.9066, dec: 63.6701, mag: 3.37, con: 'Cas',
    source: 'https://en.wikipedia.org/wiki/Epsilon_Cassiopeiae' },
  { id: 'thuban', name: 'Thuban', bayer: 'α Dra', ra: 14.0732, dec: 64.3759, mag: 3.67, con: 'Dra',
    source: 'https://en.wikipedia.org/wiki/Thuban' }
];

/* Obrazce na obloze – spojnice mezi hvězdami. Kreslí se tenkou linkou, aby
   z mapy nebyla omalovánka. `dashed: true` = pomocná linka (ne obrazec).   */
const SKY_ASTERISMS = [
  { name: 'Velký vůz', con: 'UMa',
    lines: [['alkaid', 'mizar', 'alioth', 'megrez', 'phecda', 'merak', 'dubhe', 'megrez']] },
  { name: 'Ukazatel na Polárku', con: 'UMa', dashed: true,
    lines: [['merak', 'dubhe', 'polaris']] },
  { name: 'Malý vůz', con: 'UMi',
    lines: [['polaris', 'kochab', 'pherkad']] },
  { name: 'Kasiopeja', con: 'Cas',
    lines: [['segin', 'ruchbah', 'gammacas', 'schedar', 'caph']] },
  { name: 'Orion', con: 'Ori',
    lines: [['betelgeuse', 'bellatrix'], ['bellatrix', 'mintaka'], ['betelgeuse', 'alnitak'],
            ['mintaka', 'alnilam', 'alnitak'], ['mintaka', 'rigel'], ['alnitak', 'saiph'],
            ['rigel', 'saiph']] },
  { name: 'Labuť', con: 'Cyg',
    lines: [['deneb', 'sadr', 'albireo'], ['gienah', 'sadr', 'deltacyg']] },
  { name: 'Letní trojúhelník', con: '—', dashed: true,
    lines: [['vega', 'deneb', 'altair', 'vega']] },
  { name: 'Pegasův čtverec', con: 'Peg',
    lines: [['markab', 'scheat', 'alpheratz', 'algenib', 'markab']] },
  { name: 'Andromeda', con: 'And',
    lines: [['alpheratz', 'mirach', 'almach']] },
  { name: 'Blíženci', con: 'Gem', lines: [['castor', 'pollux']] },
  { name: 'Lev', con: 'Leo', lines: [['regulus', 'denebola']] },
  { name: 'Perseus', con: 'Per', lines: [['mirfak', 'algol']] },
  { name: 'Býk', con: 'Tau', lines: [['aldebaran', 'elnath']] },
  { name: 'Drak', con: 'Dra', lines: [['thuban', 'eltanin']] }
];

/* Severní galaktický pól (J2000) – podle něj se kreslí pás Mléčné dráhy.
   Zdroj: https://en.wikipedia.org/wiki/Galactic_coordinate_system          */
const GALACTIC_POLE = { ra: 12.856, dec: 27.128, lonNCP: 122.932 };
