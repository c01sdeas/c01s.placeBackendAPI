import { Request, Response, NextFunction } from 'express';
import { userSchemaExport } from '../../user/authentication/authModel.js';
const model = require('./model');

import { blogSchemaExport } from './model.js';


const blogModel = blogSchemaExport;
const blogList = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const blogList = await blogModel.find();
        if (blogList) return res.json(blogList);
    } catch (error) {
        console.log(error);
    }
}

const blogAddGet = (req:Request,res:Response,next:NextFunction) => {
    try {
        return res.json({
            title: '',
            intro: '',
            content: '',
        });
    } catch (error) {
        console.log(error);
    }
}

const blogAdd = async (req:Request,res:Response,next:NextFunction) => {
    try {
        if (req.session.userRoles!.includes('admin') || req.session.userRoles!.includes('writer')) {
            const newBlog = new blogModel({
                title: req.body.title,
                intro: req.body.intro,
                content: req.body.content,
                status: true,
                username: req.session.username
            });
    
            newBlog.save();
        }
    } catch (error) {
        console.log(error);
    }
}

const blogUpdateGet = (req:Request,res:Response,next:NextFunction) => {
    try {
        return res.json({

        });
    } catch (error) {
        console.log(error);
    }
}

const blogUpdate = async (req:Request,res:Response,next:NextFunction) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const blogDelete = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const blogDataForUpdate = await blogModel.findOne({_id:req.body.blogID});
        if (blogDataForUpdate) {
            await blogModel.findOneAndUpdate({_id:req.body.blogID}, {status: !blogDataForUpdate.status});
        } else {

        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    blogList,
    blogAdd,
    blogAddGet
}