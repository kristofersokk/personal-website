import useSmoothScrollValue from '@/hooks/useSmoothScrollValue';
import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera';
import { RefObject } from 'react';

const ZoomCamera = ({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement> }) => {
	const zoom = useSmoothScrollValue({
		initialValue: 0,
		range: [-120, 0],
		pinchElement: canvasRef,
	});

	return <PerspectiveCamera makeDefault position={[0, 0, 10 - zoom]} />;
};

export default ZoomCamera;
