/* ================================
   Main JS – merged scripts
   Cursor + Nav + Reveal + Counters
   ================================ */

/* ---------- Custom Cursor ---------- */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  if (cursor && ring) {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';

    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  requestAnimationFrame(tick);
})();

// Hover effects
['a', '.project-card', '.pill', '.step'].forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.opacity = '0.7';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.35';
    });
  });
});


/* ---------- Nav Scroll ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});


/* ---------- Reveal on Scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---------- Animated Counters ---------- */
const counters = document.querySelectorAll('.stat-num');
const counterSpeed = 60; // smaller = faster
let countersPlayed = false;

function animateCounters() {
  if (countersPlayed) return;
  countersPlayed = true;

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;

    const update = () => {
      const increment = Math.ceil(target / counterSpeed);
      current += increment;

      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.6 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);
