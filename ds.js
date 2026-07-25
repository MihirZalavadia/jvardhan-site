/* J.Vardhan design-system behaviors: theme, veil lift, reveals, gold draw, petals */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  document.addEventListener('DOMContentLoaded', function () {
    /* ----- Branded loader (full on first visit, quick on navigation) ----- */
    var loader = document.getElementById('loader');
    if (loader) {
      var seen = false;
      try { seen = sessionStorage.getItem('jv-seen') === '1'; } catch (e) {}
      var wait = (reduce || seen) ? 150 : 1150;
      if (!reduce && !seen) {
        loader.querySelectorAll('svg path, svg circle').forEach(function (s) {
          try {
            var len = s.getTotalLength();
            s.style.strokeDasharray = len;
            s.style.strokeDashoffset = len;
            s.style.transition = 'stroke-dashoffset 1s cubic-bezier(.22,.8,.3,1)';
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
