namespace RATINGS {
    type GetRatingResponse = [
        {
            id: number;
            user_rating: number;
            book: number;
            aksia_books: unknown;
            katalog_books: unknown;
            katalog_aksia_books: unknown;
            stars: number;
            comment: string;
            created_date: string;
        }
    ];

    type GetRatingResponse = GetRatingResponse[];

    type GetRatingRequest = void;
}
