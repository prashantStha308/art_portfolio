import {motion, scalePoint, useAnimate, warning} from "motion/react";
import { useEffect } from "react";


export default function NotificationTile({
	src="/startled.webp",
	title= "Title here",
	message="Pass in some message to display here"
}){
	const [ scope, animate ] = useAnimate();

	useEffect(()=>{

		const handleSequence = async () => {
			if(!scope.current) return;

			const rect = scope.current.getBoundingClientRect();
			const initialX = window.innerWidth - (window.innerWidth - rect.width)

			// inital case ma
			await animate(scope.current, { x: initialX }, { duration: 0 } );
			await animate(scope.current, { x: 0 }, {
		        type: "spring",
		        stiffness: 300,
		        damping: 20,
		        mass: 1,
			});

			await animate(".loading-loader", { width: [0, "100%"] }, {
		        duration: 3,
		        ease: "easeInOut"
			})
			await animate(".flash", { opacity: [0,1,0] }, {
				duration: 0.75,
				ease: "easeInOut"
			});

			await animate(scope.current, {
				scale: 0.9,
				opacity: 0.8,
				y: 10
			}, {
				duration: 0.75,
				ease: "easeInOut",
			})

			await animate( scope.current, {
				scale: 0.9,
				opacity: 0.8,
				y: 10,
				x: (window.innerWidth - rect.width)
			}, {
				duration: 0.75,
				ease: "easeInOut",
			})
		}

		handleSequence();

	}, [scope.current])

	return(
		<motion.div
			ref={scope}
			className="isolate relative flex flex-col gap-2 border bg-purple-50/45 dark:bg-purple-900/45 backdrop-blur-xl border-purple-900/45 dark:border-purple-400/35 rounded-lg px-4 py-2"
		>
			<div
				className="flex gap-6"
			>
				{/*Left*/}
				<div>
					<img
						src={src} alt="Its done"
						className="aspect-square h-24 object-cover z-[50]"
					/>
				</div>

				{/*Right*/}
				<div
					className="flex flex-col gap-2"
				>
					<h1
						className="z-[50] text-base font-mono font-bold"
					>
						{title}
					</h1>

					<p
						className="w-48 text-sm"
					>
						{message}
					</p>

				</div>
			</div>

			<div
				className="isolate relative w-full h-1 flex items-center"
			>
				<motion.div
					className="absolute top-0 loading-loader h-full w-0 bg-purple-500 rounded-full z-10"
				/>

				<motion.div
					className="absolute top-0 flash h-full w-full rounded-full bg-purple-200 dark:bg-white opacity-0 z-50 "
				/>
				<motion.div
					className="absolute top-0 flash blur-sm w-full h-full rounded-full bg-purple-900 dark:bg-white opacity-0 z-10 "
				/>
			</div>

		</motion.div>
	)
}