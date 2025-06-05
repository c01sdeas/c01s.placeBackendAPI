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
const authCrudMiddleware = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers['authorization'];
        const authLog = userAuthLogSchemaExport;
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
                    if (req.session.username && req.session.username !== null && req.session.username !== undefined) {
                        getLoggedUserData = yield authLog.findOne({ username: token.username });
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization']) {
                            return res.status(401).json({ error: 'Access denied.1' });
                        }
                        if (getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.2' });
                        else
                            next();
                    }
                    else
                        return res.status(401).json({ error: 'Access denied.3' });
                }));
            }
            else if (requiredRole.includes('visitor')) {
                next();
            }
            else
                return res.status(401).json({ error: 'Access denied.4' });
        }
        catch (error) {
            return res.status(401).json({ error: 'Access denied.5' });
        }
    });
};
export default authCrudMiddleware;
