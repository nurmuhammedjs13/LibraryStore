namespace REGDELIVERY {
    type GetRegDeliveryResponse = [
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
            created_at: string;
        }
    ];

    type GetRegDeliveryRequest = void;

    type PostRegDeliveryRequest = {
        client: number;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address: string | undefined;
        text: string;
        cart_id: number;
    };

    type PostRatingResponse = {
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
        check_order: string | File;
        created_at: string;
    };
}
