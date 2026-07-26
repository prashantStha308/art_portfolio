import { BrowserRouter , Routes , Route } from "react-router-dom"
import PostManager from "./pages/main/PostManager.jsx"
import ProjectManager from "./pages/main/ProjectManager.jsx"
import RedirectPage from "./pages/utils/RedirectPage.jsx"
import Post from "./pages/Post.jsx"
import Project from "./pages/Project.jsx"
import CreatePost from "./pages/subDirs/CreatePost.jsx"
import CreateProject from "./pages/subDirs/CreateProject.jsx"
import Home from "./pages/main/Home.jsx"

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
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