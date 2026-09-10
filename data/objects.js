/* =============================================================================
   KATALÓG VESMÍRNYCH OBJEKTOV  (data/objects.js)
   -----------------------------------------------------------------------------
   OBJECT_TYPES = typy objektov (aby sa dali neskôr pridať galaxie, hviezdokopy…)
   SPACE_OBJECTS = konkrétne objekty, ktoré sa dajú "objaviť" a uložiť do zbierky

   AKO PRIDAŤ NOVÝ OBJEKT: skopíruj jednu položku v SPACE_OBJECTS a zmeň údaje.
   Dôležité je len unikátne "id" a existujúci "type" + "image".
   ========================================================================== */

const OBJECT_TYPES = {
  nebula:         { name: 'Hmlovina',            icon: '☁️', color: '#ff7ac6' },
  star:           { name: 'Hviezda',             icon: '⭐', color: '#ffd479' },
  doubleStar:     { name: 'Dvojhviezda',         icon: '✨', color: '#ffe9a8' },
  openCluster:    { name: 'Otvorená hviezdokopa',icon: '🌟', color: '#9ad8ff' },
  globularCluster:{ name: 'Guľová hviezdokopa',  icon: '🔵', color: '#8ab8ff' },
  supernova:      { name: 'Supernova',           icon: '💥', color: '#ff9d5c' },
  galaxy:         { name: 'Galaxia',             icon: '🌌', color: '#b79dff' },
  blackHole:      { name: 'Čierna diera',        icon: '⚫', color: '#7f8ba3' },
  planet:         { name: 'Planéta',             icon: '🪐', color: '#ffc48a' },
  moon:           { name: 'Mesiac',              icon: '🌙', color: '#dfe6f2' },
  station:        { name: 'Vesmírna stanica',    icon: '🛰️', color: '#9ad8ff' },
  meteorShower:   { name: 'Meteorický roj',      icon: '🌠', color: '#ffd479' }
};

/* Podtypy hmlovín – používa ich lekcia aj karty objektov */
const NEBULA_KINDS = {
  emission: {
    id: 'emission',
    icon: '🔥',
    name: 'Emisná',
    short: 'Sama žiari.',
    text: 'Plyn v nej svieti vlastným svetlom, lebo ho rozžiarili blízke horúce hviezdy.',
    image: 'm42',
    color: '#ff6aa8'
  },
  reflection: {
    id: 'reflection',
    icon: '💡',
    name: 'Reflexná',
    short: 'Odráža svetlo blízkej hviezdy.',
    text: 'Prach v nej sám nesvieti – iba odráža svetlo hviezdy vedľa seba. Preto býva modrá.',
    image: 'm78',
    color: '#69b6ff'
  },
  dark: {
    id: 'dark',
    icon: '🌑',
    name: 'Temná',
    short: 'Zakrýva svetlo za sebou.',
    text: 'Je taká hustá, že svetlo hviezd za ňou vôbec neprepustí. Vidíme ju ako tmavú siluetu.',
    image: 'horsehead',
    color: '#8b7bd8'
  },
  planetary: {
    id: 'planetary',
    icon: '💀',
    name: 'Planetárna',
    short: 'Pozostatok umierajúcej hviezdy.',
    text: 'Stará hviezda odhodila svoje vonkajšie vrstvy. S planétami nemá nič spoločné – len tak vyzerala v starých ďalekohľadoch.',
    image: 'ring',
    color: '#5ce0c6'
  }
};

const SPACE_OBJECTS = [
  {
    id: 'm42',
    name: 'Orionova hmlovina',
    designation: 'M42',
    type: 'nebula',
    kind: 'emission',                     // podtyp (viď NEBULA_KINDS)
    subtypeLabel: 'Emisná hmlovina',
    constellation: 'Orión',
    distanceText: 'približne 1 300 – 1 500 svetelných rokov',
    magnitude: '4,0 – za tmy viditeľná okom',
    image: 'm42',
    fact: 'Je to najbližšia veľká „pôrodnica hviezd“ od Zeme – práve teraz sa v nej rodia nové hviezdy.',
    stellarium: 'Hľadaj v Stellariu: napíš „M42“ a stlač Enter. Je hneď pod tromi hviezdami Orionovho pásu.',
    dwarfTip: 'Je taká jasná, že je ideálna na prvý pokus. Skús kratšie expozície, aby stred nebol prepálený.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',

    // 📸 VLASTNÁ FOTKA Z DWARFU – odkomentuj a doplň cestu, keď ju budeš mať:
    // myPhoto: 'images/moje/m42-dwarf.jpg'
  },

  {
    id: 'polaris',
    name: 'Polárka',
    designation: 'α UMi',
    type: 'star',
    kind: null,
    subtypeLabel: 'Trojhviezda – severná hviezda',
    constellation: 'Malý medveď (Malý voz)',
    distanceText: 'približne 430 svetelných rokov',
    magnitude: '2,0 – ľahko viditeľná aj z mesta',
    image: 'polaris',
    fact: 'Nie je to najjasnejšia hviezda na nebi, ale najužitočnejšia: leží skoro presne v smere zemskej osi, takže vždy ukazuje na severe.',
    stellarium: 'Hľadaj v Stellariu: napíš „Polaris“. Nájdeš ju aj na nebi – dve krajné hviezdy Veľkého voza na ňu ukazujú.',
    dwarfTip: 'Polárku potrebuješ na nastavenie EQ režimu. Nakloň Dwarf na uhol svojej zemepisnej šírky (Slovensko ≈ 48°) a otoč ho na ňu.',
    source: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/'
  },

  {
    id: 'm45',
    name: 'Plejády',
    designation: 'M45',
    type: 'openCluster',
    subtypeLabel: 'Otvorená hviezdokopa',
    constellation: 'Býk (Taurus)',
    distanceText: '445 svetelných rokov',
    magnitude: '1,6 – veľmi ľahko viditeľné okom',
    image: 'm45',
    fact: 'Voľným okom v nich väčšina ľudí spočíta šesť hviezd, hoci ich je viac ako tisíc.',
    stellarium: 'V Stellariu napíš „M45“. Na nebi ich nájdeš v zime nad hlavou, vedľa Býka.',
    dwarfTip: 'Sú veľké a jasné – ideálne pre Dwarf. Ak fotíš dlho, objaví sa okolo hviezd modrastý prach.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/'
  },

  {
    id: 'm13',
    name: 'Guľová hviezdokopa v Herkulovi',
    designation: 'M13',
    type: 'globularCluster',
    subtypeLabel: 'Guľová hviezdokopa',
    constellation: 'Herkules',
    distanceText: '25 000 svetelných rokov',
    magnitude: '5,8 – za tmy slabo viditeľná okom',
    image: 'm13',
    fact: 'Má viac ako 100 000 hviezd a je jednou z najjasnejších hviezdokôp severnej oblohy.',
    stellarium: 'V Stellariu napíš „M13“. Nájdeš ju v lete a na jeseň vysoko na oblohe.',
    dwarfTip: 'Krásne vyzerá už po niekoľkých minútach. Nepreexponuj stred – inak sa hviezdy zliejú do bielej gule.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/'
  },

  {
    id: 'milkyway',
    name: 'Mliečna cesta',
    designation: 'naša galaxia',
    type: 'galaxy',
    subtypeLabel: 'Špirálová galaxia s priečkou',
    constellation: 'vidno ju cez celú oblohu',
    distanceText: 'sme vnútri – do stredu je to asi 26 000 svetelných rokov',
    magnitude: 'za tmy jasný pás cez celé nebo',
    image: 'milkyway',
    fact: 'Má v priemere asi 100 000 svetelných rokov. Slnko je na jej predmestí, nie v strede.',
    stellarium: 'V Stellariu si vypni svetelné znečistenie a uvidíš, kadiaľ pás vedie. Stred je v súhvezdí Strelec.',
    dwarfTip: 'Na pás potrebuješ širokú fotku – skús Dwarf v širokouhlom režime na tmavom mieste bez lámp.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html'
  },

  {
    id: 'm31',
    name: 'Galaxia v Andromede',
    designation: 'M31',
    type: 'galaxy',
    subtypeLabel: 'Špirálová galaxia',
    constellation: 'Andromeda',
    distanceText: '2,5 milióna svetelných rokov',
    magnitude: '3,1 – za tmy viditeľná okom',
    image: 'm31',
    fact: 'Je to najbližšia veľká galaxia a najvzdialenejšia vec, akú človek uvidí bez ďalekohľadu.',
    stellarium: 'V Stellariu napíš „M31“. Na jesennej oblohe je vysoko, nájdeš ju podľa Kasiopeje (písmeno W).',
    dwarfTip: 'Je väčšia než Mesiac na nebi – celá sa ti do záberu možno ani nezmestí. Chce dlhý čas zbierania svetla.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/'
  },

  {
    id: 'm51',
    name: 'Galaxia Vír',
    designation: 'M51',
    type: 'galaxy',
    subtypeLabel: 'Špirálová galaxia',
    constellation: 'Poľovné psy (Canes Venatici)',
    distanceText: '31 miliónov svetelných rokov',
    magnitude: '8,4 – len ďalekohľadom',
    image: 'm51',
    fact: 'Menšia galaxia NGC 5195 jej ťahá za rameno – a tie sily v nej rozbehli zrod nových hviezd.',
    stellarium: 'V Stellariu napíš „M51“. Nájdeš ju blízko konca rukoväte Veľkého voza.',
    dwarfTip: 'Ťažší cieľ – potrebuje EQ režim, tmavú oblohu a veľa snímok. Odmena je vidieť špirálu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/'
  },

  {
    id: 'moon',
    name: 'Mesiac',
    designation: 'náš Mesiac',
    type: 'moon',
    subtypeLabel: 'Mesiac Zeme',
    constellation: 'putuje po celej oblohe',
    distanceText: 'v priemere 384 400 km',
    magnitude: 'najjasnejší objekt nočnej oblohy',
    image: 'moon',
    fact: 'Je široký asi 3 480 km – necelá tretina šírky Zeme. Krátery na ňom zostávajú miliardy rokov.',
    stellarium: 'Stellarium ti ukáže, v akej fáze je dnes. Najkrajšie krátery sú na hranici svetla a tmy.',
    dwarfTip: 'Je taký jasný, že potrebuje veľmi krátke expozície. EQ režim tu netreba.',
    source: 'https://science.nasa.gov/moon/facts/'
  },

  {
    id: 'saturn',
    name: 'Saturn',
    designation: 'planéta',
    type: 'planet',
    subtypeLabel: 'Plynný obor s prstencami',
    constellation: 'putuje medzi hviezdami',
    distanceText: '1,4 miliardy km od Slnka',
    magnitude: 'jasná „hviezda“, ktorá nebliká',
    image: 'saturn',
    fact: 'Prstence siahajú 282 000 km od planéty, ale sú hrubé len asi 10 metrov. Saturn má 274 potvrdených mesiacov.',
    stellarium: 'V Stellariu napíš „Saturn“ – ukáže ti, kde a kedy je práve teraz na oblohe.',
    dwarfTip: 'Malý a jasný. Skús krátke expozície a veľa snímok, aby si „prebil“ nepokojný vzduch.',
    source: 'https://science.nasa.gov/saturn/facts/'
  },

  {
    id: 'jupiter',
    name: 'Jupiter',
    designation: 'planéta',
    type: 'planet',
    subtypeLabel: 'Najväčšia planéta Slnečnej soustavy',
    constellation: 'putuje medzi hviezdami',
    distanceText: 'asi 780 miliónov km od Slnka',
    magnitude: 'najjasnejší objekt po Venuši a Mesiaci',
    image: 'jupiter',
    fact: 'Jeho štyri veľké mesiace objavil Galileo v roku 1610 – boli to prvé mesiace nájdené pri inej planéte.',
    stellarium: 'V Stellariu napíš „Jupiter“ a priblíž si ho – uvidíš aj mesiace a ich dnešné poradie.',
    dwarfTip: 'Skús ho odfotiť dva večery po sebe. Mesiace budú inde – uvidíš, ako obiehajú.',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/'
  },

  {
    id: 'albireo',
    name: 'Albireo',
    designation: 'β Cygni',
    type: 'doubleStar',
    subtypeLabel: 'Farebná dvojica hviezd',
    constellation: 'Labuť (Cygnus)',
    distanceText: 'približne 400 svetelných rokov',
    magnitude: '3,1 – okom jedna hviezda, ďalekohľadom dve',
    image: 'albireo',
    fact: 'Jedna z dvojice je modrá, druhá žltá. Astronómi zatiaľ nemajú isté, či sa naozaj obiehajú, alebo len ležia v rovnakom smere.',
    stellarium: 'V Stellariu napíš „Albireo“. Je to hlava Labute – v lete a na jeseň vysoko na oblohe.',
    dwarfTip: 'Krátka expozícia stačí. Skús nepreexponovať – inak sa farby zmenia na bielu.',
    source: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/'
  },

  {
    id: 'm1',
    name: 'Krabia hmlovina',
    designation: 'M1',
    type: 'supernova',
    subtypeLabel: 'Pozostatok supernovy',
    constellation: 'Býk (Taurus)',
    distanceText: '6 500 svetelných rokov',
    magnitude: '8,4 – len ďalekohľadom',
    image: 'm1',
    fact: 'Je to zvyšok výbuchu, ktorý ľudia videli v roku 1054. V jej strede zostala neutrónová hviezda, ktorá bliká 30-krát za sekundu.',
    stellarium: 'V Stellariu napíš „M1“. Nájdeš ju v zime pri hviezde Aldebaran v Býkovi.',
    dwarfTip: 'Je malá a slabá – potrebuje EQ režim a veľa snímok. Ale je to skutočný pozostatok výbuchu hviezdy.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/'
  },

  {
    id: 'sgra',
    name: 'Sagittarius A*',
    designation: 'Sgr A*',
    type: 'blackHole',
    subtypeLabel: 'Supermasívna čierna diera v strede našej galaxie',
    constellation: 'Strelec (Sagittarius)',
    distanceText: '27 000 svetelných rokov',
    magnitude: 'nevidno ju – zakrýva ju prach galaxie',
    image: 'sgra',
    fact: 'Váži ako štyri milióny Sĺnk. Prvú fotografiu zverejnili astronómi 12. mája 2022 – spojili osem observatórií do ďalekohľadu veľkého ako Zem.',
    stellarium: 'V Stellariu napíš „Sgr A*“. Uvidíš, kde v Strelcovi je stred našej galaxie.',
    dwarfTip: 'Samotnú čiernu dieru Dwarf neuvidí. Ale môžeš odfotiť oblasť v Strelcovi – smer, kde je stred galaxie.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/'
  },

  {
    id: 'm44',
    name: 'Jasličky',
    designation: 'M44',
    type: 'openCluster',
    subtypeLabel: 'Otvorená hviezdokopa',
    constellation: 'Rak (Cancer)',
    distanceText: '600 svetelných rokov',
    magnitude: '3,7 – za tmy viditeľná okom',
    image: 'm44',
    fact: 'Má okolo tisíc hviezd držaných pohromade len slabou gravitáciou. Do záberu Dwarfu sa zmestí krásne celá.',
    stellarium: 'V Stellariu napíš „M44“. Na jarnej oblohe je vysoko, medzi Levom a Blížencami.',
    dwarfTip: 'Ideálny cieľ na skúšanie nastavení – je jasná, veľká a hviezdy sú ostré, takže hneď vidíš, či si dobre zaostril.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-44/'
  },

  {
    id: 'sun',
    name: 'Slnko',
    designation: 'naša hviezda',
    type: 'star',
    subtypeLabel: 'Žltá hviezda – naša vlastná',
    constellation: 'nie je v súhvezdí – je to naše Slnko',
    distanceText: '150 miliónov km, čo je 8 svetelných minút',
    magnitude: 'najjasnejší objekt na nebi – NIKDY bez filtra!',
    image: 'sun',
    fact: 'Je asi 100-krát širšie ako Zem a na povrchu má okolo 5 500 °C. Slnečné škvrny sú chladnejšie miesta – najväčšie sú väčšie než celá Zem.',
    stellarium: 'V Stellariu si zapni Slnko a pozri sa, kedy je najvyššie – vtedy je vzduch najmenej rozvírený.',
    dwarfTip: 'Iba s priloženým ND filtrom a v režime Solar System. Bez filtra sa zničí senzor aj oči.',
    source: 'https://science.nasa.gov/sun/facts/'
  },

  {
    id: 'm27',
    name: 'Hmlovina Činka',
    designation: 'M27',
    type: 'nebula',
    kind: 'planetary',
    subtypeLabel: 'Planetárna hmlovina',
    constellation: 'Líška (Vulpecula)',
    distanceText: '1 200 svetelných rokov',
    magnitude: '7,5 – len ďalekohľadom',
    image: 'm27',
    fact: 'Ďalšia hviezda, ktorá odhodila svoje vonkajšie vrstvy. Je väčšia a jasnejšia než Prstencová hmlovina, takže sa fotí ľahšie.',
    stellarium: 'V Stellariu napíš „M27“. V lete a na jeseň je vysoko – dobrý tréning hľadania podľa súradníc.',
    dwarfTip: 'Skús ju najprv nájsť podľa súradníc a až potom podľa mena. Zvládne to aj bez EQ režimu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-27/'
  },

  {
    id: 'iss',
    name: 'Medzinárodná vesmírna stanica',
    designation: 'ISS',
    type: 'station',
    subtypeLabel: 'Obývaná vesmírna stanica',
    constellation: 'preletí cez celú oblohu za pár minút',
    distanceText: 'asi 400 km nad Zemou',
    magnitude: 'jasnejšia než väčšina hviezd – nebliká a rovnomerne letí',
    image: 'iss',
    fact: 'Obehne Zem raz za 90 minút, letí asi 8 km za sekundu a ľudia na nej žijú nepretržite od novembra 2000. Je dlhá 109 metrov.',
    stellarium: 'V Stellariu si zapni satelity a napíš „ISS“ – uvidíš, kedy dnes preletí nad vami.',
    dwarfTip: 'Na fotenie je príliš rýchla. Ale na snímke s dlhšou expozíciou po sebe zanechá pekný svetelný pruh.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/'
  },

  {
    id: 'sirius',
    name: 'Sirius',
    designation: 'α CMa',
    type: 'star',
    subtypeLabel: 'Najjasnejšia hviezda nočnej oblohy',
    constellation: 'Veľký pes (Canis Major)',
    distanceText: '8,6 svetelného roka',
    magnitude: '−1,5 – najjasnejšia hviezda vôbec',
    image: 'starBlue',
    fact: 'Je taký jasný hlavne preto, že je blízko. Obieha okolo neho biely karlík Sirius B, ktorý je 10 000-krát slabší.',
    stellarium: 'V Stellariu napíš „Sirius“. V zime ho nájdeš nízko na juhu, pod Orionom – najjasnejší bod na nebi.',
    dwarfTip: 'Nízko nad obzorom sa krásne „iskrí“ všetkými farbami. To nie je jeho vlastnosť – to robí náš nepokojný vzduch.',
    source: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/'
  },

  {
    id: 'peg51',
    name: '51 Pegasi',
    designation: '51 Peg',
    type: 'star',
    subtypeLabel: 'Hviezda s prvou objavenou exoplanétou',
    constellation: 'Pegas',
    distanceText: 'približne 50 svetelných rokov',
    magnitude: '5,5 – za tmy tesne na hranici voľného oka',
    image: 'transit',
    fact: 'Pri tejto hviezde našli v roku 1995 prvú planétu obiehajúcu okolo hviezdy podobnej Slnku. Samotnú planétu nevidíme – prezradila sa tým, ako hviezdou pohybuje.',
    stellarium: 'V Stellariu napíš „51 Pegasi“. Na jesennej oblohe je vysoko, v štvorci Pegasa.',
    dwarfTip: 'Uvidíš len bod. Ale je to bod, pri ktorom obieha cudzí svet – a ten bod si odfotil ty.',
    source: 'https://science.nasa.gov/exoplanets/'
  },

  {
    id: 'perseids',
    name: 'Perzeidy',
    designation: 'meteorický roj',
    type: 'meteorShower',
    subtypeLabel: 'Meteorický roj z kométy 109P/Swift-Tuttle',
    constellation: 'vyletujú zo súhvezdia Perzeus',
    distanceText: 'zhoria asi 80 km nad našimi hlavami',
    magnitude: 'za dobrej noci desiatky meteorov za hodinu',
    image: 'meteors',
    fact: 'Vrcholia 12. – 13. augusta, keď Zem prechádza cez prachovú stopu kométy 109P/Swift-Tuttle. Zrniečka vletia do atmosféry rýchlosťou 59 km za sekundu.',
    stellarium: 'V Stellariu nájdi súhvezdie Perzeus – odtiaľ budú meteory zdanlivo vyletovať.',
    dwarfTip: 'Meteor sa nedá „zamerať“. Nechaj Dwarf fotiť širokouhlo dlhé série a niektorý ti do záberu vletí sám.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/perseids/'
  }

  /* Ďalšie objekty (M45, M13, M31, M57…) sa pridávajú sem – rovnaká štruktúra. */
];

/* Pomocník: nájdi objekt podľa id */
function getObject(id) {
  return SPACE_OBJECTS.find(function (o) { return o.id === id; });
}

/* =============================================================================
   ČO JE PRÁVE TERAZ NA OBLOHE  (pre kartu „🌠 Dnes v noci“)
   -----------------------------------------------------------------------------
   Pre každý mesiac (0 = január) zoznam objektov, ktoré sú zo Slovenska
   (asi 48° severnej šírky) vo večerných hodinách dobre vysoko nad obzorom.
   Nie je to výpočet – je to odporúčanie. Presné časy vždy overte v Stellariu.
   ========================================================================== */
const SEASON_TIPS = [
  /* 0 január   */ { objects: ['m42', 'm45', 'm31', 'm1'],   note: 'Zimná obloha je najbohatšia na hmloviny. Orión je večer vysoko.' },
  /* 1 február  */ { objects: ['m42', 'm45', 'm44', 'm1'],   note: 'Orión ešte drží, na juhu sa objavujú hviezdokopy.' },
  /* 2 marec    */ { objects: ['m44', 'm45', 'm42', 'm51'],  note: 'Orión zapadá skoro po zotmení – s hmlovinami sa treba poponáhľať.' },
  /* 3 apríl    */ { objects: ['m51', 'm44', 'm13'],         note: 'Začína galaxiová sezóna: obloha je bez Mliečnej cesty a hlboký vesmír je čistý.' },
  /* 4 máj      */ { objects: ['m51', 'm13', 'm44'],         note: 'Ideálny čas na galaxie a na guľovú hviezdokopu M13.' },
  /* 5 jún      */ { objects: ['m13', 'm51'],                note: 'Najkrátke noci v roku – obloha úplne nesčernie. Skús Mesiac a planéty.' },
  /* 6 júl      */ { objects: ['m13', 'milkyway', 'm27'],    note: 'Mliečna cesta je večer vysoko. Odvezte sa za mesto, stojí to za to.' },
  /* 7 august   */ { objects: ['perseids', 'milkyway', 'm13', 'm27'], note: '12. – 13. augusta vrcholia Perzeidy. Mliečna cesta je najkrajšia v roku.' },
  /* 8 september*/ { objects: ['m31', 'milkyway', 'm27'],    note: 'Andromeda vychádza vysoko a noci sú už dosť dlhé.' },
  /* 9 október  */ { objects: ['m31', 'm45', 'm27'],         note: 'Andromeda a Plejády sú večer nádherné.' },
  /*10 november */ { objects: ['m31', 'm45', 'm42'],         note: 'Plejády sú vysoko, Orión začína vychádzať pred polnocou.' },
  /*11 december */ { objects: ['m42', 'm45', 'm31', 'm1'],   note: 'Najdlhšie noci v roku. Orión vychádza hneď po zotmení.' }
];
