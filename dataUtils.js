function extractChartData(readings) {
  const labels = [];
  const temps = [];
  const hums = [];
  const presses = [];
  for (const reading of readings) {
    const ts = new Date(reading.timestamp);
    labels.push(ts.toLocaleTimeString('en-GB'));
    temps.push(reading.temperature.toFixed(1));
    hums.push(reading.humidity.toFixed(0));
    presses.push(reading.pressure.toFixed(1));
  }
  return { labels, temps, hums, presses };
}

function sliceReadings(readings, start, windowSize) {
  const s = Math.max(0, start);
  const e = Math.min(readings.length, s + windowSize);
  return readings.slice(s, e);
}

module.exports = { extractChartData, sliceReadings };
