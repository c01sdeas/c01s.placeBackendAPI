//blogCategory
interface INewBlogCategoryRequestData {
    title: string;
    slug: string;
    description: string;
    image?: string;
    status: boolean;
    meta: string;
    username: string;
}
interface IUpdateBlogCategoryTitleRequestData {
    id: string;
    title: string;
}
interface IUpdateBlogCategoryDescriptionRequestData {
    id: string;
    description: string;
}
interface IUpdateBlogCategoryImageRequestData {
    id: string;
    image: string;
}
interface IUpdateBlogCategoryMetaRequestData {
    id: string;
    meta: string;
}
interface IUpdateBlogCategoryStatusRequestData {
    id: string;
    status: boolean;
}

interface IGetAllBlogCategoriesRequestData {
    page: number;
    limit: number;
}
interface IGetBlogCategoryBySlugRequestData {
    slug: string;
}
interface IGetAllBlogPostCategoriesRequestData {
    page: number;
    limit: number;
    categoryID: string;
}
