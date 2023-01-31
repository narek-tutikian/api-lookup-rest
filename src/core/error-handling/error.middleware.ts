import { NextFunction, Request, Response } from 'express';
import ApiError from './api-error';
import httpStatus from 'http-status';
import { ValidateError } from '@tsoa/runtime';

const errorConverter = (
  err: TypeError & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (err instanceof ValidateError) {
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, `${message}`);
  }
  next(error);
};

function errorMiddleware(
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message;
  response.status(status).send({
    status,
    message,
  });
  next();
}

export { errorMiddleware, errorConverter };
