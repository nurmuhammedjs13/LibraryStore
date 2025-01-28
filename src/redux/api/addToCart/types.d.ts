namespace ADDTOCART {
    type GetCartItemsRequest = void;

    type GetCartItemsResponse = [
        {
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
        }
    ];

    export type AddToCardRequest = {
        books: {
            book_name?: string | undefined;
            author?: string;
            price?: number;
        };
        quantity: number;
        books_id?: number;
    };

    export type AddToCardResponse = {
        books: {
            book_name?: string;
            author?: string;
            price: number;
        };
        quantity: number;
        books_id: number;
    };
}
