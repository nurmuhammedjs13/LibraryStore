namespace REGPICKUP {
    type GetRegPickUpResponse = [
        {
            id: number;
            client: number;
            delivery: string;
            cart: {
                items: {
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
                };
                total_price: string;
            };
            client_first_name: string;
            client_last_name: string;
            client_email: string;
            client_phone_number: string;
            text: string;
            check_order: string | File;
            created_at: string;
        }
    ];

    type GetRegPickUpRequest = void;

    type PostRegPickUpRequest = {
        client: number;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        check_order: string | File;
        text: string;
        cart_id: number;
    };

    export type PostRegPickUpResponse = {
        id: number;
        client: number;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address: string;
        text: string;
        cart_id: number;
        check_order: string;
        created_at: string;
    };
}
