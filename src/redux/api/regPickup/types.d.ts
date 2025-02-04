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
