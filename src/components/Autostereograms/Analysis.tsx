import { getBytesBeautifulString } from '@/utils/stringUtils';
import { useEffect, useMemo, useState } from 'react';
import LineChart from './DerivativesChart';
import useBitmap, { BitMap } from './useBitmap';

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

	const { derivatives, secondDerivatives } = useBitmap(bitmap);

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
			{derivatives && secondDerivatives && (
				<>
					<p className="my-2 text-lg">Derivatives:</p>
					<LineChart values={derivatives.values} min={derivatives.min} />
					<p className="my-2 text-lg">Second derivatives:</p>
					<LineChart values={secondDerivatives.values} min={secondDerivatives.min} />
				</>
			)}
		</div>
	);
}

export default AutostereogramAnalysis;
