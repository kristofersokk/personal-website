import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

function Scene(props: {
	children: (canvasRef: React.RefObject<HTMLCanvasElement>) => React.ReactNode;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (
		<Canvas shadows ref={canvasRef}>
			{props.children(canvasRef)}
		</Canvas>
	);
}

export default Scene;
