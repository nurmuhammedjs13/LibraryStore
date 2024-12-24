namespace PAYMENTDETAILS {
    type GetPaymentdetailsReaponse = [
        {
            id:number;
            image_name_bank: string;
            image_qr_code: string;
            cart_number: string;
        }
    ]
    type GetPaymentdetailsRequest = void;
}