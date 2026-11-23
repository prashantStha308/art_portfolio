import { useRef } from "react";

import HomeHero from "./Home/HomeHero.jsx";
import ReadMe from "./Home/ReadMe.jsx";
import TechStack from "./Home/TechStack.jsx";
import ToolsUsed from "./Home/ToolsUsed.jsx";
import HomeProjects from "./Home/HomeProjects.jsx";
import HomeContacts from "./Home/HomeContacts.jsx";
import WorkExperience from "./Home/WorkExperience.jsx";
import HomeNavProgress from "./Home/HomeNavProgress.jsx";

import transition from "../utils/pagetransition.jsx";

// _____________________________ TODO: Add a Work Experience Section _____________________________

export default transition (
	function Home() {
		const parentRef = useRef(null);

		return (
			<section
				ref={parentRef}
				className="relative isolate flex flex-col items-center gap-44 h-full w-full pl-1 scroll-smooth"
			>
				<HomeNavProgress parentRef={parentRef} />

				<HomeHero />
				<ReadMe />

				{/*<WorkExperience />*/}

				<section
					id="tools"
					className="w-full flex flex-col items-center gap-16"
				>
					<TechStack />
					<ToolsUsed />
				</section>

				<HomeProjects />
				<HomeContacts />
			</section>
		);
	}
)