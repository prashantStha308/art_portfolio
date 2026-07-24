import { Link } from "react-router-dom"

const ProjectNav = ({ project = [] }) => {
  return (
    <>
      <div className="hidden md:block">
        <nav className="flex w-full justify-center p-8">
            <ul id="navbarList" className="flex justify-evenly w-full text-gray-700 border-b border-b-gray-400">
                {
                  project.map( item => (
                    <li key={item._id}>
                      <Link to={`/project/${item._id}`} >
                        { item.title }
                      </Link>
                    </li>
                  ) )
                }
            </ul>
          </nav>
      </div>

      <div className="p-2 flex md:hidden ">
        {/* <p className="text-sm text-center"> Our builder drawves are hard at work crafting the perfect navbar for smaller screens </p> */}
          <nav className="flex w-full justify-center">
              <ul id="navbarList" className="flex justify-evenly w-full text-gray-700 border-b border-b-gray-400">
                  {
                    project.map( item => (
                      <li key={item._id}>
                        <Link to={`/project/${item._id}`} >
                          { item.title }
                        </Link>
                      </li>
                    ) )
                  }
              </ul>
            </nav>
      </div>
    </>
  )
}

export default ProjectNav