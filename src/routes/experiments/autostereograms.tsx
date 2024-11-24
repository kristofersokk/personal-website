import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const Autostereograms = lazy(() => import('@/components/Autostereograms/Autostereograms'));

export const Route = createFileRoute('/experiments/autostereograms')({
	component: AutostereogramExperiment,
});

function AutostereogramExperiment() {
	return <Autostereograms />;
}

export default AutostereogramExperiment;
