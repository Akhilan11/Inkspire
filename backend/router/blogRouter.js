const express = require('express')
const router = express.Router()

const { getAllBlogs,getBlogById,saveBlog,deleteBlog,updateBlog } = require('../controller/blogController')

// Get all blogs
router.get('/', getAllBlogs);

// Get blog by ID
router.get('/:id', getBlogById);

// Create a new blog
router.post('/', saveBlog);

// Update a blog by ID
router.put('/:id', updateBlog);

// Delete a blog by ID
router.delete('/:id', deleteBlog);

module.exports = router;