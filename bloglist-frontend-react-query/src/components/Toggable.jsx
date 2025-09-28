import { useState } from 'react'
const Toggable = (props) => {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			{visible && props.children}

			<button onClick={() => setVisible(!visible)} style={{ marginTop: 10 }}>
				{visible ? 'cancel' : props.buttonText}
			</button>
		</div>
	)
}

export default Toggable
