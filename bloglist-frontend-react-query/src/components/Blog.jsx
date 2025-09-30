import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogService'
import { useUserValue } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
	const queryClient = useQueryClient()
	const user = useUserValue()
	const navigate = useNavigate()

	const updateBlogMutation = useMutation({
		mutationFn: blogService.update,
		onSuccess: (updatedBlog) => {
			queryClient.setQueryData(['blog', blog.id], updatedBlog)

			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'],
				blogs
					.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
					.sort((b1, b2) => b2.likes - b1.likes)
			)
		},
	})

	const deleteBlogMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: () => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'],
				blogs.filter((b) => b.id !== blog.id).sort((b1, b2) => b2.likes - b1.likes)
			)
			navigate('/')
		},
	})

	const addCommentMutation = useMutation({
		mutationFn: ({ blogId, comment }) => blogService.addComment(blogId, { comment }),
		onSuccess: (updatedBlog) => {
			queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog)
			queryClient.setQueryData(['blogs'], (blogs) =>
				blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
			)
		},
	})

	const handleUpdateBlog = () => {
		updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
	}

	const handleDeleteBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlogMutation.mutate(blog)
		}
	}

	const handleSubmitComment = (event) => {
		event.preventDefault()
		const comment = event.target.comment.value
		event.target.comment.value = ''
		addCommentMutation.mutate({ blogId: blog.id, comment })
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url} target="_blank" rel="noopener noreferrer">
				{blog.url}
			</a>
			<br />
			<span>likes {blog.likes}</span> <button onClick={() => handleUpdateBlog()}>like</button>
			<br />
			added by {blog.author}
			<br />
			{user.username === blog.user.username && (
				<button onClick={() => handleDeleteBlog()}>remove</button>
			)}
			<h3>comments</h3>

			<form onSubmit={handleSubmitComment}>
				<input type="text" name="comment" />
				<button className="btn" type="submit">
					add comment
				</button>
			</form>

			<ul>
				{blog.comments.map((comment) => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</ul>
		</div>
	)
}

export default Blog
