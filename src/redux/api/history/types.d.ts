namespace HISTORY {
    type GetHistoryReaponse = Array<{
        order: {
            delivery: string;
            cart: {
                id: number;
                items: Array<{
                    id: number;
                    books: {
                        id: number;
                        book_images: Array<{
                            book_images: string;
                        }>;
                        book_name: string;
                        author: string;
                        price: number;
                    };
                    quantity: number;
                    books_id: number;
                    total_price: string;
                }>;
                total_price: string;
            };
            created_at: string;
        };
    }>;
    type GetHistoryRequest = void;
}
