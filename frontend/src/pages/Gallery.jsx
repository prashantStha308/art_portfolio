import { useEffect , useState } from "react";
import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ErrorPage from "../components/ErrorPage.jsx";

const Gallery = ({ loading = true , error = false , errorMessage , setPage , page }) => {
    const { post , pageData , getAllPosts } = PostStore();
    // const [loading, setLoading] = useState(true);
    // const [ page , setPage ] = useState(1);
    // const [ error , setError ] = useState(false);
    // const [ errorMessage , setErrorMessage ] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            console.log("inside fetching data");
            setLoading(true);
            await getAllPosts( page , 20 );
            setLoading(false);
        }
    
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