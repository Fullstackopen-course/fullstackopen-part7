import { useEffect, useState } from "react"
import countryService from "../services/countryService"

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	const fetchCountry = async () => {
		try {
			const res = await countryService.getByName(name)
			setCountry(res)
		} catch (error) {
			console.error(error)
			setCountry(null)
		}
	}

	useEffect(
		() => {
			if (name) {
				fetchCountry()
			}
		},
		[name]
	)
	return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
	setValue(event.target.value)
  }

  return {
	type,
	value,
	onChange
  }
}