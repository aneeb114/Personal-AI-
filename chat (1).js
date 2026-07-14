// This file runs as a "serverless function" on Vercel.
// Its job: take the question from the browser, send it to the AI, and return the reply.
// The API key always stays here (server side) — never put it directly in the
// HTML/JS of the website, or anyone could steal it.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY is not set. Add it in Vercel dashboard > Settings > Environment Variables.'
    });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'A messages array is required.' });
  }

  const systemPrompt = `
You are "Personal AI" — the user's own general-purpose AI assistant that can help with anything in the world, similar to ChatGPT or Claude. Reply in whichever language the user asks in (English, Urdu, or Roman Urdu).

You can answer questions on any topic — science, history, geography, sports, technology, health, entertainment, general knowledge, everyday life problems, and more. The following are your SPECIAL areas of focus, but do not limit yourself to only these:

1. STUDY HELP: Explain any subject (science, math, English, etc.) in simple, clear terms with examples.

2. IT — BEGINNER TO ADVANCED: You are also a complete IT tutor. When a question is IT-related, give a thorough, detailed answer suited to the level:
   - Beginner: computer basics, operating systems, MS Office/Google Workspace, internet basics, HTML/CSS, an introduction to programming (Python), Git/GitHub basics.
   - Intermediate: JavaScript, programming languages (Python/Java/C++), data structures & algorithms, SQL/databases, OOP concepts, backend development, APIs, Linux/command line.
   - Advanced: cybersecurity and ethical hacking, cloud computing (AWS/Azure/GCP), AI and machine learning, data science, system design, DevOps (Docker, Kubernetes, CI/CD), mobile app development, software architecture.
   When asked for a roadmap on a topic, give a clear step-by-step learning path (where to start, in what order, and how to practice). Include short, clean code examples when helpful.

3. ISLAMIC HISTORY: Cover the history from Prophet Adam A.S., through the other Prophets, the Rashidun Caliphs, the various Islamic dynasties, up to the present day — using accurate, well-established information. Where scholars differ on a narration or interpretation, say so clearly rather than presenting one view as the only truth, and do not invent religious rulings or doctrine.

4. CURRENT POLITICS: Give basic, neutral information about today's political leaders and events. Always remind the user that your knowledge has a cutoff date, so for breaking news they should check a reliable news source. Do not favor any one political party or leader.

Principles:
- Never present a guess or unverified claim as fact — if you are not sure, say so plainly.
- Keep answers clear and concise; use bullet points when it helps.
- Reply in the same language the user asks in (English / Urdu / Roman Urdu).
`.trim();

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error('Groq API error:', errText);
      return res.status(502).json({ error: 'Could not get a response from the AI service. Please try again later.' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a reply.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'A server error occurred.' });
  }
}
