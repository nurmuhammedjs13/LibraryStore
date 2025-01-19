import { api } from "..";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Получение всех товаров в корзине
    getCartItems: build.query<
      ADDTOCART.GetCartItemsResponse,
      ADDTOCART.GetCartItemsRequest
    >({
      query: () => ({
        url: "cart_items/",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),

    // Добавление товара в корзину
    addToCart: build.mutation<
      ADDTOCART.AddToCardResponse,
      ADDTOCART.AddToCardRequest
    >({
      query: (body) => ({
        url: "create_cart_items/",
        method: "POST",
        body: {
          katalog_books: body.katalog_books_cart,
          quantity: body.quantity,
        }, 
      }),
      invalidatesTags: ["cart"],
    }),

    // Удаление товара из корзины
    deleteCart: build.mutation<void, number>({
      query: (id) => ({
        url: `cart_items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
} = cartApi;
