import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const BoxesExperiment = lazy(() => import('@/components/3d/BoxesExperiment'));

export const Route = createFileRoute('/experiments/boxes')({
	component: BoxesTest,
});

function BoxesTest() {
	return <BoxesExperiment />;
}
