import { useState } from "react"
import { usePostStore } from "../../store/post.store";
import { useNavigate , Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import Loading from "../../components/Loader";


const CreatePost = () => {

  const { createPost } = usePostStore();
  const [ loading , setLoading ] = useState(false);
  const navigator = useNavigate()

  const [ error , setError ] = useState({ status: false , message:"" });




  const handelSubmit = async(e) => {
    e.preventDefault();
    console.log("inside handelSubmit")

    const formData = new FormData(e.target);
    console.log([...formData]);

    if( !formData.get("title") || !formData.get("post") ){
      setError( {status: true , message: "Required Field not filled"} );
    }

    try {
      setLoading(true);
      const res = await createPost(formData);
      console.log(res);
      if( res.success != true ){
        throw new Error(res?.message);
      }else{
        console.log("Creation successful");
        navigator("/post");
      }
    } catch (error) {
      console.log(error.message);
      setError({ status: true , message: error?.message });
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col justify-between align-middle" >
      {
        loading &&(
          <div className="min-h-screen max-w-screen flex justify-center items-center">
            <Loading />
          </div>
        )
      }
      <header className="p-4 border-b border-b-white flex justify-between items-center " >
        <Link to={"/post"} className="text-3xl p-2" >
          <FaArrowCircleLeft />
        </Link>
        <h1 className="text-center text-xl lg:text-2xl font-bold"> Create Post </h1>
        <div>
          <p className="sr-only"> Non existant </p>
        </div>
      </header>
      
      <section>
      {/* Upload Form */}
      <form className="space-y-4 md:space-y-3 p-4 grid justify-center  " onSubmit={handelSubmit} encType="multipart/form-data">

          {/* Title */}
          <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium "> Title </label>
              <input type="title" name="title" id="title" className=" input-field" placeholder="Give your artwork a Title" required/>
          </div>

          {/* Description */}
          <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium"> Description </label>
              <textarea type="description" name="description" id="description" placeholder="Describe your post here" className="input-field h-28 resize-none" />
          </div>

          {/* File */}
          <div className="flex items-center gap-4">
            <label 
              htmlFor="post" 
              className="cursor-pointer px-3 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload Artwork
            </label>
            <input type="file" name="post" id="post" accept="image/*" required />
          </div>
          
          {/* Tags */}
          <div>
              <label className="block mb-2 text-sm font-medium">
                  Tags
                  <input type="text" name="tags" id="tags" className="input-field" />
              </label>

              {/* For tags */}
              <div>
                  <span> {/* Tags should appear here */} </span>
              </div>
          </div>

          <button type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-950 text-white"> Create Post </button>
      </form>
      </section>

    </main>
  )
}

export default CreatePost