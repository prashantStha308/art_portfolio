import {motion} from "motion/react";

// eslint-disable-next-line react/prop-types
export default function ImageSkeleton({height}){

	const heightOpt = [ "h-28", "h-36", "h-44", "h-64" ];
	const finalHeight = height ? height : heightOpt[Math.floor(Math.random() * heightOpt.length)];


	return(
		<section
			className={`relative flex  items-start w-full ${finalHeight}  rounded-lg overflow-hidden`}
		>
			<motion.div
				initial={{
					left: "-20%",
				}}
				animate={{
					left: "110%",
				}}
				transition={{
					duration: 1.4,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop",
				}}
				className="absolute top-0 h-full w-10 bg-amber-400/75 blur-lg mix-blend-overlay"
			/>

			<div
				className="h-full w-full bg-purple-300/75 border border-purple-600 rounded-xl"
			/>

		</section>
	)
}