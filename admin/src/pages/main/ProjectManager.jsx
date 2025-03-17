import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import useProjectStore from "../../store/project.store";
import Tile from "../../components/Tile";
import Loading from "../../components/Loader";

const ProjectManager = () => {

  const { projects , getAllProject } = useProjectStore();

  const [ projectItem , setProjectItem ] = useState([]);
  const [ isOpen , setIsOpen ] = useState(false);
  const [ searchWord , setSearchWord ] = useState("");
  const [ error , setError ] = useState({ status: false , message: "" });
  const [ loading , setLoading ] = useState(false);

  // Modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // searching
  const showFilterProject = ( keyword ) => {
    setProjectItem( projects.filter( item => item.title.toLowerCase().includes(keyword.toLowerCase()) || item._id.includes(keyword) && item ) );
  }

  const handleInput = (e)=>{
    const keyword = e.target.value;
    setSearchWord(keyword);
    showFilterProject( keyword );
  }

  useEffect( (()=>{
    const loadProjects = async()=>{
      try {
        setLoading(true);
        const res = await getAllProject();
        if( !res.success ){
          throw new Error( res.message );
        }
        setProjectItem(res.data);
      } catch (error) {
        setError({ status: true , message: error.message || error.response?.message || "Unexpected Error occured while fetching projects" });
      }finally{
        setLoading(false);
      }
    }

    loadProjects();
  }),[ getAllProject ] );

  if( loading){
    return (
      <div className="min-h-screen max-w-screen flex justify-center items-center" >
        <Loading />
      </div>
    )
  }

  return (
    <div>
      {/* Dialog that is controlled by the ref */}
      {
        isOpen &&
        <div className="fixed min-h-screen w-screen bg-white/5 backdrop-blur-3xl flex items-center justify-center z-50">
          <Modal setClose={handleClose} message="This is a message" status="success" />
        </div>
      }
      <a href="#top">
        <div className="bg-white/20 text-2xl rounded-full fixed bottom-4 right-8 z-20">
          <FaRegArrowAltCircleUp size={45} />

          <p className="sr-only"> Go To Top </p>
        </div>
      </a>
      
      <main id="top" className="p-4 grid items-center align-middle ">
      <Header Category={"Project"} handleInput={handleInput} searchWord={searchWord} />
      
      <section>
          {
            projectItem.length === 0
            ?
              <div className="flex justify-center items-center p-18" >
                <h1 className="text-left text-3xl w-96"> No Post found with name or ID: "{searchWord}" </h1>
              </div>
            :
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2" >
                {
                  projectItem.map( ( item , index ) => (
                    <Link key={index} to={`/postpage/${item._id}`} >
                      <Tile item={item} type={"Project"} />
                    </Link>
                  ) )
                }
              </div>
          }
        </section>
      </main>

    </div>
  );
};

export default ProjectManager;
