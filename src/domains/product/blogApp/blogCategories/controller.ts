import { Request, Response, NextFunction } from "express";
import { createNewBlogPostCategoryImageService, createNewBlogPostCategoryService, deleteBlogPostCategoryService, getAllBlogPostCategoriesService, getBlogPostCategoryBySlugService, updateBlogPostCategoryDescriptionService, updateBlogPostCategoryImageService, updateBlogPostCategoryMetaService, updateBlogPostCategoryStatusService, updateBlogPostCategoryTitleService } from "./service.js";

//blogCategoryCUD
const createNewBlogCategoryImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const uploadedFile = req.file;      
        if (uploadedFile) {
            req.body.fileName = uploadedFile.filename;
            const response = await createNewBlogPostCategoryImageService(req.body);
            return res.status(response.statusCode).json(response);
        } else {
            return res.status(400).json({ success: false, message: 'No file uploaded.', statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const createNewBlogCategoryController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const uploadedFile = req.file;
        if (uploadedFile) {
            req.body.image = uploadedFile.filename;
        }
        req.body.username = req.session?.username;
        const response = await createNewBlogPostCategoryService(req.body);
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
        const uploadedFile = req.file;
        if (uploadedFile) {
            req.body.fileName = uploadedFile.filename;  
        } else {
            return res.status(400).json({ success: false, message: 'No file uploaded.', statusCode: 400 });
        }
        req.body.username = req.session?.username;
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
const getBlogPostCategoryBySlugController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getBlogPostCategoryBySlugService(req.body);
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
    getAllBlogCategoriesController,
    getBlogPostCategoryBySlugController
}