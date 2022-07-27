import { FC, lazy, Suspense } from "react";

const MainCanvas = lazy(() => import("./components/MainCanvas"));

const App: FC = () => {
	return (
		<div className="text-center selection:bg-green-900">
			<header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
				<Suspense fallback={<div>Loading...</div>}>
					<MainCanvas />
				</Suspense>
			</header>
		</div>
	);
};

export default App;
