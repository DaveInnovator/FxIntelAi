function PairCard({ pair, rate, time }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold">{pair}</h2>
      <p className="text-2xl text-teal-400">{Number(rate).toFixed(4)}</p>
      <p className="text-sm text-gray-400">Updated: {new Date(time).toLocaleTimeString()}</p>
    </div>
  );
}

export default PairCard;
