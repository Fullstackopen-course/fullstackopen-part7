import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test, describe, vi } from 'vitest'
import Blog from '../../src/components/Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/>', () => {
	const handleUpdateBlogMock = vi.fn()
	const handleDeleteBlogMock = vi.fn()

	beforeEach(() => {
		const blog = {
			title: 'Blog1',
			author: 'Me',
			url: 'Url1',
			likes: 3,
			user: {
				name: 'User1',
				username: 'Username1',
				id: '68a5e8a3d0bf1d3de7adcb57',
			},
			id: '68a7025e1d29927fa717f6c2',
		}

		render(
			<Blog
				blog={blog}
				handleUpdateBlog={handleUpdateBlogMock}
				handleDeleteBlog={handleDeleteBlogMock}
				username={'username'}
			/>
		)
	})

	// eslint-disable-next-line quotes
	test("renders blog's title and author", () => {
		const titleElement = screen.queryByText('Blog1')
		expect(titleElement).toBeVisible()

		const authorElement = screen.queryByText('Me')
		expect(authorElement).toBeNull()

		const urlElement = screen.queryByText('Url1')
		expect(urlElement).toBeNull()

		const likesElement = screen.queryByText('3')
		expect(likesElement).toBeNull()
	})

	test('after clicking the button, url and likes are shown', async () => {
		const user = userEvent.setup()
		const button = screen.queryByText('view')
		await user.click(button)

		const urlElement = screen.getByText('Url1', { exact: false })
		expect(urlElement).toBeVisible()

		const likesElement = screen.getByText('3', { exact: false })
		expect(likesElement).toBeVisible()
	})

	test('after clicking the like button twice, event handler is called twice', async () => {
		const user = userEvent.setup()
		const button = screen.queryByText('view')
		await user.click(button)

		const likeButton = screen.queryByText('like')
		await user.click(likeButton)
		await user.click(likeButton)

		expect(handleUpdateBlogMock.mock.calls).toHaveLength(2)
	})
})
