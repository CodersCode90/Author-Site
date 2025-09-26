export async function handler() {
  const apiToken = process.env.NETLIFY__API_TOKEN; // make sure this is set in Netlify env vars
  const formId = "68d2282299db73000815a5f9"; // replace with your form's exact Netlify ID

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const submissions = await res.json();

    // Map submissions to the format your slider expects
    const reviews = submissions.map((s) => ({
      name: s.data.name || "Anonymous",
      book: s.data.book || "author",
      review: s.data.review || "",
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(reviews),
    };
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
