# PRD: AyaanBhatti-dotcom Portfolio Website
## Warez/Demoscene NFO Aesthetic — Static GitHub Pages

---

## EXECUTIVE SUMMARY

This document defines the complete implementation plan for a personal cybersecurity portfolio website for Ayaan Bhatti, hosted on GitHub Pages at `https://ayaanbhatti-dotcom.github.io`. The site must authentically capture the warez/demoscene NFO aesthetic of 1990s–2000s scene releases — think ACiD Productions, Razor 1911, iCE Advertisements, and CODEX .nfo files — while functioning as a modern, responsive, accessible portfolio.

The design language draws from five visual references: ornate ASCII-bordered gothic cards, Y2K cyberpunk UI with neon overlays, CRT-scanlined terminal interfaces, glitch-data-corruption aesthetics, and classic monochrome NFO release files. Every section of the site is treated as a "release file" or "scene artifact," giving the content an authentic retro feel that is uniquely relevant to cybersecurity culture.

Implementation is broken into 13 token-optimized chunks, each executable in a single Claude Code session. The stack is intentionally zero-dependency: pure HTML5, CSS3, and vanilla JavaScript ES6+ — no build tools, no frameworks, no compilation step. This ensures frictionless GitHub Pages deployment and maximum performance.

---

## TECHNICAL STACK

| Concern | Technology |
|---|---|
| Hosting | GitHub Pages (static) |
| Repository | `AyaanBhatti-dotcom.github.io` |
| HTML | HTML5 semantic markup |
| CSS | CSS3, custom properties, no preprocessors |
| JavaScript | Vanilla ES6+, no frameworks |
| Fonts | Google Fonts (VT323, Press Start 2P) — `font-display: swap` |
| Build Process | **None** — direct deploy from `main` branch |
| Version Control | Git / GitHub |

**Hard Constraints:**
- No npm, webpack, Vite, Parcel, or any build tool
- No React, Vue, Angular, or any JS framework
- No jQuery or utility libraries
- All files must be valid standalone HTML/CSS/JS
- Must render correctly when opened directly as `file://` locally AND via GitHub Pages

---

## DESIGN SYSTEM

> **Claude Code Instruction**: Before implementing any chunk, consult `ui-ux-pro-max` for terminal/cyberpunk design intelligence. Consult `ckm:design-system` for CSS custom property architecture. Consult `ckm:ui-styling` for animation and effect patterns.

### Color Palette

```css
:root {
  /* Backgrounds */
  --color-bg:          #000000;   /* Pure black — NFO default */
  --color-bg-alt:      #0a0a1a;   /* Dark blue-black for depth panels */
  --color-bg-panel:    #050510;   /* Inner panel / terminal windows */

  /* Text */
  --color-text:        #00FF41;   /* Matrix/terminal green — primary text */
  --color-text-bright: #FFFFFF;   /* Bright white — headers, highlights */
  --color-text-dim:    #008F11;   /* Dim green — secondary / de-emphasized */

  /* Accent / Neon */
  --color-cyan:        #00FFFF;   /* Neon cyan — borders, links, accent */
  --color-blue:        #0080FF;   /* Electric blue — secondary accent */
  --color-magenta:     #FF00FF;   /* Glitch magenta — glitch effect only */
  --color-red:         #FF0040;   /* Alert red — glitch effect only */
  --color-yellow:      #FFD700;   /* Gold — award/highlight text */

  /* Borders / UI chrome */
  --color-border:      #00FFFF;   /* Cyan for ASCII box-drawing borders */
  --color-border-dim:  #003333;   /* Dim cyan for inner rules */

  /* Glow / FX */
  --glow-green:  0 0 10px #00FF41, 0 0 20px #00FF4155, 0 0 40px #00FF4122;
  --glow-cyan:   0 0 10px #00FFFF, 0 0 20px #00FFFF55, 0 0 40px #00FFFF22;
  --glow-blue:   0 0 10px #0080FF, 0 0 20px #0080FF55;

  /* Scanline overlay */
  --scanline-color: rgba(0, 255, 65, 0.04);
}
```

### Typography

```css
:root {
  /* Font families */
  --font-mono:    'VT323', 'Courier New', Courier, monospace;       /* Primary — classic CRT terminal */
  --font-pixel:   'Press Start 2P', 'Courier New', Courier, monospace; /* Headings — pixel/retro */
  --font-fallback: 'Courier New', Courier, monospace;               /* System fallback */

  /* Scale — using clamp() for fluid responsiveness */
  --text-xs:   clamp(10px, 1.2vw, 12px);
  --text-sm:   clamp(12px, 1.5vw, 14px);
  --text-base: clamp(14px, 1.8vw, 16px);
  --text-md:   clamp(18px, 2.5vw, 24px);
  --text-lg:   clamp(24px, 3.5vw, 36px);
  --text-xl:   clamp(32px, 5vw,   48px);
  --text-2xl:  clamp(40px, 6vw,   64px);
}
```

**Google Fonts import** (place in every HTML `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap" rel="stylesheet">
```

### Spacing Scale

```css
:root {
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  24px;
  --space-lg:  32px;
  --space-xl:  48px;
  --space-2xl: 64px;
  --space-3xl: 96px;
}
```

### ASCII Box-Drawing Character Reference

Use these Unicode characters for all borders and dividers:
```
╔═══╗   ┌───┐   ╓───╖
║   ║   │   │   ║   ║
╚═══╝   └───┘   ╙───╜

Single: ─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼
Double: ═ ║ ╔ ╗ ╚ ╝ ╠ ╣ ╦ ╩ ╬
Mixed:  ╒ ╕ ╘ ╛ ╞ ╡ ╤ ╧ ╪
Shade:  ░ ▒ ▓ █
Arrow:  ► ◄ ▲ ▼ » « ·
```

---

## IMPLEMENTATION CHUNKS

---

### CHUNK 1: Project Setup & Design System Foundation

**Objective**: Initialize repository structure, create base HTML shell, embed complete design system CSS (all custom properties, resets, base styles, utility classes).

**Skills to Consult**:
- `ckm:design-system` — CSS custom property architecture, design token patterns
- `ckm:ui-styling` — Base CSS reset and foundational style patterns
- `skillchain:categories:frontend` — File structure and implementation best practices

**Tasks**:
1. Create repository structure:
   ```
   AyaanBhatti-dotcom.github.io/
   ├── index.html
   ├── css/
   │   ├── design-system.css    ← All CSS custom properties + reset
   │   ├── layout.css           ← Grid, container, section wrappers
   │   ├── components.css       ← Reusable UI components (panels, badges, etc.)
   │   ├── effects.css          ← CRT, glitch, animations
   │   └── main.css             ← Imports all above + page-specific overrides
   ├── js/
   │   ├── effects.js           ← Glitch, scanline, cursor effects
   │   └── main.js              ← Init and event bindings
   └── README.md
   ```

2. Create `css/design-system.css` with all CSS custom properties from Design System section above.

3. Create `css/layout.css`:
```css
/* ─── LAYOUT ─────────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: var(--text-base);
  line-height: 1.6;
  overflow-x: hidden;
  cursor: default;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Main content container */
.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--space-sm);
}

/* Section wrapper */
.section {
  padding: var(--space-xl) 0;
}

/* NFO panel wrapper — used for all major content sections */
.nfo-panel {
  border: 1px solid var(--color-border);
  background: var(--color-bg-panel);
  padding: var(--space-md);
  position: relative;
  box-shadow: var(--glow-cyan);
}

/* ASCII border variant with double lines */
.nfo-panel--double {
  border: 2px double var(--color-border);
}

/* Utility: flex helpers */
.flex        { display: flex; }
.flex-col    { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-sm      { gap: var(--space-sm); }
.gap-md      { gap: var(--space-md); }

/* Utility: text */
.text-cyan    { color: var(--color-cyan); }
.text-green   { color: var(--color-text); }
.text-white   { color: var(--color-text-bright); }
.text-dim     { color: var(--color-text-dim); }
.text-yellow  { color: var(--color-yellow); }
.text-center  { text-align: center; }
.font-pixel   { font-family: var(--font-pixel); }
.font-mono    { font-family: var(--font-mono); }
```

4. Create bare-bones `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Ayaan Bhatti — Cybersecurity Student at St. John's University. Portfolio showcasing CTF, security research, and development projects.">
  <meta name="theme-color" content="#000000">
  <title>AYAAN.BHATTI // CYBERSEC PORTFOLIO</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/effects.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <!-- CRT overlay (appended via JS) -->
  <div class="crt-overlay" aria-hidden="true"></div>

  <!-- SECTIONS WILL BE ADDED IN CHUNKS 2–9 -->

  <!-- Scripts -->
  <script src="js/effects.js" defer></script>
  <script src="js/main.js" defer></script>
</body>
</html>
```

5. Create empty placeholder files: `css/components.css`, `css/effects.css`, `css/main.css`, `js/effects.js`, `js/main.js`.

**Deliverables**: `index.html`, `css/design-system.css`, `css/layout.css`, `css/components.css` (empty), `css/effects.css` (empty), `css/main.css` (empty), `js/effects.js` (empty), `js/main.js` (empty)

**Testing Criteria**:
- Open `index.html` in browser → black screen (correct)
- DevTools → no 404 errors for CSS/JS files
- DevTools → CSS custom properties visible in `:root`
- Google Fonts loading (VT323, Press Start 2P visible in Network tab)

**Token Estimate**: ~6,000 tokens

---

### CHUNK 2: NFO Header Component (ASCII Art Banner)

**Objective**: Build the site's ASCII art header — a full-width NFO-style banner with the site name in box-drawing characters, tagline, and "release info" metadata styled like a warez .nfo file header.

**Skills to Consult**:
- `ckm:banner-design` — Hero/banner layout structure and visual hierarchy
- `ui-ux-pro-max` — Demoscene ASCII art style guidance, NFO header conventions
- `ckm:ui-styling` — Glow text-shadow implementation for phosphor effect

**Tasks**:

1. Add to `index.html` inside `<body>` (before other sections):
```html
<!-- ╔══════════════════════════════════════════════════════════╗ -->
<!-- ║                     SITE HEADER                         ║ -->
<!-- ╚══════════════════════════════════════════════════════════╝ -->
<header class="site-header" role="banner">
  <div class="container">
    <div class="nfo-header" aria-label="Site header">
      <!-- Top border line -->
      <div class="nfo-header__topbar" aria-hidden="true">
        <span class="nfo-header__rule">╔══════════════════════════════════════════════════════════════════════╗</span>
      </div>

      <!-- ASCII logo block -->
      <pre class="nfo-header__logo" aria-label="Ayaan Bhatti logo">
╔═╗ ╦ ╦╔═╗╔═╗╔╗╔  ╔╗ ╦ ╦╔═╗╔╦╗╔╦╗╦
╠═╣ ╚╦╝╠═╣╠═╣║║║  ╠╩╗╠═╣╠═╣ ║  ║ ║
╩ ╩  ╩ ╩ ╩╩ ╩╝╚╝  ╚═╝╩ ╩╩ ╩ ╩  ╩ ╩</pre>

      <!-- Release info block (NFO metadata style) -->
      <div class="nfo-header__meta" aria-label="Portfolio metadata">
        <span class="nfo-header__meta-line">
          <span class="text-dim">║</span>
          <span class="text-cyan"> RELEASE..: </span>
          <span class="text-white">CYBERSEC PORTFOLIO v1.0</span>
          <span class="text-dim">                    ║</span>
        </span>
        <span class="nfo-header__meta-line">
          <span class="text-dim">║</span>
          <span class="text-cyan"> SUPPLIER.: </span>
          <span class="text-white">AYAAN BHATTI [ST. JOHNS UNIVERSITY]</span>
          <span class="text-dim">             ║</span>
        </span>
        <span class="nfo-header__meta-line">
          <span class="text-dim">║</span>
          <span class="text-cyan"> DATE.....: </span>
          <span id="header-date" class="text-white">MMDDYYYY</span>
          <span class="text-dim">                              ║</span>
        </span>
        <span class="nfo-header__meta-line">
          <span class="text-dim">║</span>
          <span class="text-cyan"> TYPE.....: </span>
          <span class="text-white">PORTFOLIO / CYBERSECURITY / CTF</span>
          <span class="text-dim">              ║</span>
        </span>
      </div>

      <!-- Bottom border -->
      <div class="nfo-header__bottombar" aria-hidden="true">
        <span class="nfo-header__rule">╚══════════════════════════════════════════════════════════════════════╝</span>
      </div>
    </div>
  </div>
</header>
```

2. Add to `css/components.css`:
```css
/* ─── NFO HEADER ──────────────────────────────────────────────── */
.site-header {
  padding: var(--space-lg) 0 0;
  overflow-x: auto;
}

.nfo-header {
  font-family: var(--font-mono);
  white-space: pre;
  line-height: 1.4;
}

.nfo-header__rule {
  display: block;
  color: var(--color-cyan);
  text-shadow: var(--glow-cyan);
  font-size: var(--text-sm);
  overflow-x: auto;
}

.nfo-header__logo {
  font-family: var(--font-mono);
  font-size: clamp(14px, 2vw, 20px);
  color: var(--color-cyan);
  text-shadow: var(--glow-cyan);
  text-align: center;
  padding: var(--space-sm) 0;
  line-height: 1.3;
  margin: 0;
}

.nfo-header__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg-panel);
  border-left: 1px solid var(--color-border-dim);
  border-right: 1px solid var(--color-border-dim);
}

.nfo-header__meta-line {
  display: block;
  font-size: var(--text-sm);
  letter-spacing: 0.05em;
}

/* Blinking cursor after date */
#header-date::after {
  content: '█';
  animation: blink 1s step-end infinite;
  color: var(--color-cyan);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

3. Add to `js/main.js` (dynamic date population):
```js
// Populate header date in NFO format
(function setHeaderDate() {
  const el = document.getElementById('header-date');
  if (!el) return;
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  el.textContent = `${mm}-${dd}-${yyyy}`;
})();
```

**Deliverables**: Updated `index.html`, `css/components.css` (header section), `js/main.js` (date init)

**Testing Criteria**:
- Header renders full-width ASCII box border in cyan with glow
- Date auto-populates with today's date on load
- No horizontal overflow on desktop (≥900px)
- On mobile, horizontal scroll within header (acceptable for pre-formatted NFO text)

**Token Estimate**: ~7,000 tokens

---

### CHUNK 3: Navigation Component (Terminal-Style)

**Objective**: Build a sticky terminal-style navigation bar with NFO-inspired styling. Links should look like typed commands, with a terminal prompt prefix and hover glitch effect.

**Skills to Consult**:
- `ckm:design` — Navigation pattern guidance and link state design
- `ckm:ui-styling` — Hover effects, active states, sticky positioning
- `ui-ux-pro-max` — Terminal UI navigation conventions

**Tasks**:

1. Add to `index.html` after `<header>`:
```html
<!-- ─── NAVIGATION ─────────────────────────────────────────────── -->
<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="site-nav__inner">
      <!-- Terminal prompt prefix -->
      <span class="site-nav__prompt" aria-hidden="true">root@ayaan:~#</span>

      <!-- Nav links (styled as terminal commands) -->
      <ul class="site-nav__list" role="list">
        <li><a href="#about"      class="site-nav__link">./about</a></li>
        <li><a href="#experience" class="site-nav__link">./experience</a></li>
        <li><a href="#projects"   class="site-nav__link">./projects</a></li>
        <li><a href="#skills"     class="site-nav__link">./skills</a></li>
        <li><a href="#contact"    class="site-nav__link">./contact</a></li>
      </ul>

      <!-- Status indicator -->
      <span class="site-nav__status" aria-label="System status: online">
        <span class="status-dot" aria-hidden="true"></span>
        <span class="text-dim text-sm">ONLINE</span>
      </span>
    </div>
  </div>
</nav>
```

2. Add to `css/components.css`:
```css
/* ─── NAVIGATION ─────────────────────────────────────────────── */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 1px solid var(--color-border-dim);
  border-top: 1px solid var(--color-border-dim);
  backdrop-filter: blur(4px);
  padding: var(--space-xs) 0;
}

.site-nav__inner {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.site-nav__prompt {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text);
  text-shadow: var(--glow-green);
  white-space: nowrap;
  flex-shrink: 0;
}

.site-nav__list {
  list-style: none;
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.site-nav__link {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-cyan);
  text-decoration: none;
  padding: 2px var(--space-xs);
  border: 1px solid transparent;
  transition: all 0.15s ease;
  position: relative;
}

.site-nav__link:hover,
.site-nav__link:focus-visible {
  color: var(--color-bg);
  background: var(--color-cyan);
  border-color: var(--color-cyan);
  outline: none;
  text-shadow: none;
}

.site-nav__link:focus-visible {
  outline: 2px solid var(--color-cyan);
  outline-offset: 2px;
}

/* Active section indicator */
.site-nav__link.is-active {
  color: var(--color-yellow);
  border-color: var(--color-yellow);
}

/* Status dot (pulsing green) */
.site-nav__status {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-left: auto;
  flex-shrink: 0;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--color-text);
  border-radius: 50%;
  box-shadow: var(--glow-green);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.85); }
}
```

3. Add scroll-spy to `js/main.js`:
```js
// ─── SCROLL SPY ───────────────────────────────────────────────
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('is-active'));
        const activeLink = document.querySelector(`.site-nav__link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();
```

**Deliverables**: Updated `index.html`, `css/components.css` (nav section), `js/main.js` (scroll spy)

**Testing Criteria**:
- Nav sticks to top on scroll
- Hover state inverts colors (cyan bg, black text)
- Keyboard navigation works (Tab + Enter)
- Active section highlights correct link while scrolling
- Prompt text visible at all times

**Token Estimate**: ~6,500 tokens

---

### CHUNK 4: Hero Section (NFO Release File Intro)

**Objective**: Build the hero/intro section styled as a full NFO release file — with file header, section dividers, a short `README.NFO`-style introduction, and social links formatted as "distribution sites."

**Skills to Consult**:
- `ckm:banner-design` — Hero section layout, visual hierarchy, CTA placement
- `ui-ux-pro-max` — NFO file format conventions, demoscene text layout patterns
- `ckm:ui-styling` — ASCII panel styling, glow effects

**Tasks**:

1. Add to `index.html` after `<nav>`:
```html
<!-- ─── HERO / NFO RELEASE INFO ───────────────────────────────── -->
<section id="hero" class="section hero-section" aria-label="Introduction">
  <div class="container">

    <!-- NFO Greeting Block -->
    <div class="nfo-release" role="article" aria-label="Portfolio release file">

      <!-- Release header -->
      <pre class="nfo-release__header text-cyan" aria-hidden="true">
╔══════════════════════════════════════════════════════════════════════╗
║  ░▒▓ AYAAN.BHATTI-PORTFOLIO.2025.NFO ▓▒░                          ║
╠══════════════════════════════════════════════════════════════════════╣</pre>

      <!-- Description block -->
      <div class="nfo-release__body">
        <div class="nfo-release__section">
          <p class="nfo-release__label text-cyan">[ ABOUT THIS RELEASE ]</p>
          <p class="nfo-release__text">
            Cybersecurity student, red teamer, and CTF competitor based in NYC.<br>
            Currently attending St. John's University (B.S. Cybersecurity, 2028).<br>
            GPA: <span class="text-yellow">3.86</span> &nbsp;|&nbsp; Team: <span class="text-cyan">Cyberstorm</span> &nbsp;|&nbsp; Handle: <span class="text-white">AyaanBhatti-dotcom</span>
          </p>
        </div>

        <div class="nfo-release__divider" aria-hidden="true">
          ╠══════════════════════════════════════════════════════════════════════╣
        </div>

        <div class="nfo-release__section">
          <p class="nfo-release__label text-cyan">[ DISTRIBUTION SITES ]</p>
          <ul class="nfo-release__distro" role="list">
            <li>
              <span class="text-dim"># 01 &nbsp;</span>
              <a href="https://github.com/AyaanBhatti-dotcom"
                 class="nfo-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="GitHub profile">
                GITHUB ...................... github.com/AyaanBhatti-dotcom
              </a>
            </li>
            <li>
              <span class="text-dim"># 02 &nbsp;</span>
              <a href="https://www.linkedin.com/in/ayaan-bhatti-0970a7346/"
                 class="nfo-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="LinkedIn profile">
                LINKEDIN .................. linkedin.com/in/ayaan-bhatti
              </a>
            </li>
            <li>
              <span class="text-dim"># 03 &nbsp;</span>
              <a href="mailto:a.bhatti3005@gmail.com"
                 class="nfo-link"
                 aria-label="Email Ayaan">
                EMAIL ..................... a.bhatti3005@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div class="nfo-release__divider" aria-hidden="true">
          ╚══════════════════════════════════════════════════════════════════════╝
        </div>
      </div>

      <!-- Typing animation tagline -->
      <p class="hero-tagline" aria-live="polite">
        <span class="text-dim">root@ayaan:~# </span>
        <span id="typed-tagline" class="text-white"></span>
        <span class="typed-cursor text-cyan" aria-hidden="true">█</span>
      </p>
    </div>

  </div>
</section>
```

2. Add to `css/components.css`:
```css
/* ─── HERO / NFO RELEASE ─────────────────────────────────────── */
.hero-section {
  padding-top: var(--space-xl);
}

.nfo-release {
  font-family: var(--font-mono);
}

.nfo-release__header {
  color: var(--color-cyan);
  font-size: var(--text-sm);
  line-height: 1.4;
  margin: 0;
  text-shadow: var(--glow-cyan);
  overflow-x: auto;
  white-space: pre;
}

.nfo-release__body {
  border-left: 1px solid var(--color-border-dim);
  border-right: 1px solid var(--color-border-dim);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-panel);
}

.nfo-release__section {
  padding: var(--space-sm) 0;
}

.nfo-release__label {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-xs);
  text-shadow: var(--glow-cyan);
}

.nfo-release__text {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: 1.8;
}

.nfo-release__divider {
  color: var(--color-border-dim);
  font-size: var(--text-sm);
  white-space: pre;
  overflow-x: auto;
  line-height: 1;
  padding: var(--space-xs) 0;
}

.nfo-release__distro {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.nfo-link {
  color: var(--color-cyan);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  transition: color 0.15s, text-shadow 0.15s;
}

.nfo-link:hover,
.nfo-link:focus-visible {
  color: var(--color-text-bright);
  text-shadow: var(--glow-cyan);
  outline: none;
}

.nfo-link:focus-visible {
  outline: 1px dotted var(--color-cyan);
}

/* Typing animation */
.hero-tagline {
  padding: var(--space-sm) 0 var(--space-xs);
  font-size: var(--text-base);
  min-height: 2em;
}

.typed-cursor {
  animation: blink 0.8s step-end infinite;
  font-size: var(--text-base);
}
```

3. Add typing effect to `js/effects.js`:
```js
// ─── TYPING EFFECT ────────────────────────────────────────────
function initTypingEffect(elementId, phrases, speed = 60, pause = 2000) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, pause);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const delay = isDeleting ? speed / 2 : speed;
    setTimeout(type, delay);
  }
  type();
}

// Init typing on load
document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect('typed-tagline', [
    'cat README.NFO',
    'nmap -sV target.local',
    'python3 exploit.py',
    'cd /root/cyberstorm/',
    'hashcat -m 22000 capture.hccapx wordlist.txt',
  ]);
});
```

**Deliverables**: Updated `index.html`, `css/components.css` (hero section), `js/effects.js` (typing effect)

**Testing Criteria**:
- NFO box borders render correctly in cyan
- Typing animation cycles through all phrases
- All 3 links are clickable (GitHub opens in new tab, email uses mailto)
- Section accessible via `#hero` anchor

**Token Estimate**: ~9,000 tokens

---

### CHUNK 5: About Section (Education in ASCII Panel)

**Objective**: Build the About/Education section displayed as an ASCII panel with structured "database record" format — think a terminal `whois` or `ldapsearch` output for personal/academic information.

**Skills to Consult**:
- `ckm:design` — Information hierarchy and panel layout patterns
- `ui-ux-pro-max` — Terminal `whois`/record output aesthetics
- `ckm:ui-styling` — Panel border and record row styling

**Tasks**:

1. Add to `index.html` after hero section:
```html
<!-- ─── ABOUT / EDUCATION ─────────────────────────────────────── -->
<section id="about" class="section" aria-labelledby="about-heading">
  <div class="container">

    <!-- Section title -->
    <div class="section-title" aria-hidden="true">
      <span class="text-cyan">╔══[ </span>
      <h2 id="about-heading" class="section-title__text">ABOUT.TXT</h2>
      <span class="text-cyan"> ]</span>
      <span class="section-title__rule text-dim"> ═══════════════════════════════════</span>
    </div>

    <!-- WHOIS record block -->
    <div class="record-panel nfo-panel" role="region" aria-label="Personal information record">
      <p class="record-panel__command text-dim" aria-label="Command prompt">
        <span class="text-text">root@ayaan:~# </span>whois ayaan.bhatti
      </p>

      <dl class="record-list">
        <div class="record-row">
          <dt class="record-key text-cyan">HANDLE</dt>
          <dd class="record-value text-white">AyaanBhatti-dotcom</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">ROLE</dt>
          <dd class="record-value text-white">Cybersecurity Student / Red Teamer / CTF Competitor</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">LOCATION</dt>
          <dd class="record-value text-white">New York City, USA</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">STATUS</dt>
          <dd class="record-value">
            <span class="status-badge status-badge--active">ACTIVE</span>
            <span class="text-dim"> &nbsp;[NECCDC COMPETITOR]</span>
          </dd>
        </div>
      </dl>

      <div class="record-divider text-dim" aria-hidden="true">
        ├──────────────────────────────────────────────────────────────────┤
      </div>

      <!-- Education sub-block -->
      <p class="record-panel__command text-dim" aria-label="Education query">
        <span class="text-text">root@ayaan:~# </span>cat education.log
      </p>

      <dl class="record-list">
        <div class="record-row">
          <dt class="record-key text-cyan">INSTITUTION</dt>
          <dd class="record-value text-white">St. John's University</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">DEGREE</dt>
          <dd class="record-value text-white">Bachelor of Science — Cybersecurity</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">EXPECTED</dt>
          <dd class="record-value text-white">2028</dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">GPA</dt>
          <dd class="record-value">
            <span class="text-yellow">3.86</span>
            <span class="text-dim"> / 4.0</span>
          </dd>
        </div>
        <div class="record-row">
          <dt class="record-key text-cyan">TEAM</dt>
          <dd class="record-value">
            <a href="#experience" class="nfo-link">Cyberstorm</a>
            <span class="text-dim"> — Competitive Security Team</span>
          </dd>
        </div>
      </dl>

      <!-- Closing prompt -->
      <p class="record-panel__command text-dim" aria-hidden="true">
        <span class="text-text">root@ayaan:~# </span>
        <span class="typed-cursor text-cyan">█</span>
      </p>
    </div>

  </div>
</section>
```

2. Add to `css/components.css`:
```css
/* ─── SECTION TITLE ──────────────────────────────────────────── */
.section-title {
  display: flex;
  align-items: baseline;
  gap: 0;
  margin-bottom: var(--space-md);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  white-space: nowrap;
  overflow: hidden;
}

.section-title__text {
  font-family: var(--font-pixel);
  font-size: clamp(10px, 1.5vw, 14px);
  color: var(--color-cyan);
  text-shadow: var(--glow-cyan);
  font-weight: normal;
  letter-spacing: 0.15em;
  white-space: nowrap;
}

.section-title__rule {
  flex: 1;
  overflow: hidden;
}

/* ─── RECORD PANEL ───────────────────────────────────────────── */
.record-panel {
  font-family: var(--font-mono);
  padding: var(--space-md);
}

.record-panel__command {
  font-size: var(--text-sm);
  margin-bottom: var(--space-sm);
  opacity: 0.7;
}

.record-list {
  display: grid;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.record-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--space-sm);
  align-items: start;
  font-size: var(--text-base);
  padding: 2px 0;
  border-bottom: 1px solid var(--color-border-dim);
}

.record-key {
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  text-align: right;
  padding-right: var(--space-xs);
  opacity: 0.9;
}

.record-value {
  color: var(--color-text);
  line-height: 1.5;
}

.record-divider {
  font-size: var(--text-sm);
  overflow-x: auto;
  white-space: pre;
  padding: var(--space-xs) 0;
  margin: var(--space-xs) 0;
}

/* Status badge */
.status-badge {
  display: inline-block;
  padding: 1px 6px;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  border: 1px solid currentColor;
  letter-spacing: 0.1em;
}

.status-badge--active {
  color: var(--color-text);
  border-color: var(--color-text);
  text-shadow: var(--glow-green);
  box-shadow: var(--glow-green);
}
```

**Deliverables**: Updated `index.html`, `css/components.css` (section title + record panel)

**Testing Criteria**:
- All education fields render correctly
- GPA shows in yellow
- Section heading properly labeled with `id="about-heading"`
- `aria-labelledby` correctly links heading to section
- Record grid aligns cleanly on all screen sizes ≥320px

**Token Estimate**: ~8,000 tokens

---

### CHUNK 6: Experience Section (Terminal Window)

**Objective**: Build the Experience section as a terminal window UI — a fake `bash` session window with chrome (title bar, traffic lights, window controls), displaying the Cyberstorm experience as terminal output.

**Skills to Consult**:
- `ckm:design` — Terminal window chrome patterns and visual hierarchy
- `skillchain:blueprints:dashboard` — Panel/widget layout structures
- `ckm:ui-styling` — Window chrome CSS, list item styling

**CRITICAL CONTENT NOTE**: Use **"Competing at NECCDC regionals"** (present tense). Never "competed."

**Tasks**:

1. Add to `index.html` after about section:
```html
<!-- ─── EXPERIENCE ────────────────────────────────────────────── -->
<section id="experience" class="section" aria-labelledby="exp-heading">
  <div class="container">

    <div class="section-title" aria-hidden="true">
      <span class="text-cyan">╔══[ </span>
      <h2 id="exp-heading" class="section-title__text">EXPERIENCE.LOG</h2>
      <span class="text-cyan"> ]</span>
      <span class="section-title__rule text-dim"> ═════════════════════════════</span>
    </div>

    <!-- Terminal window chrome -->
    <div class="terminal-window" role="region" aria-label="Experience terminal window">

      <!-- Title bar -->
      <div class="terminal-window__titlebar" aria-hidden="true">
        <span class="terminal-window__dots">
          <span class="dot dot--red"></span>
          <span class="dot dot--yellow"></span>
          <span class="dot dot--green"></span>
        </span>
        <span class="terminal-window__title">bash — experience.sh — 80×24</span>
      </div>

      <!-- Terminal body -->
      <div class="terminal-window__body">

        <!-- Command -->
        <p class="term-line">
          <span class="term-prompt text-text">cyberstorm@sjunix:~$</span>
          <span class="term-cmd text-white"> cat experience.txt</span>
        </p>

        <!-- Output -->
        <div class="term-output">
          <p class="term-line">
            <span class="text-yellow">╔══ CYBERSTORM TEAM MEMBER ══════════════════════════════════╗</span>
          </p>
          <p class="term-line">
            <span class="text-dim">║ </span>
            <span class="text-cyan">ORG.....: </span>
            <span class="text-white">St. John's University</span>
          </p>
          <p class="term-line">
            <span class="text-dim">║ </span>
            <span class="text-cyan">PERIOD..: </span>
            <span class="text-white">2024 — Current</span>
          </p>
          <p class="term-line">
            <span class="text-dim">║ </span>
            <span class="text-cyan">ROLE....: </span>
            <span class="text-white">Competitive Cybersecurity Team Member</span>
          </p>
          <p class="term-line">
            <span class="text-yellow">╠════════════════════════════════════════════════════════════╣</span>
          </p>
          <p class="term-line">
            <span class="text-dim">║ </span>
            <span class="text-cyan">DUTIES..: </span>
          </p>

          <ul class="term-list" role="list" aria-label="Responsibilities">
            <li class="term-list-item">
              <span class="text-text">► </span>
              <span>Competing at NECCDC regionals as part of the Cyberstorm blue team</span>
            </li>
            <li class="term-list-item">
              <span class="text-text">► </span>
              <span>Train weekly on offensive security via TryHackMe rooms and penetration testing exercises</span>
            </li>
            <li class="term-list-item">
              <span class="text-text">► </span>
              <span>Practice web exploitation, privilege escalation, and Linux-based attack methodologies</span>
            </li>
            <li class="term-list-item">
              <span class="text-text">► </span>
              <span>Participate in CTF competitions including BSides and PatriotCTF</span>
            </li>
          </ul>

          <p class="term-line">
            <span class="text-yellow">╚════════════════════════════════════════════════════════════╝</span>
          </p>
        </div>

        <!-- Return prompt -->
        <p class="term-line term-line--prompt">
          <span class="term-prompt text-text">cyberstorm@sjunix:~$</span>
          <span class="typed-cursor text-cyan" aria-hidden="true"> █</span>
        </p>

      </div>
    </div>

  </div>
</section>
```

2. Add to `css/components.css`:
```css
/* ─── TERMINAL WINDOW ────────────────────────────────────────── */
.terminal-window {
  border: 1px solid var(--color-border);
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  box-shadow: var(--glow-cyan);
}

.terminal-window__titlebar {
  background: #1a1a2e;
  padding: var(--space-xs) var(--space-sm);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  border-bottom: 1px solid var(--color-border-dim);
}

.terminal-window__dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot--red    { background: #ff5f56; }
.dot--yellow { background: #ffbd2e; }
.dot--green  { background: #27c93f; }

.terminal-window__title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-dim);
  margin: 0 auto;
}

.terminal-window__body {
  background: var(--color-bg-panel);
  padding: var(--space-md);
  font-family: var(--font-mono);
}

.term-line {
  font-size: var(--text-sm);
  line-height: 1.7;
  white-space: pre-wrap;
}

.term-line--prompt {
  margin-top: var(--space-sm);
}

.term-prompt {
  color: var(--color-text);
  text-shadow: var(--glow-green);
}

.term-cmd {
  letter-spacing: 0.03em;
}

.term-output {
  margin: var(--space-sm) 0;
  padding-left: var(--space-sm);
  border-left: 2px solid var(--color-border-dim);
}

.term-list {
  list-style: none;
  padding-left: var(--space-md);
  margin: var(--space-xs) 0;
}

.term-list-item {
  font-size: var(--text-sm);
  line-height: 1.8;
  color: var(--color-text);
}
```

**Deliverables**: Updated `index.html`, `css/components.css` (terminal window)

**Testing Criteria**:
- Terminal window chrome renders with red/yellow/green dots
- "Competing at NECCDC regionals" text is present and in present tense (verify!)
- Box borders render in yellow/gold
- Section scrollable and accessible

**Token Estimate**: ~8,500 tokens

---

### CHUNK 7: Projects Section (NFO-Style Project Cards)

**Objective**: Build the Projects section with 3 project cards styled as individual NFO release files — each card looks like a separate `.nfo` scene release with header, metadata, file listing, and notes.

**Skills to Consult**:
- `ckm:design` — Card layout patterns and content hierarchy
- `ui-ux-pro-max` — NFO release card aesthetics, scene group file listing style
- `ckm:ui-styling` — Card hover states, border glow effects

**Tasks**:

1. Add to `index.html` after experience:
```html
<!-- ─── PROJECTS ──────────────────────────────────────────────── -->
<section id="projects" class="section" aria-labelledby="projects-heading">
  <div class="container">

    <div class="section-title" aria-hidden="true">
      <span class="text-cyan">╔══[ </span>
      <h2 id="projects-heading" class="section-title__text">PROJECTS.DIR</h2>
      <span class="text-cyan"> ]</span>
      <span class="section-title__rule text-dim"> ══════════════════════════════</span>
    </div>

    <div class="projects-grid">

      <!-- ── PROJECT 1: Club Connect ── -->
      <article class="project-card" aria-label="Project: Club Connect Mobile App">
        <pre class="project-card__header text-cyan" aria-hidden="true">
╔══════════════════════════════════════════════╗
║  ░▒▓ CLUB.CONNECT.2024.NFO ▓▒░              ║
╚══════════════════════════════════════════════╝</pre>

        <div class="project-card__body">
          <dl class="record-list">
            <div class="record-row">
              <dt class="record-key text-cyan">NAME</dt>
              <dd class="record-value text-white">Club Connect Mobile App</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">TYPE</dt>
              <dd class="record-value text-white">Cross-Platform Mobile App</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">STACK</dt>
              <dd class="record-value text-white">React Native, Expo, Cursor AI</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">AWARD</dt>
              <dd class="record-value text-yellow">🏆 Best Track + Fan Favorite</dd>
            </div>
          </dl>

          <div class="project-card__notes">
            <p class="text-dim">[ NOTES ]</p>
            <p>Cross-platform university club discovery and registration app. Won two hackathon awards against many competing teams. Leveraged AI-assisted development with Cursor to accelerate prototyping.</p>
          </div>
        </div>
      </article>

      <!-- ── PROJECT 2: Pwnagotchi ── -->
      <article class="project-card" aria-label="Project: Pwnagotchi WiFi Security Tool">
        <pre class="project-card__header text-cyan" aria-hidden="true">
╔══════════════════════════════════════════════╗
║  ░▒▓ PWNAGOTCHI.RPI.2024.NFO ▓▒░           ║
╚══════════════════════════════════════════════╝</pre>

        <div class="project-card__body">
          <dl class="record-list">
            <div class="record-row">
              <dt class="record-key text-cyan">NAME</dt>
              <dd class="record-value text-white">Pwnagotchi</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">TYPE</dt>
              <dd class="record-value text-white">WiFi Security Research Tool</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">HARDWARE</dt>
              <dd class="record-value text-white">Raspberry Pi</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">TARGET</dt>
              <dd class="record-value text-white">WPA Handshake Capture</dd>
            </div>
          </dl>

          <div class="project-card__notes">
            <p class="text-dim">[ NOTES ]</p>
            <p>Configured autonomous WiFi handshake capture device on Raspberry Pi. Captured and analyzed WPA handshakes to demonstrate network vulnerabilities. Hands-on with passive monitoring and wireless protocol exploitation.</p>
          </div>
        </div>
      </article>

      <!-- ── PROJECT 3: Honeypot Research ── -->
      <article class="project-card" aria-label="Project: Honeypot Research">
        <pre class="project-card__header text-cyan" aria-hidden="true">
╔══════════════════════════════════════════════╗
║  ░▒▓ HONEYPOT.RESEARCH.2024.NFO ▓▒░        ║
╚══════════════════════════════════════════════╝</pre>

        <div class="project-card__body">
          <dl class="record-list">
            <div class="record-row">
              <dt class="record-key text-cyan">NAME</dt>
              <dd class="record-value text-white">Honeypot Research Project</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">TYPE</dt>
              <dd class="record-value text-white">Threat Intelligence / Research</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">PLATFORM</dt>
              <dd class="record-value text-white">Virtual Machines (Cyberstorm)</dd>
            </div>
            <div class="record-row">
              <dt class="record-key text-cyan">OUTPUT</dt>
              <dd class="record-value text-white">Technical Report + Defensive Recs</dd>
            </div>
          </dl>

          <div class="project-card__notes">
            <p class="text-dim">[ NOTES ]</p>
            <p>Deployed honeypots on VMs to capture live malicious activity. Analyzed attack logs for intrusion patterns and attacker behavior. Contributed to a team technical report with defensive recommendations.</p>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>
```

2. Add to `css/components.css`:
```css
/* ─── PROJECTS GRID ──────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}

.project-card {
  border: 1px solid var(--color-border-dim);
  background: var(--color-bg-panel);
  transition: border-color 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.project-card:hover {
  border-color: var(--color-cyan);
  box-shadow: var(--glow-cyan);
}

.project-card__header {
  font-family: var(--font-mono);
  font-size: clamp(9px, 1.2vw, 11px);
  color: var(--color-cyan);
  text-shadow: var(--glow-cyan);
  margin: 0;
  line-height: 1.3;
  white-space: pre;
  overflow-x: auto;
}

.project-card__body {
  padding: var(--space-sm);
}

.project-card__notes {
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border-dim);
  font-size: var(--text-sm);
  color: var(--color-text);
  line-height: 1.7;
}

.project-card__notes .text-dim {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
}

/* Override record-row for compact project cards */
.project-card .record-row {
  grid-template-columns: 90px 1fr;
  font-size: var(--text-sm);
}

.project-card .record-key {
  font-size: var(--text-xs);
}
```

**Deliverables**: Updated `index.html`, `css/components.css` (projects grid + cards)

**Testing Criteria**:
- 3 project cards render in responsive grid (1 col on mobile, up to 3 on wide screens)
- Hover glows cyan correctly
- All metadata fields populated accurately
- Award highlight displays in yellow for Club Connect
- No content overflow issues on 320px mobile

**Token Estimate**: ~10,000 tokens

---

### CHUNK 8: Skills Section (Terminal Output Grid)

**Objective**: Build the Skills section as a `ls -la` or `dpkg -l` style terminal output listing skills with category headers, styled checkmarks/indicators, and "version" metadata.

**Skills to Consult**:
- `ui-ux-pro-max` — Terminal `dpkg` / `ls -la` output aesthetic patterns
- `ckm:ui-styling` — Grid layout for badge/tag systems
- `ckm:design` — Visual hierarchy for categorized skill lists

**Tasks**:

1. Add to `index.html` after projects:
```html
<!-- ─── SKILLS ────────────────────────────────────────────────── -->
<section id="skills" class="section" aria-labelledby="skills-heading">
  <div class="container">

    <div class="section-title" aria-hidden="true">
      <span class="text-cyan">╔══[ </span>
      <h2 id="skills-heading" class="section-title__text">SKILLS.SH</h2>
      <span class="text-cyan"> ]</span>
      <span class="section-title__rule text-dim"> ══════════════════════════════════</span>
    </div>

    <div class="terminal-window" role="region" aria-label="Skills terminal output">

      <div class="terminal-window__titlebar" aria-hidden="true">
        <span class="terminal-window__dots">
          <span class="dot dot--red"></span>
          <span class="dot dot--yellow"></span>
          <span class="dot dot--green"></span>
        </span>
        <span class="terminal-window__title">bash — skills.sh — 80×24</span>
      </div>

      <div class="terminal-window__body">
        <p class="term-line">
          <span class="term-prompt text-text">root@ayaan:~$</span>
          <span class="term-cmd text-white"> ./skills.sh --list-all</span>
        </p>
        <p class="term-line text-dim">Loading skill modules... <span class="text-text">OK</span></p>
        <br>

        <!-- Category: Operating Systems -->
        <p class="skills-category text-yellow">[ OPERATING SYSTEMS ]</p>
        <div class="skills-grid" role="list" aria-label="Operating systems skills">
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">kali-linux</span>
            <span class="skill-ver text-dim">2024.x</span>
            <span class="skill-desc text-dim">Penetration Testing OS</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">linux-fundamentals</span>
            <span class="skill-ver text-dim">5.x</span>
            <span class="skill-desc text-dim">Bash, CLI, System Admin</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">virtual-machines</span>
            <span class="skill-ver text-dim">vmware/vbox</span>
            <span class="skill-desc text-dim">Lab Environment Setup</span>
          </div>
        </div>

        <!-- Category: Programming -->
        <p class="skills-category text-yellow">[ PROGRAMMING LANGUAGES ]</p>
        <div class="skills-grid" role="list" aria-label="Programming language skills">
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">python3</span>
            <span class="skill-ver text-dim">3.x</span>
            <span class="skill-desc text-dim">Scripting, Automation, Exploit Dev</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">java</span>
            <span class="skill-ver text-dim">JDK 17</span>
            <span class="skill-desc text-dim">OOP, Academic Coursework</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">html-css</span>
            <span class="skill-ver text-dim">HTML5/CSS3</span>
            <span class="skill-desc text-dim">Frontend Web Development</span>
          </div>
        </div>

        <!-- Category: Security -->
        <p class="skills-category text-yellow">[ SECURITY & OPERATIONS ]</p>
        <div class="skills-grid" role="list" aria-label="Security skills">
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">active-directory</span>
            <span class="skill-ver text-dim">Win AD</span>
            <span class="skill-desc text-dim">AD Enumeration &amp; Attacks</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">red-team</span>
            <span class="skill-ver text-dim">NECCDC</span>
            <span class="skill-desc text-dim">Offensive Security, CTF</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">blue-team</span>
            <span class="skill-ver text-dim">NECCDC</span>
            <span class="skill-desc text-dim">Defense, Log Analysis, Hardening</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">malware-analysis</span>
            <span class="skill-ver text-dim">static/dyn</span>
            <span class="skill-desc text-dim">Reverse Engineering Fundamentals</span>
          </div>
          <div class="skill-item" role="listitem">
            <span class="skill-status text-text">ii</span>
            <span class="skill-name text-white">networking</span>
            <span class="skill-ver text-dim">TCP/IP</span>
            <span class="skill-desc text-dim">Protocols, Packet Analysis</span>
          </div>
        </div>

        <p class="term-line text-dim" style="margin-top: var(--space-sm)">
          15 packages loaded. 0 errors. 0 warnings.
        </p>
        <p class="term-line">
          <span class="term-prompt text-text">root@ayaan:~$</span>
          <span class="typed-cursor text-cyan" aria-hidden="true"> █</span>
        </p>
      </div>
    </div>

  </div>
</section>
```

2. Add to `css/components.css`:
```css
/* ─── SKILLS SECTION ──────────────────────────────────────────── */
.skills-category {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  margin: var(--space-sm) 0 var(--space-xs);
  text-shadow: 0 0 8px currentColor;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: var(--space-xs);
  padding-left: var(--space-sm);
}

.skill-item {
  display: grid;
  grid-template-columns: 20px 180px 90px 1fr;
  gap: var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  padding: 2px 0;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 65, 0.05);
  transition: background 0.1s;
}

.skill-item:hover {
  background: rgba(0, 255, 255, 0.04);
}

.skill-status {
  font-size: var(--text-xs);
  opacity: 0.8;
}

.skill-name {
  letter-spacing: 0.03em;
}

.skill-ver {
  font-size: var(--text-xs);
  opacity: 0.6;
}

.skill-desc {
  font-size: var(--text-xs);
  opacity: 0.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Deliverables**: Updated `index.html`, `css/components.css` (skills section)

**Testing Criteria**:
- All 3 skill categories render with yellow headers
- `dpkg`-style row grid aligns on desktop
- On mobile (320px): grid collapses gracefully (test with overflow/wrapping)
- Hover state on skill rows works
- All 10+ skills are present

**Token Estimate**: ~8,000 tokens

---

### CHUNK 9: Contact Section & Footer (NFO Credits)

**Objective**: Build the Contact section and footer styled as an NFO file "GREETS" and "CREDITS" section — the traditional closing of a scene release file with shoutouts, contact links, and a group ASCII logo.

**Skills to Consult**:
- `ckm:design` — Footer layout and social link patterns
- `ckm:brand` — Consistent brand identity closure
- `ui-ux-pro-max` — NFO credits/greets section formatting conventions

**Tasks**:

1. Add to `index.html` after skills:
```html
<!-- ─── CONTACT ───────────────────────────────────────────────── -->
<section id="contact" class="section" aria-labelledby="contact-heading">
  <div class="container">

    <div class="section-title" aria-hidden="true">
      <span class="text-cyan">╔══[ </span>
      <h2 id="contact-heading" class="section-title__text">CONTACT.NFO</h2>
      <span class="text-cyan"> ]</span>
      <span class="section-title__rule text-dim"> ═════════════════════════════</span>
    </div>

    <div class="nfo-panel">
      <pre class="text-cyan text-sm" aria-hidden="true">╔══════════════════════════════════════════════════════════════════════╗
║                        [ GREETS & CONTACT ]                        ║
╚══════════════════════════════════════════════════════════════════════╝</pre>

      <div class="contact-grid">
        <!-- Contact links -->
        <div class="contact-links">
          <p class="text-dim text-sm" style="margin-bottom: var(--space-sm)">[ REACH ME ]</p>

          <ul class="contact-list" role="list">
            <li>
              <span class="text-cyan text-sm">EMAIL &nbsp;&nbsp;..</span>
              <a href="mailto:a.bhatti3005@gmail.com"
                 class="nfo-link"
                 aria-label="Email Ayaan Bhatti">
                a.bhatti3005@gmail.com
              </a>
            </li>
            <li>
              <span class="text-cyan text-sm">GITHUB &nbsp;..</span>
              <a href="https://github.com/AyaanBhatti-dotcom"
                 class="nfo-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="GitHub: AyaanBhatti-dotcom">
                AyaanBhatti-dotcom
              </a>
            </li>
            <li>
              <span class="text-cyan text-sm">LINKEDIN .</span>
              <a href="https://www.linkedin.com/in/ayaan-bhatti-0970a7346/"
                 class="nfo-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="LinkedIn profile">
                /in/ayaan-bhatti
              </a>
            </li>
            <li>
              <span class="text-cyan text-sm">PHONE &nbsp;&nbsp;.</span>
              <a href="tel:9292349944"
                 class="nfo-link"
                 aria-label="Phone number">
                929-234-9944
              </a>
            </li>
          </ul>
        </div>

        <!-- Greets block -->
        <div class="contact-greets">
          <p class="text-dim text-sm" style="margin-bottom: var(--space-sm)">[ GREETS ]</p>
          <p class="text-base" style="line-height: 2">
            <span class="text-cyan">Cyberstorm Team</span><span class="text-dim"> .. still competing ..</span><br>
            <span class="text-cyan">St. John's University</span><span class="text-dim"> .. #1 in Queens ..</span><br>
            <span class="text-cyan">NECCDC 2026</span><span class="text-dim"> .. see you at regionals ..</span><br>
            <span class="text-cyan">BSides / PatriotCTF</span><span class="text-dim"> .. always learning ..</span>
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ─── FOOTER ─────────────────────────────────────────────────── -->
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <pre class="site-footer__border text-dim" aria-hidden="true">
╔══════════════════════════════════════════════════════════════════════╗</pre>
    <div class="site-footer__inner">
      <p class="text-dim text-sm">
        <span class="text-cyan">AYAAN.BHATTI-DOTCOM</span>
        <span class="text-dim"> // </span>
        <span>CYBERSEC PORTFOLIO</span>
        <span class="text-dim"> // </span>
        <span id="footer-year" class="text-text">2025</span>
      </p>
      <p class="text-dim text-xs" style="margin-top: var(--space-xs)">
        BUILT WITH: HTML5 + CSS3 + VANILLA JS &nbsp;|&nbsp; HOSTED ON GITHUB PAGES
      </p>
      <p class="text-dim text-xs" style="margin-top: var(--space-xs); opacity: 0.5">
        NFO AESTHETIC INSPIRED BY ACiD PRODUCTIONS, RAZOR 1911 &amp; CODEX
      </p>
    </div>
    <pre class="site-footer__border text-dim" aria-hidden="true">
╚══════════════════════════════════════════════════════════════════════╝</pre>
  </div>
</footer>
```

2. Add to `css/components.css`:
```css
/* ─── CONTACT ────────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  padding: var(--space-md) 0;
}

.contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.contact-list li {
  display: flex;
  gap: var(--space-xs);
  align-items: baseline;
}

.contact-greets {
  font-family: var(--font-mono);
}

/* ─── FOOTER ──────────────────────────────────────────────────── */
.site-footer {
  padding: var(--space-xl) 0 var(--space-lg);
  margin-top: var(--space-2xl);
  border-top: 1px solid var(--color-border-dim);
}

.site-footer__border {
  font-size: var(--text-xs);
  color: var(--color-border-dim);
  overflow-x: auto;
  white-space: pre;
  line-height: 1;
}

.site-footer__inner {
  padding: var(--space-sm) 0;
  text-align: center;
  font-family: var(--font-mono);
}

@media (max-width: 600px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
```

3. Add to `js/main.js`:
```js
// Dynamic footer year
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
```

**Deliverables**: Updated `index.html`, `css/components.css` (contact + footer), `js/main.js` (year)

**Testing Criteria**:
- All 4 contact links functional (email opens mail client, phone dials, GitHub/LinkedIn open new tab)
- Contact grid goes to single column on <600px mobile
- Footer year auto-updates
- Footer NFO borders render

**Token Estimate**: ~8,500 tokens

---

### CHUNK 10: CRT & Glitch Effects (CSS Animations)

**Objective**: Add all visual effects: CRT scanline overlay, phosphor glow on text, glitch effect (RGB split) on hover, screen flicker, vignette, and subtle chromatic aberration.

**Skills to Consult**:
- `ckm:ui-styling` — CSS animation patterns, `@keyframes`, filter effects
- `ui-ux-pro-max` — CRT/phosphor glow aesthetic reference, chromatic aberration values

**Tasks**:

1. Add `css/effects.css`:
```css
/* ═══════════════════════════════════════════════════════════════
   EFFECTS.CSS — CRT, Glitch, Glow, Scanlines
   ═══════════════════════════════════════════════════════════════ */

/* ─── CRT OVERLAY ─────────────────────────────────────────────── */
/* Full-screen fixed overlay for scanlines + vignette */
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  /* Scanlines via repeating gradient */
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    var(--scanline-color) 2px,
    var(--scanline-color) 4px
  );
}

/* Vignette using a pseudo-element on body */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  background: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

/* ─── PHOSPHOR GLOW ───────────────────────────────────────────── */
/* Applied to all primary text elements by default */
h1, h2, h3, .nfo-header__logo, .section-title__text {
  text-shadow: var(--glow-cyan);
}

/* Body text phosphor (subtle) */
body {
  text-shadow: 0 0 4px rgba(0, 255, 65, 0.2);
}

/* ─── GLITCH EFFECT (hover) ───────────────────────────────────── */
/* Apply .glitch class to any element for RGB-split on hover */
.glitch {
  position: relative;
  display: inline-block;
}

.glitch:hover {
  animation: glitch-base 0.3s steps(2) 1;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.glitch:hover::before {
  opacity: 0.8;
  color: var(--color-magenta);
  clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
  transform: translateX(-3px);
  animation: glitch-r 0.3s steps(2) 1;
}

.glitch:hover::after {
  opacity: 0.8;
  color: var(--color-blue);
  clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%);
  transform: translateX(3px);
  animation: glitch-b 0.3s steps(2) 1;
}

@keyframes glitch-base {
  0%  { transform: none; }
  20% { transform: translateX(-2px) skewX(-1deg); }
  40% { transform: translateX(2px) skewX(1deg); }
  60% { transform: translateX(-1px); }
  80% { transform: none; }
}

@keyframes glitch-r {
  0%  { transform: translateX(-3px); }
  50% { transform: translateX(2px); }
  100%{ transform: translateX(-3px); }
}

@keyframes glitch-b {
  0%  { transform: translateX(3px); }
  50% { transform: translateX(-2px); }
  100%{ transform: translateX(3px); }
}

/* ─── SCREEN FLICKER ──────────────────────────────────────────── */
/* Subtle CRT power-on flicker applied to body once */
body {
  animation: screen-flicker 0.15s ease-in-out 3;
}

@keyframes screen-flicker {
  0%   { opacity: 0.95; }
  25%  { opacity: 0.88; }
  50%  { opacity: 1;    }
  75%  { opacity: 0.92; }
  100% { opacity: 1;    }
}

/* ─── NEON BORDER PULSE ───────────────────────────────────────── */
/* Applies slow border glow pulse to focused panels */
.nfo-panel:focus-within,
.terminal-window:focus-within {
  animation: border-pulse 2s ease-in-out infinite;
}

@keyframes border-pulse {
  0%, 100% { box-shadow: var(--glow-cyan); }
  50%       { box-shadow: 0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.15); }
}

/* ─── REDUCE MOTION SUPPORT ───────────────────────────────────── */
/* Accessibility: respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .crt-overlay {
    display: none;
  }

  body::after {
    display: none;
  }
}
```

2. Add to `js/effects.js`:
```js
// ─── GLITCH DATA-TEXT SYNC ────────────────────────────────────
// Sync data-text attributes for glitch pseudo-elements
(function syncGlitchText() {
  document.querySelectorAll('.glitch').forEach(el => {
    if (!el.dataset.text) {
      el.dataset.text = el.textContent;
    }
  });
})();

// ─── RANDOM GLITCH FLICKER ────────────────────────────────────
// Randomly applies a brief glitch class to elements
(function randomGlitch() {
  const targets = document.querySelectorAll('.nfo-header__logo, .section-title__text');
  if (!targets.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  setInterval(() => {
    const el = targets[Math.floor(Math.random() * targets.length)];
    el.classList.add('is-glitching');
    setTimeout(() => el.classList.remove('is-glitching'), 200);
  }, 4000 + Math.random() * 3000);
})();
```

3. Add to `css/effects.css`:
```css
/* Random glitch state */
.is-glitching {
  animation: glitch-base 0.2s steps(3) 1;
  filter: brightness(1.3);
}
```

**Deliverables**: Complete `css/effects.css`, updated `js/effects.js`

**Testing Criteria**:
- Scanlines visible as subtle horizontal lines over content
- Vignette darkens page corners
- Body flickers 3 times on load (then stops)
- Hovering `.glitch` elements shows RGB split
- `prefers-reduced-motion: reduce` disables all animations (test in browser accessibility settings)
- No performance degradation (test in Chrome DevTools Performance panel)

**Token Estimate**: ~7,500 tokens

---

### CHUNK 11: Responsive Layout (Mobile Breakpoints)

**Objective**: Add all mobile/tablet breakpoints. Ensure the site is fully usable from 320px (iPhone SE) to 2560px (wide desktop). Key challenge: NFO ASCII art needs horizontal scroll on small screens while main content stacks cleanly.

**Skills to Consult**:
- `skillchain:categories:frontend` — Mobile-first responsive patterns
- `ckm:design-system` — Breakpoint scale and grid adaptation
- `ckm:ui-styling` — Responsive typography and layout adjustments

**Tasks**:

1. Add to `css/main.css` (primary responsive overrides file):
```css
/* ═══════════════════════════════════════════════════════════════
   MAIN.CSS — Responsive Overrides & Page Assembly
   ═══════════════════════════════════════════════════════════════ */

/* Import all partials */
@import url('design-system.css');
@import url('layout.css');
@import url('components.css');
@import url('effects.css');

/* ─── BREAKPOINTS ─────────────────────────────────────────────── */
/*
  Mobile:   < 480px  (xs)
  Phablet:  480–768px (sm)
  Tablet:   768–1024px (md)
  Desktop:  > 1024px (lg)
  Wide:     > 1440px (xl)
*/

/* ─── XS: 320–479px ───────────────────────────────────────────── */
@media (max-width: 479px) {
  /* Font scaling — smaller base on mobile */
  :root {
    --text-base: 13px;
    --text-sm:   11px;
  }

  /* Container has extra breathing room on small phones */
  .container {
    padding: 0 var(--space-xs);
  }

  /* Nav wraps to two lines */
  .site-nav__inner {
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .site-nav__prompt {
    width: 100%;
    font-size: 10px;
  }

  .site-nav__list {
    gap: var(--space-xs);
  }

  .site-nav__status {
    display: none; /* Hide status on very small screens */
  }

  /* Header ASCII borders scroll horizontally — contained */
  .nfo-header {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Hero: single column release metadata */
  .nfo-release__meta-line {
    display: block;
    white-space: normal;
    overflow-x: auto;
  }

  /* Record rows: label stacks above value */
  .record-row {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: var(--space-xs) 0;
  }

  .record-key {
    text-align: left;
    font-size: 10px;
    opacity: 0.7;
  }

  /* Project cards: 1 column */
  .projects-grid {
    grid-template-columns: 1fr;
  }

  /* Project card header: smaller text */
  .project-card__header {
    font-size: 8px;
  }

  /* Skills grid: hide version column */
  .skill-item {
    grid-template-columns: 20px 1fr 1fr;
  }

  .skill-ver,
  .skill-desc {
    display: none;
  }

  /* Contact grid: single column */
  .contact-grid {
    grid-template-columns: 1fr;
  }

  /* Disable scanline overlay on mobile (perf) */
  .crt-overlay {
    display: none;
  }
}

/* ─── SM: 480–767px ───────────────────────────────────────────── */
@media (min-width: 480px) and (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .skill-item {
    grid-template-columns: 20px 150px 80px 1fr;
  }

  .skill-desc {
    display: none;
  }
}

/* ─── MD: 768–1023px ──────────────────────────────────────────── */
@media (min-width: 768px) and (max-width: 1023px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skill-item {
    grid-template-columns: 20px 160px 90px 1fr;
  }
}

/* ─── LG: 1024px+ ─────────────────────────────────────────────── */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .skill-item {
    grid-template-columns: 20px 180px 90px 1fr;
  }

  /* Wider container for large screens */
  .container {
    max-width: 960px;
  }
}

/* ─── XL: 1440px+ ─────────────────────────────────────────────── */
@media (min-width: 1440px) {
  .container {
    max-width: 1100px;
  }
}

/* ─── TOUCH IMPROVEMENTS ──────────────────────────────────────── */
@media (hover: none) and (pointer: coarse) {
  /* Remove hover-only effects on touch devices */
  .project-card:hover {
    border-color: var(--color-border-dim);
    box-shadow: none;
  }

  .site-nav__link:hover {
    color: var(--color-cyan);
    background: none;
  }

  /* Larger tap targets for nav links */
  .site-nav__link {
    padding: var(--space-xs) var(--space-sm);
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  /* Larger tap targets for contact links */
  .contact-list li a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}
```

**Deliverables**: Complete `css/main.css`

**Testing Criteria**:
- Test at 320px, 480px, 768px, 1024px, 1440px in browser DevTools device emulator
- No horizontal overflow on body at any width (except intentional ASCII pre blocks)
- Nav links are at least 44px tap target height on mobile
- Projects switch from 1 → 2 → 3 column correctly
- Skills table doesn't break on 320px

**Token Estimate**: ~6,000 tokens

---

### CHUNK 12: Performance Optimization & SEO

**Objective**: Add all meta tags, Open Graph, structured data, font loading optimization, and inline critical CSS. Achieve Lighthouse 90+ across all categories.

**Skills to Consult**:
- `skillchain:categories:devops` — Performance best practices, caching
- `skillchain:categories:frontend` — Lighthouse optimization patterns, SEO meta tags

**Tasks**:

1. Update `<head>` in `index.html` with complete meta tags:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>Ayaan Bhatti | Cybersecurity Portfolio</title>
  <meta name="title"       content="Ayaan Bhatti | Cybersecurity Portfolio">
  <meta name="description" content="Cybersecurity student at St. John's University. CTF competitor, red teamer, NECCDC competitor. Explore my projects including Pwnagotchi, honeypot research, and Club Connect.">
  <meta name="author"      content="Ayaan Bhatti">
  <meta name="keywords"    content="cybersecurity, CTF, NECCDC, red team, blue team, St. John's University, portfolio, Kali Linux, penetration testing">
  <meta name="robots"      content="index, follow">
  <meta name="theme-color" content="#000000">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://ayaanbhatti-dotcom.github.io/">

  <!-- Open Graph / Social -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://ayaanbhatti-dotcom.github.io/">
  <meta property="og:title"       content="Ayaan Bhatti | Cybersecurity Portfolio">
  <meta property="og:description" content="Cybersecurity student, CTF competitor, and red teamer at St. John's University.">
  <meta property="og:image"       content="https://ayaanbhatti-dotcom.github.io/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Ayaan Bhatti | Cybersecurity Portfolio">
  <meta name="twitter:description" content="Cybersecurity student, CTF competitor, and red teamer.">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayaan Bhatti",
    "url": "https://ayaanbhatti-dotcom.github.io",
    "email": "a.bhatti3005@gmail.com",
    "telephone": "929-234-9944",
    "sameAs": [
      "https://github.com/AyaanBhatti-dotcom",
      "https://www.linkedin.com/in/ayaan-bhatti-0970a7346/"
    ],
    "jobTitle": "Cybersecurity Student",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "St. John's University"
    },
    "knowsAbout": [
      "Cybersecurity",
      "Penetration Testing",
      "CTF Competitions",
      "Red Team Operations",
      "Network Security"
    ]
  }
  </script>

  <!-- Fonts — preconnect first, then load -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- Critical CSS inline (prevents FOUC) -->
  <style>
    /* Minimal critical CSS to prevent flash of unstyled content */
    body { background: #000; color: #00FF41; font-family: 'Courier New', monospace; margin: 0; }
    .crt-overlay { display: none; } /* Hidden until effects.css loads */
  </style>

  <!-- Stylesheets — non-render-blocking where possible -->
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/effects.css">
  <link rel="stylesheet" href="css/main.css">

  <!-- Favicon (create a simple terminal > icon) -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⌨</text></svg>">
</head>
```

2. Create `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://ayaanbhatti-dotcom.github.io/sitemap.xml
```

3. Create `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ayaanbhatti-dotcom.github.io/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

4. Add to `js/main.js` — lazy-load CRT overlay after page paint:
```js
// Enable CRT overlay after first paint (prevents blocking render)
window.addEventListener('load', () => {
  const overlay = document.querySelector('.crt-overlay');
  if (overlay) overlay.style.display = 'block';
});
```

5. Add `.noscript` fallback to `index.html` (inside `<body>`, before scripts):
```html
<noscript>
  <style>
    .typed-cursor { display: none; }
    #typed-tagline::before { content: 'cat README.NFO'; }
  </style>
</noscript>
```

**Deliverables**: Updated `index.html` (complete head), `robots.txt`, `sitemap.xml`, updated `js/main.js`

**Testing Criteria**:
- Run Lighthouse in Chrome DevTools → all scores ≥ 90
- Check: Performance, Accessibility, SEO, Best Practices tabs
- `robots.txt` accessible at `https://ayaanbhatti-dotcom.github.io/robots.txt`
- Open Graph data validated with https://www.opengraph.xyz
- JSON-LD validated with Google's Rich Results Test

**Token Estimate**: ~6,500 tokens

---

### CHUNK 13: GitHub Pages Deployment

**Objective**: Push complete site to GitHub, configure GitHub Pages, verify deployment, and test live URL.

**Skills to Consult**:
- `skillchain:categories:devops` — GitHub Pages deployment patterns, custom domain setup
- `skillchain:categories:frontend` — Pre-deploy checklist

**Tasks**:

1. Create `README.md`:
```markdown
# ayaanbhatti-dotcom.github.io

Personal cybersecurity portfolio for Ayaan Bhatti.
Warez/demoscene NFO aesthetic — inspired by ACiD Productions, Razor 1911, and CODEX.

**Live site**: https://ayaanbhatti-dotcom.github.io

## Stack
- Pure HTML5 / CSS3 / Vanilla JS
- No build process
- Google Fonts (VT323, Press Start 2P)
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
├── index.html          ← Single page
├── css/
│   ├── design-system.css
│   ├── layout.css
│   ├── components.css
│   ├── effects.css
│   └── main.css
├── js/
│   ├── effects.js
│   └── main.js
├── robots.txt
├── sitemap.xml
└── README.md
```
```

2. Git initialization and deployment commands (run in terminal):
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial release: cybersec portfolio v1.0"

# Connect to GitHub repository
git remote add origin https://github.com/AyaanBhatti-dotcom/AyaanBhatti-dotcom.github.io.git
git branch -M main
git push -u origin main
```

3. GitHub Pages configuration:
- Navigate to repository on GitHub
- Go to **Settings** → **Pages**
- Under **Source**: select `Deploy from a branch`
- Branch: `main`, Folder: `/ (root)`
- Click **Save**
- Wait 2–5 minutes for deployment

4. Post-deploy verification checklist:
```
[ ] https://ayaanbhatti-dotcom.github.io loads without errors
[ ] Browser console shows no 404s for CSS/JS files
[ ] Fonts (VT323, Press Start 2P) load correctly
[ ] CRT scanlines visible
[ ] Typing animation works
[ ] All nav links scroll to correct sections
[ ] Mobile view at 375px looks correct
[ ] All external links open in new tabs (GitHub, LinkedIn)
[ ] mailto: and tel: links functional
[ ] Lighthouse scores all ≥ 90
[ ] Page title shows "Ayaan Bhatti | Cybersecurity Portfolio"
[ ] robots.txt accessible
```

5. Optional: Add `CNAME` file if using custom domain:
```
# File: CNAME (no extension)
# Content: your-custom-domain.com
```

**Deliverables**: `README.md`, deployed live site at `https://ayaanbhatti-dotcom.github.io`

**Testing Criteria**: All items in verification checklist above are green

**Token Estimate**: ~4,000 tokens

---

## DEPLOYMENT GUIDE

### Prerequisites
- GitHub account with repository `AyaanBhatti-dotcom.github.io` created
- Git installed locally
- All 13 chunks implemented and tested locally

### One-Command Deploy
```bash
git add . && git commit -m "deploy: portfolio update" && git push
```

GitHub Pages auto-deploys on every push to `main`. Live in ~2 minutes.

### Local Preview (no server needed)
Open `index.html` directly in any modern browser. All paths are relative. No `localhost` required.

---

## TESTING CHECKLIST (Pre-Launch)

### Content Verification
- [ ] Name: "Ayaan Bhatti" — spelled correctly throughout
- [ ] Email: `a.bhatti3005@gmail.com` — correct
- [ ] GitHub: `AyaanBhatti-dotcom` — correct handle
- [ ] LinkedIn URL: correct full URL
- [ ] Phone: `929-234-9944` — correct
- [ ] GPA: `3.86` — correct
- [ ] Graduation: `2028` — correct
- [ ] **CRITICAL**: Experience says "Competing at NECCDC regionals" (present tense, NOT "competed")
- [ ] All 3 projects present: Club Connect, Pwnagotchi, Honeypot Research
- [ ] Club Connect awards: "Best Track" and "Fan Favorite" — both mentioned

### Aesthetic Verification
- [ ] CRT scanlines visible on desktop
- [ ] Phosphor glow on headings
- [ ] Blinking cursor in hero and section prompts
- [ ] Typing animation cycles through 5 phrases
- [ ] ASCII box borders render correctly (no fallback squares)
- [ ] Neon cyan/green color scheme consistent
- [ ] Vignette darkens corners on desktop

### Technical Verification
- [ ] No JavaScript errors in console
- [ ] No 404 resource errors
- [ ] All fonts load (VT323, Press Start 2P)
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Keyboard navigation works (Tab through nav, Enter activates links)
- [ ] `prefers-reduced-motion` disables animations

---

## FUTURE ENHANCEMENTS (Post-Launch)

1. **Blog/Write-ups section** — Add CTF write-up posts as separate HTML pages in a `/posts/` directory
2. **Dark/Light toggle** — Swap from green-on-black to black-on-white "document" mode
3. **Certifications section** — Add when CompTIA Security+, eJPT, or other certs earned
4. **Interactive terminal** — JavaScript-based fake terminal with `help`, `ls`, `cat` commands
5. **ASCII art generator** — Convert profile photo to ASCII art for a portrait section
6. **GitHub stats integration** — Fetch public GitHub contribution data via API and render as ASCII bar chart
7. **Custom cursor** — Replace default cursor with a blinking crosshair or terminal block cursor
8. **Sound effects** — Optional: key typing sounds, CRT power-on buzz (with mute toggle)
9. **NECCDC countdown** — Live countdown timer to competition date in NFO panel

---

*End of PRD — AYAAN.BHATTI-PORTFOLIO.2025.NFO*
*Total chunks: 13 | Estimated total tokens: ~95,000*
*Built for Claude Code with locally installed skills*

╔══════════════════════════════════════════════════════╗
║  [ NFO ] GENERATED BY CLAUDE SONNET 4.6             ║
║  [ SRC ] AyaanBhatti-dotcom.github.io               ║
╚══════════════════════════════════════════════════════╝
