export const createBlog = (blog) => {
	return {
		type: 'NEW_BLOG',
		payload: blog,
	}
}

export const updateBlog = (blog) => {
	return {
		type: 'UPDATE_BLOG',
		payload: blog,
	}
}

export const remove = (id) => {
	return {
		type: 'REMOVE_BLOG',
		payload: {
			id,
		},
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'NEW_BLOG': {
			const newBlog = action.payload
			return state.concat(newBlog)
		}
		case 'UPDATE_BLOG': {
			const updatedBlog = action.payload
			return state.map((b) => (b.id === updateBlog.id ? updatedBlog : b))
		}
		default:
			return state
	}
}

export default blogReducer
