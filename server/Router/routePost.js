const express = require('express')
const router = express.Router()
const path = require('path')
const postController = require('../controller/postController')

router.route('/')
    .get(postController.getALLPosts)
    .post(postController.createPost)
router.route('/:id')
    .get(postController.getPost)
    .put(postController.updatePost)
    .delete(postController.deletePost)

module.exports = router