/* eslint-disable react/prop-types */


const colorMap = {
    0: "bg-green-500",
    1: "bg-amber-500",
    2: "bg-red-500",
};

export default function ProjectTile({ project }){

    const finalizedProject = {
        ...project,
        description: project?.description?.replace("[Include]", "")
    }


    return(
        <div
            className="flex flex-col gap-1 w-72 md:w-96 border border-purple-900/45 dark:border-purple-900 rounded-lg bg-bg cursor-pointer"
        >

            <header
                className="flex justify-between items-center px-4 py-1 border-b border-purple-900/45 dark:border-purple-900 text-[10px] text-neutral-700 dark:text-neutral-300 font-mono"
            >
                <span>
                    {finalizedProject?.author}/{finalizedProject?.name}
                </span>

                <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className={`w-1 h-1 rounded-full ${colorMap[index]}`} />
                    ))}
                </div>

            </header>

            <article
                className="flex flex-col gap-3 text-sm px-4 py-2 text-sans"
            >
                <a
                    href={`https://www.github.com/${finalizedProject?.author}/${finalizedProject?.name}`}
                    className="text-sm font-semibold text-purple-500 hover:underline"
                >
                    {finalizedProject?.name}
                </a>

                <p className="text-xs break-words" >
                    {finalizedProject?.description}
                </p>

                <div className="flex justify-between" >
                    <div className="flex gap-1 items-center" >
                        <div
                            className={`w-3 h-3 rounded-full`}
                            style={{ backgroundColor: finalizedProject?.languageColor }}
                        />

                        <span className="text-xs" >
                            {finalizedProject?.language}
                        </span>
                    </div>

                    <a
                        href={`https://www.github.com/${finalizedProject?.author}/${finalizedProject?.name}`}
                        className="text-xs bg-purple-500 opacity-100 hover:opacity-75 px-4 py-1 rounded-sm text-neutral-100 transition-all ease-in-out duration-150"
                    >
                        View Source
                    </a>
                </div>

            </article>
        </div>
    )
}