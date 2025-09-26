import fetch from 'node-fetch';

export async function handler() {
  console.log("get-reviews function triggered"); // ✅ confirms the function runs

  const apiToken = process.env.NETLIFY_TOKEN; // must match your Netlify env var
  const formId = '68d2282299db73000815a5f9';
  const apiUrl = `https://api.netlify.com/api/v1/forms/${formId}/submissions`;

  if (!apiToken) {
    console.log("No API token found"); // ✅ confirms missing token
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_TOKEN' })
    };
  }

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });

    console.log("Fetch response status:", res.status); // ✅ shows HTTP status from Netlify API

    if (!res.ok) {
      const text = await res.text();
      console.log("Fetch error response:", text); // ✅ shows error text if fetch fails
      return { statusCode: res.status, body: text };
    }

    const submissions = await res.json();
    console.log("Fetched submissions:", submissions); // ✅ shows actual submissions array

    const reviews = submissions.map(sub => ({
      name: (sub.data && sub.data.name) || 'Anonymous',
      book: (sub.data && sub.data.book) || '',
      review: (sub.data && sub.data.review) || ''
    }));

    return { statusCode: 200, body: JSON.stringify(reviews) };
  } catch (err) {
    console.log("Caught error:", err); // ✅ logs network or other errors
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
