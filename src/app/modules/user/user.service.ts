import httpStatus from 'http-status';
import {
  ILoginUser,
  IRefreshTokenResponse,
  userFilterableFields,
} from './user.constant';
import { ILoginUserResponse, IUser, IUserFilters } from './user.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createUser = async (
  user: IUser,
): Promise<{
  userInfo: IUser;
  accessToken: string;
  refreshToken: string;
}> => {
  const checkEmail = await User.findOne({ email: user.email });

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already email exist!');
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  const result = await User.findById(createdUser._id);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR, Please try again later!!!',
    );
  }
  const tokenInfo = {
    id: createdUser.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  );

  const refreshToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return { userInfo: result, accessToken, refreshToken };
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { role, img_url } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email, role, img_url },
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { email, role, img_url },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_token as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      img_url: isUserExist.img_url,
    },
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'User does not exist!');
  }
  return result;
};
export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  getSingleUser,
};
