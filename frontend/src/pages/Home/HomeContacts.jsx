import { Link } from "react-router-dom";
import { motion } from "motion/react";

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
];

const staggeringParent ={
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const staggeringChildren = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0 },
}


export default function HomeContacts(){

	return(
		<section
			id="contact"
			className="w-full flex flex-col gap-16 justify-center items-center px-2 pr-3 pb-44 "
		>
			<motion.h1
				initial={{
					opacity: 0,
					y: 16
				}}

				whileInView={{
					opacity: 1, y:0
				}}

				transition={{
					type: "spring",
					damping: 10,
					stiffness: 80
				}}
				
				className="text-2xl font-black font-mono text-purple-500"
			>
				Stay in touch
			</motion.h1>

			<motion.section
				className="flex gap-8 items-center "
				variants={staggeringParent}
				initial={"hidden"}
				whileInView={"visible"}
			>
				{
					iconsMap.map((item) => (
						<motion.a
							variants={staggeringChildren}
							key={item.name}
							href={item.href}
							className="text-purple-500 hover:text-amber-500"
						>
							{item.icon}
						</motion.a>
					))
				}
			</motion.section>

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