import { useEffect , useState } from "react";
import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ErrorPage from "../components/ErrorPage.jsx";

const Gallery = () => {
    const { post , pageData , getAllPosts } = PostStore();
    const [loading, setLoading] = useState(true);
    const [ page , setPage ] = useState(1);
    const [ error , setError ] = useState(false);
    const [ errorMessage , setErrorMessage ] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            console.log("inside fetching data");
            // Only fetch posts if the current post array is empty
            // Yo garda, page won't reload after you revist the gallery, we need to integrate pageData feri. 
            // Suruma, post.length ko logic le kaam garos, tespaxi. we can maybe count if aaile ko page ko sabai contents pako xa ki nai

            if (post.length === 0) {
                console.log("fetching data");
                setLoading(true);
                try {
                    const res = await getAllPosts(page, 20);

                    if (!res.success || !res.data.post || res.data.post.length === 0) {
                        setError(true);
                        setErrorMessage("No Posts Found");
                    }
                } catch (error) {
                    console.log("Error fetching", error);
                    setError(true);
                    setErrorMessage(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchPost();
    }, [getAllPosts, page]);


    return (
        <div className="min-h-screen">
            <h1 className="text-gray-600 uppercase text-xl text-center p-5 mb-4 border-b border-b-gray-400 h-fit"> Gallery </h1>
            {/* Gallery */}
            {
                loading ?
                    <Loading /> 
                :
                    error ? <ErrorPage message={errorMessage} />
                    :
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
            <footer className="flex justify-center items-center mt-6 space-x-2">
                {pageData?.totalPage > 0 ? (
                    Array.from({ length: pageData.totalPage }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setPage(index + 1)}
                            className={`px-4 py-2 rounded ${
                                page === index + 1
                                    ? "bg-blue-500 text-white font-bold"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">No Pages Available</p>
                )}
            </footer>
        </div> 
    );
};

export default Gallery;