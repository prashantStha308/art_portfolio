import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Tile from "../components/Tile";
import Loading from "../components/Loader";

const PostManager = () => {

  const { posts = [] , getAllPost } = usePostStore();
  const [postItem, setPostItem] = useState([]);
  const [ searchWord , setSearchWord ] = useState("");

  const showFilteredPosts = ( keyword ) => {
    setPostItem( posts.filter( item => item.title.toLowerCase().includes(keyword.toLowerCase()) || item._id.includes(keyword) && item ) );
  }

  const handleInput = (e) => {
    const keyword = e.target.value;

    setSearchWord( keyword );
    showFilteredPosts( keyword );
  }


  useEffect(() => {
    const loadPosts = async () => {
      const res = await getAllPost();
      if (res.success) {
        setPostItem(res.data.post); 
      } else {
        console.error(res.message);
      }
    };

    loadPosts();
  }, [getAllPost]);

  if( postItem.length === 0 ){
    return (
      <div className="min-h-screen max-w-screen flex justify-center items-center" >
        <Loading />
      </div>
    )
  }

  return (
    <div className="scroll-smooth">
      <a href="#top">
        <div className="bg-white/20 text-2xl rounded-full fixed bottom-4 right-8 z-20">
          <FaRegArrowAltCircleUp size={45} />

          <p className="sr-only"> Go To Top </p>
        </div>
      </a>
      <div id="top" className="p-4 grid items-center align-middle ">
        <header className="flex justify-between items-center m-4 gap-2 ">

          <h1 className=" hidden md:block md:text-lg lg:text-2xl font-bold text-blue-500"> Post Manager </h1>

          <div className="flex gap-0 border border-white rounded-lg p-2">
            {/* searchbar */}
            <input type="text" className="px-2 max-w-3xs outline-none " placeholder="Search post via Title or ID" onChange={handleInput} value={searchWord} />
            <button className="border-l border-l-white p-2 hidden md:block ">
              <FaMagnifyingGlass height={20} width={20} />
            </button>
          </div>

          <div className="">
            <Link to={`/createPost`} >
              <button className="text-lg px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 active:bg-blue-800" >
                Create
              </button>
            </Link>
          </div>

        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2" >
            {
              postItem.map( ( item , index ) => (
                <Link key={index} to={`/postpage/${item._id}`} >
                  <Tile item={item} />
                </Link>
              ) )
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostManager;
