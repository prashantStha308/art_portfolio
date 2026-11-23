 import ExplodingTile from "../components/TestComponents/ExplodingTile"
import NotificationTile from "../components/tiles/NotificationTile"
import NotificationProvider from "../components/UI/NotificationProvider"

export default function Test(){
	return(
		<section
			className='h-full w-full mt-24 px-10 flex justify-center items-center '
		>
			<NotificationProvider />
		</section>

	)
}