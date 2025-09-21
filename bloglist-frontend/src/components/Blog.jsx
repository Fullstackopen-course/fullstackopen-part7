import { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, username }) => {
	const [visible, setVisible] = useState(false)

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
					{username === blog.user.username && (
						<button onClick={() => handleDeleteBlog(blog)}>remove</button>
					)}
				</>
			)}
		</div>
	)
}

export default Blog
