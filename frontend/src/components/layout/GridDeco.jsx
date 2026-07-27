import useBreakpoint from "../../hooks/useBreakpoint.jsx";


// eslint-disable-next-line react/prop-types
export default function GridDeco() {
	const isMobile = useBreakpoint();

	const opacity = 0.2;
	const size = isMobile ? 160 : 400;

	return (
		<div
			className="fixed inset-0 h-screen w-screen -z-20 pointer-events-none opacity-45"
			style={{
				backgroundImage: `
					linear-gradient(to right, rgb(var(--grid-line-color) / ${opacity}) 1px, transparent 1px),
					linear-gradient(to bottom, rgb(var(--grid-line-color) / ${opacity}) 1px, transparent 1px)
				`,
				backgroundSize: `${size}px ${isMobile ? size : size/2}px`,
			}}
		/>
	);
}