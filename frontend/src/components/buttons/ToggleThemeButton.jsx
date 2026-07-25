import {useState, useEffect} from "react";
import {
	Sun,
	Moon,
} from "lucide-react"


export default function ToggleThemeButton(){

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


	return(
		<button
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className="p-3 rounded-lg hover:bg-purple-500/40 hover:text-white transition-all ease-in duration-150 cursor-pointer"
		>
			{isDark ? <Sun size={24} /> : <Moon size={24} />}
		</button>
	)
}