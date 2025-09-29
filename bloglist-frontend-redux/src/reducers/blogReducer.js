import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			const newBlog = action.payload
			return state.concat(newBlog).sort((b1, b2) => b2.likes - b1.likes)
		},
		updateBlog(state, action) {
			const updatedBlog = action.payload
			return state.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)).sort((b1, b2) => b2.likes - b1.likes)
		},
		removeBlog(state, action) {
			const id = action.payload
			return state.filter((b) => b.id !== id).sort((b1, b2) => b2.likes - b1.likes)
		},
		setBlogs: (state, action) => {
			return action.payload
		},
	},
})

export default blogSlice.reducer

export const initBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const { createBlog, updateBlog, removeBlog, setBlogs } = blogSlice.actions
