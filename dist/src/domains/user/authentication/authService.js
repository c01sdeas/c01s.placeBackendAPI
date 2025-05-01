var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userAuthDataSchemaExport, userRecoveryKeySchemaExport, userSchemaExport, userAuthLogSchemaExport } from './authModel.js';
const user = userSchemaExport;
const userAuthData = userAuthDataSchemaExport;
// const getUserData = getUserSchemaExport;
const userRecoveryKeySchema = userRecoveryKeySchemaExport;
const userAuthLog = userAuthLogSchemaExport;
const getEmptyUser = () => {
    try {
        return new user({
            username: "",
            password: "",
            userFirstName: "",
            userLastName: "",
            userEmail: "",
            userNickname: ""
        });
    }
    catch (error) {
        return error;
    }
};
import bcrypt from 'bcrypt';
const usernameAvailableControl = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || username.length <= 2) {
            return { data: username, success: false, message: 'Username must be longer than 2 characters.', statusCode: 400 };
        }
        const existingUser = yield user.findOne({ username: username });
        if (existingUser)
            return { data: username, success: false, message: 'Username is already taken.', statusCode: 400 };
        return { data: username, success: true, message: 'Username is available.', statusCode: 200 };
    }
    catch (error) {
        console.log(error);
        return { data: username, success: false, error: error, message: 'An error occurred while checking username availability.', statusCode: 500 };
    }
});
import crypto from 'crypto';
const userSignUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user(userData);
        const newUserAuthData = new userAuthData(userData);
        if (newUserAuthData.password && (newUserAuthData.password.length > 6)) {
            newUserAuthData.password = yield bcrypt.hash(newUserAuthData.password, 10);
            yield new userRolesSchemaExport({ username: userData.username, roles: ['user'] }).save();
            yield newUser.save();
            yield newUserAuthData.save();
        }
        //recoveryKey
        const userRecoveryKeyControl = yield userRecoveryKeySchema.findOne({ username: newUser.username });
        if (!userRecoveryKeyControl) {
            const userRecoveryKeyData = yield new userRecoveryKeySchema({ username: newUser.username, key: crypto.randomBytes(8).toString('hex') }).save();
            if (userRecoveryKeyData) {
                const afterSignupSuccessResponse = yield user.findOne({ username: userData.username });
                if (afterSignupSuccessResponse)
                    return { success: true, message: userRecoveryKeyData.key, statusCode: 201 };
            }
        }
        return { success: false, message: 'Internal Server Error.', statusCode: 500 };
    }
    catch (error) {
        console.log(error);
        const err = error;
        if (err instanceof Error) {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map(key => ({
                    // field: key,
                    success: false,
                    message: err.errors[key].message
                }));
                // return res.status(400).json({ errors });
                return { success: false, error: errors, message: 'Validation Error', statusCode: 400 };
            }
            if (err.name === 'MongoServerError' && err.code === 11000 && Object.keys(err.keyValue)[0] == 'username') {
                return { success: false, message: 'Username is already taken.', statusCode: 400 };
            }
            return { success: false, message: err.message || 'Internal Server Error', statusCode: 500 };
        }
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
});
//write-this
const tokenSecretKey = crypto.randomBytes(32).toString('hex');
import jwt from 'jsonwebtoken';
import { getUserBaseData } from '../usercrud/userService.js';
import { userRolesSchemaExport } from '../usercrud/userModel.js';
const userSignIn = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthDataControl = yield userAuthData.findOne({ username: userData.username });
        if (userAuthDataControl != null && userAuthDataControl.status === false) {
            return { statusCode: 403, success: false, message: 'You are banned.' };
        }
        if (userAuthDataControl != null && userAuthDataControl != undefined) {
            const passwordSameControl = yield bcrypt.compare(userData.password, userAuthDataControl.password);
            if (passwordSameControl === false)
                return { statusCode: 401, success: false, message: 'Authentication failed.' };
            else {
                const userAuthLogControl = yield userAuthLog.findOne({ username: userData.username });
                if (userAuthLogControl != null && userAuthLogControl != undefined) {
                    userAuthLogControl.token = jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' });
                    yield userAuthLogControl.save();
                }
                else
                    yield new userAuthLog({ token: jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' }), username: userData.username }).save();
                //data: userAuthLogControl
                if (userAuthLogControl)
                    return { statusCode: 200, success: true, data: { username: userAuthLogControl.username, token: userAuthLogControl.token }, message: 'Authentication success!' };
            }
        }
        return { statusCode: 401, success: false, message: 'Authentication failed.' };
    }
    catch (error) {
        const err = error;
        if (err instanceof Error) {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map(key => ({
                    // field: key,
                    success: false,
                    message: err.errors[key].message
                }));
                // return res.status(400).json({ errors });
                return { success: false, error: errors, message: 'Validation Error', statusCode: 400 };
            }
            return { success: false, message: err.message || 'Internal Server Error', statusCode: 500 };
        }
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
});
// //write-this
const getSessionUserDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sessionUserBaseData = yield getUserBaseData(username);
        if ((_a = sessionUserBaseData.data) === null || _a === void 0 ? void 0 : _a.status)
            return { statusCode: 200, success: true, data: sessionUserBaseData.data };
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
});
//edit-auth-data
//change-password
const changeUserPasswordDataService = (username, oldUserPassword, newUserPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthData = yield userAuthDataSchemaExport.findOne({ username });
        if (userAuthData && userAuthData.status && (yield bcrypt.compare(oldUserPassword, userAuthData.password))) {
            userAuthData.password = yield bcrypt.hash(newUserPassword, 10);
            userAuthData.save();
            return { statusCode: 200, success: true, message: 'Password Updated.' };
        }
        else
            return { statusCode: 400, success: false, message: 'Something went wrong!' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//password-recovery
const userPasswordRecoveryService = (username, userRecoveryKey, userNewPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecoveryKeyData = yield userRecoveryKeySchemaExport.findOne({ username: username });
        const userAuthData = yield userAuthDataSchemaExport.findOne({ username });
        if (userAuthData && userAuthData.username && userAuthData.status && userRecoveryKeyData && userRecoveryKeyData.key === userRecoveryKey) {
            userAuthData.password = yield bcrypt.hash(userNewPassword, 10);
            userAuthData.save();
            let recoveryKey = yield userRecoveryKeySchema.findOne({ username });
            if (recoveryKey)
                recoveryKey.key = crypto.randomBytes(8).toString('hex');
            else
                recoveryKey = new userRecoveryKeySchema({ username, key: crypto.randomBytes(8).toString('hex') });
            recoveryKey.save();
            return { statusCode: 200, success: true, data: recoveryKey.key };
        }
        else {
            return { statusCode: 400, success: false, message: 'Something went wrong!' };
        }
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const usernameAvailableControlForUserPasswordRecoveryService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield userAuthDataSchemaExport.findOne({ username });
        if (existingUser && existingUser.status)
            return { data: username, success: true, message: 'Account found.', statusCode: 200 };
        return { data: username, success: false, message: 'No account found with this username.', statusCode: 400 };
    }
    catch (error) {
        console.log(error);
        return { data: username, success: false, error: error, message: 'An error occurred while checking username availability.', statusCode: 500 };
    }
});
const checkUserRecoveryKeyDataForUserPasswordRecoveryService = (username, key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield userAuthDataSchemaExport.findOne({ username });
        const userRecoveryKeyData = yield userRecoveryKeySchema.findOne({ username });
        if (existingUser && existingUser.status)
            if (userRecoveryKeyData && userRecoveryKeyData.key === key)
                return { statusCode: 200, success: true };
            else
                return { statusCode: 400, success: false, message: 'OOPS! The key is incorrect!' };
        else
            return { statusCode: 400, success: false, message: 'Account not found.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getNewUserRecoveryKeyForForgettenKeyService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthData = yield userAuthDataSchemaExport.findOne({ username });
        if (userAuthData && userAuthData.username && userAuthData.status) {
            let recoveryKey = yield userRecoveryKeySchema.findOne({ username });
            if (recoveryKey)
                recoveryKey.key = crypto.randomBytes(8).toString('hex');
            else
                recoveryKey = new userRecoveryKeySchema({ username, key: crypto.randomBytes(8).toString('hex') });
            recoveryKey.save();
            return { statusCode: 200, success: true, data: recoveryKey.key };
        }
        else
            return { statusCode: 400, success: false, message: 'Account not found.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { getEmptyUser, usernameAvailableControl, userSignUp, userSignIn, getSessionUserDataService, tokenSecretKey, changeUserPasswordDataService, userPasswordRecoveryService, usernameAvailableControlForUserPasswordRecoveryService, checkUserRecoveryKeyDataForUserPasswordRecoveryService, getNewUserRecoveryKeyForForgettenKeyService };
