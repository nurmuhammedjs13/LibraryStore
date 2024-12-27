namespace Discount {
    type GetDiscountResponse = [
        {
            id: number;
            books: {
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
                description: string;
                ratings: Array<{
                    id: number;
                    user_rating: {
                        username: string;
                    };
                    book: number;
                    aksia_books: unknown; // Используем unknown вместо any
                    katalog_books: unknown; // Используем unknown вместо any
                    katalog_aksia_books: unknown; // Используем unknown вместо any
                    stars: number;
                    comment: string;
                    created_date: string;
                }>;
            };
            discount: string;
            discount_book: number;
        }
    ];

    type GetDiscountResponse = GetDiscountResponse[];

    type GetDiscountRequest = void;

    type GetDiscountDetailResponse = GetDiscountResponse;

    type GetDiscountDetailRequest = number;
}
