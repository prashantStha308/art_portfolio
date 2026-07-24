import { useState, useEffect } from "react";


export default function ReadMe() {
	const [isLoading, setIsLoading] = useState(true);
	const [readMeData, setReadMeData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchRawReadMe = async () => {
			const res = await fetch(
				"https://api.github.com/repos/prashantStha308/prashantStha308/readme",
				{
					method: "GET",
					headers: { Accept: "application/vnd.github.raw" },
				}
			);
			if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
			return res.text();
		};

		(async () => {
			try {
				setIsLoading(true);
				const raw = await fetchRawReadMe();
				if (isMounted) setReadMeData(raw);
			} catch (err) {
				console.error("An error occurred", err);
				if (isMounted) setError(err.message);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);


	return (
		<section className="w-full flex justify-center items-center pb-10">

			<article
				className="w-9/12 w-full border border-amber-900/45 rounded-lg flex flex-col dark:bg-black/15"
			>
				<header
					className="px-4 py-2 border-b border-amber-900/45 text-sm text-neutral-700 dark:text-neutral-300 "
				>

					<a href="https://github.com/prashantStha308" target="_blank" rel="noreferrer">
						prashantStha308
					</a>
					 / README.md
				</header>

				<article className="text-sm px-4 py-3 whitespace-pre-wrap">
					{isLoading ? "Filtering README.md for safe contents..." : error ? `Error: ${error}` : readMeData}
				</article>
			</article>
		</section>
	);
}
