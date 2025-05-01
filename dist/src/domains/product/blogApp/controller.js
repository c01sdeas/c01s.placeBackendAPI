var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model = require('./model');
import { blogSchemaExport } from './model.js';
const blogModel = blogSchemaExport;
const blogList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogList = yield blogModel.find();
        if (blogList)
            return res.json(blogList);
    }
    catch (error) {
        console.log(error);
    }
});
const blogAddGet = (req, res, next) => {
    try {
        return res.json({
            title: '',
            intro: '',
            content: '',
        });
    }
    catch (error) {
        console.log(error);
    }
};
const blogAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.userRoles.includes('admin') || req.session.userRoles.includes('writer')) {
            const newBlog = new blogModel({
                title: req.body.title,
                intro: req.body.intro,
                content: req.body.content,
                status: true,
                username: req.session.username
            });
            newBlog.save();
        }
    }
    catch (error) {
        console.log(error);
    }
});
const blogUpdateGet = (req, res, next) => {
    try {
        return res.json({});
    }
    catch (error) {
        console.log(error);
    }
};
const blogUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
    }
});
const blogDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogDataForUpdate = yield blogModel.findOne({ _id: req.body.blogID });
        if (blogDataForUpdate) {
            yield blogModel.findOneAndUpdate({ _id: req.body.blogID }, { status: !blogDataForUpdate.status });
        }
        else {
        }
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    blogList,
    blogAdd,
    blogAddGet
};
