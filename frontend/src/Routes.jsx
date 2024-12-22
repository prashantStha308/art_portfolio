import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Contact from "./pages/Contact"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/project" element= {<Projects />} />
        <Route path="/about" element= {<About />} />
        <Route path="/service" element= {<Services />} />
        <Route path="/contact" element= {<Contact />} />
    </Routes>
  )
}

export default AppRoutes;