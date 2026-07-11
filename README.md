# Nordbyte IT

Responsiv webbplats för personlig IT-support i Stockholm.

## Lokal förhandsvisning

Kör `python -m http.server 8000` och öppna `http://localhost:8000`.

## Konfiguration före skarp lansering

- Ersätt `[TELEFONNUMMER]`, `[E-POSTADRESS]` och `[ORGANISATIONSNUMMER]`.
- Ersätt `XXX kr` med bekräftade priser.
- Sätt `CONTACT_EMAIL` i script.js.
- Verifiera och komplettera integritetstexten.

Formuläret skickar inget i bakgrunden. När e-postadressen har konfigurerats skapas ett förifyllt mejl i besökarens e-postprogram.

## Teknik

Semantisk HTML5, modern CSS och vanilla JavaScript utan byggsteg eller externa beroenden. Avsedd för GitHub Pages från roten av `main`.
