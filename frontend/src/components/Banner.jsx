import { useEffect, useState, useRef } from "react";

import img1 from '/assets/traditional/hands_side.jpg';
import img2 from '/assets/traditional/group_face1_side.jpg';
import img3 from '/assets/traditional/frieren_composition.jpg';
import img4 from '/assets/traditional/hands.jpg';

const bannerImg = [img1, img2, img3, img4];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef();
  const followerRef = useRef();
  const buttonRefs = useRef([]);
  const intervalRef = useRef();

  const startInterval = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImg.length);
    }, 3000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(()=>{
    const btn = buttonRefs.current[current];

    if(!followerRef.current || !btn || !containerRef.current ) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const left = btnRect.left - containerRect.left + btnRect.width/2 - followerRef.current.offsetWidth/2;
    const top = btnRect.top - containerRect.top + btnRect.height/2 - followerRef.current.offsetHeight/2;


    followerRef.current.style.left = `${left}px`;
    followerRef.current.style.top = `${top}px`;

    followerRef.current.classList.remove("follower-animate");
    void followerRef.current.offsetWidth; // force animation
    followerRef.current.classList.add("follower-animate");

  }, [current])

  const handleDotClick = (index) => {
    setCurrent(index);
    startInterval();
  };

  return (
    <section className="relative banner-container isolate">
      <div className="bannerImg rounded-lg -z-10" style={{ backgroundImage: `url(${bannerImg[current]})` }} />

      <div
        ref={containerRef} 
        className="w-full absolute left-0 right-0 bottom-10 z-40 flex justify-center items-center gap-14 "
      >
        {
          bannerImg.map( (_, index)=>
            <div
              key={index}
              ref={(ele) => buttonRefs.current[index] = ele }
              onClick = { () => handleDotClick(index) }
                
              className={` ${current === index ? "bg-white" : "bg-purple-900"} w-2 h-2 rounded-full transition-all ease-in-out duration-300 cursor-pointer`}
            />
          )
        }

        {/*Follower, with squash and stretch*/}
        <div
          ref={followerRef}
          className={`absolute z-50 w-6 h-6 rounded-full border-2 border-purple-200 transition-[left,top] duration-300 ease-in-out pointer-events-none`}
        />
      </div>


      {/*Gradients w blending modes*/}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-gradient-to-bl from-pink-600/45 from-5% via-transparent to-transparent mix-blend-color-dodge"
      />

      <div
        className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-gradient-to-tr from-amber-600/45 from-5% via-transparent to-transparent mix-blend-color-dodge"
      />


    </section>
  );
}

export default Banner;
