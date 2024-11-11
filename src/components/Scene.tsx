import { Canvas } from '@react-three/fiber';
import classNames from 'classnames';
import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';

function Scene(props: {
	children: (canvasRef: React.RefObject<HTMLCanvasElement>) => React.ReactNode;
	loader?: ReactNode;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Canvas
				shadows
				ref={canvasRef}
				className={classNames('transition-opacity duration-300 touch-none', {
					'blur-lg': isLoading,
					'opacity-100': !isLoading,
					'opacity-0': isLoading,
				})}
			>
				<Suspense fallback={<Handle setIsLoading={setIsLoading} />}>
					{props.children(canvasRef)}
				</Suspense>
			</Canvas>
			{isLoading &&
				(props.loader || (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
						<p
							className={classNames(
								'text-white text-3xl transition-opacity duration-300',
								{
									'opacity-100': isLoading,
									'opacity-0': !isLoading,
								},
							)}
						>
							Loading...
						</p>
					</div>
				))}
		</>
	);
}

function Handle({ setIsLoading }: { setIsLoading: (isLoading: boolean) => void }) {
	useEffect(() => {
		setIsLoading(true);
		return () => setIsLoading(false);
	}, []);

	return null;
}

export default Scene;
