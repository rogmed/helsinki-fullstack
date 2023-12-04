const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const initialBlogs = helper.blogs

describe('dummy', () => {
    test('returns one', () => {
        const emptyBlogs = []

        const result = listHelper.dummy(emptyBlogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]

        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(initialBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('returns blog with most votes', () => {
        const result = listHelper.favoriteBlog(initialBlogs)

        const favorite = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(favorite)
    })
})

describe('most blogs', () => {
    test('returns author with most blogs', () => {
        const result = listHelper.mostBlogs(initialBlogs)

        const authorWithMostBlogs = {
            author: "Robert C. Martin",
            blogs: 3
        }

        expect(result).toEqual(authorWithMostBlogs)
    })

    test('returns empty object if the list is empty', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
})

describe('most likes', () => {
    test('returns author with most likes and how many', () => {
        const result = listHelper.mostLikes(initialBlogs)

        const authorWithMostLikes = {
            author: "Edsger W. Dijkstra",
            likes: 17
          }

        expect(result).toEqual(authorWithMostLikes)
    })

    test('returns empty object if the list is empty', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
})
