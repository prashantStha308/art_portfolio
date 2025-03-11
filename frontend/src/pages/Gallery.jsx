import { PostStore } from '../store/post.store.js';
import Loading from '../components/Loader.jsx';
import PictureTile from "../components/PictureTile.jsx";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ErrorPage from "../components/ErrorPage.jsx";
import { Link } from 'react-router-dom';
import { useEffect, useRef , useState } from 'react';

const Gallery = () => {
    const { post , pageData , getAllPosts } = PostStore();

    const observerRef = useRef();
    const [loading, setLoading] = useState(false);
    const [ page , setPage ] = useState(1);
    const [ error , setError ] = useState(false);
    const [ errorMessage , setErrorMessage ] = useState("");

    useEffect( ()=>{
        async function fetchPosts() {
          setLoading(true);
          try {
            await getAllPosts( page , 10 );
          } catch (error) {
            setError(true);
            setErrorMessage(error.message);
          } finally{
            setLoading(false);
          }
        }
        fetchPosts();
      } , [ getAllPosts , page ] );

    useEffect( ()=>{
        const currentref = observerRef.current;
        // Load more when the observer target is in view
        const loadMore = (entries) => {
            if (entries[0].isIntersecting && pageData.hasMore && !loading) {
            setPage((prev) => prev + 1);
            }
        };

        const observer = new IntersectionObserver( loadMore , {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        })

        if (currentref) observer.observe(currentref);

        return () => {
          if (currentref) observer.unobserve(currentref);
        };
    } )

    return (
        <div className=" grid gap-4">
            <h1 className="text-gray-600 uppercase text-xl text-center p-5 mb-4 border-b border-b-gray-400 h-fit"> Gallery </h1>
            {/* Gallery */}
            {
                error ? <ErrorPage message={errorMessage} />
                :
                    <div className="mb-5 pb-4 md:mb-0 ">
                        {
                            post && post.length > 0 ?
                                <div className="px-4 py-5">
                                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                                        <Masonry gutter="16px">
                                        {post.map(item => (
                                            <Link key={item._id} to={`/gallery/${item._id}`} >
                                                <PictureTile item={item} fade={true} />
                                            </Link>
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

            <div ref={observerRef} className='bg-transparent h-6 w-full' >
                { loading && <p> <Loading inline={true} /> </p> }
            </div>
        </div> 
    );
};

export default Gallery;