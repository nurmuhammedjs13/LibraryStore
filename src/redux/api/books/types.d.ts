namespace Books {
    type GetBooksResponse = {
        id: number;
        book_images: Array<{
            book_images: string;
        }>;
        book_name: string;
        author: string;
        price: number;
        average_rating: number;
        total_ratings: number;
        janre: Array<{
            janre_name: string;
        }>;
    };

    type GetBooksListResponse = GetBooksResponse[];

    type GetBooksRequest = void;

    type GetBooksDetailResponse = GetBooksResponse;

    type GetBooksDetailRequest = number;
}
