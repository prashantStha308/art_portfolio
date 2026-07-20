import { useParams } from "react-router-dom";
import useProjectStore from "../store/project.store";
import { useEffect, useState } from "react";

const Project = () => {

    const {id} = useParams();
    const { getProjectById } = useProjectStore();
    const [ targetProject , setTargetProject ] = useState({});
    const [ error , setError ] = useState({ status: false , message: "" });
    const [ loading , setLoading ] = useState(false);

    useEffect( ()=>{
      const loadProject = async() => {
        try {
          setLoading(true);
          const res = await getProjectById(id);
          if( !res.success ){
            throw new Error(res.message);
          }
          setTargetProject(res.data);
        } catch (error) {
          setError({ status: true , message: error?.message || "Failed to get project" });
        }finally{
          setLoading(false);
        }
      }

      loadProject();

    } , [ id , getProjectById ] )


  return (
    <main>
      Project Title: { targetProject.title }
    </main>
  )
}

export default Project