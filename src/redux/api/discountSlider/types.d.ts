namespace Discount {
    // Single discount item type that both responses will use
    type DiscountItem = {
        id: number;
        description?: string;
        books: {
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
            description: string;
            ratings: Array<{
                id: number;
                user_rating: {
                    username: string;
                };
                book: number;
                aksia_books: unknown;
                katalog_books: unknown;
                katalog_aksia_books: unknown;
                stars: number;
                comment: string;
                created_date: string;
            }>;
        };
        discount: string;
        discount_book: number;
    };

    // For the list endpoint (/aksia) - keeping as array
    type GetDiscountResponse = DiscountItem[];

    type GetDiscountRequest = void;

    // For the detail endpoint (/aksia/:id) - single object
    type GetDiscountDetailResponse = DiscountItem;

    type GetDiscountDetailRequest = number;
}
