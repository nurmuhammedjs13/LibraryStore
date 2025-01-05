import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_OKUKG_API}/`,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    console.log("🚀 ~ token:", token)

    if (!token) {
      console.warn("Token not found in cookies");
      return headers;
    }

    // Устанавливаем токен в заголовки
    headers.set("Authorization", `Bearer ${token}`);
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
    "favorite",
  ],
  endpoints: () => ({}),
});
