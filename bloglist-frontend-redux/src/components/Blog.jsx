import { useState } from 'react'
import blogService from '../services/blogService'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const user = useSelector((state) => state.user)

	const handleUpdateBlog = async (blog) => {
		try {
			const updatedBlog = await blogService.update({
				...blog,
				likes: blog.likes + 1,
			})
			dispatch(updateBlog(updatedBlog))
		} catch ({
			response: {
				data: { error },
			},
		}) {
			setNotificationWithTimeout(
				{
					type: 'error',
					message: `an error ocurred: ${error}`,
				},
				5
			)
		}
	}

	const handleDeleteBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				await blogService.remove(blog)
				dispatch(removeBlog(blog.id))
			} catch ({
				response: {
					data: { error },
				},
			}) {
				setNotificationWithTimeout(
					{
						type: 'error',
						message: `an error ocurred: ${error}`,
					},
					5
				)
			}
		}
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div className="blog" style={blogStyle}>
			{blog.title} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
			<br />
			{visible && (
				<>
					{blog.url}
					<br />
					<span>likes {blog.likes}</span>{' '}
					<button onClick={() => handleUpdateBlog(blog)}>like</button>
					<br />
					{blog.author}
					<br />
					{user.username === blog.user.username && (
						<button onClick={() => handleDeleteBlog(blog)}>remove</button>
					)}
				</>
			)}
		</div>
	)
}

export default Blog
