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
    if (canvas && !reduce) {
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
    mega.querySelector('.to-top').addEventListener('click', () => scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}));
  }
  for (const a of document.querySelectorAll('.campaign-card .pill, .feature-actions .pill, .section-action .pill, .split-copy > .pill')) a.classList.add('arrow');

  // Scroll reveals with stagger.
  const groups = ['.campaign-grid', '.feature-grid', '.category-grid', '.stats', '.listing', '.locations', '.heat'];
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

  if (!fine || reduce) return;

  // Custom cursor: ember dot + ring that grows into a label over cards and buttons.
  {
    const ring = document.createElement('div'), dot = document.createElement('div');
    ring.className = 'cursor hide'; dot.className = 'cursor-dot hide';
    ring.setAttribute('aria-hidden', 'true'); dot.setAttribute('aria-hidden', 'true');
    body.append(ring, dot); document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)`;
      ring.classList.remove('hide'); dot.classList.remove('hide');
      const t = e.target.closest?.('.dish, .category-card, a, button, summary, input');
      const label = t?.matches('.dish') ? 'Order' : t?.matches('.category-card') ? 'View' : '';
      ring.classList.toggle('hot', !!label); ring.textContent = label;
      ring.style.opacity = t?.matches('input') ? 0 : '';
    });
    document.addEventListener('pointerleave', () => { ring.classList.add('hide'); dot.classList.add('hide'); });
    const loop = () => { rx += (x - rx) * .18; ry += (y - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); };
    loop();
  }

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
