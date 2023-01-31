class ApiError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
      super(message);
      this.message = message;
    this.status = status;
  }
}

export default ApiError;
