# 🌍 Ako dať Vesmírnu akadémiu na internet

Appka je **čistý statický web** – žiadny server, PHP ani databáza. Stačí nahrať
tieto súbory na akýkoľvek „static hosting“ a funguje to.

Dôležité: **v tomto priečinku je `index.html` priamo v koreni** – presne to
hostingy potrebujú. Nahrávaj obsah tohto priečinka, nie priečinok zabalený v ďalšom.

---

## Netlify Drop – keď nechceš nič riešiť (2 minúty, bez GitHubu)

1. Otvor **https://app.netlify.com/drop**
2. Zaregistruj sa / prihlás sa (zdarma) – **bez prihlásenia** dostane stránka
   dočasné heslo, takže by sa k nej syn nedostal.
3. Pretiahni **celý tento priečinok** do plochy „Drop“.
4. Do niekoľkých sekúnd dostaneš adresu typu `nazov-nieco.netlify.app`.
   Tú pošli synovi – otvorí ju v mobile aj na počítači.

Zmena appky neskôr: v Netlify v projekte pod **Production deploys** pretiahni
nový priečinok. Adresa zostane rovnaká, takže synovi netreba posielať nový odkaz.

Voliteľne: v *Site configuration → Change site name* si zmeň adresu na niečo
zapamätateľné, napríklad `vesmirna-akademia-matus.netlify.app`.

---

## GitHub Pages – ak už GitHub máš (bez terminálu, celé v prehliadači)

1. Na GitHube **New repository**. Meno napr. `vesmirna-akademia`,
   viditeľnosť **Public** (na bezplatnom účte Pages inak nefunguje),
   README netreba zaškrtávať.
2. V prázdnom repozitári klikni **uploading an existing file**
   (alebo *Add file → Upload files*).
3. Pretiahni **obsah** tohto priečinka – teda `index.html`, `style.css`,
   `app.js`, `sim-engine.js` a priečinok `data/`. Nie priečinok zabalený
   v ďalšom priečinku: **`index.html` musí skončiť v koreni repozitára.**
   (Prehliadač si pri pretiahnutí priečinka `data/` zachová štruktúru.)
4. Dole **Commit changes**.
5. **Settings → Pages** → *Source:* **Deploy from a branch**,
   *Branch:* `main`, *Folder:* `/ (root)` → **Save**.
6. Počkaj ~1 minútu a obnov stránku Settings → Pages. Zobrazí sa odkaz
   `https://tvoje-meno.github.io/vesmirna-akademia/`. To pošli synovi.

### Alebo z terminálu (ak máš git)
```bash
cd vesmirna-akademia-NA-WEB          # priečinok, kde je index.html
git init -b main
git add .
git commit -m "Vesmirna akademia"
git remote add origin https://github.com/TVOJE-MENO/vesmirna-akademia.git
git push -u origin main
```
Potom už len *Settings → Pages* podľa kroku 5 vyššie.
S `gh` CLI to ide na jeden riadok:
`gh repo create vesmirna-akademia --public --source=. --push`

### Aktualizácia neskôr
*Add file → Upload files* → pretiahni zmenené súbory → *Commit changes*
(alebo `git add . && git commit -m "update" && git push`).
**Adresa zostane rovnaká**, takže synovi netreba posielať nový odkaz.
GitHub Pages si stránku chvíľu kešuje – ak zmenu nevidíš, daj tvrdé obnovenie
(Ctrl+Shift+R, na Macu Cmd+Shift+R).

### Prečo to funguje aj v podpriečinku
Adresa Pages je `…github.io/nazov-repa/`, teda podpriečinok. V `index.html`
sú **všetky cesty relatívne** (`style.css`, `data/lessons.js`…), takže sa
nič nemusí prepisovať. Keby si appku niekedy dal na vlastnú domému do koreňa,
funguje to tiež bez zmeny.

## Ešte jednoduchšie, ak nemusí byť „na webe“

V priečinku je aj **`vesmirna-akademia-jeden-subor.html`** – celá akadémia
v jedinom súbore. Ten sa dá poslať mailom, dať na USB alebo do cloudu a
otvoriť dvojklikom. Funguje aj bez internetu (namiesto fotiek NASA/ESA/ESO
sa vtedy zobrazia vlastné ilustrácie).

---

## Čo je dobré vedieť

- **Fotky NASA/ESA/ESO sa na vlastnom hostingu načítajú** (na rozdiel od
  verzie publikovanej v Claude, ktorá externé obrázky blokuje). Ak by ich
  raz chcel mať lokálne, ulož ich do `images/` a v `data/images.js` prepni
  `preferLocal: true`.
- **Pokrok (XP, odznaky, fotky) je v prehliadači, nie na serveri.** Uloží sa
  do `localStorage` tej konkrétnej adresy v tom konkrétnom prehliadači. Takže:
  - v mobile a na počítači bude mať **dve samostatné zbierky**,
  - po zmazaní dát prehliadača sa pokrok stratí,
  - pri zmene adresy webu sa začína odznova.
  Pre jedno dieťa na jednom zariadení je to úplne v poriadku – práve preto
  appka nepotrebuje žiadne prihlasovanie.
- **Vlastné fotky z Dwarfu** sa ukladajú do prehliadača (zmenšené na 900 px).
  Ak chce mať istotu, že sa nestratia, nech si originály nechá aj v telefóne.
- Adresa je verejná – kto ju pozná, otvorí ju. Nič osobné sa nikam neposiela,
  ale ak to nechceš mať verejné, GitHub Pages aj Netlify vedia stránku
  zaheslovať (na Netlify je to platená funkcia, na GitHube treba privátny repo + Pro).
