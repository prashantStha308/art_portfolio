import ProjectNav from "../components/ProjectNav"
import ProjectTiles from "../components/ProjectTiles"

const Projects = () => {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="uppercase text-gray-800 text-3xl text-center font-bold"> Project </h1>
      </div>

      <ProjectNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProjectTiles />
      </div>
    </div>
  )
}

export default Projects