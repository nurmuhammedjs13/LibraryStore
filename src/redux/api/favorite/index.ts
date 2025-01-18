import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getKatFavorite: build.query<
      FAVORITE.GetKatFavoriteItemsReaponse,
      FAVORITE.GetKatFavoriteItemsRequest
    >({
      query: () => ({
        url: "katalog_favorite_items/",
        method: "GET",
      }),
      providesTags: ["favorite"],
    }),

    addKatFavoriteItem: build.mutation<
      FAVORITE.CreatekatFavoriteItemResponse,
      FAVORITE.CreateKatFavoriteItemRequest
    >({
      query: ({ books_like, user_favorite }) => {
        const body = {
          user_favorite: user_favorite,
          books_like: books_like,
          like_favorite: true,
        };
        return {
          url: "create_for_kat_favorite_items/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["favorite"],
    }),

    removeKatFavoriteItem: build.mutation({
      query: (id) => {
        console.log("Удаление из избранного по ID:", id);
        return {
          url: `create_for_kat_favorite_items/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["favorite"],
    }),
  }),
});

export const {
  useAddKatFavoriteItemMutation,
  useGetKatFavoriteQuery,
  useRemoveKatFavoriteItemMutation,
} = api;
