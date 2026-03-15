/* ═══════════════════════════════════════════════════════════════════
   MAIN — Init and event bindings
   AyaanBhatti-dotcom.github.io
   ═══════════════════════════════════════════════════════════════════ */

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

// ─── SCROLL SPY ────────────────────────────────────────────────────
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

// Dynamic footer year
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Enable CRT overlay after first paint — keeps it off the critical render path
window.addEventListener('load', () => {
  const overlay = document.querySelector('.crt-overlay');
  if (overlay) overlay.style.display = 'block';
});

// ─── FULLSCREEN VERTICAL MENU ───────────────────────────────────────
// Port of MenuVertical React/motion component.
// Manages open/close state, focus trap (ESC), body scroll lock,
// and ARIA attributes for the fullscreen overlay nav.
(function initMenuOverlay() {
  const hamburger  = document.querySelector('.nav-hamburger');
  const overlay    = document.getElementById('menu-overlay');
  const closeBtn   = document.querySelector('.menu-overlay__close');
  const menuLinks  = document.querySelectorAll('[data-menu-link]');

  if (!hamburger || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    window.__shaderPaused = true;   // pause WebGL shader — frees GPU for overlay
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    window.__shaderPaused = false;  // resume shader
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    overlay.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // ESC key closes the overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Clicking a nav link closes overlay and scrolls to section
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Clicking the dark backdrop (not the menu itself) closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });
})();
