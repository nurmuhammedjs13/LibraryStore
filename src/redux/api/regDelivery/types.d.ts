namespace REGDELIVERY {
    type GetRegDeliveryResponse = [
        {
            id: number;
            client: number;
            delivery: string;
            cart_item: number;
            client_first_name: string;
            client_last_name: string;
            client_email: string;
            client_phone_number: string;
            client_address: string;
            text: string;
            created_at: string;
        }
    ];

    type GetRegDeliveryRequest = void;

    type PostRegDeliveryRequest = {
        client: number;
        delivery: string;
        cart_item: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address: string;
        text: string;
    };

    type PostRegDeliveryResponse = {
        client: number;
        delivery: string;
        cart_item: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        client_address: string;
        text: string;
    };
}
