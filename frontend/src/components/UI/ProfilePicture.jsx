

export default function ProfilePicture({ src, width = "3.5rem" }){


	return(
		<div className="mt-1 flex flex-col gap-2" >
			<img 
				src={src} alt="pfp"
				className="rounded-full aspect-square object-cover"
				style={{
					width
				}}
			/>

			<div className="h-0.5 w-full rounded-full bg-purple-500/45" />
		</div>
	)
}