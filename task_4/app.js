import { APIError } from "./error.js"

const userURL = "https://jsonplaceholder.typicode.com/users"
const postURL = "https://jsonplaceholder.typicode.com/posts"
const commentURL = "https://jsonplaceholder.typicode.com/comments"

async function fetchData(url) {

    const response = await fetch(url)

    if (!response.ok) {
        throw new APIError("API request failed")
    }

    const data = await response.json()

    return data
}


async function loadDashboard() {

    const results = await Promise.allSettled([
        fetchData(userURL),
        fetchData(postURL),
        fetchData(commentURL)
    ])

    const users = results[0].value
    const posts = results[1].value
    const comments = results[2].value

    console.log("Users:", users.length)
    console.log("Posts:", posts.length)
    console.log("Comments:", comments.length)

}

loadDashboard()


function connectData(users, posts, comments) {

    users.forEach(user => {

        const userPosts = posts.filter(p => p.userId === user.id)

        user.posts = userPosts

        userPosts.forEach(post => {

            const postComments = comments.filter(
                c => c.postId === post.id
            )

            post.comments = postComments

        })

    })

    return users
}