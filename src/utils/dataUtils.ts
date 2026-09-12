export function detectPeaks(
	data: number[],
	windowWidth: number,
	minAvgDiffPerc: number = 0,
	threshold: number = 1.0,
) {
	const minY = Math.min(...data);
	const maxY = Math.max(...data);
	const yRange = maxY - minY;

	const peaks = [];
	for (let i = 0; i < data.length; i++) {
		const start = Math.max(0, i - windowWidth / 2);
		const end = Math.min(data.length, i + windowWidth / 2);
		let totalAcc = 0;
		let accumDiff = 0;
		for (let a = start; a < end; a++) {
			if (data[a] <= data[i]) {
				totalAcc++;
			}
			accumDiff += data[i] - data[a];
		}
		const avgDiff = accumDiff / (end - start);
		if (totalAcc / (end - start) >= threshold && (avgDiff / yRange) * 100 >= minAvgDiffPerc) {
			peaks.push({ x: i, avgDiff: (avgDiff / yRange) * 100 });
		}
	}
	return peaks;
}
