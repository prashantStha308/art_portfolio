import { useEffect, useRef , useMemo } from 'react';
import { Link } from 'react-router-dom';

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";


// import { PostStore } from '../store/post.store.js';
import { useGetAllPosts } from "../queries/post.query.js";

import PictureTile from "../components/PictureTile.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
// import LoadingGallary from "../components/Loaders/LoadingGallary";
import InstagramIcon from "../components/icons/InstagramIcon";
import GithubLogo from "../components/icons/GithubLogo";
import LinkedInLogo from "../components/icons/LinkedInLogo";
import GmailIcon from "../components/icons/GmailIcon";


const SubNav = ()=>{
    return(
        <header className='fixed top-0 right-0 left-0 lg:left-28 z-40 flex flex-col' >
            <section className=" border-b border-b-purple-500 flex justify-between items-center ">

                <section
                    className=" bg-bg flex justify-between items-center w-full px-4 py-2"
                >
                    <div
                        className="flex items-center gap-4 text-purple-500 uppercase text-lg font-bold text-center h-fit"
                    >
                        <a
                            href={"https://instagram.com/pop__sickle"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500 hover:opacity-75'
                        >
                            <InstagramIcon size={18} />
                        </a>
                        <div className='text-sm flex items-center gap-4' >
                            Gallery |
                        </div>
                    </div>

                    <div className=' flex items-center gap-8 text-purple-500 pr-4' >

                        <a
                            href={"mailto:sthaprashant0308@gmail.com"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <GmailIcon size={18 } />
                        </a>

                        <a
                            href={"https://github.com/prashantStha308/"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <GithubLogo size={20} />
                        </a>

                        <a
                            href={"https://github.com/prashantStha308/"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <LinkedInLogo size={18} />
                        </a>

                    </div>
                </section>
            </section>

            <div className='bg-bg w-full h-2' />

        </header>
    )
}

const Gallery = () => {
    const observerRef = useRef();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useGetAllPosts(10);
    const posts = data?.pages.flatMap((page) => page.post) ?? [];

    // build a lookup map once per posts change, avoids O(n) .find() per tile in render
    const postsById = useMemo(() => {
        const map = new Map();
        posts.forEach((item) => map.set(item._id, item));
        return map;
    }, [posts]);

    const photos = useMemo(
        () =>
            posts.map((item) => ({
                key: item._id,
                src: item.imgUrl,
                width: item.width,
                height: item.height,
            })),
        [posts]
    );

    useEffect(() => {
        const currentref = observerRef.current;
        if (!currentref) return;
        const loadMore = (entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };
        const observer = new IntersectionObserver(loadMore, {
            root: null,
            rootMargin: "1000px",
            threshold: 0.1,
        });
        observer.observe(currentref);
        return () => observer.unobserve(currentref);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <section className="flex flex-col gap-4 relative w-full">
            <SubNav />

            {
                isError ? <ErrorPage message={error} />
                // : isLoading ? <LoadingGallary />
                : !posts || posts.length === 0 ?
                    <div className="mt-10 mb-5 pb-4 md:mb-0">
                        <h1 className="text-md text-center text-gray-700">No Posts</h1>
                    </div>
                :
                    <div className="mt-10 mb-5 pb-4 md:mb-0 px-4 py-5">
                        <MasonryPhotoAlbum
                            photos={photos}
                            columns={(containerWidth) => {
                                if (containerWidth < 350) return 2; 
                                if (containerWidth < 750) return 3;
                                return 4;
                            }}
                            spacing={24}
                            render={{
                                photo: (_, { photo }) => {
                                    const item = postsById.get(photo.key);
                                    if (!item) return null;
                                    return (
                                        <Link key={photo.key} to={`/gallery/${item._id}`}>
                                            <PictureTile item={item} fade={true} />
                                        </Link>
                                    );
                                },
                            }}
                        />
                    </div>
            }
            <div ref={observerRef} className="bg-transparent w-full h-12 text-center">
                { isLoading && "Loading..."}
            </div>
        </section>
    );
};

export default Gallery;