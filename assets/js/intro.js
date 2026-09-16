/*
 * Homepage arrival effects. Loaded only on the homepage
 * (layouts/partials/extend-head-uncached.html), so no other page pays for it.
 *
 * 1. "Breach" intro: a short terminal overlay (about 1.5 s) the first time a
 *    browser visits. Remembered in localStorage, so it plays once, not once per
 *    session. Skippable by click, the Skip button, Escape, Enter or Space.
 *    Never runs for reduced-motion users.
 * 2. Hero name: resolves out of random glyphs, then retypes, on every visit.
 *    Waits for the intro to finish when one is running.
 */
(function () {
  'use strict';

  var SEEN_KEY = 'intro-seen';
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function alreadySeen() {
    try {
      return !!(localStorage.getItem(SEEN_KEY) || sessionStorage.getItem(SEEN_KEY));
    } catch (e) {
      return true; // storage blocked: don't risk replaying on every load
    }
  }

  var runIntro = !reduced && !alreadySeen();
  // Set before DOMContentLoaded so the hero animation waits for the overlay.
  window.__introWillRun = runIntro;

  var GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF';

  /* ---- 1. Intro overlay ------------------------------------------------ */
  function playIntro() {
    var host = document.createElement('div');
    host.className = 'intro intro--breach';
    host.innerHTML =
      '<div class="intro__scene" aria-hidden="true"><div class="intro__log"></div></div>' +
      '<button class="intro__skip" type="button">Skip intro</button>';
    document.body.appendChild(host);
    document.documentElement.classList.add('intro-active');

    var logEl = host.querySelector('.intro__log');
    var timers = [];
    var done = false;

    function row(text, cls) {
      var old = logEl.querySelector('.intro__cursor');
      if (old) old.remove();
      var p = document.createElement('p');
      p.className = 'intro__row' + (cls ? ' ' + cls : '');
      p.innerHTML = '<span class="intro__prompt">&gt;</span> <span class="intro__body"></span><span class="intro__cursor"></span>';
      p.querySelector('.intro__body').textContent = text;
      logEl.appendChild(p);
      return p;
    }

    function at(ms, fn) { timers.push(setTimeout(function () { if (!done) fn(); }, ms)); }

    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) {}
      host.classList.add('intro--out');
      document.documentElement.classList.remove('intro-active');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () {
        host.remove();
        document.dispatchEvent(new CustomEvent('intro:done'));
      }, 450);
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); }
    }

    var pool = ['P@ssw0rd', 'letmein1', 'admin123', 'qwerty!!', 'hunter2 ', 'Summer26', 'ch4ngeme', 'trustno1'];

    at(0, function () { row('hydra -L users.txt -P rockyou.txt christiancarrasco.dev'); });
    at(180, function () { row('wordlist loaded · 14,344,391 entries', 'is-dim'); });
    at(360, function () {
      var p = row('attempt ' + pool[0] + '  FAILED', 'is-fail');
      var body = p.querySelector('.intro__body');
      var n = 1;
      var iv = setInterval(function () {
        body.textContent = 'attempt ' + pool[n % pool.length] + '  FAILED';
        n++;
      }, 70);
      timers.push(iv);
      at(540, function () { // 360 + 540 = MATCH lands at 900ms
        clearInterval(iv);
        p.className = 'intro__row is-ok';
        body.textContent = 'attempt ••••••••  MATCH';
      });
    });
    at(1060, function () { row('session established. welcome.', 'is-granted'); host.classList.add('is-granted'); });
    at(1560, finish);

    host.querySelector('.intro__skip').addEventListener('click', function (e) { e.stopPropagation(); finish(); });
    host.addEventListener('click', finish);
    document.addEventListener('keydown', onKey);
  }

  /* ---- 2. Hero name ----------------------------------------------------- */
  function animateHero() {
    if (reduced) return;
    var el = document.querySelector('.hero-name[data-scramble]');
    var span = el && el.querySelector('.hero-name__text');
    if (!span) return;
    var target = el.getAttribute('data-scramble') || span.textContent;

    el.setAttribute('data-scrambling', '');
    var frame = 0, total = 22;
    var iv = setInterval(function () {
      var out = '';
      for (var c = 0; c < target.length; c++) {
        if (target[c] === ' ') { out += ' '; continue; }
        var settleAt = (c / target.length) * total * 0.72;
        out += frame > settleAt + 3 ? target[c] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      span.textContent = out;
      frame++;
      if (frame > total) { clearInterval(iv); rewind(); }
    }, 40);

    function rewind() {
      el.removeAttribute('data-scrambling');
      el.setAttribute('data-typing', '');
      var i = target.length;
      var back = setInterval(function () {
        span.textContent = target.slice(0, --i);
        if (i <= 0) { clearInterval(back); setTimeout(retype, 120); }
      }, 20);
    }

    function retype() {
      var j = 0;
      var fwd = setInterval(function () {
        span.textContent = target.slice(0, ++j);
        if (j >= target.length) {
          clearInterval(fwd);
          setTimeout(function () { el.removeAttribute('data-typing'); el.setAttribute('data-rested', ''); }, 700);
        }
      }, 32);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (runIntro) {
      var started = false;
      var start = function () { if (!started) { started = true; animateHero(); } };
      document.addEventListener('intro:done', function () { setTimeout(start, 150); }, { once: true });
      setTimeout(start, 4000); // safety net if the overlay never reports back
      playIntro();
    } else {
      setTimeout(animateHero, 200);
    }
  });
})();
