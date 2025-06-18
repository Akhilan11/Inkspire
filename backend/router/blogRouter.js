const express = require('express')
const router = express.Router()

const { getAllBlogs,getBlogById,saveBlog,deleteBlog,updateBlog } = require('../controller/blogController')

const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected Routes
router.post('/', protect, saveBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;