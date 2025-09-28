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

(function(){
  document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.testimonial-slider');
  const testimonials = slider.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let current = 0;
  const AUTO_DELAY = 5000;
  let autoTimer;

  function updateSlider() {
    testimonials.forEach((t, i) => {
      t.classList.remove('active');
      if (i === current) t.classList.add('active');
    });

    const offset = -(current * 70); // adjust to match .testimonial.active width
    slider.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    current = (current + 1) % testimonials.length;
    updateSlider();
  }

  function prevSlide() {
    current = (current - 1 + testimonials.length) % testimonials.length;
    updateSlider();
  }

  function startAuto() {
    autoTimer = setInterval(nextSlide, AUTO_DELAY);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });

  updateSlider();
  startAuto();
});

  const testimonialWidth = testimonials[0].offsetWidth + 16; // 16px gap
  function updateSlider() {
    testimonials.forEach((t, i) => {
      t.classList.remove('active', 'prev', 'next');
      if (i === current) t.classList.add('active');
      if (i === (current - 1 + testimonials.length) % testimonials.length) t.classList.add('prev');
      if (i === (current + 1) % testimonials.length) t.classList.add('next');
   });
   slider.style.transform = `translateX(-${current * testimonialWidth}px)`;
  }


function updateSlider() {
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if (i === current) t.classList.add('active');
  });

  // Dynamically set viewport height
  const viewport = document.querySelector('.testimonial-slider-viewport');
  viewport.style.height = testimonials[current].offsetHeight + 'px';

  const offset = -(current * 70); // keeps slider moving
  slider.style.transform = `translateX(${offset}%)`;
}


})();
