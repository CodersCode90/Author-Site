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

// ==============================
// TESTIMONIAL SLIDER + STARS
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".testimonial-slider");
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0;
  const total = testimonials.length;

  // Add 5 stars under each testimonial dynamically
  testimonials.forEach(testimonial => {
    const starContainer = document.createElement('div');
    starContainer.classList.add('testimonial-stars');
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.innerHTML = '★';
      starContainer.appendChild(star);
    }
    testimonial.appendChild(starContainer);
  });

  // Update slider function
  function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
  }

  // Button events
  if (prevBtn) prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
    updateSlider();
  });
  
  if (nextBtn) nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;
    updateSlider();
  });

  // Initialize slider
  testimonials.forEach(t => {
    t.style.flex = '0 0 100%';
    t.style.width = '100%';
  });
  updateSlider();

  // Handle resize
  window.addEventListener('resize', () => {
    testimonials.forEach(t => {
      t.style.flex = '0 0 100%';
      t.style.width = '100%';
    });
    updateSlider();
  });
});
