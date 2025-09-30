import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = newToken
}
const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const getById = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`)
	return res.data
}

const create = async (blog) => {
	const res = await axios.post(baseUrl, blog, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res.data
}

const update = async (blog) => {
	const res = await axios.put(`${baseUrl}/${blog.id}`, blog, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res.data
}

const addComment = async (id, comment) => {
	const res = await axios.post(`${baseUrl}/${id}/comments`, comment, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res.data
}

const remove = async (blog) => {
	const res = await axios.delete(`${baseUrl}/${blog.id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res.data
}

export default {
	getAll,
	setToken,
	create,
	update,
	remove,
	getById,
	addComment,
}
