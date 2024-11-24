import { useMemo } from 'react';

export type BitMap = {
	byteArray: Uint8ClampedArray;
	width: number;
};

const PIXEL_MATCH_THRESHOLD = 10;
const MIN_DERIVATIVE_SHIFT = 10;

const getImageDerivative = (bitmap: BitMap, shiftWidth: number) => {
	const imageWidth = bitmap.width;
	const imageHeight = bitmap.byteArray.length / (imageWidth * 4);

	let allPixelsCount = bitmap.byteArray.length;
	let matchingPixelsCount = 0;

	for (let x = 0; x < imageWidth - shiftWidth; x += 1) {
		for (let y = 0; y < imageHeight; y += 1) {
			const i = y * imageWidth + x;
			const shiftedI = i + shiftWidth * 4;
			const diff =
				Math.abs(bitmap.byteArray[i] - bitmap.byteArray[shiftedI]) +
				Math.abs(bitmap.byteArray[i + 1] - bitmap.byteArray[shiftedI + 1]) +
				Math.abs(bitmap.byteArray[i + 2] - bitmap.byteArray[shiftedI + 2]);

			if (diff < PIXEL_MATCH_THRESHOLD) {
				matchingPixelsCount++;
			}
		}
	}

	return (matchingPixelsCount / allPixelsCount / (bitmap.width - shiftWidth)) * bitmap.width;
};

const getImageDerivatives = (bitmap: BitMap) => {
	const derivatives: number[] = [];
	const min = MIN_DERIVATIVE_SHIFT;
	const max = bitmap.width / 2 - 3;
	console.log(bitmap.width, min, max);

	for (let i = min; i < bitmap.width / 2 - 2; i++) {
		derivatives.push(getImageDerivative(bitmap, i));
	}

	return { min, values: derivatives };
};

const getFrequencySums = (derivatives: { values: number[]; min: number }) => {
	const newValues: number[] = [];
	const values = new Array<number>(derivatives.min).fill(0).concat(derivatives.values);
	const minF = 10;
	const maxF = values.length - 1;

	for (let i = minF; i <= maxF; i++) {
		let sum = 0;
		let count = 0;
		for (let j = i; j < maxF; j += i) {
			sum += values[j];
			count++;
		}
		newValues.push(sum / count);
	}

	return { min: minF, values: newValues };
};

const useBitmap = (bitmap: BitMap | undefined) => {
	const derivatives = useMemo(() => (bitmap ? getImageDerivatives(bitmap) : undefined), [bitmap]);

	const secondDerivatives = useMemo(
		() => (derivatives ? getFrequencySums(derivatives) : undefined),
		[derivatives],
	);

	if (!bitmap) {
		return {};
	}

	return {
		derivatives,
		secondDerivatives,
	};
};

export default useBitmap;
