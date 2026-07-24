import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Loading from '../components/Loaders/Loader';
import { ProjectStore } from '../store/project.store.js';
import ErrorPage from '../components/ErrorPage';

const ProjectPostPage = () => {
  const { id, pid } = useParams(); // id: project ID, pid: post ID
  const { getProjectById } = ProjectStore(); // Fetch function from the store
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the project post when the component mounts or when params change
    const fetchProjectPost = async () => {
      setLoading(true);
      try {
        const data = await getProjectById( id );
        setPost(data.data.posts.find( item => item._id === pid ));
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the post.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectPost();
  }, [id, pid, getProjectById]);


  // Handle loading state
  if (loading) return <Loading />;

  // Handle error state
  if (error) return <ErrorPage title={"Failed to get post"} message={error} />;

  // Handle no post data
  if (!post) return <div>No post found.</div>;

  // Render the post details
  return (
    <div className='min-h-screen '>
        <div className="grid mb-4">
            <img src={post.imgUrl} alt={post.title} className=' lg:max-w-xl m-auto ' />
            <h1 className='text-xl lg:text-2xl text-gray-700 text-left font-bold'> {post.title} | { post.timeCreated.slice(0,4) } </h1>
        </div>

        <div className='grid'>
            <div>
                {/* <h1 className='text-2xl lg:text-3xl text-gray-700 text-left font-bold'> {post.title} </h1> */}
            </div>
        </div>
    </div>
  );
};

export default ProjectPostPage;
