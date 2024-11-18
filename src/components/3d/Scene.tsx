import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import { createContext, ReactNode, Suspense, useRef } from 'react';

export const CanvasRefContext = createContext<React.RefObject<HTMLCanvasElement> | null>(null);

function Scene(props: { children: ReactNode | ReactNode[] }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (
		<Suspense
			fallback={
				<div
					id="initial-loading"
					className="absolute text-slate-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
				>
					Loading...
				</div>
			}
		>
			<div className="h-screen w-screen">
				<Canvas
					shadows
					ref={canvasRef}
					className={classNames('transition-opacity duration-300 touch-none')}
				>
					<Suspense>
						<CanvasRefContext.Provider value={canvasRef}>
							{props.children}
						</CanvasRefContext.Provider>
					</Suspense>
				</Canvas>
			</div>
			<Loader
				containerStyles={{
					transform: 'scale(3)',
				}}
			/>
		</Suspense>
	);
}

export default Scene;
