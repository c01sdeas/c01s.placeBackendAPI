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
exports.usernameControlForUserSignUpPost = exports.usernameControlForUserSignUpGet = exports.loggedUserLoginData = exports.getLoginData = exports.tokenSecretKey = exports.getUserData = exports.signInPost = exports.signInGet = exports.signUpPost = exports.signUpGet = void 0;
const model = require('./model');
const bcrypt = require('bcrypt');
const service_1 = require("./service");
const user = model.userSchemaExport;
const signUpGet = (req, res) => {
    try {
        return res.json((0, service_1.getEmptyUser)());
    }
    catch (error) {
        console.log(error);
    }
};
exports.signUpGet = signUpGet;
const usernameControlForUserSignUpGet = (req, res) => {
    try {
        return res.json({ username: '' });
    }
    catch (err) {
        console.log(err);
    }
};
exports.usernameControlForUserSignUpGet = usernameControlForUserSignUpGet;
const usernameControlForUserSignUpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield (0, service_1.usernameAvailableControl)(req.body.username));
    }
    catch (err) {
        console.log(err);
    }
});
exports.usernameControlForUserSignUpPost = usernameControlForUserSignUpPost;
const userRecoveryKey = model.userRecoveryKeySchemaExport;
const signUpPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user(req.body);
        console.log(req.body);
        // const usernameUniqueControl = await user.findOne({username:  newUser.username});
        // if (usernameUniqueControl) return res.status(400).json({message: 'Username is already taken.'});
        if (newUser.password && (newUser.password.length > 6)) {
            newUser.password = yield bcrypt.hash(newUser.password, 10);
            newUser.status = true;
            console.log('buraya da girdi');
        }
        yield newUser.save();
        //recoveryKey
        const userRecoveryKeyControl = yield userRecoveryKey.findOne({ username: newUser.username });
        if (!userRecoveryKeyControl) {
            const userRecoveryKeyData = yield new userRecoveryKey({ userId: newUser._id, username: newUser.username, key: crypto.randomBytes(8).toString('hex') }).save();
            if (userRecoveryKeyData) {
                return res.status(201).json({ message: 'Welcome, ' + newUser.userNickname + '!', recoveryKey: userRecoveryKeyData.key });
            }
        }
    }
    catch (error) {
        // console.log(err);
        const err = error;
        if (err instanceof Error) {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map(key => ({
                    // field: key,
                    success: false,
                    message: err.errors[key].message
                }));
                return res.status(400).json({ errors });
            }
            if (err.name === 'MongoServerError' && err.code === 11000 && Object.keys(err.keyValue)[0] == 'username') {
                return res.status(400).json({ errors: [{ success: false, message: 'Username is already taken.' }], });
            }
            res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error', });
        }
    }
});
exports.signUpPost = signUpPost;
//auth
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const login = model.userAuthLogSchemaExport;
const signInGet = (req, res, next) => {
    try {
        return res.json(new login({ username: "", password: "" }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.signInGet = signInGet;
const tokenSecretKey = crypto.randomBytes(32).toString('hex');
exports.tokenSecretKey = tokenSecretKey;
const signInPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestUserLoginData = new login(req.body);
        const userData = yield user.findOne({ username: req.body.username });
        if (!userData)
            return res.status(401).json({ error: 'Authentication failed.' });
        if (!userData.status)
            return res.status(401).json({ error: 'Authentication failed.' });
        const passwordMatch = yield bcrypt.compare(requestUserLoginData.password, userData.password);
        if (!passwordMatch)
            return res.status(401).json({ error: 'Authentication failed.' });
        const userLoginData = yield login.findOne({ username: requestUserLoginData.username });
        req.session.username = req.body.username;
        const userRoleData = yield require('../usercrud/model').userRolesSchemaExport.findOne({ username: req.session.username });
        if (userRoleData) {
            req.session.userRoles = userRoleData.roles;
            console.log(req.session.userRoles);
        }
        if (userLoginData) {
            userLoginData.token = jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' });
            userLoginData.save();
            return res.json(userLoginData);
        }
        else {
            const newLogin = new login({ username: requestUserLoginData.username, token: jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' }) });
            yield newLogin.save();
            return res.json(yield login.findOne({ username: newLogin.username }));
        }
    }
    catch (error) {
        console.log(error);
        const err = error;
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map(key => ({
                // field: key,
                message: err.errors[key].message
            }));
            return res.status(400).json({ errors });
        }
    }
});
exports.signInPost = signInPost;
const getUser = model.getUserSchemaExport;
const getUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getLoggedUserData = yield getUser.findOne({ username: req.session.username });
        if (getLoggedUserData) {
            return res.json(new getUser({ username: getLoggedUserData.username, userFirstName: getLoggedUserData.userFirstName, userLastName: getLoggedUserData.userLastName, userEmail: getLoggedUserData.userEmail, userNickname: getLoggedUserData.userNickname, status: getLoggedUserData.status }));
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserData = getUserData;
let loggedUserLoginData = '';
exports.loggedUserLoginData = loggedUserLoginData;
const getLoginData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getLoggedUserData = yield login.findOne({ username: req.session.username });
        exports.loggedUserLoginData = loggedUserLoginData = getLoggedUserData;
        return res.json(getLoggedUserData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLoginData = getLoginData;
