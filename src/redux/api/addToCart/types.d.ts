namespace ADDTOCART {
    type GetCartItemsRequest = void;

    type GetCartItemsResponse = [
        {
            books: {
                id: 0;
                book_images: [
                    {
                        book_images: string;
                    }
                ];
                book_name: string;
                author: string;
                price: number;
            };
            quantity: number;
            books_id: number;
        }
    ];

    export type AddToCardRequest = {
        books: {
            book_name: string;
            author?: string;
            price: number;
        };
        quantity: number;
        books_id?: number;
    };

    export type AddToCardResponse = {
        books: {
            book_name: string;
            author?: string;
            price: number;
        };
        quantity: number;
        books_id: number;
    };
}
