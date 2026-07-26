import { Link } from 'react-router-dom';

import ToggleThemeButton from "../buttons/ToggleThemeButton";
import useNavbarLinks from "../../hooks/useNavbarLinks";


export default function Sidebar(){
	const routes = useNavbarLinks();

	return(
		<aside
			className="hidden md:flex flex-col justify-between items-center h-full bg-bg border-r-2 border-purple-500/75 px-4 pl-6 py-10 text-purple-500"
		>
				
				<div className="mt-1 flex flex-col gap-2" >
					<img 
						src={"/self-portrait.jpeg"} alt="pfp"
						className="rounded-full aspect-square object-cover w-14"
					/>

					<div className="h-0.5 w-full rounded-full bg-purple-500/45" />
				</div>

			<section className=" flex flex-col justify-center items-center gap-4" >

				{
					routes.map((item, index) => (
						<Link
							key={index} to={item.href}
							className={`flex flex-col items-center ${item.isActive ? " bg-purple-500/75 text-white" : " hover:bg-purple-500/40 hover:text-white"}  p-3 rounded-lg transition-all ease-in duration-150`}
						>
							{item.icon}
							<span className="capitalize text-[0.6rem]" >
								{item.name}
							</span>
						</Link>
					))
				}

			</section>

			<section className="flex flex-col gap-2">

				<div className="h-0.5 w-full rounded-full bg-purple-500/45" />

				<ToggleThemeButton />

			</section>

		</aside>
	)
}
