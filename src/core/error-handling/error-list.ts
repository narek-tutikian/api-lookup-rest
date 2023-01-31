import httpStatus from 'http-status';
import ApiError from './api-error';

const conflictError = (message: string): Error => {
  return new ApiError(httpStatus.CONFLICT, message);
};

const badRequestError = (message: string): Error => {
  return new ApiError(httpStatus.BAD_REQUEST, message);
};

const notFoundError = (message: string): Error => {
  return new ApiError(httpStatus.NOT_FOUND, message);
};

const unauthorizedError = (message: string): Error => {
  return new ApiError(httpStatus.UNAUTHORIZED, message);
};
const failedDependencyError = (message: string): Error => {
  return new ApiError(httpStatus.FAILED_DEPENDENCY, message);
};
const requestEntityTooLargeError = (message: string): Error => {
  return new ApiError(httpStatus.REQUEST_ENTITY_TOO_LARGE, message);
};

export {
  conflictError,
  badRequestError,
  notFoundError,
  unauthorizedError,
  failedDependencyError,
  requestEntityTooLargeError,
};
