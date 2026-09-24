/* /ctf page: event states, countdown, and the flashlight menu bar.
   Loaded on /ctf only (layouts/_default/ctf.html). Styles: assets/css/ctf.css.
   Works without this file: the build already renders the right state for the
   day the site was built; this keeps it exact between builds. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pad(n) { return String(n).padStart(2, "0"); }
  function t(s) { var d = new Date(s); return isNaN(d) ? null : d.getTime(); }

  /* ---- 1 · next drop: upcoming -> live -> closed ---- */
  var ev = document.querySelector("[data-ctf-event]");
  if (ev) {
    var start = t(ev.getAttribute("data-start")), end = t(ev.getAttribute("data-end"));
    var cd = ev.querySelector("[data-ctf-countdown]"), live = ev.querySelector("[data-ctf-live]");
    var day = ev.querySelector("[data-ctf-day]"), badge = document.querySelector("[data-ctf-badge]");
    var armed = document.querySelector("[data-ctf-armed]");
    var cells = {};
    ["d", "h", "m", "s"].forEach(function (k) { cells[k] = ev.querySelector('[data-cd="' + k + '"]'); });
    var tick = function () {
      var now = Date.now();
      if (start && now < start) {
        var s = Math.floor((start - now) / 1000);
        cells.d.textContent = pad(Math.floor(s / 86400));
        cells.h.textContent = pad(Math.floor((s % 86400) / 3600));
        cells.m.textContent = pad(Math.floor((s % 3600) / 60));
        cells.s.textContent = pad(s % 60);
        cd.hidden = false; live.hidden = true;
        badge.textContent = "REGISTERED"; armed.textContent = "● armed";
      } else if (end && now < end) {
        var total = Math.max(1, Math.round((end - start) / 86400000));
        var n = Math.min(total, Math.floor((now - start) / 86400000) + 1);
        day.textContent = "day " + n + " of " + total;
        cd.hidden = true; live.hidden = false;
        badge.textContent = "LIVE"; armed.textContent = "● live";
      } else {
        cd.hidden = true; live.hidden = false;
        day.textContent = "closed";
        live.querySelector("span").textContent = "results being tallied · writeups follow where the rules allow";
        badge.textContent = "CLOSED"; armed.textContent = "● closed";
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  /* archive rows that have dates but no result yet */
  document.querySelectorAll("[data-ctf-row]").forEach(function (el) {
    var s = t(el.getAttribute("data-start")), e = t(el.getAttribute("data-end")), now = Date.now();
    var state = now < s ? "upcoming" : now < e ? "live" : "closed";
    var label = { upcoming: "registered", live: "live now", closed: "closed · results being tallied" }[state];
    if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.textContent = label;
    el.className = "r r--" + state;
  });

  /* ---- 1b · results panel: pick which event to show ----
     A listbox behind a button. Opens on the newest scored event (the build
     marks it); locked events (registered, live, tallying) cannot be picked.
     Keys: Enter, Space or the arrows open it; arrows, Home and End move;
     Enter or Space picks; Escape or Tab closes. */
  var sig = document.querySelector("[data-sig]");
  if (sig) {
    var btn = sig.querySelector("[data-sig-btn]"), list = sig.querySelector("[data-sig-list]");
    var cur = sig.querySelector("[data-sig-current]"), title = sig.querySelector("[data-sig-title]");
    var opts = [].slice.call(list.querySelectorAll('[role="option"]'));
    var active = -1;
    var pickable = function (o) { return o.getAttribute("aria-disabled") !== "true"; };
    var setActive = function (i) {
      opts.forEach(function (o) { o.classList.remove("is-active"); });
      active = i;
      if (i < 0) { list.removeAttribute("aria-activedescendant"); return; }
      opts[i].classList.add("is-active");
      list.setAttribute("aria-activedescendant", opts[i].id);
      opts[i].scrollIntoView({ block: "nearest" });
    };
    var selectedIndex = function () {
      for (var i = 0; i < opts.length; i++) if (opts[i].getAttribute("aria-selected") === "true") return i;
      return 0;
    };
    var open = function () {
      list.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      setActive(selectedIndex());
      list.focus();
    };
    var close = function (refocus) {
      list.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      setActive(-1);
      if (refocus) btn.focus();
    };
    var choose = function (i) {
      var o = opts[i];
      if (!o || !pickable(o)) return;
      var id = o.getAttribute("data-sig-id");
      opts.forEach(function (x) { x.setAttribute("aria-selected", x === o ? "true" : "false"); });
      sig.querySelectorAll("[data-sig-view]").forEach(function (v) { v.hidden = v.getAttribute("data-sig-view") !== id; });
      cur.textContent = title.textContent = o.getAttribute("data-sig-label");
      close(true);
    };
    var step = function (dir) {
      var i = active;
      for (var n = 0; n < opts.length; n++) {
        i = (i + dir + opts.length) % opts.length;
        if (pickable(opts[i])) { setActive(i); return; }
      }
    };
    btn.addEventListener("click", function () { if (list.hidden) open(); else close(true); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(); }
    });
    list.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
      else if (e.key === "Home") { e.preventDefault(); active = -1; step(1); }
      else if (e.key === "End") { e.preventDefault(); active = 0; step(-1); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
      else if (e.key === "Escape") { e.preventDefault(); close(true); }
      else if (e.key === "Tab") { close(false); }
    });
    opts.forEach(function (o, i) {
      o.addEventListener("click", function () { choose(i); });
      o.addEventListener("mousemove", function () { if (pickable(o) && active !== i) setActive(i); });
    });
    var dd = sig.querySelector("[data-sig-dd]");
    document.addEventListener("click", function (e) { if (!list.hidden && !dd.contains(e.target)) close(false); });
  }

  /* ---- 2 · the flashlight menu bar ---- */
  var bar = document.querySelector(".site-nav__bar");
  if (!bar) return;
  var phone = matchMedia("(max-width: 767px)");

  function barItems() {
    return [].slice.call(bar.querySelectorAll(".site-nav__link, .site-nav__icon, .site-nav__social-link, .mobile-header-row > *"))
      .filter(function (e) { return e.offsetParent !== null; });
  }
  function lightAt(x) {
    var r = bar.getBoundingClientRect(), reach = phone.matches ? 80 : 150;
    bar.style.setProperty("--mx", (x - r.left) + "px");
    barItems().forEach(function (el) {
      var b = el.getBoundingClientRect(), c = b.left + b.width / 2;
      el.style.setProperty("--lit", Math.max(0, 1 - Math.abs(c - x) / reach).toFixed(2));
    });
  }
  function centreOf(sel) {
    var el = bar.querySelector(sel);
    if (!el || el.offsetParent === null) return null;
    var b = el.getBoundingClientRect();
    return b.left + b.width / 2;
  }
  function rest() {
    var x = phone.matches ? centreOf('label[for="mobile-menu-toggle"]') : centreOf(".is-current");
    if (x !== null) lightAt(x);
  }

  /* desktop: the light follows the mouse and settles back on /ctf */
  bar.addEventListener("mousemove", function (e) { if (!phone.matches) lightAt(e.clientX); });
  bar.addEventListener("mouseleave", rest);
  window.addEventListener("resize", rest);

  /* phones: a searchlight sweeps the collapsed bar, then rests on the menu
     button (the way in) for a few seconds before sweeping again */
  var t0 = performance.now();
  function sweep(now) {
    if (phone.matches && !reduce) {
      var r = bar.getBoundingClientRect(), cyc = ((now - t0) / 1000) % 7;
      if (cyc < 4) {
        var k = cyc / 4;
        lightAt(r.left + 24 + (r.width - 48) * (0.5 - 0.5 * Math.cos(k * Math.PI * 2)));
      } else {
        rest();
      }
    }
    requestAnimationFrame(sweep);
  }
  rest();
  requestAnimationFrame(sweep);

  /* phone menu: the link under your finger lights up; a tap still navigates */
  var dlg = document.getElementById("mobile-menu-dialog");
  if (dlg) {
    var nav = dlg.querySelector("nav");
    if (nav && !dlg.querySelector(".ctf-hint")) {
      var hint = document.createElement("div");
      hint.className = "ctf-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.textContent = "drag to light the way";
      nav.insertBefore(hint, nav.firstChild);
    }
    var lightY = function (y) {
      var r = dlg.getBoundingClientRect();
      dlg.style.setProperty("--my", (y - r.top) + "px");
      dlg.querySelectorAll("nav a").forEach(function (a) {
        var b = a.getBoundingClientRect(), c = b.top + b.height / 2;
        a.style.setProperty("--lit", Math.max(0, 1 - Math.abs(c - y) / 48).toFixed(2));
      });
    };
    var restMenu = function () {
      var c = dlg.querySelector('a[href$="/ctf/"]');
      if (c) { var b = c.getBoundingClientRect(); lightY(b.top + b.height / 2); }
    };
    dlg.addEventListener("touchstart", function (e) { lightY(e.touches[0].clientY); }, { passive: true });
    dlg.addEventListener("touchmove", function (e) { lightY(e.touches[0].clientY); }, { passive: true });
    dlg.addEventListener("touchend", function () { setTimeout(restMenu, 600); });
    var toggle = document.getElementById("mobile-menu-toggle");
    if (toggle) toggle.addEventListener("change", function () { setTimeout(restMenu, 50); });
  }
})();
