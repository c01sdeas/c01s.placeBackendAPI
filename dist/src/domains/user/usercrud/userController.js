var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userPhotoSchemaExport } from './userModel.js';
import { userSchemaExport, userAuthLogSchemaExport } from '../authentication/authModel.js';
const user = userSchemaExport;
const login = userAuthLogSchemaExport;
const getUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await user.find();
        // if(users) return res.json(users);
        const response = yield getUsersList();
        if (response)
            return res.status(response.statusCode).json(response);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
    catch (error) {
        console.log(error);
    }
});
const userUpdateGet = (req, res, next) => {
    try {
        res.json(new user({
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userNickname: "",
        }));
    }
    catch (error) {
        console.log(error);
    }
};
// import { body, validationResult } from 'express-validator';
// // const validateUserUpdateData = _ => {return [
// //     body('userFirstName').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
// //     body('username').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
// //     body('userNickname').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
// // ];}
//check this func
const userUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {        
    //     if (req.body.password && req.body.password != "" && req.body.password.trim().length > 0) {
    //         await body('password').isLength({ min: 6 }).withMessage('Please enter a valid password.').run(req);
    //     }
    //     if (req.body.userFirstName && req.body.userFirstName != "" && req.body.userFirstName.trim().length > 0) {
    //         await body('userFirstName').isLength({ min: 3 }).withMessage('Please enter a valid first name.').run(req);
    //     }
    //     if (req.body.userLastName && req.body.userLastName != "" && req.body.userLastName.trim().length > 0) {
    //         await body('userLastName').isLength({ min: 3 }).withMessage('Please enter a valid last name.').run(req);
    //     }
    //     if (req.body.userNickname && req.body.userNickname != "" && req.body.userNickname.trim().length > 0) {
    //         await body('userNickname').isLength({ min: 3 }).withMessage('Please enter a valid nickname.').run(req);
    //     }
    //     if (req.body.userEmail && req.body.userEmail != "" && req.body.userEmail.trim().length > 0) {
    //         await body('userEmail').isLength({ min: 3 }).isEmail().withMessage('Please enter a valid e-mail.').run(req);
    //     }
    //     const validationErrors = validationResult(req);
    //     let validationErrorsResult = validationErrors.array().map(error => error.msg);
    //     //here
    //     const controlForUser = await user.findOne({ username: req.session.username });
    //     if(!controlForUser) validationErrorsResult.push('User not found.');
    //     if (validationErrorsResult.length > 0) return res.status(400).json({ error: validationErrorsResult });
    //     if (controlForUser.username === req.session.username) {
    //         if (req.body.password && req.body.password != "" && req.body.password.trim().length > 0){
    //             controlForUser.password = await bcrypt.hash(req.body.password, 10);
    //         }
    //         controlForUser.userFirstName = req.body.userFirstName,
    //         controlForUser.userLastName = req.body.userLastName,
    //         controlForUser.userEmail = req.body.userEmail,
    //         controlForUser.userNickname = req.body.userNickname
    //         await controlForUser.save();                
    //         return res.json({message: 'Success!'});
    //     } else return res.json({error: 'Authorization failed!'});
    // } catch (error) {
    //     console.log(error);
    // }
});
const userPhoto = userPhotoSchemaExport;
const updateUserPhotosGet = (req, res, next) => {
    try {
        res.json(new userPhoto({ userAvatar: "", userBackground: "" }));
    }
    catch (error) {
        console.log(error);
    }
};
import { changeUserDateOfBirthDataService, changeUserEmailDataService, changeUserFirstNameDataService, changeUserLastNameDataService, changeUserNicknameDataService, changeUserThemesData, getUsersList, getUserThemesData } from './userService.js';
const updateUserPhotosPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPhotoData = yield userPhoto.findOne({ username: req.session.username });
        const newUserPhotoData = new userPhoto(req.body);
        if (req.session.username)
            newUserPhotoData.username = req.session.username;
        if (userPhotoData) {
            if (newUserPhotoData.userAvatar && newUserPhotoData.userAvatar.length > 0)
                userPhotoData.userAvatar = newUserPhotoData.userAvatar;
            if (newUserPhotoData.userBackground && newUserPhotoData.userBackground.length > 0)
                userPhotoData.userBackground = newUserPhotoData.userBackground;
            yield userPhotoData.save();
        }
        else {
            if ((newUserPhotoData.userAvatar && newUserPhotoData.userAvatar.length > 0) || (newUserPhotoData.userBackground && newUserPhotoData.userBackground.length > 0))
                yield newUserPhotoData.save();
        }
        return res.status(400).json({ message: "Success!" });
    }
    catch (error) {
        console.log(error);
    }
});
const userRoleUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
    }
});
const deleteUserGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ username: "" });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const userDataForDeleteUser = await user.findOne({username:req.session.username});
    //     if (userDataForDeleteUser.username === req.session.username) {
    //         if (userDataForDeleteUser) {
    //             userDataForDeleteUser.status = userDataForDeleteUser.status;
    //             userDataForDeleteUser.save();
    //         }
    //         else return res.status(400).json({error: 'User not found.'});
    //     } else return res.json({error: 'Authorization failed!'});
    //     return res.json({message:'Success!'});
    // } catch (error) {
    //     console.log(error);
    // }
});
//user-theme
const changeUserThemeDataGet = (req, res, next) => {
    try {
        return res.json({ username: "" });
    }
    catch (error) {
        console.log(error);
    }
};
const getUserThemeData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getUserThemesData(req.body.username);
        if (response.data == null || response.data == undefined)
            return res.status(response.statusCode).send(false);
        return res.status(response.statusCode).send(response.data.lights);
    }
    catch (error) {
        console.log(error);
    }
});
//edit-user-profile-data
//theme
const changeUserThemeDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserThemesData(req.body.username);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//nickname
// const changeUserNicknameDataGet = async (req: Request, res:Response, next:NextFunction): Promise<any> => {
//     try {
//         console.log('sasasasasasa');
//         const response : ResponseWithMessage<boolean> = await changeUserNicknameDataService(req.body.username, req.body.newUserNickname);
//         console.log('----------------------------');
//         console.log(response);
//         console.log('----------------------------');
//         return res.status(response.statusCode).json(response);
//     } catch (error) {
//         console.log(error);
//         return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
//     }
// }
const changeUserNicknameDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserNicknameDataService(req.body.username, req.body.newUserNickname);
        console.log('----------------------------');
        console.log(response);
        console.log('----------------------------');
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//firstname
const changeUserFirstNameDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserFirstNameDataService(req.body.username, req.body.newUserFirstName);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//lastname
const changeUserLastNameDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserLastNameDataService(req.body.username, req.body.newUserLastName);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//email
const changeUserEmailDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserEmailDataService(req.body.username, req.body.newUserEmail);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//dateOfBirth
const changeUserDateOfBirthDataPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserDateOfBirthDataService(req.body.username, req.body.newUserDateOfBirth);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { getUserList, userUpdateGet, userUpdate, deleteUser, deleteUserGet, changeUserThemeDataPost, changeUserThemeDataGet, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost, changeUserNicknameDataPost, changeUserFirstNameDataPost, changeUserLastNameDataPost, changeUserEmailDataPost, changeUserDateOfBirthDataPost };
