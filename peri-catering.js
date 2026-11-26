// Peri-Peri Guys — catering request form (3 steps).
// Sending: if window.PPG_FORM_ENDPOINT is set (e.g. a Formspree / Web3Forms URL) the request is POSTed there;
// otherwise the customer's email app opens with the request written out to CATERING_EMAIL.
(() => {
  const app = document.querySelector('#cater-app');
  if (!app) return;
  const CATERING_EMAIL = 'info@periperiguys.com';
  const ENDPOINT = window.PPG_FORM_ENDPOINT || '';
  const DRAFT = 'ppg-catering-draft';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const pad = n => String(n).padStart(2, '0');
  const tomorrow = (() => { const d = new Date(Date.now() + 86400000); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })();
  const events = ['Office lunch', 'Birthday', 'Wedding', 'Game day', 'Family gathering', 'Other'];
  const sauces = sauceList.map(([n]) => n);

  app.innerHTML = `
  <section class="ct-form-sec" id="cater-form" aria-labelledby="ct-title">
    <div class="ct-side">
      <p class="kicker">Request catering</p>
      <h2 id="ct-title">Tell us about your event</h2>
      <p>Three quick steps. We’ll confirm availability, menu and pricing with you before anything is final.</p>
      <ul class="ct-points"><li>Zabiha Halal chicken, marinated 24+ hours</li><li>Pickup or delivery from Hicksville or Selden</li><li>Every sauce from Lemon &amp; Herb to Very Hot</li></ul>
      <p class="ct-alt">Prefer to talk? ${stores.map(s => `<a href="tel:${s.tel}">${esc(s.name)} ${esc(s.phone)}</a>`).join(' · ')}</p>
    </div>
    <form class="ct-form" novalidate>
      <ol class="ct-steps" aria-label="Progress">${['Event', 'Food', 'Contact'].map((t, i) => `<li data-s="${i}"><span>${i + 1}</span>${t}</li>`).join('')}</ol>

      <fieldset class="ct-step" data-step="0">
        <legend class="sr">Event details</legend>
        <div class="ct-field"><span class="ct-label" id="l-type">What’s the occasion?</span>
          <div class="ct-chips" role="radiogroup" aria-labelledby="l-type">${events.map((e, i) => `<label class="ct-chip"><input type="radio" name="type" value="${e}" ${i ? '' : 'required'}><span>${e}</span></label>`).join('')}</div>
          <p class="ct-err" data-for="type"></p></div>
        <div class="ct-row">
          <label class="ct-field"><span class="ct-label">Date</span><input type="date" name="date" min="${tomorrow}" required><p class="ct-err" data-for="date"></p></label>
          <label class="ct-field"><span class="ct-label">Time</span><input type="time" name="time" required><p class="ct-err" data-for="time"></p></label>
        </div>
        <div class="ct-field"><span class="ct-label" id="l-guests">How many guests?</span>
          <div class="ct-guests"><button type="button" class="ct-step-btn" data-g="-5" aria-label="5 fewer guests">−</button><input type="number" name="guests" inputmode="numeric" min="5" max="1000" value="20" aria-labelledby="l-guests" required><button type="button" class="ct-step-btn" data-g="5" aria-label="5 more guests">+</button></div>
          <p class="ct-err" data-for="guests"></p></div>
      </fieldset>

      <fieldset class="ct-step" data-step="1" hidden>
        <legend class="sr">Food and logistics</legend>
        <div class="ct-field"><span class="ct-label" id="l-store">Which restaurant?</span>
          <div class="ct-seg" role="radiogroup" aria-labelledby="l-store">${stores.map((s, i) => `<label><input type="radio" name="store" value="${esc(s.name)}" ${i ? '' : 'checked'}><span>${esc(s.name)}</span></label>`).join('')}</div></div>
        <div class="ct-field"><span class="ct-label" id="l-mode">Pickup or delivery?</span>
          <div class="ct-seg" role="radiogroup" aria-labelledby="l-mode"><label><input type="radio" name="mode" value="Pickup" checked><span>Pickup</span></label><label><input type="radio" name="mode" value="Delivery"><span>Delivery</span></label></div></div>
        <label class="ct-field ct-addr" hidden><span class="ct-label">Delivery address</span><input type="text" name="address" autocomplete="street-address" placeholder="Street, town, ZIP"><p class="ct-err" data-for="address"></p></label>
        <div class="ct-field"><span class="ct-label" id="l-sauce">Sauces you’d like <small>(pick any)</small></span>
          <div class="ct-chips" aria-labelledby="l-sauce">${sauces.map(n => `<label class="ct-chip"><input type="checkbox" name="sauces" value="${esc(n)}"><span>${esc(n)}</span></label>`).join('')}</div></div>
        <label class="ct-field"><span class="ct-label">Anything else? <small>(menu ideas, dietary needs, budget)</small></span><textarea name="notes" rows="4" placeholder="e.g. 4 whole chickens, wings, rice and fries for 30 people"></textarea></label>
      </fieldset>

      <fieldset class="ct-step" data-step="2" hidden>
        <legend class="sr">Your contact details</legend>
        <label class="ct-field"><span class="ct-label">Your name</span><input type="text" name="name" autocomplete="name" required><p class="ct-err" data-for="name"></p></label>
        <div class="ct-row">
          <label class="ct-field"><span class="ct-label">Email</span><input type="email" name="email" autocomplete="email" required><p class="ct-err" data-for="email"></p></label>
          <label class="ct-field"><span class="ct-label">Phone</span><input type="tel" name="phone" autocomplete="tel" required><p class="ct-err" data-for="phone"></p></label>
        </div>
        <label class="ct-field"><span class="ct-label">Company or organisation <small>(optional)</small></span><input type="text" name="company" autocomplete="organization"></label>
        <div class="ct-summary" aria-live="polite"></div>
      </fieldset>

      <div class="ct-done" hidden tabindex="-1">
        <span class="ct-tick" aria-hidden="true">✓</span>
        <h3>Almost there!</h3>
        <p class="ct-done-msg"></p>
        <button type="button" class="pill ghost" data-again>Start a new request</button>
      </div>

      <div class="ct-nav">
        <button type="button" class="pill ghost" data-back hidden>Back</button>
        <button type="button" class="pill dark" data-next>Next</button>
        <button type="submit" class="pill glow" data-send hidden>Send request</button>
      </div>
      <p class="ct-small">We only use your details to reply about this event.</p>
    </form>
  </section>`;

  const form = app.querySelector('.ct-form');
  const steps = [...form.querySelectorAll('.ct-step')];
  const dots = [...form.querySelectorAll('.ct-steps li')];
  const $ = s => form.querySelector(s);
  let cur = 0;

  // draft: remembered on this device only, cleared once sent
  const save = () => { try { const d = {}; new FormData(form).forEach((v, k) => { d[k] = d[k] ? [].concat(d[k], v) : v; }); localStorage.setItem(DRAFT, JSON.stringify(d)); } catch {} };
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT) || 'null');
    if (d) for (const [k, v] of Object.entries(d)) for (const el of form.querySelectorAll(`[name="${k}"]`)) {
      if (el.type === 'radio' || el.type === 'checkbox') el.checked = [].concat(v).includes(el.value); else el.value = v;
    }
  } catch {}
  form.addEventListener('input', save);
  // clear a field's error as soon as it's fixed
  const recheck = e => {
    const el = e.target; if (!el.name || !el.hasAttribute('aria-invalid') || el.getAttribute('aria-invalid') !== 'true') return;
    let ok = el.type === 'radio' ? true : el.checkValidity();
    if (el.name === 'phone') ok = ok && el.value.replace(/\D/g, '').length >= 10;
    if (ok) { form.querySelectorAll(`[name="${el.name}"]`).forEach(t => t.setAttribute('aria-invalid', 'false')); const err = form.querySelector(`.ct-err[data-for="${el.name}"]`); if (err) err.textContent = ''; }
  };
  form.addEventListener('input', recheck); form.addEventListener('change', recheck);

  const syncAddr = () => { const on = $('[name="mode"]:checked')?.value === 'Delivery'; $('.ct-addr').hidden = !on; $('[name="address"]').required = on; };
  form.addEventListener('change', e => { if (e.target.name === 'mode') syncAddr(); });
  syncAddr();

  form.addEventListener('click', e => {
    const g = e.target.closest('[data-g]'); if (!g) return;
    const inp = $('[name="guests"]'); inp.value = Math.min(1000, Math.max(5, (+inp.value || 0) + +g.dataset.g)); save();
  });

  const msg = {type: 'Pick an occasion.', date: 'Choose a date from tomorrow onwards.', time: 'Choose a time.', guests: 'Enter between 5 and 1,000 guests.', address: 'Add the delivery address.', name: 'Add your name.', email: 'Add a valid email address.', phone: 'Add a phone number we can call.'};
  const validate = i => {
    let first = null;
    steps[i].querySelectorAll('[required]').forEach(el => {
      const name = el.name, err = form.querySelector(`.ct-err[data-for="${name}"]`);
      let ok = el.type === 'radio' ? !!form.querySelector(`[name="${name}"]:checked`) : el.checkValidity();
      if (name === 'phone') ok = ok && el.value.replace(/\D/g, '').length >= 10;
      if (err) err.textContent = ok ? '' : msg[name];
      const target = el.type === 'radio' ? form.querySelectorAll(`[name="${name}"]`) : [el];
      target.forEach(t => t.setAttribute('aria-invalid', String(!ok)));
      if (!ok && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  };

  const data = () => {
    const f = new FormData(form);
    return {type: f.get('type'), date: f.get('date'), time: f.get('time'), guests: f.get('guests'), store: f.get('store'), mode: f.get('mode'), address: f.get('address'),
      sauces: f.getAll('sauces').join(', ') || 'No preference', notes: f.get('notes') || '—', name: f.get('name'), email: f.get('email'), phone: f.get('phone'), company: f.get('company') || '—'};
  };
  const nice = d => { if (!d) return ''; const dt = new Date(d + 'T12:00'); return dt.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}); };
  const niceT = t => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'pm' : 'am'}`; };
  const summary = () => { const d = data();
    $('.ct-summary').innerHTML = `<p class="ct-label">Your request</p><dl>
      <div><dt>Occasion</dt><dd>${esc(d.type)}</dd></div><div><dt>When</dt><dd>${esc(nice(d.date))} · ${esc(niceT(d.time))}</dd></div>
      <div><dt>Guests</dt><dd>${esc(d.guests)}</dd></div><div><dt>From</dt><dd>${esc(d.store)} · ${esc(d.mode)}</dd></div>
      <div><dt>Sauces</dt><dd>${esc(d.sauces)}</dd></div></dl>`; };

  const go = i => {
    cur = i;
    steps.forEach((s, k) => { s.hidden = k !== i; });
    dots.forEach((d, k) => { d.classList.toggle('on', k <= i); d.toggleAttribute('aria-current', k === i); });
    $('[data-back]').hidden = i === 0; $('[data-next]').hidden = i === steps.length - 1; $('[data-send]').hidden = i !== steps.length - 1;
    if (i === steps.length - 1) summary();
    const t = form.getBoundingClientRect().top;
    if (t < 60) (window.lenis ? window.lenis.scrollTo(form, {offset: -100}) : form.scrollIntoView({behavior: 'smooth', block: 'start'}));
  };
  form.addEventListener('click', e => {
    if (e.target.closest('[data-next]') && validate(cur)) go(cur + 1);
    if (e.target.closest('[data-back]')) go(cur - 1);
    if (e.target.closest('[data-again]')) { form.reset(); try { localStorage.removeItem(DRAFT); } catch {} $('.ct-done').hidden = true; $('.ct-nav').hidden = false; $('.ct-steps').hidden = false; syncAddr(); go(0); }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(cur)) return;
    const d = data();
    const text = `CATERING REQUEST\n\nOccasion: ${d.type}\nDate: ${nice(d.date)} at ${niceT(d.time)}\nGuests: ${d.guests}\nRestaurant: ${d.store}\n${d.mode}${d.mode === 'Delivery' ? ` to: ${d.address}` : ''}\nSauces: ${d.sauces}\nNotes: ${d.notes}\n\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nCompany: ${d.company}`;
    const btn = $('[data-send]'); btn.disabled = true; btn.textContent = 'Sending…';
    let sent = false;
    if (ENDPOINT) {
      try { const r = await fetch(ENDPOINT, {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify({...d, _subject: `Catering request — ${d.type}, ${d.guests} guests`, message: text})}); sent = r.ok; } catch {}
    }
    btn.disabled = false; btn.textContent = 'Send request';
    steps.forEach(s => { s.hidden = true; }); $('.ct-nav').hidden = true; $('.ct-steps').hidden = true;
    const done = $('.ct-done'); done.hidden = false;
    if (sent) {
      done.querySelector('h3').textContent = 'Request sent!';
      $('.ct-done-msg').textContent = `Thanks, ${d.name.split(' ')[0]}. The ${d.store} team will reply to ${d.email} soon.`;
    } else {
      const mail = `mailto:${CATERING_EMAIL}?subject=${encodeURIComponent(`Catering request — ${d.type}, ${d.guests} guests, ${nice(d.date)}`)}&body=${encodeURIComponent(text)}`;
      $('.ct-done-msg').innerHTML = `Your email app is opening with the request written out — just press <b>send</b>. If it didn’t open, <a href="${mail}">tap here</a> or call ${esc(stores.find(s => s.name === d.store)?.phone || '')}.`;
      location.href = mail;
    }
    try { localStorage.removeItem(DRAFT); } catch {}
    done.focus();
  });

  go(0);
  if (location.hash === '#cater-form') setTimeout(() => app.scrollIntoView({block: 'start'}), 200);
})();
