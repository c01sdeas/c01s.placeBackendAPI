// const { getUserList, userUpdateGet, userUpdate, deleteUserGet, deleteUser, changeUserThemeGet, changeUserTheme, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost } = require('./controller');
import { getUserList, userUpdateGet, userUpdate, deleteUserGet, deleteUser, changeUserThemeDataGet, changeUserThemeDataPost, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost, changeUserNicknameDataPost, changeUserFirstNameDataPost, changeUserLastNameDataPost, changeUserEmailDataPost, changeUserDateOfBirthDataPost } from './userController.js';
import express from 'express';
const router = express.Router();
router.get('/list', getUserList);
/*why is here?
router.get('/logged-user-data', getUserData);*/
router.get('/update-user-profile-data', userUpdateGet).post('/update-user-profile-data', userUpdate);
router.get('/update-user-photos-data', updateUserPhotosGet).post('/update-user-photos-data', updateUserPhotosPost);
router.get('/delete-user-data', deleteUserGet).post('/delete-user-data', deleteUser);
//theme
router.get('/change-theme-data', changeUserThemeDataGet).post('/change-theme-data', changeUserThemeDataPost);
router.get('/get-theme-data').post('/get-theme-data', getUserThemeData);
//edit-user-profile-data
router.post('/change-user-nickname-data', changeUserNicknameDataPost);
router.post('/change-user-firstname-data', changeUserFirstNameDataPost);
router.post('/change-user-lastname-data', changeUserLastNameDataPost);
router.post('/change-user-email-data', changeUserEmailDataPost);
router.post('/change-user-date-of-birth-data', changeUserDateOfBirthDataPost);
export default router;
