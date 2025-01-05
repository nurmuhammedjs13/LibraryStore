import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    // Получение списка избранного
    getFavorite: build.query({
      query: () => ({
        url: "create_favorite_items/",
        method: "GET",
      }),
      providesTags: ["favorite"],
    }),

    // Добавление книги в избранное
    addFavoriteItem: build.mutation({
      query: ({ bookId, userId }) => ({
        url: "create_favorite_items/",
        method: "POST",
        body: {
          user_favorite: userId,
          katalog_books_like: bookId,
          like_favorite: true,
        },
      }),
      invalidatesTags: ["favorite"],
    }),

    // Удаление книги из избранного
    removeFavoriteItem: build.mutation({
      query: (id) => ({
        url: `create_favorite_items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["favorite"],
    }),
  }),
});

export const {
  useGetFavoriteQuery,
  useAddFavoriteItemMutation,
  useRemoveFavoriteItemMutation,
} = api;
