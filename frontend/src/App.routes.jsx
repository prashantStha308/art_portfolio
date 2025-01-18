import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import Post from "./pages/Post";
import ProjectCreation from "./pages/ProjectCreation";
import InfiniteScroll from "./Test";
import { useEffect, useState } from "react";
import { PostStore } from "./store/post.store";

const AppRouter = ({ devMode }) => {

    const [loading, setLoading] = useState(true);
    const [ page , setPage ] = useState(1);
    const [ error , setError ] = useState(false);
    const [ errorMessage , setErrorMessage ] = useState("");
    const { getAllPosts } = PostStore();

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

  return (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/gallery" element={<Gallery loading={loading} error={error} errorMessage={errorMessage} setPage={setPage} page={page} />} />
        <Route path="/project" element= {<Projects />} />
        <Route path="/about" element= {<About />} />
        <Route path="/service" element= {<Services />} />

        <Route path="/gallery/:slog" element= {<Post />} />

        {/* Hidden from users */}
        <Route path="/upload" element={<Upload />} />
        <Route path="createProject" element= {<ProjectCreation />} />
        <Route path="test" element= {<InfiniteScroll />} />

    </Routes>
  )
}

export default AppRouter