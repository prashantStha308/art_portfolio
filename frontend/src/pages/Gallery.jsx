import { useEffect , useState } from "react";
import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Gallery = () => {
    const { post , pageData , getAllPosts } = PostStore();
    const [loading, setLoading] = useState(true);
    const [ page , setPage ] = useState(1);

    useEffect(() => {
        const fetchPost = async () => {
            console.log("inside fetched function")
            console.log("Page Data: ",pageData);
            if ( pageData && pageData.currentlyFetched === 0 ) {
                if( pageData.hasMore && pageData.page === page ){
                    console.log("Fetching posts...");
                    setLoading(true);
                    await getAllPosts(page, 20);
                    setLoading(false);
                }
            }
        };
    fetchPost();
    }, [getAllPosts , pageData , page]);

    if(loading) return <Loading />

    return (
        <div className="min-h-screen">
            <h1 className="text-gray-600 uppercase text-xl text-center p-5 mb-4 border-b border-b-gray-400 h-fit"> Gallery </h1>
            {/* Gallery */}
            {
                loading ? <Loading /> :
                <div className="mb-5 pb-4 md:mb-0 ">
                    {
                        post && post.length > 0 ?
                            <div className="px-4 py-5">
                                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                                    <Masonry gutter="16px">
                                    {post.map(item => (
                                        <PictureTile key={item._id} item={item} fade={true} />
                                    ))}
                                    </Masonry>
                                </ResponsiveMasonry>
                            </div>
                        :
                        <div>
                        <h1 className="text-md text-center text-gray-700"> No Posts </h1>
                        </div>
                    }
                </div>
            }
        </div> 
    );
};

export default Gallery;