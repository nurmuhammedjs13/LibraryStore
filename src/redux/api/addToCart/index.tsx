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
                url: "cart_items/",
                method: "POST",
                body: {
                    books: {
                        book_name: body.books.book_name,
                        price: body.books.price,
                    },
                    quantity: body.quantity,
                    books_id: body.books_id,
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