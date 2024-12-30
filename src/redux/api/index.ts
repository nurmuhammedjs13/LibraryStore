import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_OKUKG_API}/`,
  prepareHeaders: (headers) => {
    const token = Cookies.get("t  oken");
    // const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token not found in cookies");
      return headers;
    }

    try {
      const parsedToken = JSON.parse(token);
      if (parsedToken?.access) {
        headers.set("Authorization", `Bearer ${parsedToken.access}`);
      } else {
        console.warn("Invalid token format in cookies");
      }
    } catch (error) {
      console.table(error);
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
    "favorite_items",
  ],
  endpoints: () => ({}),
});
