import { Routes , Route } from "react-router-dom";

import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Gallery from "./pages/Gallery";
import PostPage from "./pages/PostPage";

import ProjectPage from "./pages/ProjectPage";
import ProjectPostPage from "./pages/ProjectPostPage";

import Test from "./pages/Test";

const AppRouter = () => {


  return (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/project" element= {<Projects/>} />
        <Route path="/about" element= {<About />} />
        <Route path="/service" element= {<Services />} />

        <Route path="/gallery/:id" element= {<PostPage />} />
        <Route path="/project/:id" element={ <ProjectPage /> } />
        <Route path="/project/:id/post/:pid" element= {<ProjectPostPage />} />

        {/* Hidden from users */}

        <Route path="test" element= {<Test />} /> 

    </Routes>
  )
}

export default AppRouter