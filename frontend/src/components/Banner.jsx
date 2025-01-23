import { useEffect, useState } from "react";
import img1 from '../assets/traditional/hands_side.jpg';
import img2 from '../assets/traditional/group_face1_side.jpg';
import img3 from '../assets/traditional/frieren_composition.jpg';
import img4 from '../assets/traditional/hands.jpg';

const bannerImg = [img1, img2, img3, img4];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  // const [bannerImg, setBannerImage] = useState([img1, img2, img3, img4]);

  // Auto Carousel on page load
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImg.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="banner-container">
        <div style={{ backgroundImage: `url(${bannerImg[current]})` }}></div>
    </div>
  );
}

export default Banner;
