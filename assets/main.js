// Henrix Band — henrix.lv. Vanilla port of the Claude Design component logic (see _source/).
(function () {
  'use strict';
  var EASE = 'cubic-bezier(.22,.61,.36,1)';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = function () { return mq.matches; };
  var anim = function (el, kf, o) { if (el && el.animate && !reduced()) el.animate(kf, o); };

  // ---- header / nav ----
  var hdr = $('#hdr'), menu = $('#mob-menu'), menuBtn = $('.menu-btn');
  var NAV = ['par-mums', 'sastavi', 'programma', 'repertuars', 'pieteikt'];
  var navLinks = $$('.main-nav a.nav-link');

  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('.menu-lbl', menuBtn).textContent = open ? 'Aizvērt' : 'Izvēlne';
    hdr.classList.toggle('menu-open', open);
    doc.body.style.overflow = open ? 'hidden' : '';
    if (open) $$('#mob-menu nav a, #mob-menu > .btn').forEach(function (el, i) {
      anim(el, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 40 + i * 50, easing: EASE, fill: 'backwards' });
    });
  }
  menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
  $$('#mob-menu a, .brand').forEach(function (a) { a.addEventListener('click', function () { if (!menu.hidden) setMenu(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
  window.matchMedia('(min-width: 980px)').addEventListener('change', function (e) { if (e.matches && !menu.hidden) setMenu(false); });

  function scrollToId(id) {
    var el = doc.getElementById(id); if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: reduced() ? 'auto' : 'smooth' });
  }

  // ---- tiers ----
  var TIERS = ['essential', 'live', 'full'];
  var FORM_TIER = { essential: 'Essential', live: 'Live+', full: 'Full Experience' };
  var cur = 'live';
  function selectTier(id, focus) {
    var changed = id !== cur; cur = id;
    $$('.tab').forEach(function (t) {
      var on = t.dataset.tier === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    $$('.tier-panel').forEach(function (p) { p.hidden = p.dataset.tier !== id; });
    $$('[data-glow]').forEach(function (g) { g.classList.toggle('on', g.dataset.glow === id); });
    if (changed) {
      var p = $('#panel-' + id);
      anim($('.panel-body', p), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
      anim($('.big-n', p), [{ transform: 'translateY(18%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 620, easing: EASE });
    }
  }
  selectTier('live');
  $$('.tab').forEach(function (t) { t.addEventListener('click', function () { selectTier(t.dataset.tier); }); });
  $('.tablist').addEventListener('keydown', function (e) {
    var i = TIERS.indexOf(cur), ni = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') ni = (i + 1) % 3;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ni = (i + 2) % 3;
    else if (e.key === 'Home') ni = 0; else if (e.key === 'End') ni = 2;
    if (ni === null) return; e.preventDefault(); selectTier(TIERS[ni], true);
  });
  $$('.tier-jump').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); selectTier(a.dataset.tier); scrollToId('sastavi'); }); });
  $$('.book').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var r = $('#enquiry input[name=tier][value="' + FORM_TIER[a.dataset.tier] + '"]'); if (r) r.checked = true;
      scrollToId('pieteikt');
    });
  });

  // ---- programme sets ----
  var timeline = $('.timeline');
  $$('.seg-toggle button').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = +b.dataset.sets;
      $$('.seg-toggle button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.seg', timeline).forEach(function (s, i) {
        s.classList.toggle('off', i >= n);
        $('.lbl', s).textContent = n === 3 ? '50 min' : (i + 1) + '. sets';
      });
      timeline.setAttribute('aria-label', n === 3 ? 'Programma: trīs seti pa 50 minūtēm' : 'Programma: četri īsāki seti');
    });
  });

  // ---- repertoire tabs (narrow screens) ----
  var cols = $$('.song-col');
  $$('.rep-tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.col;
      $$('.rep-tabs button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cols.forEach(function (c, j) { c.classList.toggle('cur', i === j); });
      anim(cols[i], [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
    });
  });

  // ---- video: YouTube is only contacted after the visitor presses play ----
  var vid = $('#vid'), vidBtn = $('button', vid), frame = null, playing = false;
  function yt(func) { if (frame && frame.contentWindow) frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: [] }), 'https://www.youtube-nocookie.com'); }
  function setVidUi(on) {
    playing = on;
    $('.disc', vid).innerHTML = on ? '<span class="pause"><span></span><span></span></span>' : '<span class="tri"></span>';
    $('.hint', vid).textContent = on ? 'Pauze' : 'Atskaņot';
    vidBtn.setAttribute('aria-label', on ? 'Apturēt video' : 'Atskaņot Henrix Band video ar skaņu');
    vidBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    $('.scrim', vid).style.opacity = on ? '0' : '';
    $('.cap', vid).style.opacity = on ? '0' : '';
  }
  vidBtn.addEventListener('click', function () {
    if (!frame) {
      frame = doc.createElement('iframe');
      frame.title = 'Henrix Band dzīvajā — video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.tabIndex = -1;
      frame.src = 'https://www.youtube-nocookie.com/embed/CZxHxjbiefg?autoplay=1&loop=1&playlist=CZxHxjbiefg&controls=0&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1';
      frame.style.cssText = 'top:50%;left:50%;width:256%;height:115%;inset:auto;transform:translate(-50%,-50%);pointer-events:none;opacity:0;transition:opacity 900ms ' + EASE;
      frame.addEventListener('load', function () { setTimeout(function () { frame.style.opacity = '1'; }, 400); });
      vid.insertBefore(frame, $('.scrim', vid));
      setVidUi(true);
      return;
    }
    yt(playing ? 'pauseVideo' : 'playVideo'); setVidUi(!playing);
  });

  // ---- enquiry form ----
  var form = $('#enquiry'), sent = $('#sent'), status = $('#f-status');
  var F = function (n) { return form.elements[n]; };
  function validate() {
    var e = {}, email = F('email').value.trim(), phone = F('phone').value.trim();
    if (!F('date').value) e.date = 'Norādiet pasākuma datumu.';
    if (!F('name').value.trim()) e.name = 'Norādiet savu vārdu.';
    if (!email && !phone) e.contact = 'Norādiet e-pastu vai tālruni.';
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) e.contact = 'Pārbaudiet e-pasta adresi.';
    return e;
  }
  function showErrors(e) {
    $('#err-date').textContent = e.date || ''; $('#err-name').textContent = e.name || ''; $('#err-contact').textContent = e.contact || '';
    F('date').setAttribute('aria-invalid', e.date ? 'true' : 'false');
    F('name').setAttribute('aria-invalid', e.name ? 'true' : 'false');
    F('email').setAttribute('aria-invalid', e.contact ? 'true' : 'false');
    F('phone').setAttribute('aria-invalid', e.contact ? 'true' : 'false');
  }
  var tried = false;
  form.addEventListener('input', function () { if (tried) showErrors(validate()); });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); tried = true;
    var e = validate(); showErrors(e);
    if (Object.keys(e).length) { F(e.date ? 'date' : e.name ? 'name' : 'email').focus(); return; }
    var endpoint = form.getAttribute('action');
    status.textContent = '';
    if (!endpoint) { status.textContent = 'Pieteikuma forma vēl nav pieslēgta. Lūdzu, sazinieties ar mums tieši.'; return; }
    var btn = $('button[type=submit]', form); btn.disabled = true;
    var data = new FormData(form);
    data.append('_subject', 'Henrix Band pieprasījums — ' + F('date').value);
    fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); onSent(); })
      .catch(function () { status.textContent = 'Neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši.'; })
      .then(function () { btn.disabled = false; });
  });
  function onSent() {
    var first = F('name').value.trim().split(' ')[0], d = F('date').value;
    $('#sent-name').textContent = first ? ', ' + first : '';
    $('#sent-date').textContent = d ? ' ' + d.split('-').reverse().join('.') : '';
    form.hidden = true; sent.hidden = false;
    sent.focus({ preventScroll: true });
    anim(sent, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE });
  }
  $('#sent-reset').addEventListener('click', function () { form.reset(); tried = false; showErrors({}); sent.hidden = true; form.hidden = false; });

  // ---- quote words ----
  var quote = $('[data-quote]'), words = [];
  (function split(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = doc.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(doc.createTextNode(w)); return; }
          var s = doc.createElement('span'); s.className = 'w'; s.textContent = w; words.push(s); frag.appendChild(s);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) split(n);
    });
  })(quote);

  // ---- reveal, parallax, scroll state ----
  var io = null;
  function setupMotion() {
    var els = $$('[data-reveal]');
    if (io) io.disconnect();
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.remove('pre'); el.style.transitionDelay = ''; });
      $$('[data-parallax]').forEach(function (el) { el.style.transform = ''; });
      words.forEach(function (w) { w.style.opacity = ''; });
      return;
    }
    var vh = window.innerHeight;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.transitionDelay = (+(el.dataset.revealDelay || 0)) + 'ms';
        el.classList.add('in'); el.classList.remove('pre');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) {
      if (el.classList.contains('in') || el.getBoundingClientRect().top < vh * 0.94) return;
      el.classList.add('pre'); io.observe(el);
    });
  }

  var px = $$('[data-parallax]'), raf = 0, light = $('.hero-light');
  function tick() {
    raf = 0;
    var vh = window.innerHeight;
    hdr.classList.toggle('scrolled', window.scrollY > 24);
    var active = '';
    NAV.forEach(function (id) { var el = doc.getElementById(id); if (el && el.getBoundingClientRect().top < vh * 0.45) active = id; });
    navLinks.forEach(function (a) { if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (reduced()) return;
    px.forEach(function (el) {
      var f = parseFloat(el.dataset.parallax), box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      var off = el.dataset.parallaxMode === 'top' ? -box.top * f : -(box.top + box.height / 2 - vh / 2) * f;
      el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });
    if (quote && words.length) {
      var r = quote.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.3))), n = words.length;
      words.forEach(function (w, i) { var v = Math.min(1, Math.max(0, p * (n + 2) - i)); w.style.opacity = (0.18 + 0.82 * v).toFixed(2); });
    }
  }
  var onScroll = function () { if (!raf) raf = requestAnimationFrame(tick); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  mq.addEventListener && mq.addEventListener('change', function () { setupMotion(); tick(); });
  setupMotion(); tick();

  // stage light follows the mouse over the hero
  var hero = $('#top');
  hero.addEventListener('pointermove', function (e) {
    if (reduced() || e.pointerType !== 'mouse') return;
    var r = hero.getBoundingClientRect();
    light.style.opacity = '1'; light.style.transform = 'translate3d(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px,0)';
  });
  hero.addEventListener('pointerleave', function () { light.style.opacity = '0'; });
})();
