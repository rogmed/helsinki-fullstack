const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const url = '/api/users/'
let token

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.users)

    const login = await api
        .post('/api/login/')
        .send({ username: "root", password: "sekret" })

    token = login.body.token
}, 300000)

describe('when there is initially one user in db', () => {
    test('users are returned as json', async () => {
        await api
            .get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the user is returned', async () => {
        const response = await api.get(url)

        expect(response.body).toHaveLength(1)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 100000)
})

describe('POST', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 100000)

    test('creation fails if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({
            error: 'User validation failed: username: Path `username` is required.'
        })

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)

    test('creation fails if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({
            error: 'User validation failed: password: Path `password` is required.'
        });

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)

    test('creation fails if username length is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Io',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({
            error: 'User validation failed: username: Path `username` (`Io`) is shorter than the minimum allowed length (3).'
        });

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)

    test('creation fails if password length is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: '12',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({
            error: 'User validation failed: password: Path `password` (`12`) is shorter than the minimum allowed length (3).'
        });

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'I am Root',
            password: '1234567890'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({
            error: `User validation failed: username: Error, expected \`username\` to be unique. Value: \`${newUser.username}\``
        });

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)
})

afterAll(async () => {
    await mongoose.connection.close()
})