var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userPhotoSchemaExport, userThemeSchemaExport } from './userModel.js';
import { userSchemaExport, userAuthLogSchemaExport } from '../authentication/authModel.js';
const user = userSchemaExport;
const login = userAuthLogSchemaExport;
const getUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.find();
        if (users)
            return res.json(users);
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
// const validateUserUpdateData = _ => {return [
//     body('userFirstName').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
//     body('username').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
//     body('userNickname').notEmpty().isLength({ min: 3 }).withMessage('Please enter all info.'),
// ];}
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
//theme
const userTheme = userThemeSchemaExport;
const changeUserThemeGet = (req, res, next) => {
    try {
        res.json(new userTheme({
            lights: true
        }));
    }
    catch (error) {
        console.log(error);
    }
};
const changeUserTheme = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userThemeData = yield userTheme.findOne({ username: req.session.username });
        if (userThemeData) {
            yield userTheme.findOneAndUpdate({ username: req.session.username }, { lights: !userThemeData.lights });
            return res.json({ message: 'Success!' });
        }
        else {
            const newUserThemeData = new userTheme({ username: req.session.username, lights: req.body.lights });
            const userData = yield login.findOne({ username: newUserThemeData.username });
            if (userData && userData.username === req.session.username) {
                yield newUserThemeData.save();
                return res.json({ message: 'Success!' });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getUserThemeData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userThemeData = yield userTheme.findOne({ username: req.session.username });
        if (userThemeData)
            return res.json(new userTheme({ lights: userThemeData.lights }));
    }
    catch (error) {
        console.log(error);
    }
});
export { getUserList, userUpdateGet, userUpdate, deleteUser, deleteUserGet, changeUserTheme, changeUserThemeGet, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost };
