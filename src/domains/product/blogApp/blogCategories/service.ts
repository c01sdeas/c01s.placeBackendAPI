import slugify from 'slugify';
import { blogCategorySchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
import { format } from 'winston';
import uploadImageMiddleware from '../../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js';
import { Multer } from 'multer';

//blogCategoryCUD
const createNewBlogPostCategoryService = async (data:INewBlogCategoryRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = await blogCategorySchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogCategorySchemaExport.exists({ slug });
            counter++;
        }   

        const newCategoryData = new blogCategorySchemaExport({
            title: data.title,
            slug,
            description: data.description,
            image: data.image,
            status: data.status,
            meta: data.meta,
            username: data.username
        });
        await newCategoryData.save();
        return { statusCode: 201, success: true, message: 'New category added.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogPostCategoryService = async (id:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findByIdAndDelete(id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }
        return { statusCode: 200, success: true, message: 'Category deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryTitleService = async (data:IUpdateBlogCategoryTitleRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }

        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogCategorySchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogCategorySchemaExport.exists({ slug });
            counter++;
        }

        category.slug = slug;
        category.title = data.title;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryDescriptionService = async (data:IUpdateBlogCategoryDescriptionRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }

        category.description = data.description;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryImageService = async (data:IUpdateBlogCategoryImageRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }

        category.image = data.image;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryStatusService = async (data:IUpdateBlogCategoryStatusRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }

        category.status = !category.status;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const updateBlogPostCategoryMetaService = async (data:IUpdateBlogCategoryMetaRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) {
            return { statusCode: 404, success: false, message: 'Category not found.' };
        }

        category.meta = data.meta;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


//blogCategoryRead
const getAllBlogPostCategoriesService = async (data:IGetAllBlogPostCategoriesRequestData):Promise<ResponseWithMessage<IBlogCategoryListResponseData[]>> => {
    try {
        const { page, limit } = data;
        const categories = await blogCategorySchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

        if (!categories || categories.length === 0) {
            return { statusCode: 404, success: false, message: 'No categories found.' };
        }
        const users = await userSchemaExport.find({ username: { $in: categories.map(category => category.username) } });

        const formattedCategories : IBlogCategoryListResponseData[] = categories.map(category => ({
            slug: category.slug,
            image: category.image,
            title: category.title,
            description: category.description,
            status: category.status,
            meta: category.meta,
            username: category.username,
            userNickname: '',
        }));
        
        formattedCategories.forEach(category => {
            const user = users.find(user => user.username === category.username);
            if (user) category.userNickname = user.userNickname;
        });

        return { statusCode: 200, success: true, message: 'Categories fetched successfully.', data: formattedCategories };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const createNewBlogPostCategoryImageService = async ():Promise<ResponseWithMessage<boolean>> => {
    try {
        return { statusCode: 200, success: true, message: 'Image uploaded successfully.', data: true };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    //blogCategory
    createNewBlogPostCategoryService,
    createNewBlogPostCategoryImageService,
    deleteBlogPostCategoryService,
    updateBlogPostCategoryTitleService,
    updateBlogPostCategoryDescriptionService,
    updateBlogPostCategoryImageService,
    updateBlogPostCategoryStatusService,
    updateBlogPostCategoryMetaService,
    getAllBlogPostCategoriesService,
}