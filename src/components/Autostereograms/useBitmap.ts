import { detectPeaks } from '@/utils/dataUtils';
import { combineDeferredValues, Deferred, deferredValue } from '@/utils/deferredUtils';
import { useEffect, useMemo, useState } from 'react';

export type BitMap = {
	byteArray: Uint8ClampedArray;
	width: number;
};

const PIXEL_MATCH_THRESHOLD = 10;

const getImageDerivative = (bitmap: BitMap, shiftWidth: number) => {
	const imageWidth = bitmap.width;
	const imageHeight = bitmap.byteArray.length / (imageWidth * 4);
	const byteArray = bitmap.byteArray;

	let allPixelsCount = (imageWidth - shiftWidth) * imageHeight;
	let matchingPixelsCount = 0;

	for (let x = 0; x < imageWidth - shiftWidth; x += 1) {
		for (let y = 0; y < imageHeight; y += 1) {
			const i = y * imageWidth + x;
			const shiftedI = i + shiftWidth * 4;
			const diff =
				Math.abs(byteArray[i] - byteArray[shiftedI]) +
				Math.abs(byteArray[i + 1] - byteArray[shiftedI + 1]) +
				Math.abs(byteArray[i + 2] - byteArray[shiftedI + 2]);

			if (diff < PIXEL_MATCH_THRESHOLD) {
				matchingPixelsCount++;
			}
		}
	}

	return Math.round((matchingPixelsCount / allPixelsCount) * 10000) / 100;
};

const getImageDerivatives = (bitmap: BitMap, increaseDoneCounter: () => void) => {
	const min = 15;
	const max = bitmap.width / 2 - 15;

	const derivateDeferreds: Deferred<number, Error>[] = [];
	for (let i = min; i < max; i++) {
		derivateDeferreds.push(
			deferredValue(() => getImageDerivative(bitmap, i)).also(increaseDoneCounter),
		);
	}

	const combinedDerivatives = combineDeferredValues(derivateDeferreds);

	return combinedDerivatives.map((derivatives) => ({ min, values: derivatives }));
};

const useBitmap = (bitmap: BitMap | undefined) => {
	const [derivatives, setDerivatives] = useState<{ min: number; values: number[] }>();
	const [doneCounter, setDoneCounter] = useState(0);

	const peaks = useMemo(
		() => (derivatives?.values ? detectPeaks(derivatives.values, 20, 4, 0.95) : undefined),
		[derivatives],
	);

	console.log('Peaks:', peaks);

	useEffect(() => {
		if (bitmap) {
			getImageDerivatives(bitmap, () => {
				// setDoneCounter((prev) => prev + 1);
			}).then(setDerivatives);
		}
	}, [bitmap]);

	if (!bitmap) {
		return {};
	}

	return {
		derivatives,
		doneCounter,
		peaks,
	};
};

export default useBitmap;
