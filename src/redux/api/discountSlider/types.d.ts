namespace Discount {
    type GetDiscountReaponse = [
        {
            id: number;
            books: {
                book_images: Array<{
                    book_images: string;
                }>;
                book_name: string;
                price: number;
                author: string;
                average_rating: number;
                total_ratings: number;
                janre: Array<{
                    janre_name: string;
                }>;
            };
            discount: string;
            discount_book: number;
        }
    ];
    type GetDiscountRequest = void;
}
