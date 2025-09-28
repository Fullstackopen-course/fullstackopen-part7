import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
	const dispatch = useDispatch()
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
			blogService.setToken(user.token)
		} catch (error) {
			dispatch({
				type: 'error',
				message: `an error ocurred: ${error.response.data.error}`,
			})
			setTimeout(() => {
				dispatch(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		setUser(null)
		blogService.setToken(null)
	}

	const handleCreateBlog = async (blog) => {
		try {
			const createdBlog = await blogService.create(blog)
			setBlogs(blogs.concat(createdBlog).sort((b1, b2) => b2.likes - b1.likes))
			dispatch(
				setNotification(
					{
						type: 'success',
						message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
					}
				)
			)
			setTimeout(() => {
				dispatch(setNotification(null))
			}, 5000)
		} catch ({
			response: {
				data: { error },
			},
		}) {
			dispatch(setNotification({
				type: 'error',
				message: `an error ocurred: ${error}`,
			}))
			setTimeout(() => {
				dispatch(setNotification(null))
			}, 5000)
		}
	}

	const handleUpdateBlog = async (blog) => {
		try {
			const updatedBlog = await blogService.update({
				...blog,
				likes: blog.likes + 1,
			})
			setBlogs(
				blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)).sort((b1, b2) => b2.likes - b1.likes)
			)
		} catch ({
			response: {
				data: { error },
			},
		}) {
			dispatch(setNotification({
				type: 'error',
				message: `an error ocurred: ${error}`,
			}))
			setTimeout(() => {
				dispatch(setNotification(null))
			}, 5000)
		}
	}

	const handleDeleteBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.remove(blog)
				setBlogs(blogs.filter((b) => b.id !== blog.id).sort((b1, b2) => b2.likes - b1.likes))
			} catch ({
				response: {
					data: { error },
				},
			}) {
				dispatch(
					setNotification(
						{
							type: 'error',
							message: `an error ocurred: ${error}`,
						}
					)
				)
				setTimeout(() => {
					dispatch(setNotification(null))
				}, 5000)
			}
		}
	}

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll()
			setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes))
		}

		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('user')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

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
						<BlogForm onSubmit={handleCreateBlog} />
					</Toggable>

					<BlogList
						blogs={blogs}
						handleUpdateBlog={handleUpdateBlog}
						handleDeleteBlog={handleDeleteBlog}
						username={user.username}
					/>
				</div>
			)}
		</div>
	)
}

export default App
