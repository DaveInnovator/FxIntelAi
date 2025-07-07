const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function generateAIAlert(pair, change) {
  const prompt = `The pair ${pair} moved ${change}% within a short period. Write a short professional trading alert about this volatility.`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional forex trading assistant generating live market alerts.",
        },
        {
          role: "user",
          content: prompt,
        }
      ]
    })
  });

  const result = await res.json();
  return result.choices[0].message.content.trim();
}
