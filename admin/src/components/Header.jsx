import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass, FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ Category ,  handleInput, searchWord }) => {

  const [category, setCategory] = useState("Post");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ openLink , setOpenLink ] = useState(false);
  const catRef = useRef(null);
  const navigator = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect( ()=>{
    if( Category ){
      setCategory(Category);
    }
  } ,  [Category] );

  const handelRedirect = ( cat , dir ) => {
    // sets false if current category is not the category to be made
    const redir = cat === category;
    setCategory(cat);
    setDropdownOpen(false);
    // only redirect if the "cat" is not current category
    if( !redir ) {
        navigator(dir);
    }
  }

  return (
    <header className="flex justify-between items-center md:m-4 gap-2 border-b border-b-white p-0 md:px-2 pb-4">
      {/* Dropdown */}
      <div className="relative hidden md:block " ref={catRef} >
        <button
          className="md:text-lg lg:text-2xl font-bold text-blue-500 bg-transparent px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {category} Manager <span className="text-gray-400" > <FaChevronDown /> </span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <ul className="absolute left-0 bg-gray-900 w-full rounded-md shadow-lg z-10">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-950 text-blue-600 rounded-md"
              onClick={ ()=> handelRedirect("Post" , "/post") }
            >
              Post Manager
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-950 text-purple-600 rounded-md"
              onClick={ () => handelRedirect( "Project" , "/project" ) }
            >
              Project Manager
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-950 text-gray-400 rounded-md"
              onClick={ () => handelRedirect( "Home" , "/" ) }
            >
              Home
            </li>
          </ul>
        )}
      </div>

      {/* For smaller devices */}
      <div className="md:hidden flex place-content-center" >
        <button className="text-2xl text-center" onClick={()=> setOpenLink(true)} >
          <RxHamburgerMenu />
        </button>
      </div>
      {/* Need to figure out how to swicth betwene categories in mobile */}

      {/* Search Bar */}
      <div className="flex justify-evenly gap-0 border border-white rounded-lg">
        <input
          type="text"
          className="px-2 md:max-w-3xs outline-none p-2"
          placeholder={`Search ${category} via Title or ID`}
          onChange={handleInput}
          value={searchWord}
        />
        <button className="border-l border-l-white p-2 hidden md:block">
          <FaMagnifyingGlass height={20} width={20} />
        </button>
      </div>

      {/* Create Button */}
      <div>
        <Link to={ category === "Post" ? "/createPost" : "/createProject" }>
          <button className="text-lg px-2 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 active:bg-blue-800">
            Create
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
