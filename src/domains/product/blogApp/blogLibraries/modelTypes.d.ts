interface ILibrary {
    title: string;
    description: string;
    status: boolean;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPostInLibrary {
    blogID: string;
    libraryID: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    ILibrary,
    IBlogPostInLibrary
}