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
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const { tokenSecretKey } = require('../domains/user/authentication/controller');
    const login = require('../domains/user/authentication/model').loginSchemaExport;
    const user = require('../domains/user/authentication/model').userSchemaExport;
    let getLoggedUserData = undefined;
    try {
        if (!token)
            yield res.status(401).json({ error: 'Access denied.' });
        jwt.verify(req.headers['authorization'], tokenSecretKey, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
            if (!req.session) {
                return res.status(500).json({ error: 'Session is not initialized' });
            }
            // username özelliği olup olmadığını kontrol et
            if (!req.session.username) {
                req.session.username = 'your-username'; // Varsayılan olarak ata
            }
            if (err) {
                yield res.status(401).json({ error: 'Session has expired.' });
            }
            console.log(req.session);
            req.session.username = 'your-username';
            console.log(req.session.username);
            if (req.session.username) {
                getLoggedUserData = yield login.findOne({ username: token.username });
                if (getLoggedUserData !== undefined && getLoggedUserData.token !== req.headers['authorization']) {
                    console.log('Access denied. By local token.');
                    yield res.status(401).json({ error: 'Access denied.' });
                }
                if (req.session.username !== undefined)
                    next();
                else
                    throw new Error();
            }
        }));
    }
    catch (error) {
        console.log(error);
        yield res.status(401).json({ error: 'Access denied.' });
    }
});
exports.default = verifyToken;
