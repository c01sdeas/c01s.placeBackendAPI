import { createNewBlogLibraryService, createNewBlogPostInLibraryService, deleteBlogLibraryService, deleteBlogPostInLibraryService, getAllBlogLibrariesByUsernameService, updateBlogLibraryDescriptionService, updateBlogLibraryStatusService, updateBlogLibraryTitleService, updateBlogPostInLibraryService, updateBlogPostInLibraryStatusService } from "./service.js";
import { Request, response, Response } from "express";
import { ICreateNewBlogLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, IDeleteBlogLibraryRequestDto, IDeleteBlogPostInLibraryRequestDto, IGetAllBlogLibrariesRequestDto, IUpdateBlogLibraryDescriptionRequestDto, IUpdateBlogLibraryStatusRequestDto, IUpdateBlogLibraryTitleRequestDto, IUpdateBlogPostInLibraryRequestDto } from "./requestTypes.d.js";

//librariesCRUD
const createNewBlogLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as ICreateNewBlogLibraryRequestDto;
        const response = await createNewBlogLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogLibraryTitleController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogLibraryTitleRequestDto;
        const response = await updateBlogLibraryTitleService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const updateBlogLibraryDescriptionController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogLibraryDescriptionRequestDto;
        const response = await updateBlogLibraryDescriptionService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const updateBlogLibraryStatusController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogLibraryStatusRequestDto;
        const response = await updateBlogLibraryStatusService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const deleteBlogLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IDeleteBlogLibraryRequestDto;
        const response = await deleteBlogLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const getAllBlogLibrariesByUsernameController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IGetAllBlogLibrariesRequestDto;
        const response = await getAllBlogLibrariesByUsernameService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

//blogPostInLibrariesCRUD
const createNewBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as ICreateNewBlogPostInLibraryRequestDto;
        const response = await createNewBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogPostInLibraryRequestDto;
        const response = await updateBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogPostInLibraryStatusController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogLibraryStatusRequestDto;
        const response = await updateBlogPostInLibraryStatusService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const deleteBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IDeleteBlogPostInLibraryRequestDto;
        const response = await deleteBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    

export {
    createNewBlogLibraryController,
    updateBlogLibraryTitleController,
    updateBlogLibraryDescriptionController,
    updateBlogLibraryStatusController,
    deleteBlogLibraryController,
    getAllBlogLibrariesByUsernameController,
    //blogPostInLibrariesCRUD
    createNewBlogPostInLibraryController,
    updateBlogPostInLibraryController,
    updateBlogPostInLibraryStatusController,
    deleteBlogPostInLibraryController
}
