export type UserRole = 'admin' | 'user';

export type AuthUser = {
  id?: string;
  _id?: string;
  fullname?: string;
  name?: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResult = {
  user: AuthUser;
  token: string;
  refreshToken?: string;
};

type ApiSuccessResponse = {
  success: true;
  body: LoginResult;
};

type ApiErrorResponse = {
  success: false;
  body?: {
    text?: string;
    message?: string;
  };
  message?: string;
};

export type LoginApiResponse = ApiSuccessResponse | ApiErrorResponse;
