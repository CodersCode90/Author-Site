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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[name='review-form']");
  const status = document.getElementById("review-status");
  const testimonialSlider = document.querySelector(".testimonial-slider");

  if (form && testimonialSlider) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted!"); // 🔍 Debug

      const name = form.querySelector("#name").value;
      const book = form.querySelector("#book").value;
      const review = form.querySelector("#review").value;

      // Create testimonial item
      const testimonial = document.createElement("div");
      testimonial.classList.add("testimonial", "active"); // important!
      testimonial.innerHTML = `
        <p class="review-text">"${review}"</p>
        <p class="review-meta">— ${name}, about <em>${book}</em></p>
      `;

      testimonialSlider.appendChild(testimonial);

      form.reset();
      status.textContent = "✅ Thanks for your review!";
    });
  }
});
