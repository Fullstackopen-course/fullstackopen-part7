import { useQuery } from '@tanstack/react-query'
import { useBlogDispatch } from '../contexts/AppContext'
import { useEffect } from 'react'
import blogService from '../services/blogService'
import BlogList from '../components/BlogList'
import Toggable from '../components/Toggable'
import BlogForm from '../components/BlogForm'

export const HomeView = () => {
	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
	})
	const blogs = result.data
	const blogDispatch = useBlogDispatch()

	useEffect(() => {
		if (blogs) {
			blogDispatch({
				type: 'SET_BLOGS',
				payload: blogs,
			})
		}
	}, [blogs, blogDispatch])

	if (result.isLoading) return <div>Loading...</div>

	if (result.error) return <div>Error: {result.error.message}</div>

	return (
		<div className="container">
			<Toggable buttonText="create new blog">
				<BlogForm />
			</Toggable>

			<BlogList />
		</div>
	)
}
