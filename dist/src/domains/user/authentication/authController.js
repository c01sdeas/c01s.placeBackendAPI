var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { changeUserPasswordDataService, checkUserRecoveryKeyDataForUserPasswordRecoveryService, getNewUserRecoveryKeyForForgettenKeyService, getSessionUserDataService, usernameAvailableControlService, usernameAvailableControlForUserPasswordRecoveryService, userPasswordRecoveryService, userSignInService, userSignUpService } from './authService.js';
const usernameControlForUserSignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usernameAvailableControlService(req.body.username);
        if (response)
            return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
    catch (err) {
        console.log(err);
    }
});
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userSignUpService(req.body);
        if (response)
            return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
    catch (error) {
        console.log(error);
    }
});
//auth
//write_service
// const tokenSecretKey = crypto.randomBytes(32).toString('hex');
const signInController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthLogData = yield userSignInService(req.body);
        if (userAuthLogData.success == true && userAuthLogData.data) {
            if (userAuthLogData.data.username) {
                req.session.username = userAuthLogData.data.username;
            }
            return res.status(userAuthLogData.statusCode).json(userAuthLogData);
        }
        else
            (userAuthLogData.success == false);
        return res.status(userAuthLogData.statusCode).json(userAuthLogData);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const signOutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return res.status(500).send({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            return res.status(200).send({ message: 'Logged out' });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getSessionUserDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield getSessionUserDataService(req.body.username);
        return res.status(serviceResponse.statusCode).json(serviceResponse);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//edit-profile-data
//change-password
const changeUserPasswordDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserPasswordDataService(req.body.username, req.body.oldUserPassword, req.body.newUserPassword);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//password-recovery
const userPasswordRecoveryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userPasswordRecoveryService(req.body.username, req.body.key, req.body.userNewPassword);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const usernameAvailableControlForUserPasswordRecoveryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usernameAvailableControlForUserPasswordRecoveryService(req.body.username);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const checkUserRecoveryKeyDataForUserPasswordRecoveryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield checkUserRecoveryKeyDataForUserPasswordRecoveryService(req.body.username, req.body.key);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const getNewUserRecoveryKeyForForgettenKeyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getNewUserRecoveryKeyForForgettenKeyService(req.body.username);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { signUpController, signInController, signOutController, 
// getUserData,
// tokenSecretKey,
// getLoginData,
// loggedUserLoginData,
usernameControlForUserSignUpController, getSessionUserDataController, changeUserPasswordDataController, userPasswordRecoveryController, usernameAvailableControlForUserPasswordRecoveryController, checkUserRecoveryKeyDataForUserPasswordRecoveryController, getNewUserRecoveryKeyForForgettenKeyController };
