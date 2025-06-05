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
import { blogCategorySchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
//blogCategoryCUD
const createNewBlogPostCategoryImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPostCategoryData = yield blogCategorySchemaExport.findOne({ slug: data.slug });
        if (!blogPostCategoryData)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        blogPostCategoryData.image = data.fileName;
        yield blogPostCategoryData.save();
        return { statusCode: 201, success: true, message: 'New image added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const createNewBlogPostCategoryService = (contentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let slug = slugify.default(contentData.title, { lower: true, strict: true });
        let slugExists = yield blogCategorySchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogCategorySchemaExport.exists({ slug });
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
        yield newCategoryData.save();
        return { statusCode: 201, success: true, message: 'New category added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const deleteBlogPostCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findByIdAndDelete(id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        return { statusCode: 200, success: true, message: 'Category deleted successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostCategoryTitleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findById(data.id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogCategorySchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogCategorySchemaExport.exists({ slug });
            counter++;
        }
        category.slug = slug;
        category.title = data.title;
        yield category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostCategoryDescriptionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findById(data.id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        category.description = data.description;
        yield category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostCategoryImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findById(data.id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        category.image = data.image;
        yield category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostCategoryStatusService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findById(data.id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        category.status = !category.status;
        yield category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostCategoryMetaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield blogCategorySchemaExport.findById(data.id);
        if (!category)
            return { statusCode: 404, success: false, message: 'Category not found.' };
        category.meta = data.meta;
        yield category.save();
        return { statusCode: 200, success: true, message: 'Category updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//blogCategoryRead
const getAllBlogPostCategoriesService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = data;
        const categories = yield blogCategorySchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!categories || categories.length === 0)
            return { statusCode: 200, success: false, message: 'No categories found.' };
        const users = yield userSchemaExport.find({ username: { $in: categories.map(category => category.username) } });
        const formattedCategories = categories.map(category => ({
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
            if (user)
                category.userNickname = user.userNickname;
        });
        return { statusCode: 200, success: true, message: 'Categories fetched successfully.', data: formattedCategories };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostCategoryBySlugService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, page, limit } = data;
        const category = yield blogCategorySchemaExport.findOne({ slug }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        if (!category)
            return { statusCode: 200, success: false, message: 'Category not found.' };
        const user = yield userSchemaExport.findOne({ username: category.username });
        if (!user)
            return { statusCode: 404, success: false, message: 'User not found.' };
        const formattedCategory = {
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
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { 
//blogCategory
createNewBlogPostCategoryImageService, createNewBlogPostCategoryService, deleteBlogPostCategoryService, updateBlogPostCategoryTitleService, updateBlogPostCategoryDescriptionService, updateBlogPostCategoryImageService, updateBlogPostCategoryStatusService, updateBlogPostCategoryMetaService, getAllBlogPostCategoriesService, getBlogPostCategoryBySlugService };
