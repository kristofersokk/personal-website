import { FC, RefObject, useEffect, useRef, useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei/web/PresentationControls";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import useMouseWheel from "react-use/lib/useMouseWheel";
import usePrevious from "react-use/lib/usePrevious";
import useSpring from "react-use/lib/useSpring";
import usePinchZoom from "react-use/lib/usePinchZoom";

type UseSmoothZoomProps = {
	initialZoom: number;
	range: [number, number];
	pinchElement: RefObject<HTMLElement>;
};

const useSmoothZoom = ({ initialZoom, range, pinchElement }: UseSmoothZoomProps) => {
	const [zoom, setZoom] = useState(initialZoom);

	const interpolatedZoom = useSpring(zoom, 70, 20);

	const mouseWheel = useMouseWheel();
	const prevMouseWheel = usePrevious(mouseWheel);

	const changeZoom = (delta: number) => {
		setZoom(() => {
			const newZoom = zoom - delta;
			const clampedZoom = Math.min(Math.max(newZoom, range[0]), range[1]);
			console.log(`New zoom: ${clampedZoom}`);
			return clampedZoom;
		});
	};

	useEffect(() => {
		if (prevMouseWheel !== undefined && prevMouseWheel !== mouseWheel) {
			changeZoom((mouseWheel - prevMouseWheel) * 0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	const { pinchState } = usePinchZoom(pinchElement);
	const prevPinchState = usePrevious(pinchState);
	console.log(pinchState);

	useEffect(() => {
		if (prevPinchState !== undefined && prevPinchState !== pinchState) {
			changeZoom((pinchState - prevPinchState) * 0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	return interpolatedZoom;
};

const MainCanvas: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const zoom = useSmoothZoom({ initialZoom: 1, range: [0, 6], pinchElement: canvasRef });

	return (
		<div className="h-screen w-screen">
			<Canvas ref={canvasRef}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<PerspectiveCamera makeDefault position={[0, 0, 10 - zoom]} />
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
