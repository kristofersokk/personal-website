import useSmoothScrollValue from '@/hooks/useSmoothScrollValue';
import { PerspectiveCamera } from '@react-three/drei/core';
import { PresentationControls } from '@react-three/drei/web/PresentationControls';
import { useState } from 'react';
import { DirectionalLightShadow } from 'three/src/lights/DirectionalLightShadow.js';

import Table from './Table';
import Wall from './Wall';
import { useThree } from '@react-three/fiber';

function Room({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) {
	const cameraPosDelta = useSmoothScrollValue({
		initialValue: 0,
		range: [-2, 4],
		pinchElement: canvasRef,
		deltaValue: 0.1,
	});

	const glRenderer = useThree((three) => three.gl);

	const [directionalLightShadow] = useState(new DirectionalLightShadow());
	const maxMapSize = glRenderer.capabilities.maxTextureSize;
	directionalLightShadow.mapSize.set(maxMapSize, maxMapSize);
	directionalLightShadow.camera.near = 5;
	directionalLightShadow.camera.far = 20;
	directionalLightShadow.radius = 1000;

	return (
		<>
			<PerspectiveCamera makeDefault position={[0, 1.3, 1.5 - cameraPosDelta]} zoom={1} />
			<PresentationControls
				global={false} // Spin globally or by dragging the model
				cursor={true} // Whether to toggle cursor style on drag
				snap={false} // Snap-back to center (can also be a spring config)
				// speed={2} // Speed factor
				// rotation={[0, 3.1415, 0]} // Default rotation
				polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
				azimuth={[-Infinity, Infinity]} // Horizontal limits
				config={{ mass: 0.04, tension: 300, friction: 25 }} // Spring config
			>
				{/* <axesHelper args={[5]} /> */}
				<ambientLight intensity={0.25} />
				{/* <directionalLight
					position={[5, 3, 1.5]}
					intensity={4}
					castShadow
					shadow={directionalLightShadow}
				/> */}
				{/* <Environment preset="dawn" background /> */}
				<Table />
				<Wall />
			</PresentationControls>
		</>
	);
}

export default Room;
