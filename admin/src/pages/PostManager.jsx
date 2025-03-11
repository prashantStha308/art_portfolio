import { useEffect, useState } from "react";
import { usePostStore } from "../store/post.store";

const PostManager = () => {
  const { posts, getAllPost } = usePostStore();
  const [postItem, setPostItem] = useState([]); // Initialize state as null or an empty array

  useEffect(() => {
    const loadPosts = async () => {
      const res = await getAllPost();
      if (res.success) {
        setPostItem(res.data.post); // Set the post data if successful
      } else {
        console.error(res.message); // Log an error message if it fails
      }
    };

    loadPosts();
  }, [getAllPost]); // Only call getAllPost when the component mounts

  // You can log postItem here or just use it in the JSX
  console.log(postItem);

  return (
    <div className="p-4">
        PostManager <br /> <br />
        <section>
            <ul className="grid gap-4">
                {
                    postItem.map( item=>(
                        <ul>
                            <li> <span className="text-amber-500" >Title</span>: { item.title } </li>
                            <li> <span className="text-amber-500" >Slog</span>: { item.slog } </li>
                            <li> <span className="text-amber-500" >ImageURL</span>: { item.imgUrl } </li>
                        </ul>
                    ) )
                }
            </ul>
        </section>
    </div>
  );
};

export default PostManager;
