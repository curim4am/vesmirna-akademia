# VESMÍRNÁ AKADEMIE

Malá interaktivní webová aplikace pro devítiletého astronoma.
Čistý HTML + CSS + JavaScript. Žádný framework, žádný backend, žádné přihlašování.
Postup (XP, kvalifikace, objevené objekty, deník) se ukládá do `localStorage`
v prohlížeči.

Obsah: **22 výprav** (lekcí) od mlhovin po dalekohledy, **9 interaktivních
simulátorů**, **81 pojmů ve slovníčku** (z toho 34 s hlubším vysvětlením),
**50 zajímavostí „Víš, že?“**, **22 kvalifikací**, **20 objektů k objevení**,
**10 úrovní** (dohromady 4 760 XP) a **32 odkazů** na NASA / ESA / ESO / DwarfLab.

Každá výprava začíná krokem **Základy** – pojmy, které v ní budou, s obrázky
a srovnávacími dvojicemi (nízký vs. vysoký gain, ostré vs. rozostřené…) – a většina
obsahuje **interaktivní úlohu**, ve které se dá s nastavením opravdu hrát.

Aplikace je celá v češtině a je lokalizovaná na **Prahu 3** (50,09° severní šířky).
Mapa oblohy, doporučení „co je dnes vysoko“ i souřadnice objektů počítají s tímto
místem.

---

## 1) Jak to spustím?

### Mac
1. Rozbal složku `vesmirna-akademia`.
2. Dvojklik na `index.html` → otevře se v Safari nebo Chrome.

### Windows / PC
1. Rozbal složku `vesmirna-akademia`.
2. Dvojklik na `index.html`.

To je všechno. Nic se neinstaluje.

> **Tip:** Aby se fotografie z NASA/ESA/ESO načítaly, musí být počítač online.
> Bez internetu aplikace funguje stejně – místo fotografií se zobrazí vlastní
> vesmírné ilustrace generované přímo v kódu.

> **Volitelně (doporučené při vývoji):** spusť malý lokální server, aby si
> prohlížeč nestěžoval na `file://`:
> ```bash
> cd vesmirna-akademia
> python3 -m http.server 8000    # potom otevři http://localhost:8000
> ```

---

## 2) Struktura složek

```text
vesmirna-akademia/
│
├── index.html          – kostra aplikace (nic obsahového se tu needituje)
├── style.css           – všechen design (vizuální systém, verze 2)
├── app.js              – logika (obrazovky, adresy, XP, kvíz, ukládání)
├── icons.js            – jednotná sada SVG ikon
├── sky-map.js          – mapa oblohy na canvasu (createSkyMap)
├── sim-engine.js       – MOTOR SIMULACÍ (kreslení náhledů na canvas)
│
├── data/
│   ├── images.js       – registr obrázků + autoři (credit) + licence
│   ├── objects.js      – katalog objektů, typy objektů, SEASON_TIPS
│   │                     (co je v kterém měsíci na obloze)
│   ├── facts.js        – zajímavosti „VÍŠ, ŽE?“ (sběratelné)
│   ├── terms.js        – SLOVNÍČEK: pojmy pro krok „Základy“ + pole deep
│   ├── sims.js         – TEXTY A OVLADAČE INTERAKTIVNÍCH ÚLOH
│   ├── sky.js          – OBLOHA: 55 jasných hvězd, obrazce, SKY_PLACE
│   └── lessons.js      – OBSAH VÝPRAV, otázky, kvalifikace, úrovně, zdroje,
│                         UPCOMING = chystaná témata
│
├── tools/              – kontrola dat, kontrola češtiny, automatické testy,
│                         složení jednosouborové verze
├── images/             – tu budou lokální fotografie (i vlastní z Dwarfu)
├── vesmirna-akademia-jeden-soubor.html – celá aplikace v jednom souboru
└── README.md
```

Pořadí načítání skriptů v `index.html` je závazné: nejdřív data
(`data/images.js`, `data/objects.js`, `data/facts.js`, `data/terms.js`,
`data/sims.js`, `data/sky.js`, `data/lessons.js`), potom logika
(`icons.js`, `sky-map.js`, `sim-engine.js`, `app.js`). `data/sky.js` musí být
před `sky-map.js`, protože mapa z něj bere `SKY_PLACE` i hvězdy.

---

## 3) Čtyři místa a adresy (#/…)

Domovská obrazovka není rozcestník s dlaždicemi. Je to obloha nad Prahou, na které
svítí objekty, které už dítě objevilo. Navigace má **čtyři místa** (`NAV_ITEMS`
v `app.js`) a všechno ostatní je dostupné z nich:

| Místo | Co tam je | Odkud se pokračuje dál |
|---|---|---|
| **OBLOHA** | mapa oblohy, aktuální výprava, „dnes vysoko“, poslední objev, noční režim a zvuky | detail objektu, výprava, deník |
| **VÝPRAVA** | seznam 22 výprav, hvězdný trénink, chystaná témata (`UPCOMING`) | krok výpravy |
| **DENÍK** | zápisy z nocí (i automatické o objevech), vlastní snímky | detail objektu, sbírka |
| **POSTUP** | tři dráhy, úroveň a XP, kvalifikace, slovníček, zajímavosti, sbírka, zdroje, pro rodiče, diplom | jednotlivé sbírky |

Každá obrazovka má vlastní adresu (`ROUTE_PATHS` v `app.js`), takže funguje
**tlačítko Zpět v prohlížeči** i **obnovení stránky (F5)** – dítě zůstane tam,
kde bylo:

```text
#/              obloha (domov)
#/vypravy       seznam výprav
#/vyprava/nebulae   konkrétní výprava (výprava se doopravdy nastartuje)
#/dennik        deník
#/postup        postup
#/objekt/m42    karta objektu
#/pojmy  #/zajimavosti  #/objevy  #/trenink  #/rodic  #/zdroje  #/diplom
```

Starý název obrazovky `'home'` zůstává funkční, jen ukazuje na oblohu.
Který route patří ke kterému místu v navigaci, říká tabulka `NAV_SECTION`.

---

## 4) Co kde upravím?

| Chci změnit… | Soubor | Kde přesně |
|---|---|---|
| **texty výpravy** (hádanka, vysvětlení, WOW moment, misie) | `data/lessons.js` | `LESSONS[0].steps` – každý krok má svůj `type` a texty |
| **otázky v kvízu** | `data/lessons.js` | krok `{ type:'quiz', questions:[…] }` |
| **nový vesmírný objekt** | `data/objects.js` | pole `SPACE_OBJECTS` – zkopíruj M42 a změň údaje (včetně `ra`, `dec`, `coordsSource`) |
| **nový typ objektu** (galaxie, hvězdokupa…) | `data/objects.js` | objekt `OBJECT_TYPES` |
| **obrázky, autory, licence** | `data/images.js` | objekt `IMAGES` |
| **zajímavosti „Víš, že?“** | `data/facts.js` | objekt `FACTS` – potom ve výpravě `{ type:'fact', factId:'…' }` |
| **pojmy v úvodu výpravy** | `data/terms.js` | objekt `TERMS` – potom ve výpravě `basics: ['expozicia', …]` |
| **hlubší vysvětlení pojmu** | `data/terms.js` | pole `deep: '…'` – zobrazí se pod pojmem jako „Proč to tak je“ |
| **rozšíření vysvětlení ve výpravě** | `data/lessons.js` | pole `more: ['…', '…']` na kroku `info` – „Chci vědět víc“ |
| **texty a ovladače simulace** | `data/sims.js` | objekt `SIMS` – posuvníky, přepínače, výzva, rady |
| **jak simulace kreslí / počítá** | `sim-engine.js` | objekt `SIM_ENGINE` – `draw` / `stats` / `verdict` / `goal` |
| **co je v kterém měsíci na obloze** | `data/objects.js` | pole `SEASON_TIPS` (12 měsíců) |
| **hvězdy a obrazce na mapě** | `data/sky.js` | pole `SKY_STARS` a `SKY_ASTERISMS` |
| **pozorovací místo** | `data/sky.js` | objekt `SKY_PLACE` (`lat`, `lon`, `decMin`) |
| **jak se mapa kreslí** | `sky-map.js` | funkce `createSkyMap` |
| **ikony v rozhraní** | `icons.js` | objekt `ICONS`, mapování `EMOJI_ICON` a `TYPE_ICON` |
| **chystaná témata** | `data/lessons.js` | pole `UPCOMING` |
| **kvalifikace (dřív odznaky)** | `data/lessons.js` | objekt `BADGES` |
| **úrovně a hranice XP** | `data/lessons.js` | pole `LEVELS` |
| **dráhy postupu** | `app.js` | pole `TRACKS` a `TRACK_RANKS` |
| **zdroje na konci** | `data/lessons.js` | pole `SOURCES` |
| **design, barvy, velikosti** | `style.css` | proměnné v `:root` na začátku |

V `app.js` **není žádný obsah výpravy** – jen logika. Nový typ kroku se přidá
jednou funkcí a jedním řádkem v `STEP_RENDERERS`.

Dostupné typy kroků výpravy:
`guess` (hádanka) · `basics` (Základy – vkládá se automaticky) · `warmup` (Rozcvička –
vkládá se automaticky) · `info` (jedna myšlenka + ilustrace, nepovinné `more`) ·
`cards` (karty na otočení) · `pick` (vyber správný obrázek) · `wow` (WOW moment) ·
`compare` (dva obrázky vedle sebe) · `howto` (postup krok za krokem) ·
**`sim` (interaktivní úloha)** · `fact` (VÍŠ, ŽE?) · `mission` (Stellarium + Dwarf) · `quiz`.

**Jak funguje krok „Základy“:** do výpravy stačí přidat pole
`basics: ['expozicia', 'gain', …]` a aplikace vloží krok se základy automaticky
hned za hádanku (aby hádanka neztratila překvapení). Pojmy se definují jednou
v `data/terms.js`, dají se použít v libovolném počtu výprav a po vysvětlení
se uloží do obrazovky **Slovníček**, kde se dají kdykoli dohledat.
Pojem s polem `compare` zobrazí dva obrázky vedle sebe (nízký/vysoký gain,
ostré/rozostřené, vejde se/nevejde se), pojem s `warn` přidá upozornění
„na co si dát pozor“.

Typy otázek v kvízu: `choice` · `image` · `truefalse` · `order` · `decide`.

**Jak funguje krok „Interaktivní úloha“:** do výpravy se přidá jediný řádek

```js
{ type: 'sim', simId: 'fotolab', xp: 25, bonusXp: 15 }
```

Zbytek je ve dvou souborech:

* `data/sims.js` → `SIMS.fotolab` – nadpis, úvodní text, **ovladače**, výzva, rady.
  Ovladač může být posuvník po pevných hodnotách (`values: [2, 5, 15, …]`),
  plynulý posuvník (`min`, `max`, `step`) nebo přepínač (`options: ['AZ', 'EQ']`).
* `sim-engine.js` → `SIM_ENGINE.fotolab` – `draw(ctx, w, h, v)` nakreslí náhled,
  `stats(v)` vrátí čísla pod náhledem, `verdict(v)` hodnocení a `goal(v)` řekne,
  jestli je výzva splněná (tehdy se připíšou bonusové XP).

Hodnoty ovladačů přijdou do všech čtyř funkcí jako objekt `v`
(např. `{ exp: 30, gain: 60, frames: 100, mode: 'EQ' }`).

Devět hotových simulací: `fotolab` (expozice/gain/snímky/AZ-EQ) · `skladanie` ·
`mesiac-fazy` · `eq-nastavenie` · `zorne-pole` · `tranzit` · `farba-teplota` ·
`vzdialenosti` · `svetelne-znecistenie`.

**Fyzika ve FOTOLABU** je zjednodušená, ale závislosti jsou správné:
jasnost roste logaritmicky s `expozice × gain`, šum klesá s odmocninou
z celkového nasbíraného času (čtyřikrát delší čas = poloviční šum),
oblouky hvězd rostou s expozicí jen v režimu AZ a přepal nastane,
když je v jednom snímku příliš mnoho světla.

---

## 5) Ikony (icons.js)

Rozhraní **nepoužívá emoji jako ikony**. Všechny ikony jsou SVG z jedné sady
v `icons.js`:

```js
icon('telescope', { size: 18 })   // ikona podle názvu
iconEmoji('🔭')                   // emoji z dat → odpovídající SVG ikona
iconType('nebula')                // ikona podle typu objektu
iconEl('camera')                  // hotový DOM element
```

V datech emoji zůstávají (`OBJECT_TYPES[…].icon`, `BADGES[…].icon`,
`LESSONS[…].icon`, `UPCOMING[…].icon`), protože se v nich dobře čtou.
Rozhraní je přes `EMOJI_ICON` a `TYPE_ICON` převede na SVG. Když se přidá
emoji, které v mapování ještě není, vykreslí se náhradní ikona – takže
nic nezmizí, jen to stojí za doplnění do `EMOJI_ICON`.

---

## 6) Mapa oblohy (sky-map.js + data/sky.js)

`data/sky.js` obsahuje **55 jasných hvězd** s ověřenými souřadnicemi J2000
(rektascenze v hodinách, deklinace ve stupních, vizuální magnituda) – u každé
hvězdy je odkaz na zdroj v poli `source`. Dál je v souboru **14 obrazců**
(`SKY_ASTERISMS`: Velký vůz, Orion, Kasiopeja, Letní trojúhelník, Pegasův
čtverec…), pozorovací místo `SKY_PLACE` (Praha 3, 50,09° s. š., 14,45° v. d.,
`decMin: -35`) a severní galaktický pól `GALACTIC_POLE`.

`sky-map.js` z toho kreslí skutečnou mapu oblohy na canvasu:

```js
const mapa = createSkyMap(hostElement, { onPick: fn });
mapa.redraw();            // po změně stavu
mapa.flash('m42');        // rozsvícení nově objeveného objektu
```

Co na mapě je: Polárka uprostřed, kružnice deklinace +60°, +30° a 0°, hodiny
rektascenze po obvodu, **pás Mléčné dráhy** (spočítaný z galaktických
souřadnic přes `galacticToEquatorial`), jasné hvězdy s obrazci a objekty
akademie – objevené červeně, neobjevené tiše, dnes viditelné s kroužkem
a cíl aktuální výpravy s dvojitým kroužkem.

Projekce je **severní polární** a vzdálenost od středu roste lineárně s úhlem
od pólu: `r = R · (90 − dec) / (90 − decMin)`. Pro dětskou mapu je to čitelnější
než přísně stereografická projekce, protože nezvětšuje okraj. Mapa kreslí
oblohu po deklinaci −35°; co je pod tím, z Prahy nikdy nevyjde dost vysoko.

Co je právě na jihu, určuje místní hvězdný čas (`localSiderealHours`);
orientaci mapy dává `eveningRaHours` – rektascenze, která je dnes ve 22:00
místního času na jihu.

### Souřadnice objektů

Každý nepohyblivý objekt v `data/objects.js` má:

```js
ra: 5.588, dec: -5.3875,          // 05h 35m 16.8s -05° 23' 15" (J2000)
sizeArcmin: 65,                   // volitelně – úhlová velikost
coordsSource: 'https://en.wikipedia.org/wiki/Orion_Nebula'
```

Pohyblivé objekty (Měsíc, Slunce, Saturn, Jupiter, ISS) souřadnice nemají a jsou
označené `moving: true`. Mapa je nekreslí na pevné místo a v rozhraní se u nich
píše „poloha se mění“ – přesnou polohu je vždy potřeba najít ve Stellariu.

---

## 7) Vizuální systém (style.css)

`style.css` je celý přepsaný na vizuální systém „noční hvězdný atlas“:

* jedna tmavá plocha (`--sky-0` … `--sky-3`), žádné barevné přechody
  na pozadí ani v textu,
* **vlasové linky** (`--line`, `--line-2`, `--line-3`) a prázdný prostor místo
  rámečků a stínů – ne každý prvek je karta,
* **jediný akcent: Hα červená** (`--ha`, vodíková červená z astrofotografie)
  a jen na tři věci – hlavní akce, objevený objekt, aktuální postup,
* písmo: **patkové na nadpisy** (`--serif`, jako v tištěném atlasu), bezpatkové
  na rozhraní (`--font`), neproporcionální na čísla a souřadnice (`--mono`),
* **pohyb jen v pěti okamžicích** (sekce 9 v CSS), nikdy trvale,
* rozestupy `--s1` … `--s8` po 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px,
  rádiusy jen tři (`--r1` … `--r3`).

Starší názvy proměnných (`--bg`, `--panel`, `--accent`, `--text`, `--radius`…)
zůstávají na konci `:root` jako aliasy, aby se nemusel přepisovat starší kód.

Sekce v souboru: 1) barvy, písmo, rozměry · 2) základ a pozadí · 3) lišta
a navigace · 4) rozvržení a typografie · 5) komponenty · 6) obrazovky ·
7) interaktivní úlohy · 8) noční režim a tisk · 9) pohyb · 10) responzivita.

---

## 8) Jak přidám vlastní fotografie z Dwarfu?

1. Ulož fotku do složky `images/` (např. `images/m42.jpg`).
2. V `data/images.js` přepni:
   ```js
   const IMAGE_CONFIG = { preferLocal: true };
   ```
3. Zkontroluj, že je u dané položky správná cesta v `local`.

Pořadí načítání je: **lokální soubor → oficiální odkaz NASA/ESA/ESO → SVG ilustrace.**
Takže když fotka chybí, nic se nerozbije.

### Nejjednodušší cesta: nahrát fotku přímo v aplikaci

Na kartě objektu (POSTUP → Objevené objekty → M42 → **Moje fotografie**) je tlačítko
**„Nahrát moji fotku“**. Vybere se soubor z disku a aplikace ho sama zmenší
na 900 px (`MY_PHOTO_MAX`) a uloží jako JPEG do `localStorage` (+20 XP za první
fotku ke každému objektu). Fotka **nikam neodchází** – zůstává jen v tomto
prohlížeči na tomto počítači. Datum se uloží do `photoDate` a snímek se ukáže
i v deníku.

Kdyby se `localStorage` naplnil, aplikace to řekne a fotku neuloží
(místo tichého selhání) – původní stav se vrátí zpátky. Tehdy stačí některou
starou fotku odstranit tlačítkem „Odstranit fotku“.

### Alternativa: fotka přímo v datech

Když chceš fotku připojit natrvalo (i po vymazání postupu), dá se uvést
v `data/objects.js`:

```js
myPhoto: 'images/moje/m42-dwarf-2026-09-10.jpg'
```

---

## 9) Přehled výprav, misí a kvalifikací

| # | Výprava | Misie (Stellarium + Dwarf) | Kvalifikace |
|---|---|---|---|
| 1 | Mlhoviny | M42 Orionova mlhovina | Lovec mlhovin |
| 2 | Dwarf a EQ režim | Polárka + 60s snímek | Navigátor oblohy |
| 3 | Hvězdokupy | M45 Plejády | Sběratel hvězdokup |
| 4 | Naše galaxie | pás Mléčné dráhy | Obyvatel Mléčné dráhy |
| 5 | Galaxie | M31 Andromeda | Objevitel galaxií |
| 6 | Planety a Měsíc | Měsíc / Saturn / Jupiter | Lovec planet |
| 7 | Hvězdy | Albireo (dvojhvězda) | Znalec hvězd |
| 8 | Supernovy | M1 Krabí mlhovina | Svědek supernovy |
| 9 | Černé díry | směr střed galaxie (Sgr A*) | Průzkumník temnoty |
| 10 | Dwarf naostro | M44 na automatiku vs. ručně | Operátor Dwarfu |
| 11 | Slunce | Slunce s ND filtrem + skvrny | Sluneční hlídka |
| 12 | Fáze a zatmění | 10 večerů = série fází | Strážce fází |
| 13 | Čtení oblohy | M27 nalezená podle souřadnic | Kartograf oblohy |
| 14 | Co letí nad námi | přelet ISS | Sledovač oblohy |
| 15 | Astrofoto mistr | 10 vs. 100 snímků | Astrofoto mistr |
| 16 | Z čeho jsou hvězdy | spektrum přes CD/hranol | Čtenář světla |
| 17 | Vesmírné vzdálenosti | model soustavy na chodníku | Měřič vesmíru |
| 18 | Kde jsme ve vesmíru | Sirius + vesmírná adresa | Vesmírná adresa |
| 19 | Exoplanety | 51 Pegasi | Hledač světů |
| 20 | Komety a meteory | Perseidy (+ meteorit Košice) | Pozorovatel komety |
| 21 | Tmavá obloha | počítání hvězd doma vs. za městem | Ochránce tmy |
| 22 | Dalekohledy | moje fotka vs. Hubble | Znalec dalekohledů |

Misie jsou dvou druhů: s objektem (uloží se do sbírky a do deníku) a bez objektu –
například „vyfoť ten samý objekt s 10 a se 100 snímky“. V datech se to řídí tím,
jestli má krok `mission` pole `objectId`.

### Tři dráhy postupu

Nad XP běží tři dráhy (`TRACKS` v `app.js`), které říkají něco konkrétního:

| Dráha | Co měří | Maximum |
|---|---|---|
| **Pozorovatel** | kolik objektů jsi objevil | počet objektů v `SPACE_OBJECTS` |
| **Fotograf** | vlastní snímky + splněné výzvy v simulátorech | objekty + simulace |
| **Teoretik** | vysvětlené pojmy a nasbírané zajímavosti | `TERMS` + `FACTS` |

Každá dráha má pět stupňů (`TRACK_RANKS`): Začátečník → Hledač → Znalec →
Průzkumník → Mistr.

**Odznaky se v rozhraní jmenují kvalifikace.** V datech i v uloženém stavu
zůstal původní název (`BADGES`, `state.badges`), aby se nerozbil postup
z verze 1. Kvalifikace se dá získat jen dokončenou výpravou včetně testu
a úlohy venku.

Úrovně (XP zůstaly z verze 1, protože na nich dítě už něco má):
Astronom začátečník → Pozorovatel (150) → Astronom (400) →
Deep-Sky Explorer (700) → Mistr oblohy (1 100) → Kapitán vesmíru (1 600) →
Průzkumník galaxií (2 200) → Vesmírný navigátor (2 900) → Velmistr oblohy (3 700) →
Legenda Vesmírné akademie (4 100 XP).

---

## 10) Jak se později přidá další výprava?

```js
// data/lessons.js
LESSONS.push({
  id: 'star-clusters',
  icon: '✨',
  title: 'HVĚZDOKUPY',
  teaser: '…',
  badge: 'cluster-hunter',
  quizXp: 100,
  steps: [ /* stejné typy kroků jako u mlhovin */ ]
});
```

### Uložený stav a jeho verze

Všechna data o postupu jsou v jednom objektu v `localStorage`, klíč
`vesmirna-akademia-v1`:

| Klíč | Co je v něm |
|---|---|
| `v` | **verze uloženého stavu** (`state.v = 2`) |
| `xp`, `badges`, `lessons` | body, kvalifikace a výsledky testů |
| `discovered` | objevené objekty včetně vlastní fotky (`photo`, `photoDate`) a data |
| `facts`, `terms` | sbírka zajímavostí a naučených pojmů |
| `missed` | otázky, které se vrátí jako Rozcvička |
| `journal` | zápisy z pozorovacího deníku (i automatické o objevech) |
| `awarded` | aby se XP za tentýž krok nepřipsalo dvakrát |
| `name`, `night`, `sound`, `bestTraining` | jméno, noční režim, zvuky, rekord v tréninku |

Uložený stav má **číslo verze** a nad ním běží **migrační vrstva**
`migrateState()` v `app.js`. Když aplikace najde starší uložení, dopočítá,
co ve starší verzi chybělo – **nikdy nic nemaže**. Dítě, které už má
nasbíraných 2 000 XP, pokračuje přesně tam, kde skončilo.

* **v1 → v2:** přidán pozorovací deník, kvalifikační dráhy (počítají se
  z už uloženého postupu) a automatické zápisy o objevech. Objekty objevené
  ve verzi 1 se do deníku zapíšou zpětně, aby deník nezačínal prázdný.

Verze se čte z **uloženého** stavu, ne z výchozích hodnot – jinak by se starší
uložení tvářilo jako nové a migrace by se nikdy nespustila. Až bude potřeba
verze 3, přidá se do `migrateState()` další blok `if (from < 3) { … }`
a zvýší se `STATE_VERSION`.

---

## 11) Vědecká správnost a zdroje

Všechna fakta vycházejí z oficiálních zdrojů (odkazy jsou i v aplikaci,
obrazovka **Zdroje**):

- NASA – [Messier 42 (Orionova mlhovina)](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/)
- NASA Space Place – [What Is a Nebula?](https://spaceplace.nasa.gov/nebula/en)
- ESA/Hubble – [Orion Nebula](https://esahubble.org/images/heic0601a/), [Ring Nebula M57](https://esahubble.org/images/heic1310a/), [Whirlpool Galaxy M51](https://esahubble.org/images/heic0506a/), [Omega Centauri](https://esahubble.org/images/heic0809a/), [Saturn](https://esahubble.org/images/heic1917a/)
- ESO – [Carina Nebula](https://www.eso.org/public/images/eso0905a/), [Messier 78](https://www.eso.org/public/images/eso1105b/), [Horsehead Nebula](https://www.eso.org/public/images/eso0202a/)
- NASA – Messier [45](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/), [13](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/), [31](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/), [51](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/), [1](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/) · [Saturn](https://science.nasa.gov/saturn/facts/) · [Jupiter – měsíce](https://science.nasa.gov/jupiter/jupiter-moons/) · [Měsíc](https://science.nasa.gov/moon/facts/) · [dvojhvězdy](https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/) · [Polárka](https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/) · [Mléčná dráha](https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html)
- ESO / EHT – [první fotografie černé díry v naší galaxii](https://www.eso.org/public/news/eso2208-eht-mw/), [panoráma Mléčné dráhy](https://www.eso.org/public/images/eso0932a/)
- ESA/Hubble – [srážka s Andromedou není jistá (2025)](https://esahubble.org/news/heic2508/)
- DwarfLab – [DWARF mini](https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope), [EQ Mode Setup Guide](https://help.dwarflab.com/en/docs/dwarf-mini-equatorial-setup-guide)

Celý seznam (32 odkazů) je v aplikaci na obrazovce **Zdroje**.
Souřadnice hvězd v `data/sky.js` a objektů v `data/objects.js` mají zdroj
u každé položky (`source`, `coordsSource`) – jsou to katalogové údaje J2000
(Hipparcos/Gaia) podle infoboxů na anglické Wikipedii.

**Licence obrázků:** fotografie NASA jsou public domain, fotografie
ESA/Hubble a ESO jsou pod licencí CC BY 4.0 (vyžaduje uvedení autora –
credit je zobrazený pod každou fotografií). SVG ilustrace jsou vlastní,
vygenerované kódem, bez licenčních omezení.

Poznámka ke vzdálenosti M42: NASA uvádí ~1 500 světelných let, přesná
měření paralaxy dávají ~1 350 světelných let. V aplikaci je proto
uvedený rozsah „přibližně 1 300 – 1 500 světelných let“.

---

## 12) Nástroje (složka `tools/`)

| Nástroj | Co dělá | Co potřebuje |
|---|---|---|
| `kontrola-dat.mjs` | zkontroluje data výprav: chybějící obrázky, fakty, kvalifikace, vadné kvízy, dosažitelnost nejvyšší úrovně, splnitelnost výzev v simulátorech | jen Node.js |
| `test-lekcie.mjs` | robot proklikává všechny výpravy v prohlížeči od začátku do konce | Node.js + Playwright |
| `test-aplikace.mjs` | obrazovky, adresy, migrace stavu, mapa, vynulování, šířky | Node.js + Playwright |
| `kontrola-cestiny.py` | hledá slovenské zbytky a neznámá slova v textech pro člověka | Python 3 (+ volitelně hunspell `cs_CZ`) |
| `build-jeden-soubor.mjs` | slepí aplikaci do jednoho HTML souboru | jen Node.js |
| `extract-texty.mjs` | vytáhne zobrazované texty z datových souborů do JSON | jen Node.js |
| `dump-texty.mjs` | vypíše všechny texty z datových souborů na výstup | jen Node.js |
| `extract-kod.py` | vytáhne z `app.js` a `sim-engine.js` texty a komentáře do JSON | Python 3 |
| `uprav-texty.py` | vymění textové řetězce v datových souborech podle mapy | Python 3 |

Playwright se nainstaluje jednou:

```bash
npm install playwright && npx playwright install chromium
```

Detaily, které je dobré znát:

* `kontrola-dat.mjs` kromě jiného ověří i to, že **každá výzva v simulátoru
  se dá opravdu splnit** – projde všechny kombinace ovladačů a hledá alespoň
  jednu, při které `goal()` vrátí `true`. Když se výzva zpřísní tak, že se
  splnit nedá, skript to nahlásí.
* `test-lekcie.mjs` v každé simulaci posune každý ovladač do obou krajních
  poloh i do středu a zkontroluje, že se náhled překreslil a hodnocení vypsalo.
  Dá se pustit i na jednu výpravu: `node tools/test-lekcie.mjs sun phases`.
* `test-aplikace.mjs` testuje aplikaci, ne obsah: otevře **každou adresu
  `#/…`**, zkusí obnovení stránky i tlačítko Zpět, nahraje do `localStorage`
  uložení ve verzi 1 a ověří, že po migraci nic nechybí, zkontroluje, že mapa
  zakreslí objekty na správné souřadnice, že vynulování opravdu všechno smaže
  a že nic nepřetéká do strany (telefon i monitor).
* `kontrola-cestiny.py` vytáhne z JS/HTML/CSS texty pro člověka (řetězcové
  literály, komentáře, text v HTML) a hlásí slovenské znaky a koncovky
  (`ľ ô ä ŕ ĺ`, infinitiv na `-ť`). S nainstalovaným českým hunspellem přidá
  i seznam neznámých slov; `--slova` je vypíše i s místem prvního výskytu.
  Výjimky jsou v `tools/slovnik-vyjimky.txt`. Skript končí nenulovým kódem,
  když něco našel.
* `build-jeden-soubor.mjs` bere **pořadí skriptů přímo z `index.html`**, aby
  se na nový soubor nikdy nezapomnělo. Vyrobí
  `vesmirna-akademia-jeden-soubor.html` (funguje dvojklikem i offline)
  a `../artifact-vesmirna-akademia.html` (tělo stránky pro publikování).

---

## 13) Co se děje na pozadí (aby to nebyla magie)

* **Rozcvička** – když dítě v testu netrefí otázku, zapíše se do `state.missed`.
  Na začátku *další* výpravy (ne té samé) se mu vrátí až tři takové otázky.
  Když na ně odpoví správně, ze seznamu zmizí. Žádné trestání, jen druhá šance.
* **Dnes vysoko** – vybírá se podle aktuálního měsíce ze `SEASON_TIPS`
  v `data/objects.js`. Není to výpočet polohy, je to doporučení pro Prahu,
  večerní oblohu – přesný čas je vždy potřeba ověřit ve Stellariu.
* **Deník** – zápisy vznikají dvěma způsoby: dítě je napíše samo, nebo je
  aplikace založí automaticky při objevu objektu. Z každého zápisu vedou
  odkazy na kartu objektu, na nahrání fotky a na výpravu, ze které pochází.
* **Noční režim** – přebarví celou aplikaci do červena a ztmaví ji. Noční vidění
  se přizpůsobí tmě asi po 20 minutách a bílé světlo displeje to zničí za sekundu,
  červené téměř ne.
* **Hvězdný trénink** – zamíchá otázky z *dokončených* výprav a vybere
  deset. Ukládá se jen osobní rekord (`bestTraining`), nic se nedá pokazit.
  Objeví se, až jsou hotové aspoň tři výpravy.
* **Diplom** – dostupný až po dokončení všech 22 výprav.
  Tlačítko „Vytisknout“ použije tisk prohlížeče (v CSS je `@media print`,
  které skryje pozadí i tlačítka).
* **Zvuky** – jsou **vypnuté**, dokud si je dítě samo nezapne. Žádné zvukové
  soubory: tóny se skládají ve Web Audio API, takže aplikace zůstává
  jednosouborová a funguje i offline.
* **Záměrně tu nejsou** série, srdíčka, denní odpočty ani nic, co by dítě
  trestalo za to, že jeden den nehrálo. Odměnou má být samotný objev.

---

## 14) Vynulování aplikace

Dá se to na dvou místech, obě jsou jedno kliknutí z obrazovky POSTUP:

* **Pro rodiče** → dole *„Vynulovat aplikaci“*
* **Zdroje** → dole to samé

Je to záměrně na **dva kroky**: první tlačítko jen vypíše, co přesně zmizí
(jméno, XP a úroveň, dokončené výpravy a výsledky testů, kvalifikace, objevené
objekty včetně vlastních fotek z Dwarfu, pojmy, zajímavosti, zápisy v deníku,
rekord v tréninku), a až druhé to opravdu vymaže. Dá se mezitím vycouvat
tlačítkem *„Ne, nechat tak“*.

Po vynulování je aplikace přesně jako po prvním otevření – vypne se i noční režim
a zvuky a znovu se zeptá na jméno. **Nedá se to vrátit.**

Ručně to jde i přes konzoli prohlížeče:

```js
localStorage.removeItem('vesmirna-akademia-v1'); location.reload();
```

---

## 15) Jak si to ověřit

Po každé úpravě dat nebo kódu stačí tyhle čtyři příkazy ze složky projektu:

```bash
node tools/kontrola-dat.mjs        # data výprav: chybějící obrázky, fakty, kvalifikace, vadné kvízy, splnitelné výzvy
node tools/test-lekcie.mjs         # robot proklikává všech 22 výprav v prohlížeči a hlásí chyby z konzole
node tools/test-aplikace.mjs       # obrazovky a adresy #/…, tlačítko Zpět, migrace starého uložení, mapa, vynulování, šířky
python3 tools/kontrola-cestiny.py  # hledá slovenské zbytky a neznámá slova ve všech textech pro člověka
```

První a čtvrtý potřebují jen Node.js, resp. Python 3. Druhý a třetí navíc
Playwright (`npm install playwright && npx playwright install chromium`).
Když některý skript skončí nenulovým kódem, vypíše, co přesně a v jakém
souboru je špatně.
