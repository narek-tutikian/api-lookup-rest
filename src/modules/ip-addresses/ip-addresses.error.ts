import {
  failedDependencyError,
  notFoundError,
} from '../../core/error-handling/error-list';

const ipLookupFailed = () => {
  return failedDependencyError('The IP lookup failed.');
};

const noLookupToDelete = () => {
  return notFoundError('The ip lookup not found for deleting.');
};

export default { ipLookupFailed, noLookupToDelete };
