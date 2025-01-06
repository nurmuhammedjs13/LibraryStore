import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getFavorite: build.query<
            FAVORITE.GetFavoriteItemsReaponse,
            FAVORITE.GetFavoriteItemsRequest
        >({
            query: () => ({
                url: "favorite_items/",
                method: "GET",
            }),
            providesTags: ["favorite"],
        }),

        addFavoriteItem: build.mutation<
            FAVORITE.CreateFavoriteItemResponse,
            FAVORITE.CreateFavoriteItemRequest
        >({
            query: ({ katalog_books_like, user_favorite }) => {
                const body = {
                    user_favorite: user_favorite,
                    katalog_books_like: katalog_books_like,
                    like_favorite: true,
                };
                console.log("Запрос к API addFavoriteItem:", body);
                return {
                    url: "create_favorite_items/",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["favorite"],
        }),

        removeFavoriteItem: build.mutation({
            query: (id) => {
                console.log("Удаление из избранного по ID:", id);
                return {
                    url: `create_favorite_items/${id}/`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["favorite"],
        }),
    }),
});

export const {
    useGetFavoriteQuery,
    useAddFavoriteItemMutation,
    useRemoveFavoriteItemMutation,
} = api;
