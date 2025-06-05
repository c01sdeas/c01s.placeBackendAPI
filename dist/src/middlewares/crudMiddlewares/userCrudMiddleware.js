var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';
import { userRolesSchemaExport } from '../../domains/user/usercrud/userModel.js';
const userCrudMiddleware = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers['authorization'];
        const authLog = userAuthLogSchemaExport;
        const userRoles = userRolesSchemaExport;
        let getLoggedUserData = undefined;
        try {
            if (token !== undefined && token !== null && tokenSecretKey && req.headers['authorization'] !== undefined && req.headers['authorization'] !== null) {
                jwt.verify(req.headers['authorization'], tokenSecretKey, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!req.session) {
                        return res.status(500).json({ error: 'Session is not initialized' });
                    }
                    if (err) {
                        return res.status(401).json({ error: 'Session has expired.' });
                    }
                    if (req.session.username) {
                        getLoggedUserData = yield authLog.findOne({ username: token.username });
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization'])
                            return res.status(401).json({ error: 'Access denied.' });
                        if (getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.' });
                        if (getLoggedUserData && getLoggedUserData.username) {
                            const userRolesData = yield userRoles.findOne({ username: getLoggedUserData.username });
                            if (userRolesData && userRolesData.roles) {
                                let permissionControl = false;
                                userRolesData.roles.forEach(element => {
                                    if (requiredRole.includes(element)) {
                                        if (element === 'user' && req.body.username === req.session.username) {
                                            permissionControl = true;
                                        }
                                        if (userRolesData.roles.includes('admin') || userRolesData.roles.includes('moderator')) {
                                            permissionControl = true;
                                        }
                                    }
                                });
                                if (!permissionControl)
                                    return res.status(401).json({ error: 'Access denied.3' });
                                else
                                    next();
                            }
                            else {
                                yield new userRoles({ username: req.session.username, roles: ['user'] }).save();
                                next();
                            }
                        }
                        else {
                            return res.status(401).json({ error: 'Access denied.' });
                        }
                    }
                    else
                        return res.status(401).json({ error: 'Access denied.' });
                }));
            }
            else
                return res.status(401).json({ error: 'Access denied.' });
        }
        catch (error) {
            return res.status(401).json({ error: 'Access denied.' });
        }
    });
};
export default userCrudMiddleware;
