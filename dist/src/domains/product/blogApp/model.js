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
const blogSchema = new Schema({
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
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    }
}, { timestamps: true });
blogSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('title') || !this.slug) {
            this.slug = slugify.default(this.title, { lower: true, strict: true });
            const existingPost = yield this.model('Post').findOne({ slug: this.slug, _id: { $ne: this._id } });
            if (existingPost) {
                this.slug = `${this.slug}-${Date.now()}`;
            }
        }
        next();
    });
});
const blogSchemaExport = model('blog', blogSchema, 'blogs');
export { blogSchemaExport };
