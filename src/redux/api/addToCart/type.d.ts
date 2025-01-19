namespace ADDTOCART  {
  type GetCartItemsRequest = void;

  type GetCartItemsResponse = [{
   id: number;
   user: number
   created_date: string;
   items: {
     id: number;
     katalog_books: {
       id: number;
       books: {
         book_images: {
           book_images: string;
         }[];
         book_name: string;
         author: string;
         price: number;
         average_rating: number;
         total_ratings: number;
         janre: {
           janre_name: string;
         }[];
       };
     };
     quantity: number;
   }[];
   total_price: number;
 }];
 
 // Для POST запроса (добавление в корзину)
 export type AddToCardRequest = {
   katalog_books_cart: number; // ID книги
   user_cart?: number;         // ID пользователя
   quantity: number;          // Количество
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