import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getOpening: build.query<OPENING.GetOpeningReaponse,OPENING.GetOpeningRequest>({
      query: () => ({
        url: `opening`,
        method: "GET",
      }),
      providesTags: ["opening"],
    }),
  }),
});

export const { useGetOpeningQuery } = api;
