import authCrudMiddleware from '../../../middlewares/crudMiddlewares/authCrudMiddleware.js';
import userCrudMiddleware from '../../../middlewares/crudMiddlewares/userCrudMiddleware.js';
import { signUpPost, signUpGet, signInGet, signInPost, usernameControlForUserSignUpGet, usernameControlForUserSignUpPost, getSessionUserData, changeUserPasswordDataPost, userPasswordRecoveryPost, usernameAvailableControlForUserPasswordRecoveryPost, checkUserRecoveryKeyDataForUserPasswordRecoveryPost, getNewUserRecoveryKeyForForgettenKeyPost, signOutPost } from './authController.js';
import express from 'express';
const router = express.Router();
router.get('/username-control-for-signup', usernameControlForUserSignUpGet).post('/username-control-for-signup', usernameControlForUserSignUpPost);
router.get('/signup', signUpGet).post('/signup', signUpPost);
router.get('/signin', signInGet).post('/signin', signInPost);
router.post('/signout', signOutPost);
//user-app
// router.get('/logged-user-data', verifyToken, getUserData);
router.post('/get-session-user-data', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getSessionUserData);
//edit-auth-data
router.post('/change-user-password-data', changeUserPasswordDataPost);
router.post('/check-username-for-recovery', usernameAvailableControlForUserPasswordRecoveryPost);
router.post('/check-user-recovery-key-data', checkUserRecoveryKeyDataForUserPasswordRecoveryPost);
router.post('/user-password-recovery', userPasswordRecoveryPost);
router.post('/get-new-user-recovery-key', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getNewUserRecoveryKeyForForgettenKeyPost);
// router.get('/login-data', verifyToken, getLoginData);
export default router;
