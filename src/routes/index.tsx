import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/nav-bar";
import { Features } from "@/components/features";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="relative min-h-dvh w-dvw overflow-x-hidden">
			<NavBar />
			<Hero />
			<About />
			<Features />
		</main>
	);
}
