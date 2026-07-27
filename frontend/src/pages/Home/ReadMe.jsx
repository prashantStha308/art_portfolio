import {motion} from "motion/react";
import ReactMarkdown from "react-markdown";

import { useGetReadMe } from "../../queries/proxy.query.js";

const colorMap = {
	0: "bg-green-500",
	1: "bg-amber-500",
	2: "bg-red-500",
};

export default function ReadMe() {
	const { data, isLoading, isError, error } = useGetReadMe();

	const readMeData = data?.replace(/<!--[\s\S]*?-->/g, "");


	return (
		<motion.section
			id="readMe"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
			className="w-full flex justify-center items-center px-2 pr-3"
		>

			<article
				className="bg-bg w-full max-w-3xl border border-purple-900/45 dark:border-purple-900 rounded-lg flex flex-col dark:bg-black/15"
			>

				<header
					className="flex justify-between items-center px-4 py-2 border-b border-purple-900/45 dark:border-purple-900 text-xs text-neutral-700 dark:text-neutral-300 font-mono"
				>
					<div>
						<a
							href="https://github.com/prashantStha308"
							target="_blank" rel="noreferrer"
							className="hover:underline"
						>
							prashantStha308/README.md
						</a>
					</div>

					<div className="flex gap-2">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className={`w-3 h-3 rounded-full ${colorMap[index]}`} />
						))}
					</div>

				</header>

				<article className="text-sm px-4 py-3">
					{isLoading ? (
						<div className="space-y-2 animate-pulse">
							<div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4" />
							<div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-1/2" />
							<div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-5/6" />
							<div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-2/3" />
						</div>
					) : isError ? (
						<span className="text-red-500">⚠ Failed to load README: {error.message}</span>
					) : (
						<div className="prose dark:prose-invert prose-sm max-w-none">
							<ReactMarkdown>{readMeData}</ReactMarkdown>
						</div>
					)}
				</article>
			</article>
		</motion.section>
	);
}