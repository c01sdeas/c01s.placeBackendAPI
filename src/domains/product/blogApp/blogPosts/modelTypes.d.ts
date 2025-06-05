
interface ISubscribeToNews {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPost {
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: string;
    status: boolean;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPostVote {
    blogID: string;
    username: string;
    vote: number;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    ISubscribeToNews,
    IBlogPost,
    IBlogPostVote
}