namespace RATINGS {
    type GetRatingResponse = {
        id: number;
        user_rating: {
            username: string;
        };
        book: number;
        stars: number;
        comment: string;
        created_date: string;
    }[];

    type GetRatingRequest = void;

    type PostRatingRequest = {
        user_rating: number;
        book: number;
        stars: number;
        comment: string;
    };

    type PostRatingResponse = {
        user_rating: number;
        book: number;
        stars: number;
        comment: string;
    };
}
