import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const DeepLinking = lazy(() => import('@/components/DeepLinking/DeepLinking'));

export const Route = createFileRoute('/experiments/deep-linking')({
	component: DeepLinkingExperiment,
});

function DeepLinkingExperiment() {
	return <DeepLinking />;
}
