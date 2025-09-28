import fetch from "node-fetch";

export async function handler() {
  const token = process.env.NETLIFY_API_TOKEN; // Set in Netlify dashboard
  const siteId = process.env.NETLIFY_SITE_ID;   // Set in Netlify dashboard

  const url = `https://api.netlify.com/api/v1/sites/${siteId}/forms/review-form/submissions?per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: "Failed to fetch reviews" };
    }

    const submissions = await response.json();

    // Filter only approved/processed submissions
    const approved = submissions
      .filter(sub => sub.status === "submitted" || sub.status === "approved")
      .map(sub => ({
        name: sub.data.name || "Anonymous",
        book: sub.data.book || "",
        review: sub.data.review || "",
      }));

    return {
      statusCode: 200,
      body: JSON.stringify(approved),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
