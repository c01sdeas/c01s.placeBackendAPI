import adminCrudMiddleware from "../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../middlewares/crudMiddlewares/userCrudMiddleware.js";
import { addNewBlogPostPost } from "./controller.js";
import express from 'express';
const router = express.Router();
router.post('/add-new-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], addNewBlogPostPost);
export default router;
