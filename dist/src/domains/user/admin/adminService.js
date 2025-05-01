var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userAuthDataSchemaExport } from "../authentication/authModel.js";
import { userRolesSchemaExport } from "../usercrud/userModel.js";
const changeUserRolesService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWithRolesData = yield userRolesSchemaExport.findOne({ username: data.username });
        let roles = data.roles;
        if (!roles.includes('user'))
            roles.push('user');
        if (!(userWithRolesData === null || userWithRolesData === void 0 ? void 0 : userWithRolesData.roles)) {
            yield new userRolesSchemaExport({ username: data.username, roles: roles }).save();
        }
        if (userWithRolesData === null || userWithRolesData === void 0 ? void 0 : userWithRolesData.roles) {
            userWithRolesData.roles = roles;
            userWithRolesData.roles.forEach(element => {
                if (element === '') {
                    userWithRolesData.roles.unshift(element);
                }
            });
            yield userWithRolesData.save();
        }
        return { statusCode: 200, success: true, message: 'User roles updated.' };
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
});
const changeUserBanStatusService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuthData = yield userAuthDataSchemaExport.findOne({ username });
        if (userAuthData === null || userAuthData === void 0 ? void 0 : userAuthData.username) {
            userAuthData.status = !userAuthData.status;
            yield userAuthData.save();
            return { success: true, statusCode: 200, message: 'User banned.' };
        }
        else
            return { success: false, message: 'User not found.', statusCode: 400 };
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
});
export { changeUserRolesService, changeUserBanStatusService };
