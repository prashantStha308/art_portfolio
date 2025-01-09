import { useEffect , useState } from "react";
import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Gallery = () => {
    const { post , getAllPosts } = PostStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            // Only fetch posts if they haven't already been loaded
            if (post.length === 0) {
                setLoading(true);
                await getAllPosts();
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
    fetchPost();
    }, [getAllPosts , post]);

    if(loading) return <Loading />

    return (
        <div className="grid gap-14">
            <h1 className="text-gray-600 uppercase text-xl text-center pt-5 border-b border-b-gray-400"> Gallery </h1>
            {/* Gallery */}
            <div>
                {
                    post && post.length > 0 ?
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3 }}>
                        <Masonry gutter="16px">
                            {post.map(item => (
                                <PictureTile key={item._id} item={item} fade={true}  />
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