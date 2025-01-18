namespace FAVORITE {



 
  type GetKatFavoriteItemsRequest = void;

  type GetKatFavoriteItemsReaponse = {
    id: number;
    user_favorite: number;
    books_like: {
      id: number;
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

    like_favorite: boolean;
  }[];

  type CreateKatFavoriteItemRequest = {
    id?: number;
    user_favorite: number;
    books_like: number;
    like_favorite: boolean;
  };

  type CreatekatFavoriteItemResponse = {
    user_favorite: number;
    books_like: number;
    like_favorite: boolean;
  };
}
