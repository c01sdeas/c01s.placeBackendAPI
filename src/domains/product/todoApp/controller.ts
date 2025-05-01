import {Request, Response, NextFunction} from 'express';
import { todoSchemaExport, todoMatchUserSchemaExport } from './model.js';
const todo = todoSchemaExport;


const home = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const todos = await todo.find();
        res.json(todos);
    } catch (e) {
        console.log(e);
    }
}

// const loginForPannel = async (req,res,next)=>{
//     try {
//         res.render('product/login', {title: 'Panele Giriş - c01sdeas', layout: 'layouts/indexLayout'});
//     } catch (e) {
//         console.log(e);
//     }
// }   

// const loginForPannelPost = async (req,res,next)=>{
//     try {
//         if (req.body.username=='c01sdeant' && req.body.password=='c01sdeant') {
//             req.flash('forPannellSecurity',1);
//             const auth={user:{username: 'c01sdeant', userName:'Irfan', userEmail:'gxirfan@gmail.com', userBirthday:'02/09/2001', userPassword:'xxxx'}, message:'Giriş başarılı!'}
//             res.json(auth);
//             res.redirect('/addminnpannelllll1');
//         } else {
//             console.log('hata');
//             res.json({message: 'Kullanıcı adı veya şifre yanlış!'});
//             res.redirect('/adminl0gin');
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// const adminPannel = async (req,res,next)=>{
//     try {

//         if (req.flash('forPannellSecurity')==1) {
//             const blogs = await blog.find();
//             res.render('product/pannel', {title: 'Admin Pannel - c01sdeas', layout: 'layouts/indexLayout', blogs});
//         } else {
//             res.redirect('/adminl0gin');
//         }
        
//     } catch (e) {
//         console.log(e);
//     }
// }

// const adminPannelPost = async (req,res,next)=>{
//     try {
//         const date = new Date();
//         const day = date.getDate().toString();
//         const month = (date.getMonth()+1).toString();
//         const year = date.getFullYear().toString();
//         const time = date.getHours().toString()+'.'+date.getMinutes().toString();
//         const dayDate = day+'/'+month+'/'+year;
//         console.log(time);

       

//         const blogInfo = new blog({
//             blogTitle: req.body.blogTitle,
//             blogSummary: req.body.blogSummary,
//             blogContent: req.body.blogContent,
//             blogDate: dayDate+' - '+time
//         });


//         console.log(req.files);
//         console.log(blogInfo);
//         if (await blogInfo.save()) {
//             res.json(blogInfo);
//         }

//         res.redirect('/');
//     } catch (e) {
//         console.log(e);
//     }
// }

// const uploadImage = async (req,res,next)=>{
//     try {
//         console.log("************"+ req.body.whichBlog  +"**********");

//         if (req.body.whichBlog!=undefined) {
//              // Get the file that was set to our field named "image"
//             const image = req.files.image;

//             // Move the uploaded image to our upload folder
//             image.mv(path.join(__dirname, '../../../public/upload/') + image.name);

//             await blog.updateOne({_id:req.body.whichBlog}, {blogImage: req.files.image.name});
//             res.redirect('/');
//         } else {
//             res.redirect('back');
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// const blogContentPage = async (req,res,next)=>{
//     try {
//         const blogContent = await blog.findOne({_id: req.params.blogId});
//         res.json(blogContent);
//     } catch (e) {
//         console.log(e);
//     }
// }

// const blogContentPagePost = async (req,res,next)=>{
//     try {
        
//             const commentInfo = new comment({
//                 blogId: req.params.blogId,
//                 commentEmail: req.body.commentEmail,
//                 commentName: req.body.commentName,
//                 commentContent: req.body.commentContent
//             });

//             if (req.body.commentName.trim() !== '') {
//                 await commentInfo.save();
//                 res.json({commentInfo, message:'Yorumunuz başarıyla eklendi.'});
//             } else {
//                 res.json({commentInfo, message:'Yorumunuz eklenemedi.'});
//             }
//             req.flash('commentControl', 'Yorum başarıyla eklendi.');
//             res.redirect('back');
        
//     } catch (e) {
//         console.log(e);
//     }
// }

// const comments = async (req,res,next)=>{
//     try {
//         let comments = await comment.find({blogId:req.params.blogId});
//         res.json(comments);
//     } catch (e) {
//         console.log(e);
//     }
// }

// const allComments = async (req,res,next)=>{
//     try {
//         let comments = await comment.find();
//         res.json(comments);
//     } catch (e) {
//         console.log(e);
//     }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getAllTodos = async (req,res,next) => {
//     try {
//         const todos = await todo.find();
//         res.json(todos);
//     } catch (error) {
//         console.log(error);
//     }
// }

const getAllTodos = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let todos = await todo.find();

        if(todos) res.json(todos);

    } catch (error) {
        console.log(error);
    }
}


const todoMatchUser = todoMatchUserSchemaExport;

// const addTodo = async (req:Request,res:Response,next:NextFunction) => {
//     try {


//         const newTodo = new todo({
//             todoTitle: req.body.todoTitle,
//             todoSummary: req.body.todoSummary,
//             todoContent: req.body.todoContent,
//             todoList: req.body.todoList
//         });



//         await newTodo.save().then(res.json( newTodo ));

//         const newTodoMatchUser = new todoMatchUser({
//             todoID: newTodo._id,
//             userID: "test"
//         });

//         await newTodoMatchUser.save().then(res.json(newTodoMatchUser));



//     } catch (error) {
//         console.log(error);
        
//     }
// }

const addTodoUI = (req:Request, res:Response, next:NextFunction) => {
    try {

        res.json(new todo({
            todoTitle: "",
            todoSummary: "",
            todoContent: "",
            todoList: []
        }));

    } catch (error) {
        console.log(error);
        
    }
}

export {
    home,
    // adminPannel,
    // loginForPannel,
    // loginForPannelPost,
    // adminPannelPost,
    // uploadImage,
    // blogContentPage,
    // blogContentPagePost,
    // comments,
    // allComments,
    getAllTodos,
    // addTodo,
    addTodoUI
}