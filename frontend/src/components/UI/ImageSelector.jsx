/* eslint-disable react/prop-types */

import PictureTile from './PictureTile.jsx'
import Loading from './Loader.jsx';
import { PostStore } from '../store/post.store.js';

const ImageSelector = ({ onClose , selected , setSelected , isLoading }) => {

    const { post } = PostStore();

    // selected is an array of objects
    // item is an object
    // so, just check if the object is in tha array of objects,
    // if it exists, remove it from the selected list, if not, add it to selected list
    const handleSelect = ( item ) => {
        const updatedList = selected.includes( item ) ? selected.filter( selectedItem => ( selectedItem._id !== item._id ) ) : [ ...selected , item ];
        setSelected(updatedList);
    };
    

  return (
    <div className='absolute h-full w-full bg-black/10 backdrop-blur-lg rounded-lg p-4 pb-0 overflow-hidden'>
        <div className='relative h-full w-full'>
            <header className='grid gap-2 pb-4 border-b border-b-gray-700 mb-8'>
                <h1 className='text-lg md:text-xl lg:text-2xl text-gray-800 font-bold text-center'> Select Artworks </h1>
                <h2 className='text-sm md:text-lg lg:text-xl text-gray-700 text-center'> Select the artworks to include them in the project </h2>
            </header>
            {
                !isLoading ?
                <div className='grid gap-3 md:m-4 h-[75%]'>
                    {
                        post.length > 0 ?
                            (<main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 h-full overflow-y-scroll imageSelector'>
                                {
                                    post.map( (item) => (
                                        <div key={item._id} onClick={ () => { handleSelect( item ) } }>
                                            <PictureTile item={item} width={'20rem'} height={'20rem'} selectMode={true} selectedList={selected} />
                                        </div>

                                    ) )
                                }
                            </main>)
                        :
                            <div className='h-full flex justify-center items-center'>
                                <h1 className='text-2xl text-gray-700 text-center'> No Artworks found </h1>
                            </div>

                    }
                </div>
                    :
                <Loading />
            }

            <footer className='flex justify-end gap-4 bg-white z-20 p-4 w-full absolute bottom-0'>
                <button className=' text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-md ' onClick={onClose}> Select </button>
            </footer>
        </div>
    </div>


  )
}

export default ImageSelector;