import PictureGallery from "../components/PictureGallery";

const Gallery = () => {
    return (

        <div className="grid gap-14">

            <h1 className="text-gray-600 uppercase text-4xl text-center p-10 border-b border-b-gray-400"> Gallery </h1>
            {/* Gallery */}
            <PictureGallery />
        </div>

    );
};

export default Gallery;