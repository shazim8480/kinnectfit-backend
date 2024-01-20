import { Model, Types } from "mongoose";
import { Role } from "./user.constant";

export type IUser = {
  id: string;
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
    email: string
  ): Promise<
    Pick<IUserExist, "id" | "email" | "name" | "password" | "role" | "img_url">
  >;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
