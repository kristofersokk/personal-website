import MainPage from '@/components/MainPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return <MainPage />;
}
