import uploadImageMiddleware from "../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js";
import adminCrudMiddleware from "../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../middlewares/crudMiddlewares/userCrudMiddleware.js";


import express from 'express';
import { createNewBlogPostController, deleteBlogPostController, getAllBlogPostsByUsernameAndCategoryController, getAllBlogPostsByCategoryController, getAllBlogPostsByUsernameController, getAllBlogPostsController, getBlogPostBySlugController, updateBlogPostContentController, updateBlogPostImageController, updateBlogPostIntroController, updateBlogPostMetaController, updateBlogPostStatusController, updateBlogPostTitleController } from "./blogPosts/controller.js";
import { createNewBlogCategoryController, deleteBlogCategoryController, getAllBlogCategoriesController, updateBlogCategoryDescriptionController, updateBlogCategoryImageController, updateBlogCategoryTitleController } from "./blogCategories/controller.js";

const router = express.Router();

//blogPosts
router.post('/create-new-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], createNewBlogPostController);

router.post('/delete-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogPostController);

router.post('/update-blog-post-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostTitleController);

router.post('/update-blog-post-meta', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostMetaController);

router.post('/update-blog-post-intro', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostIntroController);

router.post('/update-blog-post-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostStatusController);

router.post('/update-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostImageController);

router.post('/update-blog-post-content', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostContentController);

router.post('/create-new-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('image'), updateBlogPostImageController);

router.post('/get-all-blog-posts', getAllBlogPostsController);

router.post('/get-blog-post-by-slug', getBlogPostBySlugController);

router.post('/get-all-blog-posts-by-category', getAllBlogPostsByCategoryController);

router.post('/get-all-blog-posts-by-username', getAllBlogPostsByUsernameController);

router.post('/get-all-blog-posts-by-username-and-category', getAllBlogPostsByUsernameAndCategoryController);

//blogCategories
router.post('/create-new-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], createNewBlogCategoryController);

router.post('/delete-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogCategoryController);

router.post('/update-blog-category-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('image'), updateBlogCategoryImageController);

router.post('/update-blog-category-description', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryDescriptionController);

router.post('/update-blog-category-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryTitleController);

router.post('/get-all-blog-categories', getAllBlogCategoriesController);



export default router;