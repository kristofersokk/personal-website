import type { FC } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";

const MainCanvas: FC = () => {
	return (
		<div className="h-screen w-screen">
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<PerspectiveCamera makeDefault position={[0, 0, -3]}>
					<PresentationControls
						global={false} // Spin globally or by dragging the model
						cursor={true} // Whether to toggle cursor style on drag
						snap={false} // Snap-back to center (can also be a spring config)
						speed={2.5} // Speed factor
						zoom={1} // Zoom factor when half the polar-max is reached
						rotation={[0, 0, 0]} // Default rotation
						polar={[-Math.PI / 2 / 4, Math.PI / 2]} // Vertical limits
						azimuth={[-Infinity, Infinity]} // Horizontal limits
						config={{ mass: 0.04, tension: 300, friction: 25 }} // Spring config
					>
						<Box position={[0, 0, 0]} />
					</PresentationControls>
				</PerspectiveCamera>
			</Canvas>
		</div>
	);
};

const Box: FC<MeshProps> = (props) => {
	return (
		<mesh {...props}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={"orange"} />
		</mesh>
	);
};

export default MainCanvas;
