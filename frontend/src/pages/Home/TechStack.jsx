import {useState, useRef, useEffect} from "react";
import useUIStore from "../../store/ui.store.js";


const StackTile = ({ tech }) => {
    const containerRef = useRef();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const unsubscribe = useUIStore.subscribe(({ mouseX, mouseY }) => {
            const rect = container.getBoundingClientRect();
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

            container.style.setProperty("--x", `${x}px`);
            container.style.setProperty("--y", `${y}px`);
            container.style.setProperty("--opacity", inside ? "1" : "0");
        });

        return unsubscribe;
    }, []);

    return (
        <article
            ref={containerRef}
            className="group relative flex gap-4 items-center border border-purple-500/45 backdrop-blur-3xl rounded-lg px-4 md:px-6 py-2 md:py-4 bg-bg/40 text-neutral-700 dark:text-neutral-300 overflow-hidden cursor-pointer"
        >
            {/* tracks cursor */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity: "var(--opacity, 0)",
                    background:
                        "radial-gradient(200px circle at var(--x) var(--y), rgba(168,85,247,0.25), transparent 70%)",
                }}
            />

            {/* glowing border that only lights up near the cursor */}
            <div
                className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
                style={{
                    opacity: "var(--opacity, 0)",
                    padding: "1px",
                    background:
                        "radial-gradient(150px circle at var(--x) var(--y), rgba(168,85,247,0.8), transparent 70%)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />

            <img
                src={tech?.logo}
                alt={`${tech?.name} logo`}
                className={`w-10 md:w-16 rounded-md relative z-10`}
                style={
                	tech.color ? {
	                	borderColor: tech.color,
	                	borderWidth: "1px"
	                } : undefined
            	}
            />
            <p className="text-sm md:text-base font-medium relative z-10">{tech.name}</p>
        </article>
    );
};

const techs = [
	{ name: "JavaScript", logo: "/assets/svg/javaScript.svg" },
	{ name: "Node", logo: "/assets/svg/node.svg", color: "#339933" },
	{ name: "React", logo: "/assets/svg/react.svg" },
	{ name: "Next.js", logo: "/assets/svg/react.svg" },
	{ name: "Tailwindcss", logo: "/assets/svg/mongodb.svg" },
	{ name: "MongoDB", logo: "/assets/svg/mongodb.svg" },
	{ name: "Framer motion", logo: "/assets/svg/mongodb.svg" },
	{ name: "Figma", logo: "/assets/svg/mongodb.svg" },
]

export default function TechStack(){
	return(
		<section className="w-full flex flex-col gap-4 justify-center items-center pb-44 ">
			
			<h1 className="text-2xl font-black font-mono text-purple-500" >
				My TechStack
			</h1>

			<div
				className="flex justify-center flex-wrap gap-2 md:gap-8"
			>
				{
					techs.map((item, index) => (
						<StackTile key={index} tech={item} index={index} />
					))
				}
			</div>

		</section>
	)
}