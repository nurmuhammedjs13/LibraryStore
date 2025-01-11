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
  };
  type PostRegistrationRequest = {
    username: string;
    email: string;
    password: string;
  };
  type PostRefreshResponse = {
    access: string;
    refresh: string;
  };
  type PostRefreshRequest = {
    refresh: string;
    // refreshToken?: string;
  };
}
