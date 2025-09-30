import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
	token = newToken
}
const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const getUser = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`)
	return res.data
}

export default {
	getAll,
	setToken,
	getUser,
}
