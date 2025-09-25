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
