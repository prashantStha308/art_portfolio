import { useEffect, useState } from 'react';
import ImageSelector from "../components/ImageSelector";
import { ProjectStore } from '../store/project.store';
import Modal from '../components/Modal';
import Loading from '../components/Loader';

const ProjectCreation = ({ loading = true }) => {
  // seletcedImage is to be an array of objects
  const [ selectedImage , setSelectedImage ] = useState([]);
  const [ selectedWoId , setSelectedWoId ] = useState([]);
  const [ selector , setSelector ] = useState(false);
  const [ uploadLoading , setUploadLoading ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ modalTitle , setModalTitle ] = useState("");
  const [ modalMessage , setModalMessage ] = useState("");
  const [ modalSuccess , setModalSuccess ] = useState(false);

  const { createProject } = ProjectStore();

  const closeSelector = ()=>{
    setSelector(false);
  }

  const closeModal = ()=>{
    setIsOpen(false);
  }

  useEffect( ()=>{
    const updateSelectedWoId = () => {
      const updatedArray = selectedImage.map(({ _id, ...rest }) => rest);
      setSelectedWoId(updatedArray);
    };
    updateSelectedWoId();
  },[selectedImage])

  const handleForm = async (e)=>{
    e.preventDefault();
    if( e.target.title.value ){
      const newProject = {
        title: e.target.title.value,
        decription: e.target.description.value || "",
        posts: [...selectedWoId],
        thumbnail: selectedWoId[0].thumbnail || ""
      }

      setUploadLoading(true);
      const res = await createProject(newProject);
      setUploadLoading(false);
      setIsOpen(true);

      if( res.success ){
        setModalSuccess(true);
        setModalTitle('Project Created Successfully');
        setModalMessage(res.message);
        e.target.reset();
        setSelectedImage([]);
      }else{
        setModalSuccess(false);
        setModalTitle('Failed to Create Project. Please try again');
        setModalMessage(res.message);
      }
    }else{
      console.error("Required Fields not met");
    }
  }

  return (
    <div className="relative h-full w-full">

    {/* Loader */}
      { uploadLoading && <Loading /> }

      {/* Modal */}
      { isOpen && <Modal onClose={closeModal} title={modalTitle} message={modalMessage} success={modalSuccess} /> }

      {/* Image Selector */}
      { selector && <ImageSelector onClose={closeSelector} selectedImage={selectedImage} selected={selectedImage} setSelected={setSelectedImage} isLoading={loading}  /> }

      <div className="text-3xl font-bold text-gray-800 text-center">Project Creation</div>

      {/* from section */}
      <section>
        <form className="grid gap-4" onSubmit={handleForm}>
          <label className='grid' >
            Project Name:
            <input type="text" name="title" id="projectText" className=' border border-gray-600 rounded-lg block w-full p-2.5 outline-none' />
          </label>

          <label className="grid">
            Description:
            <textarea name="description" id="projectDescription" className=' border border-gray-600 rounded-lg block w-full p-2.5 outline-none' ></textarea>
          </label>

          <div className='grid gap-8'>
            <label>
              Select Artworks : <button className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md" type="button" onClick={()=>(
                setSelector(true)
              )}> Select </button>
            </label>
            <div className='break-all'>
              {
                selectedImage.map( ( item , index ) => (
                  index !== selectedImage.length - 1 ? item.title + ", " : item.title
                 ) )
              }
            </div>
          </div>

          <input type="submit" value="Submit" className='text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md'/>
          
        </form>
      </section>

    </div>

  )
}

export default ProjectCreation