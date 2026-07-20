import { Link } from "react-router-dom";
import ProjectNav from "../components/ProjectNav"
import ProjectTiles from "../components/ProjectTiles"

import { ProjectStore } from "../store/project.store"
import Loading from "../components/Loader";

const Projects = () => {
  const { project } = ProjectStore();



  return (
    <div className="grid gap-4">
      <div>
        <h1 className="uppercase text-gray-800 text-3xl text-center font-bold hidden md:block"> Project </h1>
      </div>

      <ProjectNav project={project} />

      <div>
        {
          !loading ?
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
              {
                project.map( item => (
                  <Link key={ item._id } to={`/project/${item._id}`} >
                    <ProjectTiles item={item} />
                  </Link>
                ) )
              }
            </div>
          :
              <Loading />
        }
      </div>

    </div>
  )
}

export default Projects