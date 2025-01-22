const ProjectTiles = ({ item }) => {

  if (!item) {
    return (
      <div>
        NO ITEMS
      </div>
    )
  }

  return (
    <div>
      <div className="relative group">

        {/* FADE TITLE */}
        <div className="absolute text-2xl text-center font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[15%] group-hover:opacity-100 group-hover:mt-0 capitalize rounded-sm">
          {item.title}
        </div>

        {/* ACTUAL IMAGE */}
        <div className="w-full h-48 md:h-60 overflow-hidden relative rounded-sm">
          <img
            className="w-full h-full object-cover object-center"
            src={item.thumbnail}
            alt={item.title}
          />
        </div>

        {/* FADE DIV */}
        <div className="absolute bg-gradient-to-b from-gray-900 from-10% opacity-60 top-0 left-0 h-full w-full group-hover:opacity-45 transition-all duration-300 z-10 rounded-sm"> </div>

      </div>
    </div>
  )
}

export default ProjectTiles
