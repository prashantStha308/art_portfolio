import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../../store/post.store";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Tile from "../../components/Tile";
import Loading from "../../components/Loader";
import Header from "../../components/Header";

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

  if( posts.length === 0 ){
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
        <Header Category={"Post"} handleInput={handleInput} searchWord={searchWord} />

        <section>
          {
            postItem.length === 0
            ?
              <div className="flex justify-center items-center p-18" >
                <h1 className="text-left text-3xl w-96"> No Post found with name or ID: "{searchWord}" </h1>
              </div>
            :
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2" >
                {
                  postItem.map( ( item , index ) => (
                    <Link key={index} to={`/postpage/${item._id}`} >
                      <Tile item={item} type={"Post"} />
                    </Link>
                  ) )
                }
              </div>
          }
        </section>
      </div>
    </div>
  );
};

export default PostManager;
