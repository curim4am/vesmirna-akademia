/* =============================================================================
   INTERAKTÍVNE ÚLOHY – OBSAH  (data/sims.js)
   -----------------------------------------------------------------------------
   Tu sú TEXTY a NASTAVENIA simulácií. Samotné kreslenie je v sim-engine.js
   (jedna funkcia na simuláciu). V lekcii sa použije krokom:

       { type: 'sim', simId: 'fotolab', xp: 25 }

   Ovládače (controls):
     { id, label, values:[…], unit, start }          – posuvník s hodnotami
     { id, label, options:['AZ','EQ'], start:'AZ' }  – prepínač
     { id, label, min, max, step, start, unit }      – plynulý posuvník

   challenge – nepovinná výzva: keď ju splní, dostane bonusové XP.
   ========================================================================== */

const SIMS = {

  /* ---------------------------------------------------------------- FOTOLAB */
  fotolab: {
    title: '🎛️ FOTOLAB',
    lead: 'Nastav Dwarf ako pri skutočnom fotení a pozeraj, ako sa fotka mení. ' +
          'Nič sa nedá pokaziť – skúšaj, kým to nebude vyzerať dobre.',
    target: 'Cieľ: M42 Orionova hmlovina',
    controls: [
      { id: 'exp',    label: 'Expozícia',   unit: 's', values: [2, 5, 15, 30, 60, 90], start: 2 },
      { id: 'gain',   label: 'Gain',        values: [20, 40, 60, 80, 100, 120], start: 20 },
      { id: 'frames', label: 'Počet snímok', values: [10, 50, 100, 200, 400], start: 10 },
      { id: 'mode',   label: 'Režim sledovania', options: ['AZ', 'EQ'], start: 'AZ' }
    ],
    challenge: {
      text: 'Nafoť M42 tak, aby bola jasná, hviezdy okrúhle a pozadie hladké – a aby ti to nezabralo viac než 45 minút.',
      done: '🏆 Výzva splnená! Presne takto by to fungovalo aj vonku.'
    },
    tips: [
      'Tmavá fotka? Pridaj expozíciu – to pomôže viac než gain.',
      'Zašumená fotka? Pridaj snímky alebo uber gain.',
      'Hviezdy ako čiarky? Prepni na EQ režim.',
      'Prepálený biely stred? Uber expozíciu alebo gain.'
    ]
  },

  /* ------------------------------------------------------ SKLADANIE SNÍMOK */
  skladanie: {
    title: '🧩 KOĽKO SNÍMOK STAČÍ?',
    lead: 'Expozícia aj gain zostávajú rovnaké. Meníš len počet snímok, ktoré Dwarf poskladá na sebe. ' +
          'Sleduj pozadie – nie objekt.',
    target: 'Cieľ: M42, expozícia 30 s, gain 80',
    controls: [
      { id: 'frames', label: 'Počet snímok', values: [1, 5, 10, 25, 50, 100, 200, 400], start: 1 }
    ],
    challenge: {
      text: 'Nájdi najmenší počet snímok, pri ktorom už pozadie nešumí.',
      done: '🏆 Presne tak – od dvesto snímok vyššie je rozdiel už len malý.'
    },
    tips: ['Šum klesá pomalšie, než by si čakal: štyrikrát viac snímok = polovičný šum.']
  },

  /* -------------------------------------------------------- FÁZY MESIACA */
  'mesiac-fazy': {
    title: '🌗 PREČO MÁ MESIAC FÁZY',
    lead: 'Slnko svieti stále z tej istej strany (zľava). Posúvaj Mesiac po jeho dráhe a pozeraj, ' +
          'koľko z osvetlenej polovice vidíme zo Zeme.',
    target: 'Vľavo pohľad zvonku · vpravo pohľad zo Zeme',
    controls: [
      { id: 'day', label: 'Deň v cykle', min: 0, max: 29.5, step: 0.5, start: 0, unit: '. deň' }
    ],
    challenge: {
      text: 'Nastav spln – teda deň, kedy vidíme celý osvetlený kotúč.',
      done: '🏆 To je spln. Všimni si, kde je vtedy Mesiac: presne na opačnej strane od Slnka.'
    },
    tips: [
      'Zem nikde nevrhá tieň – fázy nie sú tieň Zeme.',
      'Osvetlená je vždy presne polovica Mesiaca. Mení sa len to, koľko z nej odtiaľto vidíme.'
    ]
  },

  /* ------------------------------------------------------ NASTAVENIE EQ */
  'eq-nastavenie': {
    title: '⚙️ NASTAV EQ REŽIM',
    lead: 'Nakloň Dwarf na uhol našej zemepisnej šírky a otoč ho na sever k Polárke. ' +
          'Náhľad ti hneď ukáže, či hviezdy zostanú okrúhle.',
    target: 'Skúšobná snímka: 90 sekúnd',
    controls: [
      { id: 'tilt',  label: 'Naklonenie', min: 0, max: 90, step: 1, start: 0, unit: '°' },
      { id: 'north', label: 'Odchýlka od severu', min: -60, max: 60, step: 1, start: 45, unit: '°' }
    ],
    challenge: {
      text: 'Nastav naklonenie na 48° (Slovensko) a otoč Dwarf na sever – odchýlka do 8 stupňov.',
      done: '🏆 Takto je os Dwarfu rovnobežná s osou Zeme. Presne toto robíš vonku pred fotením.'
    },
    tips: [
      'Uhol naklonenia = zemepisná šírka. Na Slovensku je to 48 – 49 stupňov.',
      'Nemusí to byť presné na stupeň – appka Dwarfu zvyšok dorovná pri kalibrácii.'
    ]
  },

  /* ---------------------------------------------------------- ZORNÉ POLE */
  'zorne-pole': {
    title: '🔲 ZMESTÍ SA TO DO ZÁBERU?',
    lead: 'Rámik je skutočný záber Dwarfu mini – 2,45 stupňa. Prepínaj objekty a pozeraj, ' +
          'ktoré sa doň zmestia celé.',
    target: 'Objekty sú nakreslené v skutočnej veľkosti voči záberu',
    controls: [
      { id: 'obj', label: 'Objekt', options: ['Saturn', 'M13', 'Mesiac', 'M42', 'M45', 'M31'], start: 'Saturn' }
    ],
    challenge: {
      text: 'Nájdi objekt, ktorý sa do záberu Dwarfu celý nezmestí.',
      done: '🏆 Andromeda je na nebi širšia než 2,45° – odfotíš jej stred, nie celú.'
    },
    tips: ['Mesiac má na nebi pol stupňa. Do záberu Dwarfu sa ich zmestí asi päť vedľa seba.']
  },

  /* -------------------------------------------------- TRANZIT EXOPLANÉTY */
  tranzit: {
    title: '📉 NAJDI EXOPLANÉTU',
    lead: 'Posúvaj planétu pred hviezdou a pozeraj na graf jasnosti pod ňou. ' +
          'Presne takto astronómi objavujú cudzie svety.',
    target: 'Hviezda 51 Pegasi a jej planéta · graf poklesu je zámerne zväčšený',
    controls: [
      { id: 'pos',  label: 'Poloha planéty', min: -140, max: 140, step: 2, start: -140 },
      { id: 'size', label: 'Veľkosť planéty', values: [4, 8, 14, 22], start: 14 }
    ],
    challenge: {
      text: 'Posuň planétu presne pred stred hviezdy, aby jasnosť klesla najviac.',
      done: '🏆 Toto je tranzit. Z hĺbky poklesu astronómi vypočítajú, aká veľká planéta je.'
    },
    tips: [
      'Väčšia planéta zakryje viac svetla, takže pokles je hlbší.',
      'V skutočnosti je pokles menší než jedno percento – oko by ho nezbadalo, prístroj áno.',
      'Pozri sa na číslo „pokles jasnosti“: to je skutočná hodnota. Krivka v grafe je len zväčšená.'
    ]
  },

  /* ------------------------------------------------------- FARBA HVIEZDY */
  'farba-teplota': {
    title: '🌈 NASTAV TEPLOTU HVIEZDY',
    lead: 'Posúvaj teplotu povrchu a pozeraj, ako sa mení farba hviezdy. ' +
          'Astronómi to robia naopak: zmerajú farbu a z nej vypočítajú teplotu.',
    target: 'Naše Slnko má na povrchu asi 5 500 °C',
    controls: [
      { id: 'temp', label: 'Teplota povrchu', min: 2500, max: 30000, step: 250, start: 2500, unit: ' °C' }
    ],
    challenge: {
      text: 'Nastav teplotu tak, aby hviezda vyzerala ako naše Slnko (5 000 – 6 000 °C).',
      done: '🏆 Toto je žltá hviezda ako Slnko. Modré sú horúcejšie, červené chladnejšie.'
    },
    tips: ['Je to naopak, ako to máme na kohútikoch: modrá = horúca, červená = chladná.']
  },

  /* --------------------------------------------------- VESMÍRNE VZDIALENOSTI */
  vzdialenosti: {
    title: '📏 AKO DALEKO TO JE',
    lead: 'Posúvaj sa od Mesiaca až po vzdialené galaxie. Počítadlo ti hovorí, ' +
          'ako dlho k nám to svetlo letelo.',
    target: 'Od 1,3 svetelnej sekundy po 31 miliónov svetelných rokov',
    controls: [
      { id: 'step', label: 'Objekt', values: [0, 1, 2, 3, 4, 5, 6, 7], start: 0 }
    ],
    challenge: {
      text: 'Dostaň sa až k najvzdialenejšiemu objektu v zozname.',
      done: '🏆 Svetlo z M51 letelo 31 miliónov rokov. Keď vyrazilo, na Zemi ešte neboli ľudia.'
    },
    tips: ['Všimni si, aký obrovský skok je medzi Slnkom a najbližšou hviezdou.']
  },

  /* --------------------------------------------- SVETELNÉ ZNEČISTENIE */
  'svetelne-znecistenie': {
    title: '🌑 KOĽKO HVIEZD UVIDÍŠ',
    lead: 'Posúvaj sa od tmavej oblohy v Poloninách po centrum veľkého mesta ' +
          'a pozeraj, ako hviezdy z oblohy mizli.',
    target: 'Bortlova stupnica 1 (najtmavšia) až 9 (centrum mesta)',
    controls: [
      { id: 'bortle', label: 'Obloha', min: 1, max: 9, step: 1, start: 1 }
    ],
    challenge: {
      text: 'Nastav oblohu tak, ako ju máte doma, a potom sa vráť na 1 – 2. Porovnaj rozdiel.',
      done: '🏆 Rozdiel je desiatky hviezd verzus tisíce. Preto sa vyplatí odviezť sa za mesto.'
    },
    tips: ['Mliečna cesta zmizne z oblohy už okolo stupňa 5.']
  }
};
