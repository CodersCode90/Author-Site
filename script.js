// ==============================
// CUSTOM CURSOR + TRAIL (DESKTOP ONLY)
// ==============================
const cursor = document.querySelector('.cursor');
const trailContainer = document.querySelector('.cursor-trail-container');

function isDesktop() {
  return window.innerWidth > 768;
}

if (cursor && trailContainer && isDesktop()) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';

    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.top = e.clientY + 'px';
    trail.style.left = e.clientX + 'px';
    trailContainer.appendChild(trail);

    setTimeout(() => trail.remove(), 600);
  });
}

// ==============================
// PARTICLE GENERATOR FUNCTION
// ==============================
function generateParticles(containerSelector, particleCount = 30, sizeRange = [4, 6], color = '#ffd700', durationRange = [4, 10]) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.animationDuration = (Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0]) + 's';
    particle.style.animationDelay = Math.random() * 6 + 's';

    container.appendChild(particle);
  }
}

// ==============================
// GENERATE PARTICLES ON DOM LOAD
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  generateParticles('.hero .particles', 30, [4, 4], '#ffd700', [4, 8]);
  generateParticles('.about-hero .particles', 30, [3, 4], '#ffd700', [5, 10]);
  generateParticles('.book-hero .particles', 30, [4, 6], '#00f5ff', [4, 10]);
  generateParticles('.book-particles', 30, [4, 6], '#ff6f61', [4, 10]);
});
