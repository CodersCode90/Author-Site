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
// PARTICLES FOR HERO, ABOUT, BOOK, INDEX
// ==============================
function generateParticles(containerSelector, count, sizeRange, color, durationRange, delayRange) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;

    particle.style.animationDuration = (Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0]) + 's';
    particle.style.animationDelay = Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0] + 's';

    container.appendChild(particle);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  generateParticles('.hero .particles', 30, [4, 6], '#ffd700', [4, 10], [0, 6]);
  generateParticles('.about-hero .particles', 30, [3, 4], '#ffd700', [5, 10], [0, 5]);
  generateParticles('.book-hero .particles', 30, [4, 6], '#00f5ff', [4, 10], [0, 6]);
  generateParticles('.book-particles', 30, [4, 6], '#ff6f61', [4, 10], [0, 6]);
});

// ==============================
// TESTIMONIAL SLIDER + REVIEWS
// ==============================
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    const viewport = document.querySelector('.testimonial-slider-viewport');
    let slides = slider ? slider.querySelectorAll('.testimonial') : [];
    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 5000;

    function refreshSlides() {
      slides = slider.querySelectorAll('.testimonial');
      slides.forEach(s => s.style.flex = '0 0 100%');
      showSlide(current);
    }

    function showSlide(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;

      slides.forEach((s, i) => {
        s.style.opacity = i === current ? '1' : '0';
        s.style.transform = i === current ? 'translateX(0)' : 'translateX(100%)';
        s.style.position = i === current ? 'relative' : 'absolute';
      });
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });

    function startAuto() { stopAuto(); autoTimer = setInterval(nextSlide, AUTO_DELAY); }
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }
    function resetAuto() { stopAuto(); startAuto(); }

    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => {
      slides.forEach(s => s.style.flex = '0 0 100%');
      showSlide(current);
    });

    refreshSlides();
    startAuto();

    // ---------- Handle review form ----------
    const form = document.querySelector('form[name="review-form"]');
    const status = document.getElementById('review-status');

    function encodeFormData(formData) { return new URLSearchParams(formData).toString(); }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'Submitting...';
        const fd = new FormData(form);

        try {
          const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeFormData(fd)
          });

          if (res.ok) {
            status.textContent = 'Thanks — your review was sent! It will appear here after approval.';
          } else {
            status.textContent = 'Submission received (might be blocked).';
          }

          const name = (fd.get('name') || 'Anonymous').trim();
          const book = (fd.get('book') || '').trim();
          const reviewText = (fd.get('review') || '').trim();

          if (reviewText) {
            const newSlide = document.createElement('div');
            newSlide.className = 'testimonial';
            const p = document.createElement('p');
            p.textContent = '“' + reviewText + '”';
            const h4 = document.createElement('h4');
            h4.textContent = '— ' + name + (book && book !== 'author' ? ' — ' + book : '');
            newSlide.appendChild(p);
            newSlide.appendChild(h4);

            slider.appendChild(newSlide);
            refreshSlides();
            current = slides.length - 1;
            showSlide(current);
            resetAuto();
            form.reset();
          }

        } catch (err) {
          console.error('Form submit error:', err);
          status.textContent = 'Submission failed — please try again later.';
        }

        setTimeout(() => { status.textContent = ''; }, 6000);
      });
    }

    // ---------- Load existing reviews ----------
    async function loadReviews() {
      try {
        const res = await fetch("/.netlify/functions/get-reviews");
        const reviews = await res.json();

        slider.innerHTML = ""; // Clear existing slides

        reviews.forEach(r => {
          const div = document.createElement("div");
          div.className = "testimonial";
          const p = document.createElement("p");
          p.textContent = `“${r.review}”`;
          const h4 = document.createElement("h4");
          h4.textContent = `— ${r.name}${r.book && r.book !== "author" ? " — " + r.book : ""}`;
          div.appendChild(p);
          div.appendChild(h4);
          slider.appendChild(div);
        });

        refreshSlides();
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    }

    loadReviews();
  });
})();
// ==============================