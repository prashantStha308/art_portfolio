import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import InstagramIcon from "../icons/InstagramIcon";
import GithubLogo from "../icons/GithubLogo";
import LinkedInLogo from "../icons/LinkedInLogo";
import GmailIcon from "../icons/GmailIcon";



// eslint-disable-next-line react/prop-types
const ScrollingText = ({ currentLocation }) => {
    return (
        <div className="relative h-5 w-full overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentLocation}
                    initial={{
                        y: "100%",
                        opacity: 0,
                    }}
                    animate={{
                        y: "0%",
                        opacity: 1,
                    }}
                    exit={{
                        y: "-100%",
                        opacity: 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 38,
                        mass: 0.6,
                    }}
                    className="absolute inset-0 flex items-center gap-2 text-xs md:text-sm whitespace-nowrap"
                >
                    {currentLocation}

                    <div className="h-4 w-0.5 bg-purple-500" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};


export default function SubNav(){

	const [currentLocation, setCurrentLocation] = useState("Prashant Shrestha");
	const location = useLocation();

	useEffect(()=>{
		if( location.pathname.includes("gallery") ){
			setCurrentLocation("Gallery");
		}else{
			setCurrentLocation("Prashant Shrestha");
		}
	},[location])


    return(
        <header className='fixed top-0 right-0 left-0 lg:left-28 z-40 flex flex-col' >
            <section className=" border-b border-b-purple-500 flex justify-between items-center ">

                <section
                    className=" bg-bg flex justify-between items-center w-full px-4 py-2"
                >
                    <div
                        className="flex items-center gap-4 text-purple-500 uppercase text-lg font-bold text-center w-full h-fit"
                    >
                        <a
                            href={"https://instagram.com/pop__sickle"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500 hover:opacity-75'
                        >
                            <InstagramIcon size={18} />
                        </a>

                        <ScrollingText currentLocation={currentLocation} />
                    </div>

                    <div className=' flex items-center gap-4 text-purple-500 pr-4' >

                        <a
                            href={"mailto:sthaprashant0308@gmail.com"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <GmailIcon size={18 } />
                        </a>

                        <a
                            href={"https://github.com/prashantStha308/"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <GithubLogo size={20} />
                        </a>

                        <a
                            href={"https://github.com/prashantStha308/"}
                            target='_blank'
                            className='cursor-pointer hover:text-amber-500'
                        >
                            <LinkedInLogo size={18} />
                        </a>

                    </div>
                </section>
            </section>

            {/*<div className='bg-bg w-full h-2' />*/}

        </header>
    )
}