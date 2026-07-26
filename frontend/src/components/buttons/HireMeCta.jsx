import {motion} from "motion/react";
import { useNavigate } from "react-router-dom";


const parentVarient = {
	rest: {},
	hover: {}
}

const textVarient = {
	rest: {
		rotate: 0,
		fontSize: "1rem"
	},
	hover: {
		rotate: 5,
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
	0: "bg-purple-300 ",
	1: "bg-purple-400 ",
	2: "bg-purple-500 ",
}

export default function HireMeCta(){

	const navigate = useNavigate();

	const handleClick = ()=>{
		setTimeout(()=> { navigate("/") }, 150)
	}

	return(
		<motion.a
			href="#contacts"
			className="relative text-white text-sans w-sm px-12 py-3 isolate shrink-0 h-12"
			variants={parentVarient}
			initial="rest"
			whileHover="hover"
			animate="rest"
			whileTap="tap"
		>
			<motion.span
				className="z-10 inline-block font-medium"
				variants={textVarient}
			>
				Hire Me
			</motion.span>

			{
				Array.from({length: 3}).map((_, index)=>(
					<motion.div
						key={index}
						className={`absolute top-0 bottom-0 left-0 right-0 -z-10 ${colorMap[index]} border border-purple-900/45 rounded-lg `}
						variants={{
							rest: {
								rotate: 0,
							},
							hover: {
								rotate: -(10 + (index * 10)),
							},
							tap: {
								rotate: -(5 + (index * 5)),
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
				className={`absolute top-0 bottom-0 left-0 right-0 -z-20 bg-purple-200 border border-purple-900/45 rounded-lg `}
				variants={textVarient}
			/>

		</motion.a>

	)
}