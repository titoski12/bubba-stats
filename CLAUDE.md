# Bubba Stats — contesto per Claude Code

Progetto di Giovanni (CUS Ultimate Brescia, squadra "Bubba"). Web app per raccogliere le statistiche
live delle partite di **beach ultimate 5vs5 mixed** da iPhone/iPad, anche **senza internet**.
Rispondi in italiano, in modo conciso.

## Com'è fatta
- `index.html`: tutta l'app (HTML+CSS+JS vanilla, nessuna dipendenza, nessun build step).
  - Stato in `localStorage` (chiave `bubbaStats.v1`): roster, partite, ognuna con una lista di eventi append-only.
    Tutto (punteggio, possesso, statistiche) è derivato dagli eventi in `derive()`; "Annulla" = pop dell'ultimo evento.
  - Eventi: `start` (linea, O/D), `pull` (team, lanciatore, x/y in metri, x=0 fondo di chi lancia, meta ricevente da x=60),
    `goal` (s=marcatore, a=assist), `call` (Callahan), `tt` TO lancio, `td` TO presa, `ts` stall out, `tx` TO altro,
    `d` difesa, `err` errore loro, `tg` meta loro, `line` cambio linea,
    `d`/`call`/`tt`/`td`/`ts`/`tx` possono avere x/y (`LOC_EVENTS`): x = metri dalla nostra linea di fondo, attacchiamo verso x=75
    (meta da x=60); dopo il giocatore l'app chiede "Dove?" (tocco sul campo o Salta).
    `dset` schema difensivo del possesso avversario (`DSETS`: Veltroni/Zona/Uomo; nel foglio "vs" va nella colonna "azione").
  - Roster di default in `DEFAULT_ROSTER`; se cambia, incrementa `ROSTER_VER`: `migrateRoster()` allinea i roster salvati
    (mantiene gli id, rinomina via `ROSTER_RENAME`, sposta chi non c'è più in `DB.removed` così le statistiche restano).
  - Regola rapporto ABBA: `ratioFor(g, n)` con `g.firstRatio` ('F' o 'M') scelto alla creazione partita.
  - Export Excel con writer .xlsx interno (zip STORE + XML, stili via `xStyles()`): per ogni partita un foglio
    "vs <avversario>" (`scoutSheet()`, stesso layout del foglio di scouting cartaceo/Google: griglia X/D per punto,
    possessi divisi per chi fa il pull con codici M/A/T/D, riepilogo; sopra ogni blocco un PNG del campo con pull, D e turnover,
    disegnato su canvas da `fieldPNG()` e inserito come drawing), poi Giocatori, Squadra, Punti, Linee, Pull, Eventi.
    `download()` usa la share sheet (iOS) o un normale download.
  - Layout responsive: iPad e telefono (≤600px: giocatori 3+2, campo sempre orizzontale).
  - Campo orientato nella direzione di gioco: `attRight(g, n)`; le squadre cambiano lato a ogni punto,
    `g.dir0` ('R'/'L') è la direzione del nostro attacco al punto 1 (alla creazione partita si sceglie il lato da cui partiamo = meta che difendiamo: sinistra → 'R'),
    "⇄ Gira il campo" la inverte.
- `sw.js`: service worker cache-first → funziona offline. **A ogni modifica dei file incrementa `CACHE`** (`bubba-stats-v4` → `v5`…)
  **e allinea `APP_VERSION` in `index.html`** (stesso numero + data), mostrata in cima alla home.
- Logo CUS Brescia Ultimate: icone (`icon-192/512`, `apple-touch-icon`) e `logo-96.png` nell'header della home.
- `manifest.webmanifest` + icone: installabile con "Aggiungi alla schermata Home".
- Campo: 75x25 m, mete 15 m, brick a 15 m dalle linee di meta. Colori brand: navy #003057, lime #C0D725.

## Hosting
Repo GitHub pubblico `titoski12/bubba-stats` + **GitHub Pages** (branch `main`, root): ogni push su `main` pubblica.
URL: `https://titoski12.github.io/bubba-stats/`.
Non cambiare dominio a squadra avviata: il `localStorage` è legato al dominio (fare prima un backup).

## Idee aperte
- "Importa e aggiungi" per unire backup JSON di più telefoni (oggi "Ripristina backup" sostituisce tutto).

## Test
Servire la cartella con `python3 -m http.server` e provare in Safari/Chrome (anche offline dopo il primo caricamento).
