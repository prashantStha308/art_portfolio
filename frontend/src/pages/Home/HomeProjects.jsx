// https://pinned.berrysauce.dev/get/prashantStha308
import {Link} from "react-router-dom";
import {motion} from "motion/react";

import { useGetPinnedRepos } from "../../queries/proxy.query.js";

import BoxLoader from "../../components/Loaders/BoxLoader";
import ProjectTile from "../../components/tiles/ProjectTile"
import VerticallyStackingButton from "../../components/buttons/VerticallyStackingButton";



const staggeringParent ={
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const staggeringChildren = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0 },
}


export default function HomeProjects(){
	const { data:projects, isLoading, isError, error } = useGetPinnedRepos();


	return(
		<section
			id="Projects"
			className="w-full flex flex-col gap-8 justify-center items-center px-2 pr-3"
		>
			<motion.h1

				initial={{
					opacity: 0,
					y: 16
				}}

				whileInView={{
					opacity: 1, y:0
				}}

				transition={{
					type: "spring",
					damping: 10,
					stiffness: 80
				}}

				className="text-2xl font-black font-mono text-purple-500"
			>
				Projects
			</motion.h1>

			<motion.section
				variants={staggeringParent}
				initial={"hidden"}
				whileInView={"visible"}
				className="flex flex-wrap justify-center gap-2 md:gap-8 md:px-8"
			>
				{
					isLoading ? (
						<div className="w-full flex justify-center p-10" >
							<BoxLoader />
						</div>
					) :
					isError ? (
						<>
							Error occured: {error.message}
						</>
					) : (
						projects.length === 0 ?(
							<p>
								No Projects found
							</p>
						) :(
							projects?.slice(0,4)?.map((project, index) => (
								<ProjectTile key={index} project={project} variants={staggeringChildren} />
							))
						)
					)
				}
			</motion.section>

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