import BaseError from '#substructure/error/baseError.ts';

class ApiError extends BaseError {
  constructor(statusCode: any, message: string, innerMessage: string, isOperational: boolean = true, stack: string = '') {
    super(message, innerMessage);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this._type = ApiError.constructor.name;
    if (stack) {
      this.stack = stack;
    } else {
      BaseError.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
