import { useNotificationValue } from '../contexts/AppContext'

const Notification = () => {
	const notification = useNotificationValue()

	return (
		notification &&
		<p className={`notification ${notification.type}`}>{notification.message}</p>
	)
}

export default Notification
