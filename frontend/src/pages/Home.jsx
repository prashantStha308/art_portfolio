import HomeHero from "./Home/HomeHero.jsx";
import ReadMe from "./Home/ReadMe.jsx";
import TechStack from "./Home/TechStack.jsx";
import ToolsUsed from "./Home/ToolsUsed.jsx";
import HomeProjects from "./Home/HomeProjects.jsx";


export default function Home() {
	return (
		<section className="relative flex flex-col items-center gap-64 h-full w-full pl-1 ">

			<HomeHero />
			<ReadMe />

			<section
				id="tools"
				className="w-full flex flex-col items-center gap-24"
			>
				<TechStack />
				<ToolsUsed />
			</section>

			<HomeProjects />

		</section>
	);
}