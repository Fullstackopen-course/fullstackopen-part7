import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification)

	return (
		notification &&
		<div>
			<p className={`notification ${notification.type}`}>{notification.message}</p>
		</div>
	)
}
export default Notification
