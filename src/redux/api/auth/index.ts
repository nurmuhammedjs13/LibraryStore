import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AUTH.GetResponse, AUTH.GetRequest>({
      query: () => ({
        url: `user/`,
        method: "GET",
      }),

      providesTags: ["auth"],
    }),
    postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (data) => ({
        url: "login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postRegistration: build.mutation<
      AUTH.PostRegistrationResponse,
      AUTH.PostRegistrationRequest
    >({
      query: (data) => ({
        url: "register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    postRefreshToken: build.mutation<
      AUTH.PostRefreshResponse,
      AUTH.PostRefreshRequest
    >({
      query: (data) => ({
        url: "api/token/refresh/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const {
  useGetMeQuery,
  usePostLoginMutation,
  usePostRegistrationMutation,
  // usePostForgotPasswordMutation,
  // usePatchResetPasswordMutation,
  // usePostLogoutMutation,
  usePostRefreshTokenMutation,
} = api;
