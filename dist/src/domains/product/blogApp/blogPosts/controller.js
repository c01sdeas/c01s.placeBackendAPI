var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createNewBlogPostImageService, createNewBlogPostService, deleteBlogPostService, getAllBlogPostsService, getAllBlogPostsByCategoryService, getBlogPostBySlugService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostIntroService, updateBlogPostMetaService, updateBlogPostStatusService, updateBlogPostTitleService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryService } from "./service.js";
//blogPostCUD
const createNewBlogPostImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('İstek geldi:', req.method, req.url);
        console.log('Gelen veri:', req.body);
        console.log('Yüklenen dosya:', req.file);
        const response = yield createNewBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const createNewBlogPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield createNewBlogPostService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const deleteBlogPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield deleteBlogPostService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostMetaController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostMetaService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostIntroController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostIntroService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostStatusService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostContentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostContentService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const updateBlogPostTitleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostTitleService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//blogPostRead
const getAllBlogPostsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getBlogPostBySlugController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getBlogPostBySlugService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getAllBlogPostsByCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getAllBlogPostsByUsernameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByUsernameService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getAllBlogPostsByUsernameAndCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByUsernameAndCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { 
//blogPosts
createNewBlogPostImageController, createNewBlogPostController, deleteBlogPostController, updateBlogPostMetaController, updateBlogPostIntroController, updateBlogPostStatusController, updateBlogPostImageController, updateBlogPostContentController, updateBlogPostTitleController, getAllBlogPostsController, getBlogPostBySlugController, getAllBlogPostsByCategoryController, getAllBlogPostsByUsernameController, getAllBlogPostsByUsernameAndCategoryController };
