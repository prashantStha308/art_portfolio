import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import pfp from '../assets/digital/CartoonizingFaces.png';

const Navbar = ({ devMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeNavbar);
    } else {
      document.removeEventListener("mousedown", closeNavbar);
    }
    return () => {
      document.removeEventListener("mousedown", closeNavbar);
    };
  }, [isOpen]);

  const NavbarLinks = () => (
    <ul id="navbarList" className="grid gap-2 text-lg text-gray-700">
      <li className={location.pathname === "/" ? "text-pink-500" : ""}>
        <Link to="/">Home</Link>
      </li>
      <li className={location.pathname.includes("/gallery") ? "text-pink-500" : ""}>
        <Link to="/gallery">Gallery</Link>
      </li>
      <li className={location.pathname === "/project" ? "text-pink-500" : ""}>
        <Link to="/project">Projects</Link>
      </li>
      <li className={location.pathname === "/service" ? "text-pink-500" : ""}>
        <Link to="/service">Services</Link>
      </li>
      <li className={location.pathname === "/about" ? "text-pink-500" : ""}>
        <Link to="/about">About</Link>
      </li>

      {
        devMode &&
        <>
          --- TEMPORARY LINKS ---
          <li className={location.pathname === "/upload" ? "text-pink-500" : ""}>
            <Link to="/upload">Upload</Link>
          </li>
          <li className={location.pathname === "/createProject" ? "text-pink-500" : ""}>
            <Link to="/createProject">Create Projects</Link>
          </li>
        </>
      }

    </ul>
  );

  return (
    <>
      {/* For Bigger Screens */}
      <header className="hidden md:grid gap-4 min-h-screen w-1/6 bg-gray-200 p-8 box-border content-between">
        <div className="grid gap-4 h-full">
          <div>
            <img src={pfp} alt="pfp" className="rounded-full w-64 aspect-square object-cover" />
          </div>
          <nav>
            <NavbarLinks />
          </nav>
        </div>
      </header>

      {/* Navbar for smaller screens */}
      {isOpen && (
        <header className="grid gap-4 min-h-screen w-full absolute bg-black/50 z-50">
          <div ref={navbarRef} className="bg-white min-h-screen w-3/5 py-4 z-50">
            <div className="grid justify-center content-center gap-8">
              <div>
                <img src={pfp} alt="pfp" className="rounded-full w-28 aspect-square object-cover" />
              </div>
              <nav>
                <NavbarLinks />
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Navbar for smaller screens - Top Navbar */}
      <header className="flex items-center sm:hidden p-4 bg-white justify-between w-full">
        <Link to="/">
          <div>
            <img src={pfp} alt="pfp" className="rounded-full w-10 aspect-square object-cover" />
          </div>
        </Link>
        <div>
          <h1 className="text-center text-sm text-gray-600 font-bold capitalize text-wrap break-all">
            {location.pathname === "/"
              ? "home"
              : location.pathname.replace(/^\//, "")}
          </h1>
        </div>
        <div onClick={toggleNavbar}>
          <RxHamburgerMenu size={30} />
        </div>
      </header>
    </>
  );
};

export default Navbar;
