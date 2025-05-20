import { Request, Response, NextFunction } from "express";
import { createNewBlogPostCategoryService, deleteBlogPostCategoryService, getAllBlogPostCategoriesService, updateBlogPostCategoryDescriptionService, updateBlogPostCategoryImageService, updateBlogPostCategoryMetaService, updateBlogPostCategoryStatusService, updateBlogPostCategoryTitleService } from "./service.js";
import { createNewBlogPostImageService } from "../blogPosts/service.js";

//blogCategoryCUD
const createNewBlogCategoryController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await createNewBlogPostCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const createNewBlogCategoryImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await createNewBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogCategoryTitleController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostCategoryTitleService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogCategoryImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostCategoryImageService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogCategoryStatusController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostCategoryStatusService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogCategoryMetaController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostCategoryMetaService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogCategoryDescriptionController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostCategoryDescriptionService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const deleteBlogCategoryController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await deleteBlogPostCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//blogCategoryRead
const getAllBlogCategoriesController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostCategoriesService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

export {
    //blogCategories
    createNewBlogCategoryController,
    createNewBlogCategoryImageController,
    updateBlogCategoryTitleController,
    updateBlogCategoryImageController,
    updateBlogCategoryStatusController,
    updateBlogCategoryMetaController,
    updateBlogCategoryDescriptionController,
    deleteBlogCategoryController,
    getAllBlogCategoriesController
}