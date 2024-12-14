namespace Books {
    type GetBooksReaponse = [
        {
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
        }
    ];
    type GetBooksResponse = GetBooksReaponse[];
    type GetBooksRequest = void;

    type GetBooksDetailResponse = GetBooksReaponse[];
    type GetBooksDetailRequest = void | string | number;
}
