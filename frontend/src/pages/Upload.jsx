import { PostStore } from "../store/post.store";


const Upload = () => {
    const { createPost } = PostStore();

    const handelForm = (e) =>{
        e.preventDefault();
        const formData = new FormData( e.target );

        if( formData.get('title') ){
            createPost(formData);
        }else{
            console.log("Required Fields not met");
        }

    }

  return (
    <div>
        <form onSubmit={handelForm} className="grid" encType="multipart/form-data">

            <label>
                Title:
                <input type="text" name="title" id="title" />
            </label>

            <label>
                Upload Artwork:
                {/* image/* accepts all format of images */}
                <input type="file" name="post" id="post" accept="image/*" />
            </label>
            <input type="submit" value="Submit" className="bg-blue-500 active:bg-blue-700 p-2" />
        </form>
    </div>
  )
}

export default Upload;