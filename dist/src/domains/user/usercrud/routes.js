// const { getUserList, userUpdateGet, userUpdate, deleteUserGet, deleteUser, changeUserThemeGet, changeUserTheme, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost } = require('./controller');
import { getUserList, userUpdateGet, userUpdate, deleteUserGet, deleteUser, changeUserThemeGet, changeUserTheme, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost } from './controller.js';
import express from 'express';
const router = express.Router();
router.get('/list', getUserList);
/*why is here?
router.get('/logged-user-data', getUserData);*/
router.get('/update-user-profile', userUpdateGet).post('/update-user-profile', userUpdate);
router.get('/update-user-photos', updateUserPhotosGet).post('/update-user-photos', updateUserPhotosPost);
router.get('/delete', deleteUserGet).post('/delete', deleteUser);
//theme
router.get('/change-user-theme', changeUserThemeGet).post('/change-user-theme', changeUserTheme);
router.get('/get-user-theme', getUserThemeData);
export default router;
