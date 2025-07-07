import { useEffect, useState } from "react";
import { getForexRate, getIntradaySeries } from "../api/forex";
import PairCard from "../components/PairCard";
import ForexChart from "../components/ForexChart";
import NewsCard from "../components/NewsCard";
import { getForexNews } from "../api/news";

const Dashboard = () => {
  const [rates, setRates] = useState([]);
  const [selectedPair, setSelectedPair] = useState(["EUR", "USD"]);
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);

  const pairs = [
    ["EUR", "USD"],
    ["USD", "JPY"],
    ["GBP", "USD"],
    ["USD", "CHF"],
    ["AUD", "USD"],
    ["USD", "CAD"],
  ];

  useEffect(() => {
    const fetchRatesThrottled = async () => {
      const rateList = [];

      for (let i = 0; i < pairs.length; i++) {
        const [from, to] = pairs[i];
        try {
          const rate = await getForexRate(from, to);
          rateList.push(rate);
        } catch (err) {
          rateList.push({ pair: `${from}/${to}`, rate: "N/A", time: "N/A" });
        }

       
        await new Promise((res) => setTimeout(res, 1000));
      }

      setRates(rateList);
    };

    fetchRatesThrottled();
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const data = await getIntradaySeries(selectedPair[0], selectedPair[1]);
        setChartData(data);
      } catch (err) {
        console.error("Chart data fetch failed:", err);
      }
    };

    fetchChart();
  }, [selectedPair]);

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await getForexNews();
      setNews(articles);
    };

    fetchNews();
  }, []);

  return (
    <div className="px-4 md:px-8 py-6 space-y-8">
      <h1 className="text-3xl font-bold text-teal-400">📊 Live Forex Dashboard</h1>

      {/* FX Pair Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rates.map((rate, i) => (
          <div key={i} onClick={() => setSelectedPair(pairs[i])} className="cursor-pointer hover:ring ring-teal-400 transition-all">
            <PairCard {...rate} />
          </div>
        ))}
      </div>

      {/* Chart */}
      <ForexChart data={chartData} pair={`${selectedPair[0]}/${selectedPair[1]}`} />

      {/* News */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-teal-300 mb-4">📰 Market News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.length > 0 ? (
            news.map((article, i) => <NewsCard key={i} {...article} />)
          ) : (
            <p className="text-gray-500">Loading market news...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
