import { useEffect, useState } from "react";
import { PostStore } from "../store/post.store";
import Loading from "./Loader";
import ErrorPage from "./ErrorPage";

const PictureGallery = () => {

  const { getAllPosts } = PostStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchPosts = async () => {
        try {
            const response = await getAllPosts();
            if( response.success ) setPosts(response.data);
            if( !response.success ) setError(response.message)

        } catch (err) {
            setError(err.message);
        } finally {
           setLoading(false);
        }
      };

      fetchPosts();
  }, [getAllPosts]);

  if(loading) return <Loading />;
  if (error) return <ErrorPage />;
  return (
    <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    posts.map(item => (
                        <div key={item._id}>
                            <img className="w-64 h-64 md:w-80 md:h-80 object-cover object-center rounded-lg" src={item.imgUrl.replace(/^backend/, '')} alt={item.title} />
                        </div>
                    ))
                }
            </div>
    </>
  )
}

export default PictureGallery;