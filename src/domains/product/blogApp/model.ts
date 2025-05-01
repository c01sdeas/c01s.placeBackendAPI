const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required.'],
        trim: true,
    },
    intro: {
        type: String,
        required: [true, 'Blog intro is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Blog content is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        required: [true, 'Status is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    }
}, { timestamps: true });

const blogSchemaExport = mongoose.model('blog', blogSchema, 'blogs');

export {
    blogSchemaExport
}