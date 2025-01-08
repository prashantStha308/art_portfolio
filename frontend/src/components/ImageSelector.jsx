import { useEffect, useState } from 'react';
import { PostStore } from '../store/post.store.js'
import PictureTile from './PictureTile.jsx'
import Loading from './Loader.jsx';

const ImageSelector = ({ onClose , setSelected }) => {
    const { post , getAllPosts } = PostStore();
    const [loading , setLoading] = useState(true);

    useEffect( ()=>{
        const fetchPosts = async ()=>{
            setLoading(false);
            await getAllPosts();
            setLoading(true);
        }

        fetchPosts();
    },[getAllPosts , post] )

  return (
    <div className='absolute h-full w-full bg-black/10 backdrop-blur-lg rounded-lg p-4'>
        <header className='grid gap-2 pb-4 border-b border-b-gray-700 mb-8'>
            <h1 className='text-2xl text-gray-800 font-bold text-center'> Select Artworks </h1>
            <h2 className='text-lg text-gray-700 text-center'> Select the artworks to include them in the project </h2>
        </header>
        {
            loading ?
            <div className='grid gap-4'>
                <main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {
                        post.map( (item) => (
                            <PictureTile key={item._id} item={item} width={'20rem'} height={'20rem'} />
                        ) )
                    }
                </main>

                <footer className='flex justify-end'>
                    <button className='bg-red-500 hover:bg-red-700 active:bg-red-800 text-lg text-white py-2 px-4 rounded-md' onClick={onClose}> Close </button>
                </footer>
            </div>
            :
            <Loading />
        }
    </div>
  )
}

export default ImageSelector;