import { useEffect, useState } from "react";
import cartoon1 from '../assets/art/CartoonizingFaces.png';
import cartoon2 from '../assets/art/Cartoonizing Faces_2.png';
import cartoon3 from '../assets/art/Cartoonizing Faces_3.png';
import cartoon4 from '../assets/art/Cartoonizing Faces_4.png';

const bannerImg = [ cartoon1 , cartoon2 , cartoon3 , cartoon4 ];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImg.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <div style={{backgroundImage : `url(${bannerImg[current]})` }} className="banner-img" ></div>
    </div>
  );
}

export default Home;
