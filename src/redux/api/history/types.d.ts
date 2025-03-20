namespace HISTORY {
    type GetHistoryReaponse = [
        {
            order: {
                delivery: string;
                books: [
                    {
                        author: string;
                        book_name: string;
                        full_book_name: string;
                        id: number;
                        price: number;
                        quantity: number;
                    }
                ];
                total_price: string;
                created_at: string;
            };
        }
    ];
    type GetHistoryRequest = void;
}
