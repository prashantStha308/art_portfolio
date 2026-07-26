import { motion } from "framer-motion";

import ExploreCta from "../../components/buttons/ExploreCta.jsx";
import HireMeCta from "../../components/buttons/HireMeCta.jsx";

const parentVarient = {
	initial:{
		opacity: 0,
		y: 12
	},
	animate:{
		opacity: 1,
		y: 0
	},
	hover:{}
}

export default function HomeHero(){
	return(
		<section
			id="hero"
			className="relative flex flex-col md:flex-row justify-between items-center w-full pt-8 px-6 md:px-20 lg:px-52 gap-8 md:gap-4 md:pt-28 isolate"
		>
			<motion.article
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}

				className="relative flex flex-col gap-2 justify-start order-2 md:order-1 z-10"
			>
				<article className="flex flex-col gap-1" >
					<span className="text-neutral-900/65 dark:text-neutral-100/45 text-sm">
						Full-stack developer | Visual design enthusiast
					</span>
					<h1 className="text-5xl text-purple-500 font-bold font-mono">
						Prashant Shrestha
					</h1>
				</article>

				<p className="text-neutral-700 dark:text-neutral-300 max-w-md mt-2 pb-16">
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

			<motion.div
				variants={parentVarient}
				initial="initial"
				animate="animate"
				whileHover="hover"
				transition={{
					duration: 0.5,
					ease: "easeOut",
					delay: 0.1
				}}

				className="relative order-1 md:order-2 isolate z-0"
			>
				<motion.div
					variants={{
						initial: {},
						hover:{
							scale: 0.9
						}
					}}
					transition={{
						type: "spring",
						damping: 10,
						stiffness: 80
					}}
					whileHover="hover"
					className=" relative w-56 h-56 md:w-64 md:h-64 overflow-hidden rounded-full shrink-0"
				>
					<motion.img
						src="/self-portrait.jpeg"
						alt="profileImage"
						className="h-full w-full object-cover"
					/>

				</motion.div>

				<motion.div
					variants={{
						initial:{
							x: 0
						},
						hover:{
							x: -25
						}
					}}

					transition={{
						type: "spring",
						damping: 10,
						stiffness: 80
					}}

					className="absolute top-0 left-0 bg-purple-100 rounded-full h-full w-full -z-10"
				/>

				<motion.div
					variants={{
						initial:{
							x: 0,
							y:0
						},
						hover:{
							x: -25,
							y:-25
						}
					}}

					transition={{
						type: "spring",
						damping: 10,
						stiffness: 80
					}}

					className="absolute top-0 left-0 bg-purple-300 rounded-full h-full w-full -z-10"
				/>


				<motion.div
					variants={{
						initial:{
							x: 0,
							y:0
						},
						hover:{
							x: 25,
							y:-25
						}
					}}

					transition={{
						type: "spring",
						damping: 10,
						stiffness: 80
					}}

					className="absolute top-0 left-0 bg-pink-300 rounded-full h-full w-full -z-10"
				/>

				<motion.div
					variants={{
						initial:{
							x: 0,
							y:0
						},
						hover:{
							x: 5,
							y: 25
						}
					}}

					transition={{
						type: "spring",
						damping: 10,
						stiffness: 80
					}}

					className="absolute top-0 left-0 bg-amber-200 rounded-full h-full w-full -z-10"
				/>

			</motion.div>


		</section>
	)
}