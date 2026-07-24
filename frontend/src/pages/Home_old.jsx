import { useEffect, useRef, useState } from "react";

import Banner from "../components/Banner";
import CarouselIndicators from "../components/CarouselIndicators";

import img1 from "/assets/traditional/hands_side.jpg";
import img2 from "/assets/traditional/group_face1_side.jpg";
import img3 from "/assets/traditional/frieren_composition.jpg";
import img4 from "/assets/traditional/hands.jpg";

const bannerImages = [img1, img2, img3, img4];


const Home = () => {
	const [current, setCurrent] = useState(0);
	const intervalRef = useRef();

	const startInterval = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % bannerImages.length);
		}, 3000);
	};

	useEffect(() => {
		startInterval();

		return () => clearInterval(intervalRef.current);
	}, []);

	const handleIndicatorClick = (index) => {
		setCurrent(index);
		startInterval();
	};

	return (
		<section className="relative h-full w-full pl-1">

			<section
				id="hero"
				className="w-full"
			>
				
			</section>

			
{/*
			<section className="relative h-full w-full">

				<Banner image={bannerImages[current]} />

				<div className="absolute bg-purple-500 top-0 bottom-0 right-0 h-full w-full opacity-20 mix-blend-color-dodge z-10 pointer-events-none" />

				<div className="absolute bg-gradient-to-t from-purple-900 to-transparent top-0 bottom-0 right-0 h-full w-full opacity-80 mix-blend-multiply z-10 pointer-events-none" />

				<CarouselIndicators
					count={bannerImages.length}
					activeIndex={current}
					onSelect={handleIndicatorClick}
				/>

			</section>*/}

		</section>
	);
};

export default Home;