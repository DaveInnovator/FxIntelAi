import { useVolatilityAlerts } from "../hooks/useVolatilityAlerts";

const severityColors = {
  High: "border-red-500",
  Medium: "border-yellow-500",
  Low: "border-green-500",
};

function Alerts() {
  const alerts = useVolatilityAlerts([ "EUR/USD",
  "USD/JPY",
  "GBP/USD",
  "AUD/USD",
  "NZD/USD",
  "USD/CAD",
  "USD/CHF",
  "EUR/JPY",
  "GBP/JPY",
  "XAU/USD",
  "BTC/USD",]);

  return (
    <section className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-400 mb-6">📢 FX Market Alerts</h2>

      {alerts.length === 0 ? (
        <div className="text-gray-400 text-center">Watching market activity...</div>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl border-l-4 p-4 bg-gray-800 shadow-md ${
                severityColors[alert.severity] || "border-teal-500"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {alert.pair} —{" "}
                  <span className="text-sm text-teal-400 font-normal">
                    {alert.severity} Severity
                  </span>
                </h3>
                <span className="text-sm text-gray-400 mt-1 sm:mt-0">{alert.time}</span>
              </div>
              <p className="text-gray-300 mb-2">{alert.message}</p>
              <span className="text-xs text-teal-500 font-mono">
                Source: {alert.source}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Alerts;
