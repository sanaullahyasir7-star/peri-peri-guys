// Peri-Peri Guys — illustrated artwork for the Story page (original SVG, brand palette).
// Performance rules: animations only use transform/opacity on small groups; all of them are
// paused unless their artwork is on screen (see .st-art rules in peri-premium.css).
// Each function takes a unique id so the art can appear twice (sticky panel + inline on phones).
(() => {
  const wave = (y, amp, len, width = 1200, bottom = 750) => {
    let d = `M0 ${y}`;
    for (let x = 0; x < width; x += len) d += ` q ${len / 4} ${-amp} ${len / 2} 0 t ${len / 2} 0`;
    return `${d} L ${width} ${bottom} L 0 ${bottom} Z`;
  };
  // A simple flat soccer player; feet at (0,0). dir 1 = facing right, -1 = facing left.
  const player = (cls, jersey, shorts, skin, label, dir) => `
    <g class="player ${cls}">
      <ellipse cx="0" cy="2" rx="26" ry="5" fill="#000" opacity=".35"/>
      <line x1="${-6 * dir}" y1="-44" x2="${-9 * dir}" y2="-2" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="${-11 * dir}" cy="-2" rx="9" ry="5" fill="#120d0b"/>
      <g class="kick" style="transform-origin:${6 * dir}px -44px">
        <line x1="${6 * dir}" y1="-44" x2="${9 * dir}" y2="-2" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
        <ellipse cx="${13 * dir}" cy="-2" rx="9" ry="5" fill="#120d0b"/>
      </g>
      <rect x="-17" y="-62" width="34" height="20" rx="6" fill="${shorts}"/>
      <rect x="-18" y="-108" width="36" height="52" rx="12" fill="${jersey}"/>
      <line x1="${-16 * dir}" y1="-100" x2="${-30 * dir}" y2="-72" stroke="${skin}" stroke-width="8" stroke-linecap="round"/>
      <line x1="${16 * dir}" y1="-100" x2="${26 * dir}" y2="-70" stroke="${skin}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="0" cy="-124" r="15" fill="${skin}"/>
      <path d="M-15 -128 a15 15 0 0 1 30 0 q-15 -6 -30 0z" fill="#1a110d"/>
      <text x="0" y="-78" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="22" fill="#120d0b" opacity=".75">${label[0]}</text>
      <text x="0" y="30" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="12" letter-spacing="3" fill="#f7f0e6">${label}</text>
    </g>`;

  window.storyArt = {
    // ---------- Opening screen: the chili's journey ----------
    journey: id => `<svg class="st-art st-journey" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-g1" cx="74%" cy="48%" r="55%"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".32"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-g2" cx="12%" cy="100%" r="55%"><stop offset="0" stop-color="#d7261e" stop-opacity=".25"/><stop offset="1" stop-color="#d7261e" stop-opacity="0"/></radialGradient>
        <pattern id="${id}-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.2" fill="#f7f0e6"/></pattern>
        <clipPath id="${id}-land">
          <path d="M820 300 C850 290 900 295 930 310 C960 330 990 330 1010 360 C1030 390 1060 400 1070 430 C1060 470 1040 500 1030 540 C1020 590 1000 640 970 690 C950 720 920 740 900 735 C880 700 870 660 860 620 C850 580 830 550 820 520 C800 500 770 480 760 450 C750 420 770 380 790 350 C800 330 805 310 820 300Z"/>
          <path d="M720 170 C760 150 820 150 870 160 C920 170 960 160 1000 175 C1030 190 1020 220 990 235 C960 250 930 250 900 262 C870 275 840 270 820 260 C790 250 770 262 745 255 C720 248 705 230 705 210 C705 190 710 178 720 170Z"/>
          <path d="M1075 640 c10 -22 22 -34 28 -26 c4 22 -8 52 -20 62 c-10 4 -12 -18 -8 -36z"/>
        </clipPath>
      </defs>
      <rect width="1200" height="800" fill="#0d0907"/>
      <rect width="1200" height="800" fill="url(#${id}-g1)"/><rect width="1200" height="800" fill="url(#${id}-g2)"/>
      <g fill="none" stroke="#f7f0e6" stroke-opacity=".06" stroke-width="1.2">
        <circle cx="900" cy="440" r="430"/><ellipse cx="900" cy="440" rx="300" ry="430"/><ellipse cx="900" cy="440" rx="150" ry="430"/>
        <path d="M470 440h860M500 250q400 -60 800 0M500 630q400 60 800 0"/>
      </g>
      <rect width="1200" height="800" fill="url(#${id}-dots)" clip-path="url(#${id}-land)" opacity=".2"/>
      <g fill="none" stroke-linecap="round" stroke-width="2.5" stroke-dasharray="2 9">
        <path d="M1030 590 C 960 430, 820 250, 712 214" stroke="#ff7a1f" stroke-width="3"/>
        <path d="M1030 590 C 1000 680, 950 722, 900 728" stroke="#ffb547"/>
        <path d="M712 214 C 770 150, 870 140, 940 172" stroke="#ffb547"/>
      </g>
      <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="15" letter-spacing="3" fill="#f7f0e6">
        <circle class="ping" cx="1030" cy="590" r="10" fill="none" stroke="#ff5a1f" stroke-width="2"/>
        <circle cx="1030" cy="590" r="9" fill="#ff5a1f"/>
        <path transform="translate(1046 548) rotate(20)" d="M9 0c-.6 1.2-.4 2.3.3 3.2C13 4.2 13.6 8 12 12.2 10.3 17.2 5.6 21.2.6 22c-1.3.2-2-1-1-1.9 3.5-3 5.5-7.1 5.8-11.6.2-2.3 1.2-4.1 3.2-5-.7-1-.7-2.4.4-3.5z" fill="#d7261e"/>
        <text x="1050" y="630">MOZAMBIQUE</text>
        <circle class="ping p2" cx="712" cy="214" r="8" fill="none" stroke="#ffb547" stroke-width="2"/><circle cx="712" cy="214" r="7" fill="#ffb547"/><text x="600" y="200">PORTUGAL</text>
        <circle class="ping p3" cx="900" cy="728" r="8" fill="none" stroke="#ffb547" stroke-width="2"/><circle cx="900" cy="728" r="7" fill="#ffb547"/><text x="740" y="764">SOUTH AFRICA</text>
        <circle class="ping p4" cx="940" cy="172" r="8" fill="none" stroke="#ffb547" stroke-width="2"/><circle cx="940" cy="172" r="7" fill="#ffb547"/><text x="962" y="166">EUROPE</text>
      </g>
      <text x="1160" y="96" text-anchor="end" font-family="Bebas Neue, Impact, sans-serif" font-size="120" fill="none" stroke="#f7f0e6" stroke-opacity=".1" stroke-width="1.5">15TH CENTURY</text>
    </svg>`,

    // ---------- 02 How it started: Glasgow -> New York by sea, then one pick-up soccer game ----------
    route: id => `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c0a"/><stop offset=".55" stop-color="#4a1d10"/><stop offset="1" stop-color="#d9531a"/></linearGradient>
        <radialGradient id="${id}-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe2a8"/><stop offset=".5" stop-color="#ffb547"/><stop offset="1" stop-color="#ff5a1f"/></radialGradient>
        <radialGradient id="${id}-halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffb547" stop-opacity=".45"/><stop offset="1" stop-color="#ffb547" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3412"/><stop offset="1" stop-color="#2a120b"/></linearGradient>
        <linearGradient id="${id}-turf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d3a24"/><stop offset="1" stop-color="#0e1d13"/></linearGradient>
        <clipPath id="${id}-top"><rect width="600" height="470"/></clipPath>
        <clipPath id="${id}-pitch"><rect y="470" width="600" height="280"/></clipPath>
      </defs>
      <g clip-path="url(#${id}-top)">
        <rect width="600" height="300" fill="url(#${id}-sky)"/>
        <g fill="#f7f0e6"><circle cx="60" cy="40" r="1.4" opacity=".6"/><circle cx="150" cy="70" r="1" opacity=".5"/><circle cx="230" cy="30" r="1.2" opacity=".7"/><circle cx="380" cy="50" r="1" opacity=".5"/><circle cx="470" cy="26" r="1.4" opacity=".6"/><circle cx="560" cy="80" r="1" opacity=".5"/><circle cx="320" cy="20" r="1" opacity=".6"/></g>
        <circle cx="300" cy="300" r="130" fill="url(#${id}-halo)"/>
        <circle cx="300" cy="300" r="62" fill="url(#${id}-sun)"/>
        <path d="M505 196 Q 300 60 95 190" fill="none" stroke="#ffe2a8" stroke-opacity=".8" stroke-width="2" stroke-dasharray="2 8" stroke-linecap="round"/>
        <path d="M110 186 l-14 4 6 -13" fill="none" stroke="#ffe2a8" stroke-opacity=".8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="300" y="104" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="11.5" letter-spacing="2.6" fill="#ffe2a8">INGREDIENTS SHIPPED FROM THE UK</text>
        <!-- New York (left) -->
        <g fill="#0d0907">
          <rect x="0" y="230" width="26" height="70"/><rect x="24" y="250" width="22" height="50"/><rect x="44" y="196" width="30" height="104"/>
          <path d="M80 300 V150 h8 V128 h4 V100 h3 V128 h4 V150 h8 V300z"/>
          <rect x="108" y="214" width="26" height="86"/><rect x="132" y="244" width="22" height="56"/><rect x="152" y="262" width="18" height="38"/>
        </g>
        <g fill="#ffb547" opacity=".55"><rect x="50" y="210" width="3" height="4"/><rect x="60" y="226" width="3" height="4"/><rect x="50" y="246" width="3" height="4"/><rect x="86" y="170" width="3" height="4"/><rect x="92" y="196" width="3" height="4"/><rect x="86" y="230" width="3" height="4"/><rect x="114" y="228" width="3" height="4"/><rect x="122" y="252" width="3" height="4"/><rect x="8" y="246" width="3" height="4"/></g>
        <!-- Glasgow (right): tenements, spire, shipyard crane -->
        <g fill="#0d0907">
          <path d="M430 300 V262 l12 -10 12 10 V300z"/><path d="M452 300 V250 l13 -12 13 12 V300z"/>
          <path d="M478 300 V214 h10 V190 l6 -34 6 34 V214 h10 V300z"/>
          <path d="M518 300 V258 l12 -10 12 10 V300z"/>
          <rect x="548" y="196" width="10" height="104"/><rect x="520" y="186" width="80" height="12"/><rect x="590" y="198" width="3" height="40"/><rect x="583" y="236" width="16" height="8"/>
        </g>
        <g fill="#ffb547" opacity=".55"><rect x="438" y="272" width="3" height="4"/><rect x="460" y="262" width="3" height="4"/><rect x="468" y="280" width="3" height="4"/><rect x="526" y="270" width="3" height="4"/></g>
        <g font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="12" letter-spacing="3" fill="#f7f0e6">
          <circle class="ping" cx="95" cy="190" r="7" fill="none" stroke="#ffb547" stroke-width="2"/><circle cx="95" cy="190" r="6" fill="#ffb547"/><text x="95" y="176" text-anchor="middle">NEW YORK</text>
          <circle class="ping p2" cx="505" cy="196" r="7" fill="none" stroke="#ffb547" stroke-width="2"/><circle cx="505" cy="196" r="6" fill="#ffb547"/><text x="505" y="160" text-anchor="middle">GLASGOW</text>
        </g>
        <!-- sea -->
        <rect y="300" width="600" height="170" fill="url(#${id}-sea)"/>
        <g fill="#ffe2a8" opacity=".5"><rect class="glint" x="262" y="318" width="76" height="3" rx="1.5"/><rect class="glint g2" x="276" y="334" width="48" height="3" rx="1.5"/><rect class="glint g3" x="286" y="350" width="28" height="3" rx="1.5"/></g>
        <g class="waves w1"><path d="${wave(322, 6, 60)}" fill="#a23d14" opacity=".55"/></g>
        <!-- cargo ship sailing Glasgow -> New York (right to left) -->
        <g class="ship-sail">
          <g class="ship-bob">
            <circle class="smoke s1" cx="122" cy="-62" r="9" fill="#f7f0e6" opacity=".25"/>
            <circle class="smoke s2" cx="122" cy="-62" r="12" fill="#f7f0e6" opacity=".2"/>
            <rect x="112" y="-52" width="20" height="24" rx="2" fill="#f26925"/><rect x="112" y="-52" width="20" height="6" fill="#120d0b"/>
            <rect x="96" y="-30" width="48" height="24" rx="3" fill="#f7f0e6"/>
            <g fill="#120d0b"><rect x="102" y="-24" width="7" height="6" rx="1"/><rect x="113" y="-24" width="7" height="6" rx="1"/><rect x="124" y="-24" width="7" height="6" rx="1"/><rect x="135" y="-24" width="5" height="6" rx="1"/></g>
            <rect x="20" y="-22" width="22" height="16" fill="#d7261e"/><rect x="42" y="-22" width="22" height="16" fill="#ffb547"/><rect x="64" y="-22" width="28" height="16" fill="#f26925"/>
            <rect x="28" y="-38" width="22" height="16" fill="#f26925"/><rect x="50" y="-38" width="30" height="16" fill="#f7f0e6"/>
            <text x="65" y="-26.5" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="9" fill="#120d0b">PERI-PERI</text>
            <path d="M0 -6 H170 L156 22 H18 Z" fill="#120d0b"/>
            <path d="M6 6 H164 L160 12 H10 Z" fill="#d7261e"/>
          </g>
        </g>
        <g class="waves w2"><path d="${wave(372, 8, 90)}" fill="#7c2d12" opacity=".85"/></g>
        <g class="waves w3"><path d="${wave(420, 10, 120)}" fill="#431407"/></g>
      </g>
      <!-- the pick-up soccer game -->
      <g clip-path="url(#${id}-pitch)">
        <rect y="470" width="600" height="280" fill="url(#${id}-turf)"/>
        <g fill="#ffffff" opacity=".035"><rect x="0" y="470" width="75" height="280"/><rect x="150" y="470" width="75" height="280"/><rect x="300" y="470" width="75" height="280"/><rect x="450" y="470" width="75" height="280"/></g>
        <g fill="none" stroke="#f7f0e6" stroke-opacity=".35" stroke-width="2"><line x1="300" y1="470" x2="300" y2="750"/><ellipse cx="300" cy="690" rx="90" ry="26"/><line x1="0" y1="706" x2="600" y2="706" stroke-opacity=".18"/></g>
        <text x="300" y="512" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="12" letter-spacing="3" fill="#f7f0e6" opacity=".75">ONE PICK-UP SOCCER GAME</text>
        <text x="575" y="566" text-anchor="end" font-family="Bebas Neue, Impact, sans-serif" font-size="64" fill="none" stroke="#f7f0e6" stroke-opacity=".28" stroke-width="1.5">2020</text>
        <ellipse class="ball-shadow" cx="300" cy="690" rx="16" ry="4" fill="#000" opacity=".45"/>
        <g transform="translate(140 690)">${player('p-left', '#f26925', '#120d0b', '#b97a4c', 'HAFEEZ', 1)}</g>
        <g transform="translate(460 690)">${player('p-right', '#f7f0e6', '#d7261e', '#e0b48c', 'GREG', -1)}</g>
        <g class="ball-x"><g class="ball-y"><g class="ball-spin">
          <circle r="13" fill="#f7f0e6" stroke="#120d0b" stroke-width="2"/>
          <path d="M0 -5 L5 -1.5 L3 4.5 L-3 4.5 L-5 -1.5Z" fill="#120d0b"/>
          <path d="M0 -5 V-12 M5 -1.5 L12 -4 M3 4.5 L7 10.5 M-3 4.5 L-7 10.5 M-5 -1.5 L-12 -4" stroke="#120d0b" stroke-width="1.6"/>
        </g></g></g>
      </g>
      <line x1="0" y1="470" x2="600" y2="470" stroke="#120d0b" stroke-width="4"/>
    </svg>`,

    // ---------- 03 The 24-hour commitment ----------
    clock: id => {
      const ticks = Array.from({length: 24}, (_, i) => { const a = i / 24 * Math.PI * 2 - Math.PI / 2, r1 = i % 6 ? 196 : 186, r2 = 206;
        return `<line x1="${(300 + Math.cos(a) * r1).toFixed(1)}" y1="${(330 + Math.sin(a) * r1).toFixed(1)}" x2="${(300 + Math.cos(a) * r2).toFixed(1)}" y2="${(330 + Math.sin(a) * r2).toFixed(1)}"/>`; }).join('');
      return `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-bg" cx="50%" cy="44%" r="72%"><stop offset="0" stop-color="#43200f"/><stop offset=".55" stop-color="#170f0c"/><stop offset="1" stop-color="#0d0907"/></radialGradient>
        <linearGradient id="${id}-fire" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb547"/><stop offset=".5" stop-color="#ff5a1f"/><stop offset="1" stop-color="#d7261e"/></linearGradient>
        <radialGradient id="${id}-skin" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#f6a04d"/><stop offset=".55" stop-color="#c8561c"/><stop offset="1" stop-color="#7a2a0e"/></radialGradient>
        <clipPath id="${id}-body"><path d="M215 352 C215 296 258 268 300 268 C342 268 385 296 385 352 C385 378 350 392 300 392 C250 392 215 378 215 352Z"/></clipPath>
      </defs>
      <rect width="600" height="750" fill="url(#${id}-bg)"/>
      <circle cx="300" cy="330" r="200" fill="none" stroke="#f7f0e6" stroke-opacity=".08" stroke-width="16"/>
      <circle class="fill-ring" cx="300" cy="330" r="200" fill="none" stroke="url(#${id}-fire)" stroke-width="16" stroke-linecap="round" pathLength="1" transform="rotate(-90 300 330)"/>
      <g stroke="#f7f0e6" stroke-opacity=".4" stroke-width="2.5" stroke-linecap="round">${ticks}</g>
      <g class="orbit" style="transform-origin:300px 330px"><circle cx="300" cy="130" r="9" fill="#ffe2a8"/><circle cx="300" cy="130" r="18" fill="#ffb547" opacity=".25"/></g>
      <g font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="13" fill="#bfae9f" text-anchor="middle"><text x="300" y="104">0</text><text x="520" y="335">6</text><text x="300" y="570">12</text><text x="80" y="335">18</text></g>
      <!-- plate + glazed chicken -->
      <ellipse cx="300" cy="392" rx="150" ry="40" fill="#2a1d17"/><ellipse cx="300" cy="388" rx="134" ry="32" fill="#3b2a21"/>
      <g fill="#d7261e"><path transform="translate(186 372) rotate(-30)" d="M9 0c-.6 1.2-.4 2.3.3 3.2C13 4.2 13.6 8 12 12.2 10.3 17.2 5.6 21.2.6 22c-1.3.2-2-1-1-1.9 3.5-3 5.5-7.1 5.8-11.6.2-2.3 1.2-4.1 3.2-5-.7-1-.7-2.4.4-3.5z"/><path transform="translate(398 360) rotate(40)" d="M9 0c-.6 1.2-.4 2.3.3 3.2C13 4.2 13.6 8 12 12.2 10.3 17.2 5.6 21.2.6 22c-1.3.2-2-1-1-1.9 3.5-3 5.5-7.1 5.8-11.6.2-2.3 1.2-4.1 3.2-5-.7-1-.7-2.4.4-3.5z"/></g>
      <g fill="#3f7d3a"><ellipse cx="226" cy="398" rx="9" ry="4" transform="rotate(-20 226 398)"/><ellipse cx="380" cy="400" rx="9" ry="4" transform="rotate(25 380 400)"/><ellipse cx="368" cy="404" rx="7" ry="3" transform="rotate(-15 368 404)"/></g>
      <g><ellipse cx="226" cy="370" rx="34" ry="20" transform="rotate(-28 226 370)" fill="url(#${id}-skin)"/><circle cx="199" cy="386" r="7" fill="#f2e6d6"/><circle cx="194" cy="380" r="6" fill="#f2e6d6"/></g>
      <g><ellipse cx="374" cy="370" rx="34" ry="20" transform="rotate(28 374 370)" fill="url(#${id}-skin)"/><circle cx="401" cy="386" r="7" fill="#f2e6d6"/><circle cx="406" cy="380" r="6" fill="#f2e6d6"/></g>
      <path d="M215 352 C215 296 258 268 300 268 C342 268 385 296 385 352 C385 378 350 392 300 392 C250 392 215 378 215 352Z" fill="url(#${id}-skin)"/>
      <g clip-path="url(#${id}-body)" stroke="#5a1d08" stroke-width="6" stroke-linecap="round" opacity=".55"><line x1="236" y1="300" x2="290" y2="380"/><line x1="270" y1="280" x2="330" y2="380"/><line x1="306" y1="274" x2="364" y2="372"/><line x1="342" y1="282" x2="390" y2="350"/></g>
      <ellipse cx="272" cy="300" rx="34" ry="12" fill="#fff" opacity=".22" transform="rotate(-18 272 300)"/>
      <g fill="none" stroke="#f7f0e6" stroke-opacity=".5" stroke-width="3" stroke-linecap="round">
        <path class="steam" d="M268 254 c-10 -12 10 -20 0 -34 c-8 -12 6 -20 0 -30"/>
        <path class="steam st2" d="M302 248 c-10 -12 10 -20 0 -34 c-8 -12 6 -20 0 -30"/>
        <path class="steam st3" d="M334 254 c-10 -12 10 -20 0 -34 c-8 -12 6 -20 0 -30"/>
      </g>
      <text x="300" y="625" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="60" fill="#f7f0e6">24 HOURS</text>
      <text x="300" y="652" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="11.5" letter-spacing="3" fill="#ffb547">MARINATED BEFORE IT EVER SEES THE FLAME</text>
      <g font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="11.5" letter-spacing="1.8">
        <g class="chip c1"><rect x="34" y="680" width="164" height="40" rx="20" fill="#f7f0e6"/><path d="M58 708 c0 -14 10 -20 22 -20 c0 12 -6 20 -22 20z M58 708 l12 -10" fill="#3f7d3a" stroke="#3f7d3a" stroke-width="1.5"/><text x="128" y="705" text-anchor="middle" fill="#120d0b">ORGANIC</text></g>
        <g class="chip c2"><rect x="214" y="680" width="172" height="40" rx="20" fill="#f7f0e6"/><path d="M236 688 l10 4 v8 c0 6 -4 10 -10 12 c-6 -2 -10 -6 -10 -12 v-8z" fill="#120d0b"/><path d="M231 699 l4 4 7 -8" fill="none" stroke="#f7f0e6" stroke-width="2"/><text x="312" y="705" text-anchor="middle" fill="#120d0b">STEROID-FREE</text></g>
        <g class="chip c3"><rect x="402" y="680" width="164" height="40" rx="20" fill="url(#${id}-fire)"/><circle cx="426" cy="700" r="10" fill="#120d0b"/><path d="M421 700 l4 4 7 -8" fill="none" stroke="#ffb547" stroke-width="2"/><text x="494" y="705" text-anchor="middle" fill="#120d0b">ZABIHA HALAL</text></g>
      </g>
    </svg>`;
    },

    // ---------- 04 Long Island took notice ----------
    awards: id => {
      const leaves = side => Array.from({length: 8}, (_, i) => { const a = (200 + i * 17) * Math.PI / 180, x = Math.cos(a) * 92 * side, y = Math.sin(a) * -92 + 10, rot = side * (200 + i * 17 + 90);
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="5.5" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('');
      const confetti = Array.from({length: 14}, (_, i) => { const x = 30 + (i * 41) % 540, c = ['#ffb547', '#f26925', '#d7261e', '#f7f0e6'][i % 4], d = (i * 0.37) % 4;
        return `<rect class="conf" x="${x}" y="-20" width="${6 + i % 3 * 2}" height="${10 + i % 2 * 4}" rx="1.5" fill="${c}" style="animation-delay:-${d.toFixed(2)}s;animation-duration:${(3.6 + (i % 5) * .45).toFixed(2)}s"/>`; }).join('');
      return `<svg class="st-art" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-bg" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#3a1a10"/><stop offset=".55" stop-color="#170f0c"/><stop offset="1" stop-color="#0d0907"/></radialGradient>
        <linearGradient id="${id}-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a8" stop-opacity=".22"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0c8"/><stop offset=".4" stop-color="#ffbf55"/><stop offset=".75" stop-color="#d88a17"/><stop offset="1" stop-color="#9a5a08"/></linearGradient>
        <linearGradient id="${id}-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a4523"/><stop offset="1" stop-color="#3e2010"/></linearGradient>
        <linearGradient id="${id}-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <clipPath id="${id}-disc"><circle r="84"/></clipPath>
      </defs>
      <rect width="600" height="750" fill="url(#${id}-bg)"/>
      <path d="M150 -10 L60 470 L320 470 Z" fill="url(#${id}-beam)"/><path d="M470 -10 L300 470 L560 470 Z" fill="url(#${id}-beam)"/>
      <g class="confetti">${confetti}</g>
      <!-- Newsday Top 100 medal -->
      <g transform="translate(200 250)"><g class="medal">
        <path d="M-44 60 L-70 176 L-36 154 L-14 190 L8 84 Z" fill="#d7261e"/><path d="M44 60 L70 176 L36 154 L14 190 L-8 84 Z" fill="#f26925"/>
        <g fill="#b8740f">${leaves(1)}${leaves(-1)}</g>
        <circle r="84" fill="url(#${id}-gold)"/><circle r="72" fill="none" stroke="#7a4a08" stroke-opacity=".4" stroke-width="1.5"/>
        <text y="2" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="50" fill="#3b2304">TOP 100</text>
        <text y="28" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="12" letter-spacing="4" fill="#3b2304">NEWSDAY</text>
        <path d="M-26 -34 h52" stroke="#3b2304" stroke-width="2" stroke-linecap="round" opacity=".5"/>
        <g clip-path="url(#${id}-disc)"><rect class="shine" x="-40" y="-90" width="40" height="180" fill="url(#${id}-shine)" transform="rotate(20)"/></g>
      </g></g>
      <!-- NY State Empire Award plaque -->
      <g transform="translate(430 272) rotate(6)"><g class="plaque">
        <rect x="-94" y="-122" width="188" height="244" rx="10" fill="url(#${id}-wood)"/>
        <rect x="-80" y="-108" width="160" height="216" rx="4" fill="#efe4d6"/><rect x="-72" y="-100" width="144" height="200" rx="2" fill="none" stroke="#b8a99c" stroke-width="1"/>
        <path d="M0 -76 l11 22 24 3 -18 17 5 24 -22 -12 -22 12 5 -24 -18 -17 24 -3z" fill="#f26925"/>
        <text y="22" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="30" fill="#120d0b">EMPIRE AWARD</text>
        <text y="44" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="10.5" letter-spacing="2" fill="#5d5149">NEW YORK STATE</text>
        <line x1="-40" y1="58" x2="40" y2="58" stroke="#b8a99c"/>
        <text y="88" text-anchor="middle" font-family="Bebas Neue, Impact, sans-serif" font-size="34" fill="#d7261e">2022</text>
      </g></g>
      <!-- Long Island -->
      <g transform="translate(0 556)">
        <text x="300" y="6" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="11.5" letter-spacing="4" fill="#8d7f74">LONG ISLAND, NEW YORK</text>
        <path d="M34 92 C 40 70, 70 58, 110 56 C 170 52, 230 50, 300 46 C 370 42, 440 36, 500 26 C 530 20, 556 14, 574 8 C 560 22, 540 30, 520 36 C 548 34, 566 38, 580 44 C 556 50, 530 52, 500 56 C 440 68, 370 80, 300 88 C 220 98, 150 104, 90 104 C 60 104, 40 100, 34 92 Z" fill="#f7f0e612" stroke="#f7f0e6" stroke-opacity=".55" stroke-width="1.8"/>
        <path d="M160 72 Q 240 36 330 66" fill="none" stroke="#ffb547" stroke-width="2.2" stroke-dasharray="2 7" stroke-linecap="round"/>
        <g font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="12" letter-spacing="2.5" fill="#f7f0e6" text-anchor="middle">
          <circle class="ping" cx="160" cy="74" r="8" fill="none" stroke="#ff5a1f" stroke-width="2"/><circle cx="160" cy="74" r="7" fill="#ff5a1f"/><text x="160" y="140">HICKSVILLE</text>
          <circle class="ping p2" cx="330" cy="68" r="8" fill="none" stroke="#ff5a1f" stroke-width="2"/><circle cx="330" cy="68" r="7" fill="#ff5a1f"/><text x="330" y="140">SELDEN</text>
        </g>
      </g>
    </svg>`;
    }
  };
})();
