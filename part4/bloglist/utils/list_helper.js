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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
