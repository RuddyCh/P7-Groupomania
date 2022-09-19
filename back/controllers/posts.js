const fs = require("fs");

const comment1 = {
    user: "bob@gmail.com",
    content: "This is a comment",
    id: 1,
}

const comment2 = {
    user: "bob@gmail.com",
    content: "This is a comment",
    id: 2,
}

let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});

const post1 = {
    user: "jean@free.fr",
    date: dateLocale,
    content: "This is my first post",
    url: "https://picsum.photos/400/200",
    comments: [comment1, comment2],
    likes: 2,
    dislikes: 3,
    usersLiked: [],
    usersDisliked: [],
    id: 3
}

const post2 = {
    user: "louis@free.fr",
    date: dateLocale,
    content: "This is my second post",
    url: "https://picsum.photos/400/200",
    comments: [comment1],
    likes: 1,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    id: 2
}

const post3 = {
    user: "michel@free.fr",
    date: dateLocale,
    content: "This is my third post",
    url: "https://picsum.photos/400/200",
    comments: [],
    likes: 4,
    dislikes: 2,
    usersLiked: [],
    usersDisliked: [],
    id: 1
}

const posts = [post1, post2, post3]; // create posts array

function getPosts(req, res) {
    const email = req.email;                            // get email from token
    res.send({posts, email});                       // send posts and email to client
}

function createPost(req, res) {
    const content = req.body.content;                     // get content from body
    const hasImage = req.file != null;                   // check if there is an image

    const url = hasImage ? createImageUrl(req) : null;  // create url if there is an image
    const email = req.email;                             // get email from token
    const date = dateLocale;                            // get date from server
    const likes = 0;                                    // set likes to 0
    const dislikes = 0;                                // set dislikes to 0
    const usersLiked = [];                            // set usersLiked to empty array
    const usersDisliked = [];                       // set usersDisliked to empty array
    const postId = posts.length + 1;                 // get postId
    const post = { content, user: email, date, comments: [], likes, dislikes, url, usersLiked, usersDisliked, id: postId }; // create post object
    posts.unshift(post);                            // add post to posts array
    res.send({ post });                          // send post to client
}

function createImageUrl(req) {
    let pathToImage = req.file.path.replace("\\", "/");     // replace \ with /
    const protocol = req.protocol;                         // http or https
    const host = req.get("host");                         // localhost:3000
    return `${protocol}://${host}/${pathToImage}`;       // http://localhost:3000/uploads/1234567890.jpg
}

function createComment(req, res) {
    const postId = req.params.id;           // get postId from params
    const post = posts.find((post) => post.id == postId); // find post in posts array
    if (post == null) {
        return res.status(404).send({ error: "Post not found" }); // send error if post not found
    }
    const comment = req.body.comment;      // get comment from body
    
    const id = Math.random().toString(36).substr(2, 9); // create id for comment
    const user = req.email;                            // get email from token
    const commentToSend = { id, user, content: comment };       // create comment object
    post.comments.push(commentToSend);           // add comment to post

    res.send({ post });              // send post to client
}

function deletePost(req, res) {
    const postId = req.params.id;           // get postId from params
    const post = posts.find((post) => post.id == postId); // find post in posts array
    if (post == null) {
        return res.status(404).send({ message: "Post not found" }); // send error message if post is null
    }
    const index = posts.indexOf(post);   // get index of post in posts array
    posts.splice(index, 1);            // remove post from posts array
    deleteComments(post);           // delete comments of post
    deleteImage(post);            // delete image of post
    res.send({ message: `Post ${postId} was deleted` , posts }); // send message to client
}

function deleteImage(post) {
    if (post.url != null) { // check if post has an image
        const path = post.url.replace("http://localhost:3000/", ""); // get path of image
        fs.unlinkSync(path); // delete image
    }
}

function deleteComments(post) {
    post.comments = [] // delete comments of post
}

function editPost(req, res) {
    const postId = req.params.id;           // get postId from params
    const post = posts.find((post) => post.id == postId); // find post in posts array
    if (post == null) {
        return res.status(404).send({ message: "Post not found" }); // send error message if post is null
    }
    const content = req.body.content;                    // get content from body
    const hasImage = req.file != null;                  // check if there is an image
    const url = hasImage ? createImageUrl(req) : null; // create url if there is an image
    deleteImage(post);                              // delete image of post
    post.content = content;                          // edit post content
    post.url = url;                                // edit post url
    res.send({ post });                          // send post to client
}


function likePost(req, res) {
    const { like, userId } = req.body
    const postId = req.params.id

    switch (like) {
        case 1:
            posts.findOne({ _id: postId })
                .then((product) => {
                    if (product.usersLiked.includes(userId)) {
                        res.status(400).send({ message: "you already liked this post" })
                    }
                    else {
                        Product.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
                            .then(() => res.status(200).send({ message: "post liked" }))
                            .catch(err => res.status(500).send({ message: "error", error: err }))
                    }
                })

            break;

        case 0:
            posts.findOne({ _id: postId })
                .then((product) => {
                    if (product.usersLiked.includes(userId)) {
                        Product.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                            .then(() => res.status(200).send({ message: "return null" }))
                            .catch(err => res.status(400).send({ error }))
                    }
                    if (product.usersDisliked.includes(userId)) {
                        Product.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                            .then(() => res.status(200).send({ message: "Return null" }))
                            .catch(err => res.status(400).send({ error }))
                    }
                })
                .catch(err => res.status(404).send({ error }))

            break;

        case -1:
            posts.findOne({ _id: postId })
                .then((product) => {
                    if (product.usersDisliked.includes(userId)) {
                        res.status(400).send({ message: "you already liked this post" })
                    }
                    else {
                        Product.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
                            .then(() => res.status(200).send({ message: "post disliked" }))
                            .catch(err => res.status(500).send({ message: "error", error: err }))
                    }
                })

            break;

        default: return res.status(400).send({ message: "Bad request" })
    }
}

module.exports = { getPosts, createPost, createComment, deletePost, editPost }