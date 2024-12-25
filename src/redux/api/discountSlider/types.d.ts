namespace Discount {
    type GetDiscountResponse = [
        {
            id: number;
            books: {
                books: {
                    book_images: Array<{
                        book_images: string;
                    }>;
                    book_name: string;
                    author: string;
                    description: string;
                    price: number;
                    average_rating: number;
                    total_ratings: number;
                    janre: Array<{
                        janre_name: string;
                    }>;
                };
                discount: string;
                discount_book: number;
            };
        }
    ];

    type GetDiscountResponse = GetDiscountResponse[];

    type GetDiscountRequest = void;

    type GetDiscountDetailResponse = GetDiscountResponse;

    type GetDiscountDetailRequest = number;
}
