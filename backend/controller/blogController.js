const Blog = require('../model/blog');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .populate('author', 'username email');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id).populate('author', 'username email');
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const saveBlog = async (req, res) => { 
    const { title, content } = req.body;

    try {
        const newBlog = new Blog({ title, content, author: req.user._id  });
        await newBlog.save();

        res.status(201).json({
            msg: 'Blog created successfully',
            blog: newBlog,
        });       
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const deleteBlog = async (req, res) => { 
    const id = req.params.id
    try {
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({msg: 'Blog updated successfully', Blog : blog});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateBlog = async (req, res) => { 
    const id = req.params.id;
    const { title, content, author } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true, runValidators: true } 
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({
            msg: 'Blog updated successfully',
            blog: updatedBlog,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getAllBlogs,getBlogById,saveBlog,deleteBlog,updateBlog }
