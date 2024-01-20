export type ILoginUser = {
  email: string;
  password: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type Role = 'admin' | 'user' | 'trainer';

export const userRoles: Role[] = ['admin', 'user', 'trainer'];
