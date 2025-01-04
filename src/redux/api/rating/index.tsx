import { api as index } from "..";

export interface RatingRequest {
    data: {
        comment: string;
        stars: number;
    };
}

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getRatings: build.query<RATINGS.GetRatingResponse, void>({
            query: () => ({
                url: `ratings`,
                method: "GET",
            }),
            providesTags: ["ratings"],
        }),
        postRating: build.mutation<RATINGS.PostRatingResponse, RatingRequest>({
            query: (request) => ({
                url: `ratings`,
                method: "POST",
                body: request.data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["ratings"],
        }),
    }),
});

export const { useGetRatingsQuery, usePostRatingMutation } = api;
