var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userSchemaExport } from "../authentication/authModel.js";
import { userPhotoSchemaExport, userRolesSchemaExport, userThemeSchemaExport } from "./userModel.js";
const user = userSchemaExport;
const getUsersListService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return { statusCode: 200, success: true, data: yield user.find() };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//roles
const getUserRolesDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRoles = yield userRolesSchemaExport.findOne({ username });
        if (userRoles)
            return { statusCode: 200, success: true, data: userRoles.roles };
        return { statusCode: 400, success: false, message: 'No roles found for this user.', data: [] };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//session-data      
const getUserBaseDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBaseData = yield user.findOne({ username });
        if (userBaseData)
            return { statusCode: 200, success: true, data: userBaseData };
        return { statusCode: 400, success: false, message: 'No user found with this username.', data: null };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const userPhotos = userPhotoSchemaExport;
const getUserPhotosDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPhotosData = yield userPhotos.findOne({ username });
        if (userPhotosData)
            return { statusCode: 200, success: true, data: userPhotosData };
        return { statusCode: 400, success: false, message: 'No photos found for this user.', data: null };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//user-theme
const userThemes = userThemeSchemaExport;
const getUserThemesDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userThemesData = yield userThemes.findOne({ username });
        if (userThemesData)
            return { statusCode: 200, success: true, data: userThemesData };
        else {
            yield new userThemes({ username, lights: false }).save();
            return { statusCode: 200, success: true, data: { username, lights: false } };
        }
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//edit-user-profile-data
//theme
const changeUserThemesDataService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield userThemes.findOne({ username });
        if (data)
            data.lights = !data.lights;
        else
            data = new userThemes({ username, lights: false });
        yield data.save();
        return { statusCode: 200, success: true, message: 'Success.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//nickname
const changeUserNicknameDataService = (username, newUserNickname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (newUserNickname.length <= 30) {
            yield user.findOneAndUpdate({ username }, { userNickname: newUserNickname });
            return { statusCode: 200, success: true, message: 'Nickname updated.' };
        }
        else
            return { statusCode: 400, success: false, message: 'Nickname can be up to 30 characters.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//firstname
const changeUserFirstNameDataService = (username, newUserFirstName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.findOneAndUpdate({ username }, { userFirstName: newUserFirstName });
        return { statusCode: 200, success: true, message: 'First Name updated.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//lastname
const changeUserLastNameDataService = (username, newUserLastName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.findOneAndUpdate({ username }, { userLastName: newUserLastName });
        return { statusCode: 200, success: true, message: 'Last Name updated.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//email
const changeUserEmailDataService = (username, newUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.findOneAndUpdate({ username }, { userEmail: newUserEmail });
        return { statusCode: 200, success: true, message: 'E-Mail updated.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//dateOfBirth
const changeUserDateOfBirthDataService = (username, newUserDateOfBirth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.findOneAndUpdate({ username }, { userDateOfBirth: newUserDateOfBirth });
        return { statusCode: 200, success: true, message: 'Date of birth updated.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { getUsersListService, getUserBaseDataService, getUserPhotosDataService, getUserThemesDataService, getUserRolesDataService, 
//edit-user-profile-data
changeUserThemesDataService, changeUserNicknameDataService, changeUserFirstNameDataService, changeUserLastNameDataService, changeUserEmailDataService, changeUserDateOfBirthDataService, };
