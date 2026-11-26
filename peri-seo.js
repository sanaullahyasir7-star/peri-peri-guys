// Peri-Peri Guys — per-page title, description, canonical and share tags (runs in <head>, before render).
(() => {
  const SITE = 'https://sanaullahyasir7-star.github.io/peri-peri-guys/';
  const pages = {
    menu: ['Menu | Peri-Peri Guys', 'Flame-grilled peri-peri chicken, wings, sandwiches, bowls and sides. Pick your sauce from Lemon & Herb to Very Hot.'],
    catering: ['Catering | Peri-Peri Guys', 'Whole flame-grilled chickens, sharing platters and sides for office lunches, birthdays and game day. Request catering from Hicksville or Selden.'],
    locations: ['Locations & Hours | Peri-Peri Guys', 'Find Peri-Peri Guys in Hicksville (285 S Broadway) and Selden (263 Middle Country Rd), Long Island. Hours, directions and phone numbers.'],
    story: ['Our Story | Peri-Peri Guys', 'A sauce born from centuries of tradition: how a Glasgow-to-New York journey and a pick-up soccer game became Peri-Peri Guys in 2020.'],
    rewards: ['Rewards | Peri-Peri Guys', 'Join Peri-Peri Guys Rewards, earn points on online orders and redeem them for food.']
  };
  const p = new URLSearchParams(location.search).get('page');
  const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val); };
  if (pages[p]) {
    const [title, desc] = pages[p], url = `${SITE}?page=${p}`;
    document.title = title;
    set('meta[name="description"]', 'content', desc);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', desc);
    set('meta[property="og:url"]', 'content', url);
    window.PPG_TITLE = title;
  }
})();
