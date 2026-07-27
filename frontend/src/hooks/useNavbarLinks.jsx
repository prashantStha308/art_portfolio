import { useLocation } from 'react-router-dom';
import {
	Home,
	GalleryHorizontalEnd,
	FolderKanban,
	FileChartColumnIncreasing,
} from "lucide-react"

export default function useNavbarLinks(){
	const location = useLocation();

	const routes = [
		{
			name: "home", href: "/",
			icon: <Home size={20} />,
			isActive: location.pathname === "/",
			// isActive: true,
		},
		{
			name: "projects", 
			href: "/project",
			icon: <FolderKanban size={20} />, 
			isActive: location.pathname === "/project"
		},
		{
			name: "resume",
			href: "/resume",
			icon: <FileChartColumnIncreasing size={20} />,
			isActive: location.pathname === "/resume"
		},
		{
			name: "gallery",
			href: "/gallery",
			icon: <GalleryHorizontalEnd size={20} />,
			isActive: location.pathname.includes("/gallery")
		},
	];


	return routes;

}