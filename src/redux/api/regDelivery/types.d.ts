namespace REGDELIVERY {
    export interface BaseDeliveryData {
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
    }

    export type GetRegDeliveryResponse = GetDeliveryItem[];
    export type GetRegDeliveryRequest = void;
    export type PostRegDeliveryRequest = BaseDeliveryData;
    export type PostRegDeliveryResponse = GetDeliveryItem;
}
