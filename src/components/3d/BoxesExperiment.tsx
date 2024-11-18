import ZoomCamera from '@/components/3d/ZoomCamera';
import { HSVtoRGB } from '@/utils/colorUtils';
import { Instance, Instances } from '@react-three/drei/core/Instances';
import { Stats } from '@react-three/drei/core/Stats';
import { PresentationControls } from '@react-three/drei/web/PresentationControls';
import { Canvas } from '@react-three/fiber';
import { FC, Fragment, useRef, useState } from 'react';
import Switch from 'react-switch';
import usePinchZoom from 'react-use/lib/usePinchZoom';
import { Color } from 'three/src/math/Color.js';

function BoxesTest() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [singleDrawCall, setSingleDrawCall] = useState(false);
	const [sideLength, setSideLength] = useState(11);
	const [boxGap, setBoxGap] = useState(0.1);

	const { pinchState } = usePinchZoom(canvasRef);

	return (
		<div className="text-center selection:bg-green-900">
			<header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
				<div className="h-screen w-screen">
					<Canvas ref={canvasRef} className="touch-pinch-zoom">
						<ambientLight intensity={3} />
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
								<BoxesInstances sideLength={sideLength} boxGap={boxGap} />
							) : (
								<Boxes sideLength={sideLength} boxGap={boxGap} />
							)}
						</PresentationControls>
						<Stats />
					</Canvas>
					<div className="absolute top-0 left-0 w-full p-4">
						<div className="flex flex-wrap justify-center gap-3">
							<div className="flex gap-3">
								<span>Use Single Draw Call</span>
								<Switch
									onChange={(checked) => setSingleDrawCall(checked)}
									checked={singleDrawCall}
								/>
							</div>
							<div className="flex gap-3">
								<span>Side length: {sideLength}</span>
								<input
									type="range"
									min="1"
									max="79"
									step="2"
									value={sideLength}
									onChange={(e) => setSideLength(Number(e.target.value))}
								/>
							</div>
							<div className="flex gap-3">
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
							<div className="flex gap-3">
								<span>Pinch state: {pinchState}</span>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

const calculateBox = (
	x: number,
	y: number,
	sideLength: number,
	boxGap: number,
): {
	position: [number, number, number];
	color: Color;
} => {
	const halfSide = (sideLength - 1) / 2;
	let hue = Math.atan2(y - halfSide, x - halfSide) / 2 / Math.PI;
	if (hue < 0) {
		hue += 1;
	}
	const distance = Math.sqrt((x - halfSide) ** 2 + (y - halfSide) ** 2);
	const { r, g, b } = HSVtoRGB(hue + distance * 0.04, 1, 0.3);
	const color = new Color(r / 255, g / 255, b / 255);

	return {
		position: [
			(boxGap + 1) * x - halfSide * (boxGap + 1),
			0,
			(boxGap + 1) * y - halfSide * (boxGap + 1),
		],
		color,
	};
};

const Boxes: FC<{ sideLength: number; boxGap: number }> = ({ sideLength, boxGap }) => {
	return (
		<>
			{[...Array(sideLength).keys()].map((x) => (
				<Fragment key={x}>
					{[...Array(sideLength).keys()].map((y) => {
						const { position, color } = calculateBox(x, y, sideLength, boxGap);
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

const BoxesInstances: FC<{ sideLength: number; boxGap: number }> = ({ sideLength, boxGap }) => {
	return (
		<Instances
			limit={(sideLength + 3) * sideLength} // Optional: max amount of items (for calculating buffer size)
			position={[0, 0, 0]} // Optional: initial position
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial />
			{[...Array(sideLength).keys()].map((x) => (
				<Fragment key={x}>
					{[...Array(sideLength).keys()].map((y) => {
						const { position, color } = calculateBox(x, y, sideLength, boxGap);
						return <Instance key={`${x}-${y}`} position={position} color={color} />;
					})}
				</Fragment>
			))}
		</Instances>
	);
};

export default BoxesTest;
