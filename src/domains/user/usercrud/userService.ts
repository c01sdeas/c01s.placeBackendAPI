import { userSchemaExport } from "../authentication/authModel.js";
import { IUserPhotosData, IUserThemesData } from "./userModelTypes.js";
import { userPhotoSchemaExport, userThemeSchemaExport } from "./userModel.js";

const user = userSchemaExport;
const getUsersList = async (): Promise<ResponseWithMessage<IUserData[]>> => {
    try {
        return {statusCode: 200, success: true, data: await user.find()};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//session-data
const getUserBaseData = async (username:string): Promise<ResponseWithMessage<IUser>> => {
    try {
        console.log('kullanıcıadı:' + username);
        console.log(await user.findOne({username: username}));
        
        return {statusCode: 200, success: true, data: await user.findOne({username})};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const userPhotos = userPhotoSchemaExport;
const getUserPhotosData = async (username: string): Promise<ResponseWithMessage<IUserPhotosData>> => {
    try {
        return { statusCode: 200, success: true, data: await userPhotos.findOne({username}) };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//user-theme
const userThemes = userThemeSchemaExport;
const getUserThemesData = async (username: string): Promise<ResponseWithMessage<IUserThemesData>> => {
    try {
        return { statusCode: 200, success: true, data: await userThemes.findOne({username}) };
    } catch (error) {
        console.log();
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}



//edit-user-profile-data
//theme
const changeUserThemesData = async (username:string): Promise<ResponseWithMessage<IUserThemesData>> => {
    try {
        let data = await userThemes.findOne({username});

        if(data)
            data.lights = !data.lights;
        else
            data = new userThemes({username, lights: false});

        await data.save();

        return {statusCode: 200, success: true, message: 'Success.'};

    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//nickname
const changeUserNicknameDataService = async (username:string, newUserNickname:string):Promise<ResponseWithMessage<boolean>> => {
    try {        
        if (newUserNickname.length <= 30) {
            await user.findOneAndUpdate({username}, {userNickname: newUserNickname});
            return {statusCode: 200, success: true, message: 'Nickname updated.'};
        } else
        return {statusCode: 400, success: false, message: 'Nickname can be up to 30 characters.'};
        
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}   

//firstname
const changeUserFirstNameDataService = async (username:string, newUserFirstName:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userFirstName: newUserFirstName});
        return {statusCode: 200, success: true, message: 'First Name updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//lastname
const changeUserLastNameDataService = async (username:string, newUserLastName:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userLastName: newUserLastName});
        return {statusCode: 200, success: true, message: 'Last Name updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//email
const changeUserEmailDataService = async (username:string, newUserEmail:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userEmail: newUserEmail});
        return {statusCode: 200, success: true, message: 'E-Mail updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//dateOfBirth
const changeUserDateOfBirthDataService=async (username:string, newUserDateOfBirth:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userDateOfBirth: newUserDateOfBirth});
        return {statusCode: 200, success: true, message: 'Date of birth updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


export {
    getUsersList,
    getUserBaseData,
    getUserPhotosData,
    getUserThemesData,
    
    //edit-user-profile-data
    changeUserThemesData,
    changeUserNicknameDataService,
    changeUserFirstNameDataService,
    changeUserLastNameDataService,
    changeUserEmailDataService,
    changeUserDateOfBirthDataService,
}