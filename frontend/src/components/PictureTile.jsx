/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const PictureTile = ({ item , fade = false , selectMode = false ,width , height }) => {

  const [ isSelected , setIsSelected ] = useState(false);
  const [ selectCount , setSelectCount ] = useState(0);

  const selectionStyle = {
    transform: 'scale(0.9)',
    opacity: 0.8,
  }
  const imgElement =
  <img
    className={`object-cover object-center thumb-img ${width ? '' : 'w-full'} ${height ? '' : 'h-auto'}`}
    style={{
      ...( isSelected && selectionStyle ),
      width: width || undefined,
      height: height || undefined,
      transition: 'all 0.15s ease-in',
    }}
    src={item.thumbnail}
    alt={item.title}
  />

  const handleSelection = ()=>{
    if( selectCount === 0 ){
      setIsSelected(true);
      setSelectCount(1);
    }else{
      setIsSelected(false);
      setSelectCount(0);
    }
  }

  return (
    <div className="relative group">
      {
        fade ?
        <div>
          <div className="absolute text-2xl text-center font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[45%] group-hover:opacity-100 group-hover:mt-0 capitalize">
            {item.title}
          </div>

          {imgElement}

          <div className="absolute bg-gradient-to-b from-gray-900 from-10% opacity-60 top-0 left-0 h-full w-full group-hover:opacity-25 transition-all duration-300 z-10"></div>
        </div>
        :
        selectMode ?
        <div className="h-full w-full">
          {/* blue tick */}
          <div className="absolute top-4 right-2 z-40">
            <FaCheckCircle className= {`text-3xl text-blue-500 bg-white rounded-full ${ isSelected ? 'opacity-100' : 'opacity-0' } transition-all ease-in duration-300` }/>
          </div>

          <div className={`${isSelected && 'bg-gray-200 h-full w-full' }`} >
            <div onClick={handleSelection}>
              {imgElement}
            </div>
          </div>
        </div>
        :
          (imgElement)
      }
    </div>
  );
};

export default PictureTile;
