const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;

export async function fetchPairPrice(pair = "EUR/USD") {
  const [from, to] = pair.split("/");
  const url = `https://api.twelvedata.com/price?symbol=${from}/${to}&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return parseFloat(data.price);
}
