const blogReducer = (state, action) => {
	switch (action.type) {
		case 'CREATE_BLOG':
			return state
				.concat(action.payload)
				.sort((b1, b2) => b2.likes - b1.likes)
		case 'UPDATE_BLOG':
			return state
				.map((b) => (b.id === action.payload.id ? action.payload : b))
				.sort((b1, b2) => b2.likes - b1.likes)
		case 'REMOVE_BLOG':
			return state
				.filter((b) => b.id !== action.payload)
				.sort((b1, b2) => b2.likes - b1.likes)
		case 'SET_BLOGS':
			return action.payload
		default:
			return state
	}
}

export default blogReducer
