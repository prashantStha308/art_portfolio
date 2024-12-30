import { useState } from "react";
import { PostStore } from "../store/post.store";
import Modal from "../components/Modal";
import Loading from "../components/Loader";


const Upload = () => {
    const { createPost } = PostStore();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ modalTitle , setModalTitle ] = useState("");
    const [ modalMessage , setModalMessage ] = useState("");
    const [ modalSuccess , setModalSuccess ] = useState(false);
    const [ loading , setLoading ] = useState(false);

    const [ title , setTitle ] = useState("");
    const [ file , setFile ] = useState();
    const [ description , setDescription ] = useState("");
    const [ tags , setTags ] = useState([]);

    const isClose = ()=>{
        setIsOpen(false);
    }

    const handelForm = async (e) =>{
        e.preventDefault();
        const formData = new FormData( e.target );

        if( formData.get('title') ){

            setLoading(true);
            const res = await createPost(formData);
            setLoading(false);
            setIsOpen(true);
            setModalMessage(res.message);

            if(res.success){
                setModalTitle('Post Created Successfully');
                setModalSuccess(true);
            }else{
                setModalTitle('Failed to Create Post. Please try again');
                setModalSuccess(false);
            }
        }else{
            console.log("Required Fields not met");
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleDesc = (e) => {
        setDescription(e.target.value);
    };
    
    const handleTags = (e) => {
        setTags(e.target.value);
    };

  return (
    <div>
        <section>
        <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto md:h-screen lg:py-0 text-gray-700">
            {/* Loader */}
            {
                loading && <Loading />
            }

            {/* Modal */}
            { isOpen && <Modal onClose={isClose} title={modalTitle} message={modalMessage} success={modalSuccess} /> }

            <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Create new Post
                    </h1>

                    {/* Upload Form */}
                    <form className="space-y-4 md:space-y-3" onSubmit={handelForm} encType="multipart/form-data">

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium "> Title </label>
                            <input type="title" name="title" id="title" className=" input-field" placeholder="Artwork123" value={title} onChange={handleTitle} required/>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium"> Description </label>
                            <textarea type="description" name="description" id="description" placeholder="Describe your post here" className="input-field h-28 resize-none" value={description} onChange={handleDesc} />
                        </div>

                        {/* File */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Upload Artwork:
                                <input type="file" name="post" id="post" accept="image/*" className="input-field" value={file} onChange={handleFile} required />
                            </label>
                        </div>
                        
                        {/* Tags */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Tags
                                <input type="text" name="tags" id="tags" value={tags} className="input-field" onChange={handleTags} />
                            </label>

                            {/* For tags */}
                            <div>
                                <span> {/* Tags should appear here */} </span>
                            </div>
                        </div>

                        <button type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 active:bg-blue-950 text-white">Sign in</button>
                    </form>

                </div>
            </div>
        </div>
        </section>

    </div>
  )
}

export default Upload;