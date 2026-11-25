// Peri-Peri Guys — illustrated artwork for the Story page (original SVG, brand colours).
// Each function takes a unique id so the same art can appear twice (sticky panel + inline on phones).
window.storyArt = {
  // Opening screen: the chili's journey — Mozambique → Portugal → South Africa & Europe.
  journey: id => `<svg class="st-art st-journey" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-g1" cx="78%" cy="40%" r="55%"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".35"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-g2" cx="20%" cy="90%" r="50%"><stop offset="0" stop-color="#d7261e" stop-opacity=".28"/><stop offset="1" stop-color="#d7261e" stop-opacity="0"/></radialGradient>
      <pattern id="${id}-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#f7f0e6" fill-opacity=".07"/></pattern>
    </defs>
    <rect width="1200" height="800" fill="#0d0907"/>
    <rect width="1200" height="800" fill="url(#${id}-dots)"/>
    <rect width="1200" height="800" fill="url(#${id}-g1)"/><rect width="1200" height="800" fill="url(#${id}-g2)"/>
    <g fill="none" stroke="#f7f0e6" stroke-opacity=".08" stroke-width="1.2">
      <ellipse cx="860" cy="420" rx="420" ry="420"/><ellipse cx="860" cy="420" rx="300" ry="420"/><ellipse cx="860" cy="420" rx="160" ry="420"/>
      <path d="M440 420h840M480 230q380 -60 760 0M480 610q380 60 760 0"/>
    </g>
    <g fill="none" stroke-linecap="round">
      <path class="draw" pathLength="1" d="M1010 610 C 940 420, 820 260, 700 210" stroke="#ff7a1f" stroke-width="3" stroke-dasharray=".012 .018"/>
      <path class="draw d2" pathLength="1" d="M1010 610 C 960 680, 900 720, 840 730" stroke="#ffb547" stroke-width="2.5" stroke-dasharray=".012 .018"/>
      <path class="draw d3" pathLength="1" d="M700 210 C 760 160, 860 140, 960 170" stroke="#ffb547" stroke-width="2.5" stroke-dasharray=".012 .018"/>
    </g>
    <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="15" letter-spacing="3" fill="#f7f0e6">
      <g class="pin"><circle cx="1010" cy="610" r="9" fill="#ff5a1f"/><circle class="ping" cx="1010" cy="610" r="9" fill="none" stroke="#ff5a1f" stroke-width="2"/><text x="1032" y="615">MOZAMBIQUE</text></g>
      <g class="pin p2"><circle cx="700" cy="210" r="7" fill="#ffb547"/><text x="560" y="194">PORTUGAL</text></g>
      <g class="pin p3"><circle cx="840" cy="730" r="7" fill="#ffb547"/><text x="660" y="760">SOUTH AFRICA</text></g>
      <g class="pin p4"><circle cx="960" cy="170" r="7" fill="#ffb547"/><text x="980" y="166">EUROPE</text></g>
    </g>
    <text x="1150" y="90" text-anchor="end" font-family="Bebas Neue, Impact, sans-serif" font-size="120" fill="none" stroke="#f7f0e6" stroke-opacity=".12" stroke-width="1.5">15TH CENTURY</text>
  </svg>`,

  // Chapter 02: Glasgow → New York, ingredients shipped from the UK, a pick-up soccer game, 2020.
  route: id => `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-bg" cx="70%" cy="20%" r="85%"><stop offset="0" stop-color="#3a1a10"/><stop offset=".55" stop-color="#1a110d"/><stop offset="1" stop-color="#0d0907"/></radialGradient>
      <pattern id="${id}-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#f7f0e6" stroke-opacity=".05"/></pattern>
    </defs>
    <rect width="600" height="750" fill="url(#${id}-bg)"/><rect width="600" height="750" fill="url(#${id}-grid)"/>
    <path id="${id}-arc" class="draw" pathLength="1" d="M470 190 C 420 40, 140 80, 130 420" fill="none" stroke="#ffb547" stroke-width="3" stroke-linecap="round" stroke-dasharray=".012 .018"/>
    <g class="plane"><path d="M-14 0 L14 0 M4 0 L-6 -12 M4 0 L-6 12 M-12 0 L-16 -6 M-12 0 L-16 6" stroke="#f7f0e6" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#${id}-arc"/></animateMotion></g>
    <g font-family="Inter, system-ui, sans-serif" font-weight="700" letter-spacing="3" font-size="14" fill="#f7f0e6">
      <circle cx="470" cy="190" r="10" fill="#ff5a1f"/><circle class="ping" cx="470" cy="190" r="10" fill="none" stroke="#ff5a1f" stroke-width="2"/>
      <text x="470" y="230" text-anchor="middle">GLASGOW</text>
      <circle cx="130" cy="420" r="10" fill="#ff5a1f"/><circle class="ping" cx="130" cy="420" r="10" fill="none" stroke="#ff5a1f" stroke-width="2"/>
      <text x="130" y="460" text-anchor="middle">NEW YORK</text>
      <text x="300" y="98" text-anchor="middle" font-size="12" fill="#bfae9f" letter-spacing="2.5">INGREDIENTS SHIPPED FROM THE UK</text>
    </g>
    <g class="ball" transform="translate(390 520)">
      <circle r="62" fill="#f7f0e6"/>
      <path d="M0 -22 L21 -7 L13 18 L-13 18 L-21 -7 Z" fill="#120d0b"/>
      <path d="M0 -22 L0 -60 M21 -7 L57 -19 M13 18 L35 50 M-13 18 L-35 50 M-21 -7 L-57 -19" stroke="#120d0b" stroke-width="3"/>
      <path d="M-25 -55 L-12 -62 L0 -60 M25 -55 L12 -62 M50 -34 L57 -19 L60 0 M-50 -34 L-57 -19 L-60 0 M44 40 L35 50 L20 58 M-44 40 L-35 50 L-20 58" stroke="#120d0b" stroke-width="3" fill="none"/>
      <circle r="62" fill="none" stroke="#120d0b" stroke-width="3"/>
    </g>
    <ellipse cx="390" cy="600" rx="56" ry="9" fill="#000" opacity=".45"/>
    <text x="390" y="648" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#bfae9f">ONE PICK-UP SOCCER GAME</text>
    <text x="40" y="700" font-family="Bebas Neue, Impact, sans-serif" font-size="150" fill="none" stroke="#f7f0e6" stroke-opacity=".22" stroke-width="2">2020</text>
  </svg>`,

  // Chapter 03: the 24-hour marinade — organic, steroid-free, Zabiha Halal.
  clock: id => {
    const ticks = Array.from({length: 24}, (_, i) => { const a = i / 24 * Math.PI * 2 - Math.PI / 2, r1 = i % 6 ? 168 : 160, r2 = 178;
      return `<line x1="${300 + Math.cos(a) * r1}" y1="${320 + Math.sin(a) * r1}" x2="${300 + Math.cos(a) * r2}" y2="${320 + Math.sin(a) * r2}"/>`; }).join('');
    return `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-bg" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#3a1a10"/><stop offset=".6" stop-color="#160f0c"/><stop offset="1" stop-color="#0d0907"/></radialGradient>
      <linearGradient id="${id}-fire" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb547"/><stop offset=".5" stop-color="#ff5a1f"/><stop offset="1" stop-color="#d7261e"/></linearGradient>
    </defs>
    <rect width="600" height="750" fill="url(#${id}-bg)"/>
    <circle cx="300" cy="320" r="150" fill="#ff5a1f" opacity=".08"/>
    <circle cx="300" cy="320" r="140" fill="none" stroke="#f7f0e6" stroke-opacity=".1" stroke-width="18"/>
    <circle class="fill-ring" cx="300" cy="320" r="140" fill="none" stroke="url(#${id}-fire)" stroke-width="18" stroke-linecap="round" pathLength="1" transform="rotate(-90 300 320)"/>
    <g stroke="#f7f0e6" stroke-opacity=".45" stroke-width="2.5" stroke-linecap="round">${ticks}</g>
    <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" fill="#bfae9f" text-anchor="middle" letter-spacing="1">
      <text x="300" y="128">0</text><text x="492" y="325">6</text><text x="300" y="522">12</text><text x="108" y="325">18</text>
    </g>
    <text x="300" y="350" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="128" fill="#f7f0e6">24</text>
    <text x="300" y="386" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="15" letter-spacing="6" fill="#ffb547">HOURS</text>
    <path class="flame" d="M300 120c3 13 22 20 22 39a22 22 0 0 1-44 0c0-11 6-18 10-23 0 8 3 12 6 15-1-13 2-23 6-31z" fill="url(#${id}-fire)" transform="translate(0 -34)"/>
    <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" letter-spacing="2.5" text-anchor="middle">
      <g class="chip c1"><rect x="40" y="580" width="160" height="44" rx="22" fill="#f7f0e6"/><text x="120" y="607" fill="#120d0b">ORGANIC</text></g>
      <g class="chip c2"><rect x="215" y="580" width="170" height="44" rx="22" fill="#f7f0e6"/><text x="300" y="607" fill="#120d0b">STEROID-FREE</text></g>
      <g class="chip c3"><rect x="400" y="580" width="160" height="44" rx="22" fill="url(#${id}-fire)"/><text x="480" y="607" fill="#120d0b">ZABIHA HALAL</text></g>
    </g>
    <text x="300" y="680" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="13" letter-spacing="3" fill="#8d7f74">MARINATED BEFORE IT EVER SEES THE FLAME</text>
  </svg>`;
  },

  // Chapter 04: Newsday Top 100, NY State Empire Award 2022, Hicksville → Selden on Long Island.
  awards: id => `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-bg" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#3a1a10"/><stop offset=".55" stop-color="#1a110d"/><stop offset="1" stop-color="#0d0907"/></radialGradient>
      <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe3a3"/><stop offset=".45" stop-color="#ffb547"/><stop offset="1" stop-color="#c77a12"/></linearGradient>
    </defs>
    <rect width="600" height="750" fill="url(#${id}-bg)"/>
    <g class="medal" transform="translate(190 230)">
      <path d="M-40 70 L-62 170 L-30 150 L-10 182 L10 90 Z" fill="#d7261e"/><path d="M40 70 L62 170 L30 150 L10 182 L-10 90 Z" fill="#ff5a1f"/>
      <circle r="104" fill="url(#${id}-gold)"/><circle r="88" fill="none" stroke="#7a4a08" stroke-opacity=".45" stroke-width="2" stroke-dasharray="3 6"/>
      ${Array.from({length: 9}, (_, i) => { const a = (-150 + i * 15) * Math.PI / 180; return `<ellipse cx="${Math.cos(a) * 70}" cy="${Math.sin(a) * 70}" rx="9" ry="4" transform="rotate(${-150 + i * 15 + 90} ${Math.cos(a) * 70} ${Math.sin(a) * 70})" fill="#7a4a08" fill-opacity=".55"/><ellipse cx="${-Math.cos(a) * 70}" cy="${Math.sin(a) * 70}" rx="9" ry="4" transform="rotate(${-(-150 + i * 15 + 90)} ${-Math.cos(a) * 70} ${Math.sin(a) * 70})" fill="#7a4a08" fill-opacity=".55"/>`; }).join('')}
      <text y="-6" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="58" fill="#3b2304">TOP 100</text>
      <text y="26" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="14" letter-spacing="4" fill="#3b2304">NEWSDAY</text>
    </g>
    <g class="plaque" transform="translate(430 250) rotate(6)">
      <rect x="-92" y="-118" width="184" height="236" rx="10" fill="#5b3418"/><rect x="-78" y="-104" width="156" height="208" rx="4" fill="#efe4d6"/>
      <path d="M0 -70 l11 22 24 3 -18 17 5 24 -22 -12 -22 12 5 -24 -18 -17 24 -3z" fill="#ff5a1f"/>
      <text y="24" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="30" fill="#120d0b">EMPIRE AWARD</text>
      <text y="48" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="11" letter-spacing="2" fill="#5d5149">NEW YORK STATE</text>
      <text y="84" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="34" fill="#d7261e">2022</text>
    </g>
    <g transform="translate(0 560)">
      <path class="draw" pathLength="1" d="M40 60 C 70 34, 120 30, 170 34 C 240 40, 300 28, 370 30 C 440 32, 500 18, 560 6 C 540 26, 520 44, 470 56 C 400 72, 330 78, 250 82 C 170 86, 100 84, 40 60 Z" fill="#f7f0e60d" stroke="#f7f0e6" stroke-opacity=".55" stroke-width="2"/>
      <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" letter-spacing="2.5" fill="#f7f0e6">
        <circle cx="150" cy="56" r="8" fill="#ff5a1f"/><circle class="ping" cx="150" cy="56" r="8" fill="none" stroke="#ff5a1f" stroke-width="2"/><text x="150" y="118" text-anchor="middle">HICKSVILLE</text>
        <circle cx="340" cy="54" r="8" fill="#ff5a1f"/><circle class="ping" cx="340" cy="54" r="8" fill="none" stroke="#ff5a1f" stroke-width="2"/><text x="340" y="118" text-anchor="middle">SELDEN</text>
        <path class="draw d2" pathLength="1" d="M158 52 Q 245 20 332 50" fill="none" stroke="#ffb547" stroke-width="2.5" stroke-dasharray=".03 .03"/>
      </g>
      <text x="300" y="-14" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="12" letter-spacing="4" fill="#8d7f74">LONG ISLAND, NEW YORK</text>
    </g>
  </svg>`
};
