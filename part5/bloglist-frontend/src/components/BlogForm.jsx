import { useState } from 'react'
import blogsService from '../services/blogs'
import Notification from './Notification'

const BlogForm = (props) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    const clearMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        const blog = {
            title: newTitle,
            author: newAuthor,
            url: newAuthor
        }

        const response = await blogsService.create(blog)

        if (response.status === 201) {
            setIsError(false)
            setMessage(`New blog '${newTitle}' by ${newAuthor} added.`)
            clearMessage()
            props.updateBlogs()
        } else {
            setIsError(true)
            setMessage(`Error: ${response.data.error}`)
            clearMessage()
        }
    }

    return (
        <>
            <h2>create new</h2>
            <Notification message={message} error={isError} />
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