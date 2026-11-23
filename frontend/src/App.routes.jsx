import { Routes , Route, useLocation } from "react-router-dom";

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Gallery from "./pages/Gallery"
import ResumePage from "./pages/ResumePage";

import Test from "./pages/Test";
import { AnimatePresence } from "motion/react";
import { useLayoutEffect } from "react";

const AppRouter = () => {
	const location = useLocation();

	useLayoutEffect(()=>{
		document.getElementById("scroll-container").scrollTo(0,0);
	}, [location.pathname])

	return (
		<AnimatePresence mode="wait" >
			<Routes key={location.pathname} location={location} >
					<Route path="/" element = {<Home />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/project" element= {<Projects/>} />
					<Route path="/about" element= {<About />} />
					<Route path="/resume" element= {<ResumePage />} />

					<Route path="/test" element= {<Test />} />

			</Routes>
		</AnimatePresence>
	)
}

export default AppRouter