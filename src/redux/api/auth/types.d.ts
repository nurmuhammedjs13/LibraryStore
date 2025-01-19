namespace AUTH {
  type GetResponse = {
    id: number;
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
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
  };

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
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
  };
  type PostRefreshTokenRes = {
    access: string;
    refresh: string;
  };
  type PostRefreshTokenReq = {
    refresh: string;
  };

  type PostForgotPasswordResponse = {
    status: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
  };
  type PatchResetPasswordResponse = {
    message: string;
  };
  type PatchResetPasswordRequest = {
    email: string;
    reset_code: string;
    new_password: string;
  };
}
