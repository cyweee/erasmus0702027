const accItems = document.querySelectorAll('.acc-item');

function setOpen(item, open) {
  const wrap = item.querySelector('.acc-text-wrap');
  item.classList.toggle('open', open);
  
  const trigger = item.querySelector('.acc-trigger');
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(open));
  }
  
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

window.addEventListener('resize', () => {
  accItems.forEach(item => {
    if (item.classList.contains('open')) setOpen(item, true);
  });
});

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

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