madebyM — Sports Design Studio
==============================

Rewritten 2026-09-18. The previous README described a single page with six
images and a warm palette; none of that has been true since 2026-09-15.

Four static pages, no framework, no package manager. Tailwind is compiled
once into tailwind.css and committed; serving the site runs nothing.

  index.html          home — hero, work covers, contact
  client-work.html    album of commissioned work           9 images
  demo-projects.html  album of personal work              40 images
  404.html            served by Vercel for any path that does not resolve
  tailwind.css        compiled utilities, 14 kB — DO NOT hand-edit
  tailwind.config.js  the design tokens, with their measurements
  tailwind.input.css  the three @tailwind lines the compile reads
  vercel.json         response headers (CSP, HSTS, frame/MIME/referrer policy)
  .vercelignore       what Vercel must NOT upload
  Slike/              images — see IMAGES below


TAILWIND IS A FILE, NOT A CDN
-----------------------------
It used to be the Play CDN plus an inline config. That cost three things: a
render-blocking script from a third party (Cloudflare, which saw every
visitor's IP and was missing from the privacy policy), NO STYLING AT ALL
whenever that script did not run, and CSS generated in the browser on every
load. Measured after the change: with scripting blocked entirely the page
still renders at full fidelity and the page height is identical, 2976px.

Regenerate after changing classes in the markup or tokens in the config:

  npx -y tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o tailwind.css --minify

The <link> sits AFTER the inline <style> in every page, deliberately. The CDN
injected its rules at the end of <head> at runtime, so at equal specificity
the utilities won, and several rules in these files are written around that.
Move the link above the <style> block and the order flips, silently.

Header, footer and the whole <style> block are duplicated across the three
pages on purpose: no build step means no include. Change one, change all three,
and diff them afterwards. They are byte-identical today apart from the <title>,
the meta description, the logo href and the page body.


PALETTE — measured, not chosen
------------------------------
Sampled from Slike/logo/logo.png by pixel count: 89.3% #84FF00, 8.3% #FFFFFF,
2.2% #000000. The contrast between those three decided the architecture of the
whole site, not just one button:

  black on #84FF00 = 16.29:1        #84FF00 on black = 16.29:1
  white on #84FF00 =  1.29:1        #84FF00 on white =  1.29:1

Green can never carry white text and can never BE text on a light surface, so
the site stays dark throughout and every green surface takes black text. A
light section would leave the accent with nowhere legible to go. Do not add one
without re-measuring all four directions first.

Tokens live in tailwind.config.js, one file for all pages:
  ink #000000 · carbon #101010 · paper #FFFFFF · ash #A3A3A3 ·
  volt #84FF00 · line rgba(255,255,255,0.14)

Lowest contrast anywhere on the site: 8.33:1 (ash on ink).


IMAGES
------
Two kinds of folder. Only the *-web ones are ever served:

  SERVED — 82 files, 3.7 MB, measured 2026-09-18
    Slike/hero-web/                   15 × 720×900     795 KB
    Slike/album-web/client-work/       9 × 520×650     391 KB   (2 are 520×924)
    Slike/album-web/demo-projects/    40 × 520×650   1 934 KB
    Slike/covers-web/client-work/      9 × 480×600     317 KB
    Slike/covers-web/demo-projects/    9 × 480×600     365 KB

  SOURCES — 231 MB, never deployed, never committed
    Slike/hero/  Slike/covers/  Slike/album/

  Six loose files in Slike/ are pre-redesign leftovers. Still tracked in Git,
  referenced by no page since the work grid was split. Excluded in
  .vercelignore; deleting them is a separate decision.

Verify which files a page actually calls before touching any exclusion list:

  grep -ohE '(src|href)="Slike/[^"]*"' *.html | sort -u

Build parameters, recorded here because THE BUILD SCRIPTS ARE NOT IN THIS REPO.
They were written in a session scratchpad under %TEMP% and will be deleted:

  album   520px wide, WebP quality 70, method 6, LANCZOS, ratio 1350/1080
  covers  480px wide, WebP quality 68, method 6, LANCZOS, ratio 1350/1080
  hero    720px wide, highlights compressed into the file with
          y = x(1 - 0.45x²) and saturation 0.88

That hero curve is not cosmetic. Untouched, the worst band measured P99 = 1.0000
(the white block in the Bruno poster) and white text would have needed a 0.55
black veil — which buries the work the hero exists to show. Baking the curve
into the files drops the worst case to 0.2874 and the scrim needed for 4.5:1
to 0.25. Regenerate the tiles and that measurement is void: measure again.

Hero tiles are one width with no srcset, deliberately. A scrim proved at one
width silently stops holding at another.


DEPLOYMENT — a push to main is a live publish
---------------------------------------------
GitHub mihapavlic2000-cpu/madebyM-portfolio -> Vercel auto-deploys every push
to main. Live address: https://www.madebymstudio.com/

The repository is PUBLIC and its root is the workspace folder, not this folder.
Two consequences that have to stay in mind:

  1. Never `git add -A` at the workspace root. The sibling folders hold client
     material and internal sales documents. Add by path: `git add portfolio_madebym`.

  2. What keeps the 231 MB of sources out of the world is .gitignore at the
     workspace root, not .vercelignore. Vercel deploys from Git, so a file that
     is not in the repository can never reach it. .vercelignore is the second
     gate, for the case where a source gets committed by accident.

     Measured 2026-09-18: `git add portfolio_madebym` stages 87 files, 4.1 MB.
     Before the gates it would have staged about 2 300 files and 250 MB.

Vercel's Root Directory is set to portfolio_madebym, so THIS folder is the
served root. vercel.json and .vercelignore must both stay in this folder — at
the repository root Vercel never reads them and the headers and exclusions
silently disappear, with no error anywhere.

Check after every deploy, do not assume:

  curl -s -o /dev/null -w "%{http_code}\n" https://www.madebymstudio.com/
  curl -sI https://www.madebymstudio.com/ | grep -i "content-security-policy\|x-frame-options"

The address madeby-m-portfolio.vercel.app is DEAD (DEPLOYMENT_NOT_FOUND). It
survives only as a stale `homepage` field in the GitHub repository settings.
Do not measure it and do not trust that field.


PROVENANCE — do not blur this
-----------------------------
The per-item "Client work" / "Concept" tags were removed at Miha's request, so
the PAGE TITLE is now the only provenance statement. Everything in
client-work.html is presented as commissioned; everything in demo-projects.html
is presented as personal work. That makes the split a legal statement, not a
layout choice — presenting personal work as a commission is a misleading
commercial practice under ZVPot.

  client-work.html    9 pieces, order fixed by Miha — do not re-sort
  demo-projects.html  40 pieces, grouped by COLOUR since 2026-09-19. This
                      replaced a grouping by subject that lasted one day; do
                      not restore that. Six families round the colour wheel -
                      red 12, orange 4, sepia 7, green 3, blue 9, pink 5 - and
                      inside each family the order is measured relative
                      luminance, brightest first. The full method and the four
                      placements the eye overruled are in the comment above
                      the album in demo-projects.html.

Confirmed by Miha 2026-09-18: `arsenal watermark` and `saka watermark` ARE
commissioned work and belong on client-work.html. The question had been open
across three sessions; it is now closed. Do not reopen it.


CONTACT FORM
------------
Posts to Formspree (form ID xpqgnljz) via fetch; the fallback address is in
<form data-email="...">. Free plan: 50 submissions per month.

Client-side anti-spam is in place — off-screen honeypot, minimum fill time,
per-visit send cap, length limits, subject-line sanitising. All of it runs in
the browser, so it is defence in depth only. The gate that actually holds is
spam filtering and CAPTCHA in the Formspree dashboard; that is where it belongs.

Note: the first real submission triggers Formspree's confirmation email to
madebymp.studio@gmail.com. Until that is confirmed, briefs do not arrive.


PRIVACY / LEGAL
---------------
The site sets no cookies and writes nothing to browser storage, so no consent
banner is required. The privacy modal covers GDPR Art. 13.

STILL OUTSTANDING — the one known legal gap. ZEPT Art. 6 requires the legal
name, registered address, registration number and tax number in the footer.
They are missing. Since 2026-09-18 the footer carries a visible placeholder
saying so, chosen over a silent gap — but a visible gap is still a gap, and
this still blocks going public as a registered business.

The values must never be invented. When they arrive, run the tax number through
its check digit (weights 8·7·6·5·4·3·2, check = 11 − sum mod 11) and any IBAN
through ISO 13616 mod-97 before they go in. See CLAUDE.md.


LOCAL PREVIEW
-------------
  npx -y serve -l 5500 .

serve caches aggressively; always reload with a cache-buster query
(?v=<timestamp>) or you are checking the previous version. This has twice cost
a session an hour chasing a bug that was already fixed.
