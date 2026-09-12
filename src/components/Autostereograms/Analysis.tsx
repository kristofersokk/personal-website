import { getBytesBeautifulString } from '@/utils/stringUtils';
import { useEffect, useMemo, useState } from 'react';
import {
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Scatter,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import useBitmap, { BitMap } from './useBitmap';
import { max } from 'three/webgpu';

export interface AutostereogramAnalysisProps {
	image: File;
	imageWidth: number;
	imageHeight: number;
}

function AutostereogramAnalysis({ image, imageWidth, imageHeight }: AutostereogramAnalysisProps) {
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();
	const ctx = canvas?.getContext('2d');

	const [byteArray, setByteArray] = useState<Uint8ClampedArray | null>(null);
	const byteArrayLength = byteArray?.length;

	const bitmap: BitMap | undefined = useMemo(
		() => (byteArray ? { byteArray, width: imageWidth } : undefined),
		[byteArray],
	);

	const drawNewImage = async () => {
		const imageBitmap = await createImageBitmap(image);
		ctx!.drawImage(imageBitmap, 0, 0);
		setByteArray(ctx!.getImageData(0, 0, imageWidth, imageHeight).data);
	};

	useEffect(() => {
		if (ctx && image) {
			drawNewImage();
		}
	}, [ctx, image]);

	const { derivatives, doneCounter, peaks } = useBitmap(bitmap);

	const maxPeak = peaks?.reduce(
		(max, peak) => (peak.avgDiff > (max?.avgDiff || 0) ? peak : max),
		undefined as
			| {
					x: number;
					avgDiff: number;
			  }
			| undefined,
	);

	console.log('Derivatives:', derivatives);

	return (
		<div>
			<p>Image name: {image.name}</p>
			<p>Image width: {imageWidth}</p>
			<p>Image height: {imageHeight}</p>
			<p>Bitmap size: {byteArrayLength ? getBytesBeautifulString(byteArrayLength) : ''}</p>
			<canvas
				ref={(canvasEl) => {
					if (!canvas && canvasEl) {
						setCanvas(canvasEl);
					}
				}}
				width={imageWidth}
				height={imageHeight}
				className="hidden"
			/>
			<p className="my-2 text-lg">Derivatives:</p>
			<p className="mb-2">Progress: {doneCounter}</p>
			{derivatives && (
				<ComposedChart
					className="bg-white overflow-auto"
					width={730}
					height={300}
					data={derivatives.values.map((value, index) => ({
						x: index + derivatives.min,
						y: value,
						peakY: peaks?.some((peak) => peak.x === index) ? value : undefined,
						maxPeakY: index === maxPeak?.x ? value : undefined,
					}))}
					margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
				>
					<XAxis dataKey="x" />
					<YAxis
						domain={([dataMin, dataMax]) => {
							const diff = Math.round(dataMax - dataMin);
							return [Math.max(0, dataMin - diff * 0.1), dataMax + diff * 0.1];
						}}
					/>
					<Tooltip />
					<CartesianGrid stroke="#ddd" />
					<Line
						type="monotone"
						dataKey="y"
						stroke="#8884d8"
						strokeWidth={2}
						dot={false}
					/>
					<Scatter dataKey="peakY" fill="#889458" />
					<Scatter dataKey="maxPeakY" fill="#ff4300" />
				</ComposedChart>
			)}
		</div>
	);
}

export default AutostereogramAnalysis;
