export async function handler(event) {
  // Accept either NETLIFY_API_TOKEN or NETLIFY_TOKEN (yours is NETLIFY_API_TOKEN)
  const apiToken = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
  // Allow overriding the form id via env var for flexibility
  const formId = process.env.NETLIFY_FORM_ID || '68d2282299db73000815a5f9';
  const apiUrl = `https://api.netlify.com/api/v1/forms/${formId}/submissions`;

  // Probe mode for safe diagnostics: /?probe=1
  const isProbe = event && event.queryStringParameters && event.queryStringParameters.probe === '1';

  if (!apiToken) {
    const body = isProbe
      ? JSON.stringify({ ok: false, token_present: false, form_id: formId })
      : JSON.stringify({ error: 'Missing NETLIFY_API_TOKEN (set NETLIFY_API_TOKEN or NETLIFY_TOKEN in site env)' });

    return { statusCode: 500, body };
  }

  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });

    if (!res.ok) {
      const bodyText = await res.text();
      if (isProbe) {
        return { statusCode: res.status, body: JSON.stringify({ ok: false, status: res.status, body: bodyText }) };
      }
      return { statusCode: res.status, body: bodyText };
    }

    const submissions = await res.json();

    if (isProbe) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, token_present: true, form_id: formId, submissions_returned: submissions.length }) };
    }

    const reviews = submissions
      .map(sub => ({
        id: sub.id,
        name: (sub.data && sub.data.name) || 'Anonymous',
        book: (sub.data && sub.data.book) || '',
        review: (sub.data && sub.data.review) || '',
        created_at: sub.created_at
      }))
      .filter(r => r.review && r.review.trim().length > 0);

    return { statusCode: 200, body: JSON.stringify(reviews) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
