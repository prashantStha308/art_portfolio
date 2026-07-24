import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const CarouselIndicators = ({ count, activeIndex, onSelect }) => {
	const containerRef = useRef(null);
	const followerRef = useRef(null);
	const buttonRefs = useRef([]);

	useEffect(() => {
		const btn = buttonRefs.current[activeIndex];

		if (!btn || !containerRef.current || !followerRef.current) return;

		const btnRect = btn.getBoundingClientRect();
		const containerRect = containerRef.current.getBoundingClientRect();

		const left = btnRect.left - containerRect.left + btnRect.width / 2 - followerRef.current.offsetWidth / 2;

		const top = btnRect.top - containerRect.top + btnRect.height / 2 - followerRef.current.offsetHeight / 2;

		followerRef.current.style.left = `${left}px`;
		followerRef.current.style.top = `${top}px`;

		followerRef.current.classList.remove("follower-animate");
		void followerRef.current.offsetWidth;
		followerRef.current.classList.add("follower-animate");
	
	}, [activeIndex]);

	return (
	<div
		ref={containerRef}
		className="absolute left-0 right-0 bottom-10 z-30 flex justify-center items-center gap-14"
	>
		{Array.from({ length: count }).map((_, index) => (
		<div
			key={index}
			ref={(el) => (buttonRefs.current[index] = el)}
			onClick={() => onSelect(index)}
			className={`${
			activeIndex === index ? "bg-white" : "bg-purple-500"
			} w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}
		/>
		))}

{/*		<div
		ref={followerRef}
		className="absolute pointer-events-none z-50 w-6 h-6 rounded-full border-2 border-purple-200 transition-[left,top] duration-300 ease-in-out"
		/>*/}
	</div>
	);
};

export default CarouselIndicators;