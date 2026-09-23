/** Generirano iz tailwind.config v index.html, 20. 9. 2026.
 *  To je VHOD v enkratni prevod, ne postopek gradnje: rezultat tailwind.css
 *  se commita in stran ga servira kot navaden slogovni list.
 */
module.exports = {
  // EVERY page that uses utilities has to be listed. 404.html was missing on
  // first compile and its h1 carries text-d1, which nothing else uses - so the
  // class was never generated and the heading rendered at the base 16px
  // instead of the ~114px clamp. Add a page here the moment you create it.
  content: ['./index.html', './client-work.html', './demo-projects.html', './404.html'],
  theme: {
      theme: {
        extend: {
          // Palette sampled from Slike/logo/logo.png, not chosen by eye: the mark
          // is 89.3% #84FF00, 8.3% #FFFFFF, 2.2% #000000. The measured contrast
          // between those three decides the whole site:
          //     black on #84FF00 = 16.29:1      #84FF00 on black = 16.29:1
          //     white on #84FF00 =  1.29:1      #84FF00 on white =  1.29:1
          // So green can never carry white text and can never BE text on a light
          // surface. Every green surface takes BLACK text, and the page stays
          // dark throughout — a light section would leave the accent with nowhere
          // legible to go. This is the same trap CLAUDE.md records for amber,
          // only far wider. Do not add a light section without re-measuring.
          colors: {
            ink:     '#000000', // canvas — the logo's own black
            carbon:  '#101010', // raised surface — white on it is 19.03:1
            paper:   '#FFFFFF', // primary text — 21:1 on ink
            ash:     '#A3A3A3', // muted text — 8.33:1 on ink (floor: #757575 at 4.56:1)
            volt:    '#84FF00', // brand green. Accent only, never body text.
            line:    'rgba(255,255,255,0.14)',
          },
          fontFamily: {
            display: ['"Big Shoulders Display"', 'system-ui', 'sans-serif'],
            sans:    ['Inter', 'system-ui', 'sans-serif'],
          },
          maxWidth: { shell: '1600px', prose: '68ch' },
          // No radius scale, deliberately. Miha's own matchday graphics are
          // hard-edged poster work; rounded frames read as generic web UI
          // against them. Every surface on this site is a right angle —
          // images, panels, controls, tags. Do not reintroduce a radius token.
          // Type scale — headings step by >=1.25, body by the tighter ratio the
          // 16/14/12 range allows (documented in CLAUDE.md as expected, not a fault).
          fontSize: {
            // The 2.5rem floor was set for Archivo at 125% stretch rendering the
            // hero's longest word, "impossible" — that word and that hero copy
            // are both gone now. text-d1 has exactly one user left, 404.html's
            // "Nothing here", now in Big Shoulders Display (narrow, no width
            // axis). Re-measured 23. 9. 2026 at 375px: 40px floor renders it
            // 195.9px wide against 327px of clearance — 131px to spare, one
            // line. Far safer than the old number implied; the floor could go
            // higher without breaking anything, but wasn't raised since no one
            // asked for a bigger 404 heading. Whoever next changes text-d1's
            // user or the display face must re-measure at 375px again — this
            // number is a fact about today's content and font, not a constant.
            'd1': ['clamp(2.5rem,7vw,6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
            'd2': ['clamp(2rem,4.4vw,3.75rem)', { lineHeight: '0.96', letterSpacing: '-0.015em' }],
            'd3': ['clamp(1.5rem,2.6vw,2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
            'd4': ['1.375rem', { lineHeight: '1.2' }],
          },
        },
      },
    }.theme,
};
