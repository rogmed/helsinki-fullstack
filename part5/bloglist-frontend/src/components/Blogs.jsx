import Blog from './Blog'

const Blogs = (props) => {
  if (props.user) {
    return (
      <>
        <h2>blogs</h2>
        <p>{props.user.username} is logged in</p>
        {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }
}

export default Blogs