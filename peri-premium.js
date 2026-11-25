// Peri-Peri Guys — premium motion layer. Runs after peri-site.js has rendered the page.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const body = document.body;

  // Images: swap a failed photo for a branded ember placeholder (logos just disappear so the wordmark shows).
  for (const img of document.querySelectorAll('img')) {
    const fail = () => {
      if (img.closest('.logo-link, .footer-extras')) { img.remove(); return; }
      const ph = document.createElement('div'); ph.className = 'img-ph'; ph.setAttribute('aria-hidden', 'true');
      if (img.alt) { ph.setAttribute('role', 'img'); ph.setAttribute('aria-label', img.alt); ph.removeAttribute('aria-hidden'); }
      img.replaceWith(ph);
    };
    if (img.complete && img.naturalWidth === 0 && img.src) fail();
    else img.addEventListener('error', fail, {once:true});
  }

  // Brand intro (once per visit, home only).
  if (body.dataset.page === 'home' && !reduce) {
    let seen = false; try { seen = sessionStorage.getItem('ppg-intro') === '1'; sessionStorage.setItem('ppg-intro', '1'); } catch {}
    if (!seen) {
      const intro = document.createElement('div'); intro.className = 'intro'; intro.setAttribute('aria-hidden', 'true');
      const letters = (t, cls = '') => [...t].map((c, k) => `<span class="${cls}" style="--i:${k}">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      intro.innerHTML = `<div class="intro-mark"><div class="intro-word">${letters('PERI-PERI ')}${letters('GUYS', 'accent')}</div><div class="intro-bar"><i></i></div></div>`;
      body.append(intro);
      body.classList.add('intro-on');
      setTimeout(() => intro.classList.add('out'), 1350);
      setTimeout(() => { intro.remove(); body.classList.remove('intro-on'); }, 2400);
    }
  }

  // Hover panels with scrolling type on every dish and category card.
  for (const media of document.querySelectorAll('.dish-media, .category-media')) {
    const card = media.closest('.dish, .category-card');
    const word = card.classList.contains('dish') ? 'Order now' : (card.querySelector(':scope > span')?.textContent || 'View menu');
    const row = `<div class="hov-row">${`<span>${word}</span><span>✦</span>`.repeat(8)}</div>`;
    const hov = document.createElement('div'); hov.className = 'hov'; hov.setAttribute('aria-hidden', 'true');
    hov.innerHTML = `<div class="hov-rows">${row.repeat(7)}</div>`;
    media.insertBefore(hov, media.querySelector('.details, .category-cta'));
  }
  for (const cta of document.querySelectorAll('.category-cta')) cta.textContent = 'View menu';

  // Mobile: bottom action bar + swipe dots for promo carousels.
  {
    const bar = document.createElement('nav'); bar.className = 'mbar'; bar.setAttribute('aria-label', 'Quick actions');
    bar.innerHTML = `<button type="button" class="mbar-main" data-open="order">Order now</button><button type="button" data-open="sauces"><span aria-hidden="true">🌶</span>Sauces</button><a href="?page=locations"><span aria-hidden="true">📍</span>Find us</a>`;
    body.append(bar);
    for (const grid of document.querySelectorAll('.campaign-grid')) {
      const dots = document.createElement('div'); dots.className = 'swipe-dots'; dots.setAttribute('aria-hidden', 'true');
      dots.innerHTML = [...grid.children].map(() => '<i></i>').join('');
      grid.after(dots);
      const sync = () => {
        const mid = grid.scrollLeft + grid.clientWidth / 2;
        let best = 0, dist = Infinity;
        [...grid.children].forEach((c, k) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = k; } });
        [...dots.children].forEach((d, k) => d.classList.toggle('on', k === best));
      };
      grid.addEventListener('scroll', sync, {passive:true}); sync();
      // start on the middle card so the carousel reads as swipeable
      if (matchMedia('(max-width: 600px)').matches && grid.children[1]) requestAnimationFrame(() => { grid.scrollLeft = grid.children[1].offsetLeft - (grid.clientWidth - grid.children[1].offsetWidth) / 2; sync(); });
    }
  }

  // ================= Premium detailing =================
  // Live open/closed status from the real store hours (New York time).
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const toMin = t => { const m = t.trim().match(/(\d+)(?::(\d+))?\s*(am|pm)/i); if (!m) return null; let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; return h * 60 + (+m[2] || 0); };
  const fmt = min => { let h = Math.floor(min / 60), m = min % 60; const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; return `${h}${m ? ':' + String(m).padStart(2, '0') : ''} ${ap}`; };
  const schedule = hours => {
    const week = Array(7).fill(null);
    for (const part of hours.split('·')) {
      const m = part.trim().match(/^(\w{3})(?:\s*[–-]\s*(\w{3}))?\s+(.+?)\s*[–-]\s*(.+)$/);
      if (!m) continue;
      const a = DAYS.indexOf(m[1]), b = m[2] ? DAYS.indexOf(m[2]) : a, open = toMin(m[3]), close = toMin(m[4]);
      if (a < 0 || b < 0 || open == null || close == null) continue;
      for (let d = a; ; d = (d + 1) % 7) { week[d] = [open, close]; if (d === b) break; }
    }
    return week;
  };
  const nyNow = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'}).formatToParts(new Date()).map(x => [x.type, x.value])); return {day: DAYS.indexOf(p.weekday), min: (+p.hour % 24) * 60 + +p.minute}; };
  const status = hours => {
    const w = schedule(hours), {day, min} = nyNow(), today = w[day];
    if (today && min >= today[0] && min < today[1]) return {open: true, text: `Open now · until ${fmt(today[1])}`};
    if (today && min < today[0]) return {open: false, text: `Closed · opens ${fmt(today[0])}`};
    for (let i = 1; i <= 7; i++) { const d = (day + i) % 7; if (w[d]) return {open: false, text: `Closed · opens ${i === 1 ? 'tomorrow' : DAYS[d]} ${fmt(w[d][0])}`}; }
    return null;
  };
  const chip = st => `<span class="open-chip${st.open ? ' is-open' : ''}"><i aria-hidden="true"></i>${st.text}</span>`;
  const decorateStores = root => {
    if (typeof stores === 'undefined') return;
    for (const card of root.querySelectorAll('.location-card')) {
      if (card.querySelector('.open-chip')) continue;
      const name = card.querySelector('h3')?.textContent.trim(), store = stores.find(s => s.name === name), st = store && status(store.hours);
      if (st) card.querySelector('h3').insertAdjacentHTML('afterend', chip(st));
    }
  };
  decorateStores(document);
  const dlg = document.querySelector('#dialog-content');
  if (dlg) new MutationObserver(() => decorateStores(dlg)).observe(dlg, {childList: true, subtree: true});
  setTimeout(() => { // the footer wordmark block is built further down this script
    const meta = document.querySelector('.mega-meta');
    if (!meta || typeof stores === 'undefined' || document.querySelector('.mega-live')) return;
    const live = document.createElement('div'); live.className = 'mega-live';
    live.innerHTML = stores.map(s => { const st = status(s.hours); return st ? `<span><b>${s.name}</b>${chip(st)}</span>` : ''; }).join('');
    meta.before(live);
  });

  // Photos: shimmer while loading, soft fade-in when ready.
  for (const img of document.querySelectorAll('.dish-media img, .category-media img, .campaign-card img, .split img, .venue-cover img, .location-feature-grid img')) {
    const box = img.parentElement; if (!box) continue;
    if (img.complete && img.naturalWidth) { img.classList.add('loaded'); continue; }
    box.classList.add('shimmer');
    img.addEventListener('load', () => { img.classList.add('loaded'); box.classList.remove('shimmer'); }, {once: true});
    img.addEventListener('error', () => box.classList.remove('shimmer'), {once: true});
  }

  // Editorial chapter numbers on home section titles.
  if (body.dataset.page === 'home') {
    let n = 0;
    for (const h of document.querySelectorAll('main .heat-copy .kicker, main .campaign-title, main .featured > h2, main .categories > h2, main .split-copy .section-tag, main .feature-copy .section-tag, main .location-feature > h2')) {
      n++; h.setAttribute('data-chapter', String(n).padStart(2, '0'));
    }
  }

  // Smart header: slides away while scrolling down, returns on any scroll up.
  {
    let lastY = scrollY, acc = 0;
    addEventListener('scroll', () => {
      const y = scrollY, d = y - lastY; lastY = y;
      if (document.querySelector('dialog[open]')) return;
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
      if (y < 140 || acc < -12) body.classList.remove('header-away');
      else if (acc > 40) body.classList.add('header-away');
    }, {passive: true});
  }

  // Buttery smooth scrolling on mouse / trackpad devices (Lenis, vendored). Touch keeps native scrolling.
  if (fine && !reduce && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 1});
    window.lenis = lenis;
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // pause while a dialog is open so it can scroll on its own
    const dialogEl = document.querySelector('#dialog');
    if (dialogEl) new MutationObserver(() => dialogEl.open ? lenis.stop() : lenis.start()).observe(dialogEl, {attributes: true, attributeFilter: ['open']});
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const t = document.querySelector(a.getAttribute('href')); if (!t) return;
      e.preventDefault(); lenis.scrollTo(t, {offset: -70});
    });
  }

  // Hero plate turns with scroll instead of spinning all the time (no idle cost).
  {
    const plate = document.querySelector('.hx-plate img');
    if (plate && !reduce) {
      let raf = 0;
      addEventListener('scroll', () => { if (raf || scrollY > innerHeight * 1.3) return; raf = requestAnimationFrame(() => { raf = 0; plate.style.setProperty('--plate-rot', `${(scrollY * .12).toFixed(1)}deg`); }); }, {passive: true});
    }
  }

  // Story page: sticky photo panel crossfades to the chapter being read.
  {
    const frames = [...document.querySelectorAll('.st-frame')], chs = [...document.querySelectorAll('.st-ch')];
    if (frames.length && chs.length) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const i = e.target.dataset.i;
        frames.forEach(f => f.classList.toggle('is-active', f.dataset.i === i));
        chs.forEach(c => c.classList.toggle('is-current', c === e.target));
      }), {rootMargin: '-45% 0px -45% 0px'});
      chs.forEach(c => io.observe(c));
    }
  }

  // Header state + scroll progress.
  const progress = document.querySelector('.progress');
  const onScroll = () => {
    body.classList.toggle('scrolled', scrollY > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Hero: split headline into words and play the entrance.
  const hero = document.querySelector('.hx');
  if (hero) {
    let i = 0;
    for (const line of hero.querySelectorAll('.hx-line')) {
      for (const node of [...line.childNodes]) {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++); w.textContent = part; frag.append(w);
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1) {
          const w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++);
          node.replaceWith(w); w.append(node);
        }
      }
    }
    const go = () => requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('ready')));
    if (document.querySelector('.intro')) setTimeout(go, 1500); else go();

    // Pointer parallax on the plate, chips and minis.
    if (fine && !reduce) {
      const layers = [...hero.querySelectorAll('[data-depth]')];
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        for (const l of layers) { const d = +l.dataset.depth; l.style.translate = `${(-x * d).toFixed(1)}px ${(-y * d).toFixed(1)}px`; }
      });
      hero.addEventListener('pointerleave', () => layers.forEach(l => l.style.translate = ''));
    }

    // Rising embers.
    const canvas = hero.querySelector('.hx-embers');
    canvas?.remove();
    if (false) {
      const ctx = canvas.getContext('2d');
      let w, h, dpr, parts = [], visible = true, raf;
      const size = () => {
        dpr = Math.min(devicePixelRatio || 1, 2);
        w = canvas.width = hero.clientWidth * dpr; h = canvas.height = hero.clientHeight * dpr;
        const n = Math.round(Math.min(90, hero.clientWidth / 16));
        parts = Array.from({length:n}, () => spawn(true));
      };
      const spawn = (anywhere) => ({
        x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10,
        r: (Math.random() * 1.8 + .6) * dpr, vy: (Math.random() * .6 + .25) * dpr,
        vx: (Math.random() - .5) * .25 * dpr, life: Math.random() * Math.PI * 2,
        hue: 18 + Math.random() * 26
      });
      const tick = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of parts) {
          p.y -= p.vy; p.life += .03; p.x += p.vx + Math.sin(p.life) * .3 * dpr;
          if (p.y < -10) Object.assign(p, spawn(false));
          const a = Math.max(0, Math.min(1, p.y / h)) * (.55 + Math.sin(p.life * 2) * .25);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, `hsla(${p.hue},100%,65%,${a})`); g.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 7); ctx.fill();
        }
        raf = visible ? requestAnimationFrame(tick) : null;
      };
      size(); addEventListener('resize', size);
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) tick(); }).observe(hero);
    }
  }

  // Interactive heat scale.
  const range = document.querySelector('#heat-range');
  if (range && typeof sauceList !== 'undefined') {
    const card = range.closest('.heat-card'), name = card.querySelector('#heat-name'), desc = card.querySelector('#heat-desc');
    const chilis = [...card.querySelectorAll('.heat-chilis span')];
    const update = () => {
      const v = +range.value, [n, d] = sauceList[v];
      card.style.setProperty('--heat', v);
      chilis.forEach((c, k) => c.classList.toggle('on', k <= v));
      if (name.textContent !== n) { name.textContent = n; name.classList.remove('swap'); void name.offsetWidth; name.classList.add('swap'); }
      desc.textContent = d; range.setAttribute('aria-valuetext', n);
    };
    range.addEventListener('input', update); update();
  }

  // Headings rise word by word.
  for (const h of document.querySelectorAll('main h2:not(#heat-title):not(.campaign-title), .inner-hero h1')) {
    let i = 0;
    const walk = node => {
      for (const n of [...node.childNodes]) {
        if (n.nodeType === 3) {
          const f = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { f.append(part); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; w.style.setProperty('--i', i++);
            w.append(inner); f.append(w);
          });
          n.replaceWith(f);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      }
    };
    walk(h); h.classList.add('split-h'); h.classList.remove('rv');
  }
  // Large photos reveal from a rounded inset.
  for (const el of document.querySelectorAll('.venue-cover, .split > img, .split > .img-ph, .location-feature-grid > img')) el.classList.add('pr');

  // Footer wordmark + back to top.
  const end = document.querySelector('.footer-end');
  if (end) {
    const mega = document.createElement('div'); mega.className = 'mega';
    mega.innerHTML = `<span class="mega-word" aria-hidden="true">Peri-Peri Guys</span><div class="mega-meta"><span>Hicksville · Selden · New York</span><span>Flame-grilled · Zabiha Halal</span><button type="button" class="to-top">Back to top ↑</button></div>`;
    end.before(mega);
    mega.querySelector('.to-top').addEventListener('click', () => (window.lenis ? window.lenis.scrollTo(0) : scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'})));
  }
  for (const a of document.querySelectorAll('.campaign-card .pill, .feature-actions .pill, .section-action .pill, .split-copy > .pill')) a.classList.add('arrow');

  // Scroll reveals with stagger.
  const groups = ['.campaign-grid', '.feature-grid', '.category-grid', '.stats', '.listing', '.locations', '.heat', '.st-people', '.st-badges'];
  const targets = [];
  for (const sel of groups) for (const g of document.querySelectorAll(sel)) [...g.children].forEach((c, k) => { c.classList.add('rv'); c.style.setProperty('--d', `${k * 80}ms`); targets.push(c); });
  for (const el of document.querySelectorAll('.feature-copy > *, .split, .location-feature-grid, .section > h2, .ticker, .split-h, .pr, .mega')) { if (!targets.includes(el)) { if (!el.matches('.split-h, .pr, .mega')) el.classList.add('rv'); targets.push(el); } }
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin:'0px 0px -10% 0px'});
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add('in'));

  // Count-up stats.
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 1400), ease = 1 - Math.pow(1 - k, 4); el.textContent = Math.round(end * ease) + suf; if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), {threshold:.6});
    counters.forEach(c => { c.textContent = '0' + (c.dataset.suffix || ''); io.observe(c); });
  }

  // ---------- Touch devices: bring the hover/cursor effects to phones ----------
  if (!fine && !reduce) {
    const cards = [...document.querySelectorAll('.dish, .category-card')];
    // 1+2) Tap to reveal: the scrolling-type panel + flame badge play only when someone taps a card photo.
    //      First tap on the photo shows it; a second tap does the normal action (details / category menu).
    let open = null, closeT;
    const close = () => { open?.classList.remove('pressed'); open = null; clearTimeout(closeT); };
    document.addEventListener('click', e => {
      const media = e.target.closest('.dish-media, .category-media');
      const card = media?.closest('.dish, .category-card');
      if (!card) { if (open && !open.contains(e.target)) close(); return; }
      if (card === open) { close(); return; }
      e.preventDefault(); e.stopPropagation();
      close(); open = card; card.classList.add('pressed');
      closeT = setTimeout(close, 4000);
    }, true);
    // 3) Scroll-linked tilt for cards and hero parallax.
    const tiltEls = [...document.querySelectorAll('.dish, .category-card, .heat-card, .location-card, .split')];
    const heroLayers = [...document.querySelectorAll('.hx [data-depth]')];
    let ticking = false;
    const frame = () => {
      ticking = false; const vh = innerHeight;
      for (const el of tiltEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) continue;
        const p = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / (vh / 2)));
        el.style.transform = `perspective(900px) rotateX(${(p * 7).toFixed(2)}deg) scale(${(1 - Math.abs(p) * .03).toFixed(3)})`;
      }
      if (scrollY < vh * 1.2) for (const l of heroLayers) l.style.translate = `0 ${(-scrollY * +l.dataset.depth / 90).toFixed(1)}px`;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, {passive:true});
    frame();
    // 4) Tap sparks on buttons (the touch version of the flame cursor).
    document.addEventListener('pointerdown', e => {
      return; // fire effects removed for smoothness
      const btn = e.target.closest('.pill, .mbar > *, .choice, .heat-float, .to-top'); if (!btn) return;
      for (let i = 0; i < 10; i++) {
        const s = document.createElement('i'); s.className = 'spark';
        const a = Math.PI * 2 * i / 10 + Math.random() * .5, d = 28 + Math.random() * 26;
        s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
        s.style.setProperty('--dx', `${Math.cos(a) * d}px`); s.style.setProperty('--dy', `${Math.sin(a) * d - 10}px`);
        body.append(s); setTimeout(() => s.remove(), 700);
      }
    }, {passive:true});
  }
  // Haptic tick on the heat slider (Android; iOS ignores it).
  document.querySelector('#heat-range')?.addEventListener('input', () => navigator.vibrate?.(10));

  if (!fine || reduce) return;



  // 3D tilt + glare on cards.
  for (const card of document.querySelectorAll('.dish, .category-card, .campaign-card, .location-card')) {
    card.classList.add('tilt');
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--gx', `${x * 100}%`); card.style.setProperty('--gy', `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${((.5 - y) * 8).toFixed(2)}deg) rotateY(${((x - .5) * 10).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }

  // Magnetic buttons.
  for (const btn of document.querySelectorAll('.pill, .heat-float')) {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.translate = `${((e.clientX - r.left - r.width / 2) * .18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .28).toFixed(1)}px`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.translate = ''; });
  }
})();
