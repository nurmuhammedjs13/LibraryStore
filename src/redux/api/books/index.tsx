import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query<
            Books.GetBooksListResponse,
            Books.GetBooksRequest
        >({
            query: () => ({
                url: `books`,
                method: "GET",
            }),
            providesTags: ["books"],
        }),
        getBooksDetail: build.query<
            Books.GetBooksDetailResponse,
            Books.GetBooksDetailRequest
        >({
            query: (id) => ({
                url: `books/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetBooksQuery, useGetBooksDetailQuery } = api;
