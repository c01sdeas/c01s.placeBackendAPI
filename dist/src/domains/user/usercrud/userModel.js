import { Schema, model } from 'mongoose';
const userPhotosDataSchema = new Schema({
    username: { type: String, required: [true, 'Username is required.'] },
    userAvatar: { type: String },
    userBackground: { type: String }
});
const userThemeDataSchema = new Schema({
    username: { type: String, required: [true, 'Username is required. '],
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase: true },
    lights: { type: Boolean, required: [true, 'Lights info is required. '] }
}, { timestamps: true });
const userRolesDataSchema = new Schema({
    username: { type: String, required: [true, 'Username is required. '],
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase: true },
    roles: { type: [String], required: [true, 'Roles are required. '] }
}, { timestamps: true });
const userThemeSchemaExport = model('userTheme', userThemeDataSchema, 'userThemesData');
const userRolesSchemaExport = model('userRole', userRolesDataSchema, 'userRolesData');
const userPhotoSchemaExport = model('userPhoto', userPhotosDataSchema, 'userPhotosData');
export { userThemeSchemaExport, userRolesSchemaExport, userPhotoSchemaExport };
