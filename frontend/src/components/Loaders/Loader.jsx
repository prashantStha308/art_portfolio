/* eslint-disable react/prop-types */

export default function Loading({ styles, inline = false }) {
  return (
      <div
          className={`flex justify-center items-center ${
              inline ? 'h-6 w-full' : 'h-40 w-40 fixed top-1/2'
          } ${styles}`}
      >
          <div
              className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-200 border-r-pink-800 rounded-full"
              role="status"
          >
              <span className="sr-only">Loading...</span>
          </div>
      </div>
  );
}

  

  // <div className={`flex justify-center items-center h-40 w-40 bg-black/10  backdrop-blur-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md z-50`} >
  //   <div className=" spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-r-blue-700 dark:border-r-blue-600 rounded-full" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
  // </div>