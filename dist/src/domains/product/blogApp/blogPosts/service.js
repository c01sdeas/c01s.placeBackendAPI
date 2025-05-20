var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import slugify from 'slugify';
import { blogSchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
//blogCUD
const createNewBlogPostImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return { statusCode: 201, success: true, message: 'Image added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const createNewBlogPostService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogSchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogSchemaExport.exists({ slug });
            counter++;
        }
        const newBlogData = new blogSchemaExport({
            content: data.content,
            image: data.image,
            intro: data.intro,
            meta: data.meta,
            readingTime: Math.ceil((data.content.trim().split(/\s+/)).length / 200),
            slug,
            title: data.title,
            username: data.username
        });
        yield newBlogData.save();
        return { statusCode: 201, success: true, message: 'New post added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const deleteBlogPostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findByIdAndDelete(id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        return { statusCode: 200, success: true, message: 'Post deleted successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostTitleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogSchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogSchemaExport.exists({ slug });
            counter++;
        }
        post.slug = slug;
        post.title = data.title;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostContentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        post.readingTime = Math.ceil((data.content.trim().split(/\s+/)).length / 200).toString();
        post.content = data.content;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        post.image = data.image;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostMetaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        post.meta = data.meta;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostIntroService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        post.intro = data.intro;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostStatusService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        post.status = !post.status;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//blogRead
const getAllBlogPostsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = data;
        const posts = yield blogSchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = yield userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts = posts.map(post => ({
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            username: post.username,
            status: post.status,
            userNickname: '',
        }));
        formattedPosts.forEach(post => {
            const user = users.find(user => user.username === post.username);
            if (user)
                post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostBySlugService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = data;
        const post = yield blogSchemaExport.findOne({ slug });
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        const user = yield userSchemaExport.findOne({ username: post.username });
        if (!user) {
            return { statusCode: 404, success: false, message: 'User not found.' };
        }
        const formattedPost = {
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            username: post.username,
            status: post.status,
            userNickname: user.userNickname,
        };
        return { statusCode: 200, success: true, message: 'Post fetched successfully.', data: formattedPost };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryID, page, limit } = data;
        const posts = yield blogSchemaExport.find({ category: categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = yield userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts = posts.map(post => ({
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            username: post.username,
            status: post.status,
            userNickname: '',
        }));
        formattedPosts.forEach(post => {
            const user = users.find(user => user.username === post.username);
            if (user)
                post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByUsernameService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, page, limit } = data;
        const posts = yield blogSchemaExport.find({ username }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = yield userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts = posts.map(post => ({
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            username: post.username,
            status: post.status,
            userNickname: '',
        }));
        formattedPosts.forEach(post => {
            const user = users.find(user => user.username === post.username);
            if (user)
                post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByUsernameAndCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, categoryID, page, limit } = data;
        const posts = yield blogSchemaExport.find({ username, category: categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = yield userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts = posts.map(post => ({
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            username: post.username,
            status: post.status,
            userNickname: '',
        }));
        formattedPosts.forEach(post => {
            const user = users.find(user => user.username === post.username);
            if (user)
                post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { 
//blogPost
createNewBlogPostService, deleteBlogPostService, updateBlogPostTitleService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostMetaService, updateBlogPostIntroService, updateBlogPostStatusService, getAllBlogPostsService, createNewBlogPostImageService, getBlogPostBySlugService, getAllBlogPostsByCategoryService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryService };
