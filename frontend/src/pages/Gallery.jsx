import { useEffect, useRef , useMemo } from 'react';
import { Link } from 'react-router-dom';

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import { useGetAllPosts } from "../queries/post.query.js";

import PictureTile from "../components/tiles/PictureTile.jsx";
import ErrorPage from "../components/ErrorPage.jsx";

import BoxLoader from "../components/Loaders/BoxLoader";


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


    console.log("posts", posts);

    return (
        <section className="flex flex-col gap-4 relative w-full">

            {
                isError ? <ErrorPage message={error} />
                // : isLoading ? <LoadingGallary />
                : !posts || posts.length === 0 ?
                    <div className=" mb-5 pb-4 md:mb-0">
                        <h1 className="text-md text-center text-gray-700"> Fetching the gallery </h1>
                    </div>
                :
                    <div className=" mb-5 pb-4 md:mb-0 px-4 py-5">
                        <MasonryPhotoAlbum
                            photos={photos}
                            defaultContainerWidth={typeof window !== "undefined" ? window.innerWidth : 400}
                            columns={(containerWidth) => {
                                if (containerWidth < 450) return 2; 
                                if (containerWidth < 1080) return 3;
                                return 5;
                            }}
                            spacing={8}
                            render={{
                                photo: (_, { photo }) => {
                                    const item = postsById.get(photo.key);
                                    if (!item) return null;
                                    return (
                                        <Link
                                            key={photo.key}
                                            to={`/gallery/${item._id}`}
                                            className='transition-all ease-in-out duration-150'
                                        >
                                            <PictureTile item={item} fade={true} />
                                        </Link>
                                    );
                                },
                            }}
                        />
                    </div>
            }
            <div ref={observerRef} className="bg-transparent w-full h-12 flex justify-center">
                { isLoading && <BoxLoader />}
            </div>
        </section>
    );
};

export default Gallery;