import { api as baseApi } from "..";
import Cookies from "js-cookie";
const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFavorite: build.query({
      query: () => ({
        url: `favorite_items/`,
        method: "GET",
        // headers: {
        //   // Authorization: `Bearer ${localStorage.getItem("token")}`, // Предполагается, что токен хранится в localStorage
        // },
      }),
      providesTags: ["favorite_items"],
    }),
    // Получить список избранных элементов
    getFavoriteItems: build.query<
      FAVORITE.GetFavoriteItemsReaponse,
      FAVORITE.GetFavoriteItemsRequest
    >({
      query: () => ({
        url: `favorite_items/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      providesTags: ["favorite_items"],
    }),

    // Добавить элемент в избранное
    createFavoriteItem: build.mutation<
      FAVORITE.CreateFavoriteItemResponse,
      FAVORITE.CreateFavoriteItemRequest
    >({
      query: (newItem) => ({
        url: `favorite_items/`,
        method: "POST",
        body: {
          user_book: {
            username: newItem.username, // Убедитесь, что передается корректное имя пользователя
            book: {
              book_name: newItem.book_name,
              author: newItem.author,
              price: newItem.price,
              janre: newItem.janre,
            },
          },
          book_like: true,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),

      invalidatesTags: ["favorite_items"],
    }),

    // Удалить элемент из избранного
    deleteFavoriteItem: build.mutation({
      query: (id) => ({
        url: `favorite_items/${id}/`,
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Токен для авторизации
        // },
      }),
      invalidatesTags: ["favorite_items"],
    }),
  }),
});

export const {
  useGetFavoriteQuery,
  useGetFavoriteItemsQuery,
  useCreateFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} = favoriteApi;
