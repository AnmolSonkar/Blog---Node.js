const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const DOMPurify = createDOMPurify(new JSDOM('').window)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    marked_sanitized_html: {
        type: String,
        required: true
    },
},
    { timestamps: true });

blogSchema.pre('validate', function (next) {

    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.body) {
        this.marked_sanitized_html = DOMPurify.sanitize(marked.parse(this.body));

    }
    next()
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;