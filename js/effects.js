/* ═══════════════════════════════════════════════════════════════════
   EFFECTS — Glitch, scanline, cursor effects
   AyaanBhatti-dotcom.github.io
   ═══════════════════════════════════════════════════════════════════ */

// ─── TYPING EFFECT ─────────────────────────────────────────────────
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

// ─── GLITCH DATA-TEXT SYNC ─────────────────────────────────────────
// Syncs data-text attributes so CSS ::before/::after pseudo-elements
// can mirror the element's text content for the RGB-split effect.
(function syncGlitchText() {
  document.querySelectorAll('.glitch').forEach(el => {
    if (!el.dataset.text) {
      el.dataset.text = el.textContent;
    }
  });
})();

// ─── SPECIAL TEXT SCRAMBLE ─────────────────────────────────────────
// Vanilla JS port of the SpecialText React/motion component.
// Two-phase scramble-then-reveal animation triggered by IntersectionObserver.
//   Phase 1 — expand: fill growing string with random chars until full length
//   Phase 2 — reveal: lock in real chars left-to-right; scramble unrevealed tail
// Applies to every [data-special-text] element on the page.
(function initSpecialText() {
  if (typeof IntersectionObserver === 'undefined') return;

  const CHARS    = '_!X$0-+*#';
  const FRAME_MS = 35; // ~28fps — fast enough to feel digital, slow enough to read

  function rndChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function animate(el) {
    const target = el.textContent;
    const len    = target.length;
    let phase = 1;
    let step  = 0;

    const id = setInterval(() => {
      if (phase === 1) {
        // Grow from nothing to full length with random chars
        const visible = Math.min(step + 1, len);
        let out = '';
        for (let i = 0; i < visible; i++) out += rndChar();
        el.textContent = out;
        step++;
        if (step >= len) { phase = 2; step = 0; }
      } else {
        // Lock real chars in from left; keep scrambling the unrevealed tail
        let out = target.substring(0, step);
        for (let i = step; i < len; i++) {
          out += target[i] === ' ' ? ' ' : rndChar();
        }
        el.textContent = out;
        step++;
        if (step > len) {
          el.textContent = target; // guarantee exact final state
          clearInterval(id);
        }
      }
    }, FRAME_MS);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      animate(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-special-text]').forEach(el => io.observe(el));
})();

// ─── RANDOM GLITCH FLICKER ─────────────────────────────────────────
// Periodically applies a brief glitch burst to the logo and headings.
(function randomGlitch() {
  const targets = document.querySelectorAll('.nfo-header__logo, .section-title__text');
  if (!targets.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function scheduleNext() {
    const delay = 4000 + Math.random() * 3000;
    setTimeout(() => {
      const el = targets[Math.floor(Math.random() * targets.length)];
      el.classList.add('is-glitching');
      setTimeout(() => {
        el.classList.remove('is-glitching');
        scheduleNext();
      }, 200);
    }, delay);
  }
  scheduleNext();
})();

// ─── WEBGL SHADER BACKGROUND ───────────────────────────────────────
// Ported from React ShaderBackground component.
// Re-colored for NFO palette: matrix-green/cyan lines on pure black.
(function initShaderBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'shader-bg';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild);

  const gl = canvas.getContext('webgl');
  if (!gl) return; // graceful degradation — plain black bg remains

  // ── Vertex shader ──────────────────────────────────────────────
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // ── Fragment shader — NFO palette ──────────────────────────────
  // mediump precision: sufficient quality, ~30% cheaper on mobile GPUs.
  // linesPerGroup reduced 16→8: halves the inner loop cost per pixel.
  const fsSource = `
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;

    const float overallSpeed      = 0.2;
    const float gridSmoothWidth   = 0.015;
    const float axisWidth         = 0.05;
    const float majorLineWidth    = 0.025;
    const float minorLineWidth    = 0.0125;
    const float majorLineFrequency = 5.0;
    const float minorLineFrequency = 1.0;
    const float scale             = 5.0;

    /* NFO line color: matrix-green tinted with a hint of cyan */
    const vec4 lineColor          = vec4(0.0, 1.0, 0.6, 1.0);

    const float minLineWidth      = 0.01;
    const float maxLineWidth      = 0.2;
    const float lineSpeed         = 1.0 * overallSpeed;
    const float lineAmplitude     = 1.0;
    const float lineFrequency     = 0.2;
    const float warpSpeed         = 0.2 * overallSpeed;
    const float warpFrequency     = 0.5;
    const float warpAmplitude     = 1.0;
    const float offsetFrequency   = 0.5;
    const float offsetSpeed       = 1.33 * overallSpeed;
    const float minOffsetSpread   = 0.6;
    const float maxOffsetSpread   = 2.0;
    const int   linesPerGroup     = 8;  /* was 16 — halves per-pixel loop cost */

    #define drawCircle(pos, radius, coord) \
      smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
    #define drawSmoothLine(pos, halfWidth, t) \
      smoothstep(halfWidth, 0.0, abs(pos - (t)))
    #define drawCrispLine(pos, halfWidth, t) \
      smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
    #define drawPeriodicLine(freq, width, t) \
      drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    float getPlasmaY(float x, float hFade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed) * hFade * lineAmplitude + offset;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv    = fragCoord / iResolution.xy;
      vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

      float hFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
      float vFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

      space.y += random(space.x * warpFrequency + iTime * warpSpeed)
                 * warpAmplitude * (0.5 + hFade);
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0)
                 * warpAmplitude * hFade;

      vec4 lines = vec4(0.0);

      /* NFO background: pure black to very dark blue-black */
      vec4 bgColor1 = vec4(0.0,  0.0,  0.0,  1.0);
      vec4 bgColor2 = vec4(0.0,  0.02, 0.06, 1.0);

      for (int l = 0; l < linesPerGroup; l++) {
        float nli        = float(l) / float(linesPerGroup);
        float offsetTime = iTime * offsetSpeed;
        float offsetPos  = float(l) + space.x * offsetFrequency;
        float rand       = random(offsetPos + offsetTime) * 0.5 + 0.5;
        float halfWidth  = mix(minLineWidth, maxLineWidth, rand * hFade) / 2.0;
        float offset     = random(offsetPos + offsetTime * (1.0 + nli))
                           * mix(minOffsetSpread, maxOffsetSpread, hFade);
        float linePos    = getPlasmaY(space.x, hFade, offset);
        float line       = drawSmoothLine(linePos, halfWidth, space.y) / 2.0
                         + drawCrispLine(linePos, halfWidth * 0.15, space.y);

        float cx        = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2  cp        = vec2(cx, getPlasmaY(cx, hFade, offset));
        float circle    = drawCircle(cp, 0.01, space) * 4.0;

        lines += (line + circle) * lineColor * rand;
      }

      vec4 color  = mix(bgColor1, bgColor2, uv.x);
      color      *= vFade;
      color.a     = 1.0;
      color      += lines;

      gl_FragColor = color;
    }
  `;

  // ── Compile helpers ────────────────────────────────────────────
  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function buildProgram(vs, fs) {
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Shader link error:', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  const vert = compileShader(gl.VERTEX_SHADER,   vsSource);
  const frag = compileShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vert || !frag) return;

  const program = buildProgram(vert, frag);
  if (!program) return;

  // ── Geometry: full-screen quad ─────────────────────────────────
  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),
    gl.STATIC_DRAW
  );

  const attribPos  = gl.getAttribLocation(program,  'aVertexPosition');
  const uResolution = gl.getUniformLocation(program, 'iResolution');
  const uTime       = gl.getUniformLocation(program, 'iTime');

  // ── Resize handler — renders at 50% resolution, CSS scales up ──
  // Halves the total fragment count (quarter the pixels) with no
  // perceptible quality difference at this opacity level.
  function resize() {
    canvas.width  = Math.floor(window.innerWidth  * 0.5);
    canvas.height = Math.floor(window.innerHeight * 0.5);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  // ── Render loop — capped at 30fps ──────────────────────────────
  // rAF fires at ~60fps; the interval gate skips every other frame.
  // The shader is an ambient background — 30fps is imperceptible.
  const startTime = Date.now();
  const MS_PER_FRAME = 1000 / 30;
  let lastFrame = 0;

  function render(now) {
    requestAnimationFrame(render);
    if (window.__shaderPaused) return;    // paused while fullscreen menu is open
    if (now - lastFrame < MS_PER_FRAME) return;
    lastFrame = now;

    const t = (Date.now() - startTime) / 1000;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.vertexAttribPointer(attribPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribPos);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  requestAnimationFrame(render);
})();
