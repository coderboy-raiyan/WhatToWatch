export type TMovie = {
    title: string;
    slug: string;
    description: string;
    releaseDate: Date | string;
    genre: string;
    isDeleted: boolean;
    viewCount: number;
    totalReviews: number;
    thumbnail: string;
};
