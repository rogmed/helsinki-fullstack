const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const _ = require('lodash')

const url = '/api/blogs'

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
}, 300000)

describe('GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get(url)

        expect(response.body).toHaveLength(helper.blogs.length)
    }, 100000)

    test('blog has unique id', async () => {
        const response = await api.get(url)
        const blogs = response.body

        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        });

        const uniqueId = _.uniqBy(blogs, 'id')
        expect(uniqueId).toHaveLength(blogs.length)
    })
})

describe('POST', () => {
    test('a valid blog can be added', async () => {
        let newBlog = {
            title: "Test blog",
            author: "Tester Testing",
            url: "https://jestjs.io/",
            likes: 10
        }

        await api
            .post(url)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

        const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        newBlog.id = addedBlog.id
        expect(addedBlog).toEqual(newBlog)
    })

    test('blog without content is not added', async () => {
        const newBlog = {}

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })

    test('blog without likes is posted with 0 likes', async () => {
        let newBlog = {
            title: "Test blog",
            author: "Tester Testing",
            url: "https://jestjs.io/"
        }

        await api
            .post(url)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

        const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        newBlog.id = addedBlog.id
        newBlog.likes = 0
        expect(addedBlog).toEqual(newBlog)
    })

    test('blog without title is not posted and returns code 400', async () => {
        let newBlog = {
            author: "Tester Testing",
            url: "https://jestjs.io/"
        }

        await api
            .post(url)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })

    test('blog without url is not posted and returns code 400', async () => {
        let newBlog = {
            title: "Test blog",
            author: "Tester Testing",
        }

        await api
            .post(url)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})