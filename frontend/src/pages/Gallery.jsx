import { useEffect , useState } from "react";
import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Gallery = () => {
    const { post , getAllPosts } = PostStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchPost = async () =>{
        setLoading(true);
        await getAllPosts();
        setLoading(false);
    }
    fetchPost();
    }, [getAllPosts]);

    if(loading) return <Loading />

    return (
        <div className="grid gap-14">
            <h1 className="text-gray-600 uppercase text-xl text-center pt-5 border-b border-b-gray-400"> Gallery </h1>
            {/* Gallery */}
            <div>
                {
                    post && post.length > 0 ?
                    // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    //     {
                    //         post.map( item =>(
                    //             <PictureTile key={item._id} item={item} />
                    //         ) )
                    //     }
                    // </div>

                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                        <Masonry gutter="16px">
                            {post.map(item => (
                                <PictureTile key={item._id} item={item}  />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                    :
                    <div>
                      <h1 className="text-md text-center text-gray-700"> No Posts </h1>
                    </div>
                }
            </div>
        </div> 
    );
};

export default Gallery;