import slugify from 'slugify';
import { blogSchemaExport } from "./model.js";

const addNewBlogPostService = async (data:INewBlogRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogSchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogSchemaExport.exists({ slug });
            counter++;
        }

        
        const newBlogData = new blogSchemaExport({
            content: data.content,
            image: data.image,
            intro: data.intro,
            meta: data.meta,
            readingTime: Math.ceil((data.content.trim().split(/\s+/)).length / 200),
            slug,
            title: data.title,  
            username: data.username
        });

        return { statusCode: 201, success: true, message: 'New post added.' };


    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    addNewBlogPostService
}