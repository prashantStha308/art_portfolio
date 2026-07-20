import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageSkeleton from "./ImageSkeleton";


// eslint-disable-next-line react/prop-types
export default function LoadingGallary({amount = 4}){
	return(
		<div className="mt-10 mb-5 pb-4 md:mb-0 px-4 py-5">
	        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
	            <Masonry gutter="16px">
	            	{
	            		[...Array(amount)].map((_, index) =>(
		                	<ImageSkeleton key={index} height={"h-72"} />
	                	))
	                }

	            </Masonry>
	        </ResponsiveMasonry>
	    </div>
	)
}