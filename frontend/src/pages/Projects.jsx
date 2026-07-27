import { useGetRepos, useGetPinnedRepos } from "../queries/proxy.query.js";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import BoxLoader from "../components/Loaders/BoxLoader";
import ProjectTile from "../components/tiles/ProjectTile"
import VerticallyStackingButton from "../components/buttons/VerticallyStackingButton";



export default function Projects(){

    const { data: pinned = [], isLoading: pinnedLoading, isError: pinnedIsError, error: pinnedError } = useGetPinnedRepos();
    const { data: repoRes = [], isLoading: repoLoading, isError: repoIsError, error: repoError } = useGetRepos();

    let exclude = [
        ...pinned.map(item => item.name),
        "prashantStha308"
    ]

    const repos = repoRes.filter( (data) => !exclude.includes(data.name) );


    return(
        <section
          className="flex flex-col gap-16 items-center h-full w-full py-8"
        >
            <article
                className="flex flex-col gap-2 items-center"
            >
                <h1 className="text-2xl font-black font-mono text-purple-500" >
                    Projects
                </h1>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-md text-center">
                    Handpicked repositories from my github profile. These are repos where I've had the most fun building and learning.
                </p>
            </article>

            <section
                className="w-full flex flex-col gap-8 items-center px-20 "
            >
                <h2 className="text-mono text-lg font-black font-mono text-purple-500" >
                    Pinned Repositories
                </h2>

                <div
                    className="flex justify-center flex-wrap gap-2 md:gap-8 md:px-8"
                >
                    {
                        pinnedLoading ? (
                            <div className="w-full flex justify-center p-10" >
                                <BoxLoader />
                            </div>
                        ) :
                        pinnedIsError ? (
                            <section>
                                Error occured: {pinnedError.message}
                            </section>
                        ) : (
                            pinned?.length === 0 ?(
                                <p>
                                    No Projects found
                                </p>
                            ) :(
                                pinned?.map((project, index) => (
                                    <ProjectTile key={index} project={project} />
                                ))
                            )
                        )
                    }
                </div>
            </section>

            <section
                className="w-full flex flex-col gap-8 items-center px-20 "
            >
                <h2 className="text-mono text-lg font-black font-mono text-purple-500" >
                    Repositories
                </h2>

                <div
                    className="flex justify-center flex-wrap gap-2 md:gap-8 md:px-8"
                >
                    {
                        repoLoading ? (
                            <div className="w-full flex justify-center p-10" >
                                <BoxLoader />
                            </div>
                        ) :
                        repoIsError ? (
                            <section>
                                Error occured: {repoError.message}
                            </section>
                        ) : (
                            repos?.length === 0 ?(
                                <p>
                                    No Projects found
                                </p>
                            ) :(

                                // eslint-disable-next-line react/jsx-no-undef
                                <MasonryPhotoAlbum
                                    photos={repos}
                                    defaultContainerWidth={typeof window !== "undefined" ? window.innerWidth : 400}
                                    columns={(containerWidth) => {
                                        if (containerWidth < 610) return 1; 
                                        if (containerWidth < 900) return 2;
                                        return 3;
                                    }}
                                    spacing={24}
                                    render={{
                                        photo: (_, { photo }) => {
                                            return (
                                                <ProjectTile project={photo} />
                                            );
                                        },
                                    }}
                                />
                            )
                        )
                    }
                </div>
            </section>
            
            <section
                className="pt-24 pb-44 flex flex-col items-center gap-16"
            >
                <h1 className="font-mono font-black text-purple-500 text-2xl" >
                    And many more to come...
                </h1>

                <VerticallyStackingButton>
                    <a href="https://www.github.com/prashantStha308">
                        Visit my github
                    </a>
                </VerticallyStackingButton>

            </section>

        </section>
    )
}