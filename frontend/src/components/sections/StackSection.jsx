import StackTile from "../../components/tiles/StackTile";


export default function StackSection({stackItems = [], title=""}){
	return(
		<section className="w-full flex flex-col gap-4 justify-center items-center ">
			
			<h1 className="text-2xl font-black font-mono text-purple-500" >
				{title}
			</h1>

			<div
				className="flex justify-center flex-wrap gap-2 md:gap-8 md:px-10"
			>
				{
					stackItems.map((item, index) => (
						<StackTile key={index} tech={item} index={index} />
					))
				}
			</div>

		</section>
	)
}