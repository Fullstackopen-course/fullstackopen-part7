import Blog from './Blog'

const BlogList = ({ blogs, handleUpdateBlog, handleDeleteBlog, username }) => {
	return (
		<div>
			<h2>Blogs</h2>

			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					handleUpdateBlog={handleUpdateBlog}
					handleDeleteBlog={handleDeleteBlog}
					username={username}
				/>
			))}
		</div>
	)
}

export default BlogList
