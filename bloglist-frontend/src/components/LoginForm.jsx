import { useState } from 'react'
import Button from './Button'

const LoginForm = ({ onSubmit }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		onSubmit({ username, password })
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in</h2>

			<form onSubmit={handleLogin}>
				<div style={{ marginBottom: 10 }}>
					<label>
						username
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="username"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</label>
				</div>

				<div>
					<label>
						password
						<input
							style={{ marginLeft: 10 }}
							type="password"
							name="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</label>
				</div>

				<Button style={{ marginTop: 10 }} text="login" type="submit">
					login
				</Button>
			</form>
		</div>
	)
}

export default LoginForm
