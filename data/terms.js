/* =============================================================================
   SLOVNÍČEK POJMŮ  (data/terms.js)
   -----------------------------------------------------------------------------
   Krok „📖 ZÁKLADY“ na začátku každé lekce a zároveň trvalá obrazovka
   📖 Slovníček. Pojem se dá použít v libovolném počtu lekcí – vysvětlí se jednou
   a odemkne se do sbírky.

   Struktura jedné položky:
     group   – skupina pro filtrování: fotenie | prístroj | obloha | objekty | vesmír
     icon    – emoji
     name    – název pojmu
     short   – 2 – 5 slov, co to je (zobrazí se modrým pod názvem)
     text    – 1 – 2 věty vysvětlení dětskou řečí
     compare – NEPOVINNÉ: dva obrázky vedle sebe (např. málo vs. hodně)
     image   – NEPOVINNÉ: jeden obrázek (id z data/images.js)
     warn    – NEPOVINNÉ: upozornění „na co si dát pozor“

   JAK PŘIDAT POJEM DO LEKCE: do lekce v data/lessons.js přidej pole
     basics: ['expozicia', 'gain', …]
   Krok se základy se vloží automaticky hned za hádanku.
   ========================================================================== */

const TERMS = {

  /* ======================= FOTENIE ====================================== */
  expozicia: {
    group: 'fotenie', icon: '⏱️', name: 'Expozice', short: 'jak dlouho sbírá světlo',
    text: 'Čas, během kterého senzor sbírá světlo pro jeden snímek. Krátká expozice = tmavá ' +
          'fotka, dlouhá = jasná.',
    compare: {
      left:  { label: 'Krátká (2 s)', image: 'faintNebula', note: 'Mlhovinu spíš tušíš, než vidíš.' },
      right: { label: 'Dlouhá (60 s)', image: 'cleanNebula', note: 'Nasbíralo se dost světla – mlhovina je tam.' }
    },
    warn: 'Bez EQ režimu se při dlouhé expozici začnou hvězdy kroutit do obloučků.',
    deep: 'Senzor funguje jako kbelík pod kapajícím kohoutkem: každý foton je jedna kapka. ' +
          'Dvakrát delší expozice znamená dvakrát více nasbíraného světla. Proto expozice přidává ' +
          'skutečné světlo, zatímco gain jen zesiluje to, co už v „kbelíku“ je.'
  },
  gain: {
    group: 'fotenie', icon: '🎚️', name: 'Gain', short: 'zesílení signálu',
    text: 'Jako když přidáš hlasitost na rádiu: přidá jasnost, ale spolu s ní i šum. Pro mlhoviny ' +
          'se hodí 60 – 80.',
    compare: {
      left:  { label: 'Nízký gain', image: 'faintNebula', note: 'Tmavší, ale čisté.' },
      right: { label: 'Vysoký gain', image: 'noisyNebula', note: 'Jasnější, ale fotka „sněží“.' }
    },
    deep: 'Gain nepřidá ani jeden foton – jen zesílí číslo, které senzor naměří. Spolu se ' +
          'signálem se přitom zesílí i šum, a navíc se nejjasnější místa snáz přepálí. Proto se ' +
          'nejprve snažíme prodloužit expozici a gain zvyšujeme až tehdy, když to jinak nejde.'
  },
  snimka: {
    group: 'fotenie', icon: '🖼️', name: 'Snímek', short: 'jeden záběr',
    text: 'Jedna fotka z mnoha. Dwarf jich nafotí stovky a potom je složí do jedné výsledné.'
  },
  skladanie: {
    group: 'fotenie', icon: '🧩', name: 'Skládání snímků', short: 'stovky fotek v jedné',
    text: 'Šum je v každém snímku jinde, objekt je vždy na tomtéž místě. Když se snímky složí, ' +
          'šum se vyruší a objekt zůstane.',
    compare: {
      left:  { label: '1 snímek', image: 'noisyNebula', note: 'Plný zrníček a šumu.' },
      right: { label: '200 snímků', image: 'cleanNebula', note: 'Hladké pozadí, jasný objekt.' }
    },
    deep: 'Šum je náhodný, takže se při skládání částečně vyruší, zatímco objekt se sečte. Platí ' +
          'pravidlo odmocniny: čtyřikrát více snímků = poloviční šum, stokrát více snímků = ' +
          'desetkrát menší šum. Proto se od určitého počtu snímků další přidávání už téměř ' +
          'neprojeví a radši se prodlouží expozice.'
  },
  sum: {
    group: 'fotenie', icon: '❄️', name: 'Šum', short: 'zrníčka na fotce',
    text: 'Náhodné světlé a tmavé tečky, které vyrábí samotný senzor. Vypadá to, jako by na fotce ' +
          'sněžilo.',
    image: 'noisyNebula',
    deep: 'Šum má dva zdroje. Jeden je samotný senzor a jeho elektronika, druhý je fyzika světla: ' +
          'fotony přilétají náhodně, takže i úplně dokonalý senzor by v krátkém snímku naměřil ' +
          'jednou o něco více a jednou o něco méně. Ten druhý se nedá odstranit – dá se jen ' +
          'přehlušit delším sbíráním světla.'
  },
  ostrenie: {
    group: 'fotenie', icon: '🎯', name: 'Zaostření', short: 'hvězda jako malý bod',
    text: 'Když je zaostřeno správně, hvězdy jsou maličké ostré body. Pokud jsou z nich kuličky, ' +
          'je to rozostřené.',
    compare: {
      left:  { label: 'Ostré', image: 'roundstars', note: 'Hvězdy jsou body – to chceme.' },
      right: { label: 'Rozostřené', image: 'blurStars', note: 'Hvězdy jsou kuličky – je potřeba doostřit.' }
    },
    warn: 'Rozostřenou fotku už nic nezachrání. Zaostření se kontroluje před fotografováním.',
    deep: 'Hvězda je tak daleko, že by měla být na fotce jediný bod. Pokud je z ní měkká kulička, ' +
          'světlo se nesbíhá přesně na senzoru. Zaostřuj proto vždy na jasnou hvězdu a hledej ' +
          'polohu, ve které je bod nejmenší – ne nejjasnější. A pozor: když se v noci ochladí, ' +
          'kov se stáhne a ostrost se může rozladit, takže se vyplatí ji občas zkontrolovat.'
  },
  darkframe: {
    group: 'fotenie', icon: '⬛', name: 'Dark frame', short: 'snímek se zakrytým objektivem',
    text: 'Fotka „tmy“, kterou se od výsledné odečte šum senzoru. Musí mít stejnou expozici a ' +
          'gain jako normální snímky.',
    warn: 'Musí být nafocená při podobné teplotě – rozdíl větší než 8 °C už nepomáhá.',
    deep: 'Senzor si i v úplné tmě něco „vymýšlí“: některé pixely jsou trvale světlejší a teplo ' +
          'přidává další signál. Dark snímek je fotka s uzavřeným objektivem při stejné expozici ' +
          'a teplotě – tedy přesně to, co senzor vyrobil sám. Když se odečte od skutečných ' +
          'snímků, tyto chyby zmizí.'
  },
  kalibracia: {
    group: 'fotenie', icon: '🧭', name: 'Kalibrace', short: 'Dwarf zjistí, kam se dívá',
    text: 'Dwarf vyfotí kousek oblohy, rozpozná vzor hvězd a porovná ho se svou mapou. Až potom ' +
          'ví, kam se má otočit.',
    warn: 'Pod hustými mraky kalibrace selže – je potřeba počkat na díru v oblačnosti.',
    deep: 'Kalibrační snímky nezlepšují objekt – odstraňují chyby přístroje. Darky odstraní to, ' +
          'co si senzor vymýšlí sám, flaty rovnoměrně osvětlené plochy odstraní stopy prachu a ' +
          'tmavší okraje objektivu. Dwarf většinu této práce dělá za tebe na pozadí.'
  },
  'az-rezim': {
    group: 'fotenie', icon: '🧭', name: 'AZ režim', short: 'doleva-doprava, nahoru-dolů',
    text: 'Nejjednodušší nastavení: postavíš Dwarf a jede. Objekt sleduje, ale obraz se mu přitom ' +
          'pomalu otáčí.',
    image: 'startrails',
    deep: 'V AZ režimu se Dwarf otáčí nahoru-dolů a doleva-doprava. Hvězdu ve středu tím udrží, ' +
          'ale celý obrázek se přitom pomalu přetáčí okolo ní – jako kdybys fotku na stole otáčel ' +
          'prstem. Při krátkých expozicích to nevadí, při dlouhých se hvězdy na okrajích začnou ' +
          'krčit do obloučků.'
  },
  'eq-rezim': {
    group: 'fotenie', icon: '⚙️', name: 'EQ režim', short: 'otáčí se jako obloha',
    text: 'Dwarf nakloníš tak, aby jedna jeho osa směřovala k Polárce. Potom stačí jediný pohyb, ' +
          'který kopíruje otáčení Země.',
    compare: {
      left:  { label: 'AZ · 90 sekund', image: 'startrails', note: 'Hvězdy se stočily do obloučků.' },
      right: { label: 'EQ · 90 sekund', image: 'roundstars', note: 'Hvězdy zůstaly okrouhlé.' }
    },
    deep: 'EQ režim funguje tak, že se Dwarf otáčí okolo téže osy, okolo jaké se točí Země – jen ' +
          'opačným směrem a stejně rychle. Vůči hvězdám tak stojí úplně nehybně a obrázek se ' +
          'nepřetáčí. Právě proto se Dwarf nejprve nakloní na úhel zeměpisné šířky a otočí na ' +
          'Polárku.'
  },
  'zorne-pole': {
    group: 'fotenie', icon: '🔲', name: 'Zorné pole', short: 'jak velký kus oblohy vidí',
    text: 'Dwarf mini zabere 2,45 stupně – asi jako pět Měsíců vedle sebe. Větší objekty se do ' +
          'něj celé nevejdou.',
    compare: {
      left:  { label: 'Vejde se', image: 'm44', note: 'Jesličky jsou akorát.' },
      right: { label: 'Nevejde se', image: 'm31', note: 'Andromeda je na nebi širší.' }
    },
    deep: 'Zorné pole se měří ve stupních, protože na nebi nemá smysl měřit v centimetrech – ' +
          'všechno je jinak daleko. Dwarf mini vidí naráz pás oblohy široký 2,45 stupně, což je ' +
          'asi pět Měsíců vedle sebe. Objekt větší než to se do záběru celý nevejde, i kdyby byl ' +
          'jakkoli jasný.'
  },
  'nd-filter': {
    group: 'fotenie', icon: '🛡️', name: 'Sluneční ND filtr', short: 'povinný u Slunce',
    text: 'Tmavý filtr, který zeslabí světlo Slunce na bezpečnou úroveň. K Dwarfu mini je ' +
          'přiložený v balení.',
    image: 'sun',
    warn: 'Na Slunce nikdy nemiř bez filtru – ani na sekundu, ani „jen rychle“. Zničí senzor i ' +
          'oči.'
  },
  'svetelne-znecistenie': {
    group: 'fotenie', icon: '💡', name: 'Světelné znečištění', short: 'lampy rozsvítí oblohu',
    text: 'Světlo lamp se rozptýlí v atmosféře a obloha přestane být černá. Slabé objekty se v té ' +
          'záři ztratí.',
    compare: {
      left:  { label: 'Z města', image: 'citysky', note: 'Pár hvězd a oranžová záře.' },
      right: { label: 'Z tmavého místa', image: 'milkyway', note: 'Tisíce hvězd a Mléčná dráha.' }
    },
    deep: 'Světlo z lamp, které jde nahoru, se odrazí od molekul vzduchu a drobných kapek a ' +
          'rozsvítí celou oblohu. Slabé hvězdy tím nejsou překryté – jen je už nedokážeme odlišit ' +
          'od svítícího pozadí. Proto pomáhá odjet za město víc než koupit si větší dalekohled.'
  },
  seeing: {
    group: 'fotenie', icon: '💨', name: 'Nepokojný vzduch (seeing)', short: 'proč hvězdy blikají',
    text: 'Vzduch nad námi se vlní jako voda a obraz hvězdy rozechvěje. Proto jsou fotky nízko ' +
          'nad obzorem rozmazané.',
    warn: 'Fotografovat je potřeba co nejvýš na obloze – ideálně nad 30 stupni nad obzorem.',
    deep: 'Vzduch nad námi se neustále míchá a různě teplé vrstvy lámou světlo trochu jinak. ' +
          'Obraz hvězdy se proto chvíli od chvíle mihne a rozmaže. To je hlavní důvod, proč se ' +
          'velké observatoře staví na vysokých horách a proč ani ten nejlepší dalekohled na Zemi ' +
          'nevidí tak ostře jako ten ve vesmíru.'
  },
  rosa: {
    group: 'fotenie', icon: '💧', name: 'Rosa', short: 'vlhkost na objektivu',
    text: 'V noci se objektiv ochladí a zarosí se. Fotky se začnou zahalovat a ztratí kontrast – ' +
          'to je konec pozorování.',
    warn: 'Když fotky náhle zblednou, první věc, kterou zkontroluj, je objektiv.'
  },
  terminator: {
    group: 'fotenie', icon: '🌗', name: 'Terminátor', short: 'hranice světla a tmy',
    text: 'Na Měsíci linie mezi dnem a nocí. Právě tam vrhají hory a krátery dlouhé stíny, takže ' +
          'jsou nejlépe vidět.',
    compare: {
      left:  { label: 'Úplněk', image: 'moon', note: 'Jasný, ale plochý – žádné stíny.' },
      right: { label: 'Čtvrť', image: 'moonphase', note: 'Krátery vrhají stíny a vystoupí.' }
    }
  },
  'falosne-farby': {
    group: 'fotenie', icon: '🎨', name: 'Falešné barvy', short: 'barvy, které oko nevidí',
    text: 'Na fotkách z Hubbla jsou často barvy přiřazené neviditelnému světlu, abychom viděli, ' +
          'co tam opravdu je. Není to podvod – je to jako termokamera.',
    image: 'm1'
  },

  /* ======================= PŘÍSTROJ ==================================== */
  senzor: {
    group: 'přístroj', icon: '📷', name: 'Senzor', short: 'čip, který počítá světlo',
    text: 'Malý čip, který místo filmu zachycuje světlo. Dwarf mini má senzor velký asi jako ' +
          'nehet na malíčku.'
  },
  'objektiv-zrkadlo': {
    group: 'přístroj', icon: '🔭', name: 'Objektiv a zrcadlo', short: 'dva způsoby sběru světla',
    text: 'Dalekohled je kbelík na světlo. Malé přístroje používají čočky (objektiv), velké ' +
          'zrcadla – velké zrcadlo se dá vyrobit snáz než velká čočka.',
    image: 'dome'
  },
  kupola: {
    group: 'přístroj', icon: '🏛️', name: 'Kopule', short: 'otočná střecha hvězdárny',
    text: 'Okrouhlá střecha, která se otáčí, aby se úzká štěrbina dala namířit kamkoli. Otevřená ' +
          'je jen ta štěrbina, takže vítr dalekohledem netřese.',
    image: 'dome'
  },
  'infracervene-svetlo': {
    group: 'přístroj', icon: '🌡️', name: 'Infračervené světlo', short: 'světlo, které oko nevidí',
    text: 'Světlo s delší vlnou, než dokáže naše oko zachytit. Projde i skrz prach – proto ho ' +
          'používá dalekohled Webb.',
    image: 'deepfield'
  },

  /* ======================= OBLOHA ====================================== */
  suhvezdie: {
    group: 'obloha', icon: '🗺️', name: 'Souhvězdí', short: 'dílek mapy oblohy',
    text: 'Políčko na mapě oblohy, ne skupina hvězd, které patří k sobě. Hvězdy jednoho souhvězdí ' +
          'jsou od sebe často stovky světelných let.',
    image: 'polaris'
  },
  suradnice: {
    group: 'obloha', icon: '📍', name: 'Souřadnice (RA a Dec)', short: 'adresa objektu na nebi',
    text: 'Jako má město zeměpisnou šířku a délku, tak má objekt na nebi deklinaci a rektascenzi. ' +
          'Dwarf se podle nich otočí sám.',
    image: 'transit'
  },
  'vyska-nad-obzorom': {
    group: 'obloha', icon: '📐', name: 'Výška nad obzorem', short: 'jak vysoko objekt je',
    text: 'Měří se ve stupních: obzor je 0°, přímo nad hlavou je 90°. Pro pěkné fotky chceme ' +
          'objekt výš než 30°.',
    warn: 'Nízko nad obzorem se díváš přes nejvíc rozvířený vzduch – radši počkej, až objekt ' +
          'vystoupí.'
  },
  zenit: {
    group: 'obloha', icon: '⬆️', name: 'Zenit', short: 'bod přímo nad hlavou',
    text: 'Místo na obloze přesně nad tebou. Tam je vzduchu nejméně, takže obraz je nejostřejší.'
  },
  magnituda: {
    group: 'obloha', icon: '✨', name: 'Magnituda (jasnost)', short: 'menší číslo = jasnější',
    text: 'Divné, ale pravdivé: čím menší číslo, tím jasnější objekt. Sirius má −1,5, volným okem ' +
          'uvidíš asi do 6.',
    compare: {
      left:  { label: 'Jasná (−1,5)', image: 'starBlue', note: 'Je vidět i z města.' },
      right: { label: 'Slabá (8,4)', image: 'faintStar', note: 'Tu najde jen dalekohled.' }
    },
    deep: 'Stupnice je naopak, než by člověk čekal: čím menší číslo, tím jasnější objekt. ' +
          'Vymysleli ji staří Řekové, kteří nejjasnější hvězdy nazvali „první velikosti“ a ' +
          'nejslabší „šesté“. Nejjasnější objekty mají proto i minusová čísla – Sirius má −1,5 a ' +
          'Slunce −26,7.'
  },
  'svetelny-rok': {
    group: 'obloha', icon: '📏', name: 'Světelný rok', short: 'vzdálenost, ne čas',
    text: 'Vzdálenost, kterou světlo přeletí za jeden rok – 9,46 bilionu kilometrů. Navzdory ' +
          'jménu je to vzdálenost.',
    image: 'deepfield',
    deep: 'Světelný rok je vzdálenost, ne čas – to je nejčastější záměna. Je to stejné, jako když ' +
          'řekneš, že je to „dvě hodiny autem“. A má i vedlejší efekt: když je hvězda 100 ' +
          'světelných let daleko, vidíš ji takovou, jaká byla před sto lety.'
  },
  'svetelna-minuta': {
    group: 'obloha', icon: '⏳', name: 'Světelná minuta', short: 'co světlo přeletí za minutu',
    text: 'Slunce je od nás 8 světelných minut. Vždy ho tedy vidíš takové, jaké bylo před osmi ' +
          'minutami.',
    image: 'sun'
  },
  'hviezdny-den': {
    group: 'obloha', icon: '🌍', name: 'Hvězdný den', short: '23 hodin 56 minut',
    text: 'Vůči hvězdám se Země otočí za 23 h 56 min – ne za 24. Proto každá hvězda vychází každý ' +
          'večer o 4 minuty dříve.',
    deep: 'Země se okolo své osy otočí za 23 hodin a 56 minut. Abychom viděli Slunce znovu na ' +
          'tomtéž místě, musí se otočit o kousek víc, protože se mezitím posunula po své dráze – ' +
          'a to nám dá 24 hodin. Ty čtyři minuty rozdílu jsou důvod, proč hvězdy vycházejí každý ' +
          'den o něco dřív a proč v létě a v zimě vidíme jiná souhvězdí.'
  },
  'rotacia-oblohy': {
    group: 'obloha', icon: '🔄', name: 'Otáčení oblohy', short: '15 stupňů za hodinu',
    text: 'Nehýbe se obloha, ale my. Země se otáčí a nám se zdá, že se hvězdy každou hodinu ' +
          'posunou o 15 stupňů.',
    image: 'startrails'
  },
  'nebesky-pol': {
    group: 'obloha', icon: '⭐', name: 'Nebeský pól', short: 'bod, okolo kterého se točí obloha',
    text: 'Místo na nebi, kam ukazuje zemská osa. Hned u něj stojí Polárka, a proto nikdy ' +
          'nezapadá.',
    image: 'polaris',
    deep: 'Nebeský pól je místo, kam směřuje osa Země. Je to jediný bod na obloze, který se ' +
          'nehýbe – všechno ostatní se okolo něj točí. Na severní polokouli je tam téměř přesně ' +
          'Polárka, a proto je tak užitečná: ukazuje sever a zároveň úhel, na který se naklání EQ ' +
          'režim.'
  },
  faza: {
    group: 'obloha', icon: '🌘', name: 'Fáze Měsíce', short: 'kolik osvětlené části vidíme',
    text: 'Slunce vždy osvětluje přesně polovinu Měsíce. Mění se jen to, jak velkou část té ' +
          'poloviny odsud vidíme. Celý koloběh trvá 29,5 dne.',
    image: 'moonphase',
    deep: 'Osvětlená je vždy přesně polovina Měsíce, ta otočená ke Slunci – to se nikdy nemění. ' +
          'Mění se jen úhel, ze kterého se na tu osvětlenou polovinu díváme ze Země. Proto fáze ' +
          'nejsou stín Země; stín Země padne na Měsíc jen při zatmění.'
  },
  zatmenie: {
    group: 'obloha', icon: '🌑', name: 'Zatmění', short: 'jedno těleso zakryje druhé',
    text: 'Při zatmění Slunce se Měsíc dostane mezi Zemi a Slunce. Při zatmění Měsíce se Země ' +
          'dostane mezi Slunce a Měsíc a hodí na něj stín.',
    warn: 'Na zatmění Slunce se dívej jen přes filtr. Zatmění Měsíce je úplně bezpečné.'
  },
  'tidalne-uzamknutie': {
    group: 'obloha', icon: '🌚', name: 'Slapové uzamčení', short: 'stále stejná strana',
    text: 'Měsíc se okolo své osy otočí přesně jednou za jeden oběh okolo Země. Proto k nám vždy ' +
          'otáčí tutéž stranu.',
    image: 'moon',
    deep: 'Měsíc se okolo své osy otočí přesně jednou za jeden oběh Země, a proto k nám má stále ' +
          'otočenou tutéž tvář. Není to náhoda: gravitace Země Měsíc po miliardy let tahala a ' +
          'zpomalovala, až se jeho otáčení synchronizovalo s oběhem. Totéž se stalo mnoha měsícům ' +
          'jiných planet.'
  },
  precesia: {
    group: 'obloha', icon: '🎡', name: 'Precese', short: 'zemská osa se kývá',
    text: 'Zemská osa se kývá jako roztočený vlček – jedno kývnutí trvá asi 26 000 let. Proto se ' +
          'v průběhu tisíciletí mění severní hvězda.',
    deep: 'Osa Země se nedrží na jednom místě – velmi pomalu opisuje kruh, jako když se vykloněný ' +
          'vlček kolébá. Jeden takový kruh trvá asi 26 000 let. Znamená to, že Polárka nebyla ' +
          'vždy polárkou a jednou opět přestane být: před pěti tisíci lety byla nejblíž k pólu ' +
          'hvězda Thuban v Drakovi.'
  },
  druzica: {
    group: 'obloha', icon: '🛰️', name: 'Družice (satelit)', short: 'stroj obíhající Zemi',
    text: 'Nesvítí sama – vidíme na ní odraz Slunce. Letí pomalu, rovnoměrně a nikdy nebliká jako ' +
          'letadlo.',
    image: 'iss'
  },
  meteoroid: {
    group: 'obloha', icon: '🪨', name: 'Meteoroid', short: 'kamínek ve vesmíru',
    text: 'Kousek skály nebo prachu, který letí vesmírem. Dokud je ve vesmíru, říká se mu ' +
          'meteoroid.'
  },
  meteor: {
    group: 'obloha', icon: '🌠', name: 'Meteor', short: 'dokud hoří v atmosféře',
    text: 'Když meteoroid vletí do atmosféry a shoří, vidíme světelnou čáru. To je meteor – ta ' +
          '„padající hvězda“, která vůbec není hvězda.',
    image: 'meteors',
    deep: 'Tři slova, která se snadno popletou. Meteoroid je kamínek, který letí vesmírem. Meteor ' +
          'je světelná stopa, která vznikne, když takový kamínek vletí do atmosféry a rozžhaví ' +
          'vzduch před sebou. Meteorit je to, co z něj dopadne až na zem – a to se stane jen ' +
          'zřídka.'
  },
  meteorit: {
    group: 'obloha', icon: '🇸🇰', name: 'Meteorit', short: 'když dopadne na zem',
    text: 'Kus, který přežil let atmosférou a dopadl. Jeden takový dopadl v roce 1959 i u ' +
          'Příbrami.'
  },
  bolid: {
    group: 'obloha', icon: '💥', name: 'Bolid', short: 'velmi jasný meteor',
    text: 'Mimořádně jasný meteor – někdy jasnější než Měsíc v úplňku. Bývá ho vidět i za dne a ' +
          'občas po něm zůstane meteorit.'
  },
  roj: {
    group: 'obloha', icon: '🌌', name: 'Meteorický roj', short: 'hodně meteorů najednou',
    text: 'Když Země proletí prachovou stopou komety, meteory zdánlivě vylétají z jednoho místa ' +
          'na nebi. Nejznámější jsou srpnové Perseidy.',
    image: 'meteors'
  },
  kometa: {
    group: 'obloha', icon: '☄️', name: 'Kometa', short: 'špinavá sněhová kule',
    text: 'Zmrzlá kule ledu a prachu stará 4,6 miliardy let. U Slunce se začne vypařovat a ' +
          'vyroste jí ohon.',
    image: 'comet'
  },
  'chvost-komety': {
    group: 'obloha', icon: '💫', name: 'Ohon komety', short: 'vždy míří od Slunce',
    text: 'Kometa má dva ohony – prachový a plynový. Sluneční světlo a částice je odfouknou vždy ' +
          'směrem od Slunce, i když kometa letí zpátky.',
    image: 'comet'
  },
  tranzit: {
    group: 'obloha', icon: '📉', name: 'Tranzit', short: 'planeta přejde před hvězdou',
    text: 'Když planeta přejde přesně před svou hvězdou, zakryje malinkou část jejího světla. ' +
          'Hvězda na chvíli ztmavne a to se dá změřit.',
    image: 'transit',
    deep: 'Když planeta přejde přesně před svou hvězdou, zakryje malý zlomek jejího světla a ' +
          'jasnost na chvíli klesne. Pokles je směšně malý: u planety velikosti Jupitera asi ' +
          'jedno procento, u planety velikosti Země ani ne setina procenta. Právě z hloubky ' +
          'tohoto poklesu astronomové vypočítají, jak velká planeta je.'
  },
  spektrum: {
    group: 'obloha', icon: '🌈', name: 'Spektrum', short: 'světlo rozložené na barvy',
    text: 'Když světlo rozložíš, dostaneš duhu. V ní jsou tmavé čáry – otisky prvků, ze kterých ' +
          'je hvězda.',
    image: 'spectrum',
    deep: 'Každý plyn pohltí a vyzáří světlo jen v přesně určených barvách, takže má vlastní ' +
          '„čárový kód“. Když astronom tyto čáry ve spektru uvidí, ví s jistotou, které látky ve ' +
          'hvězdě jsou, i když je nepředstavitelně daleko. Helium lidé takto našli nejdřív ve ' +
          'spektru Slunce a teprve potom na Zemi.'
  },
  'cerveny-posun': {
    group: 'obloha', icon: '🏃', name: 'Červený posun', short: 'objekt se vzdaluje',
    text: 'Když se objekt od nás vzdaluje, celý vzor čar v jeho spektru se posune k červené. ' +
          'Právě tak jsme zjistili, že se vesmír rozpíná.',
    image: 'spectrum',
    deep: 'Když se objekt od nás vzdaluje, celý jeho čárový kód se ve spektru posune k červené. ' +
          'Je to to samé, co slyšíš na sirénách: když auto uhání od tebe, tón se sníží. U ' +
          'vzdálených galaxií červený posun nezpůsobuje jejich let prostorem, ale to, že se sám ' +
          'prostor mezi námi rozpíná.'
  },

  /* ======================= OBJEKTY ===================================== */
  hmlovina: {
    group: 'objekty', icon: '☁️', name: 'Mlhovina', short: 'oblak plynu a prachu',
    text: 'Obrovský oblak plynu a prachu ve vesmíru. V některých se rodí hvězdy, jiné vzniknou, ' +
          'když hvězda umírá.',
    image: 'm42'
  },
  'plyn-a-prach': {
    group: 'objekty', icon: '🫧', name: 'Plyn a prach', short: 'z čeho jsou mlhoviny',
    text: 'Plyn je většinou vodík, prach jsou malinká zrnka menší než mouka. Z této směsi se rodí ' +
          'hvězdy i planety.',
    image: 'carina'
  },
  'typy-hmlovin': {
    group: 'objekty', icon: '🔥', name: 'Typy mlhovin', short: 'emisní, reflexní, temná, planetární',
    text: 'Emisní svítí sama, reflexní odráží světlo blízké hvězdy, temná zakrývá světlo za sebou ' +
          'a planetární je pozůstatek umírající hvězdy.',
    compare: {
      left:  { label: 'Emisní', image: 'm42', note: 'Plyn svítí vlastním světlem.' },
      right: { label: 'Planetární', image: 'ring', note: 'Vrstvy odhozené starou hvězdou.' }
    },
    deep: 'Rozdíl mezi typy mlhovin je v tom, odkud berou světlo. Emisní mlhovina září sama, ' +
          'protože ji ultrafialové světlo blízkých horkých hvězd rozsvítí. Reflexní jen odráží ' +
          'světlo hvězd, jako prachová stěna v promítacím sále, a proto je modrá. Tmavá mlhovina ' +
          'světlo jen pohlcuje a vidíme ji jako díru ve hvězdném poli. Planetární nemá s ' +
          'planetami nic společného – je to odfouknutý obal umírající hvězdy.'
  },
  hviezdokopa: {
    group: 'objekty', icon: '✨', name: 'Hvězdokupa', short: 'hvězdy narozené spolu',
    text: 'Skupina hvězd, které vznikly naráz z jednoho oblaku. Otevřená je mladá a volná, kulová ' +
          'stará a namačkaná.',
    compare: {
      left:  { label: 'Otevřená', image: 'm45', note: 'Plejády – mladé, volně rozsypané.' },
      right: { label: 'Kulová', image: 'm13', note: 'M13 – sto tisíc hvězd v kouli.' }
    },
    deep: 'Hvězdy v jedné hvězdokupě se zrodily ve stejném oblaku a přibližně ve stejnou dobu, ' +
          'takže jsou opravdu sourozenci. Astronomům to hodně pomáhá: když zjistí věk jedné, ' +
          'znají věk všech. Otevřené hvězdokupy jsou mladé a gravitace galaxie je po několika ' +
          'stovkách milionů let rozpustí, kdežto kulové jsou staré téměř jako vesmír a drží ' +
          'spolu.'
  },
  galaxia: {
    group: 'objekty', icon: '🌀', name: 'Galaxie', short: 'ostrov miliard hvězd',
    text: 'Obrovský ostrov hvězd, plynu a prachu držený pohromadě gravitací. Naše se jmenuje ' +
          'Mléčná dráha.',
    image: 'm31',
    deep: 'Tvar galaxie prozradí její minulost. Spirály mají ještě dost plynu, a proto v nich ' +
          'stále vznikají nové hvězdy. Eliptické galaxie plyn už spotřebovaly a jsou plné starých ' +
          'červených hvězd – často vznikly tak, že se dvě velké galaxie srazily a splynuly.'
  },
  'typy-galaxii': {
    group: 'objekty', icon: '🥚', name: 'Typy galaxií', short: 'spirální, eliptická, nepravidelná',
    text: 'Spirální má disk a ramena, eliptická je kule starých hvězd a nepravidelná nemá tvar – ' +
          'často proto, že do ní narazila jiná galaxie.',
    compare: {
      left:  { label: 'Spirální', image: 'm51', note: 'Ramena, ve kterých se rodí hvězdy.' },
      right: { label: 'Eliptická', image: 'omegacen', note: 'Kule starých hvězd, bez ramen.' }
    }
  },
  hviezda: {
    group: 'objekty', icon: '⭐', name: 'Hvězda', short: 'kule plynu, která svítí sama',
    text: 'Obrovská kule plynu, která ve svém středu vyrábí energii, a proto svítí. Naše Slunce ' +
          'je úplně obyčejná hvězda – jen blízko.',
    image: 'starYellow'
  },
  'farba-teplota': {
    group: 'objekty', icon: '🌈', name: 'Barva a teplota hvězdy', short: 'modrá horká, červená chladná',
    text: 'Barva prozradí teplotu povrchu. Je to naopak, než jak to máme na kohoutcích s vodou.',
    compare: {
      left:  { label: 'Modrá – horká', image: 'starBlue', note: 'I desítky tisíc stupňů.' },
      right: { label: 'Červená – chladná', image: 'starRed', note: 'Nejchladnější z hvězd.' }
    },
    deep: 'Všechno horké svítí, a čím je něco žhavější, tím je to modřejší. Rozžhavený drát ve ' +
          'staré žárovce je oranžový, plamen sporáku modrý – a s hvězdami je to přesně tak. Proto ' +
          'se dá teplota povrchu hvězdy změřit jednoduše tím, že se změří její barva.'
  },
  dvojhviezda: {
    group: 'objekty', icon: '👯', name: 'Dvojhvězda', short: 'dvě hvězdy, co se obíhají',
    text: 'Dvě hvězdy, které se navzájem obíhají. Volným okem vypadají jako jedna, v dalekohledu ' +
          'se rozdělí.',
    image: 'albireo'
  },
  'opticka-dvojica': {
    group: 'objekty', icon: '🎭', name: 'Optická dvojice', short: 'jen vypadá blízko',
    text: 'Dvě hvězdy, které se nám promítnou blízko sebe, ale ve skutečnosti jsou od sebe hodně ' +
          'daleko a nic je nespojuje.',
    image: 'albireo'
  },
  'biely-karlik': {
    group: 'objekty', icon: '⚪', name: 'Bílý trpaslík', short: 'jádro mrtvé hvězdy',
    text: 'Malý, velmi hustý zbytek hvězdy podobné Slunci. Už nevyrábí energii, jen pomalu ' +
          'chladne.',
    image: 'ring',
    deep: 'Když hvězdě jako Slunce skončí palivo, odfoukne svůj vnější obal a zůstane z ní jen ' +
          'horké jádro velké asi jako Země. Nic v něm už nehoří – jen pomalu chladne, a to ' +
          'miliony miliard let. Je přitom tak neuvěřitelně hustý, že jedna lžička jeho hmoty by ' +
          'na Zemi vážila několik tun.'
  },
  planeta: {
    group: 'objekty', icon: '🪐', name: 'Planeta', short: 'nesvítí, odráží světlo',
    text: 'Obíhá okolo hvězdy a nesvítí sama – vidíme na ní odraz slunečního světla. Na nebi se ' +
          'mezi hvězdami pomalu přesouvá.',
    image: 'saturn'
  },
  'plynny-obor': {
    group: 'objekty', icon: '🟠', name: 'Plynný obr', short: 'planeta bez pevného povrchu',
    text: 'Obrovská planeta z plynu, jako Jupiter nebo Saturn. Nemá povrch, na který by se dalo ' +
          'stoupnout.',
    image: 'jupiter'
  },
  mesiac: {
    group: 'objekty', icon: '🌙', name: 'Měsíc', short: 'obíhá okolo planety',
    text: 'Těleso, které obíhá okolo planety. Náš Měsíc je široký 3 480 km a je v průměru 384 400 ' +
          'km daleko.',
    image: 'moon'
  },
  supernova: {
    group: 'objekty', icon: '💥', name: 'Supernova', short: 'výbuch velké hvězdy',
    text: 'Když velké hvězdě skončí palivo, její střed se zhroutí a hvězda vybuchne. Na několik ' +
          'týdnů svítí jako miliardy Sluncí.',
    image: 'm1'
  },
  'neutronova-hviezda': {
    group: 'objekty', icon: '💫', name: 'Neutronová hvězda', short: 'město, těžké jako Slunce',
    text: 'Zbytek středu hvězdy po výbuchu. Je velká jako město, ale váží víc než celé Slunce.',
    image: 'neutron'
  },
  pulzar: {
    group: 'objekty', icon: '🔆', name: 'Pulzar', short: 'maják, který bliká',
    text: 'Neutronová hvězda, která se otáčí tak rychle, že k nám její paprsky blikají jako ' +
          'maják. Ten v Krabí mlhovině blikne 30krát za sekundu.',
    image: 'neutron'
  },
  'cierna-diera': {
    group: 'objekty', icon: '⚫', name: 'Černá díra', short: 'neuteče ani světlo',
    text: 'Místo, kde je hmota namačkaná tak, že její gravitace nepustí ven ani světlo. Proto ji ' +
          'nevidíme přímo.',
    image: 'sgra',
    deep: 'Černá díra není díra ani vysavač – je to obyčejná hmota namačkaná do neuvěřitelně ' +
          'malého místa. Kdybys Slunce stlačil do kule s průměrem asi šest kilometrů, stala by se ' +
          'z něj černá díra, ale planety by okolo něj obíhaly přesně tak jako dnes. Nebezpečná je ' +
          'jen zblízka.'
  },
  'horizont-udalosti': {
    group: 'objekty', icon: '🚫', name: 'Horizont událostí', short: 'hranice bez návratu',
    text: 'Neviditelná hranice okolo černé díry. Co ji překročí, už se nikdy nevrátí – ani ' +
          'světlo.',
    image: 'sgra',
    deep: 'Horizont událostí není žádný povrch, na který by se dalo narazit. Je to jen hranice, ' +
          'za kterou by i světlo muselo letět rychleji než světlo, aby se dostalo ven – a to ' +
          'nedokáže nic. Proto je černá díra na fotkách černá: ne proto, že by tam nic nebylo, ' +
          'ale proto, že odtud k nám nemůže přiletět žádné světlo.'
  },
  supermasivna: {
    group: 'objekty', icon: '🌌', name: 'Supermasivní černá díra', short: 've středu galaxií',
    text: 'Černá díra vážící miliony až miliardy Sluncí. Sedí ve středu skoro každé velké galaxie ' +
          '– ta naše se jmenuje Sagittarius A*.',
    image: 'sgra'
  },
  exoplaneta: {
    group: 'objekty', icon: '🪐', name: 'Exoplaneta', short: 'planeta u jiné hvězdy',
    text: 'Planeta, která obíhá okolo jiné hvězdy než Slunce. Známe jich už přes 6 000, i když je ' +
          'téměř nikdy nevidíme přímo.',
    image: 'transit'
  },
  'obyvatelna-zona': {
    group: 'objekty', icon: '🥣', name: 'Obyvatelná zóna', short: 'ani horko, ani zima',
    text: 'Pásmo okolo hvězdy, kde může být voda tekutá. Říká se jí také zóna Zlatovlásky – jako ' +
          'v té pohádce s kaší.',
    image: 'starYellow',
    deep: 'Obyvatelná zóna je pásek okolo hvězdy, ve kterém není ani příliš horko, ani příliš ' +
          'zima, takže tam může na povrchu planety vydržet tekutá voda. U chladnějších hvězd je ' +
          'blíž, u teplejších dál. Neznamená to, že tam život je – jen že tam není vyloučený.'
  },
  'slnecne-skvrny': {
    group: 'objekty', icon: '🟤', name: 'Sluneční skvrny', short: 'chladnější místa na Slunci',
    text: 'Místa na povrchu Slunce, která jsou chladnější než okolí, a proto se zdají tmavá. ' +
          'Největší jsou širší než celá Země.',
    image: 'sun'
  },
  'slnecny-cyklus': {
    group: 'objekty', icon: '🔄', name: 'Sluneční cyklus', short: 'asi 11 let',
    text: 'Počet slunečních skvrn stoupá a klesá v cyklu asi 11 let. Když je skvrn hodně, bývá ' +
          'víc polárních září.',
    image: 'sun'
  },

  /* ======================= VESMÍR ====================================== */
  'slnecna-soustava': {
    group: 'vesmír', icon: '🪐', name: 'Sluneční soustava', short: 'Slunce a všechno okolo něj',
    text: 'Slunce, osm planet, jejich měsíce, komety a kameny. Světlo ji proletí za několik ' +
          'hodin.',
    image: 'saturn'
  },
  'mliecna-cesta': {
    group: 'vesmír', icon: '🌌', name: 'Mléčná dráha', short: 'naše galaxie',
    text: 'Spirální galaxie s příčkou, široká asi 100 000 světelných let. Slunce je asi 26 000 ' +
          'světelných let od jejího středu.',
    image: 'milkyway'
  },
  'galakticky-disk': {
    group: 'vesmír', icon: '💿', name: 'Disk a ramena', short: 'plochá část galaxie',
    text: 'Většina hvězd galaxie je v plochém disku se spirálními rameny. V ramenech je nejvíc ' +
          'plynu, a proto se tam rodí nové hvězdy.',
    image: 'm51'
  },
  halo: {
    group: 'vesmír', icon: '🔵', name: 'Halo', short: 'kule okolo galaxie',
    text: 'Obrovská řídká kule okolo disku galaxie. Obíhají v ní staré kulové hvězdokupy.',
    image: 'm13'
  },
  'miestna-grupa': {
    group: 'vesmír', icon: '👨‍👩‍👧‍👦', name: 'Místní grupa', short: 'naši galaktičtí sousedé',
    text: 'Skupina galaxií, do které patří naše Mléčná dráha i Andromeda. Jsou v ní desítky ' +
          'menších galaxií.',
    image: 'm31'
  },
  nadkopa: {
    group: 'vesmír', icon: '🕸️', name: 'Nadkupa galaxií', short: 'skupina skupin',
    text: 'Ještě větší struktura: mnoho skupin galaxií spojených gravitací do obrovských vláken.',
    image: 'deepfield'
  },
  'viditelny-vesmir': {
    group: 'vesmír', icon: '🫧', name: 'Viditelný vesmír', short: 'kam dohlédneme',
    text: 'Oblast, ze které k nám mohlo doletět světlo – široká okolo 94 miliard světelných let. ' +
          'Dál jednoduše nedohlédneme.',
    image: 'deepfield'
  },
  'rozpinanie-vesmiru': {
    group: 'vesmír', icon: '🎈', name: 'Rozpínání vesmíru', short: 'prostor se natahuje',
    text: 'Prostor mezi galaxiemi se neustále natahuje. Proto je viditelný vesmír širší, než jak ' +
          'dlouho vesmír existuje.',
    image: 'deepfield',
    deep: 'Vesmír se nerozpíná tak, že by galaxie letěly do prázdna. Rozpíná se sám prostor mezi ' +
          'nimi, jako když se nadouvá balon s nakreslenými tečkami – každá tečka se vzdaluje od ' +
          'každé. Proto se nedá říct, kde je střed: stejně to vypadá z každé galaxie.'
  },
  gravitacia: {
    group: 'vesmír', icon: '🍎', name: 'Gravitace', short: 'všechno se navzájem přitahuje',
    text: 'Síla, kterou se každá dvě tělesa přitahují. Drží pohromadě hvězdokupy, galaxie i tvoje ' +
          'nohy na zemi.'
  },
  orbita: {
    group: 'vesmír', icon: '🔁', name: 'Orbita (oběh)', short: 'dráha okolo jiného tělesa',
    text: 'Cesta, po které jedno těleso obíhá okolo druhého. Měsíc obejde Zemi za 27 dní, Země ' +
          'Slunce za rok.',
    deep: 'Objekt na orbitě ve skutečnosti padá – jen letí dopředu tak rychle, že se mu Země ' +
          'stále zakřivuje pod ním a nikdy do ní nenarazí. Proto lidé na vesmírné stanici plavou: ' +
          'nejsou bez gravitace, ale v neustálém volném pádu. Kdo letí níž, musí letět rychleji.'
  },
  'astronomicka-jednotka': {
    group: 'vesmír', icon: '📐', name: 'Astronomická jednotka', short: 'Země – Slunce',
    text: 'Vzdálenost Země od Slunce, tedy asi 150 milionů kilometrů. Používá se k měření ve ' +
          'Sluneční soustavě.',
    image: 'sun',
    deep: 'Používá se proto, že ve Sluneční soustavě jsou kilometry nepraktické a světelné roky ' +
          'zbytečně velké: Saturn je 9,5 AU daleko a Neptun 30 AU. Světlo proletí jednu ' +
          'astronomickou jednotku za osm minut – přesně tolik je Slunce „staré“, když ho vidíš.'
  }
};
