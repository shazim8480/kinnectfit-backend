import { IGenericErrorMessage } from './../interfaces/error';
import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
