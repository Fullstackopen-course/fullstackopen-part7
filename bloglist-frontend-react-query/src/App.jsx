import { useEffect } from 'react'
import blogService from './services/blogService'
import Notification from './components/Notification'
import { useUserDispatch, useUserValue } from './contexts/AppContext'
import { AppRouter } from './routes/AppRouter'
import { NavBar } from './components/NavBar'

const App = () => {
	const user = useUserValue()
	const setUser = useUserDispatch()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('user')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser({ type: 'SET_USER', payload: user })
			blogService.setToken(user.token)
		}
	}, [])

	return (
		<div>
			<Notification />

			{user && (
				<div>
					<NavBar />
				</div>
			)}

			<AppRouter />
		</div>
	)
}

export default App
