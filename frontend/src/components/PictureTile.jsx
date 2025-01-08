/* eslint-disable react/prop-types */

// const PictureTile = ({item}) => {
//   return (
//     <>
//         <div className="relative group">
//             {/* <img className="w-64 h-64 md:w-80 md:h-80 object-cover object-center" src={item.imgUrl.replace(/^backend/, '')} alt={item.title} /> */}

//             <div className="absolute text-2xl text-center font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-gray-200 z-20 transition-all duration-[0.35s] opacity-0 mt-[45%] group-hover:opacity-100 group-hover:mt-0 capitalize"> {item.title} </div>
//             <img className="w-64 h-64 md:w-80 md:h-80 object-cover object-center thumb-img" src={item.thumbnail} alt={item.title} />
//             <div className="absolute bg-gradient-to-b from-gray-900 from-10% opacity-60 top-0 left-0 h-full w-full group-hover:opacity-25 transition-all duration-300 z-10"> </div>
//         </div>
//     </>
//   )
// }

// export default PictureTile


const PictureTile = ({ item , fade = false , selectMode = false ,width , height }) => {

  const imgElement =
  <img
    className={`object-cover object-center thumb-img ${width ? '' : 'w-full'} ${height ? '' : 'h-auto'}`}
    style={{
      width: width || undefined,
      height: height || undefined,
    }}
    src={item.thumbnail}
    alt={item.title}
  />


  const handleSelection = ()=>{
    console.log("Hello world")
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
        <div>

          <div onClick={handleSelection}>
            {imgElement}
          </div>

          
        </div>

        :
          (imgElement)
      }
    </div>
  );
};

export default PictureTile;
