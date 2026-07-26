// https://pinned.berrysauce.dev/get/prashantStha308
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import BoxLoader from "../../components/Loaders/BoxLoader";
import ProjectTile from "../../components/tiles/ProjectTile"

import VerticallyStackingButton from "../../components/buttons/VerticallyStackingButton";


export default function HomeProjects(){
	const [isLoading, setIsLoading] = useState(true);
	const [projects, setProjects] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchRawReadMe = async () => {
			const res = await fetch("https://pinned.berrysauce.dev/get/prashantStha308");

			if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
			return await res.json();
		};

		(async () => {
			try {
				setIsLoading(true);
				const projects = await fetchRawReadMe();

				if (isMounted) setProjects(projects);

				console.log("projects", projects)

			} catch (err) {
				console.error("An error occurred", err);
				if (isMounted) setError(err.message);
				
			} finally {
				if (isMounted) setIsLoading(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);


	return(
		<section
			id="homeProjects"
			className="w-full flex flex-col gap-8 justify-center items-center px-2 pr-3"
		>
			<h1 className="text-2xl font-black font-mono text-purple-500" >
				Projects
			</h1>

			<section
				className="flex justify-center flex-wrap gap-2 md:gap-8 md:px-8"
			>
				{
					isLoading ? <BoxLoader /> :
					projects.length === 0 ?(
						<p>
							No Proects found
						</p>
					) :(
						projects?.map((project, index) => (
							<ProjectTile key={index} project={project} />
						))
					)
				}
			</section>

			<VerticallyStackingButton
				direction="right"
				colorMap={{
					0: "bg-purple-300 ",
					1: "bg-purple-400 ",
					2: "bg-purple-500 ",
				}}
				endBoxColor={"bg-purple-200 "}
				textColor="text-white"
			>
				<Link
					to={'/project'}
				>
					Explore more
				</Link>
			</VerticallyStackingButton>

		</section>
	)
}