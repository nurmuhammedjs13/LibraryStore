namespace FAVORITE {
  type GetFavoriteResponse = [
    id: number,
    book_name: string,
    author: string,
    price: number,
    average_rating: number,
    book_images: Array<{ book_images: string }>,
    janre: Array<{ janre_name: string }>
  ];
  type GetFavoriteRequest = void;
  type GetFavoriteItemsReaponse = [
    id: number,
    book_name: string,
    author: string,
    price: number,
    average_rating: number,
    book_images: Array<{ book_images: string }>,
    janre: Array<{ janre_name: string }>
  ];
  type GetFavoriteItemsRequest = void;

  type CreateFavoriteItemRequest = {
    title: string;
    author: string;
    price: number;
    image: string;
  };

  type DeleteFavoriteItemRequest = number;
}
