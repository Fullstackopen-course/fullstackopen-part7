import { Link, useNavigate } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../contexts/AppContext'
import blogService from '../services/blogService'
import { Button } from '@mui/material'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
export const NavBar = () => {
	const user = useUserValue()
	const userDispatch = useUserDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		userDispatch({ type: 'REMOVE_USER' })
		blogService.setToken(null)
		navigate('/login')
	}

	const padding = {
		padding: 5,
	}
	return (
		<div className="bg-light">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link className="navbar-brand" style={padding} to="/">
						<FontAwesomeIcon icon={faBlog} /> Blog app
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="nav nav-underline w-100">
							<li className="nav-item">
								<Link className="nav-link" style={padding} to="/">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" style={padding} to="/users">
									Users
								</Link>
							</li>
							<li className="nav-item ms-auto d-flex align-items-center">
								<span className="me-2">{user.name} logged in</span>
								<Button onClick={handleLogout}>
									<FontAwesomeIcon icon={faRightFromBracket} />
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	)
}
