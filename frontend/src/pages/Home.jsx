import HomeHero from "./Home/HomeHero.jsx";
import ReadMe from "./Home/ReadMe.jsx";


export default function Home() {
	return (
		<section className="relative flex flex-col items-center gap-36 h-full w-full pl-1">

			<HomeHero />

			<ReadMe />

		</section>
	);
}