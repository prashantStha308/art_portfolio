import TiltHoverCard from "./TiltHoverCard.jsx";

export default function ProjectTile({ project }){

    const bgColor = `bg-${project?.languageColor}`

    return(
        <TiltHoverCard >
            <div
                className="flex flex-col gap-1 w-72 md:w-96 border border-purple-900/45 dark:border-purple-900 rounded-lg bg-bg flex-grow-0 cursor-pointer"
            >

                <header
                    className="flex justify-between items-center px-4 py-1 border-b border-purple-900/45 dark:border-purple-900 text-[10px] text-neutral-700 dark:text-neutral-300 font-mono"
                >
                    {project?.author}/{project?.name}
                </header>

                <article
                    className="flex flex-col gap-3 text-sm px-4 py-2 text-sans"
                >
                    <a
                        href={`https://www.github.com/${project?.author}/${project?.name}`}
                        className="text-sm font-semibold text-purple-500 hover:underline"
                    >
                        {project?.name}
                    </a>

                    <p className="text-xs" >
                        {project?.description}
                    </p>

                    <div className="flex gap-1 items-center" >
                        <div
                            className={`w-3 h-3 rounded-full bg-[#f1e05a] `}
                        />

                        <span className="text-xs" >
                            {project?.language}
                        </span>

                    </div>

                </article>
            </div>
        </TiltHoverCard>
    )
}