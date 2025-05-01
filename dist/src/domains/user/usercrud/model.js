import { Schema, model } from 'mongoose';
const userPhotoSchema = new Schema({
    username: { type: String, required: [true, 'Username is required.'] },
    userAvatar: { type: String },
    userBackground: { type: String }
});
const userThemeSchema = new Schema({
    username: { type: String, required: [true, 'Username is required. '],
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase: true },
    lights: { type: Boolean, required: [true, 'Lights info is required. '] }
}, { timestamps: true });
const userRolesSchema = new Schema({
    username: { type: String, required: [true, 'Username is required. '],
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase: true },
    roles: { type: [String], required: [true, 'Roles are required. '] }
}, { timestamps: true });
const userThemeSchemaExport = model('userTheme', userThemeSchema, 'userThemes');
const userRolesSchemaExport = model('userRole', userRolesSchema, 'userRoles');
const userPhotoSchemaExport = model('userPhoto', userPhotoSchema, 'userPhotos');
export { userThemeSchemaExport, userRolesSchemaExport, userPhotoSchemaExport };
