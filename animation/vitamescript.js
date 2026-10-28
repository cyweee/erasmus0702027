const runBtn = document.querySelector('.run-btn');
const consoleEl = document.querySelector('.console');
const canvas = document.getElementById('confetti');

if (runBtn && consoleEl && canvas) {
  const ctx = canvas.getContext('2d');
  const COLORS = ['#FFFFFF', '#8A8AFF', '#FFD580', '#FF9CF0', '#A8FFB0', '#7DE3FF'];
  let particles = [];
  let rafId = null;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function burst(x, y, count, angleMin, angleMax, power = 1) {
    for (let i = 0; i < count; i++) {
      const angle = (angleMin + Math.random() * (angleMax - angleMin)) * Math.PI / 180;
      const speed = (8 + Math.random() * 11) * power;
      
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for (const p of particles) {
      p.vy += 0.3;
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    
    particles = particles.filter(p => p.y < window.innerHeight + 20);
    
    if (particles.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // konfety fce
  function fireConfetti() {
    const r = runBtn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 140, -150, -30);
    setTimeout(() => {
      burst(0, window.innerHeight, 90, -80, -45, 1.4);
      burst(window.innerWidth, window.innerHeight, 90, -135, -100, 1.4);
    }, 250);
  }

  const OUTPUT = ['+ Programovani', '+ Site', '+ Systemy', '+ Hardware'];
  const FINAL = 'Vitame u nas na skole!!!';
  let running = false;

  runBtn.addEventListener('click', () => {
    if (running) return;            // ochrana proti dvojkliku
    running = true;
    runBtn.disabled = true;
    consoleEl.innerHTML = '<span class="out-cmd">$ python skola.py</span>';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduce ? 0 : 350;

    const addLine = (text, cls) => {
      const s = document.createElement('span');
      s.className = cls;
      s.textContent = text;
      consoleEl.appendChild(s);
    };

    OUTPUT.forEach((text, i) => setTimeout(() => addLine(text, 'out-line'), delay * (i + 1)));

    // konec
    setTimeout(() => {
      addLine(FINAL, 'out-msg');
      if (!reduce) fireConfetti();
      running = false;
      runBtn.disabled = false;
    }, delay * (OUTPUT.length + 1));
  });
}