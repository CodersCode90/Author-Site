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
