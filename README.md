# ayaanbhatti-dotcom.github.io

Personal cybersecurity portfolio for Ayaan Bhatti.
Warez/demoscene NFO aesthetic — inspired by ACiD Productions, Razor 1911, and CODEX.

**Live site**: https://ayaanbhatti-dotcom.github.io

## Stack

- Pure HTML5 / CSS3 / Vanilla JS
- No build process, no npm, no frameworks
- Google Fonts (VT323, Press Start 2P)
- WebGL shader background (vanilla port)
- GitHub Pages hosting

## Local Development

```bash
# Option 1: Python simple server
python3 -m http.server 8080
# Then open http://localhost:8080

# Option 2: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

## File Structure

```
├── index.html              ← Single page entry point
├── css/
│   ├── design-system.css   ← All CSS custom properties (colors, fonts, spacing)
│   ├── layout.css          ← Reset, containers, grid, utility classes
│   ├── components.css      ← All UI components (header, nav, cards, terminal, etc.)
│   ├── effects.css         ← CRT scanlines, glitch, vignette, WebGL canvas
│   └── main.css            ← Responsive breakpoints (320px → 1440px+)
├── js/
│   ├── effects.js          ← WebGL shader background, typing effect, glitch
│   └── main.js             ← Date init, scroll spy, CRT overlay, footer year
├── robots.txt
├── sitemap.xml
└── README.md
```

## Deploy

Push to `main` — GitHub Pages auto-deploys in ~2 minutes.

```bash
git add .
git commit -m "deploy: portfolio update"
git push
```

## Pre-deploy Checklist

```
[ ] index.html loads with no console errors
[ ] All 5 CSS files and 2 JS files return 200 (no 404s)
[ ] Fonts (VT323, Press Start 2P) visible in Network tab
[ ] CRT scanlines visible
[ ] Typing animation cycles through all phrases
[ ] All nav links smooth-scroll to correct sections
[ ] Scroll spy highlights active section in gold
[ ] WebGL shader background visible (faint flowing lines)
[ ] Mobile view at 375px looks correct
[ ] GitHub/LinkedIn links open in new tab
[ ] mailto: and tel: links functional
[ ] Page title: "Ayaan Bhatti | Cybersecurity Portfolio"
[ ] robots.txt accessible at /robots.txt
[ ] Lighthouse scores all ≥ 90
```
# AyaanBhatti-dotcom.github.io
