import logger from './logger';

export class ServerError extends Error {
  constructor(message: string, e?: Error) {
    super(message);
    logger.error(message, e);
    this.name = 'ServerError';
    this.message = message;
    Object.setPrototypeOf(this, ServerError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }
}
