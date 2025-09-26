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
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    const viewport = document.querySelector('.testimonial-slider-viewport');
    let slides = slider.querySelectorAll('.testimonial');
    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 5000;

    function refreshSlides() {
      slides = slider.querySelectorAll('.testimonial');
      slides.forEach(s => s.style.flex = '0 0 100%');
      updateSliderPosition();
    }

    function showSlide(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      updateSliderPosition();
    }

    function updateSliderPosition() {
      const translate = -current * 100;
      slider.style.transform = 'translateX(' + translate + '%)';
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
      updateSliderPosition();
    });

    refreshSlides();
    showSlide(0);
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
            h4.textContent = '— ' + (name || 'Anonymous') + (book && book !== 'author' ? ' — ' + book : '');
            newSlide.appendChild(p);
            newSlide.appendChild(h4);

            slider.appendChild(newSlide);
            refreshSlides();
            current = slides.length - 1;
            updateSliderPosition();
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

    // ---------- Load existing reviews (Netlify submissions API) ----------
    async function loadReviews() {
  try {
    const res = await fetch("/.netlify/functions/get-reviews");
    const reviews = await res.json();

    const slider = document.querySelector('.testimonial-slider');
    slider.innerHTML = ""; // Clear initial testimonials

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

    refreshSlides(); // Reuse your existing slider function
  } catch (err) {
    console.error("Failed to load reviews:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadReviews);


  });
})();

document.addEventListener("DOMContentLoaded", async () => {
  const slider = document.querySelector(".testimonial-slider");

  if (!slider) return;

  try {
    const res = await fetch("/.netlify/functions/get-reviews");

    if (!res.ok) {
      console.error('get-reviews function returned', res.status);
      slider.innerHTML = `<div class="testimonial active"><p>Couldn\'t load reviews right now.</p></div>`;
      return;
    }

    const reviews = await res.json();

    if (!Array.isArray(reviews) || !reviews.length) {
      slider.innerHTML = `<div class="testimonial active"><p>No reviews yet. Be the first!</p></div>`;
      return;
    }

    slider.innerHTML = reviews.map((r, i) => `
      <div class="testimonial ${i === 0 ? "active" : ""}">
        <p>"${(r.review || '').replace(/\"/g, '\\"')}"</p>
        <h4>- ${(r.name || 'Anonymous')}${r.book ? `, <em>${r.book}</em>` : ""}</h4>
      </div>
    `).join("");

  } catch (err) {
    console.error("Error fetching reviews:", err);
    slider.innerHTML = `<div class="testimonial active"><p>Couldn\'t load reviews right now.</p></div>`;
  }
});
