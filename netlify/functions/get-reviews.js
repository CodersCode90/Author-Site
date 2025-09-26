import fetch from 'node-fetch';

export async function handler() {
  const apiToken = process.env.NETLIFY_API_TOKEN; // needs setting in Netlify dashboard
  const formId = '68d2282299db73000815a5f9'; // this is your form's name
  const apiUrl = `https://api.netlify.com/api/v1/forms/${formId}/submissions`;

  if (!apiToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_API_TOKEN' })
    };
  }

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });

    if (!res.ok) {
      return { statusCode: res.status, body: await res.text() };
    }

    const submissions = await res.json();

    const reviews = submissions.map(sub => ({
      name: (sub.data && sub.data.name) || 'Anonymous',
      book: (sub.data && sub.data.book) || '',
      review: (sub.data && sub.data.review) || ''
    }));

    return { statusCode: 200, body: JSON.stringify(reviews) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
