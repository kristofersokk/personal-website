import Room from '@/components/Room';
import Scene from '@/components/Scene';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return <Scene>{(canvasRef) => <Room canvasRef={canvasRef} />}</Scene>;
}
