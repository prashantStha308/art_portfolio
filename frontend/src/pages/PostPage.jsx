import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { PostStore } from '../store/post.store';

import Loading from '../components/Loaders/Loader';

const PostPage = () => {
    const {id} = useParams();
    const { getPostById } = PostStore();
    const [ loading , setLoading ] = useState(true);
    const [ post , setPost ] = useState();

    if (typeof id !== 'string' ) {
      console.log("Invalid parameter");
    }

    useEffect( ()=>{
      const fetchPost = async ()=>{
        setLoading(true);
        const data = await getPostById(id);
        setPost(data.data);
        setLoading(false);
      }
      fetchPost();
    },[getPostById , id] );


  return (
    <div>
      <header> id: {id}  </header>
      {
        loading && <Loading />
      }
      <img src={post?.image?.src || post?.imgUrl} alt={post?.title + " thumbnail"} loading='lazy' />
    </div>
  )
}

export default PostPage;