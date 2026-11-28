// Theme toggle: respects system preference by default, remembers a manual
// override in localStorage. Safe to no-op if storage is unavailable.
(function () {
  var root = document.documentElement;
  var STORAGE_KEY = 'theme';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  var stored = getStored();
  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var current = root.getAttribute('data-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var effectiveCurrent = current || (prefersDark ? 'dark' : 'light');
        var next = effectiveCurrent === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        setStored(next);
      });
    }

    initTabs();
    initScrollReveal();
    initBackToTop();
  });

  // ---------- Back to top ----------
  // Shown only on a page at least two screens tall, after half a screen of scrolling (at the top,
  // or on a short page, it would only be in the way). Checked again on scroll, resize and any
  // change in the page's height (switching between About me and Portfolio changes it). A click
  // scrolls up (instantly with reduced motion), without touching the address, so the tab stays,
  // and puts keyboard focus on the first link in the header.
  function initBackToTop() {
    var btn = document.getElementById('toTop');
    if (!btn) return;
    function shouldShow(y, vh, ph) { return ph >= vh * 2 && y >= vh / 2; }
    var queued = false;
    function update() {
      queued = false;
      btn.classList.toggle('is-shown', shouldShow(window.scrollY, window.innerHeight, document.documentElement.scrollHeight));
    }
    function queue() {
      if (!queued) { queued = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    if ('ResizeObserver' in window) new ResizeObserver(queue).observe(document.body);
    btn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var first = document.querySelector('.site-header a');
      if (first) first.focus({ preventScroll: true });
    });
    update();
  }

  // ---------- Tabs (About me / Portfolio) ----------
  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
    if (!tabs.length) return;

    function activate(name, updateHash) {
      tabs.forEach(function (btn) {
        var isActive = btn.dataset.tab === name;
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.hidden = panel.id !== 'panel-' + name;
      });
      if (updateHash) {
        history.replaceState(null, '', '#' + name);
      }
    }

    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () { activate(btn.dataset.tab, true); });
    });

    // Lets same-page links like <a href="#portfolio"> switch tabs too,
    // not just the tab buttons themselves or a fresh page load.
    window.addEventListener('hashchange', function () {
      var name = (location.hash || '').replace('#', '');
      if (tabs.some(function (t) { return t.dataset.tab === name; })) {
        activate(name, false);
      }
    });

    var DEFAULT_TAB = 'about';
    var initial = (location.hash || '').replace('#', '');
    var valid = tabs.some(function (t) { return t.dataset.tab === initial; });
    activate(valid ? initial : DEFAULT_TAB, false);
  }

  // ---------- Subtle scroll-reveal for project rows ----------
  // Rows are fully visible by default. Only once we know JS + IntersectionObserver
  // both work do we opt a row into the fade-up animation - and even then, a
  // timeout safety net guarantees every row ends up visible no matter what.
  function initScrollReveal() {
    var rows = Array.prototype.slice.call(document.querySelectorAll('.project-row'));
    if (!rows.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    rows.forEach(function (r) { r.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add('is-visible'); }, i * 40);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    rows.forEach(function (r) { io.observe(r); });

    // Safety net: force every row visible after 2s, in case a row never
    // intersects (e.g. automated rendering, odd viewport, observer quirks).
    setTimeout(function () {
      rows.forEach(function (r) { r.classList.add('is-visible'); });
    }, 2000);
  }
})();
