export class ClientError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ClientError';
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, ClientError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}
