
const ProjectNav = () => {
  return (
    <>
      <div className="hidden md:block">
        <nav className="flex w-full justify-center p-8">
            <ul id="navbarList" className="flex justify-evenly w-full text-gray-700 border-b border-b-gray-400">
                <li>All</li>
                <li>Eternal Dance</li>
                <li>Cartooning Faces</li>
                <li>Speed Paints</li>
                <li>Commissions</li>
            </ul>
          </nav>
      </div>

      <div className="p-2 flex md:hidden border-b border-b-gray-900 ">
        <p className="text-sm text-center"> Our builder drawves are hard at work crafting the perfect navbar for smaller screens </p>
      </div>
    </>
  )
}

export default ProjectNav