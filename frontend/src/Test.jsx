import { useState, useEffect, useRef } from "react";
import { PostStore } from './store/post.store.js';
import PictureTile from "./components/PictureTile.jsx";
import Loading from "./components/Loader.jsx";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();

  const { post, getAllPosts } = PostStore();

//   fetching Datas
  useEffect(() => {
    // Fetch data
    const fetchData = async (page) => {
        setIsLoading(true);
        try {
        const result = await getAllPosts( page , 5 );
        console.log(result)
        if (result.success) {
            setItems((prev) => {
            // Combine previous items and new items, removing duplicates by _id
            const allItems = [...prev, ...result.data.post];
            const uniqueItems = Array.from(new Map(allItems.map(item => [item._id, item])).values());
            return uniqueItems;
            });
            setHasMore(result.data.post.length > 0);  // Based on whether there are more items
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        } finally {
        setIsLoading(false);
        }
    };

    fetchData(page);
  }, [page , getAllPosts ]);

//   Intersection Observer
  useEffect(() => {
    const currentref = observerRef.current;
      // Load more when the observer target is in view
    const loadMore = (entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(loadMore, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (currentref) observer.observe(currentref);

    return () => {
      if (currentref) observer.unobserve(currentref);
    };
  }, [hasMore, isLoading]);

  return (
    <div>
      <h1>Infinite Scroll Example</h1>
      <div className="grid grid-cols-5 gap-4">
        {items.map((item) => (
            <PictureTile key={item._id} item={item} fade={true} />
        ))}
      </div>
      <div ref={observerRef} style={{ height: "20px", background: "transparent" }} />
      {isLoading && <p> <Loading /> </p>}
      {/* {!hasMore && <p>No more items</p>} */}
    </div>
  );
};

export default InfiniteScroll;
