/* Henrix Alternative — header (scrolled state + mobile menu, same behaviour as main.js) and booking form. */
document.documentElement.classList.add('js');
(function () {
  'use strict';
  var hdr = document.getElementById('hdr'), menu = document.getElementById('alt-menu');
  var btn = hdr && hdr.querySelector('.menu-btn');
  if (!hdr || !menu || !btn) return;
  var lbl = btn.querySelector('.menu-lbl'), open = false;
  var mq = window.matchMedia('(max-width: 860px)'), reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function setMenu(o) {
    open = o && mq.matches;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    lbl.textContent = open ? 'Aizvērt' : 'Izvēlne';
    hdr.classList.toggle('menu-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open && !reduced.matches && Element.prototype.animate) all('[data-menu-item]', menu).forEach(function (el, i) {
      el.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 520, delay: 40 + i * 50, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' });
    });
    if (open) { var first = menu.querySelector('[data-menu-item]'); if (first) first.focus({ preventScroll: true }); }
  }
  btn.addEventListener('click', function () { setMenu(!open); });
  all('a', menu).concat(all('.brand', hdr)).forEach(function (a) { a.addEventListener('click', function () { if (open) setMenu(false); }); });
  window.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') { setMenu(false); btn.focus(); return; }
    if (e.key !== 'Tab') return;
    // aria-modal menu: keep Tab inside the header controls and the menu
    var f = all('a[href], button', hdr).concat(all('a[href], button', menu)).filter(function (el) { return el.offsetParent !== null; });
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i === -1 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () { if (!mq.matches && open) setMenu(false); });
  var sc = null;
  function onScroll() { var s = window.scrollY > 8; if (s !== sc) { sc = s; hdr.classList.toggle('scrolled', s); } }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();

/* motion — ported from main.js: scroll reveals, parallax, word fade, stage light */
(function () {
  'use strict';
  var doc = document, mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function all(sel) { return Array.prototype.slice.call(doc.querySelectorAll(sel)); }
  function reduced() { return mq.matches; }

  // quote: one span per word, faded in with scroll
  var quote = doc.querySelector('[data-quote]'), words = [];
  if (quote) (function split(node) {
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

  var io = null, light = doc.querySelector('.hero-light');
  function applyMotionMode() {
    var els = all('[data-reveal]');
    if (io) io.disconnect();
    if (reduced() || !window.IntersectionObserver) {
      els.forEach(function (el) { el.classList.remove('pre'); el.style.transitionDelay = ''; });
      all('[data-parallax]').forEach(function (el) { el.style.transform = ''; });
      words.forEach(function (w) { w.style.opacity = '1'; });
      if (light) light.style.opacity = '0';
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
      if (el.getBoundingClientRect().top < vh * 0.94) return;
      el.classList.add('pre'); io.observe(el);
    });
  }

  var px = all('[data-parallax]'), raf = 0;
  function tick() {
    raf = 0;
    if (reduced()) return;
    var vh = window.innerHeight;
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
  var hero = doc.querySelector('.r-hero');
  if (hero && light) {
    hero.addEventListener('pointermove', function (e) {
      if (reduced() || e.pointerType !== 'mouse') return;
      var r = hero.getBoundingClientRect();
      light.style.opacity = '1'; light.style.transform = 'translate3d(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px,0)';
    });
    hero.addEventListener('pointerleave', function () { light.style.opacity = '0'; });
  }
})();

/* booking form (FormSubmit). Same pattern as main.js: without JS the form posts normally. */
(function () {
  'use strict';
  var form = document.getElementById('alt-form');
  if (!form || !window.fetch || !window.FormData) return;
  var sent = document.getElementById('alt-sent'), status = document.getElementById('alt-status');
  var F = function (n) { return form.elements[n]; };
  var FAIL = 'Neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai sazinieties ar mums tieši: henrixband@gmail.com, +371 25 972 689.';
  var errors = {};

  form.noValidate = true;          // custom messages below; native checks stay on when JS is off
  F('email').required = false;     // with JS, e-mail OR phone is enough

  function validate() {
    var e = {}, email = F('email').value.trim(), phone = F('Tālrunis').value.trim();
    if (!F('Kontaktpersona').value.trim()) e.name = 'Norādiet savu vārdu.';
    if (!F('Datums').value) e.date = 'Norādiet pasākuma datumu.';
    if (!email && !phone) e.contact = 'Norādiet e-pastu vai tālruni.';
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) e.contact = 'Pārbaudiet e-pasta adresi.';
    return e;
  }
  function showErrors() {
    document.getElementById('rerr-name').textContent = errors.name || '';
    document.getElementById('rerr-date').textContent = errors.date || '';
    document.getElementById('rerr-contact').textContent = errors.contact || '';
    F('Kontaktpersona').setAttribute('aria-invalid', errors.name ? 'true' : 'false');
    F('Datums').setAttribute('aria-invalid', errors.date ? 'true' : 'false');
    F('email').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
    F('Tālrunis').setAttribute('aria-invalid', errors.contact ? 'true' : 'false');
  }
  function dmy(iso) { return iso ? iso.split('-').reverse().join('.') : ''; }

  form.addEventListener('input', function () {
    status.textContent = '';
    if (!Object.keys(errors).length) return;
    var v = validate();
    ['name', 'date', 'contact'].forEach(function (k) { if (!v[k]) delete errors[k]; });
    showErrors();
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.textContent = '';
    var v = validate();
    if (Object.keys(v).length) {
      errors = v; showErrors();
      F(v.name ? 'Kontaktpersona' : v.date ? 'Datums' : 'email').focus();
      return;
    }
    errors = {}; showErrors();
    var btn = form.querySelector('button[type=submit]'); btn.disabled = true;
    var data = new FormData(form), d = dmy(F('Datums').value);
    data.set('Datums', d);
    data.set('_subject', 'Henrix Alternative — jauns pieprasījums (' + d + ')');
    // only an explicit success counts: FormSubmit can answer 200 with success "false" (e.g. before activation)
    fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        if (!j || (j.success !== true && j.success !== 'true')) throw new Error('not sent');
        form.hidden = true; sent.hidden = false; sent.focus({ preventScroll: false });
      })
      .catch(function () { status.textContent = FAIL; })
      .then(function () { btn.disabled = false; });
  });

  document.getElementById('alt-reset').addEventListener('click', function () {
    form.reset(); errors = {}; showErrors(); status.textContent = '';
    sent.hidden = true; form.hidden = false; F('Kontaktpersona').focus();
  });
})();
