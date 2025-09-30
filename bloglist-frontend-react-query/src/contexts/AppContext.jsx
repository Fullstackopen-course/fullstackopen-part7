import { useContext } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'

const AppContext = createContext()

const AppContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null)
	const [blogs, blogDispatch] = useReducer(blogReducer, [])
	const [user, userDispatch] = useReducer(userReducer, null)
	const [users, usersDispatch] = useReducer(usersReducer, [])

	return (
		<AppContext.Provider
			value= {
				{
					notification: [notification, notificationDispatch],
					blogs: [blogs, blogDispatch],
					user: [user, userDispatch],
					users: [users, usersDispatch],
				}
			}
		>
			{props.children}
		</AppContext.Provider>
	)
}

// NOTIFICATION
export const useNotificationValue = () => {
	const { notification } = useContext(AppContext)
	return notification[0]
}

export const useNotificationDispatch = () => {
	const { notification } = useContext(AppContext)
	return notification[1]
}

// BLOG
export const useBlogValue = () => {
	const { blogs } = useContext(AppContext)
	return blogs[0]
}

export const useBlogDispatch = () => {
	const { blogs } = useContext(AppContext)
	return blogs[1]
}

// USER
export const useUserValue = () => {
	const { user } = useContext(AppContext)
	return user[0]
}

export const useUserDispatch = () => {
	const { user } = useContext(AppContext)
	return user[1]
}

// USERS
export const useUsersValue = () => {
	const { users } = useContext(AppContext)
	return users[0]
}

export const useUsersDispatch = () => {
	const { users } = useContext(AppContext)
	return users[1]
}

export default AppContextProvider
