import StackSection from "../../components/sections/StackSection";
import ExpressIcon from "../../components/icons/ExpressIcon.jsx";


const stackItems = [
	{ name: "JavaScript", logo: "/assets/svg/javaScript.svg", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
	{ name: "React", logo: "/assets/svg/react.svg", href: "https://react.dev/" },
	{ name: "Next.js", logo: "/assets/svg/next.svg", href: "https://nextjs.org/" },
	{ name: "Zustand", logo: "/assets/svg/zustand.svg", href: "https://zustand.docs.pmnd.rs" },
	{ name: "Tailwindcss", logo: "/assets/svg/tailwind.svg", href: "https://www.tailwindcss.com/" },
	{ name: "Motion", logo: "/assets/svg/motion.svg", href: "https://www.framer.com/motion/" },
	
	{ name: "Node", logo: "/assets/svg/node.svg", color: "#339933", href: "https://nodejs.org/" },
	{ name: "Express", logo: <ExpressIcon size={34} />, textColor: "dark:text-neutral-300", href: "https://expressjs.com/" },
	
	{ name: "MongoDB", logo: "/assets/svg/mongodb.svg", href: "https://www.mongodb.com/" },
]

export default function TechStack(){
	return(
		<StackSection stackItems={stackItems} title={"My TechStack"} />
	)
}