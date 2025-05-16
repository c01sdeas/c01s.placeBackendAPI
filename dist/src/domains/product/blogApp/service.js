var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import slugify from 'slugify';
import { blogSchemaExport } from "./model.js";
const addNewBlogPostService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogSchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogSchemaExport.exists({ slug });
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
        // await newBlogData.save();
        return { statusCode: 201, success: true, message: 'New post added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { addNewBlogPostService };
