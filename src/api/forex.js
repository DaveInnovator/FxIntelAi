const API_KEY = import.meta.env.VITE_TWELVE_DATA_KEY;
const BASE_URL = "https://api.twelvedata.com";

export async function getForexRate(from = "EUR", to = "USD") {
  const url = `${BASE_URL}/price?symbol=${from}/${to}&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.price) {
    return {
      pair: `${from}/${to}`,
      rate: data.price,
      time: new Date().toISOString()
    };
  } else {
    console.error("Rate fetch failed:", data);
    return {
      pair: `${from}/${to}`,
      rate: "N/A",
      time: "N/A"
    };
  }
}

export async function getIntradaySeries(from = "EUR", to = "USD") {
  const url = `${BASE_URL}/time_series?symbol=${from}/${to}&interval=15min&apikey=${API_KEY}&outputsize=50`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data || !data.values) {
    console.error("No chart data:", data);
    return [];
  }

  const chartData = data.values
    .map((point) => ({
      time: point.datetime.slice(11, 16), // HH:MM
      value: parseFloat(point.open),
    }))
    .reverse(); // oldest to latest

  return chartData;
}
