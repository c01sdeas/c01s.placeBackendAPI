interface ICreateNewBlogPostRequestDto {
    image?: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: string;
    username: string;
}

interface IUpdateBlogPostTitleRequestDto {
    id: string;
    title: string;
}

interface IUpdateBlogPostContentRequestDto {
    id: string;
    content: string;
}

interface IUpdateBlogPostImageRequestDto {
    id: string;
    image: string;
}

interface IUpdateBlogPostMetaRequestDto {
    id: string;
    meta: string;
}

interface IUpdateBlogPostIntroRequestDto {
    id: string;
    intro: string;
}

interface IUpdateBlogPostUserVotesRequestDto {
    blogID: string;
    username: string;
    vote: number;
}

interface IGetBlogPostVotesRequestDto {
    blogID: string;
}

interface IGetBlogPostUserVoteControlRequestDto {
    blogID: string;
    username: string;
}

interface IUpdateBlogPostStatusRequestDto {
    id: string;
}

interface IGetAllBlogPostsRequestDto {
    page: number;
    limit: number;
}

interface IGetBlogPostBySlugRequestDto {
    slug: string;
}

interface IGetBlogPostByCategoryIDRequestDto {
    categoryID: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByCategorySlugRequestDto {
    slug: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameRequestDto {
    username: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameAndCategoryIDRequestDto {
    username: string;
    categoryID: string;
    page: number;
    limit: number;
}

interface ISubscribeToNewsRequestDto {
    email: string;
}

export type {
    ICreateNewBlogPostRequestDto,
    IUpdateBlogPostTitleRequestDto,
    IUpdateBlogPostContentRequestDto,
    IUpdateBlogPostImageRequestDto,
    IUpdateBlogPostMetaRequestDto,
    IUpdateBlogPostIntroRequestDto,
    IUpdateBlogPostUserVotesRequestDto,
    IGetBlogPostVotesRequestDto,
    IGetBlogPostUserVoteControlRequestDto,
    IUpdateBlogPostStatusRequestDto,
    IGetAllBlogPostsRequestDto,
    IGetBlogPostBySlugRequestDto,
    IGetBlogPostByCategoryIDRequestDto,
    IGetBlogPostByCategorySlugRequestDto,
    IGetBlogPostByUsernameRequestDto,
    IGetBlogPostByUsernameAndCategoryIDRequestDto,
    ISubscribeToNewsRequestDto,
}