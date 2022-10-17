const { prisma } = require("../db/db");
const fs = require("fs");

async function getPosts(req, res) {
    const email = req.email;                             // get email from token
    const posts = await prisma.post.findMany({
        include: { 
            user: {
                select: {
                    email: true,
                }
            },
            comments: {
                orderBy: { date: "asc" },
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            userLikes: true 
        },
        orderBy: { date: "desc" }
    })
    res.send({ posts: posts, email: email }); // send posts to client
}
    

async function createPost(req, res) {
    const content = req.body.content;                     // get content from body
    const email = req.email;                             // get email from token
    
    try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    const userId = user.id;
    const hasImage = req.file != null;
    const url = hasImage ? createImageUrl(req) : null;
    
    const post = { content, userId, imageUrl: url };
    const result = await prisma.post.create({ data: post })
    res.send({ post: result });} catch (err) {
        res.status(500).send({ error: err.message });
    }
}

function createImageUrl(req) {
    let pathToImage = req.file.path.replace("\\", "/");     // replace \ with /
    const protocol = req.protocol;                         // http or https
    const host = req.get("host");                         // localhost:3000
    return `${protocol}://${host}/${pathToImage}`;       // http://localhost:3000/uploads/1234567890.jpg
}

async function createComment(req, res) {
    const postId = Number(req.params.id);
    const post = await prisma.post.findUnique({ 
        where: { id: postId },
        include: { 
            user: {
                select: {
                    id: true,
                }
            }
        }
    });
    if (post == null) {
        return res.status(404).send({ error: "Post not found" });
    }
    const userCommenting = await prisma.user.findUnique({ where: { email: req.email } });
    const userId = userCommenting.id;

    const commentToSend = { userId, postId, content: req.body.comment };
    const comment = await prisma.comment.create({ data: commentToSend });
    res.send({ comment })
}

async function deletePost(req, res) {
    const postId = Number(req.params.id);
    const post = await prisma.post.findUnique({ 
        where: { 
            id: postId
        },
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    });
    if (post == null) {
        return res.status(404).send({ message: "Post not found" });
    }
    const email = req.email;
    const adminMail = process.env.ADMIN_MAIL;

    if (email !== post.user.email && email !== adminMail) {
        return res.status(403).send({ message: "You are not allowed to delete this post" });
    }
    await prisma.comment.deleteMany({ where: { postId: postId } });
    deleteImage(post);
    await prisma.post.delete({ where: { id: postId } });
    res.send({ message: "Post deleted" });
}

function deleteImage(post) {
    if (post.imageUrl != null) { // check if post has an image
        const path = post.imageUrl.replace("http://localhost:3000/", ""); // get path of image
        fs.unlinkSync(path); // delete image
    }
}

async function editPost(req, res) {
    const postId = Number(req.params.id);
    const post = await prisma.post.findUnique({ 
        where: { id: postId },
        include: {
            user: {
                select: {
                    email: true
                }
            }
        }
    });
    if (post == null) {
        return res.status(404).send({ message: "Post not found" });
    }
    const email = req.email;
    const adminMail = process.env.ADMIN_MAIL;
    if (email !== post.user.email && email !== adminMail) {
        return res.status(403).send({ message: "You are not allowed to edit this post" });
    }
    const content = req.body.content;
    const hasImage = req.file != null;
    const url = hasImage ? createImageUrl(req) : post.imageUrl;
    deleteImage(post);
    const postToSend = { content, imageUrl: url };
    const result = await prisma.post.update({ where: { id: postId }, data: postToSend });
    res.send({ post: result });
}

async function likePost(req, res) {
    const postId = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { email: req.email } });
    const userId = user.id;
    const findPost = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            user: {
                select: {
                    id: true,
                }
            }
        }
    });
    const hasLiked = await prisma.userLike.findMany({
        where: {
            postId: postId,
            likerId: userId,
        },
        select: {
            postId: true,
        }
    });
    if (findPost.user.id !== userId && !hasLiked.length > 0) {
        const like = await prisma.userLike.create({
            data: {
                post: {
                    connect: {
                        id: postId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        res.send({ like });
    } else {
        res.status(403).send({ message: "You are not allowed to like this post" });
    }
}
    

module.exports = { getPosts, createPost, createComment, deletePost, editPost, likePost };