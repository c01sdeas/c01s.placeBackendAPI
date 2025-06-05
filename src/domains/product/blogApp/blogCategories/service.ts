import slugify from 'slugify';
import { blogCategorySchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
import { ICreateNewBlogCategoryImageRequestDto, IGetAllBlogPostCategoriesRequestDto, IGetBlogPostCategoryBySlugRequestDto, INewBlogCategoryRequestDto, IUpdateBlogCategoryDescriptionRequestDto, IUpdateBlogCategoryImageRequestDto, IUpdateBlogCategoryMetaRequestDto, IUpdateBlogCategoryStatusRequestDto, IUpdateBlogCategoryTitleRequestDto } from './requestTypes.js';
import { IBlogCategoryListResponseDto } from './responseTypes.js';
//blogCategoryCUD
const createNewBlogPostCategoryImageService = async (data:ICreateNewBlogCategoryImageRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostCategoryData = await blogCategorySchemaExport.findOne({slug: data.slug});
        
        if (!blogPostCategoryData) return { statusCode: 404, success: false, message: 'Category not found.' };
        blogPostCategoryData.image = data.fileName;
        await blogPostCategoryData.save();
        return { statusCode: 201, success: true, message: 'New image added.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const createNewBlogPostCategoryService = async (contentData:INewBlogCategoryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        let slug = slugify.default(contentData.title, { lower: true, strict: true });
        let slugExists = await blogCategorySchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogCategorySchemaExport.exists({ slug });
            counter++;
        }
        const newCategoryData = new blogCategorySchemaExport({
            title: contentData.title,
            slug,
            description: contentData.description,
            image: contentData.image,
            meta: contentData.meta,
            username: contentData.username
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
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };
        return { statusCode: 200, success: true, message: 'Category deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryTitleService = async (data:IUpdateBlogCategoryTitleRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };

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

const updateBlogPostCategoryDescriptionService = async (data:IUpdateBlogCategoryDescriptionRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };

        category.description = data.description;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryImageService = async (data:IUpdateBlogCategoryImageRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };

        category.image = data.image;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostCategoryStatusService = async (data:IUpdateBlogCategoryStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };

        category.status = !category.status;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const updateBlogPostCategoryMetaService = async (data:IUpdateBlogCategoryMetaRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const category = await blogCategorySchemaExport.findById(data.id);
        if (!category) return { statusCode: 404, success: false, message: 'Category not found.' };

        category.meta = data.meta;

        await category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


//blogCategoryRead
const getAllBlogPostCategoriesService = async (data:IGetAllBlogPostCategoriesRequestDto):Promise<ResponseWithMessage<IBlogCategoryListResponseDto[]>> => {
    try {
        const { page, limit } = data;
        const categories = await blogCategorySchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

        if (!categories || categories.length === 0) return { statusCode: 200, success: false, message: 'No categories found.' };
        const users = await userSchemaExport.find({ username: { $in: categories.map(category => category.username) } });

        const formattedCategories : IBlogCategoryListResponseDto[] = categories.map(category => ({
            id: category._id.toString(),
            slug: category.slug,
            image: category.image,
            title: category.title,
            description: category.description,  
            status: category.status,
            meta: category.meta,
            username: category.username,
            userNickname: '',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
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

const getBlogPostCategoryBySlugService = async (data:IGetBlogPostCategoryBySlugRequestDto):Promise<ResponseWithMessage<IBlogCategoryListResponseDto>> => {
    try {
        const { slug, page, limit } = data;
        const category = await blogCategorySchemaExport.findOne({ slug }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!category) return { statusCode: 200, success: false, message: 'Category not found.' };
        const user = await userSchemaExport.findOne({ username: category.username });
        if (!user) return { statusCode: 404, success: false, message: 'User not found.' };
        const formattedCategory : IBlogCategoryListResponseDto = {
            id: category._id.toString(),
            slug: category.slug,
            image: category.image,
            title: category.title,
            description: category.description,
            status: category.status,
            meta: category.meta,
            username: category.username,
            userNickname: user.userNickname,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
        return { statusCode: 200, success: true, message: 'Category fetched successfully.', data: formattedCategory };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    //blogCategory
    createNewBlogPostCategoryImageService,
    createNewBlogPostCategoryService,
    deleteBlogPostCategoryService,
    updateBlogPostCategoryTitleService,
    updateBlogPostCategoryDescriptionService,
    updateBlogPostCategoryImageService,
    updateBlogPostCategoryStatusService,
    updateBlogPostCategoryMetaService,
    getAllBlogPostCategoriesService,
    getBlogPostCategoryBySlugService
}