import {motion} from "motion/react";


const colorMap = {
	0: "bg-amber-300 ",
	1: "bg-amber-200 ",
	2: "bg-amber-100 ",
}

export default function BoxLoader(){
	return(
		<section
			className="isolate relative"
		>
			{
				Array.from({length: 3}).map((_, index) => (
					<motion.div
						key={index}

						initial={{
							rotate: 0
						}}

						animate={{
							rotate: 45 + (index * 25)
						}}

						transition={{
							type: "spring",
							damping: 10,
							stiffness: 80,
							repeat: Infinity,
							repeatType: "mirror",
							delay: 0.3 * index
						}}
						className={`absolute ${colorMap[index]} h-4 w-16 border border-amber-900/45 rounded-sm`}
					/>

				))
			}
		</section>
	)
}