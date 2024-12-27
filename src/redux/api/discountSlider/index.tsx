import { api as index } from "..";
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getDiscount: build.query<
            Discount.GetDiscountResponse,
            Discount.GetDiscountRequest
        >({
            query: () => ({
                url: `aksia`,
                method: "GET",
            }),
            providesTags: ["aksia"],
        }),
        getDiscountDetail: build.query<
            Discount.GetDiscountDetailResponse,
            Discount.GetDiscountDetailRequest
        >({
            query: (id) => ({
                url: `aksia/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetDiscountQuery, useGetDiscountDetailQuery } = api;
