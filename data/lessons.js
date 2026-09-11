/* =============================================================================
   LEKCE  (data/lessons.js)
   -----------------------------------------------------------------------------
   TADY SE UPRAVUJE VEŠKERÝ TEXT LEKCE. V app.js není žádný obsah lekce.

   Lekce = pole kroků (steps). Každý krok má "type" a aplikace pro něj zná
   svou obrazovku. Dostupné typy kroků:

     guess    – hádanka: obrázek + 4 možnosti
     info     – jedna hlavní myšlenka: obrázek + 1–3 krátké věty
     cards    – karty, které se dají otevřít (např. 4 typy mlhovin)
     pick     – vyber správný obrázek ze čtyř
     wow      – velký "WOW" moment
     compare  – porovnání dvou obrázků (oko vs. fotoaparát)
     mission  – reálná misie (Stellarium + Dwarf) + objevení objektu
     quiz     – mini test na konci

   Typy otázek v kvízu: 'choice' | 'image' | 'truefalse' | 'order' | 'decide'
   ========================================================================== */

const LESSONS = [
  {
    id: 'nebulae',
    icon: '☁️',
    title: 'MLHOVINY',
    teaser: 'Dokážeš zjistit, co se skrývá za tímto tajemným oblakem?',
    minutes: '6 minut',
    badge: 'nebula-hunter',
    basics: [ 'hmlovina', 'typy-hmlovin', 'plyn-a-prach', 'svetelny-rok',
              'magnituda', 'suhvezdie', 'expozicia' ],
    quizXp: 100,           // XP za dokončený kvíz
    steps: [

      /* ---------------------------- 1. HÁDANKA -------------------------- */
      {
        type: 'guess',
        image: 'carina',
        question: '🔎 CO MYSLÍŠ, ŽE TO JE?',
        options: [
          { id: 'galaxy',  icon: '🌌', label: 'galaxie' },
          { id: 'nebula',  icon: '☁️', label: 'mlhovina' },
          { id: 'cluster', icon: '✨', label: 'hvězdokupa' },
          { id: 'planet',  icon: '🪐', label: 'planeta' }
        ],
        correct: 'nebula',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Mlhovina je obrovský oblak plynu a prachu ve vesmíru.',
        retryText: 'Zkus to ještě jednou. Podívej se na ty oblaky – nejsou to hvězdy ani planeta.',
        xp: 10
      },

      /* ------------------------ 2. CO JE MLHOVINA ----------------------- */
      {
        type: 'info',
        title: '☁️ CO JE MLHOVINA?',
        image: 'carina',
        lines: [
          'Mlhovina je obrovský oblak plynu a prachu ve vesmíru.',
          'Některé mlhoviny jsou místem, kde se rodí nové hvězdy.',
          'Jiné vzniknou, když stará hvězda umírá.'
        ],
        more: [
          'V jednom kubickém centimetru mlhoviny je často jen několik set atomů. Ve stejně velké ' +
          'kostce vzduchu okolo tebe jich je asi 25 trilionů. Mlhovina vypadá hustá jen proto, že ' +
          'je obrovská – světlo musí projít tisíci miliard kilometrů plynu a to se nakonec sečte.',
          'Většinu mlhoviny tvoří vodík, tedy tentýž plyn, z jakého je i Slunce. Když ho blízká ' +
          'žhavá hvězda osvítí svým ultrafialovým světlem, vodík začne sám svítit do červena. ' +
          'Proto jsou emisní mlhoviny na fotkách často růžové a červené.',
          'Vodík z mlhovin se mění na hvězdy a hvězdy ho na konci života znovu rozfoukají do ' +
          'vesmíru – už obohacený o nové látky. Vesmír tak tentýž materiál používá dokola.'
        ],
        diagram: 'nebula-cycle',   // jednoduchá animovaná ilustrace (v app.js)
        cta: 'A teď pozor…'
      },

      /* --------------------- 3. ČTYŘI TYPY MLHOVIN ---------------------- */
      {
        type: 'cards',
        title: 'MLHOVINA NENÍ VŽDY STEJNÁ',
        subtitle: 'Klikni na každou kartu a otoč ji.',
        kinds: ['emission', 'reflection', 'dark', 'planetary'],
        cta: 'Rozumím, jdeme na to!',
        xp: 15
      },

      /* ---------------------- 4. INTERAKTIVNÍ ÚLOHA --------------------- */
      {
        type: 'pick',
        title: '🔎 UHÁDNI MLHOVINU',
        prompt: 'Která z nich je planetární mlhovina?',
        options: [
          { image: 'm42',       correct: false, explain: 'Tohle je emisní mlhovina – celý oblak svítí vlastním světlem.' },
          { image: 'ring',      correct: true,  explain: 'Přesně tak! Vidíš ten prstenec? To jsou vrstvy, které odhodila umírající hvězda. Ve ' +
                                                         'středu zůstal malý bílý bod – její jádro.' },
          { image: 'horsehead', correct: false, explain: 'Tohle je temná mlhovina – tmavý prach, který zakrývá světlo za sebou.' },
          { image: 'm78',       correct: false, explain: 'Tohle je reflexní mlhovina – modravý prach, který jen odráží světlo hvězdy.' }
        ],
        xp: 20
      },

      /* ------------------------ 4b. VÍŠ, ŽE? ---------------------------- */
      { type: 'fact', factId: 'hmloviny-recyklacia' },

      /* --------------------------- 5. WOW MOMENT ------------------------ */
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Když se díváš na některé mlhoviny, díváš se na světlo, které cestovalo stovky nebo ' +
          'tisíce let, než dorazilo až k nám.',
          'Takže vlastně koukáme do minulosti!'
        ],
        footnote: 'Světlo z Orionovy mlhoviny vyrazilo na cestu ještě ve středověku.',
        cta: 'To je šílené 🤯'
      },

      { type: 'fact', factId: 'svetlo-z-minulosti' },

      /* ------------------------- 6. CO UVIDÍ DWARF ---------------------- */
      {
        type: 'compare',
        title: '🔭 A CO UVIDÍME V DWARFU?',
        lead: 'Dwarf dokáže zachytit objekty, které jsou pro naše oči příliš slabé.',
        eye: {
          icon: '👁️',
          label: 'LIDSKÉ OKO',
          text: 'Oko vidí jen to, co na něj dopadne právě teď. Slabé světlo si nedokáže uložit.'
        },
        camera: {
          icon: '📸',
          label: 'ASTRONOMICKÁ FOTOGRAFIE',
          text: 'Dwarf sbírá světlo dlouho a spojí mnoho snímků do jednoho. Proto se objeví barvy a ' +
                'tvary, které oko nikdy neuvidí.',
          image: 'm42'
        },
        check: {
          question: 'Proč tedy Dwarf vidí víc než naše oko?',
          options: [
            { label: 'Protože dlouho sbírá světlo a skládá mnoho snímků', correct: true,
              explain: 'Ano! Říká se tomu dlouhá expozice a skládání snímků.' },
            { label: 'Protože letí blíž k mlhovině', correct: false,
              explain: 'To ne – Dwarf stojí na Zemi stejně jako my. Jeho tajemství je čas a skládání snímků.' }
          ]
        },
        cta: 'Jdeme fotit!'
      },

      { type: 'fact', factId: 'dwarf-30mm' },

      /* -------------------------- 7. NAŠE MISE -------------------------- */
      {
        type: 'mission',
        title: '📸 NAŠE PRVNÍ MISE',
        objectId: 'm42',
        tasks: [
          { icon: '🔭', text: 'Najdi M42 ve Stellariu.' },
          { icon: '📸', text: 'Zkus ji vyfotografovat Dwarfem.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Objekt se uložil do tvé vesmírné sbírky.',
        cta: 'Poslední výzva: mini test'
      },

      /* --------------------------- 8. MINI KVÍZ ------------------------- */
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [

          {
            kind: 'choice',
            question: 'Co je mlhovina?',
            options: [
              { label: 'Obrovský oblak plynu a prachu', correct: true },
              { label: 'Velmi velká planeta' },
              { label: 'Skupina miliard hvězd' },
              { label: 'Kus ledu, který letí okolo Slunce' }
            ],
            explain: 'Mlhovina je oblak plynu a prachu. Skupina miliard hvězd je galaxie.'
          },

          {
            kind: 'image',
            question: 'Která mlhovina souvisí se zrodem nových hvězd?',
            options: [
              { image: 'm42',  label: 'A', correct: true },
              { image: 'ring', label: 'B' },
              { image: 'horsehead', label: 'C' },
              { image: 'saturn', label: 'D' }
            ],
            explain: 'Tohle je M42 – emisní mlhovina a nejbližší velká porodnice hvězd. (D není ani ' +
                     'mlhovina, to je planeta Saturn!)'
          },

          {
            kind: 'truefalse',
            question: 'Planetární mlhovina je oblak, který obklopuje planetu.',
            answer: false,
            explain: 'Nepravda! Planetární mlhovina je pozůstatek umírající hvězdy. Jméno dostala jen proto, ' +
                     'že ve starých dalekohledech vypadala jako malá planeta.'
          },

          {
            kind: 'order',
            question: 'Seřaď životní příběh hvězdy podobné Slunci – od začátku do konce.',
            hint: 'Klikej na kroky ve správném pořadí.',
            items: [
              { label: 'Oblak plynu a prachu (mlhovina)', order: 1, icon: '☁️' },
              { label: 'Zrodí se nová hvězda',           order: 2, icon: '⭐' },
              { label: 'Hvězda zestárne a nafoukne se',   order: 3, icon: '🔴' },
              { label: 'Odhodí vrstvy → planetární mlhovina', order: 4, icon: '💀' }
            ],
            explain: 'Přesně tak – z mlhoviny hvězda vznikne a v mlhovině i skončí. Vesmír recykluje!'
          },

          {
            kind: 'decide',
            question: 'Objekt je vzdálený 1 000 světelných let. Co to znamená?',
            options: [
              { icon: '⏳', label: 'Jeho světlo k nám letělo 1 000 let', correct: true },
              { icon: '📏', label: 'Je 1 000-krát větší než Slunce' }
            ],
            explain: 'Světelný rok je vzdálenost, kterou světlo proletí za jeden rok. Takže vidíme, jak ' +
                     'objekt vypadal před 1 000 lety.'
          }

        ],
        resultGood: '🌟 Výborně!',
        resultOk: '🔭 Ještě jednou a budeš mistr mlhovin!'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 2 – JAK FUNGUJE DWARF A CO JE EQ MODE
     ========================================================================== */
  {
    id: 'eq-mode',
    icon: '🔭',
    title: 'DWARF A EQ REŽIM',
    teaser: 'Proč se hvězdy na dlouhých fotkách točí – a jak je zastavit?',
    minutes: '8 minut',
    badge: 'sky-navigator',
    basics: [ 'rotacia-oblohy', 'hviezdny-den', 'nebesky-pol', 'az-rezim',
              'eq-rezim', 'expozicia', 'zorne-pole' ],
    quizXp: 100,
    steps: [

      /* ---------------------------- HÁDANKA ----------------------------- */
      {
        type: 'guess',
        image: 'startrails',
        question: '🔎 PROČ JSOU HVĚZDY JAKO ČÁRKY?',
        options: [
          { id: 'earth',  icon: '🌍', label: 'Země se otáčí' },
          { id: 'camera', icon: '📷', label: 'Porouchal se fotoaparát' },
          { id: 'wind',   icon: '🌬️', label: 'Foukal vítr' },
          { id: 'fly',    icon: '🚀', label: 'Hvězdy opravdu letí' }
        ],
        correct: 'earth',
        successTitle: '🎉 PŘESNĚ TAK!',
        successText: 'Země se otáčí – a s ní i fotoaparát. Proto se hvězdy na dlouhém snímku rozmažou do ' +
                     'oblouků.',
        retryText: 'Zkus to ještě jednou. Zamysli se nad tím, co se hýbe – hvězdy, nebo my?',
        xp: 10
      },

      /* ------------------------ ZEMĚ SE OTÁČÍ --------------------------- */
      {
        type: 'info',
        title: '🌍 MY SE HÝBEME, NE HVĚZDY',
        image: 'polaris',
        lines: [
          'Země se otáčí – jednou dokola za necelý den.',
          'Nám se zdá, že se točí obloha: hvězdy se každou hodinu posunou o 15 stupňů.',
          'Dalekohled je proto musí přesně sledovat, jinak se nám na fotce rozmažou.'
        ],
        more: [
          'Země se otočí jednou dokola za 23 hodin a 56 minut – ne přesně za 24. Ty čtyři minuty ' +
          'rozdílu jsou důvod, proč hvězdy vycházejí každý den o něco dřív a proč v létě a v zimě ' +
          'vidíme na obloze jiná souhvězdí.',
          'Nebeský pól je jediné místo na obloze, které se nehýbe – všechno ostatní se okolo něj ' +
          'točí. Na severní polokouli je tam téměř přesně Polárka, a právě proto ji používáme k ' +
          'nastavení EQ režimu.',
          'AZ režim otáčí Dwarf nahoru-dolů a doleva-doprava, což hvězdu ve středu záběru udrží, ' +
          'ale celý obrázek se přitom pomalu přetáčí. EQ režim otáčí Dwarf okolo téže osy, okolo ' +
          'jaké se točí Země – a proto obrázek stojí.'
        ],
        diagram: 'sky-rotation',
        cta: 'Jak to Dwarf dělá?'
      },

      { type: 'fact', factId: 'zem-23-56' },

      /* ----------------------- DVA REŽIMY ------------------------------- */
      {
        type: 'cards',
        title: 'DWARF TO ZVLÁDNE DVĚMA ZPŮSOBY',
        subtitle: 'Klikni na obě karty a otoč je.',
        cards: [
          {
            icon: '🧭',
            name: 'AZ režim',
            short: 'Hýbe se doleva-doprava a nahoru-dolů.',
            text: 'Nejjednodušší nastavení: postavíš Dwarf na zem a jde to. Objekt sleduje, ale obraz se ' +
                  'mu přitom pomalu otáčí. Proto jsou dobré jen krátké snímky.',
            image: 'startrails',
            exampleLabel: 'Krátké snímky, žádné nastavování'
          },
          {
            icon: '⚙️',
            name: 'EQ režim',
            short: 'Otáčí se stejně jako obloha.',
            text: 'Dwarf nakloníš tak, aby jedna jeho osa směřovala k Polárce. Potom stačí jediný pohyb, ' +
                  'který přesně kopíruje otáčení Země – a hvězdy zůstanou kulaté.',
            image: 'roundstars',
            exampleLabel: 'Dlouhé snímky, je třeba nastavit'
          }
        ],
        cta: 'Chci to vidět!',
        xp: 15
      },

      /* --------------------- POROVNANIE AZ vs EQ ------------------------ */
      {
        type: 'compare',
        title: '⏱️ CO SE STANE PŘI DLOUHÉM SNÍMKU?',
        lead: 'Čím delší dobu Dwarf sbírá světlo, tím slabší objekty uvidí. Ale bez EQ režimu se mu ' +
              'hvězdy začnou točit.',
        eye: {
          icon: '🧭',
          label: 'AZ REŽIM · 90 sekund',
          art: 'startrails',
          text: 'Do 15 – 20 sekund je všechno v pořádku. Po 30 – 60 sekundách se hvězdy začnou točit do ' +
                'oblouků a okraje fotky je třeba odstřihnout.'
        },
        camera: {
          icon: '⚙️',
          label: 'EQ REŽIM · 90 sekund',
          image: 'roundstars',
          text: 'Hvězdy zůstanou kulaté i po 90 sekundách. Dwarf mini tolik v EQ režimu opravdu ' +
                'zvládne.'
        },
        check: {
          question: 'Kdy se tedy EQ režim vyplatí nejvíc?',
          options: [
            { label: 'Když chci dlouhé snímky slabých mlhovin a galaxií', correct: true,
              explain: 'Ano! Na slabé objekty potřebuješ dlouho sbírat světlo – a to bez EQ nejde.' },
            { label: 'Když fotím Měsíc, který je velmi jasný', correct: false,
              explain: 'Měsíc je tak jasný, že mu stačí zlomky sekundy. Tam EQ režim není potřeba.' }
          ]
        },
        cta: 'Jdeme to nastavit'
      },

      { type: 'fact', factId: 'eq-90-sekund' },

      /* ------------------- PRAKTICKÝ POSTUP (HOWTO) --------------------- */
      {
        type: 'howto',
        title: '🧭 JAK NASTAVIT EQ REŽIM',
        lead: 'Čtyři kroky. Nic se nedá zkazit – když to nevyjde, prostě to zkusíš znovu.',
        steps: [
          { icon: '📐', title: 'Stativ do vodorovné polohy',
            text: 'Postav stativ na pevné místo a vyrovnej ho, aby nebyl nakřivo.' },
          { icon: '📏', title: 'Nakloň Dwarf na 50°',
            text: 'To je úhel naší zeměpisné šířky (Praha ≈ 50°). Díky němu bude osa Dwarfu rovnoběžná s ' +
                  'osou Země.' },
          { icon: '⭐', title: 'Otoč ho na Polárku (na severu)',
            text: 'Nemusí to být úplně přesné. Pár stupňů vedle aplikace dorovná při kalibraci.' },
          { icon: '📱', title: 'Kalibruj v aplikaci',
            text: 'V aplikaci Dwarf zapni EQ režim a nech ho provést kalibraci. Potom už můžeš fotit ' +
                  'dlouhé snímky.' }
        ],
        note: 'Přesný postup pro Dwarf mini je i v oficiálním návodu DwarfLab (odkaz je na obrazovce ' +
              '🔗 Zdroje).',
        cta: 'Rozumím, jdeme dál',
        xp: 20
      },

      /* ---------------------------- WOW --------------------------------- */
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Celá obloha se točí okolo jednoho jediného bodu – a hned u něj stojí Polárka.',
          'Zemská osa totiž ukazuje přesně tam. Proto Polárka nikdy nezapadá a vždy ukazuje k ' +
          'severu.'
        ],
        footnote: 'Kdybys nechal fotoaparát otevřený celou noc, hvězdy by okolo Polárky nakreslily kruhy.',
        cta: 'To je super 🤯'
      },

      { type: 'fact', factId: 'polarka-tri-hviezdy' },
      { type: 'fact', factId: 'polarka-najde-velky-voz' },

      /* --------------------------- MISIA -------------------------------- */

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'eq-nastavenie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '🧭 MISE: POLÁRKA',
        objectId: 'polaris',
        tasks: [
          { icon: '🔭', text: 'Najdi Polárku ve Stellariu (napiš „Polaris“).' },
          { icon: '🌙', text: 'Venku ji najdi podle Velkého vozu.' },
          { icon: '⚙️', text: 'Nastav s tátou Dwarf do EQ režimu a zkus 60sekundový snímek.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Polárka je tvoje! Uložila se do sbírky – a teď už umíš i nastavit EQ režim.',
        cta: 'Poslední výzva: mini test'
      },

      /* --------------------------- KVÍZ --------------------------------- */
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [

          {
            kind: 'choice',
            question: 'Proč se hvězdy na dlouhé fotce rozmažou do oblouků?',
            options: [
              { label: 'Protože se Země otáčí a obloha se nám posouvá', correct: true },
              { label: 'Protože hvězdy blikají' },
              { label: 'Protože je venku zima' },
              { label: 'Protože je fotoaparát rozbitý' }
            ],
            explain: 'Obloha se nám posune o 15 stupňů každou hodinu. Dalekohled ji musí přesně sledovat.'
          },

          {
            kind: 'image',
            question: 'Na kterém snímku byl dobře nastavený EQ režim?',
            options: [
              { image: 'roundstars', label: 'A', correct: true },
              { image: 'startrails', label: 'B' }
            ],
            explain: 'Kulaté a ostré hvězdy znamenají, že sledování bylo přesné.'
          },

          {
            kind: 'truefalse',
            question: 'V EQ režimu nakloníme Dwarf tak, aby jedna jeho osa mířila k Polárce.',
            answer: true,
            explain: 'Přesně tak. Tehdy je osa Dwarfu rovnoběžná s osou Země a stačí jediný pohyb, který ' +
                     'kopíruje otáčení oblohy.'
          },

          {
            kind: 'order',
            question: 'Seřaď nastavení EQ režimu do správného pořadí.',
            hint: 'Klikej na kroky ve správném pořadí.',
            items: [
              { label: 'Vyrovnat stativ do vodorovné polohy', order: 1, icon: '📐' },
              { label: 'Naklonit Dwarf na 50°',        order: 2, icon: '📏' },
              { label: 'Otočit ho na Polárku',          order: 3, icon: '⭐' },
              { label: 'Kalibrovat v aplikaci',        order: 4, icon: '📱' }
            ],
            explain: 'Nejprve vodorovný stativ, potom úhel, potom sever – a nakonec kalibrace.'
          },

          {
            kind: 'decide',
            question: 'Proč je u mlhovin lepší jeden 90sekundový snímek než 15sekundový?',
            options: [
              { icon: '🪣', label: 'Za 90 sekund nasbírá mnohem více světla', correct: true },
              { icon: '🔍', label: 'Protože je větší a více přiblížená' }
            ],
            explain: 'Je to jako sbírání dešťové vody do kbelíku – čím déle sbíráš, tím víc máš. Proto se ' +
                     'slabé mlhoviny fotí dlouho.'
          }

        ],
        resultGood: '🌟 Paráda, jsi navigátor oblohy!',
        resultOk: '🔭 Ještě jednou a budeš to mít v malíčku!'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 3 – HVIEZDOKOPY
     ========================================================================== */
  {
    id: 'clusters',
    icon: '✨',
    title: 'HVĚZDOKUPY',
    teaser: 'Hvězdy se nerodí po jedné. Co je Sedm sester?',
    minutes: '7 minut',
    badge: 'cluster-collector',
    basics: [ 'hviezdokopa', 'gravitacia', 'svetelny-rok', 'magnituda',
              'ostrenie', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm13',
        question: '🔎 CO JE NA TÉHLE FOTCE?',
        options: [
          { id: 'nebula',  icon: '☁️', label: 'mlhovina' },
          { id: 'cluster', icon: '✨', label: 'hvězdokupa' },
          { id: 'galaxy',  icon: '🌌', label: 'galaxie' },
          { id: 'planet',  icon: '🪐', label: 'planeta' }
        ],
        correct: 'cluster',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Hvězdokupa je skupina hvězd, které se narodily spolu z jednoho oblaku.',
        retryText: 'Zkus to ještě jednou. Podívej se pořádně – není to oblak plynu ani spirála. Jsou to ' +
                   'samé hvězdy.',
        xp: 10
      },
      {
        type: 'info',
        title: '✨ HVĚZDY SE RODÍ V PARTÁCH',
        image: 'm45',
        lines: [
          'V mlhovině se nikdy nerodí jen jedna hvězda.',
          'Najednou jich vznikne desítky, stovky, někdy i sto tisíc.',
          'Takové skupině hvězdných sourozenců se říká hvězdokupa.'
        ],
        more: [
          'Hvězdy v jedné hvězdokupě se zrodily ve stejném oblaku a přibližně ve stejnou dobu. ' +
          'Jsou to tedy opravdu sourozenci – a astronomům to ohromně pomáhá: když znají věk ' +
          'jedné, znají věk všech.',
          'Otevřené hvězdokupy jsou mladé a drží spolu jen volně. Gravitace galaxie je po ' +
          'několika stovkách milionů let rozpustí, takže dnes už nevíme, kde jsou sourozenci ' +
          'našeho Slunce.',
          'Kulové hvězdokupy jsou úplně jiný případ: jsou staré téměř jako samotný vesmír, mají ' +
          'stovky tisíc hvězd a drží spolu tak pevně, že přežily celou historii galaxie.'
        ],
        cta: 'A nejsou všechny stejné…'
      },
      { type: 'fact', factId: 'plejady-sestry' },
      {
        type: 'cards',
        title: 'DVA DRUHY HVĚZDOKUP',
        subtitle: 'Klikni na obě karty a otoč je.',
        cards: [
          { icon: '🌟', name: 'Otevřená', short: 'Mladá a volná.',
            text: 'Desítky až tisíce mladých hvězd, které jsou od sebe dost daleko. Jsou to sourozenci z ' +
                  'jedné mlhoviny – například Plejády.',
            image: 'm45', exampleLabel: 'Příklad: M45 Plejády' },
          { icon: '🔵', name: 'Kulová', short: 'Stará a nabitá.',
            text: 'Koule napěchovaná stovkami tisíc starých hvězd. Obíhá okolo naší galaxie a je téměř ' +
                  'tak stará jako vesmír.',
            image: 'm13', exampleLabel: 'Příklad: M13 v Herkulovi' }
        ],
        cta: 'Jdeme si to vyzkoušet',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 UHÁDNI HVĚZDOKUPU',
        prompt: 'Která z nich je kulová hvězdokupa?',
        options: [
          { image: 'm45', correct: false, explain: 'To jsou Plejády – otevřená hvězdokupa. Hvězdy jsou od sebe daleko a je jich „jen“ ' +
                                                   'tisíc.' },
          { image: 'm13', correct: true,  explain: 'Přesně! Koule z více než 100 000 hvězd. Čím blíž ke středu, tím jsou hvězdy ' +
                                                   'natlačenější.' },
          { image: 'm42', correct: false, explain: 'To je mlhovina – oblak plynu a prachu, ne skupina hvězd.' },
          { image: 'm31', correct: false, explain: 'To je celá galaxie! Ta má miliardy hvězd, ne sto tisíc.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Otevřené hvězdokupy se po čase rozpadnou – hvězdy se pomalu rozprchnou po galaxii.',
          'Astronomové si myslí, že i naše Slunce se narodilo v takové partě. Jeho sourozenci ' +
          'jsou dnes rozsypaní po celé Mléčné dráze.'
        ],
        footnote: 'Někde tam venku tedy máme „sesterské“ hvězdy Slunce – jen přesně nevíme které.',
        cta: 'To je šílené 🤯'
      },
      { type: 'fact', factId: 'gulova-100tisic' },
      {
        type: 'mission',
        title: '📸 MISE: PLEJÁDY',
        objectId: 'm45',
        tasks: [
          { icon: '🔭', text: 'Najdi M45 ve Stellariu.' },
          { icon: '👁️', text: 'Venku je zkus spočítat volným okem – kolik jich vidíš?' },
          { icon: '📸', text: 'Vyfotografuj je Dwarfem a spočítej znovu.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Plejády máš ve sbírce. Rozdíl mezi okem a Dwarfem jsi viděl na vlastní oči.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Co je hvězdokupa?',
            options: [
              { label: 'Skupina hvězd, které se narodily spolu', correct: true },
              { label: 'Oblak plynu a prachu' },
              { label: 'Galaxie s miliardami hvězd' },
              { label: 'Planeta s mnoha měsíci' }
            ],
            explain: 'Hvězdokupa = hvězdní sourozenci z jedné mlhoviny.'
          },
          {
            kind: 'image',
            question: 'Která z nich je otevřená hvězdokupa?',
            options: [
              { image: 'm45', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'Plejády – mladé hvězdy volně rozsypané. Kulová hvězdokupa je natlačená do koule.'
          },
          {
            kind: 'truefalse',
            question: 'Kulové hvězdokupy jsou mladší než otevřené.',
            answer: false,
            explain: 'Naopak! Kulové jsou velmi staré – téměř tak staré jako vesmír. Otevřené jsou mladé a ' +
                     'časem se rozpadnou.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejmenšího počtu hvězd po největší.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Dvojhvězda (2 hvězdy)', order: 1, icon: '👯' },
              { label: 'Otevřená hvězdokupa (tisíce)', order: 2, icon: '🌟' },
              { label: 'Kulová hvězdokupa (stovky tisíc)', order: 3, icon: '🔵' },
              { label: 'Galaxie (miliardy)', order: 4, icon: '🌌' }
            ],
            explain: 'Od dvojice až po celou galaxii – takto se hvězdy ve vesmíru shromažďují.'
          },
          {
            kind: 'decide',
            question: 'Proč vidíme v Plejádách volným okem jen šest či sedm hvězd?',
            options: [
              { icon: '👁️', label: 'Protože ostatní jsou příliš slabé pro naše oko', correct: true },
              { icon: '🌫️', label: 'Protože ostatní jsou schované za Měsícem' }
            ],
            explain: 'Jasné hvězdy vidíme, slabší ne. Dwarf jich nasbírá stovky.'
          }
        ],
        resultGood: '🌟 Skvělé, hvězdokupy máš v malíčku!',
        resultOk: '🔭 Ještě jednou a bude to sedět!'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 4 – NAŠE GALAXIE
     ========================================================================== */
  {
    id: 'milkyway',
    icon: '🌌',
    title: 'NAŠE GALAXIE',
    teaser: 'Kde ve vesmíru vlastně jsme? A co je ten světlý pás na nebi?',
    minutes: '7 minut',
    badge: 'milkyway-citizen',
    basics: [ 'mliecna-cesta', 'galakticky-disk', 'halo', 'svetelne-znecistenie',
              'svetelny-rok', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'milkyway',
        question: '🔎 CO JE TEN SVĚTLÝ PÁS NA NEBI?',
        options: [
          { id: 'cloud',  icon: '☁️', label: 'obyčejný mrak' },
          { id: 'city',   icon: '🏙️', label: 'světlo z města' },
          { id: 'galaxy', icon: '🌌', label: 'naše galaxie zvnitřku' },
          { id: 'smoke',  icon: '💨', label: 'kouř' }
        ],
        correct: 'galaxy',
        successTitle: '🎉 PŘESNĚ TAK!',
        successText: 'Je to disk naší galaxie. Sedíme v něm – a proto ho vidíme jako pás přes celé nebe.',
        retryText: 'Zkus to ještě jednou. Ten pás je na nebi každý rok na stejném místě – takže to není ' +
                   'mrak ani dým.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌌 ŽIJEME VE SPIRÁLE',
        image: 'milkyway',
        lines: [
          'Naše galaxie se jmenuje Mléčná dráha.',
          'Je to spirála s příčkou a má v průměru asi 100 000 světelných let.',
          'Slunce je asi 26 000 světelných let od jejího středu – tedy někde na předměstí.'
        ],
        more: [
          'Když se v létě díváš na Mléčnou dráhu, díváš se na disk naší galaxie zvnitřku a z ' +
          'boku. Proto to není spirála, ale pás – jsme přímo v něm, a tak ho vidíme naplocho.',
          'Ta tmavá linie, která pás místy rozděluje, není díra. Je to prach v rovině galaxie, ' +
          'který pohltí světlo hvězd za sebou. Právě proto nevidíme střed galaxie v obyčejném ' +
          'světle – musíme se na něj dívat v infračerveném nebo rádiovém.',
          'Slunce oběhne střed galaxie jednou za přibližně 230 milionů let. Když bylo naposledy ' +
          'tam, kde je dnes, po Zemi ještě jen začínali chodit první dinosauři.'
        ],
        cta: 'Jak by vypadala zvenčí?'
      },
      { type: 'fact', factId: 'nasa-galaxia' },
      {
        type: 'compare',
        title: '🔄 ZVNITŘKU vs. ZVENČÍ',
        lead: 'Totéž místo, dva úplně odlišné pohledy.',
        eye: {
          icon: '👁️',
          label: 'JAK TO VIDÍME MY',
          art: 'milkyway',
          text: 'Jsme uvnitř disku, takže vidíme jen pás hvězd okolo nás. Je to jako stát v lese a ' +
                'snažit se vidět celý les.'
        },
        camera: {
          icon: '🛰️',
          label: 'JAK BY VYPADALA ZVENČÍ',
          image: 'm31',
          text: 'Takto vypadá naše sousedka Andromeda. Naše galaxie je jí velmi podobná – asi takto ' +
                'bychom viděli i sami sebe.'
        },
        check: {
          question: 'Proč nemáme skutečnou fotku celé Mléčné dráhy zvenčí?',
          options: [
            { label: 'Protože jsme uvnitř a nedokážeme z ní vyletět', correct: true,
              explain: 'Ano. I nejrychlejší sonda by letěla k okraji galaxie miliony let.' },
            { label: 'Protože je příliš tmavá na fotografování', correct: false,
              explain: 'Tmavá není – právě naopak. Problém je, že jsme uvnitř.' }
          ]
        },
        cta: 'Pojď se podívat dovnitř'
      },
      {
        type: 'cards',
        title: 'CO VŠECHNO NAŠE GALAXIE MÁ',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌀', name: 'Spirální ramena', short: 'Tady se rodí hvězdy.',
            text: 'V ramenech je nejvíc plynu a prachu – a tedy i nejvíc mlhovin a mladých hvězd. Slunce ' +
                  'je na okraji jednoho z nich.',
            image: 'm51', exampleLabel: 'Tady žijeme' },
          { icon: '🎯', name: 'Střed galaxie', short: 'Nejhustší místo.',
            text: 'Ve středu je obrovský hustý shluk hvězd a v něm černá díra. Na nebi je směrem do ' +
                  'souhvězdí Střelec.',
            image: 'sgra', exampleLabel: 'Souhvězdí Střelec' },
          { icon: '🔵', name: 'Halo', short: 'Koule okolo celé galaxie.',
            text: 'Okolo disku je obrovská koule, v níž obíhají staré kulové hvězdokupy – například M13.',
            image: 'm13', exampleLabel: 'Domov kulových hvězdokup' }
        ],
        cta: 'Rozumím!',
        xp: 15
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Když se díváš na pás Mléčné dráhy, díváš se na miliardy hvězd najednou – tak daleko, ' +
          'že se jejich světlo slilo do mléčné šmouhy.',
          'A ta tmavá místa v pásu nejsou díry. To jsou oblaky prachu, které nám zakrývají hvězdy ' +
          'za sebou.'
        ],
        footnote: 'Přesně z takových oblaků se rodí nové hvězdy – jako v první lekci.',
        cta: 'Chci to vidět naživo'
      },
      { type: 'fact', factId: 'mliecna-cesta-pas' },
      {
        type: 'mission',
        title: '📸 MISE: MLÉČNÁ DRÁHA',
        objectId: 'milkyway',
        tasks: [
          { icon: '🔭', text: 'Ve Stellariu si najdi, kudy dnes večer vede pás Mléčné dráhy.' },
          { icon: '🌑', text: 'Jděte na tmavé místo bez pouličních lamp.' },
          { icon: '📸', text: 'Zkus ji vyfotit – a najdi na fotce tmavé prachové oblaky.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Vyfotil jsi vlastní galaxii zvnitřku. To dokáže málokdo.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Jak se jmenuje naše galaxie?',
            options: [
              { label: 'Mléčná dráha', correct: true },
              { label: 'Andromeda' },
              { label: 'Sluneční soustava' },
              { label: 'Vír' }
            ],
            explain: 'Mléčná dráha. Andromeda je naše sousední galaxie.'
          },
          {
            kind: 'decide',
            question: 'Kde je v galaxii Slunce?',
            options: [
              { icon: '🏘️', label: 'Asi 26 000 světelných let od středu – na předměstí', correct: true },
              { icon: '🎯', label: 'Přesně ve středu galaxie' }
            ],
            explain: 'Ve středu je mnohem hustěji a je tam černá díra. My jsme pěkně v bezpečné vzdálenosti.'
          },
          {
            kind: 'truefalse',
            question: 'Tmavá místa v pásu Mléčné dráhy jsou místa, kde nejsou žádné hvězdy.',
            answer: false,
            explain: 'Nejsou to díry. Jsou to oblaky prachu, které zakrývají světlo hvězd za sebou.'
          },
          {
            kind: 'image',
            question: 'Který obrázek ukazuje, jak naše galaxie vypadá zvnitřku – tedy jak ji vidíme my?',
            options: [
              { image: 'milkyway', label: 'A', correct: true },
              { image: 'm31', label: 'B' }
            ],
            explain: 'A je náš pohled zvnitřku. B je Andromeda – tak by naše galaxie vypadala zvenčí.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejmenšího po největší.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Země', order: 1, icon: '🌍' },
              { label: 'Slunce', order: 2, icon: '☀️' },
              { label: 'Sluneční soustava', order: 3, icon: '🪐' },
              { label: 'Mléčná dráha', order: 4, icon: '🌌' }
            ],
            explain: 'Země obíhá Slunce, Slunce je součástí Sluneční soustavy a ta je maličká část galaxie.'
          }
        ],
        resultGood: '🌟 Víš, kde žiješ. A to je velká věc!',
        resultOk: '🔭 Ještě jednou – galaxie nikam neuteče.'
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
    teaser: 'Ostrovy hvězd. A jedna z nich k nám právě teď letí.',
    minutes: '7 minut',
    badge: 'galaxy-explorer',
    basics: [ 'galaxia', 'typy-galaxii', 'miestna-grupa', 'svetelny-rok',
              'magnituda', 'eq-rezim' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm51',
        question: '🔎 CO MYSLÍŠ, ŽE TO JE?',
        options: [
          { id: 'nebula',  icon: '☁️', label: 'mlhovina' },
          { id: 'galaxy',  icon: '🌀', label: 'galaxie' },
          { id: 'cluster', icon: '✨', label: 'hvězdokupa' },
          { id: 'planet',  icon: '🪐', label: 'planeta' }
        ],
        correct: 'galaxy',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Galaxie je obrovský ostrov hvězd – miliardy hvězd, plyn a prach držené pohromadě ' +
                     'gravitací.',
        retryText: 'Zkus to ještě jednou. Vidíš ta ramena, která se točí okolo středu? To je vodítko.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌀 OSTROVY HVĚZD',
        image: 'm31',
        lines: [
          'Galaxie není jedna hvězda ani jeden oblak. Je to celý ostrov hvězd.',
          'Naše Mléčná dráha jich má stovky miliard – a takových galaxií je ve vesmíru více než ' +
          'lidí na Zemi.',
          'Nejbližší velká galaxie se jmenuje Andromeda.'
        ],
        more: [
          'Galaxie nejsou ve vesmíru rozsypané náhodně. Drží se ve skupinách a kupách, ty se ' +
          'spojují do nadkup a ty tvoří vlákna, mezi nimiž jsou obrovské prázdné bubliny. Ve ' +
          'velkém měřítku vesmír vypadá skoro jako pěna nebo pavučina.',
          'Tvar galaxie prozradí její minulost: spirály mají ještě dost plynu a stále v nich ' +
          'vznikají nové hvězdy, kdežto eliptické galaxie plyn už spotřebovaly a jsou plné ' +
          'starých červených hvězd.',
          'Většina velkých galaxií včetně naší má v samém středu obrovskou černou díru. Není to ' +
          'náhoda – galaxie a její černá díra rostly společně.'
        ],
        cta: 'Jak se dá zjistit, která je která?'
      },
      { type: 'fact', factId: 'andromeda-25' },
      {
        type: 'cards',
        title: 'TŘI TVARY GALAXIÍ',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌀', name: 'Spirální', short: 'Ramena a disk.',
            text: 'Má disk se spirálními rameny, ve kterých se stále rodí nové hvězdy. Taková je naše ' +
                  'galaxie i Andromeda.',
            image: 'm51', exampleLabel: 'Příklad: M51, M31' },
          { icon: '🥚', name: 'Eliptická', short: 'Koule starých hvězd.',
            text: 'Nemá ramena ani disk – jen obrovská koule či ovál starých hvězd. Nové hvězdy se v ní ' +
                  'téměř nerodí.',
            image: 'omegacen', exampleLabel: 'Vypadá jako velká hvězdná koule' },
          { icon: '💫', name: 'Nepravidelná', short: 'Bez tvaru.',
            text: 'Rozházená galaxie bez pravidelného tvaru. Často proto, že do ní narazila jiná galaxie.',
            image: 'carina', exampleLabel: 'Často po srážce galaxií' }
        ],
        cta: 'Jdeme na úkol',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 NAJDI GALAXII',
        prompt: 'Který z těchto objektů je galaxie?',
        options: [
          { image: 'm13', correct: false, explain: 'To je kulová hvězdokupa – sto tisíc hvězd. Galaxie jich má miliardy.' },
          { image: 'm42', correct: false, explain: 'To je mlhovina v naší galaxii – oblak plynu, kde se rodí hvězdy.' },
          { image: 'm31', correct: true,  explain: 'Přesně! Andromeda – celá galaxie s miliardami hvězd, 2,5 milionu světelných let ' +
                                                   'daleko.' },
          { image: 'saturn', correct: false, explain: 'To je planeta Saturn. Ta je „za rohem“ – v naší Sluneční soustavě.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Andromeda se k nám přibližuje. Dlouho se říkalo, že za čtyři miliardy let se naše ' +
          'galaxie srazí.',
          'V roce 2025 ale nové výpočty ukázaly, že to není jisté – je to asi 50 na 50. Takhle ' +
          'věda funguje: když přijdou lepší měření, odpověď se opraví.'
        ],
        footnote: 'I kdyby se srazily, hvězdy do sebe nenarazí. Vesmír je tak prázdný, že galaxie projdou ' +
                  'jedna skrz druhou.',
        cta: 'To je fakt zajímavé'
      },
      { type: 'fact', factId: 'zrazka-neisto' },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'zorne-pole', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: ANDROMEDA',
        objectId: 'm31',
        tasks: [
          { icon: '🔭', text: 'Najdi M31 ve Stellariu (pomůže ti souhvězdí Kasiopeja – písmeno W).' },
          { icon: '👁️', text: 'Za tmy ji zkus najít i volným okem jako slabou šmouhu.' },
          { icon: '📸', text: 'Vyfotografuj ji Dwarfem v EQ režimu – potřebuje dlouho sbírat světlo.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Vyfotil jsi světlo, které letělo 2,5 milionu let. Gratuluji!',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Co je galaxie?',
            options: [
              { label: 'Obrovský ostrov miliard hvězd', correct: true },
              { label: 'Oblak plynu, kde se rodí hvězdy' },
              { label: 'Skupina asi tisíce hvězd' },
              { label: 'Velmi velká hvězda' }
            ],
            explain: 'Mlhovina = oblak. Hvězdokupa = tisíce hvězd. Galaxie = miliardy hvězd.'
          },
          {
            kind: 'truefalse',
            question: 'Galaxie v Andromedě je tak daleko, že ji volným okem vůbec není vidět.',
            answer: false,
            explain: 'Je 2,5 milionu světelných let daleko – a přesto ji za tmy volným okem vidíš jako ' +
                     'slabou šmouhu.'
          },
          {
            kind: 'image',
            question: 'Která z nich je spirální galaxie?',
            options: [
              { image: 'm51', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'A má ramena, která se točí okolo středu. B je kulová hvězdokupa.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejbližšího k nejvzdálenějšímu.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Měsíc', order: 1, icon: '🌙' },
              { label: 'M42 – Orionova mlhovina', order: 2, icon: '☁️' },
              { label: 'M31 – Andromeda', order: 3, icon: '🌀' },
              { label: 'M51 – galaxie Vír', order: 4, icon: '💫' }
            ],
            explain: 'Měsíc 384 400 km · M42 asi 1 300 sv. let · M31 2,5 milionu · M51 31 milionů sv. let.'
          },
          {
            kind: 'decide',
            question: 'Co se stane s hvězdami, když se dvě galaxie srazí?',
            options: [
              { icon: '🌌', label: 'Většinou projdou okolo sebe – vesmír je velmi prázdný', correct: true },
              { icon: '💥', label: 'Všechny hvězdy do sebe narazí a vybuchnou' }
            ],
            explain: 'Hvězdy jsou od sebe tak daleko, že srážka galaxií je spíš tanec než havárie. Tvary ' +
                     'galaxií se ale mění.'
          }
        ],
        resultGood: '🌟 Galaxie zvládnuté!',
        resultOk: '🔭 Ještě jednou – a budeš objevitel galaxií.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 6 – PLANETY A MĚSÍC
     ========================================================================== */
  {
    id: 'planets',
    icon: '🪐',
    title: 'PLANETY A MĚSÍC',
    teaser: 'Objekty, které uvidíš hned a jasně. Proč putují po nebi?',
    minutes: '7 minut',
    badge: 'planet-hunter',
    basics: [ 'planeta', 'plynny-obor', 'mesiac', 'terminator',
              'expozicia', 'seeing', 'astronomicka-jednotka' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'saturn',
        question: '🔎 CO JE TOHLE?',
        options: [
          { id: 'star',   icon: '⭐', label: 'hvězda' },
          { id: 'planet', icon: '🪐', label: 'planeta' },
          { id: 'nebula', icon: '☁️', label: 'mlhovina' },
          { id: 'galaxy', icon: '🌀', label: 'galaxie' }
        ],
        correct: 'planet',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Saturn – planeta s prstenci. Nesvítí sama, jen odráží světlo Slunce.',
        retryText: 'Zkus to ještě jednou. Vidíš ty prstence? Ty má ve Sluneční soustavě jedna velmi známá ' +
                   'planeta.',
        xp: 10
      },
      {
        type: 'info',
        title: '🪐 PLANETY PUTUJÍ',
        image: 'jupiter',
        lines: [
          'Hvězdy jsou na nebi vždy ve stejných obrazcích. Planety ne – ty se mezi nimi pomalu ' +
          'přesouvají.',
          'Právě proto dostaly své jméno: „planétes“ znamená v řečtině poutník.',
          'A ještě něco: hvězdy blikají, planety svítí pokojně.'
        ],
        more: [
          'Hvězdy blikají proto, že jsou tak daleko, že je vidíme jako jediný bod. Vzduch nad ' +
          'námi se vlní a ten jeden bod světla poskakuje. Planeta je na nebi malý kotouček, takže ' +
          'poskakování jejích okrajů se navzájem vyruší a světlo zůstane klidné.',
          'Planety najdeš vždy jen v úzkém pásku oblohy, kterému se říká ekliptika. Je to proto, ' +
          'že celá Sluneční soustava je plochá jako talíř – planety obíhají téměř v jedné rovině.',
          'Občas se planeta na nebi zdánlivě zastaví a chvíli jde dozadu. Nezpomalila – jen ji ' +
          'Země na své vnitřní oběžné dráze právě předjíždí, podobně jako auto v sousedním pruhu.'
        ],
        cta: 'Co se dá vidět?'
      },
      { type: 'fact', factId: 'saturn-prstence-tenke' },
      {
        type: 'cards',
        title: 'TŘI CÍLE PRO PRVNÍ VEČER',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌙', name: 'Měsíc', short: 'Nejlehčí cíl.',
            text: 'Uvidíš krátery i hory. Nejkrásnější jsou na hranici světla a tmy, kde vrhají dlouhé ' +
                  'stíny. Je 384 400 km daleko.',
            image: 'moon', exampleLabel: 'Nejlépe mimo úplněk' },
          { icon: '🪐', name: 'Saturn', short: 'Planeta s prstenci.',
            text: 'Malý, ale nezaměnitelný. Prstence jsou z miliard kousků ledu – a jsou tenké jako list ' +
                  'papíru.',
            image: 'saturn', exampleLabel: 'Prstence uvidíš i v Dwarfu' },
          { icon: '🟠', name: 'Jupiter', short: 'Největší planeta.',
            text: 'Vedle něj uvidíš čtyři tečky – jeho velké měsíce. Každý večer jsou jinde, protože ho ' +
                  'obíhají.',
            image: 'jupiter', exampleLabel: 'Sleduj měsíce dva večery' }
        ],
        cta: 'Jak je vyfotografovat?',
        xp: 15
      },
      {
        type: 'howto',
        title: '📸 JAK FOTIT JASNÉ OBJEKTY',
        lead: 'Planety a Měsíc jsou úplně jiná disciplína než mlhoviny. Tady je světla dost – problém ' +
              'je nepokojný vzduch.',
        steps: [
          { icon: '⚡', title: 'Krátké expozice',
            text: 'Měsíc a planety jsou jasné. Dlouhá expozice je jen přepálí do bílé skvrny.' },
          { icon: '🧩', title: 'Hodně krátkých snímků',
            text: 'Pořiď jich stovky a nechej Dwarf složit ty nejostřejší. Tak se „přebije“ chvění ' +
                  'vzduchu.' },
          { icon: '📐', title: 'Nefotografuj nízko nad obzorem',
            text: 'U země je vzduch nejvíc rozvířený. Čekej, dokud nebude objekt výš na obloze.' },
          { icon: '🧭', title: 'EQ režim tu není potřeba',
            text: 'Expozice jsou tak krátké, že se hvězdy nestihnou pootočit. Ušetříš si nastavování.' }
        ],
        note: 'Proto se planety fotí úplně jinak než mlhoviny – a proto jsou výborné na začátek ' +
              'večera.',
        cta: 'Rozumím, jdeme dál',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Krátery na Měsíci jsou díry po zásazích, které tam zůstanou i miliardy let.',
          'Není tam totiž skoro žádný vzduch – neprší tam, nefouká vítr ani netečou řeky, které ' +
          'by je zahladily.'
        ],
        footnote: 'Stopy astronautů z misí Apollo jsou tam proto stále.',
        cta: 'Jdeme fotit!'
      },
      { type: 'fact', factId: 'jupiter-galileo' },
      {
        type: 'mission',
        title: '📸 MISE: MĚSÍC',
        objectId: 'moon',
        tasks: [
          { icon: '🔭', text: 'Ve Stellariu zjisti, v jaké fázi je dnes Měsíc.' },
          { icon: '📸', text: 'Vyfotografuj ho Dwarfem s krátkou expozicí.' },
          { icon: '🔍', text: 'Najdi na fotce hranici světla a tmy – tam jsou krátery nejkrásnější.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Měsíc je ve sbírce. Pokud je právě na nebi Saturn nebo Jupiter, zkus i je.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč se planety na nebi přesouvají mezi hvězdami?',
            options: [
              { label: 'Protože obíhají okolo Slunce blízko nás', correct: true },
              { label: 'Protože jsou větší než hvězdy' },
              { label: 'Protože svítí vlastním světlem' },
              { label: 'Protože je tlačí sluneční vítr' }
            ],
            explain: 'Jsou blízko a obíhají Slunce, proto je vidíme z různých směrů. Hvězdy jsou tak daleko, ' +
                     'že se nám zdají stále na tomtéž místě.'
          },
          {
            kind: 'truefalse',
            question: 'Při fotografování Měsíce potřebuješ dlouhé expozice a EQ režim.',
            answer: false,
            explain: 'Přesně naopak. Měsíc je velmi jasný – potřebuje krátké expozice a EQ režim není ' +
                     'potřeba.'
          },
          {
            kind: 'image',
            question: 'Který z nich je Jupiter?',
            options: [
              { image: 'jupiter', label: 'A', correct: true },
              { image: 'saturn', label: 'B' }
            ],
            explain: 'A má pásy oblaků a Velkou červenou skvrnu. B je Saturn s prstenci.'
          },
          {
            kind: 'decide',
            question: 'Proč na Měsíci zůstávají krátery miliardy let?',
            options: [
              { icon: '🌬️', label: 'Není tam téměř žádný vzduch, neprší tam ani nefouká vítr', correct: true },
              { icon: '🪨', label: 'Protože je z velmi tvrdého kamene' }
            ],
            explain: 'Na Zemi krátery zahladí voda, vítr a rostliny. Na Měsíci nemá co.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejbližšího k Zemi po nejvzdálenější.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Měsíc', order: 1, icon: '🌙' },
              { label: 'Jupiter', order: 2, icon: '🟠' },
              { label: 'Saturn', order: 3, icon: '🪐' },
              { label: 'Orionova mlhovina', order: 4, icon: '☁️' }
            ],
            explain: 'Měsíc je „za dveřmi“, planety v naší soustavě a mlhovina až tisíce světelných let ' +
                     'daleko.'
          }
        ],
        resultGood: '🌟 Lovec planet je na světě!',
        resultOk: '🔭 Ještě jednou – planety nikam neutečou.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 7 – HVIEZDY A DVOJHVIEZDY
     ========================================================================== */
  {
    id: 'stars',
    icon: '⭐',
    title: 'HVĚZDY',
    teaser: 'Proč jsou některé modré a jiné červené? A co jsou dvojhvězdy?',
    minutes: '7 minut',
    badge: 'star-expert',
    basics: [ 'hviezda', 'farba-teplota', 'magnituda', 'dvojhviezda',
              'opticka-dvojica', 'biely-karlik' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'albireo',
        question: '🔎 PROČ MAJÍ TYTO DVĚ HVĚZDY JINOU BARVU?',
        options: [
          { id: 'temp',   icon: '🌡️', label: 'mají jinou teplotu' },
          { id: 'dist',   icon: '📏', label: 'jedna je blíž' },
          { id: 'camera', icon: '📷', label: 'je to chyba fotoaparátu' },
          { id: 'age',    icon: '🎂', label: 'jedna má jmeniny' }
        ],
        correct: 'temp',
        successTitle: '🎉 PŘESNĚ TAK!',
        successText: 'Barva hvězdy prozradí, jak je žhavá. Modrá je nejžhavější, červená nejchladnější.',
        retryText: 'Zkus to ještě jednou. Nápověda: i rozžhavené železo mění barvu podle toho, jak je ' +
                   'horké.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌈 BARVA = TEPLOTA',
        image: 'starBlue',
        lines: [
          'Hvězdy nejsou všechny bílé. Mají barvu podle toho, jak jsou žhavé.',
          'Modré jsou nejžhavější, žluté jako naše Slunce jsou střední, červené nejchladnější.',
          'Je to naopak, než jak to máme na kohoutcích s vodou.'
        ],
        more: [
          'Barva hvězdy mluví o teplotě, ne o velikosti ani o vzdálenosti. Všechno žhavé svítí – ' +
          'čím žhavější, tím modřejší. Rozžhavený drát ve staré žárovce je oranžový, plamen ' +
          'sporáku je modrý a s hvězdami je to přesně stejně.',
          'Modré hvězdy jsou nejžhavější, ale žijí nejkratší dobu – palivo spálí za pár milionů ' +
          'let. Malé červené hvězdy jsou úsporné a vydrží svítit i bilion let, tedy mnohonásobně ' +
          'delší dobu, než je dnes starý celý vesmír.',
          'Pozor na jednu past: červená hvězda může být malá a chladná, ale i obrovský starý obr, ' +
          'který se na konci života nafoukl a proto vychladl. Astronomové je rozliší podle toho, ' +
          'jak moc září.'
        ],
        cta: 'Ukaž mi je'
      },
      { type: 'fact', factId: 'farba-teplota' },
      {
        type: 'cards',
        title: 'TŘI BARVY, TŘI TEPLOTY',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🔵', name: 'Modrá', short: 'Nejžhavější.',
            text: 'Na povrchu má i desetitisíce stupňů. Takové hvězdy jsou obrovské, svítí zběsile – a ' +
                  'žijí krátce.',
            image: 'starBlue', exampleLabel: 'Například Rigel v Orionu' },
          { icon: '🟡', name: 'Žlutá', short: 'Jako naše Slunce.',
            text: 'Střední teplota, asi 5 500 °C na povrchu. Takové hvězdy žijí dlouho a pokojně – i ' +
                  'miliardy let.',
            image: 'starYellow', exampleLabel: 'Například Slunce' },
          { icon: '🔴', name: 'Červená', short: 'Nejchladnější.',
            text: 'Nejchladnější z hvězd. Jsou to buď malé úsporné hvězdičky, nebo staří nafouklí obři.',
            image: 'starRed', exampleLabel: 'Například Betelgeuse' }
        ],
        cta: 'A co dvojhvězdy?',
        xp: 15
      },
      {
        type: 'compare',
        title: '👯 JEDNA HVĚZDA, NEBO DVĚ?',
        lead: 'Některé hvězdy se při přiblížení rozdělí na dvě. Říká se jim dvojhvězdy.',
        eye: {
          icon: '👁️',
          label: 'VOLNÝM OKEM',
          art: 'polaris',
          text: 'Vidíš jednu hvězdu. I Polárka vypadá jako jedna – a přitom jsou to tři hvězdy.'
        },
        camera: {
          icon: '🔭',
          label: 'V DALEKOHLEDU',
          image: 'albireo',
          text: 'Albireo v Labuti se rozdělí na dvě hvězdy – jednu modrou a jednu žlutou. Je to jeden z ' +
                'nejkrásnějších pohledů na obloze.'
        },
        check: {
          question: 'Jsou všechny dvojice hvězd opravdu spolu?',
          options: [
            { label: 'Ne – některé jen leží ve stejném směru', correct: true,
              explain: 'Ano. Skutečné dvojhvězdy se obíhají, ale „optické dvojice“ jsou jen náhodně ve stejném ' +
                       'směru a ve skutečnosti jsou od sebe velmi daleko.' },
            { label: 'Ano, každá dvojice se vždy obíhá', correct: false,
              explain: 'To ne. Astronomové rozlišují skutečné dvojhvězdy a optické dvojice, které tak jen ' +
                       'vypadají.' }
          ]
        },
        cta: 'Chci vědět víc'
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Naše Slunce je úplně obyčejná hvězda. Nic výjimečného – jen strašně blízko.',
          'Kdybys se na ně podíval z jiné hvězdy, byla by to jen další malá žlutá tečka mezi ' +
          'tisíci.'
        ],
        footnote: 'A většina hvězd na nebi není sama – mají společníka, přesně jako Albireo.',
        cta: 'Jdeme si vybrat cíl'
      },
      { type: 'fact', factId: 'albireo-modra-zlta' },
      { type: 'fact', factId: 'polarka-nebude-vzdy' },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'farba-teplota', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: ALBIREO',
        objectId: 'albireo',
        tasks: [
          { icon: '🔭', text: 'Najdi Albireo ve Stellariu – je to hlava Labutě.' },
          { icon: '📸', text: 'Vyfotografuj ji Dwarfem krátkou expozicí.' },
          { icon: '🌈', text: 'Najdi na fotce tu modrou a tu žlutou hvězdu.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Máš dvojhvězdu ve sbírce – a s ní i dvě barvy, tedy dvě teploty.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'image',
            question: 'Která z těchto hvězd je nejžhavější?',
            options: [
              { image: 'starBlue', label: 'A', correct: true },
              { image: 'starYellow', label: 'B' },
              { image: 'starRed', label: 'C' }
            ],
            explain: 'Modrá je nejžhavější, žlutá střední, červená nejchladnější.'
          },
          {
            kind: 'choice',
            question: 'Jakou barvu má naše Slunce mezi hvězdami?',
            options: [
              { label: 'Žlutou – je to středně žhavá hvězda', correct: true },
              { label: 'Modrou – je nejžhavější ze všech' },
              { label: 'Červenou – je už staré' },
              { label: 'Nemá barvu, je průhledné' }
            ],
            explain: 'Slunce je středně žhavá žlutá hvězda. Nic výjimečného – jen blízko.'
          },
          {
            kind: 'truefalse',
            question: 'Každá dvojice hvězd, kterou vidíme blízko sebe, se opravdu navzájem obíhá.',
            answer: false,
            explain: 'Ne. Skutečné dvojhvězdy se obíhají, ale optické dvojice jen leží ve stejném směru.'
          },
          {
            kind: 'order',
            question: 'Seřaď hvězdy od nejchladnější po nejžhavější.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Červená', order: 1, icon: '🔴' },
              { label: 'Žlutá (jako Slunce)', order: 2, icon: '🟡' },
              { label: 'Bílá', order: 3, icon: '⚪' },
              { label: 'Modrá', order: 4, icon: '🔵' }
            ],
            explain: 'Červená → žlutá → bílá → modrá. Modrá je nejžhavější.'
          },
          {
            kind: 'decide',
            question: 'Proč hvězdy blikají, ale planety skoro ne?',
            options: [
              { icon: '🌬️', label: 'Hvězdy jsou jen bod světla, který vzduch snadno rozhýbe', correct: true },
              { icon: '🔋', label: 'Hvězdy mají vypínač a střídavě zhasínají' }
            ],
            explain: 'Blikání dělá náš nepokojný vzduch. Planeta je na nebi malý disk, ne bod – proto se ' +
                     'její blikání „vyrovná“.'
          }
        ],
        resultGood: '🌟 Znalec hvězd!',
        resultOk: '🔭 Ještě jednou – barvy se naučíš hned.'
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
    teaser: 'Když velké hvězdě skončí palivo, stane se něco obrovského.',
    minutes: '7 minut',
    badge: 'supernova-witness',
    basics: [ 'supernova', 'neutronova-hviezda', 'pulzar', 'typy-hmlovin',
              'gravitacia', 'svetelny-rok' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm1',
        question: '🔎 CO MYSLÍŠ, CO TO JE?',
        options: [
          { id: 'boom',    icon: '💥', label: 'zbytek po výbuchu hvězdy' },
          { id: 'birth',   icon: '👶', label: 'místo, kde se právě rodí hvězda' },
          { id: 'galaxy',  icon: '🌀', label: 'galaxie' },
          { id: 'cluster', icon: '✨', label: 'hvězdokupa' }
        ],
        correct: 'boom',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Krabí mlhovina je zbytek hvězdy, která vybuchla. Ten výbuch se jmenuje supernova.',
        retryText: 'Zkus to ještě jednou. Všimni si těch vláken, která letí od středu do všech stran – ' +
                   'jako po explozi.',
        xp: 10
      },
      {
        type: 'info',
        title: '💥 KDYŽ HVĚZDĚ SKONČÍ PALIVO',
        image: 'm1',
        lines: [
          'Velká hvězda svítí tak, že v sobě spaluje palivo. Jednou jí ale skončí.',
          'Tehdy se její střed zřítí a hvězda vybuchne – na několik týdnů svítí jako miliardy ' +
          'Sluncí.',
          'Do vesmíru přitom rozfouká všechno, co v sobě vyrobila.'
        ],
        more: [
          'Hvězda svítí, protože v jejím středu se vodík mění na helium a přitom se uvolňuje ' +
          'energie. Ta tlačí zvnitřku ven a drží hvězdu nafouklou proti její vlastní gravitaci. ' +
          'Když palivo skončí, tlak zmizí a střed se během sekund zřítí.',
          'Při výbuchu vzniknou a rozletí se do vesmíru látky, které by jinak nikdy nevznikly – ' +
          'například velká část železa. Smíchají se s mlhovinami a stanou se součástí nových ' +
          'hvězd a planet. Železo v tvé krvi je z takového výbuchu. Ty nejtěžší kovy jako zlato ' +
          'vznikají ještě extrémněji – hlavně při srážkách neutronových hvězd.',
          'Ze středu hvězdy zůstane buď neutronová hvězda – kule velká jako město, ale takové ' +
          'hustoty, že by jedna lžička vážila miliony tun – nebo černá díra.'
        ],
        cta: 'A co zůstane potom?'
      },
      { type: 'fact', factId: 'krab-1054' },
      {
        type: 'cards',
        title: 'CO ZŮSTANE PO VÝBUCHU',
        subtitle: 'Otoč obě karty.',
        cards: [
          { icon: '💥', name: 'Mlhovina z vláken', short: 'Rozfoukané zbytky hvězdy.',
            text: 'Plyn letí od středu ven rychlostí tisíců kilometrů za sekundu a svítí. Přesně to ' +
                  'vidíme jako Krabí mlhovinu.',
            image: 'm1', exampleLabel: 'Příklad: M1 Krabí mlhovina' },
          { icon: '💫', name: 'Neutronová hvězda', short: 'Střed, který se zřítil.',
            text: 'Ze středu zůstane malá kule velká jako město, ale těžká jako celé Slunce. Otáčí se tak ' +
                  'rychle, že bliká jako maják.',
            image: 'neutron', exampleLabel: 'Bliká 30krát za sekundu' }
        ],
        cta: 'Jdeme na úkol',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 UHÁDNI SPRÁVNOU MLHOVINU',
        prompt: 'Která z nich vznikla výbuchem hvězdy?',
        options: [
          { image: 'm42', correct: false, explain: 'Tohle je Orionova mlhovina – tam se hvězdy právě rodí. Přesně naopak.' },
          { image: 'm1',  correct: true,  explain: 'Ano! Krabí mlhovina – zbytek supernovy z roku 1054. Vlákna stále letí od středu.' },
          { image: 'ring', correct: false, explain: 'Chyták! Prstencová mlhovina je také od umírající hvězdy, ale ta nevybuchla – jen ' +
                                                    'pokojně odhodila své vrstvy.' },
          { image: 'm78', correct: false, explain: 'Tohle je reflexní mlhovina – prach, který odráží světlo hvězdy.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Železo v tvé krvi, kyslík, který dýcháš, i zlato v prstenech – to všechno vzniklo při ' +
          'smrti hvězd.',
          'Jsme doslova zbytky dávných hvězd, které vybuchly ještě před vznikem Slunce.'
        ],
        footnote: 'Proto se říká, že jsme z hvězdného prachu. Není to poezie – je to chemie.',
        cta: 'Jdeme si to vyfotografovat'
      },
      { type: 'fact', factId: 'pulzar-30x' },
      {
        type: 'mission',
        title: '📸 MISE: KRABÍ MLHOVINA',
        objectId: 'm1',
        tasks: [
          { icon: '🔭', text: 'Najdi M1 ve Stellariu – je v Býku, blízko hvězdy Aldebaran.' },
          { icon: '⚙️', text: 'Zapni EQ režim. M1 je slabá, je potřeba dlouho sbírat světlo.' },
          { icon: '📸', text: 'Vyfotografuj ji a zkus najít vlákna.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Máš ve sbírce pozůstatek výbuchu, který lidé viděli v roce 1054.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Co je supernova?',
            options: [
              { label: 'Výbuch velké hvězdy na konci jejího života', correct: true },
              { label: 'Velmi nová hvězda, která se právě zrodila' },
              { label: 'Jiný název pro galaxii' },
              { label: 'Planeta, která se rozpadla' }
            ],
            explain: 'Navzdory jménu není „nová“. Je to výbuch na konci života velké hvězdy.'
          },
          {
            kind: 'truefalse',
            question: 'Supernovu z roku 1054 viděli lidé na vlastní oči.',
            answer: true,
            explain: 'Čínští astronomové si zapsali „hostující hvězdu“, kterou bylo téměř měsíc vidět i přes ' +
                     'den.'
          },
          {
            kind: 'image',
            question: 'Která mlhovina je pozůstatkem supernovy?',
            options: [
              { image: 'm1', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'A je Krabí mlhovina – zbytek výbuchu. B je Orionova mlhovina, kde se hvězdy rodí.'
          },
          {
            kind: 'order',
            question: 'Seřaď život velké hvězdy od začátku do konce.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Oblak plynu a prachu', order: 1, icon: '☁️' },
              { label: 'Velká žhavá hvězda', order: 2, icon: '🔵' },
              { label: 'Skončí jí palivo', order: 3, icon: '⏳' },
              { label: 'Vybuchne jako supernova', order: 4, icon: '💥' },
              { label: 'Zůstane neutronová hvězda', order: 5, icon: '💫' }
            ],
            explain: 'A z rozfoukaného plynu se později mohou narodit nové hvězdy. Koloběh pokračuje.'
          },
          {
            kind: 'decide',
            question: 'Odkud je železo v tvé krvi?',
            options: [
              { icon: '💥', label: 'Vzniklo při smrti dávných hvězd', correct: true },
              { icon: '🏭', label: 'Vzniklo na Zemi v jejím jádru' }
            ],
            explain: 'Těžké prvky se vyrobily ve hvězdách a při jejich výbuchech. Země je už jen podědila.'
          }
        ],
        resultGood: '🌟 Svědek supernovy!',
        resultOk: '🔭 Ještě jednou – ta 1054 se pamatuje snadno.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 9 – ČERNÉ DÍRY
     ========================================================================== */
  {
    id: 'blackholes',
    icon: '⚫',
    title: 'ČERNÉ DÍRY',
    teaser: 'Místo, odkud neuteče ani světlo. A jedna je i u nás doma.',
    minutes: '8 minut',
    badge: 'darkness-scout',
    basics: [ 'cierna-diera', 'horizont-udalosti', 'supermasivna', 'gravitacia',
              'svetelny-rok', 'suhvezdie' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'sgra',
        question: '🔎 CO JE NA TÉHLE SLAVNÉ FOTCE?',
        options: [
          { id: 'bh',     icon: '⚫', label: 'černá díra' },
          { id: 'planet', icon: '🪐', label: 'planeta s prstencem' },
          { id: 'nebula', icon: '☁️', label: 'mlhovina' },
          { id: 'star',   icon: '⭐', label: 'hvězda zblízka' }
        ],
        correct: 'bh',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Je to Sagittarius A* – černá díra ve středu naší galaxie. Ta tma ve středu je ona.',
        retryText: 'Zkus to ještě jednou. To světlo je horký plyn, který se točí okolo něčeho, co je úplně ' +
                   'černé.',
        xp: 10
      },
      {
        type: 'info',
        title: '⚫ ODKUD NEUTEČE ANI SVĚTLO',
        image: 'sgra',
        lines: [
          'Černá díra je místo, kde je hmota natlačená do tak malého bodu, že její gravitace je ' +
          'obrovská.',
          'Nic, co se dostane příliš blízko, už neunikne – ani světlo.',
          'Proto ji nevidíme přímo. Vidíme jen žhnoucí plyn, který se okolo ní točí.'
        ],
        more: [
          'Černá díra není díra ani vysavač. Je to obyčejná hmota, jen natlačená do neuvěřitelně ' +
          'malého místa. Kdybys Slunce stlačil do kule s průměrem šest kilometrů, stala by se z ' +
          'něj černá díra – a planety by okolo něj obíhaly přesně tak jako dnes.',
          'Hranice, za kterou už nic neunikne, se nazývá horizont událostí. Není to žádný povrch ' +
          '– je to jen místo, odkud by i světlo muselo letět rychleji než světlo, aby se dostalo ' +
          'ven.',
          'První fotografii černé díry zveřejnili astronomové v roce 2019. Není na ní vidět díra ' +
          'samotná, ale její temný stín v žhnoucím plynu okolo – a přesně to teorie předpověděla.'
        ],
        cta: 'Odkud se berou?'
      },
      { type: 'fact', factId: 'sgra-4mil' },
      {
        type: 'cards',
        title: 'DVA DRUHY ČERNÝCH DĚR',
        subtitle: 'Otoč obě karty.',
        cards: [
          { icon: '💥', name: 'Z velké hvězdy', short: 'Zůstane po supernově.',
            text: 'Když je hvězda opravdu velká, její střed se po výbuchu zhroutí až na černou díru. Váží ' +
                  'několikanásobek Slunce.',
            image: 'm1', exampleLabel: 'Vzniká po výbuchu hvězdy' },
          { icon: '🌌', name: 'Supermasivní', short: 'Ve středu galaxií.',
            text: 'Sedí ve středu skoro každé velké galaxie a váží miliony až miliardy Sluncí. Ta naše se ' +
                  'jmenuje Sagittarius A*.',
            image: 'sgra', exampleLabel: 'Sagittarius A* – 4 miliony Sluncí' }
        ],
        cta: 'Ale jak se to dá vyfotit?',
        xp: 15
      },
      {
        type: 'howto',
        title: '📸 JAK VYFOTIT NĚCO, CO NESVÍTÍ',
        lead: 'Tohle je jeden z největších triků v historii astronomie.',
        steps: [
          { icon: '🌍', title: 'Spojili osm observatoří',
            text: 'Rádiové dalekohledy po celé planetě pozorovaly naráz to samé místo – a společně ' +
                  'fungovaly jako jeden dalekohled velký jako Země.' },
          { icon: '⏱️', title: 'Pozorovaly mnoho hodin v kuse',
            text: 'Přesně jako při dlouhé expozici v Dwarfu. Čím delší, tím více signálu.' },
          { icon: '💻', title: 'Počítače daly data dohromady',
            text: 'Z hor dat počítače poskládaly obraz. Plyn okolo díry se hýbe tak rychle, že museli ' +
                  'spočítat průměr z mnoha obrázků.' },
          { icon: '🎉', title: '12. května 2022',
            text: 'Astronomové ukázali světu první fotku černé díry ve středu naší galaxie.' }
        ],
        note: 'Stejný princip jako tvoje skládání snímků – jen v obrovském měřítku.',
        cta: 'To je super',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Ta černá díra je 27 000 světelných let daleko a váží jako čtyři miliony Sluncí – a ' +
          'celou dobu tam byla potichu.',
          'Světlo z jejího okolí k nám letělo 27 000 let. Když vyrazilo, lidé na Zemi kreslili do ' +
          'jeskyní.'
        ],
        footnote: 'Nemusíš se bát: jsme od ní tak daleko, že nás nijak neohrožuje.',
        cta: 'Jdeme na misi'
      },
      { type: 'fact', factId: 'eht-zemsky-dalekohlad' },
      {
        type: 'mission',
        title: '📸 MISE: SMĚR STŘED GALAXIE',
        objectId: 'sgra',
        tasks: [
          { icon: '🔭', text: 'Ve Stellariu napiš „Sgr A*“ a najdi ho v souhvězdí Střelec.' },
          { icon: '🌌', text: 'Zjisti, kdy je Střelec nad obzorem – nejlépe v létě a v první polovině podzimu.' },
          { icon: '📸', text: 'Vyfotografuj tu oblast Dwarfem. Samotnou díru neuvidíš, ale fotíš směr do středu naší ' +
                             'galaxie.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Máš ve sbírce střed vlastní galaxie. Málokdo ví, kde ho na nebi hledat.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč se černá díra nazývá černá?',
            options: [
              { label: 'Protože z ní neunikne ani světlo', correct: true },
              { label: 'Protože je vyrobená z černého prachu' },
              { label: 'Protože je vidět jen v noci' },
              { label: 'Protože je zabarvená na fotkách' }
            ],
            explain: 'Její gravitace je tak silná, že z ní neuteče ani světlo. Proto je na fotce temná.'
          },
          {
            kind: 'truefalse',
            question: 'Ve středu naší galaxie je supermasivní černá díra.',
            answer: true,
            explain: 'Jmenuje se Sagittarius A*, váží jako čtyři miliony Sluncí a je 27 000 světelných let ' +
                     'daleko.'
          },
          {
            kind: 'decide',
            question: 'Jak astronomové vyfotili černou díru, když nesvítí?',
            options: [
              { icon: '🌍', label: 'Spojili observatoře po celé Zemi a zachytili světlo plynu okolo ní', correct: true },
              { icon: '🚀', label: 'Poslali k ní sondu s fotoaparátem' }
            ],
            explain: 'Sonda by tam letěla stovky milionů let. Použili „dalekohled velký jako Země“.'
          },
          {
            kind: 'image',
            question: 'Který obrázek je fotka černé díry?',
            options: [
              { image: 'sgra', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'A je Sagittarius A*. B je planetární mlhovina – také prstenec, ale úplně jiný objekt.'
          },
          {
            kind: 'order',
            question: 'Seřaď podle hmotnosti od nejmenší po největší.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Země', order: 1, icon: '🌍' },
              { label: 'Slunce', order: 2, icon: '☀️' },
              { label: 'Neutronová hvězda', order: 3, icon: '💫' },
              { label: 'Sagittarius A*', order: 4, icon: '⚫' }
            ],
            explain: 'Neutronová hvězda váží více než Slunce, ale Sagittarius A* váží jako čtyři miliony ' +
                     'Sluncí.'
          }
        ],
        resultGood: '🌟 Průzkumník temnoty!',
        resultOk: '🔭 Ještě jednou – tohle je nejtvrdší lekce.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 10 – DWARF NAOSTRO (praktická)
     ========================================================================== */
  {
    id: 'dwarf-practice',
    icon: '🔭',
    title: 'DWARF NAOSTRO',
    teaser: 'Co v Dwarfu nastavit, na co si dát pozor a co od něj čekat.',
    minutes: '8 minut',
    badge: 'dwarf-operator',
    basics: [ 'expozicia', 'gain', 'snimka', 'skladanie',
              'sum', 'ostrenie', 'darkframe', 'kalibracia',
              'zorne-pole', 'vyska-nad-obzorom' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm27',
        question: '🔎 FOTKA MLHOVINY JE TÉMĚŘ ČERNÁ. CO UDĚLÁŠ?',
        options: [
          { id: 'more',  icon: '⏱️', label: 'Prodloužím expozici a přidám snímky' },
          { id: 'zoom',  icon: '🔍', label: 'Zvětším přiblížení' },
          { id: 'clean', icon: '🧽', label: 'Utřu objektiv' },
          { id: 'close', icon: '🚗', label: 'Půjdu k ní blíž' }
        ],
        correct: 'more',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Slabé objekty potřebují čas. Delší expozice a více snímků – nic jiného nepomůže.',
        retryText: 'Zkus to ještě jednou. Mlhovina není malá, je slabá. Co je tedy třeba přidat?',
        xp: 10
      },
      {
        type: 'info',
        title: '🔭 DWARF MÁ TŘI REŽIMY',
        image: 'm44',
        lines: [
          'Ne každý objekt se fotí stejně – proto má Dwarf tři režimy.',
          'Když zvolíš správný, aplikace za tebe nastaví většinu věcí.',
          'Zbytek si nastavíš sám a právě v tom je rozdíl mezi bledou a krásnou fotkou.'
        ],
        more: [
          'Důležité je pochopit rozdíl mezi expozicí a gainem. Expozice je čas, po který senzor ' +
          'opravdu sbírá světlo – delší expozice znamená více skutečného světla. Gain je jen ' +
          'zesílení toho, co už senzor nasbíral, podobně jako když zesílíš potichu nahranou ' +
          'písničku: bude hlasitější, ale i víc zašuměná.',
          'Proto se vždy nejprve snažíme prodloužit expozici a zvýšit počet snímků, a gain ' +
          'zvyšujeme až tehdy, když to jinak nejde.',
          'A ještě jedna věc, kterou začátečníci podceňují: zaostření. I ta nejlépe nastavená ' +
          'expozice je zbytečná, pokud jsou hvězdy rozmazané. Zaostřuj vždy na jasnou hvězdu a ' +
          'hledej bod, kde je nejmenší a nejostřejší.'
        ],
        cta: 'Které to jsou?'
      },
      {
        type: 'cards',
        title: 'KDY KTERÝ REŽIM',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌄', name: 'General', short: 'Denní focení.',
            text: 'Na krajinu, oblaka, zvířata. Máš na výběr širokoúhlý nebo dalekohledový objektiv, ' +
                  'foto, video i časosběr.',
            image: 'citysky', exampleLabel: 'Přes den a na krajinu' },
          { icon: '🌌', name: 'Deep Sky', short: 'Mlhoviny, galaxie, hvězdokupy.',
            text: 'Tady Dwarf skládá stovky snímků na sebe. Právě v tomto režimu je třeba nastavit ' +
                  'expozici, gain a počet snímků.',
            image: 'm42', exampleLabel: 'Slabé objekty daleko v galaxii' },
          { icon: '🌙', name: 'Solar System', short: 'Slunce, Měsíc, planety.',
            text: 'Pro jasné objekty blízko nás. Dwarf sám zvolí velmi krátké expozice – a Slunce se smí ' +
                  'fotit jen s přiloženým filtrem.',
            image: 'moonphase', exampleLabel: 'Jasné objekty v naší soustavě' }
        ],
        cta: 'Jak nastavit Deep Sky?',
        xp: 15
      },
      { type: 'fact', factId: 'dwarf-15s' },
      {
        type: 'howto',
        title: '⚙️ NASTAVENÍ PRO MLHOVINY A GALAXIE',
        lead: 'Čtyři čísla, která rozhodují o tom, jak bude fotka vypadat.',
        steps: [
          { icon: '⏱️', title: 'Expozice 15 – 60 sekund',
            text: 'Kolik světla nasbírá jeden snímek. Automatika nedá víc než 15 s, proto přepni na ' +
                  'ruční. V EQ režimu zvládne i 90 s.' },
          { icon: '🎚️', title: 'Gain 60 – 80',
            text: 'Zesílení signálu. Málo gainu = tmavá fotka, mnoho gainu = šum. U dalekohledového ' +
                  'objektivu se nedá jít pod 40.' },
          { icon: '🧩', title: '200 – 400 snímků',
            text: 'Čím více snímků Dwarf poskládá, tím čistější fotka. Sto snímků je minimum, čtyři sta ' +
                  'je paráda.' },
          { icon: '⬛', title: 'Dark framy',
            text: 'Snímky se zakrytým objektivem, kterými se odečte šum senzoru. Musí mít stejnou ' +
                  'expozici, gain i podobnou teplotu (do ±8 °C).' }
        ],
        note: 'Pravidlo pro zapamatování: dlouhá expozice dá jasnost, mnoho snímků dá čistotu.',
        cta: 'Rozumím, jdeme dál',
        xp: 20
      },
      { type: 'fact', factId: 'dwarf-fov' },
      {
        type: 'pick',
        title: '🔎 VEJDE SE TO DO ZÁBĚRU?',
        prompt: 'Dwarf zabere 2,45°. Který z těchto objektů se mu do záběru celý nevejde?',
        options: [
          { image: 'm44', correct: false, explain: 'Jesličky se vejdou krásně – to je pro Dwarf ideální cíl.' },
          { image: 'm31', correct: true,  explain: 'Přesně! Andromeda je na nebi širší než 2,45°. Vyfotíš její střed, ale celá se nevejde ' +
                                                   '– a to je úplně v pořádku.' },
          { image: 'ring', correct: false, explain: 'Prstencová mlhovina je malinká. Ta je spíš na hranici toho, co Dwarf rozliší.' },
          { image: 'm27', correct: false, explain: 'Činka je malá a pohodlně se vejde.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Objektiv Dwarfu je široký jen 30 milimetrů – menší než dva a půl centimetru.',
          'A přesto s ním vyfotíš galaxii 31 milionů světelných let daleko. Není to o velikosti, ' +
          'je to o čase.'
        ],
        footnote: 'Právě proto se astrofotografie dá dělat i z balkonu.',
        cta: 'Jdeme si to vyzkoušet'
      },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'fotolab', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: AUTOMATIKA vs. RUČNĚ',
        objectId: 'm44',
        tasks: [
          { icon: '🔭', text: 'Najdi M44 (Jesličky) ve Stellariu a ověř, že je výš než 30° nad obzorem.' },
          { icon: '🤖', text: 'Vyfotografuj ji na automatiku – nech Dwarf, aby si všechno nastavil sám.' },
          { icon: '🎚️', text: 'Potom to samé ručně: expozice 30 s, gain 70, 200 snímků.' },
          { icon: '🔍', text: 'Fotky si polož vedle sebe a najdi rozdíl.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Jesličky jsou ve sbírce – a ty už víš, co ta čísla v aplikaci opravdu dělají.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Jakou nejdelší expozici ti Dwarf nastaví sám v automatice?',
            options: [
              { label: '15 sekund', correct: true },
              { label: '60 sekund' },
              { label: '90 sekund' },
              { label: '5 minut' }
            ],
            explain: 'Automatika končí na 15 sekundách. Více dostaneš jen ručně – a v EQ režimu až 90 ' +
                     'sekund.'
          },
          {
            kind: 'decide',
            question: 'Objekt je jen 10 stupňů nad obzorem. Co uděláš?',
            options: [
              { icon: '⏳', label: 'Počkám, až vystoupá výš než 30°', correct: true },
              { icon: '📸', label: 'Fotím hned, aspoň něco z toho bude' }
            ],
            explain: 'Nízko nad obzorem se díváš přes nejvíc rozvířený vzduch. Trpělivost tu udělá víc než ' +
                     'jakékoli nastavení.'
          },
          {
            kind: 'truefalse',
            question: 'Dark framy se fotí se zakrytým objektivem a musí mít stejná nastavení jako normální ' +
                      'snímky.',
            answer: true,
            explain: 'Přesně tak – stejná expozice, stejný gain a podobná teplota. Jinak šum neodečtou ' +
                     'správně.'
          },
          {
            kind: 'image',
            question: 'Který objekt se Dwarfu do záběru celý nevejde?',
            options: [
              { image: 'm31', label: 'A', correct: true },
              { image: 'm44', label: 'B' }
            ],
            explain: 'Andromeda je na nebi širší než výsek 2,45°, který Dwarf zabere.'
          },
          {
            kind: 'order',
            question: 'Seřaď postup při fotografování mlhoviny.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Postavit stativ a zapnout Dwarf', order: 1, icon: '📐' },
              { label: 'Nechat provést kalibraci', order: 2, icon: '🧭' },
              { label: 'Vybrat objekt vysoko na obloze', order: 3, icon: '🎯' },
              { label: 'Nastavit expozici, gain a počet snímků', order: 4, icon: '🎚️' },
              { label: 'Spustit sérii a nechat sbírat světlo', order: 5, icon: '⏱️' }
            ],
            explain: 'Bez kalibrace Dwarf neví, kam se dívá – proto jde hned po zapnutí.'
          }
        ],
        resultGood: '🌟 Operátor Dwarfu!',
        resultOk: '🔭 Ještě jednou – ta čtyři čísla se naučíš hned.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 11 – SLNKO
     ========================================================================== */
  {
    id: 'sun',
    icon: '☀️',
    title: 'SLUNCE',
    teaser: 'Jedinou hvězdu, kterou vidíš i přes den. Ale pozor na oči!',
    minutes: '7 minut',
    badge: 'sun-watcher',
    basics: [ 'hviezda', 'slnecne-skvrny', 'slnecny-cyklus', 'nd-filter',
              'senzor', 'svetelna-minuta', 'expozicia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'sun',
        question: '🔎 CO JE SLUNCE?',
        options: [
          { id: 'star',   icon: '⭐', label: 'obyčejná hvězda, jen velmi blízko' },
          { id: 'planet', icon: '🪐', label: 'velmi horká planeta' },
          { id: 'fire',   icon: '🔥', label: 'obrovský ohnivý balon' },
          { id: 'hole',   icon: '🕳️', label: 'díra do vesmíru' }
        ],
        correct: 'star',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Slunce je úplně obyčejná žlutá hvězda. Zdá se nám jiné jen proto, že je 270tisíckrát ' +
                     'blíž než kterákoli jiná.',
        retryText: 'Zkus to ještě jednou. V lekci o hvězdách jsme se učili, že Slunce je středně horká ' +
                   'žlutá… co?',
        xp: 10
      },
      {
        type: 'info',
        title: '☀️ NAŠE VLASTNÍ HVĚZDA',
        image: 'sun',
        lines: [
          'Slunce je asi 100krát širší než Země.',
          'Na povrchu má okolo 5 500 stupňů Celsia.',
          'A je od nás 150 milionů kilometrů – což je 8 světelných minut.'
        ],
        more: [
          'Slunce nesvítí tím, že by hořelo jako ohníček. V jeho středu je takový tlak a teplota ' +
          '(asi 15 milionů stupňů), že se jádra vodíku spojují na helium – a při každém takovém ' +
          'spojení se uvolní trocha energie. Tomu se říká jaderná fúze.',
          'Energie ze středu se na povrch prodírá stovky tisíc let. Světlo, které dnes vidíš, se ' +
          'začalo vyrábět ještě v době, kdy na Zemi nebyl nikdo, kdo by se na něj mohl dívat.',
          'Slunce svítí asi 4,6 miliardy let a paliva má ještě přibližně na stejně dlouho. Není ' +
          'proto ani mladá, ani stará hvězda – je přesně v polovině života.'
        ],
        cta: 'Co jsou ty tmavé skvrny?'
      },
      { type: 'fact', factId: 'slnko-8-minut' },
      {
        type: 'cards',
        title: 'CO SE DÁ NA SLUNCI VIDĚT',
        subtitle: 'Otoč obě karty.',
        cards: [
          { icon: '🟤', name: 'Sluneční skvrny', short: 'Chladnější místa.',
            text: 'Jsou „jen“ okolo 3 500 °C, a proto se nám na jasném povrchu zdají tmavé. Největší jsou ' +
                  'širší než celá Země.',
            image: 'sun', exampleLabel: 'Mění se ze dne na den' },
          { icon: '🔄', name: 'Sluneční cyklus', short: 'Asi 11 let.',
            text: 'Počet skvrn stoupá a klesá v cyklu asi 11 let. Když je skvrn mnoho, bývá víc polárních ' +
                  'září.',
            image: 'starYellow', exampleLabel: 'Slunce se „nadechuje“ 11 let' }
        ],
        cta: 'Jak ho fotit bezpečně?',
        xp: 15
      },
      {
        type: 'howto',
        title: '🛡️ BEZPEČNÉ FOCENÍ SLUNCE',
        lead: 'Tohle je jediná lekce, kde na pořadí opravdu záleží. Slunce dokáže zničit senzor i ' +
              'oči.',
        steps: [
          { icon: '🥇', title: 'Nejprve filtr, potom všechno ostatní',
            text: 'Na Dwarf nasaď přiložený ND sluneční filtr. Bez něj na Slunce nikdy nemiř – ani na ' +
                  'sekundu, ani „jen rychle“.' },
          { icon: '🌙', title: 'Zapni režim Solar System',
            text: 'Jiné režimy nedokážou nastavit čas tak krátce a fotka bude přepálená.' },
          { icon: '👀', title: 'Nikdy se nedívej přímo očima',
            text: 'Ani hledáčkem, ani dalekohledem bez filtru. Dívej se jen na obrazovku telefonu.' },
          { icon: '🌡️', title: 'Nefotografuj příliš dlouho v kuse',
            text: 'Dwarf se u Slunce zahřívá. Nad 60 °C se sám vypne, aby se nepoškodil – dej mu pauzu.' }
        ],
        note: 'Tohle je pravidlo, které si astronomové opakují celý život: Slunce jen s filtrem.',
        cta: 'Rozumím – filtr vždy',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Kdyby Slunce právě teď zhaslo, zjistili bychom to až po osmi minutách.',
          'Slunce, které vidíš na obloze, je vlastně Slunce z minulosti – jen z velmi nedávné.'
        ],
        footnote: 'A tu samou věc dělá každá hvězda. Jen u nich to nejsou minuty, ale roky až miliardy ' +
                  'let.',
        cta: 'To je super'
      },
      { type: 'fact', factId: 'slnecne-skvrny' },
      {
        type: 'mission',
        title: '📸 MISE: SLUNEČNÍ SKVRNY',
        objectId: 'sun',
        tasks: [
          { icon: '🛡️', text: 'Nasaď na Dwarf ND sluneční filtr (bez něj nic!).' },
          { icon: '🌙', text: 'Zapni režim Solar System a vyfotografuj Slunce.' },
          { icon: '🔢', text: 'Spočítej na fotce sluneční skvrny a zapiš si datum.' },
          { icon: '📅', text: 'Za týden to zopakuj – skvrny se posunou, protože se Slunce otáčí.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Máš ve sbírce vlastní hvězdu – a udělal jsi své první opakované měření.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Jak dlouho letí světlo ze Slunce k nám?',
            options: [
              { label: 'Asi 8 minut', correct: true },
              { label: 'Asi 8 sekund' },
              { label: 'Asi 8 hodin' },
              { label: 'Dorazí okamžitě' }
            ],
            explain: 'Slunce je 8 světelných minut daleko. Proto ho vždy vidíš takové, jaké bylo před osmi ' +
                     'minutami.'
          },
          {
            kind: 'truefalse',
            question: 'Když je obloha trochu zamračená, Slunce se dá vyfotit i bez filtru.',
            answer: false,
            explain: 'Nikdy. Mraky se mohou roztrhat v té nejhorší sekundě. Filtr vždy, bez výjimky.'
          },
          {
            kind: 'decide',
            question: 'Co jsou sluneční skvrny?',
            options: [
              { icon: '❄️', label: 'Chladnější místa na povrchu Slunce', correct: true },
              { icon: '🕳️', label: 'Díry, kterými je vidět dovnitř Slunce' }
            ],
            explain: 'Jsou „jen“ okolo 3 500 °C, a proto se vedle jasnějšího povrchu zdají tmavé.'
          },
          {
            kind: 'image',
            question: 'Který z těchto objektů se smí fotit jen se slunečním filtrem?',
            options: [
              { image: 'sun', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'Slunce. Mlhovina je tak slabá, že tam je problém přesně opačný.'
          },
          {
            kind: 'order',
            question: 'Seřaď, jak budeš fotit Slunce.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Nasadit ND sluneční filtr', order: 1, icon: '🛡️' },
              { label: 'Zapnout režim Solar System', order: 2, icon: '🌙' },
              { label: 'Zamířit na Slunce podle obrazovky', order: 3, icon: '🎯' },
              { label: 'Fotit krátké snímky a dát Dwarfu pauzu', order: 4, icon: '⏱️' }
            ],
            explain: 'Filtr je vždy první krok. Až potom se Dwarf smí otočit ke Slunci.'
          }
        ],
        resultGood: '🌟 Sluneční hlídač!',
        resultOk: '🔭 Ještě jednou – hlavně to pravidlo s filtrem.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 12 – FÁZE MĚSÍCE A ZATMĚNÍ
     ========================================================================== */
  {
    id: 'phases',
    icon: '🌗',
    title: 'FÁZE A ZATMĚNÍ',
    teaser: 'Proč Měsíc mění tvar – a proč to není stín Země.',
    minutes: '7 minut',
    badge: 'phase-keeper',
    basics: [ 'faza', 'terminator', 'tidalne-uzamknutie', 'zatmenie',
              'orbita', 'mesiac' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'moonphase',
        question: '🔎 PROČ VIDÍME JEN ČÁST MĚSÍCE?',
        options: [
          { id: 'lit',    icon: '🔦', label: 'Vidíme jen tu část, kterou osvětluje Slunce' },
          { id: 'shadow', icon: '🌍', label: 'Zakrývá ho stín Země' },
          { id: 'clouds', icon: '☁️', label: 'Zakrývají ho mraky' },
          { id: 'shrink', icon: '🍪', label: 'Měsíc se opravdu zmenšuje' }
        ],
        correct: 'lit',
        successTitle: '🎉 PŘESNĚ TAK!',
        successText: 'Slunce vždy osvětluje přesně polovinu Měsíce. Mění se jen to, jak velkou část té ' +
                     'osvětlené poloviny odsud vidíme.',
        retryText: 'Zkus to ještě jednou. Kdyby to byl stín Země, museli bychom mít zatmění každou noc.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌗 FÁZE NEJSOU STÍN',
        image: 'moonphase',
        lines: [
          'Měsíc obíhá okolo Země a my ho vidíme z různých stran.',
          'Proto se nám zdá jednou jako tenký půlměsíc, jednou jako celý kruh.',
          'Celý koloběh osmi fází trvá 29,5 dne.'
        ],
        more: [
          'Osvětlená je vždy přesně polovina Měsíce – ta, která je otočená ke Slunci. To se nikdy ' +
          'nemění. Mění se jen to, z jakého úhlu se na tu osvětlenou polovinu díváme ze Země.',
          'Když je Měsíc mezi námi a Sluncem, míří k nám temnou stranou a máme nov. Když je na ' +
          'opačné straně od Slunce, vidíme celou osvětlenou polovinu a máme úplněk.',
          'Stín Země v tom opravdu není – ten na Měsíc padne jen zřídka a tehdy mluvíme o zatmění ' +
          'Měsíce. A ještě jedna zvláštnost: Měsíc k nám má stále otočenou tutéž tvář, protože se ' +
          'kolem své osy otočí přesně jednou za jeden oběh Země.'
        ],
        diagram: 'sky-rotation',
        cta: 'A co zatmění?'
      },
      { type: 'fact', factId: 'mesiac-29-dni' },
      {
        type: 'cards',
        title: 'DVĚ ÚPLNĚ JINÁ ZATMĚNÍ',
        subtitle: 'Otoč obě karty.',
        cards: [
          { icon: '🌑', name: 'Zatmění Slunce', short: 'Měsíc zakryje Slunce.',
            text: 'Měsíc se dostane přesně mezi Zemi a Slunce a vrhne na Zemi malý stín. Je vidět jen z ' +
                  'úzkého pásu na Zemi – a nikdy se nesmíš dívat bez filtru.',
            image: 'sun', exampleLabel: 'Děje se přes den' },
          { icon: '🌕', name: 'Zatmění Měsíce', short: 'Země zakryje Měsíc.',
            text: 'Země se dostane mezi Slunce a Měsíc a hodí na něj svůj stín. Měsíc zčervená a je to ' +
                  'vidět z celé noční strany Země – úplně bezpečně.',
            image: 'moon', exampleLabel: 'Děje se v noci, při úplňku' }
        ],
        cta: 'Proč tedy nejsou každý měsíc?',
        xp: 15
      },
      {
        type: 'compare',
        title: '🌗 ÚPLNĚK vs. ČTVRŤ',
        lead: 'Tentýž Měsíc, tentýž dalekohled – a úplně jiná fotka.',
        eye: {
          icon: '🌕',
          label: 'ÚPLNĚK',
          art: 'moon',
          text: 'Krásně jasný, ale plochý. Slunce svítí přímo zpředu, takže nic nevrhá stíny a krátery ' +
                'se ztrácejí.'
        },
        camera: {
          icon: '🌗',
          label: 'ČTVRŤ',
          image: 'moonphase',
          text: 'Na hranici světla a tmy vrhají hory a krátery dlouhé stíny. Právě tady je Měsíc ' +
                'nejkrásnější – a nejvíc plastický.'
        },
        check: {
          question: 'Kdy tedy fotit krátery?',
          options: [
            { label: 'Když je Měsíc ve čtvrti, na hranici světla a tmy', correct: true,
              explain: 'Ano! Ta hranice se jmenuje terminátor a je to nejlepší místo na Měsíci.' },
            { label: 'Při úplňku, když je nejvíc světla', correct: false,
              explain: 'Při úplňku je světla dost, ale žádné stíny – a bez stínů krátery nevidíš.' }
          ]
        },
        cta: 'Jdeme na misi'
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Měsíc se okolo své osy otočí přesně jednou za jeden oběh okolo Země. Proto k nám vždy ' +
          'otáčí tutéž stranu.',
          'Jeho odvrácenou stranu nikdo z lidí neviděl, dokud tam neposlali sondu.'
        ],
        footnote: 'Není to „temná strana“ – Slunce na ni svítí stejně. Jen ji odsud nikdy neuvidíme.',
        cta: 'To je šílené 🤯'
      },
      { type: 'fact', factId: 'mesiac-odvratena' },
      { type: 'fact', factId: 'mesiac-kratery' },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'mesiac-fazy', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: DESET VEČERŮ',
        image: 'moonphase',
        subtitle: 'Série fází Měsíce',
        lead: 'Tvůj první projekt, který trvá déle než jeden večer. Výsledek se dá vytisknout a ' +
              'vyvěsit.',
        tasks: [
          { icon: '📅', text: 'Vyfotografuj Měsíc deset večerů po sobě – vždy podobně velký v záběru.' },
          { icon: '🗂️', text: 'Fotky ulož do jedné složky a pojmenuj je podle data.' },
          { icon: '🖼️', text: 'Poskládej je za sebou – vznikne ti série fází.' }
        ],
        note: 'Když bude jeden večer zataženo, nic se neděje. Pokračuj další den a poznač si mezeru.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Tohle je přesně to, co dělají astronomové: pozorovat tutéž věc opakovaně a hledat ' +
                  'změnu.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč má Měsíc fáze?',
            options: [
              { label: 'Vidíme různě velkou část jeho osvětlené poloviny', correct: true },
              { label: 'Padá na něj stín Země' },
              { label: 'Zakrývají ho mraky' },
              { label: 'Měsíc se nafukuje a zmenšuje' }
            ],
            explain: 'Slunce osvětluje vždy přesně polovinu Měsíce. Mění se jen náš pohled na ni.'
          },
          {
            kind: 'truefalse',
            question: 'Ze Země vidíme vždy tutéž stranu Měsíce.',
            answer: true,
            explain: 'Měsíc se otočí jednou za jeden oběh, takže k nám míří stále tou samou stranou.'
          },
          {
            kind: 'decide',
            question: 'Jak dlouho trvá celý cyklus fází?',
            options: [
              { icon: '📅', label: 'Asi 29,5 dne', correct: true },
              { icon: '🗓️', label: 'Přesně 7 dní' }
            ],
            explain: 'Od novu do novu je to 29,5 dne – proto máme v roce dvanáct „měsíců“.'
          },
          {
            kind: 'order',
            question: 'Seřaď fáze Měsíce od novu.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Nov (Měsíc není vidět)', order: 1, icon: '🌑' },
              { label: 'Dorůstající půlměsíc', order: 2, icon: '🌒' },
              { label: 'První čtvrť', order: 3, icon: '🌓' },
              { label: 'Úplněk', order: 4, icon: '🌕' }
            ],
            explain: 'A potom to jde naopak, dokud se Měsíc znovu neztratí v novu.'
          },
          {
            kind: 'image',
            question: 'Na které fotce uvidíš krátery nejlépe?',
            options: [
              { image: 'moonphase', label: 'A', correct: true },
              { image: 'moon', label: 'B' }
            ],
            explain: 'Na hranici světla a tmy vrhají krátery dlouhé stíny. Při úplňku je Měsíc plochý.'
          }
        ],
        resultGood: '🌟 Strážce fází!',
        resultOk: '🔭 Ještě jednou – a Měsíc ti už nic neutají.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 13 – ČTENÍ OBLOHY
     ========================================================================== */
  {
    id: 'sky-reading',
    icon: '🗺️',
    title: 'ČTENÍ OBLOHY',
    teaser: 'Jak se na nebi neztratit a najít si cokoli sám.',
    minutes: '7 minut',
    badge: 'sky-cartographer',
    basics: [ 'suhvezdie', 'suradnice', 'vyska-nad-obzorom', 'zenit',
              'magnituda', 'precesia', 'kalibracia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'polaris',
        question: '🔎 CO JE SOUHVĚZDÍ?',
        options: [
          { id: 'map',     icon: '🗺️', label: 'Dílek mapy oblohy' },
          { id: 'family',  icon: '👨‍👩‍👧', label: 'Skupina hvězd, které patří k sobě' },
          { id: 'galaxy',  icon: '🌌', label: 'Jiné jméno pro galaxii' },
          { id: 'cluster', icon: '✨', label: 'Jiné jméno pro hvězdokupu' }
        ],
        correct: 'map',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Souhvězdí je políčko na mapě oblohy. Jeho hvězdy spolu většinou nemají nic – jen leží ' +
                     've stejném směru.',
        retryText: 'Zkus to ještě jednou. Hvězdy v jednom souhvězdí bývají od sebe stovky světelných let. ' +
                   'Co to tedy vlastně je?',
        xp: 10
      },
      {
        type: 'info',
        title: '🗺️ OBLOHA JE MAPA',
        image: 'milkyway',
        lines: [
          'Astronomové rozdělili celou oblohu na 88 souhvězdí – jako dílky puzzle.',
          'Slouží k orientaci: „M42 je v Orionu“ je adresa, ne příběh.',
          'A každý objekt má i přesné souřadnice, které umí Dwarf použít.'
        ],
        more: [
          'Souhvězdí není skupina hvězd, které patří k sobě. Je to jen obrazec, který vzniká tím, ' +
          'jak se hvězdy promítnou na oblohu z našeho místa. Hvězdy jednoho souhvězdí mohou být ' +
          'od sebe stokrát dál než od nás.',
          'Aby se dala poloha objektu zapsat přesně, používají astronomové souřadnice: ' +
          'rektascenzi a deklinaci. Je to totéž jako zeměpisná šířka a délka, jen promítnuté na ' +
          'oblohu. Právě tahle čísla dostane Dwarf, když mu řekneš, kam se má podívat.',
          'Obloha se nám otáčí a mění se i během roku. Proto se mlhoviny v Orionu dají fotit v ' +
          'zimě a Mléčná dráha je nejkrásnější v létě – v opačné polovině roku jsou na denní ' +
          'straně oblohy.'
        ],
        cta: 'Jak ta adresa vypadá?'
      },
      { type: 'fact', factId: '88-suhvezdi' },
      {
        type: 'cards',
        title: 'JAK SI NAJÍT OBJEKT',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '👆', name: 'Podle obrazců', short: 'Skákání po hvězdách.',
            text: 'Najdeš si výrazný obrazec – Velký vůz, Orionův pás, W Kasiopeji – a od něj „skáčeš“ na ' +
                  'cíl. Tohle funguje i bez techniky.',
            image: 'polaris', exampleLabel: 'Klasika: od Velkého vozu k Polárce' },
          { icon: '📍', name: 'Podle souřadnic', short: 'Rektascenze a deklinace.',
            text: 'Přesná adresa na nebi. Deklinace je jako zeměpisná šířka, rektascenze jako délka. ' +
                  'Dwarf se podle nich otočí sám.',
            image: 'transit', exampleLabel: 'Přesné a rychlé' },
          { icon: '📱', name: 'Podle Stellaria', short: 'Plán na celý večer.',
            text: 'Nastavíš si datum a čas a vidíš, co bude kdy vysoko. Tak si vybereš cíl, který bude ' +
                  'nad 30° – a ne za stromem.',
            image: 'dome', exampleLabel: 'Nejlepší pomocník před pozorováním' }
        ],
        cta: 'Jdeme na úkol',
        xp: 15
      },
      { type: 'fact', factId: 'obloha-adresa' },
      {
        type: 'pick',
        title: '🔎 KTERÝ OBJEKT JE V ORIONU?',
        prompt: 'Zkus to bez pomoci – jeden z těchto čtyř je v souhvězdí Orion.',
        options: [
          { image: 'm13', correct: false, explain: 'M13 je v Herkulovi – letní obloha.' },
          { image: 'm42', correct: true,  explain: 'Ano! M42 leží hned pod třemi hvězdami Orionova pásu. Proto se jí říká Orionova ' +
                                                   'mlhovina.' },
          { image: 'm31', correct: false, explain: 'M31 je v Andromedě – podzimní obloha, blízko Kasiopeji.' },
          { image: 'm44', correct: false, explain: 'M44 je v Raku – jarní obloha.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Hvězdy jednoho souhvězdí spolu většinou nemají absolutně nic.',
          'Jsou od sebe stovky světelných let – jen z naší strany se nám náhodou promítnou do ' +
          'jednoho obrazce. Z jiné hvězdy by Orion vůbec nebyl Orion.'
        ],
        footnote: 'Souhvězdí jsou tedy náš výmysl. Užitečný, ale výmysl.',
        cta: 'Jdeme si to ověřit'
      },
      {
        type: 'mission',
        title: '📸 MISE: NAJDI TO SÁM',
        objectId: 'm27',
        tasks: [
          { icon: '📱', text: 'Ve Stellariu napiš „M27“ a zjisti, ve kterém souhvězdí je a jak vysoko bude dnes.' },
          { icon: '📍', text: 'Opiš si její souřadnice – rektascenzi a deklinaci.' },
          { icon: '🔭', text: 'Najdi ji Dwarfem a vyfotografuj.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'První objekt, který jsi našel podle adresy na nebi. Odteď si najdeš cokoli.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Kolik je oficiálních souhvězdí?',
            options: [
              { label: '88', correct: true },
              { label: '12' },
              { label: '100' },
              { label: 'nekonečně mnoho' }
            ],
            explain: 'Astronomové se dohodli na 88 souhvězdích, která pokrývají celou oblohu.'
          },
          {
            kind: 'truefalse',
            question: 'Hvězdy v jednom souhvězdí jsou blízko sebe i ve skutečnosti.',
            answer: false,
            explain: 'Většinou ne. Bývají od sebe stovky světelných let – jen z naší strany vytvářejí ' +
                     'obrazec.'
          },
          {
            kind: 'decide',
            question: 'Co je rektascenze a deklinace?',
            options: [
              { icon: '📍', label: 'Souřadnice – adresa objektu na nebi', correct: true },
              { icon: '⭐', label: 'Jména dvou jasných hvězd' }
            ],
            explain: 'Jsou to nebeské souřadnice, přesně jako zeměpisná šířka a délka na Zemi.'
          },
          {
            kind: 'image',
            question: 'Který objekt je v souhvězdí Orion?',
            options: [
              { image: 'm42', label: 'A', correct: true },
              { image: 'm13', label: 'B' }
            ],
            explain: 'M42 – Orionova mlhovina. M13 je v Herkulovi.'
          },
          {
            kind: 'order',
            question: 'Seřaď, jak si naplánuješ pozorování.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Ve Stellariu vybrat objekt na dnešní večer', order: 1, icon: '📱' },
              { label: 'Ověřit, jestli bude výše než 30°', order: 2, icon: '📐' },
              { label: 'Zadat ho v aplikaci Dwarfu', order: 3, icon: '🔭' },
              { label: 'Kalibrovat a fotit', order: 4, icon: '📸' }
            ],
            explain: 'Plánování před pozorováním ušetří nejvíc času. A také nervů.'
          }
        ],
        resultGood: '🌟 Kartograf oblohy!',
        resultOk: '🔭 Ještě jednou – tu mapu se naučíš snadno.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 14 – ISS A SATELITY
     ========================================================================== */
  {
    id: 'iss',
    icon: '🛰️',
    title: 'CO LETÍ NAD NÁMI',
    teaser: 'Nad tvou hlavou právě teď žijí lidé. Chytíš je?',
    minutes: '6 minut',
    badge: 'sky-tracker',
    basics: [ 'druzica', 'orbita', 'magnituda', 'expozicia',
              'zorne-pole', 'seeing' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'iss',
        question: '🔎 CO JE TA ROVNÁ SVĚTLÁ ČÁRA?',
        options: [
          { id: 'sat',    icon: '🛰️', label: 'umělá družice, například ISS' },
          { id: 'meteor', icon: '🌠', label: 'meteor' },
          { id: 'plane',  icon: '✈️', label: 'letadlo' },
          { id: 'star',   icon: '⭐', label: 'velmi rychlá hvězda' }
        ],
        correct: 'sat',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Družice letí pomalu, rovnoměrně a nebliká. Meteor je blesk na jednu sekundu, letadlo ' +
                     'bliká červeno-bíle.',
        retryText: 'Zkus to ještě jednou. Tahle čára je dlouhá a rovnoměrná – meteor by byl krátký ' +
                   'záblesk.',
        xp: 10
      },
      {
        type: 'info',
        title: '🛰️ NAD NÁMI JE RUŠNO',
        image: 'iss',
        lines: [
          'Kolem Země obíhá množství umělých družic.',
          'Nesvítí samy – vidíme na nich odraz slunečního světla.',
          'Nejjasnější z nich je Mezinárodní vesmírná stanice, na které žijí lidé.'
        ],
        more: [
          'Stanice letí kolem Země rychlostí přibližně 28 000 kilometrů za hodinu a jeden oběh jí ' +
          'trvá asi 90 minut. Za jeden den tedy vidí zhruba šestnáct východů a šestnáct západů ' +
          'Slunce.',
          'Nezůstává na oběžné dráze „jen tak“ – padá. Padá k Zemi, ale zároveň letí dopředu tak ' +
          'rychle, že zakřivení Země padá spolu s ní. Proto lidé uvnitř plavou: nejsou bez ' +
          'gravitace, ale v neustálém volném pádu.',
          'Vidět ji můžeš jen krátce po setmění nebo před svítáním. Tehdy je u země už tma, ale ' +
          'stanice vysoko nad námi je ještě osvětlená Sluncem. V hluboké noci vletí do stínu Země ' +
          'a zmizí.'
        ],
        cta: 'Jak je rozeznat?'
      },
      { type: 'fact', factId: 'iss-16-vychodov' },
      {
        type: 'cards',
        title: 'JAK ROZEZNAT, CO TO LETÍ',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🛰️', name: 'ISS', short: 'Jasná, pomalá, nebliká.',
            text: 'Přeletí oblohu za dvě až pět minut, svítí stabilně jako jasná hvězda a nikdy nebliká. ' +
                  'Občas během přeletu zmizí – vletěla do stínu Země.',
            image: 'iss', exampleLabel: 'Nejjasnější objekt, co letí' },
          { icon: '✈️', name: 'Letadlo', short: 'Bliká červeně a bíle.',
            text: 'Má barevná blikající světla a někdy je ho i slyšet. Letí mnohem níž než družice.',
            image: 'citysky', exampleLabel: 'Bliká = letadlo' },
          { icon: '🌠', name: 'Meteor', short: 'Blesk na sekundu.',
            text: 'Objeví se a hned zmizí – trvá zlomek sekundy až pár sekund. Družice letí pokojně ' +
                  'desítky sekund.',
            image: 'meteors', exampleLabel: 'Krátký záblesk' }
        ],
        cta: 'Kdy je vidět?',
        xp: 15
      },
      {
        type: 'compare',
        title: '🌆 PROČ JEN PO ZÁPADU SLUNCE?',
        lead: 'Družice jsou vidět hlavně krátce po setmění a před rozedněním. Má to jednoduchý důvod.',
        eye: {
          icon: '🌃',
          label: 'U NÁS UŽ TMA',
          art: 'citysky',
          text: 'My jsme ve stínu Země, takže obloha je tmavá a slabé světlo vidíme.'
        },
        camera: {
          icon: '☀️',
          label: 'NAHOŘE UŽ SVÍTÍ SLUNCE',
          image: 'iss',
          text: 'Družice je 400 km vysoko, takže na ni Slunce svítí ještě i tehdy, když u nás už ' +
                'zapadlo. Proto se leskne na tmavém nebi.'
        },
        check: {
          question: 'Proč tedy ISS uprostřed noci často není vidět?',
          options: [
            { label: 'Protože tehdy je i ona ve stínu Země', correct: true,
              explain: 'Přesně. Nesvítí sama – když na ni nesvítí Slunce, nemáme co vidět.' },
            { label: 'Protože v noci vypíná světla', correct: false,
              explain: 'To ne – žádná světla nevidíme. Vidíme jen odraz Slunce na jejích panelech.' }
          ]
        },
        cta: 'Jdeme ji chytit'
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'To světlo, které uvidíš, je odraz Slunce na panelech stanice velké jako fotbalové ' +
          'hřiště.',
          'A vevnitř jsou lidé. Právě teď. Lidé tam nepřetržitě žijí od listopadu 2000.'
        ],
        footnote: 'Když zamáváš, neuvidí tě. Ale je fajn vědět, že tam jsou.',
        cta: 'Chci ji vidět'
      },
      { type: 'fact', factId: 'iss-od-2000' },
      {
        type: 'mission',
        title: '🛰️ MISE: ULOV ISS',
        objectId: 'iss',
        tasks: [
          { icon: '📱', text: 'Ve Stellariu si zapni satelity a najdi „ISS“ – zjisti, kdy dnes přeletí.' },
          { icon: '⏰', text: 'Buďte venku dvě minuty před časem a dívejte se do směru, který ti Stellarium ukáže.' },
          { icon: '👀', text: 'Sleduj ji volným okem – nebliká a letí rovnoměrně.' },
          { icon: '📸', text: 'Zkus delší expozici Dwarfem širokoúhle – zůstane po ní světelný pruh.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Viděl jsi lidmi obydlenou stanici na obloze. Další přelet je obvykle za 90 minut.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč družice na nebi vidíme?',
            options: [
              { label: 'Odrážejí světlo Slunce', correct: true },
              { label: 'Svítí vlastními reflektory' },
              { label: 'Hoří v atmosféře' },
              { label: 'Jsou rozžhavené od rychlosti' }
            ],
            explain: 'Stejně jako Měsíc – svítí odraženým slunečním světlem.'
          },
          {
            kind: 'decide',
            question: 'Objekt letí pomalu a rovnoměrně, nebliká a přeletí za tři minuty. Co to je?',
            options: [
              { icon: '🛰️', label: 'Družice – pravděpodobně ISS', correct: true },
              { icon: '🌠', label: 'Meteor' }
            ],
            explain: 'Meteor trvá sekundu. Blikání by prozradilo letadlo.'
          },
          {
            kind: 'truefalse',
            question: 'Na ISS žijí lidé nepřetržitě už od roku 2000.',
            answer: true,
            explain: 'Od listopadu 2000 tam vždy někdo je. Stanice je dlouhá 109 metrů.'
          },
          {
            kind: 'image',
            question: 'Který obrázek ukazuje přelet družice?',
            options: [
              { image: 'iss', label: 'A', correct: true },
              { image: 'meteors', label: 'B' }
            ],
            explain: 'A je jedna dlouhá rovnoměrná čára. B jsou meteory – krátké záblesky z jednoho místa.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejbližšího k nejvzdálenějšímu.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Letadlo (asi 10 km)', order: 1, icon: '✈️' },
              { label: 'ISS (asi 400 km)', order: 2, icon: '🛰️' },
              { label: 'Měsíc (384 400 km)', order: 3, icon: '🌙' },
              { label: 'Slunce (150 milionů km)', order: 4, icon: '☀️' }
            ],
            explain: 'ISS je vesmír „hned za dveřmi“ – čtyřicetkrát blíž, než bys čekal.'
          }
        ],
        resultGood: '🌟 Sledovač oblohy!',
        resultOk: '🔭 Ještě jednou – a potom hned ven.'
      }
    ]
  },

  /* ==========================================================================
     LEKCIA 15 – ASTROFOTO MAJSTER
     ========================================================================== */
  {
    id: 'astrophoto',
    icon: '📸',
    title: 'ASTROFOTO MISTR',
    teaser: 'Proč je sto snímků lepších než jeden – a jak z fotky dostat barvy.',
    minutes: '7 minut',
    badge: 'astrophoto-master',
    basics: [ 'skladanie', 'sum', 'gain', 'darkframe',
              'ostrenie', 'svetelne-znecistenie', 'falosne-farby', 'rosa' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'm42',
        question: '🔎 CO UDĚLÁ FOTKU MLHOVINY ČISTŠÍ?',
        options: [
          { id: 'stack', icon: '🧩', label: 'Poskládat mnoho snímků na sebe' },
          { id: 'gain',  icon: '🎚️', label: 'Nastavit gain na maximum' },
          { id: 'light', icon: '🔦', label: 'Přisvítit baterkou' },
          { id: 'zoom',  icon: '🔍', label: 'Zvětšit přiblížení' }
        ],
        correct: 'stack',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Šum je v každém snímku jinde, mlhovina je vždy na tomtéž místě. Když snímky poskládáš, ' +
                     'šum se vyruší a mlhovina zůstane.',
        retryText: 'Zkus to ještě jednou. Gain na maximum přidá jasnost, ale i šum. Co šum naopak ' +
                   'odstraní?',
        xp: 10
      },
      {
        type: 'info',
        title: '🧩 KOUZLO SKLÁDÁNÍ SNÍMKŮ',
        image: 'm42',
        lines: [
          'Jeden snímek mlhoviny je slabý a plný šumu.',
          'Šum je ale v každém snímku náhodně jinde, kdežto mlhovina je vždy na tomtéž místě.',
          'Když Dwarf snímky poskládá na sebe, šum se vyruší a objekt se vynoří.'
        ],
        more: [
          'Šum je náhodný, a proto se dá vyrušit. Když poskládáš čtyři snímky, šum klesne na ' +
          'polovinu; při stonásobku snímků bude desetkrát menší. Platí to jako pravidlo odmocniny ' +
          '– a proto se od určitého počtu snímků další přidávání už téměř neprojeví.',
          'Objekt se naopak nasčítá, protože je na každém snímku na tomtéž místě. Skládání tedy ' +
          'nezesiluje objekt – zeslabuje šum okolo něj, a proto se objekt vynoří.',
          'Astronomové dělají i takzvané kalibrační snímky: darky se zavřeným objektivem (aby ' +
          'věděli, co si senzor vymýšlí sám), a flaty rovnoměrně osvětlené plochy (aby věděli, ' +
          'kde je objektiv zaprášený). Dwarf většinu téhle práce dělá za tebe.'
        ],
        cta: 'Co ještě pomůže?'
      },
      { type: 'fact', factId: 'stovky-snimok' },
      {
        type: 'howto',
        title: '🏆 ČTYŘI VĚCI, KTERÉ DĚLAJÍ DOBROU FOTKU',
        lead: 'V tomto pořadí. První věc pomůže nejvíc, poslední nejméně – ale všechny se počítají.',
        steps: [
          { icon: '🧩', title: 'Hodně snímků',
            text: 'Sto je minimum, dvě stě až čtyři sta je paráda. Tohle je nejsilnější nástroj, jaký ' +
                  'máš.' },
          { icon: '🌑', title: 'Temná obloha',
            text: 'Odjezd z města pomůže víc než jakékoli nastavení. I okraj vesnice je velký rozdíl.' },
          { icon: '🎯', title: 'Přesné zaostření',
            text: 'Rozostřenou fotku nezachrání nic. Zkontroluj si na obrazovce, jestli jsou hvězdy malé ' +
                  'body.' },
          { icon: '⬛', title: 'Dark framy',
            text: 'Odečtou šum senzoru. Stejná expozice, stejný gain, podobná teplota.' }
        ],
        note: 'A ještě jedna věc: Měsíc v úplňku rozsvítí celou oblohu. Slabé mlhoviny fotografuj, ' +
              'když Měsíc nesvítí.',
        cta: 'Rozumím',
        xp: 20
      },
      { type: 'fact', factId: 'darkframe' },
      {
        type: 'pick',
        title: '🔎 VYBER SI DOBRÝ CÍL',
        prompt: 'Který objekt je nejlepší na trénink skládání snímků?',
        options: [
          { image: 'm44', correct: true,  explain: 'Ano! Jasná, velká, celá se vejde do záběru. Hned vidíš, jestli máš dobře zaostřeno a ' +
                                                   'jestli se něco hýbe.' },
          { image: 'ring', correct: false, explain: 'Prstencová mlhovina je maličká – na trénink je příliš náročná.' },
          { image: 'sgra', correct: false, explain: 'Černou díru Dwarf neuvidí vůbec. Tohle by byl nezasloužený smutek.' },
          { image: 'sun', correct: false, explain: 'Slunce se fotí úplně jinak – krátké expozice a vždy s filtrem. A v noci ho na nebi ' +
                                                   'nenajdeš.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Slavné fotky z Hubbla nejsou jeden snímek. Některé jsou složené z desítek hodin ' +
          'pozorování.',
          'A barvy na nich často nejsou ty, které by vidělo oko – jsou to skutečná data o světle, ' +
          'převedená na barvy, abychom viděli, co tam opravdu je.'
        ],
        footnote: 'Není to podvod. Je to jako termokamera: reálné měření, jen překreslené do barev.',
        cta: 'Jdeme to vyzkoušet'
      },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'skladanie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: 10 vs. 100 SNÍMKŮ',
        image: 'm42',
        subtitle: 'Dokaž si to na vlastních datech',
        lead: 'Nejlepší způsob, jak uvěřit skládání snímků, je vidět rozdíl na tomtéž objektu.',
        tasks: [
          { icon: '🔟', text: 'Vyfotografuj si vybraný objekt s 10 snímky a fotku si ulož.' },
          { icon: '💯', text: 'Bez toho, abys cokoli jiného měnil, vyfotografuj ho se 100 snímky.' },
          { icon: '🔍', text: 'Fotky polož vedle sebe a podívej se na pozadí – ne na objekt.' }
        ],
        note: 'Rozdíl bude nejvíc vidět právě na pozadí: v první fotce „sněží“, v druhé je hladké.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Tohle je celé tajemství astrofotografie. Zbytek je už jen trpělivost.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč skládání snímků odstraní šum?',
            options: [
              { label: 'Šum je v každém snímku jinde, objekt je vždy na tomtéž místě', correct: true },
              { label: 'Šum se při skládání zvětší a praskne' },
              { label: 'Dwarf šum vymaže gumou' },
              { label: 'Šum zmizí, když je fotka menší' }
            ],
            explain: 'Náhodný šum se průměrováním vyruší, zatímco skutečný signál zůstane.'
          },
          {
            kind: 'truefalse',
            question: 'Rozostřenou fotku lze zachránit tím, že složíš více snímků.',
            answer: false,
            explain: 'Nelze. Zaostření musí být dobré od začátku – skládání pomůže se šumem, ne s ostrostí.'
          },
          {
            kind: 'decide',
            question: 'Chceš fotit slabou mlhovinu. Co pomůže nejvíc?',
            options: [
              { icon: '🌑', label: 'Jít na temné místo a nafotit hodně snímků', correct: true },
              { icon: '🎚️', label: 'Nastavit gain na maximum' }
            ],
            explain: 'Maximální gain přidá i šum. Temná obloha a hodně snímků jsou skutečné řešení.'
          },
          {
            kind: 'image',
            question: 'Který cíl je nejvhodnější na trénink?',
            options: [
              { image: 'm44', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'Velká jasná hvězdokupa. Malá slabá mlhovina je na trénink frustrující.'
          },
          {
            kind: 'order',
            question: 'Seřaď od toho, co fotce pomůže nejvíc.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Hodně snímků (200 – 400)', order: 1, icon: '🧩' },
              { label: 'Temná obloha bez lamp', order: 2, icon: '🌑' },
              { label: 'Přesné zaostření', order: 3, icon: '🎯' },
              { label: 'Dark framy', order: 4, icon: '⬛' }
            ],
            explain: 'Všechny čtyři pomáhají – ale kdybys měl udělat jen jednu věc, udělej víc snímků.'
          }
        ],
        resultGood: '🌟 Astrofoto mistr!',
        resultOk: '🔭 Ještě jednou – hlavně to o šumu.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 16 – Z ČEHO JSOU HVĚZDY (SPEKTRUM)
     ========================================================================== */
  {
    id: 'spectrum',
    icon: '🔬',
    title: 'Z ČEHO JSOU HVĚZDY',
    teaser: 'Nikdo tam nebyl. Jak tedy víme, z čeho hvězdy jsou?',
    minutes: '7 minut',
    badge: 'light-reader',
    basics: [ 'spektrum', 'cerveny-posun', 'farba-teplota', 'infracervene-svetlo',
              'senzor', 'hviezda' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'spectrum',
        question: '🔎 CO JSOU TY TMAVÉ ČÁRY V DUZE?',
        options: [
          { id: 'elements', icon: '🧪', label: 'otisky prvků ve hvězdě' },
          { id: 'scratch',  icon: '🪥', label: 'škrábance na objektivu' },
          { id: 'clouds',   icon: '☁️', label: 'mraky před hvězdou' },
          { id: 'error',    icon: '🖨️', label: 'chyba při tisku' }
        ],
        correct: 'elements',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Každý prvek pohltí přesně určité barvy. Ve spektru po něm zůstane tmavá čára – jeho ' +
                     'otisk prstu.',
        retryText: 'Zkus to ještě jednou. Ty čáry jsou vždy na stejných místech, i když změníš dalekohled. ' +
                   'Takže to není chyba přístroje.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌈 SVĚTLO SE DÁ ROZLOŽIT',
        image: 'spectrum',
        lines: [
          'Bílé světlo není jedna barva – je to směs všech.',
          'Když ho rozložíš, dostaneš duhu, které astronomové říkají spektrum.',
          'A právě v té duze je ukryté, z čeho je hvězda a jak je horká.'
        ],
        more: [
          'Každý plyn pohltí a vyzáří světlo jen v přesně určených barvách – jako by měl vlastní ' +
          'čárový kód. Když astronom ve spektru hvězdy uvidí tyto čáry, ví s jistotou, které ' +
          'látky v ní jsou, i když je hvězda miliardy kilometrů daleko.',
          'Helium našli lidé nejprve ve spektru Slunce a až potom na Zemi. Odtud má i jméno – ' +
          'řecky „hélios“ znamená Slunce.',
          'Když se celý čárový kód posune do červena, znamená to, že se objekt od nás vzdaluje. ' +
          'Právě takto astronomové zjistili, že se vesmír rozpíná.'
        ],
        cta: 'Co všechno to prozradí?'
      },
      { type: 'fact', factId: 'spektrum-carky' },
      {
        type: 'cards',
        title: 'CO SE DÁ VYČÍST ZE SVĚTLA',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌡️', name: 'Teplota', short: 'Podle barvy.',
            text: 'Když je ve spektru nejvíc modré, hvězda je horká. Když červené, je chladnější. Přesně ' +
                  'to jsme viděli v lekci o hvězdách.',
            image: 'starBlue', exampleLabel: 'Modrá = horká' },
          { icon: '🧪', name: 'Z čeho je', short: 'Podle čar.',
            text: 'Vodík dělá svůj vzor čar, helium jiný, železo další. Když je ve spektru najdeš, víš, ' +
                  'co ve hvězdě je.',
            image: 'spectrum', exampleLabel: 'Čáry = složení' },
          { icon: '🏃', name: 'Jestli se hýbe', short: 'Podle posunu čar.',
            text: 'Když se objekt vzdaluje, celý vzor čar se posune k červené. Právě tak jsme zjistili, ' +
                  'že se vesmír rozpíná.',
            image: 'deepfield', exampleLabel: 'Červený posuv = vzdaluje se' }
        ],
        cta: 'Vyzkoušíme to doma?',
        xp: 15
      },
      {
        type: 'howto',
        title: '🧪 POKUS DOMA: VLASTNÍ SPEKTRUM',
        lead: 'Na tohle nepotřebuješ Dwarf. Stačí staré CD a pět minut.',
        steps: [
          { icon: '💿', title: 'Vezmi staré CD',
            text: 'Na jeho lesklé straně jsou tisíce jemných drážek, které světlo rozloží na barvy – ' +
                  'stejně jako prizma.' },
          { icon: '💡', title: 'Nasměruj na něj světlo žárovky',
            text: 'Naklápěj CD, dokud na něm neuvidíš duhu. To je spektrum té žárovky.' },
          { icon: '🔆', title: 'Porovnej různá světla',
            text: 'Žárovka dá plynulou duhu, LED-ka a úsporná zářivka dají duhu s dírami. Různá světla ' +
                  'mají různá spektra.' },
          { icon: '🛡️', title: 'A Slunce – jen přes filtr',
            text: 'Sluneční spektrum je nejkrásnější, ale platí totéž pravidlo jako vždy: nikdy se ' +
                  'nedívej do Slunce bez filtru.' }
        ],
        note: 'Přesně tohle dělají astronomové, jen s dalekohledem a citlivým přístrojem místo CD.',
        cta: 'Skvělé',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Ve spektru Slunce našli astronomové čáru, která nepatřila žádnému známému prvku.',
          'Pojmenovali ho helium – podle řeckého boha Slunce. Na Zemi ho objevili až desítky let ' +
          'potom.'
        ],
        footnote: 'Prvek, který dnes máš v balonech, tedy lidé poprvé „viděli“ na hvězdě.',
        cta: 'To je fakt dobré'
      },
      { type: 'fact', factId: 'helium-slnko' },
      {
        type: 'mission',
        title: '🧪 MISE: ROZLOŽ SVĚTLO',
        image: 'spectrum',
        subtitle: 'Pokus s CD nebo prizmatem',
        lead: 'Udělej si vlastní spektroskop a porovnej tři různá světla.',
        tasks: [
          { icon: '💿', text: 'Rozlož světlo žárovky pomocí CD nebo prizmatu.' },
          { icon: '💡', text: 'Totéž zkus s LED-kou a s úspornou zářivkou.' },
          { icon: '✏️', text: 'Nakresli si, čím se ty tři duhy liší.' }
        ],
        note: 'Pokud máš doma prizma, funguje to nejkrásněji. CD ale stačí úplně.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Právě jsi udělal totéž, co astronomové dělají s hvězdami – jen na kuchyňské lampě.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Jak víme, z čeho je hvězda, když tam nikdo nebyl?',
            options: [
              { label: 'Z čar v jejím rozloženém světle', correct: true },
              { label: 'Poslali jsme tam sondu' },
              { label: 'Podle toho, jak bliká' },
              { label: 'Podle jejího jména' }
            ],
            explain: 'Každý prvek dělá ve spektru svůj vlastní vzor čar.'
          },
          {
            kind: 'decide',
            question: 'Spektrum hvězdy má nejvíc modré. Co to znamená?',
            options: [
              { icon: '🔥', label: 'Je horká', correct: true },
              { icon: '❄️', label: 'Je chladná' }
            ],
            explain: 'Modrá znamená vysokou teplotu, červená nižší.'
          },
          {
            kind: 'truefalse',
            question: 'Helium objevili nejprve na Zemi a potom na Slunci.',
            answer: false,
            explain: 'Přesně naopak – poprvé ho našli ve spektru Slunce, proto se tak jmenuje.'
          },
          {
            kind: 'image',
            question: 'Který obrázek je spektrum?',
            options: [
              { image: 'spectrum', label: 'A', correct: true },
              { image: 'milkyway', label: 'B' }
            ],
            explain: 'A je světlo rozložené na barvy s tmavými čarami prvků.'
          },
          {
            kind: 'order',
            question: 'Seřaď, jak astronom zjistí složení hvězdy.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Zachytí světlo hvězdy dalekohledem', order: 1, icon: '🔭' },
              { label: 'Rozloží ho na barvy', order: 2, icon: '🌈' },
              { label: 'Najde v něm tmavé čáry', order: 3, icon: '📊' },
              { label: 'Porovná čáry se vzory prvků', order: 4, icon: '🧪' }
            ],
            explain: 'A z toho umí říct, co ve hvězdě je – i když je miliardy kilometrů daleko.'
          }
        ],
        resultGood: '🌟 Čtenář světla!',
        resultOk: '🔭 Ještě jednou – ty čáry jsou klíč.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 17 – VESMÍRNÉ VZDÁLENOSTI
     ========================================================================== */
  {
    id: 'distances',
    icon: '📏',
    title: 'VESMÍRNÉ VZDÁLENOSTI',
    teaser: 'Co je světelný rok a proč je vesmír skoro celý prázdný.',
    minutes: '7 minut',
    badge: 'distance-meter',
    basics: [ 'svetelny-rok', 'svetelna-minuta', 'astronomicka-jednotka', 'orbita',
              'slnecna-soustava', 'gravitacia' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'deepfield',
        question: '🔎 CO JE SVĚTELNÝ ROK?',
        options: [
          { id: 'dist',  icon: '📏', label: 'vzdálenost, kterou světlo proletí za rok' },
          { id: 'time',  icon: '⏰', label: 'čas, rok měřený světlem' },
          { id: 'speed', icon: '🏎️', label: 'rychlost světla' },
          { id: 'size',  icon: '⭐', label: 'velikost velmi jasné hvězdy' }
        ],
        correct: 'dist',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Je to vzdálenost, ne čas – i když to podle jména vypadá jinak. Světlo za rok proletí ' +
                     '9,46 bilionu kilometrů.',
        retryText: 'Zkus to ještě jednou. Pomůcka: „autohodina“ by byla taky vzdálenost – to, co ujede ' +
                   'auto za hodinu.',
        xp: 10
      },
      {
        type: 'info',
        title: '📏 KILOMETRY TU NESTAČÍ',
        image: 'deepfield',
        lines: [
          'Světlo letí 300 000 kilometrů za sekundu – nic není rychlejší.',
          'Za rok tedy proletí 9,46 bilionu kilometrů. Tomu se říká světelný rok.',
          'Vesmírné vzdálenosti se v kilometrech nedají ani napsat, proto astronomové měří ' +
          'světlem.'
        ],
        more: [
          'Světelný rok není čas, ale vzdálenost – ta, kterou světlo proletí za rok. Snadno se to ' +
          'poplete, ale je to stejné, jako když řekneš, že je to „dvě hodiny autem“.',
          'Když se podíváš na hvězdu 100 světelných let daleko, vidíš ji takovou, jaká byla před ' +
          'sto lety. Nevidíš vesmír, jaký je – vidíš vesmír, jaký byl. Čím dál se podíváš, tím ' +
          'hlouběji do minulosti.',
          'Pro blízké hvězdy používají astronomové ještě jednu jednotku, parsek (asi 3,26 ' +
          'světelného roku). Vychází z toho, jak se hvězda zdánlivě pohne na obloze, když Země ' +
          'přeletí na druhou stranu své dráhy – a to je zároveň způsob, jak se vzdálenosti ' +
          'opravdu měří.'
        ],
        cta: 'Jak daleko je co?'
      },
      { type: 'fact', factId: 'svetelny-rok-946' },
      {
        type: 'cards',
        title: 'JAK DLOUHO K NÁM LETÍ SVĚTLO',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🌙', name: 'Z Měsíce', short: 'Něco přes sekundu.',
            text: 'Měsíc je 384 400 km daleko. Světlo odtud letí asi 1,3 sekundy – proto astronauti při ' +
                  'rozhovoru s Měsícem mírně měli zpoždění.',
            image: 'moon', exampleLabel: '1,3 sekundy' },
          { icon: '☀️', name: 'Ze Slunce', short: 'Osm minut.',
            text: 'Slunce je 150 milionů km daleko. Jeho světlo je k nám na cestě 8 minut – vždy ho tedy ' +
                  'vidíš o 8 minut starší.',
            image: 'sun', exampleLabel: '8 minut' },
          { icon: '⭐', name: 'Z nejbližší hvězdy', short: 'Čtyři roky.',
            text: 'Proxima Centauri je 4,25 světelného roku daleko. Mezi hvězdami je tedy o hodně větší ' +
                  'díra než v celé naší soustavě.',
            image: 'starRed', exampleLabel: '4,25 roku' }
        ],
        cta: 'A jak daleko jsou mlhoviny?',
        xp: 15
      },
      { type: 'fact', factId: 'proxima-4-25' },
      {
        type: 'pick',
        title: '🔎 CO JE NEJDÁL?',
        prompt: 'Který z těchto objektů je od nás nejdál?',
        options: [
          { image: 'moon', correct: false, explain: 'Měsíc je od nás 1,3 světelné sekundy. To je vesmírně řečeno za dveřmi.' },
          { image: 'm42', correct: false, explain: 'Orionova mlhovina je asi 1 300 světelných let – stále v naší galaxii.' },
          { image: 'm31', correct: false, explain: 'Andromeda je 2,5 milionu světelných let. Už velmi daleko, ale ještě ne nejvíc.' },
          { image: 'm51', correct: true,  explain: 'Ano! Galaxie Vír je 31 milionů světelných let daleko – dvanáctkrát dál než Andromeda.' }
        ],
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Kdyby bylo Slunce velké jako fotbalový míč, Země by byla zrníčko velké 2 milimetry – a ' +
          'byla by od něj 24 metrů daleko.',
          'A nejbližší hvězda? Ta by byla dalších 6 500 kilometrů odtud. To je jako z Prahy do ' +
          'Ameriky.'
        ],
        footnote: 'Proto se říká, že vesmír je hlavně prázdno – s pár zrníčky v něm.',
        cta: 'Jdeme si to postavit'
      },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'vzdialenosti', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📏 MISE: MODEL NA CHODNÍKU',
        image: 'deepfield',
        subtitle: 'Sluneční soustava ve skutečném měřítku',
        lead: 'Tohle se nedá pochopit z obrázku v knize. Musí se to odkráčet.',
        tasks: [
          { icon: '⚽', text: 'Slunce = fotbalový míč. Polož ho na jeden konec chodníku.' },
          { icon: '🚶', text: 'Odkráčej 24 metrů – tam je Země, zrníčko velké 2 milimetry.' },
          { icon: '🪐', text: 'Saturn by byl asi 230 metrů od míče. Zkus i to.' },
          { icon: '🤯', text: 'A nejbližší hvězda? Ta by byla 6 500 kilometrů daleko.' }
        ],
        note: 'Až to odkráčíš, už nikdy se nebudeš na obrázek Sluneční soustavy dívat stejně.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Teď už víš, proč sondy letí k planetám roky – a k hvězdám by letěly desetitisíce let.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Světelný rok je…',
            options: [
              { label: 'vzdálenost, kterou světlo proletí za jeden rok', correct: true },
              { label: 'rok, který má více světla' },
              { label: 'rychlost světla' },
              { label: 'čas, který světlo letí ze Slunce' }
            ],
            explain: 'Je to vzdálenost: 9,46 bilionu kilometrů.'
          },
          {
            kind: 'decide',
            question: 'Jak rychle letí světlo?',
            options: [
              { icon: '⚡', label: '300 000 km za sekundu', correct: true },
              { icon: '🚀', label: '300 000 km za hodinu' }
            ],
            explain: 'Za sekundu. Za tu jednu sekundu by sedmkrát obletělo Zemi.'
          },
          {
            kind: 'truefalse',
            question: 'Světlo ze Slunce k nám letí asi 8 minut.',
            answer: true,
            explain: 'Proto Slunce vždy vidíš takové, jaké bylo před osmi minutami.'
          },
          {
            kind: 'order',
            question: 'Seřaď od nejbližšího po nejvzdálenější.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Měsíc (1,3 světelné sekundy)', order: 1, icon: '🌙' },
              { label: 'Slunce (8 světelných minut)', order: 2, icon: '☀️' },
              { label: 'Proxima Centauri (4,25 světelného roku)', order: 3, icon: '⭐' },
              { label: 'M42 (asi 1 300 světelných let)', order: 4, icon: '☁️' },
              { label: 'M31 (2,5 milionu světelných let)', order: 5, icon: '🌀' }
            ],
            explain: 'Od sekund po miliony let – a to je jen maličký kousek vesmíru.'
          },
          {
            kind: 'image',
            question: 'Který objekt je od nás nejdál?',
            options: [
              { image: 'm51', label: 'A', correct: true },
              { image: 'm42', label: 'B' }
            ],
            explain: 'M51 je 31 milionů světelných let, M42 asi 1 300. Rozdíl je ohromný.'
          }
        ],
        resultGood: '🌟 Měřič vesmíru!',
        resultOk: '🔭 Ještě jednou – hlavně to, že světelný rok je vzdálenost.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 18 – KDE JSME VE VESMÍRU
     ========================================================================== */
  {
    id: 'cosmic-address',
    icon: '🌍',
    title: 'KDE JSME VE VESMÍRU',
    teaser: 'Tvoje vesmírná adresa – od Země až po okraj toho, co vidíme.',
    minutes: '8 minut',
    badge: 'cosmic-address',
    basics: [ 'slnecna-soustava', 'mliecna-cesta', 'miestna-grupa', 'nadkopa',
              'viditelny-vesmir', 'rozpinanie-vesmiru', 'svetelny-rok' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'deepfield',
        question: '🔎 CO JE VĚTŠINA TĚCHTO SKVRN?',
        options: [
          { id: 'galaxies', icon: '🌀', label: 'celé galaxie' },
          { id: 'stars',    icon: '⭐', label: 'jednotlivé hvězdy' },
          { id: 'planets',  icon: '🪐', label: 'planety' },
          { id: 'dust',     icon: '🫧', label: 'prach na objektivu' }
        ],
        correct: 'galaxies',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Téměř každá skvrna je celá galaxie s miliardami hvězd. A tohle je jen maličký výsek ' +
                     'oblohy.',
        retryText: 'Zkus to ještě jednou. Všimni si, že ty skvrny mají tvary – spirály, ovály. Hvězda by ' +
                   'byla jen bod.',
        xp: 10
      },
      {
        type: 'info',
        title: '🌍 TVOJE VESMÍRNÁ ADRESA',
        image: 'milkyway',
        lines: [
          'Země je ve Sluneční soustavě, ta je v Mléčné dráze.',
          'Naše galaxie je součástí Místní grupy galaxií a ta zase větší nadkupy.',
          'A všechno dohromady je uvnitř toho, čemu říkáme viditelný vesmír.'
        ],
        more: [
          'Nic ve vesmíru nestojí. Země se otáčí, obíhá Slunce, Slunce obíhá střed galaxie a celá ' +
          'naše galaxie letí vůči okolním galaxiím. Všechny tyto pohyby se skládají na sebe – a ' +
          'nikde neexistuje bod, o kterém by se dalo říct, že je úplně v klidu.',
          'Vesmír se navíc rozpíná, ale ne tak, že by galaxie letěly od nás pryč do prázdna. ' +
          'Rozpíná se samotný prostor mezi nimi. Proto se nedá říct, že bychom byli ve středu: ' +
          'stejně to vypadá z každé galaxie.',
          'To, co vidíme, je jen viditelná část vesmíru – ta, odkud k nám světlo za 13,8 miliardy ' +
          'let stihlo doletět. Co je za tou hranicí, nevíme; ne proto, že by to byl konec, ale ' +
          'proto, že se k nám to světlo ještě nedostalo.'
        ],
        cta: 'Pojď na to po krocích'
      },
      { type: 'fact', factId: 'nasa-galaxia' },
      {
        type: 'cards',
        title: 'ADRESA JAKO MATRJOŠKA',
        subtitle: 'Otoč všechny čtyři karty – od nejmenšího po největší.',
        cards: [
          { icon: '🪐', name: '1. Sluneční soustava', short: 'Slunce a jeho planety.',
            text: 'Naše Slunce, osm planet a hromada měsíců, kometek a kamenů. Světlo ji přeletí za ' +
                  'několik hodin.',
            image: 'saturn', exampleLabel: 'Náš nejbližší domov' },
          { icon: '🌌', name: '2. Mléčná dráha', short: 'Naše galaxie.',
            text: 'Stovky miliard hvězd ve spirále široké 100 000 světelných let. Slunce je asi 26 000 ' +
                  'světelných let od středu.',
            image: 'milkyway', exampleLabel: 'Jsme na předměstí' },
          { icon: '👨‍👩‍👧‍👦', name: '3. Místní grupa', short: 'Naši sousedi.',
            text: 'Skupina galaxií, do které patříme i s Andromedou. Jsou v ní desítky menších galaxií.',
            image: 'm31', exampleLabel: 'Největší soused: Andromeda' },
          { icon: '🫧', name: '4. Viditelný vesmír', short: 'Kam dohlédneme.',
            text: 'Oblast, ze které k nám mohlo doletět světlo. Je široká okolo 94 miliard světelných let ' +
                  'a je v ní nespočet galaxií.',
            image: 'deepfield', exampleLabel: 'Dál než sem nedohlédneme' }
        ],
        cta: 'A kdo je hned vedle nás?',
        xp: 15
      },
      {
        type: 'compare',
        title: '⭐ KDO JSOU NAŠI SOUSEDI',
        lead: 'Nejbližší hvězdy jsou překvapivě daleko – a ty, které znáš z oblohy, nejsou ty ' +
              'nejbližší.',
        eye: {
          icon: '🔴',
          label: 'PROXIMA CENTAURI',
          art: 'starRed',
          text: 'Nejbližší hvězda po Slunci – 4,25 světelného roku. Je to malá červená hvězda a z Česka ' +
                'ji vůbec není vidět: je příliš na jihu.'
        },
        camera: {
          icon: '🔵',
          label: 'SIRIUS',
          image: 'starBlue',
          text: 'Nejjasnější hvězda noční oblohy a jedna z nejbližších – 8,6 světelného roku. Tuhle v ' +
                'zimě najdeš snadno.'
        },
        check: {
          question: 'Proč není Proxima z Česka vidět?',
          options: [
            { label: 'Je příliš na jihu – z naší zeměpisné šířky nevyjde nad obzor', correct: true,
              explain: 'Ano. Z každého místa na Zemi vidíš jinou část oblohy. Proto se astronomům vyplatí ' +
                       'cestovat.' },
            { label: 'Je příliš daleko, aby byla vidět', correct: false,
              explain: 'Vzdálenost to není – vidíme i mnohem vzdálenější věci. Problém je, kde na obloze leží.' }
          ]
        },
        cta: 'Jdeme ještě dál'
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Vesmír je starý asi 13,8 miliardy let – ale oblast, kterou vidíme, je široká okolo 94 ' +
          'miliard světelných let.',
          'Jak je to možné? Zatímco k nám to světlo letělo, prostor se neustále rozpínal. Místo, ' +
          'odkud vyrazilo, je dnes mnohem dál.'
        ],
        footnote: 'A to, co je za tou hranicí, jednoduše nevidíme – světlo odtud k nám ještě nedoletělo.',
        cta: 'To mi hlava nebere 🤯'
      },
      { type: 'fact', factId: 'vesmir-94' },
      { type: 'fact', factId: 'sirius-8-6' },
      {
        type: 'mission',
        title: '📸 MISE: NEJBLIŽŠÍ SOUSED, KTERÉHO VIDÍME',
        objectId: 'sirius',
        tasks: [
          { icon: '✏️', text: 'Napiš nebo nakresli svou vesmírnou adresu – všech pět úrovní.' },
          { icon: '📱', text: 'Ve Stellariu najdi Proximu Centauri a podívej se, proč ji odsud není vidět.' },
          { icon: '🔭', text: 'Potom najdi Sirius – v zimě nízko na jihu, pod Orionem.' },
          { icon: '📸', text: 'Vyfotografuj ho Dwarfem. Je to světlo staré 8,6 roku.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Máš ve sbírce nejjasnější hvězdu oblohy – a víš, kde ve vesmíru stojíš.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'order',
            question: 'Seřaď svou vesmírnou adresu od nejmenšího po největší.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Země', order: 1, icon: '🌍' },
              { label: 'Sluneční soustava', order: 2, icon: '🪐' },
              { label: 'Mléčná dráha', order: 3, icon: '🌌' },
              { label: 'Místní grupa galaxií', order: 4, icon: '👨‍👩‍👧‍👦' },
              { label: 'Viditelný vesmír', order: 5, icon: '🫧' }
            ],
            explain: 'Takhle vypadá tvoje adresa ve vesmíru – od domu až po okraj toho, co vidíme.'
          },
          {
            kind: 'choice',
            question: 'Která hvězda je Slunci nejblíž?',
            options: [
              { label: 'Proxima Centauri', correct: true },
              { label: 'Sirius' },
              { label: 'Polárka' },
              { label: 'Betelgeuse' }
            ],
            explain: 'Proxima je 4,25 světelného roku daleko. Sirius je druhý v pořadí z těch jasných – 8,6 ' +
                     'roku.'
          },
          {
            kind: 'truefalse',
            question: 'Sirius je nejjasnější hvězda noční oblohy hlavně proto, že je blízko.',
            answer: true,
            explain: 'Je i sám jasný, ale hlavně je jen 8,6 světelného roku daleko.'
          },
          {
            kind: 'decide',
            question: 'Vesmír je starý 13,8 miliardy let. Jak může být viditelná část široká 94 miliard ' +
                      'světelných let?',
            options: [
              { icon: '🎈', label: 'Prostor se během letu světla neustále rozpínal', correct: true },
              { icon: '🏎️', label: 'Světlo někdy letí rychleji' }
            ],
            explain: 'Světlo má vždy stejnou rychlost. Ale prostor mezi námi a jeho zdrojem se natahoval.'
          },
          {
            kind: 'image',
            question: 'Na kterém obrázku je více než jedna galaxie?',
            options: [
              { image: 'deepfield', label: 'A', correct: true },
              { image: 'm31', label: 'B' }
            ],
            explain: 'A je hluboký pohled – téměř každá skvrna je celá galaxie. B je jedna jediná: ' +
                     'Andromeda.'
          }
        ],
        resultGood: '🌟 Vesmírná adresa zapamatována!',
        resultOk: '🔭 Ještě jednou – ta matrjoška se naučí snadno.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 19 – EXOPLANETY
     ========================================================================== */
  {
    id: 'exoplanets',
    icon: '🪐',
    title: 'EXOPLANETY',
    teaser: 'Planety u jiných hvězd. Jak je vůbec umíme najít?',
    minutes: '7 minut',
    badge: 'world-finder',
    basics: [ 'exoplaneta', 'tranzit', 'obyvatelna-zona', 'orbita',
              'magnituda', 'spektrum' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'transit',
        question: '🔎 JAK ZJISTÍME, ŽE U HVĚZDY OBÍHÁ PLANETA?',
        options: [
          { id: 'dip',   icon: '📉', label: 'Hvězda na chvíli trochu ztmavne' },
          { id: 'see',   icon: '👀', label: 'Planetu přímo uvidíme na fotce' },
          { id: 'blink', icon: '✨', label: 'Planeta na nás bliká' },
          { id: 'radio', icon: '📡', label: 'Ozve se rádiem' }
        ],
        correct: 'dip',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Když planeta přejde přesně před svou hvězdou, zakryje maličkou část jejího světla. ' +
                     'Hvězda ztmavne – a to se dá změřit.',
        retryText: 'Zkus to ještě jednou. Planeta je proti hvězdě maličká a tmavá. Co se tedy stane, když ' +
                   'přejde před ní?',
        xp: 10
      },
      {
        type: 'info',
        title: '🪐 SVĚTY U JINÝCH HVĚZD',
        image: 'transit',
        lines: [
          'Planety, které obíhají u jiných hvězd, se nazývají exoplanety.',
          'Jsou tak daleko a tak slabé, že je téměř nikdy nevidíme přímo.',
          'Prozradí se tím, co dělají se světlem své hvězdy.'
        ],
        more: [
          'První způsob, jak se exoplaneta prozradí, je tranzit: když přejde přesně před svou ' +
          'hvězdou, jasnost hvězdy na chvíli klesne. Pokles je přitom směšně malý – u planety ' +
          'velikosti Jupitera asi jedno procento, u planety velikosti Země ani ne setina ' +
          'procenta.',
          'Druhý způsob je ještě překvapivější: planeta táhne gravitací svou hvězdu, takže hvězda ' +
          'okolo společného středu trochu kolísá. To kolísání se dá změřit ze změn v jejím ' +
          'spektru.',
          'Když planeta přechází před hvězdou, projde světlo hvězdy i přes okraj její atmosféry. ' +
          'Ve spektru potom přibudou čáry látek z této atmosféry – takhle se dá zjistit, z čeho ' +
          'je vzduch na planetě u jiné hvězdy.'
        ],
        cta: 'Jak přesně?'
      },
      { type: 'fact', factId: 'exoplanet-6000' },
      {
        type: 'cards',
        title: 'JAK SE HLEDAJÍ',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '📉', name: 'Tranzit', short: 'Hvězda ztmavne.',
            text: 'Planeta přejde před hvězdou a zakryje maličký kousek jejího světla. Když se to ' +
                  'zopakuje pravidelně, je to planeta – a umíme říct, jak dlouho obíhá.',
            image: 'transit', exampleLabel: 'Nejúspěšnější metoda' },
          { icon: '🥣', name: 'Obyvatelná zóna', short: 'Ani horko, ani zima.',
            text: 'Pásmo okolo hvězdy, kde může být voda tekutá. Astronomové mu říkají také zóna ' +
                  'Zlatovlásky – jako v té pohádce s kaší.',
            image: 'starYellow', exampleLabel: 'Tam hledáme život' },
          { icon: '🌡️', name: 'Divné světy', short: 'Nic jako u nás.',
            text: 'Našly se planety velké jako Jupiter, které obíhají okolo hvězdy za pár dní – a jsou ' +
                  'rozžhavené. Vesmír je mnohem divnější, než jsme čekali.',
            image: 'jupiter', exampleLabel: 'Horké jupitery' }
        ],
        cta: 'Zkusil bych to sám',
        xp: 15
      },
      {
        type: 'howto',
        title: '🔬 JAK BYS TO DĚLAL TY',
        lead: 'Tohle opravdu dělají i amatérští astronomové – s dalekohledem, jaký máš doma.',
        steps: [
          { icon: '📸', title: 'Fotíš hvězdu pořád dokola',
            text: 'Celé hodiny, jeden snímek za druhým. Nezajímá tě krása, ale jasnost té jedné hvězdy.' },
          { icon: '📊', title: 'Měříš, jak je jasná',
            text: 'Z každého snímku si zapíšeš jasnost hvězdy a nakreslíš graf. Většinu času je čára ' +
                  'rovná.' },
          { icon: '📉', title: 'Hledáš pokles',
            text: 'Když planeta přejde před hvězdou, čára na chvíli klesne a potom se vrátí. Pokles bývá ' +
                  'menší než jedno procento.' },
          { icon: '🔁', title: 'Ověříš to znovu',
            text: 'Jeden pokles nic neznamená – mohl to být mrak. Až když se přesně zopakuje, je to ' +
                  'planeta.' }
        ],
        note: 'To je věda v čisté podobě: měř, hledej vzor, ověř ho.',
        cta: 'Chápu',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'První planetu u hvězdy podobné Slunci našli až v roce 1995. Do té doby jsme o žádné ' +
          'cizí planetě nevěděli jistě.',
          'Dnes jich známe přes šest tisíc – a to je jen maličký zlomek toho, co tam podle vědců ' +
          'je.'
        ],
        footnote: 'Za jeden lidský život jsme tedy z nuly cizích světů přešli na tisíce.',
        cta: 'Jdeme se na jednu podívat'
      },
      { type: 'fact', factId: 'zlatovlaska-zona' },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'tranzit', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '📸 MISE: HVĚZDA S PLANETOU',
        objectId: 'peg51',
        tasks: [
          { icon: '📱', text: 'Ve Stellariu napiš „51 Pegasi“ – najdeš ji ve čtverci Pegasa na podzimní obloze.' },
          { icon: '🔭', text: 'Vyfotografuj ji Dwarfem. Uvidíš jen bod – to je v pořádku.' },
          { icon: '💭', text: 'Uvědom si, co jsi právě vyfotil: hvězdu, u které obíhá cizí svět.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Vyfotil jsi první hvězdu, u které lidé našli planetu. Bod na fotce – a u něj celý ' +
                  'svět.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Co je exoplaneta?',
            options: [
              { label: 'Planeta, která obíhá okolo jiné hvězdy než Slunce', correct: true },
              { label: 'Planeta, která vyletěla z galaxie' },
              { label: 'Velmi velká planeta' },
              { label: 'Planeta bez měsíce' }
            ],
            explain: 'Všechno, co obíhá okolo cizí hvězdy, je exoplaneta.'
          },
          {
            kind: 'decide',
            question: 'Jak se nejčastěji hledají?',
            options: [
              { icon: '📉', label: 'Podle toho, že hvězda pravidelně trochu ztmavne', correct: true },
              { icon: '📷', label: 'Přímým fotografováním planety' }
            ],
            explain: 'Metoda tranzitu. Přímé fotografování exoplanet se podaří jen velmi zřídka.'
          },
          {
            kind: 'truefalse',
            question: 'Obyvatelná zóna je pásmo okolo hvězdy, kde může být tekutá voda.',
            answer: true,
            explain: 'Ani horko, ani zima – proto se jí říká také zóna Zlatovlásky.'
          },
          {
            kind: 'image',
            question: 'Který obrázek ukazuje tranzit?',
            options: [
              { image: 'transit', label: 'A', correct: true },
              { image: 'ring', label: 'B' }
            ],
            explain: 'A: tmavá tečka před hvězdou a graf, kde jasnost klesla. B je planetární mlhovina.'
          },
          {
            kind: 'order',
            question: 'Seřaď, jak se potvrdí objev exoplanety.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Měřit jasnost hvězdy mnoho hodin', order: 1, icon: '📸' },
              { label: 'Nakreslit graf jasnosti', order: 2, icon: '📊' },
              { label: 'Najít v grafu pokles', order: 3, icon: '📉' },
              { label: 'Počkat, jestli se pokles pravidelně zopakuje', order: 4, icon: '🔁' }
            ],
            explain: 'Bez zopakování to není objev – mohl to být mrak nebo chyba.'
          }
        ],
        resultGood: '🌟 Hledač světů!',
        resultOk: '🔭 Ještě jednou – tranzit je celý trik.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 20 – KOMETY A METEORY
     ========================================================================== */
  {
    id: 'comets',
    icon: '☄️',
    title: 'KOMETY A METEORY',
    teaser: 'Špinavé sněhové koule a padající hvězdy, které nejsou hvězdy.',
    minutes: '7 minut',
    badge: 'comet-watcher',
    basics: [ 'kometa', 'chvost-komety', 'meteoroid', 'meteor',
              'meteorit', 'bolid', 'roj' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'comet',
        question: '🔎 Z ČEHO JE KOMETA?',
        options: [
          { id: 'ice',   icon: '🧊', label: 'z ledu a prachu' },
          { id: 'fire',  icon: '🔥', label: 'z ohně' },
          { id: 'star',  icon: '⭐', label: 'je to malá hvězda' },
          { id: 'metal', icon: '⚙️', label: 'z čistého kovu' }
        ],
        correct: 'ice',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Kometa je zmrzlá koule ledu a prachu – stará 4,6 miliardy let, tedy z časů, kdy ' +
                     'vznikala Sluneční soustava.',
        retryText: 'Zkus to ještě jednou. Kometa dostane ohon, když se přiblíží k Slunci a začne se ' +
                   'vypařovat. Co se tedy vypařuje?',
        xp: 10
      },
      {
        type: 'info',
        title: '☄️ ŠPINAVÁ SNĚHOVÁ KOULE',
        image: 'comet',
        lines: [
          'Kometa je zbytek z časů, kdy se rodila Sluneční soustava.',
          'Když přiletí blízko k Slunci, led se začne vypařovat a okolo jádra vznikne obrovský ' +
          'obal.',
          'Sluneční světlo a částice ho potom rozfoukají do dvou ohonů.'
        ],
        more: [
          'Jádro komety je malé – jen několik kilometrů – a je z ledu, prachu a zamrzlých plynů. ' +
          'Většinu času je daleko od Slunce a je úplně temné a nezajímavé. Až teplo Slunce z něj ' +
          'udělá to, co známe z fotek.',
          'Kometa má dva ohony, a to není náhoda. Prachový ohon je zakřivený a nechává se unášet ' +
          'po dráze komety, zatímco plynový ohon je namířený přesně od Slunce, protože ho ' +
          'odfukuje sluneční vítr.',
          'A pozor na jednu věc, která mnohé mýlí: ohon není za kometou jako za autem. Když ' +
          'kometa letí od Slunce, letí ohonem vpředu – směr ohonu určuje Slunce, ne pohyb komety.'
        ],
        cta: 'A co padající hvězdy?'
      },
      { type: 'fact', factId: 'kometa-dva-chvosty' },
      {
        type: 'cards',
        title: 'TŘI SLOVA, KTERÁ SI LIDÉ PLETOU',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🪨', name: 'Meteoroid', short: 'Dokud je ve vesmíru.',
            text: 'Kamínek nebo zrníčko letící vesmírem. Může být velké jako prach nebo jako malý ' +
                  'asteroid.',
            image: 'deepfield', exampleLabel: 'Ve vesmíru' },
          { icon: '🌠', name: 'Meteor', short: 'Dokud hoří v atmosféře.',
            text: 'Když zrníčko vletí do atmosféry a shoří, vidíme světelnou čáru. To je ta „padající ' +
                  'hvězda“ – i když hvězda to není.',
            image: 'meteors', exampleLabel: 'V atmosféře' },
          { icon: '🇸🇰', name: 'Meteorit', short: 'Když dopadne na zem.',
            text: 'Když kus přežije let atmosférou a dopadne, je to meteorit. Jeden takový dopadl i u ' +
                  'Příbrami.',
            image: 'moon', exampleLabel: 'Na zemi – dá se chytit' }
        ],
        cta: 'Jdeme na úkol',
        xp: 15
      },
      {
        type: 'pick',
        title: '🔎 CO JE „PADAJÍCÍ HVĚZDA“?',
        prompt: 'Který obrázek ukazuje meteory?',
        options: [
          { image: 'comet',    correct: false, explain: 'Tohle je kometa. Ta na nebi stojí celé týdny, nikam nepadá.' },
          { image: 'meteors',  correct: true,  explain: 'Ano! Meteory – zrníčka, která shořela v atmosféře. Při roji se zdá, že vylétají z ' +
                                                        'jednoho místa.' },
          { image: 'iss',      correct: false, explain: 'Tohle je přelet družice – letí pomalu a rovnoměrně, ne jako záblesk.' },
          { image: 'starBlue', correct: false, explain: 'Tohle je hvězda. Ta je od nás světelné roky a nikam nepadá.' }
        ],
        xp: 20
      },
      { type: 'fact', factId: 'perzeidy' },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          '7. dubna 1959 přeletěl nad středními Čechami bolid mnohem jasnější než Měsíc v úplňku. ' +
          'Vyfotografovaly ho hvězdárny v Ondřejově a v Prčici.',
          'Vědci pak našli čtyři úlomky o celkové hmotnosti 5,8 kilogramu. Kus vesmíru, který ' +
          'dopadl hodinu cesty od Prahy.'
        ],
        footnote: 'Máme tedy vlastní meteorit – a víme přesně, odkud přiletěl.',
        cta: 'To je super!'
      },
      { type: 'fact', factId: 'meteorit-kosice' },
      { type: 'fact', factId: 'meteorov-44-ton' },
      {
        type: 'mission',
        title: '🌠 MISE: POČÍTEJ METEORY',
        objectId: 'perseids',
        tasks: [
          { icon: '📅', text: 'Najdi si nejbližší meteorický roj – Perseidy vrcholí 12. – 13. srpna.' },
          { icon: '🛌', text: 'Lehni si na deku a koukej do široké části oblohy. Dalekohled tu není potřeba!' },
          { icon: '🔢', text: 'Počítej meteory půl hodiny a zapiš si číslo.' },
          { icon: '📸', text: 'Dwarf nechej fotit dlouhé série širokoúhle – některý meteor ti do záběru vletí sám.' }
        ],
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Meteorický roj máš ve sbírce. A tvoje číslo jsou skutečná pozorovací data.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Z čeho se skládá kometa?',
            options: [
              { label: 'Hlavně z ledu a prachu', correct: true },
              { label: 'Z horkého plynu jako hvězda' },
              { label: 'Z čistého kovu' },
              { label: 'Z lávy' }
            ],
            explain: 'Proto se jí říká špinavá sněhová koule.'
          },
          {
            kind: 'decide',
            question: 'Kamínek právě hoří v atmosféře. Jak se mu v té chvíli říká?',
            options: [
              { icon: '🌠', label: 'Meteor', correct: true },
              { icon: '🇸🇰', label: 'Meteorit' }
            ],
            explain: 'Ve vesmíru je to meteoroid, v atmosféře meteor a na zemi meteorit.'
          },
          {
            kind: 'truefalse',
            question: 'Ohon komety vždy směřuje dozadu, tam odkud kometa přiletěla.',
            answer: false,
            explain: 'Ne – ohon je vždy odfouknutý od Slunce. Když kometa letí od Slunce, má ohon vpředu!'
          },
          {
            kind: 'image',
            question: 'Který obrázek je meteorický roj?',
            options: [
              { image: 'meteors', label: 'A', correct: true },
              { image: 'comet', label: 'B' }
            ],
            explain: 'A: krátké čáry rozbíhající se z jednoho místa. B je kometa se dvěma ohony.'
          },
          {
            kind: 'order',
            question: 'Seřaď cestu jednoho zrníčka prachu.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Odpadne z komety u Slunce', order: 1, icon: '☄️' },
              { label: 'Zůstane po ní prachová stopa', order: 2, icon: '✨' },
              { label: 'Země proletí tou stopou', order: 3, icon: '🌍' },
              { label: 'Zrníčko shoří jako meteor', order: 4, icon: '🌠' }
            ],
            explain: 'Proto jsou některé roje každý rok ve stejný čas – Země prochází tou stejnou stopou.'
          }
        ],
        resultGood: '🌟 Pozorovatel komet!',
        resultOk: '🔭 Ještě jednou – hlavně ta tři slova.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 21 – TMAVÁ OBLOHA
     ========================================================================== */
  {
    id: 'darksky',
    icon: '🌑',
    title: 'TMAVÁ OBLOHA',
    teaser: 'Proč z města nejsou vidět hvězdy – a kam jít za skutečnou tmou.',
    minutes: '6 minut',
    badge: 'dark-guardian',
    basics: [ 'svetelne-znecistenie', 'magnituda', 'zenit', 'sum',
              'expozicia', 'rosa' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'citysky',
        question: '🔎 PROČ JE Z MĚSTA VIDĚT JEN MÁLO HVĚZD?',
        options: [
          { id: 'lights', icon: '💡', label: 'Světlo lamp rozsvítí celou oblohu' },
          { id: 'none',   icon: '🌌', label: 'Nad městem je méně hvězd' },
          { id: 'air',    icon: '💨', label: 'Vzduch je nad městem hustší' },
          { id: 'houses', icon: '🏢', label: 'Zakrývají je domy' }
        ],
        correct: 'lights',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Světlo lamp se odráží od prachu a vlhkosti v atmosféře a rozsvítí celou oblohu. Slabé ' +
                     'hvězdy se v té záři ztratí.',
        retryText: 'Zkus to ještě jednou. Hvězdy jsou nad městem přesně ty stejné. Co se tedy změnilo?',
        xp: 10
      },
      {
        type: 'info',
        title: '💡 OBLOHA, KTERÁ SVÍTÍ',
        image: 'citysky',
        lines: [
          'Hodně lamp svítí i nahoru, do oblohy, kde nikdo nic vidět nepotřebuje.',
          'To světlo se v atmosféře rozptýlí a obloha přestane být černá.',
          'Z města tak uvidíš pár desítek hvězd, z tmavého místa tisíce.'
        ],
        more: [
          'Světlo, které jde z lamp nahoru, se v atmosféře odrazí od molekul vzduchu a drobných ' +
          'kapiček. Obloha se tím rozsvítí a slabé hvězdy se v té záři ztratí – nejsou překryté, ' +
          'jen je už nedokážeme odlišit od pozadí.',
          'Není to jen problém pro astronomy. Noční světlo mate ptáky při migraci, přitahuje a ' +
          'vyčerpává noční motýly a mění chování mnoha živočichů.',
          'Dobrá zpráva je, že světelné znečištění zmizí v okamžiku, kdy se lampa zhasne nebo ' +
          'zastíní. Na rozdíl od většiny znečištění nic nezůstává – stačí svítit dolů a jen tam, ' +
          'kde to je potřeba.'
        ],
        cta: 'Jak velký je ten rozdíl?'
      },
      {
        type: 'compare',
        title: '🌆 MĚSTO vs. 🌌 TMAVÁ OBLOHA',
        lead: 'Ten samý večer, ta samá obloha, to samé oko. Jen jiné místo.',
        eye: {
          icon: '🌆',
          label: 'Z MĚSTA',
          art: 'citysky',
          text: 'Oranžová záře nad domy, pár nejjasnějších hvězd a Měsíc. Mléčnou dráhu neuvidíš vůbec.'
        },
        camera: {
          icon: '🌌',
          label: 'Z TMAVÉHO MÍSTA',
          image: 'milkyway',
          text: 'Tisíce hvězd, Mléčná dráha jako pás přes celé nebe a tmavé prachové oblaky v ní. ' +
                'Rozdíl je obrovský.'
        },
        check: {
          question: 'Co pomůže tvým fotkám nejvíc?',
          options: [
            { label: 'Odjet na tmavé místo za město', correct: true,
              explain: 'Ano – tmavá obloha pomůže víc než jakékoli nastavení nebo dražší dalekohled.' },
            { label: 'Nastavit v aplikaci vyšší gain', correct: false,
              explain: 'Vyšší gain zesílí i tu záři z města. Problém tím nevyřešíš.' }
          ]
        },
        cta: 'Kam tedy jet?'
      },
      { type: 'fact', factId: 'poloniny' },
      {
        type: 'howto',
        title: '🚗 JAK SI NAJÍT TMAVÉ MÍSTO',
        lead: 'Nemusíte jet až do Jizerských hor. I pár kilometrů za město je velký rozdíl.',
        steps: [
          { icon: '🗺️', title: 'Podívej se na mapu světelného znečištění',
            text: 'Na internetu jsou mapy, kde je tma. Najdi si nejbližší tmavé místo od vás.' },
          { icon: '🌑', title: 'Vyber noc bez Měsíce',
            text: 'Měsíc v úplňku rozsvítí oblohu téměř jako město. Nejlepší jsou noci okolo novu.' },
          { icon: '🔴', title: 'Nesviť si bílou baterkou',
            text: 'Oko si zvyká na tmu asi 20 minut a jedno bliknutí to zruší. Používej červené světlo.' },
          { icon: '🧥', title: 'Obleč se tepleji, než si myslíš',
            text: 'V noci se stojí na jednom místě a je zima i v létě. Deka a čaj jsou součást výbavy.' }
        ],
        note: 'A ještě jedna věc: nech oči 20 minut přivyknout tmě, než začneš hodnotit, kolik hvězd ' +
              'vidíš.',
        cta: 'Jdeme na to',
        xp: 20
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Většina lidí na Zemi už nikdy v životě neviděla Mléčnou dráhu. Ne proto, že by zmizela ' +
          '– ale proto, že žijí ve světle.',
          'Tvůj syn ji vidět může. Stačí odjet pár kilometrů.'
        ],
        footnote: 'Světelné znečištění je jediný druh znečištění, který zmizí v tu sekundu, kdy vypneš ' +
                  'vypínač.',
        cta: 'Chci to vidět'
      },

      /* ---------------- INTERAKTIVNÍ ÚLOHA (simulátor) ---------------- */
      { type: 'sim', simId: 'svetelne-znecistenie', xp: 25, bonusXp: 15 },
      {
        type: 'mission',
        title: '🔢 MISE: SPOČÍTEJ HVĚZDY',
        image: 'milkyway',
        subtitle: 'Stejný pokus na dvou místech',
        lead: 'Tohle je skutečné měření, jaké dělají i vědci při sledování světelného znečištění.',
        tasks: [
          { icon: '🏠', text: 'Doma si vyber malou část oblohy (např. čtverec Velkého vozu) a spočítej v ní hvězdy.' },
          { icon: '🚗', text: 'To samé zopakuj na tmavém místě za městem – v tom samém čtverci.' },
          { icon: '📊', text: 'Porovnej obě čísla. Rozdíl bývá i desetinásobný.' },
          { icon: '📸', text: 'A ten samý objekt vyfoť z obou míst, abys viděl rozdíl i na fotce.' }
        ],
        note: 'Nech oči nejdřív 20 minut přivyknout tmě – jinak si tmavé místo podceníš.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Právě jsi změřil světelné znečištění tam, kde žijete. To je citizen science.',
        cta: 'Poslední výzva: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč z města vidíme méně hvězd?',
            options: [
              { label: 'Světlo lamp se rozptýlí v atmosféře a rozsvítí oblohu', correct: true },
              { label: 'Nad městem je opravdu méně hvězd' },
              { label: 'Hvězdy se světla lamp bojí' },
              { label: 'Vzduch je nad městem teplejší' }
            ],
            explain: 'Hvězdy jsou tam ty samé. Jen se ztratí v záři, kterou sami vyrábíme.'
          },
          {
            kind: 'decide',
            question: 'Chceš fotit slabou galaxii. Co pomůže víc?',
            options: [
              { icon: '🚗', label: 'Odjet na tmavé místo', correct: true },
              { icon: '🎚️', label: 'Zvýšit gain na maximum' }
            ],
            explain: 'Tmavá obloha je nejlevnější a nejsilnější „vylepšení“ dalekohledu, jaké existuje.'
          },
          {
            kind: 'truefalse',
            question: 'Oko si na tmu zvyká asi 20 minut a jedno bliknutí bílou baterkou to zruší.',
            answer: true,
            explain: 'Proto astronomové používají červené světlo – to adaptaci na tmu téměř nepokazí.'
          },
          {
            kind: 'image',
            question: 'Na které obloze uvidíš Mléčnou dráhu?',
            options: [
              { image: 'milkyway', label: 'A', correct: true },
              { image: 'citysky', label: 'B' }
            ],
            explain: 'B je obloha nad městem – tam Mléčná dráha zmizí v záři lamp.'
          },
          {
            kind: 'order',
            question: 'Seřaď, jak si naplánujete výjezd za tmavou oblohou.',
            hint: 'Klikej ve správném pořadí.',
            items: [
              { label: 'Najít tmavé místo na mapě', order: 1, icon: '🗺️' },
              { label: 'Vybrat noc bez Měsíce', order: 2, icon: '🌑' },
              { label: 'Sbalit deku, čaj a červenou baterku', order: 3, icon: '🎒' },
              { label: 'Na místě dát očím 20 minut na tmu', order: 4, icon: '👀' }
            ],
            explain: 'Poslední krok lidé nejčastěji vynechají – a pak se diví, že „nic není vidět“.'
          }
        ],
        resultGood: '🌟 Ochránce tmy!',
        resultOk: '🔭 Ještě jednou – a potom rovnou ven z města.'
      }
    ]
  },

  /* ==========================================================================
     LEKCE 22 – DALEKOHLEDY
     ========================================================================== */
  {
    id: 'telescopes',
    icon: '🏛️',
    title: 'DALEKOHLEDY',
    teaser: 'Od hvězdářské kopule po Webb – a kde v tom je tvůj Dwarf.',
    minutes: '7 minut',
    badge: 'telescope-expert',
    basics: [ 'objektiv-zrkadlo', 'kupola', 'senzor', 'infracervene-svetlo',
              'zorne-pole', 'seeing', 'falosne-farby' ],
    quizXp: 100,
    steps: [
      {
        type: 'guess',
        image: 'dome',
        question: '🔎 PROČ MAJÍ HVĚZDÁRNY KULATÉ KOPULE?',
        options: [
          { id: 'turn',   icon: '🔄', label: 'Aby se daly otočit kamkoli na nebi' },
          { id: 'pretty', icon: '🎨', label: 'Protože jsou krásné' },
          { id: 'rain',   icon: '🌧️', label: 'Aby z nich stékal déšť' },
          { id: 'hide',   icon: '🙈', label: 'Aby nebyly vidět' }
        ],
        correct: 'turn',
        successTitle: '🎉 SPRÁVNĚ!',
        successText: 'Kopule se otáčí, takže úzkou štěrbinu můžeš namířit kamkoli. A protože je otevřená jen ' +
                     'ta štěrbina, vítr dalekohledem netřese.',
        retryText: 'Zkus to ještě jednou. Dalekohled se musí podívat do každého koutu oblohy. Co tedy musí ' +
                   'kopule zvládnout?',
        xp: 10
      },
      {
        type: 'info',
        title: '🏛️ ČÍM VĚTŠÍ ZRCADLO, TÍM VÍC SVĚTLA',
        image: 'dome',
        lines: [
          'Dalekohled je v podstatě kbelík na světlo. Čím větší, tím víc nasbírá.',
          'Proto mají velké dalekohledy zrcadla – velké zrcadlo se dá vyrobit snadněji než velká ' +
          'čočka.',
          'A staví se na horách, kde je nad nimi méně vzduchu a méně světla z měst.'
        ],
        more: [
          'Zvětšení není to nejdůležitější číslo dalekohledu, i když to tak na obalech vypadá. ' +
          'Podstatný je průměr zrcadla nebo čočky, protože ten určuje, kolik světla dalekohled ' +
          'nasbírá a jak slabé objekty tedy vůbec uvidí.',
          'Velký průměr navíc lépe rozlišuje detaily. Proto se staví dalekohledy s ' +
          'desetimetrovými zrcadly – a proto se několik menších dá spojit tak, aby fungovaly jako ' +
          'jeden obrovský.',
          'Největším nepřítelem ostrosti je vzduch. Proto stojí velké observatoře na vysokých ' +
          'horách v poušti a proto se některé dalekohledy posílají přímo do vesmíru, kde nad nimi ' +
          'už není žádná atmosféra.'
        ],
        cta: 'A ty ve vesmíru?'
      },
      { type: 'fact', factId: 'hubble-webb' },
      {
        type: 'cards',
        title: 'TŘI DALEKOHLEDY, TŘI SVĚTY',
        subtitle: 'Otoč všechny tři karty.',
        cards: [
          { icon: '🛰️', name: 'Hubble', short: 'Nad atmosférou.',
            text: 'Zrcadlo 2,4 metru, obíhá asi 560 km nad Zemí. Nad atmosférou nic nerozostřuje obraz – ' +
                  'proto jsou jeho fotky tak ostré.',
            image: 'm31', exampleLabel: 'Vidí to, co i naše oko' },
          { icon: '🔭', name: 'Webb', short: 'V infračerveném světle.',
            text: 'Odletěl 25. prosince 2021 až 1,5 milionu kilometrů od Země. Vidí v infračerveném ' +
                  'světle, takže dohlédne skrz prach a hlouběji do minulosti.',
            image: 'deepfield', exampleLabel: 'Vidí to, co oko nevidí' },
          { icon: '🏠', name: 'Tvůj Dwarf', short: 'Ten samý princip.',
            text: 'Objektiv 30 mm, stojí na stativu v zahradě. Sbírá světlo dlouho a skládá snímky – ' +
                  'přesně jako ty velké. Jen v menším.',
            image: 'm42', exampleLabel: 'Vidí překvapivě mnoho' }
        ],
        cta: 'Porovnejme to',
        xp: 15
      },
      {
        type: 'compare',
        title: '🔍 TVOJE FOTKA vs. HUBBLE',
        lead: 'Ten samý objekt, dva velmi rozdílné přístroje – a přesto překvapivě mnoho společného.',
        eye: {
          icon: '🏠',
          label: 'DWARF ZE ZAHRADY',
          art: 'roundstars',
          text: 'Objektiv 30 mm, pod atmosférou, pár desítek minut. Uvidíš tvar mlhoviny, její barvy i ' +
                'hvězdy v ní.'
        },
        camera: {
          icon: '🛰️',
          label: 'HUBBLE Z ORBITY',
          image: 'm42',
          text: 'Zrcadlo 2,4 m, nad atmosférou, často desítky hodin. Vidí detaily, které jsou pro malý ' +
                'dalekohled nedosažitelné.'
        },
        check: {
          question: 'Čím to hlavně je, že Hubble vidí víc?',
          options: [
            { label: 'Má mnohem větší zrcadlo a je nad atmosférou', correct: true,
              explain: 'Ano – větší „kbelík“ na světlo a žádný rozmazávající vzduch. Princip je ale úplně ' +
                       'stejný jako u tvého Dwarfu.' },
            { label: 'Je mnohem blíž k mlhovině', correct: false,
              explain: 'To ne. Proti 1 300 světelným rokům je 560 km nad Zemí úplně zanedbatelné.' }
          ]
        },
        cta: 'Jdeme to porovnat doopravdy'
      },
      {
        type: 'wow',
        title: '🤯 POČKEJ…',
        lines: [
          'Sbírat světlo dlouho, skládat mnoho snímků, přesně sledovat oblohu – to samé dělá ' +
          'Hubble, Webb i tvůj Dwarf.',
          'Rozdíl je ve velikosti zrcadla a v ceně. Ne v tom, jak to funguje.'
        ],
        footnote: 'Takže když fotíš mlhovinu ze zahrady, děláš přesně to, co nejdražší přístroje lidstva.',
        cta: 'To je paráda'
      },
      { type: 'fact', factId: 'dwarf-bratranec' },
      {
        type: 'mission',
        title: '🔍 MISE: MOJE FOTKA vs. HUBBLE',
        image: 'm42',
        subtitle: 'Porovnej to nejlepší, co máš, s tím nejlepším na světě',
        lead: 'Ne proto, abys se cítil malý – ale abys viděl, kolik z toho máš i ty.',
        tasks: [
          { icon: '🖼️', text: 'Otevři si svou nejlepší fotku M42 (nebo jiného objektu).' },
          { icon: '🛰️', text: 'Najdi si tu samou mlhovinu na stránce ESA/Hubble (odkaz je na obrazovce Zdroje).' },
          { icon: '🔎', text: 'Najdi tři věci, které jsou vidět na obou fotkách.' },
          { icon: '💭', text: 'A jednu, kterou vidí jen Hubble. Zkus říct proč.' }
        ],
        note: 'Tři věci na obou fotkách jsou víc, než by většina lidí čekala od 30milimetrového ' +
              'objektivu.',
        button: '✅ MISE SPLNĚNA',
        xp: 50,
        doneText: 'Tohle je nejlepší konec akademie: víš, co máš v rukou – i co to dokáže.',
        cta: 'Naposledy: mini test'
      },
      {
        type: 'quiz',
        title: '🧠 MINI TEST',
        questions: [
          {
            kind: 'choice',
            question: 'Proč mají velké dalekohledy zrcadla, a ne čočky?',
            options: [
              { label: 'Velké zrcadlo se dá vyrobit snadněji než velká čočka', correct: true },
              { label: 'Zrcadla jsou barevnější' },
              { label: 'Čočky se ve vesmíru rozbijí' },
              { label: 'Zrcadla jsou levnější na čištění' }
            ],
            explain: 'Zrcadlo se dá podepřít zezadu a nemusí být průhledné – proto se dá udělat opravdu ' +
                     'velké.'
          },
          {
            kind: 'decide',
            question: 'Proč se hvězdárny staví na horách?',
            options: [
              { icon: '⛰️', label: 'Je nad nimi méně vzduchu a méně světla z měst', correct: true },
              { icon: '🚠', label: 'Aby byly blíž k hvězdám' }
            ],
            explain: 'Blíž k hvězdám se hora nepočítá. Ale čistý a nehybný vzduch ano.'
          },
          {
            kind: 'truefalse',
            question: 'Webb obíhá okolo Země podobně jako Hubble.',
            answer: false,
            explain: 'Webb je 1,5 milionu kilometrů od Země – to je čtyřikrát dál než Měsíc. Hubble je jen ' +
                     '560 km nad námi.'
          },
          {
            kind: 'image',
            question: 'Který obrázek je hvězdárna s kopulí?',
            options: [
              { image: 'dome', label: 'A', correct: true },
              { image: 'citysky', label: 'B' }
            ],
            explain: 'A: kopule s úzkou štěrbinou pod hvězdnou oblohou. B je obloha nad městem.'
          },
          {
            kind: 'order',
            question: 'Seřaď dalekohledy podle velikosti zrcadla či objektivu.',
            hint: 'Klikej od nejmenšího.',
            items: [
              { label: 'Dwarf mini (objektiv 30 mm)', order: 1, icon: '🏠' },
              { label: 'Hubble (zrcadlo 2,4 m)', order: 2, icon: '🛰️' },
              { label: 'Webb (zrcadlo 6,5 m)', order: 3, icon: '🔭' },
              { label: 'ELT v Chile (zrcadlo 39 m)', order: 4, icon: '🏛️' }
            ],
            explain: 'Od 3 centimetrů po 39 metrů – a princip je celou dobu ten samý.'
          }
        ],
        resultGood: '🌟 Znalec dalekohledů – a konec akademie!',
        resultOk: '🔭 Ještě jednou – a máš celou akademii za sebou.'
      }
    ]
  }

  /* Další lekce se přidávají sem – stačí dodržet stejnou strukturu. */
];

/* =============================================================================
   PŘIPRAVOVANÉ LEKCE – zobrazují se ve Vesmírné mapě jako „už brzy“.
   Když lekci opravdu vytvoříš v LESSONS, stačí ji odtud vymazat.
   ========================================================================== */
const UPCOMING = [
  { icon: '🌍', title: 'POLÁRNÍ ZÁŘE',      teaser: 'Proč obloha svítí zeleně – a kdy je vidět i u nás.' },
  { icon: '🚀', title: 'SONDY A ROVERY',     teaser: 'Voyager, Perseverance – kam jsme už dolétli.' },
  { icon: '🪐', title: 'TRPASLIČÍ PLANETY', teaser: 'Proč Pluto přestalo být planetou.' },
  { icon: '🔊', title: 'ZVUKY VESMÍRU',      teaser: 'Rádiová astronomie a co „slyší“ dalekohledy.' },
  { icon: '👽', title: 'JE TAM NĚKDO?',     teaser: 'Jak lidé hledají život ve vesmíru.' }
];

/* ---------------------------- ODZNAKY -------------------------------- */
const BADGES = {
  'nebula-hunter': {
    icon: '☁️',
    name: 'LOVEC MLHOVIN',
    text: 'Zvládl jsi celou lekci o mlhovinách.'
  },
  'sky-navigator': {
    icon: '🧭',
    name: 'NAVIGÁTOR OBLOHY',
    text: 'Víš, proč se obloha točí – a jak ji Dwarf dokáže sledovat.'
  },
  'cluster-collector': {
    icon: '✨',
    name: 'SBĚRATEL HVĚZDOKUP',
    text: 'Rozeznáš otevřenou hvězdokupu od kulové.'
  },
  'milkyway-citizen': {
    icon: '🌌',
    name: 'OBYVATEL MLÉČNÉ DRÁHY',
    text: 'Víš, kde v galaxii žiješ – a proč ji vidíme jako pás.'
  },
  'galaxy-explorer': {
    icon: '🌀',
    name: 'OBJEVITEL GALAXIÍ',
    text: 'Znáš tvary galaxií a vyfotil jsi tu v Andromedě.'
  },
  'planet-hunter': {
    icon: '🪐',
    name: 'LOVEC PLANET',
    text: 'Víš, proč planety putují – a jak je správně fotit.'
  },
  'star-expert': {
    icon: '⭐',
    name: 'ZNALEC HVĚZD',
    text: 'Z barvy hvězdy umíš říct, jak je horká.'
  },
  'supernova-witness': {
    icon: '💥',
    name: 'SVĚDEK SUPERNOVY',
    text: 'Víš, jak umírají velké hvězdy – a co po nich zůstane.'
  },
  'darkness-scout': {
    icon: '⚫',
    name: 'PRŮZKUMNÍK TEMNOTY',
    text: 'Víš, co je černá díra a jak se dá vyfotit.'
  },
  'dwarf-operator': {
    icon: '🔭',
    name: 'OPERÁTOR DWARFU',
    text: 'Víš, co v Dwarfu nastavit a na co si dát pozor.'
  },
  'sun-watcher': {
    icon: '☀️',
    name: 'SLUNEČNÍ HLÍDKA',
    text: 'Vyfotil jsi vlastní hvězdu – bezpečně, s filtrem.'
  },
  'phase-keeper': {
    icon: '🌗',
    name: 'STRÁŽCE FÁZÍ',
    text: 'Víš, proč Měsíc mění tvar, a zvládl jsi desetidenní projekt.'
  },
  'sky-cartographer': {
    icon: '🗺️',
    name: 'KARTOGRAF OBLOHY',
    text: 'Najdeš si na nebi objekt podle jeho adresy.'
  },
  'sky-tracker': {
    icon: '🛰️',
    name: 'SLEDOVAČ OBLOHY',
    text: 'Zachytil jsi přelet vesmírné stanice.'
  },
  'astrophoto-master': {
    icon: '📸',
    name: 'ASTROFOTO MISTR',
    text: 'Víš, proč sto snímků bije jeden.'
  },
  'light-reader': {
    icon: '🔬',
    name: 'ČTENÁŘ SVĚTLA',
    text: 'Rozložil jsi světlo na barvy a víš, co v něm astronomové čtou.'
  },
  'distance-meter': {
    icon: '📏',
    name: 'MĚŘIČ VESMÍRU',
    text: 'Odkráčel jsi Sluneční soustavu a víš, co je světelný rok.'
  },
  'cosmic-address': {
    icon: '🌍',
    name: 'VESMÍRNÁ ADRESA',
    text: 'Víš přesně, kde ve vesmíru žiješ.'
  },
  'world-finder': {
    icon: '🪐',
    name: 'HLEDAČ SVĚTŮ',
    text: 'Rozumíš tomu, jak se hledají planety u jiných hvězd.'
  },
  'comet-watcher': {
    icon: '☄️',
    name: 'POZOROVATEL KOMETY',
    text: 'Počítal jsi meteory a víš, jaký je rozdíl mezi meteorem a meteoritem.'
  },
  'dark-guardian': {
    icon: '🌑',
    name: 'OCHRÁNCE TMY',
    text: 'Změřil jsi světelné znečištění tam, kde žiješ.'
  },
  'telescope-expert': {
    icon: '🏛️',
    name: 'ZNALEC DALEKOHLEDŮ',
    text: 'Porovnal jsi vlastní fotku s Hubblovou – a víš, proč se liší.'
  }
};

/* ---------------------------- ÚROVNĚ --------------------------------- */
/* Stačí přidat další řádek a úroveň funguje. */
const LEVELS = [
  { xp: 0,    name: 'Astronom začátečník' },
  { xp: 150,  name: 'Pozorovatel' },
  { xp: 400,  name: 'Astronom' },
  { xp: 700,  name: 'Deep-Sky Explorer' },
  { xp: 1100, name: 'Mistr oblohy' },
  { xp: 1600, name: 'Kapitán vesmíru' },
  { xp: 2200, name: 'Průzkumník galaxií' },
  { xp: 2900, name: 'Vesmírný navigátor' },
  { xp: 3700, name: 'Velmistr oblohy' },
  { xp: 4100, name: 'Legenda Vesmírné akademie' }
];

/* ---------------------------- ZDROJE --------------------------------- */
const SOURCES = [
  { label: 'NASA – Messier 42 (Orionova mlhovina)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/' },
  { label: 'NASA Space Place – What Is a Nebula?', url: 'https://spaceplace.nasa.gov/nebula/en' },
  { label: 'ESA/Hubble – Hubble’s sharpest view of the Orion Nebula', url: 'https://esahubble.org/images/heic0601a/' },
  { label: 'ESA/Hubble – Ring Nebula (Messier 57)', url: 'https://esahubble.org/images/heic1310a/' },
  { label: 'ESA/Hubble – Whirlpool Galaxy (M51)', url: 'https://esahubble.org/images/heic0506a/' },
  { label: 'ESA/Hubble – Omega Centauri', url: 'https://esahubble.org/images/heic0809a/' },
  { label: 'ESA/Hubble – Latest Saturn Portrait', url: 'https://esahubble.org/images/heic1917a/' },
  { label: 'ESO – The Carina Nebula', url: 'https://www.eso.org/public/images/eso0905a/' },
  { label: 'ESO – Messier 78, a reflection nebula in Orion', url: 'https://www.eso.org/public/images/eso1105b/' },
  { label: 'ESO – The Horsehead Nebula', url: 'https://www.eso.org/public/images/eso0202a/' },
  { label: 'DwarfLab – oficiální stránka dalekohledu', url: 'https://dwarflab.com/' },
  { label: 'DwarfLab – DWARF mini (parametry, 90 s expozice v režimu EQ)', url: 'https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope' },
  { label: 'DwarfLab Help – DWARF mini EQ Mode Setup Guide', url: 'https://help.dwarflab.com/en/docs/dwarf-mini-equatorial-setup-guide' },
  { label: 'NASA – What Is the North Star and How Do You Find It?', url: 'https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/' },
  { label: 'NASA – There’s More to the North Star Than Meets the Eye', url: 'https://science.nasa.gov/missions/hubble/theres-more-to-the-north-star-than-meets-the-eye/' },
  { label: 'NASA Space Place – How Long Is One Day on Other Planets?', url: 'https://spaceplace.nasa.gov/days/en/' },
  { label: 'NASA – Milky Way (Imagine the Universe)', url: 'https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html' },
  { label: 'NASA – Messier 45 (Plejády)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/' },
  { label: 'NASA – Messier 13 (kulová hvězdokupa v Herkulovi)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/' },
  { label: 'NASA – Messier 31 (Andromeda)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/' },
  { label: 'NASA – Messier 51 (galaxie Vír)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/' },
  { label: 'NASA – Messier 1 (Krabí mlhovina)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/' },
  { label: 'NASA – Saturn: fakta', url: 'https://science.nasa.gov/saturn/facts/' },
  { label: 'NASA – Jupiter: měsíce', url: 'https://science.nasa.gov/jupiter/jupiter-moons/' },
  { label: 'NASA – Měsíc: fakta', url: 'https://science.nasa.gov/moon/facts/' },
  { label: 'NASA – Seeing Double (dvojhvězdy)', url: 'https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/' },
  { label: 'NASA – barvy a teploty hvězd', url: 'https://imagine.gsfc.nasa.gov/science/activities/try_l1/stars_solution.html' },
  { label: 'ESO / EHT – první fotografie černé díry v naší galaxii', url: 'https://www.eso.org/public/news/eso2208-eht-mw/' },
  { label: 'ESO – panoráma Mléčné dráhy', url: 'https://www.eso.org/public/images/eso0932a/' },
  { label: 'ESO – Plejády', url: 'https://www.eso.org/public/images/b11/' },
  { label: 'ESA/Hubble – srážka s Andromedou není jistá (2025)', url: 'https://esahubble.org/news/heic2508/' },
  { label: 'ESA/Hubble – Andromeda (M31), Krabí mlhovina (M1), M13', url: 'https://esahubble.org/images/' }
];
