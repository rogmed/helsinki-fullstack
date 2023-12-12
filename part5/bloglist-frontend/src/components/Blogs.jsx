import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (props.user) {
    return (
      <>
        <BlogForm />
        <h2>blogs</h2>
        <p>{props.user.username} is logged in
          &nbsp;<button onClick={props.handleLogout}>logout</button></p>
        <br />
        <table>
          <tbody>
            <tr>
              <td><b>Title</b></td>
              <td><b>Author</b></td>
            </tr>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </tbody>
        </table>
      </>
    )
  }
}

export default Blogs