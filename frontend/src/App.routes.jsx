import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import Post from "./pages/Post";
import ProjectCreation from "./pages/ProjectCreation";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/project" element= {<Projects />} />
        <Route path="/about" element= {<About />} />
        <Route path="/service" element= {<Services />} />

        <Route path="/post/:id" element= {<Post />} />

        {/* Hidden from users */}
        <Route path="/upload" element={<Upload />} />
        <Route path="createProject" element= {<ProjectCreation />} />
    </Routes>
  )
}

export default AppRouter