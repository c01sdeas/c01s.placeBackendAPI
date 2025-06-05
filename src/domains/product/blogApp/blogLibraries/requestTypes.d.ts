interface ICreateNewBlogLibraryRequestDto {
    title: string;
    description: string;
    username: string;
}

interface IUpdateBlogLibraryTitleRequestDto {
    id: string;
    title: string;
}
interface IUpdateBlogLibraryDescriptionRequestDto {
    id: string;
    description: string;
}
interface IUpdateBlogLibraryStatusRequestDto {
    id: string;
    status: boolean;
}

interface IDeleteBlogLibraryRequestDto {
    id: string;
}

interface IGetAllBlogLibrariesRequestDto {
    username?: string;
}


interface ICreateNewBlogPostInLibraryRequestDto {
    blogID: string;
    libraryID: string;
}

interface IUpdateBlogPostInLibraryRequestDto {
    id: string;
    blogID: string;
    libraryID: string;
}
interface IDeleteBlogPostInLibraryRequestDto {
    id: string;
}
interface IGetAllBlogPostsInLibraryRequestDto {
    libraryID: string;
}

export type {
    ICreateNewBlogLibraryRequestDto,
    ICreateNewBlogPostInLibraryRequestDto,
    IUpdateBlogLibraryTitleRequestDto,
    IUpdateBlogLibraryDescriptionRequestDto,
    IUpdateBlogLibraryStatusRequestDto,
    IUpdateBlogPostInLibraryRequestDto,
    IDeleteBlogLibraryRequestDto,
    IDeleteBlogPostInLibraryRequestDto,
    IGetAllBlogLibrariesRequestDto
}
