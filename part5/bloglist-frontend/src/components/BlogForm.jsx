import { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = () => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()

        const blog = {
            title: newTitle,
            author: newAuthor,
            url: newAuthor
        }

        const data = blogsService.create(blog)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        type="text"
                        value={newTitle}
                        name="NewTitle"
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={newAuthor}
                        name="NewAuthor"
                        onChange={({ target }) => setNewAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={newUrl}
                        name="NewUrl"
                        onChange={({ target }) => setNewUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm