//blogCategory
interface INewBlogCategoryRequestDto {
    title: string;
    description: string;
    image?: string;
    status: boolean;
    meta: string;
    username: string;
}
interface ICreateNewBlogCategoryImageRequestDto{
    slug: string;
    fileName: string;
}
interface IUpdateBlogCategoryTitleRequestDto {
    id: string;
    title: string;
}
interface IUpdateBlogCategoryDescriptionRequestDto {
    id: string;
    description: string;
}
interface IUpdateBlogCategoryImageRequestDto {
    id: string;
    image: string;
}
interface IUpdateBlogCategoryMetaRequestDto {
    id: string;
    meta: string;
}
interface IUpdateBlogCategoryStatusRequestDto {
    id: string;
    status: boolean;
}

interface IGetAllBlogCategoriesRequestDto {
    page: number;
    limit: number;
}
interface IGetBlogPostCategoryBySlugRequestDto {
    slug: string;
    page: number;
    limit: number;
}
interface IGetAllBlogPostCategoriesRequestDto {
    page: number;
    limit: number;
    categoryID: string;
}

export type {
    INewBlogCategoryRequestDto,
    ICreateNewBlogCategoryImageRequestDto,
    IUpdateBlogCategoryTitleRequestDto,
    IUpdateBlogCategoryDescriptionRequestDto,
    IUpdateBlogCategoryImageRequestDto,
    IUpdateBlogCategoryMetaRequestDto,
    IUpdateBlogCategoryStatusRequestDto,
    IGetAllBlogCategoriesRequestDto,
    IGetBlogPostCategoryBySlugRequestDto,
    IGetAllBlogPostCategoriesRequestDto
}