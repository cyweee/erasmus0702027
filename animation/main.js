// Аккордеон "Co se naučíš": otevřená je vždy jen jedna karta
const accItems = document.querySelectorAll('.acc-item');

accItems.forEach(item => {
  const trigger = item.querySelector('.acc-trigger');

  trigger.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');

    // nejdřív zavřít všechny karty
    accItems.forEach(other => {
      other.classList.remove('open');
      other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
    });

    // a kliknutou otevřít (pokud byla už otevřená, zůstane zavřená)
    if (!wasOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// Mobilní menu: otevření / zavření tlačítkem
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Po kliknutí na odkaz v menu se menu zavře
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Zvýraznění odkazu v menu podle sekce, ve které se právě nacházíš
const links = document.querySelectorAll('.main-nav a');
const sections = [...links]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));