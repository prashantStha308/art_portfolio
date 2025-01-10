/* eslint-disable react/prop-types */

import PictureTile from './PictureTile.jsx'
import Loading from './Loader.jsx';
import { useState } from 'react';

const ImageSelector = ({ onClose , selectedImage , setSelected , isLoading , post }) => {

    const [ selectCount , setSelectCount ] = useState([{}]);

    const handleClick = ( id )=>{
        setSelected( prev =>{
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        } )
    }


  return (
    <div className='absolute h-full w-full bg-black/10 backdrop-blur-lg rounded-lg p-4 pb-0 overflow-hidden'>
        <div className='relative h-full w-full'>
            <header className='grid gap-2 pb-4 border-b border-b-gray-700 mb-8'>
                <h1 className='text-2xl text-gray-800 font-bold text-center'> Select Artworks </h1>
                <h2 className='text-lg text-gray-700 text-center'> Select the artworks to include them in the project </h2>
            </header>
            {
                isLoading ?
                <div className='grid gap-4 h-[75%]'>
                    {
                        post.length > 0 ?
                            (<main className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 h-full overflow-y-scroll imageSelector'>
                                {
                                    post.map( (item) => (
                                        <PictureTile key={item._id} item={item} width={'20rem'} height={'20rem'} selectMode={true} />
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

            <footer className='flex justify-end bg-white z-20 p-4 w-full absolute bottom-0'>
                <button className='bg-red-500 hover:bg-red-700 active:bg-red-800 text-lg text-white py-2 px-4 rounded-md' onClick={onClose}> Close </button>
            </footer>
        </div>
    </div>


  )
}

export default ImageSelector;