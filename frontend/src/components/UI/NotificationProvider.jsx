import NotificationTile from "../tiles/NotificationTile";

export default function NotificationProvider(){
	return(
		<section
			className="fixed top-5 right-0 p-5 "
		>
			<NotificationTile />
		</section>
	)
}