import { jwtHelpers } from './../../../src/helpers/jwtHelpers';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../../src/errors/ApiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../src/config';
export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
      }
      //   verify token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.jwt.token as Secret,
      );
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
      }
      // console.log('Hello', verifiedUser.role);
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
