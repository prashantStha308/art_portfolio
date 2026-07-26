import StackSection from "../../components/sections/StackSection";
import GithubLogo from "../../components/icons/GithubLogo";

const stackItems = [
	{ name: "Figma", logo: "/assets/svg/figma.svg", href:"https://www.figma.com/" },

	{ name: "Git", logo: "/assets/svg/git.svg", href: "https://git-scm.com" },
	{ name: "Github", logo: <GithubLogo size={44} />, textColor: "#000000", href: "https://www.github.com/" },

	{ name: "Postman", logo: "/assets/svg/postman.svg", href: "https://www.postman.com/" },	
]

export default function ToolsUsed(){
	return(
		<StackSection stackItems={stackItems} title={"Tools I use"} />
	)
}