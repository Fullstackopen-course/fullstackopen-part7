import { useState } from 'react'
import Button from './Button'
const BlogForm = ({ onSubmit }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreate = async (event) => {
		event.preventDefault()
		onSubmit({
			title,
			author,
			url,
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create new blog</h2>

			<form onSubmit={handleCreate}>
				<div style={{ marginBottom: 10 }}>
					<label>
						title
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="title"
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 10 }}>
					<label>
						author
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="author"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>

				<div style={{ marginBottom: 10 }}>
					<label>
						url
						<input
							style={{ marginLeft: 10 }}
							type="text"
							name="url"
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>

				<Button style={{ marginTop: 10 }} text="create" type="submit">
					create
				</Button>
			</form>
		</div>
	)
}

export default BlogForm
