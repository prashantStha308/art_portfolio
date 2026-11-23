import {motion} from "motion/react";
import StackTile from "../../components/tiles/StackTile";

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


export default function StackSection({stackItems = [], title=""}){
	return(
		<section className="w-full flex flex-col gap-4 justify-center items-center ">
			
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
				{title}
			</motion.h1>

			<motion.div
				variants={staggeringParent}
				initial="hidden" whileInView={"visible"}
				className="flex justify-center flex-wrap gap-2 md:gap-8 md:px-10"
			>
				{
					stackItems.map((item, index) => (
						<StackTile key={index} tech={item} varient={staggeringChildren} />
					))
				}
			</motion.div>

		</section>
	)
}