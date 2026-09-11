/* =============================================================================
   INTERAKTIVNÍ ÚLOHY – OBSAH  (data/sims.js)
   -----------------------------------------------------------------------------
   Tady jsou TEXTY a NASTAVENÍ simulací. Samotné kreslení je v sim-engine.js
   (jedna funkce na simulaci). V lekci se použije krokem:

       { type: 'sim', simId: 'fotolab', xp: 25 }

   Ovladače (controls):
     { id, label, values:[…], unit, start }          – posuvník s hodnotami
     { id, label, options:['AZ','EQ'], start:'AZ' }  – přepínač
     { id, label, min, max, step, start, unit }      – plynulý posuvník

   challenge – nepovinná výzva: když ji splní, dostane bonusové XP.
   ========================================================================== */

const SIMS = {

  /* ---------------------------------------------------------------- FOTOLAB */
  fotolab: {
    title: '🎛️ FOTOLAB',
    lead: 'Nastav Dwarf jako při skutečném fotografování a pozoruj, jak se fotka mění. Nic se ' +
          'nedá pokazit – zkoušej, dokud to nebude vypadat dobře.',
    target: 'Cíl: M42 Orionova mlhovina',
    controls: [
      { id: 'exp',    label: 'Expozice',   unit: 's', values: [2, 5, 15, 30, 60, 90], start: 2 },
      { id: 'gain',   label: 'Gain',        values: [20, 40, 60, 80, 100, 120], start: 20 },
      { id: 'frames', label: 'Počet snímků', values: [10, 50, 100, 200, 400], start: 10 },
      { id: 'mode',   label: 'Režim sledování', options: ['AZ', 'EQ'], start: 'AZ' }
    ],
    challenge: {
      text: 'Vyfotografuj M42 tak, aby byla jasná, hvězdy kulaté a pozadí hladké – a aby ti to ' +
            'nezabralo víc než 45 minut.',
      done: '🏆 Výzva splněna! Přesně takhle by to fungovalo i venku.'
    },
    tips: [
      'Tmavá fotka? Přidej expozici – to pomůže víc než gain.',
      'Zašuměná fotka? Přidej snímky nebo uber gain.',
      'Hvězdy jako čárky? Přepni na EQ režim.',
      'Přepálený bílý střed? Uber expozici nebo gain.'
    ]
  },

  /* ------------------------------------------------------- SKLÁDÁNÍ SNÍMKŮ */
  skladanie: {
    title: '🧩 KOLIK SNÍMKŮ STAČÍ?',
    lead: 'Expozice i gain zůstávají stejné. Měníš jen počet snímků, které Dwarf poskládá na ' +
          'sebe. Sleduj pozadí – ne objekt.',
    target: 'Cíl: M42, expozice 30 s, gain 80',
    controls: [
      { id: 'frames', label: 'Počet snímků', values: [1, 5, 10, 25, 50, 100, 200, 400], start: 1 }
    ],
    challenge: {
      text: 'Najdi nejmenší počet snímků, při kterém už pozadí nešumí.',
      done: '🏆 Přesně tak – od dvou set snímků výš je rozdíl už jen malý.'
    },
    tips: ['Šum klesá pomaleji, než bys čekal: čtyřikrát více snímků = poloviční šum.']
  },

  /* --------------------------------------------------------- FÁZE MĚSÍCE */
  'mesiac-fazy': {
    title: '🌗 PROČ MÁ MĚSÍC FÁZE',
    lead: 'Slunce svítí stále ze stejné strany (zleva). Posouvej Měsíc po jeho dráze a sleduj, ' +
          'kolik z osvětlené poloviny vidíme ze Země.',
    target: 'Vlevo pohled zvenku · vpravo pohled ze Země',
    controls: [
      { id: 'day', label: 'Den v cyklu', min: 0, max: 29.5, step: 0.5, start: 0, unit: '. den' }
    ],
    challenge: {
      text: 'Nastav úplněk – tedy den, kdy vidíme celý osvětlený kotouč.',
      done: '🏆 To je úplněk. Všimni si, kde je tehdy Měsíc: přesně na opačné straně od Slunce.'
    },
    tips: [
      'Země nikde nevrhá stín – fáze nejsou stín Země.',
      'Osvětlená je vždy přesně polovina Měsíce. Mění se jen to, kolik z ní odsud vidíme.'
    ]
  },

  /* ------------------------------------------------------ NASTAVENIE EQ */
  'eq-nastavenie': {
    title: '⚙️ NASTAV EQ REŽIM',
    lead: 'Nakloň Dwarf na úhel naší zeměpisné šířky a otoč ho na sever k Polárce. Náhled ti hned ' +
          'ukáže, jestli hvězdy zůstanou kulaté.',
    target: 'Zkušební snímek: 90 sekund',
    controls: [
      { id: 'tilt',  label: 'Naklonění', min: 0, max: 90, step: 1, start: 0, unit: '°' },
      { id: 'north', label: 'Odchylka od severu', min: -60, max: 60, step: 1, start: 45, unit: '°' }
    ],
    challenge: {
      text: 'Nastav naklonění na 50° (Praha) a otoč Dwarf na sever – odchylka do 8 stupňů.',
      done: '🏆 Takhle je osa Dwarfu rovnoběžná s osou Země. Přesně tohle děláš venku před focením.'
    },
    tips: [
      'Úhel naklonění = zeměpisná šířka. V Praze je to zhruba 50 stupňů.',
      'Nemusí to být přesné na stupeň – aplikace Dwarfu zbytek dorovná při kalibraci.'
    ]
  },

  /* ---------------------------------------------------------- ZORNÉ POLE */
  'zorne-pole': {
    title: '🔲 VEJDE SE TO DO ZÁBĚRU?',
    lead: 'Rámeček je skutečný záběr Dwarfu mini – 2,45 stupně. Přepínej objekty a sleduj, které ' +
          'se do něj vejdou celé.',
    target: 'Objekty jsou nakreslené ve skutečné velikosti vůči záběru',
    controls: [
      { id: 'obj', label: 'Objekt', options: ['Saturn', 'M13', 'Měsíc', 'M42', 'M45', 'M31'], start: 'Saturn' }
    ],
    challenge: {
      text: 'Najdi objekt, který se do záběru Dwarfu celý nevejde.',
      done: '🏆 Andromeda je na nebi širší než 2,45° – vyfotíš její střed, ne celou.'
    },
    tips: ['Měsíc má na nebi půl stupně. Do záběru Dwarfu se jich vejde asi pět vedle sebe.']
  },

  /* -------------------------------------------------- TRANZIT EXOPLANETY */
  tranzit: {
    title: '📉 NAJDI EXOPLANETU',
    lead: 'Posouvej planetu před hvězdou a sleduj graf jasnosti pod ní. Přesně takhle astronomové ' +
          'objevují cizí světy.',
    target: 'Hvězda 51 Pegasi a její planeta · graf poklesu je záměrně zvětšený',
    controls: [
      { id: 'pos',  label: 'Poloha planety', min: -140, max: 140, step: 2, start: -140 },
      { id: 'size', label: 'Velikost planety', values: [4, 8, 14, 22], start: 14 }
    ],
    challenge: {
      text: 'Posuň planetu přesně před střed hvězdy, aby jasnost klesla nejvíc.',
      done: '🏆 Tohle je tranzit. Z hloubky poklesu astronomové vypočítají, jak velká planeta je.'
    },
    tips: [
      'Větší planeta zakryje více světla, takže pokles je hlubší.',
      'Ve skutečnosti je pokles menší než jedno procento – oko by ho nepostřehlo, přístroj ' +
      'ano.',
      'Podívej se na číslo „pokles jasnosti“: to je skutečná hodnota. Křivka v grafu je jen ' +
      'zvětšená.'
    ]
  },

  /* ------------------------------------------------------- FARBA HVIEZDY */
  'farba-teplota': {
    title: '🌈 NASTAV TEPLOTU HVĚZDY',
    lead: 'Posouvej teplotu povrchu a sleduj, jak se mění barva hvězdy. Astronomové to dělají ' +
          'naopak: změří barvu a z ní vypočítají teplotu.',
    target: 'Naše Slunce má na povrchu asi 5 500 °C',
    controls: [
      { id: 'temp', label: 'Teplota povrchu', min: 2500, max: 30000, step: 250, start: 2500, unit: ' °C' }
    ],
    challenge: {
      text: 'Nastav teplotu tak, aby hvězda vypadala jako naše Slunce (5 000 – 6 000 °C).',
      done: '🏆 Tohle je žlutá hvězda jako Slunce. Modré jsou žhavější, červené chladnější.'
    },
    tips: ['Je to naopak, než jak to máme na kohoutcích: modrá = žhavá, červená = chladná.']
  },

  /* ---------------------------------------------------- VESMÍRNÉ VZDÁLENOSTI */
  vzdialenosti: {
    title: '📏 JAK DALEKO TO JE',
    lead: 'Posouvej se od Měsíce až k vzdáleným galaxiím. Počítadlo ti říká, jak dlouho k nám to ' +
          'světlo letělo.',
    target: 'Od 1,3 světelné sekundy po 31 milionů světelných let',
    controls: [
      { id: 'step', label: 'Objekt', values: [0, 1, 2, 3, 4, 5, 6, 7], start: 0 }
    ],
    challenge: {
      text: 'Dostaň se až k nejvzdálenějšímu objektu v seznamu.',
      done: '🏆 Světlo z M51 letělo 31 milionů let. Když vyrazilo, na Zemi ještě nebyli lidé.'
    },
    tips: ['Všimni si, jak obrovský skok je mezi Sluncem a nejbližší hvězdou.']
  },

  /* ---------------------------------------------- SVĚTELNÉ ZNEČIŠTĚNÍ */
  'svetelne-znecistenie': {
    title: '🌑 KOLIK HVĚZD UVIDÍŠ',
    lead: 'Posouvej se od tmavé oblohy v Jizerských horách po centrum velkého města a sleduj, jak ' +
          'hvězdy z oblohy mizí.',
    target: 'Bortleova stupnice 1 (nejtmavší) až 9 (centrum města)',
    controls: [
      { id: 'bortle', label: 'Obloha', min: 1, max: 9, step: 1, start: 1 }
    ],
    challenge: {
      text: 'Nastav oblohu tak, jakou ji máte doma, a potom přepni na 1 – 2. Porovnej rozdíl.',
      done: '🏆 Rozdíl je desítky hvězd versus tisíce. Proto se vyplatí odjet za město.'
    },
    tips: ['Mléčná dráha zmizí z oblohy už kolem stupně 5.']
  }
};
