interface IBlogLibraryResponseDto {
    id: string;
    title: string;
    description: string;
    status: boolean;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}
interface IBlogPostInLibraryResponseDto {
    libraryID: string;

    id: string;
    title: string;
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    intro: string;
    content: string;
    categoryID: string;
    categoryTitle: string;
    categorySlug: string;
    username: string;
    status: boolean;
    userNickname: string;
    createdAt: Date;
    updatedAt: Date;
    voteCount: number;
}

export type {
    IBlogLibraryResponseDto,
    IBlogPostInLibraryResponseDto
}