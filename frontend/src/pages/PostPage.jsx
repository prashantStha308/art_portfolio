import { useParams } from 'react-router-dom'

import { useGetPostById } from "../queries/post.query.js";

import BoxLoader from "../components/Loaders/BoxLoader";

const PostPage = () => {
	const {id} = useParams();
	const { data: post, isLoading, isError, error } = useGetPostById(id);

	const aspectRatio = (post?.width && post?.height) ? post?.width / post?.height : undefined

	const imgElement =(
		<section
			className="relative w-full overflow-hidden rounded-xl"
			style={{
				aspectRatio,
				backgroundColor: post?.color || "#e5e5e5",
			}}
		>
			<img
				className={`object-cover object-center thumb-img rounded-xl group-hover:scale-105 transition-all ease-in-out duration-150`}
				style={{
					transition: 'all 0.15s ease-in',
				}}
				src={post?.thumbnail}
				loading="lazy"
			/>
		</section>
	)

	return (
		<section>
			<header> id: {id}  </header>
			{
				isLoading && <BoxLoader />
			}
			<div>
				<h1>
					{post?.title}
				</h1>

				{imgElement}
			</div>
		</section>
	)
}

export default PostPage;