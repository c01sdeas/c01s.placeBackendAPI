var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userSchemaExport, userAuthLogSchemaExport } from '../authentication/authModel.js';
import { getUsersListService, getUserThemesDataService, changeUserThemesDataService, changeUserNicknameDataService, changeUserFirstNameDataService, changeUserLastNameDataService, changeUserEmailDataService, changeUserDateOfBirthDataService, getUserRolesDataService } from './userService.js';
const user = userSchemaExport;
const login = userAuthLogSchemaExport;
const getUserListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await user.find();
        // if(users) return res.json(users);
        const response = yield getUsersListService();
        if (response)
            return res.status(response.statusCode).json(response);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
    catch (error) {
        console.log(error);
    }
});
//userRoles
const getUserRolesDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getUserRolesDataService(req.body.username);
        if (response)
            return res.status(response.statusCode).json(response);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
    catch (error) {
        console.log(error);
    }
});
const getUserThemeDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getUserThemesDataService(req.body.username);
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
const changeUserThemeDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserThemesDataService(req.body.username);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//nickname
const changeUserNicknameDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserNicknameDataService(req.body.username, req.body.newUserNickname);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
//firstname
const changeUserFirstNameDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const changeUserLastNameDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const changeUserEmailDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const changeUserDateOfBirthDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserDateOfBirthDataService(req.body.username, req.body.newUserDateOfBirth);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { getUserListController, getUserRolesDataController, changeUserThemeDataController, getUserThemeDataController, changeUserNicknameDataController, changeUserFirstNameDataController, changeUserLastNameDataController, changeUserEmailDataController, changeUserDateOfBirthDataController };
