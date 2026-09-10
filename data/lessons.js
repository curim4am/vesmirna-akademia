/* =============================================================================
   LEKCIE  (data/lessons.js)
   -----------------------------------------------------------------------------
   TU SA UPRAVUJE VŠETOK TEXT LEKCIE. V app.js nie je žiadny obsah lekcie.

   Lekcia = pole krokov (steps). Každý krok má "type" a aplikácia preň pozná
   svoju obrazovku. Dostupné typy krokov:

     guess    – hádanka: obrázok + 4 možnosti
     info     – jedna hlavná myšlienka: obrázok + 1–3 krátke vety
     cards    – karty, ktoré sa dajú otvoriť (napr. 4 typy hmlovín)
     pick     – vyber správny obrázok zo štyroch
     wow      – veľký "WOW" moment
     compare  – porovnanie dvoch obrázkov (oko vs. fotoaparát)
     mission  – reálna misia (Stellarium + Dwarf) + objavenie objektu
     quiz     – mini test na konci

   Typy otázok v kvíze: 'choice' | 'image' | 'truefalse' | 'order' | 'decide'
   ========================================================================== */

const LESSONS = [
  {
    id: 'nebulae',
    icon: '☁️',
    title: 'HMLOVINY',
    teaser: 'Dokážeš zistiť, čo sa skrýva za týmto tajomným oblakom?',
    minutes: '6 minút',
    badge: 'nebula-hunter',
    basics: [ 'hmlovina', 'typy-hmlovin', 'plyn-a-prach', 'svetelny-rok',
              'magnituda', 'suhvezdie', 'expozicia' ],
    quizXp: 100,           // XP za dokončený kvíz
    steps: [

      /* ---------------------------- 1. HÁDANKA -------------------------- */
      {
        type: 'guess',
        image: 'carina',
        question: '🔎 ČO MYSLÍŠ, ŽE TO JE?',
        options: [
          { id: 'galaxy',  icon: '🌌', label: 'galaxia' },
          { id: 'nebula',  icon: '☁️', label: 'hmlovina' },
          { id: 'cluster', icon: '✨', label: 'hviezdokopa' },
          { id: 'planet',  icon: '🪐', label: 'planéta' }
        ],
        correct: 'nebula',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Hmlovina je obrovský oblak plynu a prachu vo vesmíre.',
        retryText: 'Skús ešte raz. Pozri sa na tie oblaky – nie sú to hviezdy ani planéta.',
        xp: 10
      },

      /* ------------------------ 2. ČO JE HMLOVINA ----------------------- */
      {
        type: 'info',
        title: '☁️ ČO JE HMLOVINA?',
        image: 'carina',
        lines: [
          'Hmlovina je obrovský oblak plynu a prachu vo vesmíre.',
          'Niektoré hmloviny sú miestom, kde sa rodia nové hviezdy.',
          'Iné vzniknú, keď stará hviezda zomiera.'
        ],
        more: [
          'V jednom kubickom centimetri hmloviny je často len niekoľko stoviek atómov. V rovnako veľkej kocke vzduchu okolo teba ich je asi 25 triliónov. Hmlovina vyzerá hustá len preto, že je obrovská – svetlo musí prejsť cez tisíce miliárd kilometrov plynu a to sa nakoniec nasčíta.',
          'Väčšinu hmloviny tvorí vodík, teda ten istý plyn, z ktorého je aj Slnko. Keď ho blízka horúca hviezda osvieti svojím ultrafialovým svetlom, vodík začne sám žiariť do červena. Preto sú emisné hmloviny na fotkách často ružové a červené.',
          'Vodík z hmlovín sa mení na hviezdy a hviezdy ho na konci života znova rozfúkajú do vesmíru – už obohatený o nové látky. Vesmír si tak ten istý materiál používa dokola.'
        ],
        diagram: 'nebula-cycle',   // jednoduchá animovaná ilustrácia (v app.js)
        cta: 'A teraz pozor…'
      },

      /* --------------------- 3. ŠTYRI TYPY HMLOVÍN ---------------------- */
      {
        type: 'cards',
        title: 'HMLOVINA NIE JE VŽDY ROVNAKÁ',
        subtitle: 'Klikni na každú kartu a otoč ju.',
        kinds: ['emission', 'reflection', 'dark', 'planetary'],
        cta: 'Rozumiem, ideme na to!',
        xp: 15
      },

      /* ---------------------- 4. INTERAKTÍVNA ÚLOHA --------------------- */
      {
        type: 'pick',
        title: '🔎 UHÁDNI HMLOVINU',
        prompt: 'Ktorá z nich je planetárna hmlovina?',
        options: [
          { image: 'm42',       correct: false, explain: 'Toto je emisná hmlovina – celý oblak žiari vlastným svetlom.' },
          { image: 'ring',      correct: true,  explain: 'Presne tak! Vidíš ten prstenec? To sú vrstvy, ktoré odhodila umierajúca hviezda. V strede zostal malý biely bod – jej jadro.' },
          { image: 'horsehead', correct: false, explain: 'Toto je temná hmlovina – tmavý prach, ktorý zakrýva svetlo za sebou.' },
          { image: 'm78',       correct: false, explain: 'Toto je reflexná hmlovina – modrastý prach, ktorý iba odráža svetlo hviezdy.' }
        ],
        xp: 20
      },

      /* ------------------------ 4b. VIEŠ ŽE? ---------------------------- */
      { type: 'fact', factId: 'hmloviny-recyklacia' },

      /* --------------------------- 5. WOW MOMENT ------------------------ */
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Keď sa pozeráš na niektoré hmloviny, pozeráš sa na svetlo, ktoré cestovalo stovky alebo tisíce rokov, kým dorazilo až k nám.',
          'Takže vlastne pozeráme do minulosti!'
        ],
        footnote: 'Svetlo z Orionovej hmloviny vyrazilo na cestu ešte v stredoveku.',
        cta: 'To je šialené 🤯'
      },

      { type: 'fact', factId: 'svetlo-z-minulosti' },

      /* ------------------------- 6. ČO UVIDÍ DWARF ---------------------- */
      {
        type: 'compare',
        title: '🔭 A ČO UVIDÍME V DWARFE?',
        lead: 'Dwarf dokáže zachytiť objekty, ktoré sú pre naše oči príliš slabé.',
        eye: {
          icon: '👁️',
          label: 'ĽUDSKÉ OKO',
          text: 'Oko vidí len to, čo naň dopadne práve teraz. Slabé svetlo si nedokáže odložiť.'
        },
        camera: {
          icon: '📸',
          label: 'ASTRONOMICKÁ FOTOGRAFIA',
          text: 'Dwarf zbiera svetlo dlho a spojí veľa snímok do jednej. Preto sa objavia farby a tvary, ktoré oko nikdy neuvidí.',
          image: 'm42'
        },
        check: {
          question: 'Prečo teda Dwarf vidí viac ako naše oko?',
          options: [
            { label: 'Lebo dlho zbiera svetlo a skladá veľa snímok', correct: true,
              explain: 'Áno! Nazýva sa to dlhá expozícia a skladanie snímok.' },
            { label: 'Lebo lieta bližšie k hmlovine', correct: false,
              explain: 'To nie – Dwarf stojí na Zemi rovnako ako my. Jeho tajomstvo je čas a skladanie snímok.' }
          ]
        },
        cta: 'Ideme fotiť!'
      },

      { type: 'fact', factId: 'dwarf-30mm' },

      /* -------------------------- 7. NAŠA MISIA ------------------------- */
      {
        type: 'mission',
        title: '📸 NAŠA PRVÁ MISIA',
        objectId: 'm42',
        tasks: [
          { icon: '🔭', text: 'Nájdi M42 v Stellariu.' },
          { icon: '📸', text: 'Skús ju odfotografovať Dwarfom.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Objekt sa uložil do tvojej vesmírnej zbierky.',
        cta: 'Posledná výzva: mini test'
      },

      /* --------------------------- 8. MINI KVÍZ ------------------------- */
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [

          {
            kind: 'choice',
            question: 'Čo je hmlovina?',
            options: [
              { label: 'Obrovský oblak plynu a prachu', correct: true },
              { label: 'Veľmi veľká planéta' },
              { label: 'Skupina miliárd hviezd' },
              { label: 'Kus ľadu, ktorý letí okolo Slnka' }
            ],
            explain: 'Hmlovina je oblak plynu a prachu. Skupina miliárd hviezd je galaxia.'
          },

          {
            kind: 'image',
            question: 'Ktorá hmlovina súvisí so zrodom nových hviezd?',
            options: [
              { image: 'm42',  label: 'A', correct: true },
              { image: 'ring', label: 'B' },
              { image: 'horsehead', label: 'C' },
              { image: 'saturn', label: 'D' }
            ],
            explain: 'Toto je M42 – emisná hmlovina a najbližšia veľká pôrodnica hviezd. (D nie je ani hmlovina, to je planéta Saturn!)'
          },

          {
            kind: 'truefalse',
            question: 'Planetárna hmlovina je oblak, ktorý obklopuje planétu.',
            answer: false,
            explain: 'Nepravda! Planetárna hmlovina je pozostatok umierajúcej hviezdy. Meno dostala len preto, že v starých ďalekohľadoch vyzerala ako malá planéta.'
          },

          {
            kind: 'order',
            question: 'Zoraď životný príbeh hviezdy podobnej Slnku – od začiatku po konec.',
            hint: 'Klikaj na kroky v správnom poradí.',
            items: [
              { label: 'Oblak plynu a prachu (hmlovina)', order: 1, icon: '☁️' },
              { label: 'Zrodí sa nová hviezda',           order: 2, icon: '⭐' },
              { label: 'Hviezda zostarne a nafúkne sa',   order: 3, icon: '🔴' },
              { label: 'Odhodí vrstvy → planetárna hmlovina', order: 4, icon: '💀' }
            ],
            explain: 'Presne tak – z hmloviny hviezda vznikne a v hmlovine aj skončí. Vesmír recykluje!'
          },

          {
            kind: 'decide',
            question: 'Objekt je vzdialený 1 000 svetelných rokov. Čo to znamená?',
            options: [
              { icon: '⏳', label: 'Jeho svetlo letelo k nám 1 000 rokov', correct: true },
              { icon: '📏', label: 'Je 1 000-krát väčší ako Slnko' }
            ],
            explain: 'Svetelný rok je vzdialenosť, ktorú svetlo preletí za jeden rok. Takže vidíme, ako objekt vyzeral pred 1 000 rokmi.'
          }

        ],
        resultGood: '🌟 Výborne!',
        resultOk: '🔭 Ešte jedenkrát a budeš majster hmlovín!'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 2 – AKO FUNGUJE DWARF A ČO JE EQ MODE
     ========================================================================== */
  {
    id: 'eq-mode',
    icon: '🔭',
    title: 'DWARF A EQ MODE',
    teaser: 'Prečo sa hviezdy na dlhých fotkách točia – a ako ich zastaviť?',
    minutes: '8 minút',
    badge: 'sky-navigator',
    basics: [ 'rotacia-oblohy', 'hviezdny-den', 'nebesky-pol', 'az-rezim',
              'eq-rezim', 'expozicia', 'zorne-pole' ],
    quizXp: 100,
    steps: [

      /* ---------------------------- HÁDANKA ----------------------------- */
      {
        type: 'guess',
        image: 'startrails',
        question: '🔎 PREČO SÚ HVIEZDY AKO ČIARKY?',
        options: [
          { id: 'earth',  icon: '🌍', label: 'Zem sa otáča' },
          { id: 'camera', icon: '📷', label: 'Pokazil sa fotoaparát' },
          { id: 'wind',   icon: '🌬️', label: 'Fúkal vietor' },
          { id: 'fly',    icon: '🚀', label: 'Hviezdy naozaj lietajú' }
        ],
        correct: 'earth',
        successTitle: '🎉 PRESNE TAK!',
        successText: 'Zem sa otáča – a s ňou aj fotoaparát. Preto sa hviezdy na dlhej snímke rozmažú do oblúčikov.',
        retryText: 'Skús ešte raz. Zamysli sa nad tým, čo sa hýbe – hviezdy, alebo my?',
        xp: 10
      },

      /* ------------------------ ZEM SA OTÁČA ---------------------------- */
      {
        type: 'info',
        title: '🌍 MY SA HÝBEME, NIE HVIEZDY',
        image: 'polaris',
        lines: [
          'Zem sa otáča – raz dokola za necelý deň.',
          'Nám sa to zdá, že sa točí obloha: hviezdy sa každú hodinu posunú o 15 stupňov.',
          'Ďalekohľad ich preto musí presne sledovať, inak sa nám na fotke rozmažú.'
        ],
        more: [
          'Zem sa otočí raz dokola za 23 hodín a 56 minút – nie presne za 24. Tie štyri minúty rozdielu sú dôvod, prečo hviezdy vychádzajú každý deň o niečo skôr a prečo v lete a v zime vidíme na oblohe iné súhvezdia.',
          'Nebeský pól je jediné miesto na oblohe, ktoré sa nehýbe – všetko ostatné sa okolo neho točí. Na severnej pologuli je tam takmer presne Polárka, a práve preto ju používame na nastavenie EQ režimu.',
          'AZ režim otáča Dwarf hore-dole a doľava-doprava, čo hviezdu na strede záberu udrží, ale celý obrázok sa pritom pomaly pretáča. EQ režim otáča Dwarf okolo tej istej osi, okolo akej sa točí Zem – a preto obrázok stojí.'
        ],
        diagram: 'sky-rotation',
        cta: 'Ako to Dwarf robí?'
      },

      { type: 'fact', factId: 'zem-23-56' },

      /* ----------------------- DVA REŽIMY ------------------------------- */
      {
        type: 'cards',
        title: 'DWARF TO ZVLÁDNE DVOMA SPÔSOBMI',
        subtitle: 'Klikni na obe karty a otoč ich.',
        cards: [
          {
            icon: '🧭',
            name: 'AZ režim',
            short: 'Hýbe sa doľava-doprava a nahor-nadol.',
            text: 'Najjednoduchšie nastavenie: postavíš Dwarf na zem a ide. Objekt sleduje, ale obraz sa mu popritom pomaly otáča. Preto sú dobré len krátke snímky.',
            image: 'startrails',
            exampleLabel: 'Krátke snímky, žiadne nastavovanie'
          },
          {
            icon: '⚙️',
            name: 'EQ režim',
            short: 'Otáča sa rovnako ako obloha.',
            text: 'Dwarf nakloníš tak, aby jedna jeho os smerovala k Polárke. Potom stačí jediný pohyb, ktorý presne kopíruje otáčanie Zeme – a hviezdy zostanú okrúhle.',
            image: 'roundstars',
            exampleLabel: 'Dlhé snímky, treba nastaviť'
          }
        ],
        cta: 'Chcem to vidieť!',
        xp: 15
      },

      /* --------------------- POROVNANIE AZ vs EQ ------------------------ */
      {
        type: 'compare',
        title: '⏱️ ČO SA STANE PRI DLHEJ SNÍMKE?',
        lead: 'Čím dlhšie Dwarf zbiera svetlo, tým slabšie objekty uvidí. Ale bez EQ režimu sa mu hviezdy začnú točiť.',
        eye: {
          icon: '🧭',
          label: 'AZ REŽIM · 90 sekúnd',
          art: 'startrails',
          text: 'Do 15 – 20 sekúnd je všetko v poriadku. Po 30 – 60 sekundách sa hviezdy začnú točiť do oblúčikov a okraje fotky treba odstrihnúť.'
        },
        camera: {
          icon: '⚙️',
          label: 'EQ REŽIM · 90 sekúnd',
          image: 'roundstars',
          text: 'Hviezdy zostanú okrúhle aj po 90 sekundách. Dwarf mini toľko v EQ režime naozaj zvládne.'
        },
        check: {
          question: 'Kedy sa teda EQ režim vyplatí najviac?',
          options: [
            { label: 'Keď chcem dlhé snímky slabých hmlovín a galaxií', correct: true,
              explain: 'Áno! Na slabé objekty potrebuješ dlho zbierať svetlo – a to bez EQ nejde.' },
            { label: 'Keď fotím Mesiac, ktorý je veľmi jasný', correct: false,
              explain: 'Mesiac je taký jasný, že mu stačia zlomky sekundy. Tam EQ režim netreba.' }
          ]
        },
        cta: 'Ideme to nastaviť'
      },

      { type: 'fact', factId: 'eq-90-sekund' },

      /* ------------------- PRAKTICKÝ POSTUP (HOWTO) --------------------- */
      {
        type: 'howto',
        title: '🧭 AKO NASTAVIŤ EQ REŽIM',
        lead: 'Štyri kroky. Nič sa nedá pokaziť – keď to nevyjde, len to skúsiš znova.',
        steps: [
          { icon: '📐', title: 'Statív do vodorovna',
            text: 'Postav statív na pevné miesto a vyrovnaj ho, aby nebol nakrivo.' },
          { icon: '📏', title: 'Nakloň Dwarf na 48°',
            text: 'To je uhol našej zemepisnej šírky (Slovensko ≈ 48 – 49°). Vďaka nemu bude os Dwarfu rovnobežná s osou Zeme.' },
          { icon: '⭐', title: 'Otoč ho na Polárku (na severe)',
            text: 'Nemusí to byť úplne presné. Pár stupňov nabok appka dorovná pri kalibrácii.' },
          { icon: '📱', title: 'Kalibruj v aplikácii',
            text: 'V appke Dwarf zapni EQ režim a nechaj ho urobiť kalibráciu. Potom už môžeš fotiť dlhé snímky.' }
        ],
        note: 'Presný postup pre Dwarf mini je aj vo oficiálnom návode DwarfLab (odkaz je na obrazovke 🔗 Zdroje).',
        cta: 'Rozumiem, ideme ďalej',
        xp: 20
      },

      /* ---------------------------- WOW --------------------------------- */
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Celá obloha sa točí okolo jedného jediného bodu – a hneď pri ňom stojí Polárka.',
          'Zemská os totiž ukazuje presne tam. Preto Polárka nikdy nezapadá a vždy ukazuje na severe.'
        ],
        footnote: 'Keby si nechal fotoaparát otvorený celú noc, hviezdy by okolo Polárky nakreslili kruhy.',
        cta: 'To je super 🤯'
      },

      { type: 'fact', factId: 'polarka-tri-hviezdy' },
      { type: 'fact', factId: 'polarka-najde-velky-voz' },

      /* --------------------------- MISIA -------------------------------- */

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'eq-nastavenie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '🧭 MISIA: POLÁRKA',
        objectId: 'polaris',
        tasks: [
          { icon: '🔭', text: 'Nájdi Polárku v Stellariu (napíš „Polaris“).' },
          { icon: '🌙', text: 'Vonku ju nájdi podľa Veľkého voza.' },
          { icon: '⚙️', text: 'Nastav s tatom Dwarf do EQ režimu a skús 60-sekundovú snímku.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Polárka je tvoja! Uložila sa do zbierky – a teraz už vieš aj nastaviť EQ režim.',
        cta: 'Posledná výzva: mini test'
      },

      /* --------------------------- KVÍZ --------------------------------- */
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [

          {
            kind: 'choice',
            question: 'Prečo sa hviezdy na dlhej fotke rozmažú do oblúčikov?',
            options: [
              { label: 'Lebo sa Zem otáča a obloha sa nám posúva', correct: true },
              { label: 'Lebo hviezdy blikajú' },
              { label: 'Lebo je vonku zima' },
              { label: 'Lebo je fotoaparát pokazený' }
            ],
            explain: 'Obloha sa nám posunie o 15 stupňov každú hodinu. Ďalekohľad ju musí presne sledovať.'
          },

          {
            kind: 'image',
            question: 'Na ktorej snímke bol dobre nastavený EQ režim?',
            options: [
              { image: 'roundstars', label: 'A', correct: true },
              { image: 'startrails', label: 'B' }
            ],
            explain: 'Okrúhle a ostré hviezdy znamenajú, že sledovanie bolo presné.'
          },

          {
            kind: 'truefalse',
            question: 'V EQ režime nakloníme Dwarf tak, aby jedna jeho os smerovala k Polárke.',
            answer: true,
            explain: 'Presne tak. Vtedy je os Dwarfu rovnobežná s osou Zeme a stačí jediný pohyb, ktorý kopíruje otáčanie oblohy.'
          },

          {
            kind: 'order',
            question: 'Zoraď nastavenie EQ režimu do správneho poradia.',
            hint: 'Klikaj na kroky v správnom poradí.',
            items: [
              { label: 'Vyrovnať statív do vodorovna', order: 1, icon: '📐' },
              { label: 'Nakloniť Dwarf na 48°',        order: 2, icon: '📏' },
              { label: 'Otočiť ho na Polárku',          order: 3, icon: '⭐' },
              { label: 'Kalibrovať v aplikácii',        order: 4, icon: '📱' }
            ],
            explain: 'Najprv vodorovný statív, potom uhol, potom sever – a nakoniec kalibrácia.'
          },

          {
            kind: 'decide',
            question: 'Prečo je pri hmlovinách lepšia jedna 90-sekundová snímka ako 15-sekundová?',
            options: [
              { icon: '🪣', label: 'Za 90 sekúnd nazbiera oveľa viac svetla', correct: true },
              { icon: '🔍', label: 'Lebo je väčšia a viac priblížená' }
            ],
            explain: 'Je to ako zbieranie dažďa do vedra – čím dlhšie zbieraš, tým viac máš. Preto sa slabé hmloviny fotia dlho.'
          }

        ],
        resultGood: '🌟 Paráda, si navigátor oblohy!',
        resultOk: '🔭 Ešte raz a budeš to mať v malíčku!'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 3 – HVIEZDOKOPY
     ========================================================================== */
  {
    id: 'clusters',
    icon: '✨',
    title: 'HVIEZDOKOPY',
    teaser: 'Hviezdy sa nerodia po jednej. Čo je Sedem sestier?',
    minutes: '7 minút',
    badge: 'cluster-collector',
    basics: [ 'hviezdokopa', 'gravitacia', 'svetelny-rok', 'magnituda',
              'ostrenie', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm13',
        question: '🔎 ČO JE NA TEJTO FOTKE?',
        options: [
          { id: 'nebula',  icon: '☁️', label: 'hmlovina' },
          { id: 'cluster', icon: '✨', label: 'hviezdokopa' },
          { id: 'galaxy',  icon: '🌌', label: 'galaxia' },
          { id: 'planet',  icon: '🪐', label: 'planéta' }
        ],
        correct: 'cluster',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Hviezdokopa je skupina hviezd, ktoré sa narodili spolu z jedného oblaku.',
        retryText: 'Skús ešte raz. Pozri sa poriadne – nie je to oblak plynu ani špirála. Sú to samé hviezdy.',
        xp: 10
      },
      {
        type: 'info',
        title: '✨ HVIEZDY SA RODIA V PARTIÁCH',
        image: 'm45',
        lines: [
          'V hmlovine sa nikdy nerodí len jedna hviezda.',
          'Naraz ich vznikne desiatky, stovky, niekedy aj stotisíc.',
          'Takej skupine hviezdnych súrodencov sa hovorí hviezdokopa.'
        ],
        more: [
          'Hviezdy v jednej hviezdokope sa zrodili v tom istom oblaku a približne v tom istom čase. Sú teda naozaj súrodenci – a astronómom to ohromne pomáha: keď vedia vek jednej, poznajú vek všetkých.',
          'Otvorené hviezdokopy sú mladé a držia spolu len voľne. Gravitácia galaxie ich po niekoľkých stovkách miliónov rokov rozpustí, takže dnes už nevieme, kde sú súrodenci nášho Slnka.',
          'Guľové hviezdokopy sú úplne iný prípad: sú staré takmer ako samotný vesmír, majú stovky tisíc hviezd a držia spolu tak pevne, že prežili celú histórii galaxie.'
        ],
        cta: 'A nie sú všetky rovnaké…'
      },
      { type: 'fact', factId: 'plejady-sestry' },
      {
        type: 'cards',
        title: 'DVA DRUHY HVIEZDOKÔP',
        subtitle: 'Klikni na obe karty a otoč ich.',
        cards: [
          { icon: '🌟', name: 'Otvorená', short: 'Mladá a voľná.',
            text: 'Desiatky až tisíce mladých hviezd, ktoré sú od seba dosť daleko. Sú to súrodenci z jednej hmloviny – napríklad Plejády.',
            image: 'm45', exampleLabel: 'Príklad: M45 Plejády' },
          { icon: '🔵', name: 'Guľová', short: 'Stará a nabitá.',
            text: 'Guľa nacapkaná stovkami tisíc starých hviezd. Obieha okolo našej galaxie a je takmer taká stará ako vesmír.',
            image: 'm13', exampleLabel: 'Príklad: M13 v Herkulovi' }
        ],
        cta: 'Ideme si to vyskúšať',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 UHÁDNI HVIEZDOKOPU',
        prompt: 'Ktorá z nich je guľová hviezdokopa?',
        options: [
          { image: 'm45', correct: false, explain: 'Toto sú Plejády – otvorená hviezdokopa. Hviezdy sú od seba daleko a je ich „len“ tisíc.' },
          { image: 'm13', correct: true,  explain: 'Presne! Guľa z viac než 100 000 hviezd. Čím bližšie k stredu, tým sú hviezdy natlačenejšie.' },
          { image: 'm42', correct: false, explain: 'Toto je hmlovina – oblak plynu a prachu, nie skupina hviezd.' },
          { image: 'm31', correct: false, explain: 'Toto je celá galaxia! Tá má miliardy hviezd, nie stotisíc.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Otvorené hviezdokopy sa po čase rozpadnú – hviezdy sa pomaly rozutekajú po galaxii.',
          'Astronómi si myslia, že aj naše Slnko sa narodilo v takej partii. Jeho súrodenci sú dnes rozsypaní po celej Mliečnej ceste.'
        ],
        footnote: 'Niekde tam vonku teda máme „sesterské“ hviezdy Slnka – len presne nevieme ktoré.',
        cta: 'Toto je šialené 🤯'
      },
      { type: 'fact', factId: 'gulova-100tisic' },
      {
        type: 'mission',
        title: '📸 MISIA: PLEJÁDY',
        objectId: 'm45',
        tasks: [
          { icon: '🔭', text: 'Nájdi M45 v Stellariu.' },
          { icon: '👁️', text: 'Vonku ich skús spočítať voľným okom – koľko ich vidíš?' },
          { icon: '📸', text: 'Odfotografuj ich Dwarfom a spočítaj znova.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Plejády máš v zbierke. Rozdiel medzi okom a Dwarfom si videl na vlastné oči.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Čo je hviezdokopa?',
            options: [
              { label: 'Skupina hviezd, ktoré sa narodili spolu', correct: true },
              { label: 'Oblak plynu a prachu' },
              { label: 'Galaxia s miliardami hviezd' },
              { label: 'Planéta s mnohými mesiacmi' }
            ],
            explain: 'Hviezdokopa = hviezdni súrodenci z jednej hmloviny.'
          },
          {
            kind: 'image',
            question: 'Ktorá z nich je otvorená hviezdokopa?',
            options: [
              { image: 'm45', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'Plejády – mladé hviezdy voľne rozsypané. Guľová hviezdokopa je natlačená do gule.'
          },
          {
            kind: 'truefalse',
            question: 'Guľové hviezdokopy sú mladšie ako otvorené.',
            answer: false,
            explain: 'Naopak! Guľové sú veľmi staré – takmer také staré ako vesmír. Otvorené sú mladé a časom sa rozpadnú.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najmenšieho počtu hviezd po najväčší.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Dvojhviezda (2 hviezdy)', order: 1, icon: '👯' },
              { label: 'Otvorená hviezdokopa (tisíce)', order: 2, icon: '🌟' },
              { label: 'Guľová hviezdokopa (stotisíce)', order: 3, icon: '🔵' },
              { label: 'Galaxia (miliardy)', order: 4, icon: '🌌' }
            ],
            explain: 'Od dvojice až po celú galaxiu – takto sa hviezdy vo vesmíre zhromažďujú.'
          },
          {
            kind: 'decide',
            question: 'Prečo vidíme v Plejádach voľným okom len šesť či sedem hviezd?',
            options: [
              { icon: '👁️', label: 'Lebo ostatné sú príliš slabé pre naše oko', correct: true },
              { icon: '🌫️', label: 'Lebo ostatné sú schované za Mesiacom' }
            ],
            explain: 'Jasné hviezdy vidíme, slabšie nie. Dwarf ich nazbiera stovky.'
          }
        ],
        resultGood: '🌟 Skvelé, hviezdokopy máš v malíčku!',
        resultOk: '🔭 Ešte raz a bude to sedieť!'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 4 – NAŠA GALAXIA
     ========================================================================== */
  {
    id: 'milkyway',
    icon: '🌌',
    title: 'NAŠA GALAXIA',
    teaser: 'Kde vo vesmíre vlastne sme? A čo je ten svetlý pás na nebi?',
    minutes: '7 minút',
    badge: 'milkyway-citizen',
    basics: [ 'mliecna-cesta', 'galakticky-disk', 'halo', 'svetelne-znecistenie',
              'svetelny-rok', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'milkyway',
        question: '🔎 ČO JE TEN SVETLÝ PÁS NA NEBI?',
        options: [
          { id: 'cloud',  icon: '☁️', label: 'obyčajný mrak' },
          { id: 'city',   icon: '🏙️', label: 'svetlo z mesta' },
          { id: 'galaxy', icon: '🌌', label: 'naša galaxia zvnútra' },
          { id: 'smoke',  icon: '💨', label: 'dym' }
        ],
        correct: 'galaxy',
        successTitle: '🎉 PRESNE TAK!',
        successText: 'Je to disk našej galaxie. Sedíme v ňom – a preto ho vidíme ako pás cez celé nebo.',
        retryText: 'Skús ešte raz. Ten pás je na nebi každý rok v tom istom mieste – takže to nie je mrak ani dym.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌌 ŽIJEME V ŠPIRÁLE',
        image: 'milkyway',
        lines: [
          'Naša galaxia sa volá Mliečna cesta.',
          'Je to špirála s priečkou a má v priemere asi 100 000 svetelných rokov.',
          'Slnko je asi 26 000 svetelných rokov od jej stredu – teda niekde na predmestí.'
        ],
        more: [
          'Keď sa v lete pozeráš na Mliečnu cestu, pozeráš sa na disk našej galaxie zvnútra a z boku. Preto to nie je špirála, ale pás – sme priamo v ňom, a tak ho vidíme naplocho.',
          'Tá tmavá čiara, ktorá pás miestami rozdeľuje, nie je diera. Je to prach v rovine galaxie, ktorý svetlo hviezd za sebou pohltí. Práve preto nevidíme stred galaxie v obyčajnom svetle – musíme sa naň pozerať v infračervenom alebo rádiovom.',
          'Slnko obehne stred galaxie raz za približne 230 miliónov rokov. Keď bolo naposledy tam, kde je dnes, po Zemi ešte len začínali chodiť prví dinosaury.'
        ],
        cta: 'Ako by vyzerala zvonku?'
      },
      { type: 'fact', factId: 'nasa-galaxia' },
      {
        type: 'compare',
        title: '🔄 ZVNÚTRA vs. ZVONKU',
        lead: 'To isté miesto, dva úplne odlišné pohľady.',
        eye: {
          icon: '👁️',
          label: 'AKO TO VIDÍME MY',
          art: 'milkyway',
          text: 'Sme vnútri disku, takže vidíme len pás hviezd okolo nás. Je to ako stáť v lese a snažiť sa vidieť celý les.'
        },
        camera: {
          icon: '🛰️',
          label: 'AKO BY VYZERALA ZVONKU',
          image: 'm31',
          text: 'Takto vyzerá naša susedka Andromeda. Naša galaxia je jej veľmi podobná – asi takto by sme videli aj seba.'
        },
        check: {
          question: 'Prečo nemáme skutočnú fotku celej Mliečnej cesty zvonku?',
          options: [
            { label: 'Lebo sme vnútri a nedokážeme z nej vyletieť', correct: true,
              explain: 'Áno. Aj najrýchlejšia sonda by letela k okraju galaxie milióny rokov.' },
            { label: 'Lebo je príliš tmavá na fotografovanie', correct: false,
              explain: 'Tmavá nie je – práve naopak. Problém je, že sme vnútri.' }
          ]
        },
        cta: 'Poď sa pozrieť dovnútra'
      },
      {
        type: 'cards',
        title: 'ČO VŠETKO NAŠA GALAXIA MÁ',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌀', name: 'Špirálové ramená', short: 'Tu sa rodia hviezdy.',
            text: 'V ramenách je najviac plynu a prachu – a teda aj najviac hmlovín a mladých hviezd. Slnko je na okraji jedného z nich.',
            image: 'm51', exampleLabel: 'Tu žijeme' },
          { icon: '🎯', name: 'Stred galaxie', short: 'Najhustejšie miesto.',
            text: 'V strede je obrovská hustá zhluk hviezd a v ňom čierna diera. Na nebi je smerom do súhvezdia Strelec.',
            image: 'sgra', exampleLabel: 'Súhvezdie Strelec' },
          { icon: '🔵', name: 'Halo', short: 'Guľa okolo celej galaxie.',
            text: 'Okolo disku je obrovská guľa, v ktorej obiehajú staré guľové hviezdokopy – napríklad M13.',
            image: 'm13', exampleLabel: 'Domov guľových hviezdokôp' }
        ],
        cta: 'Rozumiem!',
        xp: 15
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Keď sa pozeráš na pás Mliečnej cesty, pozeráš sa na miliardy hviezd naraz – tak daleko, že sa ich svetlo zlialo do mliečnej šmuhy.',
          'A tie tmavé miesta v páse nie sú diery. To sú oblaky prachu, ktoré nám hviezdy za sebou zakrývajú.'
        ],
        footnote: 'Presne z takých oblakov sa rodia nové hviezdy – ako v prvej lekcii.',
        cta: 'Chcem to vidieť naživo'
      },
      { type: 'fact', factId: 'mliecna-cesta-pas' },
      {
        type: 'mission',
        title: '📸 MISIA: MLIEČNA CESTA',
        objectId: 'milkyway',
        tasks: [
          { icon: '🔭', text: 'V Stellariu si nájdi, kadiaľ dnes večer vedie pás Mliečnej cesty.' },
          { icon: '🌑', text: 'Choďte na tmavé miesto bez pouličných lámp.' },
          { icon: '📸', text: 'Skús ju odfotografovať – a nájdi na fotke tmavé prachové oblaky.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Vyfotil si vlastnú galaxiu zvnútra. To dokáže málokto.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Ako sa volá naša galaxia?',
            options: [
              { label: 'Mliečna cesta', correct: true },
              { label: 'Andromeda' },
              { label: 'Slnečná soustava' },
              { label: 'Vír' }
            ],
            explain: 'Mliečna cesta. Andromeda je naša susedná galaxia.'
          },
          {
            kind: 'decide',
            question: 'Kde je v galaxii Slnko?',
            options: [
              { icon: '🏘️', label: 'Asi 26 000 svetelných rokov od stredu – na predmestí', correct: true },
              { icon: '🎯', label: 'Presne v strede galaxie' }
            ],
            explain: 'V strede je oveľa hustejšie a je tam čierna diera. My sme pekne v bezpečnej vzdialenosti.'
          },
          {
            kind: 'truefalse',
            question: 'Tmavé miesta v páse Mliečnej cesty sú miesta, kde nie sú žiadne hviezdy.',
            answer: false,
            explain: 'Nie sú to diery. Sú to oblaky prachu, ktoré zakrývajú svetlo hviezd za sebou.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok ukazuje, ako naša galaxia vyzerá zvnútra – teda ako ju vidíme my?',
            options: [
              { image: 'milkyway', label: 'A', correct: true },
              { image: 'm31', label: 'B' }
            ],
            explain: 'A je náš pohľad zvnútra. B je Andromeda – tak by naša galaxia vyzerala zvonku.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najmenšieho po najväčšie.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Zem', order: 1, icon: '🌍' },
              { label: 'Slnko', order: 2, icon: '☀️' },
              { label: 'Slnečná soustava', order: 3, icon: '🪐' },
              { label: 'Mliečna cesta', order: 4, icon: '🌌' }
            ],
            explain: 'Zem obieha Slnko, Slnko je súčasťou Slnečnej soustavy a tá je maličká časť galaxie.'
          }
        ],
        resultGood: '🌟 Vieš, kde žiješ. A to je veľká vec!',
        resultOk: '🔭 Ešte raz – galaxia nikam neuteká.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 5 – GALAXIE
     ========================================================================== */
  {
    id: 'galaxies',
    icon: '🌀',
    title: 'GALAXIE',
    teaser: 'Ostrovy hviezd. A jedna z nich k nám práve teraz letí.',
    minutes: '7 minút',
    badge: 'galaxy-explorer',
    basics: [ 'galaxia', 'typy-galaxii', 'miestna-grupa', 'svetelny-rok',
              'magnituda', 'eq-rezim' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm51',
        question: '🔎 ČO MYSLÍŠ, ŽE TO JE?',
        options: [
          { id: 'nebula',  icon: '☁️', label: 'hmlovina' },
          { id: 'galaxy',  icon: '🌀', label: 'galaxia' },
          { id: 'cluster', icon: '✨', label: 'hviezdokopa' },
          { id: 'planet',  icon: '🪐', label: 'planéta' }
        ],
        correct: 'galaxy',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Galaxia je obrovský ostrov hviezd – miliardy hviezd, plyn a prach držané pohromade gravitáciou.',
        retryText: 'Skús ešte raz. Vidíš tie ramená, ktoré sa točia okolo stredu? To je vodítko.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌀 OSTROVY HVIEZD',
        image: 'm31',
        lines: [
          'Galaxia nie je jedna hviezda ani jeden oblak. Je to celý ostrov hviezd.',
          'Naša Mliečna cesta ich má stovky miliárd – a takých galaxií je vo vesmíre viac než ľudí na Zemi.',
          'Najbližšia veľká galaxia sa volá Andromeda.'
        ],
        more: [
          'Galaxie nie sú vo vesmíre rozsypané náhodne. Držia sa v skupinách a kopách, tie sa spájajú do nadkôp a tie tvoria vlákna, medzi ktorými sú obrovské prázdne bubliny. Vo veľkom meradle vesmír vyzerá skoro ako pena alebo pavučina.',
          'Tvar galaxie prezradí jej minulosť: špirály majú ešte dosť plynu a stále v nich vznikajú nové hviezdy, kým eliptické galaxie plyn už spotrebovali a sú plné starých červených hviezd.',
          'Väčšina veľkých galaxií vrátane našej má v samom strede obrovskú čiernu dieru. Nie je to náhoda – galaxia a jej čierna diera rástli spolu.'
        ],
        cta: 'Ako sa dá zistiť, ktorá je ktorá?'
      },
      { type: 'fact', factId: 'andromeda-25' },
      {
        type: 'cards',
        title: 'TRI TVARY GALAXIÍ',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌀', name: 'Špirálová', short: 'Ramená a disk.',
            text: 'Má disk so špirálovými ramenami, v ktorých sa stále rodia nové hviezdy. Taká je naša galaxia aj Andromeda.',
            image: 'm51', exampleLabel: 'Príklad: M51, M31' },
          { icon: '🥚', name: 'Eliptická', short: 'Guľa starých hviezd.',
            text: 'Nemá ramená ani disk – len obrovská guľa či ovál starých hviezd. Nové hviezdy sa v nej takmer nerodia.',
            image: 'omegacen', exampleLabel: 'Vyzerá ako veľká hviezdna guľa' },
          { icon: '💫', name: 'Nepravidelná', short: 'Bez tvaru.',
            text: 'Rozhádzaná galaxia bez pravidelného tvaru. Často preto, že do nej narazila iná galaxia.',
            image: 'carina', exampleLabel: 'Často po zrážke galaxií' }
        ],
        cta: 'Ideme na úlohu',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 NAJDI GALAXIU',
        prompt: 'Ktorý z týchto objektov je galaxia?',
        options: [
          { image: 'm13', correct: false, explain: 'Toto je guľová hviezdokopa – stotisíc hviezd. Galaxia ich má miliardy.' },
          { image: 'm42', correct: false, explain: 'Toto je hmlovina v našej galaxii – oblak plynu, kde sa rodia hviezdy.' },
          { image: 'm31', correct: true,  explain: 'Presne! Andromeda – celá galaxia s miliardami hviezd, 2,5 milióna svetelných rokov daleko.' },
          { image: 'saturn', correct: false, explain: 'Toto je planéta Saturn. Tá je „za rohom“ – v našej Slnečnej soustave.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Andromeda sa k nám približuje. Dlho sa hovorilo, že o štyri miliardy rokov sa naše galaxie zrazia.',
          'V roku 2025 ale nové výpočty ukázali, že to nie je isté – je to asi 50 na 50. Takto veda funguje: keď prídu lepšie merania, odpoveď sa opraví.'
        ],
        footnote: 'Ak by sa aj zrazili, hviezdy do seba nenarazia. Vesmír je taký prázdny, že galaxie prejdú jedna cez druhú.',
        cta: 'To je fakt zaujímavé'
      },
      { type: 'fact', factId: 'zrazka-neisto' },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'zorne-pole', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: ANDROMEDA',
        objectId: 'm31',
        tasks: [
          { icon: '🔭', text: 'Nájdi M31 v Stellariu (pomôže ti súhvezdie Kasiopeja – písmeno W).' },
          { icon: '👁️', text: 'Za tmy ju skús nájsť aj voľným okom ako slabú šmuhu.' },
          { icon: '📸', text: 'Odfotografuj ju Dwarfom v EQ režime – potrebuje dlho zbierať svetlo.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Vyfotil si svetlo, ktoré letelo 2,5 milióna rokov. Gratulujem!',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Čo je galaxia?',
            options: [
              { label: 'Obrovský ostrov miliárd hviezd', correct: true },
              { label: 'Oblak plynu, kde sa rodia hviezdy' },
              { label: 'Skupina asi tisíc hviezd' },
              { label: 'Veľmi veľká hviezda' }
            ],
            explain: 'Hmlovina = oblak. Hviezdokopa = tisíce hviezd. Galaxia = miliardy hviezd.'
          },
          {
            kind: 'truefalse',
            question: 'Galaxia v Andromede je taká daleko, že ju voľným okom vôbec nevidno.',
            answer: false,
            explain: 'Je 2,5 milióna svetelných rokov daleko – a napriek tomu ju za tmy voľným okom vidno ako slabú šmuhu.'
          },
          {
            kind: 'image',
            question: 'Ktorá z nich je špirálová galaxia?',
            options: [
              { image: 'm51', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'A má ramená, ktoré sa točia okolo stredu. B je guľová hviezdokopa.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najbližšieho k najvzdialenejšiemu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Mesiac', order: 1, icon: '🌙' },
              { label: 'M42 – Orionova hmlovina', order: 2, icon: '☁️' },
              { label: 'M31 – Andromeda', order: 3, icon: '🌀' },
              { label: 'M51 – galaxia Vír', order: 4, icon: '💫' }
            ],
            explain: 'Mesiac 384 400 km · M42 asi 1 300 sv. rokov · M31 2,5 milióna · M51 31 miliónov sv. rokov.'
          },
          {
            kind: 'decide',
            question: 'Čo sa stane s hviezdami, ak sa dve galaxie zrazia?',
            options: [
              { icon: '🌌', label: 'Väčšinou prejdú okolo seba – vesmír je veľmi prázdny', correct: true },
              { icon: '💥', label: 'Všetky hviezdy do seba narazia a vybuchnú' }
            ],
            explain: 'Hviezdy sú od seba tak daleko, že zrážka galaxií je skôr tanec než havária. Menia sa však tvary galaxií.'
          }
        ],
        resultGood: '🌟 Galaxie zvládnuté!',
        resultOk: '🔭 Ešte raz – a budeš objaviteľ galaxií.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 6 – PLANÉTY A MESIAC
     ========================================================================== */
  {
    id: 'planets',
    icon: '🪐',
    title: 'PLANÉTY A MESIAC',
    teaser: 'Objekty, ktoré uvidíš hneď a jasne. Prečo putujú po nebi?',
    minutes: '7 minút',
    badge: 'planet-hunter',
    basics: [ 'planeta', 'plynny-obor', 'mesiac', 'terminator',
              'expozicia', 'seeing', 'astronomicka-jednotka' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'saturn',
        question: '🔎 ČO JE TOTO?',
        options: [
          { id: 'star',   icon: '⭐', label: 'hviezda' },
          { id: 'planet', icon: '🪐', label: 'planéta' },
          { id: 'nebula', icon: '☁️', label: 'hmlovina' },
          { id: 'galaxy', icon: '🌀', label: 'galaxia' }
        ],
        correct: 'planet',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Saturn – planéta s prstencami. Nesvieti sama, len odráža svetlo Slnka.',
        retryText: 'Skús ešte raz. Vidíš tie prstence? Tie má vo Slnečnej soustave jedna veľmi známa planéta.',
        xp: 10
      },
      {
        type: 'info',
        title: '🪐 PLANÉTY PUTUJÚ',
        image: 'jupiter',
        lines: [
          'Hviezdy sú na nebi vždy v rovnakých obrazcoch. Planéty nie – tie sa medzi nimi pomaly presúvajú.',
          'Práve preto dostali svoje meno: „planétes“ znamená po grécky pútnik.',
          'A ešte niečo: hviezdy blikajú, planéty svietia pokojne.'
        ],
        more: [
          'Hviezdy blikajú preto, že sú tak daleko, že ich vidíme ako jediný bod. Vzduch nad nami sa vlní a ten jeden bod svetla poskakuje. Planéta je na nebi malý kotúčik, takže poskakovanie jeho okrajov sa navzájom vyruší a svetlo zostane pokojné.',
          'Planéty nájdeš vždy len v úzkom pásiku oblohy, ktorému sa hovorí ekliptika. Je to preto, že celá Slnečná soustava je plochá ako tanier – planéty obiehajú takmer v jednej rovine.',
          'Občas sa planéta na nebi zdanlivo zastaví a chvíľu ide dozadu. Nespomalila – len ju Zem na svojej vnútornej obežnej dráhe práve predbieha, podobne ako auto v susednom pruhu.'
        ],
        cta: 'Čo sa dá vidieť?'
      },
      { type: 'fact', factId: 'saturn-prstence-tenke' },
      {
        type: 'cards',
        title: 'TRI CIELE PRE PRVÝ VEČER',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌙', name: 'Mesiac', short: 'Najľahší cieľ.',
            text: 'Uvidíš krátery aj hory. Najkrajšie sú na hranici svetla a tmy, kde vrhajú dlhé tiene. Je 384 400 km daleko.',
            image: 'moon', exampleLabel: 'Najlepšie mimo splnu' },
          { icon: '🪐', name: 'Saturn', short: 'Planéta s prstencami.',
            text: 'Malý, ale nezameniteľný. Prstence sú z miliárd kúskov ľadu – a sú tenké ako list papiera.',
            image: 'saturn', exampleLabel: 'Prstence uvidíš aj v Dwarfe' },
          { icon: '🟠', name: 'Jupiter', short: 'Najväčšia planéta.',
            text: 'Vedľa neho uvidíš štyri bodky – jeho veľké mesiace. Každý večer sú inde, lebo ho obiehajú.',
            image: 'jupiter', exampleLabel: 'Sleduj mesiace dva večery' }
        ],
        cta: 'Ako ich odfotiť?',
        xp: 15
      },
      {
        type: 'howto',
        title: '📸 AKO FOTIŤ JASNÉ OBJEKTY',
        lead: 'Planéty a Mesiac sú úplne iná disciplína ako hmloviny. Tu je svetla dosť – problém je nepokojný vzduch.',
        steps: [
          { icon: '⚡', title: 'Krátke expozície',
            text: 'Mesiac a planéty sú jasné. Dlhá expozícia ich len prepáli do bielej škvrny.' },
          { icon: '🧩', title: 'Veľa krátkych snímok',
            text: 'Zober ich stovky a nechaj Dwarf poskladať tie najostrejšie. Tak sa „prebije“ chvenie vzduchu.' },
          { icon: '📐', title: 'Nefoť nízko nad obzorom',
            text: 'Pri zemi je vzduch najviac rozvírený. Čakaj, kým bude objekt vyššie na oblohe.' },
          { icon: '🧭', title: 'EQ režim tu netreba',
            text: 'Expozície sú také krátke, že sa hviezdy nestihnú pootočiť. Ušetríš si nastavovanie.' }
        ],
        note: 'Preto sa planéty fotia úplne inak než hmloviny – a preto sú výborné na začiatok večera.',
        cta: 'Rozumiem, ideme ďalej',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Krátery na Mesiaci sú diery po zásahoch, ktoré tam zostanú aj miliardy rokov.',
          'Nie je tam totiž skoro žiadny vzduch – žiadny dážď, vietor ani rieky, ktoré by ich zahladili.'
        ],
        footnote: 'Stopy astronautov z misií Apollo sú tam preto stále.',
        cta: 'Ideme fotiť!'
      },
      { type: 'fact', factId: 'jupiter-galileo' },
      {
        type: 'mission',
        title: '📸 MISIA: MESIAC',
        objectId: 'moon',
        tasks: [
          { icon: '🔭', text: 'V Stellariu zisti, v akej fáze je dnes Mesiac.' },
          { icon: '📸', text: 'Odfotografuj ho Dwarfom s krátkou expozíciou.' },
          { icon: '🔍', text: 'Nájdi na fotke hranicu svetla a tmy – tam sú krátery najkrajšie.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Mesiac je v zbierke. Ak je práve na nebi Saturn alebo Jupiter, skús aj tie.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo sa planéty na nebi presúvajú medzi hviezdami?',
            options: [
              { label: 'Lebo obiehajú okolo Slnka blízko nás', correct: true },
              { label: 'Lebo sú väčšie ako hviezdy' },
              { label: 'Lebo svietia vlastným svetlom' },
              { label: 'Lebo ich tlačí slnečný vietor' }
            ],
            explain: 'Sú blízko a obiehajú Slnko, preto ich vidíme z rôznych smerov. Hviezdy sú tak daleko, že sa nám zdajú stále na tom istom mieste.'
          },
          {
            kind: 'truefalse',
            question: 'Pri fotení Mesiaca potrebuješ dlhé expozície a EQ režim.',
            answer: false,
            explain: 'Presne naopak. Mesiac je veľmi jasný – potrebuje krátke expozície a EQ režim mu netreba.'
          },
          {
            kind: 'image',
            question: 'Ktorý z nich je Jupiter?',
            options: [
              { image: 'jupiter', label: 'A', correct: true },
              { image: 'saturn', label: 'B' }
            ],
            explain: 'A má pásy oblakov a Veľkú červenú škvrnu. B je Saturn s prstencami.'
          },
          {
            kind: 'decide',
            question: 'Prečo na Mesiaci zostávajú krátery miliardy rokov?',
            options: [
              { icon: '🌬️', label: 'Nie je tam takmer žiadny vzduch, dážď ani vietor', correct: true },
              { icon: '🪨', label: 'Lebo je z veľmi tvrdého kameňa' }
            ],
            explain: 'Na Zemi krátery zahladí voda, vietor a rastliny. Na Mesiaci nemá čo.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najbližšieho k Zemi po najvzdialenejšie.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Mesiac', order: 1, icon: '🌙' },
              { label: 'Jupiter', order: 2, icon: '🟠' },
              { label: 'Saturn', order: 3, icon: '🪐' },
              { label: 'Orionova hmlovina', order: 4, icon: '☁️' }
            ],
            explain: 'Mesiac je „za dverami“, planéty v našej soustave a hmlovina až tisíce svetelných rokov daleko.'
          }
        ],
        resultGood: '🌟 Lovec planét je na svete!',
        resultOk: '🔭 Ešte raz – planéty nikam neutečú.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 7 – HVIEZDY A DVOJHVIEZDY
     ========================================================================== */
  {
    id: 'stars',
    icon: '⭐',
    title: 'HVIEZDY',
    teaser: 'Prečo sú niektoré modré a iné červené? A čo sú dvojhviezdy?',
    minutes: '7 minút',
    badge: 'star-expert',
    basics: [ 'hviezda', 'farba-teplota', 'magnituda', 'dvojhviezda',
              'opticka-dvojica', 'biely-karlik' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'albireo',
        question: '🔎 PREČO MAJÚ TIETO DVE HVIEZDY INÚ FARBU?',
        options: [
          { id: 'temp',   icon: '🌡️', label: 'majú inú teplotu' },
          { id: 'dist',   icon: '📏', label: 'jedna je bližšie' },
          { id: 'camera', icon: '📷', label: 'je to chyba fotoaparátu' },
          { id: 'age',    icon: '🎂', label: 'jedna má meniny' }
        ],
        correct: 'temp',
        successTitle: '🎉 PRESNE TAK!',
        successText: 'Farba hviezdy prezradí, ako je horúca. Modrá je najhorúcejšia, červená najchladnejšia.',
        retryText: 'Skús ešte raz. Pomôcka: aj rozžeravené železo mení farbu podľa toho, ako je horúce.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌈 FARBA = TEPLOTA',
        image: 'starBlue',
        lines: [
          'Hviezdy nie sú všetky biele. Majú farbu podľa toho, ako sú horúce.',
          'Modré sú najhorúcejšie, žlté ako naše Slnko sú stredné, červené najchladnejšie.',
          'Je to naopak, ako to máme na kohútikoch s vodou.'
        ],
        more: [
          'Farba hviezdy hovorí o teplote, nie o veľkosti ani o vzdialenosti. Všetko horúce svieti – čím horúcejšie, tým modrejšie. Rozžeravený drôt v starej žiarovke je oranžový, plameň sporáka je modrý a s hviezdami je to presne tak isto.',
          'Modré hviezdy sú najhorúcejšie, ale žijú najkratšie – palivo spálila len za pár miliónov rokov. Malé červené hviezdy sú úsporné a vydržia svietiť aj bilión rokov, teda mnohonásobne dlhšie, než je dnes starý celý vesmír.',
          'Pozor na jednu pascu: červená hviezda môže byť malá a chladná, ale aj obrovský starý obor, ktorý sa na konci života nafúkol a preto vychladol. Astronómi ich rozlíšia podľa toho, ako veľmi žiaria.'
        ],
        cta: 'Ukáž mi ich'
      },
      { type: 'fact', factId: 'farba-teplota' },
      {
        type: 'cards',
        title: 'TRI FARBY, TRI TEPLOTY',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🔵', name: 'Modrá', short: 'Najhorúcejšia.',
            text: 'Na povrchu má aj desaťtisíce stupňov. Také hviezdy sú obrovské, svietia zbesilo – a žijú krátko.',
            image: 'starBlue', exampleLabel: 'Napríklad Rigel v Orióne' },
          { icon: '🟡', name: 'Žltá', short: 'Ako naše Slnko.',
            text: 'Stredná teplota, asi 5 500 °C na povrchu. Takéto hviezdy žijú dlho a pokojne – aj miliardy rokov.',
            image: 'starYellow', exampleLabel: 'Napríklad Slnko' },
          { icon: '🔴', name: 'Červená', short: 'Najchladnejšia.',
            text: 'Najchladnejšie z hviezd. Sú to buď malé úsporné hviezdičky, alebo staré nafúknuté obry.',
            image: 'starRed', exampleLabel: 'Napríklad Betelgeuse' }
        ],
        cta: 'A čo dvojhviezdy?',
        xp: 15
      },
      {
        type: 'compare',
        title: '👯 JEDNA HVIEZDA, ALEBO DVE?',
        lead: 'Niektoré hviezdy sa pri priblížení rozdelia na dve. Volajú sa dvojhviezdy.',
        eye: {
          icon: '👁️',
          label: 'VOĽNÝM OKOM',
          art: 'polaris',
          text: 'Vidíš jednu hviezdu. Aj Polárka vyzerá ako jedna – a pritom sú to tri hviezdy.'
        },
        camera: {
          icon: '🔭',
          label: 'V ĎALEKOHĽADE',
          image: 'albireo',
          text: 'Albireo v Labuti sa rozdelí na dve hviezdy – jednu modrú a jednu žltú. Je to jeden z najkrajších pohľadov na oblohe.'
        },
        check: {
          question: 'Sú všetky dvojice hviezd naozaj spolu?',
          options: [
            { label: 'Nie – niektoré len ležia v rovnakom smere', correct: true,
              explain: 'Áno. Skutočné dvojhviezdy sa obiehajú, ale „optické dvojice“ sú len náhodne v rovnakom smere a v skutočnosti sú od seba veľmi daleko.' },
            { label: 'Áno, každá dvojica sa vždy obieha', correct: false,
              explain: 'To nie. Astronómi rozlišujú skutočné dvojhviezdy a optické dvojice, ktoré len tak vyzerajú.' }
          ]
        },
        cta: 'Chcem vedieť viac'
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Naše Slnko je úplne obyčajná hviezda. Nič výnimočné – len strašne blízko.',
          'Keby si sa naň pozeral z inej hviezdy, bola by to len ďalšia malá žltá tečka medzi tisíckami.'
        ],
        footnote: 'A väčšina hviezd na nebi nie je sama – majú spoločníka, presne ako Albireo.',
        cta: 'Ideme si vybrať cieľ'
      },
      { type: 'fact', factId: 'albireo-modra-zlta' },
      { type: 'fact', factId: 'polarka-nebude-vzdy' },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'farba-teplota', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: ALBIREO',
        objectId: 'albireo',
        tasks: [
          { icon: '🔭', text: 'Nájdi Albireo v Stellariu – je to hlava Labute.' },
          { icon: '📸', text: 'Odfotografuj ju Dwarfom krátkou expozíciou.' },
          { icon: '🌈', text: 'Nájdi na fotke tú modrú a tú žltú hviezdu.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Máš dvojhviezdu v zbierke – a s ňou aj dve farby, teda dve teploty.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'image',
            question: 'Ktorá z týchto hviezd je najhorúcejšia?',
            options: [
              { image: 'starBlue', label: 'A', correct: true },
              { image: 'starYellow', label: 'B' },
              { image: 'starRed', label: 'C' }
            ],
            explain: 'Modrá je najhorúcejšia, žltá stredná, červená najchladnejšia.'
          },
          {
            kind: 'choice',
            question: 'Akú farbu má naše Slnko medzi hviezdami?',
            options: [
              { label: 'Žltú – je to stredne horúca hviezda', correct: true },
              { label: 'Modrú – je najhorúcejšie zo všetkých' },
              { label: 'Červenú – je už staré' },
              { label: 'Nemá farbu, je priehľadné' }
            ],
            explain: 'Slnko je stredne horúca žltá hviezda. Nič výnimočné – len blízko.'
          },
          {
            kind: 'truefalse',
            question: 'Každá dvojica hviezd, ktorú vidíme blízko seba, sa naozaj navzájom obieha.',
            answer: false,
            explain: 'Nie. Skutočné dvojhviezdy sa obiehajú, ale optické dvojice len ležia v rovnakom smere.'
          },
          {
            kind: 'order',
            question: 'Zoraď hviezdy od najchladnejšej po najhorúcejšiu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Červená', order: 1, icon: '🔴' },
              { label: 'Žltá (ako Slnko)', order: 2, icon: '🟡' },
              { label: 'Biela', order: 3, icon: '⚪' },
              { label: 'Modrá', order: 4, icon: '🔵' }
            ],
            explain: 'Červená → žltá → biela → modrá. Modrá je najhorúcejšia.'
          },
          {
            kind: 'decide',
            question: 'Prečo hviezdy blikajú, ale planéty skoro nie?',
            options: [
              { icon: '🌬️', label: 'Hviezdy sú len bod svetla, ktorý vzduch ľahko rozhýbe', correct: true },
              { icon: '🔋', label: 'Hviezdy majú vypínač a striedavo zhasínajú' }
            ],
            explain: 'Blikanie robí náš nepokojný vzduch. Planéta je na nebi malý disk, nie bod – preto sa jej blikanie „vyrovná“.'
          }
        ],
        resultGood: '🌟 Znalec hviezd!',
        resultOk: '🔭 Ešte raz – farby sa naučíš hneď.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 8 – SUPERNOVY
     ========================================================================== */
  {
    id: 'supernovae',
    icon: '💥',
    title: 'SUPERNOVY',
    teaser: 'Keď veľkej hviezde skončí palivo, stane sa niečo obrovské.',
    minutes: '7 minút',
    badge: 'supernova-witness',
    basics: [ 'supernova', 'neutronova-hviezda', 'pulzar', 'typy-hmlovin',
              'gravitacia', 'svetelny-rok' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm1',
        question: '🔎 ČO MYSLÍŠ, ČO TO JE?',
        options: [
          { id: 'boom',    icon: '💥', label: 'zvyšok po výbuchu hviezdy' },
          { id: 'birth',   icon: '👶', label: 'miesto, kde sa práve rodí hviezda' },
          { id: 'galaxy',  icon: '🌀', label: 'galaxia' },
          { id: 'cluster', icon: '✨', label: 'hviezdokopa' }
        ],
        correct: 'boom',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Krabia hmlovina je zvyšok hviezdy, ktorá vybuchla. Ten výbuch sa volá supernova.',
        retryText: 'Skús ešte raz. Všimni si tie vlákna, ktoré letia od stredu do všetkých strán – ako po explózii.',
        xp: 10
      },
      {
        type: 'info',
        title: '💥 KEĎ HVIEZDE SKONČÍ PALIVO',
        image: 'm1',
        lines: [
          'Veľká hviezda svieti tak, že v sebe spaľuje palivo. Raz sa jej ale skončí.',
          'Vtedy sa jej stred zrúti a hviezda vybuchne – na niekoľko týždňov svieti ako miliardy Sĺnk.',
          'Do vesmíru pritom rozfúka všetko, čo v sebe vyrobila.'
        ],
        more: [
          'Hviezda svieti, pretože v jej strede sa vodík mení na hélium a pritom sa uvoľňuje energia. Tá tlačí zvnútra von a drží hviezdu nafúknutú proti jej vlastnej gravitácii. Keď palivo skončí, tlak zmizne a stred sa v priebehu sekúnd zrúti.',
          'Pri výbuchu vzniknú a rozletia sa do vesmíru látky, ktoré by inak nikdy nevznikli – napríklad veľká časť železa. Zmiešajú sa s hmlovinami a stanú sa časťou nových hviezd a planét. Železo v tvojej krvi je z takéhoto výbuchu. Tie najťažšie kovy ako zlato vznikajú ešte extrémnejšie – hlavne pri zrážkach neutrónových hviezd.',
          'Zo stredu hviezdy zostane buď neutrónová hviezda – guľa veľká ako mesto, ale takej hustoty, že by jedna lyžička vážila milióny ton – alebo čierna diera.'
        ],
        cta: 'A čo zostane potom?'
      },
      { type: 'fact', factId: 'krab-1054' },
      {
        type: 'cards',
        title: 'ČO ZOSTANE PO VÝBUCHU',
        subtitle: 'Otoč obe karty.',
        cards: [
          { icon: '💥', name: 'Hmlovina z vlákien', short: 'Rozfúkané zbytky hviezdy.',
            text: 'Plyn letí od stredu von rýchlosťou tisícok kilometrov za sekundu a svieti. Presne to vidíme ako Krabiu hmlovinu.',
            image: 'm1', exampleLabel: 'Príklad: M1 Krabia hmlovina' },
          { icon: '💫', name: 'Neutrónová hviezda', short: 'Stred, ktorý sa zrútil.',
            text: 'Zo stredu zostane malá guľa veľká ako mesto, ale ťažká ako celé Slnko. Točí sa tak rýchlo, že bliká ako maják.',
            image: 'neutron', exampleLabel: 'Bliká 30-krát za sekundu' }
        ],
        cta: 'Ideme na úlohu',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 UHÁDNI SPRÁVNU HMLOVINU',
        prompt: 'Ktorá z nich vznikla výbuchom hviezdy?',
        options: [
          { image: 'm42', correct: false, explain: 'Toto je Orionova hmlovina – tam sa hviezdy práve rodia. Presne naopak.' },
          { image: 'm1',  correct: true,  explain: 'Áno! Krabia hmlovina – zvyšok supernovy z roku 1054. Vlákna stále letia od stredu.' },
          { image: 'ring', correct: false, explain: 'Chyták! Prstencová hmlovina je tiež od umierajúcej hviezdy, ale tá nevybuchla – iba pokojne odhodila svoje vrstvy.' },
          { image: 'm78', correct: false, explain: 'Toto je reflexná hmlovina – prach, ktorý odráža svetlo hviezdy.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Železo v tvojej krvi, kyslík, ktorý dýchaš, aj zlato v prsteňoch – to všetko vzniklo pri smrti hviezd.',
          'Sme doslova zvyšky dávnych hviezd, ktoré vybuchli ešte pred vznikom Slnka.'
        ],
        footnote: 'Preto sa hovorí, že sme z hviezdneho prachu. Nie je to poézia – je to chémia.',
        cta: 'Ideme si to odfotiť'
      },
      { type: 'fact', factId: 'pulzar-30x' },
      {
        type: 'mission',
        title: '📸 MISIA: KRABIA HMLOVINA',
        objectId: 'm1',
        tasks: [
          { icon: '🔭', text: 'Nájdi M1 v Stellariu – je v Býkovi, blízko hviezdy Aldebaran.' },
          { icon: '⚙️', text: 'Zapni EQ režim. M1 je slabá, treba dlho zbierať svetlo.' },
          { icon: '📸', text: 'Odfotografuj ju a skús nájsť vlákna.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Máš v zbierke pozostatok výbuchu, ktorý ľudia videli v roku 1054.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Čo je supernova?',
            options: [
              { label: 'Výbuch veľkej hviezdy na konci jej života', correct: true },
              { label: 'Veľmi nová hviezda, ktorá sa práve zrodila' },
              { label: 'Iný názov pre galaxiu' },
              { label: 'Planéta, ktorá sa rozpadla' }
            ],
            explain: 'Napriek menu nie je „nová“. Je to výbuch na konci života veľkej hviezdy.'
          },
          {
            kind: 'truefalse',
            question: 'Supernovu z roku 1054 videli ľudia na vlastné oči.',
            answer: true,
            explain: 'Čínski astronómi si zapísali „hosťujúcu hviezdu“, ktorú bolo takmer mesiac vidno aj cez deň.'
          },
          {
            kind: 'image',
            question: 'Ktorá hmlovina je pozostatkom supernovy?',
            options: [
              { image: 'm1', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'A je Krabia hmlovina – zvyšok výbuchu. B je Orionova hmlovina, kde sa hviezdy rodia.'
          },
          {
            kind: 'order',
            question: 'Zoraď život veľkej hviezdy od začiatku do konca.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Oblak plynu a prachu', order: 1, icon: '☁️' },
              { label: 'Veľká horúca hviezda', order: 2, icon: '🔵' },
              { label: 'Skončí sa jej palivo', order: 3, icon: '⏳' },
              { label: 'Vybuchne ako supernova', order: 4, icon: '💥' },
              { label: 'Zostane neutrónová hviezda', order: 5, icon: '💫' }
            ],
            explain: 'A z rozfúkaného plynu sa neskôr môžu narodiť nové hviezdy. Kolobeh pokračuje.'
          },
          {
            kind: 'decide',
            question: 'Odkiaľ je železo v tvojej krvi?',
            options: [
              { icon: '💥', label: 'Vzniklo pri smrti dávnych hviezd', correct: true },
              { icon: '🏭', label: 'Vzniklo na Zemi v jej jadre' }
            ],
            explain: 'Ťažké prvky sa vyrobili vo hviezdach a pri ich výbuchoch. Zem ich už len podedila.'
          }
        ],
        resultGood: '🌟 Svedok supernovy!',
        resultOk: '🔭 Ešte raz – tá 1054 sa pamätá ľahko.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 9 – ČIERNE DIERY
     ========================================================================== */
  {
    id: 'blackholes',
    icon: '⚫',
    title: 'ČIERNE DIERY',
    teaser: 'Miesto, odkiaľ neujde ani svetlo. A jedna je aj u nás doma.',
    minutes: '8 minút',
    badge: 'darkness-scout',
    basics: [ 'cierna-diera', 'horizont-udalosti', 'supermasivna', 'gravitacia',
              'svetelny-rok', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'sgra',
        question: '🔎 ČO JE NA TEJTO SLÁVNEJ FOTKE?',
        options: [
          { id: 'bh',     icon: '⚫', label: 'čierna diera' },
          { id: 'planet', icon: '🪐', label: 'planéta s prstencom' },
          { id: 'nebula', icon: '☁️', label: 'hmlovina' },
          { id: 'star',   icon: '⭐', label: 'hviezda zblízka' }
        ],
        correct: 'bh',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Je to Sagittarius A* – čierna diera v strede našej galaxie. Tá tma v strede je ona.',
        retryText: 'Skús ešte raz. To svetlo je horúci plyn, ktorý sa točí okolo niečoho, čo je úplne čierne.',
        xp: 10
      },
      {
        type: 'info',
        title: '⚫ ODKIAĽ NEUJDE ANI SVETLO',
        image: 'sgra',
        lines: [
          'Čierna diera je miesto, kde je hmota natlačená do tak malého bodu, že jej gravitácia je obrovská.',
          'Nič, čo sa dostane príliš blízko, už neunikne – ani svetlo.',
          'Preto ju nevidíme priamo. Vidíme len žiariaci plyn, ktorý sa okolo nej točí.'
        ],
        more: [
          'Čierna diera nie je diera ani vysávač. Je to obyčajná hmota, len natlačená do neuveriteľne malého miesta. Keby si Slnko stlačil do gule s priemerom šesť kilometrov, stala by sa z neho čierna diera – a planéty by okolo neho obiehali presne tak ako dnes.',
          'Hranica, za ktorou už nič neunikne, sa nazýva horizont udalostí. Nie je to žiadny povrch – je to len miesto, odkiaľ by aj svetlo muselo letieť rýchlejšie než svetlo, aby sa dostalo von.',
          'Prvú fotografiu čiernej diery zverejnili astronómi v roku 2019. Nie je na nej vidieť diera samotná, ale jej tmavý tieň v žiariacom plyne okolo – a presne to teória predpovedala.'
        ],
        cta: 'Odkiaľ sa berú?'
      },
      { type: 'fact', factId: 'sgra-4mil' },
      {
        type: 'cards',
        title: 'DVA DRUHY ČIERNYCH DIER',
        subtitle: 'Otoč obe karty.',
        cards: [
          { icon: '💥', name: 'Z veľkej hviezdy', short: 'Zostane po supernove.',
            text: 'Keď je hviezda naozaj veľká, jej stred sa po výbuchu zrúti až na čiernu dieru. Váži niekoľkonásobok Slnka.',
            image: 'm1', exampleLabel: 'Vzniká po výbuchu hviezdy' },
          { icon: '🌌', name: 'Supermasívna', short: 'V strede galaxií.',
            text: 'Sedí v strede skoro každej veľkej galaxie a váži milióny až miliardy Sĺnk. Tá naša sa volá Sagittarius A*.',
            image: 'sgra', exampleLabel: 'Sagittarius A* – 4 milióny Sĺnk' }
        ],
        cta: 'Ale ako sa to dá vyfotiť?',
        xp: 15
      },
      {
        type: 'howto',
        title: '📸 AKO VYFOTIŤ NIEČO, ČO NESVIETI',
        lead: 'Toto je jeden z najväčších trikov v histórii astronómie.',
        steps: [
          { icon: '🌍', title: 'Spojili osem observatórií',
            text: 'Rádiové ďalekohľady po celej planéte pozorovali naraz to isté miesto – a spolu fungovali ako jeden ďalekohľad veľký ako Zem.' },
          { icon: '⏱️', title: 'Pozorovali veľa hodín v kuse',
            text: 'Presne ako pri dlhej expozícii v Dwarfe. Čím dlhšie, tým viac signálu.' },
          { icon: '💻', title: 'Počítače dali dáta dokopy',
            text: 'Z hôr dát počítače poskladali obraz. Plyn okolo diery sa hýbe tak rýchlo, že museli spočítať priemer z mnohých obrázkov.' },
          { icon: '🎉', title: '12. mája 2022',
            text: 'Astronómi ukázali svetu prvú fotku čiernej diery v strede našej galaxie.' }
        ],
        note: 'Rovnaký princíp ako tvoje skladanie snímok – len v obrovskom meradle.',
        cta: 'To je super',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Tá čierna diera je 27 000 svetelných rokov daleko a váži ako štyri milióny Sĺnk – a celý čas tam bola potichu.',
          'Svetlo z jej okolia letelo k nám 27 000 rokov. Keď vyrazilo, ľudia na Zemi kreslili do jaskýň.'
        ],
        footnote: 'Nemusíš sa báť: sme od nej tak daleko, že nás nijako neohrozuje.',
        cta: 'Ideme na misiu'
      },
      { type: 'fact', factId: 'eht-zemsky-dalekohlad' },
      {
        type: 'mission',
        title: '📸 MISIA: SMER STRED GALAXIE',
        objectId: 'sgra',
        tasks: [
          { icon: '🔭', text: 'V Stellariu napíš „Sgr A*“ a nájdi ho v súhvezdí Strelec.' },
          { icon: '🌌', text: 'Zisti, kedy je Strelec nad obzorom – najlepšie v lete a v prvej polovici jesene.' },
          { icon: '📸', text: 'Odfotografuj tú oblasť Dwarfom. Samotnú dieru neuvidíš, ale fotíš smer do stredu našej galaxie.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Máš v zbierke stred vlastnej galaxie. Málokto vie, kde na nebi ho hľadať.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo sa čierna diera nazýva čierna?',
            options: [
              { label: 'Lebo z nej neunikne ani svetlo', correct: true },
              { label: 'Lebo je vyrobená z čierneho prachu' },
              { label: 'Lebo je vidno len v noci' },
              { label: 'Lebo je zafarbená na fotkách' }
            ],
            explain: 'Jej gravitácia je taká silná, že ani svetlo z nej neujde. Preto je na fotke tmavá.'
          },
          {
            kind: 'truefalse',
            question: 'V strede našej galaxie je supermasívna čierna diera.',
            answer: true,
            explain: 'Volá sa Sagittarius A*, váži ako štyri milióny Sĺnk a je 27 000 svetelných rokov daleko.'
          },
          {
            kind: 'decide',
            question: 'Ako astronómi vyfotili čiernu dieru, keď nesvieti?',
            options: [
              { icon: '🌍', label: 'Spojili observatóriá po celej Zemi a zachytili svetlo plynu okolo nej', correct: true },
              { icon: '🚀', label: 'Poslali k nej sondu s fotoaparátom' }
            ],
            explain: 'Sonda by tam letela stovky miliónov rokov. Použili „ďalekohľad veľký ako Zem“.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok je fotka čiernej diery?',
            options: [
              { image: 'sgra', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'A je Sagittarius A*. B je planetárna hmlovina – tiež prstenec, ale úplne iný objekt.'
          },
          {
            kind: 'order',
            question: 'Zoraď podľa hmotnosti od najmenšej po najväčšiu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Zem', order: 1, icon: '🌍' },
              { label: 'Slnko', order: 2, icon: '☀️' },
              { label: 'Neutrónová hviezda', order: 3, icon: '💫' },
              { label: 'Sagittarius A*', order: 4, icon: '⚫' }
            ],
            explain: 'Neutrónová hviezda váži viac ako Slnko, ale Sagittarius A* váži ako štyri milióny Sĺnk.'
          }
        ],
        resultGood: '🌟 Prieskumník temnoty!',
        resultOk: '🔭 Ešte raz – toto je najtvrdšia lekcia.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 10 – DWARF NAOSTRO (praktická)
     ========================================================================== */
  {
    id: 'dwarf-practice',
    icon: '🔭',
    title: 'DWARF NAOSTRO',
    teaser: 'Čo v Dwarfe nastaviť, na čo si dať pozor a čo od neho čakať.',
    minutes: '8 minút',
    badge: 'dwarf-operator',
    basics: [ 'expozicia', 'gain', 'snimka', 'skladanie',
              'sum', 'ostrenie', 'darkframe', 'kalibracia',
              'zorne-pole', 'vyska-nad-obzorom' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm27',
        question: '🔎 FOTKA HMLOVINY JE TAKMER ČIERNA. ČO UROBÍŠ?',
        options: [
          { id: 'more',  icon: '⏱️', label: 'Predĺžim expozíciu a pridám snímky' },
          { id: 'zoom',  icon: '🔍', label: 'Zväčším priblíženie' },
          { id: 'clean', icon: '🧽', label: 'Utriem objektív' },
          { id: 'close', icon: '🚗', label: 'Pôjdem k nej bližšie' }
        ],
        correct: 'more',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Slabé objekty potrebujú čas. Dlhšia expozícia a viac snímok – nič iné nepomôže.',
        retryText: 'Skús ešte raz. Hmlovina nie je malá, je slabá. Čo teda treba pridať?',
        xp: 10
      },
      {
        type: 'info',
        title: '🔭 DWARF MÁ TRI REŽIMY',
        image: 'm44',
        lines: [
          'Nie každý objekt sa fotí rovnako – preto má Dwarf tri režimy.',
          'Keď zvolíš správny, appka za teba nastaví väčšinu vecí.',
          'Zvyšok si nastavíš sám a práve v tom je rozdiel medzi bledou a krásnou fotkou.'
        ],
        more: [
          'Dôležité je pochopiť rozdiel medzi expozíciou a gainom. Expozícia je čas, počas ktorého senzor naozaj zbiera svetlo – dlhšia expozícia znamená viac skutočného svetla. Gain je len zosilnenie toho, čo už senzor nazbieral, podobne ako keď zosilníš potichu nahranú pesničku: bude hlasnejšia, ale aj zašumenejšia.',
          'Preto sa vždy najprv snažíme predĺžiť expozíciu a zvýšiť počet snímok, a gain zvyšujeme až vtedy, keď to inak nejde.',
          'A ešte jedna vec, ktorú začiatočníci podceňujú: zaostrenie. Aj tá najlepšie nastavená expozícia je zbytočná, ak sú hviezdy rozmazané. Zaostruj vždy na jasnú hviezdu a hľadaj bod, kde je najmenšia a najostrejšia.'
        ],
        cta: 'Ktoré to sú?'
      },
      {
        type: 'cards',
        title: 'KEDY KTORÝ REŽIM',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌄', name: 'General', short: 'Denné fotenie.',
            text: 'Na krajinu, oblaky, zvieratá. Máš na výber širokouhlý alebo ďalekohľadový objektív, foto, video aj časosběr.',
            image: 'citysky', exampleLabel: 'Cez deň a na krajinu' },
          { icon: '🌌', name: 'Deep Sky', short: 'Hmloviny, galaxie, hviezdokopy.',
            text: 'Tu Dwarf skladá stovky snímok na sebe. Práve v tomto režime treba nastaviť expozíciu, gain a počet snímok.',
            image: 'm42', exampleLabel: 'Slabé objekty ďaleko v galaxii' },
          { icon: '🌙', name: 'Solar System', short: 'Slnko, Mesiac, planéty.',
            text: 'Pre jasné objekty blízko nás. Dwarf sám zvolí veľmi krátke expozície – a Slnko sa smie fotiť len s priloženým filtrom.',
            image: 'moonphase', exampleLabel: 'Jasné objekty v našej soustave' }
        ],
        cta: 'Ako nastaviť Deep Sky?',
        xp: 15
      },
      { type: 'fact', factId: 'dwarf-15s' },
      {
        type: 'howto',
        title: '⚙️ NASTAVENIE PRE HMLOVINY A GALAXIE',
        lead: 'Štyri čísla, ktoré rozhodujú o tom, ako bude fotka vyzerať.',
        steps: [
          { icon: '⏱️', title: 'Expozícia 15 – 60 sekúnd',
            text: 'Koľko svetla zbiera jedna snímka. Automatika nedá viac než 15 s, preto prepni na ručné. V EQ režime zvládne aj 90 s.' },
          { icon: '🎚️', title: 'Gain 60 – 80',
            text: 'Zosilnenie signálu. Málo gainu = tmavá fotka, veľa gainu = šum. U ďalekohľadového objektívu sa nedá ísť pod 40.' },
          { icon: '🧩', title: '200 – 400 snímok',
            text: 'Čím viac snímok Dwarf poskladá, tým čistejšia fotka. Sto snímok je minimum, štyristo je paráda.' },
          { icon: '⬛', title: 'Dark framy',
            text: 'Snímky so zakrytým objektívom, ktorými sa odpočíta šum senzora. Musia mať rovnakú expozíciu, gain aj podobnú teplotu (do ±8 °C).' }
        ],
        note: 'Pravidlo pre pamäť: dlhá expozícia dá jasnosť, veľa snímok dá čistotu.',
        cta: 'Rozumiem, ideme ďalej',
        xp: 20
      },
      { type: 'fact', factId: 'dwarf-fov' },
      {
        type: 'pick',
        title: '🔎 ZMESTÍ SA TO DO ZÁBERU?',
        prompt: 'Dwarf zaberie 2,45°. Ktorý z týchto objektov sa mu do záberu celý nezmestí?',
        options: [
          { image: 'm44', correct: false, explain: 'Jasličky sa zmestia krásne – to je pre Dwarf ideálny cieľ.' },
          { image: 'm31', correct: true,  explain: 'Presne! Andromeda je na nebi širšia než 2,45°. Odfotíš jej stred, ale celá sa nezmestí – a to je úplne v poriadku.' },
          { image: 'ring', correct: false, explain: 'Prstencová hmlovina je maličká. Tá je skôr na hranici toho, čo Dwarf rozlíši.' },
          { image: 'm27', correct: false, explain: 'Činka je malá a pohodlne sa zmestí.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Objektív Dwarfu je široký len 30 milimetrov – menší než dva a pol centimetra.',
          'A napriek tomu s ním odfotíš galaxiu 31 miliónov svetelných rokov daleko. Nie je to o veľkosti, je to o čase.'
        ],
        footnote: 'Presne preto sa astrofotografia dá robiť aj z balkóna.',
        cta: 'Ideme si to vyskúšať'
      },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'fotolab', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: AUTOMATIKA vs. RUČNE',
        objectId: 'm44',
        tasks: [
          { icon: '🔭', text: 'Nájdi M44 (Jasličky) v Stellariu a over, že je vyššie než 30° nad obzorom.' },
          { icon: '🤖', text: 'Odfoť ju na automatiku – nechaj Dwarf, aby si všetko nastavil sám.' },
          { icon: '🎚️', text: 'Potom to isté ručne: expozícia 30 s, gain 70, 200 snímok.' },
          { icon: '🔍', text: 'Fotky si polož vedľa seba a nájdi rozdiel.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Jasličky sú v zbierke – a ty už vieš, čo tie čísla v appke naozaj robia.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Akú najdlhšiu expozíciu ti Dwarf nastaví sám v automatike?',
            options: [
              { label: '15 sekúnd', correct: true },
              { label: '60 sekúnd' },
              { label: '90 sekúnd' },
              { label: '5 minút' }
            ],
            explain: 'Automatika končí na 15 sekundách. Viac dostaneš len ručne – a v EQ režime až 90 sekúnd.'
          },
          {
            kind: 'decide',
            question: 'Objekt je len 10 stupňov nad obzorom. Čo urobíš?',
            options: [
              { icon: '⏳', label: 'Počkám, kým vystúpi vyššie než 30°', correct: true },
              { icon: '📸', label: 'Fotím hneď, aspoň niečo z toho bude' }
            ],
            explain: 'Nízko nad obzorom pozeráš cez najviac rozvírený vzduch. Trpezlivosť tu spraví viac než akékoľvek nastavenie.'
          },
          {
            kind: 'truefalse',
            question: 'Dark framy sa fotia so zakrytým objektívom a musia mať rovnaké nastavenia ako normálne snímky.',
            answer: true,
            explain: 'Presne tak – rovnaká expozícia, rovnaký gain a podobná teplota. Inak šum neodpočítajú správne.'
          },
          {
            kind: 'image',
            question: 'Ktorý objekt sa Dwarfu do záberu celý nezmestí?',
            options: [
              { image: 'm31', label: 'A', correct: true },
              { image: 'm44', label: 'B' }
            ],
            explain: 'Andromeda je na nebi širšia než výsek 2,45°, ktorý Dwarf zaberie.'
          },
          {
            kind: 'order',
            question: 'Zoraď postup pri fotení hmloviny.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Postaviť statív a zapnúť Dwarf', order: 1, icon: '📐' },
              { label: 'Nechať urobiť kalibráciu', order: 2, icon: '🧭' },
              { label: 'Vybrať objekt vysoko na oblohe', order: 3, icon: '🎯' },
              { label: 'Nastaviť expozíciu, gain a počet snímok', order: 4, icon: '🎚️' },
              { label: 'Spustiť sériu a nechať zbierať svetlo', order: 5, icon: '⏱️' }
            ],
            explain: 'Bez kalibrácie Dwarf nevie, kam sa pozerá – preto ide hneď po zapnutí.'
          }
        ],
        resultGood: '🌟 Operátor Dwarfu!',
        resultOk: '🔭 Ešte raz – tie štyri čísla sa naučíš hneď.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 11 – SLNKO
     ========================================================================== */
  {
    id: 'sun',
    icon: '☀️',
    title: 'SLNKO',
    teaser: 'Jedinú hviezdu, ktorú vidíš aj cez deň. Ale pozor na oči!',
    minutes: '7 minút',
    badge: 'sun-watcher',
    basics: [ 'hviezda', 'slnecne-skvrny', 'slnecny-cyklus', 'nd-filter',
              'senzor', 'svetelna-minuta', 'expozicia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'sun',
        question: '🔎 ČO JE SLNKO?',
        options: [
          { id: 'star',   icon: '⭐', label: 'obyčajná hviezda, len veľmi blízko' },
          { id: 'planet', icon: '🪐', label: 'veľmi horúca planéta' },
          { id: 'fire',   icon: '🔥', label: 'obrovský ohnivý balón' },
          { id: 'hole',   icon: '🕳️', label: 'diera do vesmíru' }
        ],
        correct: 'star',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Slnko je úplne obyčajná žltá hviezda. Zdá sa nám iné len preto, že je 270-tisíckrát bližšie než ktorákoľvek iná.',
        retryText: 'Skús ešte raz. V lekcii o hviezdach sme sa učili, že Slnko je stredne horúca žltá… čo?',
        xp: 10
      },
      {
        type: 'info',
        title: '☀️ NAŠA VLASTNÁ HVIEZDA',
        image: 'sun',
        lines: [
          'Slnko je asi 100-krát širšie ako Zem.',
          'Na povrchu má okolo 5 500 stupňov Celzia.',
          'A je od nás 150 miliónov kilometrov – čo je 8 svetelných minút.'
        ],
        more: [
          'Slnko nesvieti tým, že by horelo ako ohník. V jeho strede je taký tlak a teplota (asi 15 miliónov stupňov), že sa jadrá vodíka spájajú na hélium – a pri každom takom spojení sa uvoľní trocha energie. Tomu sa hovorí jadrová fúzia.',
          'Energia zo stredu sa na povrch prediera stovky tisíc rokov. Svetlo, ktoré dnes vidíš, sa začalo vyrábať ešte v dobe, keď na Zemi nebol nikto, kto by sa naň mohol pozerať.',
          'Slnko svieti asi 4,6 miliardy rokov a paliva má ešte približne na rovnako dlho. Nie je preto ani mladá, ani stará hviezda – je presne v polovici života.'
        ],
        cta: 'Čo sú tie tmavé škvrny?'
      },
      { type: 'fact', factId: 'slnko-8-minut' },
      {
        type: 'cards',
        title: 'ČO SA DÁ NA SLNKU VIDIEŤ',
        subtitle: 'Otoč obe karty.',
        cards: [
          { icon: '🟤', name: 'Slnečné škvrny', short: 'Chladnejšie miesta.',
            text: 'Sú „len“ okolo 3 500 °C, a preto sa nám na jasnom povrchu zdajú tmavé. Najväčšie sú širšie než celá Zem.',
            image: 'sun', exampleLabel: 'Menia sa zo dňa na deň' },
          { icon: '🔄', name: 'Slnečný cyklus', short: 'Asi 11 rokov.',
            text: 'Počet škvŕn stúpa a klesá v cykle asi 11 rokov. Keď je škvŕn veľa, býva viac polárnych žiar.',
            image: 'starYellow', exampleLabel: 'Slnko sa „nadychuje“ 11 rokov' }
        ],
        cta: 'Ako ho fotiť bezpečne?',
        xp: 15
      },
      {
        type: 'howto',
        title: '🛡️ BEZPEČNÉ FOTENIE SLNKA',
        lead: 'Toto je jediná lekcia, kde na poradí naozaj záleží. Slnko dokáže zničiť senzor aj oči.',
        steps: [
          { icon: '🥇', title: 'Najprv filter, potom všetko ostatné',
            text: 'Na Dwarf nasaď priložený ND slnečný filter. Bez neho na Slnko nikdy nemieri – ani na sekundu, ani „len rýchlo“.' },
          { icon: '🌙', title: 'Zapni režim Solar System',
            text: 'Iné režimy nedokážu nastaviť čas tak krátko a fotka bude prepálená.' },
          { icon: '👀', title: 'Nikdy nepozeraj priamo očami',
            text: 'Ani cez hľadáčik, ani cez ďalekohľad bez filtra. Pozeraj sa len na obrazovku telefónu.' },
          { icon: '🌡️', title: 'Nefoť príliš dlho v kuse',
            text: 'Dwarf sa pri Slnku zahrieva. Nad 60 °C sa sám vypne, aby sa nepoškodil – daj mu pauzu.' }
        ],
        note: 'Toto je pravidlo, ktoré si astronómi opakujú celý život: Slnko len s filtrom.',
        cta: 'Rozumiem – filter vždy',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Keby Slnko práve teraz zhaslo, zistili by sme to až po ôsmich minútach.',
          'Slnko, ktoré vidíš na oblohe, je vlastne Slnko z minulosti – len z veľmi nedávnej.'
        ],
        footnote: 'A tú istú vec robí každá hviezda. Len u nich to nie sú minúty, ale roky až miliardy rokov.',
        cta: 'To je super'
      },
      { type: 'fact', factId: 'slnecne-skvrny' },
      {
        type: 'mission',
        title: '📸 MISIA: SLNEČNÉ ŠKVRNY',
        objectId: 'sun',
        tasks: [
          { icon: '🛡️', text: 'Nasaď na Dwarf ND slnečný filter (bez neho nič!).' },
          { icon: '🌙', text: 'Zapni režim Solar System a odfotografuj Slnko.' },
          { icon: '🔢', text: 'Spočítaj na fotke slnečné škvrny a zapíš si dátum.' },
          { icon: '📅', text: 'O týždeň to zopakuj – škvrny sa posunú, lebo sa Slnko otáča.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Máš v zbierke vlastnú hviezdu – a urobil si svoje prvé opakované meranie.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Ako dlho letí svetlo zo Slnka k nám?',
            options: [
              { label: 'Asi 8 minút', correct: true },
              { label: 'Asi 8 sekúnd' },
              { label: 'Asi 8 hodín' },
              { label: 'Dorazí okamžite' }
            ],
            explain: 'Slnko je 8 svetelných minút daleko. Preto ho vždy vidíš také, aké bolo pred ôsmimi minútami.'
          },
          {
            kind: 'truefalse',
            question: 'Keď je obloha trochu zamračená, Slnko sa dá odfotiť aj bez filtra.',
            answer: false,
            explain: 'Nikdy. Mraky sa môžu roztrhať v tej najhoršej sekunde. Filter vždy, bez výnimky.'
          },
          {
            kind: 'decide',
            question: 'Čo sú slnečné škvrny?',
            options: [
              { icon: '❄️', label: 'Chladnejšie miesta na povrchu Slnka', correct: true },
              { icon: '🕳️', label: 'Diery, ktorými vidno dovnútra Slnka' }
            ],
            explain: 'Sú „len“ okolo 3 500 °C, a preto sa vedľa jasnejšieho povrchu zdajú tmavé.'
          },
          {
            kind: 'image',
            question: 'Ktorý z týchto objektov sa smie fotiť iba so slnečným filtrom?',
            options: [
              { image: 'sun', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'Slnko. Hmlovina je taká slabá, že tam je problém presne opačný.'
          },
          {
            kind: 'order',
            question: 'Zoraď, ako budeš fotiť Slnko.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Nasadiť ND slnečný filter', order: 1, icon: '🛡️' },
              { label: 'Zapnúť režim Solar System', order: 2, icon: '🌙' },
              { label: 'Zamerať Slnko podľa obrazovky', order: 3, icon: '🎯' },
              { label: 'Fotiť krátke snímky a dať Dwarfu pauzu', order: 4, icon: '⏱️' }
            ],
            explain: 'Filter je vždy prvý krok. Až potom sa Dwarf smie otočiť k Slnku.'
          }
        ],
        resultGood: '🌟 Slnečný hliadkar!',
        resultOk: '🔭 Ešte raz – hlavne to pravidlo s filtrom.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 12 – FÁZY MESIACA A ZATMENIA
     ========================================================================== */
  {
    id: 'phases',
    icon: '🌗',
    title: 'FÁZY A ZATMENIA',
    teaser: 'Prečo Mesiac mení tvar – a prečo to nie je tieň Zeme.',
    minutes: '7 minút',
    badge: 'phase-keeper',
    basics: [ 'faza', 'terminator', 'tidalne-uzamknutie', 'zatmenie',
              'orbita', 'mesiac' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'moonphase',
        question: '🔎 PREČO VIDÍME LEN ČASŤ MESIACA?',
        options: [
          { id: 'lit',    icon: '🔦', label: 'Vidíme len tú časť, ktorú osvetľuje Slnko' },
          { id: 'shadow', icon: '🌍', label: 'Zakrýva ho tieň Zeme' },
          { id: 'clouds', icon: '☁️', label: 'Zakrývajú ho mraky' },
          { id: 'shrink', icon: '🍪', label: 'Mesiac sa naozaj zmenšuje' }
        ],
        correct: 'lit',
        successTitle: '🎉 PRESNE TAK!',
        successText: 'Slnko vždy osvetľuje presne polovicu Mesiaca. Mení sa len to, akú veľkú časť tej osvetlenej polovice odtiaľto vidíme.',
        retryText: 'Skús ešte raz. Keby to bol tieň Zeme, museli by sme mať zatmenie každú noc.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌗 FÁZY NIE SÚ TIEŇ',
        image: 'moonphase',
        lines: [
          'Mesiac obieha okolo Zeme a my ho vidíme z rôznych strán.',
          'Preto sa nám zdá raz ako tenký polmesiac, raz ako celý kruh.',
          'Celý kolobeh ôsmich fáz trvá 29,5 dňa.'
        ],
        more: [
          'Osvetlená je vždy presne polovica Mesiaca – tá, ktorá je otočená k Slnku. To sa nikdy nemení. Mení sa len to, z akého uhla sa na tú osvetlenú polovicu pozeráme zo Zeme.',
          'Keď je Mesiac medzi nami a Slnkom, mieri k nám tmavou stranou a máme nov. Keď je na opačnej strane od Slnka, vidíme celú osvetlenú polovicu a máme spln.',
          'Tieň Zeme v tom naozaj nie je – ten padne na Mesiac len zriedka a vtedy hovoríme o zatmení Mesiaca. A ešte jedna zvláštnosť: Mesiac k nám má stále otočenú tú istú tvár, pretože sa okolo svojej osi otočí presne raz za jeden obeh Zeme.'
        ],
        diagram: 'sky-rotation',
        cta: 'A čo zatmenia?'
      },
      { type: 'fact', factId: 'mesiac-29-dni' },
      {
        type: 'cards',
        title: 'DVE ÚPLNE INÉ ZATMENIA',
        subtitle: 'Otoč obe karty.',
        cards: [
          { icon: '🌑', name: 'Zatmenie Slnka', short: 'Mesiac zakryje Slnko.',
            text: 'Mesiac sa dostane presne medzi Zem a Slnko a vrhne na Zem malý tieň. Je vidno len z úzkeho pásu na Zemi – a nikdy sa nesmie pozerať bez filtra.',
            image: 'sun', exampleLabel: 'Deje sa cez deň' },
          { icon: '🌕', name: 'Zatmenie Mesiaca', short: 'Zem zakryje Mesiac.',
            text: 'Zem sa dostane medzi Slnko a Mesiac a hodí naň svoj tieň. Mesiac zčervená a je to vidno z celej nočnej strany Zeme – úplne bezpečne.',
            image: 'moon', exampleLabel: 'Deje sa v noci, pri splne' }
        ],
        cta: 'Prečo teda nie sú každý mesiac?',
        xp: 15
      },
      {
        type: 'compare',
        title: '🌗 SPLN vs. ŠTVRŤ',
        lead: 'Ten istý Mesiac, ten istý ďalekohľad – a úplne iná fotka.',
        eye: {
          icon: '🌕',
          label: 'SPLN',
          art: 'moon',
          text: 'Krásne jasný, ale plochý. Slnko svieti priamo spredu, takže nič nevrhá tiene a krátery sa strácajú.'
        },
        camera: {
          icon: '🌗',
          label: 'ŠTVRŤ',
          image: 'moonphase',
          text: 'Na hranici svetla a tmy vrhajú hory a krátery dlhé tiene. Práve tu je Mesiac najkrajší – a najviac plastický.'
        },
        check: {
          question: 'Kedy teda fotiť krátery?',
          options: [
            { label: 'Keď je Mesiac v štvrti, na hranici svetla a tmy', correct: true,
              explain: 'Áno! Tá hranica sa volá terminátor a je to najlepšie miesto na Mesiaci.' },
            { label: 'Pri splne, keď je najviac svetla', correct: false,
              explain: 'Pri splne je svetla dosť, ale žiadne tiene – a bez tieňov krátery nevidno.' }
          ]
        },
        cta: 'Ideme na misiu'
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Mesiac sa okolo svojej osi otočí presne raz za jeden obeh okolo Zeme. Preto k nám vždy otáča tú istú stranu.',
          'Jeho odvrátenú stranu nikto z ľudí nevidel, kým tam neposlali sondu.'
        ],
        footnote: 'Nie je to „tmavá strana“ – Slnko na ňu svieti rovnako. Len ju odtiaľto nikdy neuvidíme.',
        cta: 'To je šialené 🤯'
      },
      { type: 'fact', factId: 'mesiac-odvratena' },
      { type: 'fact', factId: 'mesiac-kratery' },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'mesiac-fazy', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: DESAŤ VEČEROV',
        image: 'moonphase',
        subtitle: 'Séria fáz Mesiaca',
        lead: 'Tvoj prvý projekt, ktorý trvá dlhšie než jeden večer. Výsledok sa dá vytlačiť a zavesiť.',
        tasks: [
          { icon: '📅', text: 'Odfotografuj Mesiac desať večerov po sebe – vždy podobne veľký v zábere.' },
          { icon: '🗂️', text: 'Fotky ulož do jedného priečinka a pomenuj ich podľa dátumu.' },
          { icon: '🖼️', text: 'Poskládaj ich za sebou – vznikne ti séria fáz.' }
        ],
        note: 'Ak jeden večer bude zamračené, nič sa nedeje. Pokračuj ďalší deň a poznač si medzeru.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Toto je presne to, čo robia astronómi: pozorovať tú istú vec opakovane a hľadať zmenu.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo má Mesiac fázy?',
            options: [
              { label: 'Vidíme rôzne veľkú časť jeho osvetlenej polovice', correct: true },
              { label: 'Padá na neho tieň Zeme' },
              { label: 'Zakrývajú ho mraky' },
              { label: 'Mesiac sa nafukuje a zmenšuje' }
            ],
            explain: 'Slnko osvetľuje vždy presne polovicu Mesiaca. Mení sa len náš pohľad na ňu.'
          },
          {
            kind: 'truefalse',
            question: 'Zo Zeme vidíme vždy tú istú stranu Mesiaca.',
            answer: true,
            explain: 'Mesiac sa otočí raz za jeden obeh, takže k nám mieri stále tou istou stranou.'
          },
          {
            kind: 'decide',
            question: 'Ako dlho trvá celý kolobeh fáz?',
            options: [
              { icon: '📅', label: 'Asi 29,5 dňa', correct: true },
              { icon: '🗓️', label: 'Presne 7 dní' }
            ],
            explain: 'Od novu do novu je to 29,5 dňa – preto máme v roku dvanásť „mesiacov“.'
          },
          {
            kind: 'order',
            question: 'Zoraď fázy Mesiaca od novu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Nov (Mesiac nevidno)', order: 1, icon: '🌑' },
              { label: 'Dorastajúci polmesiac', order: 2, icon: '🌒' },
              { label: 'Prvá štvrť', order: 3, icon: '🌓' },
              { label: 'Spln', order: 4, icon: '🌕' }
            ],
            explain: 'A potom to ide naopak, kým sa Mesiac znova nestratí v nove.'
          },
          {
            kind: 'image',
            question: 'Na ktorej fotke uvidíš krátery najlepšie?',
            options: [
              { image: 'moonphase', label: 'A', correct: true },
              { image: 'moon', label: 'B' }
            ],
            explain: 'Na hranici svetla a tmy vrhajú krátery dlhé tiene. Pri splne je Mesiac plochý.'
          }
        ],
        resultGood: '🌟 Strážca fáz!',
        resultOk: '🔭 Ešte raz – a Mesiac ti už nič neutají.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 13 – ČÍTANIE OBLOHY
     ========================================================================== */
  {
    id: 'sky-reading',
    icon: '🗺️',
    title: 'ČÍTANIE OBLOHY',
    teaser: 'Ako sa na nebi nestratiť a nájsť si čokoľvek sám.',
    minutes: '7 minút',
    badge: 'sky-cartographer',
    basics: [ 'suhvezdie', 'suradnice', 'vyska-nad-obzorom', 'zenit',
              'magnituda', 'precesia', 'kalibracia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'polaris',
        question: '🔎 ČO JE SÚHVEZDIE?',
        options: [
          { id: 'map',     icon: '🗺️', label: 'Dielik mapy oblohy' },
          { id: 'family',  icon: '👨‍👩‍👧', label: 'Skupina hviezd, ktoré patria k sebe' },
          { id: 'galaxy',  icon: '🌌', label: 'Iné meno pre galaxiu' },
          { id: 'cluster', icon: '✨', label: 'Iné meno pre hviezdokopu' }
        ],
        correct: 'map',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Súhvezdie je políčko na mape oblohy. Jeho hviezdy spolu väčšinou nemajú nič – len ležia v rovnakom smere.',
        retryText: 'Skús ešte raz. Hviezdy v jednom súhvezdí bývajú od seba stovky svetelných rokov. Čo to teda vlastne je?',
        xp: 10
      },
      {
        type: 'info',
        title: '🗺️ OBLOHA JE MAPA',
        image: 'milkyway',
        lines: [
          'Astronómi rozdelili celú oblohu na 88 súhvezdí – ako dieliky puzzle.',
          'Slúžia na orientáciu: „M42 je v Orióne“ je adresa, nie príbeh.',
          'A každý objekt má aj presné súradnice, ktoré vie Dwarf použiť.'
        ],
        more: [
          'Súhvezdie nie je skupina hviezd, ktoré patria k sebe. Je to len obrazec, ktorý vzniká tým, ako sa hviezdy premietnu na oblohu z nášho miesta. Hviezdy jedného súhvezdia môžu byť od seba stokrát ďalej než od nás.',
          'Aby sa dala poloha objektu zapísať presne, používajú astronómi súradnice: rektascenziu a deklináciu. Je to to isté ako zemepisná šírka a dĺžka, len premietnuté na oblohu. Práve tieto čísla dostane Dwarf, keď mu povieš, kam sa má pozrieť.',
          'Obloha sa nám točí a mení aj počas roka. Preto sa hmloviny v Orióne dajú fotiť v zime, a Mliečna cesta je najkrajšia v lete – v opačnej polovici roka sú na dennej strane oblohy.'
        ],
        cta: 'Ako tá adresa vyzerá?'
      },
      { type: 'fact', factId: '88-suhvezdi' },
      {
        type: 'cards',
        title: 'AKO SI NÁJSŤ OBJEKT',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '👆', name: 'Podľa obrazcov', short: 'Skákanie po hviezdach.',
            text: 'Nájdeš si výrazný obrazec – Veľký voz, Orionov pás, W Kasiopeje – a od neho „skáčeš“ na cieľ. Toto funguje aj bez techniky.',
            image: 'polaris', exampleLabel: 'Klasika: od Veľkého voza na Polárku' },
          { icon: '📍', name: 'Podľa súradníc', short: 'Rektascenzia a deklinácia.',
            text: 'Presná adresa na nebi. Deklinácia je ako zemepisná šírka, rektascenzia ako dĺžka. Dwarf sa podľa nich otočí sám.',
            image: 'transit', exampleLabel: 'Presné a rýchle' },
          { icon: '📱', name: 'Podľa Stellaria', short: 'Plán na celý večer.',
            text: 'Nastavíš si dátum a čas a vidíš, čo bude kedy vysoko. Tak si vyberieš cieľ, ktorý bude nad 30° – a nie za stromom.',
            image: 'dome', exampleLabel: 'Najlepší pomocník pred pozorovaním' }
        ],
        cta: 'Ideme na úlohu',
        xp: 15
      },
      { type: 'fact', factId: 'obloha-adresa' },
      {
        type: 'pick',
        title: '🔎 KTORÝ OBJEKT JE V ORIÓNE?',
        prompt: 'Skús to bez pomoci – jeden z týchto štyroch je v súhvezdí Orión.',
        options: [
          { image: 'm13', correct: false, explain: 'M13 je v Herkulovi – letná obloha.' },
          { image: 'm42', correct: true,  explain: 'Áno! M42 leží hneď pod tromi hviezdami Orionovho pásu. Preto sa jej hovorí Orionova hmlovina.' },
          { image: 'm31', correct: false, explain: 'M31 je v Andromede – jesenná obloha, blízko Kasiopeje.' },
          { image: 'm44', correct: false, explain: 'M44 je v Rakovi – jarná obloha.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Hviezdy jedného súhvezdia spolu väčšinou nemajú absolútne nič.',
          'Sú od seba stovky svetelných rokov – len z našej strany sa nám náhodou premietnu do jedného obrazca. Z inej hviezdy by Orión vôbec nebol Orión.'
        ],
        footnote: 'Súhvezdia sú teda náš výmysel. Užitočný, ale výmysel.',
        cta: 'Ideme si to overiť'
      },
      {
        type: 'mission',
        title: '📸 MISIA: NÁJDI TO SÁM',
        objectId: 'm27',
        tasks: [
          { icon: '📱', text: 'V Stellariu napíš „M27“ a zisti, v ktorom súhvezdí je a ako vysoko bude dnes.' },
          { icon: '📍', text: 'Opíš si jej súradnice – rektascenziu a deklináciu.' },
          { icon: '🔭', text: 'Nájdi ju Dwarfom a odfotografuj.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Prvý objekt, ktorý si našiel podľa adresy na nebi. Odteraz si nájdeš čokoľvek.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Koľko je oficiálnych súhvezdí?',
            options: [
              { label: '88', correct: true },
              { label: '12' },
              { label: '100' },
              { label: 'nekonečne mnoho' }
            ],
            explain: 'Astronómi sa dohodli na 88 súhvezdiach, ktoré pokrývajú celú oblohu.'
          },
          {
            kind: 'truefalse',
            question: 'Hviezdy v jednom súhvezdí sú blízko seba aj v skutočnosti.',
            answer: false,
            explain: 'Väčšinou nie. Bývajú od seba stovky svetelných rokov – len z našej strany vytvárajú obrazec.'
          },
          {
            kind: 'decide',
            question: 'Čo je rektascenzia a deklinácia?',
            options: [
              { icon: '📍', label: 'Súradnice – adresa objektu na nebi', correct: true },
              { icon: '⭐', label: 'Mená dvoch jasných hviezd' }
            ],
            explain: 'Sú to nebeské súradnice, presne ako zemepisná šírka a dĺžka na Zemi.'
          },
          {
            kind: 'image',
            question: 'Ktorý objekt je v súhvezdí Orión?',
            options: [
              { image: 'm42', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'M42 – Orionova hmlovina. M13 je v Herkulovi.'
          },
          {
            kind: 'order',
            question: 'Zoraď, ako si naplánuješ pozorovanie.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'V Stellariu vybrať objekt na dnešný večer', order: 1, icon: '📱' },
              { label: 'Overiť, či bude vyššie než 30°', order: 2, icon: '📐' },
              { label: 'Zadať ho v appke Dwarfu', order: 3, icon: '🔭' },
              { label: 'Kalibrovať a fotiť', order: 4, icon: '📸' }
            ],
            explain: 'Plánovanie pred pozorovaním ušetrí najviac času. A tiež nervov.'
          }
        ],
        resultGood: '🌟 Kartograf oblohy!',
        resultOk: '🔭 Ešte raz – tá mapa sa naučí ľahko.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 14 – ISS A SATELITY
     ========================================================================== */
  {
    id: 'iss',
    icon: '🛰️',
    title: 'ČO LETÍ NAD NAMI',
    teaser: 'Nad tvojou hlavou práve teraz žijú ľudia. Chytíš ich?',
    minutes: '6 minút',
    badge: 'sky-tracker',
    basics: [ 'druzica', 'orbita', 'magnituda', 'expozicia',
              'zorne-pole', 'seeing' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'iss',
        question: '🔎 ČO JE TÁ ROVNÁ SVETLÁ ČIARA?',
        options: [
          { id: 'sat',    icon: '🛰️', label: 'umelá družica, napríklad ISS' },
          { id: 'meteor', icon: '🌠', label: 'meteor' },
          { id: 'plane',  icon: '✈️', label: 'lietadlo' },
          { id: 'star',   icon: '⭐', label: 'veľmi rýchla hviezda' }
        ],
        correct: 'sat',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Družica letí pomaly, rovnomerne a nebliká. Meteor je blesk na jednu sekundu, lietadlo bliká červeno-bielo.',
        retryText: 'Skús ešte raz. Táto čiara je dlhá a rovnomerná – meteor by bol krátky záblesk.',
        xp: 10
      },
      {
        type: 'info',
        title: '🛰️ NAD NAMI JE RUŠNO',
        image: 'iss',
        lines: [
          'Okolo Zeme obieha množstvo umelých družíc.',
          'Nesvietia samy – vidíme na nich odraz slnečného svetla.',
          'Najjasnejšia z nich je Medzinárodná vesmírna stanica, na ktorej žijú ľudia.'
        ],
        more: [
          'Stanica letí okolo Zeme rýchlosťou približne 28 000 kilometrov za hodinu a jeden obeh jej trvá asi 90 minút. Za jeden deň teda vidí zhruba šestnásť východov a šestnásť západov Slnka.',
          'Nezostáva na obežnej dráhe „len tak“ – padá. Padá k Zemi, ale zároveň letí dopredu tak rýchlo, že zakrivenie Zeme padá spolu s ňou. Preto ľudia vo vnútri plávajú: nie sú bez gravitácie, ale v neustálom voľnom páde.',
          'Vidieť ju môžeš len krátko po zotmení alebo pred svitaním. Vtedy je pri zemi už tma, ale stanica vysoko nad nami je ešte osvetlená Slnkom. V hlbokej noci vletí do tieňa Zeme a zmizne.'
        ],
        cta: 'Ako ich rozoznať?'
      },
      { type: 'fact', factId: 'iss-16-vychodov' },
      {
        type: 'cards',
        title: 'AKO ROZOZNAŤ, ČO TO LETÍ',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🛰️', name: 'ISS', short: 'Jasná, pomalá, nebliká.',
            text: 'Preletí oblohu za dve až päť minút, svieti stabilne ako jasná hviezda a nikdy nebliká. Občas počas preletu zmizne – vletela do tieňa Zeme.',
            image: 'iss', exampleLabel: 'Najjasnejší objekt, čo letí' },
          { icon: '✈️', name: 'Lietadlo', short: 'Bliká červeno a bielo.',
            text: 'Má farebné blikajúce svetlá a je ho niekedy aj slyšať. Letí oveľa nižšie než družice.',
            image: 'citysky', exampleLabel: 'Bliká = lietadlo' },
          { icon: '🌠', name: 'Meteor', short: 'Blesk na sekundu.',
            text: 'Zjaví sa a hneď zmizne – trvá zlomok sekundy až pár sekúnd. Družica letí pokojne desiatky sekúnd.',
            image: 'meteors', exampleLabel: 'Krátky záblesk' }
        ],
        cta: 'Kedy ich vidno?',
        xp: 15
      },
      {
        type: 'compare',
        title: '🌆 PREČO LEN PO ZÁPADE SLNKA?',
        lead: 'Družice vidno hlavne krátko po zotmení a pred rozsvitom. Má to jednoduchý dôvod.',
        eye: {
          icon: '🌃',
          label: 'U NÁS UŽ TMA',
          art: 'citysky',
          text: 'My sme v tieni Zeme, takže obloha je tmavá a slabé svetlo vidíme.'
        },
        camera: {
          icon: '☀️',
          label: 'NAHORE UŽ SVIETI SLNKO',
          image: 'iss',
          text: 'Družica je 400 km vysoko, takže na ňu Slnko svieti ešte aj vtedy, keď u nás už zapadlo. Preto sa leskne na tmavom nebi.'
        },
        check: {
          question: 'Prečo teda ISS uprostred noci často nevidno?',
          options: [
            { label: 'Lebo vtedy je aj ona v tieni Zeme', correct: true,
              explain: 'Presne. Nesvieti sama – keď na ňu nesvieti Slnko, nemáme čo vidieť.' },
            { label: 'Lebo v noci vypína svetlá', correct: false,
              explain: 'To nie – žiadne svetlá nevidíme. Vidíme len odraz Slnka na jej paneloch.' }
          ]
        },
        cta: 'Ideme ju chytiť'
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'To svetlo, ktoré uvidíš, je odraz Slnka na paneloch stanice veľkej ako futbalové hřiště.',
          'A vnútri sú ľudia. Práve teraz. Ľudia tam nepretržite žijú od novembra 2000.'
        ],
        footnote: 'Keď zamáš, neuvidia ťa. Ale je fajn vedieť, že sú tam.',
        cta: 'Chcem ju vidieť'
      },
      { type: 'fact', factId: 'iss-od-2000' },
      {
        type: 'mission',
        title: '🛰️ MISIA: CHYŤ ISS',
        objectId: 'iss',
        tasks: [
          { icon: '📱', text: 'V Stellariu si zapni satelity a nájdi „ISS“ – zisti, kedy dnes preletí.' },
          { icon: '⏰', text: 'Buďte vonku dve minúty pred časom a pozerajte v smere, ktorý ti Stellarium ukáže.' },
          { icon: '👀', text: 'Sleduj ju voľným okom – nebliká a letí rovnomerne.' },
          { icon: '📸', text: 'Skús dlhšiu expozíciu Dwarfom širokouhlo – zostane po nej svetelný pruh.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Videl si ľudmi obývanú stanicu na oblohe. Ďalší prelet je zvyčajne o 90 minút.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo družice na nebi vidíme?',
            options: [
              { label: 'Odrážajú svetlo Slnka', correct: true },
              { label: 'Svietia vlastnými reflektormi' },
              { label: 'Horia v atmosfére' },
              { label: 'Sú rozžeravené od rýchlosti' }
            ],
            explain: 'Rovnako ako Mesiac – svietia odrazeným slnečným svetlom.'
          },
          {
            kind: 'decide',
            question: 'Objekt letí pomaly a rovnomerne, nebliká a preletí za tri minúty. Čo to je?',
            options: [
              { icon: '🛰️', label: 'Družica – pravdepodobne ISS', correct: true },
              { icon: '🌠', label: 'Meteor' }
            ],
            explain: 'Meteor trvá sekundu. Blikanie by prezradilo lietadlo.'
          },
          {
            kind: 'truefalse',
            question: 'Na ISS žijú ľudia nepretržite už od roku 2000.',
            answer: true,
            explain: 'Od novembra 2000 tam vždy niekto je. Stanica je dlhá 109 metrov.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok ukazuje prelet družice?',
            options: [
              { image: 'iss', label: 'A', correct: true },
              { image: 'meteors', label: 'B' }
            ],
            explain: 'A je jedna dlhá rovnomerná čiara. B sú meteory – krátke záblesky z jedného miesta.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najbližšieho k najvzdialenejšiemu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Lietadlo (asi 10 km)', order: 1, icon: '✈️' },
              { label: 'ISS (asi 400 km)', order: 2, icon: '🛰️' },
              { label: 'Mesiac (384 400 km)', order: 3, icon: '🌙' },
              { label: 'Slnko (150 miliónov km)', order: 4, icon: '☀️' }
            ],
            explain: 'ISS je vesmír „hneď za dverami“ – štyridsaťkrát bližšie než by si čakal.'
          }
        ],
        resultGood: '🌟 Sledovač oblohy!',
        resultOk: '🔭 Ešte raz – a potom rovno von.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 15 – ASTROFOTO MAJSTER
     ========================================================================== */
  {
    id: 'astrophoto',
    icon: '📸',
    title: 'ASTROFOTO MAJSTER',
    teaser: 'Prečo je sto snímok lepších než jedna – a ako z fotky dostať farby.',
    minutes: '7 minút',
    badge: 'astrophoto-master',
    basics: [ 'skladanie', 'sum', 'gain', 'darkframe',
              'ostrenie', 'svetelne-znecistenie', 'falosne-farby', 'rosa' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm42',
        question: '🔎 ČO UROBÍ FOTKU HMLOVINY ČISTEJŠOU?',
        options: [
          { id: 'stack', icon: '🧩', label: 'Poskladať veľa snímok na sebe' },
          { id: 'gain',  icon: '🎚️', label: 'Nastaviť gain na maximum' },
          { id: 'light', icon: '🔦', label: 'Prisvietiť baterkou' },
          { id: 'zoom',  icon: '🔍', label: 'Zväčšiť priblíženie' }
        ],
        correct: 'stack',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Šum je v každej snímke inde, hmlovina je vždy na tom istom mieste. Keď snímky poskladáš, šum sa vyruší a hmlovina zostane.',
        retryText: 'Skús ešte raz. Gain na maximum pridá jasnosť, ale aj šum. Čo šum naopak odstráni?',
        xp: 10
      },
      {
        type: 'info',
        title: '🧩 KÚZLO SKLADANIA SNÍMOK',
        image: 'm42',
        lines: [
          'Jedna snímka hmloviny je slabá a plná šumu.',
          'Šum je ale v každej snímke náhodne inde, kým hmlovina je vždy na tom istom mieste.',
          'Keď Dwarf snímky poskladá na sebe, šum sa vyruší a objekt sa vynorí.'
        ],
        more: [
          'Šum je náhodný, a preto sa dá vyrušiť. Keď poskladáš štyri snímky, šum klesne na polovicu; pri stonásobku snímok bude desaťkrát menší. Platí to ako pravidlo odmocniny – a preto sa od určitého počtu snímok už ďalšie pridávanie takmer neprejaví.',
          'Objekt sa naopak nasčíta, pretože je na každej snímke na tom istom mieste. Skladanie teda nezosilňuje objekt – zoslabuje šum okolo neho, a preto sa objekt vynorí.',
          'Astronómi robia aj takzvané kalibračné snímky: darky s uzavretým objektívom (aby vedeli, čo si senzor vymýšľa sám), a flaty rovnomerne osvetlenej plochy (aby vedeli, kde je objektív zaprášený). Dwarf väčšinu tejto práce robí za teba.'
        ],
        cta: 'Čo ešte pomôže?'
      },
      { type: 'fact', factId: 'stovky-snimok' },
      {
        type: 'howto',
        title: '🏆 ŠTYRI VECI, KTORÉ ROBIA DOBRÚ FOTKU',
        lead: 'V tomto poradí. Prvá vec pomôže najviac, posledná najmenej – ale všetky sa počítajú.',
        steps: [
          { icon: '🧩', title: 'Veľa snímok',
            text: 'Sto je minimum, dvesto až štyristo je paráda. Toto je najsilnejší nástroj, aký máš.' },
          { icon: '🌑', title: 'Tmavá obloha',
            text: 'Odchod z mesta pomôže viac než akékoľvek nastavenie. Aj kraj dediny je veľký rozdiel.' },
          { icon: '🎯', title: 'Presné zaostrenie',
            text: 'Rozostrená fotka sa nedá zachrániť ničím. Skontroluj si na obrazovke, či sú hviezdy malé body.' },
          { icon: '⬛', title: 'Dark framy',
            text: 'Odpočítajú šum senzora. Rovnaká expozícia, rovnaký gain, podobná teplota.' }
        ],
        note: 'A ešte jedna vec: Mesiac v splne rozsvieti celú oblohu. Slabé hmloviny fotievaj, keď Mesiac nesvieti.',
        cta: 'Rozumiem',
        xp: 20
      },
      { type: 'fact', factId: 'darkframe' },
      {
        type: 'pick',
        title: '🔎 VYBER SI DOBRÝ CIEĽ',
        prompt: 'Ktorý objekt je najlepší na tréning skladania snímok?',
        options: [
          { image: 'm44', correct: true,  explain: 'Áno! Jasná, veľká, celá sa zmestí do záberu. Hneď vidíš, či máš dobre zaostrené a či sa niečo hýbe.' },
          { image: 'ring', correct: false, explain: 'Prstencová hmlovina je maličká – na tréning je príliš náročná.' },
          { image: 'sgra', correct: false, explain: 'Čiernu dieru Dwarf neuvidí vôbec. Toto by bol nezaslúžený smútok.' },
          { image: 'sun', correct: false, explain: 'Slnko sa fotí úplne inak – krátke expozície a vždy s filtrom. A v noci ho na nebi nenájdeš.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Slávne fotky z Hubbla nie sú jedna snímka. Niektoré sú zložené z desiatok hodín pozorovania.',
          'A farby na nich často nie sú tie, ktoré by videlo oko – sú to skutočné dáta o svetle, prevedené na farby, aby sme videli, čo tam naozaj je.'
        ],
        footnote: 'Nie je to podvod. Je to ako tepelná kamera: reálne meranie, len prekreslené do farieb.',
        cta: 'Ideme to vyskúšať'
      },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'skladanie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: 10 vs. 100 SNÍMOK',
        image: 'm42',
        subtitle: 'Dokáž si to na vlastných dátach',
        lead: 'Najlepší spôsob, ako uveriť skladaniu snímok, je vidieť rozdiel na tom istom objekte.',
        tasks: [
          { icon: '🔟', text: 'Odfoť si vybraný objekt s 10 snímkami a fotku si ulož.' },
          { icon: '💯', text: 'Bez toho, aby si niečo iné menil, odfoť ho so 100 snímkami.' },
          { icon: '🔍', text: 'Fotky polož vedľa seba a pozri sa na pozadie – nie na objekt.' }
        ],
        note: 'Rozdiel bude najviac vidieť práve na pozadí: v prvej fotke „sneží“, v druhej je hladké.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Toto je celé tajomstvo astrofotografie. Zvyšok je už len trpezlivosť.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo skladanie snímok odstráni šum?',
            options: [
              { label: 'Šum je v každej snímke inde, objekt je vždy na tom istom mieste', correct: true },
              { label: 'Šum sa pri skladaní zväčší a praskne' },
              { label: 'Dwarf šum vymaže gumou' },
              { label: 'Šum zmizne, keď je fotka menšia' }
            ],
            explain: 'Náhodný šum sa priemerovaním vyruší, kým skutočný signál zostane.'
          },
          {
            kind: 'truefalse',
            question: 'Rozostrenú fotku sa dá zachrániť tým, že poskladáš viac snímok.',
            answer: false,
            explain: 'Nedá. Zaostrenie treba mať dobré od začiatku – skladanie pomôže so šumom, nie s ostrosťou.'
          },
          {
            kind: 'decide',
            question: 'Chceš fotiť slabú hmlovinu. Čo pomôže najviac?',
            options: [
              { icon: '🌑', label: 'Ísť na tmavé miesto a nafotiť veľa snímok', correct: true },
              { icon: '🎚️', label: 'Nastaviť gain na maximum' }
            ],
            explain: 'Maximálny gain pridá aj šum. Tmavá obloha a veľa snímok sú skutočné riešenie.'
          },
          {
            kind: 'image',
            question: 'Ktorý cieľ je najvhodnejší na tréning?',
            options: [
              { image: 'm44', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'Veľká jasná hviezdokopa. Malá slabá hmlovina je na tréning frustrujúca.'
          },
          {
            kind: 'order',
            question: 'Zoraď od toho, čo fotke pomôže najviac.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Veľa snímok (200 – 400)', order: 1, icon: '🧩' },
              { label: 'Tmavá obloha bez lámp', order: 2, icon: '🌑' },
              { label: 'Presné zaostrenie', order: 3, icon: '🎯' },
              { label: 'Dark framy', order: 4, icon: '⬛' }
            ],
            explain: 'Všetky štyri pomáhajú – ale keby si mal urobiť len jednu vec, nafoť viac snímok.'
          }
        ],
        resultGood: '🌟 Astrofoto majster!',
        resultOk: '🔭 Ešte raz – hlavne to o šume.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 16 – Z ČOHO SÚ HVIEZDY (SPEKTRUM)
     ========================================================================== */
  {
    id: 'spectrum',
    icon: '🔬',
    title: 'Z ČOHO SÚ HVIEZDY',
    teaser: 'Nikto tam nebol. Ako teda vieme, z čoho hviezdy sú?',
    minutes: '7 minút',
    badge: 'light-reader',
    basics: [ 'spektrum', 'cerveny-posun', 'farba-teplota', 'infracervene-svetlo',
              'senzor', 'hviezda' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'spectrum',
        question: '🔎 ČO SÚ TIE TMAVÉ ČIARY V DÚHE?',
        options: [
          { id: 'elements', icon: '🧪', label: 'odtlačky prvkov v hviezde' },
          { id: 'scratch',  icon: '🪥', label: 'škrabance na objektíve' },
          { id: 'clouds',   icon: '☁️', label: 'mraky pred hviezdou' },
          { id: 'error',    icon: '🖨️', label: 'chyba pri tlači' }
        ],
        correct: 'elements',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Každý prvok pohltí presne určité farby. V spektre po ňom zostane tmavá čiara – jeho odtlačok prsta.',
        retryText: 'Skús ešte raz. Tie čiary sú vždy na tých istých miestach, aj keď zmeníš ďalekohľad. Takže to nie je chyba prístroja.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌈 SVETLO SA DÁ ROZLOŽIŤ',
        image: 'spectrum',
        lines: [
          'Biele svetlo nie je jedna farba – je to zmes všetkých.',
          'Keď ho rozložíš, dostaneš dúhu, ktorej astronómi hovoria spektrum.',
          'A práve v tej dúhe je ukryté, z čoho je hviezda a aká je horúca.'
        ],
        more: [
          'Každý plyn pohltí a vyžiari svetlo len v presne určených farbách – ako keby mal vlastný čiarový kód. Keď astronóm v spektre hviezdy uvidí tieto čiary, vie s istotou, ktoré látky v nej sú, aj keď je hviezda miliardy kilometrov daleko.',
          'Hélium našli ľudia najprv v spektre Slnka a až potom na Zemi. Odtiaľ má aj meno – po grécky „hélios“ znamená Slnko.',
          'Ak sa celý čiarový kód posunie do červena, znamená to, že sa objekt od nás vzďaľuje. Práve takto astronómi zistili, že sa vesmír rozpína.'
        ],
        cta: 'Čo všetko to prezradí?'
      },
      { type: 'fact', factId: 'spektrum-carky' },
      {
        type: 'cards',
        title: 'ČO SA DÁ VYČÍTAŤ ZO SVETLA',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌡️', name: 'Teplota', short: 'Podľa farby.',
            text: 'Ak je v spektre najviac modrej, hviezda je horúca. Ak červenej, je chladnejšia. Presne to sme videli v lekcii o hviezdach.',
            image: 'starBlue', exampleLabel: 'Modrá = horúca' },
          { icon: '🧪', name: 'Z čoho je', short: 'Podľa čiar.',
            text: 'Vodík robí svoj vzor čiar, hélium iný, železo ďalší. Keď ich v spektre nájdeš, vieš, čo v hviezde je.',
            image: 'spectrum', exampleLabel: 'Čiary = zloženie' },
          { icon: '🏃', name: 'Či sa hýbe', short: 'Podľa posunu čiar.',
            text: 'Keď sa objekt vzďaľuje, celý vzor čiar sa posunie k červenej. Práve tak sme zistili, že sa vesmír rozpína.',
            image: 'deepfield', exampleLabel: 'Červený posun = vzďaľuje sa' }
        ],
        cta: 'Vyskúšame to doma?',
        xp: 15
      },
      {
        type: 'howto',
        title: '🧪 POKUS DOMA: VLASTNÉ SPEKTRUM',
        lead: 'Na toto nepotrebuješ Dwarf. Stačí staré CD a päť minút.',
        steps: [
          { icon: '💿', title: 'Vezmi staré CD',
            text: 'Na jeho lesklej strane sú tisíce jemných drážok, ktoré svetlo rozložia na farby – rovnako ako prizma.' },
          { icon: '💡', title: 'Nasmeruj naň svetlo žiarovky',
            text: 'Nakláňaj CD, kým na ňom neuvidíš dúhu. To je spektrum tej žiarovky.' },
          { icon: '🔆', title: 'Porovnaj rôzne svetlá',
            text: 'Žiarovka dá plynulú dúhu, LED-ka a úsporná žiarivka dajú dúhu s dierami. Rôzne svetlá majú rôzne spektrá.' },
          { icon: '🛡️', title: 'A Slnko – iba cez filter',
            text: 'Slnečné spektrum je najkrajšie, ale platí to isté pravidlo ako vždy: nikdy sa nepozeraj do Slnka bez filtra.' }
        ],
        note: 'Presne toto robia astronómi, len s ďalekohľadom a citlivým prístrojom namiesto CD.',
        cta: 'Skvelé',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'V spektre Slnka našli astronómi čiaru, ktorá nepatrila žiadnemu známemu prvku.',
          'Pomenovali ho hélium – podľa gréckeho boha Slnka. Na Zemi ho objavili až desiatky rokov potom.'
        ],
        footnote: 'Prvok, ktorý dnes máš v balónoch, teda ľudia prvýkrát „videli“ na hviezde.',
        cta: 'To je fakt dobré'
      },
      { type: 'fact', factId: 'helium-slnko' },
      {
        type: 'mission',
        title: '🧪 MISIA: ROZLOŽ SVETLO',
        image: 'spectrum',
        subtitle: 'Pokus s CD alebo prizmou',
        lead: 'Urob si vlastný spektroskop a porovnaj tri rôzne svetlá.',
        tasks: [
          { icon: '💿', text: 'Rozlož svetlo žiarovky pomocou CD alebo prizmy.' },
          { icon: '💡', text: 'To isté skús s LED-kou a s úspornou žiarivkou.' },
          { icon: '✏️', text: 'Nakresli si, čím sa tie tri dúhy líšia.' }
        ],
        note: 'Ak máš doma prizmu, funguje to najkrajšie. CD však stačí úplne.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Práve si urobil to isté, čo astronómi robia s hviezdami – len na kuchynskej lampe.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Ako vieme, z čoho je hviezda, keď tam nikto nebol?',
            options: [
              { label: 'Z čiar v jej rozloženom svetle', correct: true },
              { label: 'Poslali sme tam sondu' },
              { label: 'Podľa toho, ako bliká' },
              { label: 'Podľa jej mena' }
            ],
            explain: 'Každý prvok robí v spektre svoj vlastný vzor čiar.'
          },
          {
            kind: 'decide',
            question: 'Spektrum hviezdy má najviac modrej. Čo to znamená?',
            options: [
              { icon: '🔥', label: 'Je horúca', correct: true },
              { icon: '❄️', label: 'Je chladná' }
            ],
            explain: 'Modrá znamená vysokú teplotu, červená nižšiu.'
          },
          {
            kind: 'truefalse',
            question: 'Hélium objavili najprv na Zemi a potom na Slnku.',
            answer: false,
            explain: 'Presne naopak – prvýkrát ho našli v spektre Slnka, preto sa tak volá.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok je spektrum?',
            options: [
              { image: 'spectrum', label: 'A', correct: true },
              { image: 'milkyway', label: 'B' }
            ],
            explain: 'A je svetlo rozložené na farby s tmavými čiarami prvkov.'
          },
          {
            kind: 'order',
            question: 'Zoraď, ako astronóm zistí zloženie hviezdy.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Zachytí svetlo hviezdy ďalekohľadom', order: 1, icon: '🔭' },
              { label: 'Rozloží ho na farby', order: 2, icon: '🌈' },
              { label: 'Nájde v ňom tmavé čiary', order: 3, icon: '📊' },
              { label: 'Porovná čiary so vzormi prvkov', order: 4, icon: '🧪' }
            ],
            explain: 'A z toho vie povedať, čo v hviezde je – aj keď je miliardy kilometrov daleko.'
          }
        ],
        resultGood: '🌟 Čítač svetla!',
        resultOk: '🔭 Ešte raz – tie čiary sú kľúč.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 17 – VESMÍRNE VZDIALENOSTI
     ========================================================================== */
  {
    id: 'distances',
    icon: '📏',
    title: 'VESMÍRNE VZDIALENOSTI',
    teaser: 'Čo je svetelný rok a prečo je vesmír skoro celý prázdny.',
    minutes: '7 minút',
    badge: 'distance-meter',
    basics: [ 'svetelny-rok', 'svetelna-minuta', 'astronomicka-jednotka', 'orbita',
              'slnecna-soustava', 'gravitacia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'deepfield',
        question: '🔎 ČO JE SVETELNÝ ROK?',
        options: [
          { id: 'dist',  icon: '📏', label: 'vzdialenosť, ktorú svetlo preletí za rok' },
          { id: 'time',  icon: '⏰', label: 'čas, rok meraný svetlom' },
          { id: 'speed', icon: '🏎️', label: 'rýchlosť svetla' },
          { id: 'size',  icon: '⭐', label: 'veľkosť veľmi jasnej hviezdy' }
        ],
        correct: 'dist',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Je to vzdialenosť, nie čas – aj keď to podľa mena vyzerá inak. Svetlo za rok preletí 9,46 bilióna kilometrov.',
        retryText: 'Skús ešte raz. Pomôcka: „autohodina“ by bola tiež vzdialenosť – to, čo prejde auto za hodinu.',
        xp: 10
      },
      {
        type: 'info',
        title: '📏 KILOMETRE TU NESTAČIA',
        image: 'deepfield',
        lines: [
          'Svetlo letí 300 000 kilometrov za sekundu – nič nie je rýchlejšie.',
          'Za rok teda preletí 9,46 bilióna kilometrov. Tomu sa hovorí svetelný rok.',
          'Vesmírne vzdialenosti sa v kilometroch nedajú ani napísať, preto astronómi merajú svetlom.'
        ],
        more: [
          'Svetelný rok nie je čas, ale vzdialenosť – tá, ktorú svetlo preletí za rok. Ľahko sa to pomýli, ale je to rovnaké, ako keď povieš, že je to „dve hodiny autom“.',
          'Keď sa pozeráš na hviezdu 100 svetelných rokov daleko, vidíš ju takú, aká bola pred sto rokmi. Nevidíš vesmír, aký je – vidíš vesmír, aký bol. Čím dalej sa pozeráš, tým hlbšie do minulosti.',
          'Pre blízke hviezdy používajú astronómi ešte jednu jednotku, parsek (asi 3,26 svetelného roka). Vychádza z toho, ako sa hviezda zdanlivo pohne na oblohe, keď Zem preletí na druhú stranu svojej dráhy – a to je zároveň spôsob, ako sa vzdialenosti naozaj merajú.'
        ],
        cta: 'Ako daleko je čo?'
      },
      { type: 'fact', factId: 'svetelny-rok-946' },
      {
        type: 'cards',
        title: 'AKO DLHO K NÁM LETÍ SVETLO',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🌙', name: 'Z Mesiaca', short: 'Nieco cez sekundu.',
            text: 'Mesiac je 384 400 km daleko. Svetlo odtiaľ letí asi 1,3 sekundy – preto astronauti pri rozhovore s Mesiacom mierne „laggovali“.',
            image: 'moon', exampleLabel: '1,3 sekundy' },
          { icon: '☀️', name: 'Zo Slnka', short: 'Osem minút.',
            text: 'Slnko je 150 miliónov km daleko. Jeho svetlo je k nám na ceste 8 minút – vždy ho teda vidíš o 8 minút staršie.',
            image: 'sun', exampleLabel: '8 minút' },
          { icon: '⭐', name: 'Z najbližšej hviezdy', short: 'Štyri roky.',
            text: 'Proxima Centauri je 4,25 svetelného roka daleko. Medzi hviezdami je teda oveľa väčšia diera než v celej našej soustave.',
            image: 'starRed', exampleLabel: '4,25 roka' }
        ],
        cta: 'A ako daleko sú hmloviny?',
        xp: 15
      },
      { type: 'fact', factId: 'proxima-4-25' },
      {
        type: 'pick',
        title: '🔎 ČO JE NAJĎALEJ?',
        prompt: 'Ktorý z týchto objektov je od nás najďalej?',
        options: [
          { image: 'moon', correct: false, explain: 'Mesiac je od nás 1,3 svetelnej sekundy. To je vesmírne povedané za dverami.' },
          { image: 'm42', correct: false, explain: 'Orionova hmlovina je asi 1 300 svetelných rokov – stále v našej galaxii.' },
          { image: 'm31', correct: false, explain: 'Andromeda je 2,5 milióna svetelných rokov. Už veľmi daleko, ale ešte nie najviac.' },
          { image: 'm51', correct: true,  explain: 'Áno! Galaxia Vír je 31 miliónov svetelných rokov daleko – dvanásťkrát ďalej než Andromeda.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Keby bolo Slnko veľké ako futbalová lopta, Zem by bola zrniečko veľké 2 milimetre – a bola by od nej 24 metrov daleko.',
          'A najbližšia hviezda? Tá by bola ďalších 6 500 kilometrov odtiaľ. To je ako z Bratislavy do Ameriky.'
        ],
        footnote: 'Preto sa hovorí, že vesmír je hlavne prázdno – s pár zrniečkami v ňom.',
        cta: 'Ideme si to postaviť'
      },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'vzdialenosti', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📏 MISIA: MODEL NA CHODNÍKU',
        image: 'deepfield',
        subtitle: 'Slnečná soustava v skutočnej škále',
        lead: 'Toto sa nedá pochopiť z obrázka v knihe. Musí sa to odkráčať.',
        tasks: [
          { icon: '⚽', text: 'Slnko = futbalová lopta. Polož ju na jeden konec chodníka.' },
          { icon: '🚶', text: 'Odkráčaj 24 metrov – tam je Zem, zrniečko veľké 2 milimetre.' },
          { icon: '🪐', text: 'Saturn by bol asi 230 metrov od lopty. Skús aj to.' },
          { icon: '🤯', text: 'A najbližšia hviezda? Tá by bola 6 500 kilometrov daleko.' }
        ],
        note: 'Keď to odkráčaš, už nikdy nebudeš pozerať na obrázok Slnečnej soustavy rovnako.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Teraz už vieš, prečo sondy letia k planétam roky – a k hviezdam by leteli desaťtisíce rokov.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Svetelný rok je…',
            options: [
              { label: 'vzdialenosť, ktorú svetlo preletí za jeden rok', correct: true },
              { label: 'rok, ktorý má viac svetla' },
              { label: 'rýchlosť svetla' },
              { label: 'čas, ktorý svetlo letí zo Slnka' }
            ],
            explain: 'Je to vzdialenosť: 9,46 bilióna kilometrov.'
          },
          {
            kind: 'decide',
            question: 'Ako rýchlo letí svetlo?',
            options: [
              { icon: '⚡', label: '300 000 km za sekundu', correct: true },
              { icon: '🚀', label: '300 000 km za hodinu' }
            ],
            explain: 'Za sekundu. Za tú jednu sekundu by sedemkrát obletelo Zem.'
          },
          {
            kind: 'truefalse',
            question: 'Svetlo zo Slnka k nám letí asi 8 minút.',
            answer: true,
            explain: 'Preto Slnko vždy vidíš také, aké bolo pred ôsmimi minútami.'
          },
          {
            kind: 'order',
            question: 'Zoraď od najbližšieho po najvzdialenejšie.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Mesiac (1,3 svetelnej sekundy)', order: 1, icon: '🌙' },
              { label: 'Slnko (8 svetelných minút)', order: 2, icon: '☀️' },
              { label: 'Proxima Centauri (4,25 svetelného roka)', order: 3, icon: '⭐' },
              { label: 'M42 (asi 1 300 svetelných rokov)', order: 4, icon: '☁️' },
              { label: 'M31 (2,5 milióna svetelných rokov)', order: 5, icon: '🌀' }
            ],
            explain: 'Od sekúnd po milióny rokov – a to je len maličký kúsok vesmíru.'
          },
          {
            kind: 'image',
            question: 'Ktorý objekt je od nás najďalej?',
            options: [
              { image: 'm51', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'M51 je 31 miliónov svetelných rokov, M42 asi 1 300. Rozdiel je ohromný.'
          }
        ],
        resultGood: '🌟 Merač vesmíru!',
        resultOk: '🔭 Ešte raz – hlavne to, že svetelný rok je vzdialenosť.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 18 – KDE SME VO VESMÍRE
     ========================================================================== */
  {
    id: 'cosmic-address',
    icon: '🌍',
    title: 'KDE SME VO VESMÍRE',
    teaser: 'Tvoja vesmírna adresa – od Zeme až po okraj toho, čo vidíme.',
    minutes: '8 minút',
    badge: 'cosmic-address',
    basics: [ 'slnecna-soustava', 'mliecna-cesta', 'miestna-grupa', 'nadkopa',
              'viditelny-vesmir', 'rozpinanie-vesmiru', 'svetelny-rok' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'deepfield',
        question: '🔎 ČO JE VÄČŠINA TÝCHTO ŠKVŔN?',
        options: [
          { id: 'galaxies', icon: '🌀', label: 'celé galaxie' },
          { id: 'stars',    icon: '⭐', label: 'jednotlivé hviezdy' },
          { id: 'planets',  icon: '🪐', label: 'planéty' },
          { id: 'dust',     icon: '🫧', label: 'prach na objektíve' }
        ],
        correct: 'galaxies',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Takmer každá škvrna je celá galaxia s miliardami hviezd. A toto je len maličký výsek oblohy.',
        retryText: 'Skús ešte raz. Všimni si, že tie škvrny majú tvary – špirály, ovály. Hviezda by bola len bod.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌍 TVOJA VESMÍRNA ADRESA',
        image: 'milkyway',
        lines: [
          'Zem je v Slnečnej soustave, tá je v Mliečnej ceste.',
          'Naša galaxia je súčasťou Miestnej grupy galaxií a tá zase väčšej nadkopy.',
          'A všetko dokopy je vo vnútri toho, čomu hovoríme viditeľný vesmír.'
        ],
        more: [
          'Nič vo vesmíre nestojí. Zem sa otáča, obieha Slnko, Slnko obieha stred galaxie a celá naša galaxia letí voči susedným galaxiám. Všetky tieto pohyby sa skladajú na sebe – a nikde neexistuje bod, o ktorom by sa dalo povedať, že je úplne v pokoji.',
          'Vesmír sa navyše rozpína, ale nie tak, že by galaxie leteli od nás preč do prázdna. Rozpína sa samotný priestor medzi nimi. Preto sa nedá povedať, že by sme boli v strede: rovnako to vyzerá z každej galaxie.',
          'To, čo vidíme, je len viditeľná časť vesmíru – tá, odkiaľ k nám svetlo za 13,8 miliardy rokov stihlo doletieť. Čo je za tou hranicou, nevieme; nie preto, že by to bol koniec, ale preto, že sa k nám to svetlo ešte nedostalo.'
        ],
        cta: 'Poď na to po krokoch'
      },
      { type: 'fact', factId: 'nasa-galaxia' },
      {
        type: 'cards',
        title: 'ADRESA AKO MATRIOŠKA',
        subtitle: 'Otoč všetky štyri karty – od najmenšieho po najväčšie.',
        cards: [
          { icon: '🪐', name: '1. Slnečná soustava', short: 'Slnko a jeho planéty.',
            text: 'Naše Slnko, osem planét a kopa mesiacov, kometek a kameňov. Svetlo ju preletí za niekoľko hodín.',
            image: 'saturn', exampleLabel: 'Náš najbližší domov' },
          { icon: '🌌', name: '2. Mliečna cesta', short: 'Naša galaxia.',
            text: 'Stovky miliárd hviezd v špirále širokej 100 000 svetelných rokov. Slnko je asi 26 000 svetelných rokov od stredu.',
            image: 'milkyway', exampleLabel: 'Sme na predmestí' },
          { icon: '👨‍👩‍👧‍👦', name: '3. Miestna grupa', short: 'Naši susedia.',
            text: 'Skupina galaxií, do ktorej patríme aj s Andromedou. Sú v nej desiatky menších galaxií.',
            image: 'm31', exampleLabel: 'Najväčší sused: Andromeda' },
          { icon: '🫧', name: '4. Viditeľný vesmír', short: 'Kam dovidíme.',
            text: 'Oblasť, z ktorej k nám mohlo doletieť svetlo. Je široká okolo 94 miliárd svetelných rokov a je v nej nespočet galaxií.',
            image: 'deepfield', exampleLabel: 'Dalej než sem nedovidíme' }
        ],
        cta: 'A kto je hneď vedľa nás?',
        xp: 15
      },
      {
        type: 'compare',
        title: '⭐ KTO SÚ NAŠI SUSEDIA',
        lead: 'Najbližšie hviezdy sú prekvapivo daleko – a tie, čo poznáš z oblohy, nie sú tie najbližšie.',
        eye: {
          icon: '🔴',
          label: 'PROXIMA CENTAURI',
          art: 'starRed',
          text: 'Najbližšia hviezda po Slnku – 4,25 svetelného roka. Je to malá červená hviezda a zo Slovenska ju vôbec nevidno: je príliš na juhu.'
        },
        camera: {
          icon: '🔵',
          label: 'SIRIUS',
          image: 'starBlue',
          text: 'Najjasnejšia hviezda nočnej oblohy a jedna z najbližších – 8,6 svetelného roka. Túto v zime nájdeš ľahko.'
        },
        check: {
          question: 'Prečo Proximu zo Slovenska nevidno?',
          options: [
            { label: 'Je príliš na juhu – z našej zemepisnej šírky nevyjde nad obzor', correct: true,
              explain: 'Áno. Z každého miesta na Zemi vidíš inú časť oblohy. Preto sa astronómom vyplatí cestovať.' },
            { label: 'Je príliš daleko, aby ju bolo vidieť', correct: false,
              explain: 'Vzdialenosť to nie je – vidíme aj oveľa vzdialenejšie veci. Problém je, kde na oblohe leží.' }
          ]
        },
        cta: 'Ideme ešte dalej'
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Vesmír je starý asi 13,8 miliardy rokov – ale oblasť, ktorú vidíme, je široká okolo 94 miliárd svetelných rokov.',
          'Ako je to možné? Kým to svetlo k nám letelo, priestor sa stále rozpínal. Miesto, odkiaľ vyrazilo, je dnes oveľa dalej.'
        ],
        footnote: 'A to, čo je za tou hranicou, jednoducho nevidíme – svetlo odtiaľ k nám ešte nedoletelo.',
        cta: 'To mi hlava nestíha 🤯'
      },
      { type: 'fact', factId: 'vesmir-94' },
      { type: 'fact', factId: 'sirius-8-6' },
      {
        type: 'mission',
        title: '📸 MISIA: NAJBLIŽŠÍ SUSED, KTORÉHO VIDÍME',
        objectId: 'sirius',
        tasks: [
          { icon: '✏️', text: 'Napíš alebo nakresli svoju vesmírnu adresu – všetkých päť úrovní.' },
          { icon: '📱', text: 'V Stellariu nájdi Proximu Centauri a pozri sa, prečo ju odtiaľto nevidno.' },
          { icon: '🔭', text: 'Potom nájdi Sirius – v zime nízko na juhu, pod Orionom.' },
          { icon: '📸', text: 'Odfoť ho Dwarfom. Je to svetlo staré 8,6 roka.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Máš v zbierke najjasnejšiu hviezdu oblohy – a vieš, kde vo vesmíre stojíš.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'order',
            question: 'Zoraď svoju vesmírnu adresu od najmenšieho po najväčšie.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Zem', order: 1, icon: '🌍' },
              { label: 'Slnečná soustava', order: 2, icon: '🪐' },
              { label: 'Mliečna cesta', order: 3, icon: '🌌' },
              { label: 'Miestna grupa galaxií', order: 4, icon: '👨‍👩‍👧‍👦' },
              { label: 'Viditeľný vesmír', order: 5, icon: '🫧' }
            ],
            explain: 'Takto vyzerá tvoja adresa vo vesmíre – od domu až po okraj toho, čo vidíme.'
          },
          {
            kind: 'choice',
            question: 'Ktorá hviezda je od Slnka najbližšia?',
            options: [
              { label: 'Proxima Centauri', correct: true },
              { label: 'Sirius' },
              { label: 'Polárka' },
              { label: 'Betelgeuse' }
            ],
            explain: 'Proxima je 4,25 svetelného roka daleko. Sirius je druhý v poradí z tých jasných – 8,6 roka.'
          },
          {
            kind: 'truefalse',
            question: 'Sirius je najjasnejšia hviezda nočnej oblohy hlavne preto, že je blízko.',
            answer: true,
            explain: 'Je aj sám jasný, ale hlavne je len 8,6 svetelného roka daleko.'
          },
          {
            kind: 'decide',
            question: 'Vesmír je starý 13,8 miliardy rokov. Ako môže byť viditeľná časť široká 94 miliárd svetelných rokov?',
            options: [
              { icon: '🎈', label: 'Priestor sa počas letu svetla stále rozpínal', correct: true },
              { icon: '🏎️', label: 'Svetlo niekedy letí rýchlejšie' }
            ],
            explain: 'Svetlo má vždy tú istú rýchlosť. Ale priestor medzi nami a jeho zdrojom sa naťahoval.'
          },
          {
            kind: 'image',
            question: 'Na ktorom obrázku je viac než jedna galaxia?',
            options: [
              { image: 'deepfield', label: 'A', correct: true },
              { image: 'm31', label: 'B' }
            ],
            explain: 'A je hlboký pohľad – takmer každá škvrna je celá galaxia. B je jedna jediná: Andromeda.'
          }
        ],
        resultGood: '🌟 Vesmírna adresa zapamätaná!',
        resultOk: '🔭 Ešte raz – tá matrioška sa naučí ľahko.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 19 – EXOPLANÉTY
     ========================================================================== */
  {
    id: 'exoplanets',
    icon: '🪐',
    title: 'EXOPLANÉTY',
    teaser: 'Planéty pri iných hviezdach. Ako ich vôbec vieme nájsť?',
    minutes: '7 minút',
    badge: 'world-finder',
    basics: [ 'exoplaneta', 'tranzit', 'obyvatelna-zona', 'orbita',
              'magnituda', 'spektrum' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'transit',
        question: '🔎 AKO ZISTÍME, ŽE PRI HVIEZDE OBIEHA PLANÉTA?',
        options: [
          { id: 'dip',   icon: '📉', label: 'Hviezda na chvíľu trochu stmavne' },
          { id: 'see',   icon: '👀', label: 'Planétu priamo uvidíme na fotke' },
          { id: 'blink', icon: '✨', label: 'Planéta na nás bliká' },
          { id: 'radio', icon: '📡', label: 'Ozve sa rádiom' }
        ],
        correct: 'dip',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Keď planéta prejde presne pred svojou hviezdou, zakryje maličkú časť jej svetla. Hviezda stmavne – a to sa dá odmerať.',
        retryText: 'Skús ešte raz. Planéta je proti hviezde maličká a tmavá. Čo sa teda stane, keď prejde pred ňou?',
        xp: 10
      },
      {
        type: 'info',
        title: '🪐 SVETY PRI INÝCH HVIEZDACH',
        image: 'transit',
        lines: [
          'Planéty, ktoré obiehajú pri iných hviezdach, sa nazývajú exoplanéty.',
          'Sú tak daleko a také slabé, že ich takmer nikdy nevidíme priamo.',
          'Prezradia sa tým, čo robia so svetlom svojej hviezdy.'
        ],
        more: [
          'Prvý spôsob, ako sa exoplanéta prezradí, je tranzit: keď prejde presne pred svojou hviezdou, jasnosť hviezdy na chvíľu klesne. Pokles je pritom smiešne malý – u planéty veľkosti Jupitera asi jedno percento, u planéty veľkosti Zeme ani nie stotina percenta.',
          'Druhý spôsob je ešte prekvapivejší: planéta ťahá gravitáciou svoju hviezdu, takže hviezda sa okolo spoločného stredu trochu kolíše. To kolísanie sa dá zmerať zo zmien v jej spektre.',
          'Keď planéta prechádza pred hviezdou, prejde svetlo hviezdy aj cez okraj jej atmosféry. V spektre potom pribudnú čiary látok z tejto atmosféry – takto sa dá zistiť, z čoho je vzduch na planéte pri inej hviezde.'
        ],
        cta: 'Ako presne?'
      },
      { type: 'fact', factId: 'exoplanet-6000' },
      {
        type: 'cards',
        title: 'AKO SA HĽADAJÚ',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '📉', name: 'Tranzit', short: 'Hviezda stmavne.',
            text: 'Planéta prejde pred hviezdou a zakryje maličký kúsok jej svetla. Keď sa to zopakuje pravidelne, je to planéta – a vieme povedať, ako dlho obieha.',
            image: 'transit', exampleLabel: 'Najúspešnejšia metóda' },
          { icon: '🥣', name: 'Obývateľná zóna', short: 'Ani horúco, ani zima.',
            text: 'Pásmo okolo hviezdy, kde môže byť voda tekutá. Astronómi mu hovoria aj zóna Zlatovlásky – ako v tej rozprávke s kašou.',
            image: 'starYellow', exampleLabel: 'Tam hľadáme život' },
          { icon: '🌡️', name: 'Divné svety', short: 'Nič ako u nás.',
            text: 'Našli sa planéty veľké ako Jupiter, ktoré obiehajú okolo hviezdy za pár dní – a sú rozžeravené. Vesmír je oveľa divnejší, než sme čakali.',
            image: 'jupiter', exampleLabel: 'Horúce jupitery' }
        ],
        cta: 'Skúsil by som to sám',
        xp: 15
      },
      {
        type: 'howto',
        title: '🔬 AKO BY SI TO ROBIL TY',
        lead: 'Toto naozaj robia aj amatérski astronómovia – s ďalekohľadom, aký máš doma.',
        steps: [
          { icon: '📸', title: 'Fotíš hviezdu stále dokola',
            text: 'Celé hodiny, jednu snímku za druhou. Nezaujíma ťa krása, ale jasnosť tej jednej hviezdy.' },
          { icon: '📊', title: 'Meriaš, ako je jasná',
            text: 'Z každej snímky si zapíšeš jasnosť hviezdy a nakreslíš graf. Väčšinu času je čiara rovná.' },
          { icon: '📉', title: 'Hľadáš pokles',
            text: 'Keď planéta prejde pred hviezdou, čiara na chvíľu klesne a potom sa vráti. Pokles býva menší než jedno percento.' },
          { icon: '🔁', title: 'Overíš to znova',
            text: 'Jeden pokles nič neznamená – mohol to byť mrak. Až keď sa presne zopakuje, je to planéta.' }
        ],
        note: 'Toto je veda v čistej podobe: meraj, hľadaj vzor, over ho.',
        cta: 'Chápem',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Prvú planétu pri hviezde podobnej Slnku našli až v roku 1995. Dovtedy sme o žiadnej cudzej planéte nevedeli isto.',
          'Dnes ich poznáme vyše šesť tisíc – a to je len maličký zlomok toho, čo tam podľa vedcov je.'
        ],
        footnote: 'Za jeden ľudský život sme teda z nuly cudzích svetov prešli na tisíce.',
        cta: 'Ideme sa na jednu pozrieť'
      },
      { type: 'fact', factId: 'zlatovlaska-zona' },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'tranzit', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISIA: HVIEZDA S PLANÉTOU',
        objectId: 'peg51',
        tasks: [
          { icon: '📱', text: 'V Stellariu napíš „51 Pegasi“ – nájdeš ju v štvorci Pegasa na jesennej oblohe.' },
          { icon: '🔭', text: 'Odfoť ju Dwarfom. Uvidíš len bod – to je v poriadku.' },
          { icon: '💭', text: 'Uvedom si, čo si práve odfotil: hviezdu, pri ktorej obieha cudzí svet.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Odfotil si prvú hviezdu, pri ktorej ľudia našli planétu. Bod na fotke – a pri ňom celý svet.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Čo je exoplanéta?',
            options: [
              { label: 'Planéta, ktorá obieha okolo inej hviezdy než Slnko', correct: true },
              { label: 'Planéta, ktorá vyletela z galaxie' },
              { label: 'Veľmi veľká planéta' },
              { label: 'Planéta bez mesiaca' }
            ],
            explain: 'Všetko, čo obieha okolo cudzej hviezdy, je exoplanéta.'
          },
          {
            kind: 'decide',
            question: 'Ako sa najčastejšie hľadajú?',
            options: [
              { icon: '📉', label: 'Podľa toho, že hviezda pravidelne trochu stmavne', correct: true },
              { icon: '📷', label: 'Priamym fotografovaním planéty' }
            ],
            explain: 'Metóda tranzitu. Priame fotenie exoplanét sa podarí len veľmi zriedka.'
          },
          {
            kind: 'truefalse',
            question: 'Obývateľná zóna je pásmo okolo hviezdy, kde môže byť tekutá voda.',
            answer: true,
            explain: 'Ani horúco, ani zima – preto sa jej hovorí aj zóna Zlatovlásky.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok ukazuje tranzit?',
            options: [
              { image: 'transit', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'A: tmavá tečka pred hviezdou a graf, kde jasnosť klesla. B je planetárna hmlovina.'
          },
          {
            kind: 'order',
            question: 'Zoraď, ako sa potvrdí objav exoplanéty.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Merať jasnosť hviezdy veľa hodín', order: 1, icon: '📸' },
              { label: 'Nakresliť graf jasnosti', order: 2, icon: '📊' },
              { label: 'Nájsť v grafe pokles', order: 3, icon: '📉' },
              { label: 'Počkať, či sa pokles pravidelne zopakuje', order: 4, icon: '🔁' }
            ],
            explain: 'Bez zopakovania to nie je objav – mohol to byť mrak alebo chyba.'
          }
        ],
        resultGood: '🌟 Hľadač svetov!',
        resultOk: '🔭 Ešte raz – tranzit je celý trik.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 20 – KOMÉTY A METEORY
     ========================================================================== */
  {
    id: 'comets',
    icon: '☄️',
    title: 'KOMÉTY A METEORY',
    teaser: 'Špinavé snehové gule a padajúce hviezdy, ktoré nie sú hviezdy.',
    minutes: '7 minút',
    badge: 'comet-watcher',
    basics: [ 'kometa', 'chvost-komety', 'meteoroid', 'meteor',
              'meteorit', 'bolid', 'roj' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'comet',
        question: '🔎 Z ČOHO JE KOMÉTA?',
        options: [
          { id: 'ice',   icon: '🧊', label: 'z ľadu a prachu' },
          { id: 'fire',  icon: '🔥', label: 'z ohňa' },
          { id: 'star',  icon: '⭐', label: 'je to malá hviezda' },
          { id: 'metal', icon: '⚙️', label: 'z čistého kovu' }
        ],
        correct: 'ice',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Kométa je zmrznutá guľa ľadu a prachu – stará 4,6 miliardy rokov, teda z času, keď vznikala Slnečná soustava.',
        retryText: 'Skús ešte raz. Kométa dostane chvost, keď sa priblíži k Slnku a začne sa vyparovať. Čo sa teda vyparuje?',
        xp: 10
      },
      {
        type: 'info',
        title: '☄️ ŠPINAVÁ SNEHOVÁ GUĽA',
        image: 'comet',
        lines: [
          'Kométa je zvyšok z čias, keď sa rodila Slnečná soustava.',
          'Keď priletí blízko k Slnku, ľad sa začne vyparovať a okolo jadra vznikne obrovský obal.',
          'Slnečné svetlo a častice ho potom rozfúkajú do dvoch chvostov.'
        ],
        more: [
          'Jadro kométy je malé – len niekoľko kilometrov – a je z ľadu, prachu a zamrznutých plynov. Väčšinu času je daleko od Slnka a je úplne tmavé a nezaujímavé. Až teplo Slnka z neho urobí to, čo poznáme z fotiek.',
          'Kométa má dva chvosty, a to nie je náhoda. Prachový chvost je zakrivený a nechá sa unášať po dráhe kométy, kým plynový chvost je namierený presne od Slnka, pretože ho odfukuje slnečný vietor.',
          'A pozor na jednu vec, ktorá mnohých mýli: chvost nie je za kométou ako za autom. Keď kométa letí od Slnka, letí chvostom vpredu – smer chvosta určuje Slnko, nie pohyb kométy.'
        ],
        cta: 'A čo padajúce hviezdy?'
      },
      { type: 'fact', factId: 'kometa-dva-chvosty' },
      {
        type: 'cards',
        title: 'TRI SLOVÁ, KTORÉ SI ĽUDIA MÝLIA',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🪨', name: 'Meteoroid', short: 'Kým je vo vesmíre.',
            text: 'Kamienok alebo zrniečko letiace vesmírom. Môže byť veľké ako prach alebo ako malá asteroida.',
            image: 'deepfield', exampleLabel: 'Vo vesmíre' },
          { icon: '🌠', name: 'Meteor', short: 'Kým horí v atmosfére.',
            text: 'Keď zrniečko vletí do atmosféry a zhorí, vidíme svetelnú čiaru. Toto je tá „padajúca hviezda“ – hoci hviezda to nie je.',
            image: 'meteors', exampleLabel: 'V atmosfére' },
          { icon: '🇸🇰', name: 'Meteorit', short: 'Keď dopadne na zem.',
            text: 'Keď kus prežije let atmosférou a dopadne, je to meteorit. Jeden taký dopadol aj na Slovensko.',
            image: 'moon', exampleLabel: 'Na zemi – dá sa chytiť' }
        ],
        cta: 'Ideme na úlohu',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 ČO JE „PADAJÚCA HVIEZDA“?',
        prompt: 'Ktorý obrázok ukazuje meteory?',
        options: [
          { image: 'comet',    correct: false, explain: 'Toto je kométa. Tá na nebi stojí celé týždne, nikam nepadá.' },
          { image: 'meteors',  correct: true,  explain: 'Áno! Meteory – zrniečka, ktoré zhoreli v atmosfére. Pri roji sa zdá, že vyletujú z jedného miesta.' },
          { image: 'iss',      correct: false, explain: 'Toto je prelet družice – letí pomaly a rovnomerne, nie ako záblesk.' },
          { image: 'starBlue', correct: false, explain: 'Toto je hviezda. Tá je od nás svetelné roky a nikam nepadá.' }
        ],
        xp: 20
      },
      { type: 'fact', factId: 'perzeidy' },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          '28. februára 2010 preletel nad Košicami bolid tisíckrát jasnejší ako Mesiac v splne.',
          'Vedci potom v okolí našli 218 úlomkov o celkovej hmotnosti 11,28 kilogramu. Kus vesmíru, ktorý dopadol pár hodín cesty odtiaľto.'
        ],
        footnote: 'Na Slovensku teda máme vlastný meteorit – a vieme presne, odkiaľ priletel.',
        cta: 'To je super!'
      },
      { type: 'fact', factId: 'meteorit-kosice' },
      { type: 'fact', factId: 'meteorov-44-ton' },
      {
        type: 'mission',
        title: '🌠 MISIA: POČÍTAJ METEORY',
        objectId: 'perseids',
        tasks: [
          { icon: '📅', text: 'Nájdi si najbližší meteorický roj – Perzeidy vrcholia 12. – 13. augusta.' },
          { icon: '🛌', text: 'Ľahni si na deku a pozeraj do širokej časti oblohy. Ďalekohľad tu netreba!' },
          { icon: '🔢', text: 'Počítaj meteory pol hodiny a zapíš si číslo.' },
          { icon: '📸', text: 'Dwarf nechaj fotiť dlhé série širokouhlo – niektorý meteor ti do záberu vletí sám.' }
        ],
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Meteorický roj máš v zbierke. A tvoje číslo je skutočné pozorovacie dáta.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Z čoho sa skladá kométa?',
            options: [
              { label: 'Hlavne z ľadu a prachu', correct: true },
              { label: 'Z horúceho plynu ako hviezda' },
              { label: 'Z čistého kovu' },
              { label: 'Z lávy' }
            ],
            explain: 'Preto sa jej hovorí špinavá snehová guľa.'
          },
          {
            kind: 'decide',
            question: 'Kamienok práve horí v atmosfére. Ako sa mu v tej chvíli hovorí?',
            options: [
              { icon: '🌠', label: 'Meteor', correct: true },
              { icon: '🇸🇰', label: 'Meteorit' }
            ],
            explain: 'Vo vesmíre je to meteoroid, v atmosfére meteor a na zemi meteorit.'
          },
          {
            kind: 'truefalse',
            question: 'Chvost kométy vždy smeruje dozadu, tam odkiaľ kométa priletela.',
            answer: false,
            explain: 'Nie – chvost je vždy odfúknutý od Slnka. Keď kométa letí od Slnka, má chvost vpredu!'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok je meteorický roj?',
            options: [
              { image: 'meteors', label: 'A', correct: true },
              { image: 'comet', label: 'B' }
            ],
            explain: 'A: krátke čiary rozbiehajúce sa z jedného miesta. B je kométa s dvomi chvostmi.'
          },
          {
            kind: 'order',
            question: 'Zoraď cestu jedného zrniečka prachu.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Odpadne z kométy pri Slnku', order: 1, icon: '☄️' },
              { label: 'Zostane po nej prachová stopa', order: 2, icon: '✨' },
              { label: 'Zem preletí cez tú stopu', order: 3, icon: '🌍' },
              { label: 'Zrniečko zhorí ako meteor', order: 4, icon: '🌠' }
            ],
            explain: 'Preto sú niektoré roje každý rok v ten istý čas – Zem prechádza tou istou stopou.'
          }
        ],
        resultGood: '🌟 Pozorovateľ kométy!',
        resultOk: '🔭 Ešte raz – hlavne tie tri slová.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 21 – TMAVÁ OBLOHA
     ========================================================================== */
  {
    id: 'darksky',
    icon: '🌑',
    title: 'TMAVÁ OBLOHA',
    teaser: 'Prečo z mesta nevidno hviezdy – a kam ísť za skutočnou tmou.',
    minutes: '6 minút',
    badge: 'dark-guardian',
    basics: [ 'svetelne-znecistenie', 'magnituda', 'zenit', 'sum',
              'expozicia', 'rosa' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'citysky',
        question: '🔎 PREČO Z MESTA VIDNO LEN MÁLO HVIEZD?',
        options: [
          { id: 'lights', icon: '💡', label: 'Svetlo lámp rozsvieti celú oblohu' },
          { id: 'none',   icon: '🌌', label: 'Nad mestom je menej hviezd' },
          { id: 'air',    icon: '💨', label: 'Vzduch je nad mestom hustejší' },
          { id: 'houses', icon: '🏢', label: 'Zakrývajú ich domy' }
        ],
        correct: 'lights',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Svetlo lámp sa odráža od prachu a vlhkosti v atmosfére a rozsvieti celú oblohu. Slabé hviezdy sa v tej žiare stratia.',
        retryText: 'Skús ešte raz. Hviezdy sú nad mestom presne tie isté. Čo sa teda zmenilo?',
        xp: 10
      },
      {
        type: 'info',
        title: '💡 OBLOHA, KTORÁ SVIETI',
        image: 'citysky',
        lines: [
          'Veľa lámp svieti aj nahor, do oblohy, kde nikto nič nepotrebuje vidieť.',
          'To svetlo sa v atmosfére rozptýli a obloha prestane byť čierna.',
          'Z mesta tak uvidíš pár desiatok hviezd, z tmavého miesta tisíce.'
        ],
        more: [
          'Svetlo, ktoré ide zo lámp nahor, sa v atmosfére odrazí od molekúl vzduchu a drobných kvapiek. Obloha sa tým rozsvieti a slabé hviezdy sa v tej žiare stratia – nie sú prekryté, len ich už nedokážeme odlíšiť od pozadia.',
          'Nie je to len problém pre astronómov. Nočné svetlo mätie vtáky pri migrácii, priťahuje a vyčerpáva nočné motýle a mení chovanie mnohých živočíchov.',
          'Dobrá správa je, že svetelné znečistenie zmizne v okamihu, keď sa lampa zhasne alebo zastieni. Na rozdiel od väčšiny znečistení nič nezostáva – stačí svietiť nadol a len tam, kde to treba.'
        ],
        cta: 'Aký veľký je ten rozdiel?'
      },
      {
        type: 'compare',
        title: '🌆 MESTO vs. 🌌 TMAVÁ OBLOHA',
        lead: 'Ten istý večer, tá istá obloha, to isté oko. Len iné miesto.',
        eye: {
          icon: '🌆',
          label: 'Z MESTA',
          art: 'citysky',
          text: 'Oranžová žiara nad domami, pár najjasnejších hviezd a Mesiac. Mliečnu cestu neuvidíš vôbec.'
        },
        camera: {
          icon: '🌌',
          label: 'Z TMAVÉHO MIESTA',
          image: 'milkyway',
          text: 'Tisíce hviezd, Mliečna cesta ako pás cez celé nebo a tmavé prachové oblaky v ňom. Rozdiel je obrovský.'
        },
        check: {
          question: 'Čo pomôže tvojim fotkám najviac?',
          options: [
            { label: 'Odviezť sa na tmavé miesto mimo mesta', correct: true,
              explain: 'Áno – tmavá obloha pomôže viac než akékoľvek nastavenie alebo drahší ďalekohľad.' },
            { label: 'Nastaviť v appke vyšší gain', correct: false,
              explain: 'Vyšší gain zosilní aj tú žiaru z mesta. Problém tým nevyriešiš.' }
          ]
        },
        cta: 'Kam teda ísť?'
      },
      { type: 'fact', factId: 'poloniny' },
      {
        type: 'howto',
        title: '🚗 AKO SI NÁJSŤ TMAVÉ MIESTO',
        lead: 'Nemusíte ísť až do Polonín. Aj pár kilometrov za mesto je veľký rozdiel.',
        steps: [
          { icon: '🗺️', title: 'Pozri si mapu svetelného znečistenia',
            text: 'Na internete sú mapy, kde je tma. Nájdi si najbližšie tmavé miesto od vás.' },
          { icon: '🌑', title: 'Vyber noc bez Mesiaca',
            text: 'Mesiac v splne rozsvieti oblohu takmer ako mesto. Najlepšie sú noci okolo novu.' },
          { icon: '🔴', title: 'Nesvieť si bielou baterkou',
            text: 'Oko si zvyká na tmu asi 20 minút a jedno bliknutie to zruší. Používaj červené svetlo.' },
          { icon: '🧥', title: 'Obleč sa teplejšie, než si myslíš',
            text: 'V noci sa stojí na jednom mieste a je zima aj v lete. Deka a čaj sú súčasť výbavy.' }
        ],
        note: 'A ešte jedna vec: nechaj oči 20 minút privyknúť tme, než začneš hodnotiť, koľko hviezd vidíš.',
        cta: 'Ideme na to',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Väčšina ľudí na Zemi už nikdy v živote nevidela Mliečnu cestu. Nie preto, že by zmizla – ale preto, že žijú vo svetle.',
          'Tvoj syn ju vidieť môže. Stačí odviezť sa pár kilometrov.'
        ],
        footnote: 'Svetelné znečistenie je jediný druh znečistenia, ktorý zmizne v tej sekunde, keď vypneš vypínač.',
        cta: 'Chcem to vidieť'
      },

      /* ---------------- INTERAKTÍVNA ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'svetelne-znecistenie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '🔢 MISIA: SPOČÍTAJ HVIEZDY',
        image: 'milkyway',
        subtitle: 'Rovnaký pokus na dvoch miestach',
        lead: 'Toto je skutočné meranie, aké robia aj vedci pri sledovaní svetelného znečistenia.',
        tasks: [
          { icon: '🏠', text: 'Doma si vyber malú časť oblohy (napr. štvorec Veľkého voza) a spočítaj v ňom hviezdy.' },
          { icon: '🚗', text: 'To isté zopakuj na tmavom mieste za mestom – v ten istý štvorec.' },
          { icon: '📊', text: 'Porovnaj obe čísla. Rozdiel býva aj desaťnásobný.' },
          { icon: '📸', text: 'A ten istý objekt odfoť z oboch miest, aby si videl rozdiel aj na fotke.' }
        ],
        note: 'Nechaj oči najprv 20 minút privyknúť tme – inak si podceníš tmavé miesto.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Práve si zmeral svetelné znečistenie tam, kde žijete. To je citizen science.',
        cta: 'Posledná výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo z mesta vidíme menej hviezd?',
            options: [
              { label: 'Svetlo lámp sa rozptýli v atmosfére a rozsvieti oblohu', correct: true },
              { label: 'Nad mestom sú naozaj menej hviezd' },
              { label: 'Hviezdy sa svetla lámp boja' },
              { label: 'Vzduch je nad mestom teplejší' }
            ],
            explain: 'Hviezdy sú tam tie isté. Len sa stratia v žiare, ktorú sami vyrábame.'
          },
          {
            kind: 'decide',
            question: 'Chceš fotiť slabú galaxiu. Čo pomôže viac?',
            options: [
              { icon: '🚗', label: 'Odviezť sa na tmavé miesto', correct: true },
              { icon: '🎚️', label: 'Zvýšiť gain na maximum' }
            ],
            explain: 'Tmavá obloha je najlacnejšie a najsilnejšie „vylepšenie“ ďalekohľadu, aké existuje.'
          },
          {
            kind: 'truefalse',
            question: 'Oko si na tmu zvyká asi 20 minút a jedno bliknutie bielou baterkou to zruší.',
            answer: true,
            explain: 'Preto astronómovia používajú červené svetlo – to adaptáciu na tmu takmer nepokazí.'
          },
          {
            kind: 'image',
            question: 'Na ktorej oblohe uvidíš Mliečnu cestu?',
            options: [
              { image: 'milkyway', label: 'A', correct: true },
              { image: 'citysky', label: 'B' }
            ],
            explain: 'B je obloha nad mestom – tam Mliečna cesta zmizne v žiare lámp.'
          },
          {
            kind: 'order',
            question: 'Zoraď, ako si naplánujete výjazd za tmavou oblohou.',
            hint: 'Klikaj v správnom poradí.',
            items: [
              { label: 'Nájsť tmavé miesto na mape', order: 1, icon: '🗺️' },
              { label: 'Vybrať noc bez Mesiaca', order: 2, icon: '🌑' },
              { label: 'Zbaliť deku, čaj a červenú baterku', order: 3, icon: '🎒' },
              { label: 'Na mieste dať očiam 20 minút na tmu', order: 4, icon: '👀' }
            ],
            explain: 'Posledný krok ľudia najčastejšie vynechajú – a potom sa čudujú, že „nič nevidno“.'
          }
        ],
        resultGood: '🌟 Ochránca tmy!',
        resultOk: '🔭 Ešte raz – a potom rovno von z mesta.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 22 – ĎALEKOHĽADY
     ========================================================================== */
  {
    id: 'telescopes',
    icon: '🏛️',
    title: 'ĎALEKOHĽADY',
    teaser: 'Od hvezdárenskej kupoly po Webb – a kde v tom je tvoj Dwarf.',
    minutes: '7 minút',
    badge: 'telescope-expert',
    basics: [ 'objektiv-zrkadlo', 'kupola', 'senzor', 'infracervene-svetlo',
              'zorne-pole', 'seeing', 'falosne-farby' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'dome',
        question: '🔎 PREČO MAJÚ HVEZDÁRNE OKRÚHLE KUPOLY?',
        options: [
          { id: 'turn',   icon: '🔄', label: 'Aby sa dali otočiť kamkoľvek na nebi' },
          { id: 'pretty', icon: '🎨', label: 'Lebo sú krásne' },
          { id: 'rain',   icon: '🌧️', label: 'Aby z nich stekal dážď' },
          { id: 'hide',   icon: '🙈', label: 'Aby ich nebolo vidieť' }
        ],
        correct: 'turn',
        successTitle: '🎉 SPRÁVNE!',
        successText: 'Kupola sa otáča, takže úzku štrbinu môžeš namieriť kamkoľvek. A keďže je otvorená len tá štrbina, vietor ďalekohľadom netrasie.',
        retryText: 'Skús ešte raz. Ďalekohľad sa musí pozrieť na každý kút oblohy. Čo teda musí kupola zvládnuť?',
        xp: 10
      },
      {
        type: 'info',
        title: '🏛️ ČÍM VÄČŠIE ZRKADLO, TÝM VIAC SVETLA',
        image: 'dome',
        lines: [
          'Ďalekohľad je v podstate vedro na svetlo. Čím väčšie, tým viac nazbiera.',
          'Preto majú veľké ďalekohľady zrkadlá – veľké zrkadlo sa dá vyrobiť ľahšie než veľká čočka.',
          'A stavajú sa na horách, kde je nad nimi menej vzduchu a menej svetla z miest.'
        ],
        more: [
          'Zväčšenie nie je to najdôležitejšie číslo ďalekohľadu, aj keď to tak na obaloch vyzerá. Podstatný je priemer zrkadla alebo čočky, pretože ten určuje, koľko svetla ďalekohľad nazbiera a aké slabé objekty teda vôbec uvidí.',
          'Veľký priemer navyše lepšie rozlišuje detaily. Preto sa stavajú ďalekohľady s desaťmetrovými zrkadlami – a preto sa niekoľko menších dá spojiť tak, aby fungovali ako jeden obrovský.',
          'Najväčším nepriateľom ostrosti je vzduch. Preto stoja veľké observatóriá na vysokých horách v púšti a preto sa niektoré ďalekohľady posielajú priamo do vesmíru, kde nad nimi nie je už žiadna atmosféra.'
        ],
        cta: 'A tie vo vesmíre?'
      },
      { type: 'fact', factId: 'hubble-webb' },
      {
        type: 'cards',
        title: 'TRI ĎALEKOHĽADY, TRI SVETY',
        subtitle: 'Otoč všetky tri karty.',
        cards: [
          { icon: '🛰️', name: 'Hubble', short: 'Nad atmosférou.',
            text: 'Zrkadlo 2,4 metra, obieha asi 560 km nad Zemou. Nad atmosférou nič nerozostruje obraz – preto sú jeho fotky také ostré.',
            image: 'm31', exampleLabel: 'Vidí to, čo aj naše oko' },
          { icon: '🔭', name: 'Webb', short: 'V infračervenom svetle.',
            text: 'Odletel 25. decembra 2021 až 1,5 milióna kilometrov od Zeme. Vidí v infračervenom svetle, takže dovidí cez prach a hlbšie do minulosti.',
            image: 'deepfield', exampleLabel: 'Vidí to, čo oko nevidí' },
          { icon: '🏠', name: 'Tvoj Dwarf', short: 'Ten istý princíp.',
            text: 'Objektív 30 mm, stojí na statíve v záhrade. Zbiera svetlo dlho a skladá snímky – presne ako tie veľké. Len v menšom.',
            image: 'm42', exampleLabel: 'Vidí prekvapivo veľa' }
        ],
        cta: 'Porovnajme to',
        xp: 15
      },
      {
        type: 'compare',
        title: '🔍 TVOJA FOTKA vs. HUBBLE',
        lead: 'Ten istý objekt, dva veľmi rozdielne prístroje – a napriek tomu prekvapivo veľa spoločného.',
        eye: {
          icon: '🏠',
          label: 'DWARF ZO ZÁHRADY',
          art: 'roundstars',
          text: 'Objektív 30 mm, pod atmosférou, pár desiatok minút. Uvidíš tvar hmloviny, jej farby aj hviezdy v nej.'
        },
        camera: {
          icon: '🛰️',
          label: 'HUBBLE Z ORBITY',
          image: 'm42',
          text: 'Zrkadlo 2,4 m, nad atmosférou, často desiatky hodín. Vidí detaily, ktoré sú pre malý ďalekohľad nedosiahnuteľné.'
        },
        check: {
          question: 'Čím to hlavne je, že Hubble vidí viac?',
          options: [
            { label: 'Má oveľa väčšie zrkadlo a je nad atmosférou', correct: true,
              explain: 'Áno – väčšie „vedro“ na svetlo a žiadny rozmazávajúci vzduch. Princíp je ale úplne rovnaký ako u tvojho Dwarfu.' },
            { label: 'Je oveľa bližšie k hmlovine', correct: false,
              explain: 'To nie. Oproti 1 300 svetelným rokom je 560 km nad Zemou úplne zanedbateľné.' }
          ]
        },
        cta: 'Ideme si to porovnať naozaj'
      },
      {
        type: 'wow',
        title: '🤯 POČKAJ…',
        lines: [
          'Zbierať svetlo dlho, skladať veľa snímok, presne sledovať oblohu – to isté robí Hubble, Webb aj tvoj Dwarf.',
          'Rozdiel je vo veľkosti zrkadla a v cene. Nie v tom, ako to funguje.'
        ],
        footnote: 'Takže keď fotíš hmlovinu zo záhrady, robíš presne to, čo najdrahšie prístroje ľudstva.',
        cta: 'To je paráda'
      },
      { type: 'fact', factId: 'dwarf-bratranec' },
      {
        type: 'mission',
        title: '🔍 MISIA: MOJA FOTKA vs. HUBBLE',
        image: 'm42',
        subtitle: 'Porovnaj to najlepšie, čo máš, s tým najlepším na svete',
        lead: 'Nie preto, aby si sa cítil malý – ale aby si videl, koľko z toho máš aj ty.',
        tasks: [
          { icon: '🖼️', text: 'Otvor si svoju najlepšiu fotku M42 (alebo iného objektu).' },
          { icon: '🛰️', text: 'Nájdi si tú istú hmlovinu na stránke ESA/Hubble (odkaz je na obrazovke Zdroje).' },
          { icon: '🔎', text: 'Nájdi tri veci, ktoré vidno na oboch fotkách.' },
          { icon: '💭', text: 'A jednu, ktorú vidí len Hubble. Skús povedať prečo.' }
        ],
        note: 'Tri veci na oboch fotkách sú viac, než by väčšina ľudí čakala od 30-milimetrového objektívu.',
        button: '✅ MISIA SPLNENÁ',
        xp: 50,
        doneText: 'Toto je najlepší koniec akadémie: vieš, čo máš v rukách – aj čo to dokáže.',
        cta: 'Poslednýkrát: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Prečo majú veľké ďalekohľady zrkadlá a nie čočky?',
            options: [
              { label: 'Veľké zrkadlo sa dá vyrobiť ľahšie než veľká čočka', correct: true },
              { label: 'Zrkadlá sú farebnejšie' },
              { label: 'Čočky sa vo vesmíre rozbijú' },
              { label: 'Zrkadlá sú lacnejšie na čistenie' }
            ],
            explain: 'Zrkadlo sa dá podoprieť zozadu a nemusí byť priehľadné – preto sa dá urobiť naozaj veľké.'
          },
          {
            kind: 'decide',
            question: 'Prečo sa hvezdárne stavajú na horách?',
            options: [
              { icon: '⛰️', label: 'Je nad nimi menej vzduchu a menej svetla z miest', correct: true },
              { icon: '🚠', label: 'Aby boli bližšie k hviezdam' }
            ],
            explain: 'Bližšie k hviezdam sa hora nepočíta. Ale čistý a nehybný vzduch áno.'
          },
          {
            kind: 'truefalse',
            question: 'Webb obieha okolo Zeme podobne ako Hubble.',
            answer: false,
            explain: 'Webb je 1,5 milióna kilometrov od Zeme – to je štyrikrát dalej než Mesiac. Hubble je len 560 km nad nami.'
          },
          {
            kind: 'image',
            question: 'Ktorý obrázok je hvezdáreň s kupolou?',
            options: [
              { image: 'dome', label: 'A', correct: true },
              { image: 'citysky', label: 'B' }
            ],
            explain: 'A: kupola s úzkou štrbinou pod hviezdnou oblohou. B je obloha nad mestom.'
          },
          {
            kind: 'order',
            question: 'Zoraď ďalekohľady podľa veľkosti zrkadla či objektívu.',
            hint: 'Klikaj od najmenšieho.',
            items: [
              { label: 'Dwarf mini (30 mm objektív)', order: 1, icon: '🏠' },
              { label: 'Hubble (2,4 m zrkadlo)', order: 2, icon: '🛰️' },
              { label: 'Webb (6,5 m zrkadlo)', order: 3, icon: '🔭' },
              { label: 'ELT v Čile (39 m zrkadlo)', order: 4, icon: '🏛️' }
            ],
            explain: 'Od 3 centimetrov po 39 metrov – a princíp je celý čas ten istý.'
          }
        ],
        resultGood: '🌟 Znalec ďalekohľadov – a koniec akadémie!',
        resultOk: '🔭 Ešte raz – a máš celú akadémiu za sebou.'
      }
    ]
  }

  /* Ďalšie lekcie sa pridávajú sem – stačí dodržať rovnakú štruktúru. */
];

/* =============================================================================
   PRIPRAVOVANÉ LEKCIE – zobrazujú sa vo Vesmírnej mape ako „už čoskoro“.
   Keď lekciu naozaj vytvoríš v LESSONS, stačí ju odtiaľto vymazať.
   ========================================================================== */
const UPCOMING = [
  { icon: '🌍', title: 'POLÁRNE ŽIARY',      teaser: 'Prečo obloha svieti zeleno – a kedy ich vidno aj u nás.' },
  { icon: '🚀', title: 'SONDY A ROVERY',     teaser: 'Voyager, Perseverance – kam sme už doleteli.' },
  { icon: '🪐', title: 'TRPASLIČIE PLANÉTY', teaser: 'Prečo Pluto prestalo byť planétou.' },
  { icon: '🔊', title: 'ZVUKY VESMÍRU',      teaser: 'Rádiová astronómia a čo „slyšia“ ďalekohľady.' },
  { icon: '👽', title: 'JE TAM NIEKTO?',     teaser: 'Ako ľudia hľadajú život vo vesmíre.' }
];

/* ---------------------------- ODZNAKY -------------------------------- */
const BADGES = {
  'nebula-hunter': {
    icon: '☁️',
    name: 'LOVEC HMLOVÍN',
    text: 'Zvládol si celú lekciu o hmlovinách.'
  },
  'sky-navigator': {
    icon: '🧭',
    name: 'NAVIGÁTOR OBLOHY',
    text: 'Vieš, prečo sa obloha točí – a ako ju Dwarf dokáže sledovať.'
  },
  'cluster-collector': {
    icon: '✨',
    name: 'ZBERATEĽ HVIEZDOKÔP',
    text: 'Rozoznáš otvorenú hviezdokopu od guľovej.'
  },
  'milkyway-citizen': {
    icon: '🌌',
    name: 'OBYVATEĽ MLIEČNEJ CESTY',
    text: 'Vieš, kde v galaxii žiješ – a prečo ju vidíme ako pás.'
  },
  'galaxy-explorer': {
    icon: '🌀',
    name: 'OBJAVITEĽ GALAXIÍ',
    text: 'Poznáš tvary galaxií a vyfotil si tú v Andromede.'
  },
  'planet-hunter': {
    icon: '🪐',
    name: 'LOVEC PLANÉT',
    text: 'Vieš, prečo planéty putujú – a ako ich správne fotiť.'
  },
  'star-expert': {
    icon: '⭐',
    name: 'ZNALEC HVIEZD',
    text: 'Z farby hviezdy vieš povedať, ako je horúca.'
  },
  'supernova-witness': {
    icon: '💥',
    name: 'SVEDOK SUPERNOVY',
    text: 'Vieš, ako umierajú veľké hviezdy – a čo po nich zostane.'
  },
  'darkness-scout': {
    icon: '⚫',
    name: 'PRIESKUMNÍK TEMNOTY',
    text: 'Vieš, čo je čierna diera a ako sa dá vyfotiť.'
  },
  'dwarf-operator': {
    icon: '🔭',
    name: 'OPERÁTOR DWARFU',
    text: 'Vieš, čo v Dwarfe nastaviť a na čo si dať pozor.'
  },
  'sun-watcher': {
    icon: '☀️',
    name: 'SLNEČNÝ HLIADKAR',
    text: 'Odfotil si vlastnú hviezdu – bezpečne, s filtrom.'
  },
  'phase-keeper': {
    icon: '🌗',
    name: 'STRÁŽCA FÁZ',
    text: 'Vieš, prečo Mesiac mení tvar, a zvládol si desaťdňový projekt.'
  },
  'sky-cartographer': {
    icon: '🗺️',
    name: 'KARTOGRAF OBLOHY',
    text: 'Nájdeš si na nebi objekt podľa jeho adresy.'
  },
  'sky-tracker': {
    icon: '🛰️',
    name: 'SLEDOVAČ OBLOHY',
    text: 'Chytil si prelet vesmírnej stanice.'
  },
  'astrophoto-master': {
    icon: '📸',
    name: 'ASTROFOTO MAJSTER',
    text: 'Vieš, prečo sto snímok bije jednu.'
  },
  'light-reader': {
    icon: '🔬',
    name: 'ČÍTAČ SVETLA',
    text: 'Rozložil si svetlo na farby a vieš, čo v ňom astronómi čítajú.'
  },
  'distance-meter': {
    icon: '📏',
    name: 'MERAČ VESMÍRU',
    text: 'Odkráčal si Slnečnú soustavu a vieš, čo je svetelný rok.'
  },
  'cosmic-address': {
    icon: '🌍',
    name: 'VESMÍRNA ADRESA',
    text: 'Vieš presne, kde vo vesmíre žiješ.'
  },
  'world-finder': {
    icon: '🪐',
    name: 'HĽADAČ SVETOV',
    text: 'Rozumieš, ako sa hľadajú planéty pri iných hviezdach.'
  },
  'comet-watcher': {
    icon: '☄️',
    name: 'POZOROVATEĽ KOMÉTY',
    text: 'Počítal si meteory a vieš rozdiel medzi meteorom a meteoritom.'
  },
  'dark-guardian': {
    icon: '🌑',
    name: 'OCHRÁNCA TMY',
    text: 'Zmeral si svetelné znečistenie tam, kde žiješ.'
  },
  'telescope-expert': {
    icon: '🏛️',
    name: 'ZNALEC ĎALEKOHĽADOV',
    text: 'Porovnal si vlastnú fotku s Hubblovou – a vieš, prečo sa líšia.'
  }
};

/* ---------------------------- ÚROVNE --------------------------------- */
/* Stačí pridať ďalší riadok a úroveň funguje. */
const LEVELS = [
  { xp: 0,    name: 'Astronóm začiatočník' },
  { xp: 150,  name: 'Pozorovateľ' },
  { xp: 400,  name: 'Astronóm' },
  { xp: 700,  name: 'Deep-Sky Explorer' },
  { xp: 1100, name: 'Majster oblohy' },
  { xp: 1600, name: 'Kapitán vesmíru' },
  { xp: 2200, name: 'Prieskumník galaxií' },
  { xp: 2900, name: 'Vesmírny navigátor' },
  { xp: 3700, name: 'Veľmajster oblohy' },
  { xp: 4100, name: 'Legenda Vesmírnej akadémie' }
];

/* ---------------------------- ZDROJE --------------------------------- */
const SOURCES = [
  { label: 'NASA – Messier 42 (Orionova hmlovina)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/' },
  { label: 'NASA Space Place – What Is a Nebula?', url: 'https://spaceplace.nasa.gov/nebula/en' },
  { label: 'ESA/Hubble – Hubble’s sharpest view of the Orion Nebula', url: 'https://esahubble.org/images/heic0601a/' },
  { label: 'ESA/Hubble – Ring Nebula (Messier 57)', url: 'https://esahubble.org/images/heic1310a/' },
  { label: 'ESA/Hubble – Whirlpool Galaxy (M51)', url: 'https://esahubble.org/images/heic0506a/' },
  { label: 'ESA/Hubble – Omega Centauri', url: 'https://esahubble.org/images/heic0809a/' },
  { label: 'ESA/Hubble – Latest Saturn Portrait', url: 'https://esahubble.org/images/heic1917a/' },
  { label: 'ESO – The Carina Nebula', url: 'https://www.eso.org/public/images/eso0905a/' },
  { label: 'ESO – Messier 78, a reflection nebula in Orion', url: 'https://www.eso.org/public/images/eso1105b/' },
  { label: 'ESO – The Horsehead Nebula', url: 'https://www.eso.org/public/images/eso0202a/' },
  { label: 'DwarfLab – oficiálna stránka ďalekohľadu', url: 'https://dwarflab.com/' },
  { label: 'DwarfLab – DWARF mini (parametre, 90 s expozícia v EQ režime)', url: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope' },
  { label: 'DwarfLab Help – DWARF mini EQ Mode Setup Guide', url: 'https://help.dwarflab.com/en/docs/dwarf-mini-equatorial-setup-guide' },
  { label: 'NASA – What Is the North Star and How Do You Find It?', url: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/' },
  { label: 'NASA – There’s More to the North Star Than Meets the Eye', url: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/' },
  { label: 'NASA Space Place – How Long Is One Day on Other Planets?', url: 'https://spaceplace.nasa.gov/days/en/' },
  { label: 'NASA – Milky Way (Imagine the Universe)', url: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html' },
  { label: 'NASA – Messier 45 (Plejády)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/' },
  { label: 'NASA – Messier 13 (guľová hviezdokopa v Herkulovi)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/' },
  { label: 'NASA – Messier 31 (Andromeda)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/' },
  { label: 'NASA – Messier 51 (galaxia Vír)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/' },
  { label: 'NASA – Messier 1 (Krabia hmlovina)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/' },
  { label: 'NASA – Saturn: fakty', url: 'https://science.nasa.gov/saturn/facts/' },
  { label: 'NASA – Jupiter: mesiace', url: 'https://science.nasa.gov/jupiter/jupiter-moons/' },
  { label: 'NASA – Mesiac: fakty', url: 'https://science.nasa.gov/moon/facts/' },
  { label: 'NASA – Seeing Double (dvojhviezdy)', url: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/' },
  { label: 'NASA – farby a teploty hviezd', url: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html' },
  { label: 'ESO / EHT – prvá fotografia čiernej diery v našej galaxii', url: 'https://www.eso.org/public/news/eso2208-eht-mw/' },
  { label: 'ESO – panoráma Mliečnej cesty', url: 'https://www.eso.org/public/images/eso0932a/' },
  { label: 'ESO – Plejády', url: 'https://www.eso.org/public/images/b11/' },
  { label: 'ESA/Hubble – zrážka s Andromedou nie je istá (2025)', url: 'https://esahubble.org/news/heic2508/' },
  { label: 'ESA/Hubble – Andromeda (M31), Krabia hmlovina (M1), M13', url: 'https://esahubble.org/images/' }
];
