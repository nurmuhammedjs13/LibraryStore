namespace FAVORITE {
  type GetFavoriteItemsRequest = void ; ;

  type GetFavoriteItemsReaponse = {
    id: number;
    user_favorite: number;
    katalog_books_like: {
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
    like_favorite: boolean;
  }[];

  type CreateFavoriteItemRequest = {
    id?: number;
    katalog_books_like: number;
    like_favorite: boolean;
    user_favorite: number;
  };

  type CreateFavoriteItemResponse = {
    katalog_books_like: number;
    like_favorite: boolean;
    user_favorite: number;
  };
}
