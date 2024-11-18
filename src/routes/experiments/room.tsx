import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const Scene = lazy(() => import('@/components/3d/Scene'));
const Room = lazy(() => import('@/components/3d/Room'));

export const Route = createFileRoute('/experiments/room')({
	component: RoomExperiment,
});

function RoomExperiment() {
	return (
		<Scene>
			<Room />
		</Scene>
	);
}

export default RoomExperiment;
