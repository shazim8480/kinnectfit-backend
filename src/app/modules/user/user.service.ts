import httpStatus from 'http-status';
import { ILoginUser, IRefreshTokenResponse } from './user.constant';
import { ILoginUserResponse, IUser } from './user.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

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

  const { role, id, img_url } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, email, role, img_url },
    config.jwt.token as Secret,
    config.jwt.token_expires as string,
  );
  const refreshToken = jwtHelpers.createToken(
    { id, email, role, img_url },
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
      id: isUserExist.id,
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

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
};
