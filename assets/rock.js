/* Henrix Rock — booking form (FormSubmit). Same pattern as main.js: without JS the form posts normally. */
(function () {
  'use strict';
  var form = document.getElementById('rock-form');
  if (!form || !window.fetch || !window.FormData) return;
  var sent = document.getElementById('rock-sent'), status = document.getElementById('rock-status');
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
    data.set('_subject', 'Henrix Rock — jauns pieprasījums (' + d + ')');
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

  document.getElementById('rock-reset').addEventListener('click', function () {
    form.reset(); errors = {}; showErrors(); status.textContent = '';
    sent.hidden = true; form.hidden = false; F('Kontaktpersona').focus();
  });
})();
