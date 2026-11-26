// Peri-Peri Guys — full menu page, dish popup and sauce quiz.
// Loaded after peri-site.js (uses its globals: dishes, categories, sauceList, stores, photos, client, page, show).
(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const hot = ['2 Whole Chickens BOGO', 'The King Chicken Sandwich', '20 Peri-Wings'];
  const sauced = new Set(['Chicken', 'Wings', 'Sandwiches', 'Platters', 'Bowls & Salads']);
  const sauceNotes = [
    'Bright, zesty and easy on the heat.',
    'Sweet and fruity with a gentle kick.',
    'Classic peri-peri warmth without the sweat.',
    'Proper chili heat for people who like it hot.',
    'Our fiercest. Bring a drink.'
  ];
  const chilis = n => `<span class="heat-dots" aria-label="Heat ${n} of 4">${[1, 2, 3, 4].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
  const heatOf = i => i; // sauceList is ordered mildest -> hottest (0..4)
  let store = (() => { try { return localStorage.getItem('ppg-store') || stores[0].slug; } catch { return stores[0].slug; } })();
  const setStore = s => { store = s; try { localStorage.setItem('ppg-store', s); } catch {} };
  const orderUrl = () => `${client}/menu/${store}`;

  // ---------------- dish popup ----------------
  window.openDish = (index, preSauce) => {
    const d = dishes[index]; if (!d) return;
    const canSauce = sauced.has(d.category);
    let pick = preSauce ?? null;
    const render = () => `
      <div class="dd">
        ${d.photo ? `<figure class="dd-photo">${picture(d.photo, d.name, true)}</figure>` : ''}
        <p class="dd-cat">${esc(d.category)}${hot.includes(d.name) ? ' · <b>What’s hot</b>' : ''}</p>
        <h2 id="dialog-title">${esc(d.name)}</h2>
        <p class="dd-price">$${esc(d.price)}</p>
        <p class="dd-desc">${esc(d.description)}</p>
        ${canSauce ? `<fieldset class="dd-sauce"><legend>Pick your sauce</legend><div class="dd-sauces">${sauceList.map(([n], i) => `<button type="button" class="dd-s${pick === i ? ' on' : ''}" data-pick="${i}" aria-pressed="${pick === i}"><span>${esc(n)}</span>${chilis(heatOf(i))}</button>`).join('')}</div>
          <p class="dd-note" aria-live="polite">${pick === null ? 'Not sure? <button type="button" class="linkish" data-open="quiz">Take the sauce quiz</button>' : `${esc(sauceList[pick][0])}: ${sauceNotes[pick]} Choose it when you check out.`}</p></fieldset>` : ''}
        <div class="dd-store" role="group" aria-label="Location">${stores.map(s => `<button type="button" class="choice" data-store="${s.slug}" aria-pressed="${s.slug === store}">${esc(s.name)}</button>`).join('')}</div>
        <a class="pill glow dd-order" href="${orderUrl()}">Order at ${esc(stores.find(s => s.slug === store).name)}</a>
        <p class="dd-small">Prices and availability can vary by location.</p>
      </div>`;
    show(render(), 'dish');
    const content = document.querySelector('#dialog-content');
    content.onclick = e => {
      const p = e.target.closest('[data-pick]'), st = e.target.closest('[data-store]');
      if (p) { pick = +p.dataset.pick; content.innerHTML = render(); content.querySelector(`[data-pick="${pick}"]`)?.focus(); }
      else if (st) { setStore(st.dataset.store); content.innerHTML = render(); content.querySelector(`[data-store="${store}"]`)?.focus(); }
    };
  };

  // ---------------- sauce quiz ----------------
  const questions = [
    {q: 'How do you handle heat?', a: [['🧊', 'Keep it cool'], ['🌶️', 'A little tingle'], ['🔥', 'Bring the fire'], ['🥵', 'Make me cry']]},
    {q: 'Pick a flavour mood', a: [['🍋', 'Zesty & fresh'], ['🥭', 'Sweet & fruity'], ['🍗', 'Classic peri-peri'], ['💥', 'Bold & fiery']]},
    {q: 'What are you craving?', a: [['🍗', 'A whole bird to share'], ['🔥', 'Wings'], ['🍔', 'Something in a bun'], ['🥗', 'A bowl']]}
  ];
  const decide = ([h, f, c]) => {
    let s;
    if (h === 0) s = f === 1 ? 1 : 0;
    else if (h === 1) s = f === 0 ? 0 : f === 1 ? 1 : 2;
    else if (h === 2) s = f === 3 ? 4 : 3;
    else s = 4;
    const dishName = ['2 Whole Chickens BOGO', '20 Peri-Wings', 'The King Chicken Sandwich', 'Avocado Chicken Salad Bowl'][c];
    return {sauce: s, dish: Math.max(0, dishes.findIndex(d => d.name === dishName))};
  };
  window.openQuiz = () => {
    const answers = [];
    const step = () => {
      const i = answers.length, content = document.querySelector('#dialog-content');
      if (i < questions.length) {
        const {q, a} = questions[i];
        const html = `<div class="qz">
          <div class="qz-bar" aria-hidden="true"><i style="--p:${i / questions.length}"></i></div>
          <p class="qz-step">Question ${i + 1} of ${questions.length}</p>
          <h2 id="dialog-title">${q}</h2>
          <div class="qz-opts">${a.map(([e, t], k) => `<button type="button" class="qz-opt" data-qa="${k}" style="--k:${k}"><span aria-hidden="true">${e}</span>${t}</button>`).join('')}</div>
          ${i ? '<button type="button" class="linkish qz-back" data-qback>← Back</button>' : ''}</div>`;
        if (!document.querySelector('#dialog').open || !content.querySelector('.qz')) show(html, 'quiz'); else content.innerHTML = html;
        content.querySelector('.qz-opt')?.focus();
      } else {
        const r = decide(answers), [name] = sauceList[r.sauce], d = dishes[r.dish];
        content.innerHTML = `<div class="qz qz-result">
          <div class="qz-bar" aria-hidden="true"><i style="--p:1"></i></div>
          <p class="qz-step">Your peri-peri match</p>
          <h2 id="dialog-title" class="qz-name">${esc(name)}</h2>
          ${chilis(heatOf(r.sauce))}
          <p class="qz-note">${sauceNotes[r.sauce]}</p>
          <div class="qz-pair">${d.photo ? picture(d.photo, '') : ''}<div><p class="qz-step">Pair it with</p><p class="qz-dish">${esc(d.name)}</p><p class="qz-price">$${esc(d.price)}</p></div></div>
          <div class="qz-actions"><button type="button" class="pill glow" data-qorder>Order this combo</button><button type="button" class="pill ghost" data-qshare>Share my sauce</button></div>
          <button type="button" class="linkish" data-qagain>Take it again</button>
          <p class="qz-toast" role="status" aria-live="polite"></p></div>`;
        content.querySelector('[data-qorder]').focus();
        content.dataset.result = JSON.stringify(r);
      }
    };
    step();
    const content = document.querySelector('#dialog-content');
    content.onclick = async e => {
      const opt = e.target.closest('[data-qa]');
      if (opt) { opt.classList.add('picked'); setTimeout(() => { answers.push(+opt.dataset.qa); step(); }, 180); return; }
      if (e.target.closest('[data-qback]')) { answers.pop(); step(); return; }
      if (e.target.closest('[data-qagain]')) { answers.length = 0; step(); return; }
      const r = content.dataset.result && JSON.parse(content.dataset.result);
      if (r && e.target.closest('[data-qorder]')) { window.openDish(r.dish, r.sauce); return; }
      if (r && e.target.closest('[data-qshare]')) {
        const text = `My Peri-Peri Guys sauce is ${sauceList[r.sauce][0]}. Find yours:`, url = `${location.origin}${location.pathname}?quiz=1`;
        try { if (navigator.share) await navigator.share({title: 'Peri-Peri Guys sauce quiz', text, url}); else { await navigator.clipboard.writeText(`${text} ${url}`); content.querySelector('.qz-toast').textContent = 'Link copied.'; } } catch {}
      }
    };
  };
  if (new URLSearchParams(location.search).get('quiz') === '1') setTimeout(() => window.openQuiz(), 300);

  // ---------------- full menu page ----------------
  const app = document.querySelector('#menu-app');
  if (!app) return;
  const cats = categories.map(([n]) => n).filter(n => dishes.some(d => d.category === n));
  const card = d => {
    const i = dishes.indexOf(d);
    return `<article class="mi" data-cat="${esc(d.category)}" data-text="${esc((d.name + ' ' + d.description + ' ' + d.category).toLowerCase())}">
      <button type="button" class="mi-open" data-dish="${i}" aria-label="${esc(d.name)}, $${esc(d.price)}. View details">
        <span class="mi-media">${d.photo ? picture(d.photo, '') : '<span class="mi-ph" aria-hidden="true"></span>'}${hot.includes(d.name) ? '<span class="mi-badge">🔥 What’s hot</span>' : ''}</span>
        <span class="mi-body"><span class="mi-name">${esc(d.name)}</span><span class="mi-desc">${esc(d.description)}</span>
        <span class="mi-foot"><span class="mi-price">$${esc(d.price)}</span>${sauced.has(d.category) ? '<span class="mi-tag">Choose your sauce</span>' : ''}<span class="mi-add" aria-hidden="true">+</span></span></span>
      </button></article>`;
  };
  app.innerHTML = `
    <div class="mn-bar" id="mn-bar">
      <div class="mn-bar-in">
        <nav class="mn-tabs" aria-label="Menu categories">${cats.map(c => `<a href="#cat-${slug(c)}" data-tab="${slug(c)}">${esc(c)}<sup>${dishes.filter(d => d.category === c).length}</sup></a>`).join('')}</nav>
        <div class="mn-tools">
          <label class="mn-search"><span class="sr">Search the menu</span><input id="mn-q" type="search" placeholder="Search wings, bowls…" autocomplete="off"></label>
          <div class="mn-store" role="group" aria-label="Order from">${stores.map(s => `<button type="button" class="choice" data-mstore="${s.slug}" aria-pressed="${s.slug === store}">${esc(s.name)}</button>`).join('')}</div>
        </div>
      </div>
    </div>
    <div class="mn-wrap">
      <aside class="mn-quiz"><div><p class="kicker">Not sure which sauce?</p><h2>Find your peri-peri in 30 seconds</h2></div><button type="button" class="pill glow" data-open="quiz">Take the sauce quiz</button></aside>
      ${cats.map(c => `<section class="mn-cat" id="cat-${slug(c)}" aria-labelledby="h-${slug(c)}"><h2 id="h-${slug(c)}">${esc(c)}</h2><div class="mn-grid">${dishes.filter(d => d.category === c).map(card).join('')}</div></section>`).join('')}
      <p class="mn-empty" id="mn-empty" role="status" hidden>Nothing matches that search. Try “chicken” or “wings”.</p>
      <p class="mn-foot">Showing our featured menu. <a href="${client}/menu">See the full live menu</a> for every item and today’s prices.</p>
    </div>`;

  // category from the old ?category= links
  const want = new URLSearchParams(location.search).get('category');
  if (want) setTimeout(() => document.querySelector(`#cat-${slug(want)}`)?.scrollIntoView({block: 'start'}), 200);

  // search
  const q = app.querySelector('#mn-q');
  q.addEventListener('input', () => {
    const v = q.value.trim().toLowerCase();
    let any = false;
    app.querySelectorAll('.mn-cat').forEach(sec => {
      let n = 0;
      sec.querySelectorAll('.mi').forEach(m => { const ok = !v || m.dataset.text.includes(v); m.hidden = !ok; if (ok) n++; });
      sec.hidden = !n; any ||= n > 0;
    });
    app.querySelector('#mn-empty').hidden = any;
  });

  // location
  app.addEventListener('click', e => {
    const b = e.target.closest('[data-mstore]'); if (!b) return;
    setStore(b.dataset.mstore);
    app.querySelectorAll('[data-mstore]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  });

  // tabs: smooth scroll + scroll-spy
  const tabs = [...app.querySelectorAll('[data-tab]')];
  app.querySelector('.mn-tabs').addEventListener('click', e => {
    const a = e.target.closest('a[href^="#cat-"]'); if (!a) return;
    e.preventDefault(); e.stopPropagation();
    const t = document.querySelector(a.getAttribute('href'));
    const off = -(document.querySelector('#mn-bar').offsetHeight + 16);
    if (window.lenis) window.lenis.scrollTo(t, {offset: off}); else scrollTo({top: t.getBoundingClientRect().top + scrollY + off, behavior: 'smooth'});
  });
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id.slice(4);
    const nav = app.querySelector('.mn-tabs');
    tabs.forEach(t => { const on = t.dataset.tab === id; t.classList.toggle('on', on); if (on && nav.scrollWidth > nav.clientWidth) nav.scrollTo({left: t.offsetLeft - nav.clientWidth / 2 + t.offsetWidth / 2, behavior: 'smooth'}); });
  }), {rootMargin: '-30% 0px -60% 0px'});
  app.querySelectorAll('.mn-cat').forEach(s => spy.observe(s));
})();
