import express from "express";
const app = express();
import fileUpload from 'express-fileupload';
// import expressLayouts from 'express-ejs-layouts';
// import path from 'path';
import logMiddleware from './src/middlewares/logger/logMiddleware.js';
// const productRoutes = require ('./src/domains/product/todoApp/index');
import productRoutes from './src/domains/product/todoApp/index.js';
import authRoutes from './src/domains/user/authentication/authIndex.js';
// const userCrudRoutes = require('./src/domains/user/usercrud/index.js');
import userCrudRoutes from './src/domains/user/usercrud/userIndex.js';
import adminCrudRoutes from './src/domains/user/admin/adminIndex.js';
import bodyParser from "body-parser";
import session from 'express-session';
import crypto from 'crypto';
const sessionSecretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));
// import './src/types/express-session'
import flash from 'connect-flash';
import db from './src/config/db.js';
db();
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true // Credentials gönderimine izin ver
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);
import authCrudMiddleware from "./src/middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "./src/middlewares/crudMiddlewares/userCrudMiddleware.js";
import adminCrudMiddleware from "./src/middlewares/crudMiddlewares/adminCrudMiddleware.js";
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());
app.use(fileUpload());
app.use(express.static('public'));
// app.use((req,res,next)=>{
//     res.locals.commentControl = req.flash('commentControl');
//     next();
// });
// app.use(express.static("frontend"));
app.use('/t-app/auth', authCrudMiddleware(['visitor']), authRoutes);
app.use('/t-app/user', [authCrudMiddleware([]), userCrudMiddleware(['user'])], userCrudRoutes);
app.use('/t-app/admin', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], adminCrudRoutes);
app.use('/t-app/app', [authCrudMiddleware(['visitor'])], productRoutes);
export default app;
