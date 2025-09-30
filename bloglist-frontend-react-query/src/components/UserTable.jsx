import { Link } from 'react-router-dom'
import { useUsersValue } from '../contexts/AppContext'

export const UserTable = () => {
	const users = useUsersValue()

	return (
		users && (
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</td>

							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	)
}
