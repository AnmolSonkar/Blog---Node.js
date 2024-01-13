const Blog = require('../models/blogModels');

const blog_index = async (req, res) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 });
        res.render('blogs/index', { title: 'Home', blogs: result });
    } catch (error) {
        console.log(error);
    }
};

const blog_details = async (req, res) => {
    const slug = req.params.slug;
    try {
        const result = await Blog.findOne({ slug: slug })
        res.render('blogs/details', { title: 'Blog details', blogs: result });
    } catch (error) {
        res.status(404).render('404', {
            title: 'Error 404',
        });
    }
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', {
        title: 'Blogs',
    });
};

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);

    try {
        const result = await blog.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

const blog_update = async (req, res) => {

    const slug = req.params.slug;

    try {
        const result = await Blog.findOne({ slug: slug });
        res.render('blogs/edit', { title: "Edit", blogs: result });
    } catch (error) {
        console.error(error);
    }
};

const blog_update_post = async (req, res) => {

    const id = req.params.id;
    const { title, snippet, body } = req.body;

    const updatedData = {
        title: title,
        snippet: snippet,
        body: body
    };

    try {
        const result = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
        await result.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
};


const blog_delete = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Blog.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_update,
    blog_update_post,
    blog_delete,
};
