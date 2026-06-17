// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Scroll reveal via IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Hero background parallax + loaded trigger
const heroBg = document.querySelector('.hero__bg-image');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
  }, { passive: true });
}

// Floating particles in hero
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'hero__particle';
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(p);
  }
}
createParticles();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Timeline step highlight on scroll
const timelineItems = document.querySelectorAll('.timeline__item');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.timeline__number').style.background = 'var(--yellow)';
      entry.target.querySelector('.timeline__number').style.color = 'var(--black)';
    }
  });
}, { threshold: 0.6 });
timelineItems.forEach(item => timelineObserver.observe(item));

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll('.hero__stat strong');
  counters.forEach(el => {
    const text = el.textContent;
    const num = parseInt(text.replace(/\D/g, ''));
    if (!num) return;
    const prefix = text.match(/^\D+/)?.[0] || '';
    const suffix = text.match(/\D+$/)?.[0] || '';
    let start = 0;
    const duration = 1500;
    const step = num / (duration / 16);
    const update = () => {
      start = Math.min(start + step, num);
      el.textContent = prefix + Math.floor(start) + suffix;
      if (start < num) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

const heroStatsEl = document.querySelector('.hero__stats');
if (heroStatsEl) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStatsEl);
}
