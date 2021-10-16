export class ServerError extends Error {
  constructor(message: string, _?: Error) {
    super(message);
    this.name = 'ServerError';
    this.message = message;
    Object.setPrototypeOf(this, ServerError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }
}
