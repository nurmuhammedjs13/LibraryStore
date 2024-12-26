import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_OKUKG_API}/`,
  prepareHeaders: (headers) => {
    const tokens = localStorage.getItem("token");

    if (!tokens) {
      console.warn("Token not found");
      return headers;
    }
    try {
      const parsedTokens = JSON.parse(tokens);

      if (parsedTokens?.access) {
        headers.set("Authorization", `Bearer ${parsedTokens.access}`);
      }
    } catch (error) {
      console.error("Failed to parse tokens", error);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [
    "opening",
    "footer",
    "books",
    "aksia",
    "booksDetail",
    "genre",
    "paymentdetails",
    "aboutUs",
    "auth",
  ],
  endpoints: () => ({}),
});
