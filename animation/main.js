// Аккордеон "Co se naučíš": otevřená je vždy jen jedna karta
const accItems = document.querySelectorAll('.acc-item');

function setOpen(item, open) {
  const wrap = item.querySelector('.acc-text-wrap');
  item.classList.toggle('open', open);
  
  const trigger = item.querySelector('.acc-trigger');
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(open));
  }
  
  // otevřená karta dostane přesnou výšku textu, zavřená se vrátí na 2 řádky z CSS
  if (wrap) {
    wrap.style.maxHeight = open ? wrap.scrollHeight + 'px' : '';
  }
}

accItems.forEach(item => {
  item.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    accItems.forEach(other => setOpen(other, false));
    if (!wasOpen) setOpen(item, true);
  });
});

// po změně velikosti okna přepočítat výšku otevřené karty
window.addEventListener('resize', () => {
  accItems.forEach(item => {
    if (item.classList.contains('open')) setOpen(item, true);
  });
});

// Mobilní menu: otevření / zavření tlačítkem
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
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
}

// Zvýraznění odkazu v menu podle sekce, ve které se právě nacházíš
const links = document.querySelectorAll('.main-nav a');
const sections = [...links]
  .map(a => {
    const href = a.getAttribute('href');
    return href.startsWith('#') ? document.querySelector(href) : null;
  })
  .filter(Boolean);

if (sections.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}