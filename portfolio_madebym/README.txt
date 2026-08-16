madebyM — Sports Design Studio
==============================

Single self-contained page. No framework, no build step, no package manager.
Everything lives in index.html; security headers live in vercel.json.

  index.html    the whole site
  vercel.json   response headers (CSP, HSTS, frame/MIME/referrer policy)
  Slike/        the six portfolio images


DEPLOYMENT — a push to main is a live publish
---------------------------------------------
GitHub mihapavlic2000-cpu/madebyM-portfolio -> Vercel auto-deploys every push
to main. Live address: https://www.madebymstudio.com/

Vercel's Root Directory is set to portfolio_madebym, so THIS folder is the
served root. vercel.json must stay in this folder — at the repository root
Vercel never reads it and the security headers silently disappear.

Check after every deploy, do not assume:
  curl -s -o /dev/null -w "%{http_code}\n" https://www.madebymstudio.com/


PORTFOLIO IMAGES
----------------
Six files in Slike/, all 1080 x 1350 (4:5 portrait):
  ekitikike pt22.jpg · endrick.png · kosi.png · psg.png ·
  cuber glavna.png · saka watermark.png

Spaces in filenames are %20-encoded in the src attributes. If you rename a
file, update index.html to match.

They are NOT optimised — about 15.5 MB in total against a 55 KB page. WebP at
1080px would bring that to roughly 1.5-2 MB. This is the single biggest
performance win left.


PROVENANCE — do not blur this
-----------------------------
Each .work-item carries data-kind:

  data-kind="client"   Kosi, Cuber, Saka      real commissions
  data-kind="concept"  Ekitike, Endrick, PSG  personal work, NOT commissioned

The card shows "Client work" or "Concept" accordingly, and the case-study
panel prints the name under "Client" or "Subject" to match. The script treats
anything that is not explicitly "client" as concept work, so a typo can never
promote personal work into a claimed commission. Never present the three
concept pieces as client work.


CASE-STUDY TEXT
---------------
Per project, on the .work-item element in index.html:
  data-title, data-cat, data-client, data-year, data-goal, data-approach

Only Kosi and PSG carry copy written by Miha; the rest describe the craft.


CONTACT FORM
------------
Posts to Formspree (form ID xpqgnljz) via fetch; fallback address is in
<form data-email="...">. Free plan: 50 submissions per month.

Client-side anti-spam is in place — off-screen honeypot, minimum fill time,
per-visit send cap, length limits, subject-line sanitising. All of it runs in
the browser and the endpoint URL is public in the markup, so a determined bot
can post straight to Formspree and skip every one of those checks.

  >> The real gate must be enabled in the Formspree dashboard:
  >> spam filtering and CAPTCHA. Client-side checks are defence in depth only.

Note: the first real submission triggers Formspree's confirmation email to
madebymp.studio@gmail.com. Until that is confirmed, briefs do not arrive.


PRIVACY / LEGAL
---------------
The site sets no cookies and writes nothing to browser storage — no consent
banner is required. The privacy modal covers GDPR Art. 13.

STILL OUTSTANDING: the footer carries no business identification. If madebyM
is a registered business, ZEPT Art. 6 requires the legal name, registered
address, registration number and tax number to be shown. Miha must supply
these — they must never be invented.


LOCAL PREVIEW
-------------
  npx -y serve -l 5500 .

serve caches aggressively; always reload with a cache-buster query
(?v=<timestamp>) or you are checking the previous version.
