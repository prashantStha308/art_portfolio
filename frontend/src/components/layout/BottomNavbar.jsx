import { Link, useLocation } from 'react-router-dom';

import {
	Home,
	GalleryHorizontalEnd,
	FolderKanban,
	// Settings
} from "lucide-react"
import pfp from '/assets/digital/Sketch.png';

export default function BottomNavbar(){

	const location = useLocation();


	const routes = [
		{
			name: "home", href: "/",
			icon: <Home size={24} />,
			isActive: location.pathname === "/",
			// isActive: true,
		},
		{
			name: "gallery",
			href: "/gallery",
			icon: <GalleryHorizontalEnd size={24} />,
			isActive: location.pathname.includes("/gallery")
		},
		{
			name: "projects", 
			href: "/project",
			icon: <FolderKanban size={24} />, 
			isActive: location.pathname === "/project"
		},
	];


	return(
		<footer
			className="md:hidden fixed bottom-0 left-0 right-0 flex bg-bg border-t-4 border-bg "
		>
			<div className='w-full flex justify-evenly items-center border-t border-purple-600 rounded-md px-8 py-2 text-purple-500' >
				{
					routes.map((item, index) => (
						<Link
							key={index} to={item.href}
							className={`${item.isActive ? " bg-purple-500/75 text-white border border-purple-600 backdrop-blur-3xl" : " hover:bg-purple-500/40 hover:text-white"}  px-3 py-2 rounded-lg transition-all ease-in duration-150`}
						>
							{item.icon}
						</Link>
					))
				}

				<div>
					<img src={pfp} alt="pfp" className="rounded-full w-10 aspect-square object-cover" />
				</div>
			</div>
		</footer>
	)
}