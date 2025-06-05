var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createNewBlogPostCategoryImageService, createNewBlogPostCategoryService, deleteBlogPostCategoryService, getAllBlogPostCategoriesService, getBlogPostCategoryBySlugService, updateBlogPostCategoryDescriptionService, updateBlogPostCategoryImageService, updateBlogPostCategoryMetaService, updateBlogPostCategoryStatusService, updateBlogPostCategoryTitleService } from "./service.js";
//blogCategoryCUD
const createNewBlogCategoryImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadedFile = req.file;
        if (uploadedFile) {
            req.body.fileName = uploadedFile.filename;
            const response = yield createNewBlogPostCategoryImageService(req.body);
            return res.status(response.statusCode).json(response);
        }
        else {
            return res.status(400).json({ success: false, message: 'No file uploaded.', statusCode: 400 });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const createNewBlogCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const uploadedFile = req.file;
        if (uploadedFile) {
            req.body.image = uploadedFile.filename;
        }
        req.body.username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
        const response = yield createNewBlogPostCategoryService(req.body);
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
    var _b;
    try {
        const uploadedFile = req.file;
        if (uploadedFile) {
            req.body.fileName = uploadedFile.filename;
        }
        else {
            return res.status(400).json({ success: false, message: 'No file uploaded.', statusCode: 400 });
        }
        req.body.username = (_b = req.session) === null || _b === void 0 ? void 0 : _b.username;
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
const getBlogPostCategoryBySlugController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getBlogPostCategoryBySlugService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { 
//blogCategories
createNewBlogCategoryController, createNewBlogCategoryImageController, updateBlogCategoryTitleController, updateBlogCategoryImageController, updateBlogCategoryStatusController, updateBlogCategoryMetaController, updateBlogCategoryDescriptionController, deleteBlogCategoryController, getAllBlogCategoriesController, getBlogPostCategoryBySlugController };
