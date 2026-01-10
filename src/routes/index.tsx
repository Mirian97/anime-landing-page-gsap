import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="relative min-h-dvh w-dvw overflow-x-hidden">
			<Hero />
			<section className="min-h-screen z-0 bg-blue-500"></section>
		</main>
	);
}
