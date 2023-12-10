const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    
    if (!user) {
        response.status(401).json({ error: 'jwt must be provided' })
    }

    if (blog.user.toString() === user.id.toString()) {
        await Blog.deleteOne(blog)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'blog created by another user.' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newBlog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog)

    response.status(204).json(updatedBlog)
})

module.exports = blogsRouter