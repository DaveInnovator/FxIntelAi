const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export async function getForexNews() {
  const res = await fetch(
    `${BASE_URL}/everything?q=forex trading OR currency exchange&language=en&sortBy=publishedAt&pageSize=10&domains=forexlive.com,investing.com,bloomberg.com,reuters.com&apiKey=${API_KEY}`

  );
  const data = await res.json();

  if (!data.articles) {
    console.error("News fetch failed:", data);
    return [];
  }

 return data.articles.map((item) => ({
  title: item.title || "No title",
  source: item.source?.name || "Unknown Source",
  time: item.publishedAt || "N/A",
  desc: item.description || "No description",
  url: item.url || "#",
}));
}