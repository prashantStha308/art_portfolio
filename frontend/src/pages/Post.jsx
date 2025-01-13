import { useParams } from 'react-router-dom'


const Post = () => {
    const {slog} = useParams();

    if (typeof slog !== 'string' || slog.trim() === "" ) {
      console.log("Invalid parameter");
    }

  return (
    <div>Post of ID: {slog}</div>
  )
}

export default Post