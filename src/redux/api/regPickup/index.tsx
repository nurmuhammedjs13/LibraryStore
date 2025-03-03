import { api as index } from "..";

export const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRegPickUp: build.query<REGPICKUP.GetRegPickUpResponse, void>({
            query: () => ({
                url: `/pickup-list/`,
                method: "GET",
            }),
            providesTags: ["pickup"],
        }),
        postRegPickUp: build.mutation<
            REGPICKUP.PostRegPickUpResponse,
            FormData
        >({
            query: (formData) => ({
                url: "/create_pickup/",
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

export const { useGetRegPickUpQuery, usePostRegPickUpMutation } = api;
