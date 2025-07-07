export function checkVolatility(pair, current, previous) {
  const change = Math.abs(current - previous) / previous;
  if (change > 0.01) {
    return {
      pair,
      change: (change * 100).toFixed(2),
      trigger: true
    };
  }
  return { trigger: false };
}
