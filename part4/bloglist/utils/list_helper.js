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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
