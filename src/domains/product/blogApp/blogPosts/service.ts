import slugify from 'slugify';
import { blogSchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
import { format } from 'winston';
import uploadImageMiddleware from '../../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js';
import { Multer } from 'multer';

//blogCUD
const createNewBlogPostImageService = async (data:File):Promise<ResponseWithMessage<boolean>> => {
    try {
        
        return { statusCode: 201, success: true, message: 'Image added.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const createNewBlogPostService = async (data:ICreateNewBlogPostRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogSchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogSchemaExport.exists({ slug });
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

        await newBlogData.save();
        return { statusCode: 201, success: true, message: 'New post added.' };


    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogPostService = async (id:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findByIdAndDelete(id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        return { statusCode: 200, success: true, message: 'Post deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostTitleService = async (data:IUpdateBlogPostTitleRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogSchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogSchemaExport.exists({ slug });
            counter++;
        }

        post.slug = slug;
        post.title = data.title;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostContentService = async (data:IUpdateBlogPostContentRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        post.readingTime = Math.ceil((data.content.trim().split(/\s+/)).length / 200).toString();
        post.content = data.content;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostImageService = async (data:IUpdateBlogPostImageRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        post.image = data.image;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostMetaService = async (data:IUpdateBlogPostMetaRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        post.meta = data.meta;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostIntroService = async (data:IUpdateBlogPostIntroRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        post.intro = data.intro;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostStatusService = async (data:IUpdateBlogPostStatusRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogSchemaExport.findById(data.id);
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }

        post.status = !post.status;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


//blogRead
const getAllBlogPostsService = async (data:IGetAllBlogPostsRequestData):Promise<ResponseWithMessage<IBlogListResponseData[]>> => {
    try {
        const { page, limit } = data;
        const posts = await blogSchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });

        const formattedPosts : IBlogListResponseData[] = posts.map(post => ({
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
            if (user) post.userNickname = user.userNickname;
        });

        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getBlogPostBySlugService = async (data:IGetBlogPostBySlugRequestData):Promise<ResponseWithMessage<IBlogListResponseData>> => {
    try {
        const { slug } = data;
        const post = await blogSchemaExport.findOne({ slug });
        if (!post) {
            return { statusCode: 404, success: false, message: 'Post not found.' };
        }
        const user = await userSchemaExport.findOne({ username: post.username });
        if (!user) {
            return { statusCode: 404, success: false, message: 'User not found.' };
        }
        const formattedPost : IBlogListResponseData = {
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
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByCategoryService = async (data:IGetBlogPostByCategoryIDRequestData):Promise<ResponseWithMessage<IBlogListResponseData[]>> => {
    try {
        const { categoryID, page, limit } = data;
        const posts = await blogSchemaExport.find({ category: categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts : IBlogListResponseData[] = posts.map(post => ({
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
            if (user) post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByUsernameService = async (data:IGetBlogPostByUsernameRequestData):Promise<ResponseWithMessage<IBlogListResponseData[]>> => {
    try {
        const { username, page, limit } = data;
        const posts = await blogSchemaExport.find({ username }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts : IBlogListResponseData[] = posts.map(post => ({
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
            if (user) post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByUsernameAndCategoryService = async (data:IGetBlogPostByUsernameAndCategoryIDRequestData):Promise<ResponseWithMessage<IBlogListResponseData[]>> => {
    try {
        const { username, categoryID, page, limit } = data;
        const posts = await blogSchemaExport.find({ username, category: categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!posts || posts.length === 0) {
            return { statusCode: 404, success: false, message: 'No posts found.' };
        }
        const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        const formattedPosts : IBlogListResponseData[] = posts.map(post => ({
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
            if (user) post.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    //blogPost
    createNewBlogPostService,
    deleteBlogPostService,
    updateBlogPostTitleService,
    updateBlogPostContentService,
    updateBlogPostImageService,
    updateBlogPostMetaService,
    updateBlogPostIntroService,
    updateBlogPostStatusService,
    getAllBlogPostsService,
    createNewBlogPostImageService,
    getBlogPostBySlugService,
    getAllBlogPostsByCategoryService,
    getAllBlogPostsByUsernameService,
    getAllBlogPostsByUsernameAndCategoryService
}