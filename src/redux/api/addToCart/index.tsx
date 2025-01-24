import { api } from "..";

export const cartApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCartItems: build.query<ADDTOCART.GetCartItemsResponse, void>({
            query: () => ({
                url: "cart_items/",
                method: "GET",
            }),
            providesTags: ["cart"],
        }),
        addToCart: build.mutation<
            ADDTOCART.AddToCardResponse,
            ADDTOCART.AddToCardRequest
        >({
            query: (body) => ({
                url: "cart_items/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["cart"],
        }),
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
