import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/experiments/')({
	pendingComponent: () => <div>Loading...</div>,
	component: Experiments,
});

function Experiments() {
	return (
		<div>
			<p className="text-3xl">Experiments</p>
		</div>
	);
}

export default Experiments;
