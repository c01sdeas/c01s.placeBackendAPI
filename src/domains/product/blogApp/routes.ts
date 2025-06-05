import uploadImageMiddleware from "../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js";
import adminCrudMiddleware from "../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../middlewares/crudMiddlewares/userCrudMiddleware.js";
import { getAllBlogPostsByCategorySlugController, getBlogPostUserVoteControlController, getBlogPostVoteCountController } from "./blogPosts/controller.js";
import express from 'express';
import { createNewBlogPostController, deleteBlogPostController, getAllBlogPostsByUsernameAndCategoryIDController, getAllBlogPostsByCategoryIDController, getAllBlogPostsByUsernameController, getAllBlogPostsController, getBlogPostBySlugController, updateBlogPostContentController, updateBlogPostImageController, updateBlogPostIntroController, updateBlogPostMetaController, updateBlogPostStatusController, updateBlogPostTitleController, createNewBlogPostImageController, subscribeToNewsController, updateBlogPostVoteController, getBlogPostVotesController } from "./blogPosts/controller.js";
import { createNewBlogCategoryController, createNewBlogCategoryImageController, deleteBlogCategoryController, getAllBlogCategoriesController, getBlogPostCategoryBySlugController, updateBlogCategoryDescriptionController, updateBlogCategoryImageController, updateBlogCategoryTitleController } from "./blogCategories/controller.js";
import { createNewBlogLibraryController, createNewBlogPostInLibraryController, deleteBlogLibraryController, deleteBlogPostInLibraryController, getAllBlogLibrariesByUsernameController, updateBlogLibraryDescriptionController, updateBlogLibraryStatusController, updateBlogLibraryTitleController, updateBlogPostInLibraryController, updateBlogPostInLibraryStatusController } from "./blogLibraries/controller.js";

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

router.post('/create-new-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('image'), createNewBlogPostImageController);

router.post('/update-blog-post-vote', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogPostVoteController);

router.post('/get-blog-post-votes', getBlogPostVotesController);

router.post('/get-blog-post-vote-count', getBlogPostVoteCountController);

router.post('/get-blog-post-user-vote-control', getBlogPostUserVoteControlController);

router.post('/get-all-blog-posts', getAllBlogPostsController);

router.post('/get-blog-post-by-slug/:slug', getBlogPostBySlugController);//slug

router.post('/get-all-blog-posts-by-category-id', getAllBlogPostsByCategoryIDController);

router.post('/get-all-blog-posts-by-category-slug', getAllBlogPostsByCategorySlugController);//slug

router.post('/get-all-blog-posts-by-username', getAllBlogPostsByUsernameController);

router.post('/get-all-blog-posts-by-username-and-category-id', getAllBlogPostsByUsernameAndCategoryIDController);


//blogCategories
router.post('/create-new-blog-category-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('tagImage'), createNewBlogCategoryImageController);

router.post('/create-new-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], createNewBlogCategoryController);

router.post('/delete-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogCategoryController);

router.post('/update-blog-category-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware.single('image'), updateBlogCategoryImageController);

router.post('/update-blog-category-description', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryDescriptionController);

router.post('/update-blog-category-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryTitleController);

router.post('/get-all-blog-categories', getAllBlogCategoriesController);

router.post('/get-blog-post-category-by-slug', getBlogPostCategoryBySlugController);

//subscribeToNews
router.post('/subscribe-to-news', subscribeToNewsController);

//blogLibraries
router.post('/create-new-blog-library', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], createNewBlogLibraryController);

router.post('/update-blog-library-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogLibraryTitleController);

router.post('/update-blog-library-description', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogLibraryDescriptionController);

router.post('/update-blog-library-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogLibraryStatusController);

router.post('/delete-blog-library', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogLibraryController);

router.post('/get-all-blog-libraries-by-username', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllBlogLibrariesByUsernameController);


//blogPostsInLibraries
router.post('/create-new-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], createNewBlogPostInLibraryController);

router.post('/update-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostInLibraryController);

router.post('/update-blog-post-in-library-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostInLibraryStatusController);

router.post('/delete-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogPostInLibraryController);




export default router;