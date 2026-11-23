import { motion } from "motion/react";


const purpleParent = {
	hidden: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
}

const purpleChildVarient = {
	hidden: {
		scaleY: 0,
		transition:{
			duration: 0.5, ease:[ 0.17,0.67,0.8,0.52 ]
		}
	},
	visible: {
		scaleY: 1,
		transition: {
			duration: 0.5, ease:[ 0.17,0.67,0.8,0.52 ]
		}
	},
}

function transition(Component){
	return function TransitionWrapper(){
		return(
			<>
				<Component />

				<motion.div
					className="slide-in bg-purple-900 relative z-[999]"
					initial={{scaleY: 0}}
					animate={{scaleY: 0}}
					exit={{scaleY: 1}}
					transition={{
						duration: 0.5, ease:[ .17,.67,.83,.67 ]
					}}
				/>

				<motion.div
					className="slide-out bg-purple-900 relative z-[999]"
					initial={{scaleY: 1}}
					animate={{scaleY: 0}}
					exit={{scaleY: 0}}
					transition={{
						duration: 0.5, ease:[ .17,.67,.83,.67 ]
					}}
				/>
			</>
		)
  }
}

export default transition;