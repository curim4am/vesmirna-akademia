# Jak dát Vesmírnou akademii na internet

Aplikace je **čistý statický web** – žádný server, PHP ani databáze. Stačí nahrát
tyhle soubory na jakýkoli „static hosting“ a funguje to.

Důležité: **`index.html` leží přímo tady, ne v žádné podsložce** – přesně to
hostingy potřebují. Nahrávej obsah téhle složky, ne složku zabalenou v další.

### Co přesně se nahrává

```text
index.html          ← musí skončit v kořenové složce
style.css
icons.js
sky-map.js
sim-engine.js
app.js
data/               ← celá složka: images.js, objects.js, facts.js, terms.js,
                      sims.js, sky.js, lessons.js
images/             ← nepovinné (jen když máš lokální fotky)
```

Soubor `vesmirna-akademia-jeden-soubor.html` na hosting nahrávat nemusíš –
je to jen alternativa k celé složce (viz předposlední sekce). Soubor
`artifact-vesmirna-akademia.html`, který vzniká o složku výš, na web nepatří
vůbec – je to jen tělo stránky pro publikování v Claude.

Pořadí `<script>` v `index.html` je závazné: nejdřív data (`data/images.js`,
`data/objects.js`, `data/facts.js`, `data/terms.js`, `data/sims.js`,
`data/sky.js`, `data/lessons.js`), potom logika (`icons.js`, `sky-map.js`,
`sim-engine.js`, `app.js`). Když se přidá nový soubor, musí se přidat i tam –
jinak na hostingu bude, ale nikdo ho nenačte.

---

## Netlify Drop – když nechceš nic řešit (2 minuty, bez GitHubu)

1. Otevři **https://app.netlify.com/drop**
2. Zaregistruj se / přihlas se (zdarma) – **bez přihlášení** dostane stránka
   dočasné heslo, takže by se k ní syn nedostal.
3. Přetáhni **celou tuhle složku** do plochy „Drop“.
4. Do několika sekund dostaneš adresu typu `nazev-neco.netlify.app`.
   Tu pošli synovi – otevře ji v mobilu i na počítači.

Změna aplikace později: v Netlify v projektu pod **Production deploys** přetáhni
novou složku. Adresa zůstane stejná, takže synovi není potřeba posílat nový odkaz.

Volitelně: v *Site configuration → Change site name* si změň adresu na něco
zapamatovatelného, například `vesmirna-akademia-matus.netlify.app`.

---

## GitHub Pages – když už GitHub máš (bez terminálu, celé v prohlížeči)

1. Na GitHubu **New repository**. Jméno např. `vesmirna-akademia`,
   viditelnost **Public** (na bezplatném účtu Pages jinak nefungují),
   README není potřeba zaškrtávat.
2. V prázdném repozitáři klikni **uploading an existing file**
   (nebo *Add file → Upload files*).
3. Přetáhni **obsah** téhle složky – tedy `index.html`, `style.css`,
   `icons.js`, `sky-map.js`, `sim-engine.js`, `app.js` a složku `data/`.
   Ne složku zabalenou v další složce: **`index.html` musí skončit
   v kořeni repozitáře.**
   (Prohlížeč si při přetažení složky `data/` zachová strukturu.)
4. Dole **Commit changes**.
5. **Settings → Pages** → *Source:* **Deploy from a branch**,
   *Branch:* `main`, *Folder:* `/ (root)` → **Save**.
6. Počkej ~1 minutu a obnov stránku Settings → Pages. Zobrazí se odkaz
   `https://tvoje-jmeno.github.io/vesmirna-akademia/`. Ten pošli synovi.

### Nebo z terminálu (když máš git)
```bash
cd vesmirna-akademia                 # složka, kde je index.html
git init -b main
git add .
git commit -m "Vesmirna akademia"
git remote add origin https://github.com/TVOJE-JMENO/vesmirna-akademia.git
git push -u origin main
```
Potom už jen *Settings → Pages* podle kroku 5 výše.
S `gh` CLI to jde na jeden řádek:
`gh repo create vesmirna-akademia --public --source=. --push`

### Aktualizace později
*Add file → Upload files* → přetáhni změněné soubory → *Commit changes*
(nebo `git add . && git commit -m "update" && git push`).
**Adresa zůstane stejná**, takže synovi není potřeba posílat nový odkaz.
GitHub Pages si stránku chvíli kešuje – když změnu nevidíš, dej tvrdé obnovení
(Ctrl+Shift+R, na Macu Cmd+Shift+R).

### Proč to funguje i v podsložce
Adresa Pages je `…github.io/nazev-repa/`, tedy podsložka. V `index.html`
jsou **všechny cesty relativní** (`style.css`, `icons.js`, `sky-map.js`,
`data/lessons.js`…), takže se nic nemusí přepisovat. Kdybys aplikaci někdy
dal na vlastní doménu do kořene, funguje to taky bez změny.

Adresy obrazovek jsou v hashi (`#/`, `#/vypravy`, `#/objekt/m42`), a to je
pro hosting důležité: hash se na server neposílá, takže žádná přesměrování
ani soubor `_redirects` nejsou potřeba. Obnovení stránky i tlačítko Zpět
fungují všude – na Pages i na Netlify.

## Ještě jednodušeji, když to nemusí být „na webu“

Ve složce je i **`vesmirna-akademia-jeden-soubor.html`** – celá akademie
v jediném souboru. Ten se dá poslat mailem, dát na USB nebo do cloudu a
otevřít dvojklikem. Funguje i bez internetu (místo fotek NASA/ESA/ESO
se tehdy zobrazí vlastní ilustrace).

Když se v aplikaci něco změní, jednosouborová verze se znovu složí příkazem:

```bash
node tools/build-jeden-soubor.mjs
```

Skript bere pořadí skriptů přímo z `index.html`, takže se na nový soubor
nezapomene.

---

## Co je dobré vědět

- **Fotky NASA/ESA/ESO se na vlastním hostingu načtou** (na rozdíl od
  verze publikované v Claude, která externí obrázky blokuje). Kdybys je
  chtěl mít někdy lokálně, ulož je do `images/` a v `data/images.js` přepni
  `preferLocal: true`.
- **Postup (XP, kvalifikace, deník, fotky) je v prohlížeči, ne na serveru.**
  Uloží se do `localStorage` té konkrétní adresy v tom konkrétním prohlížeči.
  Takže:
  - v mobilu a na počítači bude mít **dvě samostatné sbírky**,
  - po smazání dat prohlížeče se postup ztratí,
  - při změně adresy webu se začíná znovu.
  Pro jedno dítě na jednom zařízení je to úplně v pořádku – právě proto
  aplikace nepotřebuje žádné přihlašování.
- **Starý postup se neztratí ani po aktualizaci.** Uložený stav má číslo verze
  (`state.v`) a při otevření projde migrací, která jen doplní, co ve starší
  verzi chybělo. Nic nemaže. Klíč v `localStorage` zůstává
  `vesmirna-akademia-v1`, takže nahrání nové verze na stejnou adresu
  nechá dítě přesně tam, kde skončilo.
- **Vlastní fotky z Dwarfu** se ukládají do prohlížeče (zmenšené na 900 px).
  Když chce mít jistotu, že se neztratí, ať si originály nechá i v telefonu.
- Adresa je veřejná – kdo ji zná, otevře ji. Nic osobního se nikam neposílá,
  ale když to nechceš mít veřejné, GitHub Pages i Netlify umí stránku
  zaheslovat (na Netlify je to placená funkce, na GitHubu je potřeba privátní
  repozitář + Pro).
