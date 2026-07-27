import { Link } from "react-router-dom";

import GithubLogo from "../../components/icons/GithubLogo";
import GmailIcon from "../../components/icons/GmailIcon";
import InstagramIcon from "../../components/icons/InstagramIcon";
import LinkedInLogo from "../../components/icons/LinkedInLogo";

import VerticallyStackingButton from "../../components/buttons/VerticallyStackingButton";


const iconsMap = [
	{
		name: "LinkedIn",
		icon: <LinkedInLogo size={36} />,
		href: "https://www.linkedin.com/in/prashant-shrestha-741a32342"
	},
	{
		name: "Github",
		icon: <GithubLogo size={36} />,
		href: "https://www.github.com/prashantStha308"
	},
	{
		name: "Gmail",
		icon: <GmailIcon size={36} />,
		href: "mailto://sthaprashant0308@gmail.com"
	},
	{
		name: "Instagram",
		icon: <InstagramIcon size={36} />,
		href: "https://www.instagram.com/pop__sickle"
	},
]

export default function HomeContacts(){

	return(
		<section
			id="contacts"
			className="w-full flex flex-col gap-16 justify-center items-center px-2 pr-3 pb-44 "
		>
			<h1 className="text-2xl font-black font-mono text-purple-500" >
				Stay in touch
			</h1>

			<section
				className="flex gap-8 items-center "
			>
				{
					iconsMap.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-purple-500 hover:text-amber-500"
						>
							{item.icon}
						</a>
					))
				}
			</section>

			<VerticallyStackingButton
				colorMap={{
					0: "bg-purple-300 ",
					1: "bg-purple-400 ",
					2: "bg-purple-500 ",
				}}
				textColor="text-white"
				endBoxColor="bg-purple-200"
			>
				<Link
					to={"/resume"}
					className="text-mono"
				>
					Resume
				</Link>
			</VerticallyStackingButton>

		</section>
	)
}