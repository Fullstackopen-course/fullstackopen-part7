import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
	try {
		const res = await axios.get(`${baseUrl}/all`)
		return {found: true, data: res.data}
	} catch (error) {
		return {found: false}
	}
}

const getByName = async (name) => {
	try {
		const res = await axios.get(`${baseUrl}/name/${name}`)
		return {found: true, data: res.data}
	} catch (error) {
		return {found: false}
	}
};

export default { getAll, getByName }