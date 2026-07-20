import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import pfp from '/assets/digital/CartoonizingFaces.png';


const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navbarRef = useRef();
	const location = useLocation();

	const toggleNavbar = () => setIsOpen(!isOpen);

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

	const links = [
		{ label: "Home", href: "/", isActive: location.pathname === "/" },
		{ label: "Gallery", href: "/gallery", isActive: location.pathname.includes("/gallery") },
		{ label: "Project", href: "/project", isActive: location.pathname === "/project" },
		{ label: "Service", href: "/service", isActive: location.pathname === "/service" },
	]

	const NavbarLinks = 
		<ul id="navbarList" className="grid gap-2 text-lg text-gray-700">
			{
				links.map((item, index) => (
					<li
						key={index}
						className={item.isActive ? "text-purple-500" : ""}
					>
						<Link to={`${item.href}`} >
							{item.label}
						</Link>
					</li>
				))
			}
		</ul>

	return (
		<>
			{/* For Bigger Screens */}
			<header className="hidden md:flex flex-col min-h-screen w-1/6 p-8 box-border">
				<div className="flex flex-col gap-12 h-full">

					<div>
						<img src={pfp} alt="pfp" className="rounded-full w-64 aspect-square object-cover border-4 border-purple-500 " />
					</div>

					<nav>
						{NavbarLinks}
					</nav>
				</div>
			</header>

			{/* Navbar for smaller screens */}
			{
				isOpen && (
				<header className="grid gap-4 min-h-screen w-full absolute bg-black/50 z-50">
					<div ref={navbarRef} className="bg-white min-h-screen w-3/5 py-4 z-50">
						<div className="grid justify-center content-center gap-8">
							<div>
								<img src={pfp} alt="pfp" className="rounded-full w-28 aspect-square object-cover" />
							</div>

							<nav>
								{NavbarLinks}
							</nav>
						</div>
					</div>
				</header>
				)
			}

			{/* Navbar for smaller screens - Top Navbar */}
			<header className="flex items-center sm:hidden p-4 bg-white justify-between w-full">
				<Link to="/">
					<div>
						<img src={pfp} alt="pfp" className="rounded-full w-10 aspect-square object-cover" />
					</div>
				</Link>
				<div>
					<h1
						className="text-center text-sm text-gray-600 font-bold capitalize text-wrap break-all"
					>
						{
							location.pathname === "/"
							? "home"
							: location.pathname.replace(/^\//, "")
						}
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
