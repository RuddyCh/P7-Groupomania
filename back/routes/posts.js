const express = require('express');
const { getPosts, createPost, createComment, deletePost, editPost, likePost } = require('../controllers/posts.js');
const { checkToken } = require('../middleware/token.js');
const { imageUpload } = require('../middleware/image.js');

const postRouter = express.Router();

postRouter.use(checkToken);
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)
postRouter.put("/:id", imageUpload, editPost)
postRouter.post("/:id/like", likePost)

module.exports = { postRouter };