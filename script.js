// =========================================================
// DHANIN T — PORTFOLIO SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
      disable: reduceMotion,
    });
  }

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 400);
  });
  // fallback in case load event already fired
  setTimeout(() => loader && loader.classList.add('done'), 2500);

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR SCROLL STATE + ACTIVE LINK ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinksEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinksEl.classList.contains('open'));
    });
    navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
    }));
  }

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- CURSOR GLOW ---------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && matchMedia('(hover:hover)').matches) {
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- TYPEWRITER: ROLE ---------- */
  const roles = [
    'Computer Science Engineering Student',
    'Django Developer',
    'Web Developer',
    'Business Analyst'
  ];
  const typedEl = document.getElementById('typed');
  if (typedEl && !reduceMotion) {
    let ri = 0, ci = 0, deleting = false;
    function tick() {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, 1600); return; }
      } else {
        ci--;
        typedEl.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  } else if (typedEl) {
    typedEl.textContent = roles[0];
  }

  /* ---------- TERMINAL TYPE EFFECT ---------- */
  const termLines = [
    '$ whoami',
    'dhanin_t — CSE student & Django developer',
    '',
    '$ python manage.py runserver',
    'Watching for file changes with StatReloader',
    'Django version 5.0, using settings "portfolio"',
    'Starting development server at http://127.0.0.1:8000/',
    '',
    '$ git commit -m "build something meaningful"',
    '[main] 1 file changed, ready to ship 🚀'
  ];
  const termEl = document.getElementById('terminalText');
  if (termEl) {
    if (reduceMotion) {
      termEl.textContent = termLines.join('\n');
    } else {
      let li = 0, ci2 = 0, out = '';
      function typeTerm() {
        if (li >= termLines.length) return;
        const line = termLines[li];
        if (ci2 <= line.length) {
          termEl.textContent = out + line.slice(0, ci2);
          ci2++;
          setTimeout(typeTerm, 22);
        } else {
          out += line + '\n';
          li++; ci2 = 0;
          setTimeout(typeTerm, 260);
        }
      }
      setTimeout(typeTerm, 900);
    }
  }

  /* ---------- SKILL BARS + CIRCLES + STAT COUNTERS (on scroll) ---------- */
  const animatedTargets = new Set();

  function animateSkillBars(container) {
    container.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
    container.querySelectorAll('.skill-pct').forEach(pct => {
      const target = parseInt(pct.dataset.target, 10);
      animateNumber(pct, target, '%');
    });
  }

  function animateCircles(container) {
    container.querySelectorAll('.circle-skill').forEach(circle => {
      const target = parseInt(circle.dataset.target, 10);
      const fg = circle.querySelector('.circ-fg');
      const val = circle.querySelector('.circle-val');
      const circumference = 326.7;
      const offset = circumference - (target / 100) * circumference;
      requestAnimationFrame(() => { fg.style.strokeDashoffset = offset; });
      animateNumber(val, target, '%');
    });
  }

  function animateNumber(el, target, suffix) {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  function animateStats(container) {
    container.querySelectorAll('.stat-num').forEach(stat => {
      const target = parseInt(stat.dataset.target, 10);
      animateNumber(stat, target, '');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedTargets.has(entry.target)) {
        animatedTargets.add(entry.target);
        if (entry.target.classList.contains('skills')) animateSkillBars(entry.target);
        if (entry.target.classList.contains('skills-col-circles')) animateCircles(entry.target);
        if (entry.target.classList.contains('stats')) animateStats(entry.target);
      }
    });
  }, { threshold: 0.35 });

  const skillsSection = document.querySelector('.skills');
  const circlesCol = document.querySelector('.skills-col-circles');
  const statsSection = document.querySelector('.stats');
  [skillsSection, circlesCol, statsSection].forEach(el => el && observer.observe(el));

  /* ---------- CARD TILT EFFECT ---------- */
  if (!reduceMotion && matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');

    function setError(field, message) {
      const errEl = form.querySelector(`.form-error[data-for="${field}"]`);
      if (errEl) errEl.textContent = message || '';
    }

    function validate() {
      let valid = true;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) { setError('name', 'Please enter your name.'); valid = false; }
      else setError('name', '');

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) { setError('email', 'Enter a valid email address.'); valid = false; }
      else setError('email', '');

      if (subject.length < 3) { setError('subject', 'Please add a subject.'); valid = false; }
      else setError('subject', '');

      if (message.length < 10) { setError('message', 'Message should be at least 10 characters.'); valid = false; }
      else setError('message', '');

      return valid;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validate()) {
        status.textContent = 'Please fix the highlighted fields.';
        status.classList.add('error');
        return;
      }

      // No backend connected — build a mailto fallback so the message still reaches the inbox.
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailSubject = encodeURIComponent(subject);
      window.location.href = `mailto:dhanin.t2006@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      status.textContent = 'Opening your email app to send the message…';
      status.classList.add('success');
      form.reset();
    });
  }

  /* ---------- PARTICLES BACKGROUND ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4'];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(90, Math.floor(window.innerWidth / 14));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }
});
