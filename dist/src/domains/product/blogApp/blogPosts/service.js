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
import { blogPostSchemaExport, blogPostVoteSchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
import { blogCategorySchemaExport } from '../blogCategories/model.js';
import { subscribeNewsSchemaExport } from './model.js';
//subscribetonews
const subscribeToNewsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubscribedUser = new subscribeNewsSchemaExport(data);
        if (yield subscribeNewsSchemaExport.exists({ email: data.email }))
            return { statusCode: 400, success: false, message: 'You are already subscribed to news.' };
        yield newSubscribedUser.save();
        return { statusCode: 201, success: true, message: 'Subscribed to news.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//blogCUD
const createNewBlogPostImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return { statusCode: 201, success: true, message: 'Image added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const createNewBlogPostService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogPostSchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogPostSchemaExport.exists({ slug });
            counter++;
        }
        if (data.image === null || data.image === undefined)
            data.image = '';
        const newBlogData = new blogPostSchemaExport({
            content: data.content,
            image: data.image,
            intro: data.intro,
            meta: data.meta,
            readingTime: Math.ceil((data.content.trim().split(/\s+/)).length / 200),
            slug,
            title: data.title,
            categoryID: data.categoryID,
            username: data.username
        });
        yield newBlogData.save();
        return { statusCode: 201, success: true, message: 'New post added.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const deleteBlogPostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findByIdAndDelete(id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        return { statusCode: 200, success: true, message: 'Post deleted successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostTitleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        let slug = slugify.default(data.title, { lower: true, strict: true });
        let slugExists = yield blogPostSchemaExport.exists({ slug });
        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = yield blogPostSchemaExport.exists({ slug });
            counter++;
        }
        post.slug = slug;
        post.title = data.title;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostContentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        post.readingTime = Math.ceil((data.content.trim().split(/\s+/)).length / 200).toString();
        post.content = data.content;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostImageService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        post.image = data.image;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostMetaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        post.meta = data.meta;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostIntroService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        post.intro = data.intro;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//postVotes
const updateBlogPostVoteService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vote = yield blogPostVoteSchemaExport.findOne({ blogID: data.blogID, username: data.username });
        if (!vote) {
            const newVote = new blogPostVoteSchemaExport({
                blogID: data.blogID,
                username: data.username,
                vote: data.vote
            });
            yield newVote.save();
            return { statusCode: 200, success: true, message: 'Vote added successfully.' };
        }
        vote.vote = data.vote;
        yield vote.save();
        return { statusCode: 200, success: true, message: 'Vote updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostVotesService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const votes = yield blogPostVoteSchemaExport.find({ blogID: data.blogID });
        const formattedVotes = votes.map(vote => ({
            id: vote._id.toString(),
            blogID: vote.blogID,
            username: vote.username,
            vote: vote.vote,
            createdAt: vote.createdAt,
            updatedAt: vote.updatedAt
        }));
        return { statusCode: 200, success: true, message: 'Votes fetched successfully.', data: formattedVotes };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostVoteCountService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const votes = yield blogPostVoteSchemaExport.find({ blogID: data.blogID });
        const totalVotes = (votes.filter(vote => vote.vote === 1).length) - (votes.filter(vote => vote.vote === -1).length);
        return { statusCode: 200, success: true, message: 'Votes fetched successfully.', data: totalVotes };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostUserVoteControlService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vote = yield blogPostVoteSchemaExport.findOne({ blogID: data.blogID, username: data.username });
        if (!vote)
            return { statusCode: 200, success: false, message: 'Vote not found.' };
        return { statusCode: 200, success: true, message: 'Vote fetched successfully.', data: vote.vote };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const updateBlogPostStatusService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPostSchemaExport.findById(data.id);
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        post.status = !post.status;
        yield post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
//blogRead
const getAllBlogPostsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = data;
        const posts = yield blogPostSchemaExport.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0)
            return { statusCode: 200, success: false, message: 'No posts found.' };
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs
        const [users, categories, postVotes] = yield Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogID: { $in: blogIDs } }).lean(),
        ]);
        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {});
        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {});
        // group postVotes by blogID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogID]) {
                map[vote.blogID] = [];
            }
            map[vote.blogID].push(vote);
            return map;
        }, {});
        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            var _a;
            const user = usersMap[post.username];
            const category = categoriesMap[(_a = post.categoryID) === null || _a === void 0 ? void 0 : _a.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            return Object.assign(Object.assign({}, post), { id: post._id.toString(), userNickname: user ? user.userNickname : null, categoryTitle: category ? category.title : null, categorySlug: category ? category.slug : null, voteCount: netVoteScore });
        });
        // const formattedPosts : IBlogListResponseDto[] = posts.map(post => ({
        //     id: post._id.toString(),
        //     slug: post.slug,
        //     image: post.image,
        //     readingTime: post.readingTime,
        //     meta: post.meta,
        //     title: post.title,
        //     intro: post.intro,
        //     content: post.content,
        //     createdAt: post.createdAt,
        //     updatedAt: post.updatedAt,
        //     categoryID: post.categoryID,
        //     categoryTitle: '',
        //     categorySlug: '',
        //     username: post.username,
        //     status: post.status,
        //     userNickname: '',
        //     voteCount: 0,
        // }));
        // const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        // const categories = await blogCategorySchemaExport.find({ _id: { $in: formattedPosts.map(post => post.categoryID) } });
        // const postVotes = await voteSchemaExport.find({ blogID: { $in: posts.map(post => post._id.toString()) } });
        // formattedPosts.forEach(post => {
        //     const user = users.find(user => user.username === post.username);
        //     if (user) post.userNickname = user.userNickname;
        //     const category = categories.find(category => category._id.toString() === post.categoryID);
        //     if (category) {
        //         post.categoryTitle = category.title;
        //         post.categorySlug = category.slug;
        //     }
        //     const votes = postVotes.filter(vote => vote.blogID === post.id);
        //     post.voteCount = votes.length;
        // });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getBlogPostBySlugService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = data;
        const post = yield blogPostSchemaExport.findOne({ slug });
        if (!post)
            return { statusCode: 200, success: false, message: 'Post not found.' };
        const user = yield userSchemaExport.findOne({ username: post.username });
        if (!user)
            return { statusCode: 200, success: false, message: 'User not found.' };
        const category = yield blogCategorySchemaExport.findOne({ _id: post.categoryID });
        if (!category)
            return { statusCode: 200, success: false, message: 'Category not found.' };
        const votes = yield blogPostVoteSchemaExport.find({ blogID: post._id.toString() });
        const formattedPost = {
            id: post._id.toString(),
            slug: post.slug,
            image: post.image,
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            categoryID: post.categoryID,
            categoryTitle: category.title,
            categorySlug: category.slug,
            username: post.username,
            status: post.status,
            userNickname: user.userNickname,
            voteCount: votes.reduce((sum, vote) => sum + vote.vote, 0),
        };
        return { statusCode: 200, success: true, message: 'Post fetched successfully.', data: formattedPost };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByCategoryIDService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryID, page, limit } = data;
        const posts = yield blogPostSchemaExport.find({ categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0)
            return { statusCode: 200, success: false, message: 'No posts found.' };
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs
        const [users, categories, postVotes] = yield Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogID: { $in: blogIDs } }).lean(),
        ]);
        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {});
        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {});
        // group postVotes by blogID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogID]) {
                map[vote.blogID] = [];
            }
            map[vote.blogID].push(vote);
            return map;
        }, {});
        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            var _a;
            const user = usersMap[post.username];
            const category = categoriesMap[(_a = post.categoryID) === null || _a === void 0 ? void 0 : _a.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            return Object.assign(Object.assign({}, post), { id: post._id.toString(), userNickname: user ? user.userNickname : null, categoryTitle: category ? category.title : null, categorySlug: category ? category.slug : null, voteCount: netVoteScore });
        });
        // const formattedPosts : IBlogListResponseDto[] = posts.map(post => ({
        //     id: post._id.toString(),
        //     slug: post.slug,
        //     image: post.image,
        //     readingTime: post.readingTime,
        //     meta: post.meta,
        //     title: post.title,
        //     intro: post.intro,
        //     content: post.content,
        //     createdAt: post.createdAt,
        //     updatedAt: post.updatedAt,
        //     categoryID: post.categoryID,
        //     categoryTitle: '',
        //     categorySlug: '',
        //     username: post.username,
        //     status: post.status,
        //     userNickname: '',
        //     voteCount: 0
        // }));
        // const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        // const categories = await blogCategorySchemaExport.find({ _id: { $in: formattedPosts.map(post => post.categoryID) } });
        // const postVotes = await voteSchemaExport.find({ blogID: { $in: posts.map(post => post._id.toString()) } });
        // formattedPosts.forEach(post => {
        //     const user = users.find(user => user.username === post.username);
        //     if (user) post.userNickname = user.userNickname;
        //     const category = categories.find(category => category._id.toString() === post.categoryID);
        //     if (category) {
        //         post.categoryTitle = category.title;
        //         post.categorySlug = category.slug;
        //     }
        //     const votes = postVotes.filter(vote => vote.blogID === post.id);
        //     post.voteCount = votes.length;
        // });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByUsernameService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, page, limit } = data;
        const posts = yield blogPostSchemaExport.find({ username }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0)
            return { statusCode: 200, success: false, message: 'No posts found.' };
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs
        const [users, categories, postVotes] = yield Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogID: { $in: blogIDs } }).lean(),
        ]);
        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {});
        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {});
        // group postVotes by blogID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogID]) {
                map[vote.blogID] = [];
            }
            map[vote.blogID].push(vote);
            return map;
        }, {});
        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            var _a;
            const user = usersMap[post.username];
            const category = categoriesMap[(_a = post.categoryID) === null || _a === void 0 ? void 0 : _a.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            return Object.assign(Object.assign({}, post), { id: post._id.toString(), userNickname: user ? user.userNickname : null, categoryTitle: category ? category.title : null, categorySlug: category ? category.slug : null, voteCount: netVoteScore });
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByUsernameAndCategoryIDService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, categoryID, page, limit } = data;
        const posts = yield blogPostSchemaExport.find({ username, categoryID }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0)
            return { statusCode: 200, success: false, message: 'No posts found.' };
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs
        const [users, categories, postVotes] = yield Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogID: { $in: blogIDs } }).lean(),
        ]);
        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {});
        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {});
        // group postVotes by blogID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogID]) {
                map[vote.blogID] = [];
            }
            map[vote.blogID].push(vote);
            return map;
        }, {});
        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            var _a;
            const user = usersMap[post.username];
            const category = categoriesMap[(_a = post.categoryID) === null || _a === void 0 ? void 0 : _a.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            return Object.assign(Object.assign({}, post), { id: post._id.toString(), userNickname: user ? user.userNickname : null, categoryTitle: category ? category.title : null, categorySlug: category ? category.slug : null, voteCount: netVoteScore });
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
const getAllBlogPostsByCategorySlugService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, page, limit } = data;
        const category = yield blogCategorySchemaExport.findOne({ slug }).lean();
        if (!category)
            return { statusCode: 200, success: false, message: 'Category not found.' };
        const posts = yield blogPostSchemaExport.find({ categoryID: category._id }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0)
            return { statusCode: 200, success: false, message: 'No posts found.' };
        const userUsernames = [...new Set(posts.map(post => post.username))];
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))];
        const blogIDs = [...new Set(posts.map(post => post._id.toString()))];
        const [users, categories, postVotes] = yield Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogID: { $in: blogIDs } }).lean(),
        ]);
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {});
        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {});
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogID]) {
                map[vote.blogID] = [];
            }
            map[vote.blogID].push(vote);
            return map;
        }, {});
        const formattedPosts = posts.map(post => {
            var _a;
            const user = usersMap[post.username];
            const category = categoriesMap[(_a = post.categoryID) === null || _a === void 0 ? void 0 : _a.toString()];
            const votes = postVotesMap[post._id.toString()] || [];
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            return Object.assign(Object.assign({}, post), { id: post._id.toString(), userNickname: user ? user.userNickname : null, categoryTitle: category ? category.title : null, categorySlug: category ? category.slug : null, voteCount: netVoteScore });
        });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    }
    catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
});
export { 
//blogPost
createNewBlogPostService, deleteBlogPostService, updateBlogPostTitleService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostMetaService, updateBlogPostIntroService, updateBlogPostVoteService, getBlogPostVotesService, getBlogPostVoteCountService, getBlogPostUserVoteControlService, updateBlogPostStatusService, getAllBlogPostsService, createNewBlogPostImageService, getBlogPostBySlugService, getAllBlogPostsByCategoryIDService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryIDService, getAllBlogPostsByCategorySlugService, 
//subscribeToNews
subscribeToNewsService };
