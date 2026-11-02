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
  // en/index.html mirrors index.html; strings set from JS pick the page language
  var EN = root.lang === 'en';
  var T = function (lv, en) { return EN ? en : lv; };

  // ---- narrow / wide: root width < 980 (ResizeObserver, as in the original) ----
  // The header switches to the menu button earlier (< 1120) so the nav + LV/EN switch fit in one row.
  var narrow = false, navNarrow = false, menuOpen = false;
  function setNarrow(w) {
    var n = w < 980, nn = w < 1120;
    if (nn !== navNarrow) {
      navNarrow = nn; root.classList.toggle('nav-narrow', nn);
      if (!nn && menuOpen) setMenu(false);
    }
    if (n === narrow) return;
    narrow = n; root.classList.toggle('narrow', n);
  }
  setNarrow(doc.body.clientWidth);
  if (window.ResizeObserver) new ResizeObserver(function (e) { setNarrow(e[0].contentRect.width); }).observe(doc.body);
  else window.addEventListener('resize', function () { setNarrow(doc.body.clientWidth); });

  // ---- header / mobile menu ----
  var hdr = $('#hdr'), menu = $('#mob-menu'), menuBtn = $('.menu-btn');
  var NAV = ['par-mums', 'sastavi', 'programma', 'repertuars', 'pieteikt'];
  var navLinks = $$('.main-nav a.nav-link');

  function setMenu(open) {
    menuOpen = open;
    menu.hidden = !(open && navNarrow);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    $('.menu-lbl', menuBtn).textContent = open ? T('Aizvērt', 'Close') : T('Izvēlne', 'Menu');
    hdr.classList.toggle('menu-open', open);
    doc.body.style.overflow = open ? 'hidden' : '';
    if (open) $$('[data-menu-item]').forEach(function (el, i) {
      anim(el, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 40 + i * 50, easing: EASE, fill: 'backwards' });
    });
    if (open && navNarrow) { var first = $('[data-menu-item]'); if (first) first.focus({ preventScroll: true }); }
  }
  menuBtn.addEventListener('click', function () { setMenu(!menuOpen); });
  $$('#mob-menu a, .brand').forEach(function (a) { a.addEventListener('click', function () { if (menuOpen) setMenu(false); }); });
  window.addEventListener('keydown', function (e) {
    if (!menuOpen) return;
    if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); return; }
    // aria-modal menu: keep Tab inside the header controls (brand, language, menu button) and the menu
    if (e.key !== 'Tab' || menu.hidden) return;
    var f = $$('a[href], button', hdr).concat($$('a[href], button', menu)).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var i = f.indexOf(doc.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i === -1 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
  });

  // ---- language switch: keep the current section (#id is the same on / and /en/) ----
  $$('.lang a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (a.getAttribute('aria-current') || !location.hash) return;
      a.href = a.getAttribute('href').split('#')[0] + location.hash;
    });
  });

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
  selectTier('full'); // default line-up: Henrix Full Experience
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
      var r = $('#enquiry input[name=Sastāvs][value="' + FORM_TIER[a.dataset.tier] + '"]'); if (r) r.checked = true;
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
        $('.lbl', s).textContent = n === 3 ? '50 min' : T((i + 1) + '. sets', 'Set ' + (i + 1));
      });
      timeline.setAttribute('aria-label', n === 3 ? T('Programma: trīs seti pa 50 minūtēm', 'Programme: three sets of 50 minutes') : T('Programma: četri īsāki seti', 'Programme: four shorter sets'));
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
  // Muted background loop starts when the card is on screen (not with reduced motion);
  // the button toggles sound. Before that, a click starts the video directly with sound.
  var vid = $('#vid'), vidBtn = $('button', vid);
  var V = { inView: false, direct: false, sound: false, unmutedOnce: false, frame: null, ready: false, queue: [], ping: 0 };
  var YT_ORIGIN = 'https://www.youtube-nocookie.com';
  var YT = 'https://www.youtube-nocookie.com/embed/CZxHxjbiefg?autoplay=1&{m}loop=1&playlist=CZxHxjbiefg&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1';
  function mountFrame(muted) {
    var f = doc.createElement('iframe');
    f.title = T('Henrix Band dzīvajā — video', 'Henrix Band live — video');
    f.allow = 'autoplay; encrypted-media; picture-in-picture';
    f.tabIndex = -1;
    f.src = YT.replace('{m}', muted ? 'mute=1&' : '');
    f.addEventListener('load', function () {
      setTimeout(function () { f.classList.add('ready'); }, 400);
      // IFrame API handshake: announce we're listening until the player reports onReady
      var tries = 0;
      clearInterval(V.ping);
      V.ping = setInterval(function () {
        if (V.ready || ++tries > 60) { clearInterval(V.ping); return; }
        post({ event: 'listening', id: 1, channel: 'widget' });
      }, 250);
    });
    V.frame = f; V.ready = false; V.queue = [];
    vid.insertBefore(f, $('.scrim', vid));
  }
  function post(msg) {
    var f = V.frame; if (f && f.contentWindow) f.contentWindow.postMessage(JSON.stringify(msg), YT_ORIGIN);
  }
  // commands sent before onReady are dropped by the player, so hold them until it is ready
  function yt(func, args) {
    var msg = { event: 'command', func: func, args: args || [] };
    if (V.ready) post(msg); else V.queue.push(msg);
  }
  window.addEventListener('message', function (e) {
    if (e.origin !== YT_ORIGIN || !V.frame || e.source !== V.frame.contentWindow) return;
    var d; try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (err) { return; }
    if (!d || V.ready || (d.event !== 'onReady' && d.event !== 'initialDelivery' && d.event !== 'infoDelivery')) return;
    V.ready = true; clearInterval(V.ping);
    var q = V.queue; V.queue = [];
    q.forEach(post);
  });
  function renderVid() {
    vid.classList.toggle('sound', V.sound);
    $('.disc', vid).innerHTML = V.sound ? '<span class="pause"><span></span><span></span></span>' : '<span class="tri"></span>';
    $('.hint', vid).textContent = V.sound ? T('Izslēgt skaņu', 'Sound off') : (V.inView || V.direct ? T('Ieslēgt skaņu', 'Sound on') : T('Atskaņot', 'Play'));
    vidBtn.setAttribute('aria-label', V.sound ? T('Izslēgt video skaņu', 'Turn the video sound off') : T('Atskaņot Henrix Band video ar skaņu', 'Play the Henrix Band video with sound'));
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
  form.noValidate = true; // custom validation below; native checks stay on when JS is off
  F('email').required = false; // without JS the e-mail is required; with JS e-mail OR phone is enough
  function validate() {
    var e = {}, email = F('email').value.trim(), phone = F('Tālrunis').value.trim();
    if (!F('Datums').value) e.date = T('Norādiet pasākuma datumu.', 'Please enter the event date.');
    if (!F('Kontaktpersona').value.trim()) e.name = T('Norādiet savu vārdu.', 'Please enter your name.');
    if (!email && !phone) e.contact = T('Norādiet e-pastu vai tālruni.', 'Please enter an e-mail or phone number.');
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) e.contact = T('Pārbaudiet e-pasta adresi.', 'Please check the e-mail address.');
    return e;
  }
  function showErrors() {
    $('#err-date').textContent = errors.date || ''; $('#err-name').textContent = errors.name || ''; $('#err-contact').textContent = errors.contact || '';
    F('Datums').setAttribute('aria-invalid', errors.date ? 'true' : 'false');
    F('Kontaktpersona').setAttribute('aria-invalid', errors.name ? 'true' : 'false');
    F('email').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
    F('Tālrunis').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
  }
  // as in the original: editing only clears errors that are now fixed, it never adds new ones
  // a previous send error no longer applies once the form changes
  function clearStatus() { status.textContent = ''; status.classList.remove('info'); }
  form.addEventListener('input', function () {
    clearStatus();
    if (!Object.keys(errors).length) return;
    var v = validate();
    ['date', 'name', 'contact'].forEach(function (k) { if (!v[k]) delete errors[k]; });
    showErrors();
  });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearStatus();
    var v = validate();
    if (Object.keys(v).length) { errors = v; showErrors(); F(v.date ? 'Datums' : v.name ? 'Kontaktpersona' : 'email').focus(); return; }
    errors = {}; showErrors();
    var btn = $('button[type=submit]', form); btn.disabled = true;
    var data = new FormData(form), d = dmy(F('Datums').value);
    data.set('Datums', d);
    data.set('_subject', 'Henrix Band — jauns pasākuma pieprasījums (' + d + (EN ? ', EN' : '') + ')');
    // only an explicit success counts: FormSubmit can answer 200 with success "false" (e.g. before activation)
    fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || (j.success !== true && j.success !== 'true')) throw new Error('not sent'); onSent(); })
      .catch(function () { status.textContent = T('Neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši: henrixband@gmail.com, +371 25 972 689.', 'Sending failed. Please try again or contact us directly: henrixband@gmail.com, +371 25 972 689.'); })
      .then(function () { btn.disabled = false; });
  });
  function dmy(iso) { return iso ? iso.split('-').reverse().join('.') : ''; }
  function onSent() {
    var first = F('Kontaktpersona').value.trim().split(' ')[0] || '', d = F('Datums').value;
    $('#sent-name').textContent = ', ' + first;
    $('#sent-date').textContent = (EN ? ' for ' : ' ') + dmy(d);
    form.hidden = true; sent.hidden = false;
    sent.focus({ preventScroll: true });
    anim(sent, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE });
  }
  $('#sent-reset').addEventListener('click', function () { form.reset(); errors = {}; showErrors(); clearStatus(); sent.hidden = true; form.hidden = false; });

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
      if (r.top < vh && r.bottom > 0) { V.inView = true; mountFrame(true); renderVid(); }
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
