import { useState } from 'react'
import blogService from '../services/blogService'
import { useBlogDispatch, useNotificationDispatch } from '../contexts/AppContext'
import { Button } from '@mui/material'
const BlogForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const blogDispatch = useBlogDispatch()
	const setNotification = useNotificationDispatch()

	const handleCreateBlog = async (blog) => {
		try {
			const createdBlog = await blogService.create(blog)
			blogDispatch({ type: 'CREATE_BLOG', payload: createdBlog })
			setNotification({
				type: 'SET_NOTIFICATION',
				payload: {
					type: 'success',
					message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
				},
			})
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
			setNotification({
				type: 'SET_NOTIFICATION',
				payload: {
					type: 'error',
					message: `an error ocurred: ${error}`,
				},
			})
			setTimeout(() => {
				setNotification({
					type: 'REMOVE_NOTIFICATION',
				})
			}, 5000)
		}
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		handleCreateBlog({
			title,
			author,
			url,
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create new blog</h2>

			<form onSubmit={onSubmit}>
				<div style={{ marginBottom: 10 }}>
					<label>
						title
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="title"
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 10 }}>
					<label>
						author
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 10 }}>
					<label>
						url
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="url"
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>

				<Button variant="contained" style={{ marginTop: 10 }} type="submit">
					create
				</Button>
			</form>
		</div>
	)
}

export default BlogForm
