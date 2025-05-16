import { Schema, Model, model } from "mongoose";
import slugify from "slugify";

const blogSchema : Schema<IBlog> = new Schema<IBlog>({
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

blogSchema.pre('save', async function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify.default(this.title, { lower: true, strict: true });
    const existingPost = await this.model('Post').findOne({ slug: this.slug, _id: { $ne: this._id } });
    if (existingPost) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});

const blogSchemaExport : Model<IBlog> = model('blog', blogSchema, 'blogs');

export {
    blogSchemaExport
}