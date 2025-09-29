import { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogService'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogForm = () => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreateBlog = async (blog) => {
		try {
			const createdBlog = await blogService.create(blog)
			dispatch(createBlog(createdBlog))
			console.log(createdBlog)
			dispatch(
				setNotificationWithTimeout(
					{
						type: 'success',
						message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
					},
					5
				)
			)
		} catch ({
			response: {
				data: { error },
			},
		}) {
			dispatch(
				setNotificationWithTimeout(
					{
						type: 'error',
						message: `an error ocurred: ${error}`,
					},
					5
				)
			)
		}
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		const blogToCreate = {
			title,
			author,
			url,
		}
		handleCreateBlog(blogToCreate)
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

				<Button style={{ marginTop: 10 }} text="create" type="submit">
					create
				</Button>
			</form>
		</div>
	)
}

export default BlogForm
