/**
 * Jest tests verifying extractChartData converts sensor readings
 * into correctly formatted arrays for chart labels, temperatures,
 * humidities, and pressures.
 */
const { extractChartData, sliceReadings } = require('./dataUtils');

describe('extractChartData', () => {
  const sampleReadings = [
    { timestamp: '2024-01-01T12:00:00Z', temperature: 20.123, humidity: 49.6, pressure: 1012.34 },
    { timestamp: '2024-01-01T13:00:00Z', temperature: 21.789, humidity: 50.4, pressure: 1010.12 }
  ];

  test('returns arrays matching number of readings', () => {
    const result = extractChartData(sampleReadings);
    expect(result.labels).toHaveLength(sampleReadings.length);
    expect(result.temps).toHaveLength(sampleReadings.length);
    expect(result.hums).toHaveLength(sampleReadings.length);
    expect(result.presses).toHaveLength(sampleReadings.length);
  });

  test('formats values and timestamps correctly', () => {
    const result = extractChartData(sampleReadings);
    const expectedLabels = sampleReadings.map(r => new Date(r.timestamp).toLocaleTimeString('en-GB'));
    expect(result.labels).toEqual(expectedLabels);
    expect(result.temps).toEqual(['20.1', '21.8']);
    expect(result.hums).toEqual(['50', '50']);
    expect(result.presses).toEqual(['1012.3', '1010.1']);
  });
});

describe('sliceReadings', () => {
  const readings = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }
  ];

  test('returns a window of the desired size', () => {
    const result = sliceReadings(readings, 1, 3);
    expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);
  });

  test('clamps the window to valid bounds', () => {
    const result = sliceReadings(readings, -2, 10);
    expect(result).toEqual(readings);
  });
});
