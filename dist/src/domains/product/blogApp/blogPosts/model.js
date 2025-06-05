var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from "mongoose";
import slugify from "slugify";
const subscribeNewsSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/.+\@.+\..+/, 'Please enter a valid email.'],
        minlength: [1, 'E-mail must be at least 1 characters long.'],
        maxlength: [255, 'E-mail can be up to 255 characters.'],
        trim: true,
        unique: true,
    }
}, { timestamps: true });
const subscribeNewsSchemaExport = model('subscribeNews', subscribeNewsSchema, 'subscribedNews');
const blogPostSchema = new Schema({
    slug: {
        type: String,
        required: [true, 'Slug is required.'],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        trim: true,
    },
    readingTime: {
        type: String,
        required: [true, 'Time is required.'],
        trim: true,
    },
    meta: {
        type: String,
        required: [true, 'Meta is required.'],
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
    },
    intro: {
        type: String,
        required: [true, 'Intro is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
        trim: true,
    },
    categoryID: {
        type: String,
        required: [true, 'Category is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, 'Status is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    }
}, { timestamps: true });
blogPostSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('title') || !this.slug) {
            this.slug = slugify.default(this.title, { lower: true, strict: true });
            const existingPost = yield this.model('blogPost').findOne({ slug: this.slug, _id: { $ne: this._id } });
            if (existingPost) {
                this.slug = `${this.slug}-${Date.now()}`;
            }
        }
        next();
    });
});
const blogPostSchemaExport = model('blogPost', blogPostSchema, 'blogPosts');
const blogPostVoteSchema = new Schema({
    blogID: {
        type: String,
        required: [true, 'Blog ID is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
    },
    vote: {
        type: Number,
        required: [true, 'Vote is required.'],
        trim: true,
    }
}, { timestamps: true });
blogPostVoteSchema.index({ blogID: 1, username: 1 }, { unique: true });
const blogPostVoteSchemaExport = model('blogPostVote', blogPostVoteSchema, 'blogPostVotes');
export { blogPostSchemaExport, subscribeNewsSchemaExport, blogPostVoteSchemaExport };
