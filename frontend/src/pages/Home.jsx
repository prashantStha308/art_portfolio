import HomeHero from "./Home/HomeHero.jsx";
import ReadMe from "./Home/ReadMe.jsx";
import TechStack from "./Home/TechStack.jsx";
import ToolsUsed from "./Home/ToolsUsed.jsx";
import HomeProjects from "./Home/HomeProjects.jsx";
import HomeContacts from "./Home/HomeContacts.jsx";


export default function Home() {
	return (
		<section className="relative flex flex-col items-center gap-64 h-full w-full pl-1 scroll-smooth">

			<HomeHero />

			<ReadMe />

			<section
				id="tools"
				className="w-full flex flex-col items-center gap-20"
			>
				<TechStack />
				<ToolsUsed />
			</section>

			<HomeProjects />

			<HomeContacts />
		</section>
	);
}