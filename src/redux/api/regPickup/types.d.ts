namespace REGPICKUP {
    type GetRegPickUpResponse = [
        {
            id: number;
            client: number;
            delivery: string;
            cart_item: number;
            client_first_name: string;
            client_last_name: string;
            client_email: string;
            client_phone_number: string;
            text: string;
            created_at: string;
        }
    ];

    type GetRegPickUpRequest = void;

    type PostRegPickUpRequest = {
        client: number;
        delivery: string;
        cart_item: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        text: string;
    };

    type PostRegPickUpResponse = {
        client: number;
        delivery: string;
        cart_item: number;
        client_first_name: string;
        client_last_name: string;
        client_email: string;
        client_phone_number: string;
        text: string;
    };
}
