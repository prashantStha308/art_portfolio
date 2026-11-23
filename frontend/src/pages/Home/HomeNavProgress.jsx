import { useEffect, useState } from "react";


export default function HomeNavProgress({ parentRef }){
    const [nav, setNav] = useState([]);

	useEffect(() => {
	    const parent = parentRef.current;
	    if (!parent) return;

	    const children = Array.from(parent.children).filter((child) => child.id);
	    setNav(children.map((child) => ({ id: child.id, active: false })));

	    const observer = new IntersectionObserver(
	        (entries) => {
	            setNav((prevNav) =>
	                prevNav.map((item) => {
	                    const matchedEntry = entries.find(
	                        (entry) => entry.target.id === item.id
	                    );

	                    return matchedEntry
	                        ? { ...item, active: matchedEntry.isIntersecting }
	                        : item;
	                })
	            );
	        },
	        {
	            root: null,
	            rootMargin: '-40% 0px -40% 0px',
	            threshold: 0
	        }
	    );

	    children.forEach((el) => observer.observe(el));

	    return () => observer.disconnect();
	}, [parentRef]);


	return(
		<section
			className="hidden md:flex fixed z-[90] h-full flex-col justify-center right-4"
		>
			<nav
				className="flex flex-col p-4 text-neutral-900/75 dark:text-neutral-100/65 font-medium font-mono"
			>
				{
					nav.map( ( n, i ) => (
						<div key={n.id} className="flex flex-col justify-center items-center text-sm">
							<a
								href={`#${n.id}`}
								className={`capitalize flex flex-col gap-1 w-full justify-center items-center ${n.active && "text-purple-500"} hover:text-purple-800 dark:hover:text-purple-400 transition-all ease-in-out `}
							>
								<span className="text-xs w-full text-right" >
									0{i+1}
								</span>
								
								<span className={`${ n.active && "font-bold scale-110" } transition-all ease-in-out`} >
									{n.id}
								</span>
							</a>
							{ i < nav.length - 1 && (
								<span className="w-px h-12 my-2 ml-2 bg-current opacity-40" />
							) }
						</div>
					) )
				}
			</nav>
		</section>
	)
}