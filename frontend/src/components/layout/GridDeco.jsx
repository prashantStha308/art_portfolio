// eslint-disable-next-line react/prop-types
export default function GridDeco({ size = 400, opacity=0.45 }) {
	return (
		<div
			className="fixed inset-0 h-screen w-screen -z-20 pointer-events-none opacity-45"
			style={{
				backgroundImage: `
					linear-gradient(to right, rgb(var(--grid-line-color) / ${opacity}) 1px, transparent 1px),
					linear-gradient(to bottom, rgb(var(--grid-line-color) / ${opacity}) 1px, transparent 1px)
				`,
				backgroundSize: `${size}px ${size/2}px`,
			}}
		/>
	);
}