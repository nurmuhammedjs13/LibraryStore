import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRegPickUp: build.query<
            REGPICKUP.GetRegPickUpResponse,
            REGPICKUP.GetRegPickUpRequest
        >({
            query: () => ({
                url: `/pickup-list/`,
                method: "GET",
            }),
            providesTags: ["pickup"],
        }),
        postRegPickUp: build.mutation<
            REGPICKUP.PostRegPickUpResponse,
            REGPICKUP.PostRegPickUpRequest
        >({
            query: (request) => ({
                url: `/create_pickup/`,
                method: "POST",
                body: request,
            }),
            invalidatesTags: ["pickup"],
        }),
    }),
});

export const { useGetRegPickUpQuery, usePostRegPickUpMutation } = api;
