var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createNewBlogPostImageService, createNewBlogPostService, deleteBlogPostService, getAllBlogPostsService, getAllBlogPostsByCategoryIDService, getBlogPostBySlugService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostIntroService, updateBlogPostMetaService, updateBlogPostStatusService, updateBlogPostTitleService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryIDService, getAllBlogPostsByCategorySlugService, subscribeToNewsService, updateBlogPostVoteService, getBlogPostVotesService, getBlogPostVoteCountService, getBlogPostUserVoteControlService } from "./service.js";
//subscribeToNews
const subscribeToNewsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield subscribeToNewsService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//blogPostCUD
const createNewBlogPostImageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
//postVotes
const updateBlogPostVoteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield updateBlogPostVoteService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getBlogPostVotesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getBlogPostVotesService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getBlogPostVoteCountController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getBlogPostVoteCountService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getBlogPostUserVoteControlController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        req.body.username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
        const response = yield getBlogPostUserVoteControlService(req.body);
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
const getAllBlogPostsByCategoryIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByCategoryIDService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getAllBlogPostsByCategorySlugController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByCategorySlugService(req.body);
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
const getAllBlogPostsByUsernameAndCategoryIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAllBlogPostsByUsernameAndCategoryIDService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { 
//blogPosts
createNewBlogPostImageController, createNewBlogPostController, deleteBlogPostController, updateBlogPostMetaController, updateBlogPostIntroController, updateBlogPostVoteController, getBlogPostVotesController, getBlogPostVoteCountController, getBlogPostUserVoteControlController, updateBlogPostStatusController, updateBlogPostImageController, updateBlogPostContentController, updateBlogPostTitleController, getAllBlogPostsController, getBlogPostBySlugController, getAllBlogPostsByCategoryIDController, getAllBlogPostsByUsernameController, getAllBlogPostsByUsernameAndCategoryIDController, getAllBlogPostsByCategorySlugController, 
//subscribeToNews
subscribeToNewsController };
