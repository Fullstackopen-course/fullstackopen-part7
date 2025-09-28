const Notification = ({ type, message }) => {
	return <p className={`notification ${type}`}>{message}</p>
}

export default Notification
