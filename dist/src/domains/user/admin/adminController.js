var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { changeUserBanStatusService, changeUserRolesService } from "./adminService.js";
const changeUserRolesPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserRolesService(req.body);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
const changeUserBanStatusPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield changeUserBanStatusService(req.body.username);
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
});
export { changeUserRolesPost, changeUserBanStatusPost };
