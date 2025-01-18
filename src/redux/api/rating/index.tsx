import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<RATINGS.GetRatingResponse, RATINGS.GetRatingRequest>({
            query: () => ({
                url: `ratings-list/`,
                method: "GET",
            }),
            providesTags: ["ratings"],
        }),
        postRating: build.mutation<
            RATINGS.PostRatingResponse,
            RATINGS.PostRatingRequest
        >({
            query: (request) => ({
                url: `create_ratings/`,
                method: "POST",
                body: request,
            }),
            invalidatesTags: ["ratings"],
        }),
    }),
});

export const { useGetRatingsQuery, usePostRatingMutation } = api;
