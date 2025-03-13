import { BrowserRouter , Routes , Route } from "react-router-dom"
import PostManager from "./pages/PostManager.jsx"
import ProjectManager from "./pages/ProjectManager.jsx"
import RedirectPage from "./pages/RedirectPage.jsx"
import Post from "./pages/Post.jsx"
import Project from "./pages/Project.jsx"
import CreatePost from "./pages/subDirs/CreatePost.jsx"
import CreateProject from "./pages/subDirs/CreateProject.jsx"

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <RedirectPage to={"/post"} /> } />
          <Route path="/post" element={ <PostManager /> } />
          <Route path="/project" element={ <ProjectManager /> } />

          {/* Update */}
          <Route path="/postpage/:id" element={ <Post /> } />
          <Route path="/projectpage/:id" element={ <Project /> } />

          {/* Create */}
          <Route path="/createPost/" element={<CreatePost />} />
          <Route path="/createProject" element={<CreateProject />} />

        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App

/*
At just Rs.2499, gain lifetime access to 12 of our most prestigious and well received IT courses.

Designed for all experience levels, each of our courses delves deep making sure to cover up basic fundamentals to advances topics to ensure that you learn several new concepts or improve upon previous knowledge.

To make it easier for absolute beginners of programming, we have a “Web Development Boot-camp” course tailored  just for you guys. We highly recommend completing this as your first course, as other courses will build upon the concepts taught here.
*/
