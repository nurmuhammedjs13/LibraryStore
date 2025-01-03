import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<
            RATINGS.GetRatingResponse,
            RATINGS.GetRatingRequest
        >({
            query: () => ({
                url: `ratings`,
                method: "GET",
            }),
            providesTags: ["ratings"],
        }),
    }),
});

export const { useGetRatingsQuery } = api;
