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
            FormData
        >({
            query: (formData) => ({
                url: "/create_delivery/",
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": undefined,
                },
                formData: true,
            }),
        }),
    }),
});

export const { useGetRegDeliveryQuery, usePostRegDeliveryMutation } = api;
