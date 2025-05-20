import { Request, Response, NextFunction } from "express";
import { createNewBlogPostImageService, createNewBlogPostService, deleteBlogPostService, getAllBlogPostsService, getAllBlogPostsByCategoryService, getBlogPostBySlugService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostIntroService, updateBlogPostMetaService, updateBlogPostStatusService, updateBlogPostTitleService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryService } from "./service.js";

//blogPostCUD
const createNewBlogPostImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        console.log('İstek geldi:', req.method, req.url);
        console.log('Gelen veri:', req.body);
        console.log('Yüklenen dosya:', req.file);
        const response = await createNewBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const createNewBlogPostController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await createNewBlogPostService(req.body);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const deleteBlogPostController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await deleteBlogPostService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogPostMetaController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostMetaService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostIntroController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostIntroService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostStatusController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostStatusService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostContentController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostContentService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostTitleController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostTitleService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//blogPostRead
const getAllBlogPostsController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostBySlugController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getBlogPostBySlugService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByCategoryController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByUsernameController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByUsernameService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByUsernameAndCategoryController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByUsernameAndCategoryService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

export {
    //blogPosts
    createNewBlogPostImageController,
    createNewBlogPostController,
    deleteBlogPostController,
    updateBlogPostMetaController,
    updateBlogPostIntroController,
    updateBlogPostStatusController,
    updateBlogPostImageController,
    updateBlogPostContentController,
    updateBlogPostTitleController,
    getAllBlogPostsController,
    getBlogPostBySlugController,
    getAllBlogPostsByCategoryController,
    getAllBlogPostsByUsernameController,
    getAllBlogPostsByUsernameAndCategoryController
}