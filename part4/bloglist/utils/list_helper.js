const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostVotedBlog = blogs.reduce((mostVoted, blog) =>
        mostVoted.likes > blog.likes ? mostVoted : blog)

    return {
        "author": mostVotedBlog.author,
        "likes": mostVotedBlog.likes,
        "title": mostVotedBlog.title
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = _.countBy(blogs, 'author')

    let authorWithMostBlogs = { "blogs": -1 }

    for (author in authors) {
        if (authors[author] > authorWithMostBlogs.blogs) {
            authorWithMostBlogs = {
                "author": author,
                "blogs": authors[author]
            }
        }
    }
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    const authors = blogs.map((blog) => new Object({
        'name': blog.author,
        'likes': blog.likes
    }))

    const reducedAuthors = authors.reduce((object, author) => {
        if (!object.hasOwnProperty(author.name)) {
            object[author.name] = 0
        }

        object[author.name] += author.likes

        return object
    }, {})

    let authorWithMostLikes = { "likes": -1 }

    for (author in reducedAuthors) {
        if (reducedAuthors[author] > authorWithMostLikes.likes) {
            authorWithMostLikes = {
                "author": author,
                "likes": reducedAuthors[author]
            }
        }
    }

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
