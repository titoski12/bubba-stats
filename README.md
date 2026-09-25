# Bubba Stats

Web app per raccogliere le statistiche delle partite di beach ultimate 5vs5 mixed (CUS Ultimate Brescia — Bubba).
Funziona offline: tutti i dati restano sul telefono/iPad e si esportano in Excel.

## Pubblicazione (GitHub Pages)

1. Crea un nuovo repository su GitHub (es. `bubba-stats`).
2. **Add file → Upload files**: trascina tutti i file di questa cartella e fai *Commit*.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, cartella `/ (root)` → *Save*.
4. Dopo 1–2 minuti l'app è su `https://<tuo-utente>.github.io/bubba-stats/`.

## Installazione su iPhone / iPad

1. Apri il link in **Safari** (con internet).
2. Condividi → **Aggiungi alla schermata Home**.
3. Usa sempre l'icona sulla Home: si apre a schermo intero e funziona anche senza rete.

Nota: i dati dell'app sulla Home sono separati da quelli di Safari. Ogni telefono ha le proprie partite:
per unirle usa *Backup (JSON)* / *Ripristina backup*, oppure esporta l'Excel.

## Aggiornare l'app

Carica il nuovo `index.html` e in `sw.js` cambia `bubba-stats-v1` in `bubba-stats-v2` (poi v3, ecc.).
I telefoni ricevono la nuova versione alla seconda apertura con internet.

## File

- `index.html` — l'app (tutto in un file, nessuna dipendenza esterna)
- `sw.js` — service worker per il funzionamento offline
- `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` — installazione come app
