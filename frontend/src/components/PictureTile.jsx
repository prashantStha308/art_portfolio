/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa";

const PictureTile = ({ item , fade = false , selectMode = false ,width , height , selectedList }) => {
  const selected = selectMode ? selectedList.includes(item) : false;

  const selectionStyle = {
    transform: 'scale(0.9)',
    opacity: 0.8,
  }
  const imgElement =
  <img
    className={`object-cover object-center thumb-img ${width ? '' : 'w-full'} ${height ? '' : 'h-auto'} `}
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
        <div className="relative object-contain">
          <div className="absolute text-2xl text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[15%] group-hover:opacity-100 group-hover:mt-0 capitalize">
            {item.title}
          </div>

          {imgElement}

          <div className="absolute bg-gray-700 opacity-0 top-0 left-0 h-full w-full group-hover:opacity-60 transition-all duration-300 z-10"></div>
        </div>
        :
        // if select mode on xa bhane
        selectMode ?
        <div className="h-auto w-full">
          {/* blue tick */}
          <div className="absolute top-4 right-2 z-40">
            <FaCheckCircle className= {`text-3xl text-blue-500 bg-white rounded-full ${ selected ? 'opacity-100' : 'opacity-0' } transition-all ease-in duration-300` }/>
          </div>

          <div className={`${selected && 'bg-gray-200 h-full w-full' }`} >
              {imgElement}
          </div>
        </div>
        :
        // if kunai effect select xaina
          (imgElement)
      }
    </div>
  );
};

export default PictureTile;
