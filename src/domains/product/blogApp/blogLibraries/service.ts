import { userSchemaExport } from "../../../user/authentication/authModel.js";
import { blogCategorySchemaExport } from "../blogCategories/model.js";
import { blogPostSchemaExport, blogPostVoteSchemaExport } from "../blogPosts/model.js";
import { IBlogPost } from "../blogPosts/modelTypes.js";
import { blogPostInLibrarySchemaExport, librarySchemaExport } from "./model.js";
import { ICreateNewBlogLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, IDeleteBlogLibraryRequestDto, IDeleteBlogPostInLibraryRequestDto, IGetAllBlogLibrariesRequestDto, IUpdateBlogLibraryDescriptionRequestDto, IUpdateBlogLibraryStatusRequestDto, IUpdateBlogLibraryTitleRequestDto, IUpdateBlogPostInLibraryRequestDto } from "./requestTypes.d.js";
import { IBlogLibraryResponseDto, IBlogPostInLibraryResponseDto } from "./responseTypes.js";

//blogLibrariesCRUD
const createNewBlogLibraryService = async (data:ICreateNewBlogLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const newLibrary = new librarySchemaExport(data);
        await newLibrary.save();
        return { statusCode: 201, success: true, message: 'New library added.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryTitleService = async (data:IUpdateBlogLibraryTitleRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.title = data.title;

        await library.save();
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryDescriptionService = async (data:IUpdateBlogLibraryDescriptionRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.description = data.description;

        await library.save();
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryStatusService = async (data:IUpdateBlogLibraryStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.status = data.status;

        await library.save();
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogLibraryService = async (data:IDeleteBlogLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findByIdAndDelete(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };
        return { statusCode: 200, success: true, message: 'Library deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogLibrariesByUsernameService = async (data:IGetAllBlogLibrariesRequestDto):Promise<ResponseWithMessage<IBlogLibraryResponseDto[]>> => {
    try {
        const libraries = await librarySchemaExport.find({ username: data.username }).lean();
        if (!libraries) return { statusCode: 200, success: false, message: 'Libraries not found.' };
        const formattedLibraries:IBlogLibraryResponseDto[] = libraries.map(library => {
            return {
                id: library._id.toString(),
                title: library.title,
                description: library.description,
                status: library.status,
                username: library.username,
                createdAt: library.createdAt,
                updatedAt: library.updatedAt
            }
        })
        return { statusCode: 200, success: true, message: 'Libraries found successfully.', data: formattedLibraries };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//blogPostsInLibraries
const createNewBlogPostInLibraryService = async (data:ICreateNewBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.libraryID);
        if (!library) return { statusCode: 404, success: false, message: 'Library not found.' };
        const blogPost = await blogPostSchemaExport.findById(data.blogID);
        if (!blogPost) return { statusCode: 404, success: false, message: 'Blog post not found.' };
        
        const blogPostInLibrary = new blogPostInLibrarySchemaExport({
            blogID: blogPost._id,
            libraryID: library._id
        });
        await blogPostInLibrary.save();
        return { statusCode: 201, success: true, message: 'Blog post added to library.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostInLibraryService = async (data:IUpdateBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findById(data.id);
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        blogPostInLibrary.blogID = data.blogID;
        blogPostInLibrary.libraryID = data.libraryID;
        await blogPostInLibrary.save();
        return { statusCode: 200, success: true, message: 'Blog post in library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostInLibraryStatusService = async (data:IUpdateBlogLibraryStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findOne({ libraryID: data.id });
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        blogPostInLibrary.status = data.status;
        await blogPostInLibrary.save();
        return { statusCode: 200, success: true, message: 'Blog post in library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogPostInLibraryService = async (data:IDeleteBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findByIdAndDelete(data.id);
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        return { statusCode: 200, success: true, message: 'Blog post in library deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsInLibraryService = async (data:IDeleteBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<IBlogPostInLibraryResponseDto[]>> => {
    try {
        const blogPostsInLibrary = await blogPostInLibrarySchemaExport.find({ libraryID: data.id }).populate('blogID').populate('libraryID').lean();
        if (!blogPostsInLibrary) return { statusCode: 200, success: false, message: 'Blog posts in library not found.' };

        const blogPost = await blogPostSchemaExport.findById(blogPostsInLibrary[0].blogID);
        if (!blogPost) return { statusCode: 200, success: false, message: 'Blog post not found.' };

        const category = await blogCategorySchemaExport.findById(blogPost.categoryID);
        if (!category) return { statusCode: 200, success: false, message: 'Category not found.' };

        const user = await userSchemaExport.findOne({ username: blogPost.username });
        if (!user) return { statusCode: 200, success: false, message: 'User not found.' };

        const votes = await blogPostVoteSchemaExport.find({ blogID: blogPost._id.toString() });

        const formattedBlogPostsInLibrary:IBlogPostInLibraryResponseDto[] = blogPostsInLibrary.map(blogPostInLibrary => {
            return {
                id: blogPostInLibrary._id.toString(),
                blogID: blogPostInLibrary.blogID.toString(),
                libraryID: blogPostInLibrary.libraryID.toString(),
                createdAt: blogPostInLibrary.createdAt,
                updatedAt: blogPostInLibrary.updatedAt,
                title: blogPost.title,
                slug: blogPost.slug,
                image: blogPost.image,
                readingTime: blogPost.readingTime,
                meta: blogPost.meta,
                intro: blogPost.intro,
                content: blogPost.content,
                categoryID: blogPost.categoryID,
                categoryTitle: category.title,
                categorySlug: category.slug,
                username: blogPost.username,
                status: blogPost.status,
                userNickname: user.userNickname,
                voteCount: votes.reduce((sum, vote) => sum + vote.vote, 0)
            }
        })
        return { statusCode: 200, success: true, message: 'Blog posts in library found successfully.', data: formattedBlogPostsInLibrary };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    //blogLibrariesCRUD
    createNewBlogLibraryService,
    updateBlogLibraryTitleService,
    updateBlogLibraryDescriptionService,
    updateBlogLibraryStatusService,
    deleteBlogLibraryService,
    getAllBlogLibrariesByUsernameService,

    //blogPostInLibrariesCRUD
    createNewBlogPostInLibraryService,
    updateBlogPostInLibraryService,
    updateBlogPostInLibraryStatusService,
    deleteBlogPostInLibraryService,
    getAllBlogPostsInLibraryService
}