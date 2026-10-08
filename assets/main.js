// Henrix Band — henrix.lv. Vanilla port of the Claude Design component logic in
// _source/Henrix Band Website.dc.html — timings, thresholds and states mirror it 1:1.
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

  // ---- narrow / wide: root width < 980 (ResizeObserver, as in the original) ----
  var narrow = false, menuOpen = false;
  function setNarrow(n) {
    if (n === narrow) return;
    narrow = n; root.classList.toggle('narrow', n);
    if (!n && menuOpen) setMenu(false);
  }
  setNarrow(doc.body.clientWidth < 980);
  if (window.ResizeObserver) new ResizeObserver(function (e) { setNarrow(e[0].contentRect.width < 980); }).observe(doc.body);
  else window.addEventListener('resize', function () { setNarrow(doc.body.clientWidth < 980); });

  // ---- header / mobile menu ----
  var hdr = $('#hdr'), menu = $('#mob-menu'), menuBtn = $('.menu-btn');
  var NAV = ['par-mums', 'sastavi', 'programma', 'repertuars', 'pieteikt'];
  var navLinks = $$('.main-nav a.nav-link');

  function setMenu(open) {
    menuOpen = open;
    menu.hidden = !(open && narrow);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('.menu-lbl', menuBtn).textContent = open ? 'Aizvērt' : 'Izvēlne';
    hdr.classList.toggle('menu-open', open);
    doc.body.style.overflow = open ? 'hidden' : '';
    if (open) $$('[data-menu-item]').forEach(function (el, i) {
      anim(el, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 40 + i * 50, easing: EASE, fill: 'backwards' });
    });
  }
  menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  $$('#mob-menu a, .brand').forEach(function (a) { a.addEventListener('click', function () { if (menuOpen) setMenu(false); }); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  function scrollToId(id) {
    var el = doc.getElementById(id); if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: reduced() ? 'auto' : 'smooth' });
  }

  // ---- tiers ----
  var TIERS = ['essential', 'live', 'full'];
  var FORM_TIER = { essential: 'Essential', live: 'Live+', full: 'Full Experience' };
  var panel = $('#sastavs-panel'), panelBar = $('#panel-bar');
  var cur = null;
  function selectTier(id, focus) {
    var prev = cur; cur = id;
    $$('.tab').forEach(function (t) {
      var on = t.dataset.tier === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    var body = null;
    $$('.tier-panel').forEach(function (p) { p.hidden = p.dataset.tier !== id; if (!p.hidden) body = p; });
    panel.setAttribute('aria-labelledby', 'tab-' + id);
    panelBar.className = 'bar bg-' + id;
    $$('[data-glow]').forEach(function (g) { g.classList.toggle('on', g.dataset.glow === id); });
    if (prev && prev !== id) {
      anim(body, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
      anim($('.big-n', body), [{ transform: 'translateY(18%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 620, easing: EASE });
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

  // ---- repertoire category buttons (narrow) ----
  var cols = $$('.song-col'), repTab = 0;
  $$('.rep-tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.col; if (i === repTab) return; repTab = i;
      $$('.rep-tabs button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      cols.forEach(function (c, j) { c.classList.toggle('cur', i === j); });
      anim(cols[i], [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
    });
  });

  // ---- video card ----
  // Muted background loop starts when the card nears the viewport (not with reduced motion);
  // the button toggles sound. Before that, a click starts the video directly with sound.
  var vid = $('#vid'), vidBtn = $('button', vid);
  var V = { inView: false, direct: false, sound: false, unmutedOnce: false, frame: null };
  var YT = 'https://www.youtube-nocookie.com/embed/CZxHxjbiefg?autoplay=1&{m}loop=1&playlist=CZxHxjbiefg&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1';
  function mountFrame(muted) {
    var f = doc.createElement('iframe');
    f.title = 'Henrix Band dzīvajā — video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    f.tabIndex = -1;
    f.src = YT.replace('{m}', muted ? 'mute=1&' : '');
    f.addEventListener('load', function () { setTimeout(function () { f.classList.add('ready'); }, 400); });
    vid.insertBefore(f, $('.scrim', vid));
    V.frame = f;
  }
  function yt(func, args) {
    var f = V.frame; if (!f || !f.contentWindow) return;
    f.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*');
  }
  function renderVid() {
    vid.classList.toggle('sound', V.sound);
    $('.disc', vid).innerHTML = V.sound ? '<span class="pause"><span></span><span></span></span>' : '<span class="tri"></span>';
    $('.hint', vid).textContent = V.sound ? 'Izslēgt skaņu' : (V.inView || V.direct ? 'Ieslēgt skaņu' : 'Atskaņot');
    vidBtn.setAttribute('aria-label', V.sound ? 'Izslēgt video skaņu' : 'Atskaņot Henrix Band video ar skaņu');
    vidBtn.setAttribute('aria-pressed', V.sound ? 'true' : 'false');
  }
  function hover(on) { vid.classList.toggle('on', on && !reduced()); }
  vid.addEventListener('mouseenter', function () { hover(true); });
  vid.addEventListener('mouseleave', function () { hover(false); });
  vidBtn.addEventListener('focus', function () { hover(true); });
  vidBtn.addEventListener('blur', function () { hover(false); });
  vidBtn.addEventListener('click', function () {
    if (!V.inView && !V.direct) { V.direct = true; V.sound = true; mountFrame(false); renderVid(); return; }
    if (V.sound) { yt('mute'); V.sound = false; }
    else {
      if (!V.unmutedOnce) { yt('seekTo', [0, true]); V.unmutedOnce = true; }
      yt('unMute'); yt('setVolume', [100]); yt('playVideo'); V.sound = true;
    }
    renderVid();
  });

  // ---- enquiry form ----
  var form = $('#enquiry'), sent = $('#sent'), status = $('#f-status'), errors = {};
  var F = function (n) { return form.elements[n]; };
  function validate() {
    var e = {}, email = F('email').value.trim(), phone = F('phone').value.trim();
    if (!F('date').value) e.date = 'Norādiet pasākuma datumu.';
    if (!F('name').value.trim()) e.name = 'Norādiet savu vārdu.';
    if (!email && !phone) e.contact = 'Norādiet e-pastu vai tālruni.';
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) e.contact = 'Pārbaudiet e-pasta adresi.';
    return e;
  }
  function showErrors() {
    $('#err-date').textContent = errors.date || ''; $('#err-name').textContent = errors.name || ''; $('#err-contact').textContent = errors.contact || '';
    F('date').setAttribute('aria-invalid', errors.date ? 'true' : 'false');
    F('name').setAttribute('aria-invalid', errors.name ? 'true' : 'false');
    F('email').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
    F('phone').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
  }
  // as in the original: editing only clears errors that are now fixed, it never adds new ones
  form.addEventListener('input', function () {
    if (!Object.keys(errors).length) return;
    var v = validate();
    ['date', 'name', 'contact'].forEach(function (k) { if (!v[k]) delete errors[k]; });
    showErrors();
  });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = validate();
    if (Object.keys(v).length) { errors = v; showErrors(); F(v.date ? 'date' : v.name ? 'name' : 'email').focus(); return; }
    errors = {}; showErrors();
    var endpoint = form.getAttribute('action');
    status.textContent = ''; status.classList.remove('info');
    if (!endpoint) { mailFallback(); return; }
    var btn = $('button[type=submit]', form); btn.disabled = true;
    var data = new FormData(form);
    data.append('_subject', 'Henrix Band pieprasījums — ' + F('date').value);
    fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); onSent(); })
      .catch(function () { status.textContent = 'Neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši.'; })
      .then(function () { btn.disabled = false; });
  });
  // no form service connected yet: hand the enquiry to the visitor's mail app
  function mailFallback() {
    var v = function (n) { var el = F(n); return el && el.value ? el.value.trim() : ''; };
    var tier = $('input[name=tier]:checked', form);
    var d = v('date') ? v('date').split('-').reverse().join('.') : '';
    var lines = [
      'Pasākuma datums: ' + d, 'Norises vieta: ' + v('place'), 'Viesu skaits: ' + v('guests'),
      'Vakara formāts: ' + v('format'), 'Sastāvs: ' + (tier ? tier.value : ''), '',
      'Vārds: ' + v('name'), 'E-pasts: ' + v('email'), 'Tālrunis: ' + v('phone')
    ];
    window.location.href = 'mailto:henrixband@gmail.com?subject=' + encodeURIComponent('Pieprasījums — ' + d) + '&body=' + encodeURIComponent(lines.join('\n'));
    status.classList.add('info');
    status.textContent = 'Atvērām e-pasta vēstuli ar jūsu pieprasījumu — atliek nospiest “Sūtīt”. Ja tā neatvērās, rakstiet uz henrixband@gmail.com vai zvaniet +371 25 972 689.';
  }
  function onSent() {
    var first = F('name').value.trim().split(' ')[0] || '', d = F('date').value;
    $('#sent-name').textContent = ', ' + first;
    $('#sent-date').textContent = ' ' + (d ? d.split('-').reverse().join('.') : '');
    form.hidden = true; sent.hidden = false;
    sent.focus({ preventScroll: true });
    anim(sent, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE });
  }
  $('#sent-reset').addEventListener('click', function () { form.reset(); errors = {}; showErrors(); status.textContent = ''; sent.hidden = true; form.hidden = false; });

  // ---- quote: one span per word (split on plain spaces; "programma&nbsp;—" stays one word) ----
  var quote = $('[data-quote]'), words = [];
  (function split(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = doc.createDocumentFragment();
        n.textContent.split(/( +)/).forEach(function (w) {
          if (!w) return;
          if (/^ +$/.test(w)) { frag.appendChild(doc.createTextNode(w)); return; }
          var s = doc.createElement('span'); s.className = 'w'; s.textContent = w; words.push(s); frag.appendChild(s);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) split(n);
    });
  })(quote);

  // ---- motion mode: reveals, parallax, word fade, stage light ----
  var io = null, light = $('.hero-light');
  function applyMotionMode() {
    var els = $$('[data-reveal]');
    if (io) io.disconnect();
    if (reduced()) {
      els.forEach(function (el) { el.classList.remove('pre'); el.style.transitionDelay = ''; });
      $$('[data-parallax]').forEach(function (el) { el.style.transform = ''; });
      words.forEach(function (w) { w.style.opacity = '1'; });
      light.style.opacity = '0';
      hover(false);
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
      // the narrow repertoire view shows a single column without a reveal, as in the original
      if (narrow && el.classList.contains('song-col')) return;
      if (el.getBoundingClientRect().top < vh * 0.94) return;
      el.classList.add('pre'); io.observe(el);
    });
  }

  var px = $$('[data-parallax]'), raf = 0, scrolled = null, active = null;
  function tick() {
    raf = 0;
    var y = window.scrollY, vh = window.innerHeight;
    var sc = y > 24;
    if (sc !== scrolled) { scrolled = sc; hdr.classList.toggle('scrolled', sc); }
    var a = '';
    NAV.forEach(function (id) { var el = doc.getElementById(id); if (el && el.getBoundingClientRect().top < vh * 0.45) a = id; });
    if (a !== active) {
      active = a;
      navLinks.forEach(function (l) { if (l.getAttribute('href') === '#' + a) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
    }
    if (!V.inView && !V.direct && !reduced()) {
      var r = vid.getBoundingClientRect();
      if (r.top < vh + 300 && r.bottom > -300) { V.inView = true; mountFrame(true); renderVid(); }
    }
    if (reduced()) return;
    px.forEach(function (el) {
      var f = parseFloat(el.dataset.parallax), box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      var off = el.dataset.parallaxMode === 'top' ? -box.top * f : -(box.top + box.height / 2 - vh / 2) * f;
      el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });
    if (quote) {
      var q = quote.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.82 - q.top) / (q.height + vh * 0.3))), n = words.length;
      words.forEach(function (w, i) { var v = Math.min(1, Math.max(0, p * (n + 2) - i)); w.style.opacity = (0.18 + 0.82 * v).toFixed(2); });
    }
  }
  var onScroll = function () { if (!raf) raf = requestAnimationFrame(tick); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', function () { applyMotionMode(); tick(); });
  applyMotionMode(); tick();

  // stage light follows the mouse over the hero
  var hero = $('#top');
  hero.addEventListener('pointermove', function (e) {
    if (reduced() || e.pointerType !== 'mouse') return;
    var r = hero.getBoundingClientRect();
    light.style.opacity = '1'; light.style.transform = 'translate3d(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px,0)';
  });
  hero.addEventListener('pointerleave', function () { light.style.opacity = '0'; });
})();
