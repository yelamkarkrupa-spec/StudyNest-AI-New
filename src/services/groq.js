const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function generateSummary(text) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Summarize the following notes in simple points:\n\n${text}`,
        },
      ],
    }),
  });

  const data = await response.json();

  return data.choices[0].message.content;
}