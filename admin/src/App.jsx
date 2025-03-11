import { BrowserRouter , Routes , Route } from "react-router-dom"
import PostManager from "./pages/PostManager"
import ProjectManager from "./pages/ProjectManager"
import RedirectPage from "./pages/RedirectPage"

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <RedirectPage to={"/post"} /> } />
          <Route path="/post" element={ <PostManager /> } />
          <Route path="/project" element={ <ProjectManager /> } />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
