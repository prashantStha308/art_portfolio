import { useRef, useEffect } from "react";
// import { motion } from "motion/react";

import { useGetPostById } from "../../queries/post.query.js";
import useUIStore, {
	toggleModalVisbility,
} from "../../store/ui.store.js";

import SkeletonBlock from "../Loaders/SkeletonBlock.jsx";


const colorMap = {
    0: "bg-green-500",
    1: "bg-amber-500",
    2: "bg-red-500",
};

export default function PostModal(){
	const containerRef = useRef();
	const modalPostId = useUIStore( store => store.modalPostId);

	const {data: post, isLoading, isError, error} = useGetPostById( modalPostId );

	useEffect(()=>{
		const handler = (e)=>{
			if(!containerRef.current) return;

			if(!containerRef.current.contains(e.target)){
			    toggleModalVisbility();
			}
		}

		document.addEventListener('mousedown', handler);

		return(()=> document.removeEventListener('mousedown', handler) )

	},[])

	const aspectRatio = (post?.width && post?.height) ? post?.width / post?.height : undefined

	const imgElement =(
		<section
			className="relative w-full overflow-hidden rounded-md"
			style={{
				aspectRatio,
				backgroundColor: post?.color || "#e5e5e5",
			}}
		>
			<img
				className={`w-64 lg:w-96 rounded-sm shrink-0 self-center lg:self-auto`}
				style={{
					transition: 'all 0.15s ease-in',
				}}
				src={post?.thumbnail}
				loading="lazy"
			/>
		</section>
	)


	console.log("post", post);

	return(
		<section
			className={`fixed top-0 left-0 h-screen w-screen bg-white/5 backdrop-blur-lg flex justify-center items-center z-10 md:pl-28 px-4 lg:px-0`}
		>
			<section
				ref={containerRef}
				id="modal-container"
				className="w-full lg:w-10/12 h-4/6 lg:h-5/6 lg:w-6/12 bg-bg border border-purple-900 rounded-lg flex flex-col lg:mt-12"
			>
				
				<header
					className="flex justify-between items-center font-mono text-xs w-full flex justify-between px-4 py-2 pb-1 border-b border-purple-900"
				>
				<span>
					{isLoading ? <SkeletonBlock className="h-2 w-16" /> : post?.title || "Artwork Title"}
				</span>

                <div className="flex gap-2 items-center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                        	key={index} 
                        	className={`w-3 h-3 cursor-pointer hover:w-4 hover:h-4 transition-all ease-in-out duration-150 rounded-full ${colorMap[index]}`}
                        	onClick={toggleModalVisbility}
                        	/>
                    ))}
                </div>

				</header>

				<section
				    className="h-full w-full py-2 px-4 flex flex-col justify-center lg:flex-row gap-4 md:gap-8 overflow-y-auto"
				>
				    <div className="h-full w-full flex justify-center items-center" >
				    	{imgElement}
				    </div>

				    <section
				        className="flex flex-col justify-between w-full h-full min-w-0 py-4"
				    >
				    	<div className="flex flex-col gap-4 w-full min-w-0" >
					    	{
					    		isLoading ? (
					    			<SkeletonBlock className="h-4 w-full bg-purple-500" />
					    		) : (
							        <h1 className="font-mono text-xl font-black text-purple-500 break-words">
							            {post?.title || ""}
							        </h1>
					    		)
					    	}

					        <article className="flex flex-col gap-2" >
					        	<h2 className="text-sm font-semibold" >
					        		Description
					        	</h2>

					        	{
					        		isLoading ? (
					        			<div className="flex flex-col gap-1" >
							    			<SkeletonBlock className="h-4 w-full" />
							    			<SkeletonBlock className="h-4 w-full" />
							    			<SkeletonBlock className="h-4 w-3/6" />
					        			</div>
					        		) : (
							        	<p className="text-xs text-neutral-600 dark:text-neutral-400" >
							        		{(!post?.description || post?.description.trim().length <= 0 ) ? "No description set. I'm working on this." : post?.description || "" }
							        	</p>
					        		)
					        	}
					        </article>
				        </div>

				        <div className="flex flex-col gap-3" >

				        	<span className="text-xs font-mono text-neutral-700 dark:text-neutral-300" >
				        		Currently out of stock.
				        	</span>

					        <div className="flex justify-between text-sm" >

						        <button className="bg-neutral-400 text-white rounded-sm px-3 py-1.5" >
						        	Buy as a Sticker
						        </button>

						        <button className="bg-neutral-400 text-white rounded-sm px-3 py-1.5" >
						        	Buy as a Print
						        </button>
					        </div>
				        </div>


				    </section>


				</section>

			</section>

		</section>
	)
}