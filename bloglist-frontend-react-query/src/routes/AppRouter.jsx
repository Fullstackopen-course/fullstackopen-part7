import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersView } from '../views/UsersView'
import { HomeView } from '../views/HomeView'
import { useUserValue } from '../contexts/AppContext'
import LoginForm from '../components/LoginForm'
import { UserView } from '../views/UserView'
import { BlogView } from '../views/BlogView'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
	const user = useUserValue()

	return (
		<Routes>
			<Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginForm />} />

			<Route
				path="/"
				element={
					<ProtectedRoute>
						<HomeView />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/users"
				element={
					<ProtectedRoute>
						<UsersView />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/users/:id"
				element={
					<ProtectedRoute>
						<UserView />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/blogs/:id"
				element={
					<ProtectedRoute>
						<BlogView />
					</ProtectedRoute>
				}
			/>

			<Route
				path="*"
				element={
					<ProtectedRoute>
						<h1>404 - Page not found</h1>
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}
