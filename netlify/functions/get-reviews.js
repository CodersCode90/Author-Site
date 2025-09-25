// netlify/functions/get-reviews.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  const apiToken = process.env.NETLIFY_TOKEN;
  const formId = 'review-form';
  const apiUrl = `https://api.netlify.com/api/v1/forms/${formId}/submissions`;

  if (!apiToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_TOKEN environment variable on the server.' })
    };
  }

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status || 502,
        body: JSON.stringify({ error: `Netlify API returned ${res.status}`, details: text })
      };
    }

    const submissions = await res.json();

    const approvedReviews = submissions.map(sub => ({
      name: (sub.data && sub.data.name) || 'Anonymous',
      book: (sub.data && sub.data.book) || '',
      review: (sub.data && sub.data.review) || ''
    }));

    return { statusCode: 200, body: JSON.stringify(approvedReviews) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

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

