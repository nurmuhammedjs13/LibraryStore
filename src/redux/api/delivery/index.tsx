import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getDostavka: build.query<
            DOSTAVKA.GetDostsvkaReasponse,
            DOSTAVKA.GetDostsvkaRequest
        >({
            query: () => ({
                url: "/dostavka_information/",
                metod: "GET",
            }),
            providesTags: ["dostavka"],
        }),
    }),
});

export const { useGetDostavkaQuery } = api;
