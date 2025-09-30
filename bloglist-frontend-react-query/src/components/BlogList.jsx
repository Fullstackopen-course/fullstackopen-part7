import { useBlogValue } from '../contexts/AppContext'
import { Link } from 'react-router-dom'

const BlogList = () => {
	const blogs = useBlogValue()

	return (
		<div>
			<h2>Blogs</h2>

			<ul className="list-group list-group-flush">
				{blogs.map((blog) => (
					<li className="list-group-item" key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default BlogList
