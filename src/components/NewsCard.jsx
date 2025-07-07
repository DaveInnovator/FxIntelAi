function NewsCard({ title, source, time, desc, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-gray-800 rounded-xl p-4 hover:ring hover:ring-teal-400 transition-all">
      <h3 className="text-teal-400 font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>{source}</span>
        <span>{time}</span>
      </div>
    </a>
  );
}

export default NewsCard;
