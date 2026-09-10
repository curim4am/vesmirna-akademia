# 🚀 VESMÍRNA AKADÉMIA

**22 lekcií** od hmlovín po ďalekohľady, **9 interaktívnych simulátorov**,
**81 pojmov v slovníčku** (z toho 34 s hlbším vysvetlením), **50 zaujímavostí
„Vieš že?“**, **22 odznakov**, **20 objektov na objavenie**, **10 úrovní**
(spolu 4 760 XP).

Každá lekcia začína krokom **📖 ZÁKLADY** – pojmy, ktoré v nej budú, s obrázkami
a porovnávacími dvojicami (nízky vs. vysoký gain, ostré vs. rozostrené…) – a väčšina
obsahuje **interaktívnu úlohu**, v ktorej sa dá s nastaveniami naozaj hrať.

Navyše: 🌌 Vesmírna mapa · 📖 Slovníček · 💡 Zbierka zaujímavostí ·
📚 Zbierka objavených objektov s možnosťou nahrať **vlastnú fotku z Dwarfu** ·
🌠 Čo je práve teraz na oblohe · 📓 Pozorovací denník · 🎯 Hviezdny tréning ·
🔁 Rozcvička z otázok, ktoré naposledy ušli · 🔴 Nočný (červený) režim ·
🔔 Nepovinné jemné zvuky ·
📊 Prehľad pre rodiča · 🏆 Diplom · 🔗 30+ zdrojov NASA / ESA / ESO / DwarfLab

Malá interaktívna webová aplikácia pre 9-ročného astronóma.
Čistý HTML + CSS + JavaScript. Žiadny framework, žiadny backend, žiadne prihlasovanie.
Pokrok (XP, odznaky, objavené objekty) sa ukladá do `localStorage` v prehliadači.

---

## 1) Ako to spustím?

### Mac
1. Rozbaľ priečinok `vesmirna-akademia`.
2. Dvojklik na `index.html` → otvorí sa v Safari alebo Chrome.

### Windows / PC
1. Rozbaľ priečinok `vesmirna-akademia`.
2. Dvojklik na `index.html`.

To je všetko. Nič sa neinštaluje.

> **Tip:** Ak chceš, aby sa fotografie z NASA/ESA/ESO načítavali, počítač musí byť online.
> Bez internetu appka funguje rovnako – namiesto fotografií sa zobrazia vlastné
> vesmírne ilustrácie generované priamo v kóde.

> **Voliteľne (odporúčané pri vývoji):** spusti malý lokálny server, aby sa
> prehliadač nesťažoval na `file://`:
> ```bash
> cd vesmirna-akademia
> python3 -m http.server 8000    # potom otvor http://localhost:8000
> ```

---

## 2) Štruktúra priečinkov

```text
vesmirna-akademia/
│
├── index.html          – kostra aplikácie (nič obsahové sa tu needituje)
├── style.css           – všetok dizajn
├── app.js              – logika (obrazovky, XP, kvíz, ukladanie)
├── sim-engine.js       – MOTOR SIMULÁCIÍ (kreslenie náhľadov na canvas)
│
├── data/
│   ├── images.js       – register obrázkov + autori (credit) + licencie
│   ├── objects.js      – katalóg objektov, typy objektov, SEASON_TIPS
│   │                     (čo je v ktorom mesiaci na oblohe)
│   ├── facts.js        – zaujímavosti „VIEŠ ŽE?“ (zbierateľné)
│   ├── terms.js        – SLOVNÍČEK: pojmy pre krok „📖 ZÁKLADY“ + pole deep
│   ├── sims.js         – TEXTY A OVLÁDAČE INTERAKTÍVNYCH ÚLOH
│   └── lessons.js      – OBSAH LEKCIÍ, otázky, odznaky, úrovne, zdroje,
│                         UPCOMING = pripravované témy vo Vesmírnej mape
│
├── tools/              – kontrola dát a automatický test lekcií
├── images/             – tu budú lokálne fotografie (aj vlastné z Dwarfu)
└── README.md
```

---

## 3) Čo kde upravím?

| Chcem zmeniť… | Súbor | Kde presne |
|---|---|---|
| **texty lekcie** (hádanka, vysvetlenia, WOW moment, misia) | `data/lessons.js` | `LESSONS[0].steps` – každý krok má svoj `type` a texty |
| **otázky v kvíze** | `data/lessons.js` | krok `{ type:'quiz', questions:[…] }` |
| **nový vesmírny objekt** | `data/objects.js` | pole `SPACE_OBJECTS` – skopíruj M42 a zmeň údaje |
| **nový typ objektu** (galaxia, hviezdokopa…) | `data/objects.js` | objekt `OBJECT_TYPES` |
| **obrázky, autorov, licencie** | `data/images.js` | objekt `IMAGES` |
| **zaujímavosti „Vieš že?“** | `data/facts.js` | objekt `FACTS` – potom v lekcii `{ type:'fact', factId:'…' }` |
| **pojmy v úvode lekcie** | `data/terms.js` | objekt `TERMS` – potom v lekcii `basics: ['expozicia', …]` |
| **hlbšie vysvetlenie pojmu** | `data/terms.js` | pole `deep: '…'` – zobrazí sa pod pojmom ako „🤔 Prečo to tak je“ |
| **rozšírenie vysvetlenia v lekcii** | `data/lessons.js` | pole `more: ['…', '…']` na kroku `info` – „🤔 Chcem vedieť viac“ |
| **texty a ovládače simulácie** | `data/sims.js` | objekt `SIMS` – posuvníky, prepínače, výzva, rady |
| **ako simulácia kreslí / počíta** | `sim-engine.js` | objekt `SIM_ENGINE` – `draw` / `stats` / `verdict` / `goal` |
| **čo je v ktorom mesiaci na oblohe** | `data/objects.js` | pole `SEASON_TIPS` (12 mesiacov) |
| **pripravované témy v mape** | `data/lessons.js` | pole `UPCOMING` |
| **odznaky** | `data/lessons.js` | objekt `BADGES` |
| **úrovne a XP hranice** | `data/lessons.js` | pole `LEVELS` |
| **zdroje na konci** | `data/lessons.js` | pole `SOURCES` |
| **dizajn, farby, veľkosti** | `style.css` | premenné v `:root` na začiatku |

V `app.js` **nie je žiadny obsah lekcie** – iba logika. Nový typ kroku sa pridá
jednou funkciou a jedným riadkom v `STEP_RENDERERS`.

Dostupné typy krokov lekcie:
`guess` (hádanka) · `basics` (📖 Základy – vkladá sa automaticky) · `warmup` (🔁 Rozcvička –
vkladá sa automaticky) · `info` (jedna myšlienka + ilustrácia, nepovinné `more`) ·
`cards` (karty na otočenie) · `pick` (vyber správny obrázok) · `wow` (WOW moment) ·
`compare` (dva obrázky vedľa seba) · `howto` (postup krok za krokom) ·
**`sim` (interaktívna úloha)** · `fact` (VIEŠ ŽE?) · `mission` (Stellarium + Dwarf) · `quiz`.

**Ako funguje krok „📖 ZÁKLADY“:** do lekcie stačí pridať pole
`basics: ['expozicia', 'gain', …]` a appka vloží krok so základmi automaticky
hneď za hádanku (aby hádanka nestratila prekvapenie). Pojmy sa definujú raz
v `data/terms.js`, dajú sa použiť v ľubovoľnom počte lekcií a po vysvetlení
sa uložia do obrazovky **📖 Slovníček**, kde sa dajú kedykoľvek dohľadať.
Pojem s poľom `compare` zobrazí dva obrázky vedľa seba (nízky/vysoký gain,
ostré/rozostrené, zmestí sa/nezmestí sa), pojem s `warn` pridá upozornenie
„na čo si dať pozor“.

Typy otázok v kvíze: `choice` · `image` · `truefalse` · `order` · `decide`.

**Ako funguje krok „🎛️ INTERAKTÍVNA ÚLOHA“:** do lekcie sa pridá jediný riadok

```js
{ type: 'sim', simId: 'fotolab', xp: 25, bonusXp: 15 }
```

Zvyšok je v dvoch súboroch:

* `data/sims.js` → `SIMS.fotolab` – nadpis, úvodný text, **ovládače**, výzva, rady.
  Ovládač môže byť posuvník po pevných hodnotách (`values: [2, 5, 15, …]`),
  plynulý posuvník (`min`, `max`, `step`) alebo prepínač (`options: ['AZ', 'EQ']`).
* `sim-engine.js` → `SIM_ENGINE.fotolab` – `draw(ctx, w, h, v)` nakreslí náhľad,
  `stats(v)` vráti čísla pod náhľadom, `verdict(v)` hodnotenie a `goal(v)` povie,
  či je výzva splnená (vtedy sa pripíšu bonusové XP).

Hodnoty ovládačov prídu do všetkých štyroch funkcií ako objekt `v`
(napr. `{ exp: 30, gain: 60, frames: 100, mode: 'EQ' }`).

Deväť hotových simulácií: `fotolab` (expozícia/gain/snímky/AZ-EQ) · `skladanie` ·
`mesiac-fazy` · `eq-nastavenie` · `zorne-pole` · `tranzit` · `farba-teplota` ·
`vzdialenosti` · `svetelne-znecistenie`.

**Fyzika vo FOTOLABE** je zjednodušená, ale závislosti sú správne:
jasnosť rastie logaritmicky s `expozícia × gain`, šum klesá s odmocninou
z celkového nazbieraného času (štyrikrát dlhší čas = polovičný šum),
oblúčiky hviezd rastú s expozíciou len v AZ režime a prepal nastane,
keď je v jednej snímke priveľa svetla.

---

## 4) Ako pridám vlastné fotografie z Dwarfu?

1. Ulož fotku do priečinka `images/` (napr. `images/m42.jpg`).
2. V `data/images.js` prepni:
   ```js
   const IMAGE_CONFIG = { preferLocal: true };
   ```
3. Skontroluj, že v danej položke je správna cesta v `local`.

Poradie načítania je: **lokálny súbor → oficiálny odkaz NASA/ESA/ESO → SVG ilustrácia.**
Takže ak fotka chýba, nič sa nerozbije.

### Najjednoduchšia cesta: nahrať fotku priamo v aplikácii

V karte objektu (📚 Moja zbierka → M42 → **📸 MOJA FOTOGRAFIA**) je tlačidlo
**„📤 NAHRAŤ MOJU FOTKU“**. Vyberie sa súbor z disku a appka ho sama
zmenší na 900 px a uloží ako JPEG do `localStorage` (+20 XP za prvú fotku
ku každému objektu). Fotka **nikam neodchádza** – zostáva len v tomto
prehliadači na tomto počítači.

Keby sa `localStorage` naplnil, appka to povie a fotku neuloží
(namiesto tichého zlyhania). Vtedy stačí niektorú starú fotku odstrániť
tlačidlom „🗑️ Odstrániť fotku“.

### Alternatíva: fotka priamo v dátach

Ak chceš fotku pripojiť natrvalo (aj po vymazaní pokroku), dá sa uviesť
v `data/objects.js`:

```js
myPhoto: 'images/moje/m42-dwarf-2026-09-10.jpg'
```

---

## 5) Prehľad lekcií, misií a odznakov

| # | Lekcia | Misia (Stellarium + Dwarf) | Odznak |
|---|---|---|---|
| 1 | ☁️ Hmloviny | M42 Orionova hmlovina | ☁️ Lovec hmlovín |
| 2 | 🔭 Dwarf a EQ mode | Polárka + 60 s snímka | 🧭 Navigátor oblohy |
| 3 | ✨ Hviezdokopy | M45 Plejády | ✨ Zberateľ hviezdokôp |
| 4 | 🌌 Naša galaxia | pás Mliečnej cesty | 🌌 Obyvateľ Mliečnej cesty |
| 5 | 🌀 Galaxie | M31 Andromeda | 🌀 Objaviteľ galaxií |
| 6 | 🪐 Planéty a Mesiac | Mesiac / Saturn / Jupiter | 🪐 Lovec planét |
| 7 | ⭐ Hviezdy | Albireo (dvojhviezda) | ⭐ Znalec hviezd |
| 8 | 💥 Supernovy | M1 Krabia hmlovina | 💥 Svedok supernovy |
| 9 | ⚫ Čierne diery | oblasť v Strelcovi (Sgr A*) | ⚫ Prieskumník temnoty |
| 10 | 🔭 Dwarf naostro | M44 na automatiku vs. ručne | 🔭 Operátor Dwarfu |
| 11 | ☀️ Slnko | Slnko s ND filtrom + škvrny | ☀️ Slnečný hliadkar |
| 12 | 🌗 Fázy a zatmenia | 10 večerov = séria fáz | 🌗 Strážca fáz |
| 13 | 🗺️ Čítanie oblohy | M27 nájdená podľa súradníc | 🗺️ Kartograf oblohy |
| 14 | 🛰️ Čo letí nad nami | prelet ISS | 🛰️ Sledovač oblohy |
| 15 | 📸 Astrofoto majster | 10 vs. 100 snímok | 📸 Astrofoto majster |
| 16 | 🔬 Z čoho sú hviezdy | spektrum cez CD/prizmu | 🔬 Čítač svetla |
| 17 | 📏 Vesmírne vzdialenosti | model soustavy na chodníku | 📏 Merač vesmíru |
| 18 | 🌍 Kde sme vo vesmíre | Sirius + vesmírna adresa | 🌍 Vesmírna adresa |
| 19 | 🪐 Exoplanéty | 51 Pegasi | 🪐 Hľadač svetov |
| 20 | ☄️ Kométy a meteory | Perzeidy (+ meteorit Košice) | ☄️ Pozorovateľ kométy |
| 21 | 🌑 Tmavá obloha | počítanie hviezd doma vs. za mestom | 🌑 Ochránca tmy |
| 22 | 🏛️ Ďalekohľady | moja fotka vs. Hubble | 🏛️ Znalec ďalekohľadov |

Úrovne: Astronóm začiatočník → Pozorovateľ (150) → Astronóm (400) →
Deep-Sky Explorer (700) → Majster oblohy (1 100) → Kapitán vesmíru (1 600) →
Prieskumník galaxií (2 200) → Vesmírny navigátor (2 900) → Veľmajster oblohy (3 700) →
Legenda Vesmírnej akadémie (4 100 XP).

Misie sú dvoch druhov: s objektom (uloží sa do zbierky) a bez objektu –
napríklad „odfoť ten istý objekt s 10 a so 100 snímkami“. V dátach sa to riadi
tým, či krok `mission` má `objectId`.

## 6) Ako sa neskôr pridá ďalšia lekcia?

```js
// data/lessons.js
LESSONS.push({
  id: 'star-clusters',
  icon: '✨',
  title: 'HVIEZDOKOPY',
  teaser: '…',
  badge: 'cluster-hunter',
  quizXp: 100,
  steps: [ /* rovnaké typy krokov ako pri hmlovinách */ ]
});
```

Všetky dáta o pokroku sú v jednom objekte v `localStorage`, kľúč
`vesmirna-akademia-v1`:

| Kľúč | Čo je v ňom |
|---|---|
| `xp`, `badges`, `lessons` | body, odznaky a výsledky testov |
| `discovered` | objavené objekty vrátane vlastnej fotky (`photo`) a dátumu |
| `facts`, `terms` | zbierka zaujímavostí a naučených pojmov |
| `missed` | otázky, ktoré sa vrátia ako 🔁 Rozcvička |
| `journal` | zápisy z pozorovacieho denníka |
| `awarded` | aby sa XP za ten istý krok nepripísalo dvakrát |
| `name`, `night`, `bestTraining` | meno, nočný režim, rekord v tréningu |

---

## 7) Vedecká správnosť a zdroje

Všetky fakty vychádzajú z oficiálnych zdrojov (odkazy sú aj v appke,
obrazovka **🔗 Zdroje**):

- NASA – [Messier 42 (Orionova hmlovina)](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/)
- NASA Space Place – [What Is a Nebula?](https://spaceplace.nasa.gov/nebula/en)
- ESA/Hubble – [Orion Nebula](https://esahubble.org/images/heic0601a/), [Ring Nebula M57](https://esahubble.org/images/heic1310a/), [Whirlpool Galaxy M51](https://esahubble.org/images/heic0506a/), [Omega Centauri](https://esahubble.org/images/heic0809a/), [Saturn](https://esahubble.org/images/heic1917a/)
- ESO – [Carina Nebula](https://www.eso.org/public/images/eso0905a/), [Messier 78](https://www.eso.org/public/images/eso1105b/), [Horsehead Nebula](https://www.eso.org/public/images/eso0202a/)
- NASA – Messier [45](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-45/), [13](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-13/), [31](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/), [51](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-51/), [1](https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/) · [Saturn](https://science.nasa.gov/saturn/facts/) · [Jupiter – mesiace](https://science.nasa.gov/jupiter/jupiter-moons/) · [Mesiac](https://science.nasa.gov/moon/facts/) · [dvojhviezdy](https://science.nasa.gov/solar-system/skywatching/night-sky-network/aug2024-night-sky-notes/) · [Polárka](https://science.nasa.gov/solar-system/skywatching/what-is-the-north-star-and-how-do-you-find-it/) · [Mliečna cesta](https://imagine.gsfc.nasa.gov/features/cosmic/milkyway_info.html)
- ESO / EHT – [prvá fotografia čiernej diery v našej galaxii](https://www.eso.org/public/news/eso2208-eht-mw/), [panoráma Mliečnej cesty](https://www.eso.org/public/images/eso0932a/)
- ESA/Hubble – [zrážka s Andromedou nie je istá (2025)](https://esahubble.org/news/heic2508/)
- DwarfLab – [DWARF mini](https://www.dwarflab.com/us/products/dwarf-mini-smart-telescope), [EQ Mode Setup Guide](https://help.dwarflab.com/en/docs/dwarf-mini-equatorial-setup-guide)

Celý zoznam (30 odkazov) je v aplikácii na obrazovke **🔗 Zdroje**.

**Licencie obrázkov:** fotografie NASA sú public domain, fotografie
ESA/Hubble a ESO sú pod licenciou CC BY 4.0 (vyžaduje uvedenie autora –
credit je zobrazený pod každou fotografiou). SVG ilustrácie sú vlastné,
vygenerované kódom, bez licenčných obmedzení.

Poznámka k vzdialenosti M42: NASA uvádza ~1 500 svetelných rokov, presné
merania paralaxy dávajú ~1 350 svetelných rokov. V appke je preto
uvedený rozsah „približne 1 300 – 1 500 svetelných rokov“.

---

## 8) Nástroje na kontrolu (priečinok `tools/`)

Keď pridáš novú lekciu, tieto dva príkazy overia, či je všetko v poriadku:

```bash
node tools/kontrola-dat.mjs      # chýbajúce obrázky, fakty, odznaky, zlé kvízy (netreba nič inštalovať)
node tools/test-lekcie.mjs       # robot preklikáva všetky lekcie v prehliadači
node tools/test-lekcie.mjs sun   # len jedna lekcia podľa id
```

Prvý skript potrebuje len Node.js. Druhý naviac Playwright:

```bash
npm install playwright && npx playwright install chromium
```

`kontrola-dat.mjs` okrem iného overí aj to, že **každá výzva v simulátore
sa dá naozaj splniť** – prejde všetky kombinácie ovládačov a hľadá aspoň jednu,
pri ktorej `goal()` vráti `true`. Ak sa výzva sprísni natoľko, že sa splniť nedá,
skript to nahlási. `test-lekcie.mjs` zase v každej simulácii posunie každý
ovládač do oboch krajných polôh aj do stredu a skontroluje, že sa náhľad
prekreslil a hodnotenie vypísalo.

## 9) Čo sa deje na pozadí (aby to nebolo mágia)

* **🔁 Rozcvička** – keď dieťa v teste netrafí otázku, zapíše sa do `state.missed`.
  Na začiatku *ďalšej* lekcie (nie tej istej) sa mu vrátia až tri takéto otázky.
  Keď na ne odpovie správne, zo zoznamu zmiznú. Žiadne trestanie, len druhá šanca.
* **🌠 Čo je na oblohe** – vyberá sa podľa aktuálneho mesiaca z `SEASON_TIPS`
  v `data/objects.js`. Nie je to výpočet polohy, je to odporúčanie pre Slovensko
  (48° s. š.), večernú oblohu – presný čas treba vždy overiť v Stellariu.
* **🔴 Nočný režim** – prefarbí celú appku do červena a stmaví ju. Nočné videnie
  sa prispôsobí tme asi po 20 minútach a biele svetlo displeja to zničí za sekundu,
  červené takmer nie.
* **🎯 Hviezdny tréning** – zamieša otázky zo *dokončených* lekcií a vyberie
  desať. Ukladá sa len osobný rekord (`bestTraining`), nič sa nedá pokaziť.
* **🏆 Diplom** – dlaždica sa objaví až po dokončení všetkých 22 lekcií.
  Tlačidlo „Vytlačiť“ použije tlač prehliadača (v CSS je `@media print`,
  ktoré skryje pozadie aj tlačidlá).
* **🔔 Zvuky** – sú **vypnuté**, kým si ich dieťa samo nezapne. Žiadne zvukové
  súbory: tóny sa skladajú vo Web Audio API, takže appka zostáva jednosúborová.
* **Zámerne tu nie sú** série, srdiečka, denné odpočty ani nič, čo by dieťa
  trestalo za to, že jeden deň nehralo. Odmenou má byť samotný objav.

---

## 10) Vynulovanie aplikácie

Dá sa to na dvoch miestach, obe sú jedno kliknutie z domovskej obrazovky:

* **📊 Pre rodiča** → dole *„♻️ Vynulovať aplikáciu“*
* **🔗 Zdroje** → dole to isté

Je to zámerne na **dva kroky**: prvé tlačidlo len vypíše, čo presne zmizne
(meno, XP a úroveň, dokončené lekcie a výsledky testov, odznaky, objavené objekty
vrátane vlastných fotiek z Dwarfu, pojmy, zaujímavosti, zápisy v denníku, rekord
v tréningu), a až druhé to naozaj vymaže. Dá sa medzitým vycúvať tlačidlom
*„Nie, nechať tak“*.

Po vynulovaní je appka presne ako po prvom otvorení – vypne sa aj nočný režim
a zvuky a znova sa spýta na meno. **Nedá sa to vrátiť.**

Ručne to ide aj cez konzolu prehliadača:

```js
localStorage.removeItem('vesmirna-akademia-v1'); location.reload();
```
