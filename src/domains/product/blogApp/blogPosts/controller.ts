import { Request, Response, NextFunction } from "express";
import { createNewBlogPostImageService, createNewBlogPostService, deleteBlogPostService, getAllBlogPostsService, getAllBlogPostsByCategoryIDService, getBlogPostBySlugService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostIntroService, updateBlogPostMetaService, updateBlogPostStatusService, updateBlogPostTitleService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryIDService, getAllBlogPostsByCategorySlugService, subscribeToNewsService, updateBlogPostVoteService, getBlogPostVotesService, getBlogPostVoteCountService, getBlogPostUserVoteControlService } from "./service.js";

//subscribeToNews
const subscribeToNewsController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await subscribeToNewsService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//blogPostCUD
const createNewBlogPostImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
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

//postVotes
const updateBlogPostVoteController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostVoteService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostVotesController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getBlogPostVotesService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostVoteCountController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getBlogPostVoteCountService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostUserVoteControlController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        req.body.username = req.session?.username;
        const response = await getBlogPostUserVoteControlService(req.body);
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

const getAllBlogPostsByCategoryIDController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByCategoryIDService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByCategorySlugController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByCategorySlugService(req.body);
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

const getAllBlogPostsByUsernameAndCategoryIDController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await getAllBlogPostsByUsernameAndCategoryIDService(req.body);
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
    updateBlogPostVoteController,
    getBlogPostVotesController,
    getBlogPostVoteCountController,
    getBlogPostUserVoteControlController,

    updateBlogPostStatusController,
    updateBlogPostImageController,
    updateBlogPostContentController,
    updateBlogPostTitleController,
    getAllBlogPostsController,
    getBlogPostBySlugController,
    getAllBlogPostsByCategoryIDController,
    getAllBlogPostsByUsernameController,
    getAllBlogPostsByUsernameAndCategoryIDController,
    getAllBlogPostsByCategorySlugController,
    

    //subscribeToNews
    subscribeToNewsController
}