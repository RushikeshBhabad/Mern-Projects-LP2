const Blog = require("../models/Blog");

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
const createBlog = async (req, res, next) => {
  try {
    const { title, content, author, category } = req.body;

    const blog = await Blog.create({ title, content, author, category });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res, next) => {
  try {
    const { title, content, author, category } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, category },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
