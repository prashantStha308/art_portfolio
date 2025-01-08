import { useParams } from 'react-router-dom'


const Post = () => {
    const {slog} = useParams();

  return (
    <div>Post of ID: {slog}</div>
  )
}

export default Post