import { api as index } from "..";
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getDiscount: build.query<
            Discount.GetDiscountReaponse,
            Discount.GetDiscountRequest
        >({
            query: () => ({
                url: `aksia`,
                method: "GET",
            }),
            providesTags: ["aksia"],
        }),
    }),
});

export const { useGetDiscountQuery } = api;
