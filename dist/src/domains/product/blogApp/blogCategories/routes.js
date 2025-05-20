import adminCrudMiddleware from "../../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../../middlewares/crudMiddlewares/userCrudMiddleware.js";
import { addNewBlogCategoryPost } from "./controller.js";
import express from 'express';
const router = express.Router();
//blogCategory
router.post('/add-new-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], addNewBlogCategoryPost);
export default router;
