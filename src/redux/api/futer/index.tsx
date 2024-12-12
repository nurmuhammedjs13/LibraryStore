import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getFooter: build.query<FOOTER.GetFooterReaponse,FOOTER.GetFooterRequest>({
      query: () => ({
        url: `futer`,
        method: "GET",
      }),
      providesTags: ["footer"],
    }),
  }),
});

export const { useGetFooterQuery } = api;
