/* =============================================================================
   KATALOG VESMÍRNÝCH OBJEKTŮ  (data/objects.js)
   -----------------------------------------------------------------------------
   OBJECT_TYPES = typy objektů (aby se daly později přidat galaxie, hvězdokupy…)
   SPACE_OBJECTS = konkrétní objekty, které se dají "objevit" a uložit do sbírky

   JAK PŘIDAT NOVÝ OBJEKT: zkopíruj jednu položku v SPACE_OBJECTS a změň údaje.
   Důležité je jen unikátní "id" a existující "type" + "image".
   ========================================================================== */

const OBJECT_TYPES = {
  nebula:         { name: 'Mlhovina',            icon: '☁️', color: '#ff7ac6' },
  star:           { name: 'Hvězda',             icon: '⭐', color: '#ffd479' },
  doubleStar:     { name: 'Dvojhvězda',         icon: '✨', color: '#ffe9a8' },
  openCluster:    { name: 'Otevřená hvězdokupa',icon: '🌟', color: '#9ad8ff' },
  globularCluster:{ name: 'Kulová hvězdokupa',  icon: '🔵', color: '#8ab8ff' },
  supernova:      { name: 'Supernova',           icon: '💥', color: '#ff9d5c' },
  galaxy:         { name: 'Galaxie',             icon: '🌌', color: '#b79dff' },
  blackHole:      { name: 'Černá díra',        icon: '⚫', color: '#7f8ba3' },
  planet:         { name: 'Planeta',             icon: '🪐', color: '#ffc48a' },
  moon:           { name: 'Měsíc',              icon: '🌙', color: '#dfe6f2' },
  station:        { name: 'Vesmírná stanice',    icon: '🛰️', color: '#9ad8ff' },
  meteorShower:   { name: 'Meteorický roj',      icon: '🌠', color: '#ffd479' }
};

/* Podtypy mlhovin – používá je lekce i karty objektů */
const NEBULA_KINDS = {
  emission: {
    id: 'emission',
    icon: '🔥',
    name: 'Emisní',
    short: 'Sama září.',
    text: 'Plyn v ní svítí vlastním světlem, protože ho rozzářily blízké horké hvězdy.',
    image: 'm42',
    color: '#ff6aa8'
  },
  reflection: {
    id: 'reflection',
    icon: '💡',
    name: 'Reflexní',
    short: 'Odráží světlo blízké hvězdy.',
    text: 'Prach v ní sám nesvítí – jen odráží světlo hvězdy vedle sebe. Proto bývá modrá.',
    image: 'm78',
    color: '#69b6ff'
  },
  dark: {
    id: 'dark',
    icon: '🌑',
    name: 'Temná',
    short: 'Zakrývá světlo za sebou.',
    text: 'Je tak hustá, že světlo hvězd za ní vůbec nepropustí. Vidíme ji jako tmavou siluetu.',
    image: 'horsehead',
    color: '#8b7bd8'
  },
  planetary: {
    id: 'planetary',
    icon: '💀',
    name: 'Planetární',
    short: 'Pozůstatek umírající hvězdy.',
    text: 'Stará hvězda odhodila své vnější vrstvy. S planetami nemá nic společného – jen tak ' +
          'vypadala ve starých dalekohledech.',
    image: 'ring',
    color: '#5ce0c6'
  }
};

const SPACE_OBJECTS = [
  {
    id: 'm42',
    name: 'Orionova mlhovina',
    designation: 'M42',
    type: 'nebula',
    ra: 5.588, dec: -5.3875,          // 05h 35m 16.8s -05° 23' 15" (J2000)
    sizeArcmin: 65,
    coordsSource: 'https://en.wikipedia.org/wiki/Orion_Nebula',
    kind: 'emission',                     // podtyp (viz NEBULA_KINDS)
    subtypeLabel: 'Emisní mlhovina',
    constellation: 'Orion',
    distanceText: 'přibližně 1 300 – 1 500 světelných let',
    magnitude: '4,0 – za tmy viditelná okem',
    image: 'm42',
    fact: 'Je to nejbližší velká „porodnice hvězd“ od Země – právě teď se v ní rodí nové hvězdy.',
    stellarium: 'Hledej ve Stellariu: napiš „M42“ a stiskni Enter. Je hned pod třemi hvězdami Orionova ' +
                'pásu.',
    dwarfTip: 'Je tak jasná, že je ideální na první pokus. Zkus kratší expozice, aby střed nebyl ' +
              'přepálený.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',

    // 📸 VLASTNÍ FOTKA Z DWARFU – odkomentuj a doplň cestu, když ji budeš mít:
    // myPhoto: 'images/moje/m42-dwarf.jpg'
  },

  {
    id: 'polaris',
    name: 'Polárka',
    designation: 'α UMi',
    type: 'star',
    ra: 2.5303, dec: 89.2641,          // 02h 31m 49.09s +89° 15' 50.8" (J2000)
    coordsSource: 'https://en.wikipedia.org/wiki/Polaris',
    kind: null,
    subtypeLabel: 'Trojhvězda – severní hvězda',
    constellation: 'Malý medvěd (Malý vůz)',
    distanceText: 'přibližně 430 světelných let',
    magnitude: '2,0 – snadno viditelná i z města',
    image: 'polaris',
    fact: 'Není to nejjasnější hvězda na nebi, ale nejužitečnější: leží skoro přesně ve směru ' +
          'zemské osy, takže vždy ukazuje k severu.',
    stellarium: 'Hledej ve Stellariu: napiš „Polaris“. Najdeš ji i na nebi – dvě krajní hvězdy Velkého ' +
                'vozu na ni ukazují.',
    dwarfTip: 'Polárku potřebuješ na nastavení EQ režimu. Nakloň Dwarf na úhel své zeměpisné šířky ' +
              '(Praha ≈ 50°) a otoč ho na ni.',
    source: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/'
  },

  {
    id: 'm45',
    name: 'Plejády',
    designation: 'M45',
    type: 'openCluster',
    ra: 3.7772, dec: 24.1781,          // 03h 46m 38.0s +24° 10' 41" (J2000)
    sizeArcmin: 120,
    coordsSource: 'https://en.wikipedia.org/wiki/Pleiades',
    subtypeLabel: 'Otevřená hvězdokupa',
    constellation: 'Býk (Taurus)',
    distanceText: '445 světelných let',
    magnitude: '1,6 – velmi snadno viditelné okem',
    image: 'm45',
    fact: 'Volným okem v nich většina lidí spočítá šest hvězd, i když jich je víc než tisíc.',
    stellarium: 'Ve Stellariu napiš „M45“. Na nebi je najdeš v zimě nad hlavou, vedle Býka.',
    dwarfTip: 'Jsou velké a jasné – ideální pro Dwarf. Když fotíš dlouho, objeví se okolo hvězd ' +
              'modravý prach.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/'
  },

  {
    id: 'm13',
    name: 'Kulová hvězdokupa v Herkulovi',
    designation: 'M13',
    type: 'globularCluster',
    ra: 16.6948, dec: 36.4599,          // 16h 41m 41.24s +36° 27' 35.5" (J2000)
    sizeArcmin: 20,
    coordsSource: 'https://en.wikipedia.org/wiki/Messier_13',
    subtypeLabel: 'Kulová hvězdokupa',
    constellation: 'Herkules',
    distanceText: '25 000 světelných let',
    magnitude: '5,8 – za tmy slabě viditelná okem',
    image: 'm13',
    fact: 'Má více než 100 000 hvězd a je jednou z nejjasnějších hvězdokup severní oblohy.',
    stellarium: 'Ve Stellariu napiš „M13“. Najdeš ji v létě a na podzim vysoko na obloze.',
    dwarfTip: 'Krásně vypadá už po několika minutách. Nepřeexponuj střed – jinak se hvězdy slijí do ' +
              'bílé kule.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/'
  },

  {
    id: 'milkyway',
    name: 'Mléčná dráha',
    designation: 'naše galaxie',
    type: 'galaxy',
    ra: 17.7611, dec: -29.0078,          // 17h 45m 40.0409s -29° 00' 28.118" (J2000)
    coordsNote: 'střed Galaxie (Sgr A*) – pás Mléčné dráhy vede přes celou oblohu',
    coordsSource: 'https://en.wikipedia.org/wiki/Galactic_coordinate_system',
    subtypeLabel: 'Spirální galaxie s příčkou',
    constellation: 'je vidět přes celou oblohu',
    distanceText: 'jsme vevnitř – do středu je to asi 26 000 světelných let',
    magnitude: 'za tmy jasný pás přes celé nebe',
    image: 'milkyway',
    fact: 'Má v průměru asi 100 000 světelných let. Slunce je na jejím předměstí, ne ve středu.',
    stellarium: 'Ve Stellariu si vypni světelné znečištění a uvidíš, kudy pás vede. Střed je v ' +
                'souhvězdí Střelec.',
    dwarfTip: 'Na pás potřebuješ širokou fotku – zkus Dwarf v širokoúhlém režimu na tmavém místě bez ' +
              'lamp.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html'
  },

  {
    id: 'm31',
    name: 'Galaxie v Andromedě',
    designation: 'M31',
    type: 'galaxy',
    ra: 0.7123, dec: 41.2692,          // 00h 42m 44.3s +41° 16' 09" (J2000)
    sizeArcmin: 190,
    coordsSource: 'https://en.wikipedia.org/wiki/Andromeda_Galaxy',
    subtypeLabel: 'Spirální galaxie',
    constellation: 'Andromeda',
    distanceText: '2,5 milionu světelných let',
    magnitude: '3,1 – za tmy viditelná okem',
    image: 'm31',
    fact: 'Je to nejbližší velká galaxie a nejvzdálenější věc, jakou člověk uvidí bez ' +
          'dalekohledu.',
    stellarium: 'Ve Stellariu napiš „M31“. Na podzimní obloze je vysoko, najdeš ji podle Kasiopeje ' +
                '(písmeno W).',
    dwarfTip: 'Je větší než Měsíc na nebi – celá se ti do záběru možná ani nevejde. Chce dlouhý čas ' +
              'sbírání světla.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/'
  },

  {
    id: 'm51',
    name: 'Galaxie Vír',
    designation: 'M51',
    type: 'galaxy',
    ra: 13.498, dec: 47.1953,          // 13h 29m 52.7s +47° 11' 43" (J2000)
    sizeArcmin: 11.2,
    coordsSource: 'https://en.wikipedia.org/wiki/Whirlpool_Galaxy',
    subtypeLabel: 'Spirální galaxie',
    constellation: 'Honicí psi (Canes Venatici)',
    distanceText: '31 milionů světelných let',
    magnitude: '8,4 – jen dalekohledem',
    image: 'm51',
    fact: 'Menší galaxie NGC 5195 ji tahá za rameno – a ty síly v ní rozběhly zrod nových hvězd.',
    stellarium: 'Ve Stellariu napiš „M51“. Najdeš ji blízko konce rukojeti Velkého vozu.',
    dwarfTip: 'Těžší cíl – potřebuje EQ režim, tmavou oblohu a mnoho snímků. Odměnou je vidět ' +
              'spirálu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/'
  },

  {
    id: 'moon',
    name: 'Měsíc',
    designation: 'náš Měsíc',
    type: 'moon',
    moving: true,                     // Měsíc – poloha na obloze se mění, hledej ve Stellariu
    subtypeLabel: 'Měsíc Země',
    constellation: 'putuje po celé obloze',
    distanceText: 'v průměru 384 400 km',
    magnitude: 'nejjasnější objekt noční oblohy',
    image: 'moon',
    fact: 'Je široký asi 3 480 km – necelá třetina šířky Země. Krátery na něm zůstávají miliardy ' +
          'let.',
    stellarium: 'Stellarium ti ukáže, v jaké fázi je dnes. Nejkrásnější krátery jsou na hranici světla ' +
                'a tmy.',
    dwarfTip: 'Je tak jasný, že potřebuje velmi krátké expozice. EQ režim tu není potřeba.',
    source: 'https://science.nasa.gov/moon/facts/'
  },

  {
    id: 'saturn',
    name: 'Saturn',
    designation: 'planeta',
    type: 'planet',
    moving: true,                     // planeta – poloha na obloze se mění, hledej ve Stellariu
    subtypeLabel: 'Plynný obr s prstenci',
    constellation: 'putuje mezi hvězdami',
    distanceText: '1,4 miliardy km od Slunce',
    magnitude: 'jasná „hvězda“, která nebliká',
    image: 'saturn',
    fact: 'Prstence sahají 282 000 km od planety, ale jsou silné jen asi 10 metrů. Saturn má 274 ' +
          'potvrzených měsíců.',
    stellarium: 'Ve Stellariu napiš „Saturn“ – ukáže ti, kde a kdy je právě teď na obloze.',
    dwarfTip: 'Malý a jasný. Zkus krátké expozice a mnoho snímků, abys „přebil“ neklidný vzduch.',
    source: 'https://science.nasa.gov/saturn/facts/'
  },

  {
    id: 'jupiter',
    name: 'Jupiter',
    designation: 'planeta',
    type: 'planet',
    moving: true,                     // planeta – poloha na obloze se mění, hledej ve Stellariu
    subtypeLabel: 'Největší planeta Sluneční soustavy',
    constellation: 'putuje mezi hvězdami',
    distanceText: 'asi 780 milionů km od Slunce',
    magnitude: 'nejjasnější objekt po Venuši a Měsíci',
    image: 'jupiter',
    fact: 'Jeho čtyři velké měsíce objevil Galileo v roce 1610 – byly to první měsíce nalezené u ' +
          'jiné planety.',
    stellarium: 'Ve Stellariu napiš „Jupiter“ a přibliž si ho – uvidíš i měsíce a jejich dnešní pořadí.',
    dwarfTip: 'Zkus ho vyfotit dva večery po sobě. Měsíce budou jinde – uvidíš, jak obíhají.',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/'
  },

  {
    id: 'albireo',
    name: 'Albireo',
    designation: 'β Cygni',
    type: 'doubleStar',
    ra: 19.512, dec: 27.9597,          // 19h 30m 43.286s +27° 57' 34.84" (J2000)
    coordsSource: 'https://en.wikipedia.org/wiki/Albireo',
    subtypeLabel: 'Barevná dvojice hvězd',
    constellation: 'Labuť (Cygnus)',
    distanceText: 'přibližně 400 světelných let',
    magnitude: '3,1 – okem jedna hvězda, dalekohledem dvě',
    image: 'albireo',
    fact: 'Jedna z dvojice je modrá, druhá žlutá. Astronomové si zatím nejsou jistí, jestli se ' +
          'opravdu obíhají, nebo jen leží ve stejném směru.',
    stellarium: 'Ve Stellariu napiš „Albireo“. Je to hlava Labutě – v létě a na podzim vysoko na ' +
                'obloze.',
    dwarfTip: 'Krátká expozice stačí. Zkus nepřeexponovat – jinak se barvy změní na bílou.',
    source: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/'
  },

  {
    id: 'm1',
    name: 'Krabí mlhovina',
    designation: 'M1',
    type: 'supernova',
    ra: 5.5755, dec: 22.0175,          // 05h 34m 31.8s +22° 01' 03" (J2000)
    sizeArcmin: 7.0,
    coordsSource: 'https://en.wikipedia.org/wiki/Crab_Nebula',
    subtypeLabel: 'Pozůstatek supernovy',
    constellation: 'Býk (Taurus)',
    distanceText: '6 500 světelných let',
    magnitude: '8,4 – jen dalekohledem',
    image: 'm1',
    fact: 'Je to zbytek výbuchu, který lidé viděli v roce 1054. V jejím středu zůstala neutronová ' +
          'hvězda, která bliká 30krát za sekundu.',
    stellarium: 'Ve Stellariu napiš „M1“. Najdeš ji v zimě u hvězdy Aldebaran v Býku.',
    dwarfTip: 'Je malá a slabá – potřebuje EQ režim a mnoho snímků. Ale je to skutečný pozůstatek ' +
              'výbuchu hvězdy.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/'
  },

  {
    id: 'sgra',
    name: 'Sagittarius A*',
    designation: 'Sgr A*',
    type: 'blackHole',
    ra: 17.7611, dec: -29.0078,          // 17h 45m 40.0409s -29° 00' 28.118" (J2000)
    coordsSource: 'https://en.wikipedia.org/wiki/Sagittarius_A*',
    subtypeLabel: 'Supermasivní černá díra ve středu naší galaxie',
    constellation: 'Střelec (Sagittarius)',
    distanceText: '27 000 světelných let',
    magnitude: 'není vidět – zakrývá ji prach galaxie',
    image: 'sgra',
    fact: 'Váží jako čtyři miliony Sluncí. První fotografii zveřejnili astronomové 12. května ' +
          '2022 – spojili osm observatoří do dalekohledu velkého jako Země.',
    stellarium: 'Ve Stellariu napiš „Sgr A*“. Uvidíš, kde ve Střelci je střed naší galaxie.',
    dwarfTip: 'Samotnou černou díru Dwarf neuvidí. Ale můžeš vyfotit oblast ve Střelci – směr, kde je ' +
              'střed galaxie.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/'
  },

  {
    id: 'm44',
    name: 'Jesličky',
    designation: 'M44',
    type: 'openCluster',
    ra: 8.6733, dec: 19.9833,          // 08h 40m 24s +19° 59' 00" (J2000)
    sizeArcmin: 95,
    coordsSource: 'https://en.wikipedia.org/wiki/Beehive_Cluster',
    subtypeLabel: 'Otevřená hvězdokupa',
    constellation: 'Rak (Cancer)',
    distanceText: '600 světelných let',
    magnitude: '3,7 – za tmy viditelná okem',
    image: 'm44',
    fact: 'Má okolo tisíce hvězd držených pohromadě jen slabou gravitací. Do záběru Dwarfu se ' +
          'krásně vejde celá.',
    stellarium: 'Ve Stellariu napiš „M44“. Na jarní obloze je vysoko, mezi Lvem a Blíženci.',
    dwarfTip: 'Ideální cíl na zkoušení nastavení – je jasná, velká a hvězdy jsou ostré, takže hned ' +
              'vidíš, jestli jsi dobře zaostřil.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-44/'
  },

  {
    id: 'sun',
    name: 'Slunce',
    designation: 'naše hvězda',
    type: 'star',
    moving: true,                     // Slunce – poloha na obloze se mění, hledej ve Stellariu
    subtypeLabel: 'Žlutá hvězda – naše vlastní',
    constellation: 'není v souhvězdí – je to naše Slunce',
    distanceText: '150 milionů km, což je 8 světelných minut',
    magnitude: 'nejjasnější objekt na nebi – NIKDY bez filtru!',
    image: 'sun',
    fact: 'Je asi 100krát širší než Země a na povrchu má okolo 5 500 °C. Sluneční skvrny jsou ' +
          'chladnější místa – největší jsou větší než celá Země.',
    stellarium: 'Ve Stellariu si zapni Slunce a podívej se, kdy je nejvýš – tehdy je vzduch nejméně ' +
                'rozvířený.',
    dwarfTip: 'Jen s přiloženým ND filtrem a v režimu Solar System. Bez filtru se zničí senzor i oči.',
    source: 'https://science.nasa.gov/sun/facts/'
  },

  {
    id: 'm27',
    name: 'Mlhovina Činka',
    designation: 'M27',
    type: 'nebula',
    ra: 19.9934, dec: 22.7212,          // 19h 59m 36.3s +22° 43' 16.3" (J2000)
    sizeArcmin: 8.0,
    coordsSource: 'https://en.wikipedia.org/wiki/Dumbbell_Nebula',
    kind: 'planetary',
    subtypeLabel: 'Planetární mlhovina',
    constellation: 'Lištička (Vulpecula)',
    distanceText: '1 200 světelných let',
    magnitude: '7,5 – jen dalekohledem',
    image: 'm27',
    fact: 'Další hvězda, která odhodila své vnější vrstvy. Je větší a jasnější než Prstencová ' +
          'mlhovina, takže se fotí snáz.',
    stellarium: 'Ve Stellariu napiš „M27“. V létě a na podzim je vysoko – dobrý trénink hledání podle ' +
                'souřadnic.',
    dwarfTip: 'Zkus ji nejprve najít podle souřadnic a teprve potom podle jména. Zvládneš to i bez EQ ' +
              'režimu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-27/'
  },

  {
    id: 'iss',
    name: 'Mezinárodní vesmírná stanice',
    designation: 'ISS',
    type: 'station',
    moving: true,                     // družice – poloha na obloze se mění, hledej ve Stellariu
    subtypeLabel: 'Obydlená vesmírná stanice',
    constellation: 'přeletí přes celou oblohu za pár minut',
    distanceText: 'asi 400 km nad Zemí',
    magnitude: 'jasnější než většina hvězd – nebliká a letí rovnoměrně',
    image: 'iss',
    fact: 'Oběhne Zemi jednou za 90 minut, letí asi 8 km za sekundu a lidé na ní žijí nepřetržitě ' +
          'od listopadu 2000. Je dlouhá 109 metrů.',
    stellarium: 'Ve Stellariu si zapni satelity a napiš „ISS“ – uvidíš, kdy dnes přeletí nad vámi.',
    dwarfTip: 'Na fotografování je příliš rychlá. Ale na snímku s delší expozicí po sobě zanechá ' +
              'pěkný světelný pruh.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/'
  },

  {
    id: 'sirius',
    name: 'Sirius',
    designation: 'α CMa',
    type: 'star',
    ra: 6.7525, dec: -16.7161,          // 06h 45m 08.917s -16° 42' 58.02" (J2000)
    coordsSource: 'https://en.wikipedia.org/wiki/Sirius',
    subtypeLabel: 'Nejjasnější hvězda noční oblohy',
    constellation: 'Velký pes (Canis Major)',
    distanceText: '8,6 světelného roku',
    magnitude: '−1,5 – nejjasnější hvězda vůbec',
    image: 'starBlue',
    fact: 'Je tak jasný hlavně proto, že je blízko. Obíhá okolo něj bílý trpaslík Sirius B, který ' +
          'je 10 000krát slabší.',
    stellarium: 'Ve Stellariu napiš „Sirius“. V zimě ho najdeš nízko na jihu, pod Orionem – nejjasnější ' +
                'bod na nebi.',
    dwarfTip: 'Nízko nad obzorem se krásně „jiskří“ všemi barvami. To není jeho vlastnost – to dělá ' +
              'náš neklidný vzduch.',
    source: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/'
  },

  {
    id: 'peg51',
    name: '51 Pegasi',
    designation: '51 Peg',
    type: 'star',
    ra: 22.9578, dec: 20.7688,          // 22h 57m 27.9805s +20° 46' 07.797" (J2000)
    coordsSource: 'https://en.wikipedia.org/wiki/51_Pegasi',
    subtypeLabel: 'Hvězda s první objevenou exoplanetou',
    constellation: 'Pegas',
    distanceText: 'přibližně 50 světelných let',
    magnitude: '5,5 – za tmy těsně na hranici volného oka',
    image: 'transit',
    fact: 'U této hvězdy našli v roce 1995 první planetu obíhající okolo hvězdy podobné Slunci. ' +
          'Samotnou planetu nevidíme – prozradila se tím, jak hvězdou pohybuje.',
    stellarium: 'Ve Stellariu napiš „51 Pegasi“. Na podzimní obloze je vysoko, ve čtverci Pegasa.',
    dwarfTip: 'Uvidíš jen bod. Ale je to bod, u kterého obíhá cizí svět – a ten bod jsi vyfotil ty.',
    source: 'https://science.nasa.gov/exoplanets/'
  },

  {
    id: 'perseids',
    name: 'Perseidy',
    designation: 'meteorický roj',
    type: 'meteorShower',
    ra: 3.2, dec: 58.0,          // 03h 12m 00s +58° 00' 00" (J2000)
    coordsNote: 'radiant roje v době maxima (12.–13. srpna)',
    coordsSource: 'https://www.imo.net/files/meteor-shower/cal2022.pdf',
    subtypeLabel: 'Meteorický roj z komety 109P/Swift-Tuttle',
    constellation: 'vylétají ze souhvězdí Perseus',
    distanceText: 'shoří asi 80 km nad našimi hlavami',
    magnitude: 'za dobré noci desítky meteorů za hodinu',
    image: 'meteors',
    fact: 'Vrcholí 12. – 13. srpna, když Země prochází prachovou stopou komety 109P/Swift-Tuttle. ' +
          'Zrníčka vletí do atmosféry rychlostí 59 km za sekundu.',
    stellarium: 'Ve Stellariu najdi souhvězdí Perseus – odtud budou meteory zdánlivě vylétat.',
    dwarfTip: 'Meteor se nedá „zaměřit“. Nech Dwarf fotit širokoúhle dlouhé série a některý ti do ' +
              'záběru vletí sám.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/perseids/'
  }

  /* Další objekty (M45, M13, M31, M57…) se přidávají sem – stejná struktura. */
];

/* Pomocník: najdi objekt podle id */
function getObject(id) {
  return SPACE_OBJECTS.find(function (o) { return o.id === id; });
}

/* =============================================================================
   CO JE PRÁVĚ TEĎ NA OBLOZE  (pro kartu „🌠 Dnes v noci“)
   -----------------------------------------------------------------------------
   Pro každý měsíc (0 = leden) seznam objektů, které jsou z Prahy
   (asi 50° severní šířky) ve večerních hodinách dobře vysoko nad obzorem.
   Není to výpočet – je to doporučení. Přesné časy vždy ověřte ve Stellariu.
   ========================================================================== */
const SEASON_TIPS = [
  /* 0 leden    */ { objects: ['m42', 'm45', 'm31', 'm1'],   note: 'Zimní obloha je nejbohatší na mlhoviny. Orion je večer vysoko.' },
  /* 1 únor     */ { objects: ['m42', 'm45', 'm44', 'm1'],   note: 'Orion ještě drží, na jihu se objevují hvězdokupy.' },
  /* 2 marec    */ { objects: ['m44', 'm45', 'm42', 'm51'],  note: 'Orion zapadá krátce po setmění – s mlhovinami je třeba si pospíšit.' },
  /* 3 apríl    */ { objects: ['m51', 'm44', 'm13'],         note: 'Začíná galaxiová sezóna: obloha je bez Mléčné dráhy a hluboký vesmír je čistý.' },
  /* 4 máj      */ { objects: ['m51', 'm13', 'm44'],         note: 'Ideální čas na galaxie a na kulovou hvězdokupu M13.' },
  /* 5 červen   */ { objects: ['m13', 'm51'],                note: 'Nejkratší noci v roce – obloha úplně nezčerná. Zkus Měsíc a planety.' },
  /* 6 červenec */ { objects: ['m13', 'milkyway', 'm27'],    note: 'Mléčná dráha je večer vysoko. Vyjeďte si za město, stojí to za to.' },
  /* 7 august   */ { objects: ['perseids', 'milkyway', 'm13', 'm27'], note: '12. – 13. srpna vrcholí Perseidy. Mléčná dráha je nejkrásnější v roce.' },
  /* 8 september*/ { objects: ['m31', 'milkyway', 'm27'],    note: 'Andromeda vychází vysoko a noci jsou už dost dlouhé.' },
  /* 9 říjen    */ { objects: ['m31', 'm45', 'm27'],         note: 'Andromeda a Plejády jsou večer nádherné.' },
  /*10 november */ { objects: ['m31', 'm45', 'm42'],         note: 'Plejády jsou vysoko, Orion začíná vycházet před půlnocí.' },
  /*11 december */ { objects: ['m42', 'm45', 'm31', 'm1'],   note: 'Nejdelší noci v roce. Orion vychází hned po setmění.' }
];
