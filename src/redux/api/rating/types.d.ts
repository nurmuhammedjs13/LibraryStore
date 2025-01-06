namespace RATINGS {
    export type GetRatingResponse = {
        id: number;
        user_rating: number;
        books: number;
        stars: number;
        comment: string;
        created_date: string;
    }[];

    export type GetRatingRequest = void;

    export type PostRatingRequest = {
        user_rating: number;
        books: number;
        stars: number;
        comment: string;
    };

    export type PostRatingResponse = {};
}
