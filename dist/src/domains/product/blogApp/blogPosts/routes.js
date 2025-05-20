import uploadImageMiddleware from "../../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js";
import adminCrudMiddleware from "../../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../../middlewares/crudMiddlewares/userCrudMiddleware.js";
import { addNewBlogPostImagePost, addNewBlogPostPost, deleteBlogPostPost, getAllBlogPostsPost, updateBlogPostContentPost, updateBlogPostImagePost, updateBlogPostIntroPost, updateBlogPostMetaPost, updateBlogPostStatusPost, updateBlogPostTitlePost } from "./controller.js";
import express from 'express';
const router = express.Router();
//blogPosts
router.post('/add-new-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], addNewBlogPostPost);
router.post('/delete-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogPostPost);
router.post('/update-blog-post-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostTitlePost);
router.post('/update-blog-post-meta', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostMetaPost);
router.post('/update-blog-post-intro', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostIntroPost);
router.post('/update-blog-post-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostStatusPost);
router.post('/update-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostImagePost);
router.post('/update-blog-post-content', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostContentPost);
router.post('/add-new-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('image'), addNewBlogPostImagePost);
router.post('/get-all-blog-posts', getAllBlogPostsPost);
export default router;
