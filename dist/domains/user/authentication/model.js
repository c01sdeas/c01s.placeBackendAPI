"use strict";
// const mongoose = require('mongoose');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRecoveryKeySchemaExport = exports.userAuthLogSchemaExport = exports.userAuthSchemaExport = exports.getUserSchemaExport = exports.userSchemaExport = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required. '],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    userFirstName: {
        type: String,
        required: [true, 'First Name is required. '],
        trim: true
    },
    userLastName: {
        type: String,
        required: [true, 'Last Name is required. '],
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, 'E-Mail is required. '],
        match: [/.+\@.+\..+/, 'Please enter a valid email.'],
        trim: true,
        lowercase: true
    },
    userNickname: {
        type: String,
        required: [true, 'Nickname is required. '],
        minlength: [3, 'Nickname must be at least 3 characters long.']
    },
}, { timestamps: true });
const getUserDataSchema = new mongoose_1.default.Schema({
    userAvatar: { type: String },
    userBackground: { type: String },
    username: { type: String },
    userFirstName: { type: String },
    userLastName: { type: String },
    userEmail: { type: String },
    userNickname: { type: String },
    status: { type: Boolean }
}, { timestamps: true });
const userAuthDataSchema = new mongoose_1.default.Schema({
    username: {
        type: String, required: [true, 'Username is required. '],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [7, 'Password must be at least 6 characters long.'],
        trim: true
    },
    status: {
        type: Boolean
    }
}, { timestamps: true });
//look at the password. is really required?
const userAuthSchema = new mongoose_1.default.Schema({
    username: { type: String, required: [true, 'Username is required. '],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'], },
    password: { type: String },
    token: { type: String }
}, { timestamps: true });
const userRecoveryKeySchema = new mongoose_1.default.Schema({
    userId: { type: String, required: [true, 'User is required. '], },
    username: { type: String, required: [true, 'User is required. '], },
    key: { type: String, required: [true, 'Key is required. '], },
}, { timestamps: true });
const userSchemaExport = mongoose_1.default.model('user', userSchema, 'userData');
exports.userSchemaExport = userSchemaExport;
const getUserSchemaExport = mongoose_1.default.model('getUser', getUserDataSchema, 'userData');
exports.getUserSchemaExport = getUserSchemaExport;
const userAuthSchemaExport = mongoose_1.default.model('userAuth', userAuthDataSchema, 'userAuthData');
exports.userAuthSchemaExport = userAuthSchemaExport;
const userAuthLogSchemaExport = mongoose_1.default.model('userAuthLog', userAuthSchema, 'userAuthLogData');
exports.userAuthLogSchemaExport = userAuthLogSchemaExport;
const userRecoveryKeySchemaExport = mongoose_1.default.model('userRecoveryKey', userRecoveryKeySchema, 'userRecoveryKeyData');
exports.userRecoveryKeySchemaExport = userRecoveryKeySchemaExport;
