// netlify/functions/get-reviews.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  const apiToken = process.env.NETLIFY_TOKEN;
  const formId = 'review-form';
  const apiUrl = `https://api.netlify.com/api/v1/forms/${formId}/submissions`;

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });
    const submissions = await res.json();

    // Filter approved reviews if needed
    const approvedReviews = submissions.map(sub => ({
      name: sub.data.name || 'Anonymous',
      book: sub.data.book || '',
      review: sub.data.review || ''
    }));

    return { statusCode: 200, body: JSON.stringify(approvedReviews) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
