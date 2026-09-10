/* =============================================================================
   VIEŠ ŽE?  (data/facts.js)
   -----------------------------------------------------------------------------
   Zaujímavosti, ktoré sa dajú „zbierať“. Odomknú sa v lekcii (krok type:'fact')
   a zostanú navždy v 💡 Zbierke zaujímavostí.

   AKO PRIDAŤ NOVÚ: skopíruj položku, daj jej vlastné "id" a v lekcii pridaj
   krok { type:'fact', factId:'moje-id' }.
   Každá zaujímavosť MUSÍ mať zdroj – appka je vzdelávacia.
   ========================================================================== */

const FACTS = {

  'svetlo-z-minulosti': {
    icon: '⏳',
    title: 'Pozeráš do minulosti',
    text: 'Svetlo z Orionovej hmloviny letí k nám okolo 1 300 rokov. Keď vyrazilo na cestu, na Slovensku ešte nestál žiadny hrad.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
    sourceLabel: 'NASA'
  },

  'hmloviny-recyklacia': {
    icon: '♻️',
    title: 'Vesmír recykluje',
    text: 'Atómy vo tvojom tele boli kedysi vnútri hviezd. Keď hviezdy zomreli, rozfúkli ich do hmlovín – a z tých vznikli nové hviezdy, planéty aj ty.',
    source: 'https://spaceplace.nasa.gov/nebula/en',
    sourceLabel: 'NASA Space Place'
  },

  'zem-23-56': {
    icon: '🌍',
    title: 'Deň nemá 24 hodín',
    text: 'Voči hviezdam sa Zem otočí raz za 23 hodín a 56 minút. Preto každá hviezda vychádza každý večer o 4 minúty skôr – a obloha sa nám za rok celá „pretočí“.',
    source: 'https://spaceplace.nasa.gov/days/en/',
    sourceLabel: 'NASA Space Place'
  },

  'polarka-najde-velky-voz': {
    icon: '🧭',
    title: 'Veľký voz ti ukáže Polárku',
    text: 'Dve krajné hviezdy „kolesa“ Veľkého voza vždy ukazujú na Polárku. Keď ich spojíš čiarou a predĺžiš ju asi päťkrát, si tam.',
    source: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/',
    sourceLabel: 'NASA'
  },

  'polarka-tri-hviezdy': {
    icon: '⭐',
    title: 'Polárka je v skutočnosti tri hviezdy',
    text: 'To, čo vidíme ako jednu hviezdu, je trojica hviezd. Tá hlavná je nadhviezda a svieti viac než 2 000-krát silnejšie ako naše Slnko.',
    source: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/',
    sourceLabel: 'NASA'
  },

  'polarka-nebude-vzdy': {
    icon: '🧭',
    title: 'Polárka nebude Polárkou navždy',
    text: 'Zemská os sa kýve ako roztočený vlk – jedno kývnutie trvá asi 26 000 rokov. Preto sa severná hviezda mení: kedysi to bola Vega a asi za 12 000 rokov ňou bude znova.',
    source: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/',
    sourceLabel: 'NASA'
  },

  'dwarf-30mm': {
    icon: '🔭',
    title: 'Malý objektív, veľký dosah',
    text: 'Dwarf mini má objektív široký len 30 milimetrov – menej ako dva centimetre a pol. Aj tak dovidí na hmloviny tisíce svetelných rokov ďaleko. Váži len 840 gramov.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'eq-90-sekund': {
    icon: '⏱️',
    title: '90 sekúnd na jednu snímku',
    text: 'V EQ režime dokáže Dwarf mini zbierať svetlo 90 sekúnd v jednej snímke. Bez EQ režimu sa hviezdy po 30 – 60 sekundách začnú točiť do oblúčikov.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'stovky-snimok': {
    icon: '🧩',
    title: 'Jedna fotka = stovky fotiek',
    text: 'Krásne fotky hmlovín nie sú jedna snímka. Sú to desiatky až stovky snímok zložených na sebe – ako keď priložíš veľa slabých bateriek a naraz je svetlo.',
    source: 'https://esahubble.org/images/heic0601a/',
    sourceLabel: 'ESA/Hubble'
  },

  'plejady-sestry': {
    icon: '✨',
    title: 'Sedem sestier, ktorých je tisíc',
    text: 'Plejádam sa hovorí Sedem sestier – toľko hviezd v nich vidí voľné oko. V skutočnosti ich je viac ako tisíc a od Zeme sú 445 svetelných rokov.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/',
    sourceLabel: 'NASA'
  },

  'gulova-100tisic': {
    icon: '🔵',
    title: 'Stotisíc hviezd v jednej guli',
    text: 'Guľová hviezdokopa M13 má viac ako 100 000 hviezd a je 25 000 svetelných rokov daleko. Keby si žil na planéte v jej strede, obloha by bola plná jasných hviezd a nikdy by sa poriadne nezotmelo.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/',
    sourceLabel: 'NASA'
  },

  'mliecna-cesta-pas': {
    icon: '🥛',
    title: 'Prečo je to „cesta“',
    text: 'Ten svetlý pás na nebi nie je mrak. To je disk našej galaxie, na ktorý pozeráme zvnútra – zboku. Tmavé miesta v ňom sú oblaky prachu, ktoré zakrývajú hviezdy za sebou.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html',
    sourceLabel: 'NASA'
  },

  'andromeda-25': {
    icon: '🌀',
    title: 'Najvzdialenejšia vec, akú uvidíš okom',
    text: 'Galaxia v Andromede je 2,5 milióna svetelných rokov daleko – a aj tak ju za tmy vidno voľným okom. Jej svetlo vyrazilo na cestu, keď na Zemi ešte neboli ľudia.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/',
    sourceLabel: 'NASA'
  },

  'zrazka-neisto': {
    icon: '❓',
    title: 'Veda sa občas opraví',
    text: 'Dlho sa hovorilo, že naša galaxia sa o štyri miliardy rokov určite zrazí s Andromedou. Nové výpočty z Hubbla a Gaie v roku 2025 ukázali, že to nie je isté – je to skôr 50 na 50.',
    source: 'https://esahubble.org/news/heic2508/',
    sourceLabel: 'ESA/Hubble'
  },

  'saturn-prstence-tenke': {
    icon: '💿',
    title: 'Prstence ako list papiera',
    text: 'Saturnove prstence sú z miliárd kúskov ľadu a kameňa – od zrniečok prachu po kusy veľké ako dom. Siahajú až 282 000 km od planéty, ale hrubé sú len asi 10 metrov.',
    source: 'https://science.nasa.gov/saturn/facts/',
    sourceLabel: 'NASA'
  },

  'jupiter-galileo': {
    icon: '🔭',
    title: 'Štyri mesiace, ktoré zmenili svet',
    text: 'Galileo v roku 1610 uvidel pri Jupiteri štyri body, ktoré sa každú noc presúvali. Boli to jeho mesiace – prvé mesiace objavené pri inej planéte. Dnes ich Jupiter má oficiálne 115.',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/',
    sourceLabel: 'NASA'
  },

  'mesiac-kratery': {
    icon: '🌙',
    title: 'Diery, ktoré nikdy nezarastú',
    text: 'Mesiac je v priemere 384 400 km daleko a má len veľmi slabú atmosféru. Žiadny dážď ani vietor tam krátery nezahladí – preto tam zostanú aj miliardy rokov.',
    source: 'https://science.nasa.gov/moon/facts/',
    sourceLabel: 'NASA'
  },

  'farba-teplota': {
    icon: '🌈',
    title: 'Farba prezradí teplotu',
    text: 'Modré hviezdy sú najhorúcejšie, žlté ako naše Slnko sú stredné a červené najchladnejšie. Presne naopak, ako to máme na kohútikoch s vodou.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },

  'albireo-modra-zlta': {
    icon: '👯',
    title: 'Dve hviezdy, dve farby',
    text: 'Albireo v súhvezdí Labuť je dvojica hviezd – jedna modrá, jedna žltá. Pozor: niektoré dvojice sa naozaj obiehajú, iné len vyzerajú blízko a v skutočnosti sú od seba strašne daleko.',
    source: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/',
    sourceLabel: 'NASA'
  },

  'krab-1054': {
    icon: '📜',
    title: 'Výbuch, ktorý ľudia videli',
    text: 'V roku 1054 si čínski astronómi zapísali „hosťujúcu hviezdu“, ktorú bolo takmer mesiac vidno aj cez deň. Bola to supernova – a dnes na jej mieste vidíme Krabiu hmlovinu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/',
    sourceLabel: 'NASA'
  },

  'pulzar-30x': {
    icon: '💫',
    title: 'Maják, ktorý bliká 30-krát za sekundu',
    text: 'V strede Krabej hmloviny zostala neutrónová hviezda. Točí sa tak rýchlo, že jej lúče k nám bliknú 30-krát za sekundu – a plyn okolo nej letí polovicou rýchlosti svetla.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/',
    sourceLabel: 'NASA'
  },

  'sgra-4mil': {
    icon: '⚫',
    title: 'V strede našej galaxie je čierna diera',
    text: 'Volá sa Sagittarius A*, váži ako štyri milióny Sĺnk a je 27 000 svetelných rokov daleko. Celý čas tam bola potichu – prvú fotku z nej astronómi zverejnili 12. mája 2022.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/',
    sourceLabel: 'ESO / EHT'
  },

  'eht-zemsky-dalekohlad': {
    icon: '🌍',
    title: 'Ďalekohľad veľký ako celá Zem',
    text: 'Aby čiernu dieru vôbec vyfotili, spojili astronómi osem rádiových observatórií po celej planéte do jedného „ďalekohľadu veľkého ako Zem“ – a pozorovali veľa hodín v kuse, ako pri dlhej expozícii.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/',
    sourceLabel: 'ESO / EHT'
  },

  /* ---------------- LEKCIA 10: DWARF NAOSTRO ---------------------------- */
  'dwarf-fov': {
    icon: '🔲',
    title: 'Dwarf vidí päť Mesiacov vedľa seba',
    text: 'Ďalekohľadový režim zaberie výsek oblohy široký 2,45 stupňa – asi ako päť Mesiacov v rade. Preto sa doň Andromeda celá nezmestí, ale Plejády áno.',
    source: 'https://www.skyatnightmagazine.com/reviews/dwarflab-dwarf-mini-smart-telescope',
    sourceLabel: 'BBC Sky at Night (parametre Dwarf mini)'
  },
  'dwarf-15s': {
    icon: '🎚️',
    title: 'Automatika ti dá len 15 sekúnd',
    text: 'V automatickom režime Dwarf nikdy nepredĺži expozíciu nad 15 sekúnd. Až keď si ju nastavíš ručne, môžeš ísť na 60 sekúnd – a v EQ režime až na 90.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 11: SLNKO ------------------------------------ */
  'slnko-8-minut': {
    icon: '⏱️',
    title: 'Slnko vidíš vždy o 8 minút staršie',
    text: 'Slnko je od nás asi 150 miliónov kilometrov. Svetlo letí 300 000 km za sekundu, takže cesta k nám mu trvá niečo cez 8 minút.',
    source: 'https://science.nasa.gov/sun/facts/',
    sourceLabel: 'NASA'
  },
  'slnecne-skvrny': {
    icon: '🟤',
    title: 'Škvrny väčšie ako Zem',
    text: 'Slnečné škvrny sú chladnejšie miesta na povrchu Slnka. Bývajú široké od 1 600 až do 160 900 kilometrov – tá najväčšia je teda oveľa väčšia než celá Zem. Asi každých 11 rokov ich je najviac.',
    source: 'https://science.nasa.gov/sun/facts/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 12: FÁZY ------------------------------------- */
  'mesiac-odvratena': {
    icon: '🌚',
    title: 'Odvrátenú stranu Mesiaca zo Zeme nikdy neuvidíš',
    text: 'Mesiac sa okolo svojej osi otočí presne raz za jeden obeh okolo Zeme. Preto k nám vždy otáča tú istú stranu – tú druhú ľudia uvideli prvýkrát až vďaka sondám.',
    source: 'https://science.nasa.gov/moon/moon-phases/',
    sourceLabel: 'NASA'
  },
  'mesiac-29-dni': {
    icon: '🌘',
    title: 'Fázy nerobí tieň Zeme',
    text: 'Slnko vždy osvetľuje presne polovicu Mesiaca. Mení sa len to, akú veľkú časť tej osvetlenej polovice odtiaľto vidíme. Celý kolobeh ôsmich fáz trvá 29,5 dňa.',
    source: 'https://science.nasa.gov/moon/moon-phases/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 13: ČÍTANIE OBLOHY -------------------------- */
  '88-suhvezdi': {
    icon: '🗺️',
    title: 'Obloha je rozdelená na 88 dielov',
    text: 'Astronómi sa dohodli na 88 oficiálnych súhvezdiach, ktoré pokrývajú celú oblohu ako dieliky puzzle. Nie sú to obrázky na nebi – sú to políčka na mape.',
    source: 'https://starchild.gsfc.nasa.gov/docs/StarChild/questions/88constellations.html',
    sourceLabel: 'NASA StarChild'
  },
  'obloha-adresa': {
    icon: '📍',
    title: 'Každý objekt má na nebi adresu',
    text: 'Ako má mesto zemepisnú šírku a dĺžku, tak má objekt na nebi rektascenziu a deklináciu. Keď ich zadáš, Dwarf sa tam otočí sám.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 14: ISS -------------------------------------- */
  'iss-16-vychodov': {
    icon: '🌅',
    title: 'Astronauti vidia 16 východov Slnka denne',
    text: 'Vesmírna stanica obehne Zem raz za 90 minút a letí rýchlosťou asi 8 kilometrov za sekundu. Za 24 hodín teda urobí 16 obehov – a 16-krát pre ňu vyjde a zapadne Slnko.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/',
    sourceLabel: 'NASA'
  },
  'iss-od-2000': {
    icon: '🏠',
    title: 'Nad nami býva niekto od roku 2000',
    text: 'Na Medzinárodnej vesmírnej stanici žijú ľudia nepretržite od novembra 2000. Je dlhá 109 metrov – väčšia ako dom so šiestimi spálňami.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 15: ASTROFOTO -------------------------------- */
  'darkframe': {
    icon: '⬛',
    title: 'Aj tma sa musí odfotiť',
    text: 'Senzor má vlastný šum, ktorý treba odpočítať. Preto sa fotia „dark framy“ – snímky so zakrytým objektívom. Musia mať rovnakú expozíciu, gain aj teplotu (do ±8 °C), inak nepomôžu.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 16: SPEKTRUM -------------------------------- */
  'helium-slnko': {
    icon: '🎈',
    title: 'Hélium našli najprv na Slnku',
    text: 'V svetle Slnka objavili astronómi čiaru, ktorá nepatrila žiadnemu známemu prvku. Nazvali ho hélium – podľa gréckeho boha Slnka Hélia. Na Zemi ho našli až o desiatky rokov neskôr.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },
  'spektrum-carky': {
    icon: '🌈',
    title: 'Svetlo je odtlačok prsta',
    text: 'Keď rozložíš svetlo hviezdy na farby, objavia sa v ňom tmavé čiary. Každý prvok robí svoj vlastný vzor – tak vieme, z čoho je hviezda, hoci tam nikto nikdy nebol.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 17: VZDIALENOSTI ---------------------------- */
  'svetelny-rok-946': {
    icon: '📏',
    title: 'Jeden svetelný rok = 9,46 bilióna km',
    text: 'Svetlo letí 300 000 kilometrov za sekundu. Za rok teda preletí 9,46 bilióna kilometrov. To je vzdialenosť, nie čas – hoci to podľa mena tak vyzerá.',
    source: 'https://science.nasa.gov/exoplanets/what-is-a-light-year/',
    sourceLabel: 'NASA'
  },
  'proxima-4-25': {
    icon: '🚶',
    title: 'K najbližšej hviezde by si letel 4,25 roka – svetlom',
    text: 'Slnko je od nás 8 svetelných minút. Ďalšia najbližšia hviezda, Proxima Centauri, je 4,25 svetelného roka. Medzi hviezdami je naozaj veľmi prázdno.',
    source: 'https://science.nasa.gov/exoplanets/what-is-a-light-year/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 18: KDE SME VO VESMÍRE ---------------------- */
  'vesmir-94': {
    icon: '🫧',
    title: 'Vesmír je väčší, než ako dlho existuje',
    text: 'Vesmír je starý asi 13,8 miliardy rokov, ale oblasť, ktorú vidíme, je široká okolo 94 miliárd svetelných rokov. Nie je to chyba – priestor sa počas letu toho svetla stále rozpínal.',
    source: 'https://imagine.gsfc.nasa.gov/educators/programs/cosmictimes/educators/guide/age_size.html',
    sourceLabel: 'NASA'
  },
  'sirius-8-6': {
    icon: '🐕',
    title: 'Najjasnejšia hviezda je aj jedna z najbližších',
    text: 'Sirius je najjasnejšia hviezda nočnej oblohy – a to hlavne preto, že je blízko: 8,6 svetelného roka. Obieha okolo neho aj malý biely karlík Sirius B.',
    source: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 19: EXOPLANÉTY ------------------------------ */
  'exoplanet-6000': {
    icon: '🪐',
    title: 'Poznáme už vyše 6 000 cudzích planét',
    text: 'Prvú planétu pri hviezde podobnej Slnku našli v roku 1995. Dnes ich je potvrdených viac než 6 000 – a to je len maličký zlomok z tých, ktoré tam podľa vedcov sú.',
    source: 'https://science.nasa.gov/exoplanets/',
    sourceLabel: 'NASA'
  },
  'zlatovlaska-zona': {
    icon: '🥣',
    title: 'Zóna Zlatovlásky',
    text: 'Okolo každej hviezdy je pásmo, kde nie je príliš horúco ani príliš zima a voda môže byť tekutá. Astronómi mu hovoria obývateľná zóna – alebo zóna Zlatovlásky, ako v tej rozprávke s kašou.',
    source: 'https://science.nasa.gov/exoplanets/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 20: KOMÉTY A METEORY ------------------------ */
  'kometa-dva-chvosty': {
    icon: '☄️',
    title: 'Kométa má dva chvosty – a nikdy nie za sebou',
    text: 'Kométa je zmrznutá guľa ľadu a prachu stará 4,6 miliardy rokov. Pri Slnku sa začne vyparovať a vyrastú jej dva chvosty: prachový a plynový. Vždy smerujú od Slnka – aj keď kométa už letí naspäť.',
    source: 'https://science.nasa.gov/solar-system/comets/facts/',
    sourceLabel: 'NASA'
  },
  'perzeidy': {
    icon: '🌠',
    title: 'V auguste letíme cez chvost kométy',
    text: 'Perzeidy vrcholia 12. – 13. augusta, keď Zem prechádza cez prachovú stopu kométy 109P/Swift-Tuttle. Zrniečka do atmosféry vletia rýchlosťou 59 km za sekundu a zhoria.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/perseids/',
    sourceLabel: 'NASA'
  },
  'meteorit-kosice': {
    icon: '🇸🇰',
    title: 'Meteorit dopadol aj na Slovensko',
    text: '28. februára 2010 preletel nad Košicami bolid tisíckrát jasnejší ako Mesiac v splne. Vedci potom našli 218 úlomkov o celkovej hmotnosti 11,28 kilogramu – je to kamenný meteorit typu H5.',
    source: 'https://vedanadosah.cvtisr.sk/pred-10-rokmi-k-nam-priletel-vyznamny-meteorit-kosice',
    sourceLabel: 'VEDA NA DOSAH / SAV'
  },

  /* ---------------- LEKCIA 21: TMAVÁ OBLOHA ---------------------------- */
  'meteorov-44-ton': {
    icon: '⚖️',
    title: 'Na Zem denne dopadne 44 ton vesmíru',
    text: 'Každý deň na Zem dopadne asi 44 000 kilogramov meteorického materiálu. Väčšina je ale taká malá, že to vôbec nezbadáme.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/facts/',
    sourceLabel: 'NASA'
  },
  'poloniny': {
    icon: '🌑',
    title: 'Na Slovensku máme park tmavej oblohy',
    text: 'V Poloninách je Park tmavej oblohy – miesto, kde sa svieti tak, aby zostala tma. Rozdiel medzi oblohou v meste a tam je desiatky hviezd verzus tisíce.',
    source: 'https://www.nppoloniny.sk/sprava-np-2/park-tmavej-oblohy-poloniny/',
    sourceLabel: 'NP Poloniny'
  },

  /* ---------------- LEKCIA 22: ĎALEKOHĽADY ----------------------------- */
  'hubble-webb': {
    icon: '🛰️',
    title: 'Jeden lieta nízko, druhý strašne daleko',
    text: 'Hubble má zrkadlo široké 2,4 metra a obieha asi 560 km nad Zemou. Webb odletel 25. decembra 2021 až 1,5 milióna kilometrov od Zeme a vidí v infračervenom svetle – preto dovidí tam, kam Hubble nie.',
    source: 'https://science.nasa.gov/mission/webb/',
    sourceLabel: 'NASA'
  },
  'dwarf-bratranec': {
    icon: '👨‍👦',
    title: 'Tvoj Dwarf je ich malý bratranec',
    text: 'Zbierať svetlo dlho, poskladať veľa snímok, presne sledovať oblohu – to isté robí Hubble, Webb aj tvoj Dwarf. Rozdiel je len v tom, aké veľké majú zrkadlo a koľko stáli.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'nasa-galaxia': {
    icon: '🌌',
    title: 'Kde vlastne žijeme',
    text: 'Naša galaxia sa volá Mliečna cesta. Je to špirála s priečkou v strede a má v priemere asi 100 000 svetelných rokov. Slnko je asi 26 000 svetelných rokov od jej stredu – teda niekde na predmestí.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html',
    sourceLabel: 'NASA'
  }
};
