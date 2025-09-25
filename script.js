// ==============================
// CUSTOM CURSOR + TRAIL (WORKS ON ALL PAGES)
// ==============================
const cursor = document.querySelector('.cursor');
const trailContainer = document.querySelector('.cursor-trail-container');

if (cursor && trailContainer) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';

    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.top = e.clientY + 'px';
    trail.style.left = e.clientX + 'px';
    trailContainer.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 600);
  });
}

// ==============================
// INDEX HERO PARTICLES
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  const indexParticlesContainer = document.querySelector('.hero .particles');
  if (indexParticlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      const size = Math.random() * 6 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.backgroundColor = '#ffd700';
      particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
      particle.style.animationDelay = Math.random() * 6 + 's';

      indexParticlesContainer.appendChild(particle);
    }
  }
});

// ==============================
// ABOUT PAGE PARTICLES
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  const aboutParticlesContainer = document.querySelector('.about-hero .particles');
  if (aboutParticlesContainer) {
    const aboutParticleCount = 30;
    for (let i = 0; i < aboutParticleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      const size = Math.random() * 4 + 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.backgroundColor = '#ffd700';
      particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';

      aboutParticlesContainer.appendChild(particle);
    }
  }
});

// ==============================
// BOOK PAGE PARTICLES
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  const bookParticlesContainer = document.querySelector('.book-hero .particles');
  if (bookParticlesContainer) {
    const bookParticleCount = 30;
    for (let i = 0; i < bookParticleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      const size = Math.random() * 6 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.backgroundColor = '#00f5ff';
      particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
      particle.style.animationDelay = Math.random() * 6 + 's';

      bookParticlesContainer.appendChild(particle);
    }
  }
});

// ==============================
// INDEX BOOK PARTICLES
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  const bookParticlesContainer = document.querySelector('.book-particles');
  if (bookParticlesContainer) {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Random position within the books section
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      // Random size
      const size = Math.random() * 6 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      // Random animation duration and delay
      particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
      particle.style.animationDelay = Math.random() * 6 + 's';

      bookParticlesContainer.appendChild(particle);
    }
  }
});

// reviews.js
document.addEventListener("DOMContentLoaded", async () => {
  const slider = document.querySelector(".testimonial-slider");

  if (!slider) return;

  try {
    const res = await fetch("/.netlify/functions/get-reviews");
    const reviews = await res.json();

    if (!reviews.length) {
      slider.innerHTML = `<div class="testimonial active"><p>Be the first to leave a review!</p></div>`;
      return;
    }

    slider.innerHTML = reviews.map((r, i) => `
      <div class="testimonial ${i === 0 ? "active" : ""}">
        <p>"${r.review}"</p>
        <h4>- ${r.name}${r.book ? `, <em>${r.book}</em>` : ""}</h4>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error fetching reviews:", err);
    slider.innerHTML = `<div class="testimonial active"><p>Couldn’t load reviews right now.</p></div>`;
  }
});
