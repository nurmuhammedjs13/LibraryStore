import { api as index } from "..";
const api = index.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query<Books.GetBooksReaponse, Books.GetBooksRequest>({
            query: () => ({
                url: `books`,
                method: "GET",
            }),
            providesTags: ["books"],
        }),
    }),
});

export const { useGetBooksQuery } = api;
