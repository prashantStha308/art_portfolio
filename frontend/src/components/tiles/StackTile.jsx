import { useRef, useEffect } from "react";
import useUIStore from "../../store/ui.store.js";


export default function StackTile({ tech }) {
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
        <a
            ref={containerRef}
            href={tech.href ?? null}
            target= "_blank"
            
            className="h-14 md:h-24 group relative flex gap-4 items-center border border-purple-500/45 backdrop-blur-3xl rounded-lg px-4 md:px-8  bg-bg/40 text-neutral-700 dark:text-neutral-300 overflow-hidden cursor-pointer"
        >
			{/* tracks cursor */}
			<div
			    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
			    style={{
			        opacity: "var(--opacity, 0)",
			        background:
			            "radial-gradient(200px circle at var(--x) var(--y), rgba(245,158,11,0.25), transparent 70%)",
			    }}
			/>
			{/* glowing border that only lights up near the cursor */}
			<div
			    className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
			    style={{
			        opacity: "var(--opacity, 0)",
			        padding: "1px",
			        background:
			            "radial-gradient(150px circle at var(--x) var(--y), rgba(245,158,11,0.8), transparent 70%)",
			        WebkitMask:
			            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
			        WebkitMaskComposite: "xor",
			        maskComposite: "exclude",
			    }}
			/>

            {
            	typeof tech.logo === "string" ? 
            	(
		            <img
		                src={tech?.logo}
		                alt={`${tech?.name} logo`}
		                className={`w-10 md:w-14 rounded-md relative z-10 ${tech.textColor && tech.textColor} `}
		                style={
		                	tech.color ? {
			                	borderColor: tech.color,
			                	borderWidth: "1px"
			                } : undefined
		            	}
		            />
            	): (
            		<div className={`${tech.textColor && tech.textColor }`} >
            			{tech.logo}
            		</div>
            	)
            }

            <p className="text-sm md:text-base font-medium relative z-10">{tech.name}</p>
        </a>
    );
};
