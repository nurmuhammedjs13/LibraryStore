 namespace FAVORITE {
  type GetFavoriteItemsRequest =void
  type GetFavoriteItemsReaponse ={
    items: Array<{
      id: number;
      book_name: string;
      author: string;
      price: number;
      janre: { janre_name: string }[];
    }>;
  }

  type CreateFavoriteItemRequest = {
    username: string;
    book_name: string;
    author: string;
    price: number;
    janre: { janre_name: string }[];
  }

  type CreateFavoriteItemResponse ={
    success: boolean;
    message: string;
    data: {
      id: number;
      book_name: string;
      author: string;
      price: number;
      janre: { janre_name: string }[];
    };
  }
}
