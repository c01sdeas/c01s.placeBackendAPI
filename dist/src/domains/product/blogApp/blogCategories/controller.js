var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createNewBlogPostCategoryService, deleteBlogPostCategoryService, getAllBlogPostCategoriesService, updateBlogPostCategoryDescriptionService, updateBlogPostCategoryImageService, updateBlogPostCategoryMetaService, updateBlogPostCategoryStatusService, updateBlogPostCategoryTitleService } from "./service.js";
import { createNewBlogPostImageService } from "../blogPosts/service.js";
//blogCategoryCUD
const createNewBlogCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield createNewBlogPostCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const createNewBlogCategoryImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield createNewBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogCategoryTitleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostCategoryTitleService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogCategoryImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostCategoryImageService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogCategoryStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostCategoryStatusService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogCategoryMetaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostCategoryMetaService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogCategoryDescriptionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostCategoryDescriptionService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const deleteBlogCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield deleteBlogPostCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//blogCategoryRead
const getAllBlogCategoriesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostCategoriesService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { 
//blogCategories
createNewBlogCategoryController, createNewBlogCategoryImageController, updateBlogCategoryTitleController, updateBlogCategoryImageController, updateBlogCategoryStatusController, updateBlogCategoryMetaController, updateBlogCategoryDescriptionController, deleteBlogCategoryController, getAllBlogCategoriesController };
