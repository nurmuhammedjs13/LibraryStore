namespace RATINGS {
    type GetRatingResponse = [
        {
            id: number;
            user_rating: {
                username: string;
            };
            stars: number;
            comment: string;
            created_date: string;
        }
    ];

    type GetRatingResponse = GetRatingResponse[];
    type GetRatingRequest = void;

    type PostRatingRequest = {
        comment: string;
        stars: number;
    };

    type PostRatingResponse = {
        id: number;
        comment: string;
        stars: number;
        created_date: string;
        user_rating: {
            username: string;
        };
    };
}
