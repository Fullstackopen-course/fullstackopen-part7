import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { removeUser, setUser } from './reducers/userReducer'
import { useEffect } from 'react'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	useEffect(
		() => {
			async function fetchBlogs() {
				dispatch(initBlogs())
			}

			fetchBlogs()
		}
	)

	useEffect(
		() => {
			const loggedUserJSON = window.localStorage.getItem('user')
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON)
				dispatch(setUser(user))
				blogService.setToken(user.token)
			}
		},
		[dispatch]
	)


	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			dispatch(setUser(user))
			blogService.setToken(user.token)
			window.localStorage.setItem('user', JSON.stringify(user))
		} catch (error) {
			dispatch(
				setNotificationWithTimeout(
					{
						type: 'error',
						message: `an error ocurred: ${error.response.data.error}`,
					},
					5
				)
			)
		}
	}

	const handleLogout = () => {
		dispatch(removeUser())
		blogService.setToken(null)
		window.localStorage.removeItem('user')
	}

	return (
		<div>
			<Notification />

			{!user && <LoginForm onSubmit={handleLogin} />}
			{user && (
				<div>
					<span>{user.name} logged in</span>

					<Button
						style={{ marginLeft: 10, marginBottom: 10 }}
						text="logout"
						onClick={handleLogout}
					/>

					<Toggable buttonText="create new blog">
						<BlogForm />
					</Toggable>

					<BlogList />
				</div>
			)}
		</div>
	)
}

export default App
