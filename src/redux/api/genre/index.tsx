import { api as index } from "..";
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getGenre: build.query<GENRE.GetGenreReaponse, GENRE.GetGenreRequest>({
            query: () => ({
                url: `janre`,
                method: "GET",
            }),
            providesTags: ["genre"],
        }),
    }),
});

export const { useGetGenreQuery } = api;
