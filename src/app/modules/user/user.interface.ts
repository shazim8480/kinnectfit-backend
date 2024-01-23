import { Model, Types } from 'mongoose';
import { Role } from './user.constant';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
  img_url?: string;
};

export type IUserExist = {
  name: string;
  email: string;
  password: string;
  role: Role;
  id: Types.ObjectId | undefined;
  img_url?: string;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    Pick<IUserExist, 'email' | 'name' | 'password' | 'role' | 'img_url'>
  >;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  role?: string;
};
