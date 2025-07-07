import { useEffect, useState } from "react";


const getPrice = (pair) => {
  const mockPrices = {
    "EUR/USD": 1.1050,
    "USD/JPY": 141.8,
    "GBP/USD": 1.2750,
  };
  return mockPrices[pair] || 1.0;
};


const generateAIAlert = (pair, change) => {
  return `📈 ${pair} moved ${change}%. Possible market shift. Stay alert.`;
};

export function useVolatilityAlerts(pairs = []) {
  const [alerts, setAlerts] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});

  useEffect(() => {
    const fetchAlerts = async () => {
      const newAlerts = [];

      for (const pair of pairs) {
        const current = getPrice(pair);
        const prev = previousPrices[pair] || current - 0.015; // Force fake spike

        const change = Math.abs(current - prev) / prev;
        const percentage = (change * 100).toFixed(2);

        if (change >= 0.01) {
          const message = generateAIAlert(pair, percentage);

          newAlerts.push({
            id: `${pair}-${Date.now()}`,
            pair,
            message,
            severity: change > 0.015 ? "High" : "Medium",
            source: "AI",
            time: new Date().toLocaleTimeString(),
          });
        }

        setPreviousPrices((prevMap) => ({
          ...prevMap,
          [pair]: current,
        }));
      }

      setAlerts((prevAlerts) => [...prevAlerts, ...newAlerts]);
    };

    fetchAlerts();

    
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, [pairs]);

  return alerts;
}
