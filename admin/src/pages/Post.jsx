import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

const Post = () => {

  const { id } = useParams();
  const navigator = useNavigate();
  const [ targetPost , setTargetPost ] = useState({});
  const { getPostById , updatePost , deletePost } = usePostStore();
  const [ error , setError ] = useState({ status: false , message: "" });
  const [ formData , setFormData ] = useState({
    title: "", description: "" , tags:[]
  });

  const handleDelete = async ()=>{
    const res = await deletePost(id);
    if( res.success != true ){
      setError({ status: true , message: res.message });
      }else{
        navigator("/post");
      }

    }

    const handleInput = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: value,
      }));
    };

    const handelSubmit = async (e)=>{
      e.preventDefault();
      console.log(formData);
      const res = await updatePost( id , formData );
      console.log(res);
      if( res.success != true ){
        setError({ status: false , message: res.message });
        return;
      }else{
        navigator("/post");
      }
    }


    useEffect( ()=>{
      const getTargetPost = async ()=> {
        try {
          const res = await getPostById( id );
          if( res.success != true ){
            throw new Error(res.message);
          }
          setTargetPost( res.data );
          setFormData({
            title: res.data?.title,
            description: res.data?.description,
            tags: res.data?.tags
          });

        } catch (error) {
          setError({ status: true , message: error.message });
        }
      }
      getTargetPost();
    } , [ setTargetPost , getPostById , id ] )

  return (
    <main className="flex flex-col justify-between justify-items-center min-h-screen" >

      <header className="flex justify-between p-3 border-b border-white" >
        <Link to={"/post"} className="text-3xl" >
          <FaArrowCircleLeft />
        </Link>
        <h1 className="text-center text-lg md:text-xl lg:text-2xl" > Edit Post </h1>

        <div className="p-4 opacity-0 "></div>
      </header>

      <section className="flex justify-center" >
        <div className="grid lg:flex gap-2" >
          
          <div>
            <img src={targetPost.thumbnail} alt={ targetPost.title + "'s thumbnail" } width={450} />
          </div>

          {/* Upload Form */}
          <form className="space-y-4 md:space-y-3 p-3" onSubmit={handelSubmit} >

              {/* Title */}
              <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium "> Title </label>
                  <input type="title" name="title" id="title" className=" input-field" placeholder="Give your work a title"  value={formData.title} onChange={handleInput}  required/>
              </div>

              {/* Description */}
              <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium"> Description </label>
                  <textarea type="description" name="description" id="description" placeholder="Describe your post here" className="input-field h-28 resize-none" value={formData.description} onChange={handleInput} />
              </div>
              
              {/* Tags */}
              <div>
                  <label className="block mb-2 text-sm font-medium">
                      Tags
                      <input type="text" name="tags" id="tags" className="input-field" value={formData.tags} onChange={handleInput} />
                  </label>

                  {/* For tags */}
                  <div>
                      <span> {/* Tags should appear here */} </span>
                  </div>
              </div>

              <div className="flex justify-end lg:justify-between  gap-4 w-full" >
                <button type="button" className=" px-4 py-2  font-medium rounded-lg text-sm text-center bg-red-500 hover:bg-red-700 active:bg-red-950 text-white transition-all duration-150 ease-in"
                onClick={handleDelete}
                >
                    Delete Post
                </button>

                <button type="submit" className=" px-4 py-2 font-medium rounded-lg text-sm text-center bg-blue-500 hover:bg-blue-700 active:bg-blue-950 text-white transition-all duration-150 ease-in "> Update Post </button>

              </div>
          </form>

        </div>
      </section>

      <footer></footer>

    </main>
  )
}

export default Post