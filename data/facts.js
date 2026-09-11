/* =============================================================================
   VÍŠ, ŽE?  (data/facts.js)
   -----------------------------------------------------------------------------
   Zajímavosti, které se dají „sbírat“. Odemknou se v lekci (krok type:'fact')
   a zůstanou navždy v 💡 Sbírce zajímavostí.

   JAK PŘIDAT NOVOU: zkopíruj položku, dej jí vlastní "id" a v lekci přidej
   krok { type:'fact', factId:'moje-id' }.
   Každá zajímavost MUSÍ mít zdroj – aplikace je vzdělávací.
   ========================================================================== */

const FACTS = {

  'svetlo-z-minulosti': {
    icon: '⏳',
    title: 'Díváš se do minulosti',
    text: 'Světlo z Orionovy mlhoviny letí k nám asi 1 300 let. Když vyrazilo na cestu, u nás ' +
          'ještě nestál Pražský hrad.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
    sourceLabel: 'NASA'
  },

  'hmloviny-recyklacia': {
    icon: '♻️',
    title: 'Vesmír recykluje',
    text: 'Atomy ve tvém těle byly kdysi uvnitř hvězd. Když hvězdy zemřely, rozfoukaly je do ' +
          'mlhovin – a z těch vznikly nové hvězdy, planety i ty.',
    source: 'https://spaceplace.nasa.gov/nebula/en',
    sourceLabel: 'NASA Space Place'
  },

  'zem-23-56': {
    icon: '🌍',
    title: 'Den nemá 24 hodin',
    text: 'Vůči hvězdám se Země otočí jednou za 23 hodin a 56 minut. Proto každá hvězda vychází ' +
          'každý večer o 4 minuty dřív – a obloha se nám za rok celá „přetočí“.',
    source: 'https://spaceplace.nasa.gov/days/en/',
    sourceLabel: 'NASA Space Place'
  },

  'polarka-najde-velky-voz': {
    icon: '🧭',
    title: 'Velký vůz ti ukáže Polárku',
    text: 'Dvě krajní hvězdy „kola“ Velkého vozu vždy ukazují na Polárku. Když je spojíš čárou a ' +
          'prodloužíš ji asi pětkrát, jsi tam.',
    source: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/',
    sourceLabel: 'NASA'
  },

  'polarka-tri-hviezdy': {
    icon: '⭐',
    title: 'Polárka jsou ve skutečnosti tři hvězdy',
    text: 'To, co vidíme jako jednu hvězdu, je trojice hvězd. Ta hlavní je veleobr a svítí víc ' +
          'než 2 000krát silněji než naše Slunce.',
    source: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/',
    sourceLabel: 'NASA'
  },

  'polarka-nebude-vzdy': {
    icon: '🧭',
    title: 'Polárka nebude Polárkou navždy',
    text: 'Zemská osa se kývá jako roztočená káča – jedno kývnutí trvá asi 26 000 let. Proto se ' +
          'severní hvězda mění: kdysi to byla Vega a asi za 12 000 let jí bude znovu.',
    source: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/',
    sourceLabel: 'NASA'
  },

  'dwarf-30mm': {
    icon: '🔭',
    title: 'Malý objektiv, velký dosah',
    text: 'Dwarf mini má objektiv široký jen 30 milimetrů – méně než dva a půl centimetru. Přesto ' +
          'dohlédne na mlhoviny tisíce světelných let daleko. Váží jen 840 gramů.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'eq-90-sekund': {
    icon: '⏱️',
    title: '90 sekund na jeden snímek',
    text: 'V EQ režimu dokáže Dwarf mini sbírat světlo 90 sekund v jednom snímku. Bez EQ režimu ' +
          'se hvězdy po 30 – 60 sekundách začnou točit do obloučků.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'stovky-snimok': {
    icon: '🧩',
    title: 'Jedna fotka = stovky fotek',
    text: 'Krásné fotky mlhovin nejsou jeden snímek. Jsou to desítky až stovky snímků složených ' +
          'na sobě – jako když přiložíš hodně slabých baterek a najednou je světlo.',
    source: 'https://esahubble.org/images/heic0601a/',
    sourceLabel: 'ESA/Hubble'
  },

  'plejady-sestry': {
    icon: '✨',
    title: 'Sedm sester, kterých je tisíc',
    text: 'Plejádám se říká Sedm sester – tolik hvězd v nich vidí volné oko. Ve skutečnosti jich ' +
          'je víc než tisíc a od Země jsou 445 světelných let.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/',
    sourceLabel: 'NASA'
  },

  'gulova-100tisic': {
    icon: '🔵',
    title: 'Sto tisíc hvězd v jedné kouli',
    text: 'Kulová hvězdokupa M13 má víc než 100 000 hvězd a je 25 000 světelných let daleko. ' +
          'Kdybys žil na planetě v jejím středu, obloha by byla plná jasných hvězd a nikdy by se ' +
          'pořádně nesetmělo.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/',
    sourceLabel: 'NASA'
  },

  'mliecna-cesta-pas': {
    icon: '🥛',
    title: 'Proč je to „dráha“',
    text: 'Ten světlý pás na nebi není mrak. To je disk naší galaxie, na který se díváme zvnitřku ' +
          '– zboku. Tmavá místa v něm jsou oblaka prachu, která zakrývají hvězdy za sebou.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html',
    sourceLabel: 'NASA'
  },

  'andromeda-25': {
    icon: '🌀',
    title: 'Nejvzdálenější věc, jakou uvidíš okem',
    text: 'Galaxie v Andromedě je 2,5 milionu světelných let daleko – a přesto ji za tmy vidíš ' +
          'volným okem. Její světlo vyrazilo na cestu, když na Zemi ještě nebyli lidé.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/',
    sourceLabel: 'NASA'
  },

  'zrazka-neisto': {
    icon: '❓',
    title: 'Věda se občas opraví',
    text: 'Dlouho se říkalo, že naše galaxie se za čtyři miliardy let určitě srazí s Andromedou. ' +
          'Nové výpočty z Hubbla a Gaii v roce 2025 ukázaly, že to není jisté – je to spíš 50 na ' +
          '50.',
    source: 'https://esahubble.org/news/heic2508/',
    sourceLabel: 'ESA/Hubble'
  },

  'saturn-prstence-tenke': {
    icon: '💿',
    title: 'Prstence jako list papíru',
    text: 'Saturnovy prstence jsou z miliard kousků ledu a kamene – od zrníček prachu po kusy ' +
          'velké jako dům. Sahají až 282 000 km od planety, ale tlusté jsou jen asi 10 metrů.',
    source: 'https://science.nasa.gov/saturn/facts/',
    sourceLabel: 'NASA'
  },

  'jupiter-galileo': {
    icon: '🔭',
    title: 'Čtyři měsíce, které změnily svět',
    text: 'Galileo v roce 1610 uviděl u Jupiteru čtyři body, které se každou noc přesouvaly. Byly ' +
          'to jeho měsíce – první měsíce objevené u jiné planety. Dnes jich Jupiter má oficiálně ' +
          '115.',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/',
    sourceLabel: 'NASA'
  },

  'mesiac-kratery': {
    icon: '🌙',
    title: 'Díry, které nikdy nezarostou',
    text: 'Měsíc je v průměru 384 400 km daleko a má jen velmi slabou atmosféru. Žádná voda ani ' +
          'vítr tam krátery nezahladí – proto tam zůstanou i miliardy let.',
    source: 'https://science.nasa.gov/moon/facts/',
    sourceLabel: 'NASA'
  },

  'farba-teplota': {
    icon: '🌈',
    title: 'Barva prozradí teplotu',
    text: 'Modré hvězdy jsou nejžhavější, žluté jako naše Slunce jsou střední a červené ' +
          'nejchladnější. Přesně naopak, než jak to máme na kohoutcích s vodou.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },

  'albireo-modra-zlta': {
    icon: '👯',
    title: 'Dvě hvězdy, dvě barvy',
    text: 'Albireo v souhvězdí Labutě je dvojice hvězd – jedna modrá, jedna žlutá. Pozor: některé ' +
          'dvojice se opravdu obíhají, jiné jen vypadají blízko a ve skutečnosti jsou od sebe ' +
          'strašně daleko.',
    source: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/',
    sourceLabel: 'NASA'
  },

  'krab-1054': {
    icon: '📜',
    title: 'Výbuch, který lidé viděli',
    text: 'V roce 1054 si čínští astronomové zapsali „hostující hvězdu“, kterou bylo téměř měsíc ' +
          'vidět i za dne. Byla to supernova – a dnes na jejím místě vidíme Krabí mlhovinu.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/',
    sourceLabel: 'NASA'
  },

  'pulzar-30x': {
    icon: '💫',
    title: 'Maják, který bliká 30krát za sekundu',
    text: 'Ve středu Krabí mlhoviny zůstala neutronová hvězda. Točí se tak rychle, že její ' +
          'paprsky k nám bliknou 30krát za sekundu – a plyn okolo ní letí polovinou rychlosti ' +
          'světla.',
    source: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/',
    sourceLabel: 'NASA'
  },

  'sgra-4mil': {
    icon: '⚫',
    title: 'Ve středu naší galaxie je černá díra',
    text: 'Jmenuje se Sagittarius A*, váží jako čtyři miliony Sluncí a je 27 000 světelných let ' +
          'daleko. Celou dobu tam byla potichu – první fotku z ní astronomové zveřejnili 12. ' +
          'května 2022.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/',
    sourceLabel: 'ESO / EHT'
  },

  'eht-zemsky-dalekohlad': {
    icon: '🌍',
    title: 'Dalekohled velký jako celá Země',
    text: 'Aby černou díru vůbec vyfotili, spojili astronomové osm rádiových observatoří po celé ' +
          'planetě do jednoho „dalekohledu velkého jako Země“ – a pozorovali mnoho hodin v kuse, ' +
          'jako při dlouhé expozici.',
    source: 'https://www.eso.org/public/news/eso2208-eht-mw/',
    sourceLabel: 'ESO / EHT'
  },

  /* ---------------- LEKCIA 10: DWARF NAOSTRO ---------------------------- */
  'dwarf-fov': {
    icon: '🔲',
    title: 'Dwarf vidí pět Měsíců vedle sebe',
    text: 'Dalekohledový režim zabere výsek oblohy široký 2,45 stupně – asi jako pět Měsíců v ' +
          'řadě. Proto se do něj Andromeda celá nevejde, ale Plejády ano.',
    source: 'https://www.skyatnightmagazine.com/reviews/dwarflab-dwarf-mini-smart-telescope',
    sourceLabel: 'BBC Sky at Night (parametry Dwarf mini)'
  },
  'dwarf-15s': {
    icon: '🎚️',
    title: 'Automatika ti dá jen 15 sekund',
    text: 'V automatickém režimu Dwarf nikdy neprodlouží expozici nad 15 sekund. Až když si ji ' +
          'nastavíš ručně, můžeš jít na 60 sekund – a v EQ režimu až na 90.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 11: SLNKO ------------------------------------ */
  'slnko-8-minut': {
    icon: '⏱️',
    title: 'Slunce vidíš vždy o 8 minut starší',
    text: 'Slunce je od nás asi 150 milionů kilometrů. Světlo letí 300 000 km za sekundu, takže ' +
          'cesta k nám mu trvá něco přes 8 minut.',
    source: 'https://science.nasa.gov/sun/facts/',
    sourceLabel: 'NASA'
  },
  'slnecne-skvrny': {
    icon: '🟤',
    title: 'Skvrny větší než Země',
    text: 'Sluneční skvrny jsou chladnější místa na povrchu Slunce. Bývají široké od 1 600 až do ' +
          '160 900 kilometrů – ta největší je tedy mnohem větší než celá Země. Asi každých 11 let ' +
          'jich je nejvíc.',
    source: 'https://science.nasa.gov/sun/facts/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCE 12: FÁZE -------------------------------------- */
  'mesiac-odvratena': {
    icon: '🌚',
    title: 'Odvrácenou stranu Měsíce ze Země nikdy neuvidíš',
    text: 'Měsíc se okolo své osy otočí přesně jednou za jeden oběh okolo Země. Proto k nám vždy ' +
          'otáčí tu samou stranu – tu druhou lidé uviděli poprvé až díky sondám.',
    source: 'https://science.nasa.gov/moon/moon-phases/',
    sourceLabel: 'NASA'
  },
  'mesiac-29-dni': {
    icon: '🌘',
    title: 'Fáze nedělá stín Země',
    text: 'Slunce vždy osvětluje přesně polovinu Měsíce. Mění se jen to, jak velkou část té ' +
          'osvětlené poloviny odtud vidíme. Celý cyklus osmi fází trvá 29,5 dne.',
    source: 'https://science.nasa.gov/moon/moon-phases/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCE 13: ČTENÍ OBLOHY ----------------------------- */
  '88-suhvezdi': {
    icon: '🗺️',
    title: 'Obloha je rozdělená na 88 dílů',
    text: 'Astronomové se dohodli na 88 oficiálních souhvězdích, která pokrývají celou oblohu ' +
          'jako dílky puzzle. Nejsou to obrázky na nebi – jsou to políčka na mapě.',
    source: 'https://starchild.gsfc.nasa.gov/docs/StarChild/questions/88constellations.html',
    sourceLabel: 'NASA StarChild'
  },
  'obloha-adresa': {
    icon: '📍',
    title: 'Každý objekt má na nebi adresu',
    text: 'Jako má město zeměpisnou šířku a délku, tak má objekt na nebi rektascenzi a deklinaci. ' +
          'Když je zadáš, Dwarf se tam otočí sám.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 14: ISS -------------------------------------- */
  'iss-16-vychodov': {
    icon: '🌅',
    title: 'Astronauti vidí 16 východů Slunce denně',
    text: 'Vesmírná stanice oběhne Zemi jednou za 90 minut a letí rychlostí asi 8 kilometrů za ' +
          'sekundu. Za 24 hodin tedy udělá 16 oběhů – a 16krát pro ni vyjde a zapadne Slunce.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/',
    sourceLabel: 'NASA'
  },
  'iss-od-2000': {
    icon: '🏠',
    title: 'Nad námi někdo bydlí od roku 2000',
    text: 'Na Mezinárodní vesmírné stanici žijí lidé nepřetržitě od listopadu 2000. Je dlouhá 109 ' +
          'metrů – větší než dům se šesti ložnicemi.',
    source: 'https://www.nasa.gov/international-space-station/space-station-facts-and-figures/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 15: ASTROFOTO -------------------------------- */
  'darkframe': {
    icon: '⬛',
    title: 'I tma se musí vyfotit',
    text: 'Senzor má vlastní šum, který je třeba odečíst. Proto se fotí „dark framy“ – snímky se ' +
          'zakrytým objektivem. Musí mít stejnou expozici, gain i teplotu (do ±8 °C), jinak ' +
          'nepomůžou.',
    source: 'https://help.dwarflab.com/en/docs/DWARF-mini-Smart-Telescope-User-Manual',
    sourceLabel: 'DwarfLab – manuál'
  },

  /* ---------------- LEKCIA 16: SPEKTRUM -------------------------------- */
  'helium-slnko': {
    icon: '🎈',
    title: 'Helium našli nejdřív na Slunci',
    text: 'Ve světle Slunce objevili astronomové čáru, která nepatřila žádnému známému prvku. ' +
          'Nazvali ho helium – podle řeckého boha Slunce Hélia. Na Zemi ho našli až o desítky let ' +
          'později.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },
  'spektrum-carky': {
    icon: '🌈',
    title: 'Světlo je otisk prstu',
    text: 'Když rozložíš světlo hvězdy na barvy, objeví se v něm tmavé čáry. Každý prvek dělá ' +
          'svůj vlastní vzor – tak víme, z čeho je hvězda, i když tam nikdy nikdo nebyl.',
    source: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCIA 17: VZDIALENOSTI ---------------------------- */
  'svetelny-rok-946': {
    icon: '📏',
    title: 'Jeden světelný rok = 9,46 bilionu km',
    text: 'Světlo letí 300 000 kilometrů za sekundu. Za rok tedy proletí 9,46 bilionu kilometrů. ' +
          'To je vzdálenost, ne čas – i když to podle jména tak vypadá.',
    source: 'https://science.nasa.gov/exoplanets/what-is-a-light-year/',
    sourceLabel: 'NASA'
  },
  'proxima-4-25': {
    icon: '🚶',
    title: 'K nejbližší hvězdě bys letěl 4,25 roku – světlem',
    text: 'Slunce je od nás 8 světelných minut. Další nejbližší hvězda, Proxima Centauri, je 4,25 ' +
          'světelného roku. Mezi hvězdami je opravdu hodně prázdno.',
    source: 'https://science.nasa.gov/exoplanets/what-is-a-light-year/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCE 18: KDE JSME VE VESMÍRU ---------------------- */
  'vesmir-94': {
    icon: '🫧',
    title: 'Vesmír je větší, než jak dlouho existuje',
    text: 'Vesmír je starý asi 13,8 miliardy let, ale oblast, kterou vidíme, je široká okolo 94 ' +
          'miliard světelných let. Není to chyba – prostor se během letu toho světla stále ' +
          'rozpínal.',
    source: 'https://imagine.gsfc.nasa.gov/educators/programs/cosmictimes/educators/guide/age_size.html',
    sourceLabel: 'NASA'
  },
  'sirius-8-6': {
    icon: '🐕',
    title: 'Nejjasnější hvězda je i jedna z nejbližších',
    text: 'Sirius je nejjasnější hvězda noční oblohy – a to hlavně proto, že je blízko: 8,6 ' +
          'světelného roku. Obíhá okolo něj i malý bílý trpaslík Sirius B.',
    source: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCE 19: EXOPLANETY ------------------------------- */
  'exoplanet-6000': {
    icon: '🪐',
    title: 'Známe už přes 6 000 cizích planet',
    text: 'První planetu u hvězdy podobné Slunci našli v roce 1995. Dnes jich je potvrzených víc ' +
          'než 6 000 – a to je jen maličký zlomek z těch, které tam podle vědců jsou.',
    source: 'https://science.nasa.gov/exoplanets/',
    sourceLabel: 'NASA'
  },
  'zlatovlaska-zona': {
    icon: '🥣',
    title: 'Zóna Zlatovlásky',
    text: 'Okolo každé hvězdy je pásmo, kde není příliš horko ani příliš zima a voda může být ' +
          'tekutá. Astronomové mu říkají obyvatelná zóna – nebo zóna Zlatovlásky, jako v té ' +
          'pohádce s kaší.',
    source: 'https://science.nasa.gov/exoplanets/',
    sourceLabel: 'NASA'
  },

  /* ---------------- LEKCE 20: KOMETY A METEORY ------------------------- */
  'kometa-dva-chvosty': {
    icon: '☄️',
    title: 'Kometa má dva ohony – a nikdy ne za sebou',
    text: 'Kometa je zmrzlá kule ledu a prachu stará 4,6 miliardy let. U Slunce se začne ' +
          'vypařovat a vyrostou jí dva ohony: prachový a plynový. Vždy směřují od Slunce – i když ' +
          'kometa už letí zpátky.',
    source: 'https://science.nasa.gov/solar-system/comets/facts/',
    sourceLabel: 'NASA'
  },
  'perzeidy': {
    icon: '🌠',
    title: 'V srpnu letíme přes ohon komety',
    text: 'Perseidy vrcholí 12. – 13. srpna, když Země prochází prachovou stopou komety ' +
          '109P/Swift-Tuttle. Zrníčka do atmosféry vletí rychlostí 59 km za sekundu a shoří.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/perseids/',
    sourceLabel: 'NASA'
  },
  'meteorit-kosice': {
    icon: '🇸🇰',
    title: 'Meteorit dopadl i u Příbrami',
    text: '7. dubna 1959 přeletěl nad středními Čechami bolid mnohem jasnější než Měsíc v úplňku. ' +
          'Vědci pak našli čtyři úlomky o celkové hmotnosti 5,8 kilogramu – kamenný meteorit typu ' +
          'H5. Byl to první meteorit na světě, u kterého se z fotografií podařilo vypočítat ' +
          'dráhu.',
    source: 'https://vedanadosah.cvtisr.sk/pred-10-rokmi-k-nam-priletel-vyznamny-meteorit-kosice',
    sourceLabel: 'Astronomický ústav AV ČR'
  },

  /* ---------------- LEKCE 21: TMAVÁ OBLOHA ----------------------------- */
  'meteorov-44-ton': {
    icon: '⚖️',
    title: 'Na Zem denně dopadne 44 tun vesmíru',
    text: 'Každý den na Zem dopadne asi 44 000 kilogramů meteorického materiálu. Většina je ale ' +
          'tak malá, že si toho vůbec nevšimneme.',
    source: 'https://science.nasa.gov/solar-system/meteors-meteorites/facts/',
    sourceLabel: 'NASA'
  },
  'poloniny': {
    icon: '🌑',
    title: 'I u nás máme oblast tmavé oblohy',
    text: 'Jizerská oblast tmavé oblohy vznikla v roce 2009 – je to místo, kde se svítí tak, aby ' +
          'zůstala tma. Leží zpola v Česku a zpola v Polsku a byla první mezinárodní oblastí ' +
          'tmavé oblohy na světě. Rozdíl mezi oblohou ve městě a tam je desítky hvězd versus ' +
          'tisíce.',
    source: 'https://www.nppoloniny.sk/sprava-np-2/park-tmavej-oblohy-poloniny/',
    sourceLabel: 'Jizerská oblast tmavé oblohy'
  },

  /* ---------------- LEKCE 22: DALEKOHLEDY ------------------------------ */
  'hubble-webb': {
    icon: '🛰️',
    title: 'Jeden létá nízko, druhý strašně daleko',
    text: 'Hubble má zrcadlo široké 2,4 metru a obíhá asi 560 km nad Zemí. Webb odletěl 25. ' +
          'prosince 2021 až 1,5 milionu kilometrů od Země a vidí v infračerveném světle – proto ' +
          'dohlédne tam, kam Hubble ne.',
    source: 'https://science.nasa.gov/mission/webb/',
    sourceLabel: 'NASA'
  },
  'dwarf-bratranec': {
    icon: '👨‍👦',
    title: 'Tvůj Dwarf je jejich malý bratranec',
    text: 'Sbírat světlo dlouho, složit hodně snímků, přesně sledovat oblohu – to samé dělá ' +
          'Hubble, Webb i tvůj Dwarf. Rozdíl je jen v tom, jak velké mají zrcadlo a kolik stály.',
    source: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope',
    sourceLabel: 'DwarfLab'
  },

  'nasa-galaxia': {
    icon: '🌌',
    title: 'Kde vlastně žijeme',
    text: 'Naše galaxie se jmenuje Mléčná dráha. Je to spirála s příčkou ve středu a má v průměru ' +
          'asi 100 000 světelných let. Slunce je asi 26 000 světelných let od jejího středu – ' +
          'tedy někde na předměstí.',
    source: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html',
    sourceLabel: 'NASA'
  }
};
