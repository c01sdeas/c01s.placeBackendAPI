interface ICreateNewBlogPostRequestData {
    slug: string;
    image?: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    username: string;
}

interface IUpdateBlogPostTitleRequestData {
    id: string;
    title: string;
}

interface IUpdateBlogPostContentRequestData {
    id: string;
    content: string;
}

interface IUpdateBlogPostImageRequestData {
    id: string;
    image: string;
}

interface IUpdateBlogPostMetaRequestData {
    id: string;
    meta: string;
}

interface IUpdateBlogPostIntroRequestData {
    id: string;
    intro: string;
}

interface IUpdateBlogPostStatusRequestData {
    id: string;
}

interface IGetAllBlogPostsRequestData {
    page: number;
    limit: number;
}

interface IGetBlogPostBySlugRequestData {
    slug: string;
}

interface IGetBlogPostByCategoryIDRequestData {
    categoryID: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameRequestData {
    username: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameAndCategoryIDRequestData {
    username: string;
    categoryID: string;
    page: number;
    limit: number;
}