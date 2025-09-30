import { useState } from 'react'
import loginService from '../services/loginService'
import { useNotificationDispatch, useUserDispatch } from '../contexts/AppContext'
import blogService from '../services/blogService'
import userService from '../services/userService'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const notificationDispatch = useNotificationDispatch()
	const userDispatch = useUserDispatch()
	const navigate = useNavigate()

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('user', JSON.stringify(user))
			userDispatch({ type: 'SET_USER', payload: user })
			blogService.setToken(user.token)
			userService.setToken(user.token)
			navigate('/')
		} catch (error) {
			notificationDispatch({
				type: 'SET_NOTIFICATION',
				payload: {
					type: 'error',
					message: `an error ocurred: ${error.response.data.error}`,
				},
			})
			setTimeout(() => {
				notificationDispatch({
					type: 'REMOVE_NOTIFICATION',
				})
			}, 5000)
		}
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		handleLogin({ username, password })
		setUsername('')
		setPassword('')
	}

	return (
		<div className="container d-flex justify-content-center vh-100">
			<div className="row w-50 d-flex align-content-center">
				<form onSubmit={onSubmit}>
					<h2>Log in</h2>
					<div className="mb-3">
						<label className="form-label" htmlFor="username">
							username
						</label>

						<input
							id="username"
							className="form-control"
							type="text"
							name="username"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label" htmlFor="password">
							password
						</label>
						<input
							id="password"
							className="form-control"
							type="password"
							name="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<div id="passwordHelpBlock" className="form-text">
							Your password must be 8-20 characters long, contain letters and numbers, and must not
							contain spaces, special characters, or emoji.
						</div>
					</div>

					<button className="btn btn-primary" type="submit">
						login
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
