/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa";

const PictureTile = ({ item , fade = false , selectMode = false , selectedList }) => {
	const selected = selectMode ? selectedList.includes(item) : false;

	const selectionStyle = {
		transform: 'scale(0.9)',
		opacity: 0.8,
	}

	const aspectRatio = (item?.width && item?.height) ? item?.width / item?.height : undefined

	const imgElement =(
		<section
			className="relative w-full overflow-hidden rounded-xl"
			style={{
				aspectRatio,
				backgroundColor: item?.color || "#e5e5e5",
			}}
		>
			<img
				className={`object-cover object-center thumb-img rounded-xl group-hover:scale-105 transition-all ease-in-out duration-150`}
				style={{
					...( selected && selectionStyle ),
					transition: 'all 0.15s ease-in',
				}}
				src={item?.thumbnail}
				loading="lazy"
			/>
		</section>
	)


	return (
		<div className="relative group border border-purple-700/45 rounded-xl transition-all ease-in-out duration-150">
			{
				fade ?
				<section className="relative object-contain group">
					<span
						className="absolute text-xl max-w-full break-words text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-amber-300 opacity-0 group-hover:opacity-85 z-20 transition-all duration-[0.35s] mt-[15%] group-hover:mt-0 capitalize font-black mix-blend-lighten "
					>
						{item?.title}
					</span>

					{imgElement}

					<div className="absolute bg-purple-500 opacity-0 top-0 left-0 h-full w-full group-hover:opacity-40 mix-blend-color-dodge transition-all duration-300 z-10 rounded-xl" />

					<div className="absolute bg-amber-900 opacity-0 top-0 left-0 h-full w-full group-hover:opacity-30 mix-blend-multiply transition-all duration-300 z-10 rounded-xl" />


				</section>

				:
				// if select mode on xa bhane
				selectMode ?
				<div className="h-auto w-full">
					{/* blue tick */}
					<div className="absolute top-4 right-2 z-40">
						<FaCheckCircle className= {`text-3xl text-blue-500 bg-white rounded-full ${ selected ? 'opacity-100' : 'opacity-0' } transition-all ease-in duration-300` }/>
					</div>

					<div className={`${selected && 'bg-purple-800 h-full w-full' }`} >
							{imgElement}
					</div>
				</div>
				:
				// if kunai effect select xaina
					(imgElement)
			}
		</div>
	);
};

export default PictureTile;
