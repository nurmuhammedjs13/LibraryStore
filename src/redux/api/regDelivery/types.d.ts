namespace REGDELIVERY {
    export interface BaseDeliveryData {
        client?: number | null;
        delivery: string;
        cart: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_address?: string | undefined;
        client_phone_number: string;
        text: string;
        cart_id: number;
    }


    export interface GetDeliveryItem {
        id: number;
        client: number;
        delivery: string;
        cart: Array<{
            items: {
                id: number;
                books: {
                    id: number;
                    book_images: Array<{ book_images: string }>;
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
    }

    export type GetRegDeliveryResponse = GetDeliveryItem[];
    export type GetRegDeliveryRequest = void;
    export type PostRegDeliveryRequest = BaseDeliveryData;
    export type PostRegDeliveryResponse = GetDeliveryItem;
}
