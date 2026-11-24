const client = 'https://periperiguys.com';
const appStores = '<div class="app-links"><a href="https://apps.apple.com/app/id6829070851">App Store</a><a href="https://play.google.com/store/apps/details?id=com.owner.periperiguys">Google Play</a></div>';
const image = (id, width = 960) => `${client}/pluto-images/${id}?w=${width}&fit=cover`;
const product = id => `${client}/pluto-images/external-images/${id}.jpg?w=320&h=320&fit=cover`;
const photos = {
  hero: `${client}/pluto-videos/QwrH3WY4soOn/33e2db5136ba3fcceac7/poster.jpg`,
  logo: `${client}/pluto-images/46f118a2-d122-458c-823a-67cee38dd9e6.png?h=80&dpr=2&fit=cover`,
  darkLogo: `${client}/pluto-images/ccdcb6ba-09a7-4cea-86c4-c911c35e3c55.png?h=80&dpr=2&fit=cover`,
  whole: image('d80d3a48-97d4-4731-a21f-314abaa578dd'),
  wings: product('UB0AHzrjjUvY-ZmnliwFZvvkb'),
  sandwich: product('oHYmCWJAX42x-cvTUTIhRAPMa'),
  skewers: product('CZb40aVuM5jC-rvM4YRrdyOyK'),
  bowl: product('EHlO40PxryQ7-joFpm5Dfemjx'),
  tenders: product('WtYdnrsGm3Bo-hYFhGTHdKf7I'),
  bogo: product('HstHkxn8yNmi-2aM2x1CGJ5R3'),
  sides: image('9f423590-be94-4ef4-90de-e4c56623666b'),
  shakes: image('71bfaa28-fb90-41ff-a5a7-d05ece092ebe.jpg'),
  catering: image('d6adb646-cd38-45ef-8f8e-b54b-42eca19a12c7',1920),
  hicksville: image('5ece26bd-39ec-4483-b997-2960209409c7',1920),
  story: image('71d1c239-d06e-4c2b-8f7a-7b99f62c65e2'),
  rewards: image('9ae04eee-3dbf-4e33-896c-999aa9422ccd')
};

const page = (name, category) => `?page=${name}${category ? '&category=' + encodeURIComponent(category) : ''}`;
const link = (label, href, style = '') => `<a class="pill ${style}" href="${href}">${label}</a>`;
const openButton = (label, target, style = '') => `<button type="button" class="pill ${style}" data-open="${target}">${label}</button>`;
const picture = (src, alt = '', eager = false) => `<img src="${src}" alt="${alt}" loading="${eager ? 'eager' : 'lazy'}">`;
const stripe = '<div class="stripe" aria-hidden="true"></div>';

const stores = [
  {name:'Hicksville',slug:'hicksville',address:'285 S Broadway, Hicksville, NY 11801',phone:'(516) 470-0303',tel:'+15164700303',hours:'Mon–Thu 11 am–10 pm · Fri–Sun 11 am–11 pm',coords:[40.761,-73.520]},
  {name:'Selden',slug:'selden',address:'263 Middle Country Rd, Selden, NY 11784',phone:'(631) 320-0444',tel:'+16313200444',hours:'Sun–Thu 11 am–9:30 pm · Fri–Sat 11 am–11:30 pm',coords:[40.868,-73.024]}
];
const footerGroups = [
  ['Menu', `<a href="${page('menu')}">Our menu</a>`],
  ['Catering', `<a href="${page('catering')}">Catering menu</a>`],
  ['Rewards', `<a href="${page('rewards')}">How it works</a><a href="${client}/login">Sign in</a>`],
  ['Peri-Peri Sauces', '<button class="plain" type="button" data-open="sauces">Explore our sauces</button>'],
  ['About Us', `<a href="${page('story')}">Our story</a><a href="${client}/gift-cards">Gift cards</a><a href="${client}/careers">Careers</a><a href="${client}/page/franchising">Franchising</a>`],
  ['Find Us', `<a href="${page('locations')}">Restaurant locations</a><a href="mailto:info@periperiguys.com">Contact us</a>`]
];
const dishes = [
  {name:'2 Whole Chickens BOGO',category:'Chicken',price:'36.99',photo:photos.bogo,description:'Whole flame-grilled peri chicken with your choice of sauce.'},
  {name:'The King Chicken Sandwich',category:'Sandwiches',price:'12.00',photo:photos.sandwich,description:'Grilled chicken breast, American cheese, a hash brown, lettuce, onions, and peri mayo.'},
  {name:'20 Peri-Wings',category:'Wings',price:'28.00',photo:photos.wings,description:'Order one flavor or mix your peri-peri sauces.'},
  {name:'Chicken Thigh Skewers',category:'Chicken',price:'15.00',photo:photos.skewers,description:'Two skewers of boneless, skin-on chicken thighs with a sauce.'},
  {name:'Avocado Chicken Salad Bowl',category:'Bowls & Salads',price:'16.00',photo:photos.bowl,description:'Grilled chicken, rice, avocado, sweet potatoes, tomatoes, and red onion.'},
  {name:'6 Peri-Crispy Tenders',category:'Chicken',price:'15.00',photo:photos.tenders,description:'Six fried boneless chicken tenders.'},
  {name:'Platter for Two',category:'Platters',price:'32.00',photo:photos.whole,description:'Whole flame-grilled chicken and two sides.'},
  {name:'Mac & Cheese',category:'Sides',price:'7.00',photo:photos.sides,description:'A large side of mac and cheese.'},
  {name:'Tres Leches',category:'Desserts',price:'5.00',description:'A slice of tres leches cake.'},
  {name:'Vanilla Deluxe',category:'Milkshakes',price:'8.00',description:'An Italian vanilla milkshake.'}
];
const categories = [
  ['Chicken',photos.whole],['Sandwiches',photos.sandwich],['Platters',photos.catering],['Bowls & Salads',photos.bowl],
  ['Wings',photos.wings],['Sides',photos.sides],['Desserts',null],['Milkshakes',photos.shakes]
];
const sauceList = [
  ['Lemon & Herb','A citrus and herb option.'],['Mango & Lime','A fruity option with mango and lime.'],
  ['Mild','A gentler peri-peri kick.'],['Hot','A hotter option for chili lovers.'],['Very Hot','The hottest option in this guide.']
];

const navItems = `<a href="${page('menu')}">Menu</a><a href="${page('catering')}">Catering</a><a href="${page('rewards')}">Rewards</a><button class="plain" type="button" data-open="sauces">Peri-Peri Sauces</button><a href="${page('story')}">Our Story</a>`;
document.querySelector('#header').innerHTML = `
  <a class="logo-link" href="?" aria-label="Peri-Peri Guys home">${picture(photos.logo,'',true)}<span>Peri-Peri Guys</span></a>
  <nav class="nav" aria-label="Main navigation">${navItems}</nav>
  <div class="account"><button class="plain" type="button" data-open="locations">Find a location</button><a href="${client}/login">Sign in</a><a href="${page('rewards')}">Join</a></div>
  ${openButton('Order now','order','order-float')}
  <button class="mobile-toggle" type="button" aria-label="Open menu" aria-haspopup="dialog" data-open="navigation"><span aria-hidden="true">☰</span></button>`;

document.querySelector('#footer').innerHTML = `${stripe}<div class="wrap">
  <div class="footer-grid">
    ${footerGroups.map(([heading, links]) => `<details class="footer-group" open><summary>${heading}</summary><div>${links}</div></details>`).join('')}
  </div>
  <div class="footer-extras">
    <div><h3>Peri-Peri Guys Rewards</h3><p>Earn points when you order online and redeem them for food.</p><a href="${page('rewards')}">Explore rewards</a></div>
    <div><h3>Order with the app</h3><p>Find your location and order pickup or delivery.</p>${appStores}</div>
    ${picture(photos.darkLogo,'Peri-Peri Guys')}
  </div>
  <div class="footer-end"><span>© Peri-Peri Guys USA LLC</span><a href="${client}/privacy">Privacy</a><a href="${client}/terms">Terms</a></div>
  </div>`;

function campaign(title, cards, dark = false) {
  return `<section class="campaign-band${dark ? ' hot' : ''}">${stripe}<div class="wrap campaign">
    <h2 class="stamped campaign-title" data-reveal>${title.split('|').map(line => `<span>${line}</span>`).join('')}</h2>
    <div class="campaign-grid" data-fan>${cards.map(([src, title, copy, action]) => `<article class="campaign-card">
    ${picture(src)}<div class="card-body"><h3>${title}</h3><p>${copy}</p>${action}</div></article>`).join('')}</div>
    </div></section>`;
}

function dishCard(dish) {
  const details = `<button type="button" class="plain details" data-dish="${dishes.indexOf(dish)}" aria-label="Details for ${dish.name}">Details</button>`;
  return `<article class="dish${dish.photo ? '' : ' dish-no-photo'}" data-category="${dish.category.replaceAll('&','&amp;')}">
    ${dish.photo ? `<div class="dish-media">${picture(dish.photo,dish.name)}${details}</div>` : ''}
    <div class="card-body"><h3>${dish.name}</h3><p class="dish-description">${dish.description}</p><p class="dish-price">$${dish.price}</p>
    ${dish.photo ? '' : details}
    ${openButton('Order','order','dark')}</div></article>`;
}

function home() {
  return `<section class="hero" aria-labelledby="home-headline">
    <div class="hero-art" aria-hidden="true" data-parallax="38">
      <div class="hero-paper"></div>
      <div class="hero-plate">${picture(photos.whole,'',true)}</div>
      <div class="hero-side hero-side-top">${picture(photos.bowl,'',true)}</div>
      <div class="hero-side hero-side-middle">${picture(photos.sides,'',true)}</div>
      <div class="hero-side hero-side-bottom">${picture(photos.wings,'',true)}</div>
      <div class="hero-sticker">${picture(photos.darkLogo,'',true)}</div>
    </div>
    <h1 class="stamped hero-heading" id="home-headline"><span>It’s all about</span><span>the sauce.</span></h1>
  </section>
  ${campaign('Bring on|the flavor',[
    [photos.whole,'Flame-grilled chicken','Zabiha Halal chicken, marinated for over 24 hours.',openButton('Order chicken','order')],
    [photos.skewers,'Find your flavor','Pick a sauce for your flame-grilled chicken.',openButton('Explore sauces','sauces','dark')],
    [photos.catering,'Feed the whole crew','Whole chickens and sharing platters for your next event.',link('Order catering',page('catering'))]
  ])}
  ${stripe}<section class="wrap section"><h2 data-reveal>The crowd pleasers</h2><div class="feature-grid">${dishes.slice(0,5).map(dishCard).join('')}</div></section>
  <section class="wrap section categories"><h2 data-reveal>Hungry?</h2><div class="category-grid">
  ${categories.map(([name,src]) => `<a class="category-card" href="${page('menu',name)}"><div class="category-media">${src ? picture(src) : '<div class="category-fallback" aria-hidden="true"></div>'}<span class="category-cta" aria-hidden="true">View menu</span></div><span>${name}</span></a>`).join('')}
  </div><p class="section-action">${link('View full menu',page('menu'),'dark')}</p></section>
  ${campaign('What’s hot',[
    [photos.bogo,'Whole Chicken BOGO','Check the ordering menu for availability at your location.',openButton('Check it out','order')],
    [photos.sandwich,'The King Chicken Sandwich','Grilled peri chicken with a hash brown and house peri mayo.',link('Explore the menu',page('menu','Sandwiches'))],
    [photos.wings,'Peri-Wings','Pick one flavor or try a mix of sauces.',link('Explore wings',page('menu','Wings'))]
  ],true)}
  <section class="wrap section rewards-feature"><div class="split"><div class="split-copy"><strong class="section-tag">Peri-Peri Guys Rewards</strong><h2 data-reveal>Earn points for free food</h2><p>Join Peri-Peri Guys Rewards and earn points when you order online.</p>${link('Explore rewards',page('rewards'))}${appStores}</div>${picture(photos.rewards)}</div></section>
  <section class="catering-feature">${stripe}<div class="feature-copy">
    <p class="section-tag">Feed the crowd</p><h2 data-reveal>Catering for<br>your next event</h2>
    <p>Order whole flame-grilled chickens, sharing platters, and sides for an office lunch, a birthday, or a family get-together. Choose your peri-peri sauce for the group.</p>
    <div class="feature-actions">${link('Order catering',client + '/catering','light')}<a href="${page('catering')}">Learn more</a></div>
  </div></section>
  <figure class="venue-cover"><div data-parallax="48">${picture(photos.hicksville,'Peri-Peri Guys in Hicksville')}</div></figure>
  <section class="story-feature">${stripe}<div class="feature-copy">
    <p class="section-tag">Our story</p><h2 data-reveal>Meet Peri-Peri Guys</h2>
    <p>Portuguese-style flame grilling and African bird’s eye chili come together in our peri-peri sauce.</p>${link('Learn more',page('story'),'dark')}
  </div></section>
  <section class="wrap section location-feature"><h2 class="stamped" data-reveal><span>Behind the heat</span></h2><div class="location-feature-grid">${picture(photos.story)}<div><h3>It starts with the sauce</h3><p>Try Lemon &amp; Herb, Mango &amp; Lime, or turn up the heat with the spicy peri-peri sauces.</p>${openButton('Explore the sauces','sauces','dark')}</div></div></section>`;
}

function inner(title, copy, src, body) {
  return `<section class="inner-hero" style="--cover:url('${src}')"><div><h1>${title}</h1><p>${copy}</p></div></section>${stripe}<div class="wrap section">${body}</div>`;
}

function menu() {
  return inner('Like it spicy?', 'Flame-grilled chicken, wings, sandwiches, bowls, and more.',photos.hero,`
    <h2>Peri-Peri Guys menu</h2>
    <div class="choices" role="group" aria-label="Menu categories">${['All', ...categories.map(([name]) => name)].map(name => `<button class="choice" type="button" data-filter="${name}" aria-pressed="false">${name}</button>`).join('')}</div>
    <label class="menu-search">Search featured menu<input id="menu-search" type="search" placeholder="Try wings"></label>
    <div class="listing" id="menu-dishes">${dishes.map(dishCard).join('')}</div>
    <p id="menu-empty" role="status" hidden>No featured dishes match your search.</p>
    <p class="section-action">${link('View full live menu',client + '/menu','dark')}</p>`);
}

function storeCards(items = stores) {
  return `<div class="locations">${items.map(store => `<article class="location-card"><h3>${store.name}</h3><address>${store.address}</address><p><a href="tel:${store.tel}">${store.phone}</a></p><details><summary>Opening hours</summary><p>${store.hours}</p></details><p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}">Directions</a></p>${link('Order ' + store.name,client + '/menu/' + store.slug,'dark')}</article>`).join('')}</div>`;
}

const screens = {
  home,
  menu,
  catering: () => inner('Feed the crowd','Catering for your next event.',photos.catering,`<h2>Whole chickens and sharing platters</h2><p>Choose flame-grilled chicken, sides, and a sauce for your group.</p>${link('Explore live catering options',client + '/catering')}`),
  rewards: () => inner('Peri-Peri Guys Rewards','Earn points when you order online.',photos.rewards,`<h2>Order. Earn. Redeem.</h2><p>Join the rewards program, earn points on online orders, and redeem them for food.</p>${link('Join or sign in',client + '/login')}`),
  locations: () => inner('Find a Peri-Peri Guys','Visit us in Hicksville or Selden, New York.',photos.hero,`<h2>Our locations</h2><div id="location-list">${storeCards()}</div><p class="section-action">${openButton('Find the closest location','locations','dark')}</p>`),
  story: () => inner('Our story','It’s all about the sauce.',photos.story,`<h2>From the sauce to the grill</h2><p>Our peri-peri gets its kick from African bird’s eye chilies. We marinate our chicken for over 24 hours and finish it over the flame.</p>${link('Read the full story',client + '/story','dark')}`)
};
const params = new URLSearchParams(location.search);
const requested = params.get('page');
const current = Object.hasOwn(screens,requested) ? requested : 'home';
document.body.dataset.page = current;
document.querySelector('#main').innerHTML = screens[current]();
if (current !== 'home') document.title = `${document.querySelector('h1').textContent} | Peri-Peri Guys`;
const activePage = document.querySelector(`header a[href="${page(current)}"]`);
activePage?.setAttribute('aria-current','page');
const footerBreakpoint = matchMedia('(max-width: 600px)');
function syncFooter() {
  for (const group of document.querySelectorAll('.footer-group')) group.open = !footerBreakpoint.matches;
}
footerBreakpoint.addEventListener('change',syncFooter);
syncFooter();

if (current === 'home' && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const entrance = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('has-entered',entry.isIntersecting);
    }
  }, {rootMargin:'0px 0px -8% 0px'});
  for (const element of document.querySelectorAll('[data-reveal], .feature-grid, .category-grid, .rewards-feature .split, .venue-cover, .location-feature-grid')) {
    element.classList.add('awaiting-entrance');
    entrance.observe(element);
  }
  const fans = [...document.querySelectorAll('[data-fan]')];
  const layers = [...document.querySelectorAll('[data-parallax]')];
  const desktop = matchMedia('(min-width: 901px)');
  const clamp = value => Math.min(1,Math.max(0,value));
  const positions = new Map();
  let frame = null;
  let lastTime = null;
  function updateMotion(time) {
    frame = null;
    const height = window.innerHeight;
    const elapsed = lastTime === null ? 16 : Math.min(48,time - lastTime);
    const easing = 1 - Math.exp(-elapsed / 68);
    let moving = false;
    const targets = [];
    for (const group of fans) {
      const {top,bottom} = group.getBoundingClientRect();
      const entering = clamp((height * .84 - top) / (height * .46));
      const leaving = clamp((bottom - height * .13) / (height * .53));
      const progress = desktop.matches ? Math.min(entering,leaving) : 1;
      const stacked = 1 - progress * progress * (3 - 2 * progress);
      const stackDistance = group.children[1].offsetLeft - group.children[0].offsetLeft;
      targets.push([group,'--fan-offset',stackDistance * stacked]);
    }
    for (const layer of layers) {
      const {top,height:layerHeight} = layer.parentElement.getBoundingClientRect();
      const progress = clamp((height - top) / (height + layerHeight));
      const shift = desktop.matches ? (progress * 2 - 1) * Number(layer.dataset.parallax) : 0;
      targets.push([layer,'--photo-shift',shift]);
    }
    for (const [element,property,target] of targets) {
      const previous = positions.get(element) ?? target;
      const next = !desktop.matches || Math.abs(target - previous) < .35 ? target : previous + (target - previous) * easing;
      if (!positions.has(element) || previous !== next) {
        positions.set(element,next);
        element.style.setProperty(property,`${next.toFixed(2)}px`);
      }
      moving ||= next !== target;
    }
    lastTime = moving ? time : null;
    if (moving) scheduleMotion();
  }
  function scheduleMotion() {
    if (frame === null) frame = window.requestAnimationFrame(updateMotion);
  }
  window.addEventListener('scroll',scheduleMotion,{passive:true});
  window.addEventListener('resize',scheduleMotion);
  window.addEventListener('pageshow',scheduleMotion);
  desktop.addEventListener('change',scheduleMotion);
  updateMotion(performance.now());
}

const dialog = document.querySelector('#dialog');
const content = document.querySelector('#dialog-content');
const title = text => `<h2 id="dialog-title">${text}</h2>`;
const orderChoices = mode => `<div class="dialog-actions">${stores.map(store => link(store.name,client + '/menu/' + store.slug,'dark')).join('')}</div><p>Choose ${mode === 'delivery' ? 'delivery' : 'pickup'} in the ordering menu.</p>`;
const dialogs = {
  navigation: () => title('Menu') + `<nav class="mobile-nav" aria-label="Mobile navigation">${navItems}<a href="${page('locations')}">Find a location</a><a href="${client}/login">Sign in</a></nav>`,
  order: () => title('Ready to order?') + `<p>Choose how you’d like to order, then select a location.</p><div class="choices" role="group" aria-label="Order method"><button class="choice" data-method="pickup" aria-pressed="true">Pickup</button><button class="choice" data-method="delivery" aria-pressed="false">Delivery</button>${link('Catering',client + '/catering')}</div><div id="order-choices">${orderChoices('pickup')}</div>`,
  sauces: () => title('Find your peri-peri sauce') + `<div class="choices" role="group" aria-label="Sauce flavors">${sauceList.map(([name],index) => `<button class="choice" data-sauce="${index}" aria-pressed="${index === 0}">${name}</button>`).join('')}</div><p id="sauce-description" aria-live="polite">${sauceList[0][1]}</p>${link('View ordering menu',client + '/menu','dark')}`,
  welcome: () => title('Find your nearest Peri-Peri Guys') + `<p>Choose a restaurant to see its hours and start your order.</p><div class="welcome-actions">${openButton('Use my location','welcome-geo','dark')}<button type="button" class="plain" data-open="locations">Choose a location</button><button type="button" class="plain" data-open="dismiss">Maybe later</button></div>`,
  locations: () => title('Find your nearest Peri-Peri Guys') + `<div class="dialog-actions">${openButton('Use my location','geo')}${link('Browse locations',page('locations'),'dark')}</div><p id="location-status" role="status"></p><div id="dialog-stores">${storeCards()}</div>`
};
function show(markup, mode = '') {
  dialog.dataset.mode = mode;
  content.innerHTML = markup;
  if (!dialog.open) dialog.showModal();
  else content.querySelector('button, a')?.focus();
}

function locate() {
  const status = document.querySelector('#location-status');
  if (!navigator.geolocation) {
    status.textContent = 'Location is unavailable. Choose a restaurant below.';
    return;
  }
  // Location is used in the browser to sort the two stores.
  status.textContent = 'Finding your nearest location…';
  navigator.geolocation.getCurrentPosition(({coords}) => {
    if (!status.isConnected) return;
    const latitudeScale = Math.cos(coords.latitude * Math.PI / 180);
    const distance = ([lat,lon]) => (lat - coords.latitude) ** 2 + ((lon - coords.longitude) * latitudeScale) ** 2;
    const sorted = [...stores].sort((a,b) => distance(a.coords) - distance(b.coords));
    status.textContent = `${sorted[0].name} is the closer of our two restaurants.`;
    document.querySelector('#dialog-stores').innerHTML = storeCards(sorted);
  }, () => {
    if (status.isConnected) status.textContent = 'Location is unavailable. Choose a restaurant below.';
  }, {timeout:8000});
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const {open, dish, sauce, method} = button.dataset;
  if (open === 'dismiss') dialog.close();
  else if (open === 'welcome-geo') {
    show(dialogs.locations(),'locations');
    locate();
  } else if (open === 'geo') locate();
  else if (Object.hasOwn(dialogs,open)) show(dialogs[open](),open);
  else if (dish !== undefined) {
    const item = dishes[Number(dish)];
    show(title(item.name) + `<p>${item.description}</p><p>$${item.price}</p>` + openButton('Order','order','dark'));
  } else if (sauce !== undefined) {
    for (const choice of content.querySelectorAll('[data-sauce]')) choice.setAttribute('aria-pressed', String(choice === button));
    document.querySelector('#sauce-description').textContent = sauceList[Number(sauce)][1];
  } else if (method) {
    for (const choice of content.querySelectorAll('[data-method]')) choice.setAttribute('aria-pressed', String(choice === button));
    document.querySelector('#order-choices').innerHTML = orderChoices(method);
  }
});
if (current === 'home') {
  try {
    const welcomeKey = 'peri-location-welcome';
    if (!sessionStorage.getItem(welcomeKey)) {
      sessionStorage.setItem(welcomeKey,'seen');
      show(dialogs.welcome(),'welcome');
    }
  } catch {
    // Some local browser contexts disable session storage.
  }
}
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});

if (current === 'menu') {
  const search = document.querySelector('#menu-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('#menu-dishes [data-category]')];
  let category = filters.find(button => button.dataset.filter === params.get('category'))?.dataset.filter || 'All';
  function updateMenu() {
    const query = search.value.trim().toLowerCase();
    for (const button of filters) button.setAttribute('aria-pressed',String(button.dataset.filter === category));
    for (const [index,card] of cards.entries()) {
      const dish = dishes[index];
      card.hidden = (category !== 'All' && dish.category !== category) || !`${dish.name} ${dish.description}`.toLowerCase().includes(query);
    }
    document.querySelector('#menu-empty').hidden = cards.some(card => !card.hidden);
  }
  for (const button of filters) button.addEventListener('click', () => {
    category = button.dataset.filter;
    updateMenu();
  });
  search.addEventListener('input',updateMenu);
  updateMenu();
}
