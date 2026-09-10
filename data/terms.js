/* =============================================================================
   SLOVNÍČEK POJMOV  (data/terms.js)
   -----------------------------------------------------------------------------
   Krok „📖 ZÁKLADY“ na začiatku každej lekcie a zároveň trvalá obrazovka
   📖 Slovníček. Pojem sa dá použiť v ľubovoľnom počte lekcií – vysvetlí sa raz
   a odomkne sa do zbierky.

   Štruktúra jednej položky:
     group   – skupina pre filtrovanie: fotenie | prístroj | obloha | objekty | vesmír
     icon    – emoji
     name    – názov pojmu
     short   – 2 – 5 slov, čo to je (zobrazí sa modrým pod názvom)
     text    – 1 – 2 vety vysvetlenia detskou rečou
     compare – NEPOVINNÉ: dva obrázky vedľa seba (napr. málo vs. veľa)
     image   – NEPOVINNÉ: jeden obrázok (id z data/images.js)
     warn    – NEPOVINNÉ: upozornenie „na čo si dať pozor“

   AKO PRIDAŤ POJEM DO LEKCIE: do lekcie v data/lessons.js pridaj pole
     basics: ['expozicia', 'gain', …]
   Krok so základmi sa vloží automaticky hneď za hádanku.
   ========================================================================== */

const TERMS = {

  /* ======================= FOTENIE ====================================== */
  expozicia: {
    group: 'fotenie', icon: '⏱️', name: 'Expozícia', short: 'ako dlho zbiera svetlo',
    text: 'Čas, počas ktorého senzor zbiera svetlo pre jednu snímku. Krátka expozícia = tmavá fotka, dlhá = jasná.',
    compare: {
      left:  { label: 'Krátka (2 s)', image: 'faintNebula', note: 'Hmlovinu skôr tušíš, než vidíš.' },
      right: { label: 'Dlhá (60 s)', image: 'cleanNebula', note: 'Nazbieralo sa dosť svetla – hmlovina je tam.' }
    },
    warn: 'Bez EQ režimu sa pri dlhej expozícii začnú hviezdy krčiť do oblúčikov.',
    deep: 'Senzor funguje ako vedro pod kvapkajúcim kohútikom: každý fotón je jedna kvapka. Dvakrát ' +
          'dlhšia expozícia znamená dvakrát viac nazbieraného svetla. Preto expozícia pridáva skutočné ' +
          'svetlo, kým gain len zosilňuje to, čo už v „vedre“ je.'
  },
  gain: {
    group: 'fotenie', icon: '🎚️', name: 'Gain', short: 'zosilnenie signálu',
    text: 'Ako keď pridáš hlasitosť na rádiu: pridá jasnosť, ale spolu s ňou aj šum. Pre hmloviny sa hodí 60 – 80.',
    compare: {
      left:  { label: 'Nízky gain', image: 'faintNebula', note: 'Tmavšie, ale čisté.' },
      right: { label: 'Vysoký gain', image: 'noisyNebula', note: 'Jasnejšie, ale fotka „sneží“.' }
    },
    deep: 'Gain nepridá ani jeden fotón – len zosilní číslo, ktoré senzor odmeria. Spolu so signálom sa ' +
          'pritom zosilní aj šum, a navyše sa najjasnejšie miesta ľahšie prepália. Preto sa najprv ' +
          'snažíme predĺžiť expozíciu a gain zvyšujeme až vtedy, keď to inak nejde.'
  },
  snimka: {
    group: 'fotenie', icon: '🖼️', name: 'Snímka', short: 'jeden záber',
    text: 'Jedna fotka z mnohých. Dwarf ich nafotí stovky a potom ich poskladá do jednej výslednej.'
  },
  skladanie: {
    group: 'fotenie', icon: '🧩', name: 'Skladanie snímok', short: 'stovky fotiek v jednej',
    text: 'Šum je v každej snímke inde, objekt je vždy na tom istom mieste. Keď sa snímky poskladajú, šum sa vyruší a objekt zostane.',
    compare: {
      left:  { label: '1 snímka', image: 'noisyNebula', note: 'Plná zrniečok a šumu.' },
      right: { label: '200 snímok', image: 'cleanNebula', note: 'Hladké pozadie, jasný objekt.' }
    },
    deep: 'Šum je náhodný, takže sa pri skladaní čiastočne vyruší, kým objekt sa nasčíta. Platí ' +
          'odmocninové pravidlo: štyrikrát viac snímok = polovičný šum, stokrát viac snímok = desaťkrát ' +
          'menší šum. Preto sa od určitého počtu snímok už ďalšie pridávanie takmer neprejaví a radšej ' +
          'sa predĺži expozícia.'
  },
  sum: {
    group: 'fotenie', icon: '❄️', name: 'Šum', short: 'zrniečka na fotke',
    text: 'Náhodné svetlé a tmavé bodky, ktoré vyrába samotný senzor. Vyzerá to, akoby na fotke snežilo.',
    image: 'noisyNebula',
    deep: 'Šum má dva zdroje. Jeden je samotný senzor a jeho elektronika, druhý je fyzika svetla: ' +
          'fotóny prilietavajú náhodne, takže aj úplne dokonalý senzor by v krátkej snímke odmeril raz ' +
          'o niečo viac a raz o niečo menej. Ten druhý sa nedá odstrániť – dá sa len prehlušiť dlhším ' +
          'zbieraním svetla.'
  },
  ostrenie: {
    group: 'fotenie', icon: '🎯', name: 'Zaostrenie', short: 'hviezda ako malý bod',
    text: 'Keď je zaostrené správne, hviezdy sú maličké ostré body. Ak sú z nich guľičky, je to rozostrené.',
    compare: {
      left:  { label: 'Ostré', image: 'roundstars', note: 'Hviezdy sú body – to chceme.' },
      right: { label: 'Rozostrené', image: 'blurStars', note: 'Hviezdy sú guľičky – treba doostriť.' }
    },
    warn: 'Rozostrenú fotku už nič nezachráni. Zaostrenie sa kontroluje pred fotením.',
    deep: 'Hviezda je tak daleko, že by mala byť na fotke jediný bod. Ak je z nej mäkká gulička, svetlo ' +
          'sa nezbieha presne na senzore. Zaostruj preto vždy na jasnú hviezdu a hľadaj polohu, v ' +
          'ktorej je bod najmenší – nie najjasnejší. A pozor: keď sa v noci ochladí, kov sa stiahne a ' +
          'ostrosť sa môže rozladiť, takže sa vyplatí ju občas skontrolovať.'
  },
  darkframe: {
    group: 'fotenie', icon: '⬛', name: 'Dark frame', short: 'snímka so zakrytým objektívom',
    text: 'Fotka „tmy“, ktorou sa od výslednej odpočíta šum senzora. Musí mať rovnakú expozíciu a gain ako normálne snímky.',
    warn: 'Musí byť nafotená pri podobnej teplote – rozdiel väčší než 8 °C už nepomáha.',
    deep: 'Senzor si aj v úplnej tme niečo „vymýšľa“: niektoré pixely sú trvale svetlejšie a teplo ' +
          'pridáva ďalší signál. Dark snímka je fotka s uzavretým objektívom pri rovnakej expozícii a ' +
          'teplote – teda presne to, čo senzor vyrobil sám. Keď sa odčíta od skutočných snímok, tieto ' +
          'chyby zmiznú.'
  },
  kalibracia: {
    group: 'fotenie', icon: '🧭', name: 'Kalibrácia', short: 'Dwarf zistí, kam sa pozerá',
    text: 'Dwarf odfotí kúsok oblohy, rozpozná vzor hviezd a porovná ho so svojou mapou. Až potom vie, kam sa má otočiť.',
    warn: 'Pod hustými mrakmi kalibrácia zlyhá – treba počkať na dieru v oblačnosti.',
    deep: 'Kalibračné snímky nezlepšujú objekt – odstraňujú chyby prístroja. Darky odstránia to, čo si ' +
          'senzor vymýšľa sám, flaty rovnomerne osvetlenej plochy odstránia stopy prachu a tmavšie ' +
          'okraje objektívu. Dwarf väčšinu tejto práce robí za teba na pozadí.'
  },
  'az-rezim': {
    group: 'fotenie', icon: '🧭', name: 'AZ režim', short: 'doľava-doprava, nahor-nadol',
    text: 'Najjednoduchšie nastavenie: postavíš Dwarf a ide. Objekt sleduje, ale obraz sa mu popritom pomaly otáča.',
    image: 'startrails',
    deep: 'V AZ režime sa Dwarf otáča hore-dole a doľava-doprava. Hviezdu v strede tým udrží, ale celý ' +
          'obrázok sa pritom pomaly pretáča okolo nej – ako keby si fotku na stole otáčal prstom. Pri ' +
          'krátkych expozíciách to nevadí, pri dlhých sa hviezdy na okrajoch začnú krčiť do oblúčikov.'
  },
  'eq-rezim': {
    group: 'fotenie', icon: '⚙️', name: 'EQ režim', short: 'otáča sa ako obloha',
    text: 'Dwarf nakloníš tak, aby jedna jeho os smerovala k Polárke. Potom stačí jediný pohyb, ktorý kopíruje otáčanie Zeme.',
    compare: {
      left:  { label: 'AZ · 90 sekúnd', image: 'startrails', note: 'Hviezdy sa stočili do oblúčikov.' },
      right: { label: 'EQ · 90 sekúnd', image: 'roundstars', note: 'Hviezdy zostali okrúhle.' }
    },
    deep: 'EQ režim funguje tak, že sa Dwarf otáča okolo tej istej osi, okolo akej sa točí Zem – len ' +
          'opačným smerom a rovnako rýchlo. Voči hviezdam tak stojí úplne nehybne a obrázok sa ' +
          'nepretáča. Práve preto sa Dwarf najprv nakloní na uhol zemepisnej šírky a otočí na Polárku.'
  },
  'zorne-pole': {
    group: 'fotenie', icon: '🔲', name: 'Zorné pole', short: 'aký veľký kus oblohy vidí',
    text: 'Dwarf mini zaberie 2,45 stupňa – asi ako päť Mesiacov vedľa seba. Väčšie objekty sa doň celé nezmestia.',
    compare: {
      left:  { label: 'Zmestí sa', image: 'm44', note: 'Jasličky sú akurát.' },
      right: { label: 'Nezmestí sa', image: 'm31', note: 'Andromeda je na nebi širšia.' }
    },
    deep: 'Zorné pole sa meria v stupňoch, pretože na nebi nemá zmysel merať v centimetroch – všetko je ' +
          'inak daleko. Dwarf mini vidí naraz pás oblohy široký 2,45 stupňa, čo je asi päť Mesiacov ' +
          'vedľa seba. Objekt väčší než to sa do záberu celý nezmestí, aj keby bol akokoľvek jasný.'
  },
  'nd-filter': {
    group: 'fotenie', icon: '🛡️', name: 'Slnečný ND filter', short: 'povinný pri Slnku',
    text: 'Tmavý filter, ktorý zoslabí svetlo Slnka na bezpečnú úroveň. K Dwarfu mini je priložený v balení.',
    image: 'sun',
    warn: 'Na Slnko nikdy nemieri bez filtra – ani na sekundu, ani „len rýchlo“. Zničí senzor aj oči.'
  },
  'svetelne-znecistenie': {
    group: 'fotenie', icon: '💡', name: 'Svetelné znečistenie', short: 'lampy rozsvietia oblohu',
    text: 'Svetlo lámp sa rozptýli v atmosfére a obloha prestane byť čierna. Slabé objekty sa v tej žiare stratia.',
    compare: {
      left:  { label: 'Z mesta', image: 'citysky', note: 'Pár hviezd a oranžová žiara.' },
      right: { label: 'Z tmavého miesta', image: 'milkyway', note: 'Tisíce hviezd a Mliečna cesta.' }
    },
    deep: 'Svetlo zo lámp, ktoré ide nahor, sa odrazí od molekúl vzduchu a drobných kvapiek a rozsvieti ' +
          'celú oblohu. Slabé hviezdy tým nie sú prekryté – len ich už nedokážeme odlíšiť od ' +
          'svietiaceho pozadia. Preto pomáha odísť za mesto viac než kúpiť si väčší ďalekohľad.'
  },
  seeing: {
    group: 'fotenie', icon: '💨', name: 'Nepokojný vzduch (seeing)', short: 'prečo hviezdy blikajú',
    text: 'Vzduch nad nami sa vlní ako voda a obraz hviezdy rozochveje. Preto sú fotky nízko nad obzorom rozmazané.',
    warn: 'Fotiť treba čo najvyššie na oblohe – ideálne nad 30 stupňami nad obzorom.',
    deep: 'Vzduch nad nami sa neustále mieša a rôzne teplé vrstvy lámu svetlo trochu inak. Obraz ' +
          'hviezdy sa preto chvíľu od chvíle mihne a rozmaže. Toto je hlavný dôvod, prečo sa veľké ' +
          'observatóriá stavajú na vysokých horách a prečo ani ten najlepší ďalekohľad na Zemi nevidí ' +
          'tak ostro ako ten vo vesmíre.'
  },
  rosa: {
    group: 'fotenie', icon: '💧', name: 'Rosa', short: 'vlhkosť na objektíve',
    text: 'V noci sa objektív ochladí a zarosí sa. Fotky sa začnú zahaľovať a stratia kontrast – to je koniec pozorovania.',
    warn: 'Keď fotky náhle zblednú, prvá vec, ktorú skontroluj, je objektív.'
  },
  terminator: {
    group: 'fotenie', icon: '🌗', name: 'Terminátor', short: 'hranica svetla a tmy',
    text: 'Na Mesiaci línia medzi dňom a nocou. Práve tam vrhajú hory a krátery dlhé tiene, takže sú najlepšie vidno.',
    compare: {
      left:  { label: 'Spln', image: 'moon', note: 'Jasný, ale plochý – žiadne tiene.' },
      right: { label: 'Štvrť', image: 'moonphase', note: 'Krátery vrhajú tiene a vystúpia.' }
    }
  },
  'falosne-farby': {
    group: 'fotenie', icon: '🎨', name: 'Falošné farby', short: 'farby, ktoré oko nevidí',
    text: 'Na fotkách z Hubbla sú často farby priradené neviditeľnému svetlu, aby sme videli, čo tam naozaj je. Nie je to podvod – je to ako tepelná kamera.',
    image: 'm1'
  },

  /* ======================= PRÍSTROJ ==================================== */
  senzor: {
    group: 'prístroj', icon: '📷', name: 'Senzor', short: 'čip, ktorý počíta svetlo',
    text: 'Malý čip, ktorý namiesto filmu zachytáva svetlo. Dwarf mini má senzor veľký asi ako nehet na malíčku.'
  },
  'objektiv-zrkadlo': {
    group: 'prístroj', icon: '🔭', name: 'Objektív a zrkadlo', short: 'dva spôsoby zberu svetla',
    text: 'Ďalekohľad je vedro na svetlo. Malé prístroje používajú čočky (objektív), veľké zrkadlá – veľké zrkadlo sa dá vyrobiť ľahšie než veľká čočka.',
    image: 'dome'
  },
  kupola: {
    group: 'prístroj', icon: '🏛️', name: 'Kupola', short: 'otočná strecha hvezdárne',
    text: 'Okrúhla strecha, ktorá sa otáča, aby sa úzka štrbina dala namieriť kamkoľvek. Otvorená je len tá štrbina, takže vietor ďalekohľadom netrasie.',
    image: 'dome'
  },
  'infracervene-svetlo': {
    group: 'prístroj', icon: '🌡️', name: 'Infračervené svetlo', short: 'svetlo, ktoré oko nevidí',
    text: 'Svetlo s dlhšou vlnou, než dokáže naše oko zachytiť. Prejde aj cez prach – preto ho používa ďalekohľad Webb.',
    image: 'deepfield'
  },

  /* ======================= OBLOHA ====================================== */
  suhvezdie: {
    group: 'obloha', icon: '🗺️', name: 'Súhvezdie', short: 'dielik mapy oblohy',
    text: 'Políčko na mape oblohy, nie skupina hviezd, čo patria k sebe. Hviezdy jedného súhvezdia sú od seba často stovky svetelných rokov.',
    image: 'polaris'
  },
  suradnice: {
    group: 'obloha', icon: '📍', name: 'Súradnice (RA a Dec)', short: 'adresa objektu na nebi',
    text: 'Ako má mesto zemepisnú šírku a dĺžku, tak má objekt na nebi deklináciu a rektascenziu. Dwarf sa podľa nich otočí sám.',
    image: 'transit'
  },
  'vyska-nad-obzorom': {
    group: 'obloha', icon: '📐', name: 'Výška nad obzorom', short: 'ako vysoko objekt je',
    text: 'Meria sa v stupňoch: obzor je 0°, priamo nad hlavou je 90°. Pre pekné fotky chceme objekt vyššie než 30°.',
    warn: 'Nízko nad obzorom pozeráš cez najviac rozvírený vzduch – radšej počkaj, kým objekt vystúpi.'
  },
  zenit: {
    group: 'obloha', icon: '⬆️', name: 'Zenit', short: 'bod priamo nad hlavou',
    text: 'Miesto na oblohe presne nad tebou. Tam je vzduchu najmenej, takže obraz je najostrejší.'
  },
  magnituda: {
    group: 'obloha', icon: '✨', name: 'Magnitúda (jasnosť)', short: 'menšie číslo = jasnejšie',
    text: 'Čudné, ale pravdivé: čím menšie číslo, tým jasnejší objekt. Sirius má −1,5, voľným okom vidíš asi do 6.',
    compare: {
      left:  { label: 'Jasná (−1,5)', image: 'starBlue', note: 'Vidno ju aj z mesta.' },
      right: { label: 'Slabá (8,4)', image: 'faintStar', note: 'Tú nájde len ďalekohľad.' }
    },
    deep: 'Stupnica je naopak, než by človek čakal: čím menšie číslo, tým jasnejší objekt. Vymysleli ju ' +
          'starí Grékovia, ktorí najjasnejšie hviezdy nazvali „prvej veľkosti“ a najslabšie „šiestej“. ' +
          'Najjasnejšie objekty majú preto aj mínusové čísla – Sírius má −1,5 a Slnko −26,7.'
  },
  'svetelny-rok': {
    group: 'obloha', icon: '📏', name: 'Svetelný rok', short: 'vzdialenosť, nie čas',
    text: 'Vzdialenosť, ktorú svetlo preletí za jeden rok – 9,46 bilióna kilometrov. Napriek menu je to vzdialenosť.',
    image: 'deepfield',
    deep: 'Svetelný rok je vzdialenosť, nie čas – to je najčastejšia zámena. Je to rovnaké, ako keď ' +
          'povieš, že je to „dve hodiny autom“. A má aj vedľajší efekt: keď je hviezda 100 svetelných ' +
          'rokov daleko, vidíš ju takú, aká bola pred sto rokmi.'
  },
  'svetelna-minuta': {
    group: 'obloha', icon: '⏳', name: 'Svetelná minúta', short: 'čo svetlo preletí za minútu',
    text: 'Slnko je od nás 8 svetelných minút. Vždy ho teda vidíš také, aké bolo pred ôsmimi minútami.',
    image: 'sun'
  },
  'hviezdny-den': {
    group: 'obloha', icon: '🌍', name: 'Hviezdny deň', short: '23 hodín 56 minút',
    text: 'Voči hviezdam sa Zem otočí za 23 h 56 min – nie za 24. Preto každá hviezda vychádza každý večer o 4 minúty skôr.',
    deep: 'Zem sa okolo svojej osi otočí za 23 hodín a 56 minút. Aby sme videli Slnko znova na tom ' +
          'istom mieste, musí sa otočiť o kúsok viac, pretože sa medzitým posunula po svojej dráhe – a ' +
          'to nám dá 24 hodín. Tie štyri minúty rozdielu sú dôvod, prečo hviezdy vychádzajú každý deň o ' +
          'niečo skôr a prečo v lete a v zime vidíme iné súhvezdia.'
  },
  'rotacia-oblohy': {
    group: 'obloha', icon: '🔄', name: 'Otáčanie oblohy', short: '15 stupňov za hodinu',
    text: 'Nehýbe sa obloha, ale my. Zem sa otáča a nám sa zdá, že hviezdy sa každú hodinu posunú o 15 stupňov.',
    image: 'startrails'
  },
  'nebesky-pol': {
    group: 'obloha', icon: '⭐', name: 'Nebeský pól', short: 'bod, okolo ktorého sa točí obloha',
    text: 'Miesto na nebi, kam ukazuje zemská os. Hneď pri ňom stojí Polárka, a preto nikdy nezapadá.',
    image: 'polaris',
    deep: 'Nebeský pól je miesto, kam smeruje os Zeme. Je to jediný bod na oblohe, ktorý sa nehýbe – ' +
          'všetko ostatné sa okolo neho točí. Na severnej pologuli je tam takmer presne Polárka, a ' +
          'preto je taká užitočná: ukazuje sever a zároveň uhol, na ktorý sa nakláňa EQ režim.'
  },
  faza: {
    group: 'obloha', icon: '🌘', name: 'Fáza Mesiaca', short: 'koľko osvetlenej časti vidíme',
    text: 'Slnko vždy osvetľuje presne polovicu Mesiaca. Mení sa len to, akú veľkú časť tej polovice odtiaľto vidíme. Celý kolobeh trvá 29,5 dňa.',
    image: 'moonphase',
    deep: 'Osvetlená je vždy presne polovica Mesiaca, tá otočená k Slnku – to sa nikdy nemení. Mení sa ' +
          'len uhol, z ktorého sa na tú osvetlenú polovicu pozeráme zo Zeme. Preto fázy nie sú tieň ' +
          'Zeme; tieň Zeme padne na Mesiac len pri zatmení.'
  },
  zatmenie: {
    group: 'obloha', icon: '🌑', name: 'Zatmenie', short: 'jedno telo zakryje druhé',
    text: 'Pri zatmení Slnka sa Mesiac dostane medzi Zem a Slnko. Pri zatmení Mesiaca sa Zem dostane medzi Slnko a Mesiac a hodí naň tieň.',
    warn: 'Zatmenie Slnka sa pozerá len cez filter. Zatmenie Mesiaca je úplne bezpečné.'
  },
  'tidalne-uzamknutie': {
    group: 'obloha', icon: '🌚', name: 'Tidálne uzamknutie', short: 'stále tá istá strana',
    text: 'Mesiac sa okolo svojej osi otočí presne raz za jeden obeh okolo Zeme. Preto k nám vždy otáča tú istú stranu.',
    image: 'moon',
    deep: 'Mesiac sa okolo svojej osi otočí presne raz za jeden obeh Zeme, a preto k nám má stále ' +
          'otočenú tú istú tvár. Nie je to náhoda: gravitácia Zeme Mesiac po miliardy rokov ťahala a ' +
          'spomaľovala, až sa jeho otáčanie zosynchronizovalo s obehom. To isté sa stalo mnohým ' +
          'mesiacom iných planét.'
  },
  precesia: {
    group: 'obloha', icon: '🎡', name: 'Precesia', short: 'zemská os sa kýve',
    text: 'Zemská os sa kýve ako roztočený vlk – jedno kývnutie trvá asi 26 000 rokov. Preto sa v priebehu tisícročí mení severná hviezda.',
    deep: 'Os Zeme sa nedrží na jednom mieste – veľmi pomaly opisuje kruh, ako keď sa vyklonený vlčík ' +
          'kolíše. Jeden takýto kruh trvá asi 26 000 rokov. Znamená to, že Polárka nebola vždy polárkou ' +
          'a raz opäť prestane byť: pred piatimi tisícmi rokov bola najbližšie k pólu hviezda Thuban v ' +
          'Drakovi.'
  },
  druzica: {
    group: 'obloha', icon: '🛰️', name: 'Družica (satelit)', short: 'stroj obiehajúci Zem',
    text: 'Nesvieti sama – vidíme na nej odraz Slnka. Letí pomaly, rovnomerne a nikdy nebliká ako lietadlo.',
    image: 'iss'
  },
  meteoroid: {
    group: 'obloha', icon: '🪨', name: 'Meteoroid', short: 'kamienok vo vesmíre',
    text: 'Kúsok skaly alebo prachu, ktorý letí vesmírom. Kým je vo vesmíre, hovorí sa mu meteoroid.'
  },
  meteor: {
    group: 'obloha', icon: '🌠', name: 'Meteor', short: 'kým horí v atmosfére',
    text: 'Keď meteoroid vletí do atmosféry a zhorí, vidíme svetelnú čiaru. To je meteor – tá „padajúca hviezda“, ktorá vôbec nie je hviezda.',
    image: 'meteors',
    deep: 'Tri slová, ktoré sa ľahko pomýlia. Meteoroid je kamienok, ktorý letí vesmírom. Meteor je ' +
          'svetelná stopa, ktorá vznikne, keď taký kamienok vletí do atmosféry a rozžeraví vzduch pred ' +
          'sebou. Meteorit je to, čo z neho dopadne až na zem – a to sa stane len zriedka.'
  },
  meteorit: {
    group: 'obloha', icon: '🇸🇰', name: 'Meteorit', short: 'keď dopadne na zem',
    text: 'Kus, ktorý prežil let atmosférou a dopadol. Jeden taký dopadol v roku 2010 aj pri Košiciach.'
  },
  bolid: {
    group: 'obloha', icon: '💥', name: 'Bolid', short: 'veľmi jasný meteor',
    text: 'Mimoriadne jasný meteor – niekedy jasnejší než Mesiac v splne. Býva ho vidno aj cez deň a občas po ňom zostane meteorit.'
  },
  roj: {
    group: 'obloha', icon: '🌌', name: 'Meteorický roj', short: 'veľa meteorov naraz',
    text: 'Keď Zem preletí prachovou stopou kométy, meteory zdanlivo vyletujú z jedného miesta na nebi. Najznámejšie sú augustové Perzeidy.',
    image: 'meteors'
  },
  kometa: {
    group: 'obloha', icon: '☄️', name: 'Kométa', short: 'špinavá snehová guľa',
    text: 'Zmrznutá guľa ľadu a prachu stará 4,6 miliardy rokov. Pri Slnku sa začne vyparovať a vyrastie jej chvost.',
    image: 'comet'
  },
  'chvost-komety': {
    group: 'obloha', icon: '💫', name: 'Chvost kométy', short: 'vždy smeruje od Slnka',
    text: 'Kométa má dva chvosty – prachový a plynový. Slnečné svetlo a častice ich odfúknu vždy smerom od Slnka, aj keď kométa letí naspäť.',
    image: 'comet'
  },
  tranzit: {
    group: 'obloha', icon: '📉', name: 'Tranzit', short: 'planéta prejde pred hviezdou',
    text: 'Keď planéta prejde presne pred svojou hviezdou, zakryje maličkú časť jej svetla. Hviezda na chvíľu stmavne a to sa dá odmerať.',
    image: 'transit',
    deep: 'Keď planéta prejde presne pred svojou hviezdou, zakryje malý zlomok jej svetla a jasnosť na ' +
          'chvíľu klesne. Pokles je smiešne malý: u planéty veľkosti Jupitera asi jedno percento, u ' +
          'planéty veľkosti Zeme ani nie stotina percenta. Práve z hĺbky tohto poklesu astronómi ' +
          'vypočítajú, aká veľká planéta je.'
  },
  spektrum: {
    group: 'obloha', icon: '🌈', name: 'Spektrum', short: 'svetlo rozložené na farby',
    text: 'Keď svetlo rozložíš, dostaneš dúhu. V nej sú tmavé čiary – odtlačky prvkov, z ktorých je hviezda.',
    image: 'spectrum',
    deep: 'Každý plyn pohltí a vyžiari svetlo len v presne určených farbách, takže má vlastný „čiarový ' +
          'kód“. Keď astronóm tieto čiary v spektre uvidí, vie s istotou, ktoré látky v hviezde sú, aj ' +
          'keď je nepredstaviteľne daleko. Hélium ľudia takto našli najprv v spektre Slnka a až potom ' +
          'na Zemi.'
  },
  'cerveny-posun': {
    group: 'obloha', icon: '🏃', name: 'Červený posun', short: 'objekt sa vzďaľuje',
    text: 'Keď sa objekt od nás vzďaľuje, celý vzor čiar v jeho spektre sa posunie k červenej. Práve tak sme zistili, že sa vesmír rozpína.',
    image: 'spectrum',
    deep: 'Keď sa objekt od nás vzďaľuje, celý jeho čiarový kód sa v spektre posunie k červenej. Je to ' +
          'to isté, čo slyšíš na sirénach: keď auto uháňa od teba, tón sa zníži. U vzdialených galaxií ' +
          'červený posun nespôsobuje ich let priestorom, ale to, že sa samotný priestor medzi nami ' +
          'rozpína.'
  },

  /* ======================= OBJEKTY ===================================== */
  hmlovina: {
    group: 'objekty', icon: '☁️', name: 'Hmlovina', short: 'oblak plynu a prachu',
    text: 'Obrovský oblak plynu a prachu vo vesmíre. V niektorých sa rodia hviezdy, iné vzniknú, keď hviezda zomiera.',
    image: 'm42'
  },
  'plyn-a-prach': {
    group: 'objekty', icon: '🫧', name: 'Plyn a prach', short: 'z čoho sú hmloviny',
    text: 'Plyn je väčšinou vodík, prach sú maličké zrniečka menšie než múka. Z tejto zmesi sa rodia hviezdy aj planéty.',
    image: 'carina'
  },
  'typy-hmlovin': {
    group: 'objekty', icon: '🔥', name: 'Typy hmlovín', short: 'emisná, reflexná, temná, planetárna',
    text: 'Emisná svieti sama, reflexná odráža svetlo blízkej hviezdy, temná zakrýva svetlo za sebou a planetárna je pozostatok umierajúcej hviezdy.',
    compare: {
      left:  { label: 'Emisná', image: 'm42', note: 'Plyn svieti vlastným svetlom.' },
      right: { label: 'Planetárna', image: 'ring', note: 'Vrstvy odhodené starou hviezdou.' }
    },
    deep: 'Rozdiel medzi typmi hmlovín je v tom, odkiaľ berú svetlo. Emisná hmlovina žiari sama, ' +
          'pretože ju ultrafialové svetlo blízkych horúcich hviezd rozsvieti. Reflexná len odráža ' +
          'svetlo hviezd, ako prachová stena v premietacej sále, a preto je modrá. Tmavá hmlovina ' +
          'svetlo len pohlcuje a vidíme ju ako dieru v hviezdnom poli. Planetárna nemá s planétami nič ' +
          'spoločné – je to odfúknutý obal umierajúcej hviezdy.'
  },
  hviezdokopa: {
    group: 'objekty', icon: '✨', name: 'Hviezdokopa', short: 'hviezdy narodené spolu',
    text: 'Skupina hviezd, ktoré vznikli naraz z jedného oblaku. Otvorená je mladá a voľná, guľová stará a natlačená.',
    compare: {
      left:  { label: 'Otvorená', image: 'm45', note: 'Plejády – mladé, voľne rozsypané.' },
      right: { label: 'Guľová', image: 'm13', note: 'M13 – stotisíc hviezd v guli.' }
    },
    deep: 'Hviezdy v jednej hviezdokope sa zrodili v tom istom oblaku a približne v tom istom čase, ' +
          'takže sú naozaj súrodenci. Astronómom to veľmi pomáha: keď zistia vek jednej, poznajú vek ' +
          'všetkých. Otvorené hviezdokopy sú mladé a gravitácia galaxie ich po niekoľkých stovkách ' +
          'miliónov rokov rozpustí, kým guľové sú staré takmer ako vesmír a držia spolu.'
  },
  galaxia: {
    group: 'objekty', icon: '🌀', name: 'Galaxia', short: 'ostrov miliárd hviezd',
    text: 'Obrovský ostrov hviezd, plynu a prachu držaný pohromade gravitáciou. Naša sa volá Mliečna cesta.',
    image: 'm31',
    deep: 'Tvar galaxie prezradí jej minulosť. Špirály majú ešte dosť plynu, a preto v nich stále ' +
          'vznikajú nové hviezdy. Eliptické galaxie plyn už spotrebovali a sú plné starých červených ' +
          'hviezd – často vznikli tak, že sa dve veľké galaxie zrazili a splynuli.'
  },
  'typy-galaxii': {
    group: 'objekty', icon: '🥚', name: 'Typy galaxií', short: 'špirálová, eliptická, nepravidelná',
    text: 'Špirálová má disk a ramená, eliptická je guľa starých hviezd a nepravidelná nemá tvar – často preto, že do nej narazila iná galaxia.',
    compare: {
      left:  { label: 'Špirálová', image: 'm51', note: 'Ramená, v ktorých sa rodia hviezdy.' },
      right: { label: 'Eliptická', image: 'omegacen', note: 'Guľa starých hviezd, bez ramien.' }
    }
  },
  hviezda: {
    group: 'objekty', icon: '⭐', name: 'Hviezda', short: 'guľa plynu, ktorá svieti sama',
    text: 'Obrovská guľa plynu, ktorá vo svojom strede vyrába energiu a preto svieti. Naše Slnko je úplne obyčajná hviezda – len blízko.',
    image: 'starYellow'
  },
  'farba-teplota': {
    group: 'objekty', icon: '🌈', name: 'Farba a teplota hviezdy', short: 'modrá horúca, červená chladná',
    text: 'Farba prezradí teplotu povrchu. Je to naopak, ako to máme na kohútikoch s vodou.',
    compare: {
      left:  { label: 'Modrá – horúca', image: 'starBlue', note: 'Aj desaťtisíce stupňov.' },
      right: { label: 'Červená – chladná', image: 'starRed', note: 'Najchladnejšie z hviezd.' }
    },
    deep: 'Všetko horúce svieti, a čím je to horúcejšie, tým modrejšie. Rozžeravený drôt v starej ' +
          'žiarovke je oranžový, plameň sporáka modrý – a s hviezdami je to presne tak isto. Preto sa ' +
          'dá teplota povrchu hviezdy zmerať jednoducho tým, že sa odmeria jej farba.'
  },
  dvojhviezda: {
    group: 'objekty', icon: '👯', name: 'Dvojhviezda', short: 'dve hviezdy, čo sa obiehajú',
    text: 'Dve hviezdy, ktoré sa navzájom obiehajú. Voľným okom vyzerajú ako jedna, v ďalekohľade sa rozdelia.',
    image: 'albireo'
  },
  'opticka-dvojica': {
    group: 'objekty', icon: '🎭', name: 'Optická dvojica', short: 'len vyzerá blízko',
    text: 'Dve hviezdy, ktoré sa nám premietnu blízko seba, ale v skutočnosti sú od seba veľmi daleko a nič ich nespája.',
    image: 'albireo'
  },
  'biely-karlik': {
    group: 'objekty', icon: '⚪', name: 'Biely karlík', short: 'jadro mŕtvej hviezdy',
    text: 'Malý, veľmi hustý zvyšok hviezdy podobnej Slnku. Už nevyrába energiu, len pomaly chladne.',
    image: 'ring',
    deep: 'Keď hviezde ako Slnko skončí palivo, odfúkne svoj vonkajší obal a zostane z nej len horúce ' +
          'jadro veľké asi ako Zem. Nič v ňom už nehorí – len pomaly chladne, a to milióny miliárd ' +
          'rokov. Je pritom tak neuveriteľne hustý, že jedna lyžička jeho hmoty by na Zemi vážila ' +
          'niekoľko ton.'
  },
  planeta: {
    group: 'objekty', icon: '🪐', name: 'Planéta', short: 'nesvieti, odráža svetlo',
    text: 'Obieha okolo hviezdy a nesvieti sama – vidíme na nej odraz slnečného svetla. Na nebi sa medzi hviezdami pomaly presúva.',
    image: 'saturn'
  },
  'plynny-obor': {
    group: 'objekty', icon: '🟠', name: 'Plynný obor', short: 'planéta bez pevného povrchu',
    text: 'Obrovská planéta z plynu, ako Jupiter alebo Saturn. Nemá povrch, na ktorý by sa dalo stúpiť.',
    image: 'jupiter'
  },
  mesiac: {
    group: 'objekty', icon: '🌙', name: 'Mesiac', short: 'obieha okolo planéty',
    text: 'Teleso, ktoré obieha okolo planéty. Náš Mesiac je široký 3 480 km a je v priemere 384 400 km daleko.',
    image: 'moon'
  },
  supernova: {
    group: 'objekty', icon: '💥', name: 'Supernova', short: 'výbuch veľkej hviezdy',
    text: 'Keď veľkej hviezde skončí palivo, jej stred sa zrúti a hviezda vybuchne. Na niekoľko týždňov svieti ako miliardy Sĺnk.',
    image: 'm1'
  },
  'neutronova-hviezda': {
    group: 'objekty', icon: '💫', name: 'Neutrónová hviezda', short: 'mesto, ťažké ako Slnko',
    text: 'Zvyšok stredu hviezdy po výbuchu. Je veľká ako mesto, ale váži viac než celé Slnko.',
    image: 'neutron'
  },
  pulzar: {
    group: 'objekty', icon: '🔆', name: 'Pulzar', short: 'maják, ktorý bliká',
    text: 'Neutrónová hviezda, ktorá sa točí tak rýchlo, že jej lúče k nám blikajú ako maják. Ten v Krabej hmlovine blikne 30-krát za sekundu.',
    image: 'neutron'
  },
  'cierna-diera': {
    group: 'objekty', icon: '⚫', name: 'Čierna diera', short: 'neujde ani svetlo',
    text: 'Miesto, kde je hmota natlačená tak, že jej gravitácia nepustí von ani svetlo. Preto ju nevidíme priamo.',
    image: 'sgra',
    deep: 'Čierna diera nie je diera ani vysávač – je to obyčajná hmota natlačená do neuveriteľne ' +
          'malého miesta. Keby si Slnko stlačil do gule s priemerom asi šesť kilometrov, stala by sa z ' +
          'neho čierna diera, ale planéty by okolo neho obiehali presne tak ako dnes. Nebezpečná je len ' +
          'zblízka.'
  },
  'horizont-udalosti': {
    group: 'objekty', icon: '🚫', name: 'Horizont udalostí', short: 'hranica bez návratu',
    text: 'Neviditeľná hranica okolo čiernej diery. Čo ju prekročí, už sa nikdy nevráti – ani svetlo.',
    image: 'sgra',
    deep: 'Horizont udalostí nie je žiadny povrch, na ktorý by sa dalo naraziť. Je to len hranica, za ' +
          'ktorou by aj svetlo muselo letieť rýchlejšie než svetlo, aby sa dostalo von – a to nedokáže ' +
          'nič. Preto je čierna diera na fotkách čierna: nie preto, že by tam nič nebolo, ale preto, že ' +
          'odtiaľ k nám nemôže priletieť žiadne svetlo.'
  },
  supermasivna: {
    group: 'objekty', icon: '🌌', name: 'Supermasívna čierna diera', short: 'v strede galaxií',
    text: 'Čierna diera vážiaca milióny až miliardy Sĺnk. Sedí v strede skoro každej veľkej galaxie – tá naša sa volá Sagittarius A*.',
    image: 'sgra'
  },
  exoplaneta: {
    group: 'objekty', icon: '🪐', name: 'Exoplanéta', short: 'planéta pri inej hviezde',
    text: 'Planéta, ktorá obieha okolo inej hviezdy než Slnko. Poznáme ich už vyše 6 000, hoci ich takmer nikdy nevidíme priamo.',
    image: 'transit'
  },
  'obyvatelna-zona': {
    group: 'objekty', icon: '🥣', name: 'Obývateľná zóna', short: 'ani horúco, ani zima',
    text: 'Pásmo okolo hviezdy, kde môže byť voda tekutá. Hovorí sa jej aj zóna Zlatovlásky – ako v tej rozprávke s kašou.',
    image: 'starYellow',
    deep: 'Obývateľná zóna je pásik okolo hviezdy, v ktorom nie je ani priveľmi horúco, ani priveľmi ' +
          'zima, takže tam môže na povrchu planéty vydržať tekutá voda. Pri chladnejších hviezdach je ' +
          'bližšie, pri horúcejších dalej. Neznamená to, že tam život je – len že tam nie je vylúčený.'
  },
  'slnecne-skvrny': {
    group: 'objekty', icon: '🟤', name: 'Slnečné škvrny', short: 'chladnejšie miesta na Slnku',
    text: 'Miesta na povrchu Slnka, ktoré sú chladnejšie než okolie, a preto sa zdajú tmavé. Najväčšie sú širšie než celá Zem.',
    image: 'sun'
  },
  'slnecny-cyklus': {
    group: 'objekty', icon: '🔄', name: 'Slnečný cyklus', short: 'asi 11 rokov',
    text: 'Počet slnečných škvŕn stúpa a klesá v cykle asi 11 rokov. Keď je škvŕn veľa, býva viac polárnych žiar.',
    image: 'sun'
  },

  /* ======================= VESMÍR ====================================== */
  'slnecna-soustava': {
    group: 'vesmír', icon: '🪐', name: 'Slnečná soustava', short: 'Slnko a všetko okolo neho',
    text: 'Slnko, osem planét, ich mesiace, kométy a kamene. Svetlo ju preletí za niekoľko hodín.',
    image: 'saturn'
  },
  'mliecna-cesta': {
    group: 'vesmír', icon: '🌌', name: 'Mliečna cesta', short: 'naša galaxia',
    text: 'Špirálová galaxia s priečkou, široká asi 100 000 svetelných rokov. Slnko je asi 26 000 svetelných rokov od jej stredu.',
    image: 'milkyway'
  },
  'galakticky-disk': {
    group: 'vesmír', icon: '💿', name: 'Disk a ramená', short: 'plochá časť galaxie',
    text: 'Väčšina hviezd galaxie je v plochom disku so špirálovými ramenami. V ramenách je najviac plynu, a preto sa tam rodia nové hviezdy.',
    image: 'm51'
  },
  halo: {
    group: 'vesmír', icon: '🔵', name: 'Halo', short: 'guľa okolo galaxie',
    text: 'Obrovská riedka guľa okolo disku galaxie. Obiehajú v nej staré guľové hviezdokopy.',
    image: 'm13'
  },
  'miestna-grupa': {
    group: 'vesmír', icon: '👨‍👩‍👧‍👦', name: 'Miestna grupa', short: 'naši galaktickí susedia',
    text: 'Skupina galaxií, do ktorej patrí naša Mliečna cesta aj Andromeda. Sú v nej desiatky menších galaxií.',
    image: 'm31'
  },
  nadkopa: {
    group: 'vesmír', icon: '🕸️', name: 'Nadkopa galaxií', short: 'skupina skupín',
    text: 'Ešte väčšia štruktúra: mnoho skupín galaxií pospájaných gravitáciou do obrovských vlákien.',
    image: 'deepfield'
  },
  'viditelny-vesmir': {
    group: 'vesmír', icon: '🫧', name: 'Viditeľný vesmír', short: 'kam dovidíme',
    text: 'Oblasť, z ktorej k nám mohlo doletieť svetlo – široká okolo 94 miliárd svetelných rokov. Ďalej jednoducho nedovidíme.',
    image: 'deepfield'
  },
  'rozpinanie-vesmiru': {
    group: 'vesmír', icon: '🎈', name: 'Rozpínanie vesmíru', short: 'priestor sa naťahuje',
    text: 'Priestor medzi galaxiami sa neustále naťahuje. Preto je viditeľný vesmír širší, než ako dlho vesmír existuje.',
    image: 'deepfield',
    deep: 'Vesmír sa nerozpína tak, že by galaxie leteli do prázdna. Rozpína sa samotný priestor medzi ' +
          'nimi, ako keď sa nadúva balón s nakreslenými bodkami – každá bodka sa vzďaľuje od každej. ' +
          'Preto sa nedá povedať, kde je stred: rovnako to vyzerá z každej galaxie.'
  },
  gravitacia: {
    group: 'vesmír', icon: '🍎', name: 'Gravitácia', short: 'všetko sa navzájom priťahuje',
    text: 'Sila, ktorou sa každé dve telesá priťahujú. Drží pohromade hviezdokopy, galaxie aj tvoje nohy na zemi.'
  },
  orbita: {
    group: 'vesmír', icon: '🔁', name: 'Orbita (obeh)', short: 'dráha okolo iného telesa',
    text: 'Cesta, po ktorej jedno teleso obieha okolo druhého. Mesiac obehne Zem za 27 dní, Zem Slnko za rok.',
    deep: 'Objekt na orbite v skutočnosti padá – len letí dopredu tak rýchlo, že sa mu Zem stále ' +
          'zakrivuje pod ním a nikdy do nej nenarazí. Preto ľudia na vesmírnej stanici plávajú: nie sú ' +
          'bez gravitácie, ale v neustálom voľnom páde. Kto letí nižšie, musí letieť rýchlejšie.'
  },
  'astronomicka-jednotka': {
    group: 'vesmír', icon: '📐', name: 'Astronomická jednotka', short: 'Zem – Slnko',
    text: 'Vzdialenosť Zeme od Slnka, teda asi 150 miliónov kilometrov. Používa sa na meranie v Slnečnej soustave.',
    image: 'sun',
    deep: 'Používa sa preto, že v Slnečnej soustave sú kilometre nepraktické a svetelné roky zbytočne ' +
          'veľké: Saturn je 9,5 AU daleko a Neptún 30 AU. Svetlo preletí jednu astronomickú jednotku ' +
          'za osem minút – presne toľko je Slnko „staré“, keď ho vidíš.'
  }
};
