import {useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';

import {
	Home,
	GalleryHorizontalEnd,
	FolderKanban,
	// Settings
	Sun,
	Moon,
} from "lucide-react"
import pfp from '/assets/digital/Sketch.png';

import ProfilePicture from "../UI/ProfilePicture.jsx";



export default function Sidebar(){
	const location = useLocation();
	const [isDark, setIsDark] = useState(() => {
		if (typeof window === 'undefined') return false;
		return (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	});

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.theme = isDark ? 'dark' : 'light';
	}, [isDark]);

	const toggleTheme = () => setIsDark((prev) => !prev);

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
		<aside
			className="hidden md:flex flex-col justify-between items-center h-full bg-bg border-r-2 border-purple-500/75 px-4 pl-6 py-10 text-purple-500"
		>
			{/*<ProfilePicture src={"/self-portrait.jpeg"} width={"3.5rem"} />*/}
				
				<div className="mt-1 flex flex-col gap-2" >
					<img 
						src={"/self-portrait.jpeg"} alt="pfp"
						className="rounded-full aspect-square object-cover w-16"
					/>

					<div className="h-0.5 w-full rounded-full bg-purple-500/45" />
				</div>

			<section className=" flex flex-col justify-center items-center gap-8" >

				{
					routes.map((item, index) => (
						<Link
							key={index} to={item.href}
							className={`flex flex-col items-center ${item.isActive ? " bg-purple-500/75 text-white" : " hover:bg-purple-500/40 hover:text-white"}  p-3 rounded-lg transition-all ease-in duration-150`}
						>
							{item.icon}
							<span className="capitalize text-[0.7rem]" >
								{item.name}
							</span>
						</Link>
					))
				}

			</section>

			<section className="flex flex-col gap-2">

				<div className="h-0.5 w-full rounded-full bg-purple-500/45" />

				<button
					onClick={toggleTheme}
					aria-label="Toggle theme"
					className="p-3 rounded-lg hover:bg-purple-500/40 hover:text-white transition-all ease-in duration-150 cursor-pointer"
				>
					{isDark ? <Sun size={24} /> : <Moon size={24} />}
				</button>
			</section>

		</aside>
	)
}
