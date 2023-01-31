import {failedDependencyError} from "../../core/error-handling/error-list";

const ipLookupFailed = () => {
  return failedDependencyError(
    'The IP lookup failed.'
  );
};

export default {ipLookupFailed}
