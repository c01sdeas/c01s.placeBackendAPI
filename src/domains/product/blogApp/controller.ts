import { Request, Response, NextFunction } from "express";
import { addNewBlogPostService } from "./service.js";

const addNewBlogPostPost = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await addNewBlogPostService(req.body);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

export {
    addNewBlogPostPost
}