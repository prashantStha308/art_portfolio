import {motion} from "motion/react";
import { useNavigate } from "react-router-dom";


const parentVarient = {
	rest: {},
	hover: {},
	tap:{},
}

const textVarient = {
	rest: {
		rotate: 0,
		fontSize: "1rem"
	},
	hover: {
		rotate: -5,
		fontSize: "1.2rem",
		transition:{
			type: "spring",
			damping: 10,
			stiffness: 80
		}
	},
	tap:{
		rotate: -2,
		fontSize: "1.2rem",
		transition:{
			type: "spring",
			damping: 10,
			stiffness: 80
		}
	}
}


const colorMap = {
	0: "bg-amber-300 ",
	1: "bg-amber-200 ",
	2: "bg-amber-100 ",
}

export default function ExploreCta(){

	const navigate = useNavigate();

	const handleClick = ()=>{
		setTimeout(()=> {navigate("/project");}, 150);
	}

	return(
		<motion.button
			className="relative text-amber-900 text-sans w-xs px-4 py-3 isolate shrink-0 h-12"
			variants={parentVarient}
			initial="rest"
			whileHover="hover"
			animate="rest"
			whileTap="tap"

			onClick={handleClick}
		>
			<motion.span
				className="z-10 inline-block font-medium flex gap-1"
				variants={textVarient}
			>
				Explore 
				<span className="hidden md:inline-block" >Projects</span>
			</motion.span>

			{
				Array.from({length: 3}).map((_, index)=>(
					<motion.div
						key={index}
						className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${colorMap[index]} border border-amber-900/45 rounded-lg `}
						variants={{
							rest: {
								rotate: 0,
							},
							hover: {
								rotate: (10 + (index * 10)),
							},
							tap: {
								rotate: (5 + (index * 5)),
							}
						}}

						transition={{
							type: "spring",
							damping: 10,
							stiffness: 80
						}}
					/>

				))
			}

			<motion.div
				className={`absolute top-0 bottom-0 left-0 right-0 -z-20 bg-amber-400 border border-amber-900/45 rounded-lg `}
				variants={textVarient}
			/>

		</motion.button>

	)
}