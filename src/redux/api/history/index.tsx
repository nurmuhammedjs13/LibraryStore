import { api as index } from "..";
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getHistory: build.query<
            HISTORY.GetHistoryReaponse,
            HISTORY.GetHistoryRequest
        >({
            query: () => ({
                url: `history`,
                method: "GET",
            }),
            providesTags: ["history"],
        }),
    }),
});

export const { useGetHistoryQuery } = api;
