import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import {
	useBlogDispatch,
	useBlogValue,
	useNotificationDispatch,
	useUserDispatch,
	useUserValue,
} from './contexts/AppContext'

const App = () => {
	const user = useUserValue()
	const setUser = useUserDispatch()
	const setNotification = useNotificationDispatch()
	const blogs = useBlogValue()
	const blogDispatch = useBlogDispatch()

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('user', JSON.stringify(user))
			setUser({ type: 'SET_USER', payload: user })
			blogService.setToken(user.token)
		} catch (error) {
			setNotification(
				{
					type: 'SET_NOTIFICATION',
					payload: {
						type: 'error',
						message: `an error ocurred: ${error.response.data.error}`,
					},
				}
			)
			setTimeout(() => {
				setNotification(
					{
						type: 'REMOVE_NOTIFICATION',
					}
				)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		setUser({ type: 'REMOVE_USER' })
		blogService.setToken(null)
	}

	const handleCreateBlog = async (blog) => {
		try {
			const createdBlog = await blogService.create(blog)
			blogDispatch({ type: 'CREATE_BLOG', payload: createdBlog })
			setNotification(
				{
					type: 'SET_NOTIFICATION',
					payload: {
						type: 'success',
						message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
					}
				}
			)
			setTimeout(() => {
				setNotification({
					type: 'REMOVE_NOTIFICATION',
				})
			}, 5000)
		} catch ({
			response: {
				data: { error },
			},
		}) {
			setNotification(
				{
					type: 'SET_NOTIFICATION',
					payload: {
						type: 'error',
						message: `an error ocurred: ${error}`,
					}
				}
			)
			setTimeout(() => {
				setNotification({
					type: 'REMOVE_NOTIFICATION',
				})
			}, 5000)
		}
	}

	const handleUpdateBlog = async (blog) => {
		try {
			const updatedBlog = await blogService.update({
				...blog,
				likes: blog.likes + 1,
			})
			blogDispatch({ type: 'UPDATE_BLOG', payload: updatedBlog })
		} catch ({
			response: {
				data: { error },
			},
		}) {
			setNotification(
				{
					type: 'SET_NOTIFICATION',
					payload: {
						type: 'error',
						message: `an error ocurred: ${error}`,
					}
				}
			)
			setTimeout(() => {
				setNotification({
					type: 'REMOVE_NOTIFICATION',
				})
			}, 5000)
		}
	}

	const handleDeleteBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.remove(blog)
				blogDispatch({ type: 'REMOVE_BLOG', payload: blog.id })
			} catch ({
				response: {
					data: { error },
				},
			}) {
				setNotification(
					{
						type: 'SET_NOTIFICATION',
						payload: {
							type: 'error',
							message: `an error ocurred: ${error}`,
						}
					}
				)
				setTimeout(() => {
					setNotification({
						type: 'REMOVE_NOTIFICATION',
					})
				}, 5000)
			}
		}
	}

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await blogService.getAll()
			blogDispatch({ type: 'SET_BLOGS', payload: blogs.sort((b1, b2) => b2.likes - b1.likes) })
		}

		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('user')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser({ type: 'SET_USER', payload: user })
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
