import { userSchemaExport, userRecoveryKeySchemaExport, userAuthLogSchemaExport } from './authModel.js';
// const bcrypt = require('bcrypt');

import bcrypt from 'bcrypt';

import {Request, Response, NextFunction} from 'express';
import { ValidationError } from '../../../types/errors.js';
import { changeUserPasswordDataService, checkUserRecoveryKeyDataForUserPasswordRecoveryService, getEmptyUser, getNewUserRecoveryKeyForForgettenKeyService, getSessionUserDataService, usernameAvailableControl, usernameAvailableControlForUserPasswordRecoveryService, userPasswordRecoveryService, userSignIn, userSignUp } from './authService.js';
const user = userSchemaExport;



const signUpGet = (req:Request,res:Response) : any => {
    try {
        return res.status(200).json(getEmptyUser());
    } catch (error) {
        console.log(error);
    }
}

const usernameControlForUserSignUpGet = (req:Request,res:Response) : any => {
    try {
        return res.status(200).json({username: ''});
    } catch (err) {
        console.log(err);
    }
}

const usernameControlForUserSignUpPost = async (req:Request,res:Response) : Promise<any> => {
    try {
        const response : ResponseWithMessage<string> = await usernameAvailableControl(req.body.username); 
        if (response) return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (err) {
        console.log(err);
    }
}

const signUpPost = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {
    try {
        const response : ResponseWithMessage<IUser> = await userSignUp(req.body);
        if(response) return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (error) {
        console.log(error);
    }
}

//auth
const login = userAuthLogSchemaExport;

const signInGet = (req:Request, res:Response, next:NextFunction) : any => {
    try {
        return res.json(new login({ username: "", password: "" }));
    } catch (error) {
        console.log(error);
    }
}

//write_service
// const tokenSecretKey = crypto.randomBytes(32).toString('hex');
const signInPost = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {  
    try {
        // const requestUserLoginData = new login(req.body);

        // const userData = await user.findOne({username: req.body.username});
    
        // if (!userData) return res.status(401).json({ error: 'Authentication failed.' });

        // if (!userData.status) return res.status(401).json({ error: 'Authentication failed.' });

        // const passwordMatch = await bcrypt.compare(requestUserLoginData.password, userData.password);
        
        // if (!passwordMatch) return res.status(401).json({ error: 'Authentication failed.' });

        // const userLoginData = await login.findOne({username: requestUserLoginData.username});
        
        

        // req.session.username = req.body.username;

        // const userRoleData = await require('../usercrud/model').userRolesSchemaExport.findOne({username: req.session.username});
        // if (userRoleData) {
        //     req.session.userRoles = userRoleData.roles;
        //     console.log(req.session.userRoles);
        // }

        // if(userLoginData){
        //     userLoginData.token = jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' });
        //     userLoginData.save(); return res.json(userLoginData);

        // } else {
        //     const newLogin = new login({username: requestUserLoginData.username, token: jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' })});
        //     await newLogin.save();
        //     return res.json(await login.findOne({username: newLogin.username}));
        // }
        
        const userAuthLogData = await userSignIn(req.body);
        if (userAuthLogData.success==true && userAuthLogData.data) {
            req.session.username = userAuthLogData.data.username;
            return res.status(userAuthLogData.statusCode).json(userAuthLogData);
        } else(userAuthLogData.success==false)
            return res.status(userAuthLogData.statusCode).json(userAuthLogData);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const signOutPost = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return res.status(500).send({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            return res.status(200).send({ message: 'Logged out' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

// const getUser = getUserSchemaExport;
// const getUserData = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {
//     try {
//         const getLoggedUserData = await getUser.findOne({ username: req.session.username });
        
//         if (getLoggedUserData) {
//             return res.json(new getUser({ username: getLoggedUserData.username, userFirstName: getLoggedUserData.userFirstName, userLastName: getLoggedUserData.userLastName, userEmail: getLoggedUserData.userEmail, userNickname: getLoggedUserData.userNickname, status: getLoggedUserData.status }));
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }


// let loggedUserLoginData : any;
// const getLoginData = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {
//     try {        
//         const getLoggedUserData = await login.findOne({ username: req.session.username });
//         loggedUserLoginData = getLoggedUserData;
//         return res.json(getLoggedUserData);
//     } catch (error) {
//         console.log(error);
//     }
// };

const getSessionUserData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const serviceResponse = await getSessionUserDataService(req.body.username);
        return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//edit-profile-data
//change-password
const changeUserPasswordDataPost = async (req:Request, res:Response): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserPasswordDataService(req.body.username, req.body.oldUserPassword, req.body.newUserPassword);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//password-recovery
const userPasswordRecoveryPost = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<string> = await userPasswordRecoveryService(req.body.username, req.body.key, req.body.userNewPassword);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const usernameAvailableControlForUserPasswordRecoveryPost = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await usernameAvailableControlForUserPasswordRecoveryService(req.body.username);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const checkUserRecoveryKeyDataForUserPasswordRecoveryPost = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await checkUserRecoveryKeyDataForUserPasswordRecoveryService(req.body.username, req.body.key);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getNewUserRecoveryKeyForForgettenKeyPost = async (req:Request, res:Response):Promise<any> => {
    try {
        const response = await getNewUserRecoveryKeyForForgettenKeyService(req.body.username);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}



export {
    signUpGet,
    signUpPost,
    signInGet,
    signInPost,
    signOutPost,
    // getUserData,
    // tokenSecretKey,
    // getLoginData,
    // loggedUserLoginData,
    usernameControlForUserSignUpGet,
    usernameControlForUserSignUpPost,
    getSessionUserData,
    changeUserPasswordDataPost,
    userPasswordRecoveryPost,
    usernameAvailableControlForUserPasswordRecoveryPost,
    checkUserRecoveryKeyDataForUserPasswordRecoveryPost,
    getNewUserRecoveryKeyForForgettenKeyPost
}