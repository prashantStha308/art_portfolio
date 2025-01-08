
const ProjectTiles = () => {

  // dummmy data
  const item = {
    title: "DUMMY",
    thumbnail: "https://picsum.photos/200/300"
  }

  if(!item){
    return (
      <div>
        NO ITEMS
      </div>
    )
  }

  return (
    <div>
        <div className="relative group">
          {/* <img className="w-64 h-64 md:w-80 md:h-80 object-cover object-center" src={item.imgUrl.replace(/^backend/, '')} alt={item.title} /> */}

          {/* FADE TITLE */}
          <div className="absolute text-2xl text-center font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[45%] group-hover:opacity-100 group-hover:mt-0 capitalize rounded-sm"> {item.title} </div>

          {/* ACTUAL IMAGE */}
          <img className="w-64 h-44 md:w-80 md:h-52 object-cover object-center rounded-sm" src={item.thumbnail} alt={item.title} />

          {/* FADE DIV */}
          <div className="absolute bg-gradient-to-b from-gray-900 from-10% opacity-60 top-0 left-0 h-full w-full group-hover:opacity-25 transition-all duration-300 z-10 rounded-sm"> </div>

        </div>
    </div>
  )
}

export default ProjectTiles