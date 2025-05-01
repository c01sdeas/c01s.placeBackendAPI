"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../../../middlewares/authMiddleware"));
const { getUsers, getUserData, userUpdateGet, userUpdate, getLoginData, signUpPost, signUpGet, signInGet, signInPost, usernameControlForUserSignUpGet, usernameControlForUserSignUpPost } = require('./controller');
// const router = require('express').Router();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/signin', signInGet).post('/signin', signInPost);
router.get('/username-control-for-signup', usernameControlForUserSignUpGet).post('/username-control-for-signup', usernameControlForUserSignUpPost);
router.get('/signup', signUpGet).post('/signup', signUpPost);
//user-app
router.get('/logged-user-data', authMiddleware_1.default, getUserData);
router.get('/login-data', authMiddleware_1.default, getLoginData);
exports.default = router;
