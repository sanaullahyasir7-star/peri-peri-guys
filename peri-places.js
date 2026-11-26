// Peri-Peri Guys — Locations page (overview map, store cards, click-to-load Google map) and the Reviews section.
// Uses peri-site.js globals: stores, client, page.
(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const FULL = {Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday'};
  const nyDay = () => DAYS.indexOf(new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York', weekday: 'short'}).format(new Date()));
  const mapsSearch = s => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Peri-Peri Guys ' + s.address)}`;
  const mapsDir = s => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`;

  // ---------- Reviews ----------
  // Paste real reviews here (name, store, rating 1-5, text). The carousel appears only when this list has entries.
  const REVIEWS = window.PPG_REVIEWS || [];
  const reviewsHTML = () => `
    <section class="rv-sec" aria-labelledby="rv-title">
      <div class="rv-in">
        <p class="kicker">Loved on Long Island</p>
        <h2 id="rv-title">Don’t take our word for it</h2>
        <div class="rv-press">
          <article><span class="rv-mark" aria-hidden="true">★</span><div><h3>Newsday Top 100</h3><p>Hicksville made Newsday’s Top 100 Restaurants list.</p></div></article>
          <article><span class="rv-mark" aria-hidden="true">✦</span><div><h3>NY State Empire Award</h3><p>Presented to the founder by State Senator Kevin Thomas, 2022.</p></div></article>
        </div>
        ${REVIEWS.length ? `<div class="rv-track" tabindex="0" aria-label="Customer reviews">${REVIEWS.map(r => `<figure class="rv-card"><div class="rv-stars" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div><blockquote>“${esc(r.text)}”</blockquote><figcaption><b>${esc(r.name)}</b> · ${esc(r.store)}</figcaption></figure>`).join('')}</div>` : ''}
        <div class="rv-google">${stores.map(s => `<a class="rv-g" href="${mapsSearch(s)}" target="_blank" rel="noopener"><span class="rv-gstars" aria-hidden="true">★★★★★</span><span><b>${esc(s.name)}</b> Read &amp; leave a review on Google</span><i aria-hidden="true">↗</i></a>`).join('')}</div>
      </div>
    </section>`;
  const cats = document.querySelector('main .categories');
  if (cats) cats.insertAdjacentHTML('afterend', reviewsHTML());

  // ---------- Locations page ----------
  const app = document.querySelector('#loc-app');
  if (!app) return;
  const today = nyDay();
  const hoursRows = s => s.hours.split('·').map(part => {
    const m = part.trim().match(/^(\w{3})(?:\s*[–-]\s*(\w{3}))?\s+(.+)$/); if (!m) return '';
    const a = DAYS.indexOf(m[1]), b = m[2] ? DAYS.indexOf(m[2]) : a;
    let on = false; for (let d = a; ; d = (d + 1) % 7) { if (d === today) on = true; if (d === b) break; }
    return `<tr class="${on ? 'today' : ''}"><th scope="row">${FULL[m[1]]}${m[2] ? '–' + FULL[m[2]] : ''}${on ? ' <span>Today</span>' : ''}</th><td>${esc(m[3])}</td></tr>`;
  }).join('');
  // overview map: Long Island, longitude -74.05 (NYC) .. -71.85 (Montauk)
  const X = lon => 40 + (lon + 74.05) / 2.2 * 920, Y = lat => 300 - (lat - 40.55) / .55 * 260;
  const pins = stores.map((s, i) => `<a class="lc-pin" href="#store-${s.slug}" style="--d:${i * .25}s"><circle class="lc-ping" cx="${X(s.coords[1]).toFixed(0)}" cy="${Y(s.coords[0]).toFixed(0)}" r="11"/><circle cx="${X(s.coords[1]).toFixed(0)}" cy="${Y(s.coords[0]).toFixed(0)}" r="10"/><text x="${X(s.coords[1]).toFixed(0)}" y="${(Y(s.coords[0]) - 24).toFixed(0)}" text-anchor="middle">${esc(s.name.toUpperCase())}</text></a>`).join('');
  app.innerHTML = `
    <section class="lc-overview" aria-label="Map of our locations">
      <svg class="lc-map" viewBox="0 0 1000 340" role="img" aria-label="Long Island map showing Hicksville and Selden">
        <defs><pattern id="lc-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1.4" fill="#120d0b" fill-opacity=".09"/></pattern></defs>
        <rect width="1000" height="340" fill="url(#lc-dots)"/>
        <path d="M60 238 C 80 208, 130 196, 190 194 C 290 188, 380 182, 480 176 C 580 170, 680 156, 780 138 C 840 126, 900 110, 950 94 C 930 116, 900 132, 870 142 C 910 140, 940 146, 966 156 C 930 166, 890 170, 850 176 C 760 196, 660 212, 560 224 C 440 240, 320 254, 210 258 C 140 260, 90 254, 60 238 Z" fill="#fff" stroke="#120d0b" stroke-opacity=".25" stroke-width="2"/>
        <path d="M30 250 C 40 236, 52 226, 62 222" fill="none" stroke="#120d0b" stroke-opacity=".25" stroke-width="2"/>
        <text x="40" y="290" class="lc-lbl">NEW YORK CITY</text><text x="960" y="84" text-anchor="end" class="lc-lbl">MONTAUK</text>
        <text x="500" y="320" text-anchor="middle" class="lc-lbl">LONG ISLAND, NEW YORK</text>
        <path d="M${X(stores[0].coords[1]).toFixed(0)} ${Y(stores[0].coords[0]).toFixed(0)} Q ${((X(stores[0].coords[1]) + X(stores[1].coords[1])) / 2).toFixed(0)} ${(Math.min(Y(stores[0].coords[0]), Y(stores[1].coords[0])) - 70).toFixed(0)} ${X(stores[1].coords[1]).toFixed(0)} ${Y(stores[1].coords[0]).toFixed(0)}" fill="none" stroke="#f26925" stroke-width="2.5" stroke-dasharray="3 8" stroke-linecap="round"/>
        ${pins}
      </svg>
      <div class="lc-near"><button type="button" class="pill glow" id="lc-geo">Find my nearest</button><p id="lc-status" role="status" aria-live="polite"></p></div>
    </section>
    <div class="lc-list" id="lc-list">${stores.map(s => `
      <article class="lc-card location-card" id="store-${s.slug}" data-slug="${s.slug}">
        <div class="lc-info">
          <h3>${esc(s.name)}</h3>
          <address>${esc(s.address)}</address>
          <table class="lc-hours"><caption>Opening hours</caption><tbody>${hoursRows(s)}</tbody></table>
          <div class="lc-actions">
            <a class="pill glow" href="${client}/menu/${s.slug}">Order ${esc(s.name)}</a>
            <a class="pill ghost" href="tel:${s.tel}"><span aria-hidden="true">📞</span> ${esc(s.phone)}</a>
            <a class="pill ghost" href="${mapsDir(s)}" target="_blank" rel="noopener">Directions ↗</a>
          </div>
          <a class="lc-reviews" href="${mapsSearch(s)}" target="_blank" rel="noopener">★★★★★ Read reviews on Google ↗</a>
        </div>
        <div class="lc-mapbox">
          <button type="button" class="lc-facade" data-map="${esc(s.address)}" aria-label="Show ${esc(s.name)} on an interactive Google map">
            <span class="lc-streets" aria-hidden="true"></span><span class="lc-bigpin" aria-hidden="true"></span>
            <span class="lc-show">Show map</span><span class="lc-note">Loads Google Maps</span>
          </button>
        </div>
      </article>`).join('')}
    </div>`;

  // click-to-load Google map (keeps the page fast; ~1MB only when asked for)
  app.addEventListener('click', e => {
    const f = e.target.closest('.lc-facade'); if (!f) return;
    const box = f.parentElement, name = f.closest('.lc-card').querySelector('h3').textContent;
    box.innerHTML = `<iframe title="Map of Peri-Peri Guys ${esc(name)}" src="https://maps.google.com/maps?q=${encodeURIComponent('Peri-Peri Guys, ' + f.dataset.map)}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  });

  // pins scroll to cards
  app.querySelectorAll('.lc-pin').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = document.querySelector(a.getAttribute('href'));
    if (window.lenis) window.lenis.scrollTo(t, {offset: -100}); else t.scrollIntoView({behavior: 'smooth', block: 'start'});
  }));

  // nearest store (location stays in the browser)
  app.querySelector('#lc-geo').addEventListener('click', () => {
    const st = app.querySelector('#lc-status');
    if (!navigator.geolocation) { st.textContent = 'Location isn’t available on this device.'; return; }
    st.textContent = 'Finding your nearest Peri-Peri Guys…';
    navigator.geolocation.getCurrentPosition(({coords: c}) => {
      const k = Math.cos(c.latitude * Math.PI / 180);
      const km = s => Math.hypot(s.coords[0] - c.latitude, (s.coords[1] - c.longitude) * k) * 111;
      const sorted = [...stores].sort((a, b) => km(a) - km(b)), near = sorted[0], mi = km(near) * .621;
      st.textContent = `${near.name} is closest — about ${mi < 10 ? mi.toFixed(1) : Math.round(mi)} miles away.`;
      const list = app.querySelector('#lc-list');
      sorted.forEach(s => list.append(list.querySelector(`[data-slug="${s.slug}"]`)));
      list.querySelectorAll('.lc-card').forEach(c2 => c2.classList.toggle('nearest', c2.dataset.slug === near.slug));
    }, () => { st.textContent = 'We couldn’t get your location. Pick a restaurant below.'; }, {timeout: 8000});
  });
})();
