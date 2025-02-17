import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRegDelivery: build.query<
            REGDELIVERY.GetRegDeliveryResponse,
            REGDELIVERY.GetRegDeliveryRequest
        >({
            query: () => ({
                url: `/delivery-list/`,
                method: "GET",
            }),
            providesTags: ["regdelivery"],
        }),
        postRegDelivery: build.mutation<
            REGDELIVERY.PostRatingResponse,
            REGDELIVERY.PostRegDeliveryRequest
        >({
            query: (request) => {
                console.log("Тело запроса:", request);
                return {
                    url: `/create_delivery/`,
                    method: "POST",
                    body: request, // Проверьте, добавлено ли тело запроса
                };
            },
            invalidatesTags: ["regdelivery"],
        }),
    }),
});

export const { useGetRegDeliveryQuery, usePostRegDeliveryMutation } = api;
