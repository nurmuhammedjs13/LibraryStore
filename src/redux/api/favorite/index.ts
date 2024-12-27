import { api as baseApi } from "..";

const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Получить список избранных элементов
    getFavoriteItems: build.query({
      query: () => ({
        url: `favorite_items/`,
        method: "GET",
      }),
      providesTags: ["favorite_items"],
    }),

    // Добавить элемент в избранное
    createFavoriteItem: build.mutation({
      query: (newItem) => ({
        url: `favorite_items/`,
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["favorite_items"],
    }),

    // Удалить элемент из избранного
    deleteFavoriteItem: build.mutation({
      query: (id) => ({
        url: `favorite_items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["favorite_items"],
    }),
  }),
});

export const {
  useGetFavoriteItemsQuery,
  useCreateFavoriteItemMutation,
  useDeleteFavoriteItemMutation,
} = favoriteApi;
