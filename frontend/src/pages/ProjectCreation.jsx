import { useEffect, useState } from 'react';
import { PostStore } from "../store/post.store.js";
import ImageSelector from "../components/ImageSelector";

const ProjectCreation = () => {
  const [ selectedImage , setSelectedImage ] = useState([]);
  const [ selector , setSelector ] = useState(false);

  const { post , getAllPosts } = PostStore();
  const [loading , setLoading] = useState(true);

  useEffect( ()=>{
      const fetchPosts = async ()=>{
          setLoading(false);
          await getAllPosts();
          setLoading(true);
      }
      fetchPosts();
  },[getAllPosts , post] )

  const closeSelector = ()=>{
    setSelector(false);
  }

  const handleForm = (e)=>{
    e.preventDefault();
  }

  return (
    <div className="relative h-full w-full">
      { selector && <ImageSelector onClose={closeSelector} selectedImage={selectedImage} setSelected={setSelectedImage} isLoading={loading} post={post ?? null} /> }
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

          <div className='flex gap-8'>
            <label>
              Select Artworks : <button className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md" type="button" onClick={()=>(
                setSelector(true)
              )}> Select </button>
            </label>

            <input type="submit" value="Submit" className='text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md' />
          </div>
          
        </form>
      </section>

    </div>

  )
}

export default ProjectCreation