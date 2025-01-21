namespace ADDTOCART {
    type GetCartItemsRequest = void;

    type GetCartItemsResponse = [
        {
            id: number;
            user: number;
            created_date: string;
            items: {
                id: number;
                katalog_books: {
                    id: number;
                    books: {
                        book_images: {
                            book_images: string;
                        }[];
                        book_name: string; // Название книги
                        author: string; // Автор
                        price: number; // Цена
                        average_rating: number; // Средний рейтинг
                        total_ratings: number; // Общее количество оценок
                        janre: {
                            // Жанры книги
                            janre_name: string;
                        }[];
                    };
                };
                quantity: number; // Количество
            }[];
            total_price: number; // Общая стоимость
        }
    ];

    // Для POST запроса (добавление в корзину)
    export type AddToCardRequest = {
        katalog_books_cart: number; // ID книги
        user_cart?: number; // ID пользователя
        quantity: number; // Количество
        cart: number; // Новое поле cart
    };

    export type AddToCardResponse = {
        id: number;
        katalog_books: {
            id: number;
        };
        quantity: number;
        created_date: string;
    };
}
