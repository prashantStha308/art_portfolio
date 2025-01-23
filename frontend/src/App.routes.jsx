import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import PostPage from "./pages/PostPage";
import ProjectCreation from "./pages/ProjectCreation";
import InfiniteScroll from "./Test";
import { useEffect, useState } from "react";
import { PostStore } from "./store/post.store";
import { ProjectStore } from "./store/project.store";
import ProjectPage from "./pages/ProjectPage";
import ProjectPostPage from "./pages/ProjectPostPage";

const AppRouter = () => {

    const [loading, setLoading] = useState(false);
    const [ page , setPage ] = useState(1);
    const [ error , setError ] = useState(false);
    const [ errorMessage , setErrorMessage ] = useState("");
    const { getAllPosts } = PostStore();

    const [ pLoading , setPLoading ] = useState(false);
    const [ pPage , setPPage ] = useState(1);
    const [ pError , setPError ] = useState(false);
    const [ pErrorMessage , setPErrorMessage ] = useState("");
    const { getAllProjects } = ProjectStore();

    useEffect( ()=>{
      async function fetchPosts() {
        setLoading(true);
        try {
          await getAllPosts( page );
        } catch (error) {
          setError(true);
          setErrorMessage(error.message);
        } finally{
          setLoading(false);
        }
      }
      fetchPosts();
    } , [ getAllPosts , page ] );

    useEffect( ()=>{
      async function fetchProject() {
        setPLoading(true);
        try {
          await getAllProjects();
        } catch (error) {
          setPError(true)
          setPErrorMessage(error.message)
        } finally{
          setPLoading(false);
        }
      }
      fetchProject();
    },[ getAllProjects ] );

  return (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/gallery" element={<Gallery loading={loading} error={error} errorMessage={errorMessage} setPage={setPage} page={page} />} />
        <Route path="/project" element= {<Projects loading={pLoading} error={pError} errorMessage={pErrorMessage} />} />
        <Route path="/about" element= {<About />} />
        <Route path="/service" element= {<Services />} />

        <Route path="/gallery/:id" element= {<PostPage />} />
        <Route path="/project/:id" element={ <ProjectPage /> } />
        <Route path="/project/:id/post/:pid" element= {<ProjectPostPage />} />

        {/* Hidden from users */}
        <Route path="/upload" element={<Upload />} />
        <Route path="createProject" element= {<ProjectCreation loading={loading} />} />
        <Route path="test" element= {<InfiniteScroll />} />

    </Routes>
  )
}

export default AppRouter