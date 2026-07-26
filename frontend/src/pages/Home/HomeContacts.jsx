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

{/*			<section
				className="bg-bg w-full max-w-3xl border border-purple-900/45 dark:border-purple-900 rounded-lg flex flex-col dark:bg-black/15"
			>
				<header
					className="flex justify-between items-center px-4 py-2 border-b border-purple-900/45 dark:border-purple-900 text-xs text-neutral-700 dark:text-neutral-300 font-mono"
				>
					Contact Me
				</header>
				
				<form
					action="mailto:sthaprashant0308@gmail.com"
					className=""
				>
					<div>
						<label htmlFor="email">Email</label>
					</div>
				</form>

			</section>*/}


			<section
				className="flex gap-8 items-center "
			>
				{
					iconsMap.map((item, index) => (
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

			<VerticallyStackingButton>
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