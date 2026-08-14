import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import env from '#substructure/env.ts';


import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime/library.js';


interface translatePrismaError {
  statusCode: number;
  message: string;
  innerMessage: string;
}

const translatePrismaError = (error: any): translatePrismaError => {

  switch (error.code) {
    case 'P2002':
      return {
        statusCode: httpStatus.CONFLICT,
        message: 'این مقدار قبلاً استفاده شده است.',
        innerMessage: `Unique constraint failed on ${error.meta?.target}`,
      };
    case 'P2025':
      return {
        statusCode: httpStatus.NOT_FOUND,
        message: 'موردی با این مشخصات یافت نشد.',
        innerMessage: 'Record not found.',
      };
    case 'P2003':
      return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'ارجاع به داده‌ای که وجود ندارد (کلید خارجی نامعتبر).',
        innerMessage: `Foreign key constraint failed: ${error.meta?.field_name}`,
      };
    case 'P2014':
      return {
        statusCode: httpStatus.CONFLICT,
        message: 'خطا در ساختار روابط داده.',
        innerMessage: 'Detected cyclic dependency in nested writes.',
      };
    default:
      return {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'خطای پایگاه داده.',
        innerMessage: error.message,
      };
  }
};

const logError = (error: any) => {
  console.log();
  const log = {
    timestamp: new Date().toISOString(),
    type: error.constructor.name || 'UnknownError',
    statusCode: error.statusCode || 500,
    message: error.message,
    innerMessage: error._innerMessage || error.innerMessage || '',
    isOperational: error.isOperational ?? false,
    stack: error.stack?.split('\n').slice(0, 5).join(' → ') || '',
  };

  console.error('ErrorLog:', JSON.stringify(log, null, 2));
};

const exceptionConverter = (err: any, req: any, res: any, next: any): void => {
  let error: any = err;

  const isPrismaError = [
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientRustPanicError,
    PrismaClientValidationError,
  ].some((PrismaErrorClass) => error instanceof PrismaErrorClass);

  if (!(error instanceof ApiError)) {
    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
    let message: any = error.message;
    let innerMessage: any = error.message;


    if (error instanceof PrismaClientKnownRequestError) {
      const translated = translatePrismaError(error);
      statusCode = translated.statusCode;
      message = translated.message;
      innerMessage = translated.innerMessage;
    } else if (isPrismaError) {
      statusCode = httpStatus.BAD_REQUEST;
      message = 'خطای سیستم پایگاه داده.';
      innerMessage = error.message;
    }

    const stack = env.environment === 'development' ? error.stack : '';
    error = new ApiError(statusCode, message, innerMessage, isPrismaError, stack);
  }

  next(error);
};

const exceptionHandler = (err: any, req: any, res: any, next: any): void => {
  let { statusCode, message } = err;

  if (env.environment === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // 🔥 Log Error
  if (env.environment === 'development' || !err.isOperational) {
    logError(err);
  }

  const response = {
    code: statusCode,
    message,
    ...(env.environment === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export { exceptionConverter, exceptionHandler };
