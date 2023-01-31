import { errorConverter, errorMiddleware } from './error.middleware';
import ApiError from './api-error';
import { ValidateError } from 'tsoa';

class Status {
  locals = {};
  error = '';
  code: number | undefined;

  // eslint-disable-next-line
  status(code: number): any {
    this.code = code;
    return this;
  }

  json(message: string) {
    this.error = message;
  }

  send(message: string) {
    this.error = message;
  }
}

// eslint-disable-next-line
let req: any;
// eslint-disable-next-line
let res: any;

beforeEach(() => {
  req = {};
  res = new Status();
});

afterEach((done) => {
  jest.restoreAllMocks();
  done();
});

describe('Error Middleware', () => {
  test('should test errorConverter function (ValidateError)', async () => {
    errorConverter(
      new ValidateError({ test: { message: 'test' } }, 'test'),
      req,
      res,
      () => ({})
    );

    expect(res.error.message).toEqual('Validation Failed');
  });

  test('should test errorConverter function (!ApiError)', async () => {
    // eslint-disable-next-line
    let error: any;
    errorConverter(new Error('test'), req, res, (err) => {
      error = err;
    });

    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toEqual(500);
    expect(error.message).toEqual('test');
  });

  test('should test errorMiddleware function', async () => {
    errorMiddleware(new ApiError(500, 'test'), req, res, () => ({}));

    expect(res.error.message).toEqual('test');
  });
});
