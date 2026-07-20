import { useParams } from "react-router-dom"
import { ProjectStore } from "../store/project.store.js";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import PictureTile from "../components/PictureTile.jsx";
import ErrorPage from '../components/ErrorPage.jsx'

const ProjectPage = () => {
    
    const { id } = useParams();
    const { getProjectById } = ProjectStore();

    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] = useState(false);
    const [ errorMessage , setErrorMessage ] = useState("");
    const [ project , setProject ] = useState({});
    const [ posts , setPosts ] = useState([]);

    useEffect( ()=>{
      async function fetchProject(id) {
        setLoading(true);
        try {
          const { success , data , message } = await getProjectById(id);
          setProject(data);
          setPosts(data.posts);
        } catch (error) {
          setError(true);
          setErrorMessage(error.message);
        } finally{
          setLoading(false);
        }
      }
      fetchProject(id);
    }, [id , getProjectById] );

    console.log(posts);

  return (
    <div className="min-h-screen">
      <h1 className="text-gray-600 uppercase text-xl text-center p-5 mb-4 border-b border-b-gray-400 h-fit"> { project ? project.title : 'Unknown Project'  } </h1>

      { error && <ErrorPage title={"Failed to Fetch project, or the Project doesn't exist"} message={errorMessage} /> }
      
      <div className="mb-5 pb-4 md:mb-0 ">
        {
            posts && posts.length > 0 ?
                <div className="px-4 py-5">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                        <Masonry gutter="16px">

                        {
                            posts.map(item => (
                                <Link key={item._id} to={`/project/${id}/post/${item._id}`} >
                                    <PictureTile item={item} fade={true} />
                                </Link>
                            ))
                        }
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            :
            <div>
            <h1 className="text-md text-center text-gray-700"> No Posts </h1>
            </div>
        }
      </div>

    </div>
  )
}

export default ProjectPage;