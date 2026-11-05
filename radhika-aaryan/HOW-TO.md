# Radhika & Aaryan invite - how to use

## See it on this computer
Double-click **Preview on this computer.cmd** → the browser opens at http://localhost:8768/.
Press F12 → phone icon to see it at phone size. Close the black window to stop.

## Music (two tracks kept)
`?music=vocal` or `?music=instrumental` at the end of the link picks the track; `music =` in tools/settings.txt sets it for guest links.

## Change any wording
Open **data.js** in Notepad. Every name, date, time, venue, map link and family name is there,
copied exactly from the printed card. Keep every `"quote"` and `,` in place.
- RSVP: put the family's WhatsApp number in `rsvp.whatsapp` (e.g. `"919812345678"`). Empty = RSVP section hidden.
- Music: put a song file in `assets/audio/` and write its name in `music` (e.g. `"music.mp3"`).

## What guests do
1. Tap the lotus wax seal → the painted royal gates swing open onto the temple arch (bell sound).
2. Scratch the gold seal → the Hast Melap moment, with a live countdown.
3. Each day has its own painted scene from the card, plus a small ritual to open the details:
   - Mehendi: trace the mehendi pattern with a finger
   - Survani: tap the tabla three times
   - Mandva: tap Ganpati Bappa three times to offer flowers (the diyas light up)
   - Lagna: press and hold the flower to shower petals on the couple
   (Tapping the ritual button twice skips it.)
4. Details sheet: time, venue, address, attire, Google Maps link, add to phone calendar.
5. Photos, family blessings, Saras logo, RSVP.

## Personal links for each guest
1. Open **tools/guests.csv** in Excel. One guest per row:
   - **Name**: how the greeting reads (e.g. Patel Family)
   - **Events**: empty = all four days, or only some: `mehendi,survani,mandva,lagna`
   - **Phone**: with country code (optional)
2. **tools/settings.txt** holds the web address and the Gujarati WhatsApp message.
3. Double-click **tools/Make guest links.cmd** → a page with "Open invite" and "Send on WhatsApp" for every guest.

Quick test: add `?to=Your Name` to the end of the address.

## Publish
Upload this folder **without `tools`** as `radhika-aaryan` into the GitHub repository "Invites".
It then lives at https://shrihariji.github.io/Invites/radhika-aaryan/ (already set in index.html and settings.txt).
The guest list is never uploaded.

## Rebuild pictures (only if the card art changes)
`python tools/build_assets.py` (the source files are in `../_client/radhika-aryan/`).

## Open all 4 versions at once
Double-click **digital-invites\Open all 4 versions.cmd** → a page with 4 buttons (Version 1/2 × vocal/instrumental).

## Invite video (Version 1)
Ready videos: `digital-invites/videos/radhika-aaryan-v1-vocal.mp4` and `...-instrumental.mp4` (1080×1920, about 73 s).
To remake after changing data.js: in `remotion-evolution-of-light` run
`node scripts/invite_data.mjs ../digital-invites/radhika-aaryan src/invite/radhika-aaryan.json`
then render `Radhika-Aaryan-V1-Vocal` / `Radhika-Aaryan-V1-Instrumental`.
