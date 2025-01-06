namespace AUTH {
  type GetResponse = {
    id?: number;
    user_image: string;
    username: string;
    phone_number: string;
    email: string;
  };
  type GetRequest = void;
  type PostLoginResponse = {
    user: {
      username: string;
      email: string;
    };
    access: string;
    refresh: string;
  };
  type PostLoginRequest = {
    username: string;
    password: string;
  };
  type PostRegistrationResponse = {
    username: string;
    email: string;
    date_registered: string;
    // message: string;
    // accessToken: string;
    // accessTokenExpiration: number;
    // refreshToken: string;
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
  };
  //   type PatchRefreshResponse = {
  //     accessToken: string;
  //     accessTokenExpiration: number;
  //     refreshToken: string;
  //   };
  //   type PatchRefreshRequest = {
  //     refreshToken: string;
  //   };

  //   type PostForgotPasswordResponse = {
  //     message: string;
  //   };
  //   type PostForgotPasswordRequest = {
  //     email: string;
  //     frontEndUrl: string;
  //   };

  //   type PatchResetPasswordResponse = {
  //     message: string;
  //   };
  //   type PatchResetPasswordRequest = {
  //     token: string;
  //     newPassword: string;
  //   };
  //   type PostLogoutResponse = {
  //     message: string;
  //   };
  //   type PostLogoutRequest = {
  //     email: string;
  //     frontEndUrl: string;
  //   };
}
