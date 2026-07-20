import {motion} from "motion/react";


export default function BouncingLoader(){

	return(
		<div
			className="relative flex flex-col items-center"
		>
			<div
				className="w-8 h-8 bg-purple-500 rounded-full"
			/>

			<div
				className="w-16 h-1 bg-purple-500 rounded-full"
			/>

		</div>
	)
}