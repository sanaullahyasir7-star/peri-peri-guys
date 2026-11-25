// Peri-Peri Guys — classic theme motion layer (loaded after peri-premium.js).
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const body = document.body;

  // ---- Card details: "What's hot" line on the items the site already promotes as hot ----
  const hot = ['2 Whole Chickens BOGO', 'The King Chicken Sandwich', '20 Peri-Wings'];
  for (const card of document.querySelectorAll('.dish')) {
    const title = card.querySelector('h3')?.textContent.trim();
    const price = card.querySelector('.dish-price');
    if (!price) continue;
    const row = document.createElement('div'); row.className = 'price-row';
    price.replaceWith(row); row.append(price);
    if (hot.includes(title)) {
      const b = document.createElement('span'); b.className = 'hot-badge';
      b.innerHTML = '<i aria-hidden="true"></i>What’s hot'; row.after(b);
    }
  }

  // ---- Campaign sections: copy + LEARN MORE under the headline, labels on card photos, card deck ----
  const copy = {
    flavor: 'Trade the ordinary for <strong>flame-grilled Zabiha Halal chicken</strong>, marinated for over 24 hours and basted in peri-peri made with African bird’s eye chili. Pick your sauce, bring your crew.',
    hot: 'The specials and fan favourites everyone’s ordering right now at Hicksville and Selden.'
  };
  document.querySelectorAll('.campaign-band').forEach(band => {
    const camp = band.querySelector('.campaign'), title = camp?.querySelector('.campaign-title'), grid = camp?.querySelector('.campaign-grid');
    if (!camp || !title || !grid) return;
    const isHot = band.classList.contains('hot');
    const p = document.createElement('p'); p.className = 'camp-copy'; p.innerHTML = isHot ? copy.hot : copy.flavor;
    title.after(p);
    if (!isHot) { const a = document.createElement('a'); a.className = 'pill dark heart learn'; a.href = '?page=story'; a.textContent = 'Learn more'; p.after(a); }
    for (const card of grid.children) {
      const h = card.querySelector('h3'), img = card.querySelector('img, .img-ph');
      if (h && img) { const l = document.createElement('span'); l.className = 'card-label'; l.setAttribute('aria-hidden', 'true'); l.textContent = h.textContent; img.after(l); }
    }
    // deck: one card in front, the rest stacked behind; auto-shuffles, click a back card or a dot to bring it forward
    grid.classList.add('deck'); grid.removeAttribute('data-fan');
    const cards = [...grid.children]; let order = cards.map((_, i) => i);
    const nav = document.createElement('div'); nav.className = 'deck-nav';
    nav.innerHTML = cards.map((c, i) => `<button type="button" aria-label="Show card ${i + 1} of ${cards.length}"></button>`).join('');
    grid.after(nav);
    const paint = () => {
      order.forEach((ci, pos) => cards[ci].dataset.pos = pos);
      [...nav.children].forEach((b, i) => b.setAttribute('aria-current', String(i === order[0])));
      cards.forEach((c, i) => { const back = i !== order[0] && matchMedia('(min-width: 601px)').matches; c.toggleAttribute('aria-hidden', back); c.querySelectorAll('a, button').forEach(el => back ? el.setAttribute('tabindex', '-1') : el.removeAttribute('tabindex')); });
    };
    let busy = false;
    const bringToFront = target => {
      if (busy || order[0] === target) return; busy = true;
      const front = cards[order[0]];
      const finish = () => { front.classList.remove('fly'); order = [target, ...order.filter(i => i !== target)]; paint(); setTimeout(() => busy = false, 300); };
      if (reduce) { finish(); return; }
      front.classList.add('fly'); setTimeout(finish, 600);
    };
    const next = () => bringToFront(order[1]);
    cards.forEach((c, i) => c.addEventListener('click', e => { if (order[0] !== i && matchMedia('(min-width: 601px)').matches) { e.preventDefault(); bringToFront(i); } }));
    [...nav.children].forEach((b, i) => b.addEventListener('click', () => bringToFront(i)));
    paint();
    let timer, inView = false, hover = false;
    const tick = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (inView && !hover && !document.hidden && matchMedia('(min-width: 601px)').matches) next(); }, 4200); };
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(grid);
    grid.addEventListener('pointerenter', () => hover = true); grid.addEventListener('pointerleave', () => hover = false);
    grid.addEventListener('focusin', () => hover = true); grid.addEventListener('focusout', () => hover = false);
    tick();
  });

  // ---- Full-bleed photo covers get a centred ORDER NOW, like Nando's video covers ----
  document.querySelectorAll('.venue-cover').forEach(fig => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cover-cta'; b.dataset.open = 'order'; b.textContent = 'Order now';
    fig.append(b);
  });
  if (typeof photos !== 'undefined') document.querySelector('.story-feature')?.style.setProperty('--story-img', `url("${photos.story}")`);

  if (reduce) return;

  // ---- Stamp-slam headlines ----
  const stamps = [...document.querySelectorAll('.stamped > span, .featured h2, .categories h2, .hx-line')];
  stamps.forEach(s => s.classList.add('stamp'));
  const stampIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; stampIO.unobserve(e.target);
    const sibs = [...e.target.parentElement.children].filter(c => c.classList.contains('stamp'));
    setTimeout(() => e.target.classList.add('slam'), Math.max(0, sibs.indexOf(e.target)) * 170 + (e.target.closest('.hx') ? 450 : 0));
  }), {threshold:.5});
  stamps.forEach(s => stampIO.observe(s));

  // ---- Cards deal in like a hand of cards ----
  for (const grid of document.querySelectorAll('.feature-grid, .category-grid, .occasion-grid, .reward-steps')) {
    const kids = [...grid.children];
    kids.forEach((c, k) => { c.classList.remove('rv'); c.classList.add('deal'); c.style.setProperty('--k', k % 5); c.style.setProperty('--r', `${(k % 2 ? 1 : -1) * (3 + (k % 3))}deg`); });
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target); e.target.classList.add('dealt');
    }), {threshold:.15, rootMargin:'0px 0px -6% 0px'});
    kids.forEach(c => io.observe(c));
  }

  // ---- Orange bands sweep in + falling chilis ----
  for (const band of document.querySelectorAll('.featured, .categories')) {
    band.classList.add('band');
    const rain = document.createElement('div'); rain.className = 'chili-rain'; rain.setAttribute('aria-hidden', 'true');
    const n = innerWidth < 600 ? 7 : 14;
    for (let i = 0; i < n; i++) {
      const c = document.createElement('i');
      c.style.setProperty('--x', `${Math.random() * 100}%`);
      c.style.setProperty('--s', (0.6 + Math.random() * 0.9).toFixed(2));
      c.style.setProperty('--d', `${(9 + Math.random() * 10).toFixed(1)}s`);
      c.style.setProperty('--delay', `${(-Math.random() * 18).toFixed(1)}s`);
      c.style.setProperty('--spin', `${Math.random() > .5 ? 1 : -1}`);
      rain.append(c);
    }
    band.prepend(rain);
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { band.classList.add('band-in'); o.disconnect(); } }, {threshold:.08}).observe(band);
  }

  // ---- Velocity marquee: speeds up / reverses with your scroll ----
  const featured = document.querySelector('.categories');
  if (featured) {
    const strip = document.createElement('div'); strip.className = 'velo'; strip.setAttribute('aria-hidden', 'true');
    const run = '<span>Order now</span><b>🌶</b><span>Flame-grilled</span><b>🔥</b><span>Zabiha Halal</span><b>🌶</b><span>Marinated 24+ hrs</span><b>🔥</b>';
    strip.innerHTML = `<div class="velo-track">${run.repeat(6)}</div>`;
    featured.after(strip);
    const track = strip.firstElementChild;
    let x = 0, last = scrollY, vel = 0, dir = 1, half = 0, visible = false;
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); addEventListener('resize', measure);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(strip);
    const loop = () => {
      const dy = scrollY - last; last = scrollY;
      if (dy) dir = dy > 0 ? 1 : -1;
      vel += (Math.min(40, Math.abs(dy)) - vel) * .08;
      if (visible && half) {
        x -= dir * (0.8 + vel * .9);
        if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${(-dir * Math.min(12, vel * .5)).toFixed(2)}deg)`;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---- Ember trail behind the flame cursor (desktop) ----
  if (fine) {
    const cv = document.createElement('canvas'); cv.className = 'ember-trail'; cv.setAttribute('aria-hidden', 'true');
    body.append(cv);
    const ctx = cv.getContext('2d'); let w, h, dpr; const parts = [];
    const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr; };
    size(); addEventListener('resize', size);
    let px = 0, py = 0, running = false;
    addEventListener('pointermove', e => {
      const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      const n = Math.min(4, 1 + Math.hypot(dx, dy) / 14);
      for (let i = 0; i < n; i++) parts.push({x: (px + 6) * dpr, y: (py + 6) * dpr, vx: (Math.random() - .5) * .8 * dpr, vy: (-Math.random() * 1.4 - .4) * dpr, life: 1, r: (Math.random() * 2.4 + 1.2) * dpr, hue: 15 + Math.random() * 30});
      if (parts.length > 160) parts.splice(0, parts.length - 160);
      if (!running) { running = true; requestAnimationFrame(tick); }
    }, {passive:true});
    function tick() {
      ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter';
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy -= .02 * dpr; p.life -= .028;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, `hsla(${p.hue},100%,62%,${p.life})`); g.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, 7); ctx.fill();
      }
      if (parts.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, w, h); }
    }
  }
})();
