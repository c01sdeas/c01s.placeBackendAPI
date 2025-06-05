interface IBlogCategory {
    title: string;
    slug: string;
    description: string;
    image: string;
    status: boolean;
    meta: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogCategory
}