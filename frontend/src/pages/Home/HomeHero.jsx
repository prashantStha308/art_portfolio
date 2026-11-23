import { motion } from "motion/react";

import ExploreCta from "../../components/buttons/ExploreCta.jsx";
import HireMeCta from "../../components/buttons/HireMeCta.jsx";

export default function HomeHero(){


	return(
		<section
			id="home"
			className="relative flex flex-col md:flex-row justify-between items-center w-full pt-8 px-6 md:px-20 lg:px-52 gap-8 md:gap-4 md:pt-28 isolate"
		>
			<motion.article
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}

				className="relative flex flex-col gap-2 justify-start order-2 md:order-1 z-10"
			>
				<article className="flex flex-col gap-1" >
					<span className="text-neutral-900/65 dark:text-neutral-100/45 text-base">
						Full-stack developer | Visual design enthusiast
					</span>
					<h1 className="text-5xl text-purple-500 font-bold font-mono">
						Prashant Shrestha
					</h1>
				</article>

				<p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-md mt-2 pl-2 pb-20">
					I build interactive web experiences and occasionally draw things
					that don&apos;t move.
				</p>

				<div className="absolute bottom-0 w-full" >
					<div
						id="CTAs"
						className=" relative flex gap-8 w-full"
					>
						<ExploreCta />
						<HireMeCta />

					</div>
				</div>

			</motion.article>

			<div
				className="relative order-1 md:order-2 isolate z-0"
			>
				<div
					className=" relative w-56 h-56 md:w-64 md:h-64 overflow-hidden  shrink-0"
				>
					<img
						src="https://res.cloudinary.com/dww0antkw/image/upload/v1795455284/self_face_transp_x2mrdm.webp"
						alt="profileImage"
						className="h-full w-full object-cover"
					/>

				</div>

			</div>

		</section>
	)
}