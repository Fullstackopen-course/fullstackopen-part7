import { Navigate } from 'react-router-dom'
import { useUserValue } from '../contexts/AppContext'

export const ProtectedRoute = ({ children }) => {
	const user = useUserValue()

	return user ? children : <Navigate to="/login" replace />
}
