import { useQuery } from '@tanstack/react-query'
import { UserTable } from '../components/UserTable'
import userService from '../services/userService'
import { useUsersDispatch } from '../contexts/AppContext'
import { useEffect } from 'react'

export const UsersView = () => {
	const result = useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll,
	})
	const users = result.data
	const usersDispatch = useUsersDispatch()

	useEffect(() => {
		if (users) {
			usersDispatch({
				type: 'SET_USERS',
				payload: users,
			})
		}
	}, [users, usersDispatch])

	if (result.isLoading) return <div>Loading...</div>

	if (result.error) return <div>Error: {result.error.message}</div>

	return (
		<div>
			<h2>Users</h2>

			<UserTable />
		</div>
	)
}
