import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPaymentdetails: build.query<
      PAYMENTDETAILS.GetPaymentdetailsReaponse,
      PAYMENTDETAILS.GetPaymentdetailsRequest
    >({
      query: () => ({
        url: "/payment_details/",
        method: "GET",
      }),
      providesTags: ["paymentdetails"],
    }),
  }),
});



export const {useGetPaymentdetailsQuery} = api