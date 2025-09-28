import { render, screen } from '@testing-library/react'
import { beforeEach, expect, test, describe, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from '../../src/components/BlogForm'

describe('<BlogForm/>', () => {
	const handleCreateBlogMock = vi.fn()
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
	beforeEach(() => {
		render(<BlogForm onSubmit={handleCreateBlogMock} />)
	})

	test('form calls the event handler with the right details', async () => {
		const user = userEvent.setup()
		const createButton = screen.queryByText('create')

		const authorInputElement = screen.getByLabelText('author')
		const titleInputElement = screen.getByLabelText('title')
		const urlInputElement = screen.getByLabelText('url')

		await user.type(authorInputElement, blog.author)
		await user.type(titleInputElement, blog.title)
		await user.type(urlInputElement, blog.url)
		await user.click(createButton)

		expect(handleCreateBlogMock.mock.calls).toHaveLength(1)
		expect(handleCreateBlogMock.mock.calls[0][0].title).toBe(blog.title)
		expect(handleCreateBlogMock.mock.calls[0][0].author).toBe(blog.author)
		expect(handleCreateBlogMock.mock.calls[0][0].url).toBe(blog.url)
	})
})
