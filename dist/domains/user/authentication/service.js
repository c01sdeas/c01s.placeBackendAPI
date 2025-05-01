"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameAvailableControl = exports.getEmptyUser = void 0;
const model_1 = require("./model");
const user = model_1.userSchemaExport;
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
exports.getEmptyUser = getEmptyUser;
const usernameAvailableControl = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!username || username.length <= 2) {
            return { success: false, message: 'Username must be longer than 2 characters.' };
        }
        const existingUser = yield user.findOne({ username: username });
        if (existingUser) {
            return { success: false, message: 'Username is already taken.' };
        }
        else {
            return { success: true, message: 'Username is available.' };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false, error: error, message: 'An error occurred while checking username availability.' };
    }
});
exports.usernameAvailableControl = usernameAvailableControl;
