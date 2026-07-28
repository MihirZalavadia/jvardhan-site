/* J.Vardhan design-system behaviors: theme, veil lift, reveals, gold draw, petals */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* engage the animation layer ONLY when JS is alive and motion is allowed;
     without this class the site renders fully visible with zero animation */
  if (!reduce) { root.classList.add('anim'); }

  /* ----- theme (Day/Dusk) ----- */
  function setTheme(t) {
    if (t === 'dusk') { root.setAttribute('data-theme', 'dusk'); } else { root.removeAttribute('data-theme'); }
    var day = document.getElementById('btnDay'), dusk = document.getElementById('btnDusk');
    if (day) { day.setAttribute('aria-pressed', String(t !== 'dusk')); }
    if (dusk) { dusk.setAttribute('aria-pressed', String(t === 'dusk')); }
    try { localStorage.setItem('jv-theme', t); } catch (e) {}
  }
  window.jvSetTheme = setTheme;
  var saved = null;
  try { saved = localStorage.getItem('jv-theme'); } catch (e) {}
  if (saved) { setTheme(saved); }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { setTheme('dusk'); }
  document.addEventListener('DOMContentLoaded', function () {
    var day = document.getElementById('btnDay'), dusk = document.getElementById('btnDusk');
    if (day) { day.addEventListener('click', function () { setTheme('day'); }); }
    if (dusk) { dusk.addEventListener('click', function () { setTheme('dusk'); }); }
  });

  /* ===== ornaments & navigation layer ===== */
  document.addEventListener('DOMContentLoaded', function () {
    function slowDraw(el, dur, stagger) {
      var shapes = el.querySelectorAll('path, circle, line');
      shapes.forEach(function (s, i) {
        try {
          var len = s.getTotalLength();
          s.style.strokeDasharray = len;
          s.style.strokeDashoffset = len;
          s.style.transition = 'stroke-dashoffset ' + dur + 'ms cubic-bezier(.22,.8,.3,1) ' + (i * stagger) + 'ms';
          requestAnimationFrame(function () { requestAnimationFrame(function () { s.style.strokeDashoffset = 0; }); });
        } catch (e) {}
      });
    }

    /* hamburger menu (injected — no per-page markup needed) */
    var nav = document.querySelector('.site-nav');
    var links = nav ? nav.querySelector('.nav-links') : null;
    if (nav && links) {
      var burger = document.createElement('button');
      burger.className = 'nav-burger';
      burger.setAttribute('aria-label', 'Menu');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = '<span></span><span></span><span></span>';
      nav.appendChild(burger);
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(open));
      });
      links.addEventListener('click', function (ev) {
        if (ev.target.closest && ev.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
      });
    }

    /* flowering corner vines (desktop) */
    if (window.matchMedia && window.matchMedia('(min-width: 1100px)').matches) {
      fetch('assets/motifs/corner-branch.svg').then(function (r) { return r.ok ? r.text() : null; }).then(function (svg) {
        if (!svg) { return; }
        ['tl', 'tr', 'bl', 'br'].forEach(function (pos, i) {
          var d = document.createElement('div');
          d.className = 'corner-vine ' + pos;
          d.setAttribute('aria-hidden', 'true');
          d.innerHTML = svg;
          document.body.appendChild(d);
          if (!reduce) { setTimeout(function () { slowDraw(d, 1800, 70); }, 600 + i * 250); }
        });
      }).catch(function () {});
    }

    /* mandap gate — slow drawing hero art on selected pages */
    var path = window.location.pathname;
    if (/(\/$|index\.html$|weddings\.html$|story\.html$|contact\.html$)/.test(path)) {
      var isHome = /(\/$|index\.html$)/.test(path);
      var host = isHome ? (document.querySelector('header') || document.querySelector('section')) : document.querySelector('section');
      if (host) {
        fetch('assets/motifs/mandap-gate.svg').then(function (r) { return r.ok ? r.text() : null; }).then(function (svg) {
          if (!svg) { return; }
          var art = document.createElement('div');
          art.className = 'mandap-art';
          art.setAttribute('aria-hidden', 'true');
          art.innerHTML = svg;
          var cs = window.getComputedStyle(host);
          if (cs.position === 'static') { host.style.position = 'relative'; }
          host.insertBefore(art, host.firstChild);
          if (!reduce) { slowDraw(art, 2600, 110); }
        }).catch(function () {});
      }
    }

    /* lightbox for mosaic galleries */
    if (document.querySelector('.mosaic')) {
      var lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<img alt=""><button class="lb-close" type="button">Close</button>';
      document.body.appendChild(lb);
      var lbImg = lb.querySelector('img');
      document.addEventListener('click', function (ev) {
        var tile = ev.target.closest ? ev.target.closest('.mosaic .mt') : null;
        if (tile) {
          var im = tile.querySelector('img');
          if (im) { lbImg.src = im.src; lbImg.alt = im.alt || ''; lb.classList.add('open'); }
          return;
        }
        if (ev.target.closest && (ev.target.closest('.lb-close') || (ev.target === lb))) { lb.classList.remove('open'); lbImg.src = ''; }
      });
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { lb.classList.remove('open'); } });
    }

    /* faint side motifs — fill section whitespace on every page (desktop) */
    if (window.matchMedia && window.matchMedia('(min-width: 900px)').matches) {
      var MOTIF_CYCLE = ['marigold', 'mogra', 'veil', 'birds', 'toran', 'diya'];
      var motifCache = {};
      function getMotif(name) {
        if (!motifCache[name]) {
          motifCache[name] = fetch('assets/motifs/' + name + '.svg').then(function (r) { return r.ok ? r.text() : null; }).catch(function () { return null; });
        }
        return motifCache[name];
      }
      var mio = null;
      if (!reduce && 'IntersectionObserver' in window) {
        mio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { slowDraw(e.target, 1600, 60); mio.unobserve(e.target); }
          });
        }, { threshold: 0.2 });
      }
      document.querySelectorAll('section').forEach(function (sec, i) {
        if (sec.classList.contains('video-band') || sec.classList.contains('chapter') || sec.classList.contains('hero-full') || sec.querySelector('.side-motif')) { return; }
        getMotif(MOTIF_CYCLE[i % MOTIF_CYCLE.length]).then(function (svg) {
          if (!svg) { return; }
          var d = document.createElement('div');
          d.className = 'side-motif ' + (i % 2 ? 'sm-left' : 'sm-right');
          d.setAttribute('aria-hidden', 'true');
          d.innerHTML = svg;
          var cs = window.getComputedStyle(sec);
          if (cs.position === 'static') { sec.style.position = 'relative'; }
          sec.appendChild(d);
          if (mio) { mio.observe(d); }
        });
      });
    }

    /* desktop HARD snap scrolling on the homepage: one wheel gesture = one section */
    if (/(\/$|index\.html$)/.test(path) && !reduce &&
        window.matchMedia && window.matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
      document.documentElement.classList.add('snap');
      var hero = document.querySelector('header');
      if (hero) { hero.classList.add('snap-s'); }

      var targets = [];
      ['header', '.hero-strip', 'section', 'footer'].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) { if (targets.indexOf(el) === -1) { targets.push(el); } });
      });
      targets.sort(function (a, b) { return a.offsetTop - b.offsetTop; });

      var locked = false;
      function currentIndex() {
        var y = window.scrollY + 10;
        var idx = 0;
        for (var i = 0; i < targets.length; i++) { if (targets[i].offsetTop <= y) { idx = i; } }
        return idx;
      }
      window.addEventListener('wheel', function (e) {
        e.preventDefault();
        if (locked) { return; }
        var dir = e.deltaY > 0 ? 1 : -1;
        if (Math.abs(e.deltaY) < 6) { return; }
        var idx = currentIndex();
        var el = targets[idx];
        var rect = el.getBoundingClientRect();
        locked = true;
        /* tall section: page within it before moving on */
        if (dir > 0 && rect.bottom > window.innerHeight + 48) {
          window.scrollBy({ top: Math.min(window.innerHeight * 0.85, rect.bottom - window.innerHeight), behavior: 'smooth' });
        } else if (dir < 0 && rect.top < -48 && window.scrollY > el.offsetTop + 8) {
          window.scrollBy({ top: -window.innerHeight * 0.85, behavior: 'smooth' });
        } else {
          var next = Math.min(Math.max(idx + dir, 0), targets.length - 1);
          targets[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(function () { locked = false; }, 820);
      }, { passive: false });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    /* ----- Branded loader (full on first visit, quick on navigation) ----- */
    var loader = document.getElementById('loader');
    if (loader && reduce) { loader.remove(); loader = null; }
    if (loader) {
      var seen = false;
      try { seen = sessionStorage.getItem('jv-seen') === '1'; } catch (e) {}
      var wait = reduce ? 150 : (seen ? 780 : 1250);
      if (!reduce) {
        var drawDur = seen ? 560 : 1000;
        loader.querySelectorAll('svg path, svg circle').forEach(function (s, i) {
          try {
            var len = s.getTotalLength();
            s.style.strokeDasharray = len;
            s.style.strokeDashoffset = len;
            s.style.transition = 'stroke-dashoffset ' + drawDur + 'ms cubic-bezier(.22,.8,.3,1) ' + (i * 28) + 'ms';
            requestAnimationFrame(function () { s.style.strokeDashoffset = 0; });
          } catch (e) {}
        });
      }
      setTimeout(function () {
        loader.classList.add('done');
        try { sessionStorage.setItem('jv-seen', '1'); } catch (e) {}
        setTimeout(function () { if (loader.parentNode) { loader.remove(); } }, 650);
      }, wait);
    }

    /* ----- soft page-fade on internal navigation ----- */
    if (!reduce) {
      document.addEventListener('click', function (ev) {
        var a = ev.target.closest ? ev.target.closest('a[href]') : null;
        if (!a) { return; }
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#' || a.target === '_blank' || ev.metaKey || ev.ctrlKey || ev.shiftKey) { return; }
        if (!/\.html(#.*)?$/.test(href) || /^https?:\/\//.test(href)) { return; }
        ev.preventDefault();
        document.body.classList.add('leaving');
        setTimeout(function () { window.location.href = href; }, 230);
      });
    }

    /* ----- Veil Lift ----- */
    var veil = document.getElementById('veil');
    if (veil) {
      if (reduce) { veil.remove(); }
      else {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { veil.classList.add('lift'); });
        });
        setTimeout(function () { if (veil.parentNode) { veil.remove(); } }, 1400);
      }
    }

    /* ----- reveals + curtain + gold draw ----- */
    var targets = document.querySelectorAll('.reveal, .cr, .draw');
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in'); finishDraw(el); });
    } else {
      /* prep gold-draw strokes */
      document.querySelectorAll('.draw').forEach(function (el) {
        el.querySelectorAll('path, circle').forEach(function (s) {
          try {
            var len = s.getTotalLength();
            s.style.strokeDasharray = len;
            s.style.strokeDashoffset = len;
          } catch (e) {}
        });
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) { return; }
          e.target.classList.add('in');
          finishDraw(e.target);
          io.unobserve(e.target);
        });
      }, { threshold: 0.15 });
      targets.forEach(function (el) { io.observe(el); });
      /* rescue: whatever hasn't revealed within 3s becomes visible anyway */
      setTimeout(function () {
        targets.forEach(function (el) { el.classList.add('in'); finishDraw(el); });
      }, 3000);
    }
    function finishDraw(el) {
      if (!el.classList.contains('draw')) { return; }
      el.querySelectorAll('path, circle').forEach(function (s) { s.style.strokeDashoffset = 0; });
    }

    /* ----- Petal Drift (hero only, <=12 petals) ----- */
    var canvas = document.getElementById('petals');
    if (canvas && !reduce) {
      var ctx = canvas.getContext('2d');
      var host = canvas.parentElement;
      var petals = [];
      function size() { canvas.width = host.offsetWidth; canvas.height = host.offsetHeight; }
      size(); window.addEventListener('resize', size);
      for (var i = 0; i < 12; i++) {
        petals.push({
          x: (i / 12) * 1.05, y: -(i * 0.12) - 0.05,
          r: 5 + (i % 4) * 2, sway: 0.4 + (i % 5) * 0.16,
          speed: 0.00035 + (i % 3) * 0.00018, phase: i * 1.7, rot: i * 0.6
        });
      }
      var running = true, t0 = null;
      function tick(ts) {
        if (!running) { return; }
        if (!t0) { t0 = ts; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(function (p) {
          p.y += p.speed * (canvas.height / 600) * 16;
          if (p.y > 1.08) { p.y = -0.08; }
          var x = p.x * canvas.width + Math.sin(ts / 1600 + p.phase) * 26 * p.sway;
          var y = p.y * canvas.height;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.rot + Math.sin(ts / 2100 + p.phase) * 0.6);
          ctx.fillStyle = 'rgba(207,170,109,.5)';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        requestAnimationFrame(tick);
      }
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !running) { running = true; requestAnimationFrame(tick); }
          else if (!e.isIntersecting) { running = false; }
        });
      });
      vio.observe(host);
      requestAnimationFrame(tick);
    }
  });
})();
