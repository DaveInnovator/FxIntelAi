const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function getAIReply(userMessage) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a forex assistant. Keep responses short." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    })
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Groq error:", data);
    return "Groq error: " + (data.error?.message || res.status);
  }

  try {
    return data.choices[0].message.content.trim();
  } catch {
    console.error("Parsing error:", data);
    return "Can't decode response 😬";
  }
}
