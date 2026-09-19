/*
 * Proof viewer. Opens the images behind the thumbnails a card renders with the
 * `proof` shortcode, in a popup that grows out of the thumbnail that was
 * clicked and shrinks back into it on close.
 *
 * Arrow keys and the on-screen arrows move between images, Escape or a click
 * on the backdrop closes, and focus returns to the thumbnail afterwards.
 * Visitors who prefer reduced motion get the same viewer without the motion.
 */
(function () {
  'use strict';

  var groups = [].slice.call(document.querySelectorAll('.proof'));
  if (!groups.length) return;

  var box = null;

  function build() {
    var el = document.createElement('div');
    el.className = 'proof-lb';
    el.innerHTML =
      '<div class="proof-lb__scrim"></div>' +
      '<div class="proof-lb__panel" role="dialog" aria-modal="true" aria-label="Image viewer">' +
        '<button class="proof-lb__close" type="button">Close</button>' +
        '<div class="proof-lb__stage"><img class="proof-lb__img" alt="" sizes="(max-width: 900px) 92vw, 900px"></div>' +
        '<p class="proof-lb__bar"><span class="proof-lb__cap"></span><span class="proof-lb__count"></span></p>' +
        '<button class="proof-lb__nav proof-lb__prev" type="button" aria-label="Previous image">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<button class="proof-lb__nav proof-lb__next" type="button" aria-label="Next image">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
      '</div>';
    document.body.appendChild(el);

    var api = {
      el: el,
      panel: el.querySelector('.proof-lb__panel'),
      img: el.querySelector('.proof-lb__img'),
      cap: el.querySelector('.proof-lb__cap'),
      count: el.querySelector('.proof-lb__count'),
      shots: [],
      index: 0,
      opener: null,
      busy: false
    };

    function paint() {
      var s = api.shots[api.index];
      api.img.srcset = s.srcset || '';
      api.img.src = s.src;
      api.img.alt = s.alt;
      api.cap.textContent = s.label;
      api.count.textContent = api.shots.length > 1 ? (api.index + 1) + ' / ' + api.shots.length : '';
      el.querySelector('.proof-lb__prev').hidden = api.shots.length < 2;
      el.querySelector('.proof-lb__next').hidden = api.shots.length < 2;
    }

    function origin(node) {
      if (!node) return;
      var r = node.getBoundingClientRect();
      api.panel.style.transformOrigin = (r.left + r.width / 2) + 'px ' + (r.top + r.height / 2) + 'px';
    }

    api.go = function (dir) {
      if (api.busy || api.shots.length < 2) return;
      api.busy = true;
      api.index = (api.index + dir + api.shots.length) % api.shots.length;
      paint();
      el.classList.remove('is-swapping');
      void el.offsetWidth; // restart the swap animation
      el.classList.add('is-swapping');
      setTimeout(function () { el.classList.remove('is-swapping'); api.busy = false; }, 380);
    };

    api.open = function (shots, index, opener) {
      api.shots = shots;
      api.index = index;
      api.opener = opener;
      paint();
      origin(opener.querySelector('.proof__thumb') || opener);
      el.classList.add('is-open');
      requestAnimationFrame(function () { el.classList.add('is-in'); });
      document.documentElement.classList.add('proof-open');
      document.addEventListener('keydown', onKey);
      el.querySelector('.proof-lb__close').focus();
    };

    api.close = function () {
      origin(api.opener && (api.opener.querySelector('.proof__thumb') || api.opener));
      el.classList.remove('is-in');
      document.documentElement.classList.remove('proof-open');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () {
        el.classList.remove('is-open');
        if (api.opener) api.opener.focus();
      }, 320);
    };

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); api.close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); api.go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); api.go(-1); }
      else if (e.key === 'Tab') { e.preventDefault(); el.querySelector('.proof-lb__close').focus(); }
    }

    el.querySelector('.proof-lb__next').addEventListener('click', function () { api.go(1); });
    el.querySelector('.proof-lb__prev').addEventListener('click', function () { api.go(-1); });
    el.querySelector('.proof-lb__close').addEventListener('click', api.close);
    el.querySelector('.proof-lb__scrim').addEventListener('click', api.close);
    return api;
  }

  groups.forEach(function (group) {
    var buttons = [].slice.call(group.querySelectorAll('.proof__btn'));
    var shots = buttons.map(function (b) {
      return {
        src: b.getAttribute('data-proof-image'),
        srcset: b.getAttribute('data-proof-set'),
        alt: b.getAttribute('data-proof-alt'),
        label: b.getAttribute('data-proof-label')
      };
    });
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (!box) box = build();
        box.open(shots, i, b);
      });
    });
  });
})();
