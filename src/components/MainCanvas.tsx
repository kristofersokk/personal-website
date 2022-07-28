import { FC, Fragment, RefObject, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei/web/PresentationControls";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import useMouseWheel from "react-use/lib/useMouseWheel";
import usePrevious from "react-use/lib/usePrevious";
import useSpring from "react-use/lib/useSpring";
import usePinchZoom from "react-use/lib/usePinchZoom";
import { Instance, Instances } from "@react-three/drei/core/Instances";
import { Stats } from "@react-three/drei/core/Stats";
import Switch from "react-switch";
import { Color } from "three/src/math/Color";

type UseSmoothZoomProps = {
	initialZoom: number;
	range: [number, number];
	pinchElement: RefObject<HTMLElement>;
};

const ZOOM_SPEED = 10;

const useSmoothZoom = ({ initialZoom, range, pinchElement }: UseSmoothZoomProps) => {
	const [zoom, setZoom] = useState(initialZoom);

	const interpolatedZoom = useSpring(zoom, 70, 20);

	const mouseWheel = useMouseWheel();
	const prevMouseWheel = usePrevious(mouseWheel);

	const changeZoom = (delta: number) => {
		setZoom(() => {
			const newZoom = zoom + delta * ZOOM_SPEED;
			const clampedZoom = Math.min(Math.max(newZoom, range[0]), range[1]);
			console.log(`New zoom: ${clampedZoom}`);
			return clampedZoom;
		});
	};

	useEffect(() => {
		if (prevMouseWheel !== undefined && prevMouseWheel !== mouseWheel) {
			changeZoom((mouseWheel - prevMouseWheel) * -0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	const { pinchState } = usePinchZoom(pinchElement);
	const prevPinchState = usePrevious(pinchState);
	console.log(pinchState);

	useEffect(() => {
		if (prevPinchState !== undefined && prevPinchState !== pinchState) {
			changeZoom((pinchState - prevPinchState) * -0.01);
		}
	}, [mouseWheel, prevMouseWheel]);

	return interpolatedZoom;
};

const ZoomCamera = ({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement> }) => {
	const zoom = useSmoothZoom({ initialZoom: 6, range: [-120, 0], pinchElement: canvasRef });

	return <PerspectiveCamera makeDefault position={[0, 0, 10 - zoom]} />;
};

const MainCanvas: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [singleDrawCall, setSingleDrawCall] = useState(false);
	const [halfSide, sethalfSide] = useState(10);
	const [boxGap, setBoxGap] = useState(0.1);

	return (
		<div className="h-screen w-screen">
			<Canvas ref={canvasRef}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<ZoomCamera canvasRef={canvasRef} />
				<PresentationControls
					global={false} // Spin globally or by dragging the model
					cursor={true} // Whether to toggle cursor style on drag
					snap={false} // Snap-back to center (can also be a spring config)
					speed={2} // Speed factor
					zoom={1} // Zoom factor when half the polar-max is reached
					rotation={[0.5, 0.5, 0]} // Default rotation
					polar={[-Math.PI / 2 / 3 - 0.5, Math.PI / 2 - 0.5]} // Vertical limits
					azimuth={[-Infinity, Infinity]} // Horizontal limits
					config={{ mass: 0.04, tension: 300, friction: 25 }} // Spring config
				>
					{singleDrawCall ? (
						<BoxesInstances halfSide={halfSide} boxGap={boxGap} />
					) : (
						<Boxes halfSide={halfSide} boxGap={boxGap} />
					)}
				</PresentationControls>
				<Stats />
			</Canvas>
			<div className="absolute top-0 left-0 w-full p-4">
				<div className="flex justify-center gap-3">
					<span>Use Single Draw Call</span>
					<Switch onChange={(checked) => setSingleDrawCall(checked)} checked={singleDrawCall} />
					<span>Half Side: {halfSide}</span>
					<input type="range" min="0" max="80" value={halfSide} onChange={(e) => sethalfSide(Number(e.target.value))} />
					<span>Box gap: {boxGap}</span>
					<input
						type="range"
						min="0"
						max="2"
						step="0.01"
						value={boxGap}
						onChange={(e) => setBoxGap(Number(e.target.value))}
					/>
				</div>
			</div>
		</div>
	);
};

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
 */
function HSVtoRGB(h: number, s: number, v: number) {
	let r = 0,
		g = 0,
		b = 0;
	let i, f, p, q, t;
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0:
			(r = v), (g = t), (b = p);
			break;
		case 1:
			(r = q), (g = v), (b = p);
			break;
		case 2:
			(r = p), (g = v), (b = t);
			break;
		case 3:
			(r = p), (g = q), (b = v);
			break;
		case 4:
			(r = t), (g = p), (b = v);
			break;
		case 5:
			(r = v), (g = p), (b = q);
			break;
	}
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
}

const calculateBox = (
	x: number,
	y: number,
	halfSide: number,
	boxGap: number,
): {
	position: [number, number, number];
	color: Color;
} => {
	let hue = Math.atan2(y - halfSide / 2, x - halfSide / 2) / 2 / Math.PI;
	if (hue < 0) {
		hue += 1;
	}
	const distance = Math.sqrt((x - halfSide / 2) ** 2 + (y - halfSide / 2) ** 2);
	const { r, g, b } = HSVtoRGB(hue + distance * 0.04, 1, 0.3);
	console.log({
		r,
		g,
		b,
	});
	const color = new Color(r / 255, g / 255, b / 255);

	return {
		position: [(boxGap + 1) * x - (halfSide / 2) * (boxGap + 1), 0, (boxGap + 1) * y - (halfSide / 2) * (boxGap + 1)],
		color,
	};
};

const Boxes: FC<{ halfSide: number; boxGap: number }> = ({ halfSide, boxGap }) => {
	return (
		<>
			{[...Array(halfSide + 1).keys()].map((x) => (
				<Fragment key={x}>
					{[...Array(halfSide + 1).keys()].map((y) => {
						const { position, color } = calculateBox(x, y, halfSide, boxGap);
						return (
							<mesh key={`${x}-${y}`} position={position}>
								<boxGeometry args={[1, 1, 1]} />
								<meshStandardMaterial color={color} />
							</mesh>
						);
					})}
				</Fragment>
			))}
		</>
	);
};

const BoxesInstances: FC<{ halfSide: number; boxGap: number }> = ({ halfSide, boxGap }) => {
	return (
		<Instances
			limit={(halfSide + 3) * halfSide} // Optional: max amount of items (for calculating buffer size)
			position={[0, 0, 0]} // Optional: initial position
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial />
			{[...Array(halfSide + 1).keys()].map((x) => (
				<Fragment key={x}>
					{[...Array(halfSide + 1).keys()].map((y) => {
						const { position, color } = calculateBox(x, y, halfSide, boxGap);
						return <Instance key={`${x}-${y}`} position={position} color={color} />;
					})}
				</Fragment>
			))}
		</Instances>
	);
};

export default MainCanvas;
