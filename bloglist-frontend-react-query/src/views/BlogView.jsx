import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import blogService from '../services/blogService'
import { useQuery } from '@tanstack/react-query'

export const BlogView = () => {
	const { id } = useParams()

	const result = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getById(id),
	})

	const blog = result.data

	if (result.isLoading) return <div>Loading...</div>

	if (result.error) return <div>Error: {result.error.message}</div>

	return <Blog blog={blog} />
}
