import { FaCheckCircle } from "react-icons/fa";

const Tile = ({ item , fade = false , selectMode = false ,width , height , selectedList }) => {
  const selected = selectMode ? selectedList.includes(item) : false;

  const selectionStyle = {
    transform: 'scale(0.9)',
    opacity: 0.8,
  }
  const imgElement =
  <img
    className={`object-cover object-center thumb-img rounded-sm ${width ? '' : 'w-full'} ${height ? '' : 'h-auto'} `}
    style={{
      ...( selected && selectionStyle ),
      width: width || undefined,
      height: height || undefined,
      transition: 'all 0.15s ease-in',
    }}
    src={item.thumbnail}
    alt={item.title}
    loading="lazy"
  />


  return (
    <div className="relative group">
      {
        fade ?
            <div className="bg-gray-900 rounded-md p-2">
                <div className="relative object-contain">
                    <div className="absolute text-2xl text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[15%] group-hover:opacity-100 group-hover:mt-0 capitalize">
                        {item.title}
                    </div>

                    {imgElement}

                    <div className="absolute bg-gray-700 opacity-0 top-0 left-0 h-full w-full group-hover:opacity-60 transition-all duration-300 z-10"></div>
                </div>
                
                {/* DETAILS */}
                <div className="grid">
                    <p className="text-sm"> <span className="text-amber-500" > Title </span> : {item.title} </p>
                    <p className="text-sm"> <span className="text-amber-500" > ID </span> : <span  style={{fontSize: "0.8rem"}}> {item._id} </span> </p>
                    <p className="text-sm"> <span className="text-amber-500" > Time Created </span> : {item.timeCreated} </p>
                </div>

            </div>
        :
        // if kunai effect select xaina
          <div className="grid gap-2 bg-gray-950 rounded-md p-2">
            {imgElement}
            {/* details */}
            <div className="grid">
                <p className="text-sm"> <span className="text-amber-500" > Title </span> : {item.title} </p>
                <p className="text-sm"> <span className="text-amber-500" > ID </span> : <span  style={{fontSize: "0.8rem"}}> {item._id} </span> </p>
                <p className="text-sm"> <span className="text-amber-500" > Time Created </span> : {item.timeCreated} </p>
            </div>
          </div>
      }
    </div>
  );
};

export default Tile;
