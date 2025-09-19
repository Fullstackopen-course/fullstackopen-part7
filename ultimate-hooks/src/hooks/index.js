import axios from 'axios'
import { useState } from 'react'

export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	const getAll = async () => {
		try {
			const res = await axios.get(baseUrl)
			setResources(res.data)
		} catch (e) {
			console.error(e)
		}
	}

	const create = async (newResource) => {
		try {
			const res = await axios.post(baseUrl, newResource)
			setResources(resources.concat(res.data))
		} catch (e) {
			console.error(e)
		}
	}

	const services = {
		create,
		getAll
	}

	return [
		resources, services
	]
}