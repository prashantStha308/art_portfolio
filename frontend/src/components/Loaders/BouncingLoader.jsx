import { motion } from "motion/react";

const colorMap = {
	0: "bg-purple-200 ",
	1: "bg-purple-300 ",
	2: "bg-purple-400 ",
}

export default function BouncingLoader() {


	return (
		<div className="relative flex flex-col justify-end items-center">
			{
				Array.from({length: 3}).map((_, index) => (
					<motion.div
						animate={{
							width: [`${2 + index/3}rem`, `${1.5 + index/3}rem`, `${2 + index/3}rem`],
							height: [`${2 + index/3}rem`, `${1.5 + index/3}rem`, `${2 + index/3}rem`],
							y: [-2, -30, -2],
						}}
						transition={{
							duration: 0.8,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 0.2 * index,
							repeatDelay: 1
						}}
						className={`absolute ${colorMap[index]} rounded-full`}
					/>
				))
			}

			{/*<div className="w-16 h-1 bg-purple-500 rounded-full mt-1" />*/}
		</div>
	);
}