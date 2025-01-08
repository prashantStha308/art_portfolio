import { useState } from "react";
import ImageSelector from "../components/ImageSelector";

const ProjectCreation = () => {
  const [ selectedImage , setSelectedImage ] = useState([]);
  const [ selector , setSelector ] = useState(false);

  const closeSelector = ()=>{
    setSelector(false);
  }

  const openSelector = ()=>{
    setSelector(true);
  }

  const handleForm = (e)=>{
    e.preventDefault();
  }

  return (
    <div className="relative h-full w-full">
      { selector && <ImageSelector onClose={closeSelector} setSelected={setSelectedImage} /> }
      <div className="text-3xl font-bold text-gray-800 text-center">Project Creation</div>
      <section>
        <form className="grid gap-4" encType="multipart/form-data">
          <label>
            Project Name:
            <input type="text" name="title" id="projectText" />
          </label>

          <label className="grid">
            Description:
            <textarea name="description" id="projectDescription"></textarea>
          </label>
          
          <label>
            Select Artworks : <button className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md" type="button" onClick={openSelector}> Select </button>
          </label>
          
        </form>
      </section>

    </div>

  )
}

export default ProjectCreation