// https://pinned.berrysauce.dev/get/prashantStha308
import {Link} from "react-router-dom";

import { useGetPinnedRepos } from "../../queries/proxy.query.js";

import BoxLoader from "../../components/Loaders/BoxLoader";
import ProjectTile from "../../components/tiles/ProjectTile"
import VerticallyStackingButton from "../../components/buttons/VerticallyStackingButton";


export default function HomeProjects(){
	const { data:projects, isLoading, isError, error } = useGetPinnedRepos();


	return(
		<section
			id="homeProjects"
			className="w-full flex flex-col gap-8 justify-center items-center px-2 pr-3"
		>
			<h1 className="text-2xl font-black font-mono text-purple-500" >
				Projects
			</h1>

			<section
				className="flex flex-wrap justify-center gap-2 md:gap-8 md:px-8"
			>
				{
					isLoading ? (
						<div className="w-full flex justify-center p-10" >
							<BoxLoader />
						</div>
					) :
					isError ? (
						<section>
							Error occured: {error.message}
						</section>
					) : (
						projects.length === 0 ?(
							<p>
								No Proects found
							</p>
						) :(
							projects?.slice(0,4)?.map((project, index) => (
								<ProjectTile key={index} project={project} />
							))
						)
					)
				}
			</section>

			<VerticallyStackingButton
				direction="right"
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