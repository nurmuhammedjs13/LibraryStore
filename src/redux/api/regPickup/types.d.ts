namespace REGPICKUP {
    export interface BasePickupData {
        client: number | null;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        text: string;
        cart_id: number;
    }

    export type GetRegPickUpResponse = GetPickupItem[];
    export type GetRegPickUpRequest = void;
    export type PostRegPickUpRequest = BasePickupData;
    export type PostRegPickUpResponse = GetPickupItem;
}

namespace REGPICKUP {
    type GetRegPickUpResponse = {
        id: number;
        client: number;
        delivery: string;
        cart: Array<{
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
        }>;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        text: string;
        created_at: string;
    }[];

    type GetRegPickUpRequest = void;

    type PostRegPickUpRequest = {
        client: number;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address?: string | undefined;
        text: string;
        cart_id: number;
    };

    type PostRegPickUpResponse = {
        client: number;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address?: string | undefined;
        text: string;
        cart_id: number;
    };
}
