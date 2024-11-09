import { RefObject, useEffect, useState } from 'react';
import { useMouseWheel, usePinchZoom, usePrevious } from 'react-use';
import useSpring from 'react-use/lib/useSpring';

type UseSmoothScrollValueProps = {
	initialValue: number;
	range: [number, number];
	pinchElement: RefObject<HTMLElement>;
	deltaValue?: number;
};

const useSmoothScrollValue = ({
	initialValue,
	range,
	pinchElement,
	deltaValue = 1,
}: UseSmoothScrollValueProps) => {
	const [value, setValue] = useState(initialValue);

	const interpolatedValue = useSpring(value, 70, 20);

	const mouseWheel = useMouseWheel();
	const prevMouseWheel = usePrevious(mouseWheel);

	const changeValue = (delta: number) => {
		setValue(() => {
			const newValue = value + delta * deltaValue;
			const clampedValue = Math.min(Math.max(newValue, range[0]), range[1]);
			return clampedValue;
		});
	};

	useEffect(() => {
		if (prevMouseWheel !== undefined && prevMouseWheel !== mouseWheel) {
			changeValue((mouseWheel - prevMouseWheel) * -0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	const { pinchState } = usePinchZoom(pinchElement);
	const prevPinchState = usePrevious(pinchState);

	useEffect(() => {
		if (prevPinchState !== undefined && prevPinchState !== pinchState) {
			changeValue((pinchState - prevPinchState) * -0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	return interpolatedValue;
};

export default useSmoothScrollValue;
