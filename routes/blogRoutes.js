const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

router.get('/create', blogController.blog_create_get)
router.post('/', blogController.blog_create_post)
router.get('/', blogController.blog_index);
router.get('/:slug', blogController.blog_details)
router.post('/:slug', blogController.blog_update);
router.put('/:id', blogController.blog_update_post);
router.delete('/:id', blogController.blog_delete);

module.exports = router;

