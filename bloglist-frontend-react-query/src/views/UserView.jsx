import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'
import { useParams } from 'react-router-dom'

export const UserView = () => {
	const { id } = useParams()
	const result = useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser(id),
	})
	const user = result.data

	if (result.isLoading) return <div>Loading...</div>

	if (result.error) return <div>Error: {result.error.message}</div>

	return (
		<div>
			<h2>{user.name}</h2>

			<strong>added blogs</strong>

			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	)
}
